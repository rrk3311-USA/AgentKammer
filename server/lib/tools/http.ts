import { TOOL_CATALOG, publicWalletView, validateLivabilityInput, type LivabilityInput } from "@shared/tools";
import { storage } from "../../storage";
import { rateLimit } from "../advisory/rate-limit";
import {
  canAccessTools,
  paymentsAreStubbed,
  stripeIsConfigured,
  toolsArePublic,
  toolsStatusPayload,
} from "./access";
import {
  getOrCreateVisitorId,
  memberFromAccessToken,
  readCookieHeader,
  type CookieAdapter,
  type ToolsMember,
} from "./identity";
import { ToolsRepository, publicRun } from "./repository";
import { authorizeAndChargeRun, creditTopUp, refundRunCredits } from "./wallet";
import { runLivabilityPipeline } from "./livability";
import { constructStripeEvent, createToolsCheckoutSession, retrievePaidCheckoutSession } from "./stripe";

export type ToolsReq = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  query?: Record<string, string | string[] | undefined>;
  body?: unknown;
  rawBody?: Buffer | string;
  params?: Record<string, string>;
};

export type ToolsRes = {
  status: (code: number) => { json: (body: unknown) => void };
  setHeader: (name: string, value: string | string[]) => void;
  getHeader?: (name: string) => string | number | string[] | undefined;
  cookie?: (name: string, value: string, options?: Record<string, unknown>) => void;
};

function headerString(headers: ToolsReq["headers"], name: string): string | undefined {
  const value = headers[name] ?? headers[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
}

function parseBody(body: unknown): Record<string, unknown> {
  if (typeof body === "string") {
    try {
      return JSON.parse(body || "{}") as Record<string, unknown>;
    } catch {
      return {};
    }
  }
  return body && typeof body === "object" ? (body as Record<string, unknown>) : {};
}

function appendSetCookie(res: ToolsRes, cookie: string) {
  const existing = res.getHeader?.("Set-Cookie");
  if (!existing) {
    res.setHeader("Set-Cookie", cookie);
  } else if (Array.isArray(existing)) {
    res.setHeader("Set-Cookie", [...existing, cookie]);
  } else {
    res.setHeader("Set-Cookie", [String(existing), cookie]);
  }
}

function buildCookie(name: string, value: string, maxAgeSeconds: number) {
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    "Path=/",
    `Max-Age=${Math.max(0, maxAgeSeconds)}`,
    "SameSite=Lax",
    "HttpOnly",
  ];
  if (process.env.NODE_ENV === "production") parts.push("Secure");
  return parts.join("; ");
}

export function cookieAdapterFrom(req: ToolsReq, res: ToolsRes): CookieAdapter {
  return {
    get(name) {
      return readCookieHeader(headerString(req.headers, "cookie"), name);
    },
    set(name, value, maxAgeSeconds) {
      if (res.cookie) {
        res.cookie(name, value, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: maxAgeSeconds * 1000,
          path: "/",
        });
        return;
      }
      appendSetCookie(res, buildCookie(name, value, maxAgeSeconds));
    },
  };
}

async function resolveMember(req: ToolsReq): Promise<ToolsMember | null> {
  const header = headerString(req.headers, "authorization") || "";
  const bearer = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  const cookieToken = readCookieHeader(headerString(req.headers, "cookie"), "ak_member_token");
  const token = bearer || cookieToken || "";
  if (!token) return null;

  const signed = memberFromAccessToken(token);
  if (signed) return signed;

  try {
    const member = await storage.getMemberProfileByAccessToken(token);
    if (member) return { id: member.id, email: member.email };
  } catch {
    /* storage unavailable */
  }
  return null;
}

function denied(res: ToolsRes) {
  return res.status(404).json({
    ok: false,
    error: "This desk is not public yet.",
    previewRequired: true,
  });
}

function guard(req: ToolsReq, res: ToolsRes) {
  if (!canAccessTools({ query: req.query, headers: req.headers })) {
    denied(res);
    return false;
  }
  return true;
}

export async function handleToolsStatus(req: ToolsReq, res: ToolsRes) {
  const preview = canAccessTools({ query: req.query, headers: req.headers });
  res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
  return res.status(200).json({
    ok: true,
    ...toolsStatusPayload(),
    unlocked: preview,
    catalog: preview ? TOOL_CATALOG : TOOL_CATALOG.filter((tool) => tool.status === "live").map((tool) => ({
      slug: tool.slug,
      name: tool.name,
      status: tool.status,
      href: tool.href,
    })),
  });
}

async function loadContext(req: ToolsReq, res: ToolsRes) {
  const cookies = cookieAdapterFrom(req, res);
  const visitorId = getOrCreateVisitorId(cookies);
  const member = await resolveMember(req);
  const repo = new ToolsRepository(cookies);
  const wallet = await repo.getOrCreateWallet({ visitorId, member });
  return { cookies, visitorId, member, repo, wallet };
}

export async function handleToolsWallet(req: ToolsReq, res: ToolsRes) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  if (!guard(req, res)) return;
  try {
    const { wallet, member, repo } = await loadContext(req, res);
    const ledger = (await repo.listLedger(wallet.id)).slice(0, 12).map((entry) => ({
      id: entry.id,
      type: entry.type,
      credits: entry.credits,
      reason: entry.reason,
      createdAt: entry.createdAt,
    }));
    return res.status(200).json({
      ok: true,
      wallet: publicWalletView({
        credits: wallet.credits,
        freeLivabilityUsed: wallet.freeLivabilityUsed,
        identifiedBy: member ? "member" : "visitor",
        email: member?.email || wallet.email,
        persistence: repo.persistence,
        stripeConfigured: stripeIsConfigured(),
        paymentsStubbed: paymentsAreStubbed(),
      }),
      ledger,
    });
  } catch (error) {
    console.error("[tools/wallet]", error);
    return res.status(500).json({ error: "Could not load wallet" });
  }
}

export async function handleToolsRunsList(req: ToolsReq, res: ToolsRes) {
  if (req.method === "POST") return handleToolsCreateRun(req, res);
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  if (!guard(req, res)) return;
  try {
    const { wallet, repo } = await loadContext(req, res);
    const runs = (await repo.listRuns(wallet.id)).slice(0, 12).map(publicRun);
    return res.status(200).json({ ok: true, runs });
  } catch (error) {
    console.error("[tools/runs]", error);
    return res.status(500).json({ error: "Could not load runs" });
  }
}

export async function handleToolsCreateRun(req: ToolsReq, res: ToolsRes) {
  if (!guard(req, res)) return;
  const limited = rateLimit(`tools-run:${headerString(req.headers, "x-forwarded-for") || "local"}`, {
    limit: 12,
    windowMs: 60_000,
  });
  if (!limited.ok) {
    return res.status(429).json({ error: "Please wait a moment before another run.", retryAfterSec: limited.retryAfterSec });
  }

  try {
    const body = parseBody(req.body);
    const toolSlug = typeof body.tool === "string" ? body.tool : "livability";
    if (toolSlug !== "livability") {
      return res.status(400).json({ error: "That tool is not open yet." });
    }

    const input: LivabilityInput = {
      address: typeof body.address === "string" ? body.address : "",
      listingUrl: typeof body.listingUrl === "string" ? body.listingUrl : "",
      notes: typeof body.notes === "string" ? body.notes : "",
      images: Array.isArray(body.images) ? (body.images as LivabilityInput["images"]) : [],
    };
    const validated = validateLivabilityInput(input);
    if (!validated.ok) {
      return res.status(400).json({ error: validated.errors[0], errors: validated.errors });
    }

    const { wallet, repo } = await loadContext(req, res);
    const charge = await authorizeAndChargeRun(repo, wallet, toolSlug);
    if (!charge.ok) {
      return res.status(402).json({
        error: charge.error,
        code: charge.code,
        credits: charge.credits,
        topUps: [5, 10, 15, 25],
      });
    }

    const run = await repo.createRun(wallet.id, {
      toolSlug,
      status: "processing",
      address: validated.input.address || null,
      listingUrl: validated.input.listingUrl || null,
      imageCount: validated.input.images.length,
      inputMetadata: JSON.stringify({
        hasAddress: Boolean(validated.input.address),
        hasListing: Boolean(validated.input.listingUrl),
        imageNames: validated.input.images.map((image) => image.name),
        notes: validated.input.notes || null,
      }),
      chargedCredits: charge.chargedCredits,
    });

    try {
      const result = await runLivabilityPipeline(validated.input);
      const completed = await repo.updateRun(run.id, {
        status: "completed",
        resultJson: JSON.stringify(result),
      });
      if (charge.chargedCredits > 0) {
        await repo.addLedger(wallet.id, {
          type: "spend",
          credits: -charge.chargedCredits,
          reason: "Livability Score run",
          runId: run.id,
        });
      }
      const fresh = await repo.getWalletById(wallet.id);
      return res.status(200).json({
        ok: true,
        run: publicRun(completed || run),
        chargedCredits: charge.chargedCredits,
        firstFree: charge.reason === "first_free",
        wallet: publicWalletView({
          credits: fresh?.credits ?? charge.wallet.credits,
          freeLivabilityUsed: fresh?.freeLivabilityUsed ?? true,
          identifiedBy: "visitor",
          persistence: repo.persistence,
          stripeConfigured: stripeIsConfigured(),
          paymentsStubbed: paymentsAreStubbed(),
        }),
      });
    } catch (error) {
      await refundRunCredits(repo, wallet.id, charge.chargedCredits, run.id);
      const failed = await repo.updateRun(run.id, {
        status: "failed",
        errorMessage: error instanceof Error ? error.message : "Analysis failed",
      });
      return res.status(500).json({
        ok: false,
        error: "The analysis did not finish. No credit was kept.",
        run: failed ? publicRun(failed) : null,
      });
    }
  } catch (error) {
    console.error("[tools/runs:create]", error);
    return res.status(500).json({ error: "Could not start the run" });
  }
}

export async function handleToolsRunById(req: ToolsReq, res: ToolsRes) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  if (!guard(req, res)) return;
  try {
    const { wallet, repo } = await loadContext(req, res);
    const id = req.params?.id || "";
    const run = await repo.getRun(id);
    if (!run || run.walletId !== wallet.id) {
      return res.status(404).json({ error: "Run not found" });
    }
    return res.status(200).json({ ok: true, run: publicRun(run) });
  } catch (error) {
    console.error("[tools/runs:id]", error);
    return res.status(500).json({ error: "Could not load run" });
  }
}

export async function handleToolsCheckout(req: ToolsReq, res: ToolsRes) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!guard(req, res)) return;
  try {
    const body = parseBody(req.body);
    const { wallet, visitorId, member, repo } = await loadContext(req, res);
    const checkout = await createToolsCheckoutSession({
      pack: body.pack,
      walletId: wallet.id,
      visitorId,
      email: member?.email || wallet.email,
    });

    if (checkout.stub) {
      const credited = await creditTopUp(repo, wallet, {
        credits: checkout.credits,
        amountCents: checkout.amountCents,
        stripeSessionId: `stub_${Date.now()}`,
        stub: true,
      });
      return res.status(200).json({
        ok: true,
        stub: true,
        message: "Test-mode top-up credited. No Stripe key is set.",
        credits: checkout.credits,
        wallet: publicWalletView({
          credits: credited.wallet.credits,
          freeLivabilityUsed: credited.wallet.freeLivabilityUsed,
          identifiedBy: member ? "member" : "visitor",
          email: member?.email || credited.wallet.email,
          persistence: repo.persistence,
          stripeConfigured: false,
          paymentsStubbed: true,
        }),
      });
    }

    await repo.savePayment({
      walletId: wallet.id,
      stripeSessionId: checkout.sessionId,
      amountCents: checkout.amountCents,
      credits: checkout.credits,
      status: "pending",
    });

    return res.status(200).json({
      ok: true,
      stub: false,
      url: checkout.url,
      sessionId: checkout.sessionId,
      credits: checkout.credits,
    });
  } catch (error) {
    console.error("[tools/checkout]", error);
    return res.status(400).json({ error: error instanceof Error ? error.message : "Checkout failed" });
  }
}

export async function handleToolsCheckoutConfirm(req: ToolsReq, res: ToolsRes) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!guard(req, res)) return;
  try {
    const body = parseBody(req.body);
    const sessionId = typeof body.sessionId === "string" ? body.sessionId : "";
    if (!sessionId) return res.status(400).json({ error: "Missing session id" });

    const paid = await retrievePaidCheckoutSession(sessionId);
    if (!paid || !paid.paid || paid.credits <= 0) {
      return res.status(400).json({ error: "Payment is not complete yet." });
    }

    const { wallet, member, repo } = await loadContext(req, res);
    const credited = await creditTopUp(repo, wallet, {
      credits: paid.credits,
      amountCents: paid.amountCents,
      stripeSessionId: paid.sessionId,
      stripePaymentIntentId: paid.paymentIntentId,
    });

    return res.status(200).json({
      ok: true,
      duplicate: credited.duplicate,
      credits: paid.credits,
      wallet: publicWalletView({
        credits: credited.wallet.credits,
        freeLivabilityUsed: credited.wallet.freeLivabilityUsed,
        identifiedBy: member ? "member" : "visitor",
        email: member?.email || credited.wallet.email,
        persistence: repo.persistence,
        stripeConfigured: stripeIsConfigured(),
        paymentsStubbed: paymentsAreStubbed(),
      }),
    });
  } catch (error) {
    console.error("[tools/checkout/confirm]", error);
    return res.status(500).json({ error: "Could not confirm top-up" });
  }
}

export async function handleToolsWebhook(req: ToolsReq, res: ToolsRes) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const signature = headerString(req.headers, "stripe-signature");
    if (!signature || !req.rawBody) {
      return res.status(400).json({ error: "Missing Stripe signature" });
    }
    const event = await constructStripeEvent(req.rawBody, signature);
    if (event.type !== "checkout.session.completed") {
      return res.status(200).json({ ok: true, ignored: event.type });
    }
    const session = event.data.object as {
      id: string;
      payment_intent?: string | { id?: string };
      metadata?: Record<string, string>;
      amount_total?: number;
      payment_status?: string;
    };
    const credits = Number(session.metadata?.credits || 0);
    const walletId = session.metadata?.walletId || "";
    if (!walletId || credits <= 0) {
      return res.status(200).json({ ok: true, ignored: "no wallet metadata" });
    }
    const repo = new ToolsRepository();
    const wallet = await repo.getWalletById(walletId);
    if (!wallet) {
      return res.status(200).json({ ok: true, ignored: "wallet not found — confirm on return" });
    }
    await creditTopUp(repo, wallet, {
      credits,
      amountCents: session.amount_total || credits * 100,
      stripeSessionId: session.id,
      stripePaymentIntentId:
        typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id || null,
    });
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("[tools/webhook]", error);
    return res.status(400).json({ error: "Webhook rejected" });
  }
}

export function toolsNoindexHeaders(path: string): boolean {
  return path === "/tools" || path.startsWith("/tools/") || path.startsWith("/api/tools");
}

export { toolsArePublic };

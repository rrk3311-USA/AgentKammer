import { randomInt, randomUUID, createHash } from "crypto";
import nodemailer from "nodemailer";
import { Resend } from "resend";

// Single catch-all function so /api/account/claim, /verify, /hub, /briefs all
// share one Vercel Lambda instance. That matters here: the OTP + member stores
// below are process-memory only (no DATABASE_URL is configured for this
// project on Vercel — see caveat at bottom of file). Splitting these into
// separate files would put claim() and verify() in *different* Lambdas that
// can never see each other's memory, breaking the flow outright. Keeping them
// in one file at least lets the two-step PIN flow work while the instance is
// warm, which is the best available option without provisioning a database.

type ApiRequest = {
  method?: string;
  headers: { cookie?: string; authorization?: string };
  query?: { action?: string[] };
  body?: unknown;
};

type ApiResponse = {
  setHeader: (name: string, value: string | string[]) => void;
  getHeader: (name: string) => string | number | string[] | undefined;
  status: (code: number) => { json: (body: unknown) => void };
};

const PIN_TTL_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const RESEND_COOLDOWN_MS = 45 * 1000;
const VISITOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 400; // seconds
const MEMBER_COOKIE_MAX_AGE = 60 * 60 * 24 * 400; // seconds

const FROM_ADDRESS = process.env.ACCOUNT_EMAIL_FROM || "Agent Kammer <onboarding@resend.dev>";

type PendingOtp = {
  pinHash: string;
  visitorId: string | null;
  assistantSessionId: string | null;
  signalSessionId: string | null;
  displayName: string | null;
  attempts: number;
  createdAt: number;
  expiresAt: number;
};

type Brief = {
  id: string;
  title: string;
  body: string;
  source: string;
  score: number | null;
  createdAt: string;
  decisionMap: Record<string, unknown> | null;
};

type Member = {
  id: string;
  email: string;
  displayName: string | null;
  accessToken: string;
  visitorIds: string[];
  progressStage: string;
  goals: string | null;
  vision: string | null;
  priorities: string | null;
  decisionMap: Record<string, unknown> | null;
  briefs: Brief[];
  createdAt: string;
  updatedAt: string;
};

// Process-memory stores. Reset on cold start and not shared across Lambda
// instances/regions. See file header + bottom-of-file caveat.
const pendingOtpByEmail = new Map<string, PendingOtp>();
const lastSendByEmail = new Map<string, number>();
const membersByEmail = new Map<string, Member>();
const membersByToken = new Map<string, Member>();

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function hashPin(email: string, pin: string) {
  return createHash("sha256").update(`${normalizeEmail(email)}:${pin}`).digest("hex");
}

function readCookie(cookieHeader: string | undefined, name: string) {
  if (!cookieHeader) return undefined;
  const match = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : undefined;
}

function buildCookie(name: string, value: string, maxAgeSeconds: number) {
  const parts = [`${name}=${encodeURIComponent(value)}`, "Path=/", `Max-Age=${maxAgeSeconds}`, "HttpOnly", "SameSite=Lax"];
  if (process.env.NODE_ENV === "production") parts.push("Secure");
  return parts.join("; ");
}

function appendSetCookie(res: ApiResponse, cookie: string) {
  const existing = res.getHeader("Set-Cookie");
  if (!existing) {
    res.setHeader("Set-Cookie", cookie);
  } else if (Array.isArray(existing)) {
    res.setHeader("Set-Cookie", [...existing, cookie]);
  } else {
    res.setHeader("Set-Cookie", [String(existing), cookie]);
  }
}

function getOrCreateVisitorId(req: ApiRequest, res: ApiResponse) {
  const existing = readCookie(req.headers.cookie, "ak_visitor_id");
  if (existing && /^akv_[a-f0-9-]{36}$/i.test(existing)) return existing;
  const visitorId = `akv_${randomUUID()}`;
  appendSetCookie(res, buildCookie("ak_visitor_id", visitorId, VISITOR_COOKIE_MAX_AGE));
  return visitorId;
}

function parseBody(req: ApiRequest): Record<string, unknown> {
  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body;
  return (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
}

async function sendPinEmail(email: string, pin: string) {
  const subject = "Your Agent Kammer verification code";
  const resumeUrl = "https://www.agentkammer.com/account";
  const html = `
    <div style="font-family: Georgia, serif; line-height: 1.6; color: #20242B;">
      <p>Your verification code is:</p>
      <p style="font-size: 28px; letter-spacing: 0.2em; font-weight: 600;">${pin}</p>
      <p>It expires in 15 minutes. Enter it to reopen your Decision Hub.</p>
      <p><a href="${resumeUrl}">Resume My Decision</a></p>
      <p style="color: #5c6570; font-size: 13px;">If you did not request this, you can ignore this email.</p>
    </div>
  `;
  const text = `Your Agent Kammer verification code is ${pin}. It expires in 15 minutes.\n\nResume: ${resumeUrl}`;

  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const result = await resend.emails.send({ from: FROM_ADDRESS, to: email, subject, html, text });
      if (!result.error) return { sent: true as const };
      console.error("Account PIN email (Resend) error:", result.error.message);
    } catch (err) {
      console.error("Account PIN email (Resend) error:", err);
    }
  }

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });
      await transporter.sendMail({
        from: `Agent Kammer <${process.env.EMAIL_USER}>`,
        to: email,
        subject,
        html,
        text,
      });
      return { sent: true as const };
    } catch (err) {
      console.error("Account PIN email (Gmail) error:", err);
    }
  }

  return { sent: false as const };
}

function upsertMember(email: string, input: { visitorId?: string | null; displayName?: string | null }): Member {
  const existing = membersByEmail.get(email);
  const now = new Date().toISOString();
  if (existing) {
    if (input.visitorId && !existing.visitorIds.includes(input.visitorId)) {
      existing.visitorIds.push(input.visitorId);
    }
    if (input.displayName && !existing.displayName) existing.displayName = input.displayName;
    existing.updatedAt = now;
    return existing;
  }

  const member: Member = {
    id: randomUUID(),
    email,
    displayName: input.displayName || "Decision Hub Member",
    accessToken: `akm_${randomUUID()}`,
    visitorIds: input.visitorId ? [input.visitorId] : [],
    progressStage: "exploring",
    goals: null,
    vision: null,
    priorities: null,
    decisionMap: null,
    briefs: [],
    createdAt: now,
    updatedAt: now,
  };
  membersByEmail.set(email, member);
  membersByToken.set(member.accessToken, member);
  return member;
}

function publicHub(member: Member) {
  return {
    id: member.id,
    email: member.email,
    displayName: member.displayName,
    goals: member.goals,
    vision: member.vision,
    priorities: member.priorities,
    progressStage: member.progressStage,
    decisionMap: member.decisionMap,
    briefs: member.briefs,
    conversationCount: 0,
    visitorCount: member.visitorIds.length,
    updatedAt: member.updatedAt,
  };
}

function getBearerOrCookieToken(req: ApiRequest) {
  const header = req.headers.authorization || "";
  const bearer = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  const cookieToken = readCookie(req.headers.cookie, "ak_member_token");
  return bearer || cookieToken || "";
}

async function handleClaim(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  const body = parseBody(req);
  const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
  if (!email || !email.includes("@")) {
    return res.status(400).json({ ok: false, error: "Valid email is required" });
  }

  const now = Date.now();
  const lastSend = lastSendByEmail.get(email) || 0;
  const waitMs = RESEND_COOLDOWN_MS - (now - lastSend);
  if (waitMs > 0) {
    return res.status(429).json({
      ok: false,
      error: "Please wait a moment before requesting another code.",
      waitMs,
    });
  }

  const visitorId = getOrCreateVisitorId(req, res);
  const pin = String(randomInt(0, 1_000_000)).padStart(6, "0");
  pendingOtpByEmail.set(email, {
    pinHash: hashPin(email, pin),
    visitorId,
    assistantSessionId: typeof body.assistantSessionId === "string" ? body.assistantSessionId : null,
    signalSessionId: typeof body.signalSessionId === "string" ? body.signalSessionId : null,
    displayName: typeof body.displayName === "string" ? body.displayName : null,
    attempts: 0,
    createdAt: now,
    expiresAt: now + PIN_TTL_MS,
  });
  lastSendByEmail.set(email, now);

  const mail = await sendPinEmail(email, pin);

  const payload: Record<string, unknown> = {
    ok: true,
    needsVerification: true,
    email,
    message: mail.sent
      ? "We sent a 6-digit code to your email. Enter it to open your Decision Hub."
      : "Enter the verification code to open your Decision Hub.",
  };

  // Never expose the PIN in production responses or logs.
  if (!mail.sent && process.env.NODE_ENV !== "production") {
    payload.devPin = pin;
    console.info(`[account-otp] PIN for ${email}: ${pin}`);
  }

  return res.status(200).json(payload);
}

async function handleVerify(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  const body = parseBody(req);
  const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
  const pin = typeof body.pin === "string" ? body.pin.trim() : "";
  if (!email || !email.includes("@") || !/^\d{6}$/.test(pin)) {
    return res.status(400).json({ ok: false, error: "Email and 6-digit code are required" });
  }

  const pending = pendingOtpByEmail.get(email);
  if (!pending) {
    return res.status(401).json({ ok: false, error: "No pending verification for this email. Request a new code." });
  }
  if (Date.now() > pending.expiresAt) {
    pendingOtpByEmail.delete(email);
    return res.status(401).json({ ok: false, error: "That code expired. Request a new one." });
  }
  if (pending.attempts >= MAX_ATTEMPTS) {
    pendingOtpByEmail.delete(email);
    return res.status(401).json({ ok: false, error: "Too many attempts. Request a new code." });
  }
  pending.attempts += 1;
  if (pending.pinHash !== hashPin(email, pin)) {
    return res.status(401).json({ ok: false, error: "Incorrect code. Try again." });
  }
  pendingOtpByEmail.delete(email);

  const visitorId = getOrCreateVisitorId(req, res);
  const member = upsertMember(email, {
    visitorId: pending.visitorId || visitorId,
    displayName: pending.displayName,
  });

  appendSetCookie(res, buildCookie("ak_member_token", member.accessToken, MEMBER_COOKIE_MAX_AGE));

  return res.status(200).json({
    ok: true,
    verified: true,
    claimedConversations: 0,
    hasChatHistory: false,
    hub: publicHub(member),
  });
}

async function handleHub(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ ok: false, error: "Method not allowed" });

  const token = getBearerOrCookieToken(req);
  if (!token) {
    return res.status(401).json({ ok: false, error: "Sign in required" });
  }

  const member = membersByToken.get(token);
  if (!member) {
    return res.status(401).json({ ok: false, error: "Invalid or expired session" });
  }

  return res.status(200).json({ ok: true, hub: publicHub(member) });
}

async function handleBriefs(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  const body = parseBody(req);
  getOrCreateVisitorId(req, res);

  const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
  const title = typeof body.title === "string" ? body.title.trim() : "Decision recommendation brief";
  const briefBody = typeof body.body === "string" ? body.body.trim() : "";
  if (!briefBody) {
    return res.status(400).json({ ok: false, error: "Brief body is required" });
  }

  // Only authenticated members (verified email + PIN / cookie session) — never
  // save a brief by email alone.
  const token = getBearerOrCookieToken(req);
  const member = token ? membersByToken.get(token) : undefined;
  if (!member) {
    return res.status(401).json({
      ok: false,
      needsVerification: true,
      error: email
        ? "Verify your email with the PIN we send before saving briefs to your Decision Hub."
        : "Create an account first so recommendation briefs can be saved to your Decision Hub.",
    });
  }

  const decisionMap =
    body.decisionMap && typeof body.decisionMap === "object" ? (body.decisionMap as Record<string, unknown>) : null;
  const score = typeof body.score === "number" ? body.score : null;
  const source = body.source === "recap" ? "recap" : "manual";

  const next: Brief = {
    id: `brief_${randomUUID()}`,
    title: title.slice(0, 160),
    body: briefBody.slice(0, 8000),
    source,
    score,
    createdAt: new Date().toISOString(),
    decisionMap,
  };

  const filtered = member.briefs.filter((item) => {
    if (item.title !== next.title) return true;
    const delta = Math.abs(new Date(next.createdAt).getTime() - new Date(item.createdAt).getTime());
    return delta > 2 * 60 * 1000;
  });
  member.briefs = [next, ...filtered].slice(0, 40);
  if (decisionMap) member.decisionMap = decisionMap;
  member.updatedAt = new Date().toISOString();

  return res.status(200).json({ ok: true, brief: next, hub: publicHub(member) });
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  const segments = req.query?.action ?? [];
  const action = segments[0] || "";

  try {
    switch (action) {
      case "claim":
        return await handleClaim(req, res);
      case "verify":
        return await handleVerify(req, res);
      case "hub":
        return await handleHub(req, res);
      case "briefs":
      case "brief":
        return await handleBriefs(req, res);
      default:
        return res.status(404).json({ ok: false, error: "Not found" });
    }
  } catch (err) {
    console.error(`Account API error (${action}):`, err);
    return res.status(500).json({ ok: false, error: "Internal server error" });
  }
}

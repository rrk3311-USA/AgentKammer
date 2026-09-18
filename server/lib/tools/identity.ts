import { createHmac, randomUUID, timingSafeEqual } from "crypto";
import { TOOLS_WALLET_COOKIE } from "@shared/tools";

export type ToolsMember = {
  id: string;
  email: string | null;
};

export type CookieAdapter = {
  get: (name: string) => string | undefined;
  set: (name: string, value: string, maxAgeSeconds: number) => void;
};

export function readCookieHeader(cookieHeader: string | undefined, name: string): string | undefined {
  if (!cookieHeader) return undefined;
  const match = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : undefined;
}

export function toolsWalletSecret(env: NodeJS.ProcessEnv = process.env): string {
  return (
    env.TOOLS_WALLET_SECRET ||
    env.ACCOUNT_SESSION_SECRET ||
    `${env.RESEND_API_KEY || ""}ak-tools-wallet-fallback`
  );
}

function sign(payload: unknown, secret: string): string {
  const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const sig = createHmac("sha256", secret).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function unsignCookie<T>(token: string | undefined | null, secret: string): T | null {
  if (!token) return null;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = createHmac("sha256", secret).update(body).digest("base64url");
  if (expected.length !== sig.length) return null;
  try {
    if (!timingSafeEqual(Buffer.from(expected), Buffer.from(sig))) return null;
  } catch {
    return null;
  }
  try {
    return JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as T;
  } catch {
    return null;
  }
}

type SignedMember = {
  id?: string;
  e?: string;
};

export function memberFromAccessToken(token: string | undefined, secret = toolsWalletSecret()): ToolsMember | null {
  if (!token) return null;
  if (token.includes(".")) {
    const payload = unsignCookie<SignedMember>(token, secret);
    if (!payload?.id && !payload?.e) return null;
    return {
      id: payload.id || `akm_${payload.e}`,
      email: payload.e || null,
    };
  }
  return null;
}

export function getOrCreateVisitorId(cookies: CookieAdapter): string {
  const existing = cookies.get("ak_visitor_id");
  if (existing && /^akv_[a-f0-9-]{36}$/i.test(existing)) return existing;
  const visitorId = `akv_${randomUUID()}`;
  cookies.set("ak_visitor_id", visitorId, 60 * 60 * 24 * 400);
  return visitorId;
}

export type CookieWalletSnapshot = {
  id: string;
  visitorId: string;
  memberId: string | null;
  email: string | null;
  credits: number;
  freeLivabilityUsed: boolean;
  ledger: Array<{
    id: string;
    type: string;
    credits: number;
    reason: string | null;
    stripeSessionId: string | null;
    runId: string | null;
    createdAt: string;
  }>;
  runs: Array<{
    id: string;
    toolSlug: string;
    status: string;
    address: string | null;
    listingUrl: string | null;
    imageCount: number;
    inputMetadata: string | null;
    resultJson: string | null;
    chargedCredits: number;
    errorMessage: string | null;
    createdAt: string;
    updatedAt: string;
  }>;
  payments: Array<{
    id: string;
    stripeSessionId: string | null;
    stripePaymentIntentId: string | null;
    amountCents: number;
    credits: number;
    status: string;
    createdAt: string;
  }>;
};

export function readWalletCookie(cookies: CookieAdapter, secret = toolsWalletSecret()): CookieWalletSnapshot | null {
  return unsignCookie<CookieWalletSnapshot>(cookies.get(TOOLS_WALLET_COOKIE), secret);
}

export function writeWalletCookie(
  cookies: CookieAdapter,
  snapshot: CookieWalletSnapshot,
  secret = toolsWalletSecret(),
) {
  const compact: CookieWalletSnapshot = {
    ...snapshot,
    ledger: snapshot.ledger.slice(0, 12),
    runs: snapshot.runs.slice(0, 4).map((run) => ({
      ...run,
      inputMetadata: run.inputMetadata ? run.inputMetadata.slice(0, 400) : null,
      resultJson: run.resultJson ? run.resultJson.slice(0, 2200) : null,
    })),
    payments: snapshot.payments.slice(0, 8),
  };
  cookies.set(TOOLS_WALLET_COOKIE, sign(compact, secret), 60 * 60 * 24 * 400);
}

export function emptyWalletSnapshot(visitorId: string, member?: ToolsMember | null): CookieWalletSnapshot {
  return {
    id: `tlw_${randomUUID()}`,
    visitorId,
    memberId: member?.id || null,
    email: member?.email || null,
    credits: 0,
    freeLivabilityUsed: false,
    ledger: [],
    runs: [],
    payments: [],
  };
}

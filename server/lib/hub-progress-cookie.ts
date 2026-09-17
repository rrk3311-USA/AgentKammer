import { createHmac, timingSafeEqual } from "crypto";
import {
  emptyHubPathProgress,
  type HubPathProgress,
  type QualifyRoute,
} from "../../shared/get-qualified";

export const HUB_PROGRESS_COOKIE = "ak_hub_progress";
const MAX_AGE = 60 * 60 * 24 * 400;

export type HubProgressCookie = {
  e: string;
  n?: string | null;
  gq: boolean;
  sb: boolean;
  ssh: boolean;
  qr?: QualifyRoute | null;
  at: string;
};

function secret() {
  return (
    process.env.ACCOUNT_SESSION_SECRET ||
    `${process.env.RESEND_API_KEY || ""}ak-account-fallback-secret`
  );
}

function sign(payload: unknown): string {
  const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const sig = createHmac("sha256", secret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function unsignProgress(token: string | undefined | null): HubProgressCookie | null {
  if (!token) return null;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = createHmac("sha256", secret()).update(body).digest("base64url");
  if (expected.length !== sig.length) return null;
  try {
    if (!timingSafeEqual(Buffer.from(expected), Buffer.from(sig))) return null;
  } catch {
    return null;
  }
  try {
    return JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as HubProgressCookie;
  } catch {
    return null;
  }
}

export function encodeHubProgressCookie(payload: HubProgressCookie): string {
  return sign(payload);
}

export function buildProgressCookieHeader(payload: HubProgressCookie): string {
  const parts = [
    `${HUB_PROGRESS_COOKIE}=${encodeURIComponent(encodeHubProgressCookie(payload))}`,
    "Path=/",
    `Max-Age=${MAX_AGE}`,
    "SameSite=Lax",
    "HttpOnly",
  ];
  if (process.env.NODE_ENV === "production") parts.push("Secure");
  return parts.join("; ");
}

export function progressFromCookie(payload: HubProgressCookie | null): HubPathProgress {
  if (!payload) return emptyHubPathProgress();
  return {
    getQualifiedComplete: Boolean(payload.gq),
    sessionBooked: Boolean(payload.sb),
    strategySessionHeld: Boolean(payload.ssh),
    qualifyRoute: payload.qr ?? null,
  };
}

export function mergeProgress(
  current: HubPathProgress,
  incoming: Partial<HubPathProgress>,
): HubPathProgress {
  return {
    getQualifiedComplete: incoming.getQualifiedComplete ?? current.getQualifiedComplete,
    sessionBooked: incoming.sessionBooked ?? current.sessionBooked,
    strategySessionHeld: incoming.strategySessionHeld ?? current.strategySessionHeld,
    qualifyRoute: incoming.qualifyRoute ?? current.qualifyRoute,
  };
}

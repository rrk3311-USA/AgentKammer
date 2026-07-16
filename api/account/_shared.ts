import { createHmac, randomInt, randomUUID, timingSafeEqual } from "crypto";
import nodemailer from "nodemailer";
import { Resend } from "resend";

// Shared helpers for the Decision Hub account (email + PIN) API routes.
// Filename is prefixed with `_` so Vercel does not turn this into its own
// Serverless Function — see https://vercel.com/docs/functions/configuring-functions/advanced-configuration
//
// DURABILITY NOTE: this project has no DATABASE_URL configured on Vercel, so
// claim/verify/hub/briefs are four independent Serverless Functions that
// cannot share in-memory state. Instead of an in-memory Map (which would
// silently break across cold starts *and* across functions), state is kept
// entirely in signed, httpOnly cookies (HMAC-SHA256 with ACCOUNT_SESSION_SECRET).
// The cookie payload IS the source of truth, so this works correctly across
// cold starts, scale-out, and regions. Trade-off: capped history (a handful
// of recent briefs) because of the ~4KB per-cookie limit — a real Postgres
// table (schema already defined in shared/schema.ts as `memberProfiles`)
// would remove that cap if DATABASE_URL is ever wired up.

export type ApiRequest = {
  method?: string;
  headers: { cookie?: string; authorization?: string };
  body?: unknown;
};

export type ApiResponse = {
  setHeader: (name: string, value: string | string[]) => void;
  getHeader: (name: string) => string | number | string[] | undefined;
  status: (code: number) => { json: (body: unknown) => void };
};

export type Brief = {
  id: string;
  t: string; // title
  b: string; // body
  src: string; // source
  sc: number | null; // score
  ca: string; // createdAt (iso)
};

export type DecisionMap = {
  situation?: string | null;
  desire?: string | null;
  constraints?: string | null;
  tradeOff?: string | null;
  recommendation?: string | null;
  missing?: string[];
};

export type MemberPayload = {
  id: string;
  e: string; // email
  dn: string | null; // displayName
  g: string | null; // goals
  vi: string | null; // vision
  pr: string | null; // priorities
  ps: string; // progressStage
  dm: DecisionMap | null;
  br: Brief[];
  vc: number; // visitorCount
  ca: string; // createdAt
  ua: string; // updatedAt
};

export type PendingOtpPayload = {
  e: string; // email
  h: string; // pin hash
  v: string | null; // visitorId
  a: string | null; // assistantSessionId
  s: string | null; // signalSessionId
  d: string | null; // displayName
  at: number; // attempts
  exp: number; // expires at (ms epoch)
};

export const PIN_TTL_SECONDS = 15 * 60;
export const MAX_ATTEMPTS = 5;
export const RESEND_COOLDOWN_SECONDS = 45;
export const VISITOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 400;
export const MEMBER_COOKIE_MAX_AGE = 60 * 60 * 24 * 400;

export const MAX_BRIEFS = 3;
const BRIEF_TITLE_MAX = 80;
const BRIEF_BODY_MAX = 220;
const TEXT_FIELD_MAX = 200;
const DECISION_MAP_FIELD_MAX = 100;

const FROM_ADDRESS = process.env.ACCOUNT_EMAIL_FROM || "Agent Kammer <onboarding@resend.dev>";

function getSecret() {
  return (
    process.env.ACCOUNT_SESSION_SECRET ||
    // Fall back so the flow degrades gracefully instead of 500ing if the
    // dedicated secret is ever missing — still HMAC-signed, just with a
    // weaker, shared key. Set ACCOUNT_SESSION_SECRET in Vercel for real use.
    `${process.env.RESEND_API_KEY || ""}ak-account-fallback-secret`
  );
}

function sign(payload: unknown): string {
  const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const sig = createHmac("sha256", getSecret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function unsign<T>(token: string | undefined | null): T | null {
  if (!token) return null;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = createHmac("sha256", getSecret()).update(body).digest("base64url");
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

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function hashPin(email: string, pin: string) {
  return createHmac("sha256", getSecret()).update(`${normalizeEmail(email)}:${pin}`).digest("hex");
}

export function generatePin() {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

export function newId(prefix: string) {
  return `${prefix}_${randomUUID()}`;
}

export function readCookie(cookieHeader: string | undefined, name: string) {
  if (!cookieHeader) return undefined;
  const match = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : undefined;
}

function buildCookie(name: string, value: string, maxAgeSeconds: number, httpOnly = true) {
  const parts = [`${name}=${encodeURIComponent(value)}`, "Path=/", `Max-Age=${Math.max(0, maxAgeSeconds)}`, "SameSite=Lax"];
  if (httpOnly) parts.push("HttpOnly");
  if (process.env.NODE_ENV === "production") parts.push("Secure");
  return parts.join("; ");
}

export function appendSetCookie(res: ApiResponse, cookie: string) {
  const existing = res.getHeader("Set-Cookie");
  if (!existing) {
    res.setHeader("Set-Cookie", cookie);
  } else if (Array.isArray(existing)) {
    res.setHeader("Set-Cookie", [...existing, cookie]);
  } else {
    res.setHeader("Set-Cookie", [String(existing), cookie]);
  }
}

export function setPendingOtpCookie(res: ApiResponse, payload: PendingOtpPayload) {
  appendSetCookie(res, buildCookie("ak_pending_otp", sign(payload), PIN_TTL_SECONDS));
}

export function clearPendingOtpCookie(res: ApiResponse) {
  appendSetCookie(res, buildCookie("ak_pending_otp", "", 0));
}

export function getPendingOtp(req: ApiRequest): PendingOtpPayload | null {
  return unsign<PendingOtpPayload>(readCookie(req.headers.cookie, "ak_pending_otp"));
}

export function setCooldownCookie(res: ApiResponse, nowMs: number) {
  appendSetCookie(res, buildCookie("ak_otp_cooldown", String(nowMs), RESEND_COOLDOWN_SECONDS));
}

export function getCooldownWaitMs(req: ApiRequest, nowMs: number): number {
  const raw = readCookie(req.headers.cookie, "ak_otp_cooldown");
  const lastSend = raw ? Number(raw) : 0;
  if (!lastSend || Number.isNaN(lastSend)) return 0;
  return Math.max(0, RESEND_COOLDOWN_SECONDS * 1000 - (nowMs - lastSend));
}

export function getOrCreateVisitorId(req: ApiRequest, res: ApiResponse) {
  const existing = readCookie(req.headers.cookie, "ak_visitor_id");
  if (existing && /^akv_[a-f0-9-]{36}$/i.test(existing)) return existing;
  const visitorId = newId("akv");
  appendSetCookie(res, buildCookie("ak_visitor_id", visitorId, VISITOR_COOKIE_MAX_AGE));
  return visitorId;
}

function truncate(value: string, max: number) {
  return value.length > max ? value.slice(0, max) : value;
}

export function capDecisionMap(input: unknown): DecisionMap | null {
  if (!input || typeof input !== "object") return null;
  const src = input as Record<string, unknown>;
  const map: DecisionMap = {};
  for (const key of ["situation", "desire", "constraints", "tradeOff", "recommendation"] as const) {
    const value = src[key];
    if (typeof value === "string" && value.trim()) map[key] = truncate(value.trim(), DECISION_MAP_FIELD_MAX);
  }
  if (Array.isArray(src.missing)) {
    map.missing = src.missing.filter((v): v is string => typeof v === "string").slice(0, 5).map((v) => truncate(v, 40));
  }
  return Object.keys(map).length ? map : null;
}

export function getMemberFromRequest(req: ApiRequest): MemberPayload | null {
  const header = req.headers.authorization || "";
  const bearer = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  const cookieToken = readCookie(req.headers.cookie, "ak_member_token");
  return unsign<MemberPayload>(bearer || cookieToken);
}

/** Trims the briefs array further if the signed cookie would exceed a safe size. */
function fitMemberPayload(payload: MemberPayload): MemberPayload {
  let candidate = payload;
  while (sign(candidate).length > 3600 && candidate.br.length > 0) {
    candidate = { ...candidate, br: candidate.br.slice(0, candidate.br.length - 1) };
  }
  return candidate;
}

export function setMemberCookie(res: ApiResponse, payload: MemberPayload) {
  appendSetCookie(res, buildCookie("ak_member_token", sign(fitMemberPayload(payload)), MEMBER_COOKIE_MAX_AGE));
}

export function createOrMergeMember(
  email: string,
  existing: MemberPayload | null,
  input: { visitorId?: string | null; displayName?: string | null },
): MemberPayload {
  const now = new Date().toISOString();
  if (existing && existing.e === email) {
    return {
      ...existing,
      dn: existing.dn || input.displayName || null,
      vc: existing.vc + (input.visitorId ? 1 : 0),
      ua: now,
    };
  }
  return {
    id: newId("akm"),
    e: email,
    dn: input.displayName || "Decision Hub Member",
    g: null,
    vi: null,
    pr: null,
    ps: "exploring",
    dm: null,
    br: [],
    vc: input.visitorId ? 1 : 0,
    ca: now,
    ua: now,
  };
}

export function appendBrief(
  member: MemberPayload,
  input: { title: string; body: string; source: string; score: number | null; decisionMap: DecisionMap | null },
): { member: MemberPayload; brief: Brief } {
  const brief: Brief = {
    id: newId("brief"),
    t: truncate(input.title, BRIEF_TITLE_MAX),
    b: truncate(input.body, BRIEF_BODY_MAX),
    src: input.source,
    sc: input.score,
    ca: new Date().toISOString(),
  };

  const filtered = member.br.filter((item) => {
    if (item.t !== brief.t) return true;
    const delta = Math.abs(new Date(brief.ca).getTime() - new Date(item.ca).getTime());
    return delta > 2 * 60 * 1000;
  });

  const nextMember: MemberPayload = {
    ...member,
    br: [brief, ...filtered].slice(0, MAX_BRIEFS),
    dm: input.decisionMap || member.dm,
    ua: brief.ca,
  };

  return { member: nextMember, brief };
}

export function publicHub(member: MemberPayload) {
  return {
    id: member.id,
    email: member.e,
    displayName: member.dn,
    goals: member.g,
    vision: member.vi,
    priorities: member.pr,
    progressStage: member.ps,
    decisionMap: member.dm,
    briefs: member.br.map((b) => ({ id: b.id, title: b.t, body: b.b, source: b.src, score: b.sc, createdAt: b.ca })),
    conversationCount: 0,
    visitorCount: member.vc,
    updatedAt: member.ua,
  };
}

export function parseBody(req: ApiRequest): Record<string, unknown> {
  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body;
  return body && typeof body === "object" ? (body as Record<string, unknown>) : {};
}

export async function sendPinEmail(email: string, pin: string) {
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

export function truncateText(value: string) {
  return truncate(value, TEXT_FIELD_MAX);
}

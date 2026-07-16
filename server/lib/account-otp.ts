import { createHash, randomInt } from "crypto";

export type PendingAccountSave = {
  email: string;
  pinHash: string;
  visitorId: string | null;
  assistantSessionId: string | null;
  signalSessionId: string | null;
  displayName: string | null;
  attempts: number;
  createdAt: number;
  expiresAt: number;
};

const PIN_TTL_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const RESEND_COOLDOWN_MS = 45 * 1000;

const pendingByEmail = new Map<string, PendingAccountSave>();
const lastSendByEmail = new Map<string, number>();

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function hashPin(email: string, pin: string) {
  return createHash("sha256").update(`${normalizeEmail(email)}:${pin}`).digest("hex");
}

export function generateAccountPin() {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

export function canSendAccountPin(email: string) {
  const key = normalizeEmail(email);
  const last = lastSendByEmail.get(key) || 0;
  const waitMs = RESEND_COOLDOWN_MS - (Date.now() - last);
  return waitMs <= 0 ? { ok: true as const } : { ok: false as const, waitMs };
}

export function storeAccountPin(input: {
  email: string;
  pin: string;
  visitorId?: string | null;
  assistantSessionId?: string | null;
  signalSessionId?: string | null;
  displayName?: string | null;
}) {
  const email = normalizeEmail(input.email);
  const now = Date.now();
  pendingByEmail.set(email, {
    email,
    pinHash: hashPin(email, input.pin),
    visitorId: input.visitorId || null,
    assistantSessionId: input.assistantSessionId || null,
    signalSessionId: input.signalSessionId || null,
    displayName: input.displayName || null,
    attempts: 0,
    createdAt: now,
    expiresAt: now + PIN_TTL_MS,
  });
  lastSendByEmail.set(email, now);
  return pendingByEmail.get(email)!;
}

export function verifyAccountPin(email: string, pin: string) {
  const key = normalizeEmail(email);
  const pending = pendingByEmail.get(key);
  if (!pending) {
    return { ok: false as const, error: "No pending verification for this email. Request a new code." };
  }
  if (Date.now() > pending.expiresAt) {
    pendingByEmail.delete(key);
    return { ok: false as const, error: "That code expired. Request a new one." };
  }
  if (pending.attempts >= MAX_ATTEMPTS) {
    pendingByEmail.delete(key);
    return { ok: false as const, error: "Too many attempts. Request a new code." };
  }
  pending.attempts += 1;
  if (pending.pinHash !== hashPin(key, pin.trim())) {
    return { ok: false as const, error: "Incorrect code. Try again." };
  }
  pendingByEmail.delete(key);
  return { ok: true as const, pending };
}

export function clearAccountPin(email: string) {
  pendingByEmail.delete(normalizeEmail(email));
}

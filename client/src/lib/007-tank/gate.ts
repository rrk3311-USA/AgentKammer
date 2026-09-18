export const PIN_HASH_KEY = "ak.007.pin.sha256";
export const GATE_STORE_KEY = "ak.007.gate";

const PIN_PATTERN = /^\d{4,8}$/;

export function isValidPin(pin: string): boolean {
  return PIN_PATTERN.test(pin.trim());
}

export async function hashPin(pin: string): Promise<string> {
  const bytes = new TextEncoder().encode(pin.trim());
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function hasCommanderPin(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean(window.localStorage.getItem(PIN_HASH_KEY));
}

export function isGateOpen(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(GATE_STORE_KEY) === "open";
}

export async function setCommanderPin(pin: string, confirm: string): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isValidPin(pin) || pin !== confirm) {
    return { ok: false, error: "Use 4–8 digits and match confirmation." };
  }
  window.localStorage.setItem(PIN_HASH_KEY, await hashPin(pin));
  window.sessionStorage.setItem(GATE_STORE_KEY, "open");
  return { ok: true };
}

export async function tryUnlockPin(pin: string): Promise<boolean> {
  const stored = window.localStorage.getItem(PIN_HASH_KEY);
  if (!stored || !isValidPin(pin)) return false;
  const ok = (await hashPin(pin)) === stored;
  if (ok) window.sessionStorage.setItem(GATE_STORE_KEY, "open");
  return ok;
}

export function lockGate() {
  window.sessionStorage.removeItem(GATE_STORE_KEY);
}

export function clearCommanderPin() {
  window.localStorage.removeItem(PIN_HASH_KEY);
  window.sessionStorage.removeItem(GATE_STORE_KEY);
}

export function tankSharePath(): string {
  return "/internal/007";
}

export const GATE_STORE_KEY = "ak.007.gate";
/** Internal passphrase. Not a public product. Documented in the 007 tank spec. */
export const GATE_PHRASE = "dapper-analyst";

export function isGateOpen(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(GATE_STORE_KEY) === "open";
}

export function tryUnlock(phrase: string): boolean {
  const ok = phrase.trim().toLowerCase() === GATE_PHRASE;
  if (ok) window.sessionStorage.setItem(GATE_STORE_KEY, "open");
  return ok;
}

export function lockGate() {
  window.sessionStorage.removeItem(GATE_STORE_KEY);
}

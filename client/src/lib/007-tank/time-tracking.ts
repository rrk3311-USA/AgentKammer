export const TIME_STORE_KEY = "ak.007.time";
export const IDLE_MS = 60_000;
export const HEARTBEAT_MS = 1_000;

export type DayTimeTotals = {
  /** Tab is visible (HUD in the foreground). */
  hudVisibleMs: number;
  /** HUD visible and recent input in this tab (not idle). */
  laptopActiveMs: number;
};

export type TimeStore = {
  consent: boolean;
  days: Record<string, DayTimeTotals>;
};

export function emptyDay(): DayTimeTotals {
  return { hudVisibleMs: 0, laptopActiveMs: 0 };
}

export function emptyTimeStore(): TimeStore {
  return { consent: false, days: {} };
}

export function localDayKey(now = new Date(), timeZone = "America/New_York"): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function isIdle(lastInputAt: number, now: number, idleMs = IDLE_MS): boolean {
  return now - lastInputAt >= idleMs;
}

export type TickInput = {
  consent: boolean;
  visible: boolean;
  idle: boolean;
  dtMs: number;
  day: DayTimeTotals;
};

/** Consentful in-app tick. Hidden tabs and idle windows do not count as laptop-active. */
export function applyTick({ consent, visible, idle, dtMs, day }: TickInput): DayTimeTotals {
  if (!consent || dtMs <= 0) return day;
  const next = { ...day };
  if (visible) {
    next.hudVisibleMs += dtMs;
    if (!idle) next.laptopActiveMs += dtMs;
  }
  return next;
}

export function formatDuration(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${h}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
  return `${m}m ${String(s).padStart(2, "0")}s`;
}

export function loadTimeStore(): TimeStore {
  if (typeof window === "undefined") return emptyTimeStore();
  try {
    const raw = window.localStorage.getItem(TIME_STORE_KEY);
    if (!raw) return emptyTimeStore();
    const parsed = JSON.parse(raw) as TimeStore;
    if (typeof parsed !== "object" || parsed == null) return emptyTimeStore();
    return {
      consent: Boolean(parsed.consent),
      days: parsed.days && typeof parsed.days === "object" ? parsed.days : {},
    };
  } catch {
    return emptyTimeStore();
  }
}

export function saveTimeStore(store: TimeStore) {
  window.localStorage.setItem(TIME_STORE_KEY, JSON.stringify(store));
}

export function setConsent(consent: boolean): TimeStore {
  const store = loadTimeStore();
  const next = { ...store, consent };
  saveTimeStore(next);
  return next;
}

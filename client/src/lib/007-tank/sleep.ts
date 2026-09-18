export const SLEEP_STORE_KEY = "ak.007.sleep";

export const SLEEP_QUALITIES = ["", "thin", "ok", "deep"] as const;
export type SleepQuality = (typeof SLEEP_QUALITIES)[number];

export type SleepNight = {
  id: string;
  /** Local datetime-local value (commander's clock). */
  bedAt: string;
  wakeAt: string;
  quality: SleepQuality;
  note: string;
  loggedAt: string;
};

export type SleepStore = {
  nights: SleepNight[];
};

export const QUALITY_LABEL: Record<Exclude<SleepQuality, "">, string> = {
  thin: "Thin",
  ok: "Steady",
  deep: "Deep",
};

export function emptySleepStore(): SleepStore {
  return { nights: [] };
}

export function durationMs(bedAt: string, wakeAt: string): number | null {
  const bed = new Date(bedAt).getTime();
  const wake = new Date(wakeAt).getTime();
  if (!Number.isFinite(bed) || !Number.isFinite(wake) || wake <= bed) return null;
  return wake - bed;
}

export function formatSleepDuration(ms: number): string {
  const totalMin = Math.round(ms / 60_000);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return `${h}h ${String(m).padStart(2, "0")}m`;
}

export function isValidNight(input: Pick<SleepNight, "bedAt" | "wakeAt">): boolean {
  return durationMs(input.bedAt, input.wakeAt) != null;
}

export function createNight(input: Omit<SleepNight, "id" | "loggedAt">, now = new Date().toISOString()): SleepNight {
  return {
    id: `s_${Math.random().toString(36).slice(2, 10)}`,
    bedAt: input.bedAt,
    wakeAt: input.wakeAt,
    quality: input.quality,
    note: input.note.trim(),
    loggedAt: now,
  };
}

export function loadSleepStore(): SleepStore {
  if (typeof window === "undefined") return emptySleepStore();
  try {
    const raw = window.localStorage.getItem(SLEEP_STORE_KEY);
    if (!raw) return emptySleepStore();
    const parsed = JSON.parse(raw) as SleepStore;
    if (!parsed || !Array.isArray(parsed.nights)) return emptySleepStore();
    return { nights: parsed.nights };
  } catch {
    return emptySleepStore();
  }
}

export function saveSleepStore(store: SleepStore) {
  window.localStorage.setItem(SLEEP_STORE_KEY, JSON.stringify(store));
}

export function addNight(store: SleepStore, night: SleepNight): SleepStore {
  return { nights: [night, ...store.nights].slice(0, 60) };
}

export function removeNight(store: SleepStore, id: string): SleepStore {
  return { nights: store.nights.filter((n) => n.id !== id) };
}

export function formatClock(localValue: string): string {
  const d = new Date(localValue);
  if (!Number.isFinite(d.getTime())) return localValue;
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
}

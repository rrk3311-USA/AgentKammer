import { randomUUID } from "crypto";
import type { MarketingSignal } from "./admin-intelligence";

/**
 * Lightweight marketing signal store.
 * Persists in memory for local/MemStorage; when DATABASE_URL is later wired
 * for lead_signal_events, swap implementation without changing the API.
 */
class SignalStore {
  private signals: MarketingSignal[] = [];
  private max = 5000;

  add(input: {
    type: string;
    source?: string | null;
    path?: string | null;
    referrer?: string | null;
    sessionId?: string | null;
    visitorId?: string | null;
    detail?: string | null;
  }): MarketingSignal {
    const signal: MarketingSignal = {
      id: randomUUID(),
      type: input.type,
      source: input.source ?? null,
      path: input.path ?? null,
      referrer: input.referrer ?? null,
      sessionId: input.sessionId ?? null,
      visitorId: input.visitorId ?? null,
      detail: input.detail ?? null,
      createdAt: new Date(),
    };
    this.signals.unshift(signal);
    if (this.signals.length > this.max) {
      this.signals.length = this.max;
    }
    return signal;
  }

  list(limit = 200): MarketingSignal[] {
    return this.signals.slice(0, limit);
  }

  all(): MarketingSignal[] {
    return this.signals;
  }

  clear() {
    this.signals = [];
  }
}

export const signalStore = new SignalStore();

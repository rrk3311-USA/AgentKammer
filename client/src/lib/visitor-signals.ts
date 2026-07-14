/**
 * Lightweight visitor signal beacon for marketing funnel + strategy scoring.
 * Business truth stays in CRM tables; this feeds /api/signals (and later PostHog).
 */

const SESSION_KEY = "ak_visitor_session";
const VISIT_COUNT_KEY = "ak_visit_count";

function getOrCreateSessionId(): string {
  try {
    let id = window.sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `s_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      window.sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return `s_${Date.now()}`;
  }
}

function detectSource(referrer: string): string {
  const r = referrer.toLowerCase();
  if (!r) return "direct";
  if (/instagram|linkedin|twitter|t\.co|facebook|tiktok|youtube|reddit|threads/.test(r)) {
    return "social";
  }
  if (/google|bing|duckduckgo|yahoo/.test(r)) return "organic";
  try {
    const host = new URL(referrer).hostname;
    if (host && !host.includes(window.location.hostname)) return "referral";
  } catch {
    /* ignore */
  }
  return "other";
}

export function trackVisitorSignal(
  type: string,
  detail?: string | null,
  extra?: { path?: string; source?: string },
) {
  if (typeof window === "undefined") return;

  const sessionId = getOrCreateSessionId();
  const referrer = document.referrer || null;
  const source = extra?.source || detectSource(referrer || "");
  const path = extra?.path || `${window.location.pathname}${window.location.search}`;

  const payload = {
    type,
    source,
    path,
    referrer,
    sessionId,
    visitorId: sessionId,
    detail: detail ?? null,
  };

  // Prefer sendBeacon for unload-safe delivery
  try {
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      const ok = navigator.sendBeacon("/api/signals", blob);
      if (ok) return;
    }
  } catch {
    /* fall through */
  }

  void fetch("/api/signals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    /* non-blocking */
  });
}

/** Call once per SPA session bootstrap + on route changes. */
export function initVisitorSignalTracking(path: string) {
  if (typeof window === "undefined") return;

  let visitCount = 1;
  try {
    visitCount = Number(window.localStorage.getItem(VISIT_COUNT_KEY) || "0") + 1;
    window.localStorage.setItem(VISIT_COUNT_KEY, String(visitCount));
  } catch {
    /* ignore */
  }

  if (visitCount > 1) {
    trackVisitorSignal("returning_visit", `visit #${visitCount}`, { path });
  }

  const source = detectSource(document.referrer || "");
  if (source === "social") {
    trackVisitorSignal("social_referral", document.referrer, { path, source });
  } else if (source === "organic") {
    trackVisitorSignal("organic_referral", document.referrer, { path, source });
  } else if (source === "direct") {
    trackVisitorSignal("direct", null, { path, source });
  }

  trackVisitorSignal("page_view", null, { path, source });
}

export function trackPageViewSignal(path: string) {
  trackVisitorSignal("page_view", null, { path });
}

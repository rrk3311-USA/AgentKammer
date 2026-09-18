export const PRICE_BANDS = ["5-10", "10-15", "15-20"] as const;
export type PriceBand = (typeof PRICE_BANDS)[number];

export const SELECTION_STATUSES = [
  "on_sale",
  "reserved_pinned",
  "pending",
  "escrow",
  "price_drop",
  "sold",
] as const;
export type SelectionStatus = (typeof SELECTION_STATUSES)[number];

export const REPORT_STATUSES = ["queued", "draft", "ready", "published", "held"] as const;
export type ReportStatus = (typeof REPORT_STATUSES)[number];

/** Live public drop cap — Selected on-sale picks only. */
export const MAX_ON_SALE = 5;
export const MIN_ON_SALE = 3;

export const PRIMARY_PUBLISH_BANDS: PriceBand[] = ["5-10", "10-15"];
export const TROPHY_BAND: PriceBand = "15-20";

export const CURATION_UNIVERSE = {
  borough: "Manhattan",
  propertyType: "condo",
  listingType: "sale",
  researchAsk: "$5–20M",
  primaryPublish: "$5–15M",
  trophyOnly: "$15–20M",
} as const;

export function isPriceBand(value: string): value is PriceBand {
  return (PRICE_BANDS as readonly string[]).includes(value);
}

export function isSelectionStatus(value: string): value is SelectionStatus {
  return (SELECTION_STATUSES as readonly string[]).includes(value);
}

export function isReportStatus(value: string): value is ReportStatus {
  return (REPORT_STATUSES as readonly string[]).includes(value);
}

export function bandLabel(band: string): string {
  if (band === "5-10") return "$5–10M";
  if (band === "10-15") return "$10–15M";
  if (band === "15-20") return "$15–20M · trophy";
  return band;
}

export function statusLabel(status: string): string {
  const labels: Record<string, string> = {
    on_sale: "On sale",
    reserved_pinned: "Reserved / pinned",
    pending: "Pending",
    escrow: "Escrow",
    price_drop: "Price drop",
    sold: "Sold",
  };
  return labels[status] || status;
}

/** Reject rentals. v1 operators paste sale listings only. */
export function looksLikeRentalUrl(url: string): boolean {
  const u = url.toLowerCase();
  return (
    u.includes("/rental") ||
    u.includes("/rentals") ||
    u.includes("for-rent") ||
    u.includes("for_rent") ||
    /[?&]type=rent/.test(u)
  );
}

export function isHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

/** Most recent 1st or 15th in UTC (Suggested cadence). */
export function currentCurationPeriod(now = new Date()): Date {
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();
  const day = now.getUTCDate();
  if (day >= 15) return new Date(Date.UTC(year, month, 15));
  return new Date(Date.UTC(year, month, 1));
}

export function nextCurationPeriod(now = new Date()): Date {
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();
  const day = now.getUTCDate();
  if (day < 15) return new Date(Date.UTC(year, month, 15));
  return new Date(Date.UTC(year, month + 1, 1));
}

export function periodKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function parsePeriodDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || (day !== 1 && day !== 15)) return null;
  return new Date(Date.UTC(year, month - 1, day));
}

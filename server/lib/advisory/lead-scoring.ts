import {
  type ClientProfile,
  type LeadScoreBreakdown,
  type LifecycleStage,
  lifecycleFromLeadScore,
  mergeLifecycleStage,
} from "@shared/client-profile";

export type ScoringContext = {
  visitCount?: number;
  messageCount?: number;
  assessmentCompleted?: boolean;
  goalSaved?: boolean;
  callRequested?: boolean;
  latestMessage?: string;
  hasSpamSignals?: boolean;
  hasVendorSolicitation?: boolean;
  hasFakeContact?: boolean;
};

const LIFE_EVENT_TERMS = [
  "relocat",
  "purchase",
  "buy",
  "sale",
  "sell",
  "renovat",
  "financ",
  "mortgage",
  "inherit",
  "divorce",
  "downsizi",
  "invest",
  "pre-approv",
  "preapprov",
];

const SPAM_TERMS = ["seo service", "backlink", "guest post", "crypto airdrop", "nigerian prince"];
const VENDOR_TERMS = ["we offer lead gen", "buy our list", "partnership opportunity for your brokerage"];

function textBlob(profile: Partial<ClientProfile>, latestMessage?: string): string {
  return [
    profile.situation,
    profile.desiredOutcome,
    profile.timeline,
    profile.currentHousing,
    profile.budgetRange,
    latestMessage,
    ...(profile.constraints ?? []),
    ...(profile.tradeOffs ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function filledCount(profile: Partial<ClientProfile>): number {
  const scalars = [
    profile.situation,
    profile.desiredOutcome,
    profile.currentHousing,
    profile.currentLocation,
    profile.budgetRange,
    profile.timeline,
    profile.financingStatus,
    profile.creditReadiness,
    profile.downPaymentReadiness,
    profile.nextRecommendedAction,
  ];
  const arrays = [
    profile.targetLocations,
    profile.propertyTypes,
    profile.decisionMakers,
    profile.constraints,
    profile.tradeOffs,
    profile.dealBreakers,
  ];
  let n = scalars.filter((v) => typeof v === "string" && v.trim()).length;
  n += arrays.filter((a) => Array.isArray(a) && a.length > 0).length;
  return n;
}

export function detectNegativeSignals(
  profile: Partial<ClientProfile>,
  ctx: ScoringContext = {},
): { spam: boolean; vendor: boolean; fakeContact: boolean; oneWord: boolean } {
  const blob = textBlob(profile, ctx.latestMessage);
  const spam =
    Boolean(ctx.hasSpamSignals) || SPAM_TERMS.some((t) => blob.includes(t));
  const vendor =
    Boolean(ctx.hasVendorSolicitation) || VENDOR_TERMS.some((t) => blob.includes(t));
  const email = profile.email?.toLowerCase() ?? "";
  const fakeContact =
    Boolean(ctx.hasFakeContact) ||
    email.endsWith("@example.com") ||
    email.endsWith("@test.com") ||
    email === "asdf@asdf.com" ||
    (profile.phone != null && /^0{7,}$/.test(profile.phone.replace(/\D/g, "")));
  const oneWord =
    Boolean(ctx.latestMessage) &&
    ctx.latestMessage!.trim().split(/\s+/).length <= 1 &&
    (ctx.messageCount ?? 1) <= 1;
  return { spam, vendor, fakeContact, oneWord };
}

export function scoreClientProfile(
  profile: Partial<ClientProfile>,
  ctx: ScoringContext = {},
): LeadScoreBreakdown {
  const blob = textBlob(profile, ctx.latestMessage);
  const negatives = detectNegativeSignals(profile, ctx);

  let engagementScore = 0;
  if ((ctx.messageCount ?? 0) >= 1) engagementScore += 6;
  if ((ctx.messageCount ?? 0) >= 3) engagementScore += 8;
  if ((ctx.messageCount ?? 0) >= 6) engagementScore += 6;
  if ((ctx.visitCount ?? 1) >= 2) engagementScore += 8;
  if ((ctx.visitCount ?? 1) >= 4) engagementScore += 6;
  if (ctx.assessmentCompleted) engagementScore += 12;
  if (ctx.goalSaved) engagementScore += 8;
  if (profile.nextRecommendedAction) engagementScore += 6;
  engagementScore = clamp(engagementScore, 0, 30);

  const fields = filledCount(profile);
  let profileCompletenessScore = clamp(fields * 2.5, 0, 25);
  if (profile.situation && profile.desiredOutcome) profileCompletenessScore = Math.min(25, profileCompletenessScore + 3);

  let urgencyScore = 0;
  const timeline = (profile.timeline ?? "").toLowerCase();
  if (timeline.includes("now") || timeline.includes("immediate") || timeline.includes("asap")) urgencyScore += 18;
  else if (timeline.includes("1-3") || timeline.includes("30 day") || timeline.includes("this month")) urgencyScore += 16;
  else if (timeline.includes("3-6") || timeline.includes("under six") || timeline.includes("6 month")) urgencyScore += 12;
  else if (timeline.includes("6-12") || timeline.includes("year")) urgencyScore += 7;
  else if (timeline.trim()) urgencyScore += 4;
  if (LIFE_EVENT_TERMS.some((t) => blob.includes(t))) urgencyScore += 6;
  if (ctx.callRequested) urgencyScore += 8;
  urgencyScore = clamp(urgencyScore, 0, 20);

  let fitScore = 0;
  if (profile.situation && profile.situation.length > 20) fitScore += 6;
  if ((profile.targetLocations?.length ?? 0) > 0 || profile.currentLocation) fitScore += 5;
  if (profile.budgetRange) fitScore += 3;
  if (profile.financingStatus) fitScore += 3;
  if (LIFE_EVENT_TERMS.some((t) => blob.includes(t))) fitScore += 4;
  if (blob.includes("strategy") || blob.includes("ongoing") || blob.includes("advisory") || blob.includes("quarterly")) {
    fitScore += 4;
  }
  if (!blob.includes("real estate") && !profile.situation && !LIFE_EVENT_TERMS.some((t) => blob.includes(t))) {
    fitScore -= 4;
  }
  fitScore = clamp(fitScore, 0, 15);

  let contactabilityScore = 0;
  if (profile.email) contactabilityScore += 8;
  if (profile.phone) contactabilityScore += 6;
  if (ctx.callRequested) contactabilityScore += 4;
  contactabilityScore = clamp(contactabilityScore, 0, 15);

  let penalties = 0;
  if (negatives.spam) penalties += 40;
  if (negatives.vendor) penalties += 35;
  if (negatives.fakeContact) penalties += 25;
  if (negatives.oneWord) penalties += 10;

  const raw =
    engagementScore +
    profileCompletenessScore +
    urgencyScore +
    fitScore +
    contactabilityScore -
    penalties;

  const leadScore = clamp(Math.round(raw), 0, 100);

  return {
    engagementScore,
    profileCompletenessScore,
    urgencyScore,
    fitScore,
    contactabilityScore,
    penalties,
    leadScore,
  };
}

export function deriveLifecycle(
  profile: Partial<ClientProfile>,
  score: number,
  opts: { callRequested?: boolean; forced?: LifecycleStage } = {},
): LifecycleStage {
  if (opts.forced) return opts.forced;
  let derived = lifecycleFromLeadScore(score);
  if (opts.callRequested && score >= 45) derived = "call_ready";
  if (profile.email && score >= 65 && derived !== "call_ready") {
    derived = score >= 80 ? "call_ready" : "qualified";
  }
  return mergeLifecycleStage(profile.lifecycleStage, derived, opts.forced);
}

export function shouldSyncOnScoreChange(previous?: number | null, next?: number | null): boolean {
  if (next == null) return false;
  if (previous == null) return next >= 25;
  return Math.abs(next - previous) >= 8;
}

export function timelineIsUnderSixMonths(timeline?: string | null): boolean {
  if (!timeline) return false;
  const t = timeline.toLowerCase();
  return (
    t.includes("now") ||
    t.includes("asap") ||
    t.includes("immediate") ||
    t.includes("1-3") ||
    t.includes("3-6") ||
    t.includes("under six") ||
    t.includes("this month") ||
    t.includes("30 day") ||
    t.includes("60 day") ||
    t.includes("90 day")
  );
}

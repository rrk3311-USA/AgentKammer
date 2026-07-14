/**
 * Agent Kammer CRM pipeline + strategy lead scoring.
 *
 * Identity ladder (do not collapse into one table):
 *   visitor → contact → lead → opportunity → client
 *
 * Pipeline stages power the admin opening screen.
 */

export const PIPELINE_STAGES = [
  "new_signals",
  "engaged",
  "profiled",
  "qualified",
  "call_ready",
  "active",
] as const;

export type PipelineStage = (typeof PIPELINE_STAGES)[number];

export const PIPELINE_STAGE_LABELS: Record<PipelineStage, string> = {
  new_signals: "New Signals",
  engaged: "Engaged",
  profiled: "Profiled",
  qualified: "Qualified",
  call_ready: "Call Ready",
  active: "Active",
};

export const FUNNEL_STEPS = [
  "source",
  "page",
  "conversation",
  "report",
  "email",
  "call",
  "client",
] as const;

export type FunnelStep = (typeof FUNNEL_STEPS)[number];

export const FUNNEL_STEP_LABELS: Record<FunnelStep, string> = {
  source: "Source",
  page: "Page",
  conversation: "Conversation",
  report: "Report",
  email: "Email",
  call: "Call",
  client: "Client",
};

/** Strategy-weighted signal types (not vanity traffic). */
export const SIGNAL_TYPES = [
  "page_view",
  "social_referral",
  "organic_referral",
  "direct",
  "decision_guide_open",
  "decision_guide_message",
  "profile_fact",
  "report_view",
  "building_view",
  "email_capture",
  "phone_capture",
  "contact_submit",
  "call_request",
  "high_intent_phrase",
  "returning_visit",
] as const;

export type SignalType = (typeof SIGNAL_TYPES)[number];

/** Points toward strategy lead score (0–100 scale after normalization helpers). */
export const SIGNAL_SCORE_WEIGHTS: Record<SignalType, number> = {
  page_view: 1,
  social_referral: 3,
  organic_referral: 2,
  direct: 1,
  decision_guide_open: 5,
  decision_guide_message: 4,
  profile_fact: 6,
  report_view: 8,
  building_view: 5,
  email_capture: 12,
  phone_capture: 15,
  contact_submit: 18,
  call_request: 25,
  high_intent_phrase: 10,
  returning_visit: 4,
};

export type StrategyScoreBreakdown = {
  total: number;
  identity: number;
  intent: number;
  engagement: number;
  readiness: number;
  signals: Array<{ type: string; points: number; detail?: string }>;
};

export type PipelinePerson = {
  id: string;
  kind: "visitor" | "contact" | "lead" | "opportunity";
  displayName: string;
  email: string | null;
  phone: string | null;
  sessionId: string | null;
  source: string | null;
  stage: PipelineStage;
  score: number;
  scoreBreakdown: StrategyScoreBreakdown;
  summary: string | null;
  profileFacts: string[];
  lastActivityAt: string;
  createdAt: string;
  rawRefs: {
    leadId?: string;
    contactId?: string;
    conversationId?: string;
    rboId?: string;
  };
};

export type FunnelCounts = Record<FunnelStep, number>;

export type PipelineBoard = {
  stages: Array<{
    id: PipelineStage;
    label: string;
    count: number;
    people: PipelinePerson[];
  }>;
  totalPeople: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function normalizeScore(raw: number): number {
  // Soft cap: raw signal sum → 0–100
  return clamp(Math.round((raw / (raw + 40)) * 100), 0, 100);
}

export type ScoreInput = {
  hasEmail?: boolean;
  hasPhone?: boolean;
  hasName?: boolean;
  messageCount?: number;
  leadScore?: number | null;
  timeline?: string | null;
  financing?: string | null;
  commitment?: string | null;
  motivation?: string | null;
  marketInterest?: string | null;
  conversationSummary?: string | null;
  profileKeys?: string[];
  sources?: string[];
  reportUrl?: string | null;
  contacted?: boolean;
  callRequested?: boolean;
  returning?: boolean;
  socialSource?: boolean;
  highIntentPhrases?: string[];
};

/**
 * Strategy lead score: identity + intent + engagement + readiness.
 * Prefer actionable signals over raw pageviews.
 */
export function computeStrategyScore(input: ScoreInput): StrategyScoreBreakdown {
  const signals: StrategyScoreBreakdown["signals"] = [];
  let identity = 0;
  let intent = 0;
  let engagement = 0;
  let readiness = 0;

  if (input.hasName) {
    identity += 4;
    signals.push({ type: "identity_name", points: 4 });
  }
  if (input.hasEmail) {
    identity += SIGNAL_SCORE_WEIGHTS.email_capture;
    signals.push({ type: "email_capture", points: SIGNAL_SCORE_WEIGHTS.email_capture });
  }
  if (input.hasPhone) {
    identity += SIGNAL_SCORE_WEIGHTS.phone_capture;
    signals.push({ type: "phone_capture", points: SIGNAL_SCORE_WEIGHTS.phone_capture });
  }

  const timeline = (input.timeline || "").toLowerCase();
  if (timeline) {
    let pts = 4;
    if (/now|urgent|asap|1-3|immediate/.test(timeline)) pts = 12;
    else if (/3-6|this year|soon/.test(timeline)) pts = 8;
    else if (/6-12|next year/.test(timeline)) pts = 5;
    intent += pts;
    signals.push({ type: "timeline", points: pts, detail: input.timeline || undefined });
  }

  const financing = (input.financing || "").toLowerCase();
  if (financing) {
    let pts = 4;
    if (/cash/.test(financing)) pts = 12;
    else if (/pre-?approved/.test(financing)) pts = 10;
    else if (/lender|mortgage/.test(financing)) pts = 6;
    readiness += pts;
    signals.push({ type: "financing", points: pts, detail: input.financing || undefined });
  }

  const commitment = (input.commitment || "").toLowerCase();
  if (commitment) {
    let pts = 3;
    if (/exclusive|sign|ready to work/.test(commitment)) pts = 12;
    else if (/commit|serious/.test(commitment)) pts = 8;
    readiness += pts;
    signals.push({ type: "commitment", points: pts, detail: input.commitment || undefined });
  }

  const motivation = (input.motivation || input.marketInterest || "").toLowerCase();
  if (motivation) {
    let pts = 3;
    if (/must|urgent|deadline|reloc/.test(motivation)) pts = 10;
    else if (/upgrade|invest|downsiz/.test(motivation)) pts = 7;
    intent += pts;
    signals.push({ type: "motivation", points: pts, detail: motivation.slice(0, 80) });
  }

  const msgs = input.messageCount ?? 0;
  if (msgs > 0) {
    const pts = Math.min(20, 4 + msgs * 2);
    engagement += pts;
    signals.push({ type: "decision_guide_message", points: pts, detail: `${msgs} messages` });
  }

  const profileKeys = input.profileKeys ?? [];
  if (profileKeys.length > 0) {
    const pts = Math.min(24, profileKeys.length * SIGNAL_SCORE_WEIGHTS.profile_fact * 0.5);
    engagement += pts;
    signals.push({
      type: "profile_fact",
      points: Math.round(pts),
      detail: profileKeys.slice(0, 6).join(", "),
    });
  }

  if (input.reportUrl) {
    engagement += SIGNAL_SCORE_WEIGHTS.report_view;
    signals.push({ type: "report_view", points: SIGNAL_SCORE_WEIGHTS.report_view });
  }

  if (input.contacted) {
    readiness += SIGNAL_SCORE_WEIGHTS.contact_submit;
    signals.push({ type: "contact_submit", points: SIGNAL_SCORE_WEIGHTS.contact_submit });
  }

  if (input.callRequested) {
    readiness += SIGNAL_SCORE_WEIGHTS.call_request;
    signals.push({ type: "call_request", points: SIGNAL_SCORE_WEIGHTS.call_request });
  }

  if (input.returning) {
    engagement += SIGNAL_SCORE_WEIGHTS.returning_visit;
    signals.push({ type: "returning_visit", points: SIGNAL_SCORE_WEIGHTS.returning_visit });
  }

  if (input.socialSource) {
    intent += SIGNAL_SCORE_WEIGHTS.social_referral;
    signals.push({ type: "social_referral", points: SIGNAL_SCORE_WEIGHTS.social_referral });
  }

  for (const phrase of input.highIntentPhrases ?? []) {
    intent += SIGNAL_SCORE_WEIGHTS.high_intent_phrase;
    signals.push({
      type: "high_intent_phrase",
      points: SIGNAL_SCORE_WEIGHTS.high_intent_phrase,
      detail: phrase,
    });
  }

  // Fold legacy leadScore (0–20-ish) into engagement
  if (typeof input.leadScore === "number" && input.leadScore > 0) {
    const pts = Math.min(20, input.leadScore * 1.5);
    engagement += pts;
    signals.push({ type: "legacy_lead_score", points: Math.round(pts), detail: String(input.leadScore) });
  }

  const raw = identity + intent + engagement + readiness;
  return {
    total: normalizeScore(raw),
    identity: Math.round(identity),
    intent: Math.round(intent),
    engagement: Math.round(engagement),
    readiness: Math.round(readiness),
    signals: signals.sort((a, b) => b.points - a.points),
  };
}

/**
 * Map score + facts → pipeline stage.
 * Call-ready requires identity (email or phone) plus readiness signals.
 */
export function derivePipelineStage(
  score: StrategyScoreBreakdown,
  input: ScoreInput,
): PipelineStage {
  const hasIdentity = Boolean(input.hasEmail || input.hasPhone);
  const profileDepth = (input.profileKeys ?? []).length;
  const msgs = input.messageCount ?? 0;

  if (input.callRequested || (score.total >= 70 && hasIdentity && score.readiness >= 12)) {
    return score.total >= 85 && hasIdentity ? "active" : "call_ready";
  }
  if (score.total >= 55 && hasIdentity && (score.readiness >= 8 || score.intent >= 10)) {
    return "qualified";
  }
  if (profileDepth >= 3 || score.engagement >= 15 || (msgs >= 3 && score.total >= 30)) {
    return "profiled";
  }
  if (msgs >= 1 || score.engagement >= 5 || input.returning) {
    return "engaged";
  }
  return "new_signals";
}

export function emptyFunnelCounts(): FunnelCounts {
  return {
    source: 0,
    page: 0,
    conversation: 0,
    report: 0,
    email: 0,
    call: 0,
    client: 0,
  };
}

export function emptyPipelineBoard(): PipelineBoard {
  return {
    stages: PIPELINE_STAGES.map((id) => ({
      id,
      label: PIPELINE_STAGE_LABELS[id],
      count: 0,
      people: [],
    })),
    totalPeople: 0,
  };
}

export function buildPipelineBoard(people: PipelinePerson[]): PipelineBoard {
  const board = emptyPipelineBoard();
  for (const person of people) {
    const bucket = board.stages.find((s) => s.id === person.stage);
    if (bucket) {
      bucket.people.push(person);
      bucket.count += 1;
    }
  }
  for (const stage of board.stages) {
    stage.people.sort((a, b) => b.score - a.score);
  }
  board.totalPeople = people.length;
  return board;
}

/**
 * Advisor-first client profile model.
 * Website enriches the relationship; Attio manages it internally.
 * Lead score is never exposed to customers.
 */

export const LIFECYCLE_STAGES = [
  "anonymous",
  "engaged",
  "profiled",
  "qualified",
  "call_ready",
  "advisory_client",
  "transaction_ready",
  "active_client",
  /** Deal completed - relationship continues as advisory (not Inactive). */
  "closed",
  "long_term_nurture",
  /** Disqualified, opted out, unresponsive, or former with no ongoing relationship. */
  "inactive",
] as const;

export type LifecycleStage = (typeof LIFECYCLE_STAGES)[number];

/**
 * Canonical CRM stage labels - website, Attio People/Housing, and admin must match.
 * Deal execution stages live on Transactions / Active Transactions, not here.
 */
export const ATTIO_PIPELINE_STAGES = [
  "New Signal",
  "Engaged",
  "Profiled",
  "Qualified",
  "Call Ready",
  "Long-Term Nurture",
  "Advisory Client",
  "Transaction Ready",
  "Inactive",
] as const;

export type AttioPipelineStage = (typeof ATTIO_PIPELINE_STAGES)[number];

export const LIFECYCLE_TO_ATTIO: Record<LifecycleStage, AttioPipelineStage> = {
  anonymous: "New Signal",
  engaged: "Engaged",
  profiled: "Profiled",
  qualified: "Qualified",
  call_ready: "Call Ready",
  advisory_client: "Advisory Client",
  transaction_ready: "Transaction Ready",
  // Deal-in-progress is tracked on Transactions; People stay Transaction Ready
  active_client: "Transaction Ready",
  // Transaction closed ≠ relationship ended → stay on Current Clients as Advisory Client
  closed: "Advisory Client",
  long_term_nurture: "Long-Term Nurture",
  // Only for disqualified / unresponsive / opted out / former with no relationship
  inactive: "Inactive",
};

export type ClientProfile = {
  visitorId: string;
  attioPersonId?: string;
  attioRecordId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  situation?: string;
  desiredOutcome?: string;
  currentHousing?: string;
  currentLocation?: string;
  targetLocations?: string[];
  propertyTypes?: string[];
  budgetRange?: string;
  timeline?: string;
  financingStatus?: string;
  creditReadiness?: string;
  downPaymentReadiness?: string;
  decisionMakers?: string[];
  constraints?: string[];
  tradeOffs?: string[];
  dealBreakers?: string[];
  buildingsViewed?: string[];
  listingsViewed?: string[];
  readinessScore?: number;
  belongingScore?: number;
  leadScore?: number;
  lifecycleStage: LifecycleStage;
  nextRecommendedAction?: string;
  lastConversationSummary?: string;
  internalAdvisorSummary?: string;
  assignedAdvisor?: string;
  assignedPartner?: string;
  createdAt: string;
  updatedAt: string;
  lastActiveAt: string;
};

export type DecisionAction =
  | { type: "open_page"; path: string }
  | { type: "recommend_page"; path: string; reason: string }
  | { type: "update_profile"; fields: Partial<ClientProfile> }
  | { type: "request_contact"; reason: string }
  | { type: "request_call"; reason: string }
  | { type: "save_goal"; goal: string }
  | { type: "send_recap" }
  | { type: "schedule_review" };

export type DecisionGuideResponse = {
  reply: string;
  profileUpdates: Partial<ClientProfile>;
  actions: DecisionAction[];
  leadScore?: number;
  shouldSyncToAttio?: boolean;
  shouldCreateAdvisorTask?: boolean;
};

export type LeadScoreBreakdown = {
  engagementScore: number;
  profileCompletenessScore: number;
  urgencyScore: number;
  fitScore: number;
  contactabilityScore: number;
  penalties: number;
  leadScore: number;
};

export type AttioSyncAction =
  | "upsert_person"
  | "upsert_housing_record"
  | "add_note"
  | "create_task"
  | "update_stage"
  | "sync_pipeline_lists";

/** Lead board vs Current Clients board - deals stay on Transactions object. */
export const ATTIO_LEAD_LIST_STAGES: AttioPipelineStage[] = [
  "New Signal",
  "Engaged",
  "Profiled",
  "Qualified",
  "Call Ready",
  "Long-Term Nurture",
];

export const ATTIO_CLIENT_LIST_STAGES: AttioPipelineStage[] = [
  "Advisory Client",
  "Transaction Ready",
  "Inactive",
];

export type AttioPeopleListKind = "lead" | "client";

export function attioPeopleListForStage(stage: AttioPipelineStage): AttioPeopleListKind {
  return ATTIO_CLIENT_LIST_STAGES.includes(stage) ? "client" : "lead";
}

export type AttioSyncJobStatus = "pending" | "processing" | "completed" | "failed";

export type AttioSyncJob = {
  id: string;
  clientProfileId: string;
  action: AttioSyncAction;
  payload: unknown;
  status: AttioSyncJobStatus;
  attemptCount: number;
  lastError?: string;
  nextRetryAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type AttioTask = {
  content: string;
  deadlineAt?: string | null;
  dedupeKey?: string;
};

export type AdvisorReview = {
  id: string;
  clientProfileId: string;
  reviewDate: string;
  advisorId: string;
  whatChanged: string;
  currentObjective: string;
  progressSinceLastReview: string;
  financialReadinessUpdate?: string;
  housingUpdate?: string;
  risks?: string[];
  recommendations?: string[];
  next90DayPlan?: string[];
  nextReviewDate?: string;
  clientVisibleSummary: string;
  internalNotes?: string;
};

export const STAFF_ROLES = ["admin", "advisor", "partner", "assistant", "client"] as const;
export type StaffRole = (typeof STAFF_ROLES)[number];

export const ROADMAP_MILESTONES = [
  "Clarify goals",
  "Improve readiness",
  "Review financing",
  "Define target market",
  "Begin search",
  "Evaluate options",
  "Prepare offer",
  "Close",
] as const;

export function lifecycleFromLeadScore(score: number): LifecycleStage {
  if (score >= 80) return "call_ready";
  if (score >= 65) return "qualified";
  if (score >= 45) return "profiled";
  if (score >= 25) return "engaged";
  return "anonymous";
}

/** Prefer explicit stage when it is ahead of score-derived stage. */
export function mergeLifecycleStage(
  current: LifecycleStage | undefined,
  scoreDerived: LifecycleStage,
  forced?: LifecycleStage,
): LifecycleStage {
  if (forced) return forced;
  const order = LIFECYCLE_STAGES;
  const currentIdx = current ? order.indexOf(current) : -1;
  const derivedIdx = order.indexOf(scoreDerived);
  // Manual relationship stages - score should not pull them backward
  if (
    current === "long_term_nurture" ||
    current === "closed" ||
    current === "inactive" ||
    current === "advisory_client" ||
    current === "transaction_ready" ||
    current === "active_client"
  ) {
    return current;
  }
  return derivedIdx >= currentIdx ? scoreDerived : (current ?? scoreDerived);
}

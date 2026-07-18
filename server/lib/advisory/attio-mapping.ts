import {
  ATTIO_CLIENT_LIST_STAGES,
  LIFECYCLE_TO_ATTIO,
  type AttioPipelineStage,
  type ClientProfile,
  type LifecycleStage,
} from "@shared/client-profile";

/** Official Attio people attribute shapes (assert/create/update). */
export type AttioPersonValues = {
  email_addresses?: Array<{ email_address: string }>;
  name?: Array<{ first_name?: string; last_name?: string; full_name?: string }>;
  phone_numbers?: Array<{ original_phone_number: string; country_code?: string | null }>;
  [customSlug: string]: unknown;
};

export type AttioRecordValues = Record<string, unknown>;

export function normalizeEmail(email?: string | null): string | null {
  if (!email || typeof email !== "string") return null;
  const trimmed = email.trim().toLowerCase();
  if (!trimmed || !trimmed.includes("@")) return null;
  return trimmed;
}

export function splitName(profile: Partial<ClientProfile>): { first?: string; last?: string; full?: string } {
  if (profile.firstName || profile.lastName) {
    const first = profile.firstName?.trim();
    const last = profile.lastName?.trim();
    return {
      first,
      last,
      full: [first, last].filter(Boolean).join(" ") || undefined,
    };
  }
  return {};
}

export function mapLifecycleToAttio(stage: LifecycleStage | string | undefined): AttioPipelineStage {
  if (!stage) return "New Signal";
  if (stage in LIFECYCLE_TO_ATTIO) {
    return LIFECYCLE_TO_ATTIO[stage as LifecycleStage];
  }
  return "New Signal";
}

/**
 * People = identity + light ops only. Housing chart fields stay on Housing Advisory.
 */
export const ATTIO_PERSON_FIELD_SLUGS = {
  websiteVisitorId: "website_visitor_id",
  leadSource: "lead_source",
  lifecycleStage: "lifecycle_stage",
  leadScore: "lead_score",
  timeline: "timeline",
  assignedAdvisor: "assigned_advisor",
  lastActiveDate: "last_active_date",
  nextAction: "next_action",
  attioSyncStatus: "attio_sync_status",
} as const;

/** Derive membership status for the Housing Advisory chart. */
export function mapLifecycleToMembershipStatus(
  stage: LifecycleStage | string | undefined,
): string {
  if (stage === "inactive") return "Former";
  const attio = mapLifecycleToAttio(stage);
  if (attio === "Inactive") return "Former";
  if (attio === "Advisory Client" || attio === "Transaction Ready") return "Active";
  if (attio === "Call Ready" || attio === "Qualified" || attio === "Profiled") return "Exploring";
  return "None";
}

export const ATTIO_HOUSING_FIELD_SLUGS = {
  client: "client",
  situation: "situation",
  currentHousingSituation: "current_housing_situation",
  desiredOutcome: "desired_outcome",
  currentLocation: "current_location",
  targetLocations: "target_locations",
  propertyType: "property_type",
  budgetRange: "budget_range",
  timeline: "timeline",
  financingStatus: "financing_status",
  creditReadiness: "credit_readiness",
  downPaymentReadiness: "down_payment_readiness",
  constraints: "housing_constraints",
  tradeoffs: "tradeoffs",
  dealbreakers: "dealbreakers",
  belongingScore: "belonging_score",
  readinessScore: "readiness_score",
  recommendedNextAction: "recommended_next_action",
  lastAiSummary: "last_ai_summary",
  lastAdvisorSummary: "last_advisor_summary",
  nextReviewDate: "next_review_date",
  assignedAdvisor: "assigned_advisor",
  assignedPartner: "assigned_partner",
  lastContactDate: "last_contact_date",
  advisoryMembershipStatus: "advisory_membership_status",
  lifecycleStage: "lifecycle_stage",
  websiteVisitorId: "website_visitor_id",
  websiteProfileId: "website_profile_id",
} as const;

function textValue(value?: string | null) {
  if (!value || !value.trim()) return undefined;
  return [{ value: value.trim() }];
}

function numberValue(value?: number | null) {
  if (value == null || !Number.isFinite(value)) return undefined;
  return [{ value }];
}

function selectValue(value?: string | null) {
  if (!value || !value.trim()) return undefined;
  return [{ option: value.trim() }];
}

function dateValue(iso?: string | null) {
  if (!iso) return undefined;
  const day = iso.slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) return undefined;
  return [{ value: day }];
}

function recordRef(object: string, recordId: string) {
  return [{ target_object: object, target_record_id: recordId }];
}

export function mapProfileToAttioPersonValues(
  profile: ClientProfile | Partial<ClientProfile>,
  opts: { syncStatus?: string } = {},
): AttioPersonValues {
  const email = normalizeEmail(profile.email);
  const name = splitName(profile);
  const values: AttioPersonValues = {};

  if (email) {
    values.email_addresses = [{ email_address: email }];
  }
  if (name.first || name.last || name.full) {
    values.name = [
      {
        first_name: name.first,
        last_name: name.last,
        full_name: name.full,
      },
    ];
  }
  if (profile.phone?.trim()) {
    values.phone_numbers = [
      {
        original_phone_number: profile.phone.trim(),
        country_code: "US",
      },
    ];
  }

  const S = ATTIO_PERSON_FIELD_SLUGS;
  if (profile.visitorId) values[S.websiteVisitorId] = textValue(profile.visitorId);
  values[S.leadSource] = textValue("agent_kammer_website");
  if (profile.lifecycleStage) {
    values[S.lifecycleStage] = selectValue(mapLifecycleToAttio(profile.lifecycleStage));
  }
  if (profile.leadScore != null) values[S.leadScore] = numberValue(profile.leadScore);
  if (profile.timeline) values[S.timeline] = textValue(profile.timeline);
  if (profile.assignedAdvisor) values[S.assignedAdvisor] = textValue(profile.assignedAdvisor);
  if (profile.lastActiveAt) values[S.lastActiveDate] = dateValue(profile.lastActiveAt);
  if (profile.nextRecommendedAction) values[S.nextAction] = textValue(profile.nextRecommendedAction);
  if (opts.syncStatus) values[S.attioSyncStatus] = selectValue(opts.syncStatus);

  return values;
}

export function mapProfileToAttioHousingValues(
  profile: ClientProfile | Partial<ClientProfile>,
  opts: { personRecordId?: string; profileId?: string } = {},
): AttioRecordValues {
  const S = ATTIO_HOUSING_FIELD_SLUGS;
  const values: AttioRecordValues = {};

  if (opts.personRecordId) {
    values[S.client] = recordRef("people", opts.personRecordId);
  }
  if (profile.situation) values[S.situation] = textValue(profile.situation);
  if (profile.currentHousing) values[S.currentHousingSituation] = textValue(profile.currentHousing);
  if (profile.desiredOutcome) values[S.desiredOutcome] = textValue(profile.desiredOutcome);
  if (profile.currentLocation) values[S.currentLocation] = textValue(profile.currentLocation);
  if (profile.targetLocations?.length) {
    values[S.targetLocations] = textValue(profile.targetLocations.join(", "));
  }
  if (profile.propertyTypes?.length) {
    values[S.propertyType] = textValue(profile.propertyTypes.join(", "));
  }
  if (profile.budgetRange) values[S.budgetRange] = textValue(profile.budgetRange);
  if (profile.timeline) values[S.timeline] = textValue(profile.timeline);
  if (profile.financingStatus) values[S.financingStatus] = textValue(profile.financingStatus);
  if (profile.creditReadiness) values[S.creditReadiness] = textValue(profile.creditReadiness);
  if (profile.downPaymentReadiness) {
    values[S.downPaymentReadiness] = textValue(profile.downPaymentReadiness);
  }
  if (profile.constraints?.length) values[S.constraints] = textValue(profile.constraints.join("; "));
  if (profile.tradeOffs?.length) values[S.tradeoffs] = textValue(profile.tradeOffs.join("; "));
  if (profile.dealBreakers?.length) values[S.dealbreakers] = textValue(profile.dealBreakers.join("; "));
  if (profile.belongingScore != null) values[S.belongingScore] = numberValue(profile.belongingScore);
  if (profile.readinessScore != null) values[S.readinessScore] = numberValue(profile.readinessScore);
  if (profile.nextRecommendedAction) {
    values[S.recommendedNextAction] = textValue(profile.nextRecommendedAction);
  }
  if (profile.lastConversationSummary) values[S.lastAiSummary] = textValue(profile.lastConversationSummary);
  if (profile.internalAdvisorSummary) {
    values[S.lastAdvisorSummary] = textValue(profile.internalAdvisorSummary);
  }
  if (profile.assignedAdvisor) values[S.assignedAdvisor] = textValue(profile.assignedAdvisor);
  if (profile.assignedPartner) values[S.assignedPartner] = textValue(profile.assignedPartner);
  if (profile.visitorId) values[S.websiteVisitorId] = textValue(profile.visitorId);
  if (opts.profileId) values[S.websiteProfileId] = textValue(opts.profileId);
  if (profile.lifecycleStage) {
    values[S.lifecycleStage] = selectValue(mapLifecycleToAttio(profile.lifecycleStage));
    values[S.advisoryMembershipStatus] = selectValue(
      mapLifecycleToMembershipStatus(profile.lifecycleStage),
    );
  }
  if (profile.lastActiveAt) values[S.lastContactDate] = dateValue(profile.lastActiveAt);

  void ATTIO_CLIENT_LIST_STAGES;

  return values;
}

/** Strip undefined / empty attribute arrays for Attio payloads. */
export function pruneAttioValues<T extends Record<string, unknown>>(values: T): T {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(values)) {
    if (value == null) continue;
    if (Array.isArray(value) && value.length === 0) continue;
    out[key] = value;
  }
  return out as T;
}

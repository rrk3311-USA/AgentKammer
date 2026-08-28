import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  index,
  integer,
  numeric,
  pgEnum,
  pgTable,
  smallint,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

const stamps = {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
};

export const biContactStatus = pgEnum("bi_contact_status", [
  "signal",
  "nurture",
  "active_search",
  "paused",
  "under_contract",
  "closed",
  "lost",
  "do_not_contact",
]);

export const biHouseholdMemberRole = pgEnum("bi_household_member_role", [
  "primary",
  "partner",
  "family",
  "advisor",
  "attorney",
  "other",
]);

export const biFinancingType = pgEnum("bi_financing_type", ["cash", "mortgage", "mixed", "unknown"]);

export const biPreapprovalStatus = pgEnum("bi_preapproval_status", [
  "none",
  "in_progress",
  "prequalified",
  "preapproved",
  "expired",
  "cash_verified",
]);

export const biTimelineBand = pgEnum("bi_timeline_band", [
  "immediate",
  "0_3_months",
  "3_6_months",
  "6_12_months",
  "12_plus",
  "unknown",
]);

export const biOwnershipForm = pgEnum("bi_ownership_form", [
  "condo",
  "coop",
  "condop",
  "townhouse",
  "rental",
  "unknown",
]);

export const biPreferenceOrigin = pgEnum("bi_preference_origin", ["stated", "observed", "inferred"]);

export const biPreferenceCategory = pgEnum("bi_preference_category", [
  "floor",
  "light",
  "view",
  "noise",
  "layout",
  "kitchen",
  "outdoor",
  "building",
  "service",
  "finish",
  "neighborhood",
  "size",
  "exposure",
  "outdoor_space",
  "parking",
  "pets",
  "other",
]);

export const biAversionSeverity = pgEnum("bi_aversion_severity", ["soft", "strong", "dealbreaker"]);

export const biPropertyStatus = pgEnum("bi_property_status", [
  "coming_soon",
  "active",
  "under_contract",
  "sold",
  "off_market",
  "withdrawn",
]);

export const biMatchRecommendation = pgEnum("bi_match_recommendation", [
  "show",
  "maybe",
  "hold",
  "do_not_show",
]);

export const biReactionKind = pgEnum("bi_reaction_kind", [
  "interested",
  "favorite",
  "rejected",
  "neutral",
  "toured",
  "offer_considered",
]);

export const biInteractionType = pgEnum("bi_interaction_type", [
  "call",
  "text",
  "email",
  "meeting",
  "tour",
  "video",
  "note",
]);

export const biTaskStatus = pgEnum("bi_task_status", ["open", "done", "canceled", "snoozed"]);

export const biTaskPriority = pgEnum("bi_task_priority", ["low", "normal", "high", "urgent"]);

export const biNurtureStage = pgEnum("bi_nurture_stage", [
  "new",
  "education",
  "shortlist",
  "touring",
  "offer",
  "paused",
  "closed",
]);

export const biDocumentType = pgEnum("bi_document_type", [
  "preapproval",
  "proof_of_funds",
  "id",
  "tax_return",
  "entity_docs",
  "other",
]);

export const biTransactionStage = pgEnum("bi_transaction_stage", [
  "exploring",
  "offer",
  "contract",
  "attorney_review",
  "board",
  "closing",
  "closed",
  "dead",
]);

export const biReferralSourceType = pgEnum("bi_referral_source_type", [
  "personal",
  "professional",
  "campaign",
  "website",
  "event",
  "other",
]);

export const biReferralSources = pgTable("bi_referral_sources", {
  ...stamps,
  sourceName: text("source_name").notNull(),
  type: biReferralSourceType("type").notNull().default("other"),
  campaign: text("campaign"),
  metadata: text("metadata"),
});

export const biContacts = pgTable(
  "bi_contacts",
  {
    ...stamps,
    firstName: text("first_name"),
    lastName: text("last_name"),
    email: text("email"),
    phone: text("phone"),
    sourceId: uuid("source_id"),
    source: text("source"),
    status: biContactStatus("status").notNull().default("signal"),
    owner: text("owner"),
    websiteClientProfileId: varchar("website_client_profile_id"),
    websiteLeadId: varchar("website_lead_id"),
    memberProfileId: varchar("member_profile_id"),
    visitorId: text("visitor_id"),
  },
  (t) => [index("bi_contacts_email_idx").on(t.email)],
);

export const biHouseholds = pgTable("bi_households", {
  ...stamps,
  householdName: text("household_name").notNull(),
  primaryContactId: uuid("primary_contact_id").notNull(),
});

export const biHouseholdMembers = pgTable(
  "bi_household_members",
  {
    ...stamps,
    householdId: uuid("household_id").notNull(),
    contactId: uuid("contact_id").notNull(),
    role: biHouseholdMemberRole("role").notNull().default("primary"),
  },
  (t) => [uniqueIndex("bi_household_members_uniq").on(t.householdId, t.contactId)],
);

export const biBuyerProfiles = pgTable(
  "bi_buyer_profiles",
  {
    ...stamps,
    contactId: uuid("contact_id"),
    householdId: uuid("household_id"),
    displayName: text("display_name"),
    budgetMinCents: bigint("budget_min_cents", { mode: "number" }),
    budgetMaxCents: bigint("budget_max_cents", { mode: "number" }),
    financingType: biFinancingType("financing_type").notNull().default("unknown"),
    preapprovalStatus: biPreapprovalStatus("preapproval_status").notNull().default("none"),
    timeline: biTimelineBand("timeline").notNull().default("unknown"),
    propertyType: biOwnershipForm("property_type").notNull().default("unknown"),
    bedsMin: numeric("beds_min", { precision: 3, scale: 1 }),
    bathsMin: numeric("baths_min", { precision: 3, scale: 1 }),
    sqftMin: integer("sqft_min"),
    notes: text("notes"),
    status: biContactStatus("status").notNull().default("signal"),
    owner: text("owner"),
    websiteClientProfileId: varchar("website_client_profile_id"),
    memberProfileId: varchar("member_profile_id"),
    visitorId: text("visitor_id"),
  },
  (t) => [index("bi_buyer_profiles_status_idx").on(t.status)],
);

export const biBuyerNeighborhoods = pgTable(
  "bi_buyer_neighborhoods",
  {
    ...stamps,
    buyerProfileId: uuid("buyer_profile_id").notNull(),
    neighborhoodSlug: text("neighborhood_slug").notNull(),
    rank: integer("rank").notNull().default(1),
  },
  (t) => [uniqueIndex("bi_buyer_neighborhoods_uniq").on(t.buyerProfileId, t.neighborhoodSlug)],
);

export const biBuyerPersonas = pgTable("bi_buyer_personas", {
  ...stamps,
  personaName: text("persona_name").notNull(),
  description: text("description"),
});

export const biBuyerPersonaAssignments = pgTable("bi_buyer_persona_assignments", {
  ...stamps,
  buyerProfileId: uuid("buyer_profile_id").notNull(),
  personaId: uuid("persona_id").notNull(),
  confidence: numeric("confidence", { precision: 4, scale: 3 }),
  assignedBy: text("assigned_by").notNull().default("advisor"),
});

export const biPreferenceEvents = pgTable(
  "bi_preference_events",
  {
    ...stamps,
    buyerProfileId: uuid("buyer_profile_id").notNull(),
    origin: biPreferenceOrigin("origin").notNull(),
    category: biPreferenceCategory("category").notNull(),
    preference: text("preference").notNull(),
    importance: smallint("importance"),
    hardRequirement: boolean("hard_requirement").notNull().default(false),
    polarity: text("polarity").notNull().default("want"),
    confidence: numeric("confidence", { precision: 4, scale: 3 }),
    evidenceReactionId: uuid("evidence_reaction_id"),
    evidenceNote: text("evidence_note"),
    recordedAt: timestamp("recorded_at", { withTimezone: true }).defaultNow().notNull(),
    supersededBy: uuid("superseded_by"),
    sourceSystem: text("source_system"),
    sourceRowId: text("source_row_id"),
  },
  (t) => [index("bi_pref_events_buyer_idx").on(t.buyerProfileId, t.origin, t.recordedAt)],
);

export const biBuyerAversions = pgTable("bi_buyer_aversions", {
  ...stamps,
  buyerProfileId: uuid("buyer_profile_id").notNull(),
  category: biPreferenceCategory("category").notNull().default("other"),
  issue: text("issue").notNull(),
  severity: biAversionSeverity("severity").notNull().default("strong"),
  origin: biPreferenceOrigin("origin").notNull().default("stated"),
  notes: text("notes"),
  sourceSystem: text("source_system"),
  sourceRowId: text("source_row_id"),
});

export const biBuildings = pgTable(
  "bi_buildings",
  {
    ...stamps,
    name: text("name").notNull(),
    address: text("address"),
    neighborhoodSlug: text("neighborhood_slug"),
    ownershipForm: biOwnershipForm("ownership_form").notNull().default("unknown"),
    yearBuilt: integer("year_built"),
    developer: text("developer"),
    amenities: text("amenities").array(),
    reportSlug: text("report_slug"),
  },
  (t) => [index("bi_buildings_hood_idx").on(t.neighborhoodSlug)],
);

export const biProperties = pgTable(
  "bi_properties",
  {
    ...stamps,
    buildingId: uuid("building_id"),
    address: text("address").notNull(),
    unit: text("unit"),
    askPriceCents: bigint("ask_price_cents", { mode: "number" }),
    beds: numeric("beds", { precision: 3, scale: 1 }),
    baths: numeric("baths", { precision: 3, scale: 1 }),
    sqft: integer("sqft"),
    status: biPropertyStatus("status").notNull().default("active"),
    listingUrl: text("listing_url"),
    externalId: text("external_id"),
    floor: integer("floor"),
  },
  (t) => [index("bi_properties_building_idx").on(t.buildingId)],
);

export const biPropertyAttributes = pgTable(
  "bi_property_attributes",
  {
    ...stamps,
    propertyId: uuid("property_id").notNull(),
    attribute: text("attribute").notNull(),
    value: text("value").notNull(),
  },
  (t) => [uniqueIndex("bi_property_attrs_uniq").on(t.propertyId, t.attribute)],
);

export const biPropertyReviews = pgTable("bi_property_reviews", {
  ...stamps,
  propertyId: uuid("property_id").notNull(),
  reviewer: text("reviewer"),
  score: numeric("score", { precision: 4, scale: 1 }),
  grade: text("grade"),
  verdict: text("verdict"),
  pricingAssessment: text("pricing_assessment"),
  risks: text("risks"),
});

export const biBuyerPropertyMatches = pgTable(
  "bi_buyer_property_matches",
  {
    ...stamps,
    buyerProfileId: uuid("buyer_profile_id").notNull(),
    propertyId: uuid("property_id").notNull(),
    matchScore: numeric("match_score", { precision: 5, scale: 2 }).notNull(),
    recommendation: biMatchRecommendation("recommendation").notNull(),
    reasoning: text("reasoning").notNull(),
    modelVersion: text("model_version").notNull().default("rules-v1"),
    computedAt: timestamp("computed_at", { withTimezone: true }).defaultNow().notNull(),
    inputHash: text("input_hash"),
  },
  (t) => [
    index("bi_matches_property_idx").on(t.propertyId),
    uniqueIndex("bi_matches_uniq").on(t.buyerProfileId, t.propertyId, t.modelVersion),
  ],
);

export const biPropertyReactions = pgTable(
  "bi_property_reactions",
  {
    ...stamps,
    buyerProfileId: uuid("buyer_profile_id").notNull(),
    propertyId: uuid("property_id").notNull(),
    kind: biReactionKind("kind").notNull(),
    reactionScore: smallint("reaction_score"),
    notes: text("notes"),
    occurredAt: timestamp("occurred_at", { withTimezone: true }).defaultNow().notNull(),
    sourceSystem: text("source_system"),
    sourceRowId: text("source_row_id"),
  },
  (t) => [index("bi_reactions_buyer_idx").on(t.buyerProfileId, t.occurredAt)],
);

export const biRejectionReasons = pgTable("bi_rejection_reasons", {
  ...stamps,
  reactionId: uuid("reaction_id").notNull(),
  reasonCategory: biPreferenceCategory("reason_category").notNull().default("other"),
  detail: text("detail").notNull(),
});

export const biPropertySaves = pgTable(
  "bi_property_saves",
  {
    ...stamps,
    buyerProfileId: uuid("buyer_profile_id").notNull(),
    propertyId: uuid("property_id").notNull(),
    savedAt: timestamp("saved_at", { withTimezone: true }).defaultNow().notNull(),
    sourceSystem: text("source_system"),
    sourceRowId: text("source_row_id"),
  },
  (t) => [uniqueIndex("bi_property_saves_uniq").on(t.buyerProfileId, t.propertyId)],
);

export const biInteractions = pgTable("bi_interactions", {
  ...stamps,
  buyerProfileId: uuid("buyer_profile_id").notNull(),
  contactId: uuid("contact_id"),
  type: biInteractionType("type").notNull(),
  occurredAt: timestamp("occurred_at", { withTimezone: true }).defaultNow().notNull(),
  summary: text("summary"),
  nextAction: text("next_action"),
});

export const biTasks = pgTable("bi_tasks", {
  ...stamps,
  buyerProfileId: uuid("buyer_profile_id").notNull(),
  title: text("title").notNull(),
  dueAt: timestamp("due_at", { withTimezone: true }),
  status: biTaskStatus("status").notNull().default("open"),
  priority: biTaskPriority("priority").notNull().default("normal"),
});

export const biNurturePlans = pgTable("bi_nurture_plans", {
  ...stamps,
  buyerProfileId: uuid("buyer_profile_id").notNull(),
  cadence: text("cadence").notNull().default("monthly"),
  stage: biNurtureStage("stage").notNull().default("new"),
  nextTouchAt: timestamp("next_touch_at", { withTimezone: true }),
});

export const biDocuments = pgTable("bi_documents", {
  ...stamps,
  buyerProfileId: uuid("buyer_profile_id").notNull(),
  type: biDocumentType("type").notNull(),
  url: text("url"),
  receivedAt: timestamp("received_at", { withTimezone: true }),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
});

export const biTransactions = pgTable("bi_transactions", {
  ...stamps,
  buyerProfileId: uuid("buyer_profile_id").notNull(),
  propertyId: uuid("property_id"),
  stage: biTransactionStage("stage").notNull().default("exploring"),
  offerCents: bigint("offer_cents", { mode: "number" }),
  contractPriceCents: bigint("contract_price_cents", { mode: "number" }),
  closeDate: timestamp("close_date", { withTimezone: true }),
  attioTransactionId: text("attio_transaction_id"),
});

export type BiContact = typeof biContacts.$inferSelect;
export type BiBuyerProfile = typeof biBuyerProfiles.$inferSelect;
export type BiPreferenceEvent = typeof biPreferenceEvents.$inferSelect;
export type BiBuyerAversion = typeof biBuyerAversions.$inferSelect;
export type BiProperty = typeof biProperties.$inferSelect;
export type BiBuyerPropertyMatch = typeof biBuyerPropertyMatches.$inferSelect;
export type BiPropertyReaction = typeof biPropertyReactions.$inferSelect;
export type BiBuilding = typeof biBuildings.$inferSelect;

import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name"),
  email: text("email"),
  phone: text("phone"),
  timeline: text("timeline"),
  financing: text("financing"),
  commitment: text("commitment"),
  motivation: text("motivation"),
  communicationStyle: text("communication_style"),
  conversationSummary: text("conversation_summary"),
  leadScore: integer("lead_score"),
  marketInterest: text("market_interest"),
  reportUrl: text("report_url"),
  leadSource: text("lead_source"),
  audiobookTitle: text("audiobook_title"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

export const contentItems = pgTable("content_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  scriptContent: text("script_content"),
  stage: text("stage").notNull().default("ideation"),
  category: text("category"),
  tags: text("tags").array(),
  publishingDestinations: text("publishing_destinations").array(),
  fileUrl: text("file_url"),
  notes: text("notes"),
  legalStatus: text("legal_status"),
  format: text("format").default("article"),
  isPublished: boolean("is_published").default(false),
  slug: text("slug"),
  thumbnailUrl: text("thumbnail_url"),
  contentBody: text("content_body"),
  videoUrl: text("video_url"),
  duration: text("duration"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertContentItemSchema = createInsertSchema(contentItems).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertContentItem = z.infer<typeof insertContentItemSchema>;
export type ContentItem = typeof contentItems.$inferSelect;

export const rboBuyerProfiles = pgTable("rbo_buyer_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  phone: text("phone").notNull(),
  priceRange: text("price_range"),
  downPayment: text("down_payment"),
  creditBand: text("credit_band"),
  targetCities: text("target_cities").array(),
  monthlyComfort: text("monthly_comfort"),
  lenderData: text("lender_data"),
  brokerageData: text("brokerage_data"),
  estimatedSavings: integer("estimated_savings"),
  leadScore: integer("lead_score"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertRboBuyerProfileSchema = createInsertSchema(rboBuyerProfiles).omit({
  id: true,
  createdAt: true,
});

export type InsertRboBuyerProfile = z.infer<typeof insertRboBuyerProfileSchema>;
export type RboBuyerProfile = typeof rboBuyerProfiles.$inferSelect;

export const rsoSellerProfiles = pgTable("rso_seller_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  phone: text("phone").notNull(),
  address: text("address"),
  propertyType: text("property_type"),
  estimatedValue: text("estimated_value"),
  timeframe: text("timeframe"),
  motivation: text("motivation"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertRsoSellerProfileSchema = createInsertSchema(rsoSellerProfiles).omit({
  id: true,
  createdAt: true,
});

export type InsertRsoSellerProfile = z.infer<typeof insertRsoSellerProfileSchema>;
export type RsoSellerProfile = typeof rsoSellerProfiles.$inferSelect;

export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
});

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export const homeValueRequests = pgTable("home_value_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  address: text("address").notNull(),
  city: text("city").notNull(),
  zipCode: text("zip_code").notNull(),
  propertyType: text("property_type"),
  bedrooms: text("bedrooms"),
  bathrooms: text("bathrooms"),
  squareFeet: text("square_feet"),
  yearBuilt: text("year_built"),
  email: text("email").notNull(),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertHomeValueRequestSchema = createInsertSchema(homeValueRequests).omit({
  id: true,
  createdAt: true,
});

export type InsertHomeValueRequest = z.infer<typeof insertHomeValueRequestSchema>;
export type HomeValueRequest = typeof homeValueRequests.$inferSelect;

export const brokerRegistrations = pgTable("broker_registrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  licenseNumber: text("license_number").notNull(),
  yearsExperience: text("years_experience"),
  specialization: text("specialization"),
  brokerage: text("brokerage"),
  neighborhoods: text("neighborhoods"),
  bio: text("bio"),
  linkedIn: text("linked_in"),
  website: text("website"),
  videoUrl: text("video_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBrokerRegistrationSchema = createInsertSchema(brokerRegistrations).omit({
  id: true,
  createdAt: true,
});

export type InsertBrokerRegistration = z.infer<typeof insertBrokerRegistrationSchema>;
export type BrokerRegistration = typeof brokerRegistrations.$inferSelect;

export const affiliates = pgTable("affiliates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  website: text("website"),
  socialHandle: text("social_handle"),
  platform: text("platform"),
  audienceSize: text("audience_size"),
  niche: text("niche"),
  referralCode: text("referral_code").notNull().unique(),
  tier: text("tier").notNull().default("starter"),
  totalReferrals: integer("total_referrals").default(0),
  totalEarnings: integer("total_earnings").default(0),
  paypalEmail: text("paypal_email"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAffiliateSchema = createInsertSchema(affiliates).omit({
  id: true,
  referralCode: true,
  tier: true,
  totalReferrals: true,
  totalEarnings: true,
  status: true,
  createdAt: true,
});

export type InsertAffiliate = z.infer<typeof insertAffiliateSchema>;
export type Affiliate = typeof affiliates.$inferSelect;

export const affiliateReferrals = pgTable("affiliate_referrals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  affiliateId: varchar("affiliate_id").notNull(),
  productCategory: text("product_category").notNull(),
  productName: text("product_name"),
  status: text("status").notNull().default("pending"),
  commission: integer("commission").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAffiliateReferralSchema = createInsertSchema(affiliateReferrals).omit({
  id: true,
  createdAt: true,
});

export type InsertAffiliateReferral = z.infer<typeof insertAffiliateReferralSchema>;
export type AffiliateReferral = typeof affiliateReferrals.$inferSelect;

export const chatConversations = pgTable("chat_conversations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull(),
  messages: text("messages").notNull(),
  leadName: text("lead_name"),
  leadEmail: text("lead_email"),
  leadPhone: text("lead_phone"),
  categoryInterest: text("category_interest"),
  leadScore: integer("lead_score"),
  summary: text("summary"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertChatConversationSchema = createInsertSchema(chatConversations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertChatConversation = z.infer<typeof insertChatConversationSchema>;
export type ChatConversation = typeof chatConversations.$inferSelect;

export const travelDealSubscribers = pgTable("travel_deal_subscribers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTravelDealSubscriberSchema = createInsertSchema(travelDealSubscribers).omit({
  id: true,
  isActive: true,
  createdAt: true,
});

export type InsertTravelDealSubscriber = z.infer<typeof insertTravelDealSubscriberSchema>;
export type TravelDealSubscriber = typeof travelDealSubscribers.$inferSelect;

export const travelDeals = pgTable("travel_deals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  destination: text("destination").notNull(),
  description: text("description"),
  discount: text("discount"),
  partnerName: text("partner_name"),
  partnerUrl: text("partner_url"),
  imageUrl: text("image_url"),
  articleContent: text("article_content"),
  weekNumber: integer("week_number"),
  year: integer("year"),
  isActive: boolean("is_active").default(true),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTravelDealSchema = createInsertSchema(travelDeals).omit({
  id: true,
  createdAt: true,
});

export type InsertTravelDeal = z.infer<typeof insertTravelDealSchema>;
export type TravelDeal = typeof travelDeals.$inferSelect;

// ---------------------------------------------------------------------------
// CRM OS tables (visitor → contact → lead → opportunity)
// Business truth lives here; PostHog stays behavioral telemetry.
// ---------------------------------------------------------------------------

export const visitorProfiles = pgTable("visitor_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull(),
  visitorId: text("visitor_id"),
  firstSource: text("first_source"),
  lastSource: text("last_source"),
  firstPath: text("first_path"),
  lastPath: text("last_path"),
  referrer: text("referrer"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  visitCount: integer("visit_count").default(1),
  lastSeenAt: timestamp("last_seen_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertVisitorProfileSchema = createInsertSchema(visitorProfiles).omit({
  id: true,
  createdAt: true,
  lastSeenAt: true,
});

export type InsertVisitorProfile = z.infer<typeof insertVisitorProfileSchema>;
export type VisitorProfile = typeof visitorProfiles.$inferSelect;

export const leadSignalEvents = pgTable("lead_signal_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id"),
  visitorId: text("visitor_id"),
  leadId: varchar("lead_id"),
  contactId: varchar("contact_id"),
  signalType: text("signal_type").notNull(),
  source: text("source"),
  path: text("path"),
  referrer: text("referrer"),
  detail: text("detail"),
  scoreDelta: integer("score_delta").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLeadSignalEventSchema = createInsertSchema(leadSignalEvents).omit({
  id: true,
  createdAt: true,
});

export type InsertLeadSignalEvent = z.infer<typeof insertLeadSignalEventSchema>;
export type LeadSignalEvent = typeof leadSignalEvents.$inferSelect;

export const pipelineOpportunities = pgTable("pipeline_opportunities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  leadId: varchar("lead_id"),
  contactId: varchar("contact_id"),
  conversationId: varchar("conversation_id"),
  displayName: text("display_name"),
  email: text("email"),
  phone: text("phone"),
  stage: text("stage").notNull().default("new_signals"),
  strategyScore: integer("strategy_score").default(0),
  source: text("source"),
  summary: text("summary"),
  nextAction: text("next_action"),
  owner: text("owner"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertPipelineOpportunitySchema = createInsertSchema(pipelineOpportunities).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertPipelineOpportunity = z.infer<typeof insertPipelineOpportunitySchema>;
export type PipelineOpportunity = typeof pipelineOpportunities.$inferSelect;

// ---------------------------------------------------------------------------
// Decision Hub member profiles (anonymous visitor → email+PIN verified account)
// Auth: cookie session after PIN (magic link next). Never issue access from email alone.
// ---------------------------------------------------------------------------

export const memberProfiles = pgTable("member_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  displayName: text("display_name"),
  accessToken: text("access_token").notNull(),
  visitorIds: text("visitor_ids").array(),
  conversationIds: text("conversation_ids").array(),
  leadId: varchar("lead_id"),
  goals: text("goals"),
  vision: text("vision"),
  priorities: text("priorities"),
  decisionMap: text("decision_map"),
  briefs: text("briefs"),
  progressStage: text("progress_stage").default("exploring"),
  lastVisitorId: text("last_visitor_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertMemberProfileSchema = createInsertSchema(memberProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertMemberProfile = z.infer<typeof insertMemberProfileSchema>;
export type MemberProfile = typeof memberProfiles.$inferSelect;

// ---------------------------------------------------------------------------
// Advisor OS - Attio-connected client charts (Phase 1+)
// Website = customer intelligence layer; Attio = operational CRM.
// ---------------------------------------------------------------------------

export const visitors = pgTable("visitors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  visitorId: text("visitor_id").notNull().unique(),
  sessionId: text("session_id"),
  email: text("email"),
  phone: text("phone"),
  claimedMemberId: varchar("claimed_member_id"),
  firstPath: text("first_path"),
  lastPath: text("last_path"),
  visitCount: integer("visit_count").default(1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastActiveAt: timestamp("last_active_at").defaultNow().notNull(),
});

export const insertVisitorSchema = createInsertSchema(visitors).omit({
  id: true,
  createdAt: true,
  lastActiveAt: true,
});

export type InsertVisitor = z.infer<typeof insertVisitorSchema>;
export type Visitor = typeof visitors.$inferSelect;

export const clientProfiles = pgTable("client_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  visitorId: text("visitor_id").notNull().unique(),
  attioPersonId: text("attio_person_id"),
  attioRecordId: text("attio_record_id"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
  phone: text("phone"),
  situation: text("situation"),
  desiredOutcome: text("desired_outcome"),
  currentHousing: text("current_housing"),
  currentLocation: text("current_location"),
  targetLocations: text("target_locations").array(),
  propertyTypes: text("property_types").array(),
  budgetRange: text("budget_range"),
  timeline: text("timeline"),
  financingStatus: text("financing_status"),
  creditReadiness: text("credit_readiness"),
  downPaymentReadiness: text("down_payment_readiness"),
  decisionMakers: text("decision_makers").array(),
  constraints: text("constraints").array(),
  tradeOffs: text("trade_offs").array(),
  dealBreakers: text("deal_breakers").array(),
  buildingsViewed: text("buildings_viewed").array(),
  listingsViewed: text("listings_viewed").array(),
  readinessScore: integer("readiness_score"),
  belongingScore: integer("belonging_score"),
  leadScore: integer("lead_score").default(0),
  lifecycleStage: text("lifecycle_stage").notNull().default("anonymous"),
  nextRecommendedAction: text("next_recommended_action"),
  lastConversationSummary: text("last_conversation_summary"),
  internalAdvisorSummary: text("internal_advisor_summary"),
  assignedAdvisor: text("assigned_advisor"),
  assignedPartner: text("assigned_partner"),
  scoreBreakdown: text("score_breakdown"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  lastActiveAt: timestamp("last_active_at").defaultNow().notNull(),
});

export const insertClientProfileSchema = createInsertSchema(clientProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastActiveAt: true,
});

export type InsertClientProfile = z.infer<typeof insertClientProfileSchema>;
export type ClientProfileRow = typeof clientProfiles.$inferSelect;

export const chatSessions = pgTable("chat_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientProfileId: varchar("client_profile_id").notNull(),
  visitorId: text("visitor_id").notNull(),
  sessionId: text("session_id").notNull(),
  pagePath: text("page_path"),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type ChatSession = typeof chatSessions.$inferSelect;

export const chatMessages = pgTable("chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: varchar("session_id").notNull(),
  clientProfileId: varchar("client_profile_id").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  metadata: text("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;

export const profileEvents = pgTable("profile_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientProfileId: varchar("client_profile_id").notNull(),
  eventType: text("event_type").notNull(),
  detail: text("detail"),
  actorRole: text("actor_role").default("system"),
  actorId: text("actor_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ProfileEvent = typeof profileEvents.$inferSelect;

export const savedItems = pgTable("saved_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientProfileId: varchar("client_profile_id").notNull(),
  itemType: text("item_type").notNull(),
  title: text("title").notNull(),
  path: text("path"),
  externalId: text("external_id"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type SavedItem = typeof savedItems.$inferSelect;

export const goals = pgTable("goals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientProfileId: varchar("client_profile_id").notNull(),
  goal: text("goal").notNull(),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Goal = typeof goals.$inferSelect;

export const advisorReviews = pgTable("advisor_reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientProfileId: varchar("client_profile_id").notNull(),
  reviewDate: timestamp("review_date").notNull(),
  advisorId: text("advisor_id").notNull(),
  whatChanged: text("what_changed").notNull(),
  currentObjective: text("current_objective").notNull(),
  progressSinceLastReview: text("progress_since_last_review").notNull(),
  financialReadinessUpdate: text("financial_readiness_update"),
  housingUpdate: text("housing_update"),
  risks: text("risks").array(),
  recommendations: text("recommendations").array(),
  next90DayPlan: text("next_90_day_plan").array(),
  nextReviewDate: timestamp("next_review_date"),
  clientVisibleSummary: text("client_visible_summary").notNull(),
  internalNotes: text("internal_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type AdvisorReviewRow = typeof advisorReviews.$inferSelect;

export const attioSyncJobs = pgTable("attio_sync_jobs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientProfileId: varchar("client_profile_id").notNull(),
  action: text("action").notNull(),
  payload: text("payload").notNull(),
  status: text("status").notNull().default("pending"),
  attemptCount: integer("attempt_count").notNull().default(0),
  lastError: text("last_error"),
  nextRetryAt: timestamp("next_retry_at"),
  dedupeKey: text("dedupe_key"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type AttioSyncJobRow = typeof attioSyncJobs.$inferSelect;

export const attioSyncLogs = pgTable("attio_sync_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  jobId: varchar("job_id"),
  clientProfileId: varchar("client_profile_id"),
  action: text("action").notNull(),
  level: text("level").notNull().default("info"),
  message: text("message").notNull(),
  detail: text("detail"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type AttioSyncLogRow = typeof attioSyncLogs.$inferSelect;

export const accountClaimTokens = pgTable("account_claim_tokens", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  visitorId: text("visitor_id"),
  tokenHash: text("token_hash").notNull(),
  pinHash: text("pin_hash"),
  purpose: text("purpose").notNull().default("claim"),
  expiresAt: timestamp("expires_at").notNull(),
  consumedAt: timestamp("consumed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type AccountClaimToken = typeof accountClaimTokens.$inferSelect;

export const auditLogs = pgTable("audit_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  actorRole: text("actor_role").notNull(),
  actorId: text("actor_id"),
  action: text("action").notNull(),
  resourceType: text("resource_type").notNull(),
  resourceId: text("resource_id"),
  detail: text("detail"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type AuditLog = typeof auditLogs.$inferSelect;

export * from "./schema-buyer-intel";

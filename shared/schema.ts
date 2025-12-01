import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
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

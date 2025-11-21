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

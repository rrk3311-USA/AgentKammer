import { sql } from "drizzle-orm";
import { boolean, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

/** Twice-monthly Suggested shortlist. period_date is the 1st or 15th. */
export const curationBatches = pgTable("curation_batches", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  periodDate: timestamp("period_date").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCurationBatchSchema = createInsertSchema(curationBatches).omit({
  id: true,
  createdAt: true,
});

export type InsertCurationBatch = z.infer<typeof insertCurationBatchSchema>;
export type CurationBatch = typeof curationBatches.$inferSelect;

/**
 * Suggested (IQ) — system/reference only. Never collapsed into Selected.
 * v1 rows are operator-pasted StreetEasy / listing URLs, not MLS.
 */
export const curationSuggestions = pgTable("curation_suggestions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  batchId: varchar("batch_id").notNull(),
  address: text("address").notNull(),
  askPrice: text("ask_price"),
  band: text("band").notNull(),
  persona: text("persona"),
  notes: text("notes"),
  sourceUrl: text("source_url").notNull(),
  rawPayload: text("raw_payload"),
  rank: integer("rank").notNull().default(1),
  capturedAt: timestamp("captured_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCurationSuggestionSchema = createInsertSchema(curationSuggestions).omit({
  id: true,
  createdAt: true,
});

export type InsertCurationSuggestion = z.infer<typeof insertCurationSuggestionSchema>;
export type CurationSuggestion = typeof curationSuggestions.$inferSelect;

/**
 * Selected (Raphi) — Property Assessment queue.
 * on_sale controls the public drop. raphi_replaced is admin-secret.
 */
export const curationSelections = pgTable("curation_selections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  suggestionId: varchar("suggestion_id"),
  address: text("address").notNull(),
  askPrice: text("ask_price"),
  band: text("band").notNull(),
  persona: text("persona"),
  notes: text("notes"),
  sourceUrl: text("source_url").notNull(),
  onSale: boolean("on_sale").notNull().default(false),
  status: text("status").notNull().default("pending"),
  raphiReplaced: boolean("raphi_replaced").notNull().default(false),
  replacedSuggestionId: varchar("replaced_suggestion_id"),
  reportStatus: text("report_status").notNull().default("queued"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertCurationSelectionSchema = createInsertSchema(curationSelections).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertCurationSelection = z.infer<typeof insertCurationSelectionSchema>;
export type CurationSelection = typeof curationSelections.$inferSelect;

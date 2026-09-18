import { sql } from "drizzle-orm";
import { boolean, integer, pgTable, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

/**
 * Pay-to-run Tools wallet.
 * 1 credit = $1 = 1 paid analysis run.
 * First Livability Score run is free per wallet (visitor cookie or claimed member).
 */
export const toolWallets = pgTable(
  "tool_wallets",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    visitorId: text("visitor_id"),
    memberId: text("member_id"),
    email: text("email"),
    credits: integer("credits").notNull().default(0),
    freeLivabilityUsed: boolean("free_livability_used").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("tool_wallets_visitor_uidx").on(table.visitorId),
    uniqueIndex("tool_wallets_member_uidx").on(table.memberId),
  ],
);

export const toolCreditLedger = pgTable("tool_credit_ledger", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  walletId: varchar("wallet_id").notNull(),
  type: text("type").notNull(),
  credits: integer("credits").notNull(),
  reason: text("reason"),
  stripeSessionId: text("stripe_session_id"),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  runId: varchar("run_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const toolRuns = pgTable("tool_runs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  walletId: varchar("wallet_id").notNull(),
  toolSlug: text("tool_slug").notNull(),
  status: text("status").notNull().default("queued"),
  address: text("address"),
  listingUrl: text("listing_url"),
  imageCount: integer("image_count").notNull().default(0),
  inputMetadata: text("input_metadata"),
  resultJson: text("result_json"),
  chargedCredits: integer("charged_credits").notNull().default(0),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const toolPayments = pgTable("tool_payments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  walletId: varchar("wallet_id").notNull(),
  stripeSessionId: text("stripe_session_id"),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  amountCents: integer("amount_cents").notNull(),
  credits: integer("credits").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const insertToolWalletSchema = createInsertSchema(toolWallets).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertToolWallet = z.infer<typeof insertToolWalletSchema>;
export type ToolWalletRow = typeof toolWallets.$inferSelect;
export type ToolCreditLedgerRow = typeof toolCreditLedger.$inferSelect;
export type ToolRunRow = typeof toolRuns.$inferSelect;
export type ToolPaymentRow = typeof toolPayments.$inferSelect;

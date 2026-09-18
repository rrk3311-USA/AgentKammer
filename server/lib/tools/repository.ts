import { randomUUID } from "crypto";
import { and, desc, eq, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import {
  toolCreditLedger,
  toolPayments,
  toolRuns,
  toolWallets,
  type ToolCreditLedgerRow,
  type ToolPaymentRow,
  type ToolRunRow,
  type ToolWalletRow,
} from "@shared/schema-tools";
import type { CookieAdapter, CookieWalletSnapshot, ToolsMember } from "./identity";
import { emptyWalletSnapshot, readWalletCookie, writeWalletCookie } from "./identity";

export type ToolsPersistence = "database" | "cookie" | "memory";

export type LedgerInput = {
  type: "grant" | "topup" | "spend" | "refund" | "adjust";
  credits: number;
  reason?: string | null;
  stripeSessionId?: string | null;
  stripePaymentIntentId?: string | null;
  runId?: string | null;
};

export type RunInput = {
  toolSlug: string;
  status?: string;
  address?: string | null;
  listingUrl?: string | null;
  imageCount?: number;
  inputMetadata?: string | null;
  resultJson?: string | null;
  chargedCredits?: number;
  errorMessage?: string | null;
};

let db: ReturnType<typeof drizzle> | null = null;
try {
  if (process.env.DATABASE_URL) {
    db = drizzle(neon(process.env.DATABASE_URL));
  }
} catch {
  db = null;
}

const mem = {
  wallets: new Map<string, ToolWalletRow>(),
  ledger: new Map<string, ToolCreditLedgerRow>(),
  runs: new Map<string, ToolRunRow>(),
  payments: new Map<string, ToolPaymentRow>(),
};

export function resetToolsMemory() {
  mem.wallets.clear();
  mem.ledger.clear();
  mem.runs.clear();
  mem.payments.clear();
}

export function toolsUsesDatabase(): boolean {
  return db != null;
}

function now() {
  return new Date();
}

function toDate(value: Date | string): Date {
  return value instanceof Date ? value : new Date(value);
}

function snapshotFromWallet(
  wallet: ToolWalletRow,
  extras?: Partial<CookieWalletSnapshot>,
): CookieWalletSnapshot {
  return {
    id: wallet.id,
    visitorId: wallet.visitorId || "",
    memberId: wallet.memberId,
    email: wallet.email,
    credits: wallet.credits,
    freeLivabilityUsed: wallet.freeLivabilityUsed,
    ledger: extras?.ledger || [],
    runs: extras?.runs || [],
    payments: extras?.payments || [],
  };
}

function walletFromSnapshot(snapshot: CookieWalletSnapshot): ToolWalletRow {
  const stamp = now();
  return {
    id: snapshot.id,
    visitorId: snapshot.visitorId || null,
    memberId: snapshot.memberId,
    email: snapshot.email,
    credits: snapshot.credits,
    freeLivabilityUsed: snapshot.freeLivabilityUsed,
    createdAt: stamp,
    updatedAt: stamp,
  };
}

export class ToolsRepository {
  persistence: ToolsPersistence;
  private cookies?: CookieAdapter;
  private snapshot: CookieWalletSnapshot | null;

  constructor(cookies?: CookieAdapter) {
    this.cookies = cookies;
    if (db) {
      this.persistence = "database";
      this.snapshot = null;
    } else if (cookies) {
      this.persistence = "cookie";
      this.snapshot = readWalletCookie(cookies);
    } else {
      this.persistence = "memory";
      this.snapshot = null;
    }
  }

  private persistCookie() {
    if (this.persistence === "cookie" && this.cookies && this.snapshot) {
      writeWalletCookie(this.cookies, this.snapshot);
    }
  }

  async getWalletById(id: string): Promise<ToolWalletRow | undefined> {
    if (this.persistence === "database" && db) {
      const rows = await db.select().from(toolWallets).where(eq(toolWallets.id, id)).limit(1);
      return rows[0];
    }
    if (this.snapshot?.id === id) return walletFromSnapshot(this.snapshot);
    return Array.from(mem.wallets.values()).find((wallet) => wallet.id === id);
  }

  async findWallet(input: { visitorId?: string | null; memberId?: string | null }): Promise<ToolWalletRow | undefined> {
    if (this.persistence === "database" && db) {
      const clauses = [];
      if (input.memberId) clauses.push(eq(toolWallets.memberId, input.memberId));
      if (input.visitorId) clauses.push(eq(toolWallets.visitorId, input.visitorId));
      if (!clauses.length) return undefined;
      const rows = await db
        .select()
        .from(toolWallets)
        .where(clauses.length === 1 ? clauses[0] : or(...clauses))
        .limit(8);
      return rows.find((row) => input.memberId && row.memberId === input.memberId) || rows[0];
    }
    if (this.snapshot) {
      if (input.memberId && this.snapshot.memberId === input.memberId) return walletFromSnapshot(this.snapshot);
      if (input.visitorId && this.snapshot.visitorId === input.visitorId) return walletFromSnapshot(this.snapshot);
    }
    return Array.from(mem.wallets.values()).find((wallet) => {
      if (input.memberId && wallet.memberId === input.memberId) return true;
      if (input.visitorId && wallet.visitorId === input.visitorId) return true;
      return false;
    });
  }

  async getOrCreateWallet(input: {
    visitorId: string;
    member?: ToolsMember | null;
  }): Promise<ToolWalletRow> {
    const memberId = input.member?.id || null;
    const existing = await this.findWallet({ visitorId: input.visitorId, memberId });
    if (existing) {
      const needsMember = memberId && existing.memberId !== memberId;
      const needsEmail = input.member?.email && existing.email !== input.member.email;
      if (needsMember || needsEmail) {
        return this.updateWallet(existing.id, {
          memberId: memberId || existing.memberId,
          email: input.member?.email || existing.email,
          visitorId: existing.visitorId || input.visitorId,
        });
      }
      return existing;
    }

    if (memberId) {
      const visitorWallet = await this.findWallet({ visitorId: input.visitorId });
      const memberWallet = await this.findWallet({ memberId });
      if (visitorWallet && memberWallet && visitorWallet.id !== memberWallet.id) {
        return this.mergeWallets(memberWallet, visitorWallet);
      }
    }

    const created: ToolWalletRow = {
      id: `tlw_${randomUUID()}`,
      visitorId: input.visitorId,
      memberId,
      email: input.member?.email || null,
      credits: 0,
      freeLivabilityUsed: false,
      createdAt: now(),
      updatedAt: now(),
    };

    if (this.persistence === "database" && db) {
      const rows = await db.insert(toolWallets).values(created).returning();
      return rows[0] || created;
    }

    if (this.persistence === "cookie") {
      this.snapshot = emptyWalletSnapshot(input.visitorId, input.member);
      this.snapshot.id = created.id;
      this.persistCookie();
      return created;
    }

    mem.wallets.set(created.id, created);
    return created;
  }

  async updateWallet(id: string, patch: Partial<ToolWalletRow>): Promise<ToolWalletRow> {
    const current = await this.getWalletById(id);
    if (!current) throw new Error("Wallet not found");
    const next: ToolWalletRow = { ...current, ...patch, id: current.id, updatedAt: now() };

    if (this.persistence === "database" && db) {
      const rows = await db.update(toolWallets).set(next).where(eq(toolWallets.id, id)).returning();
      return rows[0] || next;
    }
    if (this.persistence === "cookie" && this.snapshot) {
      this.snapshot = {
        ...this.snapshot,
        credits: next.credits,
        freeLivabilityUsed: next.freeLivabilityUsed,
        memberId: next.memberId,
        email: next.email,
        visitorId: next.visitorId || this.snapshot.visitorId,
      };
      this.persistCookie();
      return next;
    }
    mem.wallets.set(id, next);
    return next;
  }

  async mergeWallets(keep: ToolWalletRow, incoming: ToolWalletRow): Promise<ToolWalletRow> {
    const merged = await this.updateWallet(keep.id, {
      credits: keep.credits + incoming.credits,
      freeLivabilityUsed: keep.freeLivabilityUsed || incoming.freeLivabilityUsed,
      visitorId: keep.visitorId || incoming.visitorId,
      memberId: keep.memberId || incoming.memberId,
      email: keep.email || incoming.email,
    });
    if (this.persistence === "database" && db && incoming.id !== keep.id) {
      await db.update(toolRuns).set({ walletId: keep.id }).where(eq(toolRuns.walletId, incoming.id));
      await db.update(toolCreditLedger).set({ walletId: keep.id }).where(eq(toolCreditLedger.walletId, incoming.id));
      await db.update(toolPayments).set({ walletId: keep.id }).where(eq(toolPayments.walletId, incoming.id));
      await db.delete(toolWallets).where(eq(toolWallets.id, incoming.id));
    }
    return merged;
  }

  async addLedger(walletId: string, input: LedgerInput): Promise<ToolCreditLedgerRow> {
    if (input.stripeSessionId) {
      const existing = await this.getLedgerByStripeSession(input.stripeSessionId);
      if (existing) return existing;
    }
    const row: ToolCreditLedgerRow = {
      id: `tll_${randomUUID()}`,
      walletId,
      type: input.type,
      credits: input.credits,
      reason: input.reason || null,
      stripeSessionId: input.stripeSessionId || null,
      stripePaymentIntentId: input.stripePaymentIntentId || null,
      runId: input.runId || null,
      createdAt: now(),
    };
    if (this.persistence === "database" && db) {
      const inserted = await db.insert(toolCreditLedger).values(row).returning();
      return inserted[0] || row;
    }
    if (this.persistence === "cookie" && this.snapshot) {
      this.snapshot.ledger = [
        {
          id: row.id,
          type: row.type,
          credits: row.credits,
          reason: row.reason,
          stripeSessionId: row.stripeSessionId,
          runId: row.runId,
          createdAt: row.createdAt.toISOString(),
        },
        ...this.snapshot.ledger,
      ];
      this.persistCookie();
      return row;
    }
    mem.ledger.set(row.id, row);
    return row;
  }

  async getLedgerByStripeSession(sessionId: string): Promise<ToolCreditLedgerRow | undefined> {
    if (this.persistence === "database" && db) {
      const rows = await db
        .select()
        .from(toolCreditLedger)
        .where(eq(toolCreditLedger.stripeSessionId, sessionId))
        .limit(1);
      return rows[0];
    }
    if (this.snapshot) {
      const found = this.snapshot.ledger.find((entry) => entry.stripeSessionId === sessionId);
      if (!found) return undefined;
      return {
        id: found.id,
        walletId: this.snapshot.id,
        type: found.type,
        credits: found.credits,
        reason: found.reason,
        stripeSessionId: found.stripeSessionId,
        stripePaymentIntentId: null,
        runId: found.runId,
        createdAt: toDate(found.createdAt),
      };
    }
    return Array.from(mem.ledger.values()).find((entry) => entry.stripeSessionId === sessionId);
  }

  async listLedger(walletId: string): Promise<ToolCreditLedgerRow[]> {
    if (this.persistence === "database" && db) {
      return db
        .select()
        .from(toolCreditLedger)
        .where(eq(toolCreditLedger.walletId, walletId))
        .orderBy(desc(toolCreditLedger.createdAt));
    }
    if (this.snapshot && this.snapshot.id === walletId) {
      return this.snapshot.ledger.map((entry) => ({
        id: entry.id,
        walletId,
        type: entry.type,
        credits: entry.credits,
        reason: entry.reason,
        stripeSessionId: entry.stripeSessionId,
        stripePaymentIntentId: null,
        runId: entry.runId,
        createdAt: toDate(entry.createdAt),
      }));
    }
    return Array.from(mem.ledger.values())
      .filter((entry) => entry.walletId === walletId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createRun(walletId: string, input: RunInput): Promise<ToolRunRow> {
    const stamp = now();
    const row: ToolRunRow = {
      id: `tlr_${randomUUID()}`,
      walletId,
      toolSlug: input.toolSlug,
      status: input.status || "queued",
      address: input.address || null,
      listingUrl: input.listingUrl || null,
      imageCount: input.imageCount || 0,
      inputMetadata: input.inputMetadata || null,
      resultJson: input.resultJson || null,
      chargedCredits: input.chargedCredits || 0,
      errorMessage: input.errorMessage || null,
      createdAt: stamp,
      updatedAt: stamp,
    };
    if (this.persistence === "database" && db) {
      const inserted = await db.insert(toolRuns).values(row).returning();
      return inserted[0] || row;
    }
    if (this.persistence === "cookie" && this.snapshot) {
      this.snapshot.runs = [
        {
          id: row.id,
          toolSlug: row.toolSlug,
          status: row.status,
          address: row.address,
          listingUrl: row.listingUrl,
          imageCount: row.imageCount,
          inputMetadata: row.inputMetadata,
          resultJson: row.resultJson,
          chargedCredits: row.chargedCredits,
          errorMessage: row.errorMessage,
          createdAt: row.createdAt.toISOString(),
          updatedAt: row.updatedAt.toISOString(),
        },
        ...this.snapshot.runs,
      ];
      this.persistCookie();
      return row;
    }
    mem.runs.set(row.id, row);
    return row;
  }

  async updateRun(id: string, patch: Partial<ToolRunRow>): Promise<ToolRunRow | undefined> {
    const current = await this.getRun(id);
    if (!current) return undefined;
    const next: ToolRunRow = { ...current, ...patch, id: current.id, updatedAt: now() };
    if (this.persistence === "database" && db) {
      const rows = await db.update(toolRuns).set(next).where(eq(toolRuns.id, id)).returning();
      return rows[0] || next;
    }
    if (this.persistence === "cookie" && this.snapshot) {
      this.snapshot.runs = this.snapshot.runs.map((run) =>
        run.id === id
          ? {
              ...run,
              status: next.status,
              resultJson: next.resultJson,
              chargedCredits: next.chargedCredits,
              errorMessage: next.errorMessage,
              updatedAt: next.updatedAt.toISOString(),
            }
          : run,
      );
      this.persistCookie();
      return next;
    }
    mem.runs.set(id, next);
    return next;
  }

  async getRun(id: string): Promise<ToolRunRow | undefined> {
    if (this.persistence === "database" && db) {
      const rows = await db.select().from(toolRuns).where(eq(toolRuns.id, id)).limit(1);
      return rows[0];
    }
    if (this.snapshot) {
      const found = this.snapshot.runs.find((run) => run.id === id);
      if (!found) return undefined;
      return {
        id: found.id,
        walletId: this.snapshot.id,
        toolSlug: found.toolSlug,
        status: found.status,
        address: found.address,
        listingUrl: found.listingUrl,
        imageCount: found.imageCount,
        inputMetadata: found.inputMetadata,
        resultJson: found.resultJson,
        chargedCredits: found.chargedCredits,
        errorMessage: found.errorMessage,
        createdAt: toDate(found.createdAt),
        updatedAt: toDate(found.updatedAt),
      };
    }
    return mem.runs.get(id);
  }

  async listRuns(walletId: string): Promise<ToolRunRow[]> {
    if (this.persistence === "database" && db) {
      return db.select().from(toolRuns).where(eq(toolRuns.walletId, walletId)).orderBy(desc(toolRuns.createdAt));
    }
    if (this.snapshot && this.snapshot.id === walletId) {
      return this.snapshot.runs.map((run) => ({
        id: run.id,
        walletId,
        toolSlug: run.toolSlug,
        status: run.status,
        address: run.address,
        listingUrl: run.listingUrl,
        imageCount: run.imageCount,
        inputMetadata: run.inputMetadata,
        resultJson: run.resultJson,
        chargedCredits: run.chargedCredits,
        errorMessage: run.errorMessage,
        createdAt: toDate(run.createdAt),
        updatedAt: toDate(run.updatedAt),
      }));
    }
    return Array.from(mem.runs.values())
      .filter((run) => run.walletId === walletId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async savePayment(input: {
    walletId: string;
    stripeSessionId?: string | null;
    stripePaymentIntentId?: string | null;
    amountCents: number;
    credits: number;
    status: string;
  }): Promise<ToolPaymentRow> {
    if (input.stripeSessionId) {
      const existing = await this.getPaymentBySession(input.stripeSessionId);
      if (existing) {
        return (await this.updatePayment(existing.id, input)) || existing;
      }
    }
    const row: ToolPaymentRow = {
      id: `tlp_${randomUUID()}`,
      walletId: input.walletId,
      stripeSessionId: input.stripeSessionId || null,
      stripePaymentIntentId: input.stripePaymentIntentId || null,
      amountCents: input.amountCents,
      credits: input.credits,
      status: input.status,
      createdAt: now(),
      updatedAt: now(),
    };
    if (this.persistence === "database" && db) {
      const inserted = await db.insert(toolPayments).values(row).returning();
      return inserted[0] || row;
    }
    if (this.persistence === "cookie" && this.snapshot) {
      this.snapshot.payments = [
        {
          id: row.id,
          stripeSessionId: row.stripeSessionId,
          stripePaymentIntentId: row.stripePaymentIntentId,
          amountCents: row.amountCents,
          credits: row.credits,
          status: row.status,
          createdAt: row.createdAt.toISOString(),
        },
        ...this.snapshot.payments,
      ];
      this.persistCookie();
      return row;
    }
    mem.payments.set(row.id, row);
    return row;
  }

  async updatePayment(id: string, patch: Partial<ToolPaymentRow>): Promise<ToolPaymentRow | undefined> {
    const current = await this.getPayment(id);
    if (!current) return undefined;
    const next: ToolPaymentRow = { ...current, ...patch, id: current.id, updatedAt: now() };
    if (this.persistence === "database" && db) {
      const rows = await db.update(toolPayments).set(next).where(eq(toolPayments.id, id)).returning();
      return rows[0] || next;
    }
    if (this.persistence === "cookie" && this.snapshot) {
      this.snapshot.payments = this.snapshot.payments.map((payment) =>
        payment.id === id
          ? {
              ...payment,
              status: next.status,
              stripePaymentIntentId: next.stripePaymentIntentId,
            }
          : payment,
      );
      this.persistCookie();
      return next;
    }
    mem.payments.set(id, next);
    return next;
  }

  async getPayment(id: string): Promise<ToolPaymentRow | undefined> {
    if (this.persistence === "database" && db) {
      const rows = await db.select().from(toolPayments).where(eq(toolPayments.id, id)).limit(1);
      return rows[0];
    }
    if (this.snapshot) {
      const found = this.snapshot.payments.find((payment) => payment.id === id);
      if (!found) return undefined;
      return {
        id: found.id,
        walletId: this.snapshot.id,
        stripeSessionId: found.stripeSessionId,
        stripePaymentIntentId: found.stripePaymentIntentId,
        amountCents: found.amountCents,
        credits: found.credits,
        status: found.status,
        createdAt: toDate(found.createdAt),
        updatedAt: toDate(found.createdAt),
      };
    }
    return mem.payments.get(id);
  }

  async getPaymentBySession(sessionId: string): Promise<ToolPaymentRow | undefined> {
    if (this.persistence === "database" && db) {
      const rows = await db.select().from(toolPayments).where(eq(toolPayments.stripeSessionId, sessionId)).limit(1);
      return rows[0];
    }
    if (this.snapshot) {
      const found = this.snapshot.payments.find((payment) => payment.stripeSessionId === sessionId);
      if (!found) return undefined;
      return {
        id: found.id,
        walletId: this.snapshot.id,
        stripeSessionId: found.stripeSessionId,
        stripePaymentIntentId: found.stripePaymentIntentId,
        amountCents: found.amountCents,
        credits: found.credits,
        status: found.status,
        createdAt: toDate(found.createdAt),
        updatedAt: toDate(found.createdAt),
      };
    }
    return Array.from(mem.payments.values()).find((payment) => payment.stripeSessionId === sessionId);
  }
}

export function publicRun(run: ToolRunRow) {
  let result: unknown = null;
  if (run.resultJson) {
    try {
      result = JSON.parse(run.resultJson);
    } catch {
      result = null;
    }
  }
  return {
    id: run.id,
    toolSlug: run.toolSlug,
    status: run.status,
    address: run.address,
    listingUrl: run.listingUrl,
    imageCount: run.imageCount,
    chargedCredits: run.chargedCredits,
    errorMessage: run.errorMessage,
    result,
    createdAt: run.createdAt,
    updatedAt: run.updatedAt,
  };
}

// keep drizzle `and` available for future transactional charge updates
void and;

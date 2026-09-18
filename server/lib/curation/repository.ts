import { randomUUID } from "crypto";
import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import {
  curationBatches,
  curationSelections,
  curationSuggestions,
  type CurationBatch,
  type CurationSelection,
  type CurationSuggestion,
} from "@shared/schema-curation";
import {
  MAX_ON_SALE,
  isHttpUrl,
  isPriceBand,
  isReportStatus,
  isSelectionStatus,
  looksLikeRentalUrl,
} from "./types";

let db: ReturnType<typeof drizzle> | null = null;
try {
  if (process.env.DATABASE_URL && !process.env.VITEST) {
    db = drizzle(neon(process.env.DATABASE_URL));
  }
} catch {
  db = null;
}

type Mem = {
  batches: CurationBatch[];
  suggestions: CurationSuggestion[];
  selections: CurationSelection[];
};

const mem: Mem = {
  batches: [],
  suggestions: [],
  selections: [],
};

function now() {
  return new Date();
}

function asDate(value: Date | string | null | undefined, fallback = now()): Date {
  if (!value) return fallback;
  return value instanceof Date ? value : new Date(value);
}

export function curationUsesDatabase(): boolean {
  return Boolean(db);
}

export function resetCurationMemory() {
  mem.batches.length = 0;
  mem.suggestions.length = 0;
  mem.selections.length = 0;
}

export class CurationError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

function rejectRentalOrBadUrl(sourceUrl: string) {
  if (!isHttpUrl(sourceUrl)) {
    throw new CurationError("Paste a full listing URL (https://…).");
  }
  if (looksLikeRentalUrl(sourceUrl)) {
    throw new CurationError("Sale listings only. Rentals stay out of Curation IQ.");
  }
}

function requireBand(band: string) {
  if (!isPriceBand(band)) {
    throw new CurationError("Band must be $5–10M, $10–15M, or $15–20M (trophy).");
  }
  return band;
}

async function countOnSale(excludeId?: string): Promise<number> {
  if (db) {
    const rows = await db.select().from(curationSelections);
    return rows.filter((row) => row.onSale && row.id !== excludeId).length;
  }
  return mem.selections.filter((row) => row.onSale && row.id !== excludeId).length;
}

export async function listBatches(): Promise<CurationBatch[]> {
  try {
    if (db) {
      return await db.select().from(curationBatches).orderBy(desc(curationBatches.periodDate));
    }
    return [...mem.batches].sort((a, b) => asDate(b.periodDate).getTime() - asDate(a.periodDate).getTime());
  } catch (error) {
    console.warn("[curation] listBatches failed — DB may be missing tables", error);
    return [...mem.batches].sort((a, b) => asDate(b.periodDate).getTime() - asDate(a.periodDate).getTime());
  }
}

export async function getBatch(id: string): Promise<CurationBatch | undefined> {
  if (db) {
    const rows = await db.select().from(curationBatches).where(eq(curationBatches.id, id)).limit(1);
    return rows[0];
  }
  return mem.batches.find((row) => row.id === id);
}

export async function createBatch(input: { periodDate: Date; notes?: string | null }): Promise<CurationBatch> {
  const existing = await listBatches();
  const clash = existing.find(
    (row) => asDate(row.periodDate).toISOString().slice(0, 10) === input.periodDate.toISOString().slice(0, 10),
  );
  if (clash) return clash;

  const row: CurationBatch = {
    id: randomUUID(),
    periodDate: input.periodDate,
    notes: input.notes ?? null,
    createdAt: now(),
  };

  try {
    if (db) {
      const [created] = await db.insert(curationBatches).values(row).returning();
      return created;
    }
  } catch (error) {
    console.warn("[curation] createBatch falling back to memory", error);
  }
  mem.batches.push(row);
  return row;
}

export async function listSuggestions(batchId?: string): Promise<CurationSuggestion[]> {
  try {
    if (db) {
      const rows = batchId
        ? await db.select().from(curationSuggestions).where(eq(curationSuggestions.batchId, batchId))
        : await db.select().from(curationSuggestions);
      return rows.sort((a, b) => a.rank - b.rank || asDate(a.createdAt).getTime() - asDate(b.createdAt).getTime());
    }
  } catch (error) {
    console.warn("[curation] listSuggestions failed", error);
  }
  return mem.suggestions
    .filter((row) => !batchId || row.batchId === batchId)
    .sort((a, b) => a.rank - b.rank || asDate(a.createdAt).getTime() - asDate(b.createdAt).getTime());
}

export async function getSuggestion(id: string): Promise<CurationSuggestion | undefined> {
  if (db) {
    const rows = await db.select().from(curationSuggestions).where(eq(curationSuggestions.id, id)).limit(1);
    return rows[0];
  }
  return mem.suggestions.find((row) => row.id === id);
}

export async function addSuggestion(input: {
  batchId: string;
  address: string;
  askPrice?: string | null;
  band: string;
  persona?: string | null;
  notes?: string | null;
  sourceUrl: string;
  rawPayload?: string | null;
  rank?: number;
  capturedAt?: Date;
}): Promise<CurationSuggestion> {
  const batch = await getBatch(input.batchId);
  if (!batch) throw new CurationError("Suggested batch not found.", 404);
  rejectRentalOrBadUrl(input.sourceUrl);
  const band = requireBand(input.band);
  const address = input.address.trim();
  if (!address) throw new CurationError("Address is required.");

  const existing = await listSuggestions(input.batchId);
  const row: CurationSuggestion = {
    id: randomUUID(),
    batchId: input.batchId,
    address,
    askPrice: input.askPrice?.trim() || null,
    band,
    persona: input.persona?.trim() || null,
    notes: input.notes?.trim() || null,
    sourceUrl: input.sourceUrl.trim(),
    rawPayload: input.rawPayload ?? null,
    rank: input.rank ?? existing.length + 1,
    capturedAt: input.capturedAt ?? now(),
    createdAt: now(),
  };

  try {
    if (db) {
      const [created] = await db.insert(curationSuggestions).values(row).returning();
      return created;
    }
  } catch (error) {
    console.warn("[curation] addSuggestion falling back to memory", error);
  }
  mem.suggestions.push(row);
  return row;
}

export async function listSelections(filter?: { raphiReplaced?: boolean }): Promise<CurationSelection[]> {
  try {
    if (db) {
      const rows = await db.select().from(curationSelections).orderBy(desc(curationSelections.updatedAt));
      return rows.filter((row) =>
        filter?.raphiReplaced == null ? true : row.raphiReplaced === filter.raphiReplaced,
      );
    }
  } catch (error) {
    console.warn("[curation] listSelections failed", error);
  }
  return mem.selections
    .filter((row) => (filter?.raphiReplaced == null ? true : row.raphiReplaced === filter.raphiReplaced))
    .sort((a, b) => asDate(b.updatedAt).getTime() - asDate(a.updatedAt).getTime());
}

export async function getSelection(id: string): Promise<CurationSelection | undefined> {
  if (db) {
    const rows = await db.select().from(curationSelections).where(eq(curationSelections.id, id)).limit(1);
    return rows[0];
  }
  return mem.selections.find((row) => row.id === id);
}

export async function promoteSuggestion(suggestionId: string): Promise<CurationSelection> {
  const suggestion = await getSuggestion(suggestionId);
  if (!suggestion) throw new CurationError("Suggested listing not found.", 404);

  const already = (await listSelections()).find((row) => row.suggestionId === suggestionId);
  if (already) return already;

  const row: CurationSelection = {
    id: randomUUID(),
    suggestionId: suggestion.id,
    address: suggestion.address,
    askPrice: suggestion.askPrice,
    band: suggestion.band,
    persona: suggestion.persona,
    notes: suggestion.notes,
    sourceUrl: suggestion.sourceUrl,
    onSale: false,
    status: "pending",
    raphiReplaced: false,
    replacedSuggestionId: null,
    reportStatus: "queued",
    createdAt: now(),
    updatedAt: now(),
  };

  try {
    if (db) {
      const [created] = await db.insert(curationSelections).values(row).returning();
      return created;
    }
  } catch (error) {
    console.warn("[curation] promoteSuggestion falling back to memory", error);
  }
  mem.selections.push(row);
  return row;
}

export async function updateSelection(
  id: string,
  patch: {
    address?: string;
    askPrice?: string | null;
    band?: string;
    persona?: string | null;
    notes?: string | null;
    sourceUrl?: string;
    status?: string;
    reportStatus?: string;
    replaceAsRaphi?: boolean;
  },
): Promise<CurationSelection> {
  const current = await getSelection(id);
  if (!current) throw new CurationError("Selected listing not found.", 404);

  if (patch.sourceUrl) rejectRentalOrBadUrl(patch.sourceUrl);
  if (patch.band) requireBand(patch.band);
  if (patch.status && !isSelectionStatus(patch.status)) {
    throw new CurationError("Unknown Selected status.");
  }
  if (patch.reportStatus && !isReportStatus(patch.reportStatus)) {
    throw new CurationError("Unknown report status.");
  }

  const nextAddress = patch.address?.trim() ?? current.address;
  const nextUrl = patch.sourceUrl?.trim() ?? current.sourceUrl;
  const listingChanged =
    Boolean(current.suggestionId) &&
    (nextAddress !== current.address || nextUrl !== current.sourceUrl);
  const markReplaced = Boolean(patch.replaceAsRaphi) || listingChanged;

  const next: CurationSelection = {
    ...current,
    address: nextAddress,
    askPrice: patch.askPrice !== undefined ? patch.askPrice?.trim() || null : current.askPrice,
    band: patch.band ?? current.band,
    persona: patch.persona !== undefined ? patch.persona?.trim() || null : current.persona,
    notes: patch.notes !== undefined ? patch.notes?.trim() || null : current.notes,
    sourceUrl: nextUrl,
    status: patch.status ?? current.status,
    reportStatus: patch.reportStatus ?? current.reportStatus,
    raphiReplaced: markReplaced ? true : current.raphiReplaced,
    replacedSuggestionId: markReplaced
      ? current.replacedSuggestionId || current.suggestionId
      : current.replacedSuggestionId,
    updatedAt: now(),
  };

  try {
    if (db) {
      const [updated] = await db
        .update(curationSelections)
        .set({
          address: next.address,
          askPrice: next.askPrice,
          band: next.band,
          persona: next.persona,
          notes: next.notes,
          sourceUrl: next.sourceUrl,
          status: next.status,
          reportStatus: next.reportStatus,
          raphiReplaced: next.raphiReplaced,
          replacedSuggestionId: next.replacedSuggestionId,
          updatedAt: next.updatedAt,
        })
        .where(eq(curationSelections.id, id))
        .returning();
      return updated;
    }
  } catch (error) {
    console.warn("[curation] updateSelection falling back to memory", error);
  }

  const index = mem.selections.findIndex((row) => row.id === id);
  if (index >= 0) mem.selections[index] = next;
  return next;
}

export async function setOnSale(id: string, onSale: boolean): Promise<CurationSelection> {
  const current = await getSelection(id);
  if (!current) throw new CurationError("Selected listing not found.", 404);

  if (onSale && !current.onSale) {
    const live = await countOnSale(id);
    if (live >= MAX_ON_SALE) {
      throw new CurationError(
        `Cap is ${MAX_ON_SALE} live on-sale picks. Turn another off before publishing this one.`,
      );
    }
  }

  const next: CurationSelection = {
    ...current,
    onSale,
    status: onSale
      ? current.status === "pending"
        ? "on_sale"
        : current.status
      : current.status === "on_sale"
        ? "pending"
        : current.status,
    updatedAt: now(),
  };

  try {
    if (db) {
      const [updated] = await db
        .update(curationSelections)
        .set({ onSale: next.onSale, status: next.status, updatedAt: next.updatedAt })
        .where(eq(curationSelections.id, id))
        .returning();
      return updated;
    }
  } catch (error) {
    console.warn("[curation] setOnSale falling back to memory", error);
  }

  const index = mem.selections.findIndex((row) => row.id === id);
  if (index >= 0) mem.selections[index] = next;
  return next;
}

/** Public drop: on-sale only. Never expose raphi_replaced. */
export async function listPublicPicks(limit = MAX_ON_SALE) {
  const rows = (await listSelections()).filter((row) => row.onSale).slice(0, Math.min(limit, MAX_ON_SALE));
  return rows.map((row) => ({
    id: row.id,
    address: row.address,
    askPrice: row.askPrice,
    band: row.band,
    sourceUrl: row.sourceUrl,
    status: row.status,
    notes: row.notes,
  }));
}

export type CurationDesk = {
  storageMode: "database" | "memory";
  batches: CurationBatch[];
  suggestions: CurationSuggestion[];
  selections: CurationSelection[];
  onSaleCount: number;
};

export async function getCurationDesk(input?: {
  batchId?: string;
  raphiReplaced?: boolean;
}): Promise<CurationDesk> {
  const batches = await listBatches();
  const batchId = input?.batchId || batches[0]?.id;
  const suggestions = batchId ? await listSuggestions(batchId) : [];
  const selections = await listSelections(
    input?.raphiReplaced == null ? undefined : { raphiReplaced: input.raphiReplaced },
  );
  return {
    storageMode: curationUsesDatabase() ? "database" : "memory",
    batches,
    suggestions,
    selections,
    onSaleCount: (await listSelections()).filter((row) => row.onSale).length,
  };
}

import type { Express, NextFunction, Request, Response } from "express";
import { z } from "zod";
import {
  addSuggestion,
  createBatch,
  CurationError,
  curationUsesDatabase,
  getCurationDesk,
  listPublicPicks,
  promoteSuggestion,
  setOnSale,
  updateSelection,
} from "./repository";
import { ensureCurationSeeded, seedCurationSample } from "./seed";
import { PRICE_BANDS, parsePeriodDate, REPORT_STATUSES, SELECTION_STATUSES } from "./types";

const suggestionBody = z.object({
  batchId: z.string().min(1),
  address: z.string().min(1),
  sourceUrl: z.string().min(1),
  askPrice: z.string().optional().nullable(),
  band: z.enum(PRICE_BANDS),
  persona: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  rank: z.number().int().positive().optional(),
});

const selectionPatch = z.object({
  address: z.string().min(1).optional(),
  sourceUrl: z.string().min(1).optional(),
  askPrice: z.string().optional().nullable(),
  band: z.enum(PRICE_BANDS).optional(),
  persona: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  status: z.enum(SELECTION_STATUSES).optional(),
  reportStatus: z.enum(REPORT_STATUSES).optional(),
  replaceAsRaphi: z.boolean().optional(),
});

function fail(res: Response, error: unknown) {
  if (error instanceof CurationError) {
    return res.status(error.status).json({ error: error.message });
  }
  if (error instanceof z.ZodError) {
    return res.status(400).json({ error: error.errors[0]?.message || "Invalid payload" });
  }
  console.error("[curation]", error);
  return res.status(500).json({ error: "Curation IQ request failed" });
}

export function registerCurationAdminRoutes(
  app: Express,
  requireAdmin: (req: Request, res: Response, next: NextFunction) => void,
) {
  app.get("/api/admin/curation/status", requireAdmin, async (_req, res) => {
    res.json({
      ok: true,
      database: curationUsesDatabase(),
      storageMode: curationUsesDatabase() ? "database" : "memory",
      source: "operator_paste",
      mls: "stub",
    });
  });

  app.get("/api/admin/curation", requireAdmin, async (req, res) => {
    try {
      await ensureCurationSeeded();
      const replaced = req.query.raphiReplaced;
      const desk = await getCurationDesk({
        batchId: typeof req.query.batchId === "string" ? req.query.batchId : undefined,
        raphiReplaced:
          replaced === "true" ? true : replaced === "false" ? false : undefined,
      });
      res.json({ ok: true, ...desk });
    } catch (error) {
      fail(res, error);
    }
  });

  app.post("/api/admin/curation/seed", requireAdmin, async (req, res) => {
    try {
      const force = Boolean(req.body?.force);
      const result = await seedCurationSample(force);
      res.json({ ok: true, ...result, storageMode: curationUsesDatabase() ? "database" : "memory" });
    } catch (error) {
      fail(res, error);
    }
  });

  app.post("/api/admin/curation/batches", requireAdmin, async (req, res) => {
    try {
      const body = z
        .object({
          periodDate: z.string().min(1),
          notes: z.string().optional().nullable(),
        })
        .parse(req.body);
      const period = parsePeriodDate(body.periodDate);
      if (!period) {
        return res.status(400).json({ error: "periodDate must be a 1st or 15th (YYYY-MM-DD)." });
      }
      const batch = await createBatch({ periodDate: period, notes: body.notes });
      res.json({ ok: true, batch });
    } catch (error) {
      fail(res, error);
    }
  });

  app.post("/api/admin/curation/suggestions", requireAdmin, async (req, res) => {
    try {
      const body = suggestionBody.parse(req.body);
      const suggestion = await addSuggestion(body);
      res.json({ ok: true, suggestion });
    } catch (error) {
      fail(res, error);
    }
  });

  app.post("/api/admin/curation/suggestions/:id/promote", requireAdmin, async (req, res) => {
    try {
      const selection = await promoteSuggestion(req.params.id);
      res.json({ ok: true, selection });
    } catch (error) {
      fail(res, error);
    }
  });

  app.patch("/api/admin/curation/selections/:id", requireAdmin, async (req, res) => {
    try {
      const patch = selectionPatch.parse(req.body);
      const selection = await updateSelection(req.params.id, patch);
      res.json({ ok: true, selection });
    } catch (error) {
      fail(res, error);
    }
  });

  app.post("/api/admin/curation/selections/:id/on-sale", requireAdmin, async (req, res) => {
    try {
      const body = z.object({ onSale: z.boolean() }).parse(req.body);
      const selection = await setOnSale(req.params.id, body.onSale);
      res.json({ ok: true, selection });
    } catch (error) {
      fail(res, error);
    }
  });
}

/** Buyer-facing hook. No admin mark. Empty is fine if nothing is on sale. */
export function registerCurationPublicRoutes(app: Express) {
  app.get("/api/curation/picks", async (_req, res) => {
    try {
      const picks = await listPublicPicks();
      res.json({
        ok: true,
        picks,
        cap: 5,
        note: "Selected on-sale only. Pins and StreetEasy favorites stay separate.",
      });
    } catch (error) {
      console.warn("[curation] public picks unavailable", error);
      res.json({ ok: true, picks: [], cap: 5, storageMissing: true });
    }
  });
}

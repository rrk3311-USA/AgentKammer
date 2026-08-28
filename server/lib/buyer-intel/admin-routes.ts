import type { Express, Request, Response, NextFunction } from "express";
import { z } from "zod";
import { seedRaphaelExample } from "./seed";
import { ingestClientProfileRow, ingestSavedItem } from "./ingest";
import {
  buyerIntelUsesDatabase,
  getBuyerChart,
  listBuyerProfiles,
  whoShouldSeeListing,
} from "./repository";
import { getClientProfileById, listSavedItems } from "../advisory/repository";

export function registerBuyerIntelAdminRoutes(
  app: Express,
  requireAdmin: (req: Request, res: Response, next: NextFunction) => void,
) {
  app.get("/api/admin/buyer-intel/status", requireAdmin, async (_req, res) => {
    res.json({ ok: true, database: buyerIntelUsesDatabase() });
  });

  app.post("/api/admin/buyer-intel/seed", requireAdmin, async (_req, res) => {
    try {
      const result = await seedRaphaelExample();
      res.json({ ok: true, ...result });
    } catch (error) {
      console.error("[buyer-intel] seed failed", error);
      res.status(500).json({ error: "Failed to seed buyer intelligence" });
    }
  });

  app.get("/api/admin/buyer-intel/buyers", requireAdmin, async (_req, res) => {
    const buyers = await listBuyerProfiles();
    res.json({ buyers });
  });

  app.get("/api/admin/buyer-intel/buyers/:id/chart", requireAdmin, async (req, res) => {
    const chart = await getBuyerChart(req.params.id);
    if (!chart) return res.status(404).json({ error: "Buyer profile not found" });
    res.json({ chart });
  });

  app.get("/api/admin/buyer-intel/matches", requireAdmin, async (req, res) => {
    const propertyId = String(req.query.propertyId || "");
    if (!propertyId) return res.status(400).json({ error: "propertyId required" });
    const matches = await whoShouldSeeListing(propertyId);
    res.json({ propertyId, matches });
  });

  app.post("/api/admin/buyer-intel/ingest-client/:id", requireAdmin, async (req, res) => {
    const row = await getClientProfileById(req.params.id);
    if (!row) return res.status(404).json({ error: "Client profile not found" });
    const result = await ingestClientProfileRow(row);
    if (result) {
      const saved = await listSavedItems(row.id);
      for (const item of saved) {
        await ingestSavedItem(result.buyer.id, item);
      }
    }
    res.json({ ok: true, result });
  });
}

export function registerBuyerIntelPublicRoutes(app: Express) {
  app.post("/api/hub/save", async (req, res) => {
    try {
      const body = z
        .object({
          itemType: z.string().default("building"),
          title: z.string().min(1),
          path: z.string().optional(),
          externalId: z.string().optional(),
          notes: z.string().optional(),
          visitorId: z.string().optional(),
        })
        .parse(req.body);

      const { getClientProfileByVisitorId, createSavedItem } = await import("../advisory/repository");
      const visitorId =
        body.visitorId ||
        req.headers.cookie
          ?.split(";")
          .map((p) => p.trim())
          .find((p) => p.startsWith("ak_visitor_id="))
          ?.split("=")[1];
      if (!visitorId) return res.status(401).json({ error: "No visitor session. Open the Hub after Resume My Decision." });

      const profile = await getClientProfileByVisitorId(decodeURIComponent(visitorId));
      if (!profile) return res.status(404).json({ error: "No housing profile yet." });

      const saved = await createSavedItem({
        clientProfileId: profile.id,
        itemType: body.itemType,
        title: body.title,
        path: body.path,
        externalId: body.externalId,
        notes: body.notes,
      });

      const intel = await ingestClientProfileRow(profile);
      if (intel) await ingestSavedItem(intel.buyer.id, saved);

      res.json({ ok: true, saved: { id: saved.id, title: saved.title, path: saved.path } });
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      console.error("[hub/save] failed", error);
      res.status(500).json({ error: "Failed to save" });
    }
  });
}

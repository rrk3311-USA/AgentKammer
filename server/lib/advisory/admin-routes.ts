import type { Express, Request, Response, NextFunction } from "express";
import { z } from "zod";
import { LIFECYCLE_STAGES, type LifecycleStage } from "@shared/client-profile";
import {
  createAdvisorReview,
  getClientProfileById,
  listAdvisorReviews,
  listAttioSyncLogs,
  listChatMessages,
  listClientProfiles,
  listGoals,
  recordProfileEvent,
  rowToClientProfile,
  updateClientProfile,
  writeAuditLog,
  advisoryUsesDatabase,
} from "./repository";
import { adminForceResync, adminSetLifecycle } from "./profile-service";
import { processAttioSyncQueue } from "./sync-queue";
import { getAttioSetupStatus, isAttioConfigured } from "./attio-service";
import { verifyAttioWebhookSignature } from "./webhook";
import { seedAdvisorySamples } from "./seed-samples";

function attioRecordUrl(personId?: string | null, recordId?: string | null): string | null {
  const workspace = process.env.ATTIO_WORKSPACE_ID?.trim();
  if (!workspace) return null;
  if (recordId) return `https://app.attio.com/${workspace}/custom/${recordId}`;
  if (personId) return `https://app.attio.com/${workspace}/person/${personId}`;
  return null;
}

export function registerAdvisoryAdminRoutes(
  app: Express,
  requireAdmin: (req: Request, res: Response, next: NextFunction) => void,
) {
  app.post("/api/admin/clients/seed", requireAdmin, async (_req, res) => {
    try {
      const result = await seedAdvisorySamples();
      res.json({ ok: true, ...result });
    } catch (error) {
      console.error("[admin/clients] seed failed", error);
      res.status(500).json({ error: "Failed to seed sample clients" });
    }
  });

  app.get("/api/admin/clients", requireAdmin, async (req, res) => {
    try {
      const filters = {
        q: typeof req.query.q === "string" ? req.query.q : undefined,
        stage: typeof req.query.stage === "string" ? req.query.stage : undefined,
        minScore: req.query.minScore != null ? Number(req.query.minScore) : undefined,
        maxScore: req.query.maxScore != null ? Number(req.query.maxScore) : undefined,
        timeline: typeof req.query.timeline === "string" ? req.query.timeline : undefined,
        advisor: typeof req.query.advisor === "string" ? req.query.advisor : undefined,
        limit: req.query.limit != null ? Number(req.query.limit) : 100,
      };
      const rows = await listClientProfiles(filters);
      res.json({
        storageMode: advisoryUsesDatabase() ? "database" : "memory",
        attioConfigured: isAttioConfigured(),
        attioSetup: getAttioSetupStatus(),
        clients: rows.map((row) => {
          const profile = rowToClientProfile(row);
          return {
            ...profile,
            id: row.id,
            assignedAdvisor: row.assignedAdvisor,
            assignedPartner: row.assignedPartner,
            attioUrl: attioRecordUrl(row.attioPersonId, row.attioRecordId),
            scoreBreakdown: (() => {
              try {
                return row.scoreBreakdown ? JSON.parse(row.scoreBreakdown) : null;
              } catch {
                return null;
              }
            })(),
          };
        }),
      });
    } catch (error) {
      console.error("[admin/clients] list failed", error);
      res.status(500).json({ error: "Failed to list clients" });
    }
  });

  app.get("/api/admin/clients/:id", requireAdmin, async (req, res) => {
    try {
      const row = await getClientProfileById(req.params.id);
      if (!row) return res.status(404).json({ error: "Client not found" });

      const [messages, logs, goals, reviews] = await Promise.all([
        listChatMessages(row.id, 200),
        listAttioSyncLogs(row.id, 50),
        listGoals(row.id),
        listAdvisorReviews(row.id),
      ]);

      await writeAuditLog({
        actorRole: "admin",
        action: "view_client",
        resourceType: "client_profile",
        resourceId: row.id,
      });

      res.json({
        client: {
          ...rowToClientProfile(row),
          id: row.id,
          assignedAdvisor: row.assignedAdvisor,
          assignedPartner: row.assignedPartner,
          attioUrl: attioRecordUrl(row.attioPersonId, row.attioRecordId),
          scoreBreakdown: (() => {
            try {
              return row.scoreBreakdown ? JSON.parse(row.scoreBreakdown) : null;
            } catch {
              return null;
            }
          })(),
        },
        conversations: messages
          .slice()
          .reverse()
          .map((m) => ({
            id: m.id,
            role: m.role,
            content: m.content,
            createdAt: m.createdAt,
          })),
        syncLogs: logs,
        goals,
        reviews: reviews.map((r) => ({
          id: r.id,
          reviewDate: r.reviewDate,
          advisorId: r.advisorId,
          currentObjective: r.currentObjective,
          clientVisibleSummary: r.clientVisibleSummary,
          internalNotes: r.internalNotes,
          nextReviewDate: r.nextReviewDate,
        })),
      });
    } catch (error) {
      console.error("[admin/clients] detail failed", error);
      res.status(500).json({ error: "Failed to load client" });
    }
  });

  app.post("/api/admin/clients/:id/note", requireAdmin, async (req, res) => {
    try {
      const body = z.object({ note: z.string().min(1).max(5000), internal: z.boolean().optional() }).parse(req.body);
      const row = await getClientProfileById(req.params.id);
      if (!row) return res.status(404).json({ error: "Client not found" });

      const summary = body.internal
        ? [row.internalAdvisorSummary, body.note].filter(Boolean).join("\n\n")
        : row.internalAdvisorSummary;

      await updateClientProfile(row.id, {
        internalAdvisorSummary: summary || body.note,
      });
      await recordProfileEvent(row.id, body.internal ? "internal_note" : "advisor_note", body.note, "admin");

      const { queueProfileSyncBundle } = await import("./sync-queue");
      await queueProfileSyncBundle(row.id, {
        note: `Advisor note:\n${body.note}`,
      });

      res.json({ ok: true });
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      console.error("[admin/clients] note failed", error);
      res.status(500).json({ error: "Failed to add note" });
    }
  });

  app.post("/api/admin/clients/:id/assign", requireAdmin, async (req, res) => {
    try {
      const body = z
        .object({
          advisor: z.string().optional(),
          partner: z.string().optional(),
        })
        .parse(req.body);
      const updated = await updateClientProfile(req.params.id, {
        assignedAdvisor: body.advisor,
        assignedPartner: body.partner,
      });
      if (!updated) return res.status(404).json({ error: "Client not found" });
      await recordProfileEvent(req.params.id, "advisor_assigned", JSON.stringify(body), "admin");
      res.json({ client: rowToClientProfile(updated) });
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      res.status(500).json({ error: "Failed to assign advisor" });
    }
  });

  app.post("/api/admin/clients/:id/lifecycle", requireAdmin, async (req, res) => {
    try {
      const body = z
        .object({
          stage: z
            .string()
            .refine((s): s is LifecycleStage => (LIFECYCLE_STAGES as readonly string[]).includes(s), {
              message: "Invalid lifecycle stage",
            }),
        })
        .parse(req.body);
      const client = await adminSetLifecycle(req.params.id, body.stage);
      if (!client) return res.status(404).json({ error: "Client not found" });
      res.json({ client });
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      res.status(500).json({ error: "Failed to update lifecycle" });
    }
  });

  app.post("/api/admin/clients/:id/resync", requireAdmin, async (req, res) => {
    try {
      const row = await getClientProfileById(req.params.id);
      if (!row) return res.status(404).json({ error: "Client not found" });
      await adminForceResync(row.id);
      res.json({ ok: true, queued: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to queue resync" });
    }
  });

  app.post("/api/admin/clients/:id/task", requireAdmin, async (req, res) => {
    try {
      const body = z.object({ content: z.string().min(1).max(2000) }).parse(req.body);
      const row = await getClientProfileById(req.params.id);
      if (!row) return res.status(404).json({ error: "Client not found" });
      const { queueAttioSync } = await import("./sync-queue");
      await queueAttioSync({
        clientProfileId: row.id,
        action: "create_task",
        payload: { content: body.content },
        dedupeKey: `admin-task:${row.id}:${body.content.slice(0, 48)}`,
      });
      await recordProfileEvent(row.id, "task_created", body.content, "admin");
      res.json({ ok: true });
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      res.status(500).json({ error: "Failed to create task" });
    }
  });

  app.post("/api/admin/clients/:id/reviews", requireAdmin, async (req, res) => {
    try {
      const body = z
        .object({
          advisorId: z.string().min(1),
          whatChanged: z.string().min(1),
          currentObjective: z.string().min(1),
          progressSinceLastReview: z.string().min(1),
          financialReadinessUpdate: z.string().optional(),
          housingUpdate: z.string().optional(),
          risks: z.array(z.string()).optional(),
          recommendations: z.array(z.string()).optional(),
          next90DayPlan: z.array(z.string()).optional(),
          nextReviewDate: z.string().optional(),
          clientVisibleSummary: z.string().min(1),
          internalNotes: z.string().optional(),
        })
        .parse(req.body);

      const row = await getClientProfileById(req.params.id);
      if (!row) return res.status(404).json({ error: "Client not found" });

      const review = await createAdvisorReview({
        clientProfileId: row.id,
        reviewDate: new Date(),
        advisorId: body.advisorId,
        whatChanged: body.whatChanged,
        currentObjective: body.currentObjective,
        progressSinceLastReview: body.progressSinceLastReview,
        financialReadinessUpdate: body.financialReadinessUpdate,
        housingUpdate: body.housingUpdate,
        risks: body.risks,
        recommendations: body.recommendations,
        next90DayPlan: body.next90DayPlan,
        nextReviewDate: body.nextReviewDate ? new Date(body.nextReviewDate) : undefined,
        clientVisibleSummary: body.clientVisibleSummary,
        internalNotes: body.internalNotes,
      });

      await updateClientProfile(row.id, {
        nextRecommendedAction: body.currentObjective,
        internalAdvisorSummary: body.internalNotes || row.internalAdvisorSummary,
        lastConversationSummary: body.clientVisibleSummary,
      });

      const { queueProfileSyncBundle } = await import("./sync-queue");
      await queueProfileSyncBundle(row.id, {
        note: `Advisor review:\n${body.clientVisibleSummary}`,
        taskContent: "Schedule quarterly strategy review",
        taskDedupeKey: `quarterly:${row.id}:${review.id}`,
        updateStage: true,
      });

      res.json({ review });
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      res.status(500).json({ error: "Failed to create review" });
    }
  });

  app.post("/api/admin/attio/process-queue", requireAdmin, async (_req, res) => {
    try {
      const result = await processAttioSyncQueue();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to process Attio queue" });
    }
  });

  // Inbound Attio webhooks (stage/task events) - verify signature; no browser secrets.
  app.post("/api/webhooks/attio", async (req, res) => {
    try {
      const raw = typeof req.body === "string" ? req.body : JSON.stringify(req.body ?? {});
      if (!verifyAttioWebhookSignature(req, raw)) {
        return res.status(401).json({ error: "Invalid webhook signature" });
      }
      console.log("[attio-webhook] accepted event", {
        type: (req.body as { event_type?: string })?.event_type ?? "unknown",
      });
      res.json({ ok: true });
    } catch (error) {
      console.error("[attio-webhook] failed", error);
      res.status(500).json({ error: "Webhook handling failed" });
    }
  });
}

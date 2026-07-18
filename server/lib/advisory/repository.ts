import { randomUUID } from "crypto";
import { and, desc, eq, gte, ilike, lte, or, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import {
  visitors,
  clientProfiles,
  chatSessions,
  chatMessages,
  profileEvents,
  savedItems,
  goals,
  advisorReviews,
  attioSyncJobs,
  attioSyncLogs,
  auditLogs,
  type Visitor,
  type ClientProfileRow,
  type ChatSession,
  type ChatMessage,
  type ProfileEvent,
  type SavedItem,
  type Goal,
  type AdvisorReviewRow,
  type AttioSyncJobRow,
  type AttioSyncLogRow,
  type AuditLog,
  type InsertClientProfile,
} from "@shared/schema";
import type { AttioSyncAction, AttioSyncJobStatus, LifecycleStage } from "@shared/client-profile";

let db: ReturnType<typeof drizzle> | null = null;
try {
  if (process.env.DATABASE_URL) {
    db = drizzle(neon(process.env.DATABASE_URL));
  }
} catch {
  db = null;
}

function now() {
  return new Date();
}

function toIso(d: Date | string | null | undefined): string {
  if (!d) return new Date().toISOString();
  return d instanceof Date ? d.toISOString() : new Date(d).toISOString();
}

// ---------------------------------------------------------------------------
// In-memory store (local / no DATABASE_URL)
// ---------------------------------------------------------------------------

const mem = {
  visitors: new Map<string, Visitor>(),
  profiles: new Map<string, ClientProfileRow>(),
  profilesByVisitor: new Map<string, string>(),
  profilesByEmail: new Map<string, string>(),
  sessions: new Map<string, ChatSession>(),
  messages: new Map<string, ChatMessage>(),
  events: new Map<string, ProfileEvent>(),
  saved: new Map<string, SavedItem>(),
  goals: new Map<string, Goal>(),
  reviews: new Map<string, AdvisorReviewRow>(),
  jobs: new Map<string, AttioSyncJobRow>(),
  logs: new Map<string, AttioSyncLogRow>(),
  audits: new Map<string, AuditLog>(),
};

export function advisoryUsesDatabase(): boolean {
  return db != null;
}

export async function ensureVisitor(input: {
  visitorId: string;
  sessionId?: string;
  email?: string;
  phone?: string;
  path?: string;
}): Promise<Visitor> {
  if (db) {
    const existing = await db.select().from(visitors).where(eq(visitors.visitorId, input.visitorId)).limit(1);
    if (existing[0]) {
      const [updated] = await db
        .update(visitors)
        .set({
          sessionId: input.sessionId ?? existing[0].sessionId,
          email: input.email ?? existing[0].email,
          phone: input.phone ?? existing[0].phone,
          lastPath: input.path ?? existing[0].lastPath,
          visitCount: (existing[0].visitCount ?? 1) + (input.path && input.path !== existing[0].lastPath ? 1 : 0),
          lastActiveAt: now(),
        })
        .where(eq(visitors.id, existing[0].id))
        .returning();
      return updated;
    }
    const [created] = await db
      .insert(visitors)
      .values({
        visitorId: input.visitorId,
        sessionId: input.sessionId,
        email: input.email,
        phone: input.phone,
        firstPath: input.path,
        lastPath: input.path,
        visitCount: 1,
      })
      .returning();
    return created;
  }

  const existing = Array.from(mem.visitors.values()).find((v) => v.visitorId === input.visitorId);
  if (existing) {
    const updated: Visitor = {
      ...existing,
      sessionId: input.sessionId ?? existing.sessionId,
      email: input.email ?? existing.email,
      phone: input.phone ?? existing.phone,
      lastPath: input.path ?? existing.lastPath,
      visitCount:
        (existing.visitCount ?? 1) + (input.path && input.path !== existing.lastPath ? 1 : 0),
      lastActiveAt: now(),
    };
    mem.visitors.set(existing.id, updated);
    return updated;
  }

  const created: Visitor = {
    id: randomUUID(),
    visitorId: input.visitorId,
    sessionId: input.sessionId ?? null,
    email: input.email ?? null,
    phone: input.phone ?? null,
    claimedMemberId: null,
    firstPath: input.path ?? null,
    lastPath: input.path ?? null,
    visitCount: 1,
    createdAt: now(),
    lastActiveAt: now(),
  };
  mem.visitors.set(created.id, created);
  return created;
}

export async function getClientProfileByVisitorId(visitorId: string): Promise<ClientProfileRow | null> {
  if (db) {
    const rows = await db.select().from(clientProfiles).where(eq(clientProfiles.visitorId, visitorId)).limit(1);
    return rows[0] ?? null;
  }
  const id = mem.profilesByVisitor.get(visitorId);
  return id ? mem.profiles.get(id) ?? null : null;
}

export async function getClientProfileById(id: string): Promise<ClientProfileRow | null> {
  if (db) {
    const rows = await db.select().from(clientProfiles).where(eq(clientProfiles.id, id)).limit(1);
    return rows[0] ?? null;
  }
  return mem.profiles.get(id) ?? null;
}

export async function getClientProfileByEmail(email: string): Promise<ClientProfileRow | null> {
  const normalized = email.trim().toLowerCase();
  if (db) {
    const rows = await db
      .select()
      .from(clientProfiles)
      .where(sql`lower(${clientProfiles.email}) = ${normalized}`)
      .limit(1);
    return rows[0] ?? null;
  }
  const id = mem.profilesByEmail.get(normalized);
  return id ? mem.profiles.get(id) ?? null : null;
}

function indexProfile(row: ClientProfileRow) {
  mem.profiles.set(row.id, row);
  mem.profilesByVisitor.set(row.visitorId, row.id);
  if (row.email) mem.profilesByEmail.set(row.email.toLowerCase(), row.id);
}

export async function createClientProfile(input: InsertClientProfile): Promise<ClientProfileRow> {
  if (db) {
    const [row] = await db.insert(clientProfiles).values(input).returning();
    return row;
  }
  const row: ClientProfileRow = {
    id: randomUUID(),
    visitorId: input.visitorId,
    attioPersonId: input.attioPersonId ?? null,
    attioRecordId: input.attioRecordId ?? null,
    firstName: input.firstName ?? null,
    lastName: input.lastName ?? null,
    email: input.email ?? null,
    phone: input.phone ?? null,
    situation: input.situation ?? null,
    desiredOutcome: input.desiredOutcome ?? null,
    currentHousing: input.currentHousing ?? null,
    currentLocation: input.currentLocation ?? null,
    targetLocations: input.targetLocations ?? null,
    propertyTypes: input.propertyTypes ?? null,
    budgetRange: input.budgetRange ?? null,
    timeline: input.timeline ?? null,
    financingStatus: input.financingStatus ?? null,
    creditReadiness: input.creditReadiness ?? null,
    downPaymentReadiness: input.downPaymentReadiness ?? null,
    decisionMakers: input.decisionMakers ?? null,
    constraints: input.constraints ?? null,
    tradeOffs: input.tradeOffs ?? null,
    dealBreakers: input.dealBreakers ?? null,
    buildingsViewed: input.buildingsViewed ?? null,
    listingsViewed: input.listingsViewed ?? null,
    readinessScore: input.readinessScore ?? null,
    belongingScore: input.belongingScore ?? null,
    leadScore: input.leadScore ?? 0,
    lifecycleStage: input.lifecycleStage ?? "anonymous",
    nextRecommendedAction: input.nextRecommendedAction ?? null,
    lastConversationSummary: input.lastConversationSummary ?? null,
    internalAdvisorSummary: input.internalAdvisorSummary ?? null,
    assignedAdvisor: input.assignedAdvisor ?? null,
    assignedPartner: input.assignedPartner ?? null,
    scoreBreakdown: input.scoreBreakdown ?? null,
    createdAt: now(),
    updatedAt: now(),
    lastActiveAt: now(),
  };
  indexProfile(row);
  return row;
}

export async function updateClientProfile(
  id: string,
  updates: Partial<InsertClientProfile> & { lastActiveAt?: Date; updatedAt?: Date },
): Promise<ClientProfileRow | null> {
  if (db) {
    const [row] = await db
      .update(clientProfiles)
      .set({ ...updates, updatedAt: now(), lastActiveAt: updates.lastActiveAt ?? now() })
      .where(eq(clientProfiles.id, id))
      .returning();
    return row ?? null;
  }
  const existing = mem.profiles.get(id);
  if (!existing) return null;
  const row: ClientProfileRow = {
    ...existing,
    ...updates,
    updatedAt: now(),
    lastActiveAt: updates.lastActiveAt ?? now(),
  } as ClientProfileRow;
  indexProfile(row);
  return row;
}

export async function mergeAnonymousIntoEmailProfile(
  anonymousId: string,
  emailProfileId: string,
): Promise<ClientProfileRow | null> {
  const anon = await getClientProfileById(anonymousId);
  const identified = await getClientProfileById(emailProfileId);
  if (!anon || !identified || anon.id === identified.id) return identified;

  const mergedArrays = (a?: string[] | null, b?: string[] | null) => {
    const set = new Set([...(a ?? []), ...(b ?? [])].filter(Boolean));
    return set.size ? Array.from(set) : null;
  };

  const updates: Partial<InsertClientProfile> = {
    situation: identified.situation || anon.situation || undefined,
    desiredOutcome: identified.desiredOutcome || anon.desiredOutcome || undefined,
    currentHousing: identified.currentHousing || anon.currentHousing || undefined,
    currentLocation: identified.currentLocation || anon.currentLocation || undefined,
    targetLocations: mergedArrays(identified.targetLocations, anon.targetLocations) ?? undefined,
    propertyTypes: mergedArrays(identified.propertyTypes, anon.propertyTypes) ?? undefined,
    budgetRange: identified.budgetRange || anon.budgetRange || undefined,
    timeline: identified.timeline || anon.timeline || undefined,
    financingStatus: identified.financingStatus || anon.financingStatus || undefined,
    constraints: mergedArrays(identified.constraints, anon.constraints) ?? undefined,
    tradeOffs: mergedArrays(identified.tradeOffs, anon.tradeOffs) ?? undefined,
    dealBreakers: mergedArrays(identified.dealBreakers, anon.dealBreakers) ?? undefined,
    buildingsViewed: mergedArrays(identified.buildingsViewed, anon.buildingsViewed) ?? undefined,
    listingsViewed: mergedArrays(identified.listingsViewed, anon.listingsViewed) ?? undefined,
    lastConversationSummary:
      identified.lastConversationSummary || anon.lastConversationSummary || undefined,
    attioPersonId: identified.attioPersonId || anon.attioPersonId || undefined,
    attioRecordId: identified.attioRecordId || anon.attioRecordId || undefined,
    leadScore: Math.max(identified.leadScore ?? 0, anon.leadScore ?? 0),
  };

  const updated = await updateClientProfile(identified.id, updates);
  await recordProfileEvent(identified.id, "merged_anonymous", JSON.stringify({ from: anon.visitorId }));

  // Retarget anonymous visitor id to identified profile
  if (!db) {
    mem.profilesByVisitor.set(anon.visitorId, identified.id);
    mem.profiles.delete(anon.id);
  } else {
    await db.update(clientProfiles).set({ visitorId: `${anon.visitorId}__merged_${Date.now()}` }).where(eq(clientProfiles.id, anon.id));
  }

  return updated;
}

export type ClientListFilters = {
  q?: string;
  stage?: string;
  minScore?: number;
  maxScore?: number;
  timeline?: string;
  advisor?: string;
  limit?: number;
};

export async function listClientProfiles(filters: ClientListFilters = {}): Promise<ClientProfileRow[]> {
  const limit = filters.limit ?? 100;
  if (db) {
    const conditions = [];
    if (filters.stage) conditions.push(eq(clientProfiles.lifecycleStage, filters.stage));
    if (filters.minScore != null) conditions.push(gte(clientProfiles.leadScore, filters.minScore));
    if (filters.maxScore != null) conditions.push(lte(clientProfiles.leadScore, filters.maxScore));
    if (filters.advisor) conditions.push(eq(clientProfiles.assignedAdvisor, filters.advisor));
    if (filters.timeline) conditions.push(ilike(clientProfiles.timeline, `%${filters.timeline}%`));
    if (filters.q) {
      const q = `%${filters.q}%`;
      conditions.push(
        or(
          ilike(clientProfiles.email, q),
          ilike(clientProfiles.firstName, q),
          ilike(clientProfiles.lastName, q),
          ilike(clientProfiles.situation, q),
          ilike(clientProfiles.visitorId, q),
        )!,
      );
    }
    const query = db.select().from(clientProfiles).orderBy(desc(clientProfiles.lastActiveAt)).limit(limit);
    if (conditions.length) {
      return db
        .select()
        .from(clientProfiles)
        .where(and(...conditions))
        .orderBy(desc(clientProfiles.lastActiveAt))
        .limit(limit);
    }
    return query;
  }

  let rows = Array.from(mem.profiles.values());
  if (filters.stage) rows = rows.filter((r) => r.lifecycleStage === filters.stage);
  if (filters.minScore != null) rows = rows.filter((r) => (r.leadScore ?? 0) >= filters.minScore!);
  if (filters.maxScore != null) rows = rows.filter((r) => (r.leadScore ?? 0) <= filters.maxScore!);
  if (filters.advisor) rows = rows.filter((r) => r.assignedAdvisor === filters.advisor);
  if (filters.timeline) {
    const t = filters.timeline.toLowerCase();
    rows = rows.filter((r) => (r.timeline ?? "").toLowerCase().includes(t));
  }
  if (filters.q) {
    const q = filters.q.toLowerCase();
    rows = rows.filter((r) =>
      [r.email, r.firstName, r.lastName, r.situation, r.visitorId]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q)),
    );
  }
  return rows
    .sort((a, b) => b.lastActiveAt.getTime() - a.lastActiveAt.getTime())
    .slice(0, limit);
}

export async function ensureChatSession(input: {
  clientProfileId: string;
  visitorId: string;
  sessionId: string;
  pagePath?: string;
}): Promise<ChatSession> {
  if (db) {
    const existing = await db
      .select()
      .from(chatSessions)
      .where(and(eq(chatSessions.sessionId, input.sessionId), eq(chatSessions.visitorId, input.visitorId)))
      .limit(1);
    if (existing[0]) {
      const [updated] = await db
        .update(chatSessions)
        .set({ updatedAt: now(), pagePath: input.pagePath ?? existing[0].pagePath })
        .where(eq(chatSessions.id, existing[0].id))
        .returning();
      return updated;
    }
    const [created] = await db.insert(chatSessions).values(input).returning();
    return created;
  }

  const existing = Array.from(mem.sessions.values()).find(
    (s) => s.sessionId === input.sessionId && s.visitorId === input.visitorId,
  );
  if (existing) {
    const updated = { ...existing, updatedAt: now(), pagePath: input.pagePath ?? existing.pagePath };
    mem.sessions.set(existing.id, updated);
    return updated;
  }
  const created: ChatSession = {
    id: randomUUID(),
    clientProfileId: input.clientProfileId,
    visitorId: input.visitorId,
    sessionId: input.sessionId,
    pagePath: input.pagePath ?? null,
    status: "active",
    createdAt: now(),
    updatedAt: now(),
  };
  mem.sessions.set(created.id, created);
  return created;
}

export async function appendChatMessage(input: {
  sessionId: string;
  clientProfileId: string;
  role: string;
  content: string;
  metadata?: string;
}): Promise<ChatMessage> {
  if (db) {
    const [row] = await db.insert(chatMessages).values(input).returning();
    return row;
  }
  const row: ChatMessage = {
    id: randomUUID(),
    sessionId: input.sessionId,
    clientProfileId: input.clientProfileId,
    role: input.role,
    content: input.content,
    metadata: input.metadata ?? null,
    createdAt: now(),
  };
  mem.messages.set(row.id, row);
  return row;
}

export async function listChatMessages(clientProfileId: string, limit = 100): Promise<ChatMessage[]> {
  if (db) {
    return db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.clientProfileId, clientProfileId))
      .orderBy(desc(chatMessages.createdAt))
      .limit(limit);
  }
  return Array.from(mem.messages.values())
    .filter((m) => m.clientProfileId === clientProfileId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
}

export async function recordProfileEvent(
  clientProfileId: string,
  eventType: string,
  detail?: string,
  actorRole = "system",
  actorId?: string,
): Promise<ProfileEvent> {
  if (db) {
    const [row] = await db
      .insert(profileEvents)
      .values({ clientProfileId, eventType, detail, actorRole, actorId })
      .returning();
    return row;
  }
  const row: ProfileEvent = {
    id: randomUUID(),
    clientProfileId,
    eventType,
    detail: detail ?? null,
    actorRole,
    actorId: actorId ?? null,
    createdAt: now(),
  };
  mem.events.set(row.id, row);
  return row;
}

export async function createGoal(clientProfileId: string, goal: string): Promise<Goal> {
  if (db) {
    const [row] = await db.insert(goals).values({ clientProfileId, goal }).returning();
    return row;
  }
  const row: Goal = {
    id: randomUUID(),
    clientProfileId,
    goal,
    status: "active",
    createdAt: now(),
    updatedAt: now(),
  };
  mem.goals.set(row.id, row);
  return row;
}

export async function listGoals(clientProfileId: string): Promise<Goal[]> {
  if (db) {
    return db.select().from(goals).where(eq(goals.clientProfileId, clientProfileId));
  }
  return Array.from(mem.goals.values()).filter((g) => g.clientProfileId === clientProfileId);
}

export async function listSavedItems(clientProfileId: string): Promise<SavedItem[]> {
  if (db) {
    return db.select().from(savedItems).where(eq(savedItems.clientProfileId, clientProfileId));
  }
  return Array.from(mem.saved.values()).filter((s) => s.clientProfileId === clientProfileId);
}

export async function listAdvisorReviews(clientProfileId: string): Promise<AdvisorReviewRow[]> {
  if (db) {
    return db
      .select()
      .from(advisorReviews)
      .where(eq(advisorReviews.clientProfileId, clientProfileId))
      .orderBy(desc(advisorReviews.reviewDate));
  }
  return Array.from(mem.reviews.values())
    .filter((r) => r.clientProfileId === clientProfileId)
    .sort((a, b) => b.reviewDate.getTime() - a.reviewDate.getTime());
}

export async function createAdvisorReview(input: {
  clientProfileId: string;
  reviewDate: Date;
  advisorId: string;
  whatChanged: string;
  currentObjective: string;
  progressSinceLastReview: string;
  financialReadinessUpdate?: string;
  housingUpdate?: string;
  risks?: string[];
  recommendations?: string[];
  next90DayPlan?: string[];
  nextReviewDate?: Date;
  clientVisibleSummary: string;
  internalNotes?: string;
}): Promise<AdvisorReviewRow> {
  if (db) {
    const [row] = await db.insert(advisorReviews).values(input).returning();
    return row;
  }
  const row: AdvisorReviewRow = {
    id: randomUUID(),
    ...input,
    financialReadinessUpdate: input.financialReadinessUpdate ?? null,
    housingUpdate: input.housingUpdate ?? null,
    risks: input.risks ?? null,
    recommendations: input.recommendations ?? null,
    next90DayPlan: input.next90DayPlan ?? null,
    nextReviewDate: input.nextReviewDate ?? null,
    internalNotes: input.internalNotes ?? null,
    createdAt: now(),
    updatedAt: now(),
  };
  mem.reviews.set(row.id, row);
  return row;
}

export async function enqueueAttioSyncJob(input: {
  clientProfileId: string;
  action: AttioSyncAction;
  payload: unknown;
  dedupeKey?: string;
}): Promise<AttioSyncJobRow> {
  if (input.dedupeKey) {
    if (db) {
      const open = await db
        .select()
        .from(attioSyncJobs)
        .where(
          and(
            eq(attioSyncJobs.dedupeKey, input.dedupeKey),
            or(eq(attioSyncJobs.status, "pending"), eq(attioSyncJobs.status, "processing"))!,
          ),
        )
        .limit(1);
      if (open[0]) return open[0];
    } else {
      const open = Array.from(mem.jobs.values()).find(
        (j) =>
          j.dedupeKey === input.dedupeKey && (j.status === "pending" || j.status === "processing"),
      );
      if (open) return open;
    }
  }

  const payload = JSON.stringify(input.payload ?? {});
  if (db) {
    const [row] = await db
      .insert(attioSyncJobs)
      .values({
        clientProfileId: input.clientProfileId,
        action: input.action,
        payload,
        status: "pending",
        dedupeKey: input.dedupeKey,
        nextRetryAt: now(),
      })
      .returning();
    return row;
  }

  const row: AttioSyncJobRow = {
    id: randomUUID(),
    clientProfileId: input.clientProfileId,
    action: input.action,
    payload,
    status: "pending",
    attemptCount: 0,
    lastError: null,
    nextRetryAt: now(),
    dedupeKey: input.dedupeKey ?? null,
    createdAt: now(),
    updatedAt: now(),
  };
  mem.jobs.set(row.id, row);
  return row;
}

export async function listPendingAttioJobs(limit = 20): Promise<AttioSyncJobRow[]> {
  const cutoff = now();
  if (db) {
    return db
      .select()
      .from(attioSyncJobs)
      .where(
        and(
          or(eq(attioSyncJobs.status, "pending"), eq(attioSyncJobs.status, "failed"))!,
          or(sql`${attioSyncJobs.nextRetryAt} is null`, lte(attioSyncJobs.nextRetryAt, cutoff))!,
        ),
      )
      .orderBy(attioSyncJobs.createdAt)
      .limit(limit);
  }
  return Array.from(mem.jobs.values())
    .filter(
      (j) =>
        (j.status === "pending" || j.status === "failed") &&
        (!j.nextRetryAt || j.nextRetryAt.getTime() <= cutoff.getTime()) &&
        j.attemptCount < 8,
    )
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    .slice(0, limit);
}

export async function updateAttioSyncJob(
  id: string,
  updates: {
    status?: AttioSyncJobStatus;
    attemptCount?: number;
    lastError?: string | null;
    nextRetryAt?: Date | null;
  },
): Promise<AttioSyncJobRow | null> {
  if (db) {
    const [row] = await db
      .update(attioSyncJobs)
      .set({ ...updates, updatedAt: now() })
      .where(eq(attioSyncJobs.id, id))
      .returning();
    return row ?? null;
  }
  const existing = mem.jobs.get(id);
  if (!existing) return null;
  const row = { ...existing, ...updates, updatedAt: now() } as AttioSyncJobRow;
  mem.jobs.set(id, row);
  return row;
}

export async function listAttioSyncLogs(clientProfileId: string, limit = 50): Promise<AttioSyncLogRow[]> {
  if (db) {
    return db
      .select()
      .from(attioSyncLogs)
      .where(eq(attioSyncLogs.clientProfileId, clientProfileId))
      .orderBy(desc(attioSyncLogs.createdAt))
      .limit(limit);
  }
  return Array.from(mem.logs.values())
    .filter((l) => l.clientProfileId === clientProfileId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
}

export async function writeAttioSyncLog(input: {
  jobId?: string;
  clientProfileId?: string;
  action: string;
  level?: string;
  message: string;
  detail?: string;
}): Promise<void> {
  if (db) {
    await db.insert(attioSyncLogs).values({
      jobId: input.jobId,
      clientProfileId: input.clientProfileId,
      action: input.action,
      level: input.level ?? "info",
      message: input.message,
      detail: input.detail,
    });
    return;
  }
  const row: AttioSyncLogRow = {
    id: randomUUID(),
    jobId: input.jobId ?? null,
    clientProfileId: input.clientProfileId ?? null,
    action: input.action,
    level: input.level ?? "info",
    message: input.message,
    detail: input.detail ?? null,
    createdAt: now(),
  };
  mem.logs.set(row.id, row);
}

export async function writeAuditLog(input: {
  actorRole: string;
  actorId?: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  detail?: string;
}): Promise<void> {
  if (db) {
    await db.insert(auditLogs).values(input);
    return;
  }
  mem.audits.set(randomUUID(), {
    id: randomUUID(),
    actorRole: input.actorRole,
    actorId: input.actorId ?? null,
    action: input.action,
    resourceType: input.resourceType,
    resourceId: input.resourceId ?? null,
    detail: input.detail ?? null,
    createdAt: now(),
  });
}

export function rowToClientProfile(row: ClientProfileRow) {
  return {
    id: row.id,
    visitorId: row.visitorId,
    attioPersonId: row.attioPersonId ?? undefined,
    attioRecordId: row.attioRecordId ?? undefined,
    firstName: row.firstName ?? undefined,
    lastName: row.lastName ?? undefined,
    email: row.email ?? undefined,
    phone: row.phone ?? undefined,
    situation: row.situation ?? undefined,
    desiredOutcome: row.desiredOutcome ?? undefined,
    currentHousing: row.currentHousing ?? undefined,
    currentLocation: row.currentLocation ?? undefined,
    targetLocations: row.targetLocations ?? undefined,
    propertyTypes: row.propertyTypes ?? undefined,
    budgetRange: row.budgetRange ?? undefined,
    timeline: row.timeline ?? undefined,
    financingStatus: row.financingStatus ?? undefined,
    creditReadiness: row.creditReadiness ?? undefined,
    downPaymentReadiness: row.downPaymentReadiness ?? undefined,
    decisionMakers: row.decisionMakers ?? undefined,
    constraints: row.constraints ?? undefined,
    tradeOffs: row.tradeOffs ?? undefined,
    dealBreakers: row.dealBreakers ?? undefined,
    buildingsViewed: row.buildingsViewed ?? undefined,
    listingsViewed: row.listingsViewed ?? undefined,
    readinessScore: row.readinessScore ?? undefined,
    belongingScore: row.belongingScore ?? undefined,
    leadScore: row.leadScore ?? undefined,
    lifecycleStage: (row.lifecycleStage as LifecycleStage) || "anonymous",
    nextRecommendedAction: row.nextRecommendedAction ?? undefined,
    lastConversationSummary: row.lastConversationSummary ?? undefined,
    internalAdvisorSummary: row.internalAdvisorSummary ?? undefined,
    assignedAdvisor: row.assignedAdvisor ?? undefined,
    assignedPartner: row.assignedPartner ?? undefined,
    createdAt: toIso(row.createdAt),
    updatedAt: toIso(row.updatedAt),
    lastActiveAt: toIso(row.lastActiveAt),
  };
}

import { randomUUID } from "crypto";
import { readFile } from "fs/promises";
import path from "path";
import { neon } from "@neondatabase/serverless";
import nodemailer from "nodemailer";
import { Resend } from "resend";
import {
  emptyHubPathProgress,
  initialQualifyStatus,
  nextStepForRoute,
  parseQualifySource,
  qualifySubmissionSchema,
  resolveQualifyRoute,
  type HubPathProgress,
  type QualifyRoute,
  type QualifyStatus,
  type QualifySubmissionInput,
} from "../../shared/get-qualified";
import { storage } from "../storage";
import {
  encodeHubProgressCookie,
  type HubProgressCookie,
  mergeProgress,
  progressFromCookie,
} from "./hub-progress-cookie";

const CONTACT_INBOX = process.env.CONTACT_INBOX || "info@agentkammer.com";
const CONTACT_FALLBACK_INBOX = process.env.CONTACT_FALLBACK_INBOX || "rrk3311@gmail.com";
const FROM_ADDRESS = process.env.ACCOUNT_EMAIL_FROM || "Agent Kammer <onboarding@resend.dev>";
const SITE_URL = (process.env.SITE_URL || "https://www.agentkammer.com").replace(/\/$/, "");
const PROCESS_PDF_PUBLIC = "/process/agent-kammer-how-the-process-works.pdf";

type StoredSubmission = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string | null;
  budgetLane: string;
  callPurpose: string;
  notes: string | null;
  source: string;
  route: QualifyRoute;
  status: QualifyStatus;
  processPdfSent: boolean;
  hubMemberId: string | null;
  sessionBooked: boolean;
  strategySessionHeld: boolean;
};

const memory = new Map<string, StoredSubmission>();

function sqlClient() {
  if (!process.env.DATABASE_URL) return null;
  try {
    return neon(process.env.DATABASE_URL);
  } catch (error) {
    console.error("[qualify] could not open DATABASE_URL", error);
    return null;
  }
}

function rowToSubmission(row: Record<string, unknown>): StoredSubmission {
  return {
    id: String(row.id),
    createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at),
    name: String(row.name),
    email: String(row.email),
    phone: row.phone ? String(row.phone) : null,
    budgetLane: String(row.budget_lane),
    callPurpose: String(row.call_purpose),
    notes: row.notes ? String(row.notes) : null,
    source: String(row.source),
    route: row.route as QualifyRoute,
    status: row.status as QualifyStatus,
    processPdfSent: Boolean(row.process_pdf_sent),
    hubMemberId: row.hub_member_id ? String(row.hub_member_id) : null,
    sessionBooked: Boolean(row.session_booked),
    strategySessionHeld: Boolean(row.strategy_session_held),
  };
}

export function raphiCalendarUrl(): string | null {
  return process.env.RAPHI_CALENDAR_URL?.trim() || null;
}

export function diegoEllimanUrl(): string | null {
  return process.env.DIEGO_ELLIMAN_URL?.trim() || null;
}

export async function findLatestQualifyByEmail(email: string): Promise<StoredSubmission | null> {
  const normalized = email.trim().toLowerCase();
  const sql = sqlClient();
  if (sql) {
    try {
      const rows = (await sql`
        SELECT * FROM get_qualified_submissions
        WHERE lower(email) = ${normalized}
        ORDER BY created_at DESC
        LIMIT 1
      `) as Record<string, unknown>[];
      if (rows[0]) return rowToSubmission(rows[0]);
    } catch (error) {
      console.error("[qualify] lookup failed (table may not exist yet)", error);
    }
  }
  const local = Array.from(memory.values())
    .filter((row) => row.email === normalized)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return local[0] || null;
}

export async function findLatestQualifyByMemberId(memberId: string): Promise<StoredSubmission | null> {
  const sql = sqlClient();
  if (sql) {
    try {
      const rows = (await sql`
        SELECT * FROM get_qualified_submissions
        WHERE hub_member_id = ${memberId}
        ORDER BY created_at DESC
        LIMIT 1
      `) as Record<string, unknown>[];
      if (rows[0]) return rowToSubmission(rows[0]);
    } catch (error) {
      console.error("[qualify] member lookup failed", error);
    }
  }
  const local = Array.from(memory.values())
    .filter((row) => row.hubMemberId === memberId)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return local[0] || null;
}

async function claimOrCreateHubMember(input: {
  email: string;
  name: string;
  visitorId?: string | null;
}): Promise<{ memberId: string | null; created: boolean }> {
  const email = input.email.trim().toLowerCase();
  try {
    const existing = await storage.getMemberProfileByEmail(email);
    if (existing) {
      const visitorIds = Array.from(
        new Set([...(existing.visitorIds || []), input.visitorId].filter((v): v is string => Boolean(v))),
      );
      await storage.updateMemberProfile(existing.id, {
        displayName: existing.displayName || input.name,
        visitorIds,
        lastVisitorId: input.visitorId || existing.lastVisitorId,
      });
      return { memberId: existing.id, created: false };
    }

    const member = await storage.createMemberProfile({
      email,
      displayName: input.name,
      accessToken: `akm_${randomUUID()}`,
      visitorIds: input.visitorId ? [input.visitorId] : [],
      conversationIds: [],
      progressStage: "exploring",
      lastVisitorId: input.visitorId || null,
    });
    return { memberId: member.id, created: true };
  } catch (error) {
    console.error("[qualify] light Hub member claim failed", error);
    return { memberId: null, created: false };
  }
}

async function readProcessPdf(): Promise<Buffer | null> {
  const candidates = [
    path.resolve(process.cwd(), "client/public/process/agent-kammer-how-the-process-works.pdf"),
    path.resolve(process.cwd(), "dist/public/process/agent-kammer-how-the-process-works.pdf"),
    path.resolve(process.cwd(), "public/process/agent-kammer-how-the-process-works.pdf"),
  ];
  for (const file of candidates) {
    try {
      return await readFile(file);
    } catch {
      // try next
    }
  }
  return null;
}

async function sendProcessEmail(input: {
  name: string;
  email: string;
  route: QualifyRoute;
}): Promise<boolean> {
  const pdfUrl = `${SITE_URL}${PROCESS_PDF_PUBLIC}`;
  const subject = "How the process works — Agent Kammer";
  const next = nextStepForRoute(input.route);
  const html = `
    <div style="font-family: Georgia, serif; line-height: 1.65; color: #2A3447;">
      <p>${input.name.split(" ")[0] || "Hello"},</p>
      <p>Thank you for the few details. Get Qualified is a briefing, not a test.</p>
      <p>${next}</p>
      <p>The one-pager is here: <a href="${pdfUrl}">Agent Kammer — How the process works</a>.</p>
      <p>Your plan is waiting in the Decision Hub whenever you return.</p>
      <p style="color: #5c6570; font-size: 13px;">Agent Kammer</p>
    </div>
  `;
  const text = `${input.name.split(" ")[0] || "Hello"},\n\nThank you for the few details. Get Qualified is a briefing, not a test.\n\n${next}\n\nProcess one-pager: ${pdfUrl}\n`;
  const pdf = await readProcessPdf();
  const attachments = pdf
    ? [{ filename: "agent-kammer-how-the-process-works.pdf", content: pdf }]
    : [];

  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const result = await resend.emails.send({
        from: FROM_ADDRESS,
        to: input.email,
        subject,
        html,
        text,
        attachments: attachments.map((file) => ({
          filename: file.filename,
          content: file.content,
        })),
      });
      if (!result.error) return true;
      console.error("[qualify] process email (Resend) error:", result.error.message);
    } catch (error) {
      console.error("[qualify] process email (Resend) error:", error);
    }
  }

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });
      await transporter.sendMail({
        from: `Agent Kammer <${process.env.EMAIL_USER}>`,
        to: input.email,
        subject,
        html,
        text,
        attachments,
      });
      return true;
    } catch (error) {
      console.error("[qualify] process email (Gmail) error:", error);
    }
  }

  return false;
}

async function notifyOps(input: StoredSubmission) {
  const subject = `Get Qualified — ${input.name} — ${input.route}`;
  const html = `
    <h2>Get Qualified submission</h2>
    <p><strong>Name:</strong> ${input.name}</p>
    <p><strong>Email:</strong> ${input.email}</p>
    ${input.phone ? `<p><strong>Phone:</strong> ${input.phone}</p>` : ""}
    <p><strong>Budget lane:</strong> ${input.budgetLane}</p>
    <p><strong>Call purpose:</strong> ${input.callPurpose}</p>
    <p><strong>Source:</strong> ${input.source}</p>
    <p><strong>Route:</strong> ${input.route}</p>
    <p><strong>Status:</strong> ${input.status}</p>
    ${input.notes ? `<p><strong>Notes:</strong> ${input.notes}</p>` : ""}
    <p>This is <em>not</em> a contact-form row. Table: get_qualified_submissions.</p>
  `;

  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: CONTACT_INBOX,
        bcc: CONTACT_FALLBACK_INBOX !== CONTACT_INBOX ? CONTACT_FALLBACK_INBOX : undefined,
        subject,
        html,
      });
      return;
    } catch (error) {
      console.error("[qualify] ops email (Resend) error:", error);
    }
  }

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });
      await transporter.sendMail({
        from: `Agent Kammer <${process.env.EMAIL_USER}>`,
        to: CONTACT_INBOX,
        subject,
        html,
      });
    } catch (error) {
      console.error("[qualify] ops email (Gmail) error:", error);
    }
  }
}

async function persistSubmission(row: StoredSubmission): Promise<{ persisted: boolean; id: string }> {
  memory.set(row.id, row);
  const sql = sqlClient();
  if (!sql) {
    console.warn("[qualify] DATABASE_URL is not set; submission kept in process memory only");
    return { persisted: false, id: row.id };
  }
  try {
    await sql`
      INSERT INTO get_qualified_submissions (
        id, created_at, name, email, phone, budget_lane, call_purpose, notes,
        source, route, status, process_pdf_sent, hub_member_id, session_booked, strategy_session_held
      ) VALUES (
        ${row.id}, ${row.createdAt}::timestamp, ${row.name}, ${row.email}, ${row.phone},
        ${row.budgetLane}, ${row.callPurpose}, ${row.notes}, ${row.source}, ${row.route},
        ${row.status}, ${row.processPdfSent}, ${row.hubMemberId}, ${row.sessionBooked}, ${row.strategySessionHeld}
      )
    `;
    return { persisted: true, id: row.id };
  } catch (error) {
    console.error("[qualify] insert failed; site continues with session progress only", error);
    return { persisted: false, id: row.id };
  }
}

async function markPdfSent(id: string) {
  const existing = memory.get(id);
  if (existing) memory.set(id, { ...existing, processPdfSent: true });
  const sql = sqlClient();
  if (!sql) return;
  try {
    await sql`UPDATE get_qualified_submissions SET process_pdf_sent = true WHERE id = ${id}`;
  } catch (error) {
    console.error("[qualify] could not flag process_pdf_sent", error);
  }
}

export async function updateQualifyFlags(input: {
  email?: string | null;
  submissionId?: string | null;
  sessionBooked?: boolean;
  strategySessionHeld?: boolean;
  status?: QualifyStatus;
}): Promise<StoredSubmission | null> {
  const current = input.submissionId
    ? Array.from(memory.values()).find((row) => row.id === input.submissionId) || null
    : input.email
      ? await findLatestQualifyByEmail(input.email)
      : null;
  if (!current && !input.email) return null;

  const next: StoredSubmission | null = current
    ? {
        ...current,
        sessionBooked: input.sessionBooked ?? current.sessionBooked,
        strategySessionHeld: input.strategySessionHeld ?? current.strategySessionHeld,
        status: input.status ?? (input.sessionBooked ? "booked" : current.status),
      }
    : null;

  if (next) memory.set(next.id, next);

  const sql = sqlClient();
  if (sql && (next || input.email)) {
    try {
      if (next) {
        await sql`
          UPDATE get_qualified_submissions
          SET session_booked = ${next.sessionBooked},
              strategy_session_held = ${next.strategySessionHeld},
              status = ${next.status}
          WHERE id = ${next.id}
        `;
      }
    } catch (error) {
      console.error("[qualify] flag update failed", error);
    }
  }

  return next;
}

export function progressFromSubmission(row: StoredSubmission | null): HubPathProgress {
  if (!row) return emptyHubPathProgress();
  return {
    getQualifiedComplete: true,
    sessionBooked: row.sessionBooked,
    strategySessionHeld: row.strategySessionHeld,
    qualifyRoute: row.route,
  };
}

export function buildProgressCookieFromState(input: {
  email: string;
  name?: string | null;
  progress: HubPathProgress;
}): HubProgressCookie {
  return {
    e: input.email.trim().toLowerCase(),
    n: input.name || null,
    gq: input.progress.getQualifiedComplete,
    sb: input.progress.sessionBooked,
    ssh: input.progress.strategySessionHeld,
    qr: input.progress.qualifyRoute,
    at: new Date().toISOString(),
  };
}

export async function resolveHubProgress(input: {
  email?: string | null;
  memberId?: string | null;
  cookie?: HubProgressCookie | null;
}): Promise<HubPathProgress> {
  let progress = progressFromCookie(input.cookie || null);
  if (input.memberId) {
    progress = mergeProgress(progress, progressFromSubmission(await findLatestQualifyByMemberId(input.memberId)));
  }
  if (input.email) {
    progress = mergeProgress(progress, progressFromSubmission(await findLatestQualifyByEmail(input.email)));
  }
  return progress;
}

export type QualifyResult = {
  ok: true;
  id: string;
  persisted: boolean;
  processPdfSent: boolean;
  hubCreated: boolean;
  hubMemberId: string | null;
  route: QualifyRoute;
  status: QualifyStatus;
  progress: HubPathProgress;
  nextStep: string;
  hubPath: string;
  calendarUrl: string | null;
  diegoUrl: string | null;
  processPdfPath: string;
  cookie: HubProgressCookie;
};

export async function submitGetQualified(input: {
  body: unknown;
  visitorId?: string | null;
  querySource?: unknown;
}): Promise<{ ok: true; result: QualifyResult } | { ok: false; status: number; error: string }> {
  const parsed = qualifySubmissionSchema.safeParse(input.body);
  if (!parsed.success) {
    return { ok: false, status: 400, error: parsed.error.errors[0]?.message || "Invalid form data" };
  }

  const data: QualifySubmissionInput = parsed.data;
  const email = data.email.trim().toLowerCase();
  const source = parseQualifySource(data.source || input.querySource);
  const route = resolveQualifyRoute(data.budgetLane, data.callPurpose);
  const status = initialQualifyStatus(route);
  const { memberId, created } = await claimOrCreateHubMember({
    email,
    name: data.name,
    visitorId: input.visitorId,
  });

  const row: StoredSubmission = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    name: data.name.trim(),
    email,
    phone: data.phone?.trim() || null,
    budgetLane: data.budgetLane,
    callPurpose: data.callPurpose,
    notes: data.notes?.trim() || null,
    source,
    route,
    status,
    processPdfSent: false,
    hubMemberId: memberId,
    sessionBooked: false,
    strategySessionHeld: false,
  };

  const persisted = await persistSubmission(row);
  const mailed = await sendProcessEmail({ name: row.name, email, route });
  if (mailed) await markPdfSent(row.id);
  void notifyOps(row);

  const progress: HubPathProgress = {
    getQualifiedComplete: true,
    sessionBooked: false,
    strategySessionHeld: false,
    qualifyRoute: route,
  };

  return {
    ok: true,
    result: {
      ok: true,
      id: persisted.id,
      persisted: persisted.persisted,
      processPdfSent: mailed,
      hubCreated: created,
      hubMemberId: memberId,
      route,
      status,
      progress,
      nextStep: nextStepForRoute(route),
      hubPath: "/hub?from=qualify",
      calendarUrl: route === "raphi_calendar" ? raphiCalendarUrl() : null,
      diegoUrl: route === "diego_handoff" ? diegoEllimanUrl() : null,
      processPdfPath: PROCESS_PDF_PUBLIC,
      cookie: buildProgressCookieFromState({ email, name: row.name, progress }),
    },
  };
}

export { encodeHubProgressCookie };

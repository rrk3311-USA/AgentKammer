import { neon } from "@neondatabase/serverless";
import type { Brief, DecisionMap, MemberPayload } from "./_shared.js";

/**
 * Optional Neon persistence for Decision Hub member records.
 * Cookie session remains the auth token either way. When DATABASE_URL is
 * missing or the table is not yet pushed, callers fail open to cookies.
 */
export function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL);
}

function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  try {
    return neon(url);
  } catch (err) {
    console.error("Hub DB connection skipped:", err);
    return null;
  }
}

type MemberRow = {
  id: string;
  email: string;
  display_name: string | null;
  goals: string | null;
  vision: string | null;
  priorities: string | null;
  progress_stage: string | null;
  decision_map: string | null;
  briefs: string | null;
  visitor_ids: string[] | null;
  created_at: Date | string | null;
  updated_at: Date | string | null;
};

function parseBriefs(raw: string | null): Brief[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const src = item as Record<string, unknown>;
        const title = typeof src.t === "string" ? src.t : typeof src.title === "string" ? src.title : "";
        const body = typeof src.b === "string" ? src.b : typeof src.body === "string" ? src.body : "";
        if (!title && !body) return null;
        return {
          id: typeof src.id === "string" ? src.id : `brief_${Math.random().toString(16).slice(2)}`,
          t: title,
          b: body,
          src: typeof src.src === "string" ? src.src : typeof src.source === "string" ? src.source : "manual",
          sc: typeof src.sc === "number" ? src.sc : typeof src.score === "number" ? src.score : null,
          ca:
            typeof src.ca === "string"
              ? src.ca
              : typeof src.createdAt === "string"
                ? src.createdAt
                : new Date().toISOString(),
        } satisfies Brief;
      })
      .filter((item): item is Brief => Boolean(item));
  } catch {
    return [];
  }
}

function parseDecisionMap(raw: string | null): DecisionMap | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as DecisionMap) : null;
  } catch {
    return null;
  }
}

function toIso(value: Date | string | null | undefined, fallback: string) {
  if (!value) return fallback;
  if (value instanceof Date) return value.toISOString();
  return value;
}

function rowToMember(row: MemberRow, fallback: MemberPayload): MemberPayload {
  return {
    id: row.id || fallback.id,
    e: row.email || fallback.e,
    dn: row.display_name || fallback.dn,
    g: row.goals ?? fallback.g,
    vi: row.vision ?? fallback.vi,
    pr: row.priorities ?? fallback.pr,
    ps: row.progress_stage || fallback.ps,
    dm: parseDecisionMap(row.decision_map) || fallback.dm,
    br: (() => {
      const briefs = parseBriefs(row.briefs);
      return briefs.length ? briefs : fallback.br;
    })(),
    vc: row.visitor_ids?.length || fallback.vc,
    ca: toIso(row.created_at, fallback.ca),
    ua: toIso(row.updated_at, fallback.ua),
  };
}

export async function persistMemberToDatabase(member: MemberPayload): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  try {
    const briefs = JSON.stringify(member.br);
    const decisionMap = member.dm ? JSON.stringify(member.dm) : null;
    await sql`
      INSERT INTO member_profiles (
        id, email, display_name, access_token, goals, vision, priorities,
        decision_map, briefs, progress_stage, last_visitor_id, updated_at
      )
      VALUES (
        ${member.id}, ${member.e}, ${member.dn}, ${member.id},
        ${member.g}, ${member.vi}, ${member.pr}, ${decisionMap}, ${briefs},
        ${member.ps}, null, now()
      )
      ON CONFLICT (email) DO UPDATE SET
        display_name = EXCLUDED.display_name,
        goals = EXCLUDED.goals,
        vision = EXCLUDED.vision,
        priorities = EXCLUDED.priorities,
        decision_map = EXCLUDED.decision_map,
        briefs = EXCLUDED.briefs,
        progress_stage = EXCLUDED.progress_stage,
        updated_at = now()
    `;
  } catch (err) {
    console.error("Hub DB persist skipped:", err);
  }
}

export async function loadMemberFromDatabase(email: string, fallback: MemberPayload): Promise<MemberPayload> {
  const sql = getSql();
  if (!sql) return fallback;
  try {
    const rows = (await sql`
      SELECT id, email, display_name, goals, vision, priorities, progress_stage,
             decision_map, briefs, visitor_ids, created_at, updated_at
      FROM member_profiles
      WHERE email = ${email}
      LIMIT 1
    `) as MemberRow[];
    const row = rows[0];
    return row ? rowToMember(row, fallback) : fallback;
  } catch (err) {
    console.error("Hub DB load skipped:", err);
    return fallback;
  }
}

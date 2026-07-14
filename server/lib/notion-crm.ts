/**
 * Notion CRM sync (website → Notion, one-way).
 *
 * Website DB remains source of truth. Missing NOTION_* env = no-op.
 * Contract: docs/integrations/notion-crm.md
 */

export type NotionCrmLeadPayload = {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  sourcePage?: string | null;
  decisionGuideSummary?: string | null;
  goals?: string | null;
  timeline?: string | null;
  budget?: string | null;
  neighborhoodsBuildings?: string | null;
  leadScore?: number | null;
  pipelineStage?: string | null;
  recommendedNextAction?: string | null;
  lastActivity?: string | null;
  fullConversationLink?: string | null;
  websiteLeadId?: string | number | null;
  websitePersonId?: string | number | null;
  websiteConversationId?: string | null;
};

function isNotionSyncConfigured(): boolean {
  const key = process.env.NOTION_API_KEY?.trim();
  const people = process.env.NOTION_PEOPLE_DATABASE_ID?.trim();
  const leads = process.env.NOTION_LEADS_DATABASE_ID?.trim();
  if (!key || !people || !leads) return false;
  const gate = process.env.NOTION_SYNC_ENABLED;
  if (gate != null && gate !== "" && gate.toLowerCase() !== "true") return false;
  return true;
}

/**
 * Fire-and-forget safe: never throws to callers.
 * TODO: implement Notion API upsert (Person + Conversation + Opportunity).
 */
export async function syncLeadToNotion(payload: NotionCrmLeadPayload): Promise<{ ok: boolean; skipped: boolean }> {
  if (!isNotionSyncConfigured()) {
    return { ok: true, skipped: true };
  }

  try {
    // TODO: create/update Person, attach Conversation + Lead/Opportunity in Notion.
    // Keep website createLead as SoT; this path must not fail the request.
    console.log("[notion-crm] sync stub (not yet implemented)", {
      websiteLeadId: payload.websiteLeadId ?? null,
      email: payload.email ? "[set]" : null,
      name: payload.name ?? null,
    });
    return { ok: true, skipped: false };
  } catch (err) {
    console.error("[notion-crm] sync failed (swallowed)", err);
    return { ok: false, skipped: false };
  }
}

/** Non-blocking wrapper for route handlers. */
export function syncLeadToNotionSafe(payload: NotionCrmLeadPayload): void {
  void syncLeadToNotion(payload).catch((err) => {
    console.error("[notion-crm] unexpected rejection (swallowed)", err);
  });
}

import type { ClientProfileRow, MemberProfile, SavedItem } from "@shared/schema";
import {
  addAversion,
  appendPreferenceEvent,
  recordFavorite,
  setNeighborhoods,
  upsertBuilding,
  upsertContactByEmail,
  upsertProperty,
  upsertSoloBuyerProfile,
} from "./repository";

export function parseBudgetRange(raw: string | null | undefined): { min: number | null; max: number | null } {
  if (!raw) return { min: null, max: null };
  const nums = Array.from(raw.replace(/,/g, "").matchAll(/(\d+(?:\.\d+)?)\s*([mk])?/gi), (m) => {
    const n = Number(m[1]);
    const u = (m[2] || "").toLowerCase();
    if (u === "m") return Math.round(n * 1_000_000 * 100);
    if (u === "k") return Math.round(n * 1_000 * 100);
    if (n > 1000) return Math.round(n * 100);
    return Math.round(n * 1_000_000 * 100);
  });
  if (!nums.length) return { min: null, max: null };
  return { min: Math.min(...nums), max: Math.max(...nums) };
}

export function parseTimelineBand(raw: string | null | undefined) {
  const t = (raw || "").toLowerCase();
  if (/immediate|now|asap|0.?3|1.?3/.test(t)) return "0_3_months" as const;
  if (/3.?6/.test(t)) return "3_6_months" as const;
  if (/6.?12/.test(t)) return "6_12_months" as const;
  if (/12|year|exploring|not sure/.test(t)) return "12_plus" as const;
  return "unknown" as const;
}

export function parseFinancing(raw: string | null | undefined) {
  const t = (raw || "").toLowerCase();
  if (/cash/.test(t)) return "cash" as const;
  if (/pre-?approv/.test(t)) return "mortgage" as const;
  if (/mortgage|loan|lender/.test(t)) return "mortgage" as const;
  if (/mix|both/.test(t)) return "mixed" as const;
  return "unknown" as const;
}

export function parsePreapproval(raw: string | null | undefined) {
  const t = (raw || "").toLowerCase();
  if (/cash/.test(t)) return "cash_verified" as const;
  if (/pre-?approv/.test(t)) return "preapproved" as const;
  if (/pre-?qual/.test(t)) return "prequalified" as const;
  if (/progress|speaking/.test(t)) return "in_progress" as const;
  return "none" as const;
}

function splitName(name: string | null | undefined) {
  const parts = (name || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return { firstName: null as string | null, lastName: null as string | null };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") || null };
}

export async function ingestContactIntake(input: {
  name?: string;
  email?: string;
  phone?: string;
  timeline?: string;
  budgetRange?: string;
  message?: string;
  sourceRowId?: string;
}) {
  if (!input.email) return null;
  const { firstName, lastName } = splitName(input.name);
  const budget = parseBudgetRange(input.budgetRange || input.message);
  const contact = await upsertContactByEmail({
    email: input.email,
    firstName,
    lastName,
    phone: input.phone,
    source: "contact_form",
  });
  const buyer = await upsertSoloBuyerProfile({
    contactId: contact.id,
    displayName: input.name || input.email,
    budgetMinCents: budget.min,
    budgetMaxCents: budget.max,
    timeline: parseTimelineBand(input.timeline || input.message),
    notes: input.message || null,
  });
  if (input.timeline) {
    await appendPreferenceEvent({
      buyerProfileId: buyer.id,
      origin: "stated",
      category: "other",
      preference: `Timeline: ${input.timeline}`,
      sourceSystem: "contact_form",
      sourceRowId: `${input.sourceRowId || "contact"}:timeline`,
    });
  }
  return { contact, buyer };
}

export async function ingestClientProfileRow(row: ClientProfileRow) {
  if (!row.email) return null;
  const contact = await upsertContactByEmail({
    email: row.email,
    firstName: row.firstName,
    lastName: row.lastName,
    phone: row.phone,
    source: "client_profile",
    websiteClientProfileId: row.id,
    visitorId: row.visitorId,
  });
  const budget = parseBudgetRange(row.budgetRange);
  const buyer = await upsertSoloBuyerProfile({
    contactId: contact.id,
    displayName: [row.firstName, row.lastName].filter(Boolean).join(" ") || row.email,
    budgetMinCents: budget.min,
    budgetMaxCents: budget.max,
    financingType: parseFinancing(row.financingStatus),
    preapprovalStatus: parsePreapproval(row.financingStatus || row.creditReadiness),
    timeline: parseTimelineBand(row.timeline),
    notes: row.lastConversationSummary,
    websiteClientProfileId: row.id,
    visitorId: row.visitorId,
  });
  if (row.targetLocations?.length) await setNeighborhoods(buyer.id, row.targetLocations);
  for (const item of row.dealBreakers ?? []) {
    await addAversion({
      buyerProfileId: buyer.id,
      issue: item,
      origin: "stated",
      sourceSystem: "client_profile",
      sourceRowId: `${row.id}:db:${item}`,
    });
  }
  for (const item of row.constraints ?? []) {
    await appendPreferenceEvent({
      buyerProfileId: buyer.id,
      origin: "stated",
      category: "other",
      preference: item,
      polarity: "avoid",
      sourceSystem: "client_profile",
      sourceRowId: `${row.id}:c:${item}`,
    });
  }
  return { contact, buyer };
}

export async function ingestSavedItem(buyerProfileId: string, item: Pick<SavedItem, "id" | "title" | "path" | "itemType">) {
  const slug = item.path?.match(/building-reports\/([^/?#]+)/)?.[1] || item.path?.replace(/^\//, "") || item.id;
  const hood = neighborhoodFromPath(item.path || item.title);
  const building = await upsertBuilding({
    name: item.title,
    reportSlug: slug,
    neighborhoodSlug: hood,
  });
  const property = await upsertProperty({
    address: item.title,
    buildingId: building.id,
    externalId: `saved:${item.id}`,
  });
  await recordFavorite({
    buyerProfileId,
    propertyId: property.id,
    sourceSystem: "hub_save",
    sourceRowId: item.id,
    notes: item.path || item.title,
  });
  if (hood) {
    await appendPreferenceEvent({
      buyerProfileId,
      origin: "observed",
      category: "neighborhood",
      preference: hood,
      importance: 4,
      sourceSystem: "hub_save",
      sourceRowId: `${item.id}:hood`,
    });
  }
  return { building, property };
}

export async function ingestMemberProfile(member: MemberProfile, buyerProfileId: string) {
  if (member.goals) {
    await appendPreferenceEvent({
      buyerProfileId,
      origin: "stated",
      category: "other",
      preference: member.goals,
      sourceSystem: "member_profile",
      sourceRowId: `${member.id}:goals`,
    });
  }
  if (member.priorities) {
    await appendPreferenceEvent({
      buyerProfileId,
      origin: "stated",
      category: "other",
      preference: member.priorities,
      sourceSystem: "member_profile",
      sourceRowId: `${member.id}:priorities`,
    });
  }
}

function neighborhoodFromPath(path: string): string | null {
  const lower = path.toLowerCase();
  const map: Record<string, string> = {
    chelsea: "chelsea",
    tribeca: "tribeca",
    "hudson-yards": "hudson-yards",
    "upper-west": "upper-west-side",
    "upper-east": "upper-east-side",
  };
  for (const [k, v] of Object.entries(map)) {
    if (lower.includes(k)) return v;
  }
  return null;
}

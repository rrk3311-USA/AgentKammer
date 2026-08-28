import { randomUUID } from "crypto";
import { and, desc, eq, isNull } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import {
  biBuyerAversions,
  biBuyerNeighborhoods,
  biBuyerPersonaAssignments,
  biBuyerPersonas,
  biBuyerProfiles,
  biBuyerPropertyMatches,
  biBuildings,
  biContacts,
  biPreferenceEvents,
  biProperties,
  biPropertyAttributes,
  biPropertyReactions,
  biPropertySaves,
  biRejectionReasons,
  type BiBuyerAversion,
  type BiBuyerProfile,
  type BiBuyerPropertyMatch,
  type BiBuilding,
  type BiContact,
  type BiPreferenceEvent,
  type BiProperty,
  type BiPropertyReaction,
} from "@shared/schema-buyer-intel";
import { MATCH_MODEL, scoreBuyerPropertyMatch } from "./match";

let db: ReturnType<typeof drizzle> | null = null;
try {
  if (process.env.DATABASE_URL && !process.env.VITEST) {
    db = drizzle(neon(process.env.DATABASE_URL));
  }
} catch {
  db = null;
}

type Mem = {
  contacts: BiContact[];
  profiles: BiBuyerProfile[];
  neighborhoods: { buyerProfileId: string; neighborhoodSlug: string; rank: number }[];
  personas: { id: string; personaName: string; description: string | null }[];
  assignments: { buyerProfileId: string; personaId: string; confidence: string | null }[];
  events: BiPreferenceEvent[];
  aversions: BiBuyerAversion[];
  buildings: BiBuilding[];
  properties: BiProperty[];
  attributes: { propertyId: string; attribute: string; value: string }[];
  matches: BiBuyerPropertyMatch[];
  reactions: BiPropertyReaction[];
  saves: { buyerProfileId: string; propertyId: string; savedAt: Date; sourceRowId: string | null }[];
  rejections: { reactionId: string; reasonCategory: string; detail: string }[];
};

const mem: Mem = {
  contacts: [],
  profiles: [],
  neighborhoods: [],
  personas: [],
  assignments: [],
  events: [],
  aversions: [],
  buildings: [],
  properties: [],
  attributes: [],
  matches: [],
  reactions: [],
  saves: [],
  rejections: [],
};

function now() {
  return new Date();
}

function alive<T extends { deletedAt?: Date | null }>(rows: T[]): T[] {
  return rows.filter((r) => !r.deletedAt);
}

export function buyerIntelUsesDatabase(): boolean {
  return Boolean(db);
}

export async function upsertContactByEmail(input: {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  source?: string;
  websiteClientProfileId?: string | null;
  memberProfileId?: string | null;
  visitorId?: string | null;
}): Promise<BiContact> {
  const email = input.email.trim().toLowerCase();
  if (db) {
    const existing = await db
      .select()
      .from(biContacts)
      .where(and(eq(biContacts.email, email), isNull(biContacts.deletedAt)))
      .limit(1);
    if (existing[0]) {
      const [row] = await db
        .update(biContacts)
        .set({
          firstName: input.firstName ?? existing[0].firstName,
          lastName: input.lastName ?? existing[0].lastName,
          phone: input.phone ?? existing[0].phone,
          websiteClientProfileId: input.websiteClientProfileId ?? existing[0].websiteClientProfileId,
          memberProfileId: input.memberProfileId ?? existing[0].memberProfileId,
          visitorId: input.visitorId ?? existing[0].visitorId,
          updatedAt: now(),
        })
        .where(eq(biContacts.id, existing[0].id))
        .returning();
      return row;
    }
    const [row] = await db
      .insert(biContacts)
      .values({
        email,
        firstName: input.firstName ?? null,
        lastName: input.lastName ?? null,
        phone: input.phone ?? null,
        source: input.source ?? "website",
        websiteClientProfileId: input.websiteClientProfileId ?? null,
        memberProfileId: input.memberProfileId ?? null,
        visitorId: input.visitorId ?? null,
      })
      .returning();
    return row;
  }

  const found = alive(mem.contacts).find((c) => c.email === email);
  if (found) {
    Object.assign(found, {
      firstName: input.firstName ?? found.firstName,
      lastName: input.lastName ?? found.lastName,
      phone: input.phone ?? found.phone,
      websiteClientProfileId: input.websiteClientProfileId ?? found.websiteClientProfileId,
      memberProfileId: input.memberProfileId ?? found.memberProfileId,
      visitorId: input.visitorId ?? found.visitorId,
      updatedAt: now(),
    });
    return found;
  }
  const row: BiContact = {
    id: randomUUID(),
    createdAt: now(),
    updatedAt: now(),
    deletedAt: null,
    firstName: input.firstName ?? null,
    lastName: input.lastName ?? null,
    email,
    phone: input.phone ?? null,
    sourceId: null,
    source: input.source ?? "website",
    status: "signal",
    owner: null,
    websiteClientProfileId: input.websiteClientProfileId ?? null,
    websiteLeadId: null,
    memberProfileId: input.memberProfileId ?? null,
    visitorId: input.visitorId ?? null,
  };
  mem.contacts.push(row);
  return row;
}

export async function upsertSoloBuyerProfile(input: {
  contactId: string;
  displayName?: string | null;
  budgetMinCents?: number | null;
  budgetMaxCents?: number | null;
  financingType?: BiBuyerProfile["financingType"];
  preapprovalStatus?: BiBuyerProfile["preapprovalStatus"];
  timeline?: BiBuyerProfile["timeline"];
  propertyType?: BiBuyerProfile["propertyType"];
  sqftMin?: number | null;
  notes?: string | null;
  websiteClientProfileId?: string | null;
  memberProfileId?: string | null;
  visitorId?: string | null;
}): Promise<BiBuyerProfile> {
  if (db) {
    const existing = await db
      .select()
      .from(biBuyerProfiles)
      .where(and(eq(biBuyerProfiles.contactId, input.contactId), isNull(biBuyerProfiles.deletedAt)))
      .limit(1);
    if (existing[0]) {
      const [row] = await db
        .update(biBuyerProfiles)
        .set({
          displayName: input.displayName ?? existing[0].displayName,
          budgetMinCents: input.budgetMinCents ?? existing[0].budgetMinCents,
          budgetMaxCents: input.budgetMaxCents ?? existing[0].budgetMaxCents,
          financingType: input.financingType ?? existing[0].financingType,
          preapprovalStatus: input.preapprovalStatus ?? existing[0].preapprovalStatus,
          timeline: input.timeline ?? existing[0].timeline,
          propertyType: input.propertyType ?? existing[0].propertyType,
          sqftMin: input.sqftMin ?? existing[0].sqftMin,
          notes: input.notes ?? existing[0].notes,
          websiteClientProfileId: input.websiteClientProfileId ?? existing[0].websiteClientProfileId,
          memberProfileId: input.memberProfileId ?? existing[0].memberProfileId,
          visitorId: input.visitorId ?? existing[0].visitorId,
          updatedAt: now(),
        })
        .where(eq(biBuyerProfiles.id, existing[0].id))
        .returning();
      return row;
    }
    const [row] = await db
      .insert(biBuyerProfiles)
      .values({
        contactId: input.contactId,
        householdId: null,
        displayName: input.displayName ?? null,
        budgetMinCents: input.budgetMinCents ?? null,
        budgetMaxCents: input.budgetMaxCents ?? null,
        financingType: input.financingType ?? "unknown",
        preapprovalStatus: input.preapprovalStatus ?? "none",
        timeline: input.timeline ?? "unknown",
        propertyType: input.propertyType ?? "unknown",
        sqftMin: input.sqftMin ?? null,
        notes: input.notes ?? null,
        websiteClientProfileId: input.websiteClientProfileId ?? null,
        memberProfileId: input.memberProfileId ?? null,
        visitorId: input.visitorId ?? null,
      })
      .returning();
    return row;
  }

  const found = alive(mem.profiles).find((p) => p.contactId === input.contactId);
  if (found) {
    Object.assign(found, { ...input, updatedAt: now() });
    return found;
  }
  const row: BiBuyerProfile = {
    id: randomUUID(),
    createdAt: now(),
    updatedAt: now(),
    deletedAt: null,
    contactId: input.contactId,
    householdId: null,
    displayName: input.displayName ?? null,
    budgetMinCents: input.budgetMinCents ?? null,
    budgetMaxCents: input.budgetMaxCents ?? null,
    financingType: input.financingType ?? "unknown",
    preapprovalStatus: input.preapprovalStatus ?? "none",
    timeline: input.timeline ?? "unknown",
    propertyType: input.propertyType ?? "unknown",
    bedsMin: null,
    bathsMin: null,
    sqftMin: input.sqftMin ?? null,
    notes: input.notes ?? null,
    status: "signal",
    owner: null,
    websiteClientProfileId: input.websiteClientProfileId ?? null,
    memberProfileId: input.memberProfileId ?? null,
    visitorId: input.visitorId ?? null,
  };
  mem.profiles.push(row);
  return row;
}

/** Append-only. Never updates preference text/importance on an existing row. */
export async function appendPreferenceEvent(input: {
  buyerProfileId: string;
  origin: BiPreferenceEvent["origin"];
  category: BiPreferenceEvent["category"];
  preference: string;
  importance?: number | null;
  hardRequirement?: boolean;
  polarity?: string;
  confidence?: string | number | null;
  evidenceNote?: string | null;
  sourceSystem?: string | null;
  sourceRowId?: string | null;
}): Promise<BiPreferenceEvent> {
  if (input.sourceSystem && input.sourceRowId) {
    const dup = await findPrefBySource(input.buyerProfileId, input.sourceSystem, input.sourceRowId, input.origin);
    if (dup) return dup;
  }

  if (db) {
    const [row] = await db
      .insert(biPreferenceEvents)
      .values({
        buyerProfileId: input.buyerProfileId,
        origin: input.origin,
        category: input.category,
        preference: input.preference,
        importance: input.importance ?? null,
        hardRequirement: input.hardRequirement ?? false,
        polarity: input.polarity ?? "want",
        confidence: input.confidence != null ? String(input.confidence) : null,
        evidenceNote: input.evidenceNote ?? null,
        sourceSystem: input.sourceSystem ?? null,
        sourceRowId: input.sourceRowId ?? null,
      })
      .returning();
    return row;
  }

  const row: BiPreferenceEvent = {
    id: randomUUID(),
    createdAt: now(),
    updatedAt: now(),
    deletedAt: null,
    buyerProfileId: input.buyerProfileId,
    origin: input.origin,
    category: input.category,
    preference: input.preference,
    importance: input.importance ?? null,
    hardRequirement: input.hardRequirement ?? false,
    polarity: input.polarity ?? "want",
    confidence: input.confidence != null ? String(input.confidence) : null,
    evidenceReactionId: null,
    evidenceNote: input.evidenceNote ?? null,
    recordedAt: now(),
    supersededBy: null,
    sourceSystem: input.sourceSystem ?? null,
    sourceRowId: input.sourceRowId ?? null,
  };
  mem.events.push(row);
  return row;
}

async function findPrefBySource(
  buyerProfileId: string,
  sourceSystem: string,
  sourceRowId: string,
  origin: BiPreferenceEvent["origin"],
): Promise<BiPreferenceEvent | undefined> {
  if (db) {
    const rows = await db
      .select()
      .from(biPreferenceEvents)
      .where(
        and(
          eq(biPreferenceEvents.buyerProfileId, buyerProfileId),
          eq(biPreferenceEvents.sourceSystem, sourceSystem),
          eq(biPreferenceEvents.sourceRowId, sourceRowId),
          eq(biPreferenceEvents.origin, origin),
          isNull(biPreferenceEvents.deletedAt),
        ),
      )
      .limit(1);
    return rows[0];
  }
  return alive(mem.events).find(
    (e) =>
      e.buyerProfileId === buyerProfileId &&
      e.sourceSystem === sourceSystem &&
      e.sourceRowId === sourceRowId &&
      e.origin === origin,
  );
}

export async function addAversion(input: {
  buyerProfileId: string;
  issue: string;
  category?: BiBuyerAversion["category"];
  severity?: BiBuyerAversion["severity"];
  origin?: BiBuyerAversion["origin"];
  notes?: string | null;
  sourceSystem?: string | null;
  sourceRowId?: string | null;
}): Promise<BiBuyerAversion> {
  if (input.sourceRowId) {
    const existing = db
      ? (
          await db
            .select()
            .from(biBuyerAversions)
            .where(and(eq(biBuyerAversions.sourceRowId, input.sourceRowId), isNull(biBuyerAversions.deletedAt)))
            .limit(1)
        )[0]
      : alive(mem.aversions).find((a) => a.sourceRowId === input.sourceRowId);
    if (existing) return existing;
  }

  if (db) {
    const [row] = await db
      .insert(biBuyerAversions)
      .values({
        buyerProfileId: input.buyerProfileId,
        issue: input.issue,
        category: input.category ?? "other",
        severity: input.severity ?? "strong",
        origin: input.origin ?? "stated",
        notes: input.notes ?? null,
        sourceSystem: input.sourceSystem ?? null,
        sourceRowId: input.sourceRowId ?? null,
      })
      .returning();
    return row;
  }

  const row: BiBuyerAversion = {
    id: randomUUID(),
    createdAt: now(),
    updatedAt: now(),
    deletedAt: null,
    buyerProfileId: input.buyerProfileId,
    category: input.category ?? "other",
    issue: input.issue,
    severity: input.severity ?? "strong",
    origin: input.origin ?? "stated",
    notes: input.notes ?? null,
    sourceSystem: input.sourceSystem ?? null,
    sourceRowId: input.sourceRowId ?? null,
  };
  mem.aversions.push(row);
  return row;
}

export async function setNeighborhoods(buyerProfileId: string, slugs: string[]): Promise<void> {
  const unique = Array.from(new Set(slugs.map((s) => s.trim()).filter(Boolean)));
  if (db) {
    const existing = await db
      .select()
      .from(biBuyerNeighborhoods)
      .where(and(eq(biBuyerNeighborhoods.buyerProfileId, buyerProfileId), isNull(biBuyerNeighborhoods.deletedAt)));
    const have = new Set(existing.map((e) => e.neighborhoodSlug.toLowerCase()));
    let rank = existing.length;
    for (const slug of unique) {
      if (have.has(slug.toLowerCase())) continue;
      rank += 1;
      await db.insert(biBuyerNeighborhoods).values({ buyerProfileId, neighborhoodSlug: slug, rank });
    }
    return;
  }
  unique.forEach((slug, i) => {
    if (!mem.neighborhoods.some((n) => n.buyerProfileId === buyerProfileId && n.neighborhoodSlug === slug)) {
      mem.neighborhoods.push({ buyerProfileId, neighborhoodSlug: slug, rank: i + 1 });
    }
  });
}

export async function ensurePersona(name: string, description: string): Promise<string> {
  if (db) {
    const found = await db.select().from(biBuyerPersonas).where(eq(biBuyerPersonas.personaName, name)).limit(1);
    if (found[0]) return found[0].id;
    const [row] = await db.insert(biBuyerPersonas).values({ personaName: name, description }).returning();
    return row.id;
  }
  const found = mem.personas.find((p) => p.personaName === name);
  if (found) return found.id;
  const id = randomUUID();
  mem.personas.push({ id, personaName: name, description });
  return id;
}

export async function assignPersona(buyerProfileId: string, personaId: string, confidence: number, assignedBy = "advisor") {
  if (db) {
    await db.insert(biBuyerPersonaAssignments).values({
      buyerProfileId,
      personaId,
      confidence: String(confidence),
      assignedBy,
    });
    return;
  }
  mem.assignments.push({ buyerProfileId, personaId, confidence: String(confidence) });
}

export async function upsertBuilding(input: {
  name: string;
  neighborhoodSlug?: string | null;
  ownershipForm?: BiBuilding["ownershipForm"];
  reportSlug?: string | null;
  address?: string | null;
}): Promise<BiBuilding> {
  const key = (input.reportSlug || input.name).toLowerCase();
  if (db) {
    const all = await db.select().from(biBuildings).where(isNull(biBuildings.deletedAt));
    const found = all.find((b) => (b.reportSlug || b.name).toLowerCase() === key);
    if (found) return found;
    const [row] = await db
      .insert(biBuildings)
      .values({
        name: input.name,
        neighborhoodSlug: input.neighborhoodSlug ?? null,
        ownershipForm: input.ownershipForm ?? "unknown",
        reportSlug: input.reportSlug ?? null,
        address: input.address ?? null,
      })
      .returning();
    return row;
  }
  const found = alive(mem.buildings).find((b) => (b.reportSlug || b.name).toLowerCase() === key);
  if (found) return found;
  const row: BiBuilding = {
    id: randomUUID(),
    createdAt: now(),
    updatedAt: now(),
    deletedAt: null,
    name: input.name,
    address: input.address ?? null,
    neighborhoodSlug: input.neighborhoodSlug ?? null,
    ownershipForm: input.ownershipForm ?? "unknown",
    yearBuilt: null,
    developer: null,
    amenities: null,
    reportSlug: input.reportSlug ?? null,
  };
  mem.buildings.push(row);
  return row;
}

export async function upsertProperty(input: {
  address: string;
  unit?: string | null;
  buildingId?: string | null;
  askPriceCents?: number | null;
  beds?: string | null;
  baths?: string | null;
  sqft?: number | null;
  floor?: number | null;
  externalId?: string | null;
}): Promise<BiProperty> {
  if (db) {
    if (input.externalId) {
      const found = await db
        .select()
        .from(biProperties)
        .where(and(eq(biProperties.externalId, input.externalId), isNull(biProperties.deletedAt)))
        .limit(1);
      if (found[0]) return found[0];
    }
    const [row] = await db
      .insert(biProperties)
      .values({
        address: input.address,
        unit: input.unit ?? null,
        buildingId: input.buildingId ?? null,
        askPriceCents: input.askPriceCents ?? null,
        beds: input.beds ?? null,
        baths: input.baths ?? null,
        sqft: input.sqft ?? null,
        floor: input.floor ?? null,
        externalId: input.externalId ?? null,
      })
      .returning();
    return row;
  }
  if (input.externalId) {
    const found = alive(mem.properties).find((p) => p.externalId === input.externalId);
    if (found) return found;
  }
  const row: BiProperty = {
    id: randomUUID(),
    createdAt: now(),
    updatedAt: now(),
    deletedAt: null,
    buildingId: input.buildingId ?? null,
    address: input.address,
    unit: input.unit ?? null,
    askPriceCents: input.askPriceCents ?? null,
    beds: input.beds ?? null,
    baths: input.baths ?? null,
    sqft: input.sqft ?? null,
    status: "active",
    listingUrl: null,
    externalId: input.externalId ?? null,
    floor: input.floor ?? null,
  };
  mem.properties.push(row);
  return row;
}

export async function setPropertyAttribute(propertyId: string, attribute: string, value: string) {
  if (db) {
    const existing = await db
      .select()
      .from(biPropertyAttributes)
      .where(and(eq(biPropertyAttributes.propertyId, propertyId), eq(biPropertyAttributes.attribute, attribute)))
      .limit(1);
    if (existing[0]) {
      await db
        .update(biPropertyAttributes)
        .set({ value, updatedAt: now() })
        .where(eq(biPropertyAttributes.id, existing[0].id));
      return;
    }
    await db.insert(biPropertyAttributes).values({ propertyId, attribute, value });
    return;
  }
  const found = mem.attributes.find((a) => a.propertyId === propertyId && a.attribute === attribute);
  if (found) found.value = value;
  else mem.attributes.push({ propertyId, attribute, value });
}

export async function recordFavorite(input: {
  buyerProfileId: string;
  propertyId: string;
  sourceSystem?: string;
  sourceRowId?: string;
  notes?: string;
}): Promise<void> {
  if (db) {
    await db.insert(biPropertyReactions).values({
      buyerProfileId: input.buyerProfileId,
      propertyId: input.propertyId,
      kind: "favorite",
      notes: input.notes ?? null,
      sourceSystem: input.sourceSystem ?? "hub_save",
      sourceRowId: input.sourceRowId ?? null,
    });
    const existing = await db
      .select()
      .from(biPropertySaves)
      .where(
        and(
          eq(biPropertySaves.buyerProfileId, input.buyerProfileId),
          eq(biPropertySaves.propertyId, input.propertyId),
          isNull(biPropertySaves.deletedAt),
        ),
      )
      .limit(1);
    if (!existing[0]) {
      await db.insert(biPropertySaves).values({
        buyerProfileId: input.buyerProfileId,
        propertyId: input.propertyId,
        sourceSystem: input.sourceSystem ?? "hub_save",
        sourceRowId: input.sourceRowId ?? null,
      });
    }
    return;
  }
  mem.reactions.push({
    id: randomUUID(),
    createdAt: now(),
    updatedAt: now(),
    deletedAt: null,
    buyerProfileId: input.buyerProfileId,
    propertyId: input.propertyId,
    kind: "favorite",
    reactionScore: null,
    notes: input.notes ?? null,
    occurredAt: now(),
    sourceSystem: input.sourceSystem ?? "hub_save",
    sourceRowId: input.sourceRowId ?? null,
  });
  if (!mem.saves.some((s) => s.buyerProfileId === input.buyerProfileId && s.propertyId === input.propertyId)) {
    mem.saves.push({
      buyerProfileId: input.buyerProfileId,
      propertyId: input.propertyId,
      savedAt: now(),
      sourceRowId: input.sourceRowId ?? null,
    });
  }
}

export async function recordRejection(input: {
  buyerProfileId: string;
  propertyId: string;
  detail: string;
  category?: BiBuyerAversion["category"];
}): Promise<void> {
  if (db) {
    const [reaction] = await db
      .insert(biPropertyReactions)
      .values({
        buyerProfileId: input.buyerProfileId,
        propertyId: input.propertyId,
        kind: "rejected",
        notes: input.detail,
        sourceSystem: "advisor",
      })
      .returning();
    await db.insert(biRejectionReasons).values({
      reactionId: reaction.id,
      reasonCategory: input.category ?? "kitchen",
      detail: input.detail,
    });
    return;
  }
  const reactionId = randomUUID();
  mem.reactions.push({
    id: reactionId,
    createdAt: now(),
    updatedAt: now(),
    deletedAt: null,
    buyerProfileId: input.buyerProfileId,
    propertyId: input.propertyId,
    kind: "rejected",
    reactionScore: null,
    notes: input.detail,
    occurredAt: now(),
    sourceSystem: "advisor",
    sourceRowId: null,
  });
  mem.rejections.push({
    reactionId,
    reasonCategory: input.category ?? "kitchen",
    detail: input.detail,
  });
}

export async function listPreferenceEvents(buyerProfileId: string): Promise<BiPreferenceEvent[]> {
  if (db) {
    return db
      .select()
      .from(biPreferenceEvents)
      .where(and(eq(biPreferenceEvents.buyerProfileId, buyerProfileId), isNull(biPreferenceEvents.deletedAt)))
      .orderBy(desc(biPreferenceEvents.recordedAt));
  }
  return alive(mem.events)
    .filter((e) => e.buyerProfileId === buyerProfileId)
    .sort((a, b) => b.recordedAt.getTime() - a.recordedAt.getTime());
}

export async function getBuyerChart(buyerProfileId: string) {
  const profile = db
    ? (
        await db
          .select()
          .from(biBuyerProfiles)
          .where(and(eq(biBuyerProfiles.id, buyerProfileId), isNull(biBuyerProfiles.deletedAt)))
          .limit(1)
      )[0]
    : alive(mem.profiles).find((p) => p.id === buyerProfileId);
  if (!profile) return null;

  const events = await listPreferenceEvents(buyerProfileId);
  const aversions = db
    ? await db
        .select()
        .from(biBuyerAversions)
        .where(and(eq(biBuyerAversions.buyerProfileId, buyerProfileId), isNull(biBuyerAversions.deletedAt)))
    : alive(mem.aversions).filter((a) => a.buyerProfileId === buyerProfileId);
  const neighborhoods = db
    ? await db
        .select()
        .from(biBuyerNeighborhoods)
        .where(and(eq(biBuyerNeighborhoods.buyerProfileId, buyerProfileId), isNull(biBuyerNeighborhoods.deletedAt)))
    : mem.neighborhoods.filter((n) => n.buyerProfileId === buyerProfileId);
  const reactions = db
    ? await db
        .select()
        .from(biPropertyReactions)
        .where(and(eq(biPropertyReactions.buyerProfileId, buyerProfileId), isNull(biPropertyReactions.deletedAt)))
    : mem.reactions.filter((r) => r.buyerProfileId === buyerProfileId && !r.deletedAt);

  const must = events.filter((e) => e.polarity === "want" && e.hardRequirement && e.origin === "stated");
  const prefer = events.filter((e) => e.polarity === "want" && !e.hardRequirement && e.origin === "stated");
  const observed = events.filter((e) => e.origin === "observed");
  const inferred = events.filter((e) => e.origin === "inferred");

  return {
    profile,
    neighborhoods: neighborhoods.map((n) => n.neighborhoodSlug),
    mustHave: must.map((e) => e.preference),
    prefer: prefer.map((e) => e.preference),
    avoid: aversions.map((a) => a.issue),
    stated: events.filter((e) => e.origin === "stated"),
    observed,
    inferred,
    reactions,
  };
}

export async function recomputeMatchesForProperty(propertyId: string): Promise<BiBuyerPropertyMatch[]> {
  const property = db
    ? (await db.select().from(biProperties).where(eq(biProperties.id, propertyId)).limit(1))[0]
    : mem.properties.find((p) => p.id === propertyId);
  if (!property) return [];

  const building = property.buildingId
    ? db
      ? (await db.select().from(biBuildings).where(eq(biBuildings.id, property.buildingId)).limit(1))[0]
      : mem.buildings.find((b) => b.id === property.buildingId)
    : undefined;

  const attrs = db
    ? await db.select().from(biPropertyAttributes).where(eq(biPropertyAttributes.propertyId, propertyId))
    : mem.attributes.filter((a) => a.propertyId === propertyId);
  const attrMap = Object.fromEntries(attrs.map((a) => [a.attribute, a.value]));

  const profiles = db
    ? await db.select().from(biBuyerProfiles).where(isNull(biBuyerProfiles.deletedAt))
    : alive(mem.profiles);

  const results: BiBuyerPropertyMatch[] = [];
  for (const profile of profiles) {
    const events = await listPreferenceEvents(profile.id);
    const aversions = db
      ? await db
          .select()
          .from(biBuyerAversions)
          .where(and(eq(biBuyerAversions.buyerProfileId, profile.id), isNull(biBuyerAversions.deletedAt)))
      : alive(mem.aversions).filter((a) => a.buyerProfileId === profile.id);
    const neighborhoods = db
      ? await db
          .select()
          .from(biBuyerNeighborhoods)
          .where(and(eq(biBuyerNeighborhoods.buyerProfileId, profile.id), isNull(biBuyerNeighborhoods.deletedAt)))
      : mem.neighborhoods.filter((n) => n.buyerProfileId === profile.id);

    const scored = scoreBuyerPropertyMatch({
      profile,
      neighborhoods: neighborhoods.map((n) => n.neighborhoodSlug),
      preferences: events,
      aversions,
      property: {
        ...property,
        neighborhoodSlug: building?.neighborhoodSlug,
        ownershipForm: building?.ownershipForm,
        attributes: attrMap,
      },
    });

    if (db) {
      const existing = await db
        .select()
        .from(biBuyerPropertyMatches)
        .where(
          and(
            eq(biBuyerPropertyMatches.buyerProfileId, profile.id),
            eq(biBuyerPropertyMatches.propertyId, propertyId),
            eq(biBuyerPropertyMatches.modelVersion, MATCH_MODEL),
          ),
        )
        .limit(1);
      if (existing[0]) {
        const [row] = await db
          .update(biBuyerPropertyMatches)
          .set({
            matchScore: String(scored.matchScore),
            recommendation: scored.recommendation,
            reasoning: scored.reasoning,
            computedAt: now(),
            updatedAt: now(),
            deletedAt: null,
          })
          .where(eq(biBuyerPropertyMatches.id, existing[0].id))
          .returning();
        results.push(row);
      } else {
        const [row] = await db
          .insert(biBuyerPropertyMatches)
          .values({
            buyerProfileId: profile.id,
            propertyId,
            matchScore: String(scored.matchScore),
            recommendation: scored.recommendation,
            reasoning: scored.reasoning,
            modelVersion: MATCH_MODEL,
          })
          .returning();
        results.push(row);
      }
    } else {
      const existing = mem.matches.find(
        (m) => m.buyerProfileId === profile.id && m.propertyId === propertyId && m.modelVersion === MATCH_MODEL,
      );
      const row: BiBuyerPropertyMatch = existing ?? {
        id: randomUUID(),
        createdAt: now(),
        updatedAt: now(),
        deletedAt: null,
        buyerProfileId: profile.id,
        propertyId,
        matchScore: String(scored.matchScore),
        recommendation: scored.recommendation,
        reasoning: scored.reasoning,
        modelVersion: MATCH_MODEL,
        computedAt: now(),
        inputHash: null,
      };
      row.matchScore = String(scored.matchScore);
      row.recommendation = scored.recommendation;
      row.reasoning = scored.reasoning;
      row.computedAt = now();
      row.updatedAt = now();
      if (!existing) mem.matches.push(row);
      results.push(row);
    }
  }
  return results;
}

export async function whoShouldSeeListing(propertyId: string) {
  await recomputeMatchesForProperty(propertyId);
  const rows = db
    ? await db
        .select()
        .from(biBuyerPropertyMatches)
        .where(and(eq(biBuyerPropertyMatches.propertyId, propertyId), isNull(biBuyerPropertyMatches.deletedAt)))
    : mem.matches.filter((m) => m.propertyId === propertyId && !m.deletedAt);

  const show = rows.filter((m) => m.recommendation === "show" || m.recommendation === "maybe");
  const out = [];
  for (const m of show.sort((a, b) => Number(b.matchScore) - Number(a.matchScore))) {
    const profile = db
      ? (await db.select().from(biBuyerProfiles).where(eq(biBuyerProfiles.id, m.buyerProfileId)).limit(1))[0]
      : mem.profiles.find((p) => p.id === m.buyerProfileId);
    out.push({
      buyerProfileId: m.buyerProfileId,
      displayName: profile?.displayName,
      matchScore: Number(m.matchScore),
      recommendation: m.recommendation,
      reasoning: m.reasoning,
    });
  }
  return out;
}

export async function listBuyerProfiles() {
  if (db) return db.select().from(biBuyerProfiles).where(isNull(biBuyerProfiles.deletedAt));
  return alive(mem.profiles);
}

export function resetBuyerIntelMemory() {
  mem.contacts.length = 0;
  mem.profiles.length = 0;
  mem.neighborhoods.length = 0;
  mem.personas.length = 0;
  mem.assignments.length = 0;
  mem.events.length = 0;
  mem.aversions.length = 0;
  mem.buildings.length = 0;
  mem.properties.length = 0;
  mem.attributes.length = 0;
  mem.matches.length = 0;
  mem.reactions.length = 0;
  mem.saves.length = 0;
  mem.rejections.length = 0;
}

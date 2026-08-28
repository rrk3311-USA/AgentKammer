import {
  addAversion,
  appendPreferenceEvent,
  assignPersona,
  ensurePersona,
  recordRejection,
  setNeighborhoods,
  setPropertyAttribute,
  upsertBuilding,
  upsertContactByEmail,
  upsertProperty,
  upsertSoloBuyerProfile,
  recomputeMatchesForProperty,
} from "./repository";

export async function seedRaphaelExample() {
  const contact = await upsertContactByEmail({
    email: "raphael.example@agentkammer.test",
    firstName: "Raphael",
    lastName: "Example",
    source: "seed",
  });
  const buyer = await upsertSoloBuyerProfile({
    contactId: contact.id,
    displayName: "Raphael Example",
    budgetMinCents: 500_000_000,
    budgetMaxCents: 800_000_000,
    financingType: "cash",
    preapprovalStatus: "cash_verified",
    timeline: "3_6_months",
    propertyType: "condo",
    sqftMin: 1800,
  });
  await setNeighborhoods(buyer.id, ["chelsea", "hudson-yards", "tribeca"]);
  const personaId = await ensurePersona(
    "design_conscious_executive",
    "Design-conscious executive. Pays for light, quiet, and architecture.",
  );
  await assignPersona(buyer.id, personaId, 0.9, "seed");

  const must = [
    { category: "floor" as const, preference: "High floor" },
    { category: "noise" as const, preference: "Quiet unit" },
    { category: "light" as const, preference: "Large windows" },
    { category: "service" as const, preference: "Doorman" },
    { category: "building" as const, preference: "Modern building" },
  ];
  for (const item of must) {
    await appendPreferenceEvent({
      buyerProfileId: buyer.id,
      origin: "stated",
      ...item,
      importance: 5,
      hardRequirement: true,
      sourceSystem: "seed",
      sourceRowId: `must:${item.preference}`,
    });
  }
  const prefer = [
    { category: "exposure" as const, preference: "South/west exposure" },
    { category: "finish" as const, preference: "Architectural interiors" },
    { category: "building" as const, preference: "Gym" },
    { category: "size" as const, preference: "1,800+ sqft" },
  ];
  for (const item of prefer) {
    await appendPreferenceEvent({
      buyerProfileId: buyer.id,
      origin: "stated",
      ...item,
      importance: 3,
      sourceSystem: "seed",
      sourceRowId: `prefer:${item.preference}`,
    });
  }
  await appendPreferenceEvent({
    buyerProfileId: buyer.id,
    origin: "stated",
    category: "view",
    preference: "View isn't that important",
    importance: 2,
    hardRequirement: false,
    sourceSystem: "seed",
    sourceRowId: "stated-view",
  });

  for (const issue of ["Glossy finishes", "Dark corridors", "Small kitchens", "Heavy street noise"]) {
    await addAversion({
      buyerProfileId: buyer.id,
      issue,
      severity: issue === "Small kitchens" ? "dealbreaker" : "strong",
      category: issue.includes("kitchen") ? "kitchen" : issue.includes("noise") ? "noise" : "finish",
      sourceSystem: "seed",
      sourceRowId: `avoid:${issue}`,
    });
  }

  await appendPreferenceEvent({
    buyerProfileId: buyer.id,
    origin: "observed",
    category: "view",
    preference: "Favorites are all high-floor units",
    importance: 5,
    evidenceNote: "Will pay premium for view",
    sourceSystem: "seed",
    sourceRowId: "observed-view",
  });
  await appendPreferenceEvent({
    buyerProfileId: buyer.id,
    origin: "inferred",
    category: "view",
    preference: "view importance = HIGH",
    importance: 5,
    confidence: 0.82,
    evidenceNote: "stated low; observed high-floor favorites",
    sourceSystem: "seed",
    sourceRowId: "inferred-view",
  });
  await appendPreferenceEvent({
    buyerProfileId: buyer.id,
    origin: "observed",
    category: "finish",
    preference: "limestone + warm wood",
    importance: 4,
    sourceSystem: "seed",
    sourceRowId: "observed-finish",
  });

  const rejected = [];
  for (let i = 1; i <= 3; i++) {
    const building = await upsertBuilding({
      name: `Rejected kitchen ${i}`,
      neighborhoodSlug: "chelsea",
      ownershipForm: "condo",
    });
    const property = await upsertProperty({
      address: `100 West 18th St #${i}A`,
      buildingId: building.id,
      askPriceCents: 620_000_000,
      beds: "2.0",
      baths: "2.0",
      sqft: 1600,
      floor: 4,
      externalId: `seed-reject-${i}`,
    });
    await setPropertyAttribute(property.id, "kitchen_type", "enclosed kitchen");
    await recordRejection({
      buyerProfileId: buyer.id,
      propertyId: property.id,
      detail: "enclosed kitchen",
      category: "kitchen",
    });
    rejected.push(property.id);
  }

  const showBuilding = await upsertBuilding({
    name: "Lantern House analog",
    neighborhoodSlug: "chelsea",
    ownershipForm: "condo",
    reportSlug: "lantern-house",
  });
  const showProperty = await upsertProperty({
    address: "515 West 18th Street PH",
    buildingId: showBuilding.id,
    askPriceCents: 720_000_000,
    beds: "3.0",
    baths: "3.0",
    sqft: 2100,
    floor: 18,
    externalId: "seed-show-high-floor",
  });
  await setPropertyAttribute(showProperty.id, "windows", "large windows");
  await setPropertyAttribute(showProperty.id, "service", "doorman");
  await setPropertyAttribute(showProperty.id, "building", "modern");
  await setPropertyAttribute(showProperty.id, "finish", "limestone and warm wood");
  await setPropertyAttribute(showProperty.id, "noise", "quiet unit");
  const matches = await recomputeMatchesForProperty(showProperty.id);

  return { buyerId: buyer.id, contactId: contact.id, showPropertyId: showProperty.id, rejected, matches };
}

import { describe, expect, it, beforeEach } from "vitest";
import { scoreBuyerPropertyMatch } from "./match";
import {
  appendPreferenceEvent,
  getBuyerChart,
  resetBuyerIntelMemory,
  upsertContactByEmail,
  upsertSoloBuyerProfile,
  whoShouldSeeListing,
} from "./repository";
import { seedRaphaelExample } from "./seed";
import { parseBudgetRange, parseTimelineBand } from "./ingest";

describe("buyer intel matching", () => {
  it("does not show over-budget listings", () => {
    const result = scoreBuyerPropertyMatch({
      profile: {
        budgetMinCents: 500_000_000,
        budgetMaxCents: 800_000_000,
        propertyType: "condo",
        bedsMin: null,
        bathsMin: null,
        sqftMin: 1800,
      },
      neighborhoods: ["chelsea"],
      preferences: [],
      aversions: [],
      property: {
        askPriceCents: 1_200_000_000,
        beds: "2",
        baths: "2",
        sqft: 2000,
        floor: 20,
        address: "High tower",
        neighborhoodSlug: "chelsea",
        ownershipForm: "condo",
        attributes: {},
      },
    });
    expect(result.recommendation).toBe("do_not_show");
  });
});

describe("preference events", () => {
  beforeEach(() => resetBuyerIntelMemory());

  it("keeps stated and inferred view rows side by side", async () => {
    const contact = await upsertContactByEmail({ email: "keep@test.local", firstName: "A" });
    const buyer = await upsertSoloBuyerProfile({ contactId: contact.id, displayName: "A" });
    await appendPreferenceEvent({
      buyerProfileId: buyer.id,
      origin: "stated",
      category: "view",
      preference: "View isn't that important",
      importance: 2,
      sourceSystem: "test",
      sourceRowId: "s1",
    });
    await appendPreferenceEvent({
      buyerProfileId: buyer.id,
      origin: "inferred",
      category: "view",
      preference: "view importance = HIGH",
      importance: 5,
      confidence: 0.82,
      sourceSystem: "test",
      sourceRowId: "i1",
    });
    const chart = await getBuyerChart(buyer.id);
    expect(chart?.stated.some((e) => e.preference.includes("isn't"))).toBe(true);
    expect(chart?.inferred.some((e) => e.preference.includes("HIGH"))).toBe(true);
  });

  it("is idempotent on source_row_id", async () => {
    const contact = await upsertContactByEmail({ email: "idemp@test.local" });
    const buyer = await upsertSoloBuyerProfile({ contactId: contact.id });
    await appendPreferenceEvent({
      buyerProfileId: buyer.id,
      origin: "stated",
      category: "floor",
      preference: "High floor",
      sourceSystem: "test",
      sourceRowId: "same",
    });
    await appendPreferenceEvent({
      buyerProfileId: buyer.id,
      origin: "stated",
      category: "floor",
      preference: "High floor",
      sourceSystem: "test",
      sourceRowId: "same",
    });
    const chart = await getBuyerChart(buyer.id);
    expect(chart?.stated.filter((e) => e.sourceRowId === "same")).toHaveLength(1);
  });
});

describe("parsers", () => {
  it("parses $5M–$8M", () => {
    const b = parseBudgetRange("$5M–$8M");
    expect(b.min).toBe(500_000_000);
    expect(b.max).toBe(800_000_000);
  });
  it("parses 3-6 months", () => {
    expect(parseTimelineBand("3–6 months")).toBe("3_6_months");
  });
});

describe("raphael seed", () => {
  beforeEach(() => resetBuyerIntelMemory());

  it("recommends the high-floor chelsea listing", async () => {
    const seeded = await seedRaphaelExample();
    const who = await whoShouldSeeListing(seeded.showPropertyId);
    expect(who.some((w) => w.buyerProfileId === seeded.buyerId)).toBe(true);
    const chart = await getBuyerChart(seeded.buyerId);
    expect(chart?.mustHave).toContain("High floor");
    expect(chart?.avoid).toContain("Small kitchens");
    expect(chart?.stated.some((e) => e.category === "view")).toBe(true);
    expect(chart?.inferred[0]?.confidence).toBe("0.82");
  });
});

import { describe, expect, it } from "vitest";
import { cannotFetchPlan, emptyProfile, furnitureFor, heatMap, makeRiversidePlan, makeStahlPlan, makeSuttonPlan, matchKnownSample, scoreLivability, typicalDay } from "../client/public/tools/livability/engine.js";
import { SUGGESTIONS_ENABLED, suggestSimilarListings } from "../client/public/tools/livability/suggestions.js";

describe("livability desk scoring", () => {
  it("scores the Sutton sample on layout only", () => {
    const plan = makeSuttonPlan();
    const profile = { ...emptyProfile(), householdSize: 2, cooks: true, wfh: true };
    const result = scoreLivability(plan, profile, "10");
    expect(result.score).toBeGreaterThan(55);
    expect(result.score).toBeLessThan(95);
    expect(result.totals.beds).toBe(2);
    expect(result.flags.paths.some((path) => path.id === "morning")).toBe(true);
    expect(result.notes.join(" ")).not.toMatch(/school|neighborhood|broker|buy this/i);
    expect(result.notes.join(" ")).not.toContain("—");
  });

  it("drops the score when bedrooms vanish", () => {
    const plan = makeSuttonPlan();
    plan.rooms = plan.rooms.filter((room) => room.type !== "bedroom");
    plan.doors = plan.doors.filter((door) => plan.rooms.some((room) => room.id === door.a) && plan.rooms.some((room) => room.id === door.b));
    const intact = scoreLivability(makeSuttonPlan(), emptyProfile(), "5");
    const broken = scoreLivability(plan, emptyProfile(), "5");
    expect(broken.score).toBeLessThan(intact.score);
  });

  it("refuses to invent a plan from an address", () => {
    const miss = cannotFetchPlan("15 Central Park West");
    expect(miss.ok).toBe(false);
    expect(miss.reason).toMatch(/cannot read/i);
    expect(miss.reason).not.toContain("—");
  });

  it("paints heat from path traffic, not from a neighborhood", () => {
    const plan = makeSuttonPlan();
    const result = scoreLivability(plan, emptyProfile(), "10");
    const heat = heatMap(plan, result);
    expect(heat.gallery.zone === "pinch" || heat.gallery.traffic > 0).toBe(true);
    const other = scoreLivability(makeRiversidePlan(), emptyProfile(), "10");
    expect(other.score).not.toBe(result.score);
  });

  it("furnishes from the household and the rooms, not a neighborhood", () => {
    const plan = makeSuttonPlan();
    const base = furnitureFor(plan, emptyProfile(), "10");
    expect(base.some((item) => item.kind === "sofa")).toBe(true);
    expect(base.some((item) => item.kind === "bed")).toBe(true);
    expect(base.some((item) => item.kind === "desk")).toBe(false);
    expect(base.some((item) => item.kind === "crib" || item.kind === "pet")).toBe(false);

    const wfh = furnitureFor(plan, { ...emptyProfile(), wfh: true }, "10");
    expect(wfh.some((item) => item.kind === "desk")).toBe(true);

    const kids5 = furnitureFor(plan, { ...emptyProfile(), kids: true }, "5");
    expect(kids5.some((item) => item.kind === "crib")).toBe(true);

    const kids10 = furnitureFor(plan, { ...emptyProfile(), kids: true }, "10");
    expect(kids10.some((item) => item.kind === "kidbed")).toBe(true);

    const pets = furnitureFor(plan, { ...emptyProfile(), pets: true }, "10");
    expect(pets.some((item) => item.kind === "pet")).toBe(true);

    const result = scoreLivability(plan, { ...emptyProfile(), wfh: true, kids: true }, "10");
    const day = typicalDay(plan, { ...emptyProfile(), wfh: true, kids: true }, result);
    expect(day.some((route) => route.id === "kids")).toBe(true);
    expect(JSON.stringify({ wfh, kids5, day })).not.toMatch(/school|neighborhood|broker/i);
    expect(JSON.stringify({ wfh, kids5 })).not.toContain("—");
  });

  it("loads the Stahl House sample from a matching address and still misses unknown ones", () => {
    const hit = matchKnownSample("1635 Woods Dr, Los Angeles, CA 90069");
    expect(hit?.id).toBe("stahl");
    expect(matchKnownSample("Stahl House").id).toBe("stahl");
    expect(matchKnownSample("15 Central Park West")).toBe(null);
    const miss = cannotFetchPlan("15 Central Park West");
    expect(miss.ok).toBe(false);

    const plan = makeStahlPlan();
    expect(plan.name).toBe("Stahl House (1635 Woods Dr) · approx. from public plans");
    expect(plan.rooms.filter((room) => room.type === "bedroom")).toHaveLength(2);
    expect(plan.rooms.every((room) => /approx/i.test(room.name))).toBe(true);
    expect(plan.doors.some((door) => (door.a === "living" && door.b === "dining") || (door.a === "dining" && door.b === "living"))).toBe(true);
    expect(plan.doors.some((door) => (door.a === "kitchen" && door.b === "mbath") || (door.a === "mbath" && door.b === "kitchen"))).toBe(true);

    const profile = { ...emptyProfile(), householdSize: 2, entertainer: true, wfh: true };
    const result = scoreLivability(plan, profile, "10");
    expect(result.score).toBeGreaterThan(40);
    expect(result.score).toBeLessThan(100);
    expect(result.notes.join(" ")).not.toMatch(/school|neighborhood|broker|buy this/i);
    expect(result.notes.join(" ")).not.toContain("—");
    expect(JSON.stringify(plan)).not.toContain("—");
  });

  it("keeps similar-home suggestions off and empty in v1", () => {
    expect(SUGGESTIONS_ENABLED).toBe(false);
    const out = suggestSimilarListings({ address: "200 East 66th Street", score: 68 });
    expect(out.enabled).toBe(false);
    expect(out.items).toEqual([]);
    expect(JSON.stringify(out)).not.toMatch(/for sale|broker|buy this|neighborhood|school/i);
  });
});

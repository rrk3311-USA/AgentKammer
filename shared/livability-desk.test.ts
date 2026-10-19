import { describe, expect, it } from "vitest";
import { cannotFetchPlan, emptyProfile, furnitureFor, heatMap, labelReserve, makeRiversidePlan, makeStahlPlan, makeSuttonPlan, matchKnownSample, scoreLivability, typicalDay } from "../client/public/tools/livability/engine.js";
import { labelPlacement } from "../client/public/tools/livability/draw.js";
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
    const living = plan.rooms.find((room) => room.id === "living");
    const kitchen = plan.rooms.find((room) => room.id === "kitchen");
    const terrace = plan.rooms.find((room) => room.id === "terrace");
    const mbed = plan.rooms.find((room) => room.id === "mbed");
    expect(living.y + living.h).toBeLessThanOrEqual(mbed.y);
    expect(living.x).toBeLessThan(kitchen.x);
    expect(terrace.x).toBeLessThan(mbed.x);

    const profile = { ...emptyProfile(), householdSize: 2, entertainer: true, wfh: true };
    const result = scoreLivability(plan, profile, "10");
    expect(result.score).toBeGreaterThan(40);
    expect(result.score).toBeLessThan(100);
    expect(result.notes.join(" ")).not.toMatch(/school|neighborhood|broker|buy this/i);
    expect(result.notes.join(" ")).not.toContain("—");
    expect(result.notes.join(" ")).not.toMatch(/Most days will meet there/);
    expect(JSON.stringify(plan)).not.toContain("—");
  });

  it("keeps room labels off furniture in the Stahl sample", () => {
    const plan = makeStahlPlan();
    const furniture = furnitureFor(plan, { ...emptyProfile(), householdSize: 2, entertainer: true, wfh: true }, "10");
    const living = plan.rooms.find((room) => room.id === "living");
    const sofa = furniture.find((item) => item.kind === "sofa" && item.roomId === "living");
    const reserve = labelReserve(living);
    const rot = Math.abs(sofa.rot || 0) % 180;
    const sw = rot > 45 && rot < 135 ? sofa.h : sofa.w;
    const sh = rot > 45 && rot < 135 ? sofa.w : sofa.h;
    const sofaBox = { x: sofa.x - sw / 2, y: sofa.y - sh / 2, w: sw, h: sh };
    expect(sofaBox.x + sofaBox.w < reserve.x || sofaBox.x > reserve.x + reserve.w || sofaBox.y + sofaBox.h < reserve.y || sofaBox.y > reserve.y + reserve.h).toBe(true);

    for (const id of ["living", "mbath", "jjbath", "dress", "service"]) {
      const room = plan.rooms.find((item) => item.id === id);
      const place = labelPlacement(room, furniture);
      const label = { x: place.x, y: place.y, w: place.w, h: place.h };
      for (const item of furniture.filter((piece) => piece.roomId === id)) {
        const rot = Math.abs(item.rot || 0) % 180;
        const bw = rot > 45 && rot < 135 ? item.h : item.w;
        const bh = rot > 45 && rot < 135 ? item.w : item.h;
        const box = { x: item.x - bw / 2, y: item.y - bh / 2, w: bw, h: bh };
        const hit = label.x < box.x + box.w && label.x + label.w > box.x && label.y < box.y + box.h && label.y + label.h > box.y;
        expect(hit).toBe(false);
      }
      expect(label.x + label.w).toBeLessThanOrEqual(room.x + room.w - 2);
      expect(label.y + label.h).toBeLessThanOrEqual(room.y + room.h - 2);
    }
  });

  it("keeps similar-home suggestions off and empty in v1", () => {
    expect(SUGGESTIONS_ENABLED).toBe(false);
    const out = suggestSimilarListings({ address: "200 East 66th Street", score: 68 });
    expect(out.enabled).toBe(false);
    expect(out.items).toEqual([]);
    expect(JSON.stringify(out)).not.toMatch(/for sale|broker|buy this|neighborhood|school/i);
  });
});

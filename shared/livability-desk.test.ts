import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { CONSIDERATIONS, DILIGENCE_CHECKS, LIVABILITY_AID_LINE, SEVERITY_LABELS, applyDiligencePreset, cannotFetchPlan, defaultDiligence, defaultGuideHello, emptyBuilding, emptyProfile, furnitureFor, heatMap, idsForPreset, labelReserve, makeRiversidePlan, makeStahlPlan, makeSuttonPlan, makeWillowHousePlan, matchKnownSample, scoreLivability, typicalDay } from "../client/public/tools/livability/engine.js";
import { buildPrintReport, flaggedBySeverity, shortNote } from "../client/public/tools/livability/print-report.js";
import { windowDotsFromPlan } from "../client/public/tools/livability/plan-graph.js";
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

  it("places window marks on exterior walls and scores daylight", () => {
    const plan = makeSuttonPlan();
    expect(plan.windowDots.length).toBeGreaterThan(3);
    expect(plan.windowDots.every((dot) => dot.kind === "window")).toBe(true);
    const inferred = windowDotsFromPlan({ ...plan, windowDots: [] });
    expect(inferred.length).toBeGreaterThan(2);
    const result = scoreLivability(plan, emptyProfile(), "10");
    expect(result.breakdown.some((row) => row.id === "daylight")).toBe(true);
    expect(JSON.stringify(result.breakdown)).not.toContain("—");
  });

  it("changes the score when diligence presets and checks change", () => {
    const plan = makeSuttonPlan();
    const profile = { ...emptyProfile(), householdSize: 2, cooks: true, wfh: true };
    const standard = scoreLivability(plan, profile, "10", applyDiligencePreset("standard"));
    const strict = scoreLivability(plan, profile, "10", applyDiligencePreset("strict"), {
      building: { ...emptyBuilding(), yearBuilt: "1926", ticks: { ...emptyBuilding().ticks, windowAc: true, floorGlossWet: true } },
    });
    const relaxed = scoreLivability(plan, profile, "10", applyDiligencePreset("relaxed"));
    const off = applyDiligencePreset("standard");
    off.checks.kitchenTraffic.on = false;
    off.checks.cutThrough.on = false;
    const custom = scoreLivability(plan, profile, "10", off);
    expect(standard.checksActive).toBe(idsForPreset("standard").length);
    expect(standard.checksActive).toBe(DILIGENCE_CHECKS.filter((item) => item.severity === "dealbreaker" || item.severity === "tax").length);
    expect(relaxed.checksActive).toBe(DILIGENCE_CHECKS.filter((item) => item.severity === "dealbreaker").length);
    expect(strict.checksActive).toBe(DILIGENCE_CHECKS.length);
    expect(strict.score).not.toBe(standard.score);
    expect(relaxed.score).not.toBe(strict.score);
    expect(custom.score).not.toBe(standard.score);
    expect(standard.breakdown.length).toBeGreaterThan(5);
    expect(standard.breakdown.some((row) => row.id === "pathThroughPrimary")).toBe(true);
    expect(standard.breakdown.some((row) => row.id === "windowlessBedroom")).toBe(true);
    expect(standard.breakdown.some((row) => row.severityLabel === "Big one")).toBe(true);
    expect(`${strict.notes.join(" ")} ${strict.breakdown.map((row) => row.note).join(" ")}`).toMatch(/AC unit|lead paint|slippery/i);
    expect(JSON.stringify({ standard, strict, relaxed, CONSIDERATIONS, DILIGENCE_CHECKS, LIVABILITY_AID_LINE, SEVERITY_LABELS })).not.toContain("—");
    expect(JSON.stringify({ standard, strict, relaxed, CONSIDERATIONS, DILIGENCE_CHECKS })).not.toMatch(/school|neighborhood|broker|youtuber|hadad|scrape|family-friendly/i);
  });

  it("flags plan-only checks a good sample should pass and a broken one should fail", () => {
    const good = scoreLivability(makeSuttonPlan(), { ...emptyProfile(), householdSize: 2 }, "10", applyDiligencePreset("standard"));
    expect(good.breakdown.find((row) => row.id === "pathThroughPrimary")?.passed).toBe(true);
    expect(good.breakdown.find((row) => row.id === "primaryCloset")?.passed).toBe(true);
    expect(good.breakdown.find((row) => row.id === "terraceThroughPrimary")?.passed).not.toBe(false);

    const plan = makeSuttonPlan();
    plan.rooms.push({ id: "core", name: "Elevator", type: "other", sf: 30, x: 0, y: 368, w: 24, h: 168 });
    plan.rooms.push(
      { id: "dark", name: "Interior bedroom", type: "bedroom", sf: 64, x: 600, y: 200, w: 80, h: 80 },
      { id: "nbox", name: "Box N", type: "other", sf: 20, x: 600, y: 120, w: 80, h: 80 },
      { id: "sbox", name: "Box S", type: "other", sf: 20, x: 600, y: 280, w: 80, h: 80 },
      { id: "wbox", name: "Box W", type: "other", sf: 20, x: 520, y: 200, w: 80, h: 80 },
      { id: "ebox", name: "Box E", type: "other", sf: 20, x: 680, y: 200, w: 80, h: 80 },
    );
    plan.rooms = plan.rooms.filter((room) => room.id !== "cloa");
    plan.doors = plan.doors.filter((door) => door.a !== "cloa" && door.b !== "cloa");
    plan.doors.push({ a: "beda", b: "core" });
    const broken = scoreLivability(plan, { ...emptyProfile(), householdSize: 2 }, "10", applyDiligencePreset("strict"));
    expect(broken.breakdown.find((row) => row.id === "primaryCloset")?.passed).toBe(false);
    expect(broken.breakdown.find((row) => row.id === "windowlessBedroom")?.passed).toBe(false);
    expect(broken.breakdown.find((row) => row.id === "bedByCore")?.passed).toBe(false);
    expect(JSON.stringify(broken.breakdown.map((row) => row.note))).not.toContain("—");
  });

  it("scores a fictional single-family house sample with flagged layout checks", () => {
    const plan = makeWillowHousePlan();
    expect(plan.sampleMark).toBe("Sample report, example data");
    expect(plan.address).toMatch(/Willow Lane/);
    expect(plan.rooms.some((room) => room.id === "garage")).toBe(true);
    expect(plan.rooms.some((room) => room.id === "stair")).toBe(true);
    expect(plan.rooms.filter((room) => room.type === "bedroom")).toHaveLength(3);
    const result = scoreLivability(
      plan,
      { ...emptyProfile(), householdSize: 4, kids: true, cooks: true, wfh: true },
      "10",
      applyDiligencePreset("strict"),
      {
        building: {
          ...emptyBuilding(),
          yearBuilt: "1924",
          ticks: {
            ...emptyBuilding().ticks,
            floorGlossWet: true,
            windowAc: true,
            waterStains: true,
            noParking: true,
            mechanicalNear: true,
          },
        },
      },
    );
    expect(result.score).toBeGreaterThan(20);
    expect(result.score).toBeLessThan(80);
    const failed = result.breakdown.filter((row) => row.passed === false).map((row) => row.id);
    expect(failed).toEqual(expect.arrayContaining(["pathThroughPrimary", "terraceThroughPrimary", "kitchenOrphaned", "primaryCloset"]));
    expect(JSON.stringify({ plan, result })).not.toContain("—");
    expect(JSON.stringify({ plan, result })).not.toMatch(/school|neighborhood|broker|youtuber|apartment line/i);
  });

  it("prints a Livability-only letter report with flagged checks and no AK brand", () => {
    const plan = makeWillowHousePlan();
    const result = scoreLivability(
      plan,
      { ...emptyProfile(), householdSize: 4, kids: true, cooks: true, wfh: true },
      "10",
      applyDiligencePreset("strict"),
      {
        building: {
          ...emptyBuilding(),
          yearBuilt: "1924",
          ticks: { ...emptyBuilding().ticks, floorGlossWet: true, windowAc: true, waterStains: true, noParking: true, mechanicalNear: true },
        },
      },
    );
    const html = buildPrintReport({ plan, result, profile: { householdSize: 4 }, horizon: "10", heatSvg: "<svg class=\"plan-svg\"></svg>" });
    expect(html).toMatch(/Sample report, example data/);
    expect(html).toMatch(/1842 Willow Lane/);
    expect(html).toMatch(/class="pr-word">Livability/);
    expect(html).toMatch(/pr-glance-h">Breakdown/);
    expect(html).toMatch(/Heat map/);
    expect(html).toMatch(/Flagged checks/);
    expect(html).toMatch(/Big one/);
    expect(html).toMatch(/Worth pricing in/);
    expect(html).toMatch(/Considerations to confirm/);
    expect(html).toMatch(/01 \/ 0/);
    expect(html.match(/pr-page/g)?.length).toBeGreaterThanOrEqual(2);
    expect(html.match(/pr-page/g)?.length).toBeLessThanOrEqual(3);
    expect(html).not.toMatch(/Agent Kammer|ak-monogram|Live where you belong|agentkammer/i);
    expect(html).not.toContain("—");
    const passed = result.breakdown.filter((row) => row.passed && !row.caution);
    expect(passed.length).toBeGreaterThan(3);
    expect(passed.some((row) => html.includes(row.label) && html.includes(shortNote(row.note)))).toBe(false);
    const groups = flaggedBySeverity(result.breakdown);
    expect(groups[0].items.length).toBeGreaterThan(0);
    expect(shortNote("A long note. A second sentence stays off.")).toBe("A long note.");
  });

  it("keeps considerations confirm-only and official", () => {
    const blob = JSON.stringify(CONSIDERATIONS) + LIVABILITY_AID_LINE;
    expect(blob).toMatch(/Worth confirming: flood zone status/);
    expect(blob).toMatch(/msc\.fema\.gov/);
    expect(blob).toMatch(/osfm\.fire\.ca\.gov/);
    expect(blob).toMatch(/maps\.conservation\.ca\.gov\/cgs\/EQZApp/);
    expect(blob).toMatch(/usgs\.gov/);
    expect(blob).toMatch(/licensed home inspector or structural engineer/i);
    expect(blob).toMatch(/planning aid, not an inspection/);
    expect(blob).not.toMatch(/may have|bad foundation|family-friendly|school|youtuber|hadad|scrape/i);
    expect(blob).not.toContain("—");
    expect(CONSIDERATIONS.map((group) => group.id)).toEqual(["land", "building", "sound", "rules"]);
  });

  it("keeps customer copy short and free of internals", () => {
    const hello = defaultGuideHello();
    const miss = cannotFetchPlan("15 Central Park West");
    const plan = makeWillowHousePlan();
    const result = scoreLivability(
      plan,
      { ...emptyProfile(), householdSize: 4, kids: true, cooks: true, wfh: true },
      "10",
      applyDiligencePreset("strict"),
      {
        building: {
          ...emptyBuilding(),
          yearBuilt: "1924",
          ticks: { ...emptyBuilding().ticks, floorGlossWet: true, windowAc: true, waterStains: true },
        },
      },
    );
    const page = readFileSync(new URL("../client/public/tools/livability/index.html", import.meta.url), "utf8");
    const harness = readFileSync(new URL("../client/public/tools/livability/harness.html", import.meta.url), "utf8");
    const samples = readFileSync(new URL("../client/public/tools/livability/samples/index.json", import.meta.url), "utf8");
    const app = readFileSync(new URL("../client/public/tools/livability/app.js", import.meta.url), "utf8");
    const blob = [
      hello,
      miss.reason,
      LIVABILITY_AID_LINE,
      JSON.stringify(CONSIDERATIONS),
      JSON.stringify(DILIGENCE_CHECKS),
      result.notes.join(" "),
      result.breakdown.map((row) => `${row.label} ${row.note}`).join(" "),
      page,
      harness,
      samples,
      app,
    ].join("\n");
    expect(blob).toMatch(/cannot read/i);
    expect(blob).toMatch(/Find the plan online, download it, and drop it here/);
    expect(blob).toMatch(/planning aid, not an inspection/i);
    expect(blob).toMatch(/Not an appraisal, an inspection, or brokerage advice/);
    expect(blob).not.toMatch(/scrape|vision key|Grok|Gemini|on-device|etch and stain|age in place|family-friendly|youtuber/i);
    expect(blob).not.toMatch(/\bmodels?\b/i);
    expect(blob).not.toContain("—");
  });

  it("keeps similar-home suggestions off and empty in v1", () => {
    expect(SUGGESTIONS_ENABLED).toBe(false);
    const out = suggestSimilarListings({ address: "200 East 66th Street", score: 68 });
    expect(out.enabled).toBe(false);
    expect(out.items).toEqual([]);
    expect(JSON.stringify(out)).not.toMatch(/for sale|broker|buy this|neighborhood|school/i);
  });
});

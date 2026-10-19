import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { cannotFetchPlan, makeSuttonPlan } from "../client/public/tools/livability/engine.js";
import {
  applyBoostToRooms,
  connectionsFromDoors,
  doorDotsFromPlan,
  mapRoomIdsByOverlap,
  parsePrintedMeasure,
  remapPairs,
  scoreConnections,
  scoreDoorRecall,
} from "../client/public/tools/livability/plan-graph.js";
import { maskFromLabeledPlan, readPlanFromMask } from "../client/public/tools/livability/cv-reader.js";

const here = dirname(fileURLToPath(import.meta.url));
const sampleDir = join(here, "../client/public/tools/livability/samples");

function loadLabel(id: string) {
  return JSON.parse(readFileSync(join(sampleDir, `${id}.json`), "utf8"));
}

describe("livability CV-first plan reader", () => {
  it("derives connections from door dots, never from names", () => {
    const plan = makeSuttonPlan();
    const dots = doorDotsFromPlan(plan);
    expect(dots.length).toBeGreaterThanOrEqual(plan.doors.length - 2);
    const recovered = connectionsFromDoors(plan.rooms, dots, 8);
    const score = scoreConnections(recovered, plan.doors);
    expect(score.recall).toBeGreaterThanOrEqual(0.8);
    expect(score.precision).toBe(1);
  });

  it("keeps boost labels off the door graph", () => {
    const plan = makeSuttonPlan();
    const doors = plan.doors.map((door) => ({ ...door }));
    const rooms = applyBoostToRooms(plan.rooms, {
      labels: [{ x: plan.rooms[0].x + 4, y: plan.rooms[0].y + 4, name: "Great room", type: "living", sf: 300 }],
    });
    expect(rooms[0].name.toLowerCase()).toContain("great");
    expect(plan.doors).toEqual(doors);
  });

  it("parses printed dimensions without an API", () => {
    expect(parsePrintedMeasure("14'-6\"")).toEqual({ kind: "feet", value: 14.5 });
    expect(parsePrintedMeasure("280 sf")).toEqual({ kind: "sf", value: 280 });
    expect(parsePrintedMeasure("12 x 16")).toMatchObject({ kind: "feet" });
  });

  it("reports CV-only door and connection scores on synthetic masks", () => {
    const rows: Array<{ id: string; doors: ReturnType<typeof scoreDoorRecall>; conn: ReturnType<typeof scoreConnections> }> = [];
    for (const id of ["line-two-bed", "studio-bath", "stahl-approx"]) {
      const label = loadLabel(id);
      const { mask, w, h } = maskFromLabeledPlan(label);
      const cv = readPlanFromMask(mask, w, h, { pxPerFt: label.pxPerFt });
      const doors = scoreDoorRecall(cv.doorDots, label.doorDots, label.pxPerFt);
      const idMap = mapRoomIdsByOverlap(cv.rooms, label.rooms);
      const conn = scoreConnections(remapPairs(cv.doors, idMap), label.doors);
      rows.push({ id, doors, conn });
      expect(cv.rooms.length).toBeGreaterThanOrEqual(2);
      expect(doors.recall).toBeGreaterThanOrEqual(0.5);
      expect(conn.recall).toBeGreaterThanOrEqual(0.4);
    }
    const studio = loadLabel("studio-bath");
    const studioMask = maskFromLabeledPlan(studio);
    const boosted = applyBoostToRooms(readPlanFromMask(studioMask.mask, studioMask.w, studioMask.h, { pxPerFt: 8 }).rooms, {
      labels: [{ x: 180, y: 140, name: "Studio", type: "living", sf: 420 }],
    });
    expect(boosted.some((room) => /studio/i.test(room.name))).toBe(true);
    const report = rows.map((row) => `${row.id} cv-door ${row.doors.hits}/${row.doors.labeled} cv-conn ${row.conn.hits}/${row.conn.labeled}`).join(" | ");
    expect(report).toMatch(/line-two-bed/);
    expect(report).not.toContain("—");
  });

  it("still refuses to scrape an address, and copy has no em dash", () => {
    const miss = cannotFetchPlan("15 Central Park West");
    expect(miss.ok).toBe(false);
    expect(miss.reason).toMatch(/cannot read/i);
    expect(miss.reason).toMatch(/drop it here/i);
    expect(miss.reason).not.toContain("—");
  });
});

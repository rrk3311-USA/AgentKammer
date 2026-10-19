import { describe, expect, it } from "vitest";
import { emptyProfile, makeSuttonPlan, scoreLivability } from "../client/public/tools/livability/engine.js";

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
});

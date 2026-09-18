import { describe, expect, it } from "vitest";
import { createGoal, cycleStatus, isValidGoalDraft, removeGoal, upsertGoal, emptyLifePlan } from "./life-plan";

describe("Life Plan goals", () => {
  it("requires judgment fields, not empty slogans", () => {
    expect(isValidGoalDraft({ title: " ", why: "clarity", nextAction: "write" })).toBe(false);
    expect(isValidGoalDraft({ title: "License", why: "Fiduciary standing", nextAction: "Sit the exam block" })).toBe(true);
  });

  it("cycles status through stillness without deleting the goal", () => {
    expect(cycleStatus("next")).toBe("active");
    expect(cycleStatus("active")).toBe("waiting");
    expect(cycleStatus("waiting")).toBe("done");
    expect(cycleStatus("done")).toBe("next");
  });

  it("upserts and removes on the commander store", () => {
    const goal = createGoal({
      title: "Monday board",
      why: "The Report trains judgment, not inventory.",
      nextAction: "HOLD vs NEW in 20 minutes",
      domain: "media",
      horizon: "week",
    });
    const stored = upsertGoal(emptyLifePlan(), goal);
    expect(stored.owner).toBe("raphi");
    expect(stored.goals).toHaveLength(1);
    expect(removeGoal(stored, goal.id).goals).toHaveLength(0);
  });
});

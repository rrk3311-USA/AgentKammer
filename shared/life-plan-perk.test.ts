import { describe, expect, it } from "vitest";
import { canAccessMemberLifePlan, LIFE_PLAN_PERK_POLICY } from "./life-plan-perk";

describe("Life Plan member perk gate", () => {
  it("never dumps onto anonymous visitors", () => {
    expect(canAccessMemberLifePlan(null)).toBe(false);
    expect(canAccessMemberLifePlan("anonymous")).toBe(false);
    expect(canAccessMemberLifePlan("engaged")).toBe(false);
    expect(LIFE_PLAN_PERK_POLICY.dumpOnEveryVisitor).toBe(false);
    expect(LIFE_PLAN_PERK_POLICY.publicNav).toBe(false);
  });

  it("opens only after Get Qualified / Hub standing", () => {
    expect(canAccessMemberLifePlan("qualified")).toBe(true);
    expect(canAccessMemberLifePlan("advisory_client")).toBe(true);
  });
});

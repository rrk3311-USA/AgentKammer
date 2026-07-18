import { describe, expect, it } from "vitest";
import { scoreClientProfile, deriveLifecycle, timelineIsUnderSixMonths } from "./lead-scoring";

describe("scoreClientProfile", () => {
  it("scores an engaged housing conversation highly", () => {
    const result = scoreClientProfile(
      {
        situation: "Relocating to NYC for a new role and need a calmer neighborhood for school-age kids",
        desiredOutcome: "Buy a family apartment within 12 months with room to grow",
        timeline: "3-6 months",
        currentLocation: "Chicago",
        targetLocations: ["Upper West Side", "Park Slope"],
        budgetRange: "1.5–2.2M",
        financingStatus: "speaking with lenders",
        email: "family@example.org",
        lifecycleStage: "anonymous",
      },
      {
        messageCount: 5,
        visitCount: 3,
        assessmentCompleted: true,
        goalSaved: true,
        latestMessage: "We are relocating for work and want a purchase plan",
      },
    );

    expect(result.leadScore).toBeGreaterThanOrEqual(65);
    expect(result.penalties).toBe(0);
    expect(deriveLifecycle({}, result.leadScore)).toMatch(/profiled|qualified|call_ready/);
  });

  it("penalizes spam and vendor solicitation", () => {
    const result = scoreClientProfile(
      {
        situation: "We offer lead gen for your brokerage",
        email: "asdf@asdf.com",
        lifecycleStage: "anonymous",
      },
      {
        latestMessage: "buy our list for seo service",
        messageCount: 1,
        hasVendorSolicitation: true,
      },
    );

    expect(result.leadScore).toBeLessThan(25);
    expect(result.penalties).toBeGreaterThan(0);
  });

  it("boosts call requests toward call_ready when profiled", () => {
    const result = scoreClientProfile(
      {
        situation: "Need to sell and buy in the same season",
        timeline: "1-3 months",
        email: "ready@agentkammer.test",
        phone: "2125550100",
        targetLocations: ["Tribeca"],
        lifecycleStage: "profiled",
      },
      { messageCount: 4, callRequested: true, latestMessage: "I'd like to request a call" },
    );

    const stage = deriveLifecycle(
      { lifecycleStage: "profiled", email: "ready@agentkammer.test" },
      result.leadScore,
      { callRequested: true },
    );
    expect(result.leadScore).toBeGreaterThanOrEqual(45);
    expect(["qualified", "call_ready"]).toContain(stage);
  });
});

describe("timelineIsUnderSixMonths", () => {
  it("detects urgent timelines", () => {
    expect(timelineIsUnderSixMonths("3-6 months")).toBe(true);
    expect(timelineIsUnderSixMonths("next year")).toBe(false);
  });
});

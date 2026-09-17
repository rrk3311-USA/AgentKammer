import { describe, expect, it } from "vitest";
import {
  initialQualifyStatus,
  parseQualifySource,
  publicMilestoneChecks,
  qualifySubmissionSchema,
  resolveQualifyRoute,
} from "./get-qualified";

describe("resolveQualifyRoute", () => {
  it("sends $5M+ ready buyers to Raphi's calendar", () => {
    expect(resolveQualifyRoute("5m_plus", "ready_to_search")).toBe("raphi_calendar");
    expect(resolveQualifyRoute("5m_plus", "clarity_move")).toBe("raphi_calendar");
    expect(resolveQualifyRoute("5m_plus", "second_opinion")).toBe("raphi_calendar");
    expect(resolveQualifyRoute("5m_plus", "preapproval_next")).toBe("raphi_calendar");
  });

  it("sends under-$5M ready buyers to Diego", () => {
    expect(resolveQualifyRoute("under_5m", "ready_to_search")).toBe("diego_handoff");
    expect(resolveQualifyRoute("under_5m", "preapproval_next")).toBe("diego_handoff");
  });

  it("keeps prefer-not-yet in nurture regardless of purpose", () => {
    expect(resolveQualifyRoute("prefer_not_yet", "ready_to_search")).toBe("nurture");
    expect(resolveQualifyRoute("prefer_not_yet", "clarity_move")).toBe("nurture");
  });
});

describe("initialQualifyStatus", () => {
  it("marks Diego as handed off and others as new", () => {
    expect(initialQualifyStatus("diego_handoff")).toBe("handed_off");
    expect(initialQualifyStatus("raphi_calendar")).toBe("new");
    expect(initialQualifyStatus("nurture")).toBe("new");
  });
});

describe("parseQualifySource", () => {
  it("reads phone from the query and defaults to site", () => {
    expect(parseQualifySource("phone")).toBe("phone");
    expect(parseQualifySource("PHONE")).toBe("phone");
    expect(parseQualifySource("chat")).toBe("chat");
    expect(parseQualifySource("unknown")).toBe("site");
    expect(parseQualifySource(undefined)).toBe("site");
  });
});

describe("qualifySubmissionSchema", () => {
  it("requires name, email, budget, and purpose", () => {
    const parsed = qualifySubmissionSchema.safeParse({
      name: "Alex Rivera",
      email: "alex@example.com",
      budgetLane: "5m_plus",
      callPurpose: "clarity_move",
    });
    expect(parsed.success).toBe(true);
  });

  it("rejects a missing email", () => {
    const parsed = qualifySubmissionSchema.safeParse({
      name: "Alex",
      email: "",
      budgetLane: "under_5m",
      callPurpose: "ready_to_search",
    });
    expect(parsed.success).toBe(false);
  });
});

describe("publicMilestoneChecks", () => {
  it("never treats Get Qualified as a seventh public trophy", () => {
    const checks = publicMilestoneChecks({});
    expect(checks.length).toBe(6);
    expect(checks.every((item) => item === false)).toBe(true);
  });

  it("does not mark Strategy Session held from lifecycle or form submit alone", () => {
    const checks = publicMilestoneChecks({
      roadmapMilestone: "qualified",
      strategySessionHeld: false,
    });
    expect(checks[1]).toBe(false);
  });

  it("marks #2 only when a session was actually held", () => {
    const checks = publicMilestoneChecks({
      roadmapMilestone: "engaged",
      strategySessionHeld: true,
    });
    expect(checks[1]).toBe(true);
  });
});

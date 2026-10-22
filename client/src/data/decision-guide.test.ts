import { describe, expect, it } from "vitest";
import { assertNoSaaSLanguage, PURPOSE_LINE } from "./communication-map";
import { CONTENT_LINES, MATTERS, RELATIONSHIP_LINES, guideSurfaceCopy, recommend } from "./decision-guide";

describe("decision guide", () => {
  it("asks three questions from the map and recommends from those answers", () => {
    expect(MATTERS).toHaveLength(6);
    for (const matter of MATTERS) {
      expect(matter.questions).toHaveLength(3);
    }

    const request = recommend("request", ["step", "thing", "room-now"]);
    expect(request?.move).toBe("Say the point early, with only the certainty you have.");
    expect(request?.channel).toBe("In person");
    expect(request?.say).toContain("Could you send me the Friday draft?");

    const clarify = recommend("clarify", ["meant", "with", "room-now"]);
    expect(clarify?.move).toBe("Clarify intent before making your point.");

    const silence = recommend("respond", ["little", "fight", "round"]);
    expect(silence?.move).toMatch(/Every response becomes the next message/);
    expect(silence?.say).toMatch(/leave this/i);

    const waited = recommend("respond", ["misread", "reassurance", "open"]);
    expect(waited?.say).toBe("You waited up. Were you worried?");
    expect(waited?.recover).toMatch(/Let me try that again/);
  });

  it("keeps the framework behind the decision, and out of banned language", () => {
    expect(CONTENT_LINES.map((line) => line.title)).toEqual(["Content", "Message", "Outcome"]);
    expect(RELATIONSHIP_LINES.map((line) => line.title)).toEqual(["Intent", "Channel", "Receiver"]);
    expect(guideSurfaceCopy()).toContain(PURPOSE_LINE);
    expect(() => assertNoSaaSLanguage(guideSurfaceCopy())).not.toThrow();
  });
});
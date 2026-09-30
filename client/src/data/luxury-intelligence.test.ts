import { describe, expect, it } from "vitest";
import { getSiteMapGroups } from "./site-map";
import {
  luxuryIntelligenceAliases,
  luxuryIntelligenceEdition,
  luxuryIntelligenceLibrary,
  luxuryIntelligencePath,
} from "./luxury-intelligence";

describe("luxury intelligence channel", () => {
  it("keeps a stable public web path and alias", () => {
    expect(luxuryIntelligencePath).toBe("/intelligence/luxury");
    expect([...luxuryIntelligenceAliases]).toEqual(["/luxury-intelligence"]);
    expect(luxuryIntelligenceEdition.series).toBe("Luxury Intelligence");
  });

  it("points the library at live reports rather than inventory", () => {
    expect(luxuryIntelligenceLibrary.length).toBeGreaterThanOrEqual(4);
    expect(luxuryIntelligenceLibrary.every((item) => item.href.startsWith("/"))).toBe(true);
    expect(luxuryIntelligenceLibrary.some((item) => item.href.includes("executive-housing"))).toBe(true);
  });

  it("appears on the sitemap without entering the charcoal footer", () => {
    const groups = getSiteMapGroups();
    const doors = groups.flatMap((group) => group.items);
    expect(doors).toEqual(
      expect.arrayContaining([{ label: "Luxury Intelligence", href: luxuryIntelligencePath }]),
    );
  });
});

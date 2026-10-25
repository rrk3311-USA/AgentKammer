import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { decisionNavigationGroups } from "./decision-navigation";
import { INTERNATIONAL_HUB } from "./international-hub";
import { serviceLandingMap } from "./service-landings";

const items =
  decisionNavigationGroups.find((group) => group.title === "What's Changing?")?.items ?? [];

describe("What's Changing destinations", () => {
  it("lists twelve chips", () => {
    expect(items).toHaveLength(12);
  });

  it("sends every chip to a real, content-bearing page", () => {
    for (const item of items) {
      if (item.href === "/international") {
        expect(INTERNATIONAL_HUB.path).toBe("/international");
        expect(INTERNATIONAL_HUB.title.length).toBeGreaterThan(8);
        expect(INTERNATIONAL_HUB.description.length).toBeGreaterThan(80);
        continue;
      }
      expect(item.href.startsWith("/situations/")).toBe(true);
      const slug = item.href.replace("/situations/", "").replace(/\/$/, "");
      const landing = serviceLandingMap[slug];
      expect(landing, `${item.label} missing landing for ${item.href}`).toBeTruthy();
      expect(landing.summary.length).toBeGreaterThan(80);
      expect(landing.audience.length).toBeGreaterThan(0);
      expect(landing.considerations.length).toBeGreaterThan(0);
      expect(landing.title.toLowerCase()).not.toContain("coming soon");
      expect(landing.summary.toLowerCase()).not.toContain("placeholder");
    }
  });
});

describe("platinum print theme", () => {
  it("keeps the shared paper and trim tokens", () => {
    const css = readFileSync(new URL("../../public/chrome/platinum-print.css", import.meta.url), "utf8");
    expect(css).toContain("--ak-platinum-paper:#d8d2c6");
    expect(css).toContain("--ak-platinum-trim:#B8BCC2");
    expect(css).toContain("--ak-platinum-trim-in:#D6D9DE");
    expect(css).toContain(".ak-platinum-frame");
    expect(css).toContain(".mm-frame");
  });
});

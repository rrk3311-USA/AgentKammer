import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { decisionNavigationGroups } from "./decision-navigation";
import { serviceLandingMap } from "./service-landings";

const items =
  decisionNavigationGroups.find((group) => group.title === "What's Changing?")?.items ?? [];

describe("What's Changing destinations", () => {
  it("lists twelve chips", () => {
    expect(items).toHaveLength(12);
  });

  it("sends every chip to a real, content-bearing page", () => {
    for (const item of items) {
      expect(item.href).not.toBe("/international");
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

describe("Platinum Paper theme", () => {
  it("keeps the shared limestone paper, silver frame, slug, and notes block", () => {
    const css = readFileSync(new URL("../../public/chrome/platinum-paper.css", import.meta.url), "utf8");
    expect(css).toContain("--ak-pp-paper:#CFCCC6");
    expect(css).toContain("--ak-pp-deep:#161C28");
    expect(css).toContain("--ak-pp-label:#4A5058");
    expect(css).toContain("stone-bg.png");
    expect(css).toContain(".ak-pp-frame");
    expect(css).toContain(".ak-pp-notes");
    expect(css).toContain(".ak-pp-slug");
    expect(css).toContain(".ak-pp-inlay");
    expect(css).toContain("repeating-linear-gradient(90deg,rgba(42,52,71,.22) 0 1px,transparent 1px 7px)");
    expect(css).not.toContain("#d8d2c6");
    expect(css).not.toContain("#f7f3ea");
  });
});

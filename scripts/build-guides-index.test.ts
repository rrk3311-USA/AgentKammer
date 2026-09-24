import { describe, expect, it } from "vitest";
import { publicGuides } from "../client/src/data/guides";
import { buildGuidesIndex } from "./build-guides-index";

describe("build-guides-index", () => {
  it("indexes every public guide with title, url, description, category, and tags", () => {
    const index = buildGuidesIndex();
    expect(index).toHaveLength(publicGuides.length);
    for (const entry of index) {
      expect(entry.title.length).toBeGreaterThan(0);
      expect(entry.url.startsWith("/")).toBe(true);
      expect(entry.description.length).toBeGreaterThan(0);
      expect(entry.category.length).toBeGreaterThan(0);
      expect(entry.tags.length).toBeGreaterThan(0);
    }
  });

  it("keeps the two static field guides searchable from each other", () => {
    const index = buildGuidesIndex();
    const hay = (entry: (typeof index)[number]) =>
      [entry.title, entry.description, entry.category, ...entry.tags].join(" ").toLowerCase();

    const nycHits = index.filter((entry) => hay(entry).includes("nyc"));
    const wealthHits = index.filter((entry) => hay(entry).includes("wealth"));

    expect(nycHits.some((entry) => entry.url.endsWith("how-to-buy-in-nyc.html"))).toBe(true);
    expect(wealthHits.some((entry) => entry.url.endsWith("how-wealth-is-held.html"))).toBe(true);
  });
});

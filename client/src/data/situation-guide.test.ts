import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { SITUATION_GUIDE } from "./situation-guide";

const source = readFileSync(new URL("./situation-guide.ts", import.meta.url), "utf8");
const ui = readFileSync(new URL("../components/SituationGuide.tsx", import.meta.url), "utf8");

describe("situation guide", () => {
  it("numbers three editorial steps and keeps every row as a link", () => {
    expect(SITUATION_GUIDE.map((step) => step.num)).toEqual(["01", "02", "03"]);
    expect(SITUATION_GUIDE[0].items).toHaveLength(12);
    for (const step of SITUATION_GUIDE) {
      expect(step.items.length).toBeGreaterThan(0);
      for (const item of step.items) {
        expect(item.href.startsWith("/")).toBe(true);
        expect(item.line.length).toBeGreaterThan(8);
      }
    }
    expect(source).not.toContain("\u2014");
    expect(ui).not.toContain("\u2014");
    expect(ui).toContain("ak-guide-row");
    expect(`${source}\n${ui}`).not.toMatch(/carousel|swiper|rolodex|ak-quiet-chip/i);
  });
});

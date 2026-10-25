import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { decisionFacingItems } from "@/data/decision-navigation";

describe("decision assistant", () => {
  it("never sends the nine decision pills home", () => {
    const source = readFileSync(new URL("./decision-assistant.ts", import.meta.url), "utf8");
    expect(decisionFacingItems).toHaveLength(9);
    expect(source).not.toContain("window.location.assign");
    expect(source).not.toContain('assign("/")');
    expect(source).not.toContain('pathname !== "/"');
    for (const item of decisionFacingItems) {
      expect(item.href).not.toBe("/");
      expect(item.starter).toBeTruthy();
    }
  });
});

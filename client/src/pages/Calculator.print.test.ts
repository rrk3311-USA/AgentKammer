import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const calc = readFileSync(new URL("./Calculator.tsx", import.meta.url), "utf8");
const css = readFileSync(new URL("../index.css", import.meta.url), "utf8");
const paper = readFileSync(new URL("../../public/chrome/platinum-paper.css", import.meta.url), "utf8");

describe("Calculator print sheet", () => {
  it("keeps calculator copy free of em dashes", () => {
    expect(calc).not.toContain("\u2014");
  });

  it("prints a Platinum Paper letter, not the live navy header", () => {
    expect(calc).toContain("calculator-print-doc");
    expect(calc).toContain("ak-pp-page");
    expect(calc).toContain("ak-pp-inlay");
    expect(calc).toContain("ak-pp-notes");
    expect(calc).toContain("interactive-tools/calculator");
    expect(calc).toContain("AGENTKAMMER.COM");
    expect(calc).toContain("Educational only.");
    expect(calc).toContain("length: 17");
    expect(calc).toContain("ak-pp-foot-end");
    expect(calc).not.toContain("ak-pp-date");
    expect(calc).not.toContain("calculator-print-inner");
    expect(css).toContain(".calculator-print-doc .ak-pp-lead");
    expect(css).toContain("line-height: 1.6");
    expect(css).toContain(".calculator-print-doc");
    expect(css).toContain("min-height: 10in");
    expect(css).toContain("body:has(.calculator-sheet) .calculator-screen");
    expect(css).toContain("body:has(.calculator-sheet) .ak-app-shell > header");
    expect(css).not.toContain("body:has(.calculator-sheet) header,");
    expect(css).not.toContain("#d8d2c6");
    expect(paper).toContain("--ak-pp-paper:#CFCCC6");
    expect(paper).not.toContain("#f7f3ea");
  });
});

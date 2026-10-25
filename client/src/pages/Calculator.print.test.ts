import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const calc = readFileSync(new URL("./Calculator.tsx", import.meta.url), "utf8");
const css = readFileSync(new URL("../index.css", import.meta.url), "utf8");

describe("Calculator print sheet", () => {
  it("keeps calculator copy free of em dashes", () => {
    expect(calc).not.toContain("\u2014");
  });

  it("fills one letter page inside the platinum frame and prints the disclaimer", () => {
    expect(css).toContain(".calculator-print-inner");
    expect(css).toContain("min-height: 10in");
    expect(css).toContain(".calculator-note");
    expect(css).toContain("body:has(.calculator-sheet) .calculator-omit");
    expect(calc).toContain("calculator-note");
    expect(calc).toContain("Educational only.");
  });
});

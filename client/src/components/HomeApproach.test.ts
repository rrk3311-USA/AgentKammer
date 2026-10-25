import { createElement } from "react";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { HomeApproach } from "./HomeApproach";

const source = readFileSync(new URL("./HomeApproach.tsx", import.meta.url), "utf8");

describe("HomeApproach", () => {
  it("renders four locked pillars without access or representation claims", () => {
    const html = renderToStaticMarkup(createElement(HomeApproach));
    expect(html).toContain("data-ak-home-approach");
    expect(html).toContain("The Agent Kammer Approach");
    expect(html).toContain("Strategy over transactions.");
    expect(html).toContain("Clarity");
    expect(html).toContain("Intelligence");
    expect(html).toContain("Strategy");
    expect(html).toContain("Discretion");
    expect(html).not.toContain("off-market");
    expect(html).not.toContain("represent");
    expect(html).not.toContain("\u2014");
    expect(source).not.toContain("\u2014");
  });
});

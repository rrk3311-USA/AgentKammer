import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import { HomeCloseCtas, readHomeCtaMetal } from "./HomeCloseCtas";
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../index.css", import.meta.url), "utf8");
const source = readFileSync(new URL("./HomeCloseCtas.tsx", import.meta.url), "utf8");

function lum(hex: string) {
  const n = hex.replace("#", "");
  const rgb = [0, 2, 4]
    .map((i) => parseInt(n.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

function contrast(a: string, b: string) {
  const pair = [lum(a), lum(b)].sort((x, y) => y - x);
  return (pair[0] + 0.05) / (pair[1] + 0.05);
}

function render(search = "") {
  return renderToStaticMarkup(
    createElement(Router, { ssrPath: search ? `/${search}` : "/" }, createElement(HomeCloseCtas)),
  );
}

describe("homepage close CTAs", () => {
  it("puts Calculate on the left and Contact on the right", () => {
    const html = render();
    expect(html.indexOf("Calculate")).toBeLessThan(html.indexOf("Contact"));
    expect(html).toContain('href="/calculator"');
    expect(html).toContain('href="/contact"');
    expect(html).toContain("ak-pair-btn--outline");
    expect(html).toContain("ak-pair-btn--fill");
    expect(html).toContain('data-ak-cta-metal="brass"');
    expect(source).not.toContain("\u2014");
  });

  it("reads the silver finish from the query", () => {
    expect(readHomeCtaMetal("?cta=silver")).toBe("silver");
    expect(readHomeCtaMetal("?cta=brass")).toBe("brass");
    expect(readHomeCtaMetal("")).toBe("brass");
    const html = renderToStaticMarkup(
      createElement(Router, { ssrPath: "/?cta=silver" }, createElement(HomeCloseCtas, { metal: "silver" })),
    );
    expect(html).toContain('data-ak-cta-metal="silver"');
  });

  it("keeps the specified metals and stacks on a phone", () => {
    expect(css).toContain("1.5px solid #b8955a");
    expect(css).toContain("#d9be8c");
    expect(css).toContain("linear-gradient(180deg, #c9a464, #9c7a40)");
    expect(css).toContain("#1f2737");
    expect(css).toContain("1px solid #6e5428");
    expect(css).toContain("1.5px solid #c9ced3");
    expect(css).toContain("#e2e5e8");
    expect(css).toContain("linear-gradient(180deg, #e6e9ec, #b5bbc1)");
    expect(css).toContain("1px solid #8c939a");
    expect(css).toContain("border-radius: 4px");
    expect(css).toContain("flex-direction: column");
    expect(css).toContain("letter-spacing: 0.16em");
    expect(contrast("#D9BE8C", "#2A3447")).toBeGreaterThanOrEqual(4.5);
    expect(contrast("#E2E5E8", "#2A3447")).toBeGreaterThanOrEqual(4.5);
    expect(contrast("#1F2737", "#C9A464")).toBeGreaterThanOrEqual(4.5);
    expect(contrast("#1F2737", "#9C7A40")).toBeGreaterThanOrEqual(3);
    expect(contrast("#1F2737", "#B5BBC1")).toBeGreaterThanOrEqual(4.5);
  });
});

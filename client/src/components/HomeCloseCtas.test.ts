import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import { HomeCloseCtas } from "./HomeCloseCtas";
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

function render() {
  return renderToStaticMarkup(createElement(Router, { ssrPath: "/" }, createElement(HomeCloseCtas)));
}

describe("homepage close CTAs", () => {
  it("puts Calculate on the left, right next to Contact", () => {
    const html = render();
    expect(html.indexOf("Calculate")).toBeLessThan(html.indexOf("Contact"));
    expect(html).toContain('href="/calculator"');
    expect(html).toContain('href="/contact"');
    expect(html.match(/ak-pair-btn/g)?.length).toBeGreaterThanOrEqual(2);
    expect(html).not.toContain("ak-pair-btn--fill");
    expect(source).not.toContain("\u2014");
    expect(source).not.toContain("cta=silver");
  });

  it("uses matching titanium outlines on Stone Blue", () => {
    expect(css).toContain("1.5px solid #737b83");
    expect(css).toContain("color: #c9ced3");
    expect(css).toContain("background: transparent");
    expect(css).toContain("flex-direction: row");
    expect(css).toContain("letter-spacing: 0.16em");
    expect(css).toContain("border-radius: 4px");
    expect(css).not.toContain("ak-pair-btn--brass");
    expect(css).not.toContain("ak-pair-btn--silver");
    const pairCss = css.slice(css.indexOf(".ak-pair-btn {"), css.indexOf(".ak-metal-divider"));
    expect(pairCss).not.toContain("linear-gradient");
    expect(pairCss).not.toContain("repeating-linear-gradient");
    expect(contrast("#C9CED3", "#2A3447")).toBeGreaterThanOrEqual(4.5);
  });
});

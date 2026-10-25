import { readFileSync } from "node:fs";
import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import { whatsChangingCards, wrapRolodexIndex } from "@/data/decision-navigation";
import { WhatsChangingRolodex } from "./WhatsChangingRolodex";

function renderRolodex() {
  return renderToStaticMarkup(
    createElement(Router, { ssrPath: "/" }, createElement(WhatsChangingRolodex)),
  );
}

describe("wrapRolodexIndex", () => {
  it("wraps forward and back", () => {
    expect(wrapRolodexIndex(0, 12)).toBe(0);
    expect(wrapRolodexIndex(12, 12)).toBe(0);
    expect(wrapRolodexIndex(-1, 12)).toBe(11);
  });
});

describe("WhatsChangingRolodex", () => {
  it("renders every life-change card as a landing link, left aligned", () => {
    const html = renderRolodex();
    expect(whatsChangingCards).toHaveLength(12);
    expect(html).toContain("data-ak-whats-changing-rolodex");
    expect(html).toContain("ak-rolo-card");
    expect(html).toContain('aria-roledescription="carousel"');
    expect(html).toContain("Previous life change");
    expect(html).toContain("Next life change");
    expect(html).toContain("text-left");
    expect(html).not.toContain("\u2014");
    expect(html).not.toContain("ak-quiet-chip");
    for (const item of whatsChangingCards) {
      expect(html).toContain(item.label);
      expect(html).toContain(item.line);
      expect(html).toContain(`href="${item.href}"`);
    }
  });

  it("keeps the first card face-up and neighbors marked for peek", () => {
    const html = renderRolodex();
    expect(html).toContain('data-pos="0"');
    expect(html).toContain('data-pos="-1"');
    expect(html).toContain('data-pos="1"');
    expect(html).toContain('data-pos="far"');
  });

  it("uses subtle motion and honors reduced motion", () => {
    const css = readFileSync(new URL("../index.css", import.meta.url), "utf8");
    expect(css).toContain(".ak-rolo-card");
    expect(css).toContain("rotateY");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).toContain("@media (prefers-reduced-motion: no-preference)");
    expect(css).toContain("rgba(154, 161, 168");
    expect(css).toContain("rgba(229, 228, 226");
  });
});

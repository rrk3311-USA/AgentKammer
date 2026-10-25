import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import { decisionNavigationGroups } from "@/data/decision-navigation";
import { HomeSituationRows } from "./HomeSituationRows";

const expected =
  decisionNavigationGroups.find((group) => group.title === "What's Changing?")?.items ?? [];

describe("HomeSituationRows", () => {
  it("renders Platinum Paper text rows for the twelve What's Changing targets", () => {
    const html = renderToStaticMarkup(
      createElement(Router, { ssrPath: "/" }, createElement(HomeSituationRows)),
    );
    expect(html).toContain("data-ak-whats-changing");
    expect(html).toContain("ak-pp-page");
    expect(html).toContain("ak-pp-frame");
    expect(html).toContain("rule-out");
    expect(html).toContain("rule-in");
    expect(html).toContain("Start from what changed.");
    expect((html.match(/class="ak-home-row"/g) || []).length).toBe(expected.length);
    for (const item of expected) {
      expect(html).toContain(item.label);
      expect(html).toContain(`href="${item.href}"`);
    }
    expect(html).not.toContain("ak-quiet-chip");
  });
});

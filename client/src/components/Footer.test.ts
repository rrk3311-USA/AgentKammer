import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import {
  FooterIvoryIndex,
  footerTopRuleClass,
  isSituationPagePath,
} from "./Footer";
import { decisionNavigationGroups } from "@/data/decision-navigation";

const situationHrefs =
  decisionNavigationGroups.find((group) => group.title === "What's Changing?")?.items.map((item) => item.href) ??
  [];

function renderIndex(exploreOtherSituations: boolean) {
  return renderToStaticMarkup(
    createElement(Router, { ssrPath: "/" }, createElement(FooterIvoryIndex, { exploreOtherSituations })),
  );
}

describe("isSituationPagePath", () => {
  it("matches Situation slugs only", () => {
    expect(isSituationPagePath("/situations/executive-relocation-nyc")).toBe(true);
    expect(isSituationPagePath("/situations/foreign-buyers-new-york")).toBe(true);
    expect(isSituationPagePath("/situations/executive-relocation-nyc?ref=nav")).toBe(true);
    expect(isSituationPagePath("/situations")).toBe(false);
    expect(isSituationPagePath("/")).toBe(false);
    expect(isSituationPagePath("/international")).toBe(false);
  });
});

describe("Footer situation index", () => {
  it("keeps What's Changing? pills on Home and Start Here", () => {
    const html = renderIndex(false);
    expect(html).toContain("What&#x27;s Changing?");
    expect(html).toContain('aria-label="What&#x27;s Changing"');
    expect(html).not.toContain("Explore other situations");
    expect(html).toContain("rounded-full border border-brand-border bg-white");
    expect(footerTopRuleClass(false)).toContain("border-t border-brand-border");
    expect(footerTopRuleClass(false)).not.toContain("border-t-2");
    for (const href of situationHrefs) {
      expect(html).toContain(`href="${href}"`);
    }
  });

  it("renames the ivory band on Situation pages and keeps the same destinations", () => {
    const html = renderIndex(true);
    expect(html).toContain("Explore other situations");
    expect(html).toContain('aria-label="Explore other situations"');
    expect(html).not.toContain("What&#x27;s Changing?");
    expect(html).not.toContain("rounded-full border border-brand-border bg-white");
    expect(html).toContain("py-12 lg:py-16");
    expect(html).toContain("text-[12px] leading-5 text-brand-graphite/72");
    expect(footerTopRuleClass(true)).toContain("border-t-2 border-brand-navy/28");
    for (const href of situationHrefs) {
      expect(html).toContain(`href="${href}"`);
    }
  });

  it("keeps International Move in the unfiltered set", () => {
    const html = renderIndex(true);
    expect(html).toContain('href="/situations/executive-relocation-nyc"');
    expect(html).toContain('href="/international"');
    expect(html).not.toContain("What&#x27;s Changing?");
  });
});

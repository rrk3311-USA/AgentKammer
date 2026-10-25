import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import {
  Footer,
  FooterIvoryIndex,
  WhatsChangingBand,
  WhatsChangingPills,
  footerTopRuleClass,
  isHomePath,
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

describe("isHomePath", () => {
  it("matches the homepage only", () => {
    expect(isHomePath("/")).toBe(true);
    expect(isHomePath("/?ref=nav")).toBe(true);
    expect(isHomePath("/situations")).toBe(false);
  });
});

describe("Footer situation index", () => {
  it("keeps a quiet dark What's Changing? band on Start Here", () => {
    const html = renderIndex(false);
    expect(html).toContain("What&#x27;s Changing?");
    expect(html).toContain('aria-label="What&#x27;s Changing"');
    expect(html).not.toContain("Explore other situations");
    expect(html).toContain("flex-wrap items-center justify-center");
    expect(html).toContain("bg-[#161C28]");
    expect(html).toContain("text-[9.5px]");
    expect(html).not.toContain("rounded-full border border-brand-border bg-white");
    expect(footerTopRuleClass(false)).toContain("bg-[#161C28]");
    expect(footerTopRuleClass(false)).not.toContain("border-t-2");
    expect(footerTopRuleClass(false, true)).toContain("bg-brand-charcoal");
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
    expect(html).toContain("py-10 lg:py-16");
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

  it("skips the chip band on Home and keeps Start Here and Contact out of the charcoal row", () => {
    const html = renderToStaticMarkup(
      createElement(Router, { ssrPath: "/" }, createElement(Footer)),
    );
    expect(html).not.toContain("What&#x27;s Changing?");
    expect(html).not.toContain('href="/situations"');
    expect(html).not.toContain('href="/contact"');
    expect(html).toContain("Languages");
    expect(html).toContain("aria-expanded");
    expect(html).toContain("whitespace-nowrap");
  });
});

describe("WhatsChangingPills", () => {
  it("renders tappable quiet chips without their own section plate", () => {
    const html = renderToStaticMarkup(
      createElement(Router, { ssrPath: "/" }, createElement(WhatsChangingPills)),
    );
    expect(html).toContain("data-ak-whats-changing");
    expect(html).toContain("flex-wrap items-center justify-center");
    expect(html).not.toContain("overflow-x-auto");
    expect(html).toContain("Executive Relocation");
    expect(html).toContain('href="/situations/executive-relocation-nyc"');
    expect(html).not.toContain("bg-[#161C28]");
  });

  it("keeps the Start Here footer plate as a separate band", () => {
    const html = renderToStaticMarkup(
      createElement(Router, { ssrPath: "/" }, createElement(WhatsChangingBand)),
    );
    expect(html).toContain("data-ak-whats-changing");
    expect(html).toContain("bg-[#161C28]");
  });
});

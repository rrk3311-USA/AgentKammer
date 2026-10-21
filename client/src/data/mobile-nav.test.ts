import { describe, expect, it } from "vitest";
import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Router } from "wouter";
import { primaryNav } from "@/components/site-shell";
import { publicGuides } from "@/data/guides";
import { FOOTER_SITEMAP_QUIET } from "@/data/public-menu";
import { MobileFieldMenu } from "@/components/MobileFieldMenu";
import {
  collectMobileNavHrefs,
  defaultOpenSectionId,
  hubFieldNav,
  isHardMobileHref,
  mobileFieldNav,
} from "./mobile-nav";

describe("mobile field menu", () => {
  it("keeps Calculator and Hub out of the locked desktop header", () => {
    const headerHrefs = new Set(primaryNav.map((item) => item.href));
    expect(headerHrefs.has("/calculator")).toBe(false);
    expect(headerHrefs.has("/tools")).toBe(true);
    expect(headerHrefs.has("/hub")).toBe(false);
    for (const item of FOOTER_SITEMAP_QUIET) {
      expect(headerHrefs.has(item.href)).toBe(false);
    }
  });

  it("puts Guides, Interactive Tools, and every public guide in the hamburger", () => {
    const ids = mobileFieldNav.map((item) => item.id);
    expect(ids).toEqual(["home", "start", "guides", "articles", "tools", "contact"]);
    const hrefs = collectMobileNavHrefs();
    expect(hrefs).toContain("/guides");
    expect(hrefs).toContain("/resources");
    expect(hrefs).toContain("/resources#field-guides");
    expect(hrefs).toContain("/tools");
    expect(hrefs).toContain("/calculator");
    expect(hrefs).toContain("/tools/wheel-of-life/");
    expect(hrefs).toContain("/tools/livability/");
    expect(hrefs).not.toContain("/tools/livability");
    expect(hrefs).not.toContain("/hub");
    for (const page of hubFieldNav) {
      expect(hrefs).not.toContain(page.href);
    }
    for (const guide of publicGuides) {
      expect(hrefs).toContain(guide.href);
    }
  });

  it("treats the building-terms field guide as a hard static href", () => {
    expect(isHardMobileHref("/guides/building-terms")).toBe(true);
    expect(isHardMobileHref("/guides/how-to-buy-in-nyc.html")).toBe(true);
    expect(isHardMobileHref("/tools/wheel-of-life/")).toBe(true);
    expect(isHardMobileHref("/tools/livability/")).toBe(true);
    expect(isHardMobileHref("/guides/how-mortgages-work")).toBe(false);
  });

  it("opens the section that matches the field you are already in", () => {
    expect(defaultOpenSectionId("/hub/saved")).toBeNull();
    expect(defaultOpenSectionId("/calculator")).toBe("tools");
    expect(defaultOpenSectionId("/tools")).toBe("tools");
    expect(defaultOpenSectionId("/tools/livability")).toBe("tools");
    expect(defaultOpenSectionId("/guides/how-mortgages-work")).toBe("guides");
    expect(defaultOpenSectionId("/articles")).toBe("articles");
    expect(defaultOpenSectionId("/situations/first-home-buyers-nyc")).toBe("start");
    expect(defaultOpenSectionId("/")).toBeNull();
  });

  it("renders the wine-style accordion with Guidance still a utility", () => {
    const html = renderToStaticMarkup(
      createElement(Router, { ssrPath: "/guides" }, createElement(MobileFieldMenu, { location: "/guides", onClose: () => undefined })),
    );
    expect(html).toContain("Guides");
    expect(html).toContain("Interactive Tools");
    expect(html).not.toMatch(/>Hub</);
    expect(html).not.toContain('href="/hub"');
    expect(html).toContain("aria-expanded");
    expect(html).toContain("Guidance");
    expect(html).toContain("data-testid=\"button-header-guidance-mobile\"");
  });

  it("nests Calculator and Wheel of Life under Tools", () => {
    const html = renderToStaticMarkup(
      createElement(Router, { ssrPath: "/tools" }, createElement(MobileFieldMenu, { location: "/tools", onClose: () => undefined })),
    );
    expect(html).toContain("All tools");
    expect(html).toContain("Calculator");
    expect(html).toContain("Wheel of Life");
    expect(html).toContain('href="/tools/wheel-of-life/"');
    expect(html).toContain("Livability");
    expect(html).toContain('href="/tools/livability/"');
  });
});

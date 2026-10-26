import React, { createElement } from "react";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import { primaryNav } from "@/components/site-shell";
import { FOOTER_DARK_LINKS, getSiteMapGroups } from "@/data/site-map";
import BrandHome from "./BrandHome";

function renderBrandHome() {
  return renderToStaticMarkup(createElement(Router, { ssrPath: "/home-brand" }, createElement(BrandHome)));
}

describe("brand homepage", () => {
  it("matches the mock copy and the site contact email", () => {
    const html = renderBrandHome();
    expect(html).toContain("Real Estate");
    expect(html).toContain("Strategy for a");
    expect(html).toContain("Life in Manhattan.");
    expect(html).toContain("Intelligence. Discretion. Perspective.");
    expect(html).toContain("Strategy over transactions.");
    expect(html).toContain("Tailored guidance.");
    expect(html).toContain("Buyer representation");
    expect(html).toContain("Seller representation");
    expect(html).toContain("Relocation strategy");
    expect(html).toContain("Portfolio advisory");
    expect(html).toContain("Development consulting");
    expect(html).toContain("Analysis. Perspective. Advantage.");
    expect(html).toContain("Real estate strategist");
    expect(html).toContain("mailto:info@agentkammer.com");
    expect(html).toContain("New York, New York");
    expect(html).toContain("© 2026 Agent Kammer");
    expect(html).not.toMatch(/555[\s-]*0198/);
    expect(html).not.toMatch(/646/);
    expect(html).not.toMatch(/instagram\.com|youtube\.com/i);
    expect(html).toContain('href="/insights"');
    expect(html).toContain('href="/contact"');
    expect(html).not.toContain("gradient");
    expect(html).not.toContain("shadow");
  });

  it("is not linked from the live header, footer, or sitemap", () => {
    const blob = JSON.stringify({ primaryNav, FOOTER_DARK_LINKS, groups: getSiteMapGroups() });
    expect(blob).not.toContain("/home-brand");
    expect(readFileSync("client/src/pages/Home.tsx", "utf8")).not.toContain("home-brand");
    expect(readFileSync("client/src/components/Header.tsx", "utf8")).not.toContain("home-brand");
    expect(readFileSync("client/src/components/Footer.tsx", "utf8")).not.toContain("home-brand");
    expect(readFileSync("client/public/sitemap.xml", "utf8")).not.toContain("home-brand");
  });
});

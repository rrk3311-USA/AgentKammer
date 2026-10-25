import { readFileSync } from "node:fs";
import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import HomeV2 from "./HomeV2";
import Home from "./Home";

function renderV2() {
  return renderToStaticMarkup(createElement(Router, { ssrPath: "/v2" }, createElement(HomeV2)));
}

describe("homepage v2 preview", () => {
  it("keeps its own chrome, real destinations, and noindex", () => {
    const html = renderV2();
    expect(html).toContain("data-ak-home-v2");
    expect(html).toContain("Start Here");
    expect(html).toContain("Guides");
    expect(html).toContain("Contact");
    expect(html).toContain("Guidance");
    expect(html).toContain('href="/situations"');
    expect(html).toContain('href="/guides"');
    expect(html).toContain('href="/contact"');
    expect(html).toContain("Live where");
    expect(html).toContain("you belong");
    expect(html).toContain("Private housing guidance before the market gets loud.");
    expect(html).toContain("People do not wake up wanting to tour apartments.");
    expect(html).toContain("They wake up because life changed.");
    expect(html).toContain("What&#x27;s changing");
    expect(html).toContain("The Agent Kammer Approach");
    expect(html).toContain("Strategy over transactions.");
    expect(html).toContain("Clarity");
    expect(html).toContain("Market knowledge and public data, read carefully.");
    expect(html).toContain("Start from");
    expect(html).toContain("what changed.");
    expect(html).toContain("Executive Relocation");
    expect(html).toContain("International Move");
    expect(html).toContain("Decisions before listings.");
    expect(html).toContain("Agent Kammer");
    expect(html).toContain("Insights");
    expect(html).toContain('href="/insights"');
    expect(html).toContain("Calculate");
    expect(html).toContain('href="/calculator"');
    expect(html).toContain("raphael@agentkammer.com");
    expect(html).toContain("New York NY");
    expect(html).toContain("© 2026 Agent Kammer");
    expect(html).toContain("/images/v2/hero-esb-limestone.jpg");
    expect(html).toContain("/images/v2/interior-manhattan.jpg");
    expect(html).not.toContain('href="/services"');
    expect(html).not.toContain('href="/about"');
    expect(html).not.toContain('href="/approach"');
    expect(html).not.toContain("off-market");
    expect(html).not.toContain("buyer representation");
    expect(html).not.toContain("seller representation");
    expect(html).not.toContain("Instagram");
    expect(html).not.toContain("YouTube");
    expect(html).not.toContain("—");
    expect(html).not.toContain("\u2014");
  });

  it("leaves the production homepage and sitemaps untouched", () => {
    const home = renderToStaticMarkup(createElement(Router, { ssrPath: "/" }, createElement(Home)));
    expect(home).toContain("/images/how-we-think-terrace.jpg");
    expect(home).not.toContain("data-ak-home-v2");
    expect(home).not.toContain("/images/v2/");

    const robots = readFileSync(new URL("../../public/robots.txt", import.meta.url), "utf8");
    const sitemap = readFileSync(new URL("../../public/sitemap.xml", import.meta.url), "utf8");
    const app = readFileSync(new URL("../App.tsx", import.meta.url), "utf8");
    const header = readFileSync(new URL("../components/Header.tsx", import.meta.url), "utf8");
    const footer = readFileSync(new URL("../components/Footer.tsx", import.meta.url), "utf8");
    const v2Source = readFileSync(new URL("./HomeV2.tsx", import.meta.url), "utf8");
    expect(v2Source).toContain('robots: "noindex, nofollow"');
    expect(robots).toContain("Disallow: /v2");
    expect(sitemap).not.toContain("/v2");
    expect(app).toContain('path="/v2"');
    expect(app).toContain("isHomeV2");
    expect(header).not.toContain("/v2");
    expect(footer).not.toContain("/v2");
  });
});

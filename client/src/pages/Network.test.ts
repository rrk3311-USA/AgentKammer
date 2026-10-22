import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import { NetworkDraftPage } from "./Network";
import { FOOTER_DARK_LINKS, getSiteMapGroups } from "@/data/site-map";
import { FOOTER_SITEMAP_QUIET } from "@/data/public-menu";
import { primaryNav } from "@/components/site-shell";

function renderDraft() {
  return renderToStaticMarkup(createElement(Router, { ssrPath: "/network" }, createElement(NetworkDraftPage)));
}

describe("Agent Intelligence Network draft page", () => {
  it("keeps the matchmaking frame, illustrative labels, and current Assessment closer", () => {
    const html = renderDraft();
    expect(html).toContain("page-network-draft");
    expect(html).toContain("Who is the right representative for this person and this transaction?");
    expect(html).toContain("Unpublished draft. Not a public offer.");
    expect(html).toContain("Qualify. Match. Leave the room to the local agent.");
    expect(html).toContain("Referral through brokerages");
    expect(html).toContain("Agent profile");
    expect(html).toContain("Client profile");
    expect(html).toContain("Illustrative match");
    expect(html).toContain("Compatibility · illustrative");
    expect(html).toContain("$5,000 referral at 25%");
    expect(html).toContain("market conventions, not legal limits");
    expect(html).toContain("A cooperative brokerage referral is not a paid settlement-service referral.");
    expect(html).toContain("Referral fees flow brokerage to brokerage.");
    expect(html).toContain("href=\"/belonging\"");
    expect(html).toContain("Request a Situation Assessment");
    expect(html).not.toContain("salesperson");
    expect(html).not.toContain("77-hour");
    expect(html).not.toContain("own brokerage");
    expect(html).not.toContain("affiliate");
    expect(html).not.toContain("Diego");
  });

  it("is absent from public chrome, the HTML sitemap, and crawl files", () => {
    const doors = getSiteMapGroups().flatMap((group) => group.items);
    const publicHrefs = [
      ...primaryNav.map((item) => item.href),
      ...FOOTER_DARK_LINKS.map((item) => item.href),
      ...FOOTER_SITEMAP_QUIET.map((item) => item.href),
      ...doors.map((item) => item.href),
    ];
    expect(publicHrefs.some((href) => href === "/network" || href.startsWith("/network?"))).toBe(false);

    const sitemap = readFileSync(resolve(process.cwd(), "client/public/sitemap.xml"), "utf8");
    const sitemapInternational = readFileSync(resolve(process.cwd(), "client/public/sitemap-international.xml"), "utf8");
    const llms = readFileSync(resolve(process.cwd(), "client/public/llms.txt"), "utf8");
    const robots = readFileSync(resolve(process.cwd(), "client/public/robots.txt"), "utf8");
    expect(sitemap).not.toContain("/network");
    expect(sitemapInternational).not.toContain("/network");
    expect(llms).not.toContain("/network");
    expect(robots).toContain("Disallow: /network");
  });
});

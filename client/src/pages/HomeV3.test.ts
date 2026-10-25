import React, { createElement } from "react";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import { primaryNav } from "@/components/site-shell";
import { FOOTER_DARK_LINKS, getSiteMapGroups } from "@/data/site-map";
import HomeV3 from "./HomeV3";

function renderHomeV3(search = "") {
  const path = search ? `/home-v3?${search}` : "/home-v3";
  return renderToStaticMarkup(createElement(Router, { ssrPath: path }, createElement(HomeV3)));
}

function headerHtml(html: string) {
  const start = html.indexOf("<header");
  const end = html.indexOf("</header>");
  return html.slice(start, end);
}

describe("home v3", () => {
  it("uses live homepage language and the situation intake", () => {
    const html = renderHomeV3();
    expect(html).toContain("Live where");
    expect(html).toContain("you belong");
    expect(html).toContain("Private housing guidance before the market gets loud.");
    expect(html).toContain("People do not wake up wanting to tour apartments. They wake up because life changed.");
    expect(html).toContain("Three questions. Then judgment.");
    expect(html).toContain("What&#x27;s changing?");
    expect(html).toContain("Should anything change?");
    expect(html).toContain("Where do you belong?");
    expect(html).toContain("Start from what changed.");
    expect(html).toContain("Executive Relocation");
    expect(html).toContain("International Move");
    expect(html).toContain("Figure out your situation.");
    expect(html).toContain("Request a Situation Assessment");
    expect(html).toContain('href="/belonging"');
    expect(html).toContain("This isn’t a quiz. It’s the context we need to assess your situation properly.");
    expect(html).toContain("Guidance is a conversation");
    expect(html).toContain("Raphael Kammer built Agent Kammer for clients who want judgment, not a louder search.");
    expect(html).toContain("mailto:info@agentkammer.com");
    expect(html).toContain("Private Housing Advisory");
    expect(html).toContain('href="/situations"');
    expect(html).toContain('href="/contact"');
    expect(html).toContain('href="/calculator"');
    expect(html).toContain('href="/guides"');
    expect(html).not.toMatch(/buyer representation/i);
    expect(html).not.toMatch(/seller representation/i);
    expect(html).not.toMatch(/relocation strategy/i);
    expect(html).not.toMatch(/portfolio advisory/i);
    expect(html).not.toMatch(/development consulting/i);
    expect(html).not.toContain("Real Estate Strategy for a Life in Manhattan");
    expect(html).not.toMatch(/find out if you belong/i);
    expect(html).not.toMatch(/555[\s-]*0198/);
    expect(html).not.toMatch(/instagram\.com|youtube\.com/i);
    expect(html).not.toContain("gradient");
    expect(html).not.toMatch(/shadow-(?!none)/);
  });

  it("keeps the default header as the monogram only", () => {
    const header = headerHtml(renderHomeV3());
    expect(header).not.toContain("sticky");
    expect(header).not.toContain("data-lockup-name");
    expect(header).not.toContain("data-header-divider");
    expect(header).not.toContain(">Agent Kammer<");
  });

  it("offers a sticky wordmark and a sticky divided lockup", () => {
    const wordmark = headerHtml(renderHomeV3("header=wordmark"));
    expect(wordmark).toContain("sticky");
    expect(wordmark).toContain("data-lockup-name");
    expect(wordmark).toContain(">Agent Kammer<");
    expect(wordmark).not.toContain("data-header-divider");
    expect(wordmark).toContain('href="/home-v3?header=wordmark"');

    const divider = headerHtml(renderHomeV3("header=divider"));
    expect(divider).toContain("sticky");
    expect(divider).toContain("data-header-divider");
    expect(divider).toContain(">Agent Kammer<");
    expect(divider).toContain('href="/home-v3?header=divider"');
  });

  it("is not linked from the live header, footer, or sitemap", () => {
    const blob = JSON.stringify({ primaryNav, FOOTER_DARK_LINKS, groups: getSiteMapGroups() });
    expect(blob).not.toContain("/home-v3");
    expect(readFileSync("client/src/pages/Home.tsx", "utf8")).not.toContain("home-v3");
    expect(readFileSync("client/src/components/Header.tsx", "utf8")).not.toContain("home-v3");
    expect(readFileSync("client/src/components/Footer.tsx", "utf8")).not.toContain("home-v3");
    expect(readFileSync("client/public/sitemap.xml", "utf8")).not.toContain("home-v3");
  });
});

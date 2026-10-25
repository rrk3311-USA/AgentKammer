import React, { createElement } from "react";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import Home from "./Home";

const css = readFileSync(new URL("../index.css", import.meta.url), "utf8");
const homeSource = readFileSync(new URL("./Home.tsx", import.meta.url), "utf8");
const rowsSource = readFileSync(new URL("../components/HomeSituationRows.tsx", import.meta.url), "utf8");
const approachSource = readFileSync(new URL("../components/HomeApproach.tsx", import.meta.url), "utf8");

function renderHome() {
  return renderToStaticMarkup(createElement(Router, { ssrPath: "/" }, createElement(Home)));
}

describe("homepage preview", () => {
  it("renders the split ivory/photo hero, then the navy approach band", () => {
    const html = renderHome();
    const hero = html.indexOf("data-ak-home-hero");
    const approach = html.indexOf("data-ak-home-approach");
    const decide = html.indexOf("How We Decide");
    expect(hero).toBeGreaterThan(-1);
    expect(approach).toBeGreaterThan(hero);
    expect(decide).toBeGreaterThan(approach);
    expect(html).toContain("Live where");
    expect(html).toContain("you belong");
    expect(html).toContain("Private housing guidance before the market gets loud.");
    expect(html).toContain("People do not wake up wanting to tour apartments.");
    expect(html).toContain("They wake up because life changed.");
    expect(html).toContain("What&#x27;s changing");
    expect(html).toContain('href="/situations"');
    expect(html).toContain("/images/manhattan-limestone-skyline.jpg");
    expect(html).toContain("The Agent Kammer Approach");
    expect(html).toContain("Strategy over transactions.");
    expect(html).toContain("Clarity");
    expect(html).toContain("Intelligence");
    expect(html).toContain("Strategy");
    expect(html).toContain("Discretion");
    expect(html).not.toContain("off-market");
    expect(html).not.toContain("off market");
    expect(html).not.toContain("brokerage");
  });

  it("keeps production felt How We Decide and puts Platinum Paper on the situation rows", () => {
    const html = renderHome();
    const decide = html.indexOf("How We Decide");
    const rows = html.indexOf("data-ak-whats-changing");
    const close = html.indexOf("data-ak-home-close");
    expect(decide).toBeGreaterThan(-1);
    expect(rows).toBeGreaterThan(decide);
    expect(close).toBeGreaterThan(rows);
    expect(html).toContain("ak-felt-rule");
    expect(html).toContain("Three questions. Then judgment.");
    expect(html).toContain("ak-pp-page");
    expect(html).toContain("ak-pp-frame");
    expect(html).toContain("rule-out");
    expect(html).toContain("rule-in");
    expect(html).toContain("Start from what changed.");
    expect(html).toContain("Executive Relocation");
    expect(html).toContain("International Move");
    expect(html).toContain('href="/situations/executive-relocation-nyc"');
    expect(html).toContain('href="/international"');
    expect((html.match(/class="ak-home-row"/g) || []).length).toBe(12);
    expect(html).not.toContain("ak-quiet-chip");
    expect(html).not.toContain("High-Value Relocation");
    expect(html).not.toContain("Livability");
    expect(html).not.toContain("Start Here");
  });

  it("closes on the lighter stone band with the platinum pair", () => {
    const html = renderHome();
    expect(html).toContain("data-ak-home-close");
    expect(html).toContain("Work through the steps, starting with your Situation, for a clear recommendation, or write to us directly.");
    expect(html).toContain("Calculate");
    expect(html).toContain("Contact");
    expect(html).toContain('href="/calculator"');
    expect(html).toContain("ak-home-cta-pair");
    expect(html).toContain("ak-pair-btn");
    expect(html).not.toContain("Get in touch");
    expect(html).not.toContain("write to me");
  });

  it("keeps navy on the approach band and stone paper on the light rows only", () => {
    expect(css).toContain(".ak-home-approach{");
    expect(css).toContain("background:#0F1B2D");
    expect(css).toContain(".ak-home-close{");
    expect(css).toContain("background-color:#414B64");
    expect(css).toContain(".ak-home-hero{");
    expect(css).toContain("background:#F5F2EB");
    expect(css).toContain(".ak-home-rows");
    expect(css).toContain("background-image:url(\"/chrome/stone-bg.png\")");
    expect(homeSource).toContain("HomeSituationRows");
    expect(rowsSource).toContain("ak-pp-page");
    expect(rowsSource).toContain("rule-out");
    expect(rowsSource).toContain("rule-in");
    expect(approachSource).not.toContain("ak-pp-page");
    expect(homeSource).not.toContain("\u2014");
    expect(rowsSource).not.toContain("\u2014");
    expect(approachSource).not.toContain("\u2014");
  });
});

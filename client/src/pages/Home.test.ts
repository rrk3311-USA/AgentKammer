import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import Home from "./Home";

function renderHome() {
  return renderToStaticMarkup(createElement(Router, { ssrPath: "/" }, createElement(Home)));
}

describe("homepage close", () => {
  it("puts dark pills under Start from what changed, then the Calculate and Contact pair", () => {
    const html = renderHome();
    const start = html.indexOf("Start from what changed.");
    const chips = html.indexOf("data-ak-whats-changing");
    const heading = html.indexOf("Get in touch");
    const line = html.indexOf("Work through the steps, starting with your Situation, for a clear recommendation, or write to us directly.");
    expect(start).toBeGreaterThan(-1);
    expect(chips).toBeGreaterThan(start);
    expect(heading).toBe(-1);
    expect(line).toBeGreaterThan(chips);
    expect(html).toContain("bg-brand-navy text-brand-ivory");
    expect(html).toContain("bg-brand-ivory text-brand-ink");
    expect(html).toContain("Calculate");
    expect(html).toContain("Contact");
    expect(html).toContain('href="/calculator"');
    expect(html).toContain("ak-home-cta-pair");
    expect(html).toContain("max-w-[20rem]");
    expect(html).toContain("ak-pair-btn");
    expect(html).toContain("data-ak-home-close-ctas");
    expect(html).toContain("ak-quiet-chip");
    expect(html).toContain("write to us directly");
    expect(html).not.toContain("write to me");
    expect(html).not.toContain("ak-felt-grid");
    expect(html).not.toContain("High-Value Relocation");
    expect(html).not.toContain("Livability");
    expect(html).toContain("flex-wrap items-center justify-start");
    expect(html).toContain("items-start");
    expect(html).toContain("text-left");
    expect(html).toContain("py-6 lg:py-8");
    expect(html).toContain("How We Decide");
    expect(html).toContain("Three questions. Then judgment.");
    expect(html).toContain("data-ak-how-we-decide");
    expect(html).toContain("ak-pp-page");
    expect(html).toContain("ak-pp-frame");
    expect(html).not.toContain("data-ak-how-we-decide-art");
    expect(html).not.toContain("/images/situations/inheritance-housing-nyc.png");
    expect(html).not.toContain("#FDF3DF");
    expect(html).not.toContain("owl");
  });

  it("does not add a Start Here link in the dark pills section", () => {
    const html = renderHome();
    expect(html).not.toContain("Start Here");
    expect(html).toContain('href="/situations"');
  });
});

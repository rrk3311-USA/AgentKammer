import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import Home from "./Home";

function renderHome() {
  return renderToStaticMarkup(createElement(Router, { ssrPath: "/" }, createElement(Home)));
}

describe("homepage close", () => {
  it("puts dark pills under Start from what changed, then a light Get in touch", () => {
    const html = renderHome();
    const start = html.indexOf("Start from what changed.");
    const chips = html.indexOf("data-ak-whats-changing");
    const heading = html.indexOf("Get in touch");
    const line = html.indexOf("Work through the steps, starting with your Situation, for a clear recommendation, or write to us directly.");
    expect(start).toBeGreaterThan(-1);
    expect(chips).toBeGreaterThan(start);
    expect(heading).toBeGreaterThan(chips);
    expect(line).toBeGreaterThan(heading);
    expect(html).toContain("bg-brand-navy text-brand-ivory");
    expect(html).toContain("bg-brand-ivory text-brand-ink");
    expect(html).toContain("<span>Contact</span>");
    expect(html).toContain("ak-call-button");
    expect(html).toContain("ak-quiet-chip");
    expect(html).toContain("write to us directly");
    expect(html).not.toContain("write to me");
    expect(html).not.toContain("ak-felt-grid");
    expect(html).not.toContain("High-Value Relocation");
    expect(html).not.toContain("Livability");
    expect(html).toContain("flex-wrap items-center justify-center");
    expect(html).toContain("px-3.5 py-2");
    expect(html).toContain("py-6 lg:py-8");
  });

  it("keeps Start Here once in the dark pills section", () => {
    const html = renderHome();
    expect(html).toContain("Start Here");
    expect(html.match(/Start Here/g)?.length).toBe(1);
    expect(html).toContain('href="/situations"');
  });
});

import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import Home from "./Home";

function renderHome() {
  return renderToStaticMarkup(createElement(Router, { ssrPath: "/" }, createElement(Home)));
}

describe("homepage close", () => {
  it("puts the numbered guide under Start from what changed, then a light contact line", () => {
    const html = renderHome();
    const start = html.indexOf("Start from what changed.");
    const guide = html.indexOf("data-ak-situation-guide");
    const heading = html.indexOf("Get in touch");
    const line = html.indexOf("Work through the steps, starting with your Situation, for a clear recommendation, or write to us directly.");
    expect(start).toBeGreaterThan(-1);
    expect(guide).toBeGreaterThan(start);
    expect(heading).toBe(-1);
    expect(line).toBeGreaterThan(guide);
    expect(html).toContain("bg-brand-navy text-brand-ivory");
    expect(html).toContain("bg-brand-ivory text-brand-ink");
    expect(html).toContain("<span>Contact</span>");
    expect(html).toContain("ak-call-button");
    expect(html).toContain("ak-guide-row");
    expect(html).not.toContain("ak-quiet-chip");
    expect(html).toContain("write to us directly");
    expect(html).not.toContain("write to me");
    expect(html).not.toContain("ak-felt-grid");
    expect(html).not.toContain("High-Value Relocation");
    expect(html).not.toContain("Livability");
    expect(html).toContain("items-start");
    expect(html).toContain("text-left");
    expect(html).toContain("px-3.5 py-2");
    expect(html).toContain("py-6 lg:py-8");
    expect(html).toContain("01");
    expect(html).toContain("02");
    expect(html).toContain("03");
  });

  it("does not add a Start Here link in the dark pills section", () => {
    const html = renderHome();
    expect(html).not.toContain("Start Here");
    expect(html).toContain('href="/situations"');
  });
});

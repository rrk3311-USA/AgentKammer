import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import Home from "./Home";

function renderHome() {
  return renderToStaticMarkup(createElement(Router, { ssrPath: "/" }, createElement(Home)));
}

describe("homepage close", () => {
  it("puts the life-change rolodex under Start from what changed, then a light contact line", () => {
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
    expect(html).toContain("<span>Contact</span>");
    expect(html).toContain("ak-call-button");
    expect(html).toContain("data-ak-whats-changing-rolodex");
    expect(html).toContain("ak-rolo-card");
    expect(html).toContain("Executive Relocation");
    expect(html).toContain('href="/situations/executive-relocation-nyc"');
    expect(html).toContain("write to us directly");
    expect(html).not.toContain("write to me");
    expect(html).not.toContain("ak-felt-grid");
    expect(html).not.toContain("High-Value Relocation");
    expect(html).not.toContain("Livability");
    expect(html).toContain("items-start");
    expect(html).toContain("text-left");
    expect(html).toContain("px-5 py-8");
    expect(html).toContain("lg:py-10");
    expect(html).not.toContain("\u2014");
  });

  it("does not add a Start Here link in the dark pills section", () => {
    const html = renderHome();
    expect(html).not.toContain("Start Here");
    expect(html).toContain('href="/situations"');
  });
});

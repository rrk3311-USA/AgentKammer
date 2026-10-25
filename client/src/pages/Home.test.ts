import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import Home from "./Home";

function renderHome() {
  return renderToStaticMarkup(createElement(Router, { ssrPath: "/" }, createElement(Home)));
}

describe("homepage journey", () => {
  it("puts one 01/02/03 journey under the hero, not a second How We Decide stack", () => {
    const html = renderHome();
    const start = html.indexOf("Start from what changed.");
    const chips = html.indexOf("data-ak-whats-changing");
    expect(start).toBeGreaterThan(-1);
    expect(chips).toBeGreaterThan(start);
    expect(html).toContain("data-ak-situation-journey");
    expect(html).toContain("bg-brand-navy text-brand-ivory");
    expect(html).toContain("bg-brand-ivory text-brand-ink");
    expect(html).toContain("ak-quiet-chip");
    expect(html).toContain("flex-wrap items-center justify-start");
    expect(html).toContain("items-start");
    expect(html).toContain("text-left");
    expect(html).toContain("id=\"whats-changing\"");
    expect(html).toContain("href=\"#whats-changing\"");
    expect(html).not.toContain("How We Decide");
    expect(html).not.toContain("Three questions. Then judgment.");
    expect(html).not.toContain("Get in touch");
    expect(html).not.toContain("write to me");
    expect(html).not.toContain("ak-felt-grid");
    expect(html).not.toContain("High-Value Relocation");
    expect(html).not.toContain("Livability");
    expect(html).not.toContain("\u2014");
  });

  it("does not add a Start Here link in the journey and keeps Calculate Contact for the selected path", () => {
    const html = renderHome();
    expect(html).not.toContain("Start Here");
    expect(html).toContain("What&#x27;s changing");
    expect(html).not.toContain('href="/situations"');
  });
});

import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import Home from "./Home";

function renderHome() {
  return renderToStaticMarkup(createElement(Router, { ssrPath: "/" }, createElement(Home)));
}

describe("homepage close", () => {
  it("keeps pills and Get in touch in one navy band, with no Livability note", () => {
    const html = renderHome();
    const chips = html.indexOf("data-ak-whats-changing");
    const heading = html.indexOf("Get in touch");
    const line = html.indexOf("Work through the steps, starting with your Situation, for a clear recommendation, or write to me directly.");
    expect(chips).toBeGreaterThan(-1);
    expect(heading).toBeGreaterThan(chips);
    expect(line).toBeGreaterThan(heading);
    expect(html).not.toContain("bg-[#161C28]");
    expect(html).not.toContain("When you want a human reply");
    expect(html).not.toContain("If you already know what you need");
    expect(html).not.toContain("Livability");
    expect(html).toContain("<span>Contact</span>");
    expect(html).toContain("ak-call-button");
    expect(html).toContain("flex flex-col items-center text-center");
  });

  it("keeps Start Here once in the Situations header, not in the close", () => {
    const html = renderHome();
    expect(html).toContain("Start Here");
    expect(html.match(/Start Here/g)?.length).toBe(1);
    expect(html).toContain('href="/situations"');
  });
});

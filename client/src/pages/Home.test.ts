import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import Home from "./Home";

function renderHome() {
  return renderToStaticMarkup(createElement(Router, { ssrPath: "/" }, createElement(Home)));
}

describe("homepage close", () => {
  it("puts the quiet chip band before a centered Contact line, with no internal note", () => {
    const html = renderHome();
    const chips = html.indexOf("data-ak-whats-changing");
    const contact = html.indexOf("If you already know what you need, write to me directly.");
    const heading = html.indexOf(">Contact<");
    expect(chips).toBeGreaterThan(-1);
    expect(contact).toBeGreaterThan(chips);
    expect(heading).toBeGreaterThan(chips);
    expect(html).not.toContain("When you want a human reply");
    expect(html).not.toContain("The homepage starts with Guidance");
    expect(html).not.toContain("Write only if");
    expect(html).not.toContain("Situation Assessment, Property Assessment, or Livability Score");
    expect(html).toContain("flex flex-col items-center text-center");
    expect(html).toContain("ak-call-button");
  });

  it("keeps Start Here once in the Situations header, not in the Contact close", () => {
    const html = renderHome();
    expect(html).toContain("Start Here");
    expect(html.match(/Start Here/g)?.length).toBe(1);
    expect(html).toContain('href="/situations"');
  });
});

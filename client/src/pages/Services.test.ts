import { readFileSync } from "node:fs";
import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import { SITUATION_GUIDE } from "@/data/situation-guide";
import Services from "./Services";

function renderSituations() {
  return renderToStaticMarkup(createElement(Router, { ssrPath: "/situations" }, createElement(Services)));
}

describe("What's Changing page", () => {
  it("shows the three numbered steps as platinum rows, not pills", () => {
    const html = renderSituations();
    expect(SITUATION_GUIDE[0].items).toHaveLength(12);
    expect(html).toContain("data-ak-situation-guide");
    expect(html).toContain("ak-guide-row");
    expect(html).not.toContain("ak-quiet-chip");
    expect(html).not.toContain("data-ak-situations-pills");
    for (const item of SITUATION_GUIDE[0].items) {
      expect(html).toContain(item.label);
      expect(html).toContain(`href="${item.href}"`);
    }
    expect(html).toContain("01");
    expect(html).toContain("02");
    expect(html).toContain("03");
    expect(html).not.toContain("Life Changes");
    expect(html).not.toContain("ModuleCards");
    expect(html).not.toContain("ak-felt-grid");
    expect(html).not.toContain("CompactLinkRow");
    expect(html).toContain("items-start");
    expect(html).toContain("text-left");
    expect(html).not.toContain("justify-center");
  });

  it("keeps navy guide and a light assessment band", () => {
    const html = renderSituations();
    expect(html).toContain("bg-brand-navy text-brand-ivory");
    expect(html).toContain("bg-brand-ivory text-brand-ink");
    expect(html).toContain("When you want us to look with you.");
    expect(html).toContain("write to us");
    expect(html).not.toContain("write to me");
    expect(html).not.toContain("\u2014");
    expect(html).not.toContain("listing");
    expect(html).not.toContain("broker");
    expect(html).not.toContain("tour");
    expect(html).toContain("Request a Situation Assessment");
    expect(html.match(/ak-felt-item/g)).toBeNull();
  });

  it("uses thin platinum outlines and a short ring brighten", () => {
    const css = readFileSync(new URL("../index.css", import.meta.url), "utf8");
    expect(css).toContain(".ak-guide-row");
    expect(css).toContain("#c9ced3");
    expect(css).toContain("#9aa1a8");
    expect(css).toContain("160ms ease");
    expect(css).not.toContain("ak-guide-carousel");
  });
});

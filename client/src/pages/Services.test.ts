import { readFileSync } from "node:fs";
import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import { decisionNavigationGroups } from "@/data/decision-navigation";
import Services from "./Services";

const changeItems =
  decisionNavigationGroups.find((group) => group.title === "What's Changing?")?.items ?? [];

function renderSituations(variant?: "life" | "both") {
  return renderToStaticMarkup(
    createElement(Router, { ssrPath: "/situations" }, createElement(Services, variant ? { variant } : undefined)),
  );
}

describe("What's Changing page", () => {
  it("shows all twelve life changes in a rolodex and keeps decision pills left-aligned", () => {
    const html = renderSituations();
    expect(changeItems).toHaveLength(12);
    expect(html).toContain("data-ak-whats-changing-rolodex");
    expect(html).toContain("ak-rolo-card");
    expect(html).toContain("ak-quiet-chip");
    expect(html).toContain("min-h-11");
    for (const item of changeItems) {
      expect(html).toContain(item.label);
      expect(html).toContain(`href="${item.href}"`);
    }
    expect(html).not.toContain("01 ·");
    expect(html).not.toContain("02 ·");
    expect(html).not.toContain("03 ·");
    expect(html).not.toContain("Life Changes");
    expect(html).not.toContain("ModuleCards");
    expect(html).not.toContain("ak-felt-grid");
    expect(html).not.toContain("CompactLinkRow");
    expect(html).toContain("items-start");
    expect(html).toContain("text-left");
    expect(html).toContain("flex-wrap items-center justify-start");
    expect(html.match(/flex-wrap items-center justify-start/g)).toHaveLength(2);
    expect(html).not.toContain("justify-center");
    expect(html).not.toContain("\u2014");
  });

  it("keeps decision pills and a light assessment band under the rolodex", () => {
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

  it("renders the decision group as a smaller rolodex when rolo=both", () => {
    const html = renderSituations("both");
    expect(html).toContain("data-ak-whats-changing-rolodex");
    expect(html).toContain("data-ak-decision-rolodex");
    expect(html).toContain("ak-rolo--compact");
    expect(html).toContain("Open Guidance");
    expect(html).toContain("Previous decision");
    expect(html).toContain("Buy");
    expect(html).toContain("Own the next address.");
    expect(html).not.toContain("Open Guidance: I'm considering buying.");
    expect(html.match(/flex-wrap items-center justify-start/g)).toHaveLength(1);
    expect(html).not.toContain("\u2014");
  });

  it("keeps the homepage platinum hover on the pills", () => {
    const css = readFileSync(new URL("../index.css", import.meta.url), "utf8");
    expect(css).toContain(".ak-quiet-chip:hover");
    expect(css).toContain("rgba(229, 228, 226");
    expect(css).toContain("200ms ease");
  });
});

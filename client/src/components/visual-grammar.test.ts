import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import { EditorialHero, GrammarRows, ModuleCards, ModuleSection, grammar } from "./visual-grammar";

describe("visual grammar", () => {
  it("locks homepage display and section sizes", () => {
    expect(grammar.display).toContain("clamp(3.25rem,6vw,4.5rem)");
    expect(grammar.section).toContain("clamp(2.25rem,4vw,2.75rem)");
    expect(grammar.quote).toContain("clamp(1.75rem,2.4vw,2rem)");
    expect(grammar.padLoose).toContain("py-24");
  });

  it("renders an ivory editorial hero with one eyebrow, title, and body", () => {
    const html = renderToStaticMarkup(
      createElement(EditorialHero, {
        eyebrow: "About",
        title: "Private housing guidance before the market gets loud.",
        description: "Judgment, not a louder search.",
      }),
    );
    expect(html).toContain("About");
    expect(html).toContain("Private housing guidance before the market gets loud.");
    expect(html).toContain("Judgment, not a louder search.");
    expect(html).toContain(grammar.display.split(" ")[0]);
  });

  it("renders library rows with shared row titles", () => {
    const html = renderToStaticMarkup(
      createElement(GrammarRows, {
        items: [{ eyebrow: "Coming soon", title: "111 West 57th Street", text: "Scarcity first." }],
      }),
    );
    expect(html).toContain("Coming soon");
    expect(html).toContain("111 West 57th Street");
    expect(html).toContain("Scarcity first.");
    expect(html).toContain(grammar.rowTitle.split(" ")[0]);
  });

  it("aliases white to ivory and offers a navy pause surface", () => {
    const white = renderToStaticMarkup(createElement(ModuleSection, { surface: "white", children: "x" }));
    const pause = renderToStaticMarkup(createElement(ModuleSection, { surface: "pause", children: "x" }));
    expect(white).toContain("bg-brand-ivory");
    expect(white).not.toContain("bg-white");
    expect(pause).toContain("bg-brand-navy/[0.05]");
  });

  it("uses felt gutters instead of boxed white cards", () => {
    const html = renderToStaticMarkup(
      createElement(
        Router,
        { ssrPath: "/" },
        createElement(ModuleCards, { items: [{ label: "First Home", href: "/situations/first-home" }] }),
      ),
    );
    expect(html).toContain("ak-felt-grid");
    expect(html).toContain("ak-felt-item");
    expect(html).not.toContain("bg-white");
  });
});

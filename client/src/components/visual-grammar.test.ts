import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { EditorialHero, grammar } from "./visual-grammar";

describe("visual grammar", () => {
  it("locks homepage display and section sizes", () => {
    expect(grammar.display).toContain("clamp(3.25rem,6vw,4.5rem)");
    expect(grammar.section).toContain("clamp(2.25rem,4vw,2.75rem)");
    expect(grammar.quote).toContain("clamp(1.75rem,2.4vw,2rem)");
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
});

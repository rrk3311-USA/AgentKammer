import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { DecisionFramework } from "./DecisionFramework";

describe("DecisionFramework", () => {
  it("renders numbered steps with one divider grammar", () => {
    const html = renderToStaticMarkup(
      createElement(DecisionFramework, {
        eyebrow: "How We Decide",
        title: "Three questions. Then judgment.",
        description: "Neighborhoods and inventory come later.",
        items: [
          { step: "01", title: "What's changing?", text: "Name the life event." },
          { step: "02", title: "Should anything change?", text: "Doing nothing can be right." },
        ],
      }),
    );

    expect(html).toContain("How We Decide");
    expect(html).toContain("Three questions. Then judgment.");
    expect(html).toContain("01");
    expect(html).toContain("02");
    expect(html).toContain("What&#x27;s changing?");
    expect(html).not.toContain("data-ak-how-we-decide-art");
    expect(html).not.toContain("lg:grid-cols-12");
  });

  it("places optional report art in a one-quarter desktop column", () => {
    const html = renderToStaticMarkup(
      createElement(DecisionFramework, {
        eyebrow: "How We Decide",
        title: "Three questions. Then judgment.",
        items: [{ step: "01", title: "What's changing?", text: "Name the life event." }],
        figure: createElement("svg", { "data-testid": "how-we-decide-art" }),
      }),
    );
    expect(html).toContain("data-ak-how-we-decide-art");
    expect(html).toContain("lg:grid-cols-12");
    expect(html).toContain("lg:col-span-9");
    expect(html).toContain("lg:col-span-3");
    expect(html).toContain("max-w-[11.5rem]");
    expect(html).toContain("Three questions. Then judgment.");
  });

  it("renders optional step actions without a second divider system", () => {
    const html = renderToStaticMarkup(
      createElement(DecisionFramework, {
        eyebrow: "How We Work",
        title: "Four steps. No overlap.",
        description: "Name what changed first.",
        items: [
          {
            step: "01",
            title: "What's Changing?",
            text: "Name the life change.",
            href: undefined,
            cta: "Explore situations",
            onClick: () => undefined,
          },
        ],
      }),
    );
    expect(html).toContain("Explore situations");
    expect(html).toContain("type=\"button\"");
  });
});

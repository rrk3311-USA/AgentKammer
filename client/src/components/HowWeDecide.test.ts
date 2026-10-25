import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { HowWeDecide } from "./HowWeDecide";

describe("HowWeDecide", () => {
  it("sets How We Decide on Platinum Paper with locked copy and no illustration", () => {
    const html = renderToStaticMarkup(createElement(HowWeDecide));

    expect(html).toContain("data-ak-how-we-decide");
    expect(html).toContain("ak-pp-page");
    expect(html).toContain("ak-hwd");
    expect(html).toContain("ak-pp-frame");
    expect(html).toContain("rule-out");
    expect(html).toContain("rule-in");
    expect(html).toContain("How We Decide");
    expect(html).toContain("Three questions. Then judgment.");
    expect(html).toContain("01");
    expect(html).toContain("02");
    expect(html).toContain("03");
    expect(html).toContain("What&#x27;s changing?");
    expect(html).toContain("Should anything change?");
    expect(html).toContain("Where do you belong?");
    expect(html).toContain("Name the life event, pressure, or uncertainty. Neighborhoods and inventory come later.");
    expect(html).toContain("Sometimes the highest-value recommendation is to do nothing.");
    expect(html).toContain("Even if you stay, is the environment still serving the life you want?");
    expect(html).toContain("ak-pp-num");
    expect(html).toContain("ak-pp-sec-label");
    expect(html).toContain("ak-pp-hairline");
    expect(html).toContain("ak-hwd-sheen");
    expect(html).not.toContain("data-ak-how-we-decide-art");
    expect(html).not.toContain("inheritance-housing-nyc");
    expect(html).not.toContain("<svg");
    expect(html).not.toContain("owl");
    expect(html).not.toContain("lg:grid-cols-12");
    expect(html).not.toContain("bg-brand-navy");
  });
});

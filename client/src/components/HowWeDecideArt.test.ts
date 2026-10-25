import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { HOW_WE_DECIDE_ART_PAPER, HOW_WE_DECIDE_ART_SRC, HowWeDecideArt } from "./HowWeDecideArt";

describe("HowWeDecideArt", () => {
  it("reuses a situation-landing graphite drawing on cream paper", () => {
    const html = renderToStaticMarkup(createElement(HowWeDecideArt));
    expect(HOW_WE_DECIDE_ART_SRC).toBe("/images/situations/inheritance-housing-nyc.png");
    expect(HOW_WE_DECIDE_ART_PAPER).toBe("#FDF3DF");
    expect(html).toContain(HOW_WE_DECIDE_ART_SRC);
    expect(html).toContain(HOW_WE_DECIDE_ART_PAPER);
    expect(html).toContain("object-[78%_58%]");
    expect(html).not.toContain("<svg");
    expect(html).not.toContain("owl");
  });
});

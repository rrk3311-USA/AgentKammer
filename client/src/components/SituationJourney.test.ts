import { readFileSync } from "node:fs";
import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import { decisionNavigationGroups } from "@/data/decision-navigation";
import { SituationJourney } from "./SituationJourney";

const changeItems =
  decisionNavigationGroups.find((group) => group.title === "What's Changing?")?.items ?? [];

function render() {
  return renderToStaticMarkup(createElement(Router, { ssrPath: "/" }, createElement(SituationJourney)));
}

describe("SituationJourney", () => {
  it("starts on 01 only and keeps decision pills off Guidance", () => {
    const html = render();
    const source = readFileSync(new URL("./SituationJourney.tsx", import.meta.url), "utf8");
    expect(html).toContain("01");
    expect(html).toContain("What&#x27;s changing?");
    expect(html).not.toContain("What decision are you facing?");
    expect(html).not.toContain("What are you trying to understand?");
    expect(html).not.toContain("Calculate");
    expect(html).not.toContain("Read more");
    expect(source).not.toContain("openDecisionAssistant");
    expect(source).not.toContain("window.location");
    expect(source).toContain("HomeCloseCtas");
    expect(source).toContain("Read more");
    expect(source).toContain("justify-start");
    expect(source).not.toContain("justify-center");
    expect(source).not.toContain("\u2014");
    expect(source).not.toContain("broker");
    expect(source).not.toContain("carousel");
    expect(changeItems.every((item) => item.href !== "/")).toBe(true);
  });

  it("points International Move at a relocation Situation, not /international", () => {
    const move = changeItems.find((item) => item.label === "International Move");
    expect(move?.href).toBe("/situations/international-move-nyc");
    expect(render()).toContain("International Move");
    expect(render()).not.toContain('href="/international"');
  });
});

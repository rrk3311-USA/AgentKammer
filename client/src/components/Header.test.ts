import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import { AgentKammerHorizontalLogo } from "./AgentKammerHorizontalLogo";
import { Header } from "./Header";

describe("sticky public header", () => {
  it("tightens the mobile lockup and leaves the desktop lockup unchanged", () => {
    const html = renderToStaticMarkup(createElement(AgentKammerHorizontalLogo, { variant: "light", emphasis: "header" }));
    expect(html).toContain("h-[2.55rem]");
    expect(html).toContain("text-[1.23rem]");
    expect(html).toContain("sm:h-[3.25rem]");
    expect(html).toContain("xl:h-[3.75rem]");
    expect(html).toContain("sm:text-[1.75rem]");
    expect(html).toContain("xl:text-[2.1rem]");
    expect(html).not.toContain("h-12");
    expect(html).not.toContain("text-[1.45rem]");
  });

  it("keeps a 44px menu mark, left-aligned logo, and tighter mobile chrome", () => {
    const html = renderToStaticMarkup(createElement(Router, { ssrPath: "/" }, createElement(Header)));
    expect(html).toContain("ak-header-shell sticky top-0");
    expect(html).toContain("min-h-16");
    expect(html).toContain("sm:min-h-0");
    expect(html).toContain("px-4 py-2.5");
    expect(html).toContain("sm:px-6");
    expect(html).toContain("lg:px-8");
    expect(html).toContain("xl:px-10");
    expect(html).toContain("h-11 w-11");
    expect(html).toContain("data-testid=\"button-mobile-menu\"");
    expect(html).toContain("#E5E4E2");
    expect(html).not.toContain("border-[#D8D1C7]/80");
    expect(html).not.toContain("h-5 w-5");
    expect(html).toContain("justify-self-start");
    expect(html).toContain("data-testid=\"button-header-guidance\"");
    expect(html).toContain("href=\"/\"");
    expect(html).toContain(">Home<");
    expect(html).toContain("Start Here");
    expect(html).toContain("Guides");
    expect(html).toContain("Interactive Tools");
    expect(html).toContain("Contact");
    expect(html).not.toContain("Building Reports");
    expect(html).not.toContain("data-testid=\"button-header-tools\"");
    expect(html).not.toContain("Calculator");
    expect(html).not.toContain("Wheel of Life");
    expect(html).not.toContain("All tools");
    expect(html).not.toMatch(/data-testid="button-header-guidance"[^>]*href=/);
    expect(html).not.toContain("/tools/livability");
    expect(html).not.toContain("/tools/communication-map");
  });
});

import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import { CompactSiteHeader } from "./CompactSiteHeader";
import { Header } from "./Header";

describe("compact sticky site header", () => {
  it("keeps a 52px midnight bar, AK only on the left, and a platinum hamburger at every breakpoint", () => {
    const html = renderToStaticMarkup(
      createElement(Router, { ssrPath: "/tools/wheel-of-life/" }, createElement(CompactSiteHeader)),
    );
    expect(html).toContain("ak-compact-header");
    expect(html).toContain("sticky");
    expect(html).toContain('aria-label="Agent Kammer home"');
    expect(html).toContain("/brand/ak-monogram-ivory.png");
    expect(html).not.toMatch(/>Agent Kammer</);
    expect(html).toContain("h-11 w-11");
    expect(html).toContain("#E5E4E2");
    expect(html).toContain('aria-label="Open menu"');
    expect(html).not.toContain("lg:hidden");
    expect(html).toContain("print:hidden");
  });

  it("is the compact Header variant so static tools and the SPA can share it", () => {
    const html = renderToStaticMarkup(
      createElement(Router, { ssrPath: "/tools" }, createElement(Header, { compact: true })),
    );
    expect(html).toContain('data-testid="compact-site-header"');
    expect(html).not.toContain("ak-header-shell sticky top-0");
  });
});

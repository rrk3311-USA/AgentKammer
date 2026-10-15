import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MobileMenuToggle } from "./MobileMenuToggle";

describe("MobileMenuToggle", () => {
  it("uses a 44px tap target, limestone ring, and staggered bars when closed", () => {
    const html = renderToStaticMarkup(createElement(MobileMenuToggle, { open: false, onToggle: () => {} }));
    expect(html).toContain("h-11 w-11");
    expect(html).toContain("border-[#D8D1C7]/80");
    expect(html).toContain("w-[18px]");
    expect(html).toContain("w-[10px]");
    expect(html).toContain("w-[14px]");
    expect(html).toContain('aria-label="Open menu"');
    expect(html).toContain("aria-expanded=\"false\"");
    expect(html).not.toContain("rotate-45");
    expect(html).not.toContain("bg-brand-gold");
    expect(html).not.toContain("bg-brand-brass");
  });

  it("morphs the bars into an X when open", () => {
    const html = renderToStaticMarkup(createElement(MobileMenuToggle, { open: true, onToggle: () => {} }));
    expect(html).toContain("rotate-45");
    expect(html).toContain("-rotate-45");
    expect(html).toContain("opacity-0");
    expect(html).toContain('aria-label="Close menu"');
    expect(html).toContain("aria-expanded=\"true\"");
  });
});

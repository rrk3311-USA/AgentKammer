import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MobileMenuToggle } from "./MobileMenuToggle";

describe("MobileMenuToggle", () => {
  it("uses a 44px tap target, no ring, and larger platinum staggered bars when closed", () => {
    const html = renderToStaticMarkup(createElement(MobileMenuToggle, { open: false, onToggle: () => {} }));
    expect(html).toContain("h-11 w-11");
    expect(html).toContain("#E5E4E2");
    expect(html).toContain("w-6");
    expect(html).toContain("w-[14px]");
    expect(html).toContain("w-5");
    expect(html).toContain('aria-label="Open menu"');
    expect(html).toContain("aria-expanded=\"false\"");
    expect(html).not.toContain("border-[#D8D1C7]");
    expect(html).not.toContain("rotate-45");
    expect(html).not.toContain("bg-brand-gold");
    expect(html).not.toContain("bg-brand-brass");
    expect(html).not.toContain("#B08D57");
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

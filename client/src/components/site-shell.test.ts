import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CTA, sameCtaPhrase } from "./site-shell";

describe("CTA button copy", () => {
  it("treats matching eyebrow and label as the same phrase", () => {
    expect(sameCtaPhrase("Property Assessment", "PROPERTY ASSESSMENT")).toBe(true);
    expect(sameCtaPhrase("Start Here.", "Start Here")).toBe(true);
    expect(sameCtaPhrase("Contact", "Write")).toBe(false);
  });

  it("does not repeat a matching gold eyebrow on the navy button", () => {
    const html = renderToStaticMarkup(
      createElement(CTA, {
        title: "Need judgment on an address?",
        description: "Share timing and budget.",
        href: "#property",
        label: "Property Assessment",
        eyebrow: "Property Assessment",
      }),
    );
    expect(html.match(/Property Assessment/g)?.length).toBe(2);
    expect(html).not.toContain("tracking-[0.24em] text-brand-brass");
    expect(html).toContain("text-[14px]");
  });

  it("keeps a distinct button eyebrow when the label differs", () => {
    const html = renderToStaticMarkup(
      createElement(CTA, {
        title: "When you want a human reply.",
        description: "Write only if a session is already the next step.",
        href: "#request-call",
        label: "Write",
        eyebrow: "Contact",
      }),
    );
    expect(html).toContain("Contact");
    expect(html).toContain("Write");
    expect(html).toContain("tracking-[0.24em] text-brand-brass");
  });
});

import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import { CTA, sameCtaPhrase } from "./site-shell";

describe("CTA button copy", () => {
  it("treats matching eyebrow and label as the same phrase", () => {
    expect(sameCtaPhrase("Property Assessment", "PROPERTY ASSESSMENT")).toBe(true);
    expect(sameCtaPhrase("Start Here.", "Start Here")).toBe(true);
    expect(sameCtaPhrase("Contact", "Contact")).toBe(true);
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

  it("uses a single Contact label without a gold eyebrow or Email button", () => {
    const html = renderToStaticMarkup(
      createElement(CTA, {
        title: "Get in touch",
        description: "Work through the steps, starting with your Situation, for a clear recommendation, or write to us directly.",
        href: "#contact",
        label: "Contact",
        eyebrow: "Contact",
        showEyebrow: false,
      }),
    );
    expect(html).toContain("Get in touch");
    expect(html).not.toContain("Livability");
    expect(html).toContain("<span>Contact</span>");
    expect(html).not.toContain("<span>Write</span>");
    expect(html).not.toContain("Email Agent Kammer");
    expect(html).not.toContain("tracking-[0.24em] text-brand-brass");
    expect(html).toContain("text-[14px]");
  });

  it("shrinks the compact homepage Contact button without dropping the stripe class", () => {
    const html = renderToStaticMarkup(
      createElement(
        Router,
        { ssrPath: "/" },
        createElement(CTA, {
          title: "Get in touch",
          description: "Write to us directly.",
          href: "/contact",
          label: "Contact",
          eyebrow: "Contact",
          showEyebrow: false,
          compact: true,
          tone: "ivory",
        }),
      ),
    );
    expect(html).toContain("ak-call-button");
    expect(html).toContain("px-3.5 py-2");
    expect(html).toContain("text-[11px]");
    expect(html).toContain("py-6 lg:py-8");
    expect(html).toContain("bg-brand-ivory text-brand-ink");
    expect(html).not.toContain("px-5 py-4");
    expect(html).not.toContain("sm:min-w-[16rem]");
  });

  it("keeps the deep-navy closer and a quieter Guidance text link", () => {
    const html = renderToStaticMarkup(
      createElement(
        Router,
        { ssrPath: "/situations/executive-relocation-nyc" },
        createElement(CTA, {
          title: "If this situation is yours.",
          description: "The next step is the Situation Assessment.",
          href: "/belonging",
          label: "Situation Assessment",
          eyebrow: "Situation Assessment",
          guidanceLabel: "Prefer to talk it through? Open Guidance →",
          onGuidanceClick: () => undefined,
        }),
      ),
    );
    expect(html).toContain("bg-brand-navy");
    expect(html).toContain("href=\"/belonging\"");
    expect(html).toContain("<span>Situation Assessment</span>");
    expect(html).toContain("Prefer to talk it through? Open Guidance →");
    expect(html).not.toContain("Find out if you belong");
  });
});

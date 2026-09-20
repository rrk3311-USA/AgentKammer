import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import ServiceLanding from "./ServiceLanding";

function renderSlug(slug: string) {
  return renderToStaticMarkup(
    createElement(Router, { ssrPath: `/situations/${slug}` }, createElement(ServiceLanding, { slug })),
  );
}

describe("Situation page CTAs", () => {
  it("keeps one navy Assessment closer and no upper Assessment button", () => {
    const html = renderSlug("executive-relocation-nyc");
    expect(html.match(/href="\/belonging"/g)).toEqual(["href=\"/belonging\""]);
    expect(html).toContain("bg-brand-navy");
    expect(html).toContain("<span>Situation Assessment</span>");
    expect(html).toContain("Prefer to talk it through? Open Guidance →");
    expect(html).toContain("What Decision Are You Facing?");
    expect(html).toContain("Explore this decision with Guidance.");
    expect(html).toContain("bg-brand-navy-secondary/15");
    expect(html).toContain("Open Guidance: I&#x27;m considering buying.");
    expect(html).toContain("Open Guidance: I&#x27;m wondering whether I should stay where I am.");
    expect(html).toContain("Open Guidance: I&#x27;m considering waiting before making a move.");
    expect(html).not.toContain("Find out if you belong");
    expect(html).not.toContain("Request a Situation Assessment");
    expect(html).not.toContain("href=\"/buy\"");
    expect(html).not.toContain("href=\"/rent\"");
    expect(html).not.toContain("href=\"/wait\"");
  });

  it("uses the same closer on a second situation slug", () => {
    const html = renderSlug("first-home-buyers-nyc");
    expect(html.match(/href="\/belonging"/g)).toEqual(["href=\"/belonging\""]);
    expect(html).toContain("bg-brand-navy");
    expect(html).toContain("<span>Situation Assessment</span>");
    expect(html).not.toContain("Find out if you belong");
  });
});

import { describe, expect, it } from "vitest";
import { primaryNav } from "@/components/site-shell";
import { decisionNavigationGroups } from "./decision-navigation";
import { FOOTER_DARK_LINKS, FOOTER_DARK_TAIL_LINKS, getSiteMapGroups } from "./site-map";
import {
  CONTACT_NEXT_STEPS,
  FOOTER_SITEMAP_QUIET,
  KAMMER_VERDICTS,
  PUBLIC_PRODUCTS,
  resolvePublicIntent,
} from "./public-menu";

describe("public menu lock", () => {
  it("exposes exactly the five locked products", () => {
    expect(Object.keys(PUBLIC_PRODUCTS)).toEqual([
      "guidance",
      "situation",
      "property",
      "livability",
      "strategy",
    ]);
    expect([...CONTACT_NEXT_STEPS]).toEqual([
      "Guidance",
      "Situation Assessment",
      "Property Assessment",
      "Livability Score",
      "Strategy Session",
    ]);
  });

  it("maps legacy belonging intent to Situation Assessment", () => {
    expect(resolvePublicIntent("belonging")).toBe("situation");
    expect(resolvePublicIntent("situation")).toBe("situation");
    expect(resolvePublicIntent("property")).toBe("property");
    expect(resolvePublicIntent("unknown")).toBeNull();
  });

  it("keeps show verdicts without numeric scores", () => {
    expect([...KAMMER_VERDICTS]).toEqual(["Pick", "Consider", "Wait", "Pass"]);
  });

  it("locks primary header nav to six short labels", () => {
    expect(primaryNav.map((item) => [item.label, item.href])).toEqual([
      ["Home", "/"],
      ["Start Here", "/buyer-advisory"],
      ["Situations", "/situations"],
      ["Buildings", "/building-reports"],
      ["Guides", "/guides"],
      ["About", "/about"],
    ]);
  });

  it("keeps sitemap quiet links off the header", () => {
    expect(FOOTER_SITEMAP_QUIET.map((item) => [item.label, item.href])).toEqual([
      ["Get Qualified", "/qualify"],
      ["Hub", "/hub"],
      ["Tools", "/tools"],
      ["Contact", "/contact"],
      ["Intelligence", "/intelligence"],
    ]);
    const headerHrefs = new Set(primaryNav.map((item) => item.href));
    for (const item of FOOTER_SITEMAP_QUIET) {
      expect(headerHrefs.has(item.href)).toBe(false);
    }
  });

  it("puts one Sitemap link in the dark footer and keeps Licenses off it", () => {
    const sitemapLinks = FOOTER_DARK_LINKS.filter((item) => item.href === "/sitemap");
    expect(sitemapLinks).toEqual([{ label: "Sitemap", href: "/sitemap" }]);
    expect(FOOTER_DARK_TAIL_LINKS.map((item) => [item.label, item.href])).toEqual([
      ["Terms", "/terms"],
      ["Contact", "/contact"],
      ["Sitemap", "/sitemap"],
    ]);
    expect(FOOTER_DARK_LINKS.slice(-3)).toEqual([...FOOTER_DARK_TAIL_LINKS]);
    expect(FOOTER_DARK_LINKS.some((item) => item.href === "/licenses")).toBe(false);
    expect(FOOTER_DARK_LINKS.some((item) => item.label.toLowerCase() === "licenses")).toBe(false);
  });

  it("keeps Sitemap off the ivory What's Changing nav", () => {
    const whatsChanging = decisionNavigationGroups.find((group) => group.title === "What's Changing?");
    expect(whatsChanging?.items.some((item) => item.href === "/sitemap")).toBe(false);
    expect(whatsChanging?.items.some((item) => item.label.toLowerCase() === "sitemap")).toBe(false);
  });

  it("exposes a judgment-first HTML sitemap with licenses only on the page", () => {
    const groups = getSiteMapGroups();
    expect(groups.some((group) => group.title === "Site map")).toBe(false);
    const legal = groups.find((group) => group.title === "Legal");
    expect(legal?.items.map((item) => item.href)).toEqual(["/privacy", "/terms", "/licenses"]);
    expect(groups[0]?.items.map((item) => item.href)).toEqual(primaryNav.map((item) => item.href));
  });
});

import { describe, expect, it } from "vitest";
import { primaryNav } from "@/components/site-shell";
import { decisionNavigationGroups } from "./decision-navigation";
import {
  FOOTER_DARK_LINKS,
  FOOTER_DARK_META,
  FOOTER_DARK_NAV,
  FOOTER_POPULAR_LINKS,
  FOOTER_WHATS_CHANGING_PREVIEW_LABELS,
  getSiteMapGroups,
} from "./site-map";
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

  it("locks primary header nav to five short labels", () => {
    expect(primaryNav.map((item) => [item.label, item.href])).toEqual([
      ["Home", "/"],
      ["Start Here", "/buyer-advisory"],
      ["Situations", "/situations"],
      ["Guides", "/guides"],
      ["About", "/about"],
    ]);
    expect(primaryNav.some((item) => item.label === "Buildings")).toBe(false);
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

  it("keeps the charcoal footer quiet: doors, then Contact · Privacy · Terms", () => {
    expect(FOOTER_DARK_NAV.map((item) => [item.label, item.href])).toEqual([
      ["Start Here", "/buyer-advisory"],
      ["Situations", "/situations"],
      ["Guides", "/guides"],
      ["About", "/about"],
    ]);
    expect(FOOTER_DARK_META.map((item) => [item.label, item.href])).toEqual([
      ["Contact", "/contact"],
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
    ]);
    expect(FOOTER_DARK_LINKS).toEqual([...FOOTER_DARK_NAV, ...FOOTER_DARK_META]);
    expect(FOOTER_DARK_LINKS.filter((item) => item.label === "Guides")).toHaveLength(1);
    expect(FOOTER_DARK_LINKS.some((item) => item.href === "/sitemap")).toBe(false);
    expect(FOOTER_DARK_LINKS.some((item) => item.href === "/intelligence")).toBe(false);
    expect(FOOTER_DARK_LINKS.some((item) => item.href === "/account")).toBe(false);
    expect(FOOTER_DARK_LINKS.some((item) => item.label.includes("Assessment"))).toBe(false);
    expect(FOOTER_DARK_LINKS.some((item) => item.label === "Strategy Session")).toBe(false);
    expect(FOOTER_DARK_LINKS.some((item) => item.href === "/licenses")).toBe(false);
    expect(FOOTER_DARK_LINKS.some((item) => item.label.toLowerCase() === "email")).toBe(false);
  });

  it("limits the ivory footer to a short What's Changing set and four Popular links", () => {
    expect([...FOOTER_WHATS_CHANGING_PREVIEW_LABELS]).toEqual([
      "Executive Relocation",
      "First Home",
      "Growing Family",
      "Marriage",
      "International Move",
    ]);
    expect(FOOTER_WHATS_CHANGING_PREVIEW_LABELS.length).toBeLessThan(12);
    expect(FOOTER_POPULAR_LINKS.map((item) => [item.label, item.href])).toEqual([
      ["Rent vs Buy", "/situations/rent-vs-buy-manhattan-relocation"],
      ["NYC Relocation", "/situations/executive-relocation-nyc"],
      ["Neighborhoods", "/guides#neighborhoods"],
      ["Kammer Report", "/guides#kammer-report"],
    ]);
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
    expect(groups.some((group) => group.title === "Building library")).toBe(false);
    const doors = groups.flatMap((group) => group.items);
    expect(doors.some((item) => item.label === "Buildings")).toBe(false);
    expect(doors.some((item) => item.label === "Overview" && item.href === "/building-reports")).toBe(false);
    expect(doors.some((item) => item.label === "Market Briefs")).toBe(false);
  });
});

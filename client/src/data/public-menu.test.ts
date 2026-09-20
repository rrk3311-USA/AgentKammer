import { describe, expect, it } from "vitest";
import { guidesLibraryNav, primaryNav } from "@/components/site-shell";
import { decisionNavigationGroups } from "./decision-navigation";
import {
  FOOTER_DARK_LINKS,
  FOOTER_DARK_META,
  FOOTER_DARK_NAV,
  getSiteMapGroups,
} from "./site-map";
import {
  CONTACT_NEXT_STEPS,
  FOOTER_SITEMAP_QUIET,
  GET_QUALIFIED,
  KAMMER_VERDICTS,
  PUBLIC_PRODUCTS,
  SHELVED_OFFERS,
  resolvePublicIntent,
  resolveShelvedIntent,
} from "./public-menu";

describe("public menu lock", () => {
  it("exposes exactly the four locked public products", () => {
    expect(Object.keys(PUBLIC_PRODUCTS)).toEqual([
      "guidance",
      "situation",
      "property",
      "livability",
    ]);
    expect([...CONTACT_NEXT_STEPS]).toEqual([
      "Guidance",
      "Situation Assessment",
      "Property Assessment",
      "Livability Score",
    ]);
    expect(Object.keys(PUBLIC_PRODUCTS)).not.toContain("strategy");
    expect(CONTACT_NEXT_STEPS).not.toContain("Strategy Session");
    expect(CONTACT_NEXT_STEPS).not.toContain("Get Qualified");
  });

  it("keeps Strategy Session shelved and Get Qualified as a footer onboard tool", () => {
    expect(SHELVED_OFFERS.strategy.label).toBe("Strategy Session");
    expect(SHELVED_OFFERS.strategy.href).toBe("/contact?intent=strategy");
    expect(Object.keys(SHELVED_OFFERS)).toEqual(["strategy"]);
    expect(GET_QUALIFIED).toEqual({ label: "Get Qualified", href: "/qualify" });
    expect(resolvePublicIntent("strategy")).toBeNull();
    expect(resolveShelvedIntent("strategy")).toBe("strategy");
    expect(resolvePublicIntent("qualify")).toBeNull();
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

  it("locks primary header nav to Home · Start Here · Guides · Contact", () => {
    expect(primaryNav.map((item) => [item.label, item.href])).toEqual([
      ["Home", "/"],
      ["Start Here", "/situations"],
      ["Guides", "/guides"],
      ["Contact", "/contact"],
    ]);
    expect(primaryNav.some((item) => item.label === "Situations")).toBe(false);
    expect(primaryNav.some((item) => item.label === "Buildings")).toBe(false);
    expect(primaryNav.some((item) => item.label === "About")).toBe(false);
    expect(primaryNav.some((item) => item.href === "/buyer-advisory")).toBe(false);
  });

  it("keeps Guides selector as Decision Guides · Neighborhoods · Property Assessment", () => {
    expect(guidesLibraryNav.map((item) => [item.label, item.href])).toEqual([
      ["Decision Guides", "/guides#decision-guides"],
      ["Neighborhoods", "/guides#neighborhoods"],
      ["Property Assessment", "/guides#kammer-report"],
    ]);
    expect(guidesLibraryNav.some((item) => item.label === "Kammer Report")).toBe(false);
    expect(guidesLibraryNav.some((item) => item.label === "Buildings")).toBe(false);
  });

  it("keeps sitemap quiet links off the header", () => {
    expect(FOOTER_SITEMAP_QUIET.map((item) => [item.label, item.href])).toEqual([
      ["Get Qualified", "/qualify"],
      ["Hub", "/hub"],
      ["Tools", "/tools"],
      ["Intelligence", "/intelligence"],
    ]);
    expect(FOOTER_SITEMAP_QUIET.some((item) => item.href === "/qualify")).toBe(true);
    const headerHrefs = new Set(primaryNav.map((item) => item.href));
    for (const item of FOOTER_SITEMAP_QUIET) {
      expect(headerHrefs.has(item.href)).toBe(false);
    }
  });

  it("keeps the charcoal footer quiet: doors, then Contact · Privacy · Terms", () => {
    expect(FOOTER_DARK_NAV.map((item) => [item.label, item.href])).toEqual([
      ["Start Here", "/situations"],
      ["Guides", "/guides"],
      ["About", "/about"],
      ["Get Qualified", "/qualify"],
    ]);
    expect(FOOTER_DARK_META.map((item) => [item.label, item.href])).toEqual([
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
      ["Contact", "/contact"],
    ]);
    expect(FOOTER_DARK_LINKS).toEqual([...FOOTER_DARK_NAV, ...FOOTER_DARK_META]);
    expect(FOOTER_DARK_LINKS.filter((item) => item.label === "Guides")).toHaveLength(1);
    expect(FOOTER_DARK_LINKS.some((item) => item.label === "Situations")).toBe(false);
    expect(FOOTER_DARK_LINKS.some((item) => item.href === "/sitemap")).toBe(false);
    expect(FOOTER_DARK_LINKS.some((item) => item.href === "/intelligence")).toBe(false);
    expect(FOOTER_DARK_LINKS.some((item) => item.href === "/account")).toBe(false);
    expect(FOOTER_DARK_LINKS.some((item) => item.label.includes("Assessment"))).toBe(false);
    expect(FOOTER_DARK_LINKS.some((item) => item.label === "Strategy Session")).toBe(false);
    expect(FOOTER_DARK_LINKS.filter((item) => item.label === "Get Qualified")).toHaveLength(1);
    expect(FOOTER_DARK_LINKS.some((item) => item.href === "/qualify")).toBe(true);
    expect(FOOTER_DARK_LINKS.some((item) => item.href === "/licenses")).toBe(false);
    expect(FOOTER_DARK_LINKS.some((item) => item.label.toLowerCase() === "email")).toBe(false);
  });

  it("keeps the full What's Changing set in the ivory footer and no Popular row", () => {
    const whatsChanging = decisionNavigationGroups.find((group) => group.title === "What's Changing?");
    expect(whatsChanging?.items.map((item) => item.label)).toEqual([
      "Executive Relocation",
      "First Home",
      "Growing Family",
      "Marriage",
      "Retirement",
      "Empty Nest",
      "Aging Parents",
      "Inheritance",
      "Divorce",
      "Remote Work",
      "Job Change",
      "International Move",
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
    expect(doors.filter((item) => item.label === "Situations")).toHaveLength(0);
    expect(doors.some((item) => item.label === "Overview" && item.href === "/building-reports")).toBe(false);
    expect(doors.some((item) => item.label === "Market Briefs")).toBe(false);
    expect(doors.some((item) => item.label === "Kammer Report")).toBe(false);
    expect(doors.some((item) => item.label === "Strategy Session")).toBe(false);
    expect(doors.filter((item) => item.label === "Get Qualified")).toHaveLength(1);
    expect(doors.some((item) => item.href === "/qualify")).toBe(true);
    expect(doors.some((item) => item.href === "/contact?intent=strategy")).toBe(false);
    const guides = groups.find((group) => group.title === "Guides");
    expect(guides?.items.map((item) => item.label).slice(0, 3)).toEqual([
      "Decision Guides",
      "Neighborhoods",
      "Property Assessment",
    ]);
  });
});

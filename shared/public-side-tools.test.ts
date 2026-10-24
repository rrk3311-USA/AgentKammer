import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  flagValueIsOn,
  isPublicSideApiPath,
  isPublicSideToolPage,
  publicSideToolsEnabled,
  publicSideToolsEnabledFrom,
  PUBLIC_SIDE_TOOL_HREFS,
} from "./public-side-tools";

describe("public side tools flag", () => {
  it("defaults off and turns on only for explicit truthy values", () => {
    expect(publicSideToolsEnabledFrom({})).toBe(false);
    expect(publicSideToolsEnabledFrom({ AK_PUBLIC_SIDE_TOOLS: "" })).toBe(false);
    expect(publicSideToolsEnabledFrom({ AK_PUBLIC_SIDE_TOOLS: "0" })).toBe(false);
    expect(publicSideToolsEnabledFrom({ AK_PUBLIC_SIDE_TOOLS: "false" })).toBe(false);
    expect(publicSideToolsEnabledFrom({ AK_PUBLIC_SIDE_TOOLS: "1" })).toBe(true);
    expect(publicSideToolsEnabledFrom({ AK_PUBLIC_SIDE_TOOLS: "true" })).toBe(true);
    expect(publicSideToolsEnabledFrom({ AK_PUBLIC_SIDE_TOOLS: "ON" })).toBe(true);
    expect(publicSideToolsEnabledFrom({ VITE_AK_PUBLIC_SIDE_TOOLS: "yes" })).toBe(true);
    expect(flagValueIsOn("on")).toBe(true);
    expect(publicSideToolsEnabledFrom(process.env)).toBe(publicSideToolsEnabled());
  });

  it("names the Livability and Decision Guide pages and APIs", () => {
    expect(PUBLIC_SIDE_TOOL_HREFS).toEqual(["/tools/livability/", "/tools/communication-map"]);
    expect(isPublicSideToolPage("/tools/livability/")).toBe(true);
    expect(isPublicSideToolPage("/tools/livability/harness.html")).toBe(true);
    expect(isPublicSideToolPage("/tools/communication-map?x=1")).toBe(true);
    expect(isPublicSideToolPage("/tools/wheel-of-life/")).toBe(false);
    expect(isPublicSideToolPage("/contact?intent=livability")).toBe(false);
    expect(isPublicSideApiPath("/api/decision-guide/chat")).toBe(true);
    expect(isPublicSideApiPath("/api/decision-assistant/conversation")).toBe(true);
    expect(isPublicSideApiPath("/api/decision-assistant/conversation/abc")).toBe(true);
    expect(isPublicSideApiPath("/api/livability/vision-status")).toBe(true);
    expect(isPublicSideApiPath("/api/livability/read-plan")).toBe(true);
    expect(isPublicSideApiPath("/api/contact")).toBe(false);
  });

  it("keeps both tools out of the public sitemaps", () => {
    const sitemap = readFileSync(new URL("../client/public/sitemap.xml", import.meta.url), "utf8");
    const index = readFileSync(new URL("../client/public/sitemap-index.xml", import.meta.url), "utf8");
    const robots = readFileSync(new URL("../client/public/robots.txt", import.meta.url), "utf8");
    for (const href of ["/tools/livability", "/tools/communication-map", "/decision-guide", "/decision-assistant"]) {
      expect(sitemap).not.toContain(href);
      expect(index).not.toContain(href);
    }
    expect(robots).toContain("Disallow: /tools/livability");
    expect(robots).toContain("Disallow: /tools/communication-map");
  });
});

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { isBrandHomePath, isBrandHomeProductionHost, isSideHomePath } from "./brand-home-gate";

describe("brand homepage gate", () => {
  it("404s only the public production hosts", () => {
    expect(isBrandHomeProductionHost("agentkammer.com")).toBe(true);
    expect(isBrandHomeProductionHost("www.agentkammer.com")).toBe(true);
    expect(isBrandHomeProductionHost("WWW.AGENTKAMMER.COM")).toBe(true);
    expect(isBrandHomeProductionHost("www.agentkammer.com:443")).toBe(true);
    expect(isBrandHomeProductionHost("www.agentkammer.com.")).toBe(true);
    expect(isBrandHomeProductionHost("localhost")).toBe(false);
    expect(isBrandHomeProductionHost("localhost:5000")).toBe(false);
    expect(isBrandHomeProductionHost("127.0.0.1")).toBe(false);
    expect(isBrandHomeProductionHost("agentkammer-git-cursor-brand-homepage-8518.vercel.app")).toBe(false);
    expect(isBrandHomeProductionHost("agentkammer.vercel.app")).toBe(false);
    expect(isBrandHomeProductionHost("preview.agentkammer.com")).toBe(false);
    expect(isBrandHomeProductionHost("")).toBe(false);
    expect(isBrandHomeProductionHost(null)).toBe(false);
  });

  it("matches the side route only", () => {
    expect(isBrandHomePath("/home-brand")).toBe(true);
    expect(isBrandHomePath("/home-brand/")).toBe(true);
    expect(isBrandHomePath("/home-brand?preview=1")).toBe(true);
    expect(isBrandHomePath("/")).toBe(false);
    expect(isBrandHomePath("/home")).toBe(false);
    expect(isBrandHomePath("/home-brand/extra")).toBe(false);
  });

  it("stays out of the public sitemap", () => {
    const sitemap = readFileSync("client/public/sitemap.xml", "utf8");
    expect(sitemap).not.toContain("home-brand");
    expect(sitemap).not.toContain("home-v3");
    const robots = readFileSync("client/public/robots.txt", "utf8");
    expect(robots).toContain("Disallow: /home-brand");
    expect(robots).toContain("Disallow: /home-v3");
  });

  it("treats both side homepages as gated routes", () => {
    expect(isSideHomePath("/home-brand")).toBe(true);
    expect(isSideHomePath("/home-v3")).toBe(true);
    expect(isSideHomePath("/home-v3/")).toBe(true);
    expect(isSideHomePath("/home-v3?preview=1")).toBe(true);
    expect(isSideHomePath("/")).toBe(false);
    expect(isSideHomePath("/home")).toBe(false);
    expect(isBrandHomePath("/home-v3")).toBe(false);
  });
});

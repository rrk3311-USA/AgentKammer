import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import Articles from "@/pages/Articles";
import { primaryNav } from "@/components/site-shell";
import { mobileFieldNav } from "@/data/mobile-nav";
import { getSiteMapGroups } from "@/data/site-map";
import { articles, publishedArticles, type Article } from "./articles";

describe("Articles", () => {
  it("publishes nothing and keeps drafts off the index", () => {
    expect(publishedArticles()).toEqual([]);
    expect(articles.some((article) => /blog/i.test(article.slug) || /blog/i.test(article.title))).toBe(false);
    expect(articles.some((article) => /lights that lit the stars/i.test(article.title))).toBe(false);

    const fixture: Article[] = [
      {
        slug: "lights-that-lit-the-stars",
        title: "Lights That Lit the Stars",
        dek: "Carousel copy stays unpublished.",
        status: "draft",
      },
      {
        slug: "a-public-piece",
        title: "A public piece",
        dek: "Ready.",
        status: "published",
      },
    ];
    expect(publishedArticles(fixture).map((article) => article.slug)).toEqual(["a-public-piece"]);
  });

  it("is a top-level destination, not a chapter of Guides or Insights", () => {
    expect(primaryNav.map((item) => [item.label, item.href])).toContainEqual(["Articles", "/articles"]);
    expect(primaryNav.some((item) => /blog/i.test(item.label) || /blog/i.test(item.href))).toBe(false);

    const articlesDoor = mobileFieldNav.find((item) => item.id === "articles");
    expect(articlesDoor).toEqual({ id: "articles", label: "Articles", href: "/articles" });
    const guides = mobileFieldNav.find((item) => item.id === "guides");
    const nested = JSON.stringify(guides?.children ?? []);
    expect(nested).not.toContain("/articles");
    expect(nested.toLowerCase()).not.toContain("blog");

    const groups = getSiteMapGroups();
    for (const title of ["Guides", "Advisory", "What's Changing?"]) {
      const group = groups.find((item) => item.title === title);
      expect(group?.items.some((item) => item.href === "/articles" || item.href.startsWith("/articles/"))).toBe(false);
    }
    expect(groups[0]?.items.some((item) => item.label === "Articles" && item.href === "/articles")).toBe(true);
  });

  it("renders an empty Articles index without calling it a blog", () => {
    const html = renderToStaticMarkup(
      createElement(Router, { ssrPath: "/articles" }, createElement(Articles)),
    );
    expect(html).toContain('data-testid="page-articles"');
    expect(html).toContain("Nothing is published yet.");
    expect(html).toContain(">Articles<");
    expect(html.toLowerCase()).not.toContain("blog");
    expect(html).not.toContain("Lights That Lit the Stars");
    expect(html).not.toContain('href="/articles/');
  });
});

import { useEffect } from "react";

type PageMetadata = {
  title: string;
  description: string;
  path?: string;
  keywords?: string;
  locale?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`;
  let element = document.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let element = document.querySelector(selector) as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    if (hreflang) element.hreflang = hreflang;
    document.head.appendChild(element);
  }

  element.href = href;
}

function upsertStructuredData(data: Record<string, unknown> | Record<string, unknown>[]) {
  const id = "page-structured-data";
  let element = document.getElementById(id) as HTMLScriptElement | null;

  if (!element) {
    element = document.createElement("script");
    element.id = id;
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
}

export function usePageMetadata({ title, description, path, keywords, locale = "en", structuredData }: PageMetadata) {
  useEffect(() => {
    const fullTitle = title.includes("Agent Kammer") ? title : `${title} | Agent Kammer`;

    document.title = fullTitle;
    document.documentElement.lang = locale;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:locale", locale === "en" ? "en_US" : locale);

    if (keywords) {
      upsertMeta("name", "keywords", keywords);
    }

    if (path) {
      const url = `https://www.agentkammer.com${path}`;
      upsertMeta("property", "og:url", url);
      upsertLink("canonical", url);
      upsertLink("alternate", url, "en");
      upsertLink("alternate", url, "x-default");
    }

    if (structuredData) {
      upsertStructuredData(structuredData);
    }
  }, [title, description, path, keywords, locale, structuredData]);
}

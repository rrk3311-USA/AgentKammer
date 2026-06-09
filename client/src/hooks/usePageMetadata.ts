import { useEffect } from "react";

type PageMetadata = {
  title: string;
  description: string;
  path?: string;
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

export function usePageMetadata({ title, description, path }: PageMetadata) {
  useEffect(() => {
    const fullTitle = title.includes("Agent Kammer") ? title : `${title} | Agent Kammer`;

    document.title = fullTitle;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);

    if (path) {
      const url = `https://www.agentkammer.com${path}`;
      upsertMeta("property", "og:url", url);

      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = url;
    }
  }, [title, description, path]);
}

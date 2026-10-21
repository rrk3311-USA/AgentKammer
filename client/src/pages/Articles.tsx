import React from "react";
import { Link } from "wouter";
import { PageHero, PageSection } from "@/components/site-shell";
import { grammar } from "@/components/visual-grammar";
import { publishedArticles } from "@/data/articles";
import { usePageMetadata } from "@/hooks/usePageMetadata";

export default function Articles() {
  const published = publishedArticles();

  usePageMetadata({
    title: "Articles",
    description: "Articles from Agent Kammer. Longer writing, published when it is ready to stand on its own.",
    path: "/articles",
  });

  return (
    <main className="bg-brand-ivory" data-testid="page-articles">
      <PageHero
        eyebrow="Articles"
        title="Articles"
        description="Longer writing from Agent Kammer. Pieces appear here when they are ready to stand on their own."
        art="insights"
      />
      <PageSection className="py-14 lg:py-20">
        {published.length === 0 ? (
          <p className="max-w-xl text-base leading-7 text-brand-graphite" data-testid="articles-empty">
            Nothing is published yet.
          </p>
        ) : (
          <ul className="flex max-w-3xl flex-col gap-8">
            {published.map((article) => (
              <li key={article.slug}>
                <Link href={`/articles/${article.slug}`} className="group block">
                  <h2 className={grammar.rowTitle}>{article.title}</h2>
                  <p className="mt-3 max-w-xl text-base leading-7 text-brand-graphite">{article.dek}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </PageSection>
    </main>
  );
}

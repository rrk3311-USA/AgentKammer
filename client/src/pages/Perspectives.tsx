import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PerspectiveCard } from "@/components/PerspectiveCard";
import { ManhattanBriefSubscribe } from "@/components/ManhattanBriefSubscribe";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import {
  featuredPerspective,
  perspectiveCategories,
  perspectives,
  type PerspectiveCategory,
} from "@/data/perspectives";

export default function Perspectives() {
  const [activeCategory, setActiveCategory] = useState<PerspectiveCategory | "All">("All");

  usePageMetadata({
    title: "Perspectives — Observations From Manhattan",
    description:
      "Thoughtful notes on Manhattan buildings, neighborhoods, market behavior, relocation, luxury living, and what makes certain residences worth studying.",
    path: "/perspectives",
  });

  const filtered =
    activeCategory === "All"
      ? perspectives.filter((p) => !p.featured)
      : perspectives.filter((p) => !p.featured && p.category === activeCategory);

  return (
    <main className="min-h-screen bg-brand-ivory text-brand-graphite">
      <section className="bg-brand-midnight px-6 py-16 text-brand-ivory lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-brand-champagne">Perspectives</p>
          <h1 className="font-serif text-5xl font-semibold leading-[0.98] md:text-6xl lg:text-7xl">
            Observations From Manhattan
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-brand-ivory/84">
            Thoughtful notes on buildings, neighborhoods, market behavior, relocation decisions, luxury living, and what
            makes certain Manhattan residences worth studying.
          </p>
          <div className="mt-8">
            <a href="#manhattan-brief">
              <Button variant="brand">Subscribe to Manhattan Brief</Button>
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-brand-midnight/10 px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Featured</p>
          <PerspectiveCard article={featuredPerspective} featured />
        </div>
      </section>

      <section className="bg-[#f7f3ea] px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Categories</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory("All")}
              className={`border px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] transition ${
                activeCategory === "All"
                  ? "border-brand-champagne bg-brand-midnight text-brand-ivory"
                  : "border-brand-champagne/35 bg-white/70 text-brand-graphite/72 hover:border-brand-champagne"
              }`}
            >
              All
            </button>
            {perspectiveCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`border px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] transition ${
                  activeCategory === category
                    ? "border-brand-champagne bg-brand-midnight text-brand-ivory"
                    : "border-brand-champagne/35 bg-white/70 text-brand-graphite/72 hover:border-brand-champagne"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Recent</p>
          <h2 className="font-serif text-3xl font-semibold text-brand-midnight md:text-4xl">Perspectives Worth Reading</h2>
          {filtered.length > 0 ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((article) => (
                <PerspectiveCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-base leading-7 text-brand-graphite/68">
              No perspectives in this category yet. Browse all observations or subscribe to Manhattan Brief for the next
              note.
            </p>
          )}
        </div>
      </section>

      <ManhattanBriefSubscribe />
    </main>
  );
}

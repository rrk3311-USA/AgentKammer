import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PerspectiveCard } from "@/components/PerspectiveCard";
import { ManhattanBriefSubscribe } from "@/components/ManhattanBriefSubscribe";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import {
  featuredPerspective,
  perspectiveContentTypes,
  perspectives,
  type PerspectiveContentType,
} from "@/data/perspectives";

export default function Perspectives() {
  const [activeType, setActiveType] = useState<PerspectiveContentType | "All">("All");

  usePageMetadata({
    title: "Perspectives — Observations From Manhattan",
    description:
      "Thoughtful notes on Manhattan buildings, neighborhoods, market behavior, relocation, luxury living, and what makes certain residences worth studying.",
    path: "/perspectives",
  });

  const filtered =
    activeType === "All"
      ? perspectives.filter((p) => !p.featured)
      : perspectives.filter((p) => !p.featured && p.contentType === activeType);

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
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Content Types</p>
          <p className="mb-6 max-w-2xl text-sm leading-6 text-brand-graphite/68">
            Perspectives are observations — not listicles. Each note is tagged by the kind of judgment it offers.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveType("All")}
              className={`border px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] transition ${
                activeType === "All"
                  ? "border-brand-champagne bg-brand-midnight text-brand-ivory"
                  : "border-brand-champagne/35 bg-white/70 text-brand-graphite/72 hover:border-brand-champagne"
              }`}
            >
              All
            </button>
            {perspectiveContentTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setActiveType(type.id)}
                className={`border px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] transition ${
                  activeType === type.id
                    ? "border-brand-champagne bg-brand-midnight text-brand-ivory"
                    : "border-brand-champagne/35 bg-white/70 text-brand-graphite/72 hover:border-brand-champagne"
                }`}
              >
                <span aria-hidden="true">{type.emoji} </span>
                {type.label}
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

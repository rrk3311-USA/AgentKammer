import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { PerspectiveCard } from "@/components/PerspectiveCard";
import { EditorialAccent } from "@/components/EditorialAccent";
import { FeaturedExecutiveReportCard } from "@/components/FeaturedExecutiveReportCard";
import { IntelligenceReportsSubscribe } from "@/components/IntelligenceReportsSubscribe";
import { ManhattanBriefSubscribe } from "@/components/ManhattanBriefSubscribe";
import { ObservationFilterPill } from "@/components/ObservationFilterPill";
import { perspectiveIconMap, perspectiveIconProps } from "@/lib/perspective-icons";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { intelligenceHubCategories } from "@/data/intelligence-hub";
import {
  perspectiveContentTypes,
  perspectives,
  type PerspectiveContentType,
} from "@/data/perspectives";

export default function Perspectives() {
  const [location] = useLocation();
  const typeParam = new URLSearchParams(window.location.search).get("type");
  const initialType =
    typeParam && perspectiveContentTypes.some((t) => t.id === typeParam)
      ? (typeParam as PerspectiveContentType)
      : "All";
  const [activeType, setActiveType] = useState<PerspectiveContentType | "All">(initialType);

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("type");
    if (param && perspectiveContentTypes.some((t) => t.id === param)) {
      setActiveType(param as PerspectiveContentType);
    }
  }, [location]);

  usePageMetadata({
    title: "Perspectives — Manhattan Intelligence & Observations",
    description:
      "Executive Housing Report, building intelligence, neighborhood notes, and relocation guidance for Manhattan's modern residential market.",
    path: "/perspectives",
  });

  const filtered =
    activeType === "All"
      ? perspectives.filter((p) => p.slug !== "2026-executive-housing-report-for-international-buyers")
      : perspectives.filter((p) => p.contentType === activeType);

  return (
    <main className="min-h-screen bg-brand-ivory text-brand-graphite">
      <section className="relative overflow-hidden bg-brand-midnight px-6 py-16 text-brand-ivory lg:px-10 lg:py-20">
        <EditorialAccent variant="facade" />
        <div className="relative z-[1] mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-brand-champagne">Perspectives</p>
          <h1 className="font-serif text-5xl font-semibold leading-[0.98] md:text-6xl lg:text-7xl">
            Manhattan Intelligence
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-brand-ivory/84">
            Executive housing reports, building observations, neighborhood context, and relocation guidance — interpreted
            with care, not urgency.
          </p>
        </div>
      </section>

      <section id="intelligence" className="border-b border-brand-midnight/10 bg-[#f7f3ea] px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <FeaturedExecutiveReportCard />
        </div>
      </section>

      <section className="border-b border-brand-midnight/10 bg-white px-6 py-10 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Intelligence Library</p>
          <div className="flex flex-wrap gap-2">
            {intelligenceHubCategories.map((category) => {
              const isComingSoon = category.status === "coming-soon";
              const content = (
                <span
                  className={`inline-flex items-center gap-1.5 rounded-sm border px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] ${
                    category.featured
                      ? "border-brand-champagne bg-brand-champagne/10 text-brand-midnight"
                      : "border-brand-graphite/15 text-brand-graphite/78"
                  } ${isComingSoon ? "opacity-60" : "hover:border-brand-champagne"}`}
                >
                  {category.label}
                  {category.featured ? " ⭐" : null}
                  {isComingSoon ? " · Soon" : null}
                </span>
              );

              return isComingSoon ? (
                <span key={category.id}>{content}</span>
              ) : (
                <Link key={category.id} href={category.href}>
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f3ea] px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Areas Of Observation</p>
          <div className="flex flex-wrap gap-2">
            <ObservationFilterPill active={activeType === "All"} onClick={() => setActiveType("All")}>
              All
            </ObservationFilterPill>
            {perspectiveContentTypes.map((type) => {
              const Icon = perspectiveIconMap[type.id];
              return (
                <ObservationFilterPill key={type.id} active={activeType === type.id} onClick={() => setActiveType(type.id)}>
                  <span className="inline-flex items-center gap-1.5">
                    <Icon {...perspectiveIconProps} aria-hidden />
                    {type.label}
                  </span>
                </ObservationFilterPill>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-midnight/10 bg-white px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-serif text-3xl font-semibold text-brand-midnight md:text-4xl">Recent Observations</h2>
          {filtered.length > 0 ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((article) => (
                <PerspectiveCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-base leading-7 text-brand-graphite/68">
              No perspectives in this category yet.
            </p>
          )}
        </div>
      </section>

      <IntelligenceReportsSubscribe variant="light" className="border-t border-brand-midnight/10" />
      <ManhattanBriefSubscribe />
    </main>
  );
}

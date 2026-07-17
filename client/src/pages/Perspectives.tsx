import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { CTA, PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { formatPerspectiveDate, perspectives } from "@/data/perspectives";
import { PerspectiveContentTag } from "@/components/PerspectiveContentTag";

export default function Perspectives() {
  const featured = perspectives.find((item) => item.featured) ?? perspectives[0];
  const rest = perspectives
    .filter((item) => item.slug !== featured.slug)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  usePageMetadata({
    title: "Insights",
    description:
      "Agent Kammer insights on Manhattan buildings, neighborhoods, relocation, timing, and housing decisions.",
    path: "/insights",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Insights"
        title="Notes that connect the market to a practical next step."
        description="Observations for people who need more than listing alerts: building quality, neighborhood fit, timing pressure, and the trade-offs that shape a better housing decision."
        art="insights"
      />

      <PageSection>
        <SectionHeading
          eyebrow="Featured"
          title={featured.title}
          description={featured.excerpt}
        />
        <Link
          href={`/insights/${featured.slug}`}
          className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-brand-navy"
        >
          Read featured insight
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </Link>
      </PageSection>

      <section className="border-y border-brand-border bg-white">
        <PageSection>
          <SectionHeading
            eyebrow="Library"
            title="Read the note that matches the decision in front of you."
            description="Each insight ends with an implication: compare buildings, narrow a neighborhood, understand timing, or decide whether waiting is wiser."
          />
          <div className="mt-12 grid gap-6">
            {rest.map((item) => (
              <Link
                key={item.slug}
                href={`/insights/${item.slug}`}
                className="group rounded-card border border-brand-border bg-brand-ivory p-8 transition-colors hover:border-brand-navy/30"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <PerspectiveContentTag contentType={item.contentType} />
                  <p className="text-[11px] uppercase tracking-[0.18em] text-brand-cocoa">
                    {formatPerspectiveDate(item.publishedAt)} · {item.readMinutes} min
                  </p>
                </div>
                <h3 className="mt-4 font-display text-4xl leading-[0.98] tracking-[-0.03em] text-brand-navy">{item.title}</h3>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-brand-graphite">{item.excerpt}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-brand-navy">
                  Continue reading
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
                </span>
              </Link>
            ))}
          </div>
        </PageSection>
      </section>

      <CTA
        title="Need a more tailored read than a public note can provide?"
        description="Begin a Housing Strategy Session to turn the observation into a decision brief for your building, neighborhood, timeline, or move question."
      />
    </main>
  );
}

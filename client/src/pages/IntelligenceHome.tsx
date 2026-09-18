import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { CTA, PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { perspectives } from "@/data/perspectives";
import { buildingReports, formatBuildingReportDate } from "@/data/building-reports";
import { KAMMER_VERDICTS, PUBLIC_PRODUCTS } from "@/data/public-menu";
import { openDecisionAssistant } from "@/lib/decision-assistant";

const ladder = [
  {
    name: PUBLIC_PRODUCTS.guidance.label,
    text: PUBLIC_PRODUCTS.guidance.text,
    href: PUBLIC_PRODUCTS.guidance.href,
    cta: `Ask the ${PUBLIC_PRODUCTS.guidance.advisor}`,
    openChat: true,
  },
  {
    name: PUBLIC_PRODUCTS.situation.label,
    text: PUBLIC_PRODUCTS.situation.text,
    href: PUBLIC_PRODUCTS.situation.href,
    cta: "Begin Situation Assessment",
  },
  {
    name: PUBLIC_PRODUCTS.property.label,
    text: PUBLIC_PRODUCTS.property.text,
    href: PUBLIC_PRODUCTS.property.href,
    cta: "Request Property Assessment",
  },
  {
    name: PUBLIC_PRODUCTS.strategy.label,
    text: PUBLIC_PRODUCTS.strategy.text,
    href: PUBLIC_PRODUCTS.strategy.href,
    cta: "Request a Strategy Session",
  },
] as const;

const afterSession = [
  {
    name: "Acquisition Dossier",
    text: "Full acquisition judgment. Offered after a Strategy Session, by invitation. Not a first public card.",
  },
  {
    name: "Advisory memberships",
    text: "Continuity when decisions keep evolving. Nested behind the hour. Not sold as an equal primary offer.",
  },
] as const;

export default function IntelligenceHome() {
  const insightPreview = perspectives
    .slice()
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3);

  usePageMetadata({
    title: "Intelligence",
    description:
      "One public ladder: Guidance, Situation Assessment, Property Assessment, and a Strategy Session. Livability Score stays on the Tools desk.",
    path: "/intelligence",
  });

  return (
    <main className="bg-brand-field">
      <PageHero
        eyebrow="Intelligence"
        title="One public ladder. Five names."
        description="Guidance, Situation Assessment, Property Assessment, Livability Score on the Tools desk, and a Strategy Session. Dossier and memberships follow the hour, by invitation."
        art="decision-framework"
      />

      <PageSection>
        <SectionHeading
          eyebrow="The Ladder"
          title="How the work is offered in public."
          description="One sequence. No overlapping SKUs. Verdicts use Pick, Consider, Wait, Pass, and who the address is for. Not a /100 score."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {ladder.map((level, index) => {
            const body = (
              <>
                <p className="text-[11px] uppercase tracking-[0.22em] text-brand-brass">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-5 font-display text-3xl leading-[0.95] tracking-[-0.03em] text-brand-navy">
                  {level.name}
                </h3>
                <p className="mt-4 text-sm leading-7 text-brand-graphite">{level.text}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-brand-navy">
                  {level.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
                </span>
              </>
            );
            const className = "group rounded-card border border-brand-border bg-white p-8 text-left transition-colors hover:border-brand-navy/30";
            if ("openChat" in level && level.openChat) {
              return (
                <button key={level.name} type="button" onClick={openDecisionAssistant} className={className}>
                  {body}
                </button>
              );
            }
            return (
              <Link key={level.name} href={level.href} className={className}>
                {body}
              </Link>
            );
          })}
        </div>
        <p className="mt-8 max-w-2xl text-sm leading-7 text-brand-graphite/80">
          {PUBLIC_PRODUCTS.livability.label} remains {PUBLIC_PRODUCTS.livability.desk} desk language. It is not a fifth card on this ladder, and it is not a Property Assessment.
        </p>
        <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-brand-cocoa">
          Show verdicts · {KAMMER_VERDICTS.join(" · ")} · WHO
        </p>
      </PageSection>

      <section className="border-y border-brand-border">
        <PageSection>
          <SectionHeading
            eyebrow="After the hour"
            title="By invitation, after a Strategy Session."
            description="These continue the relationship. They are not sold as equal primary offers."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {afterSession.map((offer) => (
              <div key={offer.name} className="border border-brand-border bg-brand-ivory p-6">
                <p className="text-[11px] uppercase tracking-[0.2em] text-brand-brass">By invitation</p>
                <p className="mt-4 font-display text-2xl leading-tight text-brand-navy">{offer.name}</p>
                <p className="mt-3 text-sm leading-7 text-brand-graphite">{offer.text}</p>
              </div>
            ))}
          </div>
        </PageSection>
      </section>

      <PageSection>
        <SectionHeading
          eyebrow="Building Profiles"
          title="Study the building before the showing."
          description="Editorial address studies. Free to read, distinct from a Property Assessment."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {buildingReports.map((report) => (
            <Link
              key={report.slug}
              href={`/building-reports/${report.slug}`}
              className="rounded-card border border-brand-border bg-white p-7 transition-colors hover:border-brand-navy/30"
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-brand-brass">
                {formatBuildingReportDate(report.publishedAt)} · {report.readMinutes} min
              </p>
              <h3 className="mt-4 font-display text-3xl text-brand-navy">{report.buildingName}</h3>
              <p className="mt-3 text-sm leading-7 text-brand-graphite">{report.executiveSummary[0]}</p>
            </Link>
          ))}
        </div>
      </PageSection>

      <section className="border-t border-brand-border">
        <PageSection>
          <SectionHeading
            eyebrow="Insights"
            title="Notes that sharpen the next decision."
            description="Kept for depth and SEO. Surfaced here under Intelligence, not as a separate primary nav item."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {insightPreview.map((item) => (
              <Link
                key={item.slug}
                href={`/insights/${item.slug}`}
                className="border border-brand-border bg-brand-ivory p-6 transition-colors hover:border-brand-brass"
              >
                <p className="font-display text-2xl leading-tight text-brand-navy">{item.title}</p>
                <p className="mt-3 text-sm leading-7 text-brand-graphite">{item.excerpt}</p>
              </Link>
            ))}
          </div>
          <Link
            href="/insights"
            className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-brand-navy"
          >
            All insights
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </PageSection>
      </section>

      <CTA
        title="Start with Guidance, or the Situation Assessment."
        description="If an address is already in play, request a Property Assessment. A Strategy Session is the live hour when you want judgment in the room."
        href="/belonging"
        label="Situation Assessment"
        eyebrow="Start Here"
      />
    </main>
  );
}

import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { CTA, PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { perspectives } from "@/data/perspectives";
import { buildingReports, formatBuildingReportDate } from "@/data/building-reports";

const levels = [
  {
    name: "Decision Intelligence",
    text: "Clarify the decision before the search — what changed, whether anything should change, and which path protects you.",
    href: "/situations",
    cta: "Explore Situations",
  },
  {
    name: "Building Intelligence",
    text: "Study the address before the apartment. Editorial Building Profiles on resident fit, trade-offs, and when to walk away.",
    href: "/building-reports",
    cta: "Open Building Profiles",
  },
  {
    name: "Property Intelligence",
    text: "Diligence on a specific property — from a free Property Snapshot to a full Property Intelligence Report.",
    href: "/contact",
    cta: "Request Intelligence",
  },
  {
    name: "Executive Intelligence",
    text: "Full acquisition judgment and continuity — Executive Acquisition Dossier and Executive Intelligence Retainer.",
    href: "/contact",
    cta: "Request Intelligence",
  },
] as const;

const offers = [
  { name: "Decision Assessment", price: "Free", href: "/belonging" },
  { name: "Property Snapshot", price: "Free", href: "/contact" },
  { name: "Property Intelligence Report", price: "$399", href: "/contact" },
  { name: "Acquisition Dossier", price: "$1,500", href: "/contact" },
] as const;

export default function IntelligenceHome() {
  const insightPreview = perspectives
    .slice()
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3);

  usePageMetadata({
    title: "Intelligence",
    description:
      "Helping you make better real estate decisions through intelligence — Decision, Building, Property, and Executive Intelligence from Agent Kammer.",
    path: "/intelligence",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Intelligence"
        title="Better real estate decisions through intelligence."
        description="Agent Kammer is an intelligence practice — not a listing feed. Products are simply how deeper intelligence is delivered."
        art="decision-framework"
      />

      <PageSection>
        <SectionHeading
          eyebrow="The Ladder"
          title="Four levels of intelligence."
          description="Philosophy first. Products second. Each level answers a clearer question before capital is committed."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {levels.map((level, index) => (
            <Link
              key={level.name}
              href={level.href}
              className="group rounded-card border border-brand-border bg-white p-8 transition-colors hover:border-brand-navy/30"
            >
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
            </Link>
          ))}
        </div>
      </PageSection>

      <section className="border-y border-brand-border bg-white">
        <PageSection>
          <SectionHeading
            eyebrow="Public Offers"
            title="Four ways to begin."
            description="Everything else is a service or feature — not another product on the shelf."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {offers.map((offer) => (
              <Link
                key={offer.name}
                href={offer.href}
                className="border border-brand-border bg-brand-ivory p-6 transition-colors hover:border-brand-brass"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-brand-brass">{offer.price}</p>
                <p className="mt-4 font-display text-2xl leading-tight text-brand-navy">{offer.name}</p>
              </Link>
            ))}
          </div>
        </PageSection>
      </section>

      <PageSection>
        <SectionHeading
          eyebrow="Building Profiles"
          title="Study the building before the showing."
          description="Editorial address studies — free to read, distinct from paid Property Intelligence."
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

      <section className="border-t border-brand-border bg-white">
        <PageSection>
          <SectionHeading
            eyebrow="Insights"
            title="Notes that sharpen the next decision."
            description="Kept for depth and SEO — surfaced here under Intelligence, not as a separate primary nav item."
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
        title="Request Intelligence."
        description="Tell us the decision in front of you. We will prescribe the right next level — Assessment, Snapshot, Report, or Dossier."
        href="/contact"
        label="Request Intelligence"
        eyebrow="Request Intelligence"
      />
    </main>
  );
}

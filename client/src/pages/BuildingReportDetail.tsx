import { Link, useRoute } from "wouter";
import { ArrowRight } from "lucide-react";
import { CTA, PageHero, PageSection, ReportSubnav, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import {
  buildingReports,
  formatBuildingReportDate,
  getBuildingReportBySlug,
} from "@/data/building-reports";
import { getPerspectiveBySlug } from "@/data/perspectives";
import NotFound from "@/pages/not-found";

function Paragraphs({ lines }: { lines: string[] }) {
  return (
    <div className="space-y-4">
      {lines.map((line) => (
        <p key={line} className="text-base leading-8 text-brand-graphite">
          {line}
        </p>
      ))}
    </div>
  );
}

export default function BuildingReportDetail() {
  const [, params] = useRoute("/building-reports/:slug");
  const reserved = new Set(["individual-buildings", "neighborhood-guides", "market-briefs"]);
  const slug = params?.slug && !reserved.has(params.slug) ? params.slug : undefined;
  const report = slug ? getBuildingReportBySlug(slug) : undefined;

  usePageMetadata({
    title: report ? `${report.buildingName} Building Report` : "Building Report",
    description: report
      ? report.executiveSummary[0]
      : "Manhattan building reports from Agent Kammer.",
    path: report ? `/building-reports/${report.slug}` : "/building-reports/individual-buildings",
  });

  if (!report) {
    return <NotFound />;
  }

  const relatedPerspective = report.relatedPerspectiveSlug
    ? getPerspectiveBySlug(report.relatedPerspectiveSlug)
    : undefined;
  const otherReports = buildingReports.filter((item) => item.slug !== report.slug);

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Building Report"
        title={report.buildingName}
        description={`${report.location}. ${report.buildingProfile.positioning}`}
        art="individual-buildings"
        kicker={
          <div className="space-y-2 text-sm uppercase tracking-[0.14em] text-brand-ivory/82">
            <p>{report.series}</p>
            <p>
              {formatBuildingReportDate(report.publishedAt)} · {report.readMinutes} min read
            </p>
            <p>
              {report.buildingProfile.buildingType} · {report.buildingProfile.design}
            </p>
          </div>
        }
      />
      <ReportSubnav />

      <PageSection className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <SectionHeading
          eyebrow="Executive Summary"
          title="Read the building as a decision, not a trophy."
          description="The first job is to decide whether this address deserves deeper attention, negotiation energy, or a pass."
        />
        <Paragraphs lines={report.executiveSummary} />
      </PageSection>

      <section className="border-y border-brand-border bg-white">
        <PageSection className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-brand-cocoa">Observation</p>
            <div className="mt-5">
              <Paragraphs lines={report.observation} />
            </div>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-brand-cocoa">Resident Fit</p>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-brand-navy">Likely residents</p>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-brand-graphite">
                  {report.residentProfile.likely.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-brand-navy">Less common</p>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-brand-graphite">
                  {report.residentProfile.lessCommon.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </PageSection>
      </section>

      <PageSection>
        <SectionHeading
          eyebrow="Differentiators"
          title="What actually separates this building from nearby alternatives."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {report.differentiators.map((item) => (
            <div key={item.title} className="rounded-card border border-brand-border bg-white p-7">
              <h3 className="font-display text-3xl leading-[0.95] tracking-[-0.03em] text-brand-navy">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-graphite">{item.body}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <section className="border-y border-brand-border bg-white">
        <PageSection className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-brand-cocoa">Strengths</p>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-brand-graphite">
              {report.strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-brand-cocoa">Trade-offs</p>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-brand-graphite">
              {report.tradeoffs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-7 text-brand-navy">{report.tradeoffsNote}</p>
          </div>
        </PageSection>
      </section>

      <PageSection className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <SectionHeading
          eyebrow="Neighborhood"
          title={`${report.buildingProfile.neighborhood} context`}
          description={report.neighborhoodContext.intro}
        />
        <div>
          <ul className="space-y-3 text-sm leading-7 text-brand-graphite">
            {report.neighborhoodContext.combines.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 text-base leading-8 text-brand-navy">{report.neighborhoodContext.closing}</p>
        </div>
      </PageSection>

      <section className="border-y border-brand-border bg-white">
        <PageSection>
          <SectionHeading eyebrow="Comparables" title={report.comparablesIntro} />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {report.comparables.map((item) => (
              <div key={item.name} className="rounded-card border border-brand-border bg-brand-ivory p-6">
                {item.slug && getBuildingReportBySlug(item.slug) ? (
                  <Link href={`/building-reports/${item.slug}`} className="font-display text-3xl text-brand-navy hover:text-brand-brass">
                    {item.name}
                  </Link>
                ) : (
                  <h3 className="font-display text-3xl text-brand-navy">{item.name}</h3>
                )}
                <ul className="mt-4 space-y-2 text-sm leading-7 text-brand-graphite">
                  {item.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </PageSection>
      </section>

      <PageSection>
        <SectionHeading eyebrow="Fit Tiers" title="Who this building serves well - and who should keep looking." />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {report.fit.map((tier) => (
            <div key={tier.label} className="rounded-card border border-brand-border bg-white p-7">
              <p className="text-[11px] uppercase tracking-[0.22em] text-brand-cocoa">{tier.label}</p>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-brand-graphite">
                {tier.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </PageSection>

      <section className="border-y border-brand-border bg-white">
        <PageSection className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-brand-cocoa">Commute</p>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-brand-graphite">
              {report.commute.destinations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-6 text-base leading-8 text-brand-navy">{report.commute.closing}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-brand-cocoa">Agent Kammer Perspective</p>
            <div className="mt-5">
              <Paragraphs lines={report.agentKammerPerspective} />
            </div>
          </div>
        </PageSection>
      </section>

      <PageSection>
        <SectionHeading eyebrow="Bottom Line" title="The recommendation after the noise." />
        <div className="mt-8 max-w-3xl">
          <Paragraphs lines={report.bottomLine} />
        </div>
        {relatedPerspective ? (
          <Link
            href={`/insights/${relatedPerspective.slug}`}
            className="mt-10 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-brand-navy"
          >
            Related insight: {relatedPerspective.title}
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        ) : null}
      </PageSection>

      {otherReports.length ? (
        <section className="border-t border-brand-border bg-white">
          <PageSection>
            <SectionHeading eyebrow="More Reports" title="Compare another address before the shortlist hardens." />
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {otherReports.map((item) => (
                <Link
                  key={item.slug}
                  href={`/building-reports/${item.slug}`}
                  className="rounded-card border border-brand-border bg-brand-ivory p-6 transition-colors hover:border-brand-navy/30"
                >
                  <h3 className="font-display text-3xl text-brand-navy">{item.buildingName}</h3>
                  <p className="mt-3 text-sm leading-7 text-brand-graphite">{item.executiveSummary[0]}</p>
                </Link>
              ))}
            </div>
          </PageSection>
        </section>
      ) : null}

      <CTA
        title={`Want ${report.buildingName} mapped to your brief?`}
        description="Begin a Housing Strategy Session with timing, budget, and what the next home needs to do better than the current one."
      />
    </main>
  );
}

import { Link, useRoute } from "wouter";
import { ArrowRight } from "lucide-react";
import { CTA, PageHero, PageSection, ReportSubnav, SectionHeading } from "@/components/site-shell";
import { GrammarRows, LibraryList, grammar } from "@/components/visual-grammar";
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
          description="The first job is a verdict: Pick, Consider, Wait, or Pass, plus who the address is for. Not a /100 score."
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
        <GrammarRows
          items={report.differentiators.map((item) => ({
            title: item.title,
            text: item.body,
          }))}
        />
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
          <GrammarRows
            items={report.comparables.map((item) => ({
              title: item.name,
              text: item.lines.join(" "),
            }))}
          />
        </PageSection>
      </section>

      <PageSection>
        <SectionHeading eyebrow="Fit Tiers" title="Who this building serves well. And who should keep looking." />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {report.fit.map((tier) => (
            <div key={tier.label} className="border-t border-brand-border pt-6">
              <p className={grammar.eyebrow}>{tier.label}</p>
              <ul className="mt-5 space-y-3 text-base leading-7 text-brand-graphite">
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
            <LibraryList
              items={otherReports.map((item) => ({
                title: item.buildingName,
                text: item.executiveSummary[0],
                href: `/building-reports/${item.slug}`,
                cta: "Read profile",
              }))}
            />
          </PageSection>
        </section>
      ) : null}

      <CTA
        title={`Want ${report.buildingName} mapped to your brief?`}
        description="Request a Property Assessment with timing, budget, and what the next home needs to do better than the current one. Verdicts use Pick, Consider, Wait, Pass, and WHO."
        href="/contact?intent=property"
        label="Property Assessment"
        eyebrow="Property Assessment"
      />
    </main>
  );
}

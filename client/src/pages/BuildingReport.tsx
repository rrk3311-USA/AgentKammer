import { Link, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { ManhattanBriefSubscribe } from "@/components/ManhattanBriefSubscribe";
import { PerspectiveContentTag } from "@/components/PerspectiveContentTag";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import {
  formatBuildingReportDate,
  getBuildingReportBySlug,
} from "@/data/building-reports";
import { getPerspectiveBySlug } from "@/data/perspectives";
import NotFound from "@/pages/not-found";

function Paragraphs({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line) => (
        <p key={line} className="mt-3 text-base leading-7 text-brand-graphite/78 first:mt-0">
          {line}
        </p>
      ))}
    </>
  );
}

export default function BuildingReport() {
  const [, params] = useRoute("/buildings/:slug/report");
  const report = params?.slug ? getBuildingReportBySlug(params.slug) : undefined;
  const relatedPerspective = report?.relatedPerspectiveSlug
    ? getPerspectiveBySlug(report.relatedPerspectiveSlug)
    : undefined;

  usePageMetadata({
    title: report ? `${report.buildingName} — Building Report` : "Building Report Not Found",
    description: report
      ? report.executiveSummary[0]
      : "Manhattan building reports from Agent Kammer.",
    path: report ? `/buildings/${report.slug}/report` : undefined,
  });

  if (!report) {
    return <NotFound />;
  }

  return (
    <main className="min-h-screen bg-brand-ivory text-brand-graphite">
      <section className="bg-brand-midnight px-6 py-14 text-brand-ivory lg:px-10 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <Link href="/buildings">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-champagne transition hover:text-brand-ivory">
              ← Buildings
            </span>
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <PerspectiveContentTag contentType="building" variant="dark" />
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-brand-ivory/62">
              {report.series} · {formatBuildingReportDate(report.publishedAt)} · {report.readMinutes} min read
            </p>
          </div>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.02] md:text-5xl lg:text-6xl">
            {report.buildingName}
          </h1>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-champagne">
            {report.location}
          </p>
        </div>
      </section>

      <article className="px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-3xl space-y-12">
          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-champagne">Executive Summary</p>
            <Paragraphs lines={report.executiveSummary} />
          </section>

          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-champagne">Observation</p>
            <Paragraphs lines={report.observation} />
          </section>

          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-champagne">Building Profile</p>
            <dl className="mt-4 grid gap-4 border border-brand-midnight/10 bg-white/60 p-5 sm:grid-cols-2">
              <div>
                <dt className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-brand-champagne">Neighborhood</dt>
                <dd className="mt-1 text-base text-brand-graphite/82">{report.buildingProfile.neighborhood}</dd>
              </div>
              <div>
                <dt className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-brand-champagne">Building Type</dt>
                <dd className="mt-1 text-base text-brand-graphite/82">{report.buildingProfile.buildingType}</dd>
              </div>
              <div>
                <dt className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-brand-champagne">Design</dt>
                <dd className="mt-1 text-base text-brand-graphite/82">{report.buildingProfile.design}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-brand-champagne">Positioning</dt>
                <dd className="mt-1 text-base text-brand-graphite/82">{report.buildingProfile.positioning}</dd>
              </div>
            </dl>
          </section>

          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-champagne">Resident Profile</p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-graphite/62">Likely residents include</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-7 text-brand-graphite/78">
              {report.residentProfile.likely.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-brand-graphite/62">Less common</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-7 text-brand-graphite/78">
              {report.residentProfile.lessCommon.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-champagne">
              What Makes {report.buildingName} Different
            </p>
            <div className="mt-4 space-y-6">
              {report.differentiators.map((item) => (
                <div key={item.title}>
                  <h3 className="font-serif text-xl font-semibold text-brand-midnight">{item.title}</h3>
                  <p className="mt-2 text-base leading-7 text-brand-graphite/78">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-champagne">Strengths</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-7 text-brand-graphite/78">
              {report.strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-champagne">Tradeoffs</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-7 text-brand-graphite/78">
              {report.tradeoffs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-base leading-7 text-brand-graphite/78">{report.tradeoffsNote}</p>
          </section>

          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-champagne">Neighborhood Context</p>
            <p className="mt-3 text-base leading-7 text-brand-graphite/78">{report.neighborhoodContext.intro}</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-7 text-brand-graphite/78">
              {report.neighborhoodContext.combines.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-base leading-7 text-brand-graphite/78">{report.neighborhoodContext.closing}</p>
          </section>

          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-champagne">Comparable Buildings</p>
            <p className="mt-3 text-base leading-7 text-brand-graphite/78">{report.comparablesIntro}</p>
            <div className="mt-6 space-y-5">
              {report.comparables.map((comp) => (
                <div key={comp.name} className="border-l-2 border-brand-champagne/50 pl-4">
                  <h3 className="font-serif text-lg font-semibold text-brand-midnight">{comp.name}</h3>
                  <p className="mt-1 text-base leading-7 text-brand-graphite/78">{comp.lines[0]}</p>
                  <p className="text-base leading-7 text-brand-graphite/78">{comp.lines[1]}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-champagne">Who This Building Fits</p>
            <div className="mt-4 space-y-6">
              {report.fit.map((tier) => (
                <div key={tier.label}>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-graphite/62">{tier.label}</p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-7 text-brand-graphite/78">
                    {tier.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-champagne">Commute Perspective</p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-graphite/62">Typical access to</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-7 text-brand-graphite/78">
              {report.commute.destinations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-base leading-7 text-brand-graphite/78">{report.commute.closing}</p>
          </section>

          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-champagne">Agent Kammer Perspective</p>
            <Paragraphs lines={report.agentKammerPerspective} />
          </section>

          <section className="border-t border-brand-midnight/10 pt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-champagne">Bottom Line</p>
            <Paragraphs lines={report.bottomLine} />
          </section>
        </div>
      </article>

      {relatedPerspective ? (
        <section className="border-t border-brand-midnight/10 bg-[#f7f3ea] px-6 py-14 lg:px-10">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Related Perspective</p>
            <h2 className="font-serif text-3xl font-semibold text-brand-midnight">{relatedPerspective.title}</h2>
            <p className="mt-4 text-base leading-7 text-brand-graphite/76">{relatedPerspective.excerpt}</p>
            <div className="mt-6">
              <Link href={`/perspectives/${relatedPerspective.slug}`}>
                <Button variant="brandOutline">Read Perspective</Button>
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <ManhattanBriefSubscribe />
    </main>
  );
}

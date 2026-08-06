import { Link, useRoute } from "wouter";
import { Card } from "@/components/ui/card";
import { ContinueYourResearch } from "@/components/ContinueYourResearch";
import { IntelligenceReportsSubscribe } from "@/components/IntelligenceReportsSubscribe";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { executiveHousingHubLinks } from "@/data/intelligence-hub";
import {
  formatExecutiveHousingReportDate,
  getExecutiveHousingReportBySlug,
} from "@/data/executive-housing-reports";
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

export default function ExecutiveHousingReport() {
  const [, params] = useRoute("/insights/reports/:slug");
  const report = params?.slug ? getExecutiveHousingReportBySlug(params.slug) : undefined;
  const relatedPerspective = report?.relatedPerspectiveSlug
    ? getPerspectiveBySlug(report.relatedPerspectiveSlug)
    : undefined;

  const syndicationKeywords = report?.syndication.map((s) => s.searchTerms).join(" · ");
  const reportPath = report ? `/insights/reports/${report.slug}` : undefined;

  usePageMetadata({
    title: report ? report.title : "Report Not Found",
    description: report?.executiveSummary[0] ?? "Manhattan executive housing intelligence from Agent Kammer.",
    path: reportPath,
    keywords: report
      ? `Manhattan executive housing report 2026, NYC luxury relocation, international Manhattan buyers, ${syndicationKeywords}`
      : undefined,
    locale: "en",
  });

  if (!report) {
    return <NotFound />;
  }

  const liveHubLinks = executiveHousingHubLinks.filter((l) => l.status === "live");

  return (
    <main className="min-h-screen bg-brand-ivory text-brand-graphite">
      <section className="bg-brand-midnight px-6 py-14 text-brand-ivory lg:px-10 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <Link href="/insights">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-champagne transition hover:text-brand-ivory">
              ← Insights
            </span>
          </Link>
          <p className="mt-6 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-brand-ivory/62">
            {report.series} · {formatExecutiveHousingReportDate(report.publishedAt)} · {report.readMinutes} min read
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.02] md:text-5xl lg:text-6xl">
            {report.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-brand-ivory/84">{report.subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {report.markets.map((market) => (
              <span
                key={market}
                className="border border-brand-ivory/20 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-brand-champagne"
              >
                {market}
              </span>
            ))}
          </div>
        </div>
      </section>

      <article className="px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-3xl space-y-12">
          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-champagne">Executive Summary</p>
            <Paragraphs lines={report.executiveSummary} />
          </section>

          <IntelligenceReportsSubscribe variant="light" />
        </div>
      </article>

      <article className="border-t border-brand-midnight/10 px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-3xl space-y-12">
          {report.sections.map((section) => (
            <section key={section.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-champagne">{section.title}</p>
              <Paragraphs lines={section.paragraphs} />
              {section.bullets ? (
                <ul className="mt-4 space-y-2 border-l-2 border-brand-champagne/40 pl-5">
                  {section.bullets.map((item) => (
                    <li key={item} className="text-base leading-7 text-brand-graphite/78">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <section className="border-t border-brand-midnight/10 pt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-champagne">Bottom Line</p>
            <Paragraphs lines={report.bottomLine} />
          </section>
        </div>
      </article>

      <section className="border-t border-brand-midnight/10 bg-white px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-champagne">Intelligence Hub</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-brand-midnight">Continue From This Report</h2>
          <p className="mt-4 text-base leading-7 text-brand-graphite/72">
            One report, many spokes - building reports, relocation guides, and profession-specific reads.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {liveHubLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                <Card className="h-full rounded-none border border-brand-graphite/12 bg-brand-ivory/40 px-5 py-4 shadow-none transition hover:border-brand-champagne/45">
                  <p className="font-serif text-lg font-semibold text-brand-midnight">{item.label}</p>
                  <p className="mt-2 text-sm leading-6 text-brand-graphite/68">{item.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-midnight/10 bg-brand-warm px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-champagne">International Syndication</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-brand-midnight">Published For Global Executive Search</h2>
          <div className="mt-8 space-y-4">
            {report.syndication.map((item) => (
              <Card
                key={item.code}
                className="rounded-none border border-brand-graphite/12 bg-white/80 px-5 py-5 shadow-none"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-champagne-dark">{item.code}</p>
                <h3 className="mt-2 font-serif text-xl font-semibold text-brand-midnight">{item.headline}</h3>
                <p className="mt-3 text-sm leading-6 text-brand-graphite/72">{item.excerpt}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {relatedPerspective ? (
        <section className="border-t border-brand-midnight/10 bg-brand-midnight px-6 py-14 text-brand-ivory lg:px-10">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Related Perspective</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold">{relatedPerspective.title}</h2>
            <p className="mt-4 text-base leading-7 text-brand-ivory/82">{relatedPerspective.excerpt}</p>
            <Link href={`/insights/${relatedPerspective.slug}`} className="mt-6 inline-block font-serif text-sm text-brand-champagne transition hover:text-brand-ivory">
              Read perspective →
            </Link>
          </div>
        </section>
      ) : null}

      <ContinueYourResearch />

      <IntelligenceReportsSubscribe variant="dark" className="border-t border-brand-midnight/10" />
    </main>
  );
}

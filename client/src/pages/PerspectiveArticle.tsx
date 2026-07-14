import { Link, useRoute } from "wouter";
import { ContinueReadingLinks } from "@/components/ContinueReadingLinks";
import { ExecutiveHousingReportModule } from "@/components/ExecutiveHousingReportModule";
import { IntelligenceReportsSubscribe } from "@/components/IntelligenceReportsSubscribe";
import { PerspectiveContentTag } from "@/components/PerspectiveContentTag";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { getBuildingReportBySlug } from "@/data/building-reports";
import { executiveHousingReports } from "@/data/executive-housing-reports";
import {
  formatPerspectiveDate,
  getPerspectiveBySlug,
  type PerspectiveSections,
} from "@/data/perspectives";
import NotFound from "@/pages/not-found";

const sectionLabels: { key: keyof PerspectiveSections; label: string }[] = [
  { key: "observation", label: "Observation" },
  { key: "context", label: "Context" },
  { key: "interpretation", label: "Interpretation" },
  { key: "implication", label: "Implication" },
  { key: "conclusion", label: "Conclusion" },
];

export default function PerspectiveArticle() {
  const [, params] = useRoute("/insights/:slug");
  const article = params?.slug ? getPerspectiveBySlug(params.slug) : undefined;

  const marketKeywords =
    article?.markets?.length && article.contentType === "international"
      ? `Manhattan luxury real estate ${article.markets.join(" ")} international buyers NYC relocation`
      : undefined;

  usePageMetadata({
    title: article ? article.title : "Insight Not Found",
    description: article?.excerpt ?? "Manhattan observations from Agent Kammer.",
    path: article ? `/insights/${article.slug}` : undefined,
    keywords: marketKeywords,
  });

  if (!article) {
    return <NotFound />;
  }

  const relatedReport = article.relatedBuildingReportSlug
    ? getBuildingReportBySlug(article.relatedBuildingReportSlug)
    : undefined;
  const relatedExecutiveReport = executiveHousingReports.find(
    (r) => r.relatedPerspectiveSlug === article.slug,
  );
  const showReportModule =
    !relatedExecutiveReport && article.slug !== "2026-executive-housing-report-for-international-buyers";

  return (
    <main className="min-h-screen bg-brand-ivory text-brand-graphite">
      <section className="bg-brand-midnight px-6 py-14 text-brand-ivory lg:px-10 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <Link href="/insights">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-champagne transition hover:text-brand-ivory">
              ← Insights
            </span>
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <PerspectiveContentTag contentType={article.contentType} variant="dark" />
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-brand-ivory/62">
              {formatPerspectiveDate(article.publishedAt)} · {article.readMinutes} min read
            </p>
          </div>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.02] md:text-5xl lg:text-6xl">
            {article.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-brand-ivory/82">{article.excerpt}</p>
        </div>
      </section>

      {showReportModule ? <ExecutiveHousingReportModule /> : null}

      <article className="px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-3xl space-y-10">
          {sectionLabels.map(({ key, label }, index) => (
            <section key={key}>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-champagne">{label}</p>
              <p className="mt-3 text-base leading-7 text-brand-graphite/78">{article.sections[key]}</p>
              {index === 1 && showReportModule ? (
                <div className="mt-10">
                  <ExecutiveHousingReportModule variant="compact" />
                </div>
              ) : null}
            </section>
          ))}
        </div>
      </article>

      <IntelligenceReportsSubscribe variant="light" className="border-t border-brand-midnight/10" />

      {relatedExecutiveReport ? (
        <section className="border-t border-brand-midnight/10 bg-brand-midnight px-6 py-14 text-brand-ivory lg:px-10">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Intelligence Report</p>
            <h2 className="font-serif text-3xl font-semibold">{relatedExecutiveReport.title}</h2>
            <p className="mt-4 text-base leading-7 text-brand-ivory/82">{relatedExecutiveReport.executiveSummary[0]}</p>
            <Link
              href={`/insights/reports/${relatedExecutiveReport.slug}`}
              className="mt-6 inline-block font-serif text-sm text-brand-champagne transition hover:text-brand-ivory"
            >
              Read the full report →
            </Link>
          </div>
        </section>
      ) : null}

      {relatedReport ? (
        <section className="border-t border-brand-midnight/10 bg-white px-6 py-14 lg:px-10">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Building Report</p>
            <h2 className="font-serif text-3xl font-semibold text-brand-midnight">{relatedReport.buildingName}</h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand-champagne-dark">
              {relatedReport.location}
            </p>
            <p className="mt-4 text-base leading-7 text-brand-graphite/72">{relatedReport.executiveSummary[0]}</p>
            <Link
              href={`/building-reports/${relatedReport.slug}`}
              className="mt-6 inline-block font-serif text-sm text-brand-midnight transition hover:text-brand-champagne-dark"
            >
              Read building report →
            </Link>
          </div>
        </section>
      ) : null}

      <ContinueReadingLinks excludeHref={`/insights/${article.slug}`} />
    </main>
  );
}

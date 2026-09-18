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
    <main className="min-h-screen bg-brand-field text-brand-navy">
      <section className="border-b border-brand-border bg-brand-field px-6 py-14 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <Link href="/insights">
            <span className="ak-nav-link text-brand-navy transition hover:text-brand-navy-secondary">
              ← Insights
            </span>
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <PerspectiveContentTag contentType={article.contentType} variant="light" />
            <p className="ak-kicker">
              {formatPerspectiveDate(article.publishedAt)} · {article.readMinutes} min read
            </p>
          </div>
          <h1 className="ak-display mt-4">
            {article.title}
          </h1>
          <p className="ak-lede mt-6">{article.excerpt}</p>
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
        <section className="border-t border-brand-border bg-brand-field px-6 py-14 lg:px-10">
          <div className="mx-auto max-w-3xl">
            <p className="ak-kicker mb-3">Intelligence Report</p>
            <h2 className="ak-title">{relatedExecutiveReport.title}</h2>
            <p className="ak-lede mt-4">{relatedExecutiveReport.executiveSummary[0]}</p>
            <Link
              href={`/insights/reports/${relatedExecutiveReport.slug}`}
              className="ak-nav-link mt-6 inline-block text-brand-navy transition hover:text-brand-navy-secondary"
            >
              Read the full report →
            </Link>
          </div>
        </section>
      ) : null}

      {relatedReport ? (
        <section className="border-t border-brand-border bg-brand-field px-6 py-14 lg:px-10">
          <div className="mx-auto max-w-3xl">
            <p className="ak-kicker mb-3">Building Report</p>
            <h2 className="ak-title">{relatedReport.buildingName}</h2>
            <p className="ak-kicker mt-2">
              {relatedReport.location}
            </p>
            <p className="ak-lede mt-4">{relatedReport.executiveSummary[0]}</p>
            <Link
              href={`/building-reports/${relatedReport.slug}`}
              className="ak-nav-link mt-6 inline-block text-brand-navy transition hover:text-brand-navy-secondary"
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

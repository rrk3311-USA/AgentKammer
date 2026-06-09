import { Link, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { ManhattanBriefSubscribe } from "@/components/ManhattanBriefSubscribe";
import { PerspectiveCard } from "@/components/PerspectiveCard";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import {
  formatPerspectiveDate,
  getPerspectiveBySlug,
  perspectives,
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
  const [, params] = useRoute("/perspectives/:slug");
  const article = params?.slug ? getPerspectiveBySlug(params.slug) : undefined;

  usePageMetadata({
    title: article ? article.title : "Perspective Not Found",
    description: article?.excerpt ?? "Manhattan observations from Agent Kammer.",
    path: article ? `/perspectives/${article.slug}` : undefined,
  });

  if (!article) {
    return <NotFound />;
  }

  const related = perspectives.filter((p) => p.slug !== article.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-brand-ivory text-brand-graphite">
      <section className="bg-brand-midnight px-6 py-14 text-brand-ivory lg:px-10 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <Link href="/perspectives">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-champagne transition hover:text-brand-ivory">
              ← Perspectives
            </span>
          </Link>
          <p className="mt-6 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-brand-champagne">
            {article.category} · {formatPerspectiveDate(article.publishedAt)} · {article.readMinutes} min read
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.02] md:text-5xl lg:text-6xl">
            {article.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-brand-ivory/82">{article.excerpt}</p>
        </div>
      </section>

      <article className="px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-3xl space-y-10">
          {sectionLabels.map(({ key, label }) => (
            <section key={key}>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-champagne">{label}</p>
              <p className="mt-3 text-base leading-7 text-brand-graphite/78">{article.sections[key]}</p>
            </section>
          ))}
        </div>
      </article>

      <section className="border-t border-brand-midnight/10 bg-[#f7f3ea] px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Continue Reading</p>
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <PerspectiveCard key={item.slug} article={item} />
            ))}
          </div>
          <div className="mt-8">
            <Link href="/perspectives">
              <Button variant="brandOutline">View All Perspectives</Button>
            </Link>
          </div>
        </div>
      </section>

      <ManhattanBriefSubscribe />
    </main>
  );
}

import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { PerspectiveContentTag } from "@/components/PerspectiveContentTag";
import { formatPerspectiveDate, type Perspective } from "@/data/perspectives";

type PerspectiveCardProps = {
  article: Perspective;
  featured?: boolean;
};

export function PerspectiveCard({ article, featured = false }: PerspectiveCardProps) {
  if (featured) {
    return (
      <Link href={`/perspectives/${article.slug}`}>
        <Card className="group rounded-none border border-brand-champagne/40 bg-white/80 p-6 shadow-none transition hover:-translate-y-0.5 hover:border-brand-champagne lg:p-8">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-brand-champagne-dark">Featured</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <PerspectiveContentTag contentType={article.contentType} />
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-brand-graphite/48">
              {formatPerspectiveDate(article.publishedAt)} · {article.readMinutes} min
            </p>
          </div>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-brand-midnight transition group-hover:text-brand-sapphire md:text-4xl">
            {article.title}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-brand-graphite/74">{article.excerpt}</p>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-brand-champagne-dark">Read perspective</p>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/perspectives/${article.slug}`}>
      <Card className="group flex h-full flex-col rounded-none border border-brand-champagne/30 bg-white/76 p-5 shadow-none transition hover:-translate-y-0.5 hover:border-brand-champagne/60">
        <PerspectiveContentTag contentType={article.contentType} />
        <h3 className="mt-3 font-serif text-xl font-semibold leading-snug text-brand-midnight transition group-hover:text-brand-sapphire">
          {article.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-brand-graphite/68">{article.excerpt}</p>
        <p className="mt-4 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-brand-graphite/46">
          {formatPerspectiveDate(article.publishedAt)} · {article.readMinutes} min
        </p>
      </Card>
    </Link>
  );
}

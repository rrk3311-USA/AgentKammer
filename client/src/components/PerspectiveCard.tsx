import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { PerspectiveContentTag } from "@/components/PerspectiveContentTag";
import { formatPerspectiveDate, type Perspective } from "@/data/perspectives";
import { surfaceCard, typeBody, typeH2, typeH3, typeSmall } from "@/lib/design-system";
import { cn } from "@/lib/utils";

type PerspectiveCardProps = {
  article: Perspective;
  featured?: boolean;
};

export function PerspectiveCard({ article, featured = false }: PerspectiveCardProps) {
  if (featured) {
    return (
      <Link href={`/insights/${article.slug}`}>
        <Card className={cn(surfaceCard, "group p-8 hover:opacity-95 lg:p-10")}>
          <p className={typeSmall}>Featured</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <PerspectiveContentTag contentType={article.contentType} />
            <p className={typeSmall}>
              {formatPerspectiveDate(article.publishedAt)} · {article.readMinutes} min
            </p>
          </div>
          <h2 className={cn(typeH2, "mt-6 transition-opacity duration-brand ease-brand-out group-hover:opacity-80")}>
            {article.title}
          </h2>
          <p className={cn(typeBody, "mt-6 max-w-reading")}>{article.excerpt}</p>
          <p className="mt-8 text-body-sm font-medium text-brand-navy-secondary transition-opacity duration-brand ease-brand-out group-hover:opacity-80">
            Continue Reading →
          </p>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/insights/${article.slug}`}>
      <Card className={cn(surfaceCard, "group flex h-full flex-col p-8 hover:opacity-95")}>
        <PerspectiveContentTag contentType={article.contentType} />
        <h3 className={cn(typeH3, "mt-4 transition-opacity duration-brand ease-brand-out group-hover:opacity-80")}>
          {article.title}
        </h3>
        <p className={cn(typeBody, "mt-4 flex-1")}>{article.excerpt}</p>
        <p className={cn(typeSmall, "mt-6")}>
          {formatPerspectiveDate(article.publishedAt)} · {article.readMinutes} min
        </p>
      </Card>
    </Link>
  );
}

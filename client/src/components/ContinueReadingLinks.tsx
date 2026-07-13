import { Link } from "wouter";
import type { IntelligenceHubLink } from "@/data/intelligence-hub";
import { continueReadingDefaults } from "@/data/intelligence-hub";

type ContinueReadingLinksProps = {
  links?: IntelligenceHubLink[];
  excludeHref?: string;
};

export function ContinueReadingLinks({ links = continueReadingDefaults, excludeHref }: ContinueReadingLinksProps) {
  const items = links.filter((item) => item.status === "live" && item.href !== excludeHref).slice(0, 3);

  if (items.length === 0) return null;

  return (
    <section className="border-t border-brand-midnight/10 bg-brand-warm px-6 py-14 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-champagne">Continue Reading</p>
        <ul className="mt-8 space-y-5">
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="group block">
                <p className="font-serif text-lg font-semibold text-brand-midnight transition group-hover:text-brand-champagne-dark">
                  {item.label} →
                </p>
                {item.description ? (
                  <p className="mt-1 text-sm leading-6 text-brand-graphite/65">{item.description}</p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

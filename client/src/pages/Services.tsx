import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { CTA } from "@/components/site-shell";
import { decisionNavigationGroups } from "@/data/decision-navigation";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const lifeChanges = decisionNavigationGroups.find((group) => group.title === "Life Changes");
const buyerGuides = decisionNavigationGroups.find((group) => group.title === "Buyer Guides");

export default function Services() {
  usePageMetadata({
    title: "Decision Briefs",
    description: "Decision briefs for Agent Kammer — start from what changed, not from inventory.",
    path: "/services",
  });

  const featured = [...(lifeChanges?.items.slice(0, 6) ?? []), ...(buyerGuides?.items.slice(0, 4) ?? [])];

  return (
    <main className="bg-brand-ivory">
      <section className="border-b border-brand-border">
        <div className="mx-auto max-w-site px-6 py-16 lg:px-10 lg:py-24">
          <p className="text-[11px] uppercase tracking-[0.24em] text-brand-cocoa">Decision Briefs</p>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.8rem,5.5vw,5.25rem)] leading-[0.9] tracking-[-0.03em] text-brand-navy">
            The first question is whether anything should change at all.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-brand-graphite">
            Each brief is a short editorial on a life change or trade-off — not a service menu. Read one. Then take the Decision Assessment if the question is still open.
          </p>
        </div>
      </section>

      <section className="border-b border-brand-border">
        <div className="mx-auto max-w-site px-6 py-16 lg:px-10 lg:py-20">
          <div className="border-t border-brand-border">
            {featured.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className="group flex items-baseline justify-between gap-6 border-b border-brand-border py-6"
              >
                <span className="font-display text-2xl leading-none text-brand-navy transition-colors group-hover:text-brand-brass md:text-3xl">
                  {item.label}
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-brand-navy/35 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-brass" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm leading-7 text-brand-graphite">
            Looking for a specific situation? Use the Research Library search in the footer — or{" "}
            <Link href="/belonging" className="text-brand-navy underline decoration-brand-brass/50 underline-offset-4 hover:text-brand-brass">
              start with belonging
            </Link>
            .
          </p>
        </div>
      </section>

      <CTA />
    </main>
  );
}

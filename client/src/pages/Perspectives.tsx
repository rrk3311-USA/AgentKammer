import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { CTA, PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const insights = [
  {
    title: "Why building quality matters more than raw inventory count.",
    href: "/building-reports/individual-buildings",
  },
  {
    title: "How neighborhood framing reduces buyer indecision earlier in the process.",
    href: "/building-reports/neighborhood-guides",
  },
  {
    title: "What short market briefs should clarify before a client schedules a call.",
    href: "/building-reports/market-briefs",
  },
];

export default function Perspectives() {
  usePageMetadata({
    title: "Insights",
    description: "Insights page for the updated Agent Kammer local site.",
    path: "/insights",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Insights"
        title="Editorial notes that connect the market to practical decisions."
        description="The insights page works as a bridge between the advisory pages and the report library. It should feel intelligent and selective, not crowded."
      />

      <PageSection>
        <SectionHeading
          eyebrow="Recent Notes"
          title="A concise set of observations keeps the section useful."
          description="These cards route naturally into the Building Reports sub-pages, keeping the site connected through one consistent navigation model."
        />
        <div className="mt-12 grid gap-6">
          {insights.map((item) => (
            <Link key={item.title} href={item.href} className="rounded-card border border-brand-border bg-white p-8 transition-transform hover:-translate-y-1">
              <p className="text-[11px] uppercase tracking-[0.22em] text-brand-brass">Insight</p>
              <h3 className="mt-4 font-display text-4xl leading-[0.98] tracking-[-0.03em] text-brand-navy">{item.title}</h3>
              <span className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-brand-navy">
                Read next
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </span>
            </Link>
          ))}
        </div>
      </PageSection>

      <CTA
        title="Need a more tailored read than a public insight note can provide?"
        description="Use contact to turn the observation into a real search, building, or relocation brief."
      />
    </main>
  );
}

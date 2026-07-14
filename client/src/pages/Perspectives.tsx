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
    description: "Selective Agent Kammer insights on Manhattan buildings, neighborhoods, timing, and housing decisions.",
    path: "/insights",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Insights"
        title="Editorial notes that connect the market to practical decisions."
        description="Short observations for people who need more than listing alerts: building quality, neighborhood fit, timing pressure, and the trade-offs that shape a better housing decision."
        art="insights"
      />

      <PageSection>
        <SectionHeading
          eyebrow="Recent Notes"
          title="Read the note that matches the decision in front of you."
          description="Each insight points toward a practical next step: compare buildings, narrow a neighborhood, understand timing, or decide whether waiting is the wiser move."
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
        title="Need a more tailored read than a public note can provide?"
        description="Request a call to turn the observation into a decision brief for your building, neighborhood, timeline, or move question."
      />
    </main>
  );
}

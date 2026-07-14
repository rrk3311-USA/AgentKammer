import { CTA, PageHero, PageSection, ReportSubnav, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const briefs = [
  "Pricing is holding in the best-positioned buildings while secondary inventory still needs sharper negotiation.",
  "Executives relocating on compressed timelines are prioritizing turnkey quality and service consistency over sheer square footage.",
  "Neighborhood selection remains the main leverage point for buyers balancing design preference with budget discipline.",
];

export default function Intelligence() {
  usePageMetadata({
    title: "Market Briefs",
    description: "Concise Manhattan market briefs for pricing pressure, timing, inventory quality, and housing decision strategy.",
    path: "/building-reports/market-briefs",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Building Reports"
        title="Market Briefs"
        description="Market briefs translate pricing pressure, inventory quality, buyer behavior, and timing risk into practical guidance: move now, negotiate, wait, widen the search, or do nothing yet."
        art="market-briefs"
      />
      <ReportSubnav />

      <PageSection>
        <SectionHeading
          eyebrow="Current Framing"
          title="Short market notes should answer one question: what should this change?"
          description="The best brief does not chase headlines. It tells a client whether today’s market should affect timing, budget, neighborhood choice, building selection, or negotiation posture."
        />
        <div className="mt-12 grid gap-6">
          {briefs.map((brief, index) => (
            <div key={brief} className="rounded-card border border-brand-border bg-white p-8">
              <p className="text-[11px] uppercase tracking-[0.22em] text-brand-brass">Brief 0{index + 1}</p>
              <p className="mt-4 font-display text-3xl leading-[1.05] tracking-[-0.03em] text-brand-navy">{brief}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <CTA
        title="Need the brief translated into a live decision?"
        description="Request a call to turn market context into a recommendation for your timing, building target, or neighborhood plan."
      />
    </main>
  );
}

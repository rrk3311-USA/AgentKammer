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
    description: "Market brief pages within the Building Reports section.",
    path: "/building-reports/market-briefs",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Building Reports"
        title="Market Briefs"
        description="Market briefs are concise by design. They give visitors a quick read on timing, pricing pressure, and pattern recognition without turning the site into a news feed."
      />
      <ReportSubnav />

      <PageSection>
        <SectionHeading
          eyebrow="Current Framing"
          title="Short-form market commentary should feel selective and useful."
          description="The updated brand system supports briefs that read more like executive notes than blog posts. The visual hierarchy keeps them skimmable while still feeling premium."
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
        description="Use contact to move from broad market notes into a real building or relocation plan."
      />
    </main>
  );
}

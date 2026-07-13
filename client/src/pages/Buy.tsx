import { CTA, PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const phases = [
  {
    title: "Brief Calibration",
    text: "Clarify budget, neighborhoods, building preferences, and timing constraints before inventory review begins.",
  },
  {
    title: "Search Design",
    text: "Reduce the field to the right set of buildings and layouts instead of reviewing every available listing.",
  },
  {
    title: "Execution",
    text: "Offer structure, diligence, and negotiation management are handled with an emphasis on precision and leverage.",
  },
];

export default function Buy() {
  usePageMetadata({
    title: "Buyer Advisory",
    description: "Buyer Advisory page for the updated Agent Kammer local site.",
    path: "/buyer-advisory",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Buyer Advisory"
        title="A buying process organized around fit, timing, and negotiation discipline."
        description="This page reframes the buying service as advisory work rather than generic representation. The structure is designed to show how the process narrows options and improves decision quality."
      />

      <PageSection>
        <SectionHeading
          eyebrow="Process"
          title="Three phases keep the buyer path focused and legible."
          description="The design language stays consistent with the rest of the site, but the content is tailored to the needs of acquisition planning."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {phases.map((phase) => (
            <div key={phase.title} className="rounded-card border border-brand-border bg-white p-8">
              <h3 className="font-display text-3xl leading-[0.95] tracking-[-0.03em] text-brand-navy">{phase.title}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-graphite">{phase.text}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <CTA
        title="Ready to shape a buyer brief?"
        description="The next step is a concise contact note with budget, geography, and timing."
      />
    </main>
  );
}

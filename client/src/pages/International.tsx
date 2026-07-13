import { CTA, PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const relocationPoints = [
  "Coordinate housing search against start dates, school or family priorities, and travel constraints.",
  "Use building knowledge to avoid false fits when time for touring and diligence is compressed.",
  "Create a calm transition plan that balances speed with confidence.",
];

export default function International() {
  usePageMetadata({
    title: "Executive Relocation",
    description: "Executive Relocation page for the updated Agent Kammer local site.",
    path: "/executive-relocation",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Executive Relocation"
        title="Relocation planning for executives who need confidence without extra noise."
        description="The relocation page focuses on clients managing a move under time pressure. It keeps the tone private, polished, and service-oriented while staying inside the same visual system as the rest of the site."
      />

      <PageSection className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <SectionHeading
          eyebrow="Relocation Scope"
          title="The work combines market fluency with practical transition management."
          description="The point is not only to source inventory. It is to design a move that lands well for the client and everyone affected by the timeline."
        />
        <div className="grid gap-4">
          {relocationPoints.map((point, index) => (
            <div key={point} className="rounded-card border border-brand-border bg-white p-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-brand-brass">0{index + 1}</p>
              <p className="mt-3 text-base leading-8 text-brand-navy">{point}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <CTA
        title="Planning a move on a tight clock?"
        description="Use the contact page to outline timing, household needs, and preferred neighborhoods."
      />
    </main>
  );
}

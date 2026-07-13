import { CTA, PageHero, PageSection, ReportSubnav, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const buildings = [
  {
    name: "111 West 57th Street",
    note: "Ultra-prime positioning, architectural identity, and a buyer profile driven by singularity.",
  },
  {
    name: "15 Hudson Yards",
    note: "Service-forward tower inventory for buyers seeking convenience, wellness, and new-development finish quality.",
  },
  {
    name: "Lantern House",
    note: "Design-led West Chelsea inventory with stronger aesthetic differentiation and outdoor appeal.",
  },
  {
    name: "One High Line",
    note: "A newer west-side address where view logic and building identity matter as much as floor plan count.",
  },
];

export default function BuildingReport() {
  usePageMetadata({
    title: "Individual Buildings",
    description: "Individual building report pages within the Agent Kammer Building Reports section.",
    path: "/building-reports/individual-buildings",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Building Reports"
        title="Individual Buildings"
        description="This sub-page frames how single-building coverage should read: selective, design-aware, and useful to buyers comparing address-level fit rather than just unit inventory."
      />
      <ReportSubnav />

      <PageSection>
        <SectionHeading
          eyebrow="Sample Coverage"
          title="Selected buildings can be presented as precise editorial briefs."
          description="Each building card below shows the tone and density this template supports. The goal is clarity, not exhaustive data dumping."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {buildings.map((building) => (
            <div key={building.name} className="rounded-card border border-brand-border bg-white p-8">
              <p className="text-[11px] uppercase tracking-[0.22em] text-brand-brass">Building Profile</p>
              <h3 className="mt-5 font-display text-4xl leading-[0.95] tracking-[-0.03em] text-brand-navy">{building.name}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-graphite">{building.note}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <section className="border-y border-brand-border bg-white">
        <PageSection className="grid gap-6 lg:grid-cols-3">
          {["Architecture and identity", "Amenities and daily experience", "Fit relative to budget, timing, and buyer brief"].map((item, index) => (
            <div key={item} className="rounded-card border border-brand-border bg-brand-ivory p-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-brand-brass">0{index + 1}</p>
              <p className="mt-3 text-base leading-8 text-brand-navy">{item}</p>
            </div>
          ))}
        </PageSection>
      </section>

      <CTA
        title="Need a short list of buildings mapped to your brief?"
        description="The building report track works best when tied to budget, location preference, and timeline."
      />
    </main>
  );
}

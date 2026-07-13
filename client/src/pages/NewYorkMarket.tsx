import { CTA, PageHero, PageSection, ReportSubnav, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const neighborhoods = [
  {
    name: "Tribeca",
    note: "Low-volume, high-conviction buying shaped by scale, privacy, and family-oriented floor plans.",
  },
  {
    name: "West Chelsea",
    note: "Gallery adjacency, newer product, and architecture-led demand with stronger stylistic variance.",
  },
  {
    name: "Upper East Side",
    note: "Deep inventory and established service patterns with more nuanced co-op and condominium tradeoffs.",
  },
];

export default function NewYorkMarket() {
  usePageMetadata({
    title: "Neighborhood Guides",
    description: "Manhattan neighborhood guides for deciding where daily life, commute, building stock, and budget fit best.",
    path: "/building-reports/neighborhood-guides",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Building Reports"
        title="Neighborhood Guides"
        description="Neighborhood fit determines the life around the apartment. These guides help compare commute, schools, building stock, street rhythm, service access, and whether the area supports the reason for moving."
      />
      <ReportSubnav />

      <PageSection>
        <SectionHeading
          eyebrow="Market Districts"
          title="Choose geography before comparing every listing."
          description="A clearer neighborhood decision reduces search fatigue, removes false options, and makes building comparisons more honest."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {neighborhoods.map((item) => (
            <div key={item.name} className="rounded-card border border-brand-border bg-white p-8">
              <h3 className="font-display text-4xl leading-[0.95] tracking-[-0.03em] text-brand-navy">{item.name}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-graphite">{item.note}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <CTA
        title="Refine the search geography before the building list grows."
        description="Request a call to compare neighborhoods around commute, lifestyle, schools, building type, and timing."
      />
    </main>
  );
}

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
    description: "Neighborhood guide pages within the Building Reports section.",
    path: "/building-reports/neighborhood-guides",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Building Reports"
        title="Neighborhood Guides"
        description="Neighborhood guide pages sit one level above individual buildings. They contextualize inventory, atmosphere, access, and buyer fit without losing the restrained visual voice of the site."
      />
      <ReportSubnav />

      <PageSection>
        <SectionHeading
          eyebrow="Market Districts"
          title="Neighborhood pages should help visitors decide where to focus before comparing specific buildings."
          description="These guides work best when they connect daily life, architecture, and inventory tempo in a way that reduces search fatigue."
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
        description="Neighborhood framing is often the fastest way to improve buyer focus and reduce noise."
      />
    </main>
  );
}

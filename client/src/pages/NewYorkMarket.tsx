import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { CTA, PageHero, PageSection, ReportSubnav, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const neighborhoods = [
  {
    name: "Upper West Side",
    note: "Schools, park adjacency, co-op culture, and classic residential rhythm. Strong for families who want daily life west of the park before chasing inventory.",
    stock: "Deep co-op stock, classic full-service buildings, selective condominiums",
    bestFor: "School logistics, park life, established residential blocks",
    avoidIf: "You need brand-new amenity towers as the primary brief",
    href: "/services/upper-west-side-buyers-nyc",
  },
  {
    name: "Upper East Side",
    note: "Deep inventory with nuanced co-op boards, service buildings, and family-oriented tradeoffs across quieter side streets and avenues.",
    stock: "Co-op heavy, strong service condominiums, townhouse pockets",
    bestFor: "Board-ready buyers, schools, established Upper East routines",
    avoidIf: "You want downtown loft culture or Hudson Yards amenity density",
    href: "/services/upper-east-side-buyers-nyc",
  },
  {
    name: "Tribeca",
    note: "Low-volume, high-conviction buying shaped by loft scale, privacy, and family floor plans. Architecture appeal must still survive ownership practicality.",
    stock: "Converted lofts, boutique condominiums, limited resale velocity",
    bestFor: "Scale, privacy, downtown family living",
    avoidIf: "You need broad inventory and fast comparable depth",
    href: "/services/tribeca-buyers-nyc",
  },
  {
    name: "Chelsea",
    note: "Gallery adjacency, West Chelsea new product, High Line access, and design-forward towers that still need lifestyle filters.",
    stock: "Mix of classic Chelsea and West Chelsea new development",
    bestFor: "Design-led living, walkability, cultural density",
    avoidIf: "You want quiet co-op culture above all else",
    href: "/services/chelsea-buyers-nyc",
  },
  {
    name: "Hudson Yards",
    note: "Amenity-heavy new development that still needs commute, carrying-cost, and use-case pressure testing against Chelsea and Tribeca alternatives.",
    stock: "Large condominium towers, amenity packages, newer inventory",
    bestFor: "Corporate relocators, amenity-forward weekday living",
    avoidIf: "You prioritize neighborhood texture over tower infrastructure",
    href: "/services/hudson-yards-buyers-nyc",
  },
  {
    name: "Financial District",
    note: "Commute convenience versus weekend livability across conversions, waterfront stock, and Battery Park City options.",
    stock: "Conversions, waterfront condominiums, mixed service quality",
    bestFor: "Downtown commute, pied-à-terre or primary with office gravity",
    avoidIf: "Weekend lifestyle and street rhythm are the main brief",
    href: "/services/financial-district-buyers-nyc",
  },
];

export default function NewYorkMarket() {
  usePageMetadata({
    title: "Neighborhood Guides",
    description:
      "Manhattan neighborhood guides for Upper West Side, Upper East Side, Tribeca, Chelsea, Hudson Yards, and the Financial District.",
    path: "/building-reports/neighborhood-guides",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Building Reports"
        title="Neighborhood Guides"
        description="Neighborhood fit determines the life around the apartment. Compare commute, schools, building stock, street rhythm, and whether the area supports the reason for moving — before the listing tour expands."
        art="neighborhood-guides"
      />
      <ReportSubnav />

      <PageSection>
        <SectionHeading
          eyebrow="Choose Geography First"
          title="A clearer neighborhood decision reduces search fatigue."
          description="Lock one or two districts before comparing every building. False options disappear faster when lifestyle and ownership culture are filtered early."
        />
        <div className="mt-12 grid gap-6">
          {neighborhoods.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group rounded-card border border-brand-border bg-white p-8 transition-colors hover:border-brand-navy/30"
            >
              <h3 className="font-display text-4xl leading-[0.95] tracking-[-0.03em] text-brand-navy">{item.name}</h3>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-brand-graphite">{item.note}</p>
              <div className="mt-6 grid gap-4 border-t border-brand-border pt-5 text-sm leading-7 text-brand-graphite md:grid-cols-3">
                <p>
                  <span className="text-[11px] uppercase tracking-[0.16em] text-brand-cocoa">Stock</span>
                  <br />
                  {item.stock}
                </p>
                <p>
                  <span className="text-[11px] uppercase tracking-[0.16em] text-brand-cocoa">Best for</span>
                  <br />
                  {item.bestFor}
                </p>
                <p>
                  <span className="text-[11px] uppercase tracking-[0.16em] text-brand-cocoa">Avoid if</span>
                  <br />
                  {item.avoidIf}
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-brand-navy">
                Open Decision Brief
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
              </span>
            </Link>
          ))}
        </div>
      </PageSection>

      <CTA
        title="Refine the search geography before the building list grows."
        description="Begin a Housing Strategy Session to compare neighborhoods around commute, lifestyle, schools, building type, and timing."
      />
    </main>
  );
}

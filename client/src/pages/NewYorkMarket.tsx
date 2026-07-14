import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { CTA, PageHero, PageSection, ReportSubnav, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const neighborhoods = [
  {
    name: "Upper West Side",
    note: "Schools, park adjacency, co-op culture, and classic residential rhythm before the listing tour expands.",
    href: "/services/upper-west-side-buyers-nyc",
  },
  {
    name: "Upper East Side",
    note: "Deep inventory with nuanced co-op boards, service buildings, and family-oriented tradeoffs.",
    href: "/services/upper-east-side-buyers-nyc",
  },
  {
    name: "Tribeca",
    note: "Low-volume, high-conviction buying shaped by loft scale, privacy, and family floor plans.",
    href: "/services/tribeca-buyers-nyc",
  },
  {
    name: "Chelsea",
    note: "Gallery adjacency, newer West Chelsea product, and architecture-led demand with real lifestyle filters.",
    href: "/services/chelsea-buyers-nyc",
  },
  {
    name: "Hudson Yards",
    note: "Amenity-heavy new development that still needs commute, carrying-cost, and use-case pressure testing.",
    href: "/services/hudson-yards-buyers-nyc",
  },
  {
    name: "Financial District",
    note: "Commute convenience versus weekend livability across conversions, waterfront stock, and Battery Park City.",
    href: "/services/financial-district-buyers-nyc",
  },
];

export default function NewYorkMarket() {
  usePageMetadata({
    title: "Neighborhood Guides",
    description:
      "Manhattan neighborhood Decision Briefs for Upper West Side, Upper East Side, Tribeca, Chelsea, Hudson Yards, and the Financial District.",
    path: "/building-reports/neighborhood-guides",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Building Reports"
        title="Neighborhood Guides"
        description="Neighborhood fit determines the life around the apartment. These guides help compare commute, schools, building stock, street rhythm, service access, and whether the area supports the reason for moving."
        art="neighborhood-guides"
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
            <Link
              key={item.name}
              href={item.href}
              className="group rounded-card border border-brand-border bg-white p-8 transition-colors hover:border-brand-navy/30"
            >
              <h3 className="font-display text-4xl leading-[0.95] tracking-[-0.03em] text-brand-navy">{item.name}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-graphite">{item.note}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-brand-navy">
                Decision Brief
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
              </span>
            </Link>
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

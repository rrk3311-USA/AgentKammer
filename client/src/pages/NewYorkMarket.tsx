import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { CTA, PageSection, ReportSubnav, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const paper = "#F4EFE4";

const neighborhoods = [
  {
    name: "Upper West Side",
    note: "Schools, park adjacency, co-op culture, and classic residential rhythm. Strong for families who want daily life west of the park before chasing inventory.",
    stock: "Deep co-op stock, classic full-service buildings, selective condominiums",
    bestFor: "School logistics, park life, established residential blocks",
    avoidIf: "You need brand-new amenity towers as the primary brief",
    href: "/situations/upper-west-side-buyers-nyc",
    map: "/images/neighborhoods/upper-west-side.png",
    mapAlt: "Map-art of the Upper West Side west of Central Park",
  },
  {
    name: "Upper East Side",
    note: "Deep inventory with nuanced co-op boards, service buildings, and family-oriented tradeoffs across quieter side streets and avenues.",
    stock: "Co-op heavy, strong service condominiums, townhouse pockets",
    bestFor: "Board-ready buyers, schools, established Upper East routines",
    avoidIf: "You want downtown loft culture or Hudson Yards amenity density",
    href: "/situations/upper-east-side-buyers-nyc",
    map: "/images/neighborhoods/upper-east-side.png",
    mapAlt: "Map-art of the Upper East Side east of Central Park",
  },
  {
    name: "Tribeca",
    note: "Low-volume, high-conviction buying shaped by loft scale, privacy, and family floor plans. Architecture appeal must still survive ownership practicality.",
    stock: "Converted lofts, boutique condominiums, limited resale velocity",
    bestFor: "Scale, privacy, downtown family living",
    avoidIf: "You need broad inventory and fast comparable depth",
    href: "/situations/tribeca-buyers-nyc",
    map: "/images/neighborhoods/tribeca.png",
    mapAlt: "Map-art of Tribeca below Canal Street along the Hudson",
  },
  {
    name: "Chelsea",
    note: "Gallery adjacency, West Chelsea new product, High Line access, and design-forward towers that still need lifestyle filters.",
    stock: "Mix of classic Chelsea and West Chelsea new development",
    bestFor: "Design-led living, walkability, cultural density",
    avoidIf: "You want quiet co-op culture above all else",
    href: "/situations/chelsea-buyers-nyc",
    map: "/images/neighborhoods/chelsea.png",
    mapAlt: "Map-art of Chelsea with Hudson piers and the High Line",
  },
  {
    name: "Hudson Yards",
    note: "Amenity-heavy new development that still needs commute, carrying-cost, and use-case pressure testing against Chelsea and Tribeca alternatives.",
    stock: "Large condominium towers, amenity packages, newer inventory",
    bestFor: "Corporate relocators, amenity-forward weekday living",
    avoidIf: "You prioritize neighborhood texture over tower infrastructure",
    href: "/situations/hudson-yards-buyers-nyc",
    map: "/images/neighborhoods/hudson-yards.png",
    mapAlt: "Map-art of Hudson Yards rail-yard deck and Hudson Park",
  },
  {
    name: "Financial District",
    note: "Commute convenience versus weekend livability across conversions, waterfront stock, and Battery Park City options.",
    stock: "Conversions, waterfront condominiums, mixed service quality",
    bestFor: "Downtown commute, pied-à-terre or primary with office gravity",
    avoidIf: "Weekend lifestyle and street rhythm are the main brief",
    href: "/situations/financial-district-buyers-nyc",
    map: "/images/neighborhoods/financial-district.png",
    mapAlt: "Map-art of the Financial District at the southern tip of Manhattan",
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
      <section className="relative w-full overflow-hidden border-b border-brand-border" style={{ backgroundColor: paper }}>
        <img
          src="/images/neighborhoods/manhattan.png"
          alt="Map-art of Manhattan with Central Park, Broadway, and the districts in this library"
          className="block h-[clamp(270px,68vw,360px)] w-[112%] max-w-none translate-x-[6%] object-cover object-[72%_40%] opacity-[0.92] pt-6 sm:h-auto sm:w-full sm:max-w-full sm:translate-x-0 sm:object-contain sm:object-right sm:opacity-100 sm:pt-8 sm:max-h-[min(56vh,520px)] lg:max-h-[min(52vh,560px)] lg:pt-10"
        />
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-[55%] sm:hidden"
          style={{ background: `linear-gradient(to right, ${paper}, ${paper}B3, transparent)` }}
          aria-hidden
        />
        <div className="absolute inset-0 flex items-start sm:items-center">
          <div className="w-full px-6 pt-14 pb-10 sm:pt-20 md:pl-[12%] lg:px-10 lg:pb-12 lg:pl-[clamp(4rem,18vw,14rem)] lg:pt-24 xl:pl-[clamp(5rem,22vw,18rem)]">
            <p className="text-[11px] uppercase tracking-[0.24em] text-brand-cocoa">Building Reports</p>
            <h1 className="mt-6 max-w-[12ch] font-display text-[clamp(2.35rem,9vw,4.75rem)] leading-[0.92] tracking-[-0.03em] text-brand-navy sm:mt-4 sm:max-w-[16ch] sm:text-[clamp(2.4rem,5.2vw,4.75rem)]">
              Neighborhood Guides
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-7 text-brand-graphite/85 sm:text-base">
              Neighborhood fit determines the life around the apartment. Compare commute, schools, street rhythm, and whether the area supports the reason for moving.
            </p>
          </div>
        </div>
      </section>
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
              className="group overflow-hidden rounded-card border border-brand-border bg-white transition-colors hover:border-brand-navy/30"
            >
              <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(14rem,22rem)] md:items-stretch">
                <div className="p-8">
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
                </div>
                <div className="relative hidden min-h-[12rem] overflow-hidden md:block" style={{ backgroundColor: paper }}>
                  <img
                    src={item.map}
                    alt={item.mapAlt}
                    className="absolute inset-0 h-full w-full object-cover object-[78%_50%]"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </PageSection>

      <CTA
        title="Refine the search geography before the building list grows."
        description="Begin a Strategy Session to compare neighborhoods around commute, lifestyle, schools, building type, and timing."
        href="/contact?intent=strategy"
        label="Strategy Session"
        eyebrow="Strategy Session"
      />
    </main>
  );
}

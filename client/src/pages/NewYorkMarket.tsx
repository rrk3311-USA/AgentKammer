import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { CTA, PageSection, ReportSubnav, SectionHeading } from "@/components/site-shell";
import { grammar } from "@/components/visual-grammar";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { manhattanNeighborhoodGuides } from "@/data/manhattan-neighborhoods";

const paper = "#F4EFE4";

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
            <p className="text-[11px] uppercase tracking-[0.24em] text-brand-cocoa">Guides</p>
            <h1 className={`mt-6 max-w-[16ch] sm:mt-4 ${grammar.display}`}>
              Neighborhoods
            </h1>
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
          {manhattanNeighborhoodGuides.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group overflow-hidden border border-brand-border bg-white transition-colors hover:border-brand-navy/30"
            >
              <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(14rem,22rem)] md:items-stretch">
                <div className="p-8">
                  <h3 className={grammar.rowTitle}>{item.name}</h3>
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

import { Link } from "wouter";
import { ArrowRight, Building2, Map, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA, PageHero, PageSection, ReportSubnav, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const reportTypes = [
  {
    title: "Individual Buildings",
    text: "Targeted pages focused on a single asset, its positioning, design character, amenities, and buyer fit.",
    href: "/building-reports/individual-buildings",
    icon: Building2,
  },
  {
    title: "Neighborhood Guides",
    text: "High-level district views that connect architecture, lifestyle, access, and inventory rhythm.",
    href: "/building-reports/neighborhood-guides",
    icon: Map,
  },
  {
    title: "Market Briefs",
    text: "Condensed notes on pricing pressure, buyer behavior, and strategic timing for active decision-makers.",
    href: "/building-reports/market-briefs",
    icon: Newspaper,
  },
];

export default function Buildings() {
  usePageMetadata({
    title: "Building Reports",
    description: "Overview of the Building Reports section, including sub-pages for buildings, neighborhood guides, and market briefs.",
    path: "/building-reports",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Building Reports"
        title="Research-led pages that help clients see structure before making a move."
        description="The Building Reports section is split into three clear tracks: individual buildings, neighborhood guides, and market briefs. Each one serves a different stage of the decision process while keeping the same design language and navigation."
      />
      <ReportSubnav />

      <PageSection>
        <SectionHeading
          eyebrow="Section Map"
          title="Three report formats, one consistent editorial system."
          description="The pages below are designed to work as a family. They share the same spacing grid, typography, and navigation while giving each content type its own use case."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {reportTypes.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-card border border-brand-border bg-white p-8 transition-transform hover:-translate-y-1">
              <item.icon className="h-6 w-6 text-brand-brass" strokeWidth={1.5} />
              <h3 className="mt-6 font-display text-3xl leading-[0.96] tracking-[-0.03em] text-brand-navy">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-graphite">{item.text}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-brand-navy">
                Open section
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </span>
            </Link>
          ))}
        </div>
      </PageSection>

      <section className="border-y border-brand-border bg-white">
        <PageSection className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <SectionHeading
            eyebrow="Usage"
            title="Use the overview page to route the right reader to the right depth."
            description="Some visitors need building-specific detail. Others need neighborhood framing or a concise timing note. This top-level page lets those paths stay separate without breaking the visual system."
          />
          <div className="rounded-card border border-brand-border bg-brand-ivory p-8">
            <p className="font-display text-3xl leading-[0.95] tracking-[-0.03em] text-brand-navy">
              The navigation now treats Building Reports as a proper section rather than a loose collection of disconnected pages.
            </p>
            <Link href="/building-reports/individual-buildings" className="mt-8 inline-block">
              <Button variant="brand" className="gap-2 uppercase tracking-nav">
                Start with Buildings
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Button>
            </Link>
          </div>
        </PageSection>
      </section>

      <CTA
        title="Want the reports shaped around a live search brief?"
        description="Use the contact page to begin with the building or neighborhood question that matters most."
      />
    </main>
  );
}

import { Link } from "wouter";
import { ArrowRight, Building2, Map, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA, PageHero, PageSection, ReportSubnav, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const reportTypes = [
  {
    title: "Individual Buildings",
    text: "Use these when the question is whether a specific address deserves attention, caution, or a place on the shortlist.",
    href: "/building-reports/individual-buildings",
    icon: Building2,
  },
  {
    title: "Neighborhood Guides",
    text: "Use these to decide where daily life, commute, building stock, schools, and neighborhood rhythm actually support the move.",
    href: "/building-reports/neighborhood-guides",
    icon: Map,
  },
  {
    title: "Market Briefs",
    text: "Use these when timing, pricing pressure, inventory quality, or negotiation leverage could change what you should do next.",
    href: "/building-reports/market-briefs",
    icon: Newspaper,
  },
];

export default function Buildings() {
  usePageMetadata({
    title: "Building Reports",
    description: "Building Reports help Agent Kammer clients study Manhattan buildings, neighborhoods, and market timing before making a housing decision.",
    path: "/building-reports",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Building Reports"
        title="Study the building before the showing."
        description="Building Reports help separate attractive listings from durable decisions. Use them to understand address quality, neighborhood fit, timing risk, and whether a property deserves your attention at all."
        art="reports-overview"
      />
      <ReportSubnav />

      <PageSection>
        <SectionHeading
          eyebrow="Section Map"
          title="Choose the report format that matches the uncertainty."
          description="Some decisions require address-level detail. Others need neighborhood framing or a short market read before comparing property. The right report depends on what is still unclear."
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
        <PageSection className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <SectionHeading
            eyebrow="Usage"
            title="The goal is not more information. The goal is better sequence."
            description="Look at the wrong report too early and the search gets noisy. Start with the uncertainty: building quality, neighborhood fit, or timing leverage."
          />
          <div className="rounded-card border border-brand-border bg-brand-ivory p-8">
            <p className="font-display text-3xl leading-[0.95] tracking-[-0.03em] text-brand-navy">
              A strong building brief should tell you whether to keep looking, go deeper, negotiate harder, wait, or walk away.
            </p>
            <Link href="/building-reports/individual-buildings" className="mt-8 inline-flex max-w-full">
              <Button variant="brand" className="w-full max-w-full gap-2 whitespace-normal text-center uppercase tracking-nav sm:w-auto sm:whitespace-nowrap">
                Start with Buildings
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Button>
            </Link>
          </div>
        </PageSection>
      </section>

      <CTA
        title="Want the reports shaped around a live search brief?"
        description="Request a call with the building, neighborhood, or timing question that needs a sharper answer."
      />
    </main>
  );
}

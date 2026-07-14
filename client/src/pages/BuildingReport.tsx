import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { CTA, PageHero, PageSection, ReportSubnav, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { buildingReports, formatBuildingReportDate } from "@/data/building-reports";

const comingSoon = [
  {
    name: "111 West 57th Street",
    note: "Ultra-prime positioning where architecture and scarcity matter more than amenity count.",
  },
  {
    name: "15 Hudson Yards",
    note: "Service-forward tower living for buyers prioritizing convenience, wellness, and new-development finish quality.",
  },
];

export default function BuildingReport() {
  usePageMetadata({
    title: "Individual Buildings",
    description:
      "Manhattan building reports on architecture, resident fit, trade-offs, commute, and whether an address deserves a place on your shortlist.",
    path: "/building-reports/individual-buildings",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Building Reports"
        title="Individual Buildings"
        description="A single address can look perfect online and still be the wrong decision. These reports clarify architecture, service model, resale logic, board or sponsor dynamics, and whether the building fits the brief."
        art="individual-buildings"
      />
      <ReportSubnav />

      <PageSection>
        <SectionHeading
          eyebrow="Published Reports"
          title="Study the building before the apartment becomes the conversation."
          description="Each report covers executive summary, resident fit, strengths, trade-offs, neighborhood context, comparables, and a clear bottom line — including when the better move is to keep looking."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {buildingReports.map((building) => (
            <Link
              key={building.slug}
              href={`/building-reports/${building.slug}`}
              className="group rounded-card border border-brand-border bg-white p-8 transition-colors hover:border-brand-navy/30"
            >
              <p className="text-[11px] uppercase tracking-[0.22em] text-brand-brass">
                {formatBuildingReportDate(building.publishedAt)} · {building.readMinutes} min
              </p>
              <h3 className="mt-5 font-display text-4xl leading-[0.95] tracking-[-0.03em] text-brand-navy">
                {building.buildingName}
              </h3>
              <p className="mt-2 text-sm uppercase tracking-[0.14em] text-brand-cocoa">{building.location}</p>
              <p className="mt-4 text-sm leading-7 text-brand-graphite">{building.executiveSummary[0]}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-brand-navy">
                Read report
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
              </span>
            </Link>
          ))}
        </div>
      </PageSection>

      <section className="border-y border-brand-border bg-white">
        <PageSection>
          <SectionHeading
            eyebrow="On the Watchlist"
            title="Additional buildings under study."
            description="These addresses appear often in executive and design-led searches. Full reports publish as the research is ready."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {comingSoon.map((building) => (
              <div key={building.name} className="rounded-card border border-brand-border bg-brand-ivory p-8">
                <p className="text-[11px] uppercase tracking-[0.22em] text-brand-brass">Coming soon</p>
                <h3 className="mt-5 font-display text-3xl leading-[0.95] tracking-[-0.03em] text-brand-navy">{building.name}</h3>
                <p className="mt-4 text-sm leading-7 text-brand-graphite">{building.note}</p>
              </div>
            ))}
          </div>
        </PageSection>
      </section>

      <CTA
        title="Need a short list of buildings mapped to your brief?"
        description="Request a call with your target neighborhoods, timing, and budget so the building list can be filtered before tours begin."
      />
    </main>
  );
}

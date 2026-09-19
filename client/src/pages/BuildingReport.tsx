import { CTA, PageHero, PageSection, ReportSubnav, SectionHeading } from "@/components/site-shell";
import { GrammarRows, LibraryList } from "@/components/visual-grammar";
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
    title: "Building Profiles",
    description:
      "Manhattan Building Profiles on architecture, resident fit, trade-offs, commute, and whether an address deserves a place on your shortlist.",
    path: "/building-reports/individual-buildings",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Building Intelligence"
        title="Building Profiles"
        description="A single address can look perfect online and still be the wrong decision. These editorial profiles clarify architecture, service model, resale logic, board or sponsor dynamics, and whether the building fits the brief."
        art="individual-buildings"
      />
      <ReportSubnav />

      <PageSection>
        <SectionHeading
          eyebrow="Published Profiles"
          title="Study the building before the apartment becomes the conversation."
          description="Each profile covers executive summary, resident fit, strengths, trade-offs, neighborhood context, comparables, and a clear bottom line. Including when the better move is to keep looking."
        />
        <LibraryList
          items={buildingReports.map((building) => ({
            eyebrow: `${formatBuildingReportDate(building.publishedAt)} · ${building.readMinutes} min`,
            title: building.buildingName,
            text: building.executiveSummary[0],
            href: `/building-reports/${building.slug}`,
            cta: "Read profile",
          }))}
        />
      </PageSection>

      <section className="border-y border-brand-border bg-white">
        <PageSection>
          <SectionHeading
            eyebrow="On the Watchlist"
            title="Additional buildings under study."
            description="These addresses appear often in executive and design-led searches. Full profiles publish as the research is ready."
          />
          <GrammarRows
            items={comingSoon.map((building) => ({
              eyebrow: "Coming soon",
              title: building.name,
              text: building.note,
            }))}
          />
        </PageSection>
      </section>

      <CTA
        title="Need judgment on an address?"
        description="Share your target neighborhoods, timing, and budget. A Property Assessment is the address review. Livability Score stays on the Tools desk."
        href="/contact?intent=property"
        label="Property Assessment"
        eyebrow="Property Assessment"
      />
    </main>
  );
}

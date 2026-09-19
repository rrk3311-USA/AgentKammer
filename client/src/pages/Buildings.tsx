import { Link } from "wouter";
import { CTA, PageHero, ReportSubnav } from "@/components/site-shell";
import { LibraryList, grammar } from "@/components/visual-grammar";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { buildingReports, formatBuildingReportDate } from "@/data/building-reports";

const reportTypes = [
  {
    title: "Building Profiles",
    text: "Use these when the question is whether a specific address deserves attention, caution, or a place on the shortlist.",
    href: "/building-reports/individual-buildings",
    cta: "Open section",
  },
  {
    title: "Neighborhood Guides",
    text: "Use these to decide where daily life, commute, building stock, schools, and neighborhood rhythm actually support the move.",
    href: "/building-reports/neighborhood-guides",
    cta: "Open section",
  },
  {
    title: "Market Briefs",
    text: "Use these when timing, pricing pressure, inventory quality, or negotiation leverage could change what you should do next.",
    href: "/building-reports/market-briefs",
    cta: "Open section",
  },
];

export default function Buildings() {
  usePageMetadata({
    title: "Building Intelligence",
    description:
      "Building Intelligence helps Agent Kammer clients study Manhattan buildings, neighborhoods, and market timing before making a housing decision.",
    path: "/building-reports",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Building Intelligence"
        title="Study the building before the showing."
        description="Building Profiles separate attractive listings from durable decisions. Address quality, neighborhood fit, timing risk, and whether a property deserves your attention at all."
        art="reports-overview"
      />
      <ReportSubnav />

      <section className="border-b border-brand-border bg-brand-ivory">
        <div className={`${grammar.pad} lg:py-28`}>
          <p className={grammar.eyebrow}>Start Here</p>
          <h2 className={`mt-4 ${grammar.section}`}>Choose the format that matches the uncertainty.</h2>
          <p className={`mt-5 ${grammar.body}`}>
            Some decisions need address-level detail. Others need neighborhood framing or a short market read before comparing property.
          </p>
          <LibraryList columns={3} items={reportTypes} />
        </div>
      </section>

      <section className="border-b border-brand-border bg-white">
        <div className={`${grammar.pad} lg:py-28`}>
          <p className={grammar.eyebrow}>Featured Building Profiles</p>
          <h2 className={`mt-4 ${grammar.section}`}>Published address studies.</h2>
          <p className={`mt-5 ${grammar.body}`}>
            Editorial profiles with resident fit, trade-offs, comparables, and a bottom line. Including when to walk away.
          </p>
          <LibraryList
            items={buildingReports.map((report) => ({
              eyebrow: `${formatBuildingReportDate(report.publishedAt)} · ${report.readMinutes} min`,
              title: report.buildingName,
              text: report.executiveSummary[0],
              href: `/building-reports/${report.slug}`,
              cta: "Read profile",
            }))}
          />
          <Link href="/building-reports/individual-buildings" className={`${grammar.textLink} mt-8`}>
            All Building Profiles
          </Link>
        </div>
      </section>

      <CTA
        title="Need judgment on an address?"
        description="Request a Property Assessment. Livability Score stays on the Tools desk, separate from this review."
        href="/contact?intent=property"
        label="Property Assessment"
        eyebrow="Property Assessment"
      />
    </main>
  );
}

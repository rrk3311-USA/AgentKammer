import { Link } from "wouter";
import { ArrowRight, Building2, Map, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA, PageHero, PageSection, ReportSubnav, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { buildingReports, formatBuildingReportDate } from "@/data/building-reports";

const reportTypes = [
  {
    title: "Building Profiles",
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
    title: "Building Intelligence",
    description:
      "Building Intelligence helps Agent Kammer clients study Manhattan buildings, neighborhoods, and market timing before making a housing decision.",
    path: "/building-reports",
  });

  return (
    <main className="bg-brand-paper">
      <PageHero
        eyebrow="Building Intelligence"
        title="Study the building before the showing."
        description="Building Profiles separate attractive listings from durable decisions. Address quality, neighborhood fit, timing risk, and whether a property deserves your attention at all."
        art="reports-overview"
      />
      <ReportSubnav />

      <PageSection>
        <SectionHeading
          eyebrow="Start Here"
          title="Choose the format that matches the uncertainty."
          description="Some decisions need address-level detail. Others need neighborhood framing or a short market read before comparing property."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {reportTypes.map((item) => (
            <Link key={item.href} href={item.href} className="ak-card rounded-card p-8 transition-colors hover:border-brand-navy/40">
              <item.icon className="h-6 w-6 text-brand-navy" strokeWidth={1.5} />
              <h3 className="ak-heading mt-6">{item.title}</h3>
              <p className="ak-meta mt-4">{item.text}</p>
              <span className="ak-nav-link mt-8 inline-flex items-center gap-2 text-brand-navy">
                Open section
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </span>
            </Link>
          ))}
        </div>
      </PageSection>

      <section className="border-y border-brand-border">
        <PageSection>
          <SectionHeading
            eyebrow="Featured Building Profiles"
            title="Published address studies."
            description="Editorial profiles with resident fit, trade-offs, comparables, and a bottom line. Including when to walk away."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {buildingReports.map((report) => (
              <Link
                key={report.slug}
                href={`/building-reports/${report.slug}`}
              className="ak-card rounded-card p-7 transition-colors hover:border-brand-navy/40"
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-brand-brass">
                  {formatBuildingReportDate(report.publishedAt)} · {report.readMinutes} min
                </p>
                <h3 className="mt-4 font-display text-3xl text-brand-navy">{report.buildingName}</h3>
                <p className="mt-3 text-sm leading-7 text-brand-graphite">{report.executiveSummary[0]}</p>
              </Link>
            ))}
          </div>
          <Link href="/building-reports/individual-buildings" className="mt-8 inline-flex">
            <Button variant="brand" className="gap-2 uppercase tracking-nav">
              All Building Profiles
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Button>
          </Link>
        </PageSection>
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

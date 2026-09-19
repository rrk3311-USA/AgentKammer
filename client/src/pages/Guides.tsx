import { useEffect } from "react";
import { Link } from "wouter";
import { PageHero, ReportSubnav } from "@/components/site-shell";
import { DarkStatement, LibraryList, ModuleCards, ModuleIntro, ModuleSection, grammar } from "@/components/visual-grammar";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { publicGuides } from "@/data/guides";
import { buildingReports, formatBuildingReportDate } from "@/data/building-reports";
import {
  executiveHousingReports,
  formatExecutiveHousingReportDate,
} from "@/data/executive-housing-reports";
import { manhattanNeighborhoodGuides } from "@/data/manhattan-neighborhoods";

const featuredTitles = [
  "How Real Estate Ownership Works",
  "Condo vs Co-op",
  "How Mortgages Work",
  "International Buyer Hub Guide",
];

const kammerMarketNotes = [
  {
    date: "July 2026",
    title: "Prime buildings still hold; secondary inventory needs sharper negotiation.",
    text: "Well-positioned Manhattan condominiums with clear identity and service quality are retaining asking discipline. Secondary or less distinctive inventory is absorbing more buyer leverage.",
  },
  {
    date: "July 2026",
    title: "Relocation clients are buying turnkey service over raw square footage.",
    text: "Executives and international movers on compressed timelines are prioritizing concierge quality, lock-and-leave ease, and predictable building operations. Even when that means fewer rooms.",
  },
  {
    date: "June 2026",
    title: "Neighborhood choice remains the highest-leverage decision before listings.",
    text: "Buyers who start with apartments before geography burn weeks comparing incompatible lifestyles. Lock a neighborhood thesis before touring.",
  },
  {
    date: "June 2026",
    title: "New-development concessions are real; carrying costs still decide fit.",
    text: "Sponsor incentives can improve entry price, but common charges, tax abatement cliffs, and resale depth determine whether the deal remains sensible five years later.",
  },
];

export default function Guides() {
  usePageMetadata({
    title: "Guides",
    description:
      "Educational guides from Agent Kammer: ownership structures, neighborhood fit, and Property Assessment.",
    path: "/guides",
  });

  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.replace("#", "");
      if (!id) return;
      const el = document.getElementById(id);
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
      }
    };
    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  const featured = publicGuides.filter((guide) => featuredTitles.includes(guide.title));
  const reference = publicGuides.filter((guide) => !featuredTitles.includes(guide.title));

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Guides"
        title="Clear frameworks before listings."
        description="One knowledge library: decision frameworks, neighborhood fit, and Property Assessment. Study structure before you study a listing."
        art="guides"
      />
      <ReportSubnav />

      <ModuleSection id="decision-guides" surface="white">
        <div className={grammar.padLoose}>
          <ModuleIntro
            eyebrow="Decision Guides"
            title="Begin with the frameworks."
            description="Condo vs co-op, mortgages, ownership, deeds, liens, and the rest of the decision model — before anyone looks at a building."
          />
          <LibraryList
            columns={2}
            items={featured.map((guide) => ({
              title: guide.title,
              text: guide.description,
              href: guide.href,
              cta: "Open guide",
            }))}
          />
          <p className={`${grammar.eyebrow} mt-16`}>Reference</p>
          <LibraryList
            columns={3}
            items={reference.map((guide) => ({
              title: guide.title,
              text: guide.description,
              href: guide.href,
              cta: "Open guide",
            }))}
          />
        </div>
      </ModuleSection>

      <ModuleSection id="neighborhoods" surface="mist">
        <div className={grammar.padLoose}>
          <ModuleIntro
            eyebrow="Neighborhoods"
            title="Geography before inventory."
            description="Tribeca, Chelsea, Hudson Yards, the Upper West Side, and the other Manhattan briefs. Lock one or two districts before comparing buildings."
          />
          <ModuleCards
            columns={3}
            items={manhattanNeighborhoodGuides.map((item) => ({
              label: item.name,
              text: item.note,
              href: item.href,
            }))}
          />
        </div>
      </ModuleSection>

      <ModuleSection id="kammer-report" surface="stone">
        <div className={grammar.padLoose}>
          <ModuleIntro
            eyebrow="Property Assessment"
            title="What I’m observing about Manhattan."
            description="The archive of reports actually produced: executive housing intelligence and address studies. Building Profiles stay in this library; they are not a separate public category."
          />
          <LibraryList
            columns={2}
            items={[
              ...executiveHousingReports.map((report) => ({
                eyebrow: `${formatExecutiveHousingReportDate(report.publishedAt)} · ${report.readMinutes} min`,
                title: report.title,
                text: report.subtitle,
                href: `/insights/reports/${report.slug}`,
                cta: "Read report",
              })),
              ...buildingReports.map((report) => ({
                eyebrow: `${formatBuildingReportDate(report.publishedAt)} · ${report.readMinutes} min`,
                title: report.buildingName,
                text: report.executiveSummary[0],
                href: `/building-reports/${report.slug}`,
                cta: "Read report",
              })),
            ]}
          />
          <div className="mt-16 border-t border-brand-border pt-12">
            <p className={grammar.eyebrow}>Recent notes</p>
            <ul className="mt-8 space-y-8">
              {kammerMarketNotes.map((note) => (
                <li key={note.title}>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-brand-cocoa">{note.date}</p>
                  <p className={`${grammar.rowTitle} mt-2`}>{note.title}</p>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-brand-graphite">{note.text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-12 text-base leading-7 text-brand-graphite">
              Address studies in full sit with{" "}
              <Link href="/building-reports/individual-buildings" className="text-brand-navy underline underline-offset-4">
                Building Profiles
              </Link>
              . They are reachable from here, not a header destination.
            </p>
          </div>
        </div>
      </ModuleSection>

      <DarkStatement
        eyebrow="Next"
        title="If the question is a life change, start there."
        description="Guides explain the model. Situations name what changed. Start Here is how we work together."
        href="/situations"
        label="Situations"
      />
    </main>
  );
}

import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { CTA, PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { DecisionFramework } from "@/components/DecisionFramework";
import { LibraryList, grammar } from "@/components/visual-grammar";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { perspectives } from "@/data/perspectives";
import { buildingReports, formatBuildingReportDate } from "@/data/building-reports";
import { KAMMER_VERDICTS, PUBLIC_PRODUCTS } from "@/data/public-menu";
import { openDecisionAssistant } from "@/lib/decision-assistant";

const ladder = [
  {
    name: PUBLIC_PRODUCTS.guidance.label,
    text: PUBLIC_PRODUCTS.guidance.text,
    href: PUBLIC_PRODUCTS.guidance.href,
    cta: `Ask the ${PUBLIC_PRODUCTS.guidance.advisor}`,
    openChat: true,
  },
  {
    name: PUBLIC_PRODUCTS.situation.label,
    text: PUBLIC_PRODUCTS.situation.text,
    href: PUBLIC_PRODUCTS.situation.href,
    cta: "Begin Situation Assessment",
  },
  {
    name: PUBLIC_PRODUCTS.property.label,
    text: PUBLIC_PRODUCTS.property.text,
    href: PUBLIC_PRODUCTS.property.href,
    cta: "Request Property Assessment",
  },
  {
    name: PUBLIC_PRODUCTS.livability.label,
    text: PUBLIC_PRODUCTS.livability.text,
    href: PUBLIC_PRODUCTS.livability.href,
    cta: "Request Livability Score",
  },
] as const;

const afterSession = [
  {
    name: "Acquisition Dossier",
    text: "Full acquisition judgment. Offered by invitation after the relationship begins. Not a first public card.",
  },
  {
    name: "Advisory memberships",
    text: "Continuity when decisions keep evolving. Nested behind the hour. Not sold as an equal primary offer.",
  },
] as const;

export default function IntelligenceHome() {
  const insightPreview = perspectives
    .slice()
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3);

  usePageMetadata({
    title: "Intelligence",
    description:
      "One public ladder: Guidance, Situation Assessment, Property Assessment, and Livability Score.",
    path: "/intelligence",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Intelligence"
        title="One public ladder. Four names."
        description="Guidance, Situation Assessment, Property Assessment, and Livability Score on the Tools desk. Dossier and memberships follow by invitation."
        art="decision-framework"
      />

      <DecisionFramework
        eyebrow="The Ladder"
        title="How the work is offered in public."
        description={`One sequence. No overlapping SKUs. ${PUBLIC_PRODUCTS.livability.label} stays on the Tools desk, not merged into Property Assessment. Verdicts use ${KAMMER_VERDICTS.join(", ")}, and WHO. Not a /100 score.`}
        items={ladder.map((level, index) => ({
          step: String(index + 1).padStart(2, "0"),
          title: level.name,
          text: level.text,
          href: "openChat" in level && level.openChat ? undefined : level.href,
          cta: level.cta,
          onClick: "openChat" in level && level.openChat ? openDecisionAssistant : undefined,
        }))}
      />

      <section className="border-y border-brand-border bg-white">
        <PageSection>
          <SectionHeading
            eyebrow="By invitation"
            title="Continuity when the work continues."
            description="These continue the relationship. They are not sold as equal primary offers."
          />
          <LibraryList
            items={afterSession.map((offer) => ({
              eyebrow: "By invitation",
              title: offer.name,
              text: offer.text,
              href: "/contact",
              cta: "Write to the practice",
            }))}
          />
        </PageSection>
      </section>

      <PageSection>
        <SectionHeading
          eyebrow="Building Profiles"
          title="Study the building before the showing."
          description="Published address studies in the Property Assessment library. Request one when a specific building is in play."
        />
        <LibraryList
          items={buildingReports.map((report) => ({
            eyebrow: `${formatBuildingReportDate(report.publishedAt)} · ${report.readMinutes} min`,
            title: report.buildingName,
            text: report.executiveSummary[0],
            href: `/building-reports/${report.slug}`,
            cta: "Read profile",
          }))}
        />
      </PageSection>

      <section className="border-t border-brand-border bg-white">
        <PageSection>
          <SectionHeading
            eyebrow="Insights"
            title="Notes that sharpen the next decision."
            description="Kept for depth and SEO. Surfaced here under Intelligence, not as a separate primary nav item."
          />
          <LibraryList
            columns={3}
            items={insightPreview.map((item) => ({
              title: item.title,
              text: item.excerpt,
              href: `/insights/${item.slug}`,
              cta: "Read insight",
            }))}
          />
          <Link href="/insights" className={`${grammar.textLink} mt-8`}>
            All insights
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </PageSection>
      </section>

      <CTA
        title="Start with Guidance, or the Situation Assessment."
        description="If an address is already in play, request a Property Assessment. If daily fit is the question, request a Livability Score."
        href="/belonging"
        label="Request a Situation Assessment"
        eyebrow="Assessment"
      />
    </main>
  );
}

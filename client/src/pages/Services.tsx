import { useEffect } from "react";
import { DecisionFacingChips } from "@/components/DecisionFacingChips";
import { CTA, PageHero } from "@/components/site-shell";
import {
  CompactLinkRow,
  ModuleCards,
  ModuleIntro,
  ModuleSection,
  grammar,
} from "@/components/visual-grammar";
import { decisionNavigationGroups } from "@/data/decision-navigation";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const whatsChanging = decisionNavigationGroups.find((group) => group.title === "What's Changing?");
const understand = decisionNavigationGroups.find((group) => group.title === "What Are You Trying to Understand?");

const primaryChangeLabels = [
  "Executive Relocation",
  "First Home",
  "Growing Family",
  "Marriage",
  "Divorce",
  "Empty Nest",
];

const featuredUnderstandLabels = ["Rent vs Buy", "Condo vs Co-op", "Foreign Buyers", "Building Profiles"];

export default function Services() {
  usePageMetadata({
    title: "Situations",
    description:
      "Explore your housing situation: what changed, what decision you face, and what you need to understand, before listings.",
    path: "/situations",
  });

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const aliases: Record<string, string> = {
      "life-changes": "whats-changing",
      "property-decisions": "understand",
    };
    const targetId = aliases[hash] ?? hash;
    const el = document.getElementById(targetId);
    if (el) {
      requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }, []);

  const changeItems = whatsChanging?.items ?? [];
  const primaryChanges = primaryChangeLabels
    .map((label) => changeItems.find((item) => item.label === label))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const secondaryChanges = changeItems.filter((item) => !primaryChangeLabels.includes(item.label));
  const understandItems = understand?.items ?? [];
  const featuredUnderstand = featuredUnderstandLabels
    .map((label) => understandItems.find((item) => item.label === label))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const secondaryUnderstand = understandItems.filter((item) => !featuredUnderstandLabels.includes(item.label));

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Situations"
        title="Start from what changed."
        description="What's changing, what decision you face, and what you still need to understand. Each page is a situation: research, not a product."
        art="situations"
      />

      <ModuleSection id="whats-changing" surface="ivory">
        <div className={grammar.padLoose}>
          <ModuleIntro
            eyebrow="01 · Life Changes"
            title="What's Changing?"
            description="Start with the situation that sounds most like yours. The life change comes before the listing."
          />
          <ModuleCards items={primaryChanges} columns={2} />
          {secondaryChanges.length ? <CompactLinkRow items={secondaryChanges} /> : null}
        </div>
      </ModuleSection>

      <ModuleSection id="decisions" surface="stone">
        <div className={grammar.padLoose}>
          <ModuleIntro
            eyebrow="02 · Paths"
            title="What Decision Are You Facing?"
            description="Once the situation is clear, name the path, including stay put, wait, or do nothing yet. Each chip opens Guidance."
          />
          <DecisionFacingChips className="mt-12" />
        </div>
      </ModuleSection>

      <ModuleSection id="understand" surface="pause">
        <div className={grammar.padLoose}>
          <ModuleIntro
            eyebrow="03 · Research"
            title="What Are You Trying to Understand?"
            description="Ownership structure, building evidence, and market questions, after the life change and decision path are named."
          />
          <ModuleCards items={featuredUnderstand} columns={2} size="editorial" />
          {secondaryUnderstand.length ? <CompactLinkRow items={secondaryUnderstand} /> : null}
        </div>
      </ModuleSection>

      <CTA
        title="When the situation is yours."
        description="The next step is the Situation Assessment. Guidance stays in the header if you want to talk first. Guides stay in the library."
        href="/belonging"
        label="Request a Situation Assessment"
        eyebrow="Assessment"
      />
    </main>
  );
}

import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { CTA, PageHero } from "@/components/site-shell";
import { DecisionFramework } from "@/components/DecisionFramework";
import { LibraryList, grammar } from "@/components/visual-grammar";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { openDecisionAssistant } from "@/lib/decision-assistant";

const journey = [
  {
    step: "01",
    title: "What's Changing?",
    text: "Name the life change: relocation, family, divorce, retirement, remote work, or simple uncertainty that has become expensive.",
    href: "/situations#whats-changing",
    cta: "Explore situations",
  },
  {
    step: "02",
    title: "Take the Situation Assessment",
    text: "Build a situation profile: belonging, friction, and whether anything should change at all. This is the diagnostic, not a sales call.",
    href: "/belonging",
    cta: "Start assessment",
  },
  {
    step: "03",
    title: "Read the relevant Decision Brief",
    text: "Open the short editorial that matches your situation or the decision path you face. Clarity before inventory.",
    href: "/situations",
    cta: "Browse Decision Briefs",
  },
  {
    step: "04",
    title: "Receive your strategy",
    text: "A Strategy Session and written action summary. Continuity, when needed, is offered after the hour by invitation.",
    href: "/advisory",
    cta: "See advisory",
  },
];

const scenarios = [
  {
    title: "Executive relocating to Manhattan",
    text: "Trigger: start date in 60-120 days, household in motion, limited touring bandwidth. Often rent first or buy only in turnkey condominiums with clear service culture.",
    href: "/situations/executive-relocation-nyc",
    cta: "Open related brief",
  },
  {
    title: "First Manhattan purchase",
    text: "Trigger: leaving a rental or another city without a building thesis yet. Neighborhood and ownership structure before apartment romance. Condo vs co-op clarity early.",
    href: "/situations/first-home-buyers-nyc",
    cta: "Open related brief",
  },
  {
    title: "Growing family / schools",
    text: "Trigger: bedroom count, school logistics, or outdoor access stopped fitting. Geography first, then building rules that support the household.",
    href: "/situations/new-baby-growing-family-nyc",
    cta: "Open related brief",
  },
  {
    title: "Sell, keep, or wait",
    text: "Trigger: life changed but the financial or emotional case for selling is unclear. Sometimes the highest-value move is to hold, renovate, or rent the current home.",
    href: "/situations#decisions",
    cta: "Open related brief",
  },
];

export default function Buy() {
  usePageMetadata({
    title: "Start Here",
    description:
      "How we work: what's changing, Situation Assessment, Decision Brief, then a Strategy Session, before listings take over.",
    path: "/buyer-advisory",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Start Here"
        title="A clear path through the decision. Not another search."
        description="Start Here is the path. The Situation Assessment is the diagnostic. Decision Briefs are the research. A Strategy Session is the paid advisory layer. They are not the same step."
        art="decision-framework"
      />

      <DecisionFramework
        eyebrow="How We Work"
        title="Four steps. No overlap."
        description="If you only remember one sequence: name what changed, take the Situation Assessment, read the brief that fits, then get a written strategy when you want judgment, not inventory."
        items={journey}
        action={
          <button type="button" onClick={openDecisionAssistant} className={grammar.textLink}>
            Open Guidance
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </button>
        }
      />

      <section className="border-b border-brand-border bg-brand-ivory">
        <div className={grammar.pad}>
          <p className={grammar.eyebrow}>Common Situations</p>
          <h2 className={`mt-4 ${grammar.section}`}>How the work usually begins in practice.</h2>
          <p className={`mt-5 ${grammar.body}`}>
            Patterns that help you recognize which Decision Brief should come next after the assessment.
          </p>
          <LibraryList items={scenarios} />
        </div>
      </section>

      <CTA
        title="Start with the Situation Assessment."
        description="If you already know what changed, browse What's Changing? If the question is still open, build your situation profile first."
        href="/belonging"
        label="Start Situation Assessment"
        eyebrow="Start Here"
      />
    </main>
  );
}

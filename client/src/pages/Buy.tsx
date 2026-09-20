import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { CTA, PageHero } from "@/components/site-shell";
import { LibraryList, ModuleIntro, ModuleSection, grammar } from "@/components/visual-grammar";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const journey = [
  {
    step: "01",
    title: "What's Changing?",
    text: "Name the life change: relocation, family, divorce, retirement, remote work, or simple uncertainty that has become expensive.",
    href: "/situations#whats-changing",
    cta: "Explore situations",
    surface: "ivory" as const,
  },
  {
    step: "02",
    title: "Take the Situation Assessment",
    text: "Build a situation profile: belonging, friction, and whether anything should change at all. This is the diagnostic, not a sales call.",
    href: "/belonging",
    cta: "Start assessment",
    surface: "white" as const,
  },
  {
    step: "03",
    title: "Read the relevant Situation",
    text: "Open the short editorial that matches your situation or the decision path you face. Clarity before inventory.",
    href: "/situations",
    cta: "Browse Situations",
    surface: "mist" as const,
  },
  {
    step: "04",
    title: "Write if the next step is already clear",
    text: "Request a Property Assessment if an address is in play, or a Livability Score if daily fit is the question. Continuity, when needed, is offered by invitation.",
    href: "/contact",
    cta: "Contact",
    surface: "white" as const,
  },
];

const scenarios = [
  {
    title: "Executive relocating to Manhattan",
    text: "Trigger: start date in 60-120 days, household in motion, limited touring bandwidth. Often rent first or buy only in turnkey condominiums with clear service culture.",
    href: "/situations/executive-relocation-nyc",
    cta: "Open related Situation",
  },
  {
    title: "First Manhattan purchase",
    text: "Trigger: leaving a rental or another city without a building thesis yet. Neighborhood and ownership structure before apartment romance. Condo vs co-op clarity early.",
    href: "/situations/first-home-buyers-nyc",
    cta: "Open related Situation",
  },
  {
    title: "Growing family / schools",
    text: "Trigger: bedroom count, school logistics, or outdoor access stopped fitting. Geography first, then building rules that support the household.",
    href: "/situations/new-baby-growing-family-nyc",
    cta: "Open related Situation",
  },
  {
    title: "Sell, keep, or wait",
    text: "Trigger: life changed but the financial or emotional case for selling is unclear. Sometimes the highest-value move is to hold, renovate, or rent the current home.",
    href: "/situations#decisions",
    cta: "Open related Situation",
  },
];

export default function Buy() {
  usePageMetadata({
    title: "Start Here",
    description:
      "How we work: Start Here, Situation, Assessment, then Contact, before listings take over.",
    path: "/buyer-advisory",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Start Here"
        title="A clear path through the decision. Not another search."
        description="Start Here names what changed. A Situation explains it. The Situation Assessment is the diagnostic. Contact is for a written next step. They are not the same step."
        art="start-here"
      />

      {journey.map((step) => (
        <ModuleSection key={step.step} surface={step.surface}>
          <div className={grammar.padLoose}>
            <p className="text-[11px] uppercase tracking-[0.18em] text-brand-cocoa">{step.step}</p>
            <h2 className={`mt-6 max-w-2xl ${grammar.section}`}>{step.title}</h2>
            <p className={`mt-6 ${grammar.body}`}>{step.text}</p>
            <Link href={step.href} className={`${grammar.textLink} mt-8`}>
              {step.cta}
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </ModuleSection>
      ))}

      <ModuleSection surface="stone">
        <div className={grammar.padLoose}>
          <ModuleIntro
            eyebrow="Common Situations"
            title="How the work usually begins in practice."
            description="Patterns that help you recognize which Situation comes next before the assessment."
          />
          <LibraryList items={scenarios} />
        </div>
      </ModuleSection>

      <CTA
        title="Start with the Situation Assessment."
        description="If you already know what changed, browse What's Changing? If the question is still open, build your situation profile first."
        href="/belonging"
        label="Find out if this is the right fit for you"
        eyebrow="Assessment"
      />
    </main>
  );
}

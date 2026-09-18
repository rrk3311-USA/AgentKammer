import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { CTA, PageHero, PageSection, SectionHeading } from "@/components/site-shell";
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
    trigger: "Start date in 60-120 days, household in motion, limited touring bandwidth.",
    likely: "Often rent first or buy only in turnkey condominiums with clear service culture.",
    href: "/situations/executive-relocation-nyc",
  },
  {
    title: "First Manhattan purchase",
    trigger: "Leaving a rental or another city without a building thesis yet.",
    likely: "Neighborhood and ownership structure before apartment romance. Condo vs co-op clarity early.",
    href: "/situations/first-home-buyers-nyc",
  },
  {
    title: "Growing family / schools",
    trigger: "Bedroom count, school logistics, or outdoor access stopped fitting.",
    likely: "Geography first, then building rules that support the household.",
    href: "/situations/new-baby-growing-family-nyc",
  },
  {
    title: "Sell, keep, or wait",
    trigger: "Life changed but the financial or emotional case for selling is unclear.",
    likely: "Sometimes the highest-value move is to hold, renovate, or rent the current home.",
    href: "/situations#decisions",
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

      <PageSection>
        <button
          type="button"
          onClick={openDecisionAssistant}
          className="ak-nav-link mb-10 inline-flex items-center gap-2 text-brand-navy transition-colors hover:text-brand-navy-secondary"
        >
          Ask the Guidance Advisor
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
        </button>
        <SectionHeading
          eyebrow="How We Work"
          title="Four steps. No overlap."
          description="If you only remember one sequence: name what changed, take the Situation Assessment, read the brief that fits, then get a written strategy when you want judgment, not inventory."
        />
        <div className="mt-12 border-y border-brand-border">
          {journey.map((step) => (
            <div
              key={step.step}
              className="grid gap-5 border-b border-brand-border py-8 last:border-b-0 lg:grid-cols-[80px_minmax(0,1fr)_auto] lg:items-start lg:gap-8"
            >
              <p className="ak-kicker">{step.step}</p>
              <div>
                <h3 className="ak-heading">{step.title}</h3>
                <p className="ak-meta mt-3 max-w-2xl">{step.text}</p>
              </div>
              <Link
                href={step.href}
                className="ak-nav-link inline-flex items-center gap-2 self-start text-brand-navy transition-colors hover:text-brand-navy-secondary lg:mt-2"
              >
                {step.cta}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          ))}
        </div>
      </PageSection>

      <section className="border-y border-brand-border">
        <PageSection>
          <SectionHeading
            eyebrow="Common Situations"
            title="How the work usually begins in practice."
            description="Patterns that help you recognize which Decision Brief should come next after the assessment."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {scenarios.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="ak-card group rounded-card p-7 transition-colors hover:border-brand-navy/40"
              >
                <h3 className="ak-heading">{item.title}</h3>
                <p className="ak-meta mt-4">
                  <span className="text-brand-cocoa">Trigger: </span>
                  {item.trigger}
                </p>
                <p className="mt-3 text-sm leading-7 text-brand-graphite">
                  <span className="text-brand-cocoa">Often points to: </span>
                  {item.likely}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-brand-navy">
                  Open related brief
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
                </span>
              </Link>
            ))}
          </div>
        </PageSection>
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

import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { CTA, PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const journey = [
  {
    step: "01",
    title: "What's Changing?",
    text: "Name the life change - relocation, family, divorce, retirement, remote work, or simple uncertainty that has become expensive.",
    href: "/situations#whats-changing",
    cta: "Explore situations",
  },
  {
    step: "02",
    title: "Take the Decision Assessment",
    text: "Build a Decision Profile: belonging, friction, and whether anything should change at all. This is the diagnostic - not a sales call.",
    href: "/belonging",
    cta: "Start assessment",
  },
  {
    step: "03",
    title: "Read the relevant Decision Brief",
    text: "Open the short editorial that matches your situation or the decision path you face - clarity before inventory.",
    href: "/situations",
    cta: "Browse Decision Briefs",
  },
  {
    step: "04",
    title: "Receive your strategy",
    text: "A Housing Strategy Session and written action summary - Decision Blueprint when the case warrants it. Memberships if guidance should continue.",
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
    likely: "Neighborhood and ownership structure before apartment romance - condo vs co-op clarity early.",
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
      "The Agent Kammer advisory journey: what's changing, Decision Assessment, Decision Brief, then strategy - before listings take over.",
    path: "/buyer-advisory",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Start Here"
        title="A clear path through the decision - not another search."
        description="Start Here is the journey map. The Decision Assessment is the diagnostic. Decision Briefs are the research. Strategy is the paid advisory layer. They are not the same step."
        art="decision-framework"
      />

      <PageSection>
        <SectionHeading
          eyebrow="Advisory Journey"
          title="Four steps. No overlap."
          description="If you only remember one sequence: name what changed, take the assessment, read the brief that fits, then get a written strategy when you want judgment - not inventory."
        />
        <div className="mt-12 border-y border-brand-border">
          {journey.map((step) => (
            <div
              key={step.step}
              className="grid gap-5 border-b border-brand-border py-8 last:border-b-0 lg:grid-cols-[80px_minmax(0,1fr)_auto] lg:items-start lg:gap-8"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-cocoa">{step.step}</p>
              <div>
                <h3 className="font-display text-[clamp(1.85rem,3vw,2.7rem)] leading-[0.96] tracking-[-0.03em] text-brand-navy">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-brand-graphite lg:text-[15px]">{step.text}</p>
              </div>
              <Link
                href={step.href}
                className="inline-flex items-center gap-2 self-start text-[11px] uppercase tracking-[0.16em] text-brand-navy transition-colors hover:text-brand-brass lg:mt-2"
              >
                {step.cta}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          ))}
        </div>
      </PageSection>

      <section className="border-y border-brand-border bg-white">
        <PageSection>
          <SectionHeading
            eyebrow="Common Situations"
            title="How the journey usually begins in practice."
            description="Patterns - useful for recognizing which Decision Brief should come next after the assessment."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {scenarios.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-card border border-brand-border bg-brand-ivory p-7 transition-colors hover:border-brand-navy/30"
              >
                <h3 className="font-display text-3xl leading-[0.95] tracking-[-0.03em] text-brand-navy">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-brand-graphite">
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
        title="Start with the Decision Assessment."
        description="If you already know what changed, browse What's Changing? If the question is still open, build your Decision Profile first."
        href="/belonging"
        label="Start Decision Assessment"
      />
    </main>
  );
}

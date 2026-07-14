import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { CTA, PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const phases = [
  {
    title: "What's Changing?",
    text: "Start with the trigger: new job, family need, divorce, estate, school pressure, commute, cost, privacy, or simple uncertainty that has become expensive.",
  },
  {
    title: "Why Does It Matter?",
    text: "Translate the change into consequences for routine, leverage, budget, flexibility, and what a better outcome would actually look like.",
  },
  {
    title: "Which Option Wins?",
    text: "Compare buy, rent, renew, renovate, wait, or stay put by trade-offs and expected value before letting listings dictate the strategy.",
  },
];

const scenarios = [
  {
    title: "Executive relocating to Manhattan",
    trigger: "Start date in 60–120 days, household in motion, limited touring bandwidth.",
    likely: "Often rent first or buy only in turnkey condominiums with clear service culture.",
    href: "/services/executive-relocation-nyc",
  },
  {
    title: "First Manhattan purchase",
    trigger: "Leaving a rental or another city without a building thesis yet.",
    likely: "Neighborhood and ownership structure before apartment romance — condo vs co-op clarity early.",
    href: "/services/condo-vs-coop-foreign-buyers-nyc",
  },
  {
    title: "Family needing more space / schools",
    trigger: "Bedroom count, school logistics, or outdoor access stopped fitting.",
    likely: "Geography first (UWS, UES, Tribeca, etc.), then building rules that support the household.",
    href: "/services/school-district-planning-nyc",
  },
  {
    title: "Sell, keep, or wait",
    trigger: "Life changed but the financial or emotional case for selling is unclear.",
    likely: "Sometimes the highest-value move is to hold, renovate, or rent the current home.",
    href: "/contact",
  },
];

const deliverables = [
  "Situation diagnosis: what changed and whether action is required",
  "Options table: buy, rent, wait, renew, renovate, refinance, or stay put",
  "Building and neighborhood filters matched to the brief",
  "Timing posture: move now, negotiate, wait, or do nothing yet",
];

export default function Buy() {
  usePageMetadata({
    title: "Buyer Advisory",
    description:
      "Buyer advisory for Manhattan clients deciding whether to buy, rent, wait, renew, renovate, or stay put — before listings take over.",
    path: "/buyer-advisory",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Buyer Advisory"
        title="Start with what changed, not what is for sale."
        description="Buyer Advisory begins with uncertainty and life change. The first job is to decide whether anything should happen at all, then compare options, trade-offs, and timing before discussing buildings."
        art="decision-framework"
      />

      <PageSection>
        <SectionHeading
          eyebrow="Decision Hierarchy"
          title="Diagnose the situation before prescribing the move."
          description="Clarify the life change, explain why it matters, compare the options, identify the trade-offs, and only then move toward properties."
        />
        <div className="mt-12 border-y border-brand-border">
          {phases.map((phase, index) => (
            <div
              key={phase.title}
              className="grid gap-5 border-b border-brand-border py-8 last:border-b-0 lg:grid-cols-[120px_minmax(0,280px)_minmax(0,1fr)] lg:items-start lg:gap-8"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-cocoa">0{index + 1}</p>
              <h3 className="font-display text-[clamp(1.85rem,3vw,2.7rem)] leading-[0.96] tracking-[-0.03em] text-brand-navy">
                {phase.title}
              </h3>
              <p className="max-w-2xl text-sm leading-7 text-brand-graphite lg:text-[15px]">{phase.text}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <section className="border-y border-brand-border bg-white">
        <PageSection>
          <SectionHeading
            eyebrow="Common Scenarios"
            title="How the advisory usually starts in practice."
            description="These are not scripts. They are patterns — useful for recognizing which Decision Brief or Building Report should come next."
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
                  Open related path
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
                </span>
              </Link>
            ))}
          </div>
        </PageSection>
      </section>

      <PageSection className="grid gap-10 lg:grid-cols-2">
        <SectionHeading
          eyebrow="What You Receive"
          title="A Decision Brief, not a pile of listings."
          description="The deliverable is a clear recommendation. Sometimes that recommendation is to wait. Sometimes doing nothing is the risk."
        />
        <ul className="space-y-4 self-center">
          {deliverables.map((item) => (
            <li key={item} className="border-b border-brand-border py-4 text-base leading-8 text-brand-navy last:border-b-0">
              {item}
            </li>
          ))}
        </ul>
      </PageSection>

      <CTA
        title="Ready to shape a buyer decision brief?"
        description="Request a call with what changed, what you hope a new home solves, and what constraints are making the decision difficult."
      />
    </main>
  );
}

import { CTA, PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const phases = [
  {
    title: "What's Changing?",
    text: "Start with the trigger behind the move: work, family, pressure, timing, cost, privacy, or uncertainty.",
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

export default function Buy() {
  usePageMetadata({
    title: "Buyer Advisory",
    description: "Buyer advisory for Manhattan clients deciding whether to buy, rent, wait, renew, renovate, or stay put.",
    path: "/buyer-advisory",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Buyer Advisory"
        title="Start with what changed, not what is for sale."
        description="Buyer Advisory begins with uncertainty and life change. The first job is to decide whether anything should happen at all, then compare options, trade-offs, and timing before discussing buildings."
      />

      <PageSection>
        <SectionHeading
          eyebrow="Decision Hierarchy"
          title="Diagnose the situation before prescribing the move."
          description="The advisory path should feel like judgment, not intake. Clarify the life change, explain why it matters, compare the options, identify the trade-offs, and only then move toward properties."
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

        <div className="mt-14 grid gap-10 border-t border-brand-border pt-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-brand-cocoa">Philosophy</p>
            <h3 className="mt-4 font-display text-[clamp(2rem,4vw,3.1rem)] leading-[0.95] tracking-[-0.03em] text-brand-navy">
              Organize the site around why people move, not around real estate services.
            </h3>
          </div>
          <div className="space-y-6 text-base leading-8 text-brand-graphite">
            <p>
              People do not wake up wanting a condo search. They wake up because life changed, the current home stopped fitting, or uncertainty became expensive.
            </p>
            <p>
              Buyer advisory should therefore start with diagnosis, move through options and trade-offs, and only then narrow toward buildings, blocks, and inventory.
            </p>
          </div>
        </div>
      </PageSection>

      <CTA
        title="Ready to shape a buyer decision brief?"
        description="Request a call with what changed, what you hope a new home solves, and what constraints are making the decision difficult."
      />
    </main>
  );
}

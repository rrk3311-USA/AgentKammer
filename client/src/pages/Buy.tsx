import { CTA, PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const phases = [
  {
    title: "Should You Move?",
    text: "Start with the trigger, desire, constraint, and trade-off. The answer may be buy, rent, wait, renew, renovate, or stay put.",
  },
  {
    title: "What Would Improve?",
    text: "Define what the next home has to do better: commute, light, privacy, service, space, school access, flexibility, or long-term value.",
  },
  {
    title: "Which Path Wins?",
    text: "Compare neighborhoods, building types, timing, financing, and opportunity cost before letting listings dictate the strategy.",
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
        title="Do not start with listings. Start with the decision."
        description="Buyer Advisory helps answer the question underneath the search: should anything change, what should improve, and which path protects your lifestyle, budget, timeline, and leverage?"
      />

      <PageSection>
        <SectionHeading
          eyebrow="Process"
          title="The buyer path should feel like discovery, not a mortgage application."
          description="A strong purchase process teaches you what matters, removes weak options early, and stays honest when waiting or renewing would be smarter than forcing a transaction."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {phases.map((phase) => (
            <div key={phase.title} className="rounded-card border border-brand-border bg-white p-8">
              <h3 className="font-display text-3xl leading-[0.95] tracking-[-0.03em] text-brand-navy">{phase.title}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-graphite">{phase.text}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <CTA
        title="Ready to shape a buyer decision brief?"
        description="Request a call with what changed, what you hope a new home solves, and what constraints are making the decision difficult."
      />
    </main>
  );
}

import { CTA, PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const principles = [
  {
    title: "Advisory First",
    text: "The work starts with judgment and positioning, not volume or velocity.",
  },
  {
    title: "Building-Led Perspective",
    text: "Good decisions happen when the building, block, and buyer brief are understood together.",
  },
  {
    title: "Quiet Execution",
    text: "The tone is measured, private, and precise from first call through close.",
  },
];

export default function About() {
  usePageMetadata({
    title: "About",
    description: "About the Agent Kammer advisory approach to Manhattan housing decisions, building intelligence, and private client strategy.",
    path: "/about",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="About"
        title="Private housing guidance before the market gets loud."
        description="Agent Kammer helps clients decide what should happen next: buy, sell, rent, wait, renovate, refinance, hold, or do nothing. The work starts with judgment, building intelligence, and a clear understanding of what changed."
        art="private-advisory"
      />

      <PageSection className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
        <SectionHeading
          eyebrow="Practice"
          title="An approach shaped by market fluency and a preference for precision over noise."
          description="The work spans acquisition strategy, relocation guidance, building reports, and sale decisions. The goal is not to create urgency. The goal is to make the next move obvious enough that the client can act with confidence or choose not to act."
        />
        <div className="rounded-card border border-brand-border bg-white p-8">
          <p className="text-[11px] uppercase tracking-[0.22em] text-brand-brass">At a Glance</p>
          <div className="mt-6 grid gap-6">
            <div>
              <p className="font-display text-4xl leading-none text-brand-navy">New York</p>
              <p className="mt-2 text-sm leading-7 text-brand-graphite">Primary market perspective with building-specific context.</p>
            </div>
            <div>
              <p className="font-display text-4xl leading-none text-brand-navy">Private</p>
              <p className="mt-2 text-sm leading-7 text-brand-graphite">Communication designed for executive and principal-level clients.</p>
            </div>
            <div>
              <p className="font-display text-4xl leading-none text-brand-navy">Refined</p>
              <p className="mt-2 text-sm leading-7 text-brand-graphite">A focused process that reduces options until the right decision becomes legible.</p>
            </div>
          </div>
        </div>
      </PageSection>

      <section className="border-y border-brand-border bg-white">
        <PageSection>
          <SectionHeading eyebrow="Principles" title="Three ideas organize the public experience." align="center" />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {principles.map((item) => (
              <div key={item.title} className="rounded-card border border-brand-border bg-brand-ivory p-8">
                <h3 className="font-display text-3xl leading-[0.95] tracking-[-0.03em] text-brand-navy">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-brand-graphite">{item.text}</p>
              </div>
            ))}
          </div>
        </PageSection>
      </section>

      <CTA
        title="Bring the decision into focus."
        description="Request a call to clarify what changed, what should happen next, and whether the best move is action or restraint."
      />
    </main>
  );
}

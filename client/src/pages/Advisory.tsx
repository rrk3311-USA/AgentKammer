import { CTA, PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { PUBLIC_PRODUCTS } from "@/data/public-menu";

const publicLadder = [
  {
    title: PUBLIC_PRODUCTS.guidance.label,
    format: PUBLIC_PRODUCTS.guidance.advisor,
    text: PUBLIC_PRODUCTS.guidance.text,
    price: "Open",
  },
  {
    title: PUBLIC_PRODUCTS.situation.label,
    format: "Life diagnostic",
    text: PUBLIC_PRODUCTS.situation.text,
    price: "Intake",
  },
  {
    title: PUBLIC_PRODUCTS.property.label,
    format: "Address review",
    text: PUBLIC_PRODUCTS.property.text,
    price: "By scope",
  },
  {
    title: PUBLIC_PRODUCTS.strategy.label,
    format: "~60 minutes · written action summary",
    text: "One major decision. Buy versus wait, stay versus move, two buildings, renovate versus relocate. Ends with a written summary you can act on. Qualification for the hour is a gate, not a product card.",
    price: "$250-500",
  },
];

const afterSession = [
  {
    title: "Acquisition Dossier",
    text: "Full acquisition judgment when the hour shows the case needs it. Offered after a Strategy Session, by invitation.",
  },
  {
    title: "Essentials",
    price: "$250-500/mo",
    text: "A monthly strategy touchpoint, email access, an annual portfolio review, and written decision summaries.",
  },
  {
    title: "Executive Advisory",
    price: "$750-1,500/mo",
    text: "Two sessions a month, priority scheduling, ongoing portfolio oversight, and family planning conversations.",
  },
  {
    title: "Private Residential Office",
    price: "$2,500-5,000+/mo",
    text: "A family office for residential real estate. Coordination across architects, inspectors, lenders, attorneys, and brokers.",
  },
];

const journey = [
  {
    title: "Start with Guidance or the Situation Assessment",
    text: "Most relationships begin with the Guidance Advisor, a Situation, or the Situation Assessment. Not a sales page.",
  },
  {
    title: "Book a Strategy Session",
    text: "One paid hour, built around one real decision. This is a complete engagement on its own, not a qualifying call.",
  },
  {
    title: "Receive a written strategy summary",
    text: "A clear recommendation and next step, in writing, so the value of the session outlasts the conversation.",
  },
  {
    title: "Continue only if the case needs it",
    text: "A Dossier or membership is offered after the hour, by invitation. Some clients need exactly one session. That is a correct outcome.",
  },
];

export default function Advisory() {
  usePageMetadata({
    title: "Residential Advisory",
    description:
      "Agent Kammer Residential Advisory: Guidance, Situation Assessment, Property Assessment, and a Strategy Session. Memberships follow by invitation.",
    path: "/advisory",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Residential Advisory"
        title="Ongoing strategic guidance for life's biggest residential decisions."
        description="One public ladder. Clients pay for judgment, not listing access. A Strategy Session is one way to reach it, not a Discovery Call, and not two session names."
        art="private-advisory"
      />

      <PageSection className="max-w-[42rem]">
        <p className="text-[10px] uppercase tracking-[0.24em] text-brand-cocoa">Relationship, Not Calls</p>
        <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] leading-[0.94] text-brand-navy">
          The product is the advisory relationship.
        </h2>
        <p className="mt-8 text-lg leading-9 text-brand-graphite">
          A conversation is how a session happens to be delivered. It is not what a client is paying for. What a client is paying for is judgment applied to a real decision: whether to buy, wait, renovate, sell, or do nothing at all.
        </p>
        <p className="mt-6 text-lg leading-9 text-brand-graphite">
          That means a single Strategy Session can be a complete, successful engagement. Continuity, when it is useful, is offered after the hour.
        </p>
      </PageSection>

      <section className="border-y border-brand-border">
        <PageSection>
          <SectionHeading
            eyebrow="Public ladder"
            title="Begin with one of four names."
            description={`${PUBLIC_PRODUCTS.livability.label} stays on the Tools desk. It is not sold here, and it is not a Property Assessment.`}
          />
          <div className="mt-12 border-t border-brand-border">
            {publicLadder.map((item, index) => (
              <div
                key={item.title}
                className="grid gap-4 border-b border-brand-border py-8 lg:grid-cols-[80px_minmax(0,260px)_minmax(0,1fr)_160px] lg:items-start lg:gap-8"
              >
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-cocoa">0{index + 1}</p>
                <div>
                  <h3 className="font-display text-2xl leading-[0.98] tracking-[-0.02em] text-brand-navy">{item.title}</h3>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-brand-cocoa">{item.format}</p>
                </div>
                <p className="max-w-2xl text-sm leading-7 text-brand-graphite lg:text-[15px]">{item.text}</p>
                <p className="text-sm uppercase tracking-[0.1em] text-brand-navy lg:text-right">{item.price}</p>
              </div>
            ))}
          </div>
        </PageSection>
      </section>

      <PageSection>
        <SectionHeading
          eyebrow="After the hour"
          title="By invitation, after a Strategy Session."
          description="Dossier and memberships are continuity. They are not first cards on the public shelf."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {afterSession.map((tier) => (
            <div key={tier.title} className="border border-brand-border bg-white p-8">
              <p className="text-[11px] uppercase tracking-[0.16em] text-brand-brass">By invitation</p>
              <h3 className="mt-3 font-display text-3xl leading-[0.95] tracking-[-0.02em] text-brand-navy">{tier.title}</h3>
              {"price" in tier && tier.price ? (
                <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-brand-cocoa">{tier.price}</p>
              ) : null}
              <p className="mt-5 text-sm leading-7 text-brand-graphite">{tier.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm leading-7 text-brand-graphite/80">
          Price bands are current guidance for planning purposes. Final terms are confirmed directly with the practice before any membership begins.
        </p>
      </PageSection>

      <section className="border-y border-brand-border">
        <PageSection>
          <SectionHeading
            eyebrow="How It Begins"
            title="From research to a written recommendation."
          />
          <ol className="mt-12 space-y-10">
            {journey.map((step, index) => (
              <li key={step.title} className="grid gap-3 border-b border-brand-border pb-8 last:border-b-0 lg:grid-cols-[80px_minmax(0,1fr)] lg:gap-8">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-cocoa">0{index + 1}</p>
                <div>
                  <p className="font-display text-2xl text-brand-navy">{step.title}</p>
                  <p className="mt-3 max-w-2xl text-base leading-8 text-brand-graphite">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </PageSection>
      </section>

      <CTA
        title="Begin with a Strategy Session."
        description="One major decision, a written action summary, and a clear next step. Continuity is available if the decisions keep evolving."
        href="/contact?intent=strategy"
        label="Book a Strategy Session"
        eyebrow={PUBLIC_PRODUCTS.strategy.label}
      />
    </main>
  );
}

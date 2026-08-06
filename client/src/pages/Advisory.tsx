import { CTA, PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const alaCarte = [
  {
    title: "Housing Strategy Session",
    format: "~60 minutes · written action summary",
    text: "One major decision - buy vs. wait, stay vs. move, comparing two buildings, renovate vs. relocate, executive relocation. Ends with a written summary you can act on, not a transcript.",
    price: "$250-500",
  },
  {
    title: "Building Second Opinion",
    format: "Session + written notes",
    text: "A second, independent read on one building or property: strengths, risks, resale considerations, lifestyle fit, and the questions worth investigating before you commit.",
    price: "By scope",
  },
  {
    title: "Residential Portfolio Review",
    format: "Session + written notes",
    text: "Every property you own, reviewed together: what to keep, sell, renovate, or rent - weighed against lifestyle and long-term goals, not just market value.",
    price: "By scope",
  },
];

const memberships = [
  {
    title: "Essentials",
    price: "$250-500/mo",
    text: "A monthly strategy touchpoint, email access for questions as they come up, an annual portfolio review, market updates, and written decision summaries you can keep.",
  },
  {
    title: "Executive Advisory",
    price: "$750-1,500/mo",
    text: "Two sessions a month, priority scheduling, ongoing portfolio oversight, building research, renovation guidance, vendor recommendations, and family planning conversations.",
  },
  {
    title: "Private Residential Office",
    price: "$2,500-5,000+/mo",
    text: "A family office for residential real estate - reasonable unlimited strategy sessions, coordination across architects, inspectors, lenders, attorneys, and brokers, and an annual residential master plan.",
  },
];

const journey = [
  {
    title: "Start with what you're reading",
    text: "Most relationships begin with the Research Library, a Decision Brief, or the Belonging Assessment - not a sales page.",
  },
  {
    title: "Book a Housing Strategy Session",
    text: "One paid session, built around one real decision. This is a complete engagement on its own - not a qualifying call.",
  },
  {
    title: "Receive a written strategy summary",
    text: "A clear recommendation and next step, in writing, so the value of the session outlasts the conversation.",
  },
  {
    title: "Decide what continuity you need",
    text: "Some clients need exactly one session. Others prefer ongoing advisory through a membership as decisions keep evolving. Both are correct outcomes.",
  },
];

export default function Advisory() {
  usePageMetadata({
    title: "Residential Advisory",
    description:
      "Agent Kammer Residential Advisory: how the Housing Strategy Session, à la carte reviews, and ongoing advisory memberships work - judgment over listing access.",
    path: "/advisory",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Residential Advisory"
        title="Ongoing strategic guidance for life's biggest residential decisions."
        description="Agent Kammer is building a residential advisory practice, not chasing leads. Clients pay for judgment, not listing access - and a session is one way to reach it, not the product itself."
        art="private-advisory"
      />

      <PageSection className="max-w-[42rem]">
        <p className="text-[10px] uppercase tracking-[0.24em] text-brand-cocoa">Relationship, Not Calls</p>
        <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] leading-[0.94] text-brand-navy">
          The product is the advisory relationship.
        </h2>
        <p className="mt-8 text-lg leading-9 text-brand-graphite">
          A conversation is how a session happens to be delivered - it is not what a client is paying for. What a client is paying for is judgment applied to a real decision: whether to buy, wait, renovate, sell, or do nothing at all.
        </p>
        <p className="mt-6 text-lg leading-9 text-brand-graphite">
          That means a single Housing Strategy Session can be a complete, successful engagement. It also means some clients prefer the guidance to continue as decisions evolve - through one of the memberships below.
        </p>
      </PageSection>

      <section className="border-y border-brand-border bg-white">
        <PageSection>
          <SectionHeading
            eyebrow="À La Carte"
            title="Begin with one decision."
            description="Priced per engagement. Ranges below are current guidance, not a checkout - every engagement starts with a conversation about scope."
          />
          <div className="mt-12 border-t border-brand-border">
            {alaCarte.map((item, index) => (
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
          eyebrow="Memberships"
          title="For decisions that keep evolving."
          description="Not a bundle of meetings - an ongoing advisory relationship. Session counts are a supporting detail, not the offer."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {memberships.map((tier) => (
            <div key={tier.title} className="border border-brand-border bg-white p-8">
              <h3 className="font-display text-3xl leading-[0.95] tracking-[-0.02em] text-brand-navy">{tier.title}</h3>
              <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-brand-brass">{tier.price}</p>
              <p className="mt-5 text-sm leading-7 text-brand-graphite">{tier.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm leading-7 text-brand-graphite/80">
          Price bands are current guidance for planning purposes. Final terms are confirmed directly with the practice before any membership begins.
        </p>
      </PageSection>

      <section className="border-y border-brand-border bg-white">
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
        title="Begin with a Housing Strategy Session."
        description="One major decision, a written action summary, and a clear next step - with an ongoing advisory relationship available if the decisions keep evolving."
        href="/contact"
        label="Book a Housing Strategy Session"
      />
    </main>
  );
}

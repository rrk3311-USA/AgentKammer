import { CTA, PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { DecisionFramework } from "@/components/DecisionFramework";
import { LibraryList, grammar } from "@/components/visual-grammar";
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
    title: PUBLIC_PRODUCTS.livability.label,
    format: "Tools desk",
    text: PUBLIC_PRODUCTS.livability.text,
    price: "By request",
  },
];

const afterSession = [
  {
    title: "Acquisition Dossier",
    text: "Full acquisition judgment when the case needs it. Offered by invitation, after the relationship begins.",
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
    title: "Write when a human reply is useful",
    text: "If an address is already in play, request a Property Assessment. If daily fit is the question, request a Livability Score.",
  },
  {
    title: "Receive a written next step",
    text: "A clear recommendation you can act on, so the value of the work outlasts the first conversation.",
  },
  {
    title: "Continue only if the case needs it",
    text: "A Dossier or membership is offered by invitation. Some clients need exactly one diagnostic. That is a correct outcome.",
  },
];

export default function Advisory() {
  usePageMetadata({
    title: "Residential Advisory",
    description:
      "Agent Kammer Residential Advisory: Guidance, Situation Assessment, Property Assessment, and Livability Score. Memberships follow by invitation.",
    path: "/advisory",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Residential Advisory"
        title="Ongoing strategic guidance for life's biggest residential decisions."
        description="One public ladder. Clients pay for judgment, not listing access. Four names: Guidance, Situation Assessment, Property Assessment, and Livability Score."
        art="private-advisory"
      />

      <PageSection className="max-w-[42rem]">
        <p className={grammar.eyebrow}>Relationship, Not Calls</p>
        <h2 className={`mt-4 ${grammar.section}`}>The product is the advisory relationship.</h2>
        <p className={`mt-8 ${grammar.bodyWide}`}>
          A conversation is how a session happens to be delivered. It is not what a client is paying for. What a client is paying for is judgment applied to a real decision: whether to buy, wait, renovate, sell, or do nothing at all.
        </p>
        <p className={`mt-6 ${grammar.bodyWide}`}>
          That means a single diagnostic can be a complete, successful engagement. Continuity, when it is useful, is offered by invitation.
        </p>
      </PageSection>

      <section className="border-y border-brand-border bg-white">
        <PageSection>
          <SectionHeading
            eyebrow="Public ladder"
            title="Begin with one of four names."
            description={`${PUBLIC_PRODUCTS.livability.label} stays on the Tools desk. It is not a Property Assessment.`}
          />
          <div className="mt-12 border-t border-brand-border">
            {publicLadder.map((item, index) => (
              <div
                key={item.title}
                className="grid gap-4 border-b border-brand-border py-8 lg:grid-cols-[80px_minmax(0,260px)_minmax(0,1fr)_160px] lg:items-start lg:gap-8"
              >
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-cocoa">0{index + 1}</p>
                <div>
                  <h3 className={grammar.rowTitle}>{item.title}</h3>
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
          eyebrow="By invitation"
          title="Continuity when the work continues."
          description="Dossier and memberships are continuity. They are not first cards on the public shelf."
        />
        <LibraryList
          items={afterSession.map((tier) => ({
            eyebrow: "price" in tier && tier.price ? `By invitation · ${tier.price}` : "By invitation",
            title: tier.title,
            text: tier.text,
            href: "/contact",
            cta: "Write to the practice",
          }))}
        />
        <p className="mt-8 max-w-2xl text-sm leading-7 text-brand-graphite/80">
          Price bands are current guidance for planning purposes. Final terms are confirmed directly with the practice before any membership begins.
        </p>
      </PageSection>

      <DecisionFramework
        eyebrow="How It Begins"
        title="From research to a written recommendation."
        description="Most relationships begin with Guidance or the Situation Assessment. Continuity is optional."
        items={journey.map((step, index) => ({
          step: `0${index + 1}`,
          title: step.title,
          text: step.text,
        }))}
      />

      <CTA
        title="Start with Guidance, or the Situation Assessment."
        description="One major decision, a written next step, and a clear recommendation. Continuity is available if the decisions keep evolving."
        href="/belonging"
        label="Find out if this is the right fit for you"
        eyebrow="Assessment"
      />
    </main>
  );
}

import { CTA, PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { DecisionFramework } from "@/components/DecisionFramework";
import { DarkStatement, GrammarRows, ModuleSection, grammar } from "@/components/visual-grammar";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { openDecisionAssistant } from "@/lib/decision-assistant";
import { isNetworkDraftVisible } from "@/lib/network-draft";
import { PUBLIC_PRODUCTS } from "@/data/public-menu";
import NotFound from "@/pages/not-found";

const steps = [
  {
    step: "01",
    title: "Qualify",
    text: "Understand the person and the transaction: budget, location, timeline, and what has to be true for a move to make sense. Same discipline as a Situation Assessment — context before inventory.",
  },
  {
    step: "02",
    title: "Match",
    text: "Select the representative from a structured agent profile, not a city directory. The question is fit: market, temperament, capacity, and how this person prefers to be advised.",
  },
  {
    step: "03",
    title: "Local licensed agent",
    text: "Showings, offers, negotiations, and closing stay with a destination-state agent authorized to practice there. The matching operation does not become local representation.",
  },
  {
    step: "04",
    title: "Referral through brokerages",
    text: "When a referral is used, compensation moves brokerage to brokerage under a referral agreement, then to the originating licensee under that brokerage’s own arrangement. It is not a personal side payment.",
  },
];

const agentDimensions = [
  { title: "Geography", text: "Cities and neighborhoods the agent actually works." },
  { title: "Specialization", text: "Luxury, condos, investment, relocation — the work they do, not a slogan." },
  { title: "Price range", text: "The band they close in, from mid-market through $20M+." },
  { title: "Personality", text: "Analytical, relational, assertive — how they show up in a room." },
  { title: "Values", text: "Communication, discretion, service tempo." },
  { title: "Expertise", text: "Negotiation, relocation, development, board packages." },
  { title: "Availability", text: "Active clients and remaining capacity." },
  { title: "Experience", text: "Years and completed transactions, not listings posted." },
];

const clientDimensions = [
  { title: "Financial capacity", text: "What can be carried, and with what flexibility." },
  { title: "Property requirements", text: "Use, size, building type, and the constraints that are not negotiable." },
  { title: "Lifestyle", text: "The day that has to work after the closing." },
  { title: "Communication preferences", text: "How often, how direct, and through which channel." },
  { title: "Decision-making style", text: "Deliberate, urgent, collaborative — how they actually decide." },
  { title: "Desired relationship", text: "Counsel, project manager, or a quiet closer." },
  { title: "Timeline", text: "When a decision is due, and whether waiting is still protective." },
];

const matchBreakdown = [
  { eyebrow: "Illustrative", title: "Market expertise", text: "95%" },
  { eyebrow: "Illustrative", title: "Communication style", text: "98%" },
  { eyebrow: "Illustrative", title: "Price-range experience", text: "90%" },
  { eyebrow: "Illustrative", title: "Client values", text: "94%" },
];

const referralConventions = [
  { title: "20%", text: "Lower-end referral — a market convention, not a legal floor." },
  { title: "25%", text: "Common industry benchmark in a cooperative brokerage referral." },
  { title: "30%", text: "Often discussed for a strongly qualified introduction." },
  { title: "35%", text: "Sometimes used for a premium, tightly qualified referral." },
];

export function NetworkDraftPage() {
  usePageMetadata({
    title: "Agent Intelligence Network",
    description:
      "Unpublished draft. How Agent Kammer would match a person to the right local representative — qualify, match, local licensed agent, referral through brokerages.",
    robots: "noindex, nofollow, noarchive",
  });

  return (
    <main className="bg-brand-ivory" data-testid="page-network-draft">
      <PageHero
        eyebrow="Agent Intelligence Network"
        title="Who is the right representative for this person and this transaction?"
        description="Most directories answer who sells real estate in a city. This matching layer asks the narrower question the practice already asks before a handoff: who should actually represent this person."
        art="decision-framework"
        kicker={
          <p className="text-[12px] uppercase tracking-[0.16em] text-brand-stone">
            Unpublished draft. Not a public offer.
          </p>
        }
      />

      <PageSection className="max-w-[42rem]">
        <p className={grammar.eyebrow}>Beside the public ladder</p>
        <h2 className={`mt-4 ${grammar.section}`}>Judgment first. Representation when a transaction is right.</h2>
        <p className={`mt-8 ${grammar.bodyWide}`}>
          The public path stays Guidance, Situation Assessment, then Advisory. This page does not add a fifth product. It describes a national matching layer for the moment a situation needs a local agent — any U.S. market, any price point.
        </p>
        <p className={`mt-6 ${grammar.bodyWide}`}>
          Think of it as matchmaking and executive recruiting, applied to representation. The Situation Assessment already builds a client profile. The network would hold a corresponding agent profile, then introduce a destination-state licensee when the work moves from diagnosis to a transaction.
        </p>
      </PageSection>

      <DecisionFramework
        eyebrow="How the network works"
        title="Qualify. Match. Leave the room to the local agent."
        description="The matching operation can be remote. Local practice cannot. Referral compensation, when it exists, moves through brokerages."
        items={steps}
      />

      <section className="border-b border-brand-border bg-white">
        <PageSection>
          <SectionHeading
            eyebrow="Two profiles"
            title="A person on one side. A representative on the other."
            description="Compatibility is the intersection. Public assessments still speak in Pick, Consider, Wait, Pass, and WHO — not a /100 score."
          />
          <div className="mt-12 grid gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className={grammar.eyebrow}>Agent profile</p>
              <GrammarRows items={agentDimensions} />
            </div>
            <div>
              <p className={grammar.eyebrow}>Client profile</p>
              <GrammarRows items={clientDimensions} />
            </div>
          </div>
        </PageSection>
      </section>

      <ModuleSection surface="ivory">
        <PageSection>
          <SectionHeading
            eyebrow="Illustrative match"
            title="Scoring is a sketch, not a roster."
            description="The figures below are illustrative. They are not actual agent data, and they are not how Agent Kammer publishes verdicts."
          />
          <div className="mt-12 grid gap-10 border-t border-brand-border pt-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-brand-cocoa">Illustrative</p>
              <h3 className={`mt-3 ${grammar.rowTitle}`}>Agent A</h3>
              <p className="mt-3 text-base leading-7 text-brand-graphite">Manhattan · Luxury condos · 12 years</p>
              <p className="mt-8 font-display text-[clamp(2.4rem,6vw,3.4rem)] leading-none text-brand-navy">94%</p>
              <p className="mt-3 text-[12px] uppercase tracking-[0.16em] text-brand-cocoa">Compatibility · illustrative</p>
            </div>
            <GrammarRows items={matchBreakdown} />
          </div>
        </PageSection>
      </ModuleSection>

      <section className="border-y border-brand-border bg-brand-soft-stone">
        <PageSection className="max-w-[42rem]">
          <p className={grammar.eyebrow}>Remote operation</p>
          <h2 className={`mt-4 ${grammar.section}`}>The phone can originate. It cannot close a listing in another state.</h2>
          <p className={`mt-8 ${grammar.bodyWide}`}>
            Consumer acquisition, qualification, budget and location discovery, agent vetting, referral-agreement execution, and follow-up can sit with the matching operation. Property showings, local representation, and negotiation stay with the destination agent.
          </p>
          <p className={`mt-6 ${grammar.bodyWide}`}>
            Introducing a client to a local agent is different from practicing real estate in that state. Destination-state practice requires local authorization. Referral fees flow brokerage to brokerage.
          </p>
        </PageSection>
      </section>

      <section className="bg-white">
        <PageSection>
          <SectionHeading
            eyebrow="Illustrative referral"
            title="A convention, not a statutory cap."
            description="There is no general federal or state statutory maximum percentage for a properly structured real estate brokerage referral fee. The amount is negotiated. The bands below are market conventions, not legal limits."
          />
          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
            <div className="border-t border-brand-border">
              {referralConventions.map((item) => (
                <article key={item.title} className="grid gap-2 border-b border-brand-border py-7 sm:grid-cols-[5rem_minmax(0,1fr)] sm:items-baseline sm:gap-8">
                  <p className="font-display text-[1.65rem] leading-none text-brand-navy">{item.title}</p>
                  <p className="text-base leading-7 text-brand-graphite">{item.text}</p>
                </article>
              ))}
            </div>
            <div className="border border-brand-border bg-brand-ivory px-6 py-8 sm:px-8">
              <p className="text-[11px] uppercase tracking-[0.18em] text-brand-cocoa">Illustrative transaction</p>
              <p className={`mt-4 ${grammar.rowTitle}`}>$5,000 referral at 25%</p>
              <dl className="mt-8 space-y-5 text-sm leading-6 text-brand-graphite">
                <div className="flex justify-between gap-6 border-b border-brand-border pb-4">
                  <dt>Transaction-side gross commission</dt>
                  <dd className="text-brand-navy">$20,000</dd>
                </div>
                <div className="flex justify-between gap-6 border-b border-brand-border pb-4">
                  <dt>Referral percentage</dt>
                  <dd className="text-brand-navy">25%</dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt>Paid to the originating brokerage</dt>
                  <dd className="text-brand-navy">$5,000</dd>
                </div>
              </dl>
              <p className="mt-8 text-sm leading-6 text-brand-graphite/80">
                Before any brokerage split, taxes, or other expenses. Illustrative only — not a quoted rate and not a legal limit.
              </p>
            </div>
          </div>
        </PageSection>
      </section>

      <DarkStatement
        eyebrow="RESPA"
        title="A cooperative brokerage referral is not a paid settlement-service referral."
        description="RESPA recognizes qualifying cooperative brokerage and referral arrangements. Those are different from paid referrals to mortgage lenders, title companies, or other settlement-service providers, which carry different restrictions. Preferential placement that sells access to a referral must not be structured in a way that violates those rules."
      />

      <PageSection className="max-w-[42rem]">
        <p className={grammar.eyebrow}>Interstate referrals</p>
        <h2 className={`mt-4 ${grammar.section}`}>Any market, through broker-to-broker introduction.</h2>
        <p className={`mt-8 ${grammar.bodyWide}`}>
          Interstate broker-to-broker referrals can generally cover a buyer or seller originated in one state and represented in another. Some states, including California and Ohio, expressly address paying an out-of-state broker. That is industry framing, not a claim that Agent Kammer is licensed, registered, or authorized in every state.
        </p>
        <p className={`mt-6 ${grammar.bodyWide}`}>
          A typical path: originate in one state, introduce a destination-state agent, that agent’s brokerage closes, that brokerage pays the originating brokerage. Destination-state practice still requires local authorization.
        </p>
      </PageSection>

      <CTA
        eyebrow="Assessment"
        title="Begin with the situation, not a city directory."
        description={`${PUBLIC_PRODUCTS.situation.text} This draft is not an intake for the network.`}
        href={PUBLIC_PRODUCTS.situation.href}
        label={PUBLIC_PRODUCTS.situation.cta}
        guidanceLabel="Prefer to talk it through? Open Guidance →"
        onGuidanceClick={openDecisionAssistant}
      />
    </main>
  );
}

export default function Network() {
  const hostname = typeof window === "undefined" ? "" : window.location.hostname;
  const visible = hostname ? isNetworkDraftVisible(hostname) : true;

  if (!visible) {
    return <NotFound />;
  }

  return <NetworkDraftPage />;
}

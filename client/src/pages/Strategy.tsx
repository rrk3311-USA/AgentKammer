import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { eyebrowOnDark, eyebrowOnLight } from "@/lib/brand-typography";

const sectionHeadline = "font-serif text-3xl font-semibold md:text-4xl lg:text-[2.65rem]";

const principles = [
  "Understand the building's architecture, ownership profile, and market position.",
  "Study resident fit, competitive buildings, and neighborhood development before pricing.",
  "Let listings enter the conversation only after strategic clarity exists.",
];

const acquisitionSteps = [
  {
    title: "Property Analysis",
    text: "Building fit, comparables, resident profile, and the specific opportunity — before terms are discussed.",
  },
  {
    title: "Risk Analysis",
    text: "Board dynamics, insurance, renovation exposure, liquidity, and timing risks that listings rarely surface.",
  },
  {
    title: "Ownership Structure",
    text: "Entity selection, financing posture, tax consequences, and how the purchase fits a broader balance sheet.",
  },
  {
    title: "Recommended Advisory Team",
    text: "Who belongs on the crew at this price point — and when each role should enter the process.",
  },
  {
    title: "Acquisition Roadmap",
    text: "Sequenced execution: who engages when, what gets decided first, and how mistakes get prevented early.",
  },
];

const advisoryTeamTiers = [
  {
    band: "Under $5M",
    teamSize: "3–5",
    roles: ["Agent", "Attorney", "Mortgage broker", "Inspector"],
  },
  {
    band: "$5M–$20M",
    teamSize: "5–8",
    roles: [
      "Agent",
      "Attorney",
      "CPA",
      "Mortgage or private bank",
      "Inspector",
      "Insurance advisor",
    ],
  },
  {
    band: "$20M–$50M",
    teamSize: "8–12",
    roles: [
      "Lead agent",
      "Real estate attorney",
      "Trust and estate attorney",
      "CPA",
      "Private banker",
      "Insurance specialist",
      "Family office advisor",
      "Architect",
      "Interior designer",
    ],
  },
  {
    band: "$50M and above",
    teamSize: "12–20+",
    roles: [
      "Lead agent",
      "Family office",
      "Tax attorney",
      "Estate attorney",
      "International counsel",
      "Wealth advisor",
      "Private bank",
      "Security consultant",
      "Architect",
      "Construction advisor",
      "Insurance team",
      "Household staffing consultant",
    ],
  },
];

export default function Strategy() {
  usePageMetadata({
    title: "How Many People Should Be Involved In Your Deal?",
    description:
      "A crew overview for Manhattan residential purchases — how many people are usually involved, which roles enter at each price band, and why complexity and risk rise as deal size increases.",
    path: "/strategy",
    keywords:
      "how many people involved luxury real estate purchase, Manhattan buyer advisory team size, real estate deal crew by price, NYC luxury acquisition roles, Manhattan purchase complexity, ultra luxury real estate advisory team",
  });

  return (
    <main className="min-h-screen bg-brand-ivory text-brand-graphite">
      <section className="bg-brand-midnight px-6 py-16 text-brand-ivory lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className={eyebrowOnDark}>Strategy</p>
          <h1 className="font-serif text-5xl font-semibold leading-[0.98] md:text-6xl lg:text-[2.75rem]">
            How Many People Should Be Involved In Your Deal?
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-ivory/84">
            Most buyers ask about price, bedrooms, and amenities. Fewer ask who should actually be in the room — and
            how many professionals it takes to structure the decision properly.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-brand-ivory/72">
            As deal size increases, so do complexity and risk. The crew expands, roles specialize, and coordination
            matters more than the listing itself. Below is how acquisition teams are usually structured — from a core
            group under $5M to a full advisory crew above $50M.
          </p>
        </div>
      </section>

      <section className="brand-surface-intelligence px-6 py-14 lg:px-10 lg:py-16">
        <div className="relative z-[1] mx-auto max-w-3xl">
          <p className={eyebrowOnLight}>Approach</p>
          <h2 className={`${sectionHeadline} text-brand-midnight`}>Strategy Before Search</h2>
          <div className="mt-6 space-y-4 text-base leading-7 text-brand-graphite/76">
            <p>
              Most Manhattan decisions fail quietly — not because the apartment was wrong, but because the building was
              never understood.
            </p>
            <p>
              Ownership structure, amenity economics, resident profile, and competitive context shape outcomes long
              before an offer is drafted or a listing goes live.
            </p>
            <p>We study significant buildings first. Transactions follow from that clarity.</p>
          </div>
          <ul className="mt-8 space-y-3 border-l border-brand-champagne/45 pl-5">
            {principles.map((item) => (
              <li key={item} className="font-serif text-base leading-relaxed text-brand-midnight/88">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-brand-midnight/10 bg-white px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <p className={eyebrowOnLight}>Strategic Property Acquisition</p>
          <h2 className={`${sectionHeadline} text-brand-midnight`}>Five Steps. One Discipline.</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-brand-graphite/76">
            A useful acquisition plan is not a brochure. It is a sequence — from understanding the property to
            assembling the people who can protect the decision.
          </p>
          <div className="mt-10 flex flex-col items-stretch gap-2 lg:flex-row lg:items-center lg:gap-3">
            {acquisitionSteps.map((step, idx) => (
              <Fragment key={step.title}>
                <div className="flex w-full flex-col border border-brand-champagne/35 bg-brand-ivory px-4 py-4 lg:min-h-[132px] lg:flex-1 lg:justify-start">
                  <p className="font-mono text-xs text-brand-champagne">{idx + 1}</p>
                  <p className="mt-1 font-serif text-lg font-semibold leading-snug text-brand-midnight">
                    {step.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-brand-graphite/72">{step.text}</p>
                </div>
                {idx < acquisitionSteps.length - 1 ? (
                  <>
                    <ArrowRight
                      className="mx-auto hidden h-4 w-4 shrink-0 text-brand-champagne lg:block"
                      aria-hidden
                    />
                    <span className="text-center text-brand-champagne lg:hidden" aria-hidden>
                      ↓
                    </span>
                  </>
                ) : null}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-midnight px-6 py-14 text-brand-ivory lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <p className={eyebrowOnDark}>The Crew Overview</p>
          <h2 className={`${sectionHeadline} text-brand-ivory`}>Who Is Usually Involved — And How The Team Grows</h2>
          <div className="mt-6 max-w-3xl space-y-4 text-base leading-7 text-brand-ivory/82">
            <p>
              A smaller deal may need coordination. A larger deal needs structure — tax exposure, estate planning,
              liquidity, insurance, renovation scope, and succession questions that a listing description will never
              address.
            </p>
            <p>
              Complexity and risk rise together. The crew should reflect what is actually at stake — not the square
              footage on a floor plan.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {advisoryTeamTiers.map((tier) => (
              <Card
                key={tier.band}
                className="rounded-none border border-brand-ivory/20 bg-brand-ivory/[0.04] p-6 shadow-none"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-2xl font-semibold text-brand-ivory">{tier.band}</h3>
                  <p className="shrink-0 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-brand-champagne">
                    Crew of {tier.teamSize}
                  </p>
                </div>
                <ul className="mt-5 space-y-2 border-t border-brand-ivory/15 pt-5">
                  {tier.roles.map((role) => (
                    <li key={role} className="text-sm leading-6 text-brand-ivory/78">
                      {role}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="mt-10 max-w-3xl border-l border-brand-champagne/45 pl-5">
            <p className="font-serif text-xl leading-relaxed text-brand-ivory/92">
              At every level, sophisticated buyers are not only purchasing square footage. They are purchasing
              certainty, coordination, expertise, and fewer expensive errors.
            </p>
            <p className="mt-4 text-base leading-7 text-brand-ivory/72">The apartment is only part of the decision.</p>
          </div>
        </div>
      </section>

      <section className="border-t border-brand-midnight/10 bg-[#f7f3ea] px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <p className={eyebrowOnLight}>Coordination</p>
          <h2 className={`${sectionHeadline} text-brand-midnight`}>Someone Has To Structure The Crew</h2>
          <div className="mt-6 space-y-4 text-base leading-7 text-brand-graphite/76">
            <p>
              Price, bedrooms, and amenities describe a listing. They do not describe who should be involved — or in
              what order. Above $20M, ownership structure and professional coordination often matter as much as the
              residence itself.
            </p>
            <p>
              Agent Kammer begins with building intelligence, then helps clients understand which roles the deal
              actually requires. The goal is not to overwhelm with names. The goal is to assemble the right crew before
              complexity becomes expensive.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/buy">
              <Button variant="brandOutline">Buyer Advisory</Button>
            </Link>
            <Link href="/intelligence">
              <Button variant="brandOutline">View Intelligence</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-brand-midnight/10 bg-white px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 border border-brand-champagne/35 bg-brand-ivory p-6 md:flex-row md:items-center lg:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne-dark">Next Step</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-brand-midnight">Schedule A Strategy Call</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-brand-graphite/70">
              Share objectives, timing, and building interests. We begin with research — not a property search.
            </p>
          </div>
          <Link href="/contact">
            <Button variant="brand">Schedule Strategy Call</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

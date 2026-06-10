import { Fragment } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Building2, Compass, Home, Search, ShieldCheck, TrendingUp } from "lucide-react";

const buyerFlow = [
  {
    step: "Objective",
    text: "Define priorities, constraints, timing, and goals.",
  },
  {
    step: "Resident Fit",
    text: "Identify the buildings, neighborhoods, and environments most aligned with the way a client wants to live.",
  },
  {
    step: "Comparable Analysis",
    text: "Study relevant alternatives, pricing context, and market positioning.",
  },
  {
    step: "Offer Strategy",
    text: "Approach negotiations with a clear understanding of value, leverage, and timing.",
  },
];

const acquisitionFlow = ["Objectives", "Building Analysis", "Strategy", "Execution"];

const comparisonRows = [
  ["Start with listings", "Start with objectives"],
  ["Compare apartments", "Compare buildings"],
  ["Review basic comparables", "Study context and alternatives"],
  ["React to available inventory", "Build a focused shortlist"],
  ["Choose a residence", "Choose with greater clarity"],
];

const decisionInputs = [
  {
    title: "Building Analysis",
    text: "Pricing, resident profile, amenities, location, and long-term fit.",
    icon: Building2,
  },
  {
    title: "Comparable Analysis",
    text: "Relevant active, pending, and closed comparables translated into practical decision-making context.",
    icon: Search,
  },
  {
    title: "Market Context",
    text: "Supply, demand, timing, and neighborhood conditions surrounding a decision.",
    icon: TrendingUp,
  },
  {
    title: "Offer Strategy",
    text: "Positioning, leverage, and execution informed by preparation rather than urgency.",
    icon: Compass,
  },
];

const sellerValue = [
  {
    title: "Private Value Assessment",
    text: "A first read on likely range, buyer profile, timing, and whether a sale deserves further consideration.",
    icon: Home,
  },
  {
    title: "Positioning Before Exposure",
    text: "Building-specific comparables, preparation priorities, and pricing posture before the market sees anything.",
    icon: Search,
  },
  {
    title: "Discreet Next Step",
    text: "No pressure. No listing commitment. No public exposure. Just enough information to decide whether the opportunity is worth pursuing.",
    icon: ShieldCheck,
  },
];

export default function BuySell() {
  return (
    <main className="min-h-screen bg-brand-ivory text-brand-graphite">
      <section className="bg-brand-midnight px-6 py-16 text-brand-ivory lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_0.8fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-brand-champagne">Buy / Sell</p>
            <h1 className="font-serif text-5xl font-semibold leading-[0.98] md:text-6xl lg:text-7xl">
              Acquire or Sell With Clear Context
            </h1>
            <div className="mt-7 max-w-2xl space-y-4 text-lg leading-8 text-brand-ivory/84">
              <p>Most real estate decisions begin long before an offer is written.</p>
              <p>
                They begin with objectives, timing, building selection, and an understanding of the alternatives.
              </p>
              <p>
                The purpose of this page is simple: help buyers and owners approach important decisions with greater
                clarity before execution begins.
              </p>
            </div>
          </div>
          <Card className="rounded-none border border-brand-ivory/14 bg-brand-ivory/[0.04] p-6 text-brand-ivory shadow-none">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-brand-champagne">
              Primary Question
            </p>
            <p className="mt-4 font-serif text-3xl leading-tight text-brand-ivory">
              How should this transaction be approached?
            </p>
          </Card>
        </div>
      </section>

      <section className="border-b border-brand-midnight/10 bg-brand-ivory px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-champagne">Advisory Paths</p>
          <div className="grid gap-4 md:grid-cols-2">
            <Link href="/reverse-buyer-origination">
              <Card className="h-full rounded-none border border-brand-champagne/40 bg-white/78 p-6 shadow-none transition hover:-translate-y-0.5 hover:border-brand-champagne">
                <h3 className="font-serif text-xl font-semibold text-brand-midnight">Buyer Advisory</h3>
                <p className="mt-2 text-sm leading-6 text-brand-graphite/72">
                  For clients evaluating buildings, neighborhoods, timing, and acquisition strategy before entering the
                  market.
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-brand-champagne/25 pt-4">
                  <div>
                    <p className="text-sm font-semibold text-brand-midnight">Reverse Buyer Origination™</p>
                    <p className="mt-1 text-sm text-brand-graphite/68">Context before search. Structure before offers.</p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-brand-champagne" strokeWidth={1.6} />
                </div>
              </Card>
            </Link>
            <Link href="/reverse-seller-architecture">
              <Card className="h-full rounded-none border border-brand-midnight/10 bg-[#f8f5ed] p-6 shadow-none transition hover:-translate-y-0.5 hover:border-brand-champagne/70 hover:bg-white/80">
                <h3 className="font-serif text-xl font-semibold text-brand-midnight">Seller Advisory</h3>
                <p className="mt-2 text-sm leading-6 text-brand-graphite/72">
                  For owners seeking a clear understanding of value, timing, positioning, and next steps before exposing
                  a property to the market.
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-brand-midnight/10 pt-4">
                  <div>
                    <p className="text-sm font-semibold text-brand-midnight">Reverse Seller Architecture™</p>
                    <p className="mt-1 text-sm text-brand-graphite/68">Positioning and pricing before exposure.</p>
                  </div>
                  <TrendingUp className="h-5 w-5 shrink-0 text-brand-champagne" strokeWidth={1.6} />
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-brand-graphite/12 bg-white px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Preparation</p>
          <h2 className="font-serif text-4xl font-semibold text-brand-midnight">
            Proper preparation prevents poor performance.
          </h2>
          <div className="mt-4 max-w-2xl space-y-3 text-base leading-7 text-brand-graphite/72">
            <p>Most transactions become difficult long before the offer is written.</p>
            <p>Good decisions are usually the result of careful preparation rather than last-minute negotiation.</p>
          </div>
          <div className="mt-10 flex flex-col items-center gap-2 lg:flex-row lg:items-center lg:gap-3">
            {acquisitionFlow.map((step, idx) => (
              <Fragment key={step}>
                <div className="flex w-full flex-col items-center rounded-brand border border-brand-champagne/35 bg-white px-5 py-4 lg:min-h-[88px] lg:flex-1 lg:justify-center">
                  <p className="font-mono text-xs text-brand-champagne">{idx + 1}</p>
                  <p className="mt-1 font-serif text-lg font-semibold text-brand-midnight">{step}</p>
                </div>
                {idx < acquisitionFlow.length - 1 ? (
                  <ArrowRight className="hidden h-4 w-4 shrink-0 text-brand-champagne lg:block" aria-hidden />
                ) : null}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-ivory px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-champagne">For Buyers</p>
          <h2 className="font-serif text-4xl font-semibold text-brand-midnight">From Objective to Offer</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {buyerFlow.map((item, index) => (
              <div
                key={item.step}
                className="flex flex-col border border-brand-champagne/35 bg-white/76 px-5 py-5"
              >
                <p className="font-mono text-xs text-brand-champagne">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-2 font-serif text-xl font-semibold text-brand-midnight">{item.step}</p>
                <p className="mt-3 text-sm leading-6 text-brand-graphite/72">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-brand-midnight/10 pt-14">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">
              What Informs The Decision
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {decisionInputs.map((lens) => (
                <Card key={lens.title} className="rounded-none border border-brand-champagne/35 bg-white/72 p-6 shadow-none">
                  <lens.icon className="h-6 w-6 text-brand-champagne" strokeWidth={1.5} />
                  <h3 className="mt-5 font-serif text-2xl font-semibold text-brand-midnight">{lens.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-brand-graphite/72">{lens.text}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-midnight px-6 py-14 text-brand-ivory lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">
            A Different Approach
          </p>
          <div className="mt-8 overflow-hidden border border-brand-ivory/20">
            <div className="grid grid-cols-2 bg-brand-ivory/[0.04]">
              <div className="border-r border-brand-ivory/20 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-champagne">
                Typical Search
              </div>
              <div className="px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-champagne">
                Agent Kammer
              </div>
            </div>
            {comparisonRows.map(([left, right]) => (
              <div key={left} className="grid grid-cols-2 border-t border-brand-ivory/20">
                <div className="border-r border-brand-ivory/20 px-5 py-3 text-sm text-brand-ivory/82">{left}</div>
                <div className="px-5 py-3 text-sm text-brand-ivory/94">{right}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-brand-midnight/10 bg-[#f7f3ea] px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1fr] lg:items-start">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-champagne">For Sellers</p>
            <h2 className="font-serif text-4xl font-semibold text-brand-midnight">A Discreet First Read</h2>
            <div className="mt-5 max-w-md space-y-3 text-base leading-7 text-brand-graphite/72">
              <p>Selling is not the primary focus of this site.</p>
              <p>
                However, owners deserve a thoughtful understanding of value, timing, and opportunity before making a
                public move.
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            {sellerValue.map((item) => (
              <Card key={item.title} className="rounded-none border border-brand-midnight/10 bg-white/74 p-5 shadow-none">
                <div className="flex gap-4">
                  <item.icon className="mt-1 h-5 w-5 shrink-0 text-brand-champagne" strokeWidth={1.55} />
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-brand-midnight">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-brand-graphite/72">{item.text}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-midnight/10 bg-white px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 border border-brand-champagne/35 bg-white p-6 shadow-[0_2px_22px_rgba(15,23,42,0.05)] md:flex-row md:items-center md:justify-between lg:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Next Step</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-brand-midnight">Request A Private Review</h2>
            <div className="mt-3 max-w-2xl space-y-2 text-sm leading-6 text-brand-graphite/70">
              <p>Share what you are considering.</p>
              <p>
                The next conversation may involve leasing, acquisition, building selection, or seller positioning
                depending on your goals.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link href="/profile">
              <Button variant="brand">Curate Matches</Button>
            </Link>
            <Link href="/contact">
              <Button variant="brandOutline">Ask About Selling</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

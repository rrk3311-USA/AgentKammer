import { Fragment } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Building2, Compass, Home, Search, ShieldCheck, TrendingUp } from "lucide-react";

const buyerFlow = ["Objective", "Building Context", "Comparable Analysis", "Offer Strategy"];

const acquisitionFlow = ["Objectives", "Building Context", "Positioning", "Execution"];

const comparisonRows = [
  ["Property search", "Building-first shortlist"],
  ["Listing-focused", "Objective-focused"],
  ["Offer submission", "Offer architecture"],
  ["Basic comps", "Comparable analysis"],
  ["Transaction guidance", "Structured process"],
  ["One-size-fits-all", "Context-specific guidance"],
];

const transactionLenses = [
  {
    title: "Building Context",
    text: "Pricing, liquidity, resident profile, amenity value, and building fit before recommendations are made.",
    icon: Building2,
  },
  {
    title: "Comparable Analysis",
    text: "Relevant active, pending, and closed comparables translated into decision context.",
    icon: Search,
  },
  {
    title: "Offer Strategy",
    text: "Positioning, timing, and negotiation posture before exposure or submission.",
    icon: Compass,
  },
];

const sellerValue = [
  {
    title: "Private Value Assessment",
    text: "A discreet first read on likely range, buyer pool, timing, and whether the move is worth exploring.",
    icon: Home,
  },
  {
    title: "Positioning Before Exposure",
    text: "Building-specific comps, preparation priorities, and pricing posture before the market sees anything.",
    icon: Search,
  },
  {
    title: "Discreet Next Step",
    text: "No public listing, blast, or pressure. Just enough context to decide if selling deserves more attention.",
    icon: ShieldCheck,
  },
];

export default function BuySell() {
  return (
    <main className="min-h-screen bg-brand-ivory text-brand-graphite">
      <section className="bg-brand-midnight px-6 py-16 text-brand-ivory lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_0.8fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-brand-champagne">
              Buy / Sell
            </p>
            <h1 className="font-serif text-5xl font-semibold leading-[0.98] md:text-6xl lg:text-7xl">
              Acquire or Sell Within the Right Building Context
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-brand-ivory/84">
              Transaction work begins after the building question is clear. Buyer origination, seller positioning, and
              offer strategy live here — not on a separate strategy page.
            </p>
          </div>
          <Card className="rounded-none border border-brand-ivory/14 bg-brand-ivory/[0.04] p-6 text-brand-ivory shadow-none">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-brand-champagne">
              Primary Question
            </p>
            <p className="mt-4 font-serif text-3xl leading-tight text-brand-ivory">How should this transaction be approached?</p>
          </Card>
        </div>
      </section>

      <section className="border-b border-brand-midnight/10 px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-champagne">Advisory Paths</p>
          <div className="grid gap-4 md:grid-cols-2">
            <Link href="/reverse-buyer-origination">
              <Card className="flex h-full items-center justify-between rounded-none border border-brand-champagne/40 bg-white/78 p-6 shadow-none transition hover:-translate-y-0.5 hover:border-brand-champagne">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-brand-midnight">Reverse Buyer Origination™</h3>
                  <p className="mt-2 text-sm leading-6 text-brand-graphite/72">
                    Context before search. Structure before offers.
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-brand-champagne" strokeWidth={1.6} />
              </Card>
            </Link>
            <Link href="/reverse-seller-architecture">
              <Card className="flex h-full items-center justify-between rounded-none border border-brand-midnight/10 bg-[#f8f5ed] p-6 shadow-none transition hover:-translate-y-0.5 hover:border-brand-champagne/70 hover:bg-white/80">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-brand-midnight">
                    Reverse Seller Architecture™
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-brand-graphite/72">
                    Positioning and pricing before exposure.
                  </p>
                </div>
                <TrendingUp className="h-5 w-5 shrink-0 text-brand-champagne" strokeWidth={1.6} />
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-brand-graphite/12 px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Buyer Process</p>
          <h2 className="font-serif text-4xl font-semibold text-brand-midnight">Four Steps. One Discipline.</h2>
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

      <section className="px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-champagne">For Buyers</p>
          <h2 className="font-serif text-4xl font-semibold text-brand-midnight">From Objective to Offer</h2>
          <div className="mt-10 flex flex-col items-center gap-2 lg:flex-row lg:gap-3">
            {buyerFlow.map((step, index) => (
              <Fragment key={step}>
                <div className="flex w-full flex-col items-center border border-brand-champagne/35 bg-white/76 px-5 py-5 lg:min-h-[96px] lg:flex-1 lg:justify-center">
                  <p className="font-mono text-xs text-brand-champagne">{String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-2 text-center font-serif text-xl font-semibold text-brand-midnight">{step}</p>
                </div>
                {index < buyerFlow.length - 1 ? (
                  <ArrowRight className="hidden h-4 w-4 shrink-0 text-brand-champagne lg:block" aria-hidden />
                ) : null}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Methodology</p>
          <h2 className="font-serif text-4xl font-semibold text-brand-midnight">What Supports the Transaction</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {transactionLenses.map((lens) => (
              <Card key={lens.title} className="rounded-none border border-brand-champagne/35 bg-white/72 p-6 shadow-none">
                <lens.icon className="h-6 w-6 text-brand-champagne" strokeWidth={1.5} />
                <h3 className="mt-5 font-serif text-2xl font-semibold text-brand-midnight">{lens.title}</h3>
                <p className="mt-3 text-sm leading-6 text-brand-graphite/72">{lens.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-midnight px-6 py-14 text-brand-ivory lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Comparison</p>
          <h2 className="font-serif text-4xl font-semibold text-brand-ivory">Typical Search vs Agent Kammer</h2>
          <div className="mt-8 overflow-hidden border border-brand-ivory/20">
            <div className="grid grid-cols-2 bg-brand-ivory/[0.04]">
              <div className="border-r border-brand-ivory/20 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-champagne">
                Typical
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
            <p className="mt-5 max-w-md text-base leading-7 text-brand-graphite/72">
              Selling is not the main promise of the site, but owners deserve a private, useful answer before they expose
              a residence or choose a listing path.
            </p>
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

      <section className="px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 border border-brand-champagne/35 bg-white/70 p-6 md:flex-row md:items-center md:justify-between lg:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Next Step</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-brand-midnight">Start with the private profile.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-graphite/70">
              Share what you are considering. The follow-up can be buyer strategy, lease matching, or a seller value
              assessment depending on your inputs.
            </p>
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

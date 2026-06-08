import { Fragment } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Building2, Compass, Search } from "lucide-react";

const acquisitionFlow = ["Objectives", "Intelligence", "Strategy", "Execution"];

const comparisonRows = [
  ["Property search", "Acquisition strategy"],
  ["Listing-focused", "Objective-focused"],
  ["Offer submission", "Offer architecture"],
  ["Basic comps", "Intelligence analysis"],
  ["Transaction guidance", "Structured process"],
  ["One-size-fits-all", "Customized strategy"],
];

const strategyLenses = [
  {
    title: "Building Intelligence",
    text: "Pricing, liquidity, resident profile, amenity value, and building fit before recommendations are made.",
    icon: Building2,
  },
  {
    title: "Market Intelligence",
    text: "Neighborhood supply, demand, timing, and comparable context translated into decision quality.",
    icon: Compass,
  },
  {
    title: "Opportunity Monitor",
    text: "Price cuts, stale listings, concessions, and moments where leverage becomes visible.",
    icon: Search,
  },
];

export default function Strategy() {
  return (
    <main className="min-h-screen bg-brand-ivory text-brand-graphite">
      <section className="bg-brand-midnight px-6 py-16 text-brand-ivory lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-brand-champagne">Our Strategy</p>
          <h1 className="font-serif text-5xl font-semibold leading-[0.98] text-brand-ivory md:text-7xl">
            Strategic Property Acquisition™
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-brand-ivory/88">
            Most agents start with listings. Agent Kammer starts with decision quality.
          </p>
        </div>
      </section>

      <section className="border-b border-brand-graphite/12 px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">The Framework</p>
          <h2 className="font-serif text-4xl font-semibold text-brand-midnight">Four Steps. One Discipline.</h2>
          <div className="mt-10 flex flex-col items-center gap-2 lg:flex-row lg:items-center lg:gap-3">
            {acquisitionFlow.map((step, idx) => (
              <Fragment key={step}>
                <div className="flex w-full flex-col items-center rounded-brand border border-brand-champagne/35 bg-white px-5 py-4 lg:min-h-[88px] lg:flex-1 lg:justify-center">
                  <p className="font-mono text-xs text-brand-champagne">{idx + 1}</p>
                  <p className="mt-1 font-serif text-lg font-semibold text-brand-midnight">{step}</p>
                </div>
                {idx < acquisitionFlow.length - 1 && (
                  <>
                    <ArrowRight className="hidden h-4 w-4 shrink-0 text-brand-champagne lg:block" aria-hidden />
                    <span className="text-brand-champagne lg:hidden" aria-hidden>
                      ↓
                    </span>
                  </>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-midnight px-6 py-14 text-brand-ivory lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Comparison</p>
          <h2 className="font-serif text-4xl font-semibold text-brand-ivory">Traditional Agent vs Agent Kammer</h2>
          <div className="mt-8 overflow-hidden border border-brand-ivory/20">
            <div className="grid grid-cols-2 bg-brand-ivory/[0.04]">
              <div className="border-r border-brand-ivory/20 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-champagne">
                Traditional
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

      <section className="px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Methodology</p>
          <h2 className="font-serif text-4xl font-semibold text-brand-midnight">How The Process Thinks</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {strategyLenses.map((lens) => (
              <Card key={lens.title} className="rounded-none border border-brand-champagne/35 bg-white/72 p-6 shadow-none">
                <lens.icon className="h-6 w-6 text-brand-champagne" strokeWidth={1.5} />
                <h3 className="mt-5 font-serif text-2xl font-semibold text-brand-midnight">{lens.title}</h3>
                <p className="mt-3 text-sm leading-6 text-brand-graphite/72">{lens.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-midnight/10 bg-[#f7f3ea] px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.72fr_1fr] md:items-center">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">
              Meet Agent Kammer
            </p>
            <h2 className="font-serif text-4xl font-semibold text-brand-midnight">A building-first advisor for modern Manhattan.</h2>
          </div>
          <div>
            <p className="text-base leading-7 text-brand-graphite/74">
              The work is designed for clients who want more than access to inventory. Agent Kammer studies the building,
              the market, and the leverage around a decision before narrowing the search to residences worth considering.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/profile">
                <Button variant="brand">Curate Matches</Button>
              </Link>
              <Link href="/real-estate">
                <Button variant="brandOutline">View Intelligence</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

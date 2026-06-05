import { Fragment } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const acquisitionFlow = ["Objectives", "Intelligence", "Strategy", "Execution"];

const comparisonRows = [
  ["Property search", "Acquisition strategy"],
  ["Listing-focused", "Objective-focused"],
  ["Offer submission", "Offer architecture"],
  ["Basic comps", "Intelligence analysis"],
  ["Transaction guidance", "Structured process"],
  ["One-size-fits-all", "Customized strategy"],
];

export default function About() {
  return (
    <main className="min-h-screen bg-brand-ivory text-brand-graphite">
      <section className="bg-brand-midnight px-6 py-16 text-brand-ivory lg:px-10">
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
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-sapphire">The Framework</p>
          <h2 className="font-serif text-4xl font-semibold text-brand-midnight">Four Steps. One Discipline.</h2>
          <div className="mt-10 flex flex-col items-center gap-2 lg:flex-row lg:items-center lg:gap-3">
            {acquisitionFlow.map((step, idx) => (
              <Fragment key={step}>
                <div className="flex w-full flex-col items-center rounded-lg border border-brand-graphite/12 bg-white px-5 py-4 lg:min-h-[88px] lg:flex-1 lg:justify-center">
                  <p className="font-mono text-xs text-brand-sapphire">{idx + 1}</p>
                  <p className="mt-1 font-serif text-lg font-semibold text-brand-midnight">{step}</p>
                </div>
                {idx < acquisitionFlow.length - 1 && (
                  <>
                    <ArrowRight className="hidden h-4 w-4 shrink-0 text-brand-sapphire lg:block" aria-hidden />
                    <span className="text-brand-sapphire lg:hidden" aria-hidden>
                      ↓
                    </span>
                  </>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-midnight px-6 py-14 text-brand-ivory lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Comparison</p>
          <h2 className="font-serif text-4xl font-semibold text-brand-ivory">Traditional Agent vs Agent Kammer</h2>
          <div className="mt-8 overflow-hidden border border-brand-ivory/20">
            <div className="grid grid-cols-2 bg-brand-midnight/90">
              <div className="border-r border-brand-ivory/20 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-champagne">
                Traditional
              </div>
              <div className="px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-champagne">
                Agent Kammer
              </div>
            </div>
            {comparisonRows.map(([left, right]) => (
              <div key={left} className="grid grid-cols-2 border-t border-brand-ivory/20">
                <div className="border-r border-brand-ivory/20 px-5 py-3 text-sm text-brand-ivory/92">{left}</div>
                <div className="px-5 py-3 text-sm text-brand-ivory/92">{right}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-sapphire">Philosophy</p>
            <h2 className="font-serif text-3xl font-semibold text-brand-midnight md:text-4xl">
              We help clients make better acquisition decisions — not just buy property.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/reverse-buyer-origination">
              <Button className="h-11 rounded-none border border-brand-champagne bg-brand-champagne px-6 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brand-midnight hover:bg-brand-champagne/90">
                Buyer Flow
              </Button>
            </Link>
            <Link href="/profile">
              <Button
                variant="outline"
                className="h-11 rounded-none border-brand-midnight px-6 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brand-midnight hover:bg-brand-midnight/5"
              >
                Start Profile
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

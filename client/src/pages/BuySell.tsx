import { Fragment } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Home, Search, ShieldCheck, TrendingUp } from "lucide-react";

const buyerFlow = ["Objective", "Building Intelligence", "Comparable Analysis", "Offer Strategy"];

const sellerValue = [
  {
    title: "Private Value Assessment",
    text: "A free first read on likely range, buyer pool, timing, and whether the move is worth exploring.",
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
              Buy / Sell Advisory
            </p>
            <h1 className="font-serif text-5xl font-semibold leading-[0.98] md:text-6xl lg:text-7xl">
              Strategy Before Search. Context Before Exposure.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-brand-ivory/84">
              Agent Kammer is built primarily for Manhattan buyers and leasing clients, with a discreet seller path for
              owners who want a clear value read before committing to the market.
            </p>
          </div>
          <Card className="rounded-none border border-brand-ivory/14 bg-brand-ivory/[0.04] p-6 text-brand-ivory shadow-none">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-brand-champagne">
              Primary Question
            </p>
            <p className="mt-4 font-serif text-3xl leading-tight text-brand-ivory">How do you help me transact?</p>
            <p className="mt-4 text-sm leading-6 text-brand-ivory/68">
              Buyer strategy and seller positioning, with deeper methodology available on the Strategy page.
            </p>
          </Card>
        </div>
      </section>

      <section className="border-b border-brand-midnight/10 px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-champagne">Advisory</p>
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-end">
            <div>
              <h2 className="font-serif text-4xl font-semibold text-brand-midnight">Buy or Sell</h2>
              <p className="mt-4 max-w-md text-base leading-7 text-brand-graphite/70">
                Choose the route that fits the decision in front of you. Buyer strategy remains the primary path; seller
                review is available when timing, value, or preparation needs a private read.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Link href="/reverse-buyer-origination">
                <Card className="flex h-full items-center justify-between rounded-none border border-brand-champagne/40 bg-white/78 p-6 shadow-none transition hover:-translate-y-0.5 hover:border-brand-champagne">
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-brand-midnight">
                      Reverse Buyer Origination™
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-brand-graphite/72">
                      Strategy before search. Structure before offers.
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
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 border-b border-brand-midnight/10 pb-8 lg:grid-cols-[0.82fr_1fr] lg:items-end">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-champagne">For Buyers</p>
              <h2 className="font-serif text-4xl font-semibold text-brand-midnight">The Main Path</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-brand-graphite/72 lg:justify-self-end">
              A clear acquisition path from objective to offer strategy.
            </p>
          </div>
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

      <section className="border-y border-brand-midnight/10 bg-[#f7f3ea] px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1fr] lg:items-start">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-champagne">For Sellers</p>
            <h2 className="font-serif text-4xl font-semibold text-brand-midnight">A Subtle First Read</h2>
            <p className="mt-5 max-w-md text-base leading-7 text-brand-graphite/72">
              Selling is not the main promise of the site, but owners deserve a private, useful answer before they
              expose a residence or choose a listing path.
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
            <Link href="/strategy">
              <Button variant="brandOutline">View Strategy</Button>
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

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MarketReportDownload } from "@/components/MarketReportDownload";
import { Compass, MapPin } from "lucide-react";
import { Link } from "wouter";

const marketMetrics = [
  { label: "Median Price", value: "$1.175M", context: "Manhattan reference point" },
  { label: "Sales Volume", value: "$6.05B", context: "Q1 tracked activity" },
  { label: "Days Listed", value: "42-69", context: "velocity range" },
  { label: "Luxury Avg", value: "$10.3M", context: "$10M+ segment" },
];

const manhattanHubs = [
  {
    title: "Uptown",
    areas: "Central Park, UES, UWS",
    text: "Established prestige, park access, co-op discipline, and long-horizon ownership demand.",
  },
  {
    title: "Midtown",
    areas: "Hudson Yards, Manhattan West, Billionaires' Row",
    text: "Modern tower inventory, amenity depth, corporate proximity, and trophy-building liquidity.",
  },
  {
    title: "Downtown",
    areas: "Tribeca, SoHo, Chelsea, Flatiron",
    text: "Loft character, waterfront demand, cultural access, and premium new-development absorption.",
  },
];

const intelligenceRows = [
  ["Building Fit", "Resident profile, amenity value, sponsor quality, and long-term livability."],
  ["Comparable Analysis", "Active, pending, and closed trades filtered by true building relevance."],
  ["Neighborhood Context", "Supply, demand, commute, retail, schools, parks, and development pipeline."],
  ["Deal Leverage", "Price reductions, stale listings, concessions, and negotiation windows."],
];

const watchlist = [
  { name: "Hudson Yards", signal: "Modern Luxury", value: "$4.99M-$5.95M" },
  { name: "Tribeca", signal: "Established Prestige", value: "$3.77M-$4.15M" },
  { name: "SoHo", signal: "Historic Lofts", value: "$3.36M-$3.69M" },
  { name: "Chelsea", signal: "Gallery District", value: "Premium layouts" },
];

const advisorySignals = [
  "Luxury leasing remains a common first step before acquisition.",
  "Inventory quality matters more than broad neighborhood averages.",
  "Cash buyers continue to compress timelines in the highest tier.",
  "Mid-market listings can still offer room when building fit is imperfect.",
];

export default function NewYorkMarket() {
  return (
    <main className="min-h-screen bg-brand-ivory text-brand-graphite">
      <section className="bg-brand-midnight px-6 py-16 text-brand-ivory lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-brand-champagne">
              Manhattan Market Intelligence
            </p>
            <h1 className="font-serif text-5xl font-semibold leading-[0.98] md:text-6xl lg:text-7xl">
              New York Market Brief
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-ivory/82">
              A building-first view of Manhattan pricing, liquidity, neighborhood context, and acquisition timing.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/profile">
                <Button variant="brand">Curate Matches</Button>
              </Link>
              <Link href="/real-estate">
                <Button variant="brandGhost">Research Framework</Button>
              </Link>
            </div>
          </div>
          <Card className="rounded-none border border-brand-ivory/14 bg-brand-ivory/[0.04] p-6 text-brand-ivory shadow-none">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-brand-champagne">
              Current Read
            </p>
            <p className="mt-4 font-serif text-3xl leading-tight text-brand-ivory">
              Balanced conditions with selective seller advantage.
            </p>
            <p className="mt-4 text-sm leading-6 text-brand-ivory/68">
              The useful question is not whether Manhattan is strong. It is which buildings still offer fit, leverage,
              and durable liquidity for the client&apos;s path.
            </p>
          </Card>
        </div>
      </section>

      <section className="border-b border-brand-midnight/10 bg-[#f7f3ea] px-6 py-10 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {marketMetrics.map((metric) => (
            <Card key={metric.label} className="rounded-none border border-brand-champagne/30 bg-white/72 p-5 shadow-none">
              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-brand-champagne">
                {metric.label}
              </p>
              <p className="mt-3 font-serif text-3xl text-brand-midnight">{metric.value}</p>
              <p className="mt-2 text-sm leading-5 text-brand-graphite/62">{metric.context}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 border-b border-brand-midnight/10 pb-8 lg:grid-cols-[0.8fr_1fr] lg:items-end">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-champagne">Submarkets</p>
              <h2 className="font-serif text-4xl font-semibold text-brand-midnight">Manhattan Intelligence Hubs</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-brand-graphite/72 lg:justify-self-end">
              Uptown, Midtown, and Downtown are reviewed by building quality first, then neighborhood momentum,
              comparable pricing, and deal leverage.
            </p>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {manhattanHubs.map((hub) => (
              <Card key={hub.title} className="rounded-none border border-brand-midnight/10 bg-white/76 p-6 shadow-none">
                <MapPin className="h-5 w-5 text-brand-champagne" strokeWidth={1.45} />
                <h3 className="mt-4 font-serif text-2xl font-semibold text-brand-midnight">{hub.title}</h3>
                <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-brand-graphite/48">
                  {hub.areas}
                </p>
                <p className="mt-4 text-sm leading-6 text-brand-graphite/72">{hub.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-champagne">Method</p>
            <h2 className="font-serif text-4xl font-semibold text-brand-midnight">What We Actually Measure</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-brand-graphite/74">
              The page is intentionally not a citywide scorecard. It is a client advisory brief: enough market context
              to understand timing, then deeper building-level analysis before recommendations are made.
            </p>
          </div>
          <div className="border border-brand-champagne/35 bg-brand-ivory/70">
            {intelligenceRows.map(([label, text], index) => (
              <div
                key={label}
                className={`grid gap-3 px-5 py-4 sm:grid-cols-[180px_1fr] ${
                  index === intelligenceRows.length - 1 ? "" : "border-b border-brand-midnight/10"
                }`}
              >
                <p className="font-serif text-xl text-brand-midnight">{label}</p>
                <p className="text-sm leading-6 text-brand-graphite/72">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-midnight px-6 py-16 text-brand-ivory lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1fr] lg:items-start">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-champagne">Watchlist</p>
              <h2 className="font-serif text-4xl font-semibold">Tracked Manhattan Signals</h2>
              <p className="mt-5 max-w-md text-base leading-7 text-brand-ivory/70">
                A restrained snapshot of where building quality, pricing context, and client demand intersect.
              </p>
            </div>
            <div className="grid gap-3">
              {watchlist.map((item) => (
                <Card
                  key={item.name}
                  className="grid rounded-none border border-brand-ivory/14 bg-brand-midnight p-5 text-brand-ivory shadow-none sm:grid-cols-[1fr_180px_150px] sm:items-center"
                >
                  <p className="font-serif text-2xl">{item.name}</p>
                  <p className="mt-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-brand-champagne sm:mt-0">
                    {item.signal}
                  </p>
                  <p className="mt-2 text-sm text-brand-ivory/72 sm:mt-0 sm:text-right">{item.value}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-start">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-champagne">Advisory Notes</p>
            <h2 className="font-serif text-4xl font-semibold text-brand-midnight">How To Read The Market</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {advisorySignals.map((signal) => (
              <div key={signal} className="border-l border-brand-champagne/55 bg-white/64 px-5 py-4">
                <Compass className="mb-3 h-4 w-4 text-brand-champagne" strokeWidth={1.55} />
                <p className="text-sm leading-6 text-brand-graphite/76">{signal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-brand-midnight/10 bg-white px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <MarketReportDownload market="nyc" marketName="Manhattan" />
        </div>
      </section>

      <section className="px-6 py-10 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-brand-midnight/10 pt-6 text-xs leading-5 text-brand-graphite/52 lg:flex-row lg:items-center lg:justify-between">
          <p>Sources include Corcoran, REBNY, PropertyShark, StreetEasy, and internal building review notes.</p>
          <p className="uppercase tracking-[0.16em]">Last updated Q1 2025</p>
        </div>
      </section>
    </main>
  );
}

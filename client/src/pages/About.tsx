import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { Building2, Compass, Eye } from "lucide-react";

const principles = [
  {
    title: "Observer",
    text: "Manhattan changes block by block. We pay attention to what most searches skip — resident profile, service quality, timing, and the details that shape daily life.",
    icon: Eye,
  },
  {
    title: "Interpreter",
    text: "Market data becomes useful only when translated into judgment. We turn building research and neighborhood context into clear recommendations.",
    icon: Compass,
  },
  {
    title: "Advisor",
    text: "Clients deserve interpretation, not inventory. Agent Kammer offers perspective before pressure — lease, acquire, or sell with clarity.",
    icon: Building2,
  },
];

const advisorContrast = [
  ["Begins with listings", "Begins with how you want to live"],
  ["Apartment search", "Curated watchlist"],
  ["Shows what is available", "Explains what is worth studying"],
  ["Market averages", "Contextual judgment"],
];

export default function About() {
  return (
    <main className="min-h-screen bg-brand-ivory text-brand-graphite">
      <section className="bg-brand-midnight px-6 py-16 text-brand-ivory lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-brand-champagne">About</p>
          <h1 className="font-serif text-5xl font-semibold leading-[0.98] md:text-6xl lg:text-7xl">
            Why Agent Kammer Exists
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-brand-ivory/84">
            Manhattan has thousands of residences. Only a few buildings will be right for how a client actually wants to
            live, work, and move through the city.
          </p>
        </div>
      </section>

      <section className="border-b border-brand-midnight/10 px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Philosophy</p>
          <h2 className="font-serif text-4xl font-semibold text-brand-midnight">Why the Building Comes First</h2>
          <div className="mt-6 space-y-4 text-base leading-7 text-brand-graphite/76">
            <p>
              Most clients are taught to search residences. Agent Kammer studies Manhattan more carefully — neighborhood
              placement, amenities, resident experience, commute, and what makes a tower worth studying at all.
            </p>
            <p>
              The approach exists because luxury decisions deserve observation and judgment before any recommendation.
              From there, the work extends naturally: lease, acquire, or sell with context already established.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f3ea] px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Mission</p>
          <h2 className="font-serif text-4xl font-semibold text-brand-midnight">Observer. Interpreter. Advisor.</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {principles.map((item) => (
              <Card key={item.title} className="rounded-none border border-brand-champagne/35 bg-white/78 p-6 shadow-none">
                <item.icon className="h-5 w-5 text-brand-champagne" strokeWidth={1.5} />
                <h3 className="mt-4 font-serif text-2xl font-semibold text-brand-midnight">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-brand-graphite/72">{item.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-midnight px-6 py-14 text-brand-ivory lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Positioning</p>
          <h2 className="font-serif text-4xl font-semibold text-brand-ivory">A Different Lens</h2>
          <div className="mt-8 overflow-hidden border border-brand-ivory/20">
            <div className="grid grid-cols-2 bg-brand-ivory/[0.04]">
              <div className="border-r border-brand-ivory/20 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-champagne">
                Typical Search
              </div>
              <div className="px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-champagne">
                Agent Kammer
              </div>
            </div>
            {advisorContrast.map(([left, right]) => (
              <div key={left} className="grid grid-cols-2 border-t border-brand-ivory/20">
                <div className="border-r border-brand-ivory/20 px-5 py-3 text-sm text-brand-ivory/78">{left}</div>
                <div className="px-5 py-3 text-sm text-brand-ivory/92">{right}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Outcomes</p>
            <h2 className="font-serif text-3xl font-semibold text-brand-midnight md:text-4xl">
              Choose the right building. Lease it. Acquire it. Sell it.
            </h2>
            <p className="mt-4 text-base leading-7 text-brand-graphite/72">
              Close study of buildings and neighborhoods comes before any recommendation — lease, acquire, or sell with
              that clarity already in place.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/profile">
              <Button variant="brand">Curate Matches</Button>
            </Link>
            <Link href="/contact">
              <Button variant="brandOutline">Contact</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

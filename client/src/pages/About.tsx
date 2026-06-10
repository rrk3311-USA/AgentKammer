import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { BeliefQuote } from "@/components/BeliefQuote";
import { EditorialAccent } from "@/components/EditorialAccent";
import { Building2, Compass, Eye } from "lucide-react";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const principles = [
  {
    title: "Observer",
    text: "Manhattan changes block by block. We pay attention to what many searches overlook: resident profile, service quality, neighborhood evolution, and the details that shape daily life.",
    icon: Eye,
  },
  {
    title: "Interpreter",
    text: "Information becomes useful only when translated into judgment. We turn building research, neighborhood context, and market observations into practical guidance.",
    icon: Compass,
  },
  {
    title: "Advisor",
    text: "Clients deserve interpretation, not pressure. The goal is not to promote inventory. The goal is to help people make better decisions.",
    icon: Building2,
  },
];

const advisorContrast = [
  ["Begins with listings", "Begins with how you want to live"],
  ["Searches apartments", "Studies buildings"],
  ["Reviews available inventory", "Evaluates context"],
  ["Compares market averages", "Applies judgment"],
  ["Chooses a residence", "Chooses with greater clarity"],
];

export default function About() {
  usePageMetadata({
    title: "About — Modern Manhattan Residential Intelligence",
    description:
      "Agent Kammer is a Manhattan advisory practice focused on building research, neighborhood context, and research-led residential guidance.",
    path: "/about",
  });

  return (
    <main className="min-h-screen bg-brand-ivory text-brand-graphite">
      <section className="bg-brand-midnight px-6 py-16 text-brand-ivory lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-brand-champagne">About</p>
          <h1 className="font-serif text-5xl font-semibold leading-[0.98] md:text-6xl lg:text-7xl">
            Why Agent Kammer Exists
          </h1>
          <div className="mt-7 max-w-2xl space-y-4 text-lg leading-8 text-brand-ivory/84">
            <p>
              Manhattan has thousands of residences. Only a few buildings will be right for how a client actually wants
              to live, work, and move through the city.
            </p>
            <p>The challenge is not access to inventory.</p>
            <p>The challenge is knowing what deserves attention in the first place.</p>
          </div>
        </div>
      </section>

      <BeliefQuote>A building shapes daily life in ways a floor plan never can.</BeliefQuote>

      <section className="relative border-b border-brand-midnight/10 bg-brand-ivory px-6 py-14 lg:px-10">
        <EditorialAccent variant="blueprint" />
        <div className="relative z-[1] mx-auto max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Philosophy</p>
          <h2 className="font-serif text-4xl font-semibold text-brand-midnight">Why The Building Comes First</h2>
          <div className="mt-6 space-y-4 text-base leading-7 text-brand-graphite/76">
            <p>Most clients are taught to search residences. We prefer to start earlier.</p>
            <p>
              Commute, resident profile, service quality, amenities, neighborhood placement, and long-term satisfaction
              are often determined before a client ever steps inside a residence.
            </p>
            <p>That is why the building comes first.</p>
            <p>
              The approach exists because important decisions deserve observation and judgment before recommendations.
            </p>
            <p>
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
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">A Different Lens</p>
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

      <section className="border-t border-brand-midnight/10 bg-white px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Outcomes</p>
            <div className="font-serif text-3xl font-semibold leading-snug text-brand-midnight md:text-4xl">
              <p>Choose The Right Building.</p>
              <p className="mt-2">Lease It.</p>
              <p className="mt-2">Acquire Within It.</p>
              <p className="mt-2">Sell With Context.</p>
            </div>
            <div className="mt-6 space-y-4 text-base leading-7 text-brand-graphite/72">
              <p>Everything on this site supports those decisions.</p>
              <p>
                The buildings. The reports. The perspectives. The observations.
              </p>
              <p>
                The goal is simple: help clients understand Manhattan more clearly before making an important decision.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
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

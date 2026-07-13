import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { Building2, MapPin, Users } from "lucide-react";
import { BrandNavyHero } from "@/components/BrandNavyHero";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const leaseAudiences = [
  "Executives relocating to Manhattan",
  "Founders establishing a New York base",
  "Finance professionals joining a new firm",
  "Attorneys moving into the city",
  "First Manhattan lease decisions",
];

const leaseApproachSteps = [
  {
    title: "Neighborhood",
    text: "Where the commute, rhythm, and daily life actually work.",
    icon: MapPin,
  },
  {
    title: "Building",
    text: "Amenities, resident profile, service level, and overall fit.",
    icon: Building2,
  },
  {
    title: "Residence",
    text: "Floor plan, light, layout, and view — once the larger decisions are clear.",
    icon: Users,
  },
];

const directInquiryComparison = [
  ["One building", "Multiple buildings"],
  ["One inventory source", "Curated watchlist"],
  ["Property perspective", "Client perspective"],
  ["Unit selection", "Building selection"],
  ["Building fit", "Lifestyle fit"],
];

export default function Lease() {
  usePageMetadata({
    title: "Lease — Manhattan Luxury Rental Advisory",
    description:
      "Research-led leasing guidance for executives, founders, and international clients entering Manhattan through premier modern buildings.",
    path: "/lease",
    keywords:
      "Manhattan luxury apartment lease, NYC executive rental, international Manhattan lease advisory",
  });

  return (
    <main className="min-h-screen bg-brand-ivory text-brand-graphite">
      <BrandNavyHero
        eyebrow="Lease"
        title="Luxury Leasing, Considered Carefully"
        description={
          <>
            <p>Most Manhattan searches begin with apartments.</p>
            <p className="mt-4">
              We begin by understanding where and how a client wants to live — then narrow the search to buildings and
              residences worth considering.
            </p>
          </>
        }
      />

      <section className="border-b border-brand-midnight/10 bg-brand-warm px-6 py-14 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-start">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Who This Serves</p>
            <h2 className="font-serif text-4xl font-semibold text-brand-midnight">For Clients Entering Manhattan</h2>
            <div className="mt-5 max-w-md space-y-3 text-base leading-7 text-brand-graphite/72">
              <p>Most leasing decisions begin with a new role, a relocation, or a major life change.</p>
              <p>The goal is not to tour the most apartments.</p>
              <p>The goal is to identify the right environment for the next chapter.</p>
            </div>
          </div>
          <ul className="grid gap-3">
            {leaseAudiences.map((item) => (
              <li
                key={item}
                className="border border-brand-champagne/30 bg-white/76 px-5 py-4 text-sm leading-6 text-brand-graphite/78"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-brand-warm px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Approach</p>
          <h2 className="font-serif text-4xl font-semibold text-brand-midnight">Neighborhood, Building, Residence</h2>
          <div className="mt-4 max-w-2xl space-y-3 text-base leading-7 text-brand-graphite/72">
            <p>Most apartment searches start at the end of the process.</p>
            <p>We prefer to start at the beginning.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {leaseApproachSteps.map((step) => (
              <Card key={step.title} className="rounded-none border border-brand-champagne/35 bg-white/78 p-6 shadow-none">
                <step.icon className="h-5 w-5 text-brand-champagne" strokeWidth={1.5} />
                <h3 className="mt-4 font-serif text-2xl font-semibold text-brand-midnight">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-brand-graphite/72">{step.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-midnight px-6 py-14 text-brand-ivory lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">
            A Different Starting Point
          </p>
          <h2 className="font-serif text-4xl font-semibold text-brand-ivory">
            Why Not Simply Contact The Building Directly?
          </h2>
          <div className="mt-8 overflow-hidden border border-brand-ivory/20">
            <div className="grid grid-cols-2 bg-brand-ivory/[0.04]">
              <div className="border-r border-brand-ivory/20 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-champagne">
                Direct Building Inquiry
              </div>
              <div className="px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-champagne">
                Agent Kammer
              </div>
            </div>
            {directInquiryComparison.map(([left, right]) => (
              <div key={left} className="grid grid-cols-2 border-t border-brand-ivory/20">
                <div className="border-r border-brand-ivory/20 px-5 py-3 text-sm text-brand-ivory/78">{left}</div>
                <div className="px-5 py-3 text-sm text-brand-ivory/92">{right}</div>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-base leading-7 text-brand-ivory/84">
            A building representative helps you understand their building. Agent Kammer helps you understand your
            options.
          </p>
        </div>
      </section>

      <section className="border-t border-brand-midnight/10 bg-white px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 border border-brand-champagne/35 bg-brand-warm p-6 md:flex-row md:items-center md:justify-between lg:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Next Step</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-brand-midnight">Request A Building Shortlist</h2>
            <div className="mt-3 max-w-xl space-y-2 text-sm leading-6 text-brand-graphite/70">
              <p>Share your timing, neighborhood preferences, and lifestyle goals.</p>
              <p>We identify buildings worth considering before residences enter the conversation.</p>
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link href="/profile">
              <Button variant="brand">Curate Matches</Button>
            </Link>
            <Link href="/buildings">
              <Button variant="brandOutline">View Buildings</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

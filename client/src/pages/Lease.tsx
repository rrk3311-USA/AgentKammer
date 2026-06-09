import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { Building2, MapPin, Users } from "lucide-react";

const leaseAudiences = [
  "Executives relocating to Manhattan",
  "Founders establishing a New York base",
  "Finance professionals joining a new firm",
  "Attorneys moving into the city",
  "First Manhattan lease decisions",
];

const buildingFirstSteps = [
  {
    title: "Neighborhood",
    text: "Where the commute, rhythm, and daily life actually work.",
    icon: MapPin,
  },
  {
    title: "Building",
    text: "Amenities, resident profile, service level, and long-term fit.",
    icon: Building2,
  },
  {
    title: "Residence",
    text: "Floor plan, light, and layout — only after the building is right.",
    icon: Users,
  },
];

export default function Lease() {
  return (
    <main className="min-h-screen bg-brand-ivory text-brand-graphite">
      <section className="bg-brand-midnight px-6 py-16 text-brand-ivory lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-brand-champagne">Lease</p>
          <h1 className="font-serif text-5xl font-semibold leading-[0.98] md:text-6xl lg:text-7xl">
            Building-First Luxury Leasing
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-brand-ivory/84">
            Most searches begin with apartments. Agent Kammer begins with the building — then narrows to residences
            worth considering inside it.
          </p>
        </div>
      </section>

      <section className="border-b border-brand-midnight/10 px-6 py-14 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-start">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Who This Serves</p>
            <h2 className="font-serif text-4xl font-semibold text-brand-midnight">For Clients Entering Manhattan</h2>
            <p className="mt-5 max-w-md text-base leading-7 text-brand-graphite/72">
              Leasing is the primary path into the city. The work is designed for clients who want precision, not volume.
            </p>
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

      <section className="bg-[#f7f3ea] px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Approach</p>
          <h2 className="font-serif text-4xl font-semibold text-brand-midnight">Building Before Residence</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-brand-graphite/72">
            The building shapes commute, amenities, neighbors, and resale context. We study that first.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {buildingFirstSteps.map((step) => (
              <Card key={step.title} className="rounded-none border border-brand-champagne/35 bg-white/78 p-6 shadow-none">
                <step.icon className="h-5 w-5 text-brand-champagne" strokeWidth={1.5} />
                <h3 className="mt-4 font-serif text-2xl font-semibold text-brand-midnight">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-brand-graphite/72">{step.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 border border-brand-champagne/35 bg-white/70 p-6 md:flex-row md:items-center md:justify-between lg:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Next Step</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-brand-midnight">Curate your building shortlist.</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-brand-graphite/70">
              Share timing, neighborhood preferences, and lifestyle context. We narrow the watchlist before residences
              enter the conversation.
            </p>
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

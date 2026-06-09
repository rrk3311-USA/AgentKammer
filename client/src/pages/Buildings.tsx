import type { LucideIcon } from "lucide-react";
import {
  Bell,
  Building2,
  Car,
  Coffee,
  Compass,
  Dumbbell,
  Laptop,
  MapPin,
  PawPrint,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sofa,
  Sun,
  TrainFront,
  Trees,
  UserRound,
  Waves,
  Wine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import {
  type BuildingAmenityKey,
  type TrackedBuilding,
  trackedBuildings,
} from "@/data/buildings";

const comparisonPoints = [
  { title: "Amenities", icon: Building2 },
  { title: "Resident Experience", icon: UserRound },
  { title: "Neighborhood Placement", icon: MapPin },
];

const reports = [
  { title: "Building Report", text: "Pricing, liquidity, risk, resident fit, and what makes one building worth studying." },
  { title: "Neighborhood Report", text: "Demand, supply, commute, amenities, and development context by micro-market." },
  { title: "Opportunity Monitor", text: "Price cuts, stale listings, concessions, and moments where leverage becomes visible." },
  { title: "Comparable Analysis", text: "Relevant active, pending, and closed comparables translated into decision context." },
  { title: "Market Context", text: "Inventory, timing, and Manhattan demand perspective around a building shortlist." },
  { title: "Resident Fit", text: "Who lives there, how the building operates, and whether the profile matches the client." },
];

const amenityIcons: Record<BuildingAmenityKey, LucideIcon> = {
  pool: Waves,
  gym: Dumbbell,
  "river-view": Building2,
  concierge: Bell,
  doorman: UserRound,
  park: Trees,
  "wine-room": Wine,
  lounge: Sofa,
  security: ShieldCheck,
  transit: TrainFront,
  skyline: Sun,
  valet: Car,
  "pet-friendly": PawPrint,
  "work-from-home": Laptop,
  shopping: ShoppingBag,
  cafe: Coffee,
};

function BuildingWatchlistCard({ building }: { building: TrackedBuilding }) {
  return (
    <article className="flex aspect-video w-full flex-col overflow-hidden border border-brand-champagne/25 bg-brand-midnight">
      <div className="grid min-h-0 flex-1 grid-cols-[0.44fr_0.56fr]">
        <div className="flex flex-col justify-center bg-brand-midnight px-5 py-5 text-brand-ivory sm:px-6 sm:py-6">
          <h2 className="font-serif text-[1.35rem] font-semibold leading-[1.08] tracking-[0.01em] sm:text-2xl md:text-[1.65rem]">
            {building.name}
          </h2>
          <p className="mt-4 text-[0.68rem] font-medium tracking-[0.14em] text-brand-champagne sm:mt-5 sm:text-xs">
            {building.area}
          </p>
          <div className="mt-5 border-t border-brand-ivory/10 pt-4 sm:mt-6">
            <p className="text-[0.58rem] font-medium uppercase tracking-[0.18em] text-brand-ivory/48">
              {building.price.label}
            </p>
            <p className="mt-1 font-serif text-base font-medium leading-snug text-brand-ivory/82 sm:text-lg md:text-xl">
              {building.price.value}
            </p>
          </div>
        </div>
        <div className="relative min-h-0">
          <img
            src={`/buildings/thumbs/${building.slug}.webp`}
            alt={`${building.name} in ${building.area}, Manhattan`}
            className="absolute inset-0 h-full w-full object-cover object-center saturate-[0.92]"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.18)_0%,transparent_24%)]" />
        </div>
      </div>
      <div className="grid shrink-0 grid-cols-4 gap-1 border-t border-brand-ivory/12 bg-brand-midnight px-3 py-2.5 sm:px-5 sm:py-3">
        {building.amenities.map((amenity) => {
          const Icon = amenityIcons[amenity.key];
          return (
            <div key={amenity.label} className="flex flex-col items-center gap-1.5 text-center">
              <Icon className="h-4 w-4 text-brand-ivory/95 sm:h-[1.125rem] sm:w-[1.125rem]" strokeWidth={1.5} />
              <span className="text-[0.5rem] font-medium leading-tight tracking-[0.02em] text-brand-ivory/68 sm:text-[0.54rem]">
                {amenity.label}
              </span>
            </div>
          );
        })}
      </div>
    </article>
  );
}

export default function Buildings() {
  return (
    <main className="min-h-screen bg-brand-ivory text-brand-graphite">
      <section className="bg-brand-midnight px-6 py-16 text-brand-ivory lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_0.75fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-brand-champagne">
              Curated Watchlist
            </p>
            <h1 className="font-serif text-5xl font-semibold leading-[0.98] md:text-6xl lg:text-7xl">
              Manhattan Buildings Worth Studying
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-ivory/82">
              A curated Manhattan watchlist with building reports, neighborhood context, opportunity monitoring, and
              resident fit — supporting the selection process, not replacing it.
            </p>
          </div>
          <Card className="rounded-none border border-brand-ivory/14 bg-brand-ivory/[0.04] p-6 text-brand-ivory shadow-none">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-brand-champagne">
              Primary Question
            </p>
            <p className="mt-4 font-serif text-3xl leading-tight">Which buildings should I consider?</p>
          </Card>
        </div>
      </section>

      <section className="bg-[#f3f2ee] px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-3">
            {comparisonPoints.map((point) => (
              <Card key={point.title} className="rounded-none border border-brand-champagne/35 bg-white/72 p-5 shadow-none">
                <point.icon className="h-5 w-5 text-brand-champagne" strokeWidth={1.5} />
                <p className="mt-4 font-serif text-2xl font-semibold text-brand-midnight">{point.title}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-midnight/10 bg-brand-ivory px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-brand-champagne">Research</p>
          <h2 className="font-serif text-4xl font-semibold text-brand-midnight">What We Study Per Building</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-brand-graphite/72">
            These outputs support the watchlist. They are not a separate product — they explain why a building belongs on
            the list.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reports.map((item) => (
              <Card key={item.title} className="rounded-none border border-brand-graphite/12 bg-white/78 p-5 shadow-none">
                <Compass className="mb-3 h-4 w-4 text-brand-champagne" />
                <h3 className="font-serif text-lg font-semibold text-brand-midnight">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-brand-graphite/76">{item.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-midnight/10 bg-[#f3f2ee] px-6 pb-16 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-7xl pt-10">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            {trackedBuildings.map((building) => (
              <BuildingWatchlistCard key={building.name} building={building} />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link href="/profile">
              <Button variant="brand">Curate Matches</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-brand-graphite/10 bg-brand-midnight px-6 py-14 text-brand-ivory lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Markets</p>
          <h2 className="font-serif text-3xl font-semibold">Manhattan Context Hubs</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Link href="/new-york-market">
              <Card className="border border-brand-ivory/14 bg-brand-midnight p-5 transition hover:border-brand-champagne/40">
                <Building2 className="mb-2 h-5 w-5 text-brand-champagne" />
                <h3 className="font-serif text-xl text-brand-ivory">Uptown</h3>
                <p className="mt-1 text-sm text-brand-ivory/72">Central Park, Upper East Side, and Upper West Side context.</p>
              </Card>
            </Link>
            <Link href="/new-york-market">
              <Card className="border border-brand-ivory/14 bg-brand-midnight p-5 transition hover:border-brand-champagne/40">
                <MapPin className="mb-2 h-5 w-5 text-brand-champagne" />
                <h3 className="font-serif text-xl text-brand-ivory">Midtown</h3>
                <p className="mt-1 text-sm text-brand-ivory/72">Hudson Yards, Manhattan West, and core tower inventory.</p>
              </Card>
            </Link>
            <Link href="/new-york-market">
              <Card className="border border-brand-ivory/14 bg-brand-midnight p-5 transition hover:border-brand-champagne/40">
                <Search className="mb-2 h-5 w-5 text-brand-champagne" />
                <h3 className="font-serif text-xl text-brand-ivory">Downtown</h3>
                <p className="mt-1 text-sm text-brand-ivory/72">Tribeca, SoHo, Chelsea, Flatiron, and waterfront context.</p>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

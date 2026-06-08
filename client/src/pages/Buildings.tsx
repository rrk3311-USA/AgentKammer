import type { LucideIcon } from "lucide-react";
import {
  Bell,
  Building2,
  Car,
  Coffee,
  Dumbbell,
  Laptop,
  PawPrint,
  ShieldCheck,
  ShoppingBag,
  Sofa,
  Sparkles,
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

const comparisonPoints = ["Amenities", "Resident Experience", "Neighborhood Placement"];

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
              A focused universe of modern Manhattan residential buildings tracked for fit, amenities, resident experience,
              and neighborhood placement.
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
              <Card key={point} className="rounded-none border border-brand-champagne/35 bg-white/72 p-5 shadow-none">
                <Sparkles className="h-5 w-5 text-brand-champagne" strokeWidth={1.5} />
                <p className="mt-4 font-serif text-2xl font-semibold text-brand-midnight">{point}</p>
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
    </main>
  );
}

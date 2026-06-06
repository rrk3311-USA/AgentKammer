import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import skylineImage from "@assets/generated_images/chrysler-sunrise-hero-banner.png";
import americanRadiatorBuilding from "@assets/generated_images/manhattan/american-radiator-building.jpg";
import rooftopPoolWtc from "@assets/generated_images/manhattan/rooftop-pool-wtc.png";

/*
 * BUILDING_IMAGE_RULE
 * Buildings We Follow images must be LOCAL ONLY — served from client/public/buildings/
 * as /buildings/{slug}.jpg. Hardcode paths in this file; never hotlink http(s) URLs,
 * Wikimedia, stock sites, or @assets/manhattan imports in building card src attributes.
 *
 * Sourcing (download to public/buildings/ first, then reference locally):
 *   1. Official developer / building marketing galleries
 *   2. Architectural press (ArchDaily, Dezeen, NY YIMBY)
 *   3. Editorial photography (Wikimedia Commons CC — store locally, do not hotlink)
 *
 * Never: generic skyline, stock apartment interiors, unrelated buildings, AI substitutes.
 * Image accuracy over variety. Exterior architecture focus; cards use aspect-[4/5] object-cover.
 *
 * Remaining gap:
 * - the-symone.jpg — 606 West 30th Street (West Chelsea proxy; no Symoné press photo yet)
 */

const sectionHeadline = "font-serif text-3xl font-semibold md:text-4xl lg:text-[2.65rem]";
const eyebrow = "mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-brand-champagne";

const marketSnapshot = [
  { label: "Median Price", value: "$2.18M", delta: "+6.2%" },
  { label: "Inventory", value: "4,382", delta: "-8.7%" },
  { label: "Days on Market", value: "47", delta: "-12%" },
  { label: "Price / Sq Ft", value: "$1,850", delta: "+4.1%" },
];

const threePaths = [
  {
    subtitle: "Luxury Leasing",
    text: "Modern luxury rentals across Manhattan's leading residential buildings.",
    href: "/profile",
  },
  {
    subtitle: "Strategic Acquisition",
    text: "Primary residences, pied-à-terres, and investment acquisitions.",
    href: "/reverse-buyer-origination",
  },
  {
    subtitle: "Building Intelligence",
    text: "Building research, market context, and opportunity monitoring.",
    href: "/real-estate",
  },
];

const buildingsWeFollow = [
  { name: "35 Hudson Yards", area: "Hudson Yards", slug: "35-hudson-yards" },
  { name: "15 Hudson Yards", area: "Hudson Yards", slug: "15-hudson-yards" },
  { name: "One High Line", area: "West Chelsea", slug: "one-high-line" },
  { name: "Lantern House", area: "West Chelsea", slug: "lantern-house" },
  { name: "565 Broome", area: "SoHo", slug: "565-broome" },
  { name: "Manhattan West", area: "Penn District", slug: "manhattan-west" },
  { name: "The Cortland", area: "West Side", slug: "the-cortland" },
  { name: "Waterline Square", area: "UWS", slug: "waterline-square" },
  { name: "The Avery", area: "Hell's Kitchen", slug: "the-avery" },
  { name: "One Manhattan Square", area: "Two Bridges", slug: "one-manhattan-square" },
  { name: "Tribeca Green", area: "Tribeca", slug: "tribeca-green" },
  { name: "One Madison", area: "Flatiron", slug: "one-madison" },
  { name: "111 West 57", area: "Midtown", slug: "111-west-57" },
  { name: "220 Central Park South", area: "Central Park South", slug: "220-central-park-south" },
  { name: "432 Park Avenue", area: "Midtown", slug: "432-park-avenue" },
  { name: "Brookfield Place", area: "Battery Park City", slug: "brookfield-place" },
  { name: "Hudson Yards Residences", area: "Hudson Yards", slug: "hudson-yards-residences" },
  { name: "The Symoné", area: "West Chelsea", slug: "the-symone" },
];

const typicalEngagements = [
  "Executive Relocation",
  "Luxury Leasing",
  "Pied-à-Terre Acquisition",
  "Primary Residence Search",
  "Manhattan Upgrade",
  "Founder & Finance Housing",
  "International Relocation",
  "Building Selection & Comparison",
];

const relocationCriteria = ["Neighborhood", "Building", "Budget", "Commute", "Amenities"];

function StylizedPhoto({
  src,
  alt,
  objectPosition = "center",
  className = "",
  fadeEdge,
  fadeColor = "ivory",
  tone = "light",
}: {
  src: string;
  alt: string;
  objectPosition?: string;
  className?: string;
  fadeEdge?: "left" | "right";
  fadeColor?: "ivory" | "white";
  tone?: "light" | "dark";
}) {
  const sectionColor = fadeColor === "white" ? "255,255,255" : "246,243,235";
  const edgeFade =
    fadeEdge === "right"
      ? `linear-gradient(90deg, rgba(${sectionColor},0) 0%, rgba(${sectionColor},0.15) 42%, rgba(${sectionColor},0.72) 72%, rgba(${sectionColor},1) 100%)`
      : fadeEdge === "left"
        ? `linear-gradient(90deg, rgba(${sectionColor},1) 0%, rgba(${sectionColor},0.72) 28%, rgba(${sectionColor},0.15) 58%, rgba(${sectionColor},0) 100%)`
        : undefined;
  const toneOverlay =
    tone === "light"
      ? "linear-gradient(180deg, rgba(15,23,42,0.04) 0%, rgba(15,23,42,0.14) 100%)"
      : "linear-gradient(180deg, rgba(15,23,42,0.35) 0%, rgba(15,23,42,0.72) 100%)";

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="block h-auto w-full saturate-[0.88] contrast-[1.04]"
        style={objectPosition !== "center" ? { objectPosition } : undefined}
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0" style={{ background: toneOverlay }} aria-hidden />
      {edgeFade ? (
        <div className="pointer-events-none absolute inset-0" style={{ background: edgeFade }} aria-hidden />
      ) : null}
    </div>
  );
}

export default function Home() {
  return (
    <main className="bg-brand-ivory text-brand-graphite">
      {/* 1. Hero */}
      <section className="relative min-h-[780px] overflow-hidden bg-brand-midnight text-brand-ivory">
        <img
          src={skylineImage}
          alt="Manhattan skyline at golden hour"
          className="absolute inset-0 h-full w-full object-cover opacity-95"
          style={{ objectPosition: "right center" }}
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(15,23,42,0.94) 0%, rgba(15,23,42,0.94) 48%, rgba(15,23,42,0.62) 68%, rgba(15,23,42,0.2) 85%, transparent 100%)",
          }}
        />
        <div className="relative mx-auto flex min-h-[780px] max-w-7xl flex-col justify-center px-6 py-24 lg:px-10 lg:py-28">
          <div className="max-w-xl lg:max-w-2xl">
            <p className={eyebrow}>Modern Manhattan Luxury</p>
            <h1
              id="home-hero-title"
              className="font-serif text-4xl font-semibold leading-[1.12] text-brand-ivory md:text-5xl lg:text-[3.35rem] lg:leading-[1.1]"
            >
              <span className="block">Manhattan Has Thousands of Residences</span>
              <span className="mt-4 block text-brand-champagne/95">Only a Few Are Right For You</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-brand-ivory/92">
              Luxury leasing, strategic acquisition, and building intelligence focused on Manhattan&apos;s premier
              modern residential buildings.
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-brand-ivory/72">
              Focused on Hudson Yards, Manhattan West, Chelsea, Tribeca, and Battery Park City.
            </p>
            <div className="mt-11 flex flex-wrap gap-3">
              <Link href="/profile">
                <Button className="h-11 rounded-none border border-brand-champagne bg-brand-champagne px-6 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brand-midnight hover:bg-brand-champagne/90">
                  Start Private Search
                </Button>
              </Link>
              <Link href="/#buildings">
                <Button
                  variant="outline"
                  className="h-11 rounded-none border-brand-ivory/60 bg-transparent px-6 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brand-ivory hover:bg-brand-ivory/10"
                >
                  Explore Buildings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Services */}
      <section className="bg-brand-ivory px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className={`${sectionHeadline} text-brand-midnight`}>
            Lease <span className="text-brand-champagne">•</span> Buy{" "}
            <span className="text-brand-champagne">•</span> Building Intelligence
          </h2>
          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            {threePaths.map((path) => (
              <Link key={path.subtitle} href={path.href} className="group block">
                <div className="h-full px-2 py-2 transition duration-300 lg:px-4 lg:py-4">
                  <p className="font-serif text-xl text-brand-midnight">{path.subtitle}</p>
                  <p className="mt-4 text-base leading-7 text-brand-graphite/78">{path.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Differentiator */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_520px]">
          <div className="flex flex-col justify-center px-6 py-16 lg:px-10 lg:py-20 xl:py-24">
            <h2 className={`${sectionHeadline} text-brand-midnight lg:text-[2.75rem]`}>
              The Right Building Changes Everything
            </h2>
            <p className="mt-6 text-base leading-7 text-brand-graphite/82">
              Most clients begin by searching residences.
            </p>
            <p className="mt-4 text-base leading-7 text-brand-graphite/82">
              We begin by identifying the right building, neighborhood, amenities, commute, and lifestyle fit.
            </p>
            <p className="mt-4 text-base leading-7 text-brand-graphite/82">
              Because the building often matters more than the individual residence.
            </p>
          </div>
          <StylizedPhoto
            src={americanRadiatorBuilding}
            alt="American Radiator Building with fog overlay"
            fadeEdge="left"
            fadeColor="white"
          />
        </div>
      </section>

      {/* 4. Buildings We Follow */}
      <section id="buildings" className="bg-brand-ivory px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className={`${sectionHeadline} text-brand-midnight`}>Buildings We Follow</h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-brand-graphite/78">
            We maintain a curated focus on a select collection of Manhattan&apos;s most sought-after modern residential
            buildings.
          </p>
          <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-14">
            {buildingsWeFollow.map((building) => (
              <article key={building.name} className="group">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={`/buildings/${building.slug}.jpg`}
                    alt={building.name}
                    className="absolute inset-0 h-full w-full object-cover saturate-[0.9] transition duration-700 group-hover:scale-[1.015]"
                    loading="lazy"
                  />
                </div>
                <div className="pt-5">
                  <h3 className="font-serif text-xl text-brand-midnight">{building.name}</h3>
                  <p className="mt-1.5 text-xs uppercase tracking-[0.16em] text-brand-graphite/55">{building.area}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Leasing Today. Buying Tomorrow. */}
      <section className="bg-brand-ivory px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className={`${sectionHeadline} text-brand-midnight`}>Leasing Today. Buying Tomorrow.</h2>
          <p className="mt-6 text-base leading-7 text-brand-graphite/82">
            Many clients first enter Manhattan through a luxury lease.
          </p>
          <p className="mt-4 text-base leading-7 text-brand-graphite/82">
            Over time, those same clients become buyers, investors, and repeat clients.
          </p>
          <p className="mt-4 text-base leading-7 text-brand-graphite/82">
            We help navigate both paths through a curated focus on Manhattan&apos;s premier modern residential buildings.
          </p>
        </div>
      </section>

      {/* 6. Relocating To Manhattan */}
      <section className="relative overflow-hidden bg-brand-midnight px-6 py-20 text-brand-ivory lg:px-10 lg:py-24">
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className={`${sectionHeadline} text-brand-ivory`}>Relocating To Manhattan</h2>
            <p className="mt-6 text-base leading-7 text-brand-ivory/78">
              Most clients do not start with a property.
            </p>
            <p className="mt-4 text-base leading-7 text-brand-ivory/78">
              They start with a new role, a new city, a growing family, or a lifestyle change.
            </p>
            <p className="mt-6 text-base leading-7 text-brand-ivory/78">We help identify the right:</p>
            <Link href="/profile" className="mt-10 inline-block">
              <Button className="h-11 rounded-none border border-brand-champagne bg-brand-champagne px-6 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brand-midnight hover:bg-brand-champagne/90">
                Start Private Search
              </Button>
            </Link>
          </div>
          <ul className="flex flex-col justify-center space-y-4 pt-2 lg:pt-6">
            {relocationCriteria.map((item) => (
              <li key={item} className="flex items-baseline gap-4 text-base leading-7 text-brand-ivory/85">
                <span className="text-brand-champagne" aria-hidden>
                  •
                </span>
                {item}
              </li>
            ))}
            <li className="pt-2 text-base leading-7 text-brand-ivory/65">before residences are selected.</li>
          </ul>
        </div>
        <div className="pointer-events-none absolute bottom-0 right-0 hidden h-[85%] w-[38%] lg:block" aria-hidden>
          <img
            src={rooftopPoolWtc}
            alt=""
            className="h-full w-full object-cover saturate-[0.85]"
            style={{ objectPosition: "82% 78%" }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,1)_0%,rgba(15,23,42,0.78)_38%,rgba(15,23,42,0.2)_72%,transparent_100%)]" />
        </div>
      </section>

      {/* 7. Typical Engagements */}
      <section className="bg-brand-ivory px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className={`${sectionHeadline} text-brand-midnight`}>Typical Engagements</h2>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {typicalEngagements.map((item) => (
              <div key={item} className="px-1 py-4">
                <p className="font-serif text-lg text-brand-midnight">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Start Your Manhattan Search */}
      <section className="bg-brand-midnight px-6 py-20 text-brand-ivory lg:px-10 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className={`${sectionHeadline} text-brand-ivory`}>Start Your Manhattan Search</h2>
          <p className="mt-6 text-base leading-7 text-brand-ivory/80">
            Whether you&apos;re leasing your next residence or acquiring a long-term home, the search begins with the
            right building.
          </p>
          <Link href="/profile">
            <Button className="mt-10 h-11 rounded-none border border-brand-champagne bg-brand-champagne px-8 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brand-midnight hover:bg-brand-champagne/90">
              Start Private Search
            </Button>
          </Link>
        </div>
      </section>

      {/* 9. Market Snapshot */}
      <section className="bg-brand-ivory px-6 py-12 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-serif text-lg font-normal text-brand-midnight/50 md:text-xl">Manhattan Market Snapshot</h2>
          <p className="mt-1 text-xs leading-5 text-brand-graphite/45">
            Supporting context for lease and acquisition decisions.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-14 gap-y-6">
            {marketSnapshot.map((metric) => (
              <div key={metric.label} className="min-w-[100px]">
                <p className="text-[0.6rem] font-medium uppercase tracking-[0.14em] text-brand-graphite/40">
                  {metric.label}
                </p>
                <p className="mt-1.5 font-serif text-base text-brand-midnight/55">{metric.value}</p>
                <p className="mt-0.5 text-xs text-brand-graphite/40">{metric.delta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

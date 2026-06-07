import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "wouter";
import { Building2, KeyRound, Landmark, Target, TrendingUp } from "lucide-react";
import skylineImage from "@assets/generated_images/chrysler-sunrise-hero-banner.png";
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

const leasingSnapshot = [
  { label: "Studios", value: "$4,200+", context: "entry luxury" },
  { label: "1 Beds", value: "$5,800+", context: "modern towers" },
  { label: "2 Beds", value: "$8,900+", context: "premium layouts" },
  { label: "3 Beds", value: "$13,500+", context: "family scale" },
];

const acquisitionSnapshot = [
  { label: "Median PPSF", value: "$2.1K", context: "tracked set" },
  { label: "Inventory", value: "84", context: "active homes" },
  { label: "Avg Discount", value: "4.8%", context: "from ask" },
  { label: "DOM", value: "71", context: "days listed" },
];

const threePaths = [
  {
    subtitle: "Luxury Leasing",
    text: "Modern rentals in Manhattan's leading residential towers.",
    href: "/profile",
    icon: KeyRound,
  },
  {
    subtitle: "Building Intelligence",
    text: "Research, pricing, liquidity, and opportunity monitoring before we recommend a building.",
    href: "/real-estate",
    icon: Building2,
    featured: true,
  },
  {
    subtitle: "Strategic Acquisition",
    text: "Primary residences, pied-à-terres, and investments.",
    href: "/reverse-buyer-origination",
    icon: Landmark,
  },
];

const intelligencePillars = [
  {
    title: "Building Intelligence",
    text: "Building-level pricing, liquidity, and resident profile.",
    icon: Building2,
  },
  {
    title: "Market Intelligence",
    text: "Neighborhood supply, demand, and timing context.",
    icon: TrendingUp,
  },
  {
    title: "Deal Intelligence",
    text: "Negotiation windows, concessions, and acquisition leverage.",
    icon: Target,
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

const relocationCriteria = ["Building", "Neighborhood", "Commute", "Amenities", "Budget"];

function StylizedPhoto({
  src,
  alt,
  objectPosition = "center",
  className = "",
  fadeEdge,
  fadeColor = "ivory",
  fadeStrength = 1,
  tone = "light",
}: {
  src: string;
  alt: string;
  objectPosition?: string;
  className?: string;
  fadeEdge?: "left" | "right";
  fadeColor?: "ivory" | "white";
  fadeStrength?: number;
  tone?: "light" | "dark";
}) {
  const sectionColor = fadeColor === "white" ? "255,255,255" : "246,243,235";
  const fade = (alpha: number) => Math.min(1, Math.max(0, alpha * fadeStrength));
  const edgeFade =
    fadeEdge === "right"
      ? `linear-gradient(90deg, rgba(${sectionColor},0) 0%, rgba(${sectionColor},${fade(0.15)}) 42%, rgba(${sectionColor},${fade(0.72)}) 72%, rgba(${sectionColor},${fade(1)}) 100%)`
      : fadeEdge === "left"
        ? `linear-gradient(90deg, rgba(${sectionColor},${fade(1)}) 0%, rgba(${sectionColor},${fade(0.72)}) 28%, rgba(${sectionColor},${fade(0.15)}) 58%, rgba(${sectionColor},0) 100%)`
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
      <section className="relative min-h-[85vh] overflow-hidden bg-brand-midnight text-brand-ivory">
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
        <div className="relative mx-auto flex min-h-[calc(85vh-96px)] max-w-7xl flex-col justify-start px-6 pb-20 pt-20 lg:px-10 lg:pb-[120px] lg:pt-20">
          <div className="max-w-xl lg:max-w-2xl">
            <p className={eyebrow}>Modern Manhattan Luxury</p>
            <h1
              id="home-hero-title"
              className="font-serif text-4xl font-semibold leading-[1.12] text-brand-ivory md:text-5xl lg:text-[3.35rem] lg:leading-[1.1]"
            >
              <span className="block">Manhattan Has Thousands of Residences</span>
              <span className="mt-4 block text-brand-champagne/95">Only a Few Are Right For You</span>
            </h1>
            <p className="mt-3 max-w-xl text-base leading-6 text-brand-ivory/92">
              Luxury leasing, strategic acquisition, and building intelligence focused on Manhattan&apos;s premier
              modern residential buildings.
            </p>
            <p className="mt-2 max-w-xl text-base leading-6 text-brand-ivory/72">
              Focused on Hudson Yards, Manhattan West, Chelsea, Tribeca, and Battery Park City.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/profile">
                <Button className="h-11 rounded-none border border-brand-champagne bg-brand-champagne px-6 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brand-midnight hover:bg-brand-champagne/90">
                  Curate Matches
                </Button>
              </Link>
              <Link href="/#buildings">
                <Button
                  variant="outline"
                  className="h-11 rounded-none border-brand-champagne bg-brand-ivory/10 px-6 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brand-champagne hover:bg-brand-ivory/15 hover:text-brand-champagne"
                >
                  Explore Buildings
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="relative border-t border-brand-ivory/14 bg-brand-midnight/82 backdrop-blur-sm">
          <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-brand-ivory/10 px-6 lg:grid-cols-3 lg:divide-x lg:divide-y-0 lg:px-10">
            {intelligencePillars.map((pillar) => (
              <div key={pillar.title} className="flex gap-4 py-5 lg:px-8 first:lg:pl-0 last:lg:pr-0">
                <pillar.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-champagne" strokeWidth={1.45} />
                <div>
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-brand-champagne">
                    {pillar.title}
                  </p>
                  <p className="mt-1.5 text-xs leading-5 text-brand-ivory/72">{pillar.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Services */}
      <section className="bg-brand-ivory px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-end">
            <h2 className={`${sectionHeadline} text-brand-midnight`}>
              Three Ways We Help
            </h2>
            <p className="max-w-xl text-base leading-7 text-brand-graphite/70 lg:justify-self-end">
              Leasing, acquisition, and building research shaped around one idea: study the building before choosing
              the residence.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:items-stretch lg:gap-7">
            {threePaths.map((path) => (
              <Link key={path.subtitle} href={path.href} className="group block">
                <div
                  className={`h-full border px-6 py-7 transition duration-300 group-hover:-translate-y-1 group-hover:border-brand-champagne lg:px-7 ${
                    path.featured
                      ? "border-brand-champagne/55 bg-white/72 text-brand-midnight shadow-[0_18px_42px_rgba(15,23,42,0.08)] lg:-mt-4 lg:py-9"
                      : "border-brand-champagne/24 bg-white/58 text-brand-midnight group-hover:bg-white/82"
                  }`}
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full border ${
                      path.featured
                        ? "border-brand-champagne/60 bg-brand-ivory text-brand-champagne"
                        : "border-brand-champagne/45 bg-brand-ivory text-brand-champagne"
                    }`}
                  >
                    <path.icon className="h-10 w-10" strokeWidth={1.75} />
                  </div>
                  <p
                    className={`mt-7 font-serif text-[1.75rem] leading-tight ${
                      path.featured ? "text-brand-midnight lg:text-[2rem]" : "text-brand-midnight"
                    }`}
                  >
                    {path.subtitle}
                  </p>
                  <p className={`mt-4 text-base leading-7 ${path.featured ? "text-brand-graphite/78" : "text-brand-graphite/74"}`}>
                    {path.text}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Differentiator */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_520px]">
          <div className="flex flex-col justify-center px-6 pb-10 pt-5 lg:px-10 lg:pb-12 lg:pt-7 xl:pb-14 xl:pt-9">
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
              Because the building often matters more than the residence itself.
            </p>
          </div>
          <StylizedPhoto
            src="/buildings/lantern-house.jpg"
            alt="Lantern House terrace overlooking Manhattan"
            fadeEdge="left"
            fadeColor="white"
            fadeStrength={0.62}
          />
        </div>
      </section>

      {/* 4. Buildings We Follow */}
      <section id="buildings" className="bg-brand-ivory px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <h2 className={`${sectionHeadline} text-brand-midnight`}>Buildings We Follow</h2>
            <p className="mt-5 text-base leading-7 text-brand-graphite/78">
              A focused watchlist of Manhattan&apos;s modern residential towers, reviewed by building, neighborhood,
              amenities, and liquidity.
            </p>
          </div>
          <Accordion
            type="single"
            collapsible
            className="-mx-6 mt-10 flex snap-x gap-4 overflow-x-auto px-6 pb-4 lg:mx-0 lg:px-0"
          >
            {buildingsWeFollow.map((building) => (
              <AccordionItem
                key={building.name}
                value={building.slug}
                className="min-w-[280px] snap-start border border-brand-champagne/20 bg-white/58 px-5 transition duration-300 hover:border-brand-champagne/70 sm:min-w-[320px] lg:min-w-[340px]"
              >
                <AccordionTrigger className="py-4 text-left hover:no-underline">
                  <div>
                    <p className="font-serif text-xl leading-tight text-brand-midnight">{building.name}</p>
                    <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-graphite/52">
                      {building.area}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <div className="flex gap-4">
                    <div className="relative h-24 w-28 shrink-0 overflow-hidden border border-brand-champagne/20 bg-brand-midnight/5">
                      <img
                        src={`/buildings/thumbs/${building.slug}.webp`}
                        alt={`${building.name} luxury residential building in ${building.area}, Manhattan`}
                        width={224}
                        height={192}
                        sizes="112px"
                        className="absolute inset-0 h-full w-full object-cover saturate-[0.9]"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <p className="text-sm leading-6 text-brand-graphite/72">
                      Tracked for building quality, resident experience, pricing context, and current opportunity
                      windows.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 5. Leasing Today. Buying Tomorrow. */}
      <section className="relative overflow-hidden bg-brand-midnight text-brand-ivory">
        <img
          src="/images/leasing-today-terrace.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover saturate-[0.92]"
          style={{ objectPosition: "center center" }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.58)_0%,rgba(15,23,42,0.78)_58%,rgba(15,23,42,0.68)_100%)]" />
        <div className="relative mx-auto flex min-h-[430px] max-w-7xl items-center justify-center px-6 py-20 text-center lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <h2 className={`${sectionHeadline} text-brand-ivory`}>Leasing Today. Buying Tomorrow.</h2>
            <p className="mt-6 text-base leading-7 text-brand-ivory/84">
              Many clients enter Manhattan through a luxury lease.
            </p>
            <p className="mt-4 text-base leading-7 text-brand-ivory/84">
              Over time, those same clients become buyers, investors, and repeat clients.
            </p>
            <p className="mt-4 text-base leading-7 text-brand-ivory/84">
              We support both paths through a curated focus on Manhattan&apos;s premier modern residential buildings.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Relocating To Manhattan */}
      <section className="relative overflow-hidden bg-brand-midnight px-6 py-16 text-brand-ivory lg:px-10 lg:py-20">
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          <div className="max-w-2xl">
            <h2 className={`${sectionHeadline} text-brand-ivory`}>Relocating To Manhattan</h2>
            <p className="mt-6 text-base leading-7 text-brand-ivory/78">
              Most clients do not start with a property.
            </p>
            <p className="mt-4 text-base leading-7 text-brand-ivory/78">
              They start with a new role, a new city, a growing family, or a lifestyle change.
            </p>
            <p className="mt-6 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brand-champagne">
              We help identify the right:
            </p>
          </div>
          <div className="max-w-sm lg:justify-self-start">
            <ul className="space-y-4 border-l border-brand-champagne/35 pl-6">
              {relocationCriteria.map((item) => (
                <li key={item} className="flex items-baseline gap-4 text-base leading-7 text-brand-ivory/85">
                  <span className="text-brand-champagne" aria-hidden>
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-xs text-sm leading-6 text-brand-ivory/62">before residences are selected.</p>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 right-0 hidden h-full w-[42%] lg:block" aria-hidden>
          <img
            src={rooftopPoolWtc}
            alt=""
            className="h-full w-full object-cover saturate-[0.85]"
            style={{ objectPosition: "82% 78%" }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,1)_0%,rgba(15,23,42,0.9)_22%,rgba(15,23,42,0.55)_56%,rgba(15,23,42,0.18)_100%)]" />
        </div>
      </section>

      {/* 7. Start Your Manhattan Search */}
      <section className="bg-brand-midnight px-6 py-20 text-brand-ivory lg:px-10 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className={`${sectionHeadline} text-brand-ivory`}>Curate Matches</h2>
          <p className="mt-6 text-base leading-7 text-brand-ivory/80">
            Whether you&apos;re leasing your next residence or acquiring a long-term home, the search begins with the
            right building.
          </p>
          <Link href="/profile">
            <Button className="mt-10 h-11 rounded-none border border-brand-champagne bg-brand-champagne px-8 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brand-midnight hover:bg-brand-champagne/90">
              Curate Matches
            </Button>
          </Link>
        </div>
      </section>

      {/* 8. Leasing & Acquisition Snapshot */}
      <section className="border-y border-brand-graphite/8 bg-[#f0ede6] px-6 py-9 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[280px_1fr] lg:items-start">
          <div>
            <h2 className="font-serif text-xl font-medium text-brand-midnight">Market Snapshot</h2>
            <p className="mt-2 text-xs leading-5 text-brand-graphite/58">
              Current leasing and acquisition context across the buildings we track.
            </p>
          </div>
          <div className="grid gap-7 lg:grid-cols-2 lg:border-l lg:border-brand-graphite/12 lg:pl-10">
            {[
              { title: "Leasing Snapshot", items: leasingSnapshot },
              { title: "Acquisition Snapshot", items: acquisitionSnapshot },
            ].map((group) => (
              <div key={group.title}>
                <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-champagne">
                  {group.title}
                </h3>
                <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5">
                  {group.items.map((metric) => (
                    <div key={metric.label}>
                      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-brand-graphite/52">
                        {metric.label}
                      </p>
                      <p className="mt-2 font-serif text-xl text-brand-midnight/85">{metric.value}</p>
                      <p className="mt-1 text-[0.68rem] uppercase tracking-[0.12em] text-brand-graphite/42">
                        {metric.context}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

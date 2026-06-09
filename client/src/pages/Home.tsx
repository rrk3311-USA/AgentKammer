import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroBackground from "@assets/generated_images/manhattan/rooftop-terrace-lifestyle-hero.png";
import rooftopPoolWtc from "@assets/generated_images/manhattan/rooftop-pool-wtc.png";
import { trackedBuildings } from "@/data/buildings";

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

const featuredBuildings = trackedBuildings.slice(0, 6);

const relocationCriteria = ["Timing", "Tribe", "Building", "Neighborhood", "Commute", "Amenities", "Budget", "Networking"];

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

function BuildingsFollowStrip() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState({ size: 100, offset: 0, scrollable: false });

  const updateThumb = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { clientWidth, scrollWidth, scrollLeft } = el;
    if (scrollWidth <= clientWidth + 1) {
      setThumb({ size: 100, offset: 0, scrollable: false });
      return;
    }
    const size = (clientWidth / scrollWidth) * 100;
    const maxOffset = 100 - size;
    const offset = maxOffset > 0 ? (scrollLeft / (scrollWidth - clientWidth)) * maxOffset : 0;
    setThumb({ size, offset, scrollable: true });
  }, []);

  useEffect(() => {
    updateThumb();
    const el = scrollRef.current;
    if (!el) return;
    const observer = new ResizeObserver(updateThumb);
    observer.observe(el);
    window.addEventListener("resize", updateThumb);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateThumb);
    };
  }, [updateThumb]);

  return (
    <div className="mt-10">
      <div
        ref={scrollRef}
        onScroll={updateThumb}
        className="buildings-scroll-strip -mx-6 flex snap-x gap-4 overflow-x-auto px-6 pb-2 lg:mx-0 lg:px-0"
      >
        {featuredBuildings.map((building) => (
          <article
            key={building.name}
            className="min-w-[280px] snap-start border border-brand-champagne/20 bg-white/58 px-5 transition duration-300 hover:border-brand-champagne/70 sm:min-w-[320px] lg:min-w-[340px]"
          >
            <div className="py-4">
              <p className="font-serif text-xl leading-tight text-brand-midnight">{building.name}</p>
              <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-graphite/52">
                {building.area}
              </p>
            </div>
            <div className="pb-5">
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
                  A featured building from the private watchlist.
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-4 h-1.5 w-full bg-brand-champagne/22" aria-hidden>
        <div
          className="h-full bg-gradient-to-r from-brand-champagne/85 to-brand-champagne transition-[margin-left,width] duration-100 ease-out"
          style={{ width: `${thumb.size}%`, marginLeft: `${thumb.offset}%` }}
        />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="bg-brand-ivory text-brand-graphite">
      {/* 1. Hero */}
      <section className="relative min-h-[85vh] overflow-hidden bg-brand-midnight text-brand-ivory">
        <img
          src={heroBackground}
          alt="Luxury Manhattan rooftop terrace with skyline views at dusk"
          className="absolute inset-0 h-full w-full object-cover opacity-92"
          style={{ objectPosition: "82% 44%" }}
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(15,23,42,0.99) 0%, rgba(15,23,42,0.96) 34%, rgba(15,23,42,0.82) 52%, rgba(15,23,42,0.48) 72%, rgba(15,23,42,0.16) 100%)",
          }}
        />
        <div className="relative mx-auto flex min-h-[calc(85vh-96px)] max-w-7xl flex-col justify-start px-6 pb-16 pt-16 lg:px-10 lg:pb-20 lg:pt-[4.5rem]">
          <div className="flex max-w-xl flex-col lg:max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-champagne">
              Modern Manhattan Luxury
            </p>
            <h1
              id="home-hero-title"
              className="font-serif text-4xl font-semibold leading-[1.1] text-brand-ivory md:text-5xl lg:text-[3.35rem] lg:leading-[1.08]"
            >
              <span className="block">Manhattan Has Thousands of Residences</span>
              <span className="mt-3 block text-brand-champagne/95">Only a Few Are Right For You</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-[1.65] text-brand-ivory/92">
              The building matters more than the residence. Agent Kammer helps clients identify the right building,
              neighborhood, amenities, commute, and lifestyle fit before narrowing the search.
            </p>
            <p className="mt-3 max-w-xl text-base leading-[1.65] text-brand-ivory/72">
              Then lease it, acquire it, or sell it — within that context.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row">
              <Link href="/profile">
                <Button variant="brand">
                  Curate Matches
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="brandGhost">
                  Why Agent Kammer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Philosophy */}
      <section className="bg-brand-ivory px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-brand-champagne">Philosophy</p>
          <h2 className={`${sectionHeadline} text-brand-midnight`}>Choose the Right Building First</h2>
          <p className="mt-6 text-base leading-7 text-brand-graphite/74">
            Agent Kammer exists because most Manhattan searches start in the wrong place. We study buildings, neighborhoods,
            and fit before residences enter the conversation.
          </p>
          <p className="mt-4 text-base leading-7 text-brand-graphite/74">
            Everything on this site supports one outcome: help ambitious clients choose the right building — then lease,
            acquire, or sell within that context.
          </p>
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
          <div className="grid gap-8 border-b border-brand-midnight/10 pb-8 lg:grid-cols-[0.82fr_1fr] lg:items-end">
            <div>
              <p className={eyebrow}>Private Watchlist</p>
              <h2 className={`${sectionHeadline} text-brand-midnight`}>Buildings We Track</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-brand-graphite/78 lg:justify-self-end">
              Not a directory. A curated set of Manhattan buildings we monitor for fit, pricing context, resident experience,
              and opportunity windows.
            </p>
          </div>
          <div className="mt-10">
            <BuildingsFollowStrip />
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/buildings">
              <Button variant="brandOutline">View Building Watchlist</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Leasing Today. Buying Tomorrow. */}
      <section className="border-y border-brand-midnight/10 bg-[#f7f3ea] px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-14">
          <div>
            <p className={eyebrow}>Long-Term Client Path</p>
            <h2 className={`${sectionHeadline} text-brand-midnight`}>Leasing Today. Buying Tomorrow.</h2>
            <div className="mt-5 max-w-xl space-y-3.5 text-base leading-7 text-brand-graphite/76">
              <p>Many clients enter Manhattan through a luxury lease.</p>
              <p>Over time, those same clients become buyers, investors, and repeat clients.</p>
              <p>
                We support both paths through a curated focus on Manhattan&apos;s premier modern residential buildings.
              </p>
            </div>
          </div>
          <div className="grid gap-4 border border-brand-champagne/35 bg-brand-ivory/80 p-4 shadow-[0_16px_36px_rgba(15,23,42,0.055)] sm:grid-cols-[1fr_auto_1fr] sm:items-stretch lg:p-5">
            <div className="border border-brand-midnight/10 bg-white/72 p-5">
              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-brand-champagne">Entry Point</p>
              <p className="mt-3 font-serif text-2xl leading-tight text-brand-midnight">Luxury Lease</p>
              <p className="mt-3 text-sm leading-6 text-brand-graphite/68">
                A precise building match for the way a client wants to live now.
              </p>
            </div>
            <div className="hidden items-center justify-center px-1 sm:flex" aria-hidden>
              <span className="h-px w-10 bg-brand-champagne/55" />
            </div>
            <div className="border border-brand-midnight/10 bg-white/72 p-5">
              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-brand-champagne">Next Step</p>
              <p className="mt-3 font-serif text-2xl leading-tight text-brand-midnight">Strategic Ownership</p>
              <p className="mt-3 text-sm leading-6 text-brand-graphite/68">
                The same building-first view carries into purchase, investment, and repeat decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Relocating To Manhattan */}
      <section className="relative overflow-hidden bg-brand-midnight px-6 py-14 text-brand-ivory lg:px-10 lg:py-[4.5rem]">
        <div className="absolute inset-x-0 top-0 h-px bg-brand-champagne/35" aria-hidden />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1fr] lg:items-center lg:gap-16">
          <div className="max-w-2xl">
            <p className={eyebrow}>Relocation Advisory</p>
            <h2 className={`${sectionHeadline} text-brand-ivory`}>Relocating To Manhattan</h2>
            <p className="mt-6 text-base leading-7 text-brand-ivory/78">
              Most clients do not start with a property.
            </p>
            <p className="mt-4 text-base leading-7 text-brand-ivory/78">
              They start with a new role, a new city, a growing family, or a lifestyle change.
            </p>
          </div>
          <div className="max-w-xl lg:justify-self-start">
            <p className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brand-champagne">
              We help identify the right:
            </p>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {relocationCriteria.map((item) => (
                <li
                  key={item}
                  className={`border border-brand-ivory/12 bg-brand-ivory/[0.035] px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-ivory/82 ${
                    item === "Timing" || item === "Tribe" ? "text-center sm:col-span-2" : ""
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-sm border-l border-brand-champagne/45 pl-5 text-sm leading-6 text-brand-ivory/62">
              before residences are selected.
            </p>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 right-0 hidden h-full w-[44%] opacity-85 lg:block" aria-hidden>
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
      <section className="border-t border-brand-midnight/10 bg-brand-ivory px-6 py-12 text-brand-graphite lg:px-10 lg:py-14">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="bespoke-signature text-[2.85rem] leading-[0.95] md:text-[3.45rem] lg:text-[3.9rem]">
            Bespoke Matches
          </h2>
          <p className="mt-5 text-base leading-7 text-brand-graphite/72">
            Whether you&apos;re leasing your next residence or acquiring a long-term home, the search begins with the
            right building.
          </p>
          <Link href="/profile">
            <Button variant="brand" className="mt-7 normal-case tracking-[0.06em]">
              Meet your matches
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

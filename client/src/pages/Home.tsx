import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import heroBackground from "@assets/generated_images/manhattan/rooftop-terrace-lifestyle-hero.png";
import { featuredBuildings, intelligenceReportTopics } from "@/data/featured-buildings";
import { featuredExecutiveHousingReport } from "@/data/executive-housing-reports";
import { hasBuildingReport } from "@/data/building-reports";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { eyebrowOnDark, eyebrowOnLight } from "@/lib/brand-typography";
import { Building2, Compass, FileText } from "lucide-react";

const sectionHeadline = "font-serif text-3xl font-semibold md:text-4xl lg:text-[2.65rem]";

const whatWeDo = [
  {
    title: "Building Intelligence",
    text: "In-depth research covering architecture, ownership, amenities, market positioning, pricing trends, and competitive context.",
    icon: Building2,
  },
  {
    title: "Buyer Advisory",
    text: "Guidance for buyers evaluating opportunities across Manhattan's premier residential buildings.",
    icon: Compass,
  },
  {
    title: "Seller Positioning",
    text: "Strategic market positioning for owners seeking maximum exposure and informed pricing decisions.",
    icon: FileText,
  },
];

function FeaturedBuildingsStrip() {
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
        {featuredBuildings.map((building) => {
          const reportHref = hasBuildingReport(building.slug)
            ? `/buildings/${building.slug}/report`
            : "/buildings";

          return (
            <Link key={building.name} href={reportHref}>
              <article className="min-w-[300px] snap-start border border-brand-champagne/30 bg-white shadow-[0_2px_22px_rgba(15,23,42,0.06)] transition hover:shadow-[0_6px_30px_rgba(15,23,42,0.1)] sm:min-w-[340px] lg:min-w-[360px]">
                <div className="relative h-36 overflow-hidden bg-brand-midnight/5">
                  <img
                    src={`/buildings/thumbs/${building.slug}.webp`}
                    alt={`${building.name} in ${building.area}, Manhattan`}
                    className="h-full w-full object-cover saturate-[0.9] contrast-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="px-5 py-5">
                  <h3 className="font-serif text-xl leading-tight text-brand-midnight">{building.name}</h3>
                  <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-brand-graphite/52">
                    {building.area}
                  </p>
                  <ul className="mt-4 space-y-1 font-serif text-sm leading-snug text-brand-graphite/74">
                    <li>{building.architecture}</li>
                    <li>{building.lifestyle}</li>
                    <li>{building.ownership}</li>
                    <li>{building.marketPosition}</li>
                  </ul>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
      {thumb.scrollable ? (
        <div className="mt-4 h-1.5 w-full bg-brand-midnight/10" aria-hidden>
          <div
            className="h-full bg-gradient-to-r from-brand-champagne/85 to-brand-champagne transition-[margin-left,width] duration-100 ease-out"
            style={{ width: `${thumb.size}%`, marginLeft: `${thumb.offset}%` }}
          />
        </div>
      ) : null}
    </div>
  );
}

export default function Home() {
  usePageMetadata({
    title: "Modern Manhattan Residential Intelligence | Agent Kammer",
    description:
      "Research, analysis, and strategic guidance across a curated collection of Manhattan's most significant residential buildings.",
    path: "/",
  });

  return (
    <main className="bg-brand-ivory text-brand-graphite">
      {/* 1. Hero */}
      <section className="relative min-h-[85vh] overflow-hidden bg-brand-midnight text-brand-ivory">
        <img
          src={heroBackground}
          alt="Manhattan residential tower and skyline at dusk"
          className="absolute inset-0 h-full w-full object-cover opacity-90"
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
              Modern Manhattan Residential Intelligence
            </p>
            <h1
              id="home-hero-title"
              className="font-serif text-4xl font-semibold leading-[1.08] text-brand-ivory md:text-5xl lg:text-[3.2rem]"
            >
              Modern Manhattan Residential Intelligence
            </h1>
            <p className="mt-5 max-w-xl text-base leading-[1.65] text-brand-ivory/88">
              Research, analysis, and strategic guidance across a curated collection of Manhattan&apos;s most significant
              residential buildings.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/buildings">
                <Button variant="brand">Explore Buildings</Button>
              </Link>
              <Link href="/contact">
                <Button variant="brandGhost">Schedule Call</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. What We Do */}
      <section className="brand-surface-intelligence px-6 py-14 lg:px-10 lg:py-16">
        <div className="relative z-[1] mx-auto max-w-7xl">
          <p className={eyebrowOnLight}>What We Do</p>
          <h2 className={`${sectionHeadline} text-brand-midnight`}>Research-Led Residential Advisory</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {whatWeDo.map((item) => (
              <Card key={item.title} className="rounded-none border border-brand-champagne/35 bg-white/80 p-6 shadow-none">
                <item.icon className="h-5 w-5 text-brand-champagne-dark" strokeWidth={1.4} />
                <h3 className="mt-4 font-serif text-2xl font-semibold text-brand-midnight">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-brand-graphite/74">{item.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Buildings */}
      <section className="border-t border-brand-midnight/10 bg-white px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <p className={eyebrowOnLight}>Featured Buildings</p>
          <h2 className={`${sectionHeadline} text-brand-midnight`}>Buildings Worth Studying</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-brand-graphite/72">
            A curated collection — architecture, lifestyle, ownership profile, and market position. Not a listing portal.
          </p>
          <FeaturedBuildingsStrip />
          <div className="mt-8 flex justify-center">
            <Link href="/buildings">
              <Button variant="brandOutline">View Full Watchlist</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Executive Housing Report + Building Intelligence */}
      <section className="border-t border-brand-midnight/10 bg-brand-midnight px-6 py-14 text-brand-ivory lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <p className={eyebrowOnDark}>Featured Report</p>
          <h2 className={`${sectionHeadline} text-brand-ivory`}>{featuredExecutiveHousingReport.title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-brand-ivory/82">
            {featuredExecutiveHousingReport.subtitle}. Syndicated for UK, UAE, Singapore, Hong Kong, and European
            executive search.
          </p>
          <Link href={`/perspectives/reports/${featuredExecutiveHousingReport.slug}`} className="mt-8 inline-block">
            <Button variant="brand">Read Report</Button>
          </Link>
        </div>
      </section>

      <section className="brand-surface-intelligence border-t border-brand-midnight/10 px-6 py-14 lg:px-10 lg:py-16">
        <div className="relative z-[1] mx-auto max-w-7xl">
          <p className={eyebrowOnLight}>Research Products</p>
          <h2 className={`${sectionHeadline} text-brand-midnight`}>Building Intelligence Reports</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-brand-graphite/72">
            Structured research covering what matters before a transaction — not inventory to browse.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {intelligenceReportTopics.map((topic) => (
              <Card
                key={topic}
                className="rounded-none border border-brand-graphite/12 bg-white/78 px-5 py-4 shadow-none"
              >
                <p className="font-serif text-lg font-semibold text-brand-midnight">{topic}</p>
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/perspectives#intelligence">
              <Button variant="brandOutline">Explore Perspectives</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Strategy */}
      <section className="bg-brand-midnight px-6 py-14 text-brand-ivory lg:px-10 lg:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className={eyebrowOnDark}>Strategy</p>
          <h2 className={`${sectionHeadline} text-brand-ivory`}>
            Every Transaction Starts With Understanding The Building.
          </h2>
          <p className="mt-6 text-base leading-7 text-brand-ivory/78">
            Superior outcomes come from understanding architecture, ownership, resident profile, and competitive context
            before listings enter the conversation.
          </p>
          <p className="mt-4 text-base leading-7 text-brand-ivory/68">
            Agent Kammer studies significant buildings first. Representation follows from that clarity.
          </p>
          <Link href="/strategy" className="mt-8 inline-block">
            <Button variant="brandGhost">Our Strategy</Button>
          </Link>
        </div>
      </section>

      {/* 6. Buy / Sell Advisory */}
      <section className="border-t border-brand-midnight/10 bg-[#f7f3ea] px-6 py-12 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <p className={eyebrowOnLight}>Advisory</p>
          <h2 className="font-serif text-2xl font-semibold text-brand-midnight md:text-3xl">
            Research-Informed Representation
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-brand-graphite/72">
            Concise buyer and seller advisory throughout Manhattan — informed by building intelligence, not listing
            volume.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/buy">
              <Button variant="brandOutline">Buyer Advisory</Button>
            </Link>
            <Link href="/sell">
              <Button variant="brandOutline">Seller Positioning</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

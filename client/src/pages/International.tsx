import { Globe2, MapPin, Plane } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { PerspectiveCard } from "@/components/PerspectiveCard";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { getInternationalPerspectives } from "@/data/perspectives";
import { eyebrowOnDark, eyebrowOnLight } from "@/lib/brand-typography";

const targetMarkets = [
  {
    region: "United Kingdom",
    code: "UK",
    note: "Finance executives relocating from London — building-first research before the first Manhattan tour.",
    searchTerms: "Manhattan luxury apartments UK buyers · NYC relocation from London",
  },
  {
    region: "United Arab Emirates",
    code: "UAE",
    note: "Dubai and Abu Dhabi principals establishing a New York base — pied-à-terre and full-time residence decisions.",
    searchTerms: "Manhattan property UAE investors · New York luxury real estate Dubai",
  },
  {
    region: "Singapore & Hong Kong",
    code: "APAC",
    note: "Asia-Pacific executives comparing Manhattan against other global financial capitals.",
    searchTerms: "Manhattan condo Singapore buyers · NYC relocation Hong Kong executive",
  },
  {
    region: "Europe",
    code: "EU",
    note: "Continental and Nordic clients seeking Manhattan exposure with advisory-led building selection.",
    searchTerms: "Manhattan luxury real estate European buyers · NYC apartment advisory",
  },
];

const sectionHeadline = "font-serif text-3xl font-semibold md:text-4xl lg:text-[2.65rem]";

export default function International() {
  const internationalPerspectives = getInternationalPerspectives();

  usePageMetadata({
    title: "International Manhattan Advisory",
    description:
      "Building intelligence and relocation guidance for international clients acquiring or leasing in Manhattan — UK, UAE, Singapore, Hong Kong, and Europe.",
    path: "/international",
    keywords:
      "Manhattan luxury real estate international buyers, NYC relocation UK executives, Manhattan apartments UAE, Singapore Hong Kong Manhattan property advisory",
    locale: "en",
  });

  return (
    <main className="min-h-screen bg-brand-surface text-brand-graphite">
      <section className="bg-brand-midnight px-6 py-16 text-brand-ivory lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className={eyebrowOnDark}>International</p>
          <h1 className="font-serif text-5xl font-semibold leading-[0.98] md:text-6xl lg:text-7xl">
            Manhattan From Abroad
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-ivory/84">
            International clients do not need more listings. They need building context, neighborhood judgment, and a
            research sequence that works across time zones — before the first visit.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact">
              <Button variant="brand">Schedule Advisory Call</Button>
            </Link>
            <Link href="/perspectives">
              <Button variant="brandOutline" className="border-brand-ivory/30 text-brand-ivory hover:bg-brand-ivory/10">
                Read Perspectives
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="brand-surface-intelligence px-6 py-14 lg:px-10 lg:py-16">
        <div className="relative z-[1] mx-auto max-w-7xl">
          <p className={eyebrowOnLight}>How We Work</p>
          <h2 className={`${sectionHeadline} text-brand-midnight`}>Building Research Across Time Zones</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Card className="rounded-none border border-brand-graphite/12 bg-white/78 p-6 shadow-none">
              <Globe2 className="h-5 w-5 text-brand-champagne-dark" strokeWidth={1.4} />
              <h3 className="mt-4 font-serif text-xl font-semibold text-brand-midnight">Pre-Visit Shortlist</h3>
              <p className="mt-3 text-sm leading-6 text-brand-graphite/72">
                Narrow the building field remotely — reports, video context, and neighborhood mapping before you fly.
              </p>
            </Card>
            <Card className="rounded-none border border-brand-graphite/12 bg-white/78 p-6 shadow-none">
              <MapPin className="h-5 w-5 text-brand-champagne-dark" strokeWidth={1.4} />
              <h3 className="mt-4 font-serif text-xl font-semibold text-brand-midnight">Neighborhood Fit</h3>
              <p className="mt-3 text-sm leading-6 text-brand-graphite/72">
                Tribeca, Hudson Yards, Chelsea, and Midtown solve different versions of executive life. We match block
                to rhythm.
              </p>
            </Card>
            <Card className="rounded-none border border-brand-graphite/12 bg-white/78 p-6 shadow-none">
              <Plane className="h-5 w-5 text-brand-champagne-dark" strokeWidth={1.4} />
              <h3 className="mt-4 font-serif text-xl font-semibold text-brand-midnight">Visit With A Thesis</h3>
              <p className="mt-3 text-sm leading-6 text-brand-graphite/72">
                The first Manhattan trip should confirm building conviction — not discover it under jet lag.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-t border-brand-midnight/10 bg-white px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <p className={eyebrowOnLight}>Priority Markets</p>
          <h2 className={`${sectionHeadline} text-brand-midnight`}>Where Clients Arrive From</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-brand-graphite/72">
            English-language research for international buyers and renters. Full site translation is planned; indexed
            perspectives and advisory pages serve global search intent today.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {targetMarkets.map((market) => (
              <Card
                key={market.code}
                className="rounded-none border border-brand-graphite/12 bg-brand-ivory/50 px-5 py-5 shadow-none"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-champagne-dark">
                  {market.code}
                </p>
                <h3 className="mt-2 font-serif text-xl font-semibold text-brand-midnight">{market.region}</h3>
                <p className="mt-3 text-sm leading-6 text-brand-graphite/72">{market.note}</p>
                <p className="mt-3 text-xs leading-5 text-brand-graphite/50">{market.searchTerms}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-midnight/10 bg-[#f7f3ea] px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <p className={eyebrowOnLight}>International Perspectives</p>
          <h2 className={`${sectionHeadline} text-brand-midnight`}>Observations For Global Clients</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {internationalPerspectives.map((article) => (
              <PerspectiveCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-midnight/10 bg-brand-midnight px-6 py-14 text-brand-ivory lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">Begin With A Conversation</h2>
          <p className="mt-4 text-base leading-7 text-brand-ivory/78">
            Share your timeline, origin market, and building questions. We respond within 24 hours.
          </p>
          <div className="mt-8">
            <Link href="/contact">
              <Button variant="brand">Request Private Guidance</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

import { Building2, Compass, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { intelligenceReportTopics } from "@/data/featured-buildings";
import { getRecentPerspectives } from "@/data/perspectives";
import { PerspectiveCard } from "@/components/PerspectiveCard";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { eyebrowOnDark, eyebrowOnLight } from "@/lib/brand-typography";

const sectionHeadline = "font-serif text-3xl font-semibold md:text-4xl lg:text-[2.65rem]";

export default function Intelligence() {
  const recentPerspectives = getRecentPerspectives(3);

  usePageMetadata({
    title: "Intelligence | Agent Kammer",
    description:
      "Building intelligence, market research, and editorial analysis across Manhattan's most significant modern residential towers.",
    path: "/intelligence",
  });

  return (
    <main className="min-h-screen bg-brand-surface text-brand-graphite">
      <section className="bg-brand-midnight px-6 py-16 text-brand-ivory lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className={eyebrowOnDark}>Intelligence</p>
          <h1 className="font-serif text-5xl font-semibold leading-[0.98] md:text-6xl lg:text-7xl">
            Building Intelligence & Market Research
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-ivory/84">
            Research products covering architecture, ownership, resident profile, pricing context, and competitive
            positioning — before any transaction conversation begins.
          </p>
        </div>
      </section>

      <section className="brand-surface-intelligence px-6 py-14 lg:px-10 lg:py-16">
        <div className="relative z-[1] mx-auto max-w-7xl">
          <p className={eyebrowOnLight}>Building Reports</p>
          <h2 className={`${sectionHeadline} text-brand-midnight`}>Intelligence Reports</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-brand-graphite/72">
            In-depth studies on buildings worth understanding — not inventory to browse.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {intelligenceReportTopics.map((topic) => (
              <Card
                key={topic}
                className="rounded-none border border-brand-graphite/12 bg-white/78 px-5 py-4 shadow-none"
              >
                <FileText className="h-4 w-4 text-brand-champagne-dark" strokeWidth={1.4} />
                <p className="mt-3 font-serif text-lg font-semibold text-brand-midnight">{topic}</p>
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/buildings">
              <Button variant="brandOutline">Explore Building Reports</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-brand-midnight/10 bg-white px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <p className={eyebrowOnLight}>Perspectives</p>
          <h2 className={`${sectionHeadline} text-brand-midnight`}>Recent Analysis</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {recentPerspectives.map((article) => (
              <PerspectiveCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-midnight/10 bg-brand-midnight px-6 py-14 text-brand-ivory lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          <Card className="rounded-none border border-brand-ivory/14 bg-brand-midnight p-6 shadow-none">
            <Building2 className="h-5 w-5 text-brand-champagne" />
            <h3 className="mt-4 font-serif text-2xl font-semibold">Building Intelligence</h3>
            <p className="mt-3 text-sm leading-6 text-brand-ivory/72">
              Architecture, amenities, ownership patterns, and competitive context for Manhattan&apos;s premier towers.
            </p>
            <Link href="/buildings" className="mt-4 inline-block font-serif text-sm text-brand-champagne transition hover:text-brand-ivory">
              View watchlist →
            </Link>
          </Card>
          <Card className="rounded-none border border-brand-ivory/14 bg-brand-midnight p-6 shadow-none">
            <Compass className="h-5 w-5 text-brand-champagne" />
            <h3 className="mt-4 font-serif text-2xl font-semibold">Market Context</h3>
            <p className="mt-3 text-sm leading-6 text-brand-ivory/72">
              Neighborhood development, pricing trends, and timing signals across modern Manhattan residential markets.
            </p>
            <Link href="/new-york-market" className="mt-4 inline-block font-serif text-sm text-brand-champagne transition hover:text-brand-ivory">
              Market brief →
            </Link>
          </Card>
        </div>
      </section>
    </main>
  );
}

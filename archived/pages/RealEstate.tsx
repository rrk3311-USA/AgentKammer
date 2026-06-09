import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import {
  Building2,
  Compass,
  MapPin,
  Search,
} from "lucide-react";

const reports = [
  { title: "Building Intelligence Report", text: "Pricing, liquidity, risk, buyer leverage, and resident fit for one building." },
  { title: "Comparable Analysis", text: "Relevant active, pending, and closed comparables translated into decision context." },
  { title: "Neighborhood Report", text: "Demand, supply, amenities, commute, and development context by micro-market." },
  { title: "Opportunity Monitor", text: "Price cuts, stale listings, and negotiation windows." },
  { title: "Market Outlook", text: "Inventory, financing, and Manhattan demand perspective." },
];

export default function RealEstate() {
  return (
    <main className="min-h-screen bg-brand-ivory text-brand-graphite">
      <section className="bg-brand-midnight px-6 py-16 text-brand-ivory lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-brand-champagne">Intelligence</p>
            <h1 className="font-serif text-5xl font-semibold leading-[0.98] md:text-7xl">Building Intelligence</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-ivory/82">
              Research outputs for comparing buildings, neighborhoods, timing, and opportunity windows.
            </p>
            <Link href="/new-york-market">
              <Button variant="brand" className="mt-8">
                NYC Market Hub
              </Button>
            </Link>
          </div>
          <div className="border border-brand-ivory/14 bg-brand-ivory/[0.04] p-5 lg:p-6">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-brand-champagne">Sample Query</p>
            <p className="mt-4 font-mono text-sm leading-7 text-brand-ivory/86 md:text-base">
              Show every Manhattan condo building where price-per-square-foot is down 10%+ versus the 24-month trend.
            </p>
          </div>
        </div>
      </section>

      <section id="reports" className="px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-brand-champagne">Outputs</p>
          <h2 className="font-serif text-4xl font-semibold text-brand-midnight">Research Deliverables</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-brand-graphite/72">
            The intelligence page exists to show what gets produced, not to restate the strategy.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reports.map((item) => (
              <Card key={item.title} className="rounded-lg border border-brand-graphite/12 bg-white p-5">
                <Compass className="mb-3 h-4 w-4 text-brand-champagne" />
                <h3 className="font-serif text-lg font-semibold text-brand-midnight">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-brand-graphite/76">{item.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-graphite/10 bg-brand-midnight px-6 py-14 text-brand-ivory lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Markets</p>
          <h2 className="font-serif text-3xl font-semibold">Manhattan Intelligence Hubs</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Link href="/new-york-market">
              <Card className="border border-brand-ivory/14 bg-brand-midnight p-5 transition hover:border-brand-champagne/40" data-testid="card-nyc-market">
                <Building2 className="mb-2 h-5 w-5 text-brand-champagne" />
                <h3 className="font-serif text-xl text-brand-ivory">Uptown</h3>
                <p className="mt-1 text-sm text-brand-ivory/72">Central Park, Upper East Side, and Upper West Side signals.</p>
              </Card>
            </Link>
            <Link href="/new-york-market">
              <Card className="border border-brand-ivory/14 bg-brand-midnight p-5 transition hover:border-brand-champagne/40" data-testid="card-california-market">
                <MapPin className="mb-2 h-5 w-5 text-brand-champagne" />
                <h3 className="font-serif text-xl text-brand-ivory">Midtown</h3>
                <p className="mt-1 text-sm text-brand-ivory/72">Hudson Yards, Manhattan West, Billionaires' Row, and core tower inventory.</p>
              </Card>
            </Link>
            <Link href="/new-york-market">
              <Card className="border border-brand-ivory/14 bg-brand-midnight p-5 transition hover:border-brand-champagne/40" data-testid="card-nevada-market">
                <Search className="mb-2 h-5 w-5 text-brand-champagne" />
                <h3 className="font-serif text-xl text-brand-ivory">Downtown</h3>
                <p className="mt-1 text-sm text-brand-ivory/72">Tribeca, SoHo, Chelsea, Flatiron, and waterfront building context.</p>
              </Card>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

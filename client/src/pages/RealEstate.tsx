import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import {
  ArrowRight,
  Building2,
  Compass,
  Home as HomeIcon,
  MapPin,
  Search,
  TrendingUp,
} from "lucide-react";

const proofCapabilities = [
  { title: "Building Intelligence", icon: Building2, href: "/new-york-market" },
  { title: "Comparable Analysis", icon: Search, href: "/new-york-market" },
  { title: "Neighborhood Reports", icon: MapPin, href: "/new-york-market" },
];

const reports = [
  { title: "Building Intelligence Report", text: "Pricing, liquidity, risk, and buyer leverage for one building." },
  { title: "Neighborhood Report", text: "Demand, supply, and development context by micro-market." },
  { title: "Opportunity Monitor", text: "Price cuts, stale listings, and negotiation windows." },
  { title: "Market Research", text: "Quarterly pricing shifts and acquisition timing." },
  { title: "Market Outlook", text: "Inventory, financing, and Manhattan demand perspective." },
];

export default function RealEstate() {
  return (
    <main className="min-h-screen bg-brand-ivory text-brand-graphite">
      <section className="bg-brand-midnight px-6 py-16 text-brand-ivory lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-brand-champagne">Intelligence</p>
          <h1 className="font-serif text-5xl font-semibold leading-[0.98] md:text-7xl">Market Intelligence</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-ivory/82">
            Building research, market reports, and proprietary analysis.
          </p>
          <Link href="/new-york-market">
            <Button variant="brand" className="mt-8">
              NYC Market Hub
            </Button>
          </Link>
        </div>
      </section>

      <section className="border-b border-brand-graphite/10 bg-white px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-sapphire">Sample Intelligence Query</p>
          <div className="rounded-lg border border-brand-graphite/14 bg-brand-ivory p-6 md:p-8">
            <p className="font-mono text-sm leading-7 text-brand-midnight md:text-base">
              Show every Manhattan condo building where price-per-square-foot is down 10%+ versus the 24-month trend.
            </p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {proofCapabilities.map((item) => (
              <Link key={item.title} href={item.href}>
                <Card className="flex items-center gap-3 rounded-lg border border-brand-graphite/12 bg-white p-4 transition hover:border-brand-champagne/50">
                  <item.icon className="h-5 w-5 shrink-0 text-brand-sapphire" strokeWidth={1.35} />
                  <p className="text-sm font-semibold text-brand-midnight">{item.title}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="reports" className="px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-brand-sapphire">Reports</p>
          <h2 className="font-serif text-4xl font-semibold text-brand-midnight">Intelligence Reports</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reports.map((item) => (
              <Card key={item.title} className="rounded-lg border border-brand-graphite/12 bg-white p-5">
                <Compass className="mb-3 h-4 w-4 text-brand-sapphire" />
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
          <h2 className="font-serif text-3xl font-semibold">Intelligence Hubs</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Link href="/new-york-market">
              <Card className="border border-brand-ivory/14 bg-brand-midnight p-5 transition hover:border-brand-champagne/40" data-testid="card-nyc-market">
                <Building2 className="mb-2 h-5 w-5 text-brand-champagne" />
                <h3 className="font-serif text-xl text-brand-ivory">New York City</h3>
                <p className="mt-1 text-sm text-brand-ivory/72">Condo and co-op signals across Manhattan.</p>
              </Card>
            </Link>
            <Link href="/california-market">
              <Card className="border border-brand-ivory/14 bg-brand-midnight p-5 transition hover:border-brand-champagne/40" data-testid="card-california-market">
                <MapPin className="mb-2 h-5 w-5 text-brand-champagne" />
                <h3 className="font-serif text-xl text-brand-ivory">California</h3>
                <p className="mt-1 text-sm text-brand-ivory/72">Coastal luxury demand and pricing trends.</p>
              </Card>
            </Link>
            <Link href="/nevada-market">
              <Card className="border border-brand-ivory/14 bg-brand-midnight p-5 transition hover:border-brand-champagne/40" data-testid="card-nevada-market">
                <HomeIcon className="mb-2 h-5 w-5 text-brand-champagne" />
                <h3 className="font-serif text-xl text-brand-ivory">Nevada</h3>
                <p className="mt-1 text-sm text-brand-ivory/72">Growth corridors and investment signals.</p>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-sapphire">Advisory</p>
          <h2 className="font-serif text-3xl font-semibold text-brand-midnight">Buy or Sell</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Link href="/reverse-buyer-origination">
              <Card className="flex h-full items-center justify-between border border-brand-graphite/12 bg-white p-6 transition hover:border-brand-champagne/50" data-testid="card-rbo">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-brand-midnight">Reverse Buyer Origination™</h3>
                  <p className="mt-1 text-sm text-brand-graphite/72">Strategy before search. Structure before offers.</p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-brand-sapphire" />
              </Card>
            </Link>
            <Link href="/reverse-seller-architecture">
              <Card className="flex h-full items-center justify-between border border-brand-graphite/12 bg-white p-6 transition hover:border-brand-champagne/50" data-testid="card-rso">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-brand-midnight">Reverse Seller Architecture™</h3>
                  <p className="mt-1 text-sm text-brand-graphite/72">Positioning and pricing before exposure.</p>
                </div>
                <TrendingUp className="h-5 w-5 shrink-0 text-brand-sapphire" />
              </Card>
            </Link>
          </div>
          <Link href="/profile">
            <Button variant="brand" className="mt-8">
              Start Private Profile
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

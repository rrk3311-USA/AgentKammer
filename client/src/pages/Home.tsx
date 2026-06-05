import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, Building2, Compass, Home as HomeIcon, MapPin, Search, TrendingUp } from "lucide-react";
import skylineImage from "@assets/generated_images/chrysler-sunrise-hero-banner.png";

const threePaths = [
  {
    title: "Buy",
    subtitle: "Reverse Buyer Origination™",
    text: "Strategy before search. Structure before offers.",
    href: "/reverse-buyer-origination",
    icon: HomeIcon,
  },
  {
    title: "Sell",
    subtitle: "Reverse Seller Architecture™",
    text: "Positioning, pricing, and buyer competition before exposure.",
    href: "/reverse-seller-architecture",
    icon: TrendingUp,
  },
  {
    title: "Intelligence",
    subtitle: "Market Intelligence",
    text: "Building research, market reports, and proprietary analysis.",
    href: "/real-estate",
    icon: Search,
  },
];

const acquisitionFlow = ["Objectives", "Intelligence", "Strategy", "Execution"];

const proofCapabilities = [
  { title: "Building Intelligence", icon: Building2, href: "/real-estate" },
  { title: "Comparable Analysis", icon: Search, href: "/real-estate" },
  { title: "Neighborhood Reports", icon: MapPin, href: "/real-estate" },
];

const reports = [
  { title: "Building Intelligence Report", text: "Pricing, liquidity, risk, and buyer leverage for one building." },
  { title: "Neighborhood Report", text: "Demand, supply, and development context by micro-market." },
  { title: "Opportunity Monitor", text: "Price cuts, stale listings, and negotiation windows." },
  { title: "Market Research", text: "Quarterly pricing shifts and acquisition timing." },
  { title: "Market Outlook", text: "Inventory, financing, and Manhattan demand perspective." },
];

const profileIncludes = [
  "Buyer Strategy Review",
  "Seller Positioning Review",
  "Building Intelligence",
  "Market Updates",
];

export default function Home() {
  return (
    <main className="bg-brand-ivory text-brand-graphite">
      <section className="relative min-h-[600px] overflow-hidden bg-brand-midnight text-brand-ivory">
        <img
          src={skylineImage}
          alt="Manhattan skyline at golden sunrise with Chrysler Building"
          className="absolute inset-0 h-full w-full object-cover object-[center_42%] opacity-95"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(15,23,42,0.92)_0%,rgba(15,23,42,0.55)_48%,rgba(15,23,42,0.2)_100%)]" />
        <div className="relative mx-auto flex min-h-[600px] max-w-7xl flex-col justify-center px-6 py-16 lg:px-10">
          <div className="max-w-3xl rounded-xl border border-brand-ivory/22 bg-brand-midnight/55 p-6 backdrop-blur-[2px] lg:p-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-brand-champagne">
              Manhattan Intelligence
            </p>
            <h1 id="home-hero-title" className="font-serif text-5xl font-semibold leading-[1.02] text-brand-ivory md:text-6xl lg:text-7xl">
              Intelligence Before Real Estate
            </h1>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-brand-champagne">
              Wall Street Intelligence. Manhattan Execution.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-brand-ivory/92 md:text-lg md:leading-8">
              Private-client advisory for buyers, sellers, and investors in New York City.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/profile">
                <Button className="h-11 rounded-none border border-brand-champagne bg-brand-champagne px-6 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brand-midnight hover:bg-brand-champagne/90">
                  Start Private Profile
                </Button>
              </Link>
              <Link href="/real-estate">
                <Button
                  variant="outline"
                  className="h-11 rounded-none border-brand-ivory/60 bg-transparent px-6 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brand-ivory hover:bg-brand-ivory/10"
                >
                  Explore Intelligence
                </Button>
              </Link>
            </div>
          </div>
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

      <section className="border-b border-brand-graphite/10 px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-brand-sapphire">Three Paths</p>
          <h2 className="font-serif text-4xl font-semibold text-brand-midnight">Buy. Sell. Intelligence.</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {threePaths.map((path) => (
              <Link key={path.title} href={path.href}>
                <Card className="h-full rounded-lg border border-brand-graphite/12 bg-white p-6 transition hover:border-brand-champagne/50">
                  <path.icon className="mb-5 h-8 w-8 text-brand-sapphire" strokeWidth={1.35} />
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-sapphire">{path.title}</p>
                  <h3 className="mt-2 font-serif text-2xl font-semibold text-brand-midnight">{path.subtitle}</h3>
                  <p className="mt-3 text-sm leading-6 text-brand-graphite/78">{path.text}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-midnight px-6 py-14 text-brand-ivory lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-champagne">Our Strategy</p>
          <h2 className="font-serif text-4xl font-semibold text-brand-ivory">Strategic Property Acquisition™</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-brand-ivory/88">
            Most agents start with listings. Agent Kammer starts with decision quality.
          </p>

          <div className="mt-10 flex flex-col items-center gap-2 lg:flex-row lg:items-center lg:gap-3">
            {acquisitionFlow.map((step, idx) => (
              <Fragment key={step}>
                <div className="flex w-full flex-col items-center rounded-lg border border-brand-ivory/16 bg-brand-midnight px-5 py-4 lg:min-h-[88px] lg:flex-1 lg:justify-center">
                  <p className="font-mono text-xs text-brand-champagne">{idx + 1}</p>
                  <p className="mt-1 font-serif text-lg font-semibold text-brand-ivory">{step}</p>
                </div>
                {idx < acquisitionFlow.length - 1 && (
                  <>
                    <ArrowRight className="hidden h-4 w-4 shrink-0 text-brand-champagne lg:block" aria-hidden />
                    <span className="text-brand-champagne lg:hidden" aria-hidden>
                      ↓
                    </span>
                  </>
                )}
              </Fragment>
            ))}
          </div>

          <Link href="/about">
            <Button
              variant="outline"
              className="mt-8 h-11 rounded-none border-brand-champagne bg-transparent px-6 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brand-champagne hover:bg-brand-champagne hover:text-brand-midnight"
            >
              View Methodology
            </Button>
          </Link>
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
          <div className="mt-6">
            <Link href="/real-estate">
              <Button className="h-11 rounded-none border border-brand-midnight bg-brand-midnight px-6 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brand-ivory hover:bg-brand-midnight/90">
                View All Reports
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-brand-graphite/10 bg-white px-6 py-14 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-sapphire">Private Advisory</p>
            <h2 className="font-serif text-4xl font-semibold text-brand-midnight">Start With a Private Profile</h2>
            <p className="mt-4 text-base leading-7 text-brand-graphite/82">
              Share the essentials once. We shape strategy, positioning, building intelligence, and market updates.
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {profileIncludes.map((item) => (
                <li key={item} className="text-sm text-brand-graphite/86">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
          <Link href="/profile">
            <Button className="h-12 shrink-0 rounded-none border border-brand-champagne bg-brand-champagne px-8 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brand-midnight hover:bg-brand-champagne/90">
              Start Profile
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

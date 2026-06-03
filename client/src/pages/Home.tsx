import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Building2,
  CheckCircle2,
  Compass,
  DollarSign,
  Home as HomeIcon,
  KeyRound,
  Landmark,
  Radar,
  Search,
  Shield,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import skylineImage from "@assets/generated_images/golden_sunrise_over_financial_district_skyline.png";

const pillars = [
  {
    title: "Reverse Buyer Origination™",
    text: "Acquisition strategy, offer design, diligence sequencing, and leverage discovery before the market sees you move.",
    icon: HomeIcon,
    href: "/reverse-buyer-origination",
  },
  {
    title: "Reverse Seller Architecture™",
    text: "Positioning, pricing, buyer competition, and net-outcome design for sellers who want control before exposure.",
    icon: Building2,
    href: "/reverse-seller-architecture",
  },
  {
    title: "Market Intelligence Lab™",
    text: "AI-powered comparables, building intelligence, trend projections, and opportunity monitoring across New York City.",
    icon: BarChart3,
    href: "/real-estate",
  },
];

const marketCards = [
  { label: "Market Insight", note: "Real-time Manhattan market intelligence", icon: Building2 },
  { label: "Data-Driven", note: "AI-powered analysis and predictions", icon: TrendingUp },
  { label: "Private Client", note: "Discreet, strategic representation", icon: Shield },
  { label: "Full-Service", note: "From acquisition to exit and beyond", icon: KeyRound },
];

const reports = [
  "Comparable Analysis",
  "Neighborhood Intelligence",
  "Building Intelligence",
  "Market Reports",
  "Equity Tracking",
  "Inventory Monitoring",
  "Absorption Analysis",
  "Development Tracking",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F6F3EB] text-[#222730]">
      <section className="relative min-h-[620px] overflow-hidden bg-[#0F172A] text-[#F6F3EB]">
        <img
          src={skylineImage}
          alt="Manhattan luxury real estate at dusk"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,31,0.96)_0%,rgba(7,17,31,0.78)_42%,rgba(7,17,31,0.32)_100%)]" />
        <div className="relative mx-auto flex min-h-[620px] max-w-7xl flex-col justify-center px-6 py-14 lg:px-10">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.32em] text-[#D6B45F]" style={{ fontFamily: "Canela, var(--font-display)" }}>
              Manhattan Intelligence
            </p>
            <h1
              className="max-w-4xl text-5xl font-semibold leading-[0.98] md:text-7xl"
              style={{ fontFamily: "Noe Display, var(--font-serif)" }}
            >
              Intelligence Before Real Estate
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#F6F3EB]/82">
              Agent Kammer combines market intelligence, private-client advisory, and AI-powered execution for buyers, sellers, and investors in New York City.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/profile">
                <Button className="h-12 rounded-none bg-[#D6B45F] px-7 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[#0F172A] hover:bg-[#e4c56f]">
                  Start Your Private Profile
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/real-estate">
                <Button variant="outline" className="h-12 rounded-none border-[#F6F3EB]/40 bg-transparent px-7 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[#F6F3EB] hover:bg-[#F6F3EB] hover:text-[#0F172A]">
                  View Market Intelligence
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-12 grid max-w-6xl grid-cols-2 gap-px border-y border-[#F6F3EB]/18 bg-[#F6F3EB]/18 md:grid-cols-4">
            {marketCards.map((item) => (
              <div key={item.label} className="bg-[#07111f]/74 p-5 backdrop-blur-sm">
                <item.icon className="mb-4 h-7 w-7 text-[#D6B45F]" strokeWidth={1.4} />
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D6B45F]">{item.label}</p>
                <p className="mt-2 max-w-[12rem] text-sm leading-5 text-[#F6F3EB]/82">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#222730]/12 px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 text-center">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#B7832C]">Three paths. One standard.</p>
              <h2 className="text-4xl font-semibold text-[#0F172A]" style={{ fontFamily: "Noe Display, var(--font-serif)" }}>
                How We Help
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <Link key={pillar.title} href={pillar.href}>
                <Card className="h-full rounded-xl border border-[#222730]/10 bg-[#fffdf8] p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <pillar.icon className="mb-6 h-9 w-9 text-[#B7832C]" strokeWidth={1.35} />
                  <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#0F172A]">{pillar.title.replace("™", "")}</h3>
                  <p className="mt-4 text-sm leading-6 text-[#222730]/70">{pillar.text}</p>
                  <div className="mt-6 inline-flex items-center text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#0F172A]">
                    Explore services <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="intelligence" className="bg-[#0F172A] px-6 py-16 text-[#F6F3EB] lg:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#D6B45F]">Structured intelligence</p>
            <h2 className="text-4xl font-semibold" style={{ fontFamily: "Noe Display, var(--font-serif)" }}>Agent Kammer Intelligence™</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#F6F3EB]/72">
              Most agents know a neighborhood. Agent Kammer models an entire city: buildings, inventory, pricing movement, absorption, development risk, and buyer leverage.
            </p>
            <div className="mt-8 rounded-xl border border-[#F6F3EB]/15 bg-[#18366B]/40 p-5">
              <Search className="mb-4 h-5 w-5 text-[#D6B45F]" strokeWidth={1.5} />
              <p className="text-sm leading-7 text-[#F6F3EB]/86">
                Show every Manhattan condo building where price-per-square-foot is down 10%+ versus the 24-month trend.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {reports.map((report) => (
              <div key={report} className="flex items-center gap-3 rounded-lg border border-[#F6F3EB]/14 bg-[#F6F3EB]/6 p-4">
                <CheckCircle2 className="h-5 w-5 text-[#D6B45F]" strokeWidth={1.4} />
                <span className="text-sm text-[#F6F3EB]/86">{report}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reports" className="border-b border-[#222730]/12 px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#18366B]">Market reports</p>
            <h2 className="text-4xl font-semibold text-[#0F172A]" style={{ fontFamily: "Noe Display, var(--font-serif)" }}>Intelligence dashboards for repeat decisions.</h2>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {[
              ["Neighborhood Report", "Median PPSF, inventory, absorption, listing velocity, and price reduction pressure.", Compass],
              ["Building Report", "Unit mix, sponsor history, resale performance, board risk, and comparable stack.", Building2],
              ["Opportunity Monitor", "Expired listings, failed deals, motivated sellers, and price movement watchlists.", Radar],
            ].map(([title, text, Icon]) => (
              <Card key={title as string} className="rounded-xl border border-[#222730]/14 bg-[#fffdf8] p-7 shadow-sm">
                <Icon className="mb-6 h-6 w-6 text-[#18366B]" strokeWidth={1.5} />
                <h3 className="text-xl font-semibold text-[#0F172A]">{title as string}</h3>
                <p className="mt-4 text-sm leading-6 text-[#222730]/70">{text as string}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="alerts" className="bg-[#F6F3EB] px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-5xl rounded-xl border border-[#222730]/14 bg-[#0F172A] p-8 text-[#F6F3EB] shadow-sm md:p-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div>
              <Bell className="mb-5 h-6 w-6 text-[#D6B45F]" strokeWidth={1.5} />
              <h2 className="text-3xl font-semibold" style={{ fontFamily: "Noe Display, var(--font-serif)" }}>NYC Opportunity Alerts</h2>
              <p className="mt-4 text-sm leading-6 text-[#F6F3EB]/72">
                Get notified when price drops, failed deals, expired listings, and motivated sellers create leverage.
              </p>
            </div>
            <form
              className="flex flex-col gap-3 sm:flex-row"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
                const email = emailInput.value.trim();
                if (!email) return;
                try {
                  const response = await fetch("/api/travel-deals/subscribe", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, segment: "nyc-opportunity-alerts" }),
                  });
                  if (response.ok) {
                    emailInput.value = "";
                    alert("Subscribed. You will receive NYC opportunity alerts.");
                  } else {
                    const data = await response.json();
                    alert(data.message || "Subscription failed");
                  }
                } catch {
                  alert("Subscription failed. Please try again.");
                }
              }}
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="h-12 flex-1 rounded-md border border-[#F6F3EB]/30 bg-[#18366B] px-4 text-[#F6F3EB] outline-none placeholder:text-[#F6F3EB]/58 focus:border-[#D6B45F]"
              />
              <Button type="submit" className="h-12 rounded-md bg-[#D6B45F] px-6 text-[#0F172A] hover:bg-[#e2c16d]">
                Request alerts
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

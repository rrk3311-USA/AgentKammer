import { Home, Search, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { eyebrowOnDark, eyebrowOnLight } from "@/lib/brand-typography";

const sellerFocus = [
  {
    title: "Private Value Assessment",
    text: "Range, buyer profile, timing, and whether a sale deserves further study.",
    icon: Home,
  },
  {
    title: "Positioning Before Exposure",
    text: "Building-specific comparables and pricing posture before the market sees anything.",
    icon: Search,
  },
  {
    title: "Discreet Next Step",
    text: "No pressure. No listing commitment. Clarity before exposure.",
    icon: ShieldCheck,
  },
];

export default function Sell() {
  usePageMetadata({
    title: "Sell | Agent Kammer",
    description:
      "Strategic seller positioning for Manhattan residential owners — research-informed pricing and market exposure.",
    path: "/sell",
  });

  return (
    <main className="min-h-screen bg-brand-ivory text-brand-graphite">
      <section className="bg-brand-midnight px-6 py-16 text-brand-ivory lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className={eyebrowOnDark}>Sell</p>
          <h1 className="font-serif text-5xl font-semibold leading-[0.98] md:text-6xl">Seller Positioning</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-ivory/84">
            Strategic market positioning for owners seeking maximum exposure and informed pricing — grounded in building
            intelligence, not generic comparables.
          </p>
        </div>
      </section>

      <section className="brand-surface-intelligence px-6 py-14 lg:px-10 lg:py-16">
        <div className="relative z-[1] mx-auto max-w-7xl">
          <p className={eyebrowOnLight}>Approach</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {sellerFocus.map((item) => (
              <Card key={item.title} className="rounded-none border border-brand-graphite/12 bg-white/78 p-5 shadow-none">
                <item.icon className="h-4 w-4 text-brand-champagne-dark" />
                <h2 className="mt-3 font-serif text-xl font-semibold text-brand-midnight">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-brand-graphite/74">{item.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-midnight/10 px-6 py-12 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row">
          <Link href="/reverse-seller-architecture">
            <Button variant="brandOutline">Seller Diagnostic</Button>
          </Link>
          <Link href="/contact">
            <Button variant="brand">Schedule Strategy Call</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

import { Building2, Compass, Search, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { eyebrowOnDark, eyebrowOnLight } from "@/lib/brand-typography";

const inputs = [
  { title: "Building Analysis", text: "Architecture, ownership, amenities, and long-term fit.", icon: Building2 },
  { title: "Comparable Context", text: "Active, pending, and closed comparables across relevant towers.", icon: Search },
  { title: "Market Position", text: "Supply, demand, timing, and neighborhood development.", icon: TrendingUp },
  { title: "Acquisition Strategy", text: "Positioning and execution informed by preparation.", icon: Compass },
];

export default function Buy() {
  usePageMetadata({
    title: "Buy | Agent Kammer",
    description:
      "Research-informed buyer advisory across Manhattan's premier residential buildings — strategy before search.",
    path: "/buy",
  });

  return (
    <main className="min-h-screen bg-brand-ivory text-brand-graphite">
      <section className="bg-brand-midnight px-6 py-16 text-brand-ivory lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className={eyebrowOnDark}>Buy</p>
          <h1 className="font-serif text-5xl font-semibold leading-[0.98] md:text-6xl">Buyer Advisory</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-ivory/84">
            Guidance for buyers evaluating opportunities across Manhattan&apos;s most significant residential buildings —
            informed by building intelligence, not listing volume.
          </p>
        </div>
      </section>

      <section className="brand-surface-intelligence px-6 py-14 lg:px-10 lg:py-16">
        <div className="relative z-[1] mx-auto max-w-7xl">
          <p className={eyebrowOnLight}>Research Inputs</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {inputs.map((item) => (
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
          <Link href="/reverse-buyer-origination">
            <Button variant="brandOutline">Buyer Origination</Button>
          </Link>
          <Link href="/contact">
            <Button variant="brand">Schedule Strategy Call</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

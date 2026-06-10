import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { eyebrowOnDark, eyebrowOnLight } from "@/lib/brand-typography";

const sectionHeadline = "font-serif text-3xl font-semibold md:text-4xl lg:text-[2.65rem]";

const principles = [
  "Understand the building's architecture, ownership profile, and market position.",
  "Study resident fit, competitive buildings, and neighborhood development before pricing.",
  "Let listings enter the conversation only after strategic clarity exists.",
];

export default function Strategy() {
  usePageMetadata({
    title: "Strategy | Agent Kammer",
    description:
      "Research-led residential advisory — superior outcomes begin with understanding the building before discussing listings.",
    path: "/strategy",
  });

  return (
    <main className="min-h-screen bg-brand-ivory text-brand-graphite">
      <section className="bg-brand-midnight px-6 py-16 text-brand-ivory lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className={eyebrowOnDark}>Strategy</p>
          <h1 className="font-serif text-5xl font-semibold leading-[0.98] md:text-6xl lg:text-[2.75rem]">
            Every Transaction Starts With Understanding The Building.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-ivory/84">
            Agent Kammer is a research-led residential advisory practice. The primary value is insight and strategic
            guidance — not access to listings.
          </p>
        </div>
      </section>

      <section className="brand-surface-intelligence px-6 py-14 lg:px-10 lg:py-16">
        <div className="relative z-[1] mx-auto max-w-3xl">
          <p className={eyebrowOnLight}>Approach</p>
          <h2 className={`${sectionHeadline} text-brand-midnight`}>Strategy Before Search</h2>
          <div className="mt-6 space-y-4 text-base leading-7 text-brand-graphite/76">
            <p>
              Most Manhattan decisions fail quietly — not because the apartment was wrong, but because the building was
              never understood.
            </p>
            <p>
              Ownership structure, amenity economics, resident profile, and competitive context shape outcomes long
              before an offer is drafted or a listing goes live.
            </p>
            <p>
              We study significant buildings first. Transactions follow from that clarity.
            </p>
          </div>
          <ul className="mt-8 space-y-3 border-l border-brand-champagne/45 pl-5">
            {principles.map((item) => (
              <li key={item} className="font-serif text-base leading-relaxed text-brand-midnight/88">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-brand-midnight/10 bg-white px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 border border-brand-champagne/35 bg-brand-ivory p-6 md:flex-row md:items-center lg:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne-dark">
              Next Step
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-brand-midnight">Schedule A Strategy Call</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-brand-graphite/70">
              Share objectives, timing, and building interests. We begin with research — not a property search.
            </p>
          </div>
          <Link href="/contact">
            <Button variant="brand">Schedule Strategy Call</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

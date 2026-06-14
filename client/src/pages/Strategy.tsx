import { Button } from "@/components/ui/button";
import { AcquisitionCrewOverview } from "@/components/AcquisitionCrewOverview";
import { acquisitionSteps } from "@/data/acquisition-crew";
import { Link } from "wouter";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { eyebrowOnDark, eyebrowOnLight } from "@/lib/brand-typography";

const sectionHeadline = "font-serif text-3xl font-semibold md:text-4xl lg:text-[2.65rem]";

const principles = [
  "Building architecture, ownership profile, and market position.",
  "Resident fit, competition, and neighborhood context before pricing.",
  "Listings enter only after strategic clarity exists.",
];

export default function Strategy() {
  usePageMetadata({
    title: "How Sophisticated Acquisitions Are Structured",
    description:
      "Manhattan advisory team methodology — team size, risk, duration, and roles by price band.",
    path: "/strategy",
    keywords:
      "how many people involved luxury real estate purchase, Manhattan buyer advisory team size, real estate advisory team by price, NYC luxury acquisition roles, Manhattan purchase complexity, ultra luxury real estate advisory team",
  });

  return (
    <main className="min-h-screen bg-brand-ivory text-brand-graphite">
      <section className="bg-brand-midnight px-6 pb-4 pt-10 text-brand-ivory lg:px-10 lg:pb-5 lg:pt-12">
        <div className="mx-auto max-w-7xl">
          <p className={eyebrowOnDark}>Strategy</p>
          <h1 className="font-serif text-5xl font-semibold leading-[0.98] md:text-6xl lg:text-[2.75rem]">
            How Sophisticated Acquisitions Are Structured
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-7 text-brand-ivory/90">
            Most buyers ask about price and layout. Fewer ask who belongs in the room — or how many professionals the
            decision requires.
          </p>
        </div>
      </section>

      <AcquisitionCrewOverview />

      <section className="border-t border-brand-midnight/10 bg-white px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className={`${sectionHeadline} text-brand-midnight`}>Strategic Property Acquisition™</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {acquisitionSteps.map((step, idx) => (
              <div
                key={step.title}
                className="flex h-full flex-col border border-brand-champagne/35 bg-brand-ivory px-5 py-5"
              >
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-brand-champagne-dark">
                  0{idx + 1}
                </p>
                <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-brand-midnight">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-brand-graphite/80">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-midnight/10 bg-[#f7f3ea] px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <p className={eyebrowOnLight}>Approach</p>
          <h2 className={`${sectionHeadline} text-brand-midnight`}>Strategy Before Search</h2>
          <div className="mt-6 space-y-4 text-base leading-7 text-brand-graphite/82">
            <p>
              Most Manhattan decisions fail quietly — not because the apartment was wrong, but because the building was
              never understood.
            </p>
            <p>
              Ownership structure, amenity economics, resident profile, and competitive context shape outcomes before an
              offer is drafted.
            </p>
            <p>We study significant buildings first. Transactions follow.</p>
          </div>
          <ul className="mt-8 space-y-3 border-l-2 border-brand-champagne/50 pl-5">
            {principles.map((item) => (
              <li key={item} className="font-serif text-base leading-relaxed text-brand-midnight">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-brand-midnight/10 bg-white px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <p className={eyebrowOnLight}>Coordination</p>
          <h2 className={`${sectionHeadline} text-brand-midnight`}>Structuring The Advisory Team</h2>
          <div className="mt-6 space-y-4 text-base leading-7 text-brand-graphite/82">
            <p>
              Listings describe residences. They do not determine structure, timing, or advisory requirements.
            </p>
            <p>
              We begin with building intelligence, then map the roles the deal requires — assembling the advisory team
              before complexity becomes costly.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/buy">
              <Button variant="brandOutline">Buyer Advisory</Button>
            </Link>
            <Link href="/perspectives#intelligence">
              <Button variant="brandOutline">View Intelligence</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-brand-midnight/10 bg-brand-ivory px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 border border-brand-champagne/35 bg-white p-6 md:flex-row md:items-center lg:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne-dark">Next Step</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-brand-midnight">Schedule A Strategy Call</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-brand-graphite/78">
              Share objectives, timing, and building interests. Research precedes search.
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

import { Button } from "@/components/ui/button";
import { AcquisitionCrewOverview } from "@/components/AcquisitionCrewOverview";
import { acquisitionSteps } from "@/data/acquisition-crew";
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
    title: "How Many People Should Be Involved In Your Deal?",
    description:
      "An advisory team overview for Manhattan residential purchases — team size, risk level, typical duration, and roles at each price band.",
    path: "/strategy",
    keywords:
      "how many people involved luxury real estate purchase, Manhattan buyer advisory team size, real estate advisory team by price, NYC luxury acquisition roles, Manhattan purchase complexity, ultra luxury real estate advisory team",
  });

  return (
    <main className="min-h-screen bg-brand-ivory text-brand-graphite">
      <section className="bg-brand-midnight px-6 py-16 text-brand-ivory lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className={eyebrowOnDark}>Strategy</p>
          <h1 className="font-serif text-5xl font-semibold leading-[0.98] md:text-6xl lg:text-[2.75rem]">
            How Many People Should Be Involved In Your Deal?
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-ivory/90">
            Most buyers ask about price, bedrooms, and amenities. Fewer ask who should actually be in the room — and
            how many professionals it takes to structure the decision properly.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-brand-ivory/80">
            As deal size increases, so do complexity, risk, and timeline. The advisory team expands, roles specialize, and
            coordination matters more than the listing itself.
          </p>
        </div>
      </section>

      <AcquisitionCrewOverview />

      <section className="border-t border-brand-midnight/10 bg-white px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <p className={eyebrowOnLight}>Strategic Property Acquisition</p>
          <h2 className={`${sectionHeadline} text-brand-midnight`}>Five Steps. One Discipline.</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-brand-graphite/82">
            A useful acquisition plan is not a brochure. It is a sequence — from understanding the property to
            assembling the people who can protect the decision.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
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
              Ownership structure, amenity economics, resident profile, and competitive context shape outcomes long
              before an offer is drafted or a listing goes live.
            </p>
            <p>We study significant buildings first. Transactions follow from that clarity.</p>
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
          <h2 className={`${sectionHeadline} text-brand-midnight`}>Someone Has To Structure The Advisory Team</h2>
          <div className="mt-6 space-y-4 text-base leading-7 text-brand-graphite/82">
            <p>
              Price, bedrooms, and amenities describe a listing. They do not describe who should be involved — or in
              what order. Above $20M, ownership structure and professional coordination often matter as much as the
              residence itself.
            </p>
            <p>
              Agent Kammer begins with building intelligence, then helps clients understand which roles the deal
              actually requires. The goal is not to overwhelm with names. The goal is to assemble the right advisory
              team before complexity becomes expensive.
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

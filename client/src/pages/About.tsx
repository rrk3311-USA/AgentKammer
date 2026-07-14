import { Link } from "wouter";
import { CTA, PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const principles = [
  {
    title: "Advisory First",
    text: "The work starts with judgment and positioning, not volume or velocity. A recommendation can be to wait, rent first, or do nothing.",
  },
  {
    title: "Building-Led Perspective",
    text: "Good decisions happen when the building, block, and buyer brief are understood together — before apartments dominate attention.",
  },
  {
    title: "Quiet Execution",
    text: "The tone is measured, private, and precise from first call through close. Urgency is never manufactured.",
  },
];

const credentials = [
  "New York State licensed real estate practice",
  "ICC Commercial Building Inspector training",
  "Blueprint reading and construction-document literacy",
  "OSHA 30 construction safety foundation",
];

const situations = [
  { label: "Executive relocation", href: "/services/executive-relocation-nyc" },
  { label: "Foreign / international buyers", href: "/services/foreign-buyers-new-york" },
  { label: "School and family planning", href: "/services/school-district-planning-nyc" },
  { label: "1031 exchange buyers", href: "/services/1031-exchange-new-york" },
  { label: "Estate and probate sales", href: "/services/probate-estate-sales-nyc" },
  { label: "Empty-nester downsizing", href: "/services/empty-nester-downsizing-nyc" },
];

export default function About() {
  usePageMetadata({
    title: "About",
    description:
      "About Agent Kammer: Manhattan housing decisions guided by building intelligence, life-change diagnosis, and private advisory judgment.",
    path: "/about",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="About"
        title="Private housing guidance before the market gets loud."
        description="Agent Kammer helps clients decide what should happen next: buy, sell, rent, wait, renovate, refinance, hold, or do nothing. The work starts with judgment, building intelligence, and a clear understanding of what changed."
        art="private-advisory"
      />

      <PageSection className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
        <SectionHeading
          eyebrow="Practice"
          title="Manhattan decisions need more than a listing feed."
          description="Raphael Kammer built Agent Kammer for clients who want a decision operating system — not a louder search. The practice combines market fluency with building-level literacy so recommendations stay grounded in how New York residences actually work."
        />
        <div className="rounded-card border border-brand-border bg-white p-8">
          <p className="text-[11px] uppercase tracking-[0.22em] text-brand-brass">At a Glance</p>
          <div className="mt-6 grid gap-6">
            <div>
              <p className="font-display text-4xl leading-none text-brand-navy">New York</p>
              <p className="mt-2 text-sm leading-7 text-brand-graphite">
                Primary focus on Manhattan neighborhoods, buildings, and ownership structures.
              </p>
            </div>
            <div>
              <p className="font-display text-4xl leading-none text-brand-navy">Private</p>
              <p className="mt-2 text-sm leading-7 text-brand-graphite">
                Communication designed for executives, principals, families, and cross-border clients.
              </p>
            </div>
            <div>
              <p className="font-display text-4xl leading-none text-brand-navy">Building-first</p>
              <p className="mt-2 text-sm leading-7 text-brand-graphite">
                Address quality and resident fit before floor-plan fascination takes over.
              </p>
            </div>
          </div>
        </div>
      </PageSection>

      <section className="border-y border-brand-border bg-white">
        <PageSection className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Credentials That Matter"
              title="Building literacy changes the quality of advice."
              description="Inspector training and construction-document fluency are not marketing props. They help separate cosmetic issues from functional and building-related risk before a client commits capital or time."
            />
          </div>
          <ul className="space-y-4 self-center">
            {credentials.map((item) => (
              <li key={item} className="border-b border-brand-border py-4 text-base leading-8 text-brand-navy last:border-b-0">
                {item}
              </li>
            ))}
          </ul>
        </PageSection>
      </section>

      <PageSection>
        <SectionHeading eyebrow="Principles" title="Three ideas organize the work." align="center" />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {principles.map((item) => (
            <div key={item.title} className="rounded-card border border-brand-border bg-white p-8">
              <h3 className="font-display text-3xl leading-[0.95] tracking-[-0.03em] text-brand-navy">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-graphite">{item.text}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <section className="border-y border-brand-border bg-white">
        <PageSection>
          <SectionHeading
            eyebrow="Situations Served"
            title="The practice shows up where life change meets Manhattan complexity."
            description="A first call usually covers what changed, whether anything should change, and which Decision Brief or Building Report should come next."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {situations.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-card border border-brand-border bg-brand-ivory px-5 py-4 text-sm text-brand-navy transition-colors hover:border-brand-brass"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </PageSection>
      </section>

      <CTA
        title="Bring the decision into focus."
        description="Request a call to clarify what changed, what should happen next, and whether the best move is action or restraint."
      />
    </main>
  );
}

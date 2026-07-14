import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { CTA, PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { decisionNavigationGroups } from "@/data/decision-navigation";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const coreServices = [
  { label: "What's Changing?", href: "/buyer-advisory" },
  { label: "Should Anything Change?", href: "/buyer-advisory" },
  { label: "Decision Frameworks", href: "/services#frameworks" },
  { label: "Private Contact", href: "/contact" },
];

const flagshipFrameworks = [
  { label: "Buy vs Rent", href: "/services/rent-vs-buy-manhattan-relocation" },
  { label: "Stay vs Move", href: "/buyer-advisory" },
  { label: "Sell vs Keep", href: "/buyer-advisory" },
  { label: "Condo vs Co-op", href: "/services/condo-vs-coop-foreign-buyers-nyc" },
  { label: "Renovate vs Relocate", href: "/buyer-advisory" },
  { label: "Lease vs Buy", href: "/services/rent-vs-buy-manhattan-relocation" },
  { label: "Building vs Apartment", href: "/building-reports" },
  { label: "Neighborhood Fit", href: "/building-reports/neighborhood-guides" },
  { label: "Opportunity Cost", href: "/building-reports/market-briefs" },
  { label: "Total Cost of Ownership", href: "/building-reports/market-briefs" },
  { label: "Decision Under Uncertainty", href: "/buyer-advisory" },
];

function BriefLibraryBlueprint() {
  return (
    <div className="pointer-events-none absolute right-8 top-10 hidden h-64 w-80 opacity-45 lg:block" aria-hidden="true">
      <svg viewBox="0 0 360 260" fill="none" className="h-full w-full">
        <path d="M34 210H326" stroke="currentColor" strokeWidth="1" className="text-brand-ivory/35" />
        <path d="M72 210V82H284V210" stroke="currentColor" strokeWidth="1" className="text-brand-ivory/45" />
        <path d="M102 210V112H254V210" stroke="currentColor" strokeWidth="1" className="text-brand-ivory/32" />
        <path d="M132 210V142H224V210" stroke="currentColor" strokeWidth="1" className="text-brand-ivory/25" />
        <path d="M72 82L180 28L284 82" stroke="currentColor" strokeWidth="1.2" className="text-brand-brass/65" />
        <path d="M92 96H264" stroke="currentColor" strokeWidth="1" className="text-brand-ivory/18" />
        <path d="M92 122H264" stroke="currentColor" strokeWidth="1" className="text-brand-ivory/18" />
        <path d="M92 148H264" stroke="currentColor" strokeWidth="1" className="text-brand-ivory/18" />
        <path d="M92 174H264" stroke="currentColor" strokeWidth="1" className="text-brand-ivory/18" />
        <path d="M120 104V210" stroke="currentColor" strokeWidth="1" className="text-brand-ivory/14" />
        <path d="M150 88V210" stroke="currentColor" strokeWidth="1" className="text-brand-ivory/14" />
        <path d="M180 74V210" stroke="currentColor" strokeWidth="1" className="text-brand-ivory/14" />
        <path d="M210 88V210" stroke="currentColor" strokeWidth="1" className="text-brand-ivory/14" />
        <path d="M240 104V210" stroke="currentColor" strokeWidth="1" className="text-brand-ivory/14" />
        <circle cx="72" cy="82" r="4" stroke="currentColor" strokeWidth="1" className="text-brand-brass/75" />
        <circle cx="284" cy="210" r="4" stroke="currentColor" strokeWidth="1" className="text-brand-brass/75" />
      </svg>
    </div>
  );
}

export default function Services() {
  usePageMetadata({
    title: "Services",
    description: "Decision briefs and advisory services for Agent Kammer.",
    path: "/services",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Decision Briefs"
        title="The first question is whether anything should change at all."
        description="Agent Kammer organizes the site around decisions, not real estate services. Everything begins with uncertainty, life change, options, trade-offs, and judgment before any building or property enters the conversation."
        art="decision-framework"
      />

      <PageSection className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
        <SectionHeading
          eyebrow="Core"
          title="Begin when the question is still forming."
          description="Use these entry points before a transaction is obvious. The recommendation may be to buy, sell, rent, renew, wait, renovate, refinance, keep the current home, or do nothing for now."
        />
        <div className="rounded-card border border-brand-border bg-white p-8">
          <div className="grid gap-4">
            {coreServices.map((service) => (
              <Link key={service.href} href={service.href} className="flex items-center justify-between border-b border-brand-border py-4 last:border-b-0">
                <span className="text-[11px] uppercase tracking-[0.18em] text-brand-navy">{service.label}</span>
                <ArrowRight className="h-4 w-4 text-brand-navy/60" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>
      </PageSection>

      <section id="frameworks" className="border-y border-brand-border bg-brand-ivory">
        <PageSection>
          <SectionHeading
            eyebrow="Decision Frameworks"
            title="Frameworks that clarify the choice before inventory takes over."
            description="Every framework starts the same way: what changed, why it matters, what options exist, what trade-offs govern the choice, and which path has the highest expected value."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {flagshipFrameworks.map((framework) => (
              <Link
                key={framework.label}
                href={framework.href}
                className="group flex items-center justify-between rounded-card border border-brand-border bg-white px-5 py-4 text-sm text-brand-navy transition-colors hover:border-brand-brass hover:bg-brand-surface"
              >
                <span className="font-medium">{framework.label}</span>
                <ArrowRight className="h-4 w-4 text-brand-navy/55 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </PageSection>
      </section>

      <section className="relative overflow-hidden border-y border-brand-brass/25 bg-brand-navy text-brand-ivory">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(216,209,199,0.16),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.05),transparent_38%,rgba(0,0,0,0.16))]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:repeating-linear-gradient(90deg,rgba(245,242,235,0.22)_0,rgba(245,242,235,0.22)_1px,transparent_1px,transparent_46px),repeating-linear-gradient(0deg,rgba(245,242,235,0.16)_0,rgba(245,242,235,0.16)_1px,transparent_1px,transparent_46px)]" aria-hidden="true" />
        <BriefLibraryBlueprint />
        <PageSection className="relative z-10">
          <div className="max-w-4xl">
            <p className="text-[12px] uppercase tracking-[0.32em] text-brand-brass">Decision Brief Library</p>
            <h2 className="mt-6 max-w-3xl font-display text-5xl leading-[0.95] tracking-[-0.03em] text-brand-ivory md:text-6xl">
              Start from the life change, then choose the brief that matches it.
            </h2>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-brand-ivory/76">
              Relocation, schools, foreign buyers, estate sales, downsizing, and neighborhood fit each need a different first filter. The transaction is only the outcome of a clear recommendation.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {decisionNavigationGroups.map((group) => (
              <div
                id={group.title.toLowerCase().replace(/\s+/g, "-")}
                key={group.title}
                className="rounded-card border border-brand-ivory/14 bg-brand-ivory/[0.055] p-8 shadow-[0_28px_80px_rgba(0,0,0,0.18)]"
              >
                <p className="text-[11px] uppercase tracking-[0.24em] text-brand-brass">Decision Category</p>
                <h3 className="mt-4 font-display text-4xl leading-[0.95] tracking-[-0.03em] text-brand-ivory">{group.title}</h3>
                <p className="mt-4 min-h-[4.5rem] text-sm leading-7 text-brand-ivory/70">{group.description}</p>
                <div className="mt-8 grid gap-2.5 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <Link
                      key={group.title + item.href + item.label}
                      href={item.href}
                      className="group/item flex items-center justify-between border-t border-brand-ivory/12 py-3 text-sm text-brand-ivory/84 transition-colors hover:text-brand-brass"
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="h-4 w-4 opacity-45 transition-transform group-hover/item:translate-x-1 group-hover/item:opacity-100" strokeWidth={1.5} />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PageSection>
      </section>

      <CTA
        title="Not sure which brief fits?"
        description="Request a call and share what is changing. We will help decide whether the next step is a search, a sale, a report, a wait-and-watch plan, or no move at all."
        href="/contact"
        label="Request a Call"
      />
    </main>
  );
}

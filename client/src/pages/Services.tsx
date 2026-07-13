import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA, PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { serviceLandings } from "@/data/service-landings";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const coreServices = [
  { label: "Buyer Advisory", href: "/buyer-advisory" },
  { label: "Building Reports", href: "/building-reports" },
  { label: "Market Briefs", href: "/building-reports/market-briefs" },
  { label: "Private Contact", href: "/contact" },
];

function publicSummary(summary: string) {
  return summary
    .replace(/^A supporting landing page for /i, "Guidance for ")
    .replace(/^A landing page for /i, "Guidance for ");
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
        title="Start with the situation. Then decide whether anything should change."
        description="Agent Kammer organizes housing guidance around the life event, constraint, or ownership question behind the search. The recommendation may be to buy, sell, rent, wait, renovate, refinance, or stay put."
      />

      <PageSection className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
        <SectionHeading
          eyebrow="Core"
          title="The main paths stay simple."
          description="Use these broad entry points when the situation is still forming. The Decision Guide and the footer navigator can then route visitors into a more specific brief."
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

      <section className="border-y border-brand-border bg-white">
        <PageSection>
          <SectionHeading
            eyebrow="Brief Library"
            title="Focused guidance for the situations that actually make people move."
            description="Each brief turns a specific trigger into a smaller set of decisions: what changed, whether anything should change, what the options are, and which trade-offs matter most."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {serviceLandings.map((item) => (
              <Link key={item.slug} href={`/services/${item.slug}`} className="rounded-card border border-brand-border bg-brand-ivory p-8 transition-transform hover:-translate-y-1">
                <p className="text-[11px] uppercase tracking-[0.22em] text-brand-brass">{item.eyebrow}</p>
                <h3 className="mt-4 font-display text-4xl leading-[0.95] tracking-[-0.03em] text-brand-navy">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-brand-graphite">{publicSummary(item.summary)}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-brand-navy">
                  Open brief
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </span>
              </Link>
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

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

export default function Services() {
  usePageMetadata({
    title: "Services",
    description: "Core services and niche landing pages for Agent Kammer.",
    path: "/services",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Services"
        title="Core advisory services, plus focused landing pages built around real New York search intent."
        description="These niche pages work best as landing pages under a broader services hub. That keeps the main navigation clean while still making space for highly specific buyer and seller situations."
      />

      <PageSection className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
        <SectionHeading
          eyebrow="Core"
          title="The main service lines stay broad. The niche pages sit underneath them."
          description="This structure is the cleaner recommendation: keep the top-level experience simple, then use landing pages for high-intent searches and special situations."
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
            eyebrow="Landing Pages"
            title="A fuller set of focused pages for buying and selling niches."
            description="These are built as SEO-style landing pages rather than primary nav items. They can rank for more specific intent while still folding back into the main advisory brand, and they stay intentionally purchase-and-sale focused rather than rental-oriented."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {serviceLandings.map((item) => (
              <Link key={item.slug} href={`/services/${item.slug}`} className="rounded-card border border-brand-border bg-brand-ivory p-8 transition-transform hover:-translate-y-1">
                <p className="text-[11px] uppercase tracking-[0.22em] text-brand-brass">{item.eyebrow}</p>
                <h3 className="mt-4 font-display text-4xl leading-[0.95] tracking-[-0.03em] text-brand-navy">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-brand-graphite">{item.summary}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-brand-navy">
                  Open page
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </span>
              </Link>
            ))}
          </div>
        </PageSection>
      </section>

      <CTA
        title="Need help deciding which of these niche pages to prioritize in production?"
        description="The current set now covers the broader buying and selling list from your screenshots, plus a couple of adjacent ownership-focused pages that fit the same strategy."
        href="/contact"
        label="Work With AK"
      />
    </main>
  );
}

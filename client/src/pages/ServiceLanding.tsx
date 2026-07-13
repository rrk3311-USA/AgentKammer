import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA, PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { serviceLandingMap } from "@/data/service-landings";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const serviceHeroImages: Record<string, { src: string; alt: string }> = {
  "1031-exchange-new-york": {
    src: "/buildings/one-high-line.jpg",
    alt: "Manhattan luxury condominium architecture at sunset",
  },
};

export default function ServiceLanding({ slug }: { slug: string }) {
  const landing = serviceLandingMap[slug];
  const heroImage = landing ? serviceHeroImages[landing.slug] : undefined;

  usePageMetadata({
    title: landing?.title ?? "Services",
    description: landing?.summary ?? "Focused service landing pages for Agent Kammer.",
    path: landing ? `/services/${landing.slug}` : "/services",
    keywords: landing?.searchTerms.join(", "),
  });

  if (!landing) {
    return (
      <main className="bg-brand-ivory">
        <PageSection>
          <SectionHeading
            eyebrow="Services"
            title="Service page not found."
            description="This landing page slug does not match one of the current niche pages."
          />
        </PageSection>
      </main>
    );
  }

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow={landing.eyebrow}
        title={landing.title}
        description={landing.summary}
        image={heroImage?.src}
        imageAlt={heroImage?.alt}
        kicker={
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-brand-brass">Search Intent</p>
            <div className="mt-3 space-y-2">
              {landing.searchTerms.map((term) => (
                <p key={term} className="text-sm uppercase tracking-[0.12em] text-brand-ivory/82">
                  {term}
                </p>
              ))}
            </div>
          </div>
        }
      />

      <PageSection className="grid gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
        <SectionHeading
          eyebrow="Who It Serves"
          title="A dedicated landing page for a very specific type of New York client."
          description="This is where the brand can speak directly to the situation, search phrase, and timing pressure behind the inquiry instead of keeping everything generic."
        />
        <div className="grid gap-4">
          {landing.audience.map((item, index) => (
            <div key={item} className="rounded-card border border-brand-border bg-white p-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-brand-brass">0{index + 1}</p>
              <p className="mt-3 text-base leading-8 text-brand-navy">{item}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <section className="border-y border-brand-border bg-white">
        <PageSection>
          <SectionHeading
            eyebrow="What Matters"
            title="The page should frame the decision points that matter most to this niche."
            description="This keeps the landing page useful to a real visitor while also giving search-targeted structure to the copy."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {landing.considerations.map((item) => (
              <div key={item} className="rounded-card border border-brand-border bg-brand-ivory p-8">
                <p className="text-sm leading-7 text-brand-graphite">{item}</p>
              </div>
            ))}
          </div>
        </PageSection>
      </section>

      <PageSection className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-brand-brass">Related Service</p>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[0.95] tracking-[-0.03em] text-brand-navy">
            These pages work as focused entry points into the broader advisory practice.
          </h2>
        </div>
        <Link href="/services">
          <Button variant="brandOutline" className="gap-2 uppercase tracking-nav">
            Back to Services
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Button>
        </Link>
      </PageSection>

      <CTA
        title={landing.cta}
        description="If this situation matches the search, the next step should be a private conversation that turns the landing-page intent into a real brief."
        href="/contact"
        label="Start the Conversation"
      />
    </main>
  );
}

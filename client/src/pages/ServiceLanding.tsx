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

function publicSummary(summary: string) {
  return summary
    .replace(/^A supporting landing page for /i, "Guidance for ")
    .replace(/^A landing page for /i, "Guidance for ");
}

function decisionQuestions(title: string) {
  return [
    `What changed enough to make ${title.toLowerCase()} worth evaluating now?`,
    "Should anything change, or is the smarter move to wait, renew, renovate, refinance, or stay put?",
    "If a move is right, which constraints should shape the shortlist before listings or showings begin?",
    "Which trade-off matters most: location, space, building quality, monthly cost, flexibility, or long-term value?",
  ];
}

export default function ServiceLanding({ slug }: { slug: string }) {
  const landing = serviceLandingMap[slug];
  const heroImage = landing ? serviceHeroImages[landing.slug] : undefined;

  usePageMetadata({
    title: landing?.title ?? "Services",
    description: landing ? publicSummary(landing.summary) : "Focused advisory pages for Agent Kammer.",
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
            description="This URL does not match one of the current Decision Brief pages."
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
        description={publicSummary(landing.summary)}
        image={heroImage?.src}
        imageAlt={heroImage?.alt}
        kicker={
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-brand-brass">Common Starting Points</p>
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
          eyebrow="Who It Helps"
          title={`${landing.navLabel} need a decision brief, not a generic search.`}
          description="The first step is understanding why the move, sale, or purchase is being considered. From there, the work becomes narrower: decide whether anything should change, then decide what kind of change is worth pursuing."
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
            eyebrow="Decision Questions"
            title="Before the market search starts, the important questions are still strategic."
            description="Agent Kammer uses the same core framework across every situation: trigger, desire, constraints, trade-offs, and recommendation. Sometimes the right recommendation is to move. Sometimes it is to wait."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-4">
            {decisionQuestions(landing.navLabel).map((item, index) => (
              <div key={item} className="rounded-card border border-brand-border bg-brand-ivory p-8">
                <p className="text-[11px] uppercase tracking-[0.22em] text-brand-brass">0{index + 1}</p>
                <p className="text-sm leading-7 text-brand-graphite">{item}</p>
              </div>
            ))}
          </div>
        </PageSection>
      </section>

      <PageSection>
        <SectionHeading
          eyebrow="How The Brief Is Built"
          title="The page becomes useful when it turns the situation into a shorter, clearer set of choices."
          description="The goal is not to tour more property. The goal is to remove the wrong paths early, then spend attention only where the decision deserves it."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {landing.considerations.map((item, index) => (
            <div key={item} className="rounded-card border border-brand-border bg-white p-8 shadow-[0_1px_0_rgba(42,52,71,0.05)]">
              <p className="text-[11px] uppercase tracking-[0.22em] text-brand-brass">Lens 0{index + 1}</p>
              <p className="mt-4 text-sm leading-7 text-brand-graphite">{item}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <section className="border-y border-brand-border bg-brand-navy text-brand-ivory">
        <PageSection className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.24em] text-brand-brass">Decision Path</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[0.94] tracking-[-0.03em] text-brand-ivory">
              The recommendation may be to buy, sell, rent, wait, renovate, refinance, or do nothing yet.
            </h2>
            <p className="mt-6 text-base leading-8 text-brand-ivory/72 lg:text-lg">
              That is the difference between guidance and a sales funnel. A good housing decision starts with the life change, then tests whether the market is actually the right answer.
            </p>
          </div>
          <div className="grid gap-4">
            {["What changed?", "Should anything change?", "What are the real options?", "Which option protects the client best?"].map((item, index) => (
              <div key={item} className="grid grid-cols-[3rem_minmax(0,1fr)] items-center gap-4 border border-brand-ivory/14 bg-brand-ivory/5 p-5">
                <span className="font-mono text-xs text-brand-brass">0{index + 1}</span>
                <span className="text-sm uppercase tracking-[0.14em] text-brand-ivory/82">{item}</span>
              </div>
            ))}
          </div>
        </PageSection>
      </section>

      <PageSection className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-brand-brass">More Briefs</p>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[0.95] tracking-[-0.03em] text-brand-navy">
            Compare this brief with the rest of the Decision Brief library.
          </h2>
        </div>
        <Link href="/services">
          <Button variant="brandOutline" className="gap-2 uppercase tracking-nav">
            Back to Decision Briefs
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Button>
        </Link>
      </PageSection>

      <CTA
        title={landing.cta}
        description="Request a call to turn the situation into a concise decision brief: what changed, what should happen next, what to avoid, and which pages or buildings deserve attention."
        href="/contact"
        label="Request a Call"
      />
    </main>
  );
}

import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA, PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { serviceLandingMap } from "@/data/service-landings";
import { usePageMetadata } from "@/hooks/usePageMetadata";

function publicSummary(summary: string) {
  return summary;
}

function decisionQuestions(title: string) {
  return [
    `What changed enough to make ${title.toLowerCase()} worth evaluating now?`,
    "Is it better to do nothing, or is doing nothing the risk?",
    "If a move is right, which constraints should shape the shortlist before listings or showings begin?",
    "Which option should win: buy, sell, rent, wait, renew, renovate, refinance, rent the current home, or stay put?",
  ];
}

export default function ServiceLanding({ slug }: { slug: string }) {
  const landing = serviceLandingMap[slug];
  const pagePath = landing ? `/services/${landing.slug}` : "/services";
  const pageUrl = `https://www.agentkammer.com${pagePath}`;
  const questions = landing ? decisionQuestions(landing.navLabel) : [];
  const structuredData = landing
    ? [
        {
          "@context": "https://schema.org",
          "@type": "Service",
          name: `${landing.title} Decision Brief`,
          serviceType: "Manhattan real estate advisory and housing decision guidance",
          provider: {
            "@type": "RealEstateAgent",
            name: "Agent Kammer",
            url: "https://www.agentkammer.com",
            areaServed: "New York City",
          },
          areaServed: {
            "@type": "City",
            name: "New York",
          },
          audience: landing.audience.map((item) => ({
            "@type": "Audience",
            audienceType: item,
          })),
          description: publicSummary(landing.summary),
          url: pageUrl,
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Agent Kammer",
              item: "https://www.agentkammer.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Decision Briefs",
              item: "https://www.agentkammer.com/services",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: landing.title,
              item: pageUrl,
            },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: questions.map((question) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: {
              "@type": "Answer",
              text: "Agent Kammer starts by clarifying what changed, whether action is actually needed, the constraints shaping the decision, and which next step protects the client best before showings or listings take over.",
            },
          })),
        },
      ]
    : undefined;

  usePageMetadata({
    title: landing?.title ?? "Services",
    description: landing ? publicSummary(landing.summary) : "Focused advisory pages for Agent Kammer.",
    path: pagePath,
    keywords: landing?.searchTerms.join(", "),
    structuredData,
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
        art={landing.art}
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

      <PageSection className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
        <SectionHeading
          eyebrow="Who It Helps"
          title={`${landing.navLabel} need a decision brief, not a generic search.`}
          description="The first step is understanding why the move, sale, purchase, or hold decision is being considered. From there, the work becomes narrower: decide whether anything should change, whether doing nothing is wise or dangerous, then decide what kind of change is worth pursuing."
        />
        <div className="border-y border-brand-border">
          {landing.audience.map((item, index) => (
            <div key={item} className="grid gap-3 border-b border-brand-border py-5 last:border-b-0 md:grid-cols-[52px_minmax(0,1fr)] md:gap-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-brand-cocoa">0{index + 1}</p>
              <p className="text-base leading-8 text-brand-navy">{item}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <section className="border-y border-brand-border bg-white">
        <PageSection>
          <SectionHeading
            eyebrow="Decision Questions"
            title="Before the market search starts, the first question is whether a market search should start at all."
            description="Agent Kammer uses the same core framework across every situation: trigger, desire, constraints, trade-offs, and recommendation. Sometimes the right recommendation is to move. Sometimes it is to do nothing. Sometimes doing nothing is the worst option."
          />
          <div className="mt-12 border-t border-brand-border">
            {questions.map((item, index) => (
              <div
                key={item}
                className="grid gap-3 border-b border-brand-border py-6 md:grid-cols-[72px_minmax(0,1fr)] md:gap-6"
              >
                <p className="text-[11px] uppercase tracking-[0.22em] text-brand-cocoa">0{index + 1}</p>
                <p className="max-w-4xl text-sm leading-7 text-brand-graphite lg:text-[15px]">{item}</p>
              </div>
            ))}
          </div>
        </PageSection>
      </section>

      <PageSection>
        <SectionHeading
          eyebrow="How The Brief Is Built"
          title="The brief becomes useful when it turns uncertainty into a clear recommendation."
          description="The goal is not to tour more property. The goal is to remove the wrong paths early, identify whether no action is viable, then spend attention only where the decision deserves it."
        />
        <div className="mt-12 grid gap-8 border-t border-brand-border pt-8 lg:grid-cols-3">
          {landing.considerations.map((item, index) => (
            <div key={item} className="border-t border-brand-border pt-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-brand-cocoa">Lens 0{index + 1}</p>
              <p className="mt-4 text-sm leading-7 text-brand-graphite lg:text-[15px]">{item}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <section className="border-y border-brand-border bg-brand-navy text-brand-ivory">
        <PageSection className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.24em] text-brand-brass">Decision Path</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[0.94] tracking-[-0.03em] text-brand-ivory">
              The recommendation may be to buy, sell, rent, wait, renew, renovate, refinance, rent the current home, or do nothing yet.
            </h2>
            <p className="mt-6 text-base leading-8 text-brand-ivory/72 lg:text-lg">
              That is the difference between guidance and a sales funnel. A good housing decision starts with the life change, then tests whether action is actually the right answer.
            </p>
          </div>
          <div className="grid gap-4">
            {["What changed?", "Is doing nothing smarter?", "What are the real options?", "Which option protects the client best?"].map((item, index) => (
              <div key={item} className="grid grid-cols-[3rem_minmax(0,1fr)] items-center gap-4 border border-brand-ivory/14 bg-brand-ivory/5 p-5">
                <span className="font-mono text-xs text-brand-brass">0{index + 1}</span>
                <span className="text-sm uppercase tracking-[0.14em] text-brand-ivory/82">{item}</span>
              </div>
            ))}
          </div>
        </PageSection>
      </section>

      <PageSection className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
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

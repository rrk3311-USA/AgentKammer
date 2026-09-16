import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { CTA } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { openDecisionAssistant } from "@/lib/decision-assistant";
import { serviceLandingMap } from "@/data/service-landings";

const howWeDecide = [
  { step: "01", title: "What's changing?", text: "Life event, pressure, or uncertainty - before neighborhoods or inventory." },
  { step: "02", title: "Should anything change?", text: "Sometimes the highest-value recommendation is to do nothing." },
  { step: "03", title: "Where do you belong?", text: "Even if you stay, is the environment still serving the life you want?" },
];

const featuredBriefSlugs = [
  "executive-relocation-nyc",
  "foreign-buyers-new-york",
  "empty-nester-downsizing-nyc",
] as const;

export default function Home() {
  usePageMetadata({
    title: "Agent Kammer | Live Where You Belong",
    description:
      "Live where you belong. Private housing guidance before the market gets loud. Stay, renovate, rent, buy, sell, or wait.",
    path: "/",
  });

  const featuredBriefs = featuredBriefSlugs
    .map((slug) => serviceLandingMap[slug])
    .filter(Boolean);

  return (
    <main className="bg-brand-ivory text-brand-ink">
      {/* 1 · Hero — belonging + soft handoff into the sticky advisor */}
      <section className="border-b border-brand-border bg-brand-ivory">
        <div className="mx-auto grid w-full max-w-site gap-0 px-6 py-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(340px,0.72fr)] lg:px-10">
          <div className="flex min-h-[480px] flex-col justify-start pb-20 pt-10 lg:min-h-[520px] lg:pr-16 lg:pt-16">
            <p className="text-[10px] uppercase tracking-[0.3em] text-brand-cocoa">Agent Kammer</p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.26em] text-brand-cocoa">Private Housing Advisory</p>
            <h1 className="mt-4 max-w-[12ch] font-display text-[clamp(3.4rem,6.4vw,6.8rem)] leading-[0.88] text-brand-navy">
              Live where you belong
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-brand-graphite">
              Private housing guidance. Local execution when needed. We start with life change, uncertainty, and trade-offs before buildings, neighborhoods, or listings.
            </p>
            <blockquote className="mt-8 max-w-xl border-l border-brand-stone pl-5">
              <p className="font-display text-[clamp(1.65rem,2.8vw,2.15rem)] leading-[1.15] tracking-[-0.02em] text-brand-navy">
                People do not wake up wanting to tour apartments. They wake up because life changed.
              </p>
            </blockquote>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
              <button
                type="button"
                onClick={openDecisionAssistant}
                className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-navy transition-colors hover:text-brand-navy-secondary"
              >
                Ask the Guidance Advisor
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>
              <Link
                href="/buyer-advisory"
                className="text-[11px] uppercase tracking-[0.16em] text-brand-graphite transition-colors hover:text-brand-navy"
              >
                Start Here
              </Link>
            </div>
          </div>
          <div className="relative min-h-[360px] overflow-hidden bg-brand-surface lg:min-h-[520px]">
            <img
              src="/images/how-we-think-terrace.jpg"
              alt="Manhattan skyline viewed from a high terrace at dusk"
              className="absolute inset-0 h-full w-full object-cover object-center saturate-[0.68] contrast-[0.98] brightness-[0.74]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/92 via-brand-navy/28 to-brand-navy/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/28 via-transparent to-brand-navy/12" />
            <div className="absolute inset-x-0 bottom-0 border-t border-brand-ivory/18 bg-brand-navy/50 p-6 text-brand-ivory backdrop-blur-[2px]">
              <p className="text-[10px] uppercase tracking-[0.24em] text-brand-stone">How We Think</p>
              <p className="mt-2 font-display text-3xl leading-none">Life first. Then the building.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · How we decide — compact */}
      <section className="border-b border-brand-border bg-white">
        <div className="mx-auto w-full max-w-site px-6 py-14 lg:px-10 lg:py-16">
          <div className="max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.26em] text-brand-cocoa">How We Decide</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,3.6vw,2.85rem)] leading-[0.94] text-brand-navy">
              Three questions. Then judgment.
            </h2>
          </div>
          <div className="mt-10 grid gap-8 border-t border-brand-border pt-8 md:grid-cols-3 md:gap-8">
            {howWeDecide.map((item) => (
              <article key={item.step}>
                <p className="text-[11px] uppercase tracking-[0.22em] text-brand-cocoa">{item.step}</p>
                <h3 className="mt-3 font-display text-2xl leading-none text-brand-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-brand-graphite">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3 · Start Here — one card, not a second journey list */}
      <section className="border-b border-brand-border bg-brand-ivory">
        <div className="mx-auto w-full max-w-site px-6 py-14 lg:px-10 lg:py-16">
          <article className="border border-brand-border bg-white px-6 py-8 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-10 lg:px-10 lg:py-10">
            <div className="max-w-2xl">
              <p className="text-[10px] uppercase tracking-[0.26em] text-brand-cocoa">Start Here</p>
              <h2 className="mt-3 font-display text-[clamp(2rem,3.6vw,2.85rem)] leading-[0.94] text-brand-navy">
                A clear path through the decision.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-brand-graphite">
                The journey map - not the diagnostic. Name what changed, then read the brief that matches. Strategy only when you want judgment.
              </p>
            </div>
            <Link
              href="/buyer-advisory"
              className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-navy transition-colors hover:text-brand-navy-secondary lg:mt-0"
            >
              Open Start Here
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </article>
        </div>
      </section>

      {/* 4 · Situations */}
      <section className="border-b border-brand-border bg-white">
        <div className="mx-auto w-full max-w-site px-6 py-14 lg:px-10 lg:py-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-[10px] uppercase tracking-[0.26em] text-brand-cocoa">Situations</p>
              <h2 className="mt-3 font-display text-[clamp(2rem,3.6vw,2.85rem)] leading-[0.94] text-brand-navy">
                Start from what changed.
              </h2>
            </div>
            <Link
              href="/situations#whats-changing"
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-navy transition-colors hover:text-brand-navy-secondary"
            >
              Explore situations
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="mt-8 border-t border-brand-border">
            {featuredBriefs.map((brief) => (
              <Link
                key={brief.slug}
                href={`/situations/${brief.slug}`}
                className="group grid gap-2 border-b border-brand-border py-6 transition-colors md:grid-cols-[minmax(0,0.35fr)_minmax(0,1fr)_auto] md:items-baseline md:gap-8"
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-brand-cocoa">{brief.eyebrow}</p>
                <div>
                  <p className="font-display text-2xl leading-none text-brand-navy transition-colors group-hover:text-brand-navy-secondary">
                    {brief.navLabel}
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-brand-graphite line-clamp-2">{brief.summary}</p>
                </div>
                <ArrowRight className="hidden h-4 w-4 text-brand-navy/40 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-navy md:block" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · Buildings teaser */}
      <section className="border-b border-brand-border bg-brand-navy text-brand-ivory">
        <div className="mx-auto grid w-full max-w-site gap-8 px-6 py-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:px-10 lg:py-16">
          <div>
            <p className="text-[10px] uppercase tracking-[0.26em] text-brand-stone">Buildings</p>
            <h2 className="mt-3 max-w-xl font-display text-[clamp(2rem,3.6vw,2.85rem)] leading-[0.94] text-brand-ivory">
              The asset before the listing.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-brand-ivory/74">
              Building Reports read quality, context, and fit - used only after the decision frame is clear.
            </p>
          </div>
          <Link
            href="/building-reports"
            className="group inline-flex items-center justify-between gap-6 border border-brand-ivory/20 px-5 py-4 text-[11px] uppercase tracking-[0.16em] text-brand-ivory transition-colors hover:border-brand-stone"
          >
            Open the library
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      {/* 6 · Guides — light teaser; full library stays in nav + footer */}
      <section className="border-b border-brand-border bg-brand-ivory">
        <div className="mx-auto flex w-full max-w-site flex-col gap-3 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p className="text-sm leading-7 text-brand-graphite">
            <span className="text-[10px] uppercase tracking-[0.22em] text-brand-cocoa">Guides</span>
            <span className="mt-2 block text-brand-navy">Structure before search - ownership, condo vs co-op, and related frameworks.</span>
          </p>
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-navy transition-colors hover:text-brand-navy-secondary"
          >
            Browse guides
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      {/* 7 · Quiet close */}
      <CTA
        title="When you want a human reply."
        description="Share what is changing. We will prescribe the right next step - Assessment, Snapshot, Report, or a quiet conversation."
        href="/contact"
        label="Request Intelligence"
        eyebrow="Request Intelligence"
      />
    </main>
  );
}

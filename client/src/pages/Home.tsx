import { Link } from "wouter";
import { ArrowRight, MoveRight } from "lucide-react";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { openDecisionAssistant } from "@/lib/decision-assistant";
import { serviceLandingMap } from "@/data/service-landings";

const howWeDecide = [
  { step: "01", title: "What's changing?", text: "Life event, pressure, or uncertainty — before neighborhoods or inventory." },
  { step: "02", title: "Should anything change?", text: "Sometimes the highest-value recommendation is to do nothing." },
  { step: "03", title: "Where do you belong?", text: "Even if you stay, is the environment still serving the life you want?" },
];

const featuredBriefSlugs = [
  "executive-relocation-nyc",
  "foreign-buyers-new-york",
  "empty-nester-downsizing-nyc",
  "rent-vs-buy-manhattan-relocation",
] as const;

export default function Home() {
  usePageMetadata({
    title: "Agent Kammer | Private Housing Advisory",
    description:
      "Private housing guidance before the market gets loud. Buildings before listings. Local execution when needed. Stay, renovate, rent, buy, sell, or wait.",
    path: "/",
  });

  const featuredBriefs = featuredBriefSlugs
    .map((slug) => serviceLandingMap[slug])
    .filter(Boolean);

  return (
    <main className="bg-brand-ivory text-brand-ink">
      {/* 1 · Hero */}
      <section className="border-b border-brand-border bg-brand-ivory">
        <div className="mx-auto grid w-full max-w-site gap-0 px-6 py-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(340px,0.72fr)] lg:px-10">
          <div className="flex min-h-[560px] flex-col justify-start pb-32 pt-10 lg:pr-16 lg:pt-16">
            <p className="text-[10px] uppercase tracking-[0.3em] text-brand-cocoa">Agent Kammer</p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.26em] text-brand-cocoa">Private Housing Advisory</p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-brand-brass/90">Buildings before listings.</p>
            <h1 className="mt-4 max-w-[12ch] font-display text-[clamp(3.4rem,6.4vw,6.8rem)] leading-[0.88] text-brand-navy">
              Start with what feels unclear.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-brand-graphite">
              Private housing guidance. Local execution when needed. We start with life change, uncertainty, and trade-offs before buildings, neighborhoods, or listings.
            </p>
            <blockquote className="mt-8 max-w-xl border-l border-brand-brass pl-5">
              <p className="font-display text-[clamp(1.65rem,2.8vw,2.15rem)] leading-[1.15] tracking-[-0.02em] text-brand-navy">
                People do not wake up wanting to tour apartments. They wake up because life changed.
              </p>
            </blockquote>
            <p className="mt-5 max-w-xl text-base leading-7 text-brand-graphite/82">
              The job here is to diagnose that change and guide the highest expected-value decision — even if that means doing nothing — then curate the right local professionals when a transaction is appropriate.
            </p>
            <div className="mt-7 flex flex-wrap items-stretch gap-3">
              <button
                type="button"
                onClick={openDecisionAssistant}
                className="ak-call-button group grid min-w-[19rem] px-5 py-4 text-left transition-colors"
              >
                <span className="text-[10px] uppercase tracking-[0.24em]">
                  <span className="text-brand-ivory/72">Guidance</span>{" "}
                  <span className="text-[#D7C29A]">Advisor</span>
                </span>
                <span className="mt-3 h-px w-full bg-brand-ivory/24" aria-hidden />
                <span className="mt-3 flex items-center justify-between font-display text-2xl leading-none text-brand-ivory">
                  Begin the decision
                  <MoveRight className="h-5 w-5 text-[#D7C29A] transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                </span>
              </button>
              <Link
                href="/building-reports"
                className="group grid min-w-[15rem] border border-brand-border bg-white/45 px-5 py-4 text-left transition-colors hover:border-brand-brass hover:bg-white"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-navy">Building Intelligence</span>
                <span className="mt-3 h-px w-full bg-brand-border" aria-hidden />
                <span className="mt-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-navy">
                  Explore Building Profiles
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
                </span>
              </Link>
            </div>
          </div>
          <div className="relative min-h-[420px] overflow-hidden bg-brand-surface lg:min-h-[640px]">
            <img
              src="/images/how-we-think-terrace.jpg"
              alt="Manhattan skyline viewed from a high terrace at dusk"
              className="absolute inset-0 h-full w-full object-cover object-center saturate-[0.68] contrast-[0.98] brightness-[0.74]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/92 via-brand-navy/28 to-brand-navy/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/28 via-transparent to-brand-navy/12" />
            <div className="absolute inset-x-0 bottom-0 border-t border-brand-ivory/18 bg-brand-navy/50 p-6 text-brand-ivory backdrop-blur-[2px]">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#D7C29A]">How We Think</p>
              <p className="mt-2 font-display text-3xl leading-none">Buildings, context, strategy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · Are you living where you belong? */}
      <section className="border-b border-brand-border bg-brand-ivory">
        <div className="mx-auto w-full max-w-site px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] uppercase tracking-[0.26em] text-brand-cocoa">The Diagnostic</p>
            <h2 className="mt-5 font-display text-[clamp(2.6rem,5vw,4.5rem)] leading-[0.92] text-brand-navy">
              Are you living where you belong?
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-brand-graphite">
              Most people have never been asked. A free assessment builds your Decision Profile — belonging score, friction, and a clear next step. Stay, renovate, rent, buy, sell, or wait.
            </p>
            <Link
              href="/belonging"
              className="mt-10 inline-flex items-center gap-3 border-b border-brand-brass pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-navy transition-colors hover:text-brand-brass"
            >
              Start your Decision Assessment
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3 · How we decide */}
      <section className="border-b border-brand-border bg-white">
        <div className="mx-auto w-full max-w-site px-6 py-20 lg:px-10 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.26em] text-brand-cocoa">How We Decide</p>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,4.5vw,3.75rem)] leading-[0.92] text-brand-navy">
              Three questions. Then judgment.
            </h2>
          </div>
          <div className="mt-14 grid gap-10 border-t border-brand-border pt-10 md:grid-cols-3 md:gap-8">
            {howWeDecide.map((item) => (
              <article key={item.step}>
                <p className="text-[11px] uppercase tracking-[0.22em] text-brand-brass">{item.step}</p>
                <h3 className="mt-4 font-display text-2xl leading-none text-brand-navy md:text-3xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-brand-graphite">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · Building Intelligence Library */}
      <section className="border-b border-brand-border bg-brand-navy text-brand-ivory">
        <div className="mx-auto grid w-full max-w-site gap-10 px-6 py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:px-10 lg:py-28">
          <div>
            <p className="text-[10px] uppercase tracking-[0.26em] text-brand-brass">Building Intelligence</p>
            <h2 className="mt-4 max-w-xl font-display text-[clamp(2.4rem,4.5vw,3.75rem)] leading-[0.92] text-brand-ivory">
              The asset before the listing.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-brand-ivory/74">
              A knowledge resource — Building Reports that read quality, context, and fit, not marketing copy. Used only after the decision frame is clear.
            </p>
          </div>
          <Link
            href="/building-reports"
            className="group inline-flex items-center justify-between gap-6 border border-brand-ivory/20 px-5 py-4 text-[11px] uppercase tracking-[0.16em] text-brand-ivory transition-colors hover:border-brand-brass"
          >
            Open the library
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      {/* 5 · Featured Decision Briefs */}
      <section className="border-b border-brand-border bg-brand-ivory">
        <div className="mx-auto w-full max-w-site px-6 py-20 lg:px-10 lg:py-28">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-[10px] uppercase tracking-[0.26em] text-brand-cocoa">What's Changing?</p>
              <h2 className="mt-4 font-display text-[clamp(2.4rem,4.5vw,3.75rem)] leading-[0.92] text-brand-navy">
                Start from what changed.
              </h2>
            </div>
            <Link
              href="/situations#whats-changing"
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-navy transition-colors hover:text-brand-brass"
            >
              Explore situations
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="mt-12 border-t border-brand-border">
            {featuredBriefs.map((brief) => (
              <Link
                key={brief.slug}
                href={`/situations/${brief.slug}`}
                className="group grid gap-2 border-b border-brand-border py-7 transition-colors md:grid-cols-[minmax(0,0.35fr)_minmax(0,1fr)_auto] md:items-baseline md:gap-8"
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-brand-cocoa">{brief.eyebrow}</p>
                <div>
                  <p className="font-display text-2xl leading-none text-brand-navy transition-colors group-hover:text-brand-brass md:text-3xl">
                    {brief.navLabel}
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-brand-graphite line-clamp-2">{brief.summary}</p>
                </div>
                <ArrowRight className="hidden h-4 w-4 text-brand-navy/40 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-brass md:block" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6 · Residential Advisory */}
      <section className="border-b border-brand-brass/30 bg-brand-navy text-brand-ivory">
        <div className="mx-auto flex w-full max-w-site flex-col gap-8 px-6 py-16 lg:flex-row lg:items-end lg:gap-10 lg:px-10 lg:py-20">
          <div className="min-w-0 max-w-3xl flex-1">
            <p className="text-[11px] uppercase tracking-[0.24em] text-brand-brass">Residential Advisory</p>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,4.8vw,4.25rem)] leading-[0.9] text-brand-ivory">
              Find out if you’re living where you belong.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-brand-ivory/76">
              The assessment is the front door — not a valuation form. When a Housing Strategy Session is warranted, we already know your Decision Profile.
            </p>
          </div>
          <Link
            href="/belonging"
            className="ak-call-button inline-flex w-full shrink-0 items-center justify-between gap-8 self-start px-5 py-4 text-[11px] uppercase tracking-[0.16em] sm:w-auto lg:mb-1 lg:self-end"
          >
            Start Assessment
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>
      </section>
    </main>
  );
}

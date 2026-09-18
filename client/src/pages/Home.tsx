import { Link } from "wouter";
import { ArrowRight, MoveRight } from "lucide-react";
import { CTA } from "@/components/site-shell";
import { DecisionFramework } from "@/components/DecisionFramework";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { openDecisionAssistant } from "@/lib/decision-assistant";
import { serviceLandingMap } from "@/data/service-landings";
import { publicGuides } from "@/data/guides";

const howWeDecide = [
  { step: "01", title: "What's changing?", text: "Name the life event, pressure, or uncertainty. Neighborhoods and inventory come later." },
  { step: "02", title: "Should anything change?", text: "Sometimes the highest-value recommendation is to do nothing." },
  { step: "03", title: "Where do you belong?", text: "Even if you stay, is the environment still serving the life you want?" },
];

const startHere = [
  { step: "01", title: "What's Changing?", text: "Name the life change (relocation, family, uncertainty) before listings take over." },
  { step: "02", title: "Situation Assessment", text: "The diagnostic. Belonging, friction, and whether anything should change at all." },
  { step: "03", title: "Read the brief", text: "The editorial that matches your situation. Clarity before inventory." },
  { step: "04", title: "Strategy when you want judgment", text: "A Strategy Session and a written next step. Not a listing tour." },
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
      "Private housing guidance before the market gets loud. Local execution when needed. Stay, renovate, rent, buy, sell, or wait.",
    path: "/",
  });

  const featuredBriefs = featuredBriefSlugs
    .map((slug) => serviceLandingMap[slug])
    .filter(Boolean);
  const featuredGuides = publicGuides.slice(0, 4);

  return (
    <main className="bg-brand-ivory text-brand-ink">
      {/* Editorial · Hero */}
      <section className="border-b border-brand-border bg-brand-ivory">
        <div className="mx-auto grid w-full max-w-site gap-0 px-6 py-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(340px,0.72fr)] lg:px-10">
          <div className="flex min-h-[560px] flex-col justify-start pb-32 pt-10 lg:pr-16 lg:pt-16">
            <p className="text-[11px] uppercase tracking-[0.28em] text-brand-cocoa">Agent Kammer</p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.26em] text-brand-cocoa">Private Housing Advisory</p>
            <h1 className="mt-4 max-w-[12ch] font-display text-[clamp(3.25rem,6vw,4.5rem)] leading-[0.92] text-brand-navy">
              Live where you belong
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-8 text-brand-graphite">
              Private housing guidance. Local execution when needed. We start with life change, uncertainty, and trade-offs before buildings, neighborhoods, or listings.
            </p>
            <blockquote className="mt-8 max-w-xl border-l border-brand-stone pl-5">
              <p className="font-display text-[clamp(1.75rem,2.4vw,2rem)] leading-[1.2] tracking-[-0.02em] text-brand-navy">
                People do not wake up wanting to tour apartments. They wake up because life changed.
              </p>
            </blockquote>
            <p className="mt-5 max-w-xl text-base leading-7 text-brand-graphite/82">
              The job here is to diagnose that change and recommend the highest expected-value decision, even if that means doing nothing. When a transaction is appropriate, we introduce the right local professionals.
            </p>
            <div className="mt-7">
              <button
                type="button"
                onClick={openDecisionAssistant}
                className="ak-call-button group grid min-w-[19rem] rounded-button px-5 py-4 text-left transition-colors"
              >
                <span className="text-[11px] uppercase tracking-[0.24em]">
                  <span className="text-brand-ivory/72">Guidance</span>{" "}
                  <span className="text-brand-stone">Advisor</span>
                </span>
                <span className="mt-3 h-px w-full bg-brand-ivory/24" aria-hidden />
                <span className="mt-3 flex items-center justify-between text-[14px] font-semibold uppercase tracking-[0.12em] text-brand-ivory">
                  Ask what's changing
                  <MoveRight className="h-4 w-4 text-brand-stone transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                </span>
              </button>
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
              <p className="text-[11px] uppercase tracking-[0.24em] text-brand-stone">How We Think</p>
              <p className="mt-2 font-display text-[1.85rem] leading-none">Buildings, context, strategy.</p>
            </div>
          </div>
        </div>
      </section>

      <DecisionFramework
        eyebrow="How We Decide"
        title="Three questions. Then judgment."
        description="Neighborhoods and inventory come later."
        items={howWeDecide}
      />

      <DecisionFramework
        eyebrow="Start Here"
        title="A clear path through the decision."
        description="Four steps. No overlap. This is the path. It is not the diagnostic, the brief, or the paid session."
        items={startHere}
        action={
          <Link
            href="/buyer-advisory"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-navy transition-colors hover:text-brand-navy-secondary"
          >
            Open Start Here
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        }
      />

      {/* Editorial · Situations (same grammar as Structure, not a fourth type) */}
      <section className="border-b border-brand-border bg-brand-ivory">
        <div className="mx-auto w-full max-w-site px-6 py-20 lg:px-10 lg:py-24">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.26em] text-brand-cocoa">Situations</p>
              <h2 className="mt-4 font-display text-[clamp(2.25rem,4vw,2.75rem)] leading-[1.02] text-brand-navy">
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
          <div className="mt-12 grid gap-px bg-brand-border sm:grid-cols-2">
            {featuredBriefs.map((brief) => (
              <Link
                key={brief.slug}
                href={`/situations/${brief.slug}`}
                className="group bg-brand-ivory p-7 transition-colors hover:bg-white"
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-brand-cocoa">{brief.eyebrow}</p>
                <p className="mt-3 font-display text-[1.65rem] leading-none text-brand-navy transition-colors group-hover:text-brand-navy-secondary">
                  {brief.navLabel}
                </p>
                <p className="mt-3 text-base leading-7 text-brand-graphite line-clamp-2">{brief.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Dark Statement · The asset before the listing */}
      <section className="border-b border-brand-border bg-brand-navy text-brand-ivory">
        <div className="mx-auto grid w-full max-w-site gap-10 px-6 py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:px-10 lg:py-24">
          <div>
            <p className="text-[11px] uppercase tracking-[0.26em] text-brand-stone">Buildings</p>
            <h2 className="mt-4 max-w-xl font-display text-[clamp(2.25rem,4vw,2.75rem)] leading-[1.02] text-brand-ivory">
              The asset before the listing.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-brand-ivory/74 lg:text-[17px]">
              Building Reports read quality, context, and fit, not marketing copy. We use them only after the decision frame is clear.
            </p>
          </div>
          <Link
            href="/building-reports"
            className="group inline-flex items-center justify-between gap-6 rounded-button border border-brand-ivory/20 px-5 py-4 text-[11px] uppercase tracking-[0.16em] text-brand-ivory transition-colors hover:border-brand-stone"
          >
            Open the library
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      {/* Editorial · Structure before search */}
      <section className="border-b border-brand-border bg-brand-ivory">
        <div className="mx-auto w-full max-w-site px-6 py-20 lg:px-10 lg:py-24">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.26em] text-brand-cocoa">Guides</p>
              <h2 className="mt-4 font-display text-[clamp(2.25rem,4vw,2.75rem)] leading-[1.02] text-brand-navy">
                Structure before search.
              </h2>
            </div>
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-navy transition-colors hover:text-brand-navy-secondary"
            >
              Browse guides
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="mt-12 grid gap-px bg-brand-border sm:grid-cols-2">
            {featuredGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group bg-brand-ivory p-7 transition-colors hover:bg-white"
              >
                <p className="font-display text-[1.65rem] leading-none text-brand-navy">{guide.title}</p>
                <p className="mt-3 text-base leading-7 text-brand-graphite line-clamp-2">{guide.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-brand-navy">
                  Open guide
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="When you want a human reply."
        description="The homepage starts with Guidance. Write only if a Situation Assessment, Property Assessment, or Strategy Session is already the right next step."
        href="/contact"
        label="Write"
        eyebrow="Contact"
      />
    </main>
  );
}

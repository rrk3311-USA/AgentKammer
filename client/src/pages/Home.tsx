import { Link } from "wouter";
import { ArrowRight, MoveRight } from "lucide-react";
import { CTA } from "@/components/site-shell";
import { DecisionFramework } from "@/components/DecisionFramework";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { serviceLandingMap } from "@/data/service-landings";

const howWeDecide = [
  { step: "01", title: "What's changing?", text: "Name the life event, pressure, or uncertainty. Neighborhoods and inventory come later." },
  { step: "02", title: "Should anything change?", text: "Sometimes the highest-value recommendation is to do nothing." },
  { step: "03", title: "Where do you belong?", text: "Even if you stay, is the environment still serving the life you want?" },
];

const featuredBriefSlugs = [
  "executive-relocation-nyc",
  "foreign-buyers-new-york",
  "new-baby-growing-family-nyc",
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

  return (
    <main className="bg-brand-ivory text-brand-ink">
      <section className="border-b border-brand-border bg-brand-ivory">
        <div className="mx-auto grid w-full max-w-site gap-0 px-6 py-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(340px,0.72fr)] lg:px-10">
          <div className="flex min-h-[560px] flex-col justify-start pb-32 pt-10 lg:pr-16 lg:pt-16">
            <p className="text-[11px] uppercase tracking-[0.28em] text-brand-cocoa">
              Agent Kammer · Private Housing Advisory
            </p>
            <h1 className="mt-4 max-w-[12ch] font-display text-[clamp(3.25rem,6vw,4.5rem)] leading-[0.92] text-brand-navy">
              Live where
              <br />
              you belong
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-8 text-brand-graphite">
              Private housing guidance before the market gets loud.
            </p>
            <blockquote className="mt-8 max-w-xl border-l border-brand-stone pl-5">
              <p className="font-display text-[clamp(1.75rem,2.4vw,2rem)] leading-[1.2] tracking-[-0.02em] text-brand-navy">
                People do not wake up wanting to tour apartments. They wake up because life changed.
              </p>
            </blockquote>
            <div className="mt-8">
              <Link
                href="/situations"
                className="ak-call-button group inline-flex min-w-[19rem] items-center justify-between gap-6 rounded-button px-5 py-4 text-[14px] font-semibold uppercase tracking-[0.12em] text-brand-ivory transition-colors"
              >
                What's changing
                <MoveRight className="h-4 w-4 text-brand-stone transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
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
              <p className="text-[11px] uppercase tracking-[0.24em] text-brand-stone">How We Think</p>
              <p className="mt-2 font-display text-[1.85rem] leading-none">Buildings, context, strategy.</p>
            </div>
          </div>
        </div>
      </section>

      <DecisionFramework
        eyebrow="How We Decide"
        title="Three questions. Then judgment."
        items={howWeDecide}
      />

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
              href="/situations"
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-navy transition-colors hover:text-brand-navy-secondary"
            >
              Start Here
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="mt-12 grid gap-px bg-brand-border sm:grid-cols-3">
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

      <CTA
        title="When you want a human reply."
        description="The homepage starts with Guidance. Write only if a Situation Assessment, Property Assessment, or Livability Score is already the right next step."
        href="/contact"
        label="Contact"
        eyebrow="Contact"
      />
    </main>
  );
}

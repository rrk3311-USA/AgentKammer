import { Link } from "wouter";
import { ArrowRight, MoveRight } from "lucide-react";
import { CTA } from "@/components/site-shell";
import { DecisionFramework } from "@/components/DecisionFramework";
import { grammar } from "@/components/visual-grammar";
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
        <div className="mx-auto grid w-full max-w-site gap-8 px-5 py-6 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(340px,0.72fr)] lg:gap-0 lg:px-10">
          <div className="flex flex-col justify-start pt-2 lg:min-h-[560px] lg:pb-24 lg:pr-16 lg:pt-16">
            <p className={grammar.eyebrow}>
              <span className="block sm:inline">Agent Kammer</span>
              <span className="hidden sm:inline"> · </span>
              <span className="mt-1 block sm:mt-0 sm:inline">Private Housing Advisory</span>
            </p>
            <h1 className={`mt-3 max-w-[12ch] lg:mt-4 ${grammar.display}`}>
              Live where
              <br />
              you belong
            </h1>
            <p className={`mt-4 lg:mt-6 ${grammar.body}`}>
              Private housing guidance before the market gets loud.
            </p>
            <blockquote className="mt-5 max-w-xl border-l border-brand-stone pl-4 lg:mt-8 lg:pl-5">
              <p className={grammar.quote}>
                People do not wake up wanting to tour apartments. They wake up because life changed.
              </p>
            </blockquote>
            <div className="mt-6 lg:mt-8">
              <Link
                href="/situations"
                className="ak-call-button group inline-flex w-full items-center justify-between gap-4 rounded-button px-5 py-4 text-[14px] font-semibold uppercase tracking-[0.12em] text-brand-ivory transition-colors sm:w-auto sm:min-w-[19rem] sm:gap-6"
              >
                What's changing
                <MoveRight className="h-4 w-4 text-brand-stone transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
          <div className="relative -mx-5 min-h-[17.5rem] overflow-hidden bg-brand-surface sm:-mx-6 sm:min-h-[22rem] lg:mx-0 lg:min-h-[640px]">
            <img
              src="/images/how-we-think-terrace.jpg"
              alt="Manhattan skyline viewed from a high terrace at dusk"
              className="absolute inset-0 h-full w-full object-cover object-center saturate-[0.68] contrast-[0.98] brightness-[0.74]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/92 via-brand-navy/28 to-brand-navy/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/28 via-transparent to-brand-navy/12" />
            <div className="absolute inset-x-0 bottom-0 border-t border-brand-ivory/18 bg-brand-navy/50 px-5 py-4 text-brand-ivory backdrop-blur-[2px] sm:p-6">
              <p className="text-[11px] uppercase tracking-[0.24em] text-brand-stone">How We Think</p>
              <p className="mt-1.5 font-display text-[1.45rem] leading-none sm:mt-2 sm:text-[1.85rem]">Buildings, context, strategy.</p>
            </div>
          </div>
        </div>
      </section>

      <DecisionFramework
        eyebrow="How We Decide"
        title="Three questions. Then judgment."
        items={howWeDecide}
      />

      <section className="border-b border-brand-border bg-brand-navy/[0.05]">
        <div className={grammar.pad}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div className="max-w-2xl">
              <p className={grammar.eyebrow}>Situations</p>
              <h2 className={`mt-3 lg:mt-4 ${grammar.section}`}>
                Start from what changed.
              </h2>
            </div>
            <Link
              href="/situations"
              className={grammar.textLink}
            >
              Start Here
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="ak-felt-grid mt-8 grid sm:mt-12 sm:grid-cols-3">
            {featuredBriefs.map((brief) => (
              <Link
                key={brief.slug}
                href={`/situations/${brief.slug}`}
                className="ak-felt-item group p-5 sm:p-7"
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-brand-cocoa">{brief.eyebrow}</p>
                <p className={`mt-3 ${grammar.rowTitle} transition-colors group-hover:text-brand-navy-secondary`}>
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

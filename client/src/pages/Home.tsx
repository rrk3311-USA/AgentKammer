import { Link } from "wouter";
import { ArrowRight, MoveRight } from "lucide-react";
import { CTA } from "@/components/site-shell";
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
    <main className="bg-brand-field text-brand-navy">
      <section className="border-b border-brand-border bg-brand-paper text-brand-ink">
        <div className="mx-auto grid w-full max-w-site gap-10 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)] lg:items-end lg:px-10 lg:py-20">
          <div className="max-w-2xl">
            <p className="ak-kicker">Private Housing Advisory</p>
            <div className="ak-title-band mt-4">
              <h1 className="ak-display">Live where you belong</h1>
            </div>
            <p className="ak-lede mt-6">
              Private housing guidance. Local execution when needed. We start with life change, uncertainty, and trade-offs before neighborhoods or listings.
            </p>
            <blockquote className="mt-8 border-l border-brand-border pl-5">
              <p className="ak-title">
                People do not wake up wanting to tour apartments. They wake up because life changed.
              </p>
            </blockquote>
            <p className="ak-copy mt-5 max-w-xl">
              The job here is to diagnose that change and recommend the highest expected-value decision, even if that means doing nothing. When a transaction is appropriate, we introduce the right local professionals.
            </p>
            <div className="mt-8">
              <button
                type="button"
                onClick={openDecisionAssistant}
                className="ak-call-button group grid min-w-[19rem] px-5 py-4 text-left transition-colors"
              >
                <span className="ak-nav-link text-brand-navy/70">Guidance Advisor</span>
                <span className="mt-3 h-px w-full bg-brand-navy/20" aria-hidden />
                <span className="mt-3 flex items-center justify-between font-display text-2xl leading-none text-brand-navy">
                  Ask what's changing
                  <MoveRight className="h-5 w-5 text-brand-navy transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                </span>
              </button>
            </div>
          </div>
          <div className="relative min-h-[280px] overflow-hidden border border-brand-border lg:min-h-[420px]">
            <img
              src="/images/how-we-think-terrace.jpg"
              alt="Manhattan skyline viewed from a high terrace at dusk"
              className="absolute inset-0 h-full w-full object-cover object-center saturate-[0.62] contrast-[0.96] brightness-[0.82]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="ak-kicker">How we think</p>
              <p className="ak-heading mt-2">Life first. Then place.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-brand-border bg-brand-field">
        <div className="mx-auto w-full max-w-site px-6 py-16 lg:px-10 lg:py-20">
          <p className="ak-kicker">How We Decide</p>
          <div className="ak-title-band mt-4">
            <h2 className="ak-title max-w-2xl">Three questions. Then judgment.</h2>
          </div>
          <div className="mt-12 grid gap-10 border-t border-brand-border pt-10 md:grid-cols-3 md:gap-8">
            {howWeDecide.map((item) => (
              <article key={item.step}>
                <p className="ak-kicker">{item.step}</p>
                <h3 className="ak-heading mt-3">{item.title}</h3>
                <p className="ak-meta mt-3">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-brand-border bg-brand-field">
        <div className="mx-auto w-full max-w-site px-6 py-16 lg:px-10 lg:py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="ak-kicker">Start Here</p>
              <div className="ak-title-band mt-4">
                <h2 className="ak-title">A clear path through the decision.</h2>
              </div>
              <p className="ak-lede mt-5 max-w-xl">
                Four steps, no overlap. This is the path. It is not the diagnostic, the brief, or the paid session.
              </p>
            </div>
            <Link
              href="/buyer-advisory"
              className="ak-nav-link inline-flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              Open Start Here
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="mt-10 border-t border-brand-border">
            {startHere.map((item) => (
              <article
                key={item.step}
                className="grid gap-2 border-b border-brand-border py-6 md:grid-cols-[80px_minmax(0,1fr)] md:items-baseline md:gap-8"
              >
                <p className="ak-kicker">{item.step}</p>
                <div>
                  <p className="ak-heading">{item.title}</p>
                  <p className="ak-meta mt-2 max-w-2xl">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-brand-border bg-brand-field">
        <div className="mx-auto w-full max-w-site px-6 py-16 lg:px-10 lg:py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="ak-kicker">Situations</p>
              <div className="ak-title-band mt-4">
                <h2 className="ak-title">Start from what changed.</h2>
              </div>
            </div>
            <Link
              href="/situations#whats-changing"
              className="ak-nav-link inline-flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              Explore situations
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="mt-10 border-t border-brand-border">
            {featuredBriefs.map((brief) => (
              <Link
                key={brief.slug}
                href={`/situations/${brief.slug}`}
                className="group grid gap-2 border-b border-brand-border py-6 transition-opacity md:grid-cols-[minmax(0,0.35fr)_minmax(0,1fr)_auto] md:items-baseline md:gap-8"
              >
                <p className="ak-kicker">{brief.eyebrow}</p>
                <div>
                  <p className="ak-heading group-hover:opacity-80">{brief.navLabel}</p>
                  <p className="ak-meta mt-2 max-w-2xl line-clamp-2">{brief.summary}</p>
                </div>
                <ArrowRight className="hidden h-4 w-4 text-brand-navy/40 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-navy md:block" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-brand-border bg-brand-field">
        <div className="mx-auto w-full max-w-site px-6 py-16 lg:px-10 lg:py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="ak-kicker">Guides</p>
              <div className="ak-title-band mt-4">
                <h2 className="ak-title">Structure before search.</h2>
              </div>
            </div>
            <Link
              href="/guides"
              className="ak-nav-link inline-flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              Browse guides
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {featuredGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="ak-card group p-6 transition-opacity hover:opacity-90"
              >
                <p className="ak-heading">{guide.title}</p>
                <p className="ak-meta mt-3 line-clamp-2">{guide.description}</p>
                <span className="ak-nav-link mt-5 inline-flex items-center gap-2">
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

import { Link } from "wouter";
import { ArrowRight, MoveRight } from "lucide-react";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { KAMMER_VERDICTS, PUBLIC_PRODUCTS } from "@/data/public-menu";

const profileDimensions = [
  {
    label: "Fit verdict",
    text: `${KAMMER_VERDICTS.join(", ")}. How well this life and place still fit. A verdict, not a /100 score.`,
  },
  {
    label: "WHO",
    text: "Who the home is for now: household, rhythm, privacy, and the life that has to work here.",
  },
  {
    label: "Decision Readiness",
    text: "Whether you have enough clarity to act, or whether more diagnosis still protects you.",
  },
  {
    label: "Lifestyle Fit",
    text: "Routine, space, privacy, commute, and environment: what serves you and what drains you.",
  },
  {
    label: "Financial Flexibility",
    text: "How much room you have to wait, renovate, relocate, or hold, without a hard sell frame.",
  },
  {
    label: "Recommended Next Step",
    text: "A personalized recommendation, including whether to stay, wait, renovate, rent, buy, or sell, with the reasoning behind it.",
  },
];

export default function Belonging() {
  usePageMetadata({
    title: `${PUBLIC_PRODUCTS.situation.label} | Are You Living Where You Belong?`,
    description:
      "Take the Situation Assessment. Receive an Agent Kammer profile: fit verdict, WHO, readiness, lifestyle fit, timing, and a reasoned next step.",
    path: "/belonging",
  });

  return (
    <main className="bg-brand-paper text-brand-ink">
      <section className="border-b border-brand-border">
        <div className="mx-auto max-w-site px-6 py-16 lg:px-10 lg:py-24">
          <p className="ak-kicker">{PUBLIC_PRODUCTS.situation.label}</p>
          <div className="ak-title-band mt-4">
            <h1 className="ak-display max-w-4xl">
              Find out if you’re living where you belong.
            </h1>
          </div>
          <p className="ak-lede mt-6 max-w-2xl">
            A guided life diagnostic about your life, priorities, and housing, not listings. Your responses help tailor your profile and determine whether a Strategy Session would add value.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/contact?intent=situation"
              className="ak-call-button group grid min-w-[18rem] px-5 py-4 text-left transition-colors"
            >
              <span className="ak-nav-link text-brand-navy/70">Start Assessment</span>
              <span className="mt-3 h-px w-full bg-brand-navy/20" aria-hidden />
              <span className="mt-3 flex items-center justify-between font-display text-2xl leading-none text-brand-navy">
                Begin
                <MoveRight className="h-5 w-5 text-[#D7C29A] transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </span>
            </Link>
            <Link
              href="/contact?intent=strategy"
              className="inline-flex items-center gap-2 border border-brand-border bg-white/50 px-5 py-4 text-[11px] uppercase tracking-[0.16em] text-brand-navy transition-colors hover:border-brand-brass"
            >
              Prefer a Strategy Session first
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
          <p className="mt-6 max-w-xl text-sm leading-7 text-brand-graphite/80">
            The scored profile is in active build. Requesting the assessment today opens a private intake so your Agent Kammer profile can be prepared manually. Same diagnostic, human-paced. Public language stays Pick, Consider, Wait, Pass, and WHO. Not a /100 score.
          </p>
        </div>
      </section>

      <section className="border-b border-brand-border bg-brand-paper">
        <div className="mx-auto max-w-site px-6 py-16 lg:px-10 lg:py-20">
          <p className="ak-kicker">What You Receive</p>
          <h2 className="ak-title mt-4 max-w-2xl">
            Your situation profile
          </h2>
          <p className="ak-lede mt-5 max-w-2xl">
            Fit verdict and WHO are the show language: something you can revisit as life changes, not a one-time quiz result.
          </p>
          <div className="mt-12 grid gap-10 border-t border-brand-border pt-10 sm:grid-cols-2 lg:grid-cols-3">
            {profileDimensions.map((item) => (
              <article key={item.label}>
                <p className="ak-kicker">{item.label}</p>
                <p className="ak-meta mt-4">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-brand-border bg-brand-paper">
        <div className="mx-auto flex max-w-site flex-col gap-8 px-6 py-16 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:py-20">
          <div className="max-w-2xl">
            <p className="ak-kicker">Not a valuation</p>
            <h2 className="ak-title mt-4">
              Diagnose before you decide.
            </h2>
            <p className="ak-lede mt-5">
              Live Where You Belong is the outcome: stay or move. This Situation Assessment is the diagnostic that gets you there. People don’t take a real estate quiz; they receive an Agent Kammer profile.
            </p>
          </div>
          <Link
            href="/contact?intent=situation"
            className="ak-call-button inline-flex shrink-0 items-center justify-between gap-8 px-5 py-4 text-[11px] uppercase tracking-[0.16em]"
          >
            Start Assessment
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>
      </section>
    </main>
  );
}

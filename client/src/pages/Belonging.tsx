import { Link } from "wouter";
import { ArrowRight, MoveRight } from "lucide-react";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const profileDimensions = [
  {
    label: "Belonging Score",
    text: "How well your current home and place fit the life you want — one signal inside a larger profile.",
  },
  {
    label: "Decision Readiness",
    text: "Whether you have enough clarity to act, or whether more diagnosis still protects you.",
  },
  {
    label: "Lifestyle Fit",
    text: "Routine, space, privacy, commute, and environment — what serves you and what drains you.",
  },
  {
    label: "Financial Flexibility",
    text: "How much room you have to wait, renovate, relocate, or hold — without a hard sell frame.",
  },
  {
    label: "Timing Outlook",
    text: "Whether the next months favor action, patience, or a staged path.",
  },
  {
    label: "Recommended Next Step",
    text: "A personalized recommendation — including whether to stay, wait, renovate, rent, buy, or sell — with the reasoning behind it.",
  },
];

export default function Belonging() {
  usePageMetadata({
    title: "Housing Decision Assessment | Are You Living Where You Belong?",
    description:
      "Take the Housing Decision Assessment. Receive an Agent Kammer Decision Profile — belonging, readiness, lifestyle fit, timing, and a reasoned next step.",
    path: "/belonging",
  });

  return (
    <main className="bg-brand-ivory text-brand-ink">
      <section className="border-b border-brand-border">
        <div className="mx-auto max-w-site px-6 py-16 lg:px-10 lg:py-24">
          <p className="text-[10px] uppercase tracking-[0.26em] text-brand-cocoa">Housing Decision Assessment</p>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.8rem,5.5vw,5.25rem)] leading-[0.9] text-brand-navy">
            Find out if you’re living where you belong.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-brand-graphite">
            A guided assessment about your life, priorities, and housing—not listings. Your responses help tailor your Decision Profile and determine whether a Housing Strategy Session would add value.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/contact?intent=belonging"
              className="ak-call-button group grid min-w-[18rem] px-5 py-4 text-left transition-colors"
            >
              <span className="text-[10px] uppercase tracking-[0.24em]">
                <span className="text-brand-ivory/72">Start</span>{" "}
                <span className="text-[#D7C29A]">Assessment</span>
              </span>
              <span className="mt-3 h-px w-full bg-brand-ivory/24" aria-hidden />
              <span className="mt-3 flex items-center justify-between font-display text-2xl leading-none text-brand-ivory">
                Begin
                <MoveRight className="h-5 w-5 text-[#D7C29A] transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-brand-border bg-white/50 px-5 py-4 text-[11px] uppercase tracking-[0.16em] text-brand-navy transition-colors hover:border-brand-brass"
            >
              Prefer a Housing Strategy Session first
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
          <p className="mt-6 max-w-xl text-sm leading-7 text-brand-graphite/80">
            The scored profile is in active build. Requesting the assessment today opens a private intake so your Agent Kammer Decision Profile can be prepared manually — same diagnostic, human-paced.
          </p>
        </div>
      </section>

      <section className="border-b border-brand-border bg-white">
        <div className="mx-auto max-w-site px-6 py-16 lg:px-10 lg:py-20">
          <p className="text-[10px] uppercase tracking-[0.26em] text-brand-cocoa">What You Receive</p>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[0.94] text-brand-navy">
            Your Decision Profile
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-brand-graphite">
            Belonging Score is one piece of a larger profile — something you can revisit and update as life changes, not a one-time quiz result.
          </p>
          <div className="mt-12 grid gap-10 border-t border-brand-border pt-10 sm:grid-cols-2 lg:grid-cols-3">
            {profileDimensions.map((item) => (
              <article key={item.label}>
                <p className="text-[11px] uppercase tracking-[0.18em] text-brand-brass">{item.label}</p>
                <p className="mt-4 text-sm leading-7 text-brand-graphite">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-navy text-brand-ivory">
        <div className="mx-auto flex max-w-site flex-col gap-8 px-6 py-16 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.24em] text-brand-brass">Not a valuation</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[0.94]">
              Diagnose before you decide.
            </h2>
            <p className="mt-5 text-base leading-8 text-brand-ivory/74">
              Live Where You Belong is the outcome — stay or move. This Housing Decision Assessment is the diagnostic that gets you there. People don’t take a real estate quiz; they receive an Agent Kammer Decision Profile.
            </p>
          </div>
          <Link
            href="/contact?intent=belonging"
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

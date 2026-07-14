import { Link } from "wouter";
import {
  ArrowRight,
  MoveRight,
} from "lucide-react";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { openDecisionAssistant } from "@/lib/decision-assistant";

const educationBlocks = [
  {
    title: "Your Situation",
    text: "Start with what changed in the household, career, balance sheet, or building need before looking at inventory.",
  },
  {
    title: "Analysis",
    text: "Avoid over-indexing on listings, amenities, or urgency before the decision model is clear.",
  },
  {
    title: "Housing Intelligence",
    text: "Study building quality, resale friction, financing constraints, timing pressure, and neighborhood fit together.",
  },
  {
    title: "Recommendation",
    text: "Tell the client what to do, even when the strongest recommendation is to wait, renew, renovate, or do nothing.",
  },
];

export default function Home() {
  usePageMetadata({
    title: "Agent Kammer | Housing Decision Operating System",
    description:
      "Agent Kammer helps people diagnose life changes, understand Manhattan buildings, and make sharper housing decisions before listings or showings.",
            path: "/",
  });

  return (
    <main className="bg-brand-ivory text-brand-ink">
      <section className="border-b border-brand-border bg-brand-ivory">
        <div className="mx-auto grid w-full max-w-site gap-0 px-6 py-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(340px,0.72fr)] lg:px-10">
          <div className="flex min-h-[560px] flex-col justify-start pb-32 pt-10 lg:pr-16 lg:pt-16">
            <p className="text-[10px] uppercase tracking-[0.3em] text-brand-cocoa">Agent Kammer</p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.26em] text-brand-cocoa">Housing Decision Operating System</p>
            <h1 className="mt-4 max-w-[11ch] font-display text-[clamp(3.4rem,6.4vw,6.8rem)] leading-[0.88] text-brand-navy">
              Is it better to do nothing?
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-brand-graphite">
              Nobody wakes up knowing whether to buy, sell, rent, wait, renew, renovate, or stay put. Agent Kammer diagnoses what changed and tells you what to do, even when the right answer is nothing.
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-brand-graphite/82">
              Sometimes doing nothing is the smartest move. Sometimes it is the most expensive mistake.
            </p>
            <div className="mt-7 flex flex-wrap items-stretch gap-3">
              <button
                type="button"
                onClick={openDecisionAssistant}
                className="ak-call-button group grid min-w-[19rem] px-5 py-4 text-left transition-colors"
              >
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#D7C29A]">Guidance Captain</span>
                <span className="mt-3 h-px w-full bg-brand-ivory/24" aria-hidden />
                <span className="mt-3 flex items-center justify-between font-display text-2xl leading-none text-brand-ivory">
                  Find out what to do
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
                  Explore Building Intelligence
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
                </span>
              </Link>
            </div>
          </div>
          <div className="relative min-h-[420px] overflow-hidden bg-brand-surface lg:min-h-[640px]">
            <img
              src="/buildings/one-high-line-06.webp"
              alt="Architectural material detail inside a Manhattan residential building"
              className="absolute inset-0 h-full w-full object-cover object-center saturate-[0.22] contrast-[0.96] brightness-[0.92]"
            />
            <div className="absolute inset-0 bg-brand-ivory/10" />
            <div className="absolute inset-x-0 bottom-0 border-t border-brand-ivory/20 bg-brand-navy/78 p-6 text-brand-ivory backdrop-blur-sm">
              <p className="text-[10px] uppercase tracking-[0.24em] text-brand-brass">How We Think</p>
              <p className="mt-2 font-display text-3xl leading-none">Buildings, context, strategy.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-brand-border bg-brand-ivory text-brand-ink">
        <div className="mx-auto flex w-full max-w-site flex-col gap-4 px-6 py-6 lg:px-10">
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
            <p className="text-[10px] uppercase tracking-[0.26em] text-brand-cocoa">Building Intelligence</p>
            <p className="text-[11px] uppercase tracking-[0.18em] text-brand-graphite">ICC Commercial Building Inspector</p>
            <p className="text-[11px] uppercase tracking-[0.18em] text-brand-graphite">Blueprint Reading</p>
            <p className="text-[11px] uppercase tracking-[0.18em] text-brand-graphite">OSHA 30</p>
            <p className="text-[11px] uppercase tracking-[0.18em] text-brand-graphite">NYS Licensed Real Estate Salesperson</p>
          </div>
          <p className="text-sm leading-6 text-brand-graphite/76">Buildings • Building Codes • Construction Documents • Market Strategy</p>
        </div>
      </section>

      <section className="border-b border-brand-border bg-brand-ivory">
        <div className="mx-auto w-full max-w-site px-6 py-16 lg:px-10 lg:py-24">
          <div className="max-w-4xl">
            <p className="text-[10px] uppercase tracking-[0.26em] text-brand-cocoa">Decision Brief</p>
            <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.7rem,5vw,5.2rem)] leading-[0.9] text-brand-navy">
              The answer is not always move.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-brand-graphite">
              Each decision brief explains what changed, whether anything should change, what the real options are, and which recommendation protects the client best.
            </p>
          </div>
          <div className="mt-12 grid gap-px bg-brand-border sm:grid-cols-2 lg:grid-cols-4">
            {educationBlocks.map((block) => (
              <article key={block.title} className="bg-white p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
                <p className="text-[0.95rem] font-semibold uppercase tracking-[0.14em] text-brand-navy">{block.title}</p>
                <p className="mt-4 text-sm leading-7 text-brand-graphite">{block.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-brand-brass/30 bg-brand-navy text-brand-ivory">
        <div className="mx-auto grid w-full max-w-site gap-8 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:px-10 lg:py-20">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-brand-brass">Private Advisory</p>
            <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.4rem,4.8vw,4.75rem)] leading-[0.9] text-brand-ivory">
              Before the footer, decide the next move.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-brand-ivory/76">
              Request a call when the question is not which listing to see, but whether to move, wait, renew, renovate, sell, or do nothing.
            </p>
          </div>
          <Link
            href="/contact"
            className="ak-call-button inline-flex items-center justify-between gap-8 px-5 py-4 text-[11px] uppercase tracking-[0.16em]"
          >
            Request a Call
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>
      </section>
    </main>
  );
}

import type { ReactNode } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  Calendar,
  Check,
  Home,
  Lightbulb,
  Lock,
  Star,
  TrendingUp,
  X,
} from "lucide-react";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { cn } from "@/lib/utils";

const terms = [
  { years: "10", note: "Highest payment · least interest overall" },
  { years: "15", note: "Popular payoff speed · strong equity build" },
  { years: "20", note: "Middle ground · less common than 15/30" },
  { years: "30", note: "Lowest payment · most total interest" },
] as const;

const howItWorks = [
  {
    step: "01",
    title: "Lock the rate",
    detail: "Rate is set at (or before) closing for the full term.",
  },
  {
    step: "02",
    title: "Same P&I",
    detail:
      "Principal & interest stay level each month if you pay as scheduled.",
  },
  {
    step: "03",
    title: "Amortize",
    detail:
      "Early payments are interest-heavy; later payments build equity faster.",
  },
  {
    step: "04",
    title: "Pay off",
    detail: "At term end (or refinance/sale), the balance is gone.",
  },
] as const;

const pros = [
  "Predictable principal & interest payment",
  "Protects you if market rates rise",
  "Easier long-term budgeting",
  "Often preferred for long hold periods",
] as const;

const cons = [
  "Starting rate may be higher than a comparable ARM start rate",
  "No automatic benefit if market rates fall (unless you refinance)",
  "May cost more than an ARM if you only need the loan for a short time",
] as const;

const bestWhen = [
  "You plan to stay longer than a typical ARM fixed period",
  "You value payment certainty over a lower initial rate",
  "Rates feel attractive and you want to lock them in",
  "Your budget needs a stable housing payment",
] as const;

function SectionLabel({
  children,
  tone = "navy",
}: {
  children: ReactNode;
  tone?: "navy" | "green" | "sky" | "brass" | "caution";
}) {
  return (
    <div
      className={cn(
        "px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white",
        tone === "navy" && "bg-brand-navy",
        tone === "green" && "bg-emerald-700",
        tone === "sky" && "bg-sky-800",
        tone === "brass" && "bg-[#8a6f3a]",
        tone === "caution" && "bg-rose-800",
      )}
    >
      {children}
    </div>
  );
}

function FixedPaymentChart({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 160"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="Chart showing a flat fixed-rate payment over time"
    >
      <rect width="360" height="160" fill="#eef8f1" />
      <text
        x="16"
        y="22"
        fill="#0f1c2e"
        fontSize="11"
        fontWeight="700"
        fontFamily="system-ui,sans-serif"
      >
        PAYMENT OVER TIME
      </text>
      <line
        x1="40"
        y1="120"
        x2="330"
        y2="120"
        stroke="#0f1c2e"
        strokeWidth="1.5"
        opacity="0.25"
      />
      <line
        x1="40"
        y1="40"
        x2="40"
        y2="120"
        stroke="#0f1c2e"
        strokeWidth="1.5"
        opacity="0.25"
      />
      <line
        x1="50"
        y1="70"
        x2="320"
        y2="70"
        stroke="#059669"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="50" cy="70" r="5" fill="#059669" />
      <circle cx="320" cy="70" r="5" fill="#059669" />
      <text
        x="50"
        y="140"
        fill="#5c6670"
        fontSize="10"
        fontFamily="system-ui,sans-serif"
      >
        Year 1
      </text>
      <text
        x="300"
        y="140"
        fill="#5c6670"
        fontSize="10"
        fontFamily="system-ui,sans-serif"
      >
        Year 30
      </text>
      <text
        x="140"
        y="58"
        fill="#047857"
        fontSize="11"
        fontWeight="600"
        fontFamily="system-ui,sans-serif"
      >
        Same P&I each month
      </text>
    </svg>
  );
}

function AmortizationMix({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 150"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="Illustration of interest vs principal share over the life of a fixed mortgage"
    >
      <defs>
        <linearGradient id="intGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0f1c2e" />
          <stop offset="100%" stopColor="#0f1c2e" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="prinGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#b08d57" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#b08d57" />
        </linearGradient>
      </defs>
      <rect width="360" height="150" fill="#f4f6f8" />
      <path
        d="M30 30 L330 30 L330 120 L30 120 Z"
        fill="url(#intGrad)"
        opacity="0.9"
      />
      <path
        d="M30 120 L30 100 C120 95 220 70 330 35 L330 120 Z"
        fill="url(#prinGrad)"
      />
      <text
        x="40"
        y="55"
        fill="#fff"
        fontSize="11"
        fontWeight="600"
        fontFamily="system-ui,sans-serif"
      >
        Interest (more early)
      </text>
      <text
        x="210"
        y="108"
        fill="#0f1c2e"
        fontSize="11"
        fontWeight="600"
        fontFamily="system-ui,sans-serif"
      >
        Principal (more later)
      </text>
    </svg>
  );
}

export default function FixedRateMortgage() {
  usePageMetadata({
    title: "Fixed-Rate Mortgage",
    description:
      "Fixed-rate mortgage cheat sheet: same interest rate and P&I payment, common terms, amortization, pros and cons.",
    path: "/guides/fixed-rate-mortgage",
  });

  return (
    <main className="bg-[#f4f6f8] text-brand-navy">
      <header className="border-b border-brand-navy/10 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-10 lg:py-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-brand-brass">
            Educational guide
          </p>
          <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-[clamp(1.85rem,4vw,2.75rem)] font-medium leading-[0.98] tracking-[-0.02em] text-brand-navy">
                Fixed-Rate Mortgage
              </h1>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-navy/70">
                Same interest rate · Same payment (P&I) · Predictable
              </p>
            </div>
            <div className="flex items-center gap-2 border border-emerald-300/70 bg-emerald-50 px-3 py-2 text-[12px] font-semibold text-emerald-950">
              <Star
                className="h-3.5 w-3.5 text-emerald-700"
                fill="currentColor"
                strokeWidth={0}
              />
              Best for long-term stay plans
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-brand-graphite">
            A fixed-rate mortgage keeps the interest rate unchanged for the full
            term, so the scheduled principal & interest (P&I) payment stays
            level if you pay as agreed. Taxes, insurance, and HOA dues (and
            escrow for them) can still change your total monthly housing cost.
            Educational overview only - not lending advice.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-5 px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <section className="overflow-hidden border border-emerald-600/25 bg-white shadow-sm">
            <SectionLabel tone="green">What it is</SectionLabel>
            <div className="flex gap-4 p-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-emerald-700 text-white">
                <Lock className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <p className="text-[13px] leading-5 text-brand-graphite">
                You and the lender agree on a rate at origination. That rate
                does not reset with the market. Your{" "}
                <span className="font-semibold text-brand-navy">P&I</span>{" "}
                (principal and interest) stays the same each month if you pay on
                schedule - even if market rates climb.
              </p>
            </div>
            <FixedPaymentChart />
          </section>

          <section className="overflow-hidden border border-brand-navy/20 bg-white shadow-sm">
            <SectionLabel>How it works</SectionLabel>
            <ol className="space-y-2 p-3">
              {howItWorks.map((item) => (
                <li
                  key={item.step}
                  className="flex gap-3 border border-brand-navy/10 bg-[#eef2f7]/80 px-3 py-3"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-brand-navy text-[11px] font-semibold text-brand-brass">
                    {item.step}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-brand-navy">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block text-[12px] leading-5 text-brand-graphite">
                      {item.detail}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <section className="overflow-hidden border border-brand-navy/20 bg-white shadow-sm">
          <SectionLabel>Common fixed-rate terms</SectionLabel>
          <div className="grid gap-3 bg-[#f4f6f8] p-3 sm:grid-cols-2 lg:grid-cols-4">
            {terms.map((t) => (
              <div
                key={t.years}
                className="border border-emerald-300/50 bg-white p-4 text-center shadow-sm"
              >
                <Calendar
                  className="mx-auto h-5 w-5 text-emerald-700"
                  strokeWidth={1.5}
                />
                <p className="mt-2 font-display text-3xl font-medium text-brand-navy">
                  {t.years}
                </p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-navy/55">
                  Years
                </p>
                <p className="mt-2 text-[12px] leading-4 text-brand-graphite">
                  {t.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-2">
          <section className="overflow-hidden border border-brand-navy/20 bg-white shadow-sm">
            <SectionLabel tone="brass">
              Interest vs principal over time
            </SectionLabel>
            <AmortizationMix />
            <p className="border-t border-brand-navy/10 px-4 py-3 text-[13px] leading-5 text-brand-graphite">
              Total monthly{" "}
              <span className="font-semibold text-brand-navy">P&I</span> stays
              level, but the mix shifts: more interest early, more principal
              later. Escrow for taxes/insurance is separate and can change.
            </p>
          </section>

          <section className="overflow-hidden border border-brand-navy/20 bg-white shadow-sm">
            <SectionLabel>Fixed vs ARM · quick contrast</SectionLabel>
            <div className="grid gap-3 p-3 sm:grid-cols-2">
              <div className="border border-emerald-300/60 bg-emerald-50/80 p-4">
                <div className="flex items-center gap-2">
                  <Lock
                    className="h-4 w-4 text-emerald-700"
                    strokeWidth={1.5}
                  />
                  <p className="text-sm font-semibold text-emerald-950">
                    Fixed
                  </p>
                </div>
                <ul className="mt-3 space-y-1.5 text-[13px] text-brand-graphite">
                  <li className="flex gap-2">
                    <Check
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600"
                      strokeWidth={2.5}
                    />
                    Rate never resets
                  </li>
                  <li className="flex gap-2">
                    <Check
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600"
                      strokeWidth={2.5}
                    />
                    Payment certainty
                  </li>
                  <li className="flex gap-2">
                    <Check
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600"
                      strokeWidth={2.5}
                    />
                    Best for long holds
                  </li>
                </ul>
              </div>
              <div className="border border-sky-300/60 bg-sky-50/80 p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp
                    className="h-4 w-4 text-sky-800"
                    strokeWidth={1.5}
                  />
                  <p className="text-sm font-semibold text-sky-950">ARM</p>
                </div>
                <ul className="mt-3 space-y-1.5 text-[13px] text-brand-graphite">
                  <li className="flex gap-2">
                    <ArrowRight
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-700"
                      strokeWidth={2}
                    />
                    Lower start rate possible
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-700"
                      strokeWidth={2}
                    />
                    Payment can rise later
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-700"
                      strokeWidth={2}
                    />
                    Better for short stays
                  </li>
                </ul>
                <Link
                  href="/guides/adjustable-rate-mortgage"
                  className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-sky-900 underline underline-offset-2"
                >
                  Full ARM guide <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </section>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <section className="overflow-hidden border border-emerald-400/40 bg-emerald-50 shadow-sm">
            <SectionLabel tone="green">Pros</SectionLabel>
            <ul className="space-y-2 p-4">
              {pros.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-[13px] leading-5 text-brand-navy"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                    strokeWidth={2.5}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="overflow-hidden border border-rose-300/50 bg-rose-50 shadow-sm">
            <SectionLabel tone="caution">Cons</SectionLabel>
            <ul className="space-y-2 p-4">
              {cons.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-[13px] leading-5 text-brand-navy"
                >
                  <X
                    className="mt-0.5 h-4 w-4 shrink-0 text-rose-600"
                    strokeWidth={2.5}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="overflow-hidden border border-brand-navy/20 bg-white shadow-sm">
            <SectionLabel>Best used when…</SectionLabel>
            <ul className="space-y-2 p-4">
              {bestWhen.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-[13px] leading-5 text-brand-graphite"
                >
                  <Home
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-brass"
                    strokeWidth={1.5}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="flex gap-3 border border-amber-300/80 bg-gradient-to-r from-amber-50 to-brand-brass/10 px-4 py-3.5">
          <Lightbulb
            className="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
            strokeWidth={1.5}
          />
          <p className="text-[13px] leading-5 text-brand-navy/90">
            <span className="font-semibold">Memory:</span> Fixed = "fix it and
            forget it" for the rate. You still refinance if you want a lower
            market rate later - the loan itself will not auto-adjust down.
          </p>
        </aside>

        <footer className="flex items-center justify-center gap-3 bg-brand-navy px-4 py-4 text-center text-brand-ivory">
          <Lock
            className="hidden h-4 w-4 shrink-0 text-brand-brass sm:block"
            strokeWidth={1.5}
          />
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] sm:text-[12px]">
            Stability today and tomorrow - at the cost of flexibility
          </p>
        </footer>

        <p className="pb-6 text-center text-sm text-brand-graphite">
          <Link
            href="/guides/how-mortgages-work"
            className="text-brand-navy underline underline-offset-4"
          >
            Mortgage Hub
          </Link>
          {" · "}
          <Link
            href="/guides/adjustable-rate-mortgage"
            className="text-brand-navy underline underline-offset-4"
          >
            ARM Guide
          </Link>
          {" · "}
          <Link
            href="/guides/mortgage-clauses"
            className="text-brand-navy underline underline-offset-4"
          >
            Clauses
          </Link>
        </p>
      </div>
    </main>
  );
}

import type { ReactNode } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  Calendar,
  Check,
  Lightbulb,
  Lock,
  Percent,
  Shield,
  Star,
  Target,
  TrendingUp,
  Wallet,
  X,
} from "lucide-react";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { cn } from "@/lib/utils";

const armFlow = [
  {
    title: "Initial fixed",
    detail:
      "Rate locked for an introductory period (often 3, 5, 7, or 10 years).",
  },
  {
    title: "Adjustment begins",
    detail: "After the fixed period, the rate can reset on a set schedule.",
  },
  {
    title: "New rate = index + margin",
    detail:
      "Subject to caps that limit how far it can jump each time / lifetime.",
  },
  {
    title: "Payment may change",
    detail:
      "Higher rate → higher P&I (unless you refinance or sell); rates can also fall.",
  },
] as const;

const components = [
  {
    title: "Index",
    detail:
      "Market benchmark the loan tracks after the fixed period (today often SOFR-based).",
  },
  {
    title: "Margin",
    detail: "Lender's add-on. Fully indexed rate ≈ index + margin.",
  },
  {
    title: "Initial / start rate",
    detail:
      "Rate during the introductory fixed period - frequently priced below a comparable fixed rate, but not always.",
  },
  {
    title: "Caps",
    detail:
      "Limits on the first adjustment, later periodic adjustments, and the lifetime maximum rate.",
  },
] as const;

const armTypes = [
  { code: "3/1", fixed: "3 years", adjusts: "Often yearly after" },
  { code: "5/1", fixed: "5 years", adjusts: "Often yearly after" },
  { code: "7/1", fixed: "7 years", adjusts: "Often yearly after" },
  { code: "10/1", fixed: "10 years", adjusts: "Often yearly after" },
] as const;

const decideFactors = [
  {
    q: "How long will you stay?",
    fixed: "Longer than the ARM fixed period → lean Fixed",
    arm: "Shorter stay / refinance plan → ARM can make sense",
    icon: Calendar,
  },
  {
    q: "How do you feel about risk?",
    fixed: "Want certainty → Fixed",
    arm: "OK with uncertainty for a lower start → ARM",
    icon: Shield,
  },
  {
    q: "Where are rates now?",
    fixed: "Want to lock today's rate for years → Fixed",
    arm: "Betting on a short hold or future refinance → ARM (rate views are uncertain)",
    icon: Percent,
  },
  {
    q: "Budget today vs tomorrow?",
    fixed: "Can afford stability premium → Fixed",
    arm: "Need lowest payment now → ARM (know the risk)",
    icon: Wallet,
  },
  {
    q: "Long-term goal?",
    fixed: "Stay put → Fixed",
    arm: "Move / refinance soon → ARM",
    icon: Target,
  },
] as const;

const comparison = [
  {
    feature: "Interest rate",
    fixed: "Stays the same",
    arm: "Can change after fixed period",
  },
  {
    feature: "P&I payment",
    fixed: "Level (scheduled)",
    arm: "Can rise or fall after reset",
  },
  {
    feature: "Risk level",
    fixed: "Low rate risk",
    arm: "Moderate to high rate risk",
  },
  {
    feature: "Rising-rate protection",
    fixed: "Yes (locked)",
    arm: "Limited (caps only)",
  },
  {
    feature: "Best fit",
    fixed: "Long hold, certainty",
    arm: "Short hold, lower start",
  },
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

function ArmPaymentChart({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 160"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="Example ARM payment path: flat then stepping up"
    >
      <rect width="360" height="160" fill="#eef6fb" />
      <text
        x="16"
        y="22"
        fill="#0f1c2e"
        fontSize="11"
        fontWeight="700"
        fontFamily="system-ui,sans-serif"
      >
        PAYMENT OVER TIME (EXAMPLE)
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
      <polyline
        points="50,90 160,90 160,75 210,75 210,58 260,58 260,45 320,45"
        fill="none"
        stroke="#0369a1"
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <text
        x="70"
        y="80"
        fill="#0369a1"
        fontSize="10"
        fontWeight="600"
        fontFamily="system-ui,sans-serif"
      >
        Initial fixed
      </text>
      <text
        x="220"
        y="38"
        fill="#0369a1"
        fontSize="10"
        fontWeight="600"
        fontFamily="system-ui,sans-serif"
      >
        Adjustments
      </text>
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
        Later
      </text>
    </svg>
  );
}

export default function AdjustableRateMortgage() {
  usePageMetadata({
    title: "ARM & Fixed vs ARM",
    description:
      "Adjustable-rate mortgage cheat sheet plus Fixed vs ARM decision guide: index, margin, caps, common 5/1 and 7/1 structures.",
    path: "/guides/adjustable-rate-mortgage",
  });

  return (
    <main className="bg-[#f4f6f8] text-brand-navy">
      <header className="border-b border-brand-navy/10 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-10 lg:py-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-brand-brass">
            Educational guide
          </p>
          <h1 className="mt-3 font-display text-[clamp(1.85rem,4vw,2.75rem)] font-medium leading-[0.98] tracking-[-0.02em] text-brand-navy">
            ARM & Fixed vs ARM
          </h1>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-navy/70">
            Lower initial rate · Payment can change later
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-brand-graphite">
            An adjustable-rate mortgage (ARM) keeps a fixed rate for an
            introductory period, then adjusts based on an index plus a margin -
            usually limited by caps. Educational overview only - not lending
            advice.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-5 px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
        <div className="grid gap-5 lg:grid-cols-2">
          <section className="overflow-hidden border border-emerald-500/30 bg-white shadow-sm">
            <div className="flex items-center gap-2 bg-emerald-700 px-4 py-3 text-white">
              <Lock className="h-4 w-4" strokeWidth={1.5} />
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em]">
                Fixed rate
              </p>
            </div>
            <div className="p-4">
              <p className="text-sm font-semibold text-emerald-950">
                Same rate. Same P&I. Predictable.
              </p>
              <ul className="mt-3 space-y-1.5 text-[13px] text-brand-graphite">
                <li className="flex gap-2">
                  <Check
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600"
                    strokeWidth={2.5}
                  />
                  Rate never resets with the market
                </li>
                <li className="flex gap-2">
                  <Check
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600"
                    strokeWidth={2.5}
                  />
                  Best for long-term planning
                </li>
                <li className="flex gap-2">
                  <Check
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600"
                    strokeWidth={2.5}
                  />
                  Protects against rising rates
                </li>
              </ul>
              <p className="mt-3 text-[12px] text-brand-graphite">
                Best for: buyers who plan to stay and want stability.{" "}
                <Link
                  href="/guides/fixed-rate-mortgage"
                  className="font-semibold text-brand-navy underline underline-offset-2"
                >
                  Fixed cheat sheet
                </Link>
              </p>
            </div>
            <svg viewBox="0 0 360 100" className="w-full" aria-hidden>
              <rect width="360" height="100" fill="#eef8f1" />
              <line
                x1="40"
                y1="50"
                x2="320"
                y2="50"
                stroke="#059669"
                strokeWidth="4"
              />
            </svg>
          </section>

          <section className="overflow-hidden border border-sky-400/40 bg-white shadow-sm">
            <div className="flex items-center gap-2 bg-sky-800 px-4 py-3 text-white">
              <TrendingUp className="h-4 w-4" strokeWidth={1.5} />
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em]">
                Adjustable rate (ARM)
              </p>
            </div>
            <div className="p-4">
              <p className="text-sm font-semibold text-sky-950">
                Lower initial rate. Payment can change.
              </p>
              <ul className="mt-3 space-y-1.5 text-[13px] text-brand-graphite">
                <li className="flex gap-2">
                  <ArrowRight
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-700"
                    strokeWidth={2}
                  />
                  Attractive start rate possible
                </li>
                <li className="flex gap-2">
                  <ArrowRight
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-700"
                    strokeWidth={2}
                  />
                  Resets after the fixed period
                </li>
                <li className="flex gap-2">
                  <ArrowRight
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-700"
                    strokeWidth={2}
                  />
                  Payment-shock risk if rates rise
                </li>
              </ul>
              <p className="mt-3 text-[12px] text-brand-graphite">
                Best for: shorter expected ownership or a clear refinance / sale
                plan before resets bite.
              </p>
            </div>
            <ArmPaymentChart />
          </section>
        </div>

        <section className="overflow-hidden border border-brand-navy/20 bg-white shadow-sm">
          <SectionLabel tone="sky">How an ARM works</SectionLabel>
          <div className="grid gap-3 bg-[#f4f6f8] p-3 sm:grid-cols-4">
            {armFlow.map((item, i) => (
              <div
                key={item.title}
                className="relative border border-sky-200 bg-white p-3"
              >
                {i < armFlow.length - 1 ? (
                  <div className="pointer-events-none absolute -right-2 top-1/2 hidden h-0.5 w-4 -translate-y-1/2 bg-brand-brass/50 sm:block" />
                ) : null}
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-800/70">
                  Step {i + 1}
                </span>
                <p className="mt-1 text-sm font-semibold text-brand-navy">
                  {item.title}
                </p>
                <p className="mt-1 text-[12px] leading-4 text-brand-graphite">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <section className="overflow-hidden border border-brand-navy/20 bg-white shadow-sm">
            <SectionLabel>Key components</SectionLabel>
            <ul className="divide-y divide-brand-navy/10">
              {components.map((item) => (
                <li key={item.title} className="px-4 py-3">
                  <p className="text-sm font-semibold text-brand-navy">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[13px] leading-5 text-brand-graphite">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
            <div className="border-t border-brand-navy/10 bg-[#eef2f7] px-4 py-3 text-[13px] text-brand-navy">
              <span className="font-semibold">Example:</span> Index 4.00% +
              Margin 2.25% = <span className="font-semibold">6.25%</span> fully
              indexed rate (before applying caps).
            </div>
          </section>

          <section className="overflow-hidden border border-violet-300/50 bg-white shadow-sm">
            <SectionLabel>Common ARM labels</SectionLabel>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead className="bg-violet-900 text-[10px] uppercase tracking-[0.12em] text-white">
                  <tr>
                    <th className="px-3 py-3">Type</th>
                    <th className="px-3 py-3">Fixed period</th>
                    <th className="px-3 py-3">Then adjusts</th>
                  </tr>
                </thead>
                <tbody>
                  {armTypes.map((row, i) => (
                    <tr
                      key={row.code}
                      className={i % 2 === 0 ? "bg-violet-50/60" : "bg-white"}
                    >
                      <td className="px-3 py-2.5 font-semibold text-brand-navy">
                        {row.code}
                      </td>
                      <td className="px-3 py-2.5 text-brand-graphite">
                        {row.fixed}
                      </td>
                      <td className="px-3 py-2.5 text-brand-graphite">
                        {row.adjusts}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="border-t border-violet-200 px-4 py-2.5 text-[12px] leading-5 text-brand-graphite">
              Tip: Labels like{" "}
              <span className="font-semibold text-brand-navy">5/1</span> mean ~5
              years fixed, then adjustments (historically yearly). Many newer
              SOFR hybrids use labels such as{" "}
              <span className="font-semibold text-brand-navy">5/6</span> (adjust
              every 6 months after the fixed period). Always read your note for
              index, margin, and caps.
            </p>
          </section>
        </div>

        <section className="overflow-hidden border border-brand-navy/20 bg-white shadow-sm">
          <SectionLabel tone="brass">How to decide · 5 factors</SectionLabel>
          <div className="grid gap-3 bg-[#f4f6f8] p-3 md:grid-cols-2 xl:grid-cols-5">
            {decideFactors.map((item) => (
              <div
                key={item.q}
                className="border border-brand-navy/10 bg-white p-3 shadow-sm"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center bg-brand-navy text-brand-brass">
                  <item.icon className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <p className="mt-2 text-[13px] font-semibold text-brand-navy">
                  {item.q}
                </p>
                <p className="mt-2 text-[11px] leading-4 text-emerald-800">
                  <span className="font-semibold">Fixed:</span> {item.fixed}
                </p>
                <p className="mt-1 text-[11px] leading-4 text-sky-900">
                  <span className="font-semibold">ARM:</span> {item.arm}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="overflow-hidden border border-brand-navy/20 bg-white shadow-sm">
          <SectionLabel>Side-by-side summary</SectionLabel>
          <div className="overflow-x-auto">
            <table className="min-w-[560px] w-full text-left text-[13px]">
              <thead className="bg-brand-navy text-[10px] uppercase tracking-[0.12em] text-brand-ivory">
                <tr>
                  <th className="px-3 py-3">Feature</th>
                  <th className="px-3 py-3">Fixed</th>
                  <th className="px-3 py-3">ARM</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i % 2 === 0 ? "bg-[#eef2f7]" : "bg-white"}
                  >
                    <td className="px-3 py-2.5 font-semibold text-brand-navy">
                      {row.feature}
                    </td>
                    <td className="px-3 py-2.5 text-emerald-900">
                      {row.fixed}
                    </td>
                    <td className="px-3 py-2.5 text-sky-950">{row.arm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <aside className="overflow-hidden border border-amber-300/70 bg-amber-50 shadow-sm">
            <SectionLabel tone="brass">Quick decision rule</SectionLabel>
            <div className="space-y-3 p-4 text-[13px] leading-5 text-brand-navy">
              <p>
                Will you likely stay longer than the ARM's initial fixed period{" "}
                <span className="font-semibold">+ a couple of years</span>?
              </p>
              <div className="border border-emerald-300/60 bg-emerald-50 px-3 py-2 font-semibold text-emerald-950">
                Yes → lean Fixed Rate
              </div>
              <div className="border border-sky-300/60 bg-sky-50 px-3 py-2 font-semibold text-sky-950">
                No / clear exit plan → ARM can be considered
              </div>
              <p className="text-[12px] text-brand-graphite">
                Also price payment-shock risk: model the max payment under the
                lifetime cap, not just the teaser rate.
              </p>
            </div>
          </aside>

          <div className="grid gap-3 sm:grid-cols-2">
            <section className="overflow-hidden border border-emerald-400/40 bg-emerald-50 shadow-sm">
              <SectionLabel tone="green">ARM pros</SectionLabel>
              <ul className="space-y-2 p-4 text-[13px]">
                {[
                  "Lower initial rate / payment possible",
                  "Useful for short planned ownership",
                  "Can win if you exit before resets",
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-brand-navy">
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
              <SectionLabel tone="caution">ARM cons</SectionLabel>
              <ul className="space-y-2 p-4 text-[13px]">
                {[
                  "Payments can rise after the fixed period",
                  "Budget uncertainty",
                  "Payment shock if rates climb",
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-brand-navy">
                    <X
                      className="mt-0.5 h-4 w-4 shrink-0 text-rose-600"
                      strokeWidth={2.5}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <aside className="flex gap-3 border border-amber-300/80 bg-gradient-to-r from-amber-50 to-brand-brass/10 px-4 py-3.5">
          <Lightbulb
            className="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
            strokeWidth={1.5}
          />
          <p className="text-[13px] leading-5 text-brand-navy/90">
            <span className="font-semibold">Key takeaway:</span> Fixed = peace
            of mind today and tomorrow. ARM = lower cost today, rate risk
            tomorrow. Choose with your hold period and stress-tested payment in
            mind.
          </p>
        </aside>

        <footer className="flex items-center justify-center gap-3 bg-brand-navy px-4 py-4 text-center text-brand-ivory">
          <Star
            className="hidden h-4 w-4 shrink-0 text-brand-brass sm:block"
            fill="currentColor"
            strokeWidth={0}
          />
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] sm:text-[12px]">
            Stability vs opportunity - pick with your timeline
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
            href="/guides/fixed-rate-mortgage"
            className="text-brand-navy underline underline-offset-4"
          >
            Fixed Rate
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

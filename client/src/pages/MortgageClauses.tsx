import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "wouter";
import {
  AlertTriangle,
  Brain,
  Check,
  Gavel,
  Home,
  Lightbulb,
  Scale,
  ShieldAlert,
  Star,
  Timer,
} from "lucide-react";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { cn } from "@/lib/utils";

type ClauseTone = "accel" | "alien" | "defeat" | "prep";

const clauses: {
  title: string;
  aka?: string;
  definition: string;
  trigger: string;
  effect: string;
  remember: string;
  tone: ClauseTone;
  icon: LucideIcon;
}[] = [
  {
    title: "Acceleration Clause",
    definition:
      "Lets the lender demand the entire remaining loan balance immediately.",
    trigger:
      "Borrower default (missed payments, other material breaches as defined in the note/mortgage).",
    effect:
      "Full balance can be called due; lender may start foreclosure if unpaid.",
    remember: "Acceleration = default → full loan due now",
    tone: "accel",
    icon: AlertTriangle,
  },
  {
    title: "Alienation Clause",
    aka: "Due-on-sale",
    definition:
      "Lets the lender demand full repayment if ownership is sold or transferred.",
    trigger:
      "Sale, transfer of title, or certain ownership changes - federal law recognizes limited exceptions (e.g. some transfers to a surviving spouse or into certain living trusts).",
    effect:
      "Loan can be called due before the scheduled term ends when the property changes hands.",
    remember: "Alienation = ownership changes → loan can be due",
    tone: "alien",
    icon: Home,
  },
  {
    title: "Defeasance Clause",
    definition:
      "In standard residential teaching: when the debt is paid, the mortgage lien is defeated and the borrower gets clear title (satisfaction / release).",
    trigger: "Loan is paid off (sale, refinance, or maturity payoff).",
    effect:
      "Lender's security interest ends; borrower (or new owner after payoff) holds title free of that mortgage lien.",
    remember: "Defeasance = pay off → lien is defeated",
    tone: "defeat",
    icon: Scale,
  },
  {
    title: "Prepayment Penalty",
    definition:
      "Allows the lender to charge a fee if the borrower pays off or refinances early within a defined window. Less common on many modern qualified primary-residence loans - still check the note.",
    trigger:
      "Early payoff or refinance during a penalty period (if the loan includes one).",
    effect:
      "Borrower owes an extra fee (often a % of balance or months of interest).",
    remember: "Pay too early (in the window) → possible penalty",
    tone: "prep",
    icon: Timer,
  },
];

const scenarios = [
  {
    scene: "You miss several payments",
    clause: "Acceleration",
    tone: "accel" as const,
  },
  {
    scene: "You sell the house",
    clause: "Alienation / due-on-sale",
    tone: "alien" as const,
  },
  {
    scene: "You pay the loan in full",
    clause: "Defeasance (lien release)",
    tone: "defeat" as const,
  },
  {
    scene: "You refinance in year two",
    clause: "Prepayment penalty (if any)",
    tone: "prep" as const,
  },
] as const;

const glossary = [
  {
    title: "Amortization",
    detail:
      "Paying down principal over time through regular payments so the balance trends toward zero.",
    tip: "Balance goes down over the term (fully amortizing loans).",
  },
  {
    title: "Package mortgage",
    detail:
      "One loan that finances real property plus personal property (appliances, etc.).",
    tip: "Package = realty + personal items.",
  },
  {
    title: "Straight / interest-only",
    detail:
      "Payments cover interest during the term; principal is typically due at maturity.",
    tip: "Interest now, principal later - different from a balloon that may amortize partially.",
  },
  {
    title: "Balloon mortgage",
    detail:
      'Payments for a period, then a large remaining principal ("balloon") is due at maturity.',
    tip: "Some principal may be paid along the way - still a big end payment.",
  },
  {
    title: "Home equity",
    detail: "Home value minus mortgage balances = your ownership stake.",
    tip: "Equity loans / HELOCs borrow against that stake.",
  },
  {
    title: "P&I",
    detail:
      "Principal and interest - the loan payment pieces before taxes/insurance escrow.",
    tip: "Fixed-rate P&I stays level; ARM P&I can change after resets.",
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

function clauseStyles(tone: ClauseTone) {
  switch (tone) {
    case "accel":
      return {
        border: "border-rose-300/60",
        head: "bg-rose-800",
        soft: "bg-rose-50",
        chip: "bg-rose-100 text-rose-950",
      };
    case "alien":
      return {
        border: "border-emerald-400/50",
        head: "bg-emerald-700",
        soft: "bg-emerald-50",
        chip: "bg-emerald-100 text-emerald-950",
      };
    case "defeat":
      return {
        border: "border-sky-300/60",
        head: "bg-sky-800",
        soft: "bg-sky-50",
        chip: "bg-sky-100 text-sky-950",
      };
    case "prep":
      return {
        border: "border-violet-300/60",
        head: "bg-violet-800",
        soft: "bg-violet-50",
        chip: "bg-violet-100 text-violet-950",
      };
  }
}

export default function MortgageClauses() {
  usePageMetadata({
    title: "Mortgage Clauses & Key Terms",
    description:
      "Acceleration, alienation (due-on-sale), defeasance, prepayment penalty, plus a quick mortgage glossary - educational overview.",
    path: "/guides/mortgage-clauses",
  });

  return (
    <main className="bg-[#f4f6f8] text-brand-navy">
      <header className="border-b border-brand-navy/10 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-10 lg:py-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-brand-brass">
            Educational guide
          </p>
          <h1 className="mt-3 font-display text-[clamp(1.85rem,4vw,2.75rem)] font-medium leading-[0.98] tracking-[-0.02em] text-brand-navy">
            Mortgage Clauses & Key Terms
          </h1>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-navy/70">
            Know the purpose, trigger, and effect
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-brand-graphite">
            These clauses show up in notes and mortgages again and again. Learn
            the trigger and the effect - then use the glossary for nearby terms.
            Educational overview only - not legal advice. Loan documents
            control.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-5 px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {clauses.map((clause) => {
            const styles = clauseStyles(clause.tone);
            return (
              <article
                key={clause.title}
                className={cn(
                  "overflow-hidden border bg-white shadow-sm",
                  styles.border,
                )}
              >
                <div
                  className={cn(
                    "flex items-center gap-2 px-3 py-3 text-white",
                    styles.head,
                  )}
                >
                  <clause.icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em]">
                      {clause.title}
                    </p>
                    {clause.aka ? (
                      <p className="text-[10px] text-white/75">{clause.aka}</p>
                    ) : null}
                  </div>
                </div>
                <div className="space-y-3 p-3 text-[12px] leading-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-navy/50">
                      Definition
                    </p>
                    <p className="mt-1 text-brand-graphite">
                      {clause.definition}
                    </p>
                  </div>
                  <div
                    className={cn(
                      "border px-2.5 py-2",
                      styles.border,
                      styles.soft,
                    )}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-navy/50">
                      Trigger
                    </p>
                    <p className="mt-1 text-brand-navy">{clause.trigger}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-navy/50">
                      Effect
                    </p>
                    <p className="mt-1 text-brand-graphite">{clause.effect}</p>
                  </div>
                  <div className="flex gap-2 border border-amber-200 bg-amber-50 px-2.5 py-2">
                    <Brain
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-700"
                      strokeWidth={1.5}
                    />
                    <p className="text-brand-navy">{clause.remember}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <aside className="border border-sky-300/50 bg-sky-50 px-4 py-3 text-[13px] leading-5 text-brand-navy">
          <span className="font-semibold">Commercial note:</span> In CMBS /
          commercial lending, "defeasance" can also mean substituting securities
          for the property as collateral so the loan can be prepaid while the
          note stays in place. That is different from the residential exam
          meaning (lien released when paid).
        </aside>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <section className="overflow-hidden border border-amber-300/70 bg-amber-50 shadow-sm">
            <SectionLabel tone="brass">Quick memory mnemonic</SectionLabel>
            <div className="space-y-3 p-4 text-[13px] leading-5 text-brand-navy">
              <p>
                <span className="font-semibold">A</span>cceleration on default ·{" "}
                <span className="font-semibold">A</span>lienation when ownership
                changes · <span className="font-semibold">D</span>efeasance when
                paid · <span className="font-semibold">P</span>repayment penalty
                if you exit early
              </p>
              <p className="text-[12px] text-brand-graphite">
                A · A · D · P - purpose, trigger, effect.
              </p>
            </div>
          </section>

          <section className="overflow-hidden border border-brand-navy/20 bg-white shadow-sm">
            <SectionLabel>Example scenarios</SectionLabel>
            <ul className="divide-y divide-brand-navy/10">
              {scenarios.map((item) => {
                const styles = clauseStyles(item.tone);
                return (
                  <li
                    key={item.scene}
                    className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"
                  >
                    <span className="text-[13px] text-brand-graphite">
                      {item.scene}
                    </span>
                    <span
                      className={cn(
                        "px-2 py-1 text-[11px] font-semibold",
                        styles.chip,
                      )}
                    >
                      {item.clause}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>

        <section className="overflow-hidden border border-brand-navy/20 bg-white shadow-sm">
          <SectionLabel>At-a-glance comparison</SectionLabel>
          <div className="overflow-x-auto">
            <table className="min-w-[720px] w-full text-left text-[12px] sm:text-[13px]">
              <thead className="bg-brand-navy text-[10px] uppercase tracking-[0.12em] text-brand-ivory">
                <tr>
                  <th className="px-3 py-3">Clause</th>
                  <th className="px-3 py-3">Who uses it?</th>
                  <th className="px-3 py-3">Trigger</th>
                  <th className="px-3 py-3">Effect on borrower</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    clause: "Acceleration",
                    who: "Lender",
                    trigger: "Default",
                    effect: "Full balance can be demanded now",
                    tone: "accel" as const,
                  },
                  {
                    clause: "Alienation",
                    who: "Lender",
                    trigger: "Sale / transfer",
                    effect: "Loan can be called due on transfer",
                    tone: "alien" as const,
                  },
                  {
                    clause: "Defeasance",
                    who: "Both (structure of the lien)",
                    trigger: "Full payoff",
                    effect: "Mortgage lien is released / defeated",
                    tone: "defeat" as const,
                  },
                  {
                    clause: "Prepayment penalty",
                    who: "Lender (if in the loan)",
                    trigger: "Early payoff / refinance",
                    effect: "Extra fee may be owed",
                    tone: "prep" as const,
                  },
                ].map((row, i) => (
                  <tr
                    key={row.clause}
                    className={i % 2 === 0 ? "bg-[#eef2f7]" : "bg-white"}
                  >
                    <td className="px-3 py-2.5 font-semibold text-brand-navy">
                      {row.clause}
                    </td>
                    <td className="px-3 py-2.5 text-brand-graphite">
                      {row.who}
                    </td>
                    <td className="px-3 py-2.5 text-brand-graphite">
                      {row.trigger}
                    </td>
                    <td className="px-3 py-2.5 text-brand-graphite">
                      {row.effect}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="overflow-hidden border border-brand-navy/20 bg-white shadow-sm">
          <div className="flex items-center gap-2 bg-brand-navy px-4 py-3 text-brand-ivory">
            <Lightbulb
              className="h-4 w-4 shrink-0 text-brand-brass"
              strokeWidth={1.5}
            />
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em]">
              Key terms · glossary
            </p>
          </div>
          <div className="grid gap-3 bg-[#f4f6f8] p-3 sm:grid-cols-2 xl:grid-cols-3">
            {glossary.map((item) => (
              <article
                key={item.title}
                className="border border-brand-navy/10 bg-white p-4 shadow-sm"
              >
                <p className="text-sm font-semibold text-brand-navy">
                  {item.title}
                </p>
                <p className="mt-1.5 text-[13px] leading-5 text-brand-graphite">
                  {item.detail}
                </p>
                <p className="mt-3 flex gap-2 border border-amber-200 bg-amber-50 px-2.5 py-2 text-[12px] leading-4 text-brand-navy">
                  <Brain
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-700"
                    strokeWidth={1.5}
                  />
                  {item.tip}
                </p>
              </article>
            ))}
          </div>
        </section>

        <aside className="flex gap-3 border border-amber-300/80 bg-gradient-to-r from-amber-50 to-brand-brass/10 px-4 py-3.5">
          <ShieldAlert
            className="mt-0.5 h-5 w-5 shrink-0 text-amber-700"
            strokeWidth={1.5}
          />
          <p className="text-[13px] leading-5 text-brand-navy/90">
            <span className="font-semibold">Don't confuse:</span> Borrower
            paying extra principal early is <em>prepayment</em> (may trigger a
            penalty). <em>Lender acceleration</em> is the lender calling the
            full balance after default - different direction, same "speeds up
            the loan" idea.
          </p>
        </aside>

        <div className="overflow-hidden border border-sky-400/40 bg-sky-50 shadow-sm">
          <SectionLabel tone="sky">Remember</SectionLabel>
          <ul className="grid gap-2 p-4 sm:grid-cols-2">
            {[
              "Acceleration → default → balance due now",
              "Alienation → transfer → due-on-sale risk",
              "Defeasance → payoff → lien released",
              "Prepayment penalty → early exit fee (if any)",
            ].map((item) => (
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
        </div>

        <footer className="flex items-center justify-center gap-3 bg-brand-navy px-4 py-4 text-center text-brand-ivory">
          <Gavel
            className="hidden h-4 w-4 shrink-0 text-brand-brass sm:block"
            strokeWidth={1.5}
          />
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] sm:text-[12px]">
            Master purpose · trigger · effect
          </p>
          <Star
            className="hidden h-4 w-4 shrink-0 text-brand-brass sm:block"
            fill="currentColor"
            strokeWidth={0}
          />
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
            href="/guides/adjustable-rate-mortgage"
            className="text-brand-navy underline underline-offset-4"
          >
            ARM Guide
          </Link>
        </p>
      </div>
    </main>
  );
}

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  Banknote,
  Building2,
  Check,
  CreditCard,
  Flag,
  Hammer,
  Home,
  Landmark,
  Layers,
  Lightbulb,
  Lock,
  Package,
  Percent,
  RefreshCw,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { cn } from "@/lib/utils";

type GroupTone = "program" | "rate" | "payment" | "special" | "equity";

const groups: {
  tone: GroupTone;
  title: string;
  blurb: string;
}[] = [
  {
    tone: "program",
    title: "Loan programs",
    blurb: "Who backs or buys the loan - market conforming vs FHA/VA.",
  },
  {
    tone: "rate",
    title: "Rate structure",
    blurb: "Whether the interest rate stays fixed or can change.",
  },
  {
    tone: "payment",
    title: "Payment structure",
    blurb:
      "How principal is repaid - fully amortizing, balloon, or interest-only.",
  },
  {
    tone: "special",
    title: "Special purpose",
    blurb: "Loans built for a specific job (build, bundle, multi-property).",
  },
  {
    tone: "equity",
    title: "Equity & transitional",
    blurb: "Borrowing against equity or bridging a timing gap.",
  },
];

const mortgageTypes: {
  n: number;
  title: string;
  summary: string;
  tone: GroupTone;
  icon: LucideIcon;
  href?: string;
}[] = [
  {
    n: 1,
    title: "Conventional",
    summary:
      'Not insured/guaranteed by the government. Conforming loans follow Fannie Mae / Freddie Mac rules; larger "jumbo" loans are still conventional but non-conforming.',
    tone: "program",
    icon: Home,
  },
  {
    n: 2,
    title: "FHA",
    summary:
      "Insured by the Federal Housing Administration. Minimum down payment is often 3.5% (commonly with a 580+ decision credit score; lower scores may require more down).",
    tone: "program",
    icon: Shield,
  },
  {
    n: 3,
    title: "VA",
    summary:
      "Guaranteed by the Dept. of Veterans Affairs for eligible veterans, service members, and some surviving spouses - often $0 down.",
    tone: "program",
    icon: Flag,
  },
  {
    n: 4,
    title: "Adjustable Rate (ARM)",
    summary:
      "Rate is fixed for an initial period, then adjusts periodically (e.g. 5/1, 7/1).",
    tone: "rate",
    icon: TrendingUp,
    href: "/guides/adjustable-rate-mortgage",
  },
  {
    n: 5,
    title: "Fixed Rate",
    summary:
      "Interest rate and principal & interest payment stay the same for the full term (10-30 years common).",
    tone: "rate",
    icon: Lock,
    href: "/guides/fixed-rate-mortgage",
  },
  {
    n: 6,
    title: "Balloon",
    summary:
      'Regular payments for a set period (sometimes calculated as if amortized longer), then a large remaining principal ("balloon") is due at maturity.',
    tone: "payment",
    icon: Percent,
  },
  {
    n: 7,
    title: "Straight / Interest-Only",
    summary:
      "Pay interest during the term; little or no principal is paid down, so the principal is typically due in full at maturity.",
    tone: "payment",
    icon: Banknote,
  },
  {
    n: 8,
    title: "Blanket",
    summary:
      "One loan secured by multiple properties - common for developers or investors.",
    tone: "special",
    icon: Layers,
  },
  {
    n: 9,
    title: "Package",
    summary:
      "Finances real estate plus personal property (e.g. appliances) in one loan.",
    tone: "special",
    icon: Package,
  },
  {
    n: 10,
    title: "Construction",
    summary:
      "Short-term financing to build or substantially improve; often converts or refinances when complete.",
    tone: "special",
    icon: Hammer,
  },
  {
    n: 11,
    title: "Bridge Loan",
    summary:
      "Short-term loan to bridge buying a new home before the old one sells (or settles).",
    tone: "equity",
    icon: Building2,
  },
  {
    n: 12,
    title: "Wrap-Around",
    summary:
      'Seller financing that "wraps" an existing mortgage - high due-on-sale and counsel risk; uncommon today.',
    tone: "equity",
    icon: RefreshCw,
  },
  {
    n: 13,
    title: "Reverse Mortgage",
    summary:
      "For older homeowners (HECM: youngest borrower typically 62+): draw equity; usually due when the home is sold, no longer the primary residence, or on the borrower's death (taxes/insurance must stay current).",
    tone: "equity",
    icon: RefreshCw,
  },
  {
    n: 14,
    title: "Home Equity Loan (HEL)",
    summary:
      "Lump-sum loan secured by home equity - often a second lien; typically fixed rate and fixed payments.",
    tone: "equity",
    icon: Wallet,
  },
  {
    n: 15,
    title: "HELOC",
    summary:
      "Revolving line of credit against equity - draw what you need during the draw period; rates are often variable.",
    tone: "equity",
    icon: CreditCard,
  },
];

const deepLinks = [
  {
    title: "Fixed-Rate Mortgage",
    detail: "Same rate, same P&I - terms, amortization, pros & cons.",
    href: "/guides/fixed-rate-mortgage",
    icon: Lock,
  },
  {
    title: "ARM & Fixed vs ARM",
    detail: "How ARMs adjust, caps, and when fixed wins.",
    href: "/guides/adjustable-rate-mortgage",
    icon: TrendingUp,
  },
  {
    title: "Clauses & Key Terms",
    detail: "Acceleration, due-on-sale, defeasance, prepayment + glossary.",
    href: "/guides/mortgage-clauses",
    icon: Landmark,
  },
] as const;

function SectionLabel({
  children,
  tone = "navy",
}: {
  children: ReactNode;
  tone?: "navy" | "green" | "sky" | "brass" | "orange" | "violet";
}) {
  return (
    <div
      className={cn(
        "px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white",
        tone === "navy" && "bg-brand-navy",
        tone === "green" && "bg-emerald-700",
        tone === "sky" && "bg-sky-800",
        tone === "brass" && "bg-[#8a6f3a]",
        tone === "orange" && "bg-orange-700",
        tone === "violet" && "bg-violet-800",
      )}
    >
      {children}
    </div>
  );
}

function groupStyles(tone: GroupTone) {
  switch (tone) {
    case "program":
      return {
        border: "border-emerald-400/50",
        art: "from-emerald-100 via-emerald-50 to-white",
        badge: "bg-emerald-700 text-white",
        label: "Loan program",
      };
    case "rate":
      return {
        border: "border-sky-300/60",
        art: "from-sky-100 via-sky-50 to-white",
        badge: "bg-sky-800 text-white",
        label: "Rate structure",
      };
    case "payment":
      return {
        border: "border-orange-300/60",
        art: "from-orange-100 via-orange-50 to-white",
        badge: "bg-orange-700 text-white",
        label: "Payment structure",
      };
    case "special":
      return {
        border: "border-violet-300/60",
        art: "from-violet-100 via-violet-50 to-white",
        badge: "bg-violet-800 text-white",
        label: "Special purpose",
      };
    case "equity":
      return {
        border: "border-amber-300/70",
        art: "from-amber-100 via-[#fbf6ec] to-white",
        badge: "bg-[#8a6f3a] text-white",
        label: "Equity / transitional",
      };
  }
}

function MortgageTreeHero({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 200"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="Illustration of a mortgage as a loan secured by a house"
    >
      <defs>
        <linearGradient id="mtgSky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8eef5" />
          <stop offset="100%" stopColor="#f7f1e6" />
        </linearGradient>
      </defs>
      <rect width="520" height="200" fill="url(#mtgSky)" />
      <ellipse
        cx="260"
        cy="188"
        rx="200"
        ry="16"
        fill="#0f1c2e"
        opacity="0.06"
      />

      {/* Bank / lender */}
      <g transform="translate(40,48)">
        <rect x="0" y="36" width="90" height="70" fill="#0f1c2e" />
        <path d="M0 36L45 8l45 28H0z" fill="#0f1c2e" />
        <rect x="14" y="50" width="14" height="22" fill="#b08d57" />
        <rect x="38" y="50" width="14" height="22" fill="#b08d57" />
        <rect x="62" y="50" width="14" height="22" fill="#b08d57" />
        <text
          x="45"
          y="128"
          textAnchor="middle"
          fill="#0f1c2e"
          fontSize="11"
          fontWeight="600"
          fontFamily="system-ui,sans-serif"
        >
          Lender
        </text>
      </g>

      <path d="M140 95h70" stroke="#b08d57" strokeWidth="2.5" fill="none" />
      <path d="M202 88l12 7-12 7" fill="#b08d57" />

      {/* Loan document */}
      <g transform="translate(220,42)">
        <rect
          x="0"
          y="8"
          width="80"
          height="100"
          rx="3"
          fill="#fffdf8"
          stroke="#0f1c2e"
          strokeWidth="2"
        />
        <rect
          x="12"
          y="24"
          width="40"
          height="5"
          rx="1"
          fill="#0f1c2e"
          opacity="0.35"
        />
        <rect
          x="12"
          y="38"
          width="56"
          height="3"
          rx="1"
          fill="#0f1c2e"
          opacity="0.2"
        />
        <rect
          x="12"
          y="48"
          width="50"
          height="3"
          rx="1"
          fill="#0f1c2e"
          opacity="0.2"
        />
        <text
          x="40"
          y="78"
          textAnchor="middle"
          fill="#0f1c2e"
          fontSize="11"
          fontWeight="700"
          fontFamily="system-ui,sans-serif"
        >
          LOAN
        </text>
        <circle cx="40" cy="92" r="10" fill="#059669" />
        <path d="M35 92l3 3 7-8" stroke="#fff" strokeWidth="2" fill="none" />
        <text
          x="40"
          y="128"
          textAnchor="middle"
          fill="#0f1c2e"
          fontSize="11"
          fontWeight="600"
          fontFamily="system-ui,sans-serif"
        >
          Mortgage
        </text>
      </g>

      <path d="M310 95h70" stroke="#b08d57" strokeWidth="2.5" fill="none" />
      <path d="M372 88l12 7-12 7" fill="#b08d57" />

      {/* House collateral */}
      <g transform="translate(395,40)">
        <path d="M50 40L20 22L-10 40v50h60V40z" fill="#0f1c2e" />
        <rect x="12" y="58" width="16" height="24" fill="#f4f6f8" />
        <rect x="-2" y="48" width="12" height="10" fill="#b08d57" />
        <rect x="34" y="48" width="12" height="10" fill="#b08d57" />
        <text
          x="28"
          y="118"
          textAnchor="middle"
          fill="#0f1c2e"
          fontSize="11"
          fontWeight="600"
          fontFamily="system-ui,sans-serif"
        >
          Collateral
        </text>
        <text
          x="28"
          y="132"
          textAnchor="middle"
          fill="#5c6670"
          fontSize="9"
          fontFamily="system-ui,sans-serif"
        >
          real property
        </text>
      </g>
    </svg>
  );
}

export default function RealEstateMortgages() {
  usePageMetadata({
    title: "How Mortgages Work",
    description:
      "Mortgage family tree: conventional, FHA, VA, fixed, ARM, balloon, equity loans, and more - educational overview for housing decisions.",
    path: "/guides/how-mortgages-work",
  });

  return (
    <main className="bg-[#f4f6f8] text-brand-navy">
      <header className="border-b border-brand-navy/10 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)] lg:items-center lg:px-10 lg:py-12">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-brand-brass">
              Educational guide
            </p>
            <h1 className="mt-3 font-display text-[clamp(1.85rem,4vw,2.75rem)] font-medium leading-[0.98] tracking-[-0.02em] text-brand-navy">
              How Mortgages Work
            </h1>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-navy/70 sm:text-[15px]">
              A loan secured by real property
            </p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-brand-graphite">
              In everyday language, "mortgage" means the home loan. More
              precisely, the{" "}
              <span className="font-semibold text-brand-navy">
                promissory note
              </span>{" "}
              creates the debt and the{" "}
              <span className="font-semibold text-brand-navy">mortgage</span>{" "}
              (or deed of trust, in some states) pledges the property as
              collateral. Think in five groups - program, rate, payment shape,
              special purpose, and equity tools - then drill into fixed, ARM,
              and key clauses. Educational overview only - not lending or legal
              advice.
            </p>
          </div>
          <div className="overflow-hidden border border-brand-navy/15 bg-[#eef2f7] shadow-sm">
            <MortgageTreeHero />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-5 px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
        <section className="overflow-hidden border border-brand-navy/20 bg-white shadow-sm">
          <SectionLabel>Five big groups</SectionLabel>
          <div className="grid gap-2 bg-[#f4f6f8] p-3 sm:grid-cols-2 lg:grid-cols-5">
            {groups.map((g) => {
              const styles = groupStyles(g.tone);
              return (
                <div
                  key={g.title}
                  className={cn("border bg-white p-3", styles.border)}
                >
                  <span
                    className={cn(
                      "inline-flex px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em]",
                      styles.badge,
                    )}
                  >
                    {styles.label}
                  </span>
                  <p className="mt-2 text-sm font-semibold text-brand-navy">
                    {g.title}
                  </p>
                  <p className="mt-1 text-[12px] leading-4 text-brand-graphite">
                    {g.blurb}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="border-t border-brand-navy/10 px-4 py-2.5 text-[12px] leading-5 text-brand-graphite">
            Note:{" "}
            <span className="font-semibold text-emerald-800">Conventional</span>{" "}
            sits with FHA/VA as a loan <em>program</em> group - but it is{" "}
            <span className="font-semibold">not</span> government-insured. FHA
            is insured; VA is guaranteed.
          </p>
        </section>

        <section className="overflow-hidden border border-brand-navy/20 bg-white shadow-sm">
          <div className="flex items-center gap-2 bg-brand-navy px-4 py-3 text-brand-ivory">
            <Sparkles
              className="h-4 w-4 shrink-0 text-brand-brass"
              strokeWidth={1.5}
            />
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em]">
              Mortgage family tree · 15 types
            </p>
          </div>
          <div className="grid gap-3 bg-[#f4f6f8] p-3 sm:grid-cols-2 xl:grid-cols-3">
            {mortgageTypes.map((item) => {
              const styles = groupStyles(item.tone);
              const body = (
                <>
                  <div
                    className={cn(
                      "relative h-24 bg-gradient-to-br px-4 pt-4",
                      styles.art,
                    )}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(circle_at_20%_30%,rgba(15,28,46,0.16),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(176,141,87,0.28),transparent_40%)]"
                      aria-hidden
                    />
                    <div className="relative flex items-start justify-between gap-2">
                      <span className="inline-flex h-11 w-11 items-center justify-center bg-white/95 text-brand-navy shadow-sm">
                        <item.icon className="h-5 w-5" strokeWidth={1.5} />
                      </span>
                      <span className="bg-brand-navy px-2 py-1 text-[10px] font-semibold text-brand-ivory">
                        {String(item.n).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="relative mt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-navy/55">
                      {styles.label}
                    </p>
                  </div>
                  <div className="px-4 py-3.5">
                    <p className="text-sm font-semibold text-brand-navy">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-[13px] leading-5 text-brand-graphite">
                      {item.summary}
                    </p>
                    {item.href ? (
                      <span className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-brand-navy">
                        Open guide{" "}
                        <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                      </span>
                    ) : null}
                  </div>
                </>
              );
              return item.href ? (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cn(
                    "overflow-hidden border bg-white shadow-sm transition hover:shadow-md",
                    styles.border,
                  )}
                >
                  {body}
                </Link>
              ) : (
                <article
                  key={item.title}
                  className={cn(
                    "overflow-hidden border bg-white shadow-sm",
                    styles.border,
                  )}
                >
                  {body}
                </article>
              );
            })}
          </div>
        </section>

        <section className="overflow-hidden border border-brand-navy/20 bg-white shadow-sm">
          <SectionLabel tone="brass">Go deeper</SectionLabel>
          <div className="grid gap-3 bg-[#f4f6f8] p-3 md:grid-cols-3">
            {deepLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-start gap-3 border border-brand-navy/15 bg-white px-4 py-4 shadow-sm transition hover:border-brand-brass/50"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-brand-navy text-brand-brass">
                  <item.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-brand-navy">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-[13px] leading-5 text-brand-graphite">
                    {item.detail}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <aside className="overflow-hidden border border-amber-300/70 bg-amber-50 shadow-sm">
            <SectionLabel tone="brass">Memory tip</SectionLabel>
            <div className="space-y-3 p-4">
              <div className="flex gap-3">
                <Lightbulb
                  className="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
                  strokeWidth={1.5}
                />
                <p className="text-[13px] leading-5 text-brand-navy/90">
                  Sort every mortgage by{" "}
                  <span className="font-semibold">program</span>,{" "}
                  <span className="font-semibold">rate</span>,{" "}
                  <span className="font-semibold">payment shape</span>,{" "}
                  <span className="font-semibold">special job</span>, or{" "}
                  <span className="font-semibold">equity tool</span> - then ask
                  what problem it solves.
                </p>
              </div>
              <div className="border border-amber-200/80 bg-white/80 px-3 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-navy/60">
                  Quick phrase
                </p>
                <p className="mt-1 text-sm font-semibold text-brand-navy">
                  Programs · Rates · Payments · Special · Equity
                </p>
              </div>
            </div>
          </aside>

          <aside className="overflow-hidden border border-sky-400/40 bg-sky-50 shadow-sm">
            <SectionLabel tone="sky">Key takeaways</SectionLabel>
            <ul className="space-y-2 p-4">
              {[
                "Note = debt · Mortgage/deed of trust = property lien",
                "Conventional ≠ government-backed; FHA insured / VA guaranteed",
                "Fixed vs ARM is about rate risk over time",
                "Equity products borrow against what you already own",
                "Always read clauses - due-on-sale and acceleration matter",
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-[13px] leading-5 text-brand-navy"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                    strokeWidth={2.5}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <footer className="flex items-center justify-center gap-3 bg-brand-navy px-4 py-4 text-center text-brand-ivory">
          <Star
            className="hidden h-4 w-4 shrink-0 text-brand-brass sm:block"
            fill="currentColor"
            strokeWidth={0}
          />
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] sm:text-[12px]">
            Focus on purpose, payment structure, program, and equity
          </p>
          <Star
            className="hidden h-4 w-4 shrink-0 text-brand-brass sm:block"
            fill="currentColor"
            strokeWidth={0}
          />
        </footer>

        <p className="pb-6 text-center text-sm text-brand-graphite">
          <Link
            href="/guides"
            className="text-brand-navy underline underline-offset-4"
          >
            All Guides
          </Link>
          {" · "}
          <Link
            href="/guides/real-estate-deeds"
            className="text-brand-navy underline underline-offset-4"
          >
            Deeds
          </Link>
          {" · "}
          <Link
            href="/guides/real-estate-ownership"
            className="text-brand-navy underline underline-offset-4"
          >
            Ownership
          </Link>
        </p>
      </div>
    </main>
  );
}

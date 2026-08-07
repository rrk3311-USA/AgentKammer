import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "wouter";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  Check,
  FileKey,
  FileText,
  Gavel,
  KeyRound,
  Lightbulb,
  Scale,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stamp,
  Star,
  Users,
} from "lucide-react";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { cn } from "@/lib/utils";

type ProtectionTone =
  "best" | "good" | "limited" | "situational" | "caution" | "nyc";

const whyDeedsMatter = [
  { text: "Evidences the transfer on the public record", icon: ShieldCheck },
  { text: "Transfers legal title from grantor to grantee", icon: Users },
  { text: "Recording gives constructive notice to the world", icon: Building2 },
  { text: "Helps protect against future ownership disputes", icon: Shield },
] as const;

const deedTypes: {
  title: string;
  summary: string;
  points: string[];
  protection: string;
  tone: ProtectionTone;
  icon: LucideIcon;
  art: string;
}[] = [
  {
    title: "General Warranty Deed",
    summary:
      "Strongest ordinary protection for a buyer - grantor warrants title against claims, including from prior owners.",
    points: [
      "Full covenants / warranties (scope varies by state form)",
      "Most common in many U.S. home sales",
      "Buyer still relies on title search + title insurance",
    ],
    protection: "Best protection",
    tone: "best",
    icon: ShieldCheck,
    art: "from-emerald-100 via-emerald-50 to-white",
  },
  {
    title: "Special Warranty Deed",
    summary:
      "Grantor warrants title only against claims arising during their ownership - not the full past chain.",
    points: [
      "Limited look-back vs general warranty",
      "Common in some commercial and investor sales",
      "Still better protection than quitclaim",
    ],
    protection: "Good protection",
    tone: "good",
    icon: Shield,
    art: "from-sky-100 via-sky-50 to-white",
  },
  {
    title: "Bargain and Sale Deed",
    summary:
      "Standard New York residential form - conveys the grantor's interest. Arms-length NY sales usually use a bargain & sale deed with covenants against the grantor's acts.",
    points: [
      "With covenants ≈ limited warranty for the grantor's period",
      "Without covenants, protection is much thinner",
      "Title search + title insurance remain central for buyers",
    ],
    protection: "NY common form",
    tone: "nyc",
    icon: Building2,
    art: "from-[#f3e8cf] via-[#fbf6ec] to-white",
  },
  {
    title: "Quitclaim Deed",
    summary:
      "Transfers whatever interest the grantor may have - with no warranties that title is good or even exists.",
    points: [
      "Often used for family transfers or clearing clouds",
      "Does not prove the grantor owns clear title",
      "Use with caution as a buyer's primary deed",
    ],
    protection: "Limited protection",
    tone: "limited",
    icon: FileText,
    art: "from-amber-100 via-amber-50 to-white",
  },
  {
    title: "Special Purpose Deed",
    summary:
      "Used for a specific job - correcting title, releasing a claim, or fulfilling a court/administrative need.",
    points: [
      "Examples: correction deed, release deed, executor deed variants",
      "Warranties depend on the form and purpose",
      "Situational - not a default purchase deed",
    ],
    protection: "Situational use",
    tone: "situational",
    icon: Stamp,
    art: "from-violet-100 via-violet-50 to-white",
  },
  {
    title: "Sheriff's / Referee's Deed",
    summary:
      "Issued through foreclosure or court sale - transfers only the interest that can be conveyed in that proceeding.",
    points: [
      "Buyer beware: limited or no warranties",
      "Title defects and liens may still matter",
      "Extra diligence and counsel are essential",
    ],
    protection: "Buyer beware",
    tone: "caution",
    icon: Gavel,
    art: "from-rose-100 via-rose-50 to-white",
  },
] as const;

const deedParts = [
  {
    title: "Grantor",
    detail: "The person or entity transferring the property",
    icon: Users,
  },
  {
    title: "Grantee",
    detail: "The person or entity receiving the property",
    icon: KeyRound,
  },
  {
    title: "Legal description",
    detail: "Exact property description (not just the street address)",
    icon: FileText,
  },
  {
    title: "Consideration",
    detail:
      'Value exchanged is usually recited - price, or "love and affection," etc.',
    icon: Scale,
  },
  {
    title: "Granting / habendum language",
    detail:
      'Words of conveyance, and often a "to have and to hold" clause defining the estate',
    icon: FileKey,
  },
  {
    title: "Covenants / warranties",
    detail: "Promises about title - if any - made by the grantor",
    icon: Shield,
  },
  {
    title: "Signatures & acknowledgment",
    detail:
      "Grantor must sign; notarized acknowledgment is typically required to record",
    icon: Stamp,
  },
] as const;

const deliverySteps = [
  {
    step: "01",
    title: "Grantor signs & delivers",
    detail:
      "Between the parties, title usually passes when a valid deed is delivered with intent to transfer.",
    visual: "sign" as const,
  },
  {
    step: "02",
    title: "Closing / acceptance",
    detail: "Grantee accepts; funds, conditions, and closing documents align.",
    visual: "accept" as const,
  },
  {
    step: "03",
    title: "Record in land records",
    detail:
      "Filed with the county clerk / recorder to give public (constructive) notice.",
    visual: "record" as const,
  },
  {
    step: "04",
    title: "Grantee is owner of record",
    detail:
      "Recording protects against later buyers or creditors who might otherwise claim without notice.",
    visual: "own" as const,
  },
] as const;

const comparisonRows = [
  {
    type: "General Warranty",
    warranties: "Full",
    pastOwners: "Yes (typically)",
    use: "Many residential sales",
    level: "Highest",
    tone: "best" as const,
  },
  {
    type: "Special Warranty",
    warranties: "Limited to grantor's period",
    pastOwners: "No",
    use: "Commercial / some residential",
    level: "High",
    tone: "good" as const,
  },
  {
    type: "Bargain & Sale (NY)",
    warranties: "Often vs grantor's acts only",
    pastOwners: "Usually no",
    use: "Common NY residential form",
    level: "Form + title policy",
    tone: "nyc" as const,
  },
  {
    type: "Quitclaim",
    warranties: "None",
    pastOwners: "No",
    use: "Family / clearing title",
    level: "Low",
    tone: "limited" as const,
  },
  {
    type: "Special Purpose",
    warranties: "As needed",
    pastOwners: "Depends",
    use: "Corrections, releases",
    level: "Varies",
    tone: "situational" as const,
  },
  {
    type: "Sheriff's / Referee's",
    warranties: "None / minimal",
    pastOwners: "No",
    use: "Foreclosure / court sale",
    level: "Very low",
    tone: "caution" as const,
  },
] as const;

const nycNotes = [
  {
    title: "Attorney-driven closings",
    detail:
      "New York residential deals are typically lawyer-led. The deed form is reviewed with counsel - usually a bargain & sale deed with covenants against the grantor's acts, not a general warranty deed.",
  },
  {
    title: "Recording is not optional in practice",
    detail:
      "Title can pass on delivery, but an unrecorded deed leaves you exposed to later purchasers or creditors without notice who record first. Record promptly after closing.",
  },
  {
    title: "Title search + title insurance",
    detail:
      "The deed transfers only what the grantor can convey. Title diligence and an owner's title policy are how buyers manage hidden liens and defects - even with a strong deed form.",
  },
  {
    title: "Co-ops are different",
    detail:
      "Co-op transfers are usually stock/share certificates plus a proprietary lease assignment - not a condo- or house-style deed for the unit itself.",
  },
] as const;

const specialNotes = [
  "Understand the deed type before you sign - warranties are not all equal.",
  "Quitclaim is a tool, not a substitute for clear marketable title on a purchase.",
  "Always run (or update) a title search before relying on ownership.",
  "Recording protects against later conflicting claims; delay creates risk.",
] as const;

const takeaways = [
  "Deed = the instrument that transfers title",
  "Warranties vary by deed type - read the form",
  "In NY, bargain & sale (often with grantor's-acts covenants) + title insurance is the common stack",
  "Delivery usually transfers between the parties; recording protects against the world",
  "Use counsel - especially for NYC condo, co-op, and entity titles",
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

function protectionBorder(tone: ProtectionTone) {
  switch (tone) {
    case "best":
      return "border-emerald-400/60";
    case "good":
      return "border-sky-300/70";
    case "nyc":
      return "border-brand-brass/50";
    case "limited":
      return "border-amber-300/70";
    case "situational":
      return "border-violet-300/70";
    case "caution":
      return "border-rose-300/70";
  }
}

function protectionClasses(tone: ProtectionTone) {
  switch (tone) {
    case "best":
      return "border-emerald-400/60 bg-emerald-50 text-emerald-900";
    case "good":
      return "border-sky-300/70 bg-sky-50 text-sky-950";
    case "nyc":
      return "border-brand-brass/50 bg-[#fbf6ec] text-brand-navy";
    case "limited":
      return "border-amber-300/70 bg-amber-50 text-amber-950";
    case "situational":
      return "border-violet-300/70 bg-violet-50 text-violet-950";
    case "caution":
      return "border-rose-300/70 bg-rose-50 text-rose-950";
  }
}

function shieldFill(tone: ProtectionTone) {
  switch (tone) {
    case "best":
      return "#059669";
    case "good":
      return "#0369a1";
    case "nyc":
      return "#b08d57";
    case "limited":
      return "#d97706";
    case "situational":
      return "#7c3aed";
    case "caution":
      return "#e11d48";
  }
}

/** Hero: grantor → deed → grantee / house */
function DeedTransferIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 200"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="Illustration of a deed transferring ownership from grantor to grantee"
    >
      <defs>
        <linearGradient id="deedSky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8eef5" />
          <stop offset="100%" stopColor="#f7f1e6" />
        </linearGradient>
        <linearGradient id="deedPaper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fffdf8" />
          <stop offset="100%" stopColor="#f3e8cf" />
        </linearGradient>
      </defs>
      <rect width="520" height="200" fill="url(#deedSky)" rx="0" />
      <ellipse
        cx="260"
        cy="188"
        rx="210"
        ry="18"
        fill="#0f1c2e"
        opacity="0.06"
      />

      {/* Grantor figure */}
      <g transform="translate(48,42)">
        <circle cx="36" cy="22" r="16" fill="#0f1c2e" />
        <path d="M12 88c4-28 16-42 24-42s20 14 24 42" fill="#0f1c2e" />
        <rect x="20" y="78" width="32" height="8" rx="2" fill="#b08d57" />
        <text
          x="36"
          y="118"
          textAnchor="middle"
          fill="#0f1c2e"
          fontSize="11"
          fontWeight="600"
          fontFamily="system-ui,sans-serif"
        >
          Grantor
        </text>
        <text
          x="36"
          y="132"
          textAnchor="middle"
          fill="#5c6670"
          fontSize="9"
          fontFamily="system-ui,sans-serif"
        >
          transfers
        </text>
      </g>

      {/* Arrow 1 */}
      <path d="M118 95h48" stroke="#b08d57" strokeWidth="2.5" fill="none" />
      <path d="M158 88l12 7-12 7" fill="#b08d57" />

      {/* Deed document */}
      <g transform="translate(188,38)">
        <rect
          x="0"
          y="8"
          width="88"
          height="112"
          rx="3"
          fill="url(#deedPaper)"
          stroke="#0f1c2e"
          strokeWidth="2"
        />
        <rect
          x="10"
          y="22"
          width="52"
          height="4"
          rx="1"
          fill="#0f1c2e"
          opacity="0.35"
        />
        <rect
          x="10"
          y="34"
          width="68"
          height="3"
          rx="1"
          fill="#0f1c2e"
          opacity="0.2"
        />
        <rect
          x="10"
          y="44"
          width="60"
          height="3"
          rx="1"
          fill="#0f1c2e"
          opacity="0.2"
        />
        <rect
          x="10"
          y="54"
          width="64"
          height="3"
          rx="1"
          fill="#0f1c2e"
          opacity="0.2"
        />
        <rect
          x="10"
          y="64"
          width="48"
          height="3"
          rx="1"
          fill="#0f1c2e"
          opacity="0.2"
        />
        <circle cx="64" cy="92" r="14" fill="#b08d57" />
        <path
          d="M58 92l4 4 8-10"
          stroke="#fff"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
        />
        <text
          x="44"
          y="138"
          textAnchor="middle"
          fill="#0f1c2e"
          fontSize="12"
          fontWeight="700"
          fontFamily="system-ui,sans-serif"
        >
          DEED
        </text>
      </g>

      {/* Arrow 2 */}
      <path d="M292 95h48" stroke="#b08d57" strokeWidth="2.5" fill="none" />
      <path d="M332 88l12 7-12 7" fill="#b08d57" />

      {/* House + key + grantee */}
      <g transform="translate(358,36)">
        <path d="M70 48L38 28L6 48v52h64V48z" fill="#0f1c2e" />
        <path d="M38 18l40 26h-16v48H14V44H-2L38 18z" fill="#0f1c2e" />
        <rect x="28" y="62" width="20" height="28" fill="#f4f6f8" />
        <rect
          x="14"
          y="52"
          width="14"
          height="12"
          fill="#b08d57"
          opacity="0.9"
        />
        <rect
          x="52"
          y="52"
          width="14"
          height="12"
          fill="#b08d57"
          opacity="0.9"
        />
        {/* Key */}
        <g transform="translate(88,72)">
          <circle
            cx="8"
            cy="8"
            r="7"
            fill="none"
            stroke="#b08d57"
            strokeWidth="2.5"
          />
          <path d="M14 10h22v4H26v4h-4v-4h-4v-4h-4z" fill="#b08d57" />
        </g>
        <text
          x="52"
          y="128"
          textAnchor="middle"
          fill="#0f1c2e"
          fontSize="11"
          fontWeight="600"
          fontFamily="system-ui,sans-serif"
        >
          Grantee
        </text>
        <text
          x="52"
          y="142"
          textAnchor="middle"
          fill="#5c6670"
          fontSize="9"
          fontFamily="system-ui,sans-serif"
        >
          receives title
        </text>
      </g>
    </svg>
  );
}

/** Protection spectrum bar */
function ProtectionSpectrum({ className }: { className?: string }) {
  const levels = [
    { label: "Best", tone: "best" as const, sub: "Warranty" },
    { label: "Good", tone: "good" as const, sub: "Special" },
    { label: "NY form", tone: "nyc" as const, sub: "B&S + cov." },
    { label: "Limited", tone: "limited" as const, sub: "Quitclaim" },
    { label: "Varies", tone: "situational" as const, sub: "Special" },
    { label: "Beware", tone: "caution" as const, sub: "Sheriff" },
  ];
  return (
    <div
      className={cn(
        "overflow-hidden border border-brand-navy/15 bg-white",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-brand-navy/10 bg-[#eef2f7] px-4 py-2.5">
        <Sparkles className="h-3.5 w-3.5 text-brand-brass" strokeWidth={1.5} />
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-navy/70">
          Protection spectrum · high → low
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2 p-3 sm:grid-cols-6">
        {levels.map((level, i) => (
          <div
            key={level.label}
            className="flex flex-col items-center text-center"
          >
            <svg viewBox="0 0 48 56" className="h-12 w-10" aria-hidden>
              <path
                d="M24 4L8 10v16c0 12 7 20 16 24 9-4 16-12 16-24V10L24 4z"
                fill={shieldFill(level.tone)}
                opacity={0.95}
              />
              <text
                x="24"
                y="30"
                textAnchor="middle"
                fill="#fff"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui,sans-serif"
              >
                {i + 1}
              </text>
            </svg>
            <p className="mt-1 text-[11px] font-semibold text-brand-navy">
              {level.label}
            </p>
            <p className="text-[10px] text-brand-graphite">{level.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Parchment scroll for key parts */
function DeedScrollIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 320"
      className={cn("mx-auto h-auto w-full max-w-[240px]", className)}
      role="img"
      aria-label="Illustrated parchment scroll representing the key parts of a deed"
    >
      <defs>
        <linearGradient id="scrollPaper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbf6ec" />
          <stop offset="50%" stopColor="#f3e8cf" />
          <stop offset="100%" stopColor="#e8d9b5" />
        </linearGradient>
      </defs>
      {/* Top roll */}
      <ellipse cx="140" cy="28" rx="108" ry="18" fill="#d4c09a" />
      <ellipse
        cx="140"
        cy="24"
        rx="108"
        ry="16"
        fill="#efe2c4"
        stroke="#0f1c2e"
        strokeWidth="2"
      />
      {/* Body */}
      <path
        d="M32 28v250c0 8 16 14 32 10 16-4 32 4 48 4s32-8 48-4c16 4 32-2 32-10V28H32z"
        fill="url(#scrollPaper)"
        stroke="#0f1c2e"
        strokeWidth="2"
      />
      {/* Lines / content hints */}
      <text
        x="140"
        y="70"
        textAnchor="middle"
        fill="#0f1c2e"
        fontSize="13"
        fontWeight="700"
        fontFamily="system-ui,sans-serif"
      >
        DEED
      </text>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <g key={i}>
          <circle cx="58" cy={98 + i * 24} r="8" fill="#0f1c2e" />
          <text
            x="58"
            y={101 + i * 24}
            textAnchor="middle"
            fill="#b08d57"
            fontSize="9"
            fontWeight="700"
            fontFamily="system-ui,sans-serif"
          >
            {i + 1}
          </text>
          <rect
            x="74"
            y={93 + i * 24}
            width={120 - (i % 3) * 12}
            height="6"
            rx="2"
            fill="#0f1c2e"
            opacity="0.22"
          />
        </g>
      ))}
      {/* Fountain pen */}
      <g transform="translate(198,210) rotate(-28)">
        <rect x="0" y="0" width="10" height="70" rx="2" fill="#0f1c2e" />
        <path d="M0 70h10l-5 18z" fill="#b08d57" />
        <rect x="-2" y="18" width="14" height="10" fill="#b08d57" />
      </g>
      {/* Bottom roll */}
      <ellipse
        cx="140"
        cy="292"
        rx="108"
        ry="16"
        fill="#efe2c4"
        stroke="#0f1c2e"
        strokeWidth="2"
      />
      <ellipse
        cx="140"
        cy="296"
        rx="100"
        ry="10"
        fill="#d4c09a"
        opacity="0.7"
      />
    </svg>
  );
}

/** Mini step icon for delivery flow */
function DeliveryStepVisual({
  kind,
}: {
  kind: "sign" | "accept" | "record" | "own";
}) {
  const common = "h-14 w-14";
  if (kind === "sign") {
    return (
      <svg viewBox="0 0 64 64" className={common} aria-hidden>
        <rect
          x="10"
          y="12"
          width="36"
          height="44"
          rx="2"
          fill="#fbf6ec"
          stroke="#0f1c2e"
          strokeWidth="2"
        />
        <path
          d="M18 24h20M18 32h16M18 40h18"
          stroke="#0f1c2e"
          strokeWidth="2"
          opacity="0.35"
        />
        <path
          d="M38 44c8-2 16 6 14 14"
          stroke="#b08d57"
          strokeWidth="2.5"
          fill="none"
        />
        <circle cx="52" cy="58" r="3" fill="#b08d57" />
      </svg>
    );
  }
  if (kind === "accept") {
    return (
      <svg viewBox="0 0 64 64" className={common} aria-hidden>
        <circle cx="24" cy="22" r="10" fill="#0f1c2e" />
        <circle cx="42" cy="24" r="9" fill="#0f1c2e" opacity="0.85" />
        <path d="M8 54c2-14 10-20 16-20s14 6 16 20" fill="#0f1c2e" />
        <path
          d="M30 54c2-12 8-18 14-18 8 0 14 8 16 18"
          fill="#0f1c2e"
          opacity="0.85"
        />
        <path
          d="M22 40l6 6 12-14"
          stroke="#b08d57"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (kind === "record") {
    return (
      <svg viewBox="0 0 64 64" className={common} aria-hidden>
        <rect x="8" y="28" width="48" height="28" fill="#0f1c2e" />
        <path d="M8 28L32 10l24 18" fill="#0f1c2e" />
        <rect x="26" y="38" width="12" height="18" fill="#f4f6f8" />
        <rect x="14" y="34" width="8" height="8" fill="#b08d57" />
        <rect x="42" y="34" width="8" height="8" fill="#b08d57" />
        <circle cx="48" cy="18" r="8" fill="#059669" />
        <path d="M45 18l2 2 4-5" stroke="#fff" strokeWidth="1.8" fill="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" className={common} aria-hidden>
      <path d="M32 8L8 26v30h48V26L32 8z" fill="#0f1c2e" />
      <rect x="26" y="36" width="12" height="20" fill="#f4f6f8" />
      <rect x="14" y="30" width="10" height="10" fill="#b08d57" />
      <rect x="40" y="30" width="10" height="10" fill="#b08d57" />
      <circle cx="48" cy="48" r="10" fill="#b08d57" />
      <path d="M44 48h10M50 44v10" stroke="#fff" strokeWidth="2" />
    </svg>
  );
}

export default function RealEstateDeeds() {
  usePageMetadata({
    title: "How Real Estate Deeds Work",
    description:
      "A clear guide to deed types, essential deed parts, delivery and recording, and New York nuances - educational overview for housing decisions.",
    path: "/guides/real-estate-deeds",
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
              How Real Estate Deeds Work
            </h1>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-navy/70 sm:text-[15px]">
              The key to transferring real property
            </p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-brand-graphite">
              A deed is a legal document that conveys ownership of real property
              from one party (the{" "}
              <span className="font-semibold text-brand-navy">grantor</span>) to
              another (the{" "}
              <span className="font-semibold text-brand-navy">grantee</span>).
              Educational overview only - not legal advice. Confirm forms and
              recording with counsel in the property's jurisdiction.
            </p>
          </div>
          <div className="overflow-hidden border border-brand-navy/15 bg-[#eef2f7] shadow-sm">
            <DeedTransferIllustration />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-5 px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(16rem,1fr)]">
          <section className="overflow-hidden border border-brand-navy/20 bg-white shadow-sm">
            <div className="flex items-center gap-2 bg-brand-navy px-4 py-3 text-brand-ivory">
              <FileKey
                className="h-4 w-4 shrink-0 text-brand-brass"
                strokeWidth={1.5}
              />
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em]">
                What a deed does
              </p>
            </div>
            <div className="grid gap-3 p-4 sm:grid-cols-3">
              {[
                {
                  title: "Conveys",
                  detail:
                    "Moves title interest from grantor → grantee on delivery",
                  icon: ArrowRight,
                },
                {
                  title: "Evidences",
                  detail: "Creates a written trail of the transfer",
                  icon: FileText,
                },
                {
                  title: "Notices",
                  detail: "Recording gives the public constructive notice",
                  icon: Search,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="border border-brand-navy/10 bg-[#eef2f7]/80 px-3 py-3"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center bg-brand-navy text-brand-brass">
                    <item.icon className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                  <p className="mt-2 text-sm font-semibold text-brand-navy">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[13px] leading-5 text-brand-graphite">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <aside className="overflow-hidden border border-brand-brass/40 bg-[#fbf6ec] shadow-sm">
            <SectionLabel tone="brass">Why deeds matter</SectionLabel>
            <ul className="space-y-2.5 p-4">
              {whyDeedsMatter.map((item) => (
                <li
                  key={item.text}
                  className="flex gap-2.5 text-[13px] leading-5 text-brand-navy"
                >
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center bg-brand-navy text-brand-brass">
                    <item.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <ProtectionSpectrum />

        <section className="overflow-hidden border border-brand-navy/20 bg-white shadow-sm">
          <div className="flex items-center gap-2 bg-brand-navy px-4 py-3 text-brand-ivory">
            <Sparkles
              className="h-4 w-4 shrink-0 text-brand-brass"
              strokeWidth={1.5}
            />
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em]">
              Types of deeds · illustrated
            </p>
          </div>
          <div className="grid gap-3 bg-[#f4f6f8] p-3 md:grid-cols-2 xl:grid-cols-3">
            {deedTypes.map((deed) => (
              <article
                key={deed.title}
                className={cn(
                  "overflow-hidden border bg-white shadow-sm",
                  protectionBorder(deed.tone),
                )}
              >
                <div
                  className={cn(
                    "relative h-28 bg-gradient-to-br px-4 pt-4",
                    deed.art,
                  )}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.2] [background-image:radial-gradient(circle_at_20%_30%,rgba(15,28,46,0.16),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(176,141,87,0.28),transparent_40%)]"
                    aria-hidden
                  />
                  <div className="relative flex items-start justify-between gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center bg-white/95 text-brand-navy shadow-sm">
                      <deed.icon className="h-6 w-6" strokeWidth={1.5} />
                    </span>
                    <svg
                      viewBox="0 0 40 46"
                      className="h-10 w-8 drop-shadow-sm"
                      aria-hidden
                    >
                      <path
                        d="M20 3L6 8v14c0 10 6 17 14 20 8-3 14-10 14-20V8L20 3z"
                        fill={shieldFill(deed.tone)}
                      />
                    </svg>
                  </div>
                  <p className="relative mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-navy/55">
                    {deed.protection}
                  </p>
                </div>
                <div
                  className={cn("px-4 py-3.5", protectionClasses(deed.tone))}
                >
                  <h2 className="text-sm font-semibold uppercase tracking-[0.08em]">
                    {deed.title}
                  </h2>
                  <p className="mt-2 text-[13px] leading-5 opacity-90">
                    {deed.summary}
                  </p>
                  <ul className="mt-3 space-y-1.5 text-[12px] leading-4 opacity-85">
                    {deed.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-current opacity-50" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)]">
          <section className="overflow-hidden border border-brand-navy/20 bg-[#fbf6ec] shadow-sm">
            <SectionLabel tone="brass">Key parts of a deed</SectionLabel>
            <div className="grid gap-2 p-4 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] sm:items-center">
              <DeedScrollIllustration />
              <ol className="space-y-2">
                {deedParts.map((part, index) => (
                  <li
                    key={part.title}
                    className="flex items-start gap-3 border border-brand-navy/10 bg-white/90 px-3 py-2.5"
                  >
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center bg-brand-navy text-[11px] font-semibold text-brand-brass">
                      {index + 1}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-brand-navy">
                        {part.title}
                      </span>
                      <span className="mt-0.5 block text-[12px] leading-5 text-brand-graphite">
                        {part.detail}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="overflow-hidden border border-emerald-600/25 bg-white shadow-sm">
            <SectionLabel tone="green">Deed delivery & recording</SectionLabel>
            <div className="border-b border-emerald-100 bg-gradient-to-b from-emerald-50/80 to-white px-3 py-4">
              <div className="grid gap-3 sm:grid-cols-4">
                {deliverySteps.map((item, index) => (
                  <div
                    key={item.step}
                    className="relative flex flex-col items-center text-center"
                  >
                    {index < deliverySteps.length - 1 ? (
                      <div
                        className="pointer-events-none absolute left-[58%] top-7 hidden h-0.5 w-[84%] bg-brand-brass/50 sm:block"
                        aria-hidden
                      />
                    ) : null}
                    <div className="relative z-[1] flex h-16 w-16 items-center justify-center border border-emerald-200 bg-white shadow-sm">
                      <DeliveryStepVisual kind={item.visual} />
                    </div>
                    <span className="mt-2 bg-emerald-700 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white">
                      {item.step}
                    </span>
                    <p className="mt-1.5 text-[12px] font-semibold leading-4 text-emerald-950">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <ol className="space-y-2 p-3">
              {deliverySteps.map((item) => (
                <li
                  key={item.step}
                  className="flex gap-3 border border-emerald-200/70 bg-emerald-50/50 px-3 py-3"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-emerald-700 text-[11px] font-semibold text-white">
                    {item.step}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-emerald-950">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block text-[12px] leading-5 text-brand-graphite">
                      {item.detail}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="flex gap-2 border-t border-amber-300 bg-amber-50 px-4 py-2.5 text-[12px] leading-4 text-brand-navy/85">
              <AlertTriangle
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-700"
                strokeWidth={1.5}
              />
              Signing alone is not enough - delivery (with intent) usually
              transfers between the parties; recording protects you against
              later claimants without notice.
            </div>
          </section>
        </div>

        <section className="overflow-hidden border border-brand-navy/20 bg-white shadow-sm">
          <SectionLabel>Deed comparison chart</SectionLabel>
          <div className="overflow-x-auto">
            <table className="min-w-[760px] w-full text-left text-[12px] sm:text-[13px]">
              <thead className="bg-brand-navy text-[10px] uppercase tracking-[0.12em] text-brand-ivory">
                <tr>
                  <th className="px-3 py-3 font-semibold">Deed type</th>
                  <th className="px-3 py-3 font-semibold">Warranties</th>
                  <th className="px-3 py-3 font-semibold">
                    Covers past owners?
                  </th>
                  <th className="px-3 py-3 font-semibold">Common use</th>
                  <th className="px-3 py-3 font-semibold">Protection</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr
                    key={row.type}
                    className={index % 2 === 0 ? "bg-[#eef2f7]" : "bg-white"}
                  >
                    <td className="border-l-4 border-brand-brass px-3 py-2.5 font-semibold text-brand-navy">
                      <span className="inline-flex items-center gap-2">
                        <svg
                          viewBox="0 0 20 24"
                          className="h-5 w-4 shrink-0"
                          aria-hidden
                        >
                          <path
                            d="M10 1.5L2.5 4.5v7c0 5 3 8.5 7.5 10 4.5-1.5 7.5-5 7.5-10v-7L10 1.5z"
                            fill={shieldFill(row.tone)}
                          />
                        </svg>
                        {row.type}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-brand-graphite">
                      {row.warranties}
                    </td>
                    <td className="px-3 py-2.5 text-brand-graphite">
                      {row.pastOwners}
                    </td>
                    <td className="px-3 py-2.5 text-brand-graphite">
                      {row.use}
                    </td>
                    <td className="px-3 py-2.5">
                      <span
                        className={cn(
                          "inline-flex border px-2 py-1 text-[11px] font-semibold",
                          protectionClasses(row.tone),
                        )}
                      >
                        {row.level}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-2">
          <section className="overflow-hidden border border-brand-navy/20 bg-[#eef2f7] shadow-sm">
            <SectionLabel>New York / Manhattan notes</SectionLabel>
            <ul className="divide-y divide-brand-navy/10">
              {nycNotes.map((item) => (
                <li key={item.title} className="bg-white/75 px-4 py-3">
                  <p className="text-sm font-semibold text-brand-navy">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[13px] leading-5 text-brand-graphite">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
            <p className="border-t border-brand-navy/10 px-4 py-2.5 text-[12px] leading-5 text-brand-graphite">
              Related:{" "}
              <Link
                href="/guides/real-estate-ownership"
                className="text-brand-navy underline underline-offset-2"
              >
                Ownership structures
              </Link>
              {" · "}
              <Link
                href="/situations/condo-vs-coop-foreign-buyers-nyc"
                className="text-brand-navy underline underline-offset-2"
              >
                Condo vs Co-op
              </Link>
            </p>
          </section>

          <section className="overflow-hidden border border-amber-300/70 bg-amber-50 shadow-sm">
            <SectionLabel tone="brass">Special notes</SectionLabel>
            <ul className="space-y-2.5 p-4">
              {specialNotes.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 border border-amber-200/80 bg-white/80 px-3 py-2 text-[13px] leading-5 text-brand-navy"
                >
                  <ShieldAlert
                    className="mt-0.5 h-4 w-4 shrink-0 text-amber-700"
                    strokeWidth={1.5}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <section className="overflow-hidden border border-sky-400/40 bg-sky-50 shadow-sm">
            <SectionLabel tone="sky">Key takeaways</SectionLabel>
            <ul className="space-y-2.5 p-4">
              {takeaways.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 border border-sky-200/80 bg-white/90 px-3 py-2 text-[13px] leading-5 text-brand-navy"
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

          <aside className="relative flex flex-col justify-between overflow-hidden border border-brand-brass/40 bg-brand-navy p-5 text-brand-ivory shadow-sm">
            <div
              className="pointer-events-none absolute -right-6 -top-8 h-36 w-36 opacity-20"
              aria-hidden
            >
              <svg viewBox="0 0 120 120" className="h-full w-full">
                <circle
                  cx="40"
                  cy="50"
                  r="22"
                  fill="none"
                  stroke="#b08d57"
                  strokeWidth="8"
                />
                <path d="M58 56h48v12H78v12H66V68H58z" fill="#b08d57" />
              </svg>
            </div>
            <div className="relative">
              <div className="flex items-center gap-2 text-brand-brass">
                <Lightbulb className="h-4 w-4" strokeWidth={1.5} />
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em]">
                  Quick tip
                </p>
              </div>
              <p className="mt-3 text-sm leading-6 text-brand-ivory/90">
                Prefer the market-standard deed form for your jurisdiction - and
                always record. In New York that is often a bargain & sale deed
                with covenants against the grantor's acts, backed by title
                search and title insurance.
              </p>
            </div>
            <div className="relative mt-5 flex items-center gap-2 text-brand-brass">
              <KeyRound className="h-5 w-5" strokeWidth={1.5} />
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em]">
                Record the deed
              </p>
            </div>
          </aside>
        </div>

        <footer className="flex items-center justify-center gap-3 bg-brand-navy px-4 py-4 text-center text-brand-ivory">
          <Star
            className="hidden h-4 w-4 shrink-0 text-brand-brass sm:block"
            fill="currentColor"
            strokeWidth={0}
          />
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] sm:text-[12px]">
            Know the deed type. Confirm the warranties. Record the transfer.
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
            href="/guides/real-estate-ownership"
            className="text-brand-navy underline underline-offset-4"
          >
            Ownership Structures
          </Link>
          {" · "}
          <Link
            href="/guides/how-mortgages-work"
            className="text-brand-navy underline underline-offset-4"
          >
            Mortgages
          </Link>
          {" · "}
          <Link
            href="/contact"
            className="text-brand-navy underline underline-offset-4"
          >
            Contact
          </Link>
        </p>
      </div>
    </main>
  );
}

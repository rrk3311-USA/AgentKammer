import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "wouter";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Building2,
  Check,
  CircleEqual,
  Droplets,
  Hammer,
  Home,
  Layers,
  Landmark,
  Lightbulb,
  MapPin,
  Mountain,
  Package,
  Scale,
  Shield,
  Sparkles,
  Star,
  Trees,
  Users,
  Waves,
  Wrench,
  X,
} from "lucide-react";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { cn } from "@/lib/utils";

const businessEntities = [
  {
    title: "Individual",
    detail: "Person owns property in their own name",
    icon: Users,
  },
  {
    title: "Partnership",
    detail: "2+ people share ownership & profits",
    icon: Users,
  },
  {
    title: "LLC",
    detail: "Flexible entity with liability protection",
    icon: Building2,
  },
  {
    title: "Corporation",
    detail: "Separate legal entity (often taxed as S-Corp or C-Corp)",
    icon: Landmark,
  },
  {
    title: "Joint Venture",
    detail: "Deal-specific collaboration - entity or contract",
    icon: Users,
  },
] as const;

const estateForms = [
  {
    title: "Fee Simple Estate",
    detail:
      "Greatest ownership interest - full control, subject to law & encumbrances",
    icon: Home,
    badge: "Most complete",
  },
  {
    title: "Life Estate",
    detail: "Own for life; remainder passes to another",
    icon: Users,
  },
  {
    title: "Estate for Years",
    detail: "Fixed-term right to use (e.g. 99-year lease)",
    icon: Landmark,
  },
  {
    title: "Leasehold / Periodic",
    detail: "Right to use for a term or renewing period",
    icon: Building2,
  },
  {
    title: "Fee Simple Defeasible",
    detail: "Ownership that can end if a condition is broken",
    icon: Shield,
  },
] as const;

const propertyRights = [
  {
    title: "Riparian rights",
    subtitle: "Rivers & streams",
    detail:
      "Rights tied to land bordering flowing water - use is reasonable and shared, not absolute ownership of the water.",
    icon: Waves,
    art: "from-sky-100 via-sky-50 to-white",
    accent: "text-sky-800",
    border: "border-sky-300/70",
  },
  {
    title: "Littoral rights",
    subtitle: "Lakes & seas",
    detail:
      "Rights for land bordering navigable lakes or oceans - typically to the high-water mark (state rules vary).",
    icon: Trees,
    art: "from-cyan-100 via-sky-50 to-white",
    accent: "text-cyan-900",
    border: "border-cyan-300/70",
  },
  {
    title: "Air rights",
    subtitle: "Space above",
    detail:
      "Right to the airspace above the land - critical in dense cities where unused development rights can transfer.",
    icon: Building2,
    art: "from-violet-100 via-violet-50 to-white",
    accent: "text-violet-900",
    border: "border-violet-300/70",
  },
  {
    title: "Subsurface rights",
    subtitle: "Below the surface",
    detail:
      "Rights beneath the surface (minerals, oil, gas, tunnels) - can be severed from surface ownership.",
    icon: Mountain,
    art: "from-amber-100 via-[#fbf6ec] to-white",
    accent: "text-amber-950",
    border: "border-amber-300/70",
  },
] as const;

const propertyTraits = [
  {
    title: "Immobility",
    detail: "Land cannot be moved - location is fixed.",
    icon: MapPin,
  },
  {
    title: "Location",
    detail: "Value is inseparable from place and context.",
    icon: Landmark,
  },
  {
    title: "Limited supply",
    detail: "Especially scarce in constrained markets like Manhattan.",
    icon: Layers,
  },
  {
    title: "Illiquid",
    detail: "Not instantly sold - time, diligence, and capital required.",
    icon: Scale,
  },
  {
    title: "Improvement adds value",
    detail: "Buildings and upgrades change utility and price.",
    icon: Hammer,
  },
  {
    title: "Durability",
    detail: "Land endures; improvements depreciate and age.",
    icon: Shield,
  },
] as const;

const fixtureExamples = [
  "Built-in dishwasher",
  "Chandelier (typically)",
  "Hardwired appliances",
] as const;
const personalExamples = ["Furniture", "Rugs", "Art / décor"] as const;

const valueDrivers = [
  {
    title: "Supply & demand",
    detail: "Primary driver of market price",
    icon: Scale,
    primary: true,
  },
  {
    title: "Location",
    detail: "Neighborhood, building, and street",
    icon: MapPin,
    primary: false,
  },
  {
    title: "Property use",
    detail: "Residence, pied-à-terre, investment",
    icon: Home,
    primary: false,
  },
  {
    title: "Rate of return",
    detail: "Income / appreciation expectations",
    icon: Sparkles,
    primary: false,
  },
  {
    title: "Condition",
    detail: "Systems, finishes, and improvements",
    icon: Wrench,
    primary: false,
  },
] as const;

const glossaryTerms = [
  {
    title: "Severalty",
    detail: "Owned by one person or one entity alone",
    icon: Users,
  },
  { title: "Parcel", detail: "A defined piece of land", icon: MapPin },
  { title: "Chattel", detail: "Personal property (movable)", icon: Package },
  {
    title: "Partition",
    detail: "Court or agreed division of co-owned property",
    icon: Layers,
  },
  {
    title: "Escheat",
    detail: "Property reverts to the state if no heirs",
    icon: Landmark,
  },
  {
    title: "Settlement / closing",
    detail: "Transfer of title and funds completes",
    icon: Check,
  },
] as const;

const memoryTricks = [
  { left: "River / stream", right: "Riparian", icon: Waves },
  { left: "Lake / sea", right: "Littoral", icon: Droplets },
  { left: "Air rights", right: "Up", icon: ArrowUp },
  { left: "Subsurface", right: "Down", icon: ArrowDown },
  { left: "LLC", right: "Liability shield", icon: Shield },
  { left: "Fee simple", right: "Full ownership", icon: Home },
] as const;

const keyConcepts = [
  { q: "Most complete ownership interest?", a: "Fee simple estate" },
  { q: "Most common entity for investment holds?", a: "LLC" },
  {
    q: "Why is real property often called illiquid?",
    a: "It is not instantly sold",
  },
  { q: "Who creates a trust?", a: "Trustor / settlor" },
  {
    q: "Married couple survivorship form (many states)?",
    a: "Tenancy by the entirety",
  },
  { q: "NYC shares + proprietary lease?", a: "Co-op" },
] as const;

const sidebarEntities = [
  {
    title: "Sole Proprietorship / Individual",
    points: [
      "Owns in personal name",
      "Full personal liability",
      "Simple but no liability shield",
    ],
  },
  {
    title: "Partnership",
    points: [
      "General partners: joint & several liability",
      "Limited partners (LP): liability usually capped",
      "Default pass-through taxation",
    ],
  },
  {
    title: "LLC (Limited Liability Company)",
    points: [
      "Most common for investment holdings",
      "Liability shield if properly maintained",
      "Flexible default tax treatment",
    ],
  },
  {
    title: "Corporation",
    points: [
      "State entity; S or C is a tax election",
      "Strong liability shield",
      "More formalities (bylaws, meetings, stock)",
    ],
  },
  {
    title: "Joint Venture",
    points: [
      "Project-specific collaboration",
      "Often an LLC or partnership agreement",
      "Usually ends when the deal completes",
    ],
  },
] as const;

const entityExamples = [
  {
    entity: "Individual",
    example: "John Doe buys a condo",
    works: "Title in personal name",
    liability: "None - personal assets at risk",
    tax: "Reported on personal return",
  },
  {
    entity: "Partnership",
    example: "Two friends buy a duplex",
    works: "Partnership agreement; title in partnership or nominees",
    liability: "General partners fully liable",
    tax: "Pass-through (Form 1065 / K-1)",
  },
  {
    entity: "LLC (Single-Member)",
    example: "Jane's Property LLC",
    works: "LLC holds title",
    liability: "Shield if formalities kept (not absolute)",
    tax: "Disregarded; rentals usually Schedule E",
  },
  {
    entity: "LLC (Multi-Member)",
    example: "Family Holdings LLC",
    works: "Multiple members via operating agreement",
    liability: "Shield if formalities kept (not absolute)",
    tax: "Default partnership taxation",
  },
  {
    entity: "S Corporation",
    example: "ABC Realty Inc. (S election)",
    works: "Corp owns; IRS S election (Form 2553)",
    liability: "Corporate liability shield",
    tax: "Pass-through; often suboptimal for rentals",
  },
  {
    entity: "C Corporation",
    example: "XYZ Holdings Corp.",
    works: "Corp owns; separate taxpayer",
    liability: "Corporate liability shield",
    tax: "Entity tax + tax on dividends",
  },
  {
    entity: "Joint Venture",
    example: "Developers JV on a project",
    works: "Contract and/or LLC for one deal",
    liability: "Depends on structure",
    tax: "Usually pass-through if partnership/LLC",
  },
] as const;

const otherConcepts = [
  {
    title: "Tenancy in Common",
    detail:
      "Co-owners with undivided interests (can be unequal); each can usually sell or will their share",
  },
  {
    title: "Joint Tenancy",
    detail:
      "Equal shares with right of survivorship (state formalities matter)",
  },
  {
    title: "Tenancy by the Entirety",
    detail:
      "Married spouses in many states (incl. NY) - survivorship + creditor nuances",
  },
  {
    title: "Trust (revocable / irrevocable)",
    detail:
      "Trustee holds title for beneficiaries - estate planning, privacy, and control trade-offs",
  },
  {
    title: "Endowment / Institution",
    detail: "Universities, foundations, and similar long-horizon holders",
  },
] as const;

const nycOwnershipForms = [
  {
    title: "Condo",
    detail:
      'You own the unit in fee (plus a share of common elements). Closest to "regular" real estate title.',
    tone: "navy" as const,
  },
  {
    title: "Co-op",
    detail:
      "Corporation owns the building; you buy shares + a proprietary lease. Board approval and financing rules often differ.",
    tone: "green" as const,
  },
  {
    title: "House / Townhouse",
    detail:
      "Fee ownership of the structure and land (or lot interest) - classic fee-simple residential holding.",
    tone: "brass" as const,
  },
  {
    title: "Leasehold condo / ground lease",
    detail:
      "You own improvements or a unit interest, but land (or a long term) is leased - underwriting and exit can differ.",
    tone: "sky" as const,
  },
] as const;

const missingLayers = [
  {
    title: "Record title vs beneficial owner",
    detail:
      "Who appears on the deed may differ from who economically owns the asset (trusts, nominees, entities).",
  },
  {
    title: "Personal residence vs investment hold",
    detail:
      "Primary homes are often titled individually or as spouses; rentals more often use LLCs for isolation.",
  },
  {
    title: "Foreign owners",
    detail:
      "Non-U.S. buyers can usually purchase, but financing, FIRPTA on sale, and entity choice need specialist review.",
  },
  {
    title: "Guarantees & veil risks",
    detail:
      "Personal loan guarantees, commingling funds, or ignoring formalities can undo liability isolation.",
  },
] as const;

const quickCompare = [
  { entity: "Individual", liability: false, passThrough: true },
  { entity: "Gen. partnership", liability: false, passThrough: true },
  { entity: "LLC", liability: true, passThrough: true },
  { entity: "S-Corp", liability: true, passThrough: true },
  { entity: "C-Corp", liability: true, passThrough: false },
] as const;

const takeaways = [
  "Entity = WHO holds title",
  "Estate = WHAT rights they have",
  "In NYC, condo / co-op / house change the ownership vehicle",
  "LLCs are most common for investment holdings",
  "Separate property LLCs help isolate risk - if maintained",
  "Always confirm structure with a CPA + attorney",
] as const;

function SectionLabel({
  children,
  tone = "navy",
}: {
  children: ReactNode;
  tone?: "navy" | "green" | "sky" | "brass";
}) {
  return (
    <div
      className={cn(
        "px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white",
        tone === "navy" && "bg-brand-navy",
        tone === "green" && "bg-emerald-700",
        tone === "sky" && "bg-sky-800",
        tone === "brass" && "bg-[#8a6f3a]",
      )}
    >
      {children}
    </div>
  );
}

function BoolMark({ ok }: { ok: boolean }) {
  return (
    <span
      className={cn(
        "mx-auto inline-flex h-7 w-7 items-center justify-center rounded-full",
        ok ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-600",
      )}
    >
      {ok ? (
        <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-label="Yes" />
      ) : (
        <X className="h-3.5 w-3.5" strokeWidth={2.5} aria-label="No" />
      )}
    </span>
  );
}

function IllustrativeCard({
  title,
  subtitle,
  detail,
  icon: Icon,
  art,
  accent,
  border,
}: {
  title: string;
  subtitle: string;
  detail: string;
  icon: LucideIcon;
  art: string;
  accent: string;
  border: string;
}) {
  return (
    <div className={cn("overflow-hidden border bg-white shadow-sm", border)}>
      <div className={cn("relative h-24 bg-gradient-to-br px-4 pt-4", art)}>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(circle_at_20%_30%,rgba(15,28,46,0.18),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(176,141,87,0.28),transparent_40%)]"
          aria-hidden
        />
        <span
          className={cn(
            "relative inline-flex h-11 w-11 items-center justify-center bg-white/90 shadow-sm",
            accent,
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </span>
        <p className="relative mt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-navy/55">
          {subtitle}
        </p>
      </div>
      <div className="px-4 py-3.5">
        <p className={cn("text-sm font-semibold", accent)}>{title}</p>
        <p className="mt-1.5 text-[13px] leading-5 text-brand-graphite">
          {detail}
        </p>
      </div>
    </div>
  );
}

export default function RealEstateOwnership() {
  usePageMetadata({
    title: "How Real Estate Ownership Works",
    description:
      "Entities, estates, property rights, fixtures, NYC condo/co-op ownership, and how title structures fit together - educational overview for housing decisions.",
    path: "/guides/real-estate-ownership",
  });

  return (
    <main className="bg-[#f4f6f8] text-brand-navy">
      <header className="border-b border-brand-navy/10 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-10 lg:py-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-brand-brass">
            Educational guide
          </p>
          <h1 className="mt-3 font-display text-[clamp(1.85rem,4vw,2.75rem)] font-medium leading-[0.98] tracking-[-0.02em] text-brand-navy">
            How Real Estate Ownership Works
          </h1>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-navy/70 sm:text-[15px]">
            Know it. Understand it. Own the decision.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-brand-graphite">
            Educational overview only - not legal, tax, or accounting advice.
            Structure decisions with a qualified attorney and CPA.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-5 px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
        <div className="flex items-center gap-2 bg-brand-navy px-4 py-3 text-brand-ivory">
          <Star
            className="h-4 w-4 shrink-0 text-brand-brass"
            fill="currentColor"
            strokeWidth={0}
          />
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em]">
            Two big categories to understand
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.7fr)_minmax(16rem,1fr)]">
          <div className="space-y-4">
            <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
              <section className="overflow-hidden border border-brand-navy/25 bg-[#eef2f7] shadow-sm ring-1 ring-brand-navy/5">
                <SectionLabel>1. Business entities · Who</SectionLabel>
                <ul className="divide-y divide-brand-navy/10">
                  {businessEntities.map((item) => (
                    <li
                      key={item.title}
                      className="flex items-start gap-3 bg-white/70 px-4 py-3"
                    >
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center bg-brand-navy text-brand-ivory">
                        <item.icon className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-brand-navy">
                          {item.title}
                        </span>
                        <span className="mt-0.5 block text-[13px] leading-5 text-brand-graphite">
                          {item.detail}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <div className="hidden items-center justify-center md:flex">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-brand-brass bg-brand-navy text-brand-ivory shadow-md">
                  <CircleEqual className="h-5 w-5" strokeWidth={2} />
                </span>
              </div>

              <section className="overflow-hidden border border-emerald-600/30 bg-[#eaf7f0] shadow-sm ring-1 ring-emerald-700/10">
                <SectionLabel tone="green">
                  2. Forms of ownership · Rights
                </SectionLabel>
                <ul className="divide-y divide-emerald-800/10">
                  {estateForms.map((item) => (
                    <li
                      key={item.title}
                      className="flex items-start gap-3 bg-white/70 px-4 py-3"
                    >
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center bg-emerald-700 text-white">
                        <item.icon className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold text-emerald-950">
                            {item.title}
                          </span>
                          {"badge" in item && item.badge ? (
                            <span className="bg-emerald-700 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white">
                              {item.badge}
                            </span>
                          ) : null}
                        </span>
                        <span className="mt-0.5 block text-[13px] leading-5 text-brand-graphite">
                          {item.detail}
                        </span>
                      </span>
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
                <span className="font-semibold">Think of it this way:</span>{" "}
                <span className="mx-0.5 inline-flex items-center bg-brand-navy px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-ivory">
                  Entity = Who
                </span>{" "}
                <span className="mx-0.5 inline-flex items-center bg-emerald-700 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                  Estate = Rights
                </span>{" "}
                <span className="italic text-brand-graphite">
                  Example: An LLC (entity) can own a Fee Simple Estate (full
                  ownership rights).
                </span>
              </p>
            </aside>
          </div>

          <aside className="overflow-hidden border border-[#c4a46a]/45 bg-[#fbf6ec] shadow-sm ring-1 ring-brand-brass/15">
            <SectionLabel tone="brass">
              Common entities · deeper notes
            </SectionLabel>
            <div className="space-y-3 p-4">
              {sidebarEntities.map((item) => (
                <div
                  key={item.title}
                  className="border border-[#e4d4b0] bg-white/80 px-3 py-2.5"
                >
                  <p className="text-[13px] font-semibold text-brand-navy">
                    {item.title}
                  </p>
                  <ul className="mt-1.5 space-y-1">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-2 text-[12px] leading-4 text-brand-graphite"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-brass" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <section className="overflow-hidden border border-brand-navy/20 bg-white shadow-sm">
          <SectionLabel>Key concepts at a glance</SectionLabel>
          <div className="grid gap-2 bg-[#f4f6f8] p-3 sm:grid-cols-2">
            {keyConcepts.map((item) => (
              <div
                key={item.q}
                className="flex items-start gap-2 border border-brand-navy/10 bg-white px-3 py-2.5 text-[13px] leading-5"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-brand-navy text-brand-brass">
                  <Lightbulb className="h-3.5 w-3.5" strokeWidth={1.5} />
                </span>
                <span className="min-w-0">
                  <span className="block text-brand-graphite">{item.q}</span>
                  <span className="mt-1 inline-flex items-center gap-1.5 font-semibold text-brand-navy">
                    <ArrowRight
                      className="h-3.5 w-3.5 text-emerald-600"
                      strokeWidth={2}
                    />
                    {item.a}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="overflow-hidden border border-brand-navy/20 bg-white shadow-sm">
          <div className="flex items-center gap-2 bg-brand-navy px-4 py-3 text-brand-ivory">
            <Sparkles
              className="h-4 w-4 shrink-0 text-brand-brass"
              strokeWidth={1.5}
            />
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em]">
              Property rights · illustrated
            </p>
          </div>
          <div className="grid gap-3 bg-[#f4f6f8] p-3 sm:grid-cols-2 xl:grid-cols-4">
            {propertyRights.map((item) => (
              <IllustrativeCard key={item.title} {...item} />
            ))}
          </div>
          <p className="border-t border-brand-navy/10 px-4 py-2.5 text-[12px] leading-5 text-brand-graphite">
            Memory:{" "}
            <span className="font-semibold text-sky-800">River → Riparian</span>
            {" · "}
            <span className="font-semibold text-cyan-900">Lake → Littoral</span>
            {" · "}
            <span className="font-semibold text-violet-900">Air = up</span>
            {" · "}
            <span className="font-semibold text-amber-900">
              Subsurface = down
            </span>
          </p>
        </section>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <section className="overflow-hidden border border-brand-navy/20 bg-[#eef2f7] shadow-sm">
            <SectionLabel>Real property characteristics</SectionLabel>
            <ul className="grid gap-2 p-3 sm:grid-cols-2">
              {propertyTraits.map((item) => (
                <li
                  key={item.title}
                  className="flex items-start gap-3 border border-brand-navy/10 bg-white/85 px-3 py-3"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center bg-brand-navy text-brand-brass">
                    <item.icon className="h-4 w-4" strokeWidth={1.5} />
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
            </ul>
          </section>

          <section className="overflow-hidden border border-brand-navy/20 bg-white shadow-sm">
            <SectionLabel tone="brass">
              Fixtures vs personal property
            </SectionLabel>
            <div className="grid gap-3 bg-[#f4f6f8] p-3 sm:grid-cols-[1fr_auto_1fr] sm:items-stretch">
              <div className="border border-emerald-400/50 bg-emerald-50/90 p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center bg-emerald-700 text-white">
                    <Wrench className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-emerald-950">
                      Fixtures
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-emerald-800/70">
                      Part of real property
                    </p>
                  </div>
                </div>
                <ul className="mt-3 space-y-1.5 text-[13px] text-brand-graphite">
                  {fixtureExamples.map((ex) => (
                    <li key={ex} className="flex gap-2">
                      <Check
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600"
                        strokeWidth={2.5}
                      />
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-[11px] font-semibold tracking-[0.14em] text-brand-brass">
                  VS
                </span>
              </div>
              <div className="border border-amber-300/70 bg-[#fbf6ec] p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center bg-[#8a6f3a] text-white">
                    <Package className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-brand-navy">
                      Personal property
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-brand-navy/55">
                      Not part of the realty
                    </p>
                  </div>
                </div>
                <ul className="mt-3 space-y-1.5 text-[13px] text-brand-graphite">
                  {personalExamples.map((ex) => (
                    <li key={ex} className="flex gap-2">
                      <Package
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8a6f3a]"
                        strokeWidth={1.5}
                      />
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="border-t border-brand-navy/10 px-4 py-2.5 text-[12px] leading-5 text-brand-graphite">
              Intent, method of attachment, and adaptation decide - write it
              into the contract when unsure.
            </p>
          </section>
        </div>

        <section className="overflow-hidden border border-brand-navy/20 bg-white shadow-sm">
          <SectionLabel>Value drivers</SectionLabel>
          <div className="grid gap-2 bg-[#f4f6f8] p-3 sm:grid-cols-2 lg:grid-cols-5">
            {valueDrivers.map((item) => (
              <div
                key={item.title}
                className={cn(
                  "border px-3 py-3",
                  item.primary
                    ? "border-brand-brass/50 bg-brand-navy text-brand-ivory sm:col-span-2 lg:col-span-1"
                    : "border-brand-navy/10 bg-white",
                )}
              >
                <span
                  className={cn(
                    "inline-flex h-8 w-8 items-center justify-center",
                    item.primary
                      ? "bg-brand-brass/20 text-brand-brass"
                      : "bg-brand-navy/5 text-brand-navy",
                  )}
                >
                  <item.icon className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <p
                  className={cn(
                    "mt-2 text-sm font-semibold",
                    item.primary ? "text-brand-ivory" : "text-brand-navy",
                  )}
                >
                  {item.title}
                </p>
                <p
                  className={cn(
                    "mt-1 text-[12px] leading-4",
                    item.primary
                      ? "text-brand-ivory/75"
                      : "text-brand-graphite",
                  )}
                >
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-2">
          <section className="overflow-hidden border border-brand-navy/20 bg-white shadow-sm">
            <SectionLabel>Corporation types · compare</SectionLabel>
            <div className="grid gap-3 bg-[#f4f6f8] p-3 sm:grid-cols-2">
              <div className="border border-emerald-300/70 bg-emerald-50/90 p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center bg-emerald-700 text-sm font-bold text-white">
                    S
                  </span>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-emerald-950">
                    S Corporation
                  </h3>
                </div>
                <ul className="mt-3 space-y-1.5 text-[13px] leading-5 text-brand-graphite">
                  <li>• Pass-through taxation (avoids C-corp double tax)</li>
                  <li>• Max 100 shareholders</li>
                  <li>
                    • No nonresident-alien / partnership / corp shareholders
                  </li>
                  <li>• One class of stock</li>
                </ul>
                <p className="mt-3 border-t border-emerald-300/60 pt-3 text-[12px] font-semibold text-emerald-900">
                  Best for: Active operating businesses - often a poor fit for
                  rental holdings
                </p>
              </div>
              <div className="border border-sky-300/70 bg-sky-50/90 p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center bg-sky-700 text-sm font-bold text-white">
                    C
                  </span>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-sky-950">
                    C Corporation
                  </h3>
                </div>
                <ul className="mt-3 space-y-1.5 text-[13px] leading-5 text-brand-graphite">
                  <li>• Separate tax-paying entity</li>
                  <li>• Unlimited shareholders</li>
                  <li>• Foreign owners allowed</li>
                  <li>• Multiple stock classes OK</li>
                </ul>
                <p className="mt-3 border-t border-sky-300/60 pt-3 text-[12px] font-semibold text-sky-900">
                  Best for: Raising capital / institutional structures -
                  uncommon for simple rentals
                </p>
              </div>
            </div>
          </section>

          <section className="overflow-hidden border border-brand-navy/20 bg-[#eef2f7] shadow-sm">
            <SectionLabel>Holding company structure</SectionLabel>
            <div className="grid gap-4 p-4 sm:grid-cols-[1fr_auto] sm:items-start">
              <div className="flex flex-col items-center gap-2">
                <div className="w-full max-w-xs bg-brand-navy px-4 py-3 text-center text-[12px] font-semibold uppercase tracking-[0.1em] text-brand-ivory shadow-sm">
                  Holding Company
                  <span className="mt-0.5 block text-[10px] font-normal tracking-[0.08em] text-brand-brass">
                    (LLC or Corporation)
                  </span>
                </div>
                <ArrowDown
                  className="h-4 w-4 text-brand-navy/50"
                  strokeWidth={1.5}
                />
                <div className="grid w-full max-w-md grid-cols-3 gap-2">
                  {[
                    { label: "Property LLC #1", icon: Building2 },
                    { label: "Property LLC #2", icon: Home },
                    { label: "Property LLC #3", icon: Landmark },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col items-center gap-1.5 border border-emerald-400/50 bg-emerald-100 px-2 py-3 text-center shadow-sm"
                    >
                      <item.icon
                        className="h-4 w-4 text-emerald-800"
                        strokeWidth={1.5}
                      />
                      <span className="text-[10px] font-semibold leading-tight text-emerald-950">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <ul className="space-y-2 rounded-sm border border-brand-navy/10 bg-white/80 p-3 text-[13px] leading-5 text-brand-graphite">
                {[
                  "Provides asset protection",
                  "Centralizes control",
                  "Isolates liability per property",
                  "Easier to sell individual assets",
                ].map((point) => (
                  <li key={point} className="flex gap-2">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                      strokeWidth={2.5}
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-2 border-t border-amber-300 bg-amber-100/80 px-4 py-2.5 text-[12px] leading-4 text-brand-navy/85">
              <Shield
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-700"
                strokeWidth={1.5}
              />
              If Property LLC #1 is sued, #2 and #3 are often protected - if
              entities stay separate (no commingling, proper records; personal
              guarantees can still create exposure).
            </div>
          </section>
        </div>

        <section className="overflow-hidden border border-brand-navy/20 bg-white shadow-sm">
          <SectionLabel>
            Examples: how different entities can own real estate
          </SectionLabel>
          <div className="overflow-x-auto">
            <table className="min-w-[720px] w-full text-left text-[12px] sm:text-[13px]">
              <thead className="bg-brand-navy text-[10px] uppercase tracking-[0.12em] text-brand-ivory">
                <tr>
                  <th className="px-3 py-3 font-semibold">Entity</th>
                  <th className="px-3 py-3 font-semibold">Example</th>
                  <th className="px-3 py-3 font-semibold">How it works</th>
                  <th className="px-3 py-3 font-semibold">
                    Liability protection
                  </th>
                  <th className="px-3 py-3 font-semibold">Taxation</th>
                </tr>
              </thead>
              <tbody>
                {entityExamples.map((row, index) => (
                  <tr
                    key={row.entity}
                    className={index % 2 === 0 ? "bg-[#eef2f7]" : "bg-white"}
                  >
                    <td className="border-l-4 border-brand-brass bg-brand-navy/[0.04] px-3 py-2.5 font-semibold text-brand-navy">
                      {row.entity}
                    </td>
                    <td className="px-3 py-2.5 text-brand-graphite">
                      {row.example}
                    </td>
                    <td className="px-3 py-2.5 text-brand-graphite">
                      {row.works}
                    </td>
                    <td className="px-3 py-2.5 text-brand-graphite">
                      {row.liability}
                    </td>
                    <td className="px-3 py-2.5 text-brand-graphite">
                      {row.tax}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="overflow-hidden border border-brand-navy/20 bg-white shadow-sm">
          <SectionLabel>Manhattan lens · condo, co-op, house</SectionLabel>
          <div className="grid gap-3 bg-[#f4f6f8] p-3 sm:grid-cols-2">
            {nycOwnershipForms.map((item) => (
              <div
                key={item.title}
                className={cn(
                  "border bg-white/90 p-4",
                  item.tone === "navy" && "border-brand-navy/25",
                  item.tone === "green" &&
                    "border-emerald-400/50 bg-emerald-50/50",
                  item.tone === "brass" && "border-[#d4b87a]/70 bg-[#fbf6ec]",
                  item.tone === "sky" && "border-sky-300/60 bg-sky-50/60",
                )}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.1em] text-brand-navy">
                  {item.title}
                </p>
                <p className="mt-2 text-[13px] leading-5 text-brand-graphite">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
          <p className="border-t border-brand-navy/10 bg-[#eef2f7] px-4 py-2.5 text-[12px] leading-5 text-brand-graphite">
            Entity choice (individual vs LLC) and product type (condo vs co-op)
            are separate questions - both matter before you fall in love with a
            unit.{" "}
            <Link
              href="/situations/condo-vs-coop"
              className="text-brand-navy underline underline-offset-2"
            >
              Condo vs co-op brief
            </Link>
            {" · "}
            <Link
              href="/situations/coop-condo-condop-terms"
              className="text-brand-navy underline underline-offset-2"
            >
              Terms chart
            </Link>
            {" · "}
            <Link
              href="/situations/condo-vs-coop-foreign-buyers-nyc"
              className="text-brand-navy underline underline-offset-2"
            >
              Foreign-buyer angle
            </Link>
          </p>
        </section>

        <div className="grid gap-5 lg:grid-cols-2">
          <section className="overflow-hidden border border-brand-navy/20 bg-[#eef2f7] shadow-sm">
            <SectionLabel>How title is held among people</SectionLabel>
            <ul className="divide-y divide-brand-navy/10">
              {otherConcepts.map((item) => (
                <li key={item.title} className="bg-white/70 px-4 py-3">
                  <p className="text-sm font-semibold text-brand-navy">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[13px] leading-5 text-brand-graphite">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="overflow-hidden border border-[#c4a46a]/40 bg-[#fbf6ec] shadow-sm">
            <SectionLabel tone="brass">Layers people often miss</SectionLabel>
            <ul className="divide-y divide-[#e4d4b0]">
              {missingLayers.map((item) => (
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
          </section>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <section className="overflow-hidden border border-brand-navy/20 bg-white shadow-sm">
            <SectionLabel>Other important terms</SectionLabel>
            <ul className="grid gap-2 p-3 sm:grid-cols-2">
              {glossaryTerms.map((item) => (
                <li
                  key={item.title}
                  className="flex items-start gap-3 border border-brand-navy/10 bg-[#eef2f7]/70 px-3 py-3"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center bg-brand-navy text-brand-brass">
                    <item.icon className="h-4 w-4" strokeWidth={1.5} />
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
            </ul>
          </section>

          <section className="overflow-hidden border border-brand-brass/40 bg-[#fbf6ec] shadow-sm">
            <SectionLabel tone="brass">Quick memory tricks</SectionLabel>
            <ul className="grid gap-2 p-3 sm:grid-cols-2">
              {memoryTricks.map((item) => (
                <li
                  key={item.left}
                  className="flex items-center gap-2 border border-[#e4d4b0] bg-white/85 px-3 py-2.5 text-[13px]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-brand-navy text-brand-brass">
                    <item.icon className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                  <span className="min-w-0">
                    <span className="text-brand-graphite">{item.left}</span>
                    <span className="mx-1.5 text-brand-brass">=</span>
                    <span className="font-semibold text-brand-navy">
                      {item.right}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <section className="overflow-hidden border border-emerald-600/25 bg-white shadow-sm">
            <SectionLabel tone="green">Quick comparison</SectionLabel>
            <div className="overflow-x-auto bg-emerald-50/40 p-2">
              <table className="w-full text-left text-[12px]">
                <thead>
                  <tr className="border-b border-emerald-800/15 text-[10px] uppercase tracking-[0.1em] text-emerald-950/70">
                    <th className="px-2 py-2 font-semibold">Entity type</th>
                    <th className="px-2 py-2 text-center font-semibold">
                      Limited liability?
                    </th>
                    <th className="px-2 py-2 text-center font-semibold">
                      Pass-through tax?
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {quickCompare.map((row) => (
                    <tr
                      key={row.entity}
                      className="border-b border-emerald-800/10 bg-white/80"
                    >
                      <td className="px-2 py-2.5 font-medium text-brand-navy">
                        {row.entity}
                      </td>
                      <td className="px-2 py-2.5 text-center">
                        <BoolMark ok={row.liability} />
                      </td>
                      <td className="px-2 py-2.5 text-center">
                        <BoolMark ok={row.passThrough} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="border-t border-emerald-200 bg-emerald-50/60 px-4 py-2 text-[11px] leading-4 text-brand-graphite">
              Defaults only - LLCs can elect corporate tax treatment; limited
              partnerships differ from general partnerships.
            </p>
          </section>

          <section className="overflow-hidden border border-sky-400/40 bg-sky-50 shadow-sm ring-1 ring-sky-300/30">
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
        </div>

        <footer className="flex items-center justify-center gap-3 bg-brand-navy px-4 py-4 text-center text-brand-ivory">
          <Star
            className="hidden h-4 w-4 shrink-0 text-brand-brass sm:block"
            fill="currentColor"
            strokeWidth={0}
          />
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] sm:text-[12px]">
            Know the entities. Understand the rights. Structure it smart.
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
            href="/situations/condo-vs-coop"
            className="text-brand-navy underline underline-offset-4"
          >
            Condo vs co-op
          </Link>
          {" · "}
          <Link
            href="/situations/coop-condo-condop-terms"
            className="text-brand-navy underline underline-offset-4"
          >
            Terms
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
            href="/situations/1031-exchange-new-york"
            className="text-brand-navy underline underline-offset-4"
          >
            Investment / 1031
          </Link>
          {" · "}
          <Link
            href="/buyer-advisory"
            className="text-brand-navy underline underline-offset-4"
          >
            Buyer Advisory
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

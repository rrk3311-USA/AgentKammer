import type { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export const primaryNav = [
  { label: "What's Changing?", href: "/services#whats-changing" },
  { label: "Decisions", href: "/services#decisions" },
  { label: "Understand", href: "/services#understand" },
  { label: "Building Library", href: "/building-reports" },
  { label: "About", href: "/about" },
] as const;

export const buildingReportsNav = [
  { label: "Overview", href: "/building-reports" },
  { label: "Individual Buildings", href: "/building-reports/individual-buildings" },
  { label: "Neighborhood Guides", href: "/building-reports/neighborhood-guides" },
  { label: "Market Briefs", href: "/building-reports/market-briefs" },
] as const;

export type HeroArtVariant =
  | "reports-overview"
  | "individual-buildings"
  | "neighborhood-guides"
  | "market-briefs"
  | "decision-framework"
  | "private-advisory"
  | "capital-strategy"
  | "international"
  | "professional-buyer"
  | "military"
  | "relocation"
  | "family-planning"
  | "seller-transition"
  | "new-development"
  | "pet-friendly"
  | "retirement"
  | "ownership-structure"
  | "single-women"
  | "townhouse-buyer"
  | "insights"
  | "building"
  | "contact"
  | "brief";

function resolveHeroArt(eyebrow: string, title: string, variant?: HeroArtVariant): HeroArtVariant {
  if (variant) return variant;

  const topic = `${eyebrow} ${title}`.toLowerCase();
  if (/study the building|building reports/.test(topic) && !/individual buildings|neighborhood guides|market briefs/.test(topic)) {
    return "reports-overview";
  }
  if (/individual buildings/.test(topic)) return "individual-buildings";
  if (/neighborhood guides|upper west|upper east|tribeca|chelsea|hudson yards|financial district/.test(topic)) {
    return "neighborhood-guides";
  }
  if (/market briefs/.test(topic)) return "market-briefs";
  if (/buyer advisory|decision briefs|decision hub|create your account|my real estate life|anything should change|first question/.test(topic)) {
    return "decision-framework";
  }
  if (/about|private housing guidance/.test(topic)) return "private-advisory";
  if (/1031|finance|hedge fund/.test(topic)) return "capital-strategy";
  if (/condo|co-op|rent vs buy/.test(topic)) return "ownership-structure";
  if (/foreign|international|pied-a-terre/.test(topic)) return "international";
  if (/doctor|physician|medical|professional/.test(topic)) return "professional-buyer";
  if (/military/.test(topic)) return "military";
  if (/relocation|relocating/.test(topic)) return "relocation";
  if (/school|family|more space/.test(topic)) return "family-planning";
  if (/widow|estate|probate|divorce|foreclosure|distress/.test(topic)) return "seller-transition";
  if (/new development/.test(topic)) return "new-development";
  if (/pet/.test(topic)) return "pet-friendly";
  if (/retiree|senior|empty nester|downsizing|downsize/.test(topic)) return "retirement";
  if (/single women/.test(topic)) return "single-women";
  if (/townhouse|brownstone/.test(topic)) return "townhouse-buyer";
  if (/insight|editorial|notes/.test(topic)) return "insights";
  if (/contact|request a private call|housing strategy session/.test(topic)) return "contact";
  if (/building|report|intelligence/.test(topic)) return "building";
  if (/brief|service|buyer|decision/.test(topic)) return "brief";
  return "brief";
}

export function PageSection({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <section className={cn("mx-auto max-w-site px-6 py-16 lg:px-10 lg:py-24", className)}>{children}</section>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <p className="text-[11px] uppercase tracking-[0.24em] text-brand-cocoa">{eyebrow}</p>
      <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[0.94] tracking-[-0.03em] text-brand-navy">
        {title}
      </h2>
      {description ? (
        <p className="mt-6 text-base leading-8 text-brand-graphite lg:text-lg">{description}</p>
      ) : null}
    </div>
  );
}

export function ArchitecturalHeroDrawing({
  eyebrow,
  title,
  variant,
  className,
}: {
  eyebrow: string;
  title: string;
  variant?: HeroArtVariant;
  className?: string;
}) {
  const art = resolveHeroArt(eyebrow, title, variant);
  const isReportOverview = art === "reports-overview";
  const isIndividualBuilding = art === "individual-buildings";
  const isNeighborhoodGuide = art === "neighborhood-guides";
  const isMarketBrief = art === "market-briefs";
  const isDecisionFramework = art === "decision-framework";
  const isPrivateAdvisory = art === "private-advisory";
  const isCapitalStrategy = art === "capital-strategy";
  const isOwnershipStructure = art === "ownership-structure";
  const isInternational = art === "international";
  const isProfessionalBuyer = art === "professional-buyer";
  const isMilitary = art === "military";
  const isRelocation = art === "relocation";
  const isFamilyPlanning = art === "family-planning";
  const isSellerTransition = art === "seller-transition";
  const isNewDevelopment = art === "new-development";
  const isPetFriendly = art === "pet-friendly";
  const isRetirement = art === "retirement";
  const isSingleWomen = art === "single-women";
  const isTownhouseBuyer = art === "townhouse-buyer";
  const isInsights = art === "insights";
  const isBuilding = art === "building";
  const isContact = art === "contact";
  const isBrief = art === "brief";

  return (
    <div className={cn("pointer-events-none select-none", className)} aria-hidden>
      <svg
        viewBox="0 0 420 260"
        className="h-auto w-full max-w-[25rem] text-brand-ivory/70"
        fill="none"
        role="presentation"
      >
        <defs>
          <linearGradient id="hero-line-metal" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#F5F2EB" stopOpacity="0.22" />
            <stop offset="52%" stopColor="#B08D57" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#F5F2EB" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        <path d="M22 222H394" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1" />
        <path d="M55 54H360V222H55V54Z" stroke="currentColor" strokeOpacity="0.36" strokeWidth="1" />
        <path d="M83 82H332V222H83V82Z" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />

        {isMarketBrief ? (
          <>
            <path d="M86 196H336" stroke="currentColor" strokeOpacity="0.26" strokeWidth="1" />
            <path d="M102 172C132 132 152 150 178 116C202 84 224 104 248 72C270 43 292 58 322 34" stroke="url(#hero-line-metal)" strokeWidth="1.35" />
            <path d="M102 172L102 196M178 116V196M248 72V196M322 34V196" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1" />
            <path d="M102 156H336M102 118H336M102 80H336M102 42H336" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
            {Array.from({ length: 7 }).map((_, index) => (
              <path key={`market-bar-${index}`} d={`M122 ${186 - index * 15}V196`} stroke="currentColor" strokeOpacity="0.38" strokeWidth="10" transform={`translate(${index * 28} 0)`} />
            ))}
            <path d="M98 210H340" stroke="currentColor" strokeOpacity="0.32" strokeWidth="1" />
          </>
        ) : isNeighborhoodGuide ? (
          <>
            <path d="M88 70H332V210H88V70Z" stroke="currentColor" strokeOpacity="0.34" strokeWidth="1" />
            <path d="M88 118H332M88 166H332M150 70V210M210 70V210M272 70V210" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
            <path d="M124 92H172V140H124V92Z" stroke="currentColor" strokeOpacity="0.36" strokeWidth="1" />
            <path d="M234 132H298V188H234V132Z" stroke="currentColor" strokeOpacity="0.36" strokeWidth="1" />
            <path d="M116 186C154 150 180 174 210 136C244 92 280 114 312 84" stroke="url(#hero-line-metal)" strokeWidth="1.35" />
            <circle cx="116" cy="186" r="4" stroke="url(#hero-line-metal)" strokeWidth="1" />
            <circle cx="210" cy="136" r="4" stroke="url(#hero-line-metal)" strokeWidth="1" />
            <circle cx="312" cy="84" r="4" stroke="url(#hero-line-metal)" strokeWidth="1" />
          </>
        ) : isIndividualBuilding ? (
          <>
            <path d="M126 222V34H294V222" stroke="currentColor" strokeOpacity="0.58" strokeWidth="1.2" />
            <path d="M156 222V62H264V222" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1" />
            {Array.from({ length: 8 }).map((_, index) => (
              <path key={`unit-floor-${index}`} d={`M126 ${58 + index * 20}H294`} stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
            ))}
            {Array.from({ length: 6 }).map((_, index) => (
              <path key={`unit-bay-${index}`} d={`M150 ${34}V222`} transform={`translate(${index * 24} 0)`} stroke="currentColor" strokeOpacity="0.16" strokeWidth="1" />
            ))}
            <path d="M126 34L294 34" stroke="url(#hero-line-metal)" strokeWidth="1.3" />
            <path d="M180 222V152H240V222" stroke="url(#hero-line-metal)" strokeWidth="1.2" />
            <path d="M96 106H126M294 106H324M96 156H126M294 156H324" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
            <path d="M104 82V198M316 82V198" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
          </>
        ) : isReportOverview ? (
          <>
            <path d="M82 168H178V222H82V168Z" stroke="currentColor" strokeOpacity="0.42" strokeWidth="1.1" />
            <path d="M206 118H338V222H206V118Z" stroke="currentColor" strokeOpacity="0.42" strokeWidth="1.1" />
            <path d="M112 196H148M238 148H306M238 168H306M238 188H288" stroke="currentColor" strokeOpacity="0.23" strokeWidth="1" />
            <path d="M178 195H206" stroke="url(#hero-line-metal)" strokeWidth="1.25" />
            <path d="M192 195L204 183M192 195L204 207" stroke="url(#hero-line-metal)" strokeWidth="1.25" />
            <path d="M90 112C126 72 162 80 198 110C238 144 282 130 328 76" stroke="currentColor" strokeOpacity="0.24" strokeWidth="1" />
            <circle cx="90" cy="112" r="3.5" stroke="url(#hero-line-metal)" strokeWidth="1" />
            <circle cx="198" cy="110" r="3.5" stroke="url(#hero-line-metal)" strokeWidth="1" />
            <circle cx="328" cy="76" r="3.5" stroke="url(#hero-line-metal)" strokeWidth="1" />
          </>
        ) : isDecisionFramework ? (
          <>
            <path d="M98 72H208V132H98V72Z" stroke="currentColor" strokeOpacity="0.42" strokeWidth="1.1" />
            <path d="M98 164H208V222H98V164Z" stroke="currentColor" strokeOpacity="0.32" strokeWidth="1" />
            <path d="M252 104H332V184H252V104Z" stroke="currentColor" strokeOpacity="0.38" strokeWidth="1.1" />
            <path d="M153 132V164M208 102H252M208 194H252" stroke="url(#hero-line-metal)" strokeWidth="1.25" />
            <circle cx="153" cy="102" r="16" stroke="currentColor" strokeOpacity="0.32" strokeWidth="1" />
            <path d="M146 102H160M153 95V109" stroke="url(#hero-line-metal)" strokeWidth="1.2" />
            <path d="M122 92H184M122 188H184M276 130H310M276 150H310" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
          </>
        ) : isPrivateAdvisory ? (
          <>
            <path d="M98 212V88L210 42L322 88V212" stroke="currentColor" strokeOpacity="0.44" strokeWidth="1.1" />
            <path d="M126 212V106H294V212" stroke="currentColor" strokeOpacity="0.24" strokeWidth="1" />
            <path d="M164 212V142H256V212" stroke="url(#hero-line-metal)" strokeWidth="1.2" />
            <path d="M70 128H98M322 128H350M70 176H98M322 176H350" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1" />
            <path d="M112 76H308M142 62H278" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
            <circle cx="210" cy="128" r="28" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
          </>
        ) : isCapitalStrategy ? (
          <>
            <path d="M84 188H154V222H84V188Z" stroke="currentColor" strokeOpacity="0.36" strokeWidth="1" />
            <path d="M176 132H246V222H176V132Z" stroke="currentColor" strokeOpacity="0.42" strokeWidth="1.1" />
            <path d="M268 82H338V222H268V82Z" stroke="currentColor" strokeOpacity="0.48" strokeWidth="1.1" />
            <path d="M118 188C154 150 178 160 210 128C246 92 276 110 318 62" stroke="url(#hero-line-metal)" strokeWidth="1.35" />
            <path d="M100 204H138M192 154H230M192 176H230M284 108H322M284 130H322M284 152H322" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
            <circle cx="318" cy="62" r="8" stroke="url(#hero-line-metal)" strokeWidth="1" />
          </>
        ) : isInternational ? (
          <>
            <circle cx="150" cy="136" r="58" stroke="currentColor" strokeOpacity="0.34" strokeWidth="1.1" />
            <path d="M92 136H208M150 78C126 104 126 168 150 194M150 78C174 104 174 168 150 194" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
            <path d="M106 102C132 116 168 116 194 102M106 170C132 156 168 156 194 170" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1" />
            <path d="M242 96H324V222H242V96Z" stroke="currentColor" strokeOpacity="0.42" strokeWidth="1.1" />
            <path d="M268 222V162H300V222" stroke="url(#hero-line-metal)" strokeWidth="1.2" />
            <path d="M208 136H242" stroke="url(#hero-line-metal)" strokeWidth="1.25" />
            <path d="M260 120H306M260 140H306" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
          </>
        ) : isProfessionalBuyer ? (
          <>
            <path d="M86 78H182V222H86V78Z" stroke="currentColor" strokeOpacity="0.44" strokeWidth="1.1" />
            <path d="M108 112H160M108 138H160M108 164H146" stroke="currentColor" strokeOpacity="0.24" strokeWidth="1" />
            <path d="M86 102H182" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
            <circle cx="136" cy="48" r="22" stroke="currentColor" strokeOpacity="0.36" strokeWidth="1.1" />
            <path d="M136 35V49L148 58" stroke="url(#hero-line-metal)" strokeWidth="1.25" />
            <path d="M236 52H332V222H236V52Z" stroke="currentColor" strokeOpacity="0.48" strokeWidth="1.1" />
            {Array.from({ length: 6 }).map((_, index) => (
              <path key={`professional-floor-${index}`} d={`M236 ${80 + index * 21}H332`} stroke="currentColor" strokeOpacity="0.17" strokeWidth="1" />
            ))}
            {Array.from({ length: 3 }).map((_, index) => (
              <path key={`professional-bay-${index}`} d={`M260 ${52}V222`} transform={`translate(${index * 24} 0)`} stroke="currentColor" strokeOpacity="0.16" strokeWidth="1" />
            ))}
            <path d="M216 222V166H260V222" stroke="url(#hero-line-metal)" strokeWidth="1.2" />
            <path d="M182 178C204 140 222 132 248 96" stroke="url(#hero-line-metal)" strokeWidth="1.35" />
            <path d="M208 128L220 128M214 122V134" stroke="currentColor" strokeOpacity="0.24" strokeWidth="1" />
            <path d="M108 198H160M264 92H304M264 114H304M264 136H304" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
          </>
        ) : isMilitary ? (
          <>
            <path d="M94 90H202V222H94V90Z" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.1" />
            <path d="M242 70H330V222H242V70Z" stroke="currentColor" strokeOpacity="0.42" strokeWidth="1.1" />
            <path d="M118 118H178M118 144H178M266 100H306M266 124H306M266 148H306" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
            <path d="M202 156H242" stroke="url(#hero-line-metal)" strokeWidth="1.25" />
            <path d="M222 142L242 156L222 170" stroke="url(#hero-line-metal)" strokeWidth="1.25" />
            <path d="M116 72L148 52L180 72" stroke="currentColor" strokeOpacity="0.24" strokeWidth="1" />
            <circle cx="148" cy="52" r="5" stroke="url(#hero-line-metal)" strokeWidth="1" />
          </>
        ) : isRelocation ? (
          <>
            <path d="M82 90H176V222H82V90Z" stroke="currentColor" strokeOpacity="0.36" strokeWidth="1.1" />
            <path d="M258 58H338V222H258V58Z" stroke="currentColor" strokeOpacity="0.46" strokeWidth="1.1" />
            <path d="M176 164C212 118 234 126 258 92" stroke="url(#hero-line-metal)" strokeWidth="1.35" />
            <path d="M228 112L246 100L246 124" stroke="url(#hero-line-metal)" strokeWidth="1.2" />
            <path d="M106 118H152M106 144H152M280 88H316M280 112H316M280 136H316" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
            <circle cx="112" cy="72" r="14" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
          </>
        ) : isFamilyPlanning ? (
          <>
            <path d="M86 116H188V222H86V116Z" stroke="currentColor" strokeOpacity="0.38" strokeWidth="1.1" />
            <path d="M232 84H334V222H232V84Z" stroke="currentColor" strokeOpacity="0.42" strokeWidth="1.1" />
            <path d="M106 144H140M106 168H158M252 114H314M252 138H314M252 162H294" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
            <path d="M188 178H232" stroke="url(#hero-line-metal)" strokeWidth="1.25" />
            <circle cx="140" cy="82" r="18" stroke="currentColor" strokeOpacity="0.26" strokeWidth="1" />
            <path d="M130 82H150M140 72V92" stroke="url(#hero-line-metal)" strokeWidth="1.15" />
            <path d="M112 222V188H158V222M270 222V176H310V222" stroke="url(#hero-line-metal)" strokeWidth="1.1" />
          </>
        ) : isSellerTransition ? (
          <>
            <path d="M92 94H208V222H92V94Z" stroke="currentColor" strokeOpacity="0.42" strokeWidth="1.1" />
            <path d="M236 126H330V222H236V126Z" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1" />
            <path d="M116 122H184M116 148H184M116 174H164" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
            <path d="M150 222V176H196V222" stroke="url(#hero-line-metal)" strokeWidth="1.2" />
            <path d="M208 174H236" stroke="url(#hero-line-metal)" strokeWidth="1.2" />
            <path d="M222 164L236 174L222 184" stroke="url(#hero-line-metal)" strokeWidth="1.2" />
            <path d="M110 74C138 54 166 54 194 74" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
            <circle cx="282" cy="104" r="18" stroke="currentColor" strokeOpacity="0.24" strokeWidth="1" />
          </>
        ) : isNewDevelopment ? (
          <>
            <path d="M92 222V148H168V222" stroke="currentColor" strokeOpacity="0.32" strokeWidth="1" />
            <path d="M190 222V86H272V222" stroke="currentColor" strokeOpacity="0.44" strokeWidth="1.1" />
            <path d="M292 222V122H342V222" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1" />
            <path d="M204 112H258M204 136H258M204 160H258" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
            <path d="M190 86L232 54L272 86" stroke="url(#hero-line-metal)" strokeWidth="1.2" />
            <path d="M120 148V222M316 122V222" stroke="currentColor" strokeOpacity="0.14" strokeWidth="1" />
          </>
        ) : isPetFriendly ? (
          <>
            <path d="M110 92H256V222H110V92Z" stroke="currentColor" strokeOpacity="0.42" strokeWidth="1.1" />
            <path d="M138 122H200M138 148H200M138 174H178" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
            <path d="M170 222V180H214V222" stroke="url(#hero-line-metal)" strokeWidth="1.2" />
            <circle cx="302" cy="152" r="22" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1" />
            <circle cx="286" cy="126" r="8" stroke="url(#hero-line-metal)" strokeWidth="1" />
            <circle cx="304" cy="120" r="8" stroke="url(#hero-line-metal)" strokeWidth="1" />
            <circle cx="322" cy="130" r="8" stroke="url(#hero-line-metal)" strokeWidth="1" />
            <path d="M256 180H282" stroke="url(#hero-line-metal)" strokeWidth="1.2" />
          </>
        ) : isRetirement ? (
          <>
            <path d="M88 112H190V222H88V112Z" stroke="currentColor" strokeOpacity="0.38" strokeWidth="1.1" />
            <path d="M228 82H330V222H228V82Z" stroke="currentColor" strokeOpacity="0.42" strokeWidth="1.1" />
            <path d="M112 142H164M112 168H164M252 112H306M252 138H306M252 164H286" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
            <path d="M190 170C206 150 212 146 228 128" stroke="url(#hero-line-metal)" strokeWidth="1.25" />
            <path d="M126 222V180H162V222M266 222V174H306V222" stroke="url(#hero-line-metal)" strokeWidth="1.1" />
            <path d="M112 88H166" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
          </>
        ) : isOwnershipStructure ? (
          <>
            <path d="M86 104H178V222H86V104Z" stroke="currentColor" strokeOpacity="0.38" strokeWidth="1.1" />
            <path d="M242 104H334V222H242V104Z" stroke="currentColor" strokeOpacity="0.38" strokeWidth="1.1" />
            <path d="M178 162H242" stroke="url(#hero-line-metal)" strokeWidth="1.25" />
            <path d="M204 150L220 162L204 174M216 150L200 162L216 174" stroke="url(#hero-line-metal)" strokeWidth="1.1" />
            <path d="M110 132H154M110 156H154M266 132H310M266 156H310" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
            <path d="M120 222V180H154V222M272 222V180H306V222" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
          </>
        ) : isSingleWomen ? (
          <>
            <path d="M108 82H224V222H108V82Z" stroke="currentColor" strokeOpacity="0.42" strokeWidth="1.1" />
            <path d="M250 124H326V222H250V124Z" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1" />
            <path d="M132 112H196M132 138H196M132 164H176" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
            <path d="M158 222V176H198V222" stroke="url(#hero-line-metal)" strokeWidth="1.2" />
            <circle cx="292" cy="96" r="18" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1" />
            <path d="M284 96H300M292 88V104" stroke="url(#hero-line-metal)" strokeWidth="1.15" />
          </>
        ) : isTownhouseBuyer ? (
          <>
            <path d="M108 70H226V222H108V70Z" stroke="currentColor" strokeOpacity="0.52" strokeWidth="1.15" />
            <path d="M226 94H314V222H226V94Z" stroke="currentColor" strokeOpacity="0.34" strokeWidth="1" />
            <path d="M126 96H154V130H126V96ZM178 96H206V130H178V96ZM126 150H154V184H126V150ZM178 150H206V184H178V150Z" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1" />
            <path d="M142 222V184H192V222" stroke="url(#hero-line-metal)" strokeWidth="1.25" />
            <path d="M116 70C132 48 202 48 218 70" stroke="currentColor" strokeOpacity="0.36" strokeWidth="1" />
            <path d="M226 118H314M226 146H314M226 174H314" stroke="currentColor" strokeOpacity="0.14" strokeWidth="1" />
            <path d="M88 222H332" stroke="currentColor" strokeOpacity="0.34" strokeWidth="1" />
            <path d="M92 206H142M98 194H142M104 182H142" stroke="url(#hero-line-metal)" strokeWidth="1.15" />
            <path d="M84 156H108M314 156H338M84 104H108M314 104H338" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
            <path d="M252 202C272 182 292 182 312 202" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
          </>
        ) : isInsights ? (
          <>
            <path d="M104 62H300V214H104V62Z" stroke="currentColor" strokeOpacity="0.44" strokeWidth="1.1" />
            <path d="M122 86H282M122 116H282M122 146H224" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
            <path d="M122 178H184" stroke="url(#hero-line-metal)" strokeWidth="1.2" />
            <path d="M84 82H104M300 194H340" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
            <path d="M132 214C150 194 170 194 188 214" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
            <path d="M240 60C252 42 284 42 296 60" stroke="url(#hero-line-metal)" strokeWidth="1.1" />
            <path d="M238 166C260 142 282 142 304 166" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
            <circle cx="318" cy="104" r="18" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
            <path d="M310 104H326M318 96V112" stroke="url(#hero-line-metal)" strokeWidth="1.15" />
            <path d="M84 134C126 120 158 128 194 104C238 76 272 86 324 56" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
          </>
        ) : isBuilding ? (
          <>
            <path d="M114 222V42L306 42V222" stroke="currentColor" strokeOpacity="0.56" strokeWidth="1.2" />
            {Array.from({ length: 7 }).map((_, index) => (
              <path key={`floor-${index}`} d={`M114 ${68 + index * 21}H306`} stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
            ))}
            {Array.from({ length: 5 }).map((_, index) => (
              <path key={`bay-${index}`} d={`M146 ${42}V222`} transform={`translate(${index * 32} 0)`} stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
            ))}
            <path d="M96 222L210 24L324 222" stroke="url(#hero-line-metal)" strokeWidth="1.2" />
          </>
        ) : isContact ? (
          <>
            <path d="M102 92H318V188H102V92Z" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" />
            <path d="M102 92L210 156L318 92" stroke="url(#hero-line-metal)" strokeWidth="1.2" />
            <path d="M132 218V188M288 218V188" stroke="currentColor" strokeOpacity="0.32" strokeWidth="1" />
            <path d="M158 60H262" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
            <path d="M180 42H240" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
          </>
        ) : isBrief ? (
          <>
            <path d="M90 156H184V222H90V156Z" stroke="currentColor" strokeOpacity="0.48" strokeWidth="1.2" />
            <path d="M236 96H330V222H236V96Z" stroke="currentColor" strokeOpacity="0.48" strokeWidth="1.2" />
            <path d="M184 189H236" stroke="url(#hero-line-metal)" strokeWidth="1.4" />
            <path d="M210 189L224 175M210 189L224 203" stroke="url(#hero-line-metal)" strokeWidth="1.4" />
            <path d="M118 184H156M118 200H156M264 126H302M264 143H302M264 160H302" stroke="currentColor" strokeOpacity="0.24" strokeWidth="1" />
            <path d="M282 72V96M282 72L270 84M282 72L294 84" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1" />
          </>
        ) : (
          <>
            <path d="M116 222V88L210 42L304 88V222" stroke="currentColor" strokeOpacity="0.52" strokeWidth="1.2" />
            <path d="M142 222V108H278V222" stroke="currentColor" strokeOpacity="0.26" strokeWidth="1" />
            <path d="M174 222V142H246V222" stroke="url(#hero-line-metal)" strokeWidth="1.2" />
            <path d="M116 88H304M146 74H274" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
          </>
        )}

        <path d="M38 36V90M38 36H92" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
        <path d="M382 224V170M382 224H328" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
        <circle cx="55" cy="54" r="3.5" stroke="url(#hero-line-metal)" strokeWidth="1" />
        <circle cx="360" cy="222" r="3.5" stroke="url(#hero-line-metal)" strokeWidth="1" />
      </svg>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  kicker,
  image,
  imageAlt,
  art,
}: {
  eyebrow: string;
  title: string;
  description: string;
  kicker?: ReactNode;
  image?: string;
  imageAlt?: string;
  art?: HeroArtVariant;
}) {
  return (
    <section className="relative overflow-hidden border-b border-brand-border bg-brand-navy text-brand-ivory">
      {image ? (
        <img
          src={image}
          alt={imageAlt ?? ""}
          className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.58] saturate-[0.9] contrast-[1.05]"
        />
      ) : null}
      <div className="absolute inset-0 bg-brand-navy/58" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/72 to-brand-navy/32" />
      <PageSection className="relative grid gap-12 py-20 lg:grid-cols-[minmax(0,1.02fr)_minmax(320px,0.78fr)] lg:items-end lg:py-28">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-brand-brass">{eyebrow}</p>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(3rem,7vw,6rem)] leading-[0.9] tracking-[-0.04em] text-brand-ivory">
            {title}
          </h1>
        </div>
        <div className="space-y-6">
          {!image ? <ArchitecturalHeroDrawing eyebrow={eyebrow} title={title} variant={art} /> : null}
          <p className="max-w-xl text-base leading-8 text-brand-ivory/78 lg:text-lg">{description}</p>
          {kicker ? (
            <div className="border border-brand-brass/30 bg-brand-navy/55 p-6 backdrop-blur-sm">{kicker}</div>
          ) : null}
        </div>
      </PageSection>
    </section>
  );
}

export function ReportSubnav() {
  const [location] = useLocation();

  return (
    <div className="overflow-x-auto border-b border-brand-brass/28 bg-brand-charcoal">
      <div className="mx-auto flex w-full max-w-site gap-3 px-6 py-4 lg:px-10">
        {buildingReportsNav.map((item) => {
          const active = location === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "whitespace-nowrap rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors",
                active
                  ? "border-brand-brass bg-brand-brass text-brand-navy"
                  : "border-brand-ivory/68 bg-brand-ivory text-brand-navy hover:border-brand-brass hover:bg-brand-surface",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function CTA({
  title = "Find out if you’re living where you belong.",
  description = "A short Decision Assessment builds your profile — belonging, friction, and a clear next step — before any call.",
  href = "/belonging",
  label = "Start Decision Assessment",
  eyebrow = "Decision Assessment",
}: {
  title?: string;
  description?: string;
  href?: string;
  label?: string;
  eyebrow?: string;
}) {
  return (
    <section className="border-t border-brand-brass/30 bg-brand-navy text-brand-ivory">
      <PageSection className="py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-brand-brass">{eyebrow}</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,3.8vw,3.25rem)] leading-[0.95] tracking-[-0.03em] text-brand-ivory">
              {title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-brand-ivory/74">{description}</p>
          </div>
          <div className="grid gap-3 sm:min-w-[16rem]">
            {href.startsWith("#") ? (
              <a
                href={href}
                className="ak-call-button group grid px-5 py-4 text-left transition-colors"
                onClick={(e) => {
                  const id = href.slice(1);
                  const el = typeof document !== "undefined" ? document.getElementById(id) : null;
                  if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                    history.replaceState(null, "", href);
                  }
                }}
              >
                <span className="text-[10px] uppercase tracking-[0.24em] text-brand-brass">{eyebrow}</span>
                <span className="mt-3 h-px w-full bg-brand-ivory/24" aria-hidden />
                <span className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.16em]">
                  {label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
                </span>
              </a>
            ) : (
              <Link
                href={href}
                className="ak-call-button group grid px-5 py-4 text-left transition-colors"
              >
                <span className="text-[10px] uppercase tracking-[0.24em] text-brand-brass">Belonging</span>
                <span className="mt-3 h-px w-full bg-brand-ivory/24" aria-hidden />
                <span className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.16em]">
                  {label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
                </span>
              </Link>
            )}
            {href === "/contact" ? (
              <a
                href="/contact#request-call"
                aria-label="Email Agent Kammer"
                className="inline-flex items-center justify-center gap-3 border border-brand-ivory/18 px-5 py-3 text-center text-[10px] uppercase tracking-[0.16em] text-brand-ivory/82 transition-colors hover:border-brand-brass hover:text-brand-ivory"
              >
                <Mail className="h-3.5 w-3.5 text-brand-brass" strokeWidth={1.5} />
                Email
              </a>
            ) : null}
          </div>
        </div>
      </PageSection>
    </section>
  );
}

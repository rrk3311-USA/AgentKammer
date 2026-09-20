import React, { type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { grammar } from "@/components/visual-grammar";

/** Locked primary header: Home · Start Here · Guides · Contact. Guidance is the filled utility, not a fifth door. */
export const primaryNav = [
  { label: "Home", href: "/" },
  { label: "Start Here", href: "/situations" },
  { label: "Guides", href: "/guides" },
  { label: "Contact", href: "/contact" },
] as const;

/** Guides library chapters. Building Profiles stay reachable, not a selector item. */
export const guidesLibraryNav = [
  { label: "Decision Guides", href: "/guides#decision-guides", id: "decision-guides" },
  { label: "Neighborhoods", href: "/guides#neighborhoods", id: "neighborhoods" },
  { label: "Property Assessment", href: "/guides#kammer-report", id: "kammer-report" },
] as const;

export type HeroArtVariant =
  | "reports-overview"
  | "individual-buildings"
  | "neighborhood-guides"
  | "market-briefs"
  | "decision-framework"
  | "start-here"
  | "situations"
  | "guides"
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
  if (/start here|clear path through/.test(topic)) return "start-here";
  if (/situations|explore your situation/.test(topic)) return "situations";
  if (/guides|clear frameworks before/.test(topic)) return "guides";
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
  return <section className={cn(grammar.pad, className)}>{children}</section>;
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
      <p className={grammar.eyebrow}>{eyebrow}</p>
      <h2 className={cn("mt-4", grammar.section)}>{title}</h2>
      {description ? (
        <p className="mt-5 max-w-xl text-base leading-7 text-brand-graphite lg:text-[17px] lg:leading-8">{description}</p>
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
  const isStartHere = art === "start-here";
  const isSituations = art === "situations";
  const isGuides = art === "guides";
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
            <path d="M92 222V48H196V222" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.15" />
            <path d="M108 222V64H180V222" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
            {Array.from({ length: 8 }).map((_, index) => (
              <path key={`overview-floor-${index}`} d={`M92 ${68 + index * 18}H196`} stroke="currentColor" strokeOpacity="0.16" strokeWidth="1" />
            ))}
            {Array.from({ length: 3 }).map((_, index) => (
              <path key={`overview-bay-${index}`} d={`M116 ${48}V222`} transform={`translate(${index * 22} 0)`} stroke="currentColor" strokeOpacity="0.14" strokeWidth="1" />
            ))}
            <path d="M92 48L144 28L196 48" stroke="url(#hero-line-metal)" strokeWidth="1.25" />
            <path d="M128 222V176H160V222" stroke="url(#hero-line-metal)" strokeWidth="1.2" />
            <path d="M228 86H348V186H228V86Z" stroke="currentColor" strokeOpacity="0.42" strokeWidth="1.1" />
            <path d="M228 136H348M278 86V186M318 86V186" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
            <path d="M240 98H266V124H240V98Z" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1" />
            <path d="M290 148H336V174H290V148Z" stroke="url(#hero-line-metal)" strokeWidth="1.15" />
            <path d="M196 154H228" stroke="url(#hero-line-metal)" strokeWidth="1.2" />
            <path d="M78 88V182M78 88H92M78 182H92" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
            <path d="M74 88H82M74 182H82" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
          </>
        ) : isStartHere ? (
          <>
            <circle cx="108" cy="168" r="14" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.1" />
            <circle cx="186" cy="112" r="14" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.1" />
            <circle cx="264" cy="168" r="14" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.1" />
            <circle cx="342" cy="96" r="14" stroke="url(#hero-line-metal)" strokeWidth="1.25" />
            <path d="M122 168H172M200 112H250M278 168H328" stroke="url(#hero-line-metal)" strokeWidth="1.25" />
            <path d="M108 154V142M186 98V86M264 154V142M342 82V70" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
            <path d="M102 168H114M180 112H192M258 168H270M336 96H348" stroke="url(#hero-line-metal)" strokeWidth="1.1" />
            <path d="M98 196H128M176 140H216M254 196H284M328 124H356" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
          </>
        ) : isSituations ? (
          <>
            <circle cx="118" cy="136" r="16" stroke="url(#hero-line-metal)" strokeWidth="1.25" />
            <path d="M134 136C176 136 198 78 248 78" stroke="url(#hero-line-metal)" strokeWidth="1.25" />
            <path d="M134 136H248" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.1" />
            <path d="M134 136C176 136 198 194 248 194" stroke="url(#hero-line-metal)" strokeWidth="1.25" />
            <circle cx="262" cy="78" r="11" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.1" />
            <circle cx="262" cy="136" r="11" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.1" />
            <circle cx="262" cy="194" r="11" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.1" />
            <path d="M273 78H328M273 136H328M273 194H328" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
            <path d="M328 70V86M328 128V144M328 186V202" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1" />
            <path d="M110 136H126M118 128V144" stroke="url(#hero-line-metal)" strokeWidth="1.1" />
          </>
        ) : isGuides ? (
          <>
            <path d="M92 78H214V210H92V78Z" stroke="currentColor" strokeOpacity="0.34" strokeWidth="1" />
            <path d="M108 62H230V194H108V62Z" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.1" />
            <path d="M124 88H214M124 112H200M124 136H186" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
            <path d="M124 160H168" stroke="url(#hero-line-metal)" strokeWidth="1.2" />
            <path d="M258 86H338V210H258V86Z" stroke="currentColor" strokeOpacity="0.38" strokeWidth="1.1" />
            <path d="M298 86V210" stroke="url(#hero-line-metal)" strokeWidth="1.2" />
            <path d="M270 112H286M310 112H326M270 140H286M310 140H326" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
            <path d="M230 148H258" stroke="url(#hero-line-metal)" strokeWidth="1.2" />
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
            <ellipse cx="142" cy="118" rx="38" ry="48" stroke="currentColor" strokeOpacity="0.42" strokeWidth="1.15" />
            <path d="M108 158C118 188 166 188 176 158" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1" />
            <circle cx="142" cy="112" r="18" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
            <circle cx="286" cy="128" r="54" stroke="currentColor" strokeOpacity="0.34" strokeWidth="1.1" />
            <circle cx="286" cy="128" r="28" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
            <path d="M286 78V178M236 128H336" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
            <path d="M286 84V100" stroke="url(#hero-line-metal)" strokeWidth="1.35" />
            <path d="M278 92L286 78L294 92" stroke="url(#hero-line-metal)" strokeWidth="1.2" />
            <path d="M180 128H232" stroke="url(#hero-line-metal)" strokeWidth="1.2" />
            <path d="M320 112H338M320 144H338" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
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
            <path d="M88 86H198V186H88V86Z" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
            <path d="M88 119H198M88 152H198M125 86V186M161 86V186" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1" />
            <path d="M108 102H141V135H108V102Z" stroke="currentColor" strokeOpacity="0.32" strokeWidth="1" />
            <circle cx="124" cy="118" r="3.5" stroke="url(#hero-line-metal)" strokeWidth="1" />
            <path d="M236 118L292 78H348V222H236V118Z" stroke="currentColor" strokeOpacity="0.44" strokeWidth="1.15" />
            <path d="M256 106L292 78L328 106" stroke="url(#hero-line-metal)" strokeWidth="1.25" />
            <path d="M284 78V62H300V78" stroke="currentColor" strokeOpacity="0.34" strokeWidth="1" />
            <path d="M288 62H296V54H288V62Z" stroke="url(#hero-line-metal)" strokeWidth="1.1" />
            <path d="M254 138H276V166H254V138ZM308 138H330V166H308V138Z" stroke="currentColor" strokeOpacity="0.26" strokeWidth="1" />
            <path d="M278 222V186H306V222" stroke="url(#hero-line-metal)" strokeWidth="1.2" />
            <path d="M198 154C214 154 222 168 236 168" stroke="url(#hero-line-metal)" strokeWidth="1.25" />
            <path d="M96 210C112 194 132 194 148 210" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
            <path d="M168 222V198H188V222" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
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
      <PageSection className="relative grid gap-12 py-20 lg:grid-cols-[minmax(0,1.02fr)_minmax(320px,0.78fr)] lg:items-end lg:py-24">
        <div>
          <p className={grammar.eyebrowOnDark}>{eyebrow}</p>
          <h1 className={cn("mt-4 max-w-[18ch]", grammar.displayOnDark)}>{title}</h1>
        </div>
        <div className="space-y-6">
          {!image ? <ArchitecturalHeroDrawing eyebrow={eyebrow} title={title} variant={art} /> : null}
          <p className={grammar.bodyOnDark}>{description}</p>
          {kicker ? <div className="border-l border-brand-stone pl-5">{kicker}</div> : null}
        </div>
      </PageSection>
    </section>
  );
}

function activeGuidesChapter(location: string, hash: string) {
  const chapter = hash.replace(/^#/, "");
  if (location === "/guides" || location.startsWith("/guides/")) {
    return chapter;
  }
  if (location.startsWith("/building-reports/neighborhood-guides")) return "neighborhoods";
  if (location.startsWith("/building-reports")) return "kammer-report";
  return "";
}

export function ReportSubnav() {
  const [location] = useLocation();
  const [hash, setHash] = React.useState(() => (typeof window === "undefined" ? "" : window.location.hash));

  React.useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [location]);

  const activeId = activeGuidesChapter(location, hash);

  return (
    <nav aria-label="Guides library" className="border-b border-brand-border bg-brand-ivory">
      <div className="mx-auto flex w-full max-w-site flex-wrap items-center gap-y-2 px-6 py-5 lg:px-10">
        {guidesLibraryNav.map((item, index) => {
          const active = activeId === item.id;
          return (
            <React.Fragment key={item.id}>
              {index > 0 ? (
                <span className="px-3 text-[11px] text-brand-cocoa/45" aria-hidden>
                  ·
                </span>
              ) : null}
              <Link
                href={item.href}
                className={cn(
                  "whitespace-nowrap text-[11px] uppercase tracking-[0.18em] transition-colors",
                  active ? "text-brand-navy" : "text-brand-graphite hover:text-brand-navy",
                )}
              >
                {item.label}
              </Link>
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}

function ctaPhrase(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function sameCtaPhrase(a: string, b: string) {
  return ctaPhrase(a) === ctaPhrase(b);
}

export function CTA({
  title = "Start Here.",
  description = "Begin with Guidance, a Situation Assessment, a Property Assessment, or a Livability Score.",
  href = "/situations",
  label = "Start Here",
  eyebrow = "Start Here",
}: {
  title?: string;
  description?: string;
  href?: string;
  label?: string;
  eyebrow?: string;
}) {
  const hideSectionEyebrow = sameCtaPhrase(eyebrow, title);
  const hideButtonEyebrow = sameCtaPhrase(eyebrow, label);
  const actionClass = hideButtonEyebrow
    ? "ak-call-button group inline-flex min-w-[16rem] items-center justify-between gap-6 px-5 py-4 text-left text-[14px] font-semibold uppercase tracking-[0.12em] transition-colors"
    : "ak-call-button group grid px-5 py-4 text-left transition-colors";
  const actionInner = hideButtonEyebrow ? (
    <>
      <span>{label}</span>
      <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
    </>
  ) : (
    <>
      <span className="text-[10px] uppercase tracking-[0.24em] text-brand-brass">{eyebrow}</span>
      <span className="mt-3 h-px w-full bg-brand-ivory/24" aria-hidden />
      <span className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.16em]">
        {label}
        <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
      </span>
    </>
  );

  return (
    <section className="border-t border-brand-brass/30 bg-brand-navy text-brand-ivory">
      <PageSection className="py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            {hideSectionEyebrow ? null : <p className={grammar.eyebrowOnDark}>{eyebrow}</p>}
            <h2 className={cn(hideSectionEyebrow ? "" : "mt-4", grammar.sectionOnDark)}>{title}</h2>
            <p className={cn("mt-5", grammar.bodyOnDark)}>{description}</p>
          </div>
          <div className="grid gap-3 sm:min-w-[16rem]">
            {href.startsWith("#") ? (
              <a
                href={href}
                className={actionClass}
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
                {actionInner}
              </a>
            ) : (
              <Link href={href} className={actionClass}>
                {actionInner}
              </Link>
            )}
          </div>
        </div>
      </PageSection>
    </section>
  );
}

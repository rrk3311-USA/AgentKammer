/**
 * Agent Kammer Design System — single source for layout + type class strings.
 * Fonts: Canela / Noe Display / Neue Haas Grotesk when licensed; Newsreader + Inter as fallbacks.
 */

/** 8px grid section rhythm — 120px mobile, 160px desktop */
export const sectionY = "py-30 lg:py-40";

export const siteContainer = "mx-auto w-full max-w-site px-6 lg:px-10";
export const contentContainer = "mx-auto w-full max-w-content";
export const readingContainer = "mx-auto w-full max-w-reading";

/** Typography scale */
export const typeH1 =
  "font-display text-[clamp(4rem,5vw,5rem)] font-medium leading-[0.95] tracking-[-0.03em] text-brand-ink";
export const typeH2 = "font-display text-display-2 font-medium tracking-[-0.02em] text-brand-ink";
export const typeH3 = "font-display text-display-3 font-medium tracking-[-0.02em] text-brand-ink";
export const typeBody = "text-body-lg leading-relaxed text-brand-graphite";
export const typeBodyInk = "text-body-lg leading-relaxed text-brand-ink";
export const typeSmall = "text-body-sm leading-relaxed text-brand-graphite";

/** Header navigation — sans, light, small (mockup) */
export const typeHeaderNav =
  "font-sans text-[0.6875rem] font-normal uppercase tracking-[0.14em] text-brand-graphite transition-opacity duration-brand ease-brand-out";
export const typeHeaderNavActive =
  "font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-brand-ink";

/** In-page labels + list rows */
export const typeNav =
  "font-sans text-[0.6875rem] font-normal uppercase tracking-[0.12em] text-brand-graphite transition-opacity duration-brand ease-brand-out";
export const typeNavActive = "font-sans text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-brand-ink";

export const typeEyebrow = "font-sans text-[0.6875rem] font-normal uppercase tracking-[0.14em] text-brand-graphite";
export const typeEyebrowOnDark = "font-sans text-[0.6875rem] font-normal uppercase tracking-[0.14em] text-brand-ivory/65";

/** Surfaces */
export const surfaceCard =
  "rounded-card border border-brand-border bg-brand-surface transition-opacity duration-brand ease-brand-out";
export const surfaceImage = "overflow-hidden rounded-image bg-brand-surface";

/** Motion — fade / subtle scale only */
export const motionEnter = "animate-fade-in";
export const motionHover = "transition-[opacity,transform] duration-brand ease-brand-out hover:opacity-90";

/** Focus — WCAG visible ring */
export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/35 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ivory";

/** Gold accent — use extremely sparingly (one element per view max) */
export const accentGold = "text-brand-gold";

/**
 * Agent Kammer Design System - single source for layout + type class strings.
 * Fonts: Canela / Noe Display / Neue Haas Grotesk when licensed; Newsreader + Inter as fallbacks.
 */

/** 8px grid section rhythm - 120px mobile, 160px desktop */
export const sectionY = "py-30 lg:py-40";

export const siteContainer = "mx-auto w-full max-w-site px-6 lg:px-10";
export const contentContainer = "mx-auto w-full max-w-content";
export const readingContainer = "mx-auto w-full max-w-reading";

/** Typography scale — four public sizes: display, title, heading, body/meta */
export const typeH1 = "ak-display";
export const typeH2 = "ak-title";
export const typeH3 = "ak-heading";
export const typeBody = "ak-lede";
export const typeBodyInk = "ak-lede text-brand-ink";
export const typeSmall = "ak-meta";

/** Header navigation - sans, light, small (mockup) */
export const typeHeaderNav =
  "font-sans text-[0.6875rem] font-normal uppercase tracking-[0.14em] text-brand-graphite transition-opacity duration-brand ease-brand-out";
export const typeHeaderNavActive =
  "font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-brand-ink";

/** In-page labels + list rows */
export const typeNav =
  "font-sans text-[0.6875rem] font-normal uppercase tracking-[0.12em] text-brand-graphite transition-opacity duration-brand ease-brand-out";
export const typeNavActive = "font-sans text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-brand-ink";

export const typeEyebrow = "ak-kicker";
export const typeEyebrowOnDark = "font-sans text-[0.6875rem] font-normal uppercase tracking-[0.14em] text-brand-ivory/65";

/** Surfaces */
export const surfaceCard =
  "ak-card rounded-card transition-opacity duration-brand ease-brand-out";
export const surfaceImage = "overflow-hidden rounded-image bg-brand-surface";

/** Motion - fade / subtle scale only */
export const motionEnter = "animate-fade-in";
export const motionHover = "transition-[opacity,transform] duration-brand ease-brand-out hover:opacity-90";

/** Focus - WCAG visible ring */
export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/35 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ivory";

/** Gold accent - use extremely sparingly (one element per view max) */
export const accentGold = "text-brand-gold";

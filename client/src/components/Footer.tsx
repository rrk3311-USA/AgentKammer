import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  FOOTER_DARK_LINKS,
} from "@/data/site-map";
import { decisionNavigationGroups } from "@/data/decision-navigation";
import { SITE_LANGUAGE_LOOP, setStoredPreferredLanguage } from "@/data/site-language";
import { AkMonogramMark } from "@/components/AkMonogramMark";
import { cn } from "@/lib/utils";

const whatsChangingItems =
  decisionNavigationGroups.find((group) => group.title === "What's Changing?")?.items ?? [];

/** Situation pages are `/situations/:slug`. Start Here (`/situations`) is not one. */
export function isSituationPagePath(location: string) {
  const path = location.split(/[?#]/)[0] ?? location;
  return /^\/situations\/[^/]+\/?$/.test(path);
}

export function isHomePath(location: string) {
  const path = location.split(/[?#]/)[0] ?? location;
  return path === "/";
}

const quietChipClass =
  "ak-quiet-chip shrink-0 rounded-full border border-brand-ivory/12 bg-brand-ivory/[0.05] px-2.5 py-1 text-[9.5px] font-medium uppercase tracking-[0.08em] text-brand-ivory/62";

const situationIndexLink =
  "text-[12px] leading-5 text-brand-graphite/72 transition-colors hover:text-brand-navy";

const charcoalLink =
  "text-[10px] uppercase tracking-[0.16em] text-brand-ivory/78 transition-colors hover:text-brand-brass";

export function footerTopRuleClass(exploreOtherSituations: boolean, home = false) {
  if (home) return "bg-brand-charcoal text-brand-ivory";
  return cn(
    exploreOtherSituations
      ? "bg-brand-ivory text-brand-graphite border-t-2 border-brand-navy/28"
      : "bg-[#161C28] text-brand-ivory border-t border-brand-brass/20",
  );
}

export function WhatsChangingPills({
  className,
  showKicker = true,
}: { className?: string; showKicker?: boolean } = {}) {
  return (
    <div data-ak-whats-changing className={cn("text-center", className)}>
      {showKicker ? (
        <p className="text-[10px] uppercase tracking-[0.2em] text-brand-ivory/48">What's Changing?</p>
      ) : null}
      <nav
        aria-label="What's Changing"
        className={cn(
          "flex flex-wrap items-center justify-center gap-x-1 gap-y-1",
          showKicker ? "mt-1.5" : "mt-0",
        )}
      >
        {whatsChangingItems.map((item) => (
          <Link key={item.href + item.label} href={item.href} className={quietChipClass}>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function WhatsChangingBand() {
  return (
    <section className="bg-[#161C28] text-brand-ivory">
      <div className="mx-auto w-full max-w-site px-5 py-5 sm:px-6 lg:px-10 lg:py-6">
        <WhatsChangingPills />
      </div>
    </section>
  );
}

export function FooterIvoryIndex({ exploreOtherSituations }: { exploreOtherSituations: boolean }) {
  if (!exploreOtherSituations) {
    return <WhatsChangingBand />;
  }

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-site px-5 sm:px-6 lg:px-10",
        "py-10 lg:py-16",
      )}
    >
      <h3 className="text-[11px] uppercase tracking-[0.2em] text-brand-graphite/70">
        Explore other situations
      </h3>
      <nav
        aria-label="Explore other situations"
        className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3"
      >
        {whatsChangingItems.map((item) => (
          <Link key={item.href + item.label} href={item.href} className={situationIndexLink}>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

function FooterDotRow({
  items,
  label,
}: {
  items: readonly { label: string; href: string }[];
  label: string;
}) {
  return (
    <nav aria-label={label} className="inline-flex flex-wrap items-center">
      {items.map((item, index) => (
        <span key={item.href + item.label} className="inline-flex items-center whitespace-nowrap">
          <Link href={item.href} className={charcoalLink}>
            {item.label}
          </Link>
          {index < items.length - 1 ? (
            <span className="px-2.5 text-[10px] text-brand-ivory/28" aria-hidden>
              ·
            </span>
          ) : null}
        </span>
      ))}
    </nav>
  );
}

export function Footer() {
  const [langsOpen, setLangsOpen] = useState(false);
  const [location] = useLocation();
  const home = isHomePath(location);
  const exploreOtherSituations = isSituationPagePath(location);

  return (
    <footer className={footerTopRuleClass(exploreOtherSituations, home)}>
      {home ? null : <FooterIvoryIndex exploreOtherSituations={exploreOtherSituations} />}

      <div data-ak-charcoal-footer className="border-t border-brand-brass/28 bg-brand-charcoal text-brand-ivory">
        <div className="mx-auto flex w-full max-w-site flex-col gap-2.5 px-5 pb-3 pt-5 sm:px-6 lg:px-10">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <div className="flex shrink-0 items-start gap-3">
              <AkMonogramMark variant="ivory" className="mt-0.5 h-6 w-auto opacity-90" />
              <div>
                <p className="font-display text-[1.35rem] leading-none text-brand-ivory">Agent Kammer</p>
                <p className="mt-1.5 text-[10px] uppercase tracking-[0.16em] text-brand-ivory/62">
                  Private Housing Advisory
                </p>
              </div>
            </div>

            <FooterDotRow items={FOOTER_DARK_LINKS} label="Footer" />
          </div>

          <div className="border-t border-brand-ivory/10 pt-1.5">
            <button
              type="button"
              className="flex w-full items-center justify-between text-[9px] uppercase tracking-[0.18em] text-brand-ivory/55 transition-colors hover:text-brand-brass sm:w-auto sm:gap-3"
              aria-expanded={langsOpen}
              onClick={() => setLangsOpen((open) => !open)}
            >
              <span>Languages</span>
              <span aria-hidden>{langsOpen ? "−" : "+"}</span>
            </button>
            <nav
              aria-label="Languages"
              className={cn(
                "flex-wrap gap-x-2.5 gap-y-1",
                langsOpen ? "mt-2 flex" : "hidden",
              )}
            >
              {SITE_LANGUAGE_LOOP.map((lang) => (
                <Link
                  key={lang.code}
                  href={lang.href}
                  onClick={() => setStoredPreferredLanguage(lang.nativeLabel)}
                  className="text-[11px] leading-none text-brand-ivory/72 transition-colors hover:text-brand-brass"
                  title={`${lang.label}: open guide and set chat language`}
                >
                  {lang.nativeLabel}
                </Link>
              ))}
              <Link
                href="/international"
                className="text-[10px] uppercase tracking-[0.14em] text-brand-brass/80 transition-colors hover:text-brand-brass"
              >
                All →
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

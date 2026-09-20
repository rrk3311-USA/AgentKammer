import React, { useState } from "react";
import { Mail } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  FOOTER_DARK_META,
  FOOTER_DARK_NAV,
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

const pillClass =
  "rounded-full border border-brand-border bg-white px-5 py-2 text-[11px] uppercase tracking-[0.1em] text-brand-navy transition-colors hover:border-brand-brass hover:text-brand-brass";

const situationIndexLink =
  "text-[12px] leading-5 text-brand-graphite/72 transition-colors hover:text-brand-navy";

const charcoalLink =
  "text-[10px] uppercase tracking-[0.16em] text-brand-ivory/78 transition-colors hover:text-brand-brass";

export function footerTopRuleClass(exploreOtherSituations: boolean) {
  return cn(
    "bg-brand-ivory text-brand-graphite",
    exploreOtherSituations ? "border-t-2 border-brand-navy/28" : "border-t border-brand-border",
  );
}

export function FooterIvoryIndex({ exploreOtherSituations }: { exploreOtherSituations: boolean }) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-site px-6 lg:px-10",
        exploreOtherSituations ? "py-12 lg:py-16" : "py-7 lg:py-9",
      )}
    >
      {exploreOtherSituations ? (
        <>
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
        </>
      ) : (
        <>
          <h3 className="font-display text-[clamp(1.15rem,2.2vw,1.4rem)] leading-[0.95] text-brand-navy">
            What's Changing?
          </h3>
          <nav aria-label="What's Changing" className="mt-3 flex flex-wrap items-center gap-2">
            {whatsChangingItems.map((item) => (
              <Link key={item.href + item.label} href={item.href} className={pillClass}>
                {item.label}
              </Link>
            ))}
          </nav>
        </>
      )}
    </div>
  );
}

export function Footer() {
  const [langsOpen, setLangsOpen] = useState(false);
  const [location] = useLocation();
  const exploreOtherSituations = isSituationPagePath(location);

  return (
    <footer className={footerTopRuleClass(exploreOtherSituations)}>
      <FooterIvoryIndex exploreOtherSituations={exploreOtherSituations} />

      <div data-ak-charcoal-footer className="border-t border-brand-brass/28 bg-brand-charcoal text-brand-ivory">
        <div className="mx-auto flex w-full max-w-site flex-col gap-2.5 px-6 pb-2 pt-5 lg:px-10">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
            <div className="flex shrink-0 items-start gap-3">
              <AkMonogramMark variant="ivory" className="mt-0.5 h-6 w-auto opacity-90" />
              <div>
                <p className="font-display text-[1.35rem] leading-none text-brand-ivory">Agent Kammer</p>
                <p className="mt-1.5 text-[10px] uppercase tracking-[0.16em] text-brand-ivory/62">
                  Private Housing Advisory
                </p>
              </div>
            </div>

            <div className="flex min-w-0 flex-wrap items-center">
              <nav aria-label="Footer" className="inline-flex flex-wrap items-center">
                {FOOTER_DARK_NAV.map((item, index) => (
                  <span key={item.href} className="inline-flex items-center">
                    {index > 0 ? (
                      <span className="px-2.5 text-[10px] text-brand-ivory/28" aria-hidden>
                        ·
                      </span>
                    ) : null}
                    <Link href={item.href} className={charcoalLink}>
                      {item.label}
                    </Link>
                  </span>
                ))}
              </nav>
              <span className="px-2.5 text-[10px] text-brand-ivory/28" aria-hidden>
                ·
              </span>
              <nav aria-label="Footer legal" className="inline-flex flex-wrap items-center">
                {FOOTER_DARK_META.map((item, index) => (
                  <span key={item.href} className="inline-flex items-center">
                    {index > 0 ? (
                      <span className="px-2.5 text-[10px] text-brand-ivory/28" aria-hidden>
                        ·
                      </span>
                    ) : null}
                    {item.label === "Contact" ? (
                      <span className="inline-flex items-center gap-1.5">
                        <Link
                          href="/contact#request-call"
                          aria-label="Email Agent Kammer"
                          className="inline-flex text-brand-brass transition-colors hover:text-brand-ivory"
                          data-testid="link-footer-contact-mail"
                        >
                          <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </Link>
                        <Link
                          href={item.href}
                          className={charcoalLink}
                          data-testid="link-footer-contact"
                        >
                          {item.label}
                        </Link>
                      </span>
                    ) : (
                      <Link href={item.href} className={charcoalLink}>
                        {item.label}
                      </Link>
                    )}
                  </span>
                ))}
              </nav>
            </div>
          </div>

          <div className="border-t border-brand-ivory/10 pt-1.5">
            <button
              type="button"
              className="flex w-full items-center justify-between text-[9px] uppercase tracking-[0.18em] text-brand-ivory/55 transition-colors hover:text-brand-brass sm:hidden"
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
                "sm:mt-0 sm:flex sm:items-center",
              )}
            >
              <span className="mr-0.5 hidden text-[9px] uppercase tracking-[0.18em] text-brand-ivory/45 sm:inline">
                Lang
              </span>
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

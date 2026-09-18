import { Link, useLocation } from "wouter";
import { useState } from "react";
import { decisionNavigationGroups } from "@/data/decision-navigation";
import { SITE_LANGUAGE_LOOP, setStoredPreferredLanguage } from "@/data/site-language";
import { AkMonogramMark } from "@/components/AkMonogramMark";
import { cn } from "@/lib/utils";
import { scrollPageToTop } from "@/lib/decision-assistant";

const whatsChangingItems =
  decisionNavigationGroups.find((group) => group.title === "What's Changing?")?.items ?? [];

const popularSearches = [
  { label: "Rent vs Buy", href: "/situations/rent-vs-buy-manhattan-relocation" },
  { label: "Stay vs Sell", href: "/buyer-advisory" },
  { label: "NYC Relocation", href: "/situations/executive-relocation-nyc" },
  { label: "Luxury Buildings", href: "/insights/the-quiet-luxury-buildings-of-manhattan" },
  { label: "Building Profiles", href: "/building-reports" },
  { label: "School Districts", href: "/situations/school-district-planning-nyc" },
  { label: "Investment", href: "/situations/1031-exchange-new-york" },
] as const;

const pillClass =
  "rounded-full border border-brand-border bg-white px-4 py-1.5 text-[11px] uppercase tracking-[0.1em] text-brand-navy transition-colors hover:border-brand-brass hover:text-brand-brass";

export function Footer() {
  const [, navigate] = useLocation();

  return (
    <footer className="border-t border-brand-border bg-brand-ivory text-brand-graphite">
      <div className="mx-auto w-full max-w-site px-6 py-8 lg:px-10 lg:py-10">
        <div className="min-w-0">
          <h3 className="font-display text-[clamp(1.5rem,3vw,1.85rem)] leading-[0.95] text-brand-navy">
            What's Changing?
          </h3>
          <nav aria-label="What's Changing" className="mt-4 flex flex-wrap gap-2">
            {whatsChangingItems.map((item) => (
              <Link key={item.href + item.label} href={item.href} className={pillClass}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8">
            <p className="text-[10px] uppercase tracking-[0.18em] text-brand-cocoa">Popular Searches</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {popularSearches.map((item) => (
                <button
                  key={item.href + item.label}
                  type="button"
                  onClick={() => navigate(item.href)}
                  className="w-fit text-left text-[11px] uppercase tracking-[0.1em] text-brand-navy transition-colors hover:text-brand-navy-secondary"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function FooterBar() {
  const [langsOpen, setLangsOpen] = useState(false);
  const [siteOpen, setSiteOpen] = useState(false);

  return (
    <div className="ak-site-dock-footer border-t border-brand-brass/28 bg-brand-charcoal text-brand-ivory">
      <div className="mx-auto flex w-full max-w-site flex-col gap-1.5 px-3 py-1.5 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <AkMonogramMark variant="ivory" className="h-5 w-auto shrink-0 opacity-90" />
            <p className="hidden text-[10px] uppercase tracking-[0.18em] text-brand-ivory/78 sm:inline">
              Copyright 2026 Agent Kammer
            </p>
            <p className="text-[10px] uppercase tracking-[0.14em] text-brand-ivory/78 sm:hidden">© 2026</p>
            <Link
              href="/account"
              className="inline-flex shrink-0 items-center border border-brand-brass/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-ivory transition-colors hover:bg-brand-brass/50"
            >
              <span className="sm:hidden">Resume</span>
              <span className="hidden sm:inline">Resume Decision</span>
            </Link>
            <button
              type="button"
              onClick={scrollPageToTop}
              className="shrink-0 text-[10px] uppercase tracking-[0.14em] text-brand-ivory/70 transition-colors hover:text-brand-brass"
            >
              Top
            </button>
          </div>
          <div className="hidden flex-wrap justify-end gap-x-4 gap-y-1 text-[10px] uppercase tracking-[0.18em] text-brand-ivory/78 lg:flex">
            <Link href="/belonging" className="transition-colors hover:text-brand-brass">
              Assessment
            </Link>
            <Link href="/account" className="transition-colors hover:text-brand-brass">
              Decision Hub
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-brand-brass">
              Privacy
            </Link>
            <Link href="/guides" className="transition-colors hover:text-brand-brass">
              Guides
            </Link>
            <Link href="/terms" className="transition-colors hover:text-brand-brass">
              Terms
            </Link>
            <Link href="/licenses" className="transition-colors hover:text-brand-brass">
              Licenses
            </Link>
            <Link href="/contact" className="transition-colors hover:text-brand-brass">
              Contact
            </Link>
          </div>
          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            <button
              type="button"
              className="text-[9px] uppercase tracking-[0.16em] text-brand-ivory/55 transition-colors hover:text-brand-brass"
              aria-expanded={siteOpen}
              onClick={() => {
                setSiteOpen((open) => !open);
                setLangsOpen(false);
              }}
            >
              Site {siteOpen ? "−" : "+"}
            </button>
            <button
              type="button"
              className="text-[9px] uppercase tracking-[0.16em] text-brand-ivory/55 transition-colors hover:text-brand-brass"
              aria-expanded={langsOpen}
              onClick={() => {
                setLangsOpen((open) => !open);
                setSiteOpen(false);
              }}
            >
              Lang {langsOpen ? "−" : "+"}
            </button>
          </div>
        </div>

        {siteOpen ? (
          <nav
            aria-label="Site"
            className="flex flex-wrap gap-x-3 gap-y-1 border-t border-brand-ivory/10 pt-1.5 text-[10px] uppercase tracking-[0.16em] text-brand-ivory/78 lg:hidden"
          >
            <Link href="/belonging" className="transition-colors hover:text-brand-brass">
              Assessment
            </Link>
            <Link href="/account" className="transition-colors hover:text-brand-brass">
              Hub
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-brand-brass">
              Privacy
            </Link>
            <Link href="/guides" className="transition-colors hover:text-brand-brass">
              Guides
            </Link>
            <Link href="/terms" className="transition-colors hover:text-brand-brass">
              Terms
            </Link>
            <Link href="/licenses" className="transition-colors hover:text-brand-brass">
              Licenses
            </Link>
            <Link href="/contact" className="transition-colors hover:text-brand-brass">
              Contact
            </Link>
          </nav>
        ) : null}

        <nav
          aria-label="Languages"
          className={cn(
            "flex-wrap gap-x-2.5 gap-y-1",
            langsOpen ? "flex border-t border-brand-ivory/10 pt-1.5" : "hidden",
            "lg:flex lg:items-center lg:border-t lg:border-brand-ivory/10 lg:pt-1.5",
          )}
        >
          <span className="mr-0.5 hidden text-[9px] uppercase tracking-[0.18em] text-brand-ivory/45 lg:inline">
            Lang
          </span>
          {SITE_LANGUAGE_LOOP.map((lang) => (
            <Link
              key={lang.code}
              href={lang.href}
              onClick={() => setStoredPreferredLanguage(lang.nativeLabel)}
              className="text-[11px] leading-snug text-brand-ivory/72 transition-colors hover:text-brand-brass"
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
  );
}

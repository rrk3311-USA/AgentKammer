import { Link, useLocation } from "wouter";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { decisionNavigationGroups } from "@/data/decision-navigation";
import { SITE_LANGUAGE_LOOP, setStoredPreferredLanguage } from "@/data/site-language";
import { AkMonogramMark } from "@/components/AkMonogramMark";
import { cn } from "@/lib/utils";
import { openDecisionAssistant } from "@/lib/decision-assistant";

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

function ResumeDecisionNest() {
  return (
    <div id="resume-decision-nest" className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={openDecisionAssistant}
        className="inline-flex min-h-11 items-center gap-2 border border-[#c6a870]/30 bg-[#0c0e12] px-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#efe6d6] transition-colors hover:border-[#c6a870]/55"
        aria-label="Open Guidance Advisor"
        data-testid="button-footer-guidance"
      >
        <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
        Guidance
      </button>
      <Link
        href="/account"
        className="inline-flex min-h-11 items-center border border-brand-ivory/20 px-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-ivory/86 transition-colors hover:border-brand-brass hover:text-brand-brass"
      >
        Resume Decision
      </Link>
    </div>
  );
}

export function Footer() {
  const [, navigate] = useLocation();
  const [langsOpen, setLangsOpen] = useState(false);

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

      <div className="border-t border-brand-brass/28 bg-brand-charcoal text-brand-ivory">
        <div className="mx-auto flex w-full max-w-site flex-col gap-2.5 px-6 py-3 lg:px-10">
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex items-center gap-2">
                <AkMonogramMark variant="ivory" className="h-5 w-auto opacity-90" />
                <p className="text-[10px] uppercase tracking-[0.18em] text-brand-ivory/78">
                  Copyright 2026 Agent Kammer
                </p>
              </div>
              <ResumeDecisionNest />
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] uppercase tracking-[0.18em] text-brand-ivory/78">
              <Link href="/belonging" className="transition-colors hover:text-brand-brass">
                Situation Assessment
              </Link>
              <Link href="/contact?intent=property" className="transition-colors hover:text-brand-brass">
                Property Assessment
              </Link>
              <Link href="/contact?intent=strategy" className="transition-colors hover:text-brand-brass">
                Strategy Session
              </Link>
              <Link href="/intelligence" className="transition-colors hover:text-brand-brass">
                Intelligence
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
          </div>

          <div className="border-t border-brand-ivory/10 pt-2">
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
      </div>
    </footer>
  );
}

import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { decisionNavigationGroups } from "@/data/decision-navigation";
import { SITE_LANGUAGE_LOOP, setStoredPreferredLanguage } from "@/data/site-language";
import { AkMonogramMark } from "@/components/AkMonogramMark";
import { cn } from "@/lib/utils";
import {
  DECISION_ASSISTANT_NUDGE_CLEAR_EVENT,
  DECISION_ASSISTANT_NUDGE_EVENT,
  openDecisionAssistant,
} from "@/lib/decision-assistant";

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
  const [nudge, setNudge] = useState<string | null>(null);

  useEffect(() => {
    const onNudge = (event: Event) => {
      const text = (event as CustomEvent<{ text?: string }>).detail?.text?.trim();
      if (text) setNudge(text);
    };
    const onClear = () => setNudge(null);
    window.addEventListener(DECISION_ASSISTANT_NUDGE_EVENT, onNudge);
    window.addEventListener(DECISION_ASSISTANT_NUDGE_CLEAR_EVENT, onClear);
    return () => {
      window.removeEventListener(DECISION_ASSISTANT_NUDGE_EVENT, onNudge);
      window.removeEventListener(DECISION_ASSISTANT_NUDGE_CLEAR_EVENT, onClear);
    };
  }, []);

  return (
    <div id="resume-decision-nest" className="relative">
      {nudge ? (
        <button
          type="button"
          onClick={() => {
            setNudge(null);
            openDecisionAssistant();
          }}
          className="absolute bottom-[calc(100%+0.55rem)] left-0 z-10 w-[min(18.5rem,calc(100vw-3rem))] border border-brand-brass/50 bg-brand-navy px-3 py-2.5 text-left text-brand-ivory shadow-[0_8px_20px_rgba(13,24,43,0.28)]"
        >
          <span className="block text-[10px] uppercase tracking-[0.18em] text-brand-stone">Guidance Advisor</span>
          <span className="mt-1 block text-sm leading-5">{nudge}</span>
          <span className="mt-2 block text-[10px] uppercase tracking-[0.14em] text-brand-brass">Ask</span>
        </button>
      ) : null}
      <div className="inline-flex items-stretch overflow-hidden border border-brand-brass bg-brand-brass/40 shadow-[0_0_0_1px_rgba(176,141,87,0.35),0_8px_18px_rgba(13,24,43,0.28)]">
        <button
          type="button"
          onClick={openDecisionAssistant}
          className="inline-flex items-center gap-1.5 px-2.5 text-brand-ivory transition-colors hover:bg-brand-brass/50"
          aria-label="Open Guidance Advisor"
          title="Continue with the Guidance Advisor"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">Ask</span>
        </button>
        <Link
          href="/account"
          className="inline-flex items-center border-l border-brand-brass/70 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-ivory transition-colors hover:bg-brand-brass/50"
        >
          Resume Decision
        </Link>
      </div>
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

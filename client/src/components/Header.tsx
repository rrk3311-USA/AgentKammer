import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AgentKammerHorizontalLogo } from "@/components/AgentKammerHorizontalLogo";
import { cn } from "@/lib/utils";
import { primaryNav } from "@/components/site-shell";
import { openDecisionAssistant } from "@/lib/decision-assistant";

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location]);

  return (
    <header
      className={cn(
        "ak-header-shell sticky top-0 z-50 w-full border-b border-brand-brass/35 text-brand-ivory transition-[box-shadow] duration-brand ease-brand-out",
        scrolled ? "shadow-[0_10px_24px_rgba(32,39,53,0.14)]" : "",
      )}
    >
      <div className="mx-auto grid max-w-site grid-cols-[1fr_auto] items-center gap-4 px-6 py-4 lg:grid-cols-[auto_1fr_auto] lg:px-8 xl:px-10">
        <Link href="/" data-testid="link-home" className={cn("justify-self-start", focusRing)}>
          <AgentKammerHorizontalLogo variant="light" emphasis="header" />
        </Link>

        <nav className="hidden items-center justify-center gap-6 lg:flex xl:gap-8 2xl:gap-10" aria-label="Primary">
          {primaryNav.map((link) => {
            const active = link.href === "/" ? location === "/" : location.startsWith(link.href);
            return (
              <Link key={link.label} href={link.href} className={cn("group relative shrink-0 px-1 py-2", focusRing)}>
                <span
                  className={cn(
                    "relative text-[0.78rem] uppercase tracking-[0.18em] transition-colors",
                    active ? "text-[#D7C29A]" : "text-[#D8D1C7]/82 group-hover:text-brand-ivory",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-2 left-0 h-px bg-gradient-to-r from-transparent via-brand-brass to-transparent transition-all duration-brand",
                      active ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-80",
                    )}
                    aria-hidden
                  />
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <div className="hidden lg:block">
            <button
              type="button"
              onClick={openDecisionAssistant}
              className="ak-header-blueprint group grid min-w-32 px-4 py-2 text-left transition-colors hover:bg-brand-ivory/12"
            >
              <span className="text-[9px] uppercase tracking-[0.24em] text-[#D7C29A]">Blueprint</span>
              <span className="mt-0.5 flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.16em] text-brand-ivory">
                Begin
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
              </span>
            </button>
          </div>
          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            className={cn("text-brand-ivory lg:hidden", focusRing)}
            aria-label="Toggle menu"
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="ak-header-shell border-t border-brand-brass/30 lg:hidden">
          <nav className="flex flex-col gap-1 px-6 py-6">
            {primaryNav.map((link) => {
              const active = link.href === "/" ? location === "/" : location.startsWith(link.href);
              return (
                <Link key={link.label} href={link.href}>
                  <span
                    className={cn(
                      "block py-2.5 text-[12px] uppercase tracking-[0.2em]",
                      active ? "text-[#D7C29A]" : "text-[#D8D1C7]/84",
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openDecisionAssistant();
              }}
              className="ak-header-blueprint mt-4 grid w-full px-4 py-3 text-left"
            >
              <span className="text-[9px] uppercase tracking-[0.24em] text-[#D7C29A]">Blueprint</span>
              <span className="mt-1 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-brand-ivory">
                Begin
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </span>
            </button>
          </nav>
        </div>
      ) : null}

    </header>
  );
}

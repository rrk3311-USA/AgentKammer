import { Link, useLocation } from "wouter";
import {
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AgentKammerHorizontalLogo } from "@/components/AgentKammerHorizontalLogo";
import { MobileFieldMenu } from "@/components/MobileFieldMenu";
import { cn } from "@/lib/utils";
import { primaryNav } from "@/components/site-shell";
import { PUBLIC_PRODUCTS } from "@/data/public-menu";
import { openDecisionAssistant } from "@/lib/decision-assistant";

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-stone focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy";

function isPrimaryNavActive(href: string, location: string) {
  if (href === "/") return location === "/";
  if (href === "/guides") {
    return (
      location === "/guides" ||
      location.startsWith("/guides/") ||
      location === "/building-reports" ||
      location.startsWith("/building-reports/")
    );
  }
  if (href === "/situations") {
    return location === "/situations" || location.startsWith("/situations/");
  }
  return location === href || location.startsWith(`${href}/`);
}

const headerGuidanceClass =
  "ak-call-button ak-call-button--no-stripe inline-flex items-center px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-ivory";

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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        "ak-header-shell sticky top-0 z-50 w-full border-b border-brand-brass/22 text-brand-ivory transition-[box-shadow] duration-brand ease-brand-out",
        scrolled ? "shadow-[0_10px_24px_rgba(32,39,53,0.14)]" : "",
      )}
    >
      <div className="mx-auto grid max-w-site grid-cols-[1fr_auto] items-center gap-3 px-5 py-2.5 sm:px-6 lg:grid-cols-[auto_minmax(24rem,1fr)_auto] lg:gap-4 lg:px-8 xl:px-10">
        <Link href="/" data-testid="link-home" className={cn("justify-self-start", focusRing)}>
          <AgentKammerHorizontalLogo variant="light" emphasis="header" />
        </Link>

        <nav
          className="hidden justify-self-center border border-brand-ivory/10 bg-brand-ivory/[0.035] px-3 py-1.5 shadow-[inset_0_1px_0_rgba(245,242,235,0.06)] lg:flex lg:items-center lg:justify-center lg:gap-1.5 xl:gap-3 xl:px-5"
          aria-label="Primary"
        >
          {primaryNav.map((link) => {
            const active = isPrimaryNavActive(link.href, location);
            return (
              <Link key={link.label} href={link.href} className={cn("group relative shrink-0 px-2.5 py-1.5 xl:px-4", focusRing)}>
                <span
                  className={cn(
                    "relative text-[0.9rem] capitalize tracking-[0.06em] transition-colors",
                    active ? "text-[#F2E7CB]" : "text-[#AEB8BE] group-hover:text-[#F5F2EB]",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-2 left-0 h-px bg-gradient-to-r from-transparent via-brand-stone to-transparent transition-all duration-brand",
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
              className={cn(headerGuidanceClass, focusRing)}
              data-testid="button-header-guidance"
            >
              {PUBLIC_PRODUCTS.guidance.label}
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

      {mobileMenuOpen ? <MobileFieldMenu location={location} onClose={() => setMobileMenuOpen(false)} /> : null}

      <div className="ak-metal-divider" aria-hidden />
    </header>
  );
}

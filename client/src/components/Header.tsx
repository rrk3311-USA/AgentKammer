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

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy";

function isPrimaryNavActive(href: string, location: string) {
  if (href === "/") return location === "/";
  if (href === "/building-reports") {
    return location === "/building-reports" || location.startsWith("/building-reports/");
  }
  if (href === "/situations") {
    return location === "/situations" || location.startsWith("/situations/");
  }
  if (href === "/intelligence") {
    return location === "/intelligence";
  }
  return location === href || location.startsWith(`${href}/`);
}

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
        "ak-header-shell sticky top-0 z-50 w-full border-b border-brand-brass/22 text-brand-ivory transition-[box-shadow] duration-brand ease-brand-out",
        scrolled ? "shadow-[0_10px_24px_rgba(32,39,53,0.14)]" : "",
      )}
    >
      <div className="mx-auto grid max-w-site grid-cols-[1fr_auto] items-center gap-4 px-6 py-2.5 lg:grid-cols-[auto_minmax(24rem,1fr)_auto] lg:px-8 xl:px-10">
        <Link href="/" data-testid="link-home" className={cn("justify-self-start", focusRing)}>
          <AgentKammerHorizontalLogo variant="light" emphasis="header" />
        </Link>

        <nav
          className="hidden justify-self-center border border-brand-ivory/10 bg-brand-ivory/[0.035] px-5 py-1.5 shadow-[inset_0_1px_0_rgba(245,242,235,0.06)] lg:flex lg:items-center lg:justify-center lg:gap-2 xl:gap-3.5"
          aria-label="Primary"
        >
          {primaryNav.map((link) => {
            const active = isPrimaryNavActive(link.href, location);
            return (
              <Link key={link.label} href={link.href} className={cn("group relative shrink-0 px-3.5 py-1.5 xl:px-5", focusRing)}>
                <span
                  className={cn(
                    "relative text-[0.9rem] capitalize tracking-[0.06em] transition-colors",
                    active ? "text-[#F2E7CB]" : "text-[#AEB8BE] group-hover:text-[#F5F2EB]",
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
            <Link
              href="/contact"
              className="ak-header-blueprint group inline-flex min-w-[11.5rem] items-center justify-between gap-4 px-4 py-2 text-left transition-colors"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-ivory">
                Request Intelligence
              </span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-brand-ivory/85 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
            </Link>
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
              const active = isPrimaryNavActive(link.href, location);
              return (
                <Link key={link.label} href={link.href}>
                  <span
                    className={cn(
                      "block py-2.5 text-[13px] capitalize tracking-[0.08em]",
                      active ? "text-[#F2E7CB]" : "text-[#AEB8BE]",
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="ak-header-blueprint mt-4 flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-ivory">
                Request Intelligence
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-brand-ivory/85" strokeWidth={1.5} />
            </Link>
          </nav>
        </div>
      ) : null}

      <div className="ak-metal-divider" aria-hidden />
    </header>
  );
}

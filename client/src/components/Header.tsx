import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  Baby,
  BriefcaseBusiness,
  Building2,
  ChevronRight,
  CircleDollarSign,
  Ellipsis,
  Home,
  KeyRound,
  Menu,
  Scale,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AgentKammerHorizontalLogo } from "@/components/AgentKammerHorizontalLogo";
import { cn } from "@/lib/utils";
import { primaryNav } from "@/components/site-shell";
import { openDecisionAssistant } from "@/lib/decision-assistant";

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy";

const decisionTriggers = [
  { label: "First Home", href: "/buyer-advisory", icon: KeyRound },
  { label: "Growing Family", href: "/buyer-advisory", icon: Baby },
  { label: "Relocation", href: "/services/corporate-relocation-buyers-nyc", icon: BriefcaseBusiness },
  { label: "Upgrade", href: "/buyer-advisory", icon: TrendingUp },
  { label: "Downsize", href: "/services/empty-nester-downsizing-nyc", icon: TrendingDown },
  { label: "Luxury Rental", href: "/contact", icon: Home },
  { label: "Investment", href: "/services/1031-exchange-new-york", icon: CircleDollarSign },
  { label: "1031", href: "/services/1031-exchange-new-york", icon: Building2 },
  { label: "Divorce", href: "/services/divorce-property-sales-nyc", icon: Scale },
  { label: "Estate", href: "/services/probate-estate-sales-nyc", icon: Home },
  { label: "More", href: "/services", icon: Ellipsis },
];

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
        "sticky top-0 z-50 w-full border-b border-brand-brass/25 bg-brand-navy text-brand-ivory transition-[box-shadow] duration-brand ease-brand-out",
        scrolled ? "shadow-soft" : "",
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
                    "text-[0.72rem] uppercase tracking-[0.14em] transition-colors",
                    active ? "text-brand-brass" : "text-brand-brass hover:text-brand-ivory",
                  )}
                >
                  {link.label}
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
              className="group grid min-w-28 border border-brand-brass/45 bg-brand-ivory/8 px-4 py-2 text-left transition-colors hover:bg-brand-ivory/12"
            >
              <span className="text-[9px] uppercase tracking-[0.22em] text-brand-brass">Blueprint</span>
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
        <div className="border-t border-brand-brass/30 bg-brand-navy lg:hidden">
          <nav className="flex flex-col gap-1 px-6 py-6">
            {primaryNav.map((link) => (
              <Link key={link.label} href={link.href}>
                <span
                  className="block py-2.5 text-[11px] uppercase tracking-[0.18em] text-brand-ivory/82"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openDecisionAssistant();
              }}
              className="mt-4 grid w-full border border-brand-brass/45 bg-brand-ivory/8 px-4 py-3 text-left"
            >
              <span className="text-[9px] uppercase tracking-[0.22em] text-brand-brass">Blueprint</span>
              <span className="mt-1 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-brand-ivory">
                Begin
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </span>
            </button>
          </nav>
        </div>
      ) : null}

      <div className="border-t border-brand-ivory/10 bg-brand-ivory text-brand-navy">
        <div className="mx-auto grid max-w-site gap-3 px-6 py-3 lg:grid-cols-[minmax(180px,0.22fr)_minmax(0,1fr)] lg:px-10">
          <div>
            <p className="text-[9px] uppercase tracking-[0.22em] text-brand-brass">Decision Navigator</p>
            <p className="mt-1 flex items-center gap-1 font-display text-2xl leading-none text-brand-navy">
              What&apos;s changing?
              <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
            </p>
          </div>
          <nav className="flex gap-2 overflow-x-auto py-1" aria-label="Housing decision triggers">
            {decisionTriggers.map((trigger) => (
              <Link
                key={trigger.label}
                href={trigger.href}
                className="group inline-flex h-9 shrink-0 items-center gap-2 rounded-full border border-brand-border bg-transparent px-3.5 text-[10px] uppercase tracking-[0.12em] text-brand-graphite transition-colors hover:border-brand-navy/18 hover:bg-brand-stone/20 hover:text-brand-navy"
              >
                <trigger.icon className="h-3.5 w-3.5 text-brand-brass transition-colors group-hover:text-brand-navy" strokeWidth={1.5} />
                {trigger.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

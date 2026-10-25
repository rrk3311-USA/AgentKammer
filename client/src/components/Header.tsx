import { Link, useLocation } from "wouter";
import React, { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { AgentKammerHorizontalLogo } from "@/components/AgentKammerHorizontalLogo";
import { CompactSiteHeader } from "@/components/CompactSiteHeader";
import { MobileFieldMenu } from "@/components/MobileFieldMenu";
import { MobileMenuToggle } from "@/components/MobileMenuToggle";
import { cn } from "@/lib/utils";
import { primaryNav } from "@/components/site-shell";
import { PUBLIC_PRODUCTS } from "@/data/public-menu";
import { interactiveToolsNav, isHardMobileHref } from "@/data/mobile-nav";
import { openDecisionAssistant } from "@/lib/decision-assistant";

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-stone focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy";

function isPrimaryNavActive(href: string, location: string) {
  if (href === "/") return location === "/";
  if (href === "/guides") {
    return (
      location === "/guides" ||
      location.startsWith("/guides/") ||
      location === "/resources" ||
      location.startsWith("/resources/")
    );
  }
  if (href === "/situations") {
    return location === "/situations" || location.startsWith("/situations/");
  }
  if (href === "/building-reports") {
    return location === "/building-reports" || location.startsWith("/building-reports/");
  }
  if (href === "/tools") {
    return (
      location === "/tools" ||
      location.startsWith("/tools/") ||
      location === "/calculator" ||
      location.startsWith("/calculator/")
    );
  }
  return location === href || location.startsWith(`${href}/`);
}

const navLabelClass = (active: boolean) =>
  cn(
    "relative whitespace-nowrap text-[0.9rem] capitalize tracking-[0.06em] transition-colors",
    active ? "text-[#F2E7CB]" : "text-[#AEB8BE] group-hover:text-[#F5F2EB]",
  );

const navUnderlineClass = (active: boolean) =>
  cn(
    "absolute -bottom-2 left-0 h-px bg-gradient-to-r from-transparent via-brand-stone to-transparent transition-all duration-brand",
    active ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-80",
  );

const headerGuidanceClass =
  "ak-call-button ak-call-button--no-stripe inline-flex items-center px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-ivory";

function HeaderNavLink({
  href,
  label,
  location,
}: {
  href: string;
  label: string;
  location: string;
}) {
  const active = isPrimaryNavActive(href, location);
  return (
    <Link href={href} className={cn("group relative shrink-0 px-2.5 py-1.5 xl:px-4", focusRing)}>
      <span className={navLabelClass(active)}>
        {label}
        <span className={navUnderlineClass(active)} aria-hidden />
      </span>
    </Link>
  );
}

function ToolsDropdown({ location }: { location: string }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const tools = interactiveToolsNav();
  const active = isPrimaryNavActive("/tools", location);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={cn("group relative inline-flex shrink-0 items-center gap-1 px-2.5 py-1.5 xl:px-4", focusRing)}
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="menu"
        data-testid="button-header-tools"
        onClick={() => setOpen((value) => !value)}
      >
        <span className={navLabelClass(active)}>
          Tools
          <span className={navUnderlineClass(active)} aria-hidden />
        </span>
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform", active ? "text-[#F2E7CB]" : "text-[#AEB8BE]", open && "rotate-180")}
          strokeWidth={1.5}
          aria-hidden
        />
      </button>
      <div
        id={menuId}
        role="menu"
        hidden={!open}
        className="absolute left-1/2 top-full z-50 min-w-[13.5rem] -translate-x-1/2 border border-brand-ivory/12 bg-brand-navy py-2 shadow-[0_16px_32px_rgba(13,24,43,0.28)]"
      >
        {tools.map((tool) => {
          const itemClass = cn(
            "block px-4 py-2 text-[0.82rem] tracking-[0.06em] text-[#AEB8BE] transition-colors hover:bg-brand-ivory/[0.06] hover:text-[#F5F2EB]",
            isPrimaryNavActive(tool.href, location) && "text-[#F2E7CB]",
            focusRing,
          );
          return isHardMobileHref(tool.href) ? (
            <a key={tool.href} href={tool.href} role="menuitem" className={itemClass} onClick={() => setOpen(false)}>
              {tool.label}
            </a>
          ) : (
            <Link key={tool.href} href={tool.href} role="menuitem" className={itemClass} onClick={() => setOpen(false)}>
              {tool.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function HeaderGuidance() {
  return (
    <button
      type="button"
      onClick={() => openDecisionAssistant()}
      className={cn(headerGuidanceClass, focusRing)}
      data-testid="button-header-guidance"
    >
      {PUBLIC_PRODUCTS.guidance.label}
    </button>
  );
}

export function Header({ compact = false }: { compact?: boolean } = {}) {
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

  if (compact) return <CompactSiteHeader />;

  return (
    <header
      className={cn(
        "ak-header-shell sticky top-0 z-50 w-full min-h-16 border-b border-brand-brass/22 text-brand-ivory transition-[box-shadow] duration-brand ease-brand-out sm:min-h-0",
        scrolled ? "shadow-[0_10px_24px_rgba(32,39,53,0.14)]" : "",
      )}
    >
      <div className="mx-auto grid max-w-site grid-cols-[1fr_auto] items-center gap-3 px-4 py-2.5 sm:px-6 lg:grid-cols-[auto_minmax(24rem,1fr)_auto] lg:gap-4 lg:px-8 xl:px-10">
        <Link href="/" data-testid="link-home" className={cn("justify-self-start", focusRing)}>
          <AgentKammerHorizontalLogo variant="light" emphasis="header" />
        </Link>

        <nav
          className="hidden justify-self-center border border-brand-ivory/10 bg-brand-ivory/[0.035] px-5 py-1.5 shadow-[inset_0_1px_0_rgba(245,242,235,0.06)] lg:flex lg:items-center lg:justify-center lg:gap-1.5 xl:gap-2.5"
          aria-label="Primary"
        >
          {primaryNav.slice(0, 2).map((link) => (
            <HeaderNavLink key={link.label} href={link.href} label={link.label} location={location} />
          ))}
          <ToolsDropdown location={location} />
          {primaryNav.slice(2).map((link) => (
            <HeaderNavLink key={link.label} href={link.href} label={link.label} location={location} />
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <div className="hidden lg:block">
            <HeaderGuidance />
          </div>
          <MobileMenuToggle
            open={mobileMenuOpen}
            onToggle={() => setMobileMenuOpen((open) => !open)}
          />
        </div>
      </div>

      {mobileMenuOpen ? <MobileFieldMenu location={location} onClose={() => setMobileMenuOpen(false)} /> : null}

      <div className="ak-metal-divider" aria-hidden />
    </header>
  );
}

import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { AgentKammerHorizontalLogo } from "@/components/AgentKammerHorizontalLogo";

const navLinks = [
  { label: "Buy", href: "/buy" },
  { label: "Sell", href: "/sell" },
  { label: "Buildings", href: "/buildings" },
  { label: "Perspectives", href: "/perspectives" },
  { label: "About", href: "/about" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full overflow-visible bg-brand-midnight">
      <div className="bg-brand-midnight">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2.5 lg:gap-6 lg:px-10 lg:py-3">
          <Link href="/" data-testid="link-home" className="shrink-0 overflow-visible">
            <AgentKammerHorizontalLogo variant="default" />
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-end gap-x-5 lg:flex xl:gap-x-7">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="group relative shrink-0 px-1 py-2">
                <span className="whitespace-nowrap font-sans text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-brand-ivory transition group-hover:text-brand-champagne xl:text-[0.78rem]">
                  {link.label}
                </span>
                <span className="absolute bottom-0 left-1/2 h-[1.5px] w-0 -translate-x-1/2 bg-brand-champagne transition-all duration-200 group-hover:w-[86%]" />
              </Link>
            ))}
          </nav>

          <div className="hidden shrink-0 lg:block">
            <Link href="/contact">
              <Button variant="brand" className="whitespace-nowrap">
                Schedule Call
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="shrink-0 text-brand-ivory lg:hidden"
            aria-label="Toggle menu"
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-brand-ivory/12 bg-brand-midnight lg:hidden">
          <nav className="flex flex-col gap-2 px-6 py-5">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href}>
                <span
                  className="block rounded-sm py-2 text-base font-semibold tracking-[0.08em] text-brand-ivory"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <Link href="/contact">
              <Button variant="brand" className="mt-2 w-full">
                Schedule Call
              </Button>
            </Link>
          </nav>
        </div>
      )}

      <div className="h-[2px] w-full bg-gradient-to-r from-brand-champagne/45 via-brand-champagne to-brand-champagne/45" aria-hidden />
    </header>
  );
}

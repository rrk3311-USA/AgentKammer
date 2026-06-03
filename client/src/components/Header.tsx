import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { AgentKammerHorizontalLogo } from "@/components/AgentKammerHorizontalLogo";

const navLinks = [
  { label: "Founder", href: "/about" },
  { label: "Buy", href: "/buying" },
  { label: "Sell", href: "/selling" },
  { label: "Capital Strategy", href: "/refinancing" },
  { label: "Intelligence", href: "/#intelligence" },
  { label: "Market Reports", href: "/#reports" },
  { label: "Contact", href: "/contact" },
];

const rateStrip = [
  ["5.50%", "FED"],
  ["8.50%", "PRIME"],
  ["6.82%", "30Y"],
  ["6.09%", "15Y"],
  ["6.54%", "5/1 ARM"],
  ["7.02%", "JUMBO"],
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#D8C9AD]/70 bg-[#FFF9EE]/95 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" data-testid="link-home" className="shrink-0">
          <AgentKammerHorizontalLogo />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href}>
              <span
                className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#182537]/72 transition hover:text-[#05080E]"
                style={{ fontFamily: "Neue Haas Grotesk, Inter, system-ui, sans-serif" }}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="hidden xl:block">
          <Link href="/profile">
            <Button className="h-10 rounded-none border border-[#B88738] bg-[#07111f] px-5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#F4D681] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] hover:bg-[#0F1C2C] hover:text-[#FFE7A5]">
              Start Private Profile
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="text-[#07111f] lg:hidden"
          aria-label="Toggle menu"
          data-testid="button-mobile-menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className="w-full border-t border-[#D8C9AD]/70 bg-[#07111f]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-3 gap-y-1 px-3 py-1 text-center text-[0.63rem] text-[#FFF9EE] md:grid-cols-6 md:px-6 lg:px-10">
          {rateStrip.map(([value, label]) => (
            <div key={label} className="whitespace-nowrap font-medium">
              <span className="font-mono font-bold text-[#F4D681]">{value}</span> {label}
            </div>
          ))}
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-[#D8C9AD]/70 bg-[#FFF9EE] lg:hidden">
          <nav className="flex flex-col gap-4 px-6 py-5">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href}>
                <span
                  className="block text-sm font-medium text-[#07111f]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <Link href="/profile">
              <Button className="mt-2 h-10 rounded-none border border-[#B88738] bg-[#07111f] text-[#F4D681] hover:bg-[#0F1C2C]">
                Start Private Profile
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

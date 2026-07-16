import { Link, useLocation } from "wouter";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { decisionNavigationGroups } from "@/data/decision-navigation";

const libraryLinks = decisionNavigationGroups.flatMap((group) =>
  group.items.map((item) => ({
    ...item,
    group: group.title,
  })),
);

const quickLinks = [
  { label: "Start Here", href: "/buyer-advisory" },
  { label: "Decision Assessment", href: "/belonging" },
  { label: "Building Intelligence", href: "/building-reports" },
  { label: "Contact", href: "/contact" },
] as const;

const searchPrompts = [
  "Search: Should I move?",
  "Search: Condo vs Co-op",
  "Search: Executive relocation",
  "Search: What's changing?",
  "Search: Should I renovate before selling?",
  "Search: Should I wait to buy?",
] as const;

const popularSearches = [
  { label: "Rent vs Buy", href: "/services/rent-vs-buy-manhattan-relocation" },
  { label: "Stay vs Sell", href: "/buyer-advisory" },
  { label: "Relocation", href: "/services/executive-relocation-nyc" },
  { label: "Luxury Buildings", href: "/insights/the-quiet-luxury-buildings-of-manhattan" },
  { label: "Building Reports", href: "/building-reports" },
  { label: "School Districts", href: "/services/school-district-planning-nyc" },
  { label: "Investment", href: "/services/1031-exchange-new-york" },
] as const;

export function Footer() {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPromptIndex((current) => (current + 1) % searchPrompts.length);
    }, 4000);
    return () => window.clearInterval(interval);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return libraryLinks.slice(0, 12);
    return libraryLinks.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q),
    ).slice(0, 24);
  }, [query]);

  function handlePopularSearch(item: (typeof popularSearches)[number]) {
    setQuery(item.label);
    navigate(item.href);
  }

  return (
    <footer className="border-t border-brand-border bg-brand-ivory text-brand-graphite">
      <div className="mx-auto w-full max-w-site px-6 py-12 lg:px-10 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-brand-cocoa">Agent Kammer</p>
            <p className="mt-4 max-w-md font-display text-3xl leading-[0.95] text-brand-navy">
              Live Where You Belong.
            </p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-brand-graphite">
              Buildings before listings. Better real estate decisions — including the decision to stay.
            </p>
            <nav aria-label="Footer" className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[11px] uppercase tracking-[0.14em] text-brand-navy transition-colors hover:text-brand-brass"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-brand-cocoa">Browse the Practice</p>
            <h3 className="mt-3 font-display text-[clamp(1.85rem,3.6vw,2.15rem)] leading-[0.95] text-brand-navy">
              Research Library
            </h3>
            <p className="mt-3 max-w-md text-sm leading-7 text-brand-graphite">
              Before making a housing decision, explore the research.
            </p>

            <p className="mt-7 text-[11px] uppercase tracking-[0.16em] text-brand-cocoa">
              What are you trying to figure out?
            </p>
            <label className="relative mt-3 block">
              <span className="sr-only">Search the Research Library</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-cocoa" strokeWidth={1.5} />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={searchPrompts[promptIndex]}
                aria-label="Search the Research Library"
                className="w-full border border-brand-border bg-white py-3 pl-10 pr-4 text-sm text-brand-navy placeholder:text-brand-graphite/55 outline-none transition-colors focus:border-brand-brass"
              />
            </label>

            <div className="mt-5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-brand-cocoa">Popular Searches</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {popularSearches.map((item) => (
                  <button
                    key={item.href + item.label}
                    type="button"
                    onClick={() => handlePopularSearch(item)}
                    className="rounded-full border border-brand-border bg-white px-4 py-1.5 text-[11px] uppercase tracking-[0.1em] text-brand-navy transition-colors hover:border-brand-brass hover:text-brand-brass"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 max-h-56 overflow-y-auto border-t border-brand-border">
              {results.length === 0 ? (
                <p className="py-4 text-sm text-brand-graphite">No matches. Try “relocation,” “condo,” or “schools.”</p>
              ) : (
                results.map((item) => (
                  <Link
                    key={`${item.group}-${item.href}-${item.label}`}
                    href={item.href}
                    className="grid grid-cols-[minmax(0,0.4fr)_minmax(0,1fr)] gap-3 border-b border-brand-border py-3 transition-colors hover:bg-white/60"
                  >
                    <span className="text-[10px] uppercase tracking-[0.14em] text-brand-cocoa">{item.group}</span>
                    <span className="text-sm text-brand-navy">{item.label}</span>
                  </Link>
                ))
              )}
            </div>
            <Link
              href="/services"
              className="mt-3 inline-block text-[11px] uppercase tracking-[0.14em] text-brand-navy transition-colors hover:text-brand-brass"
            >
              Explore the complete research library.
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-brass/28 bg-brand-charcoal text-brand-ivory">
        <div className="mx-auto flex w-full max-w-site flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <p className="text-[10px] uppercase tracking-[0.18em] text-brand-ivory/78">Copyright 2026 Agent Kammer</p>
            <Link
              href="/account"
              className="inline-flex w-fit items-center border border-brand-brass/40 bg-brand-brass/12 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-ivory transition-colors hover:border-brand-brass hover:bg-brand-brass/22"
            >
              Resume My Decision
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.18em] text-brand-ivory/78">
            <Link href="/belonging" className="transition-colors hover:text-brand-brass">
              Assessment
            </Link>
            <Link href="/account" className="transition-colors hover:text-brand-brass">
              Decision Hub
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-brand-brass">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-brand-brass">
              Terms
            </Link>
            <Link href="/licenses" className="transition-colors hover:text-brand-brass">
              Licenses
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

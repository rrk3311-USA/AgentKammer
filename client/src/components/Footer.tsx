import { Link } from "wouter";
import logoEmblem from "@assets/agent-kammer-logo-emblem-gold-wreath.png";

const footerLinks = [
  { label: "Lease", href: "/lease" },
  { label: "Buy / Sell", href: "/buy-sell" },
  { label: "Buildings", href: "/buildings" },
  { label: "Perspectives", href: "/perspectives" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Join Manhattan Brief", href: "/perspectives#manhattan-brief" },
];

export function Footer() {
  return (
    <footer className="border-t-2 border-brand-champagne/35 bg-brand-midnight text-brand-ivory">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1fr_0.75fr] lg:items-start">
          <div>
            <img
              src={logoEmblem}
              alt=""
              aria-hidden
              className="mb-4 h-12 w-12 object-contain sm:h-14 sm:w-14"
              loading="lazy"
            />
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-ivory">Agent Kammer</p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-brand-champagne">Modern Manhattan Luxury</p>
          </div>

          <nav className="grid grid-cols-2 gap-x-8 gap-y-3 sm:flex sm:flex-wrap lg:justify-center" aria-label="Footer">
            {footerLinks.map((link) => (
              <Link key={link.label} href={link.href}>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-ivory/72 transition hover:text-brand-champagne">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="lg:text-right">
            <p className="text-xs uppercase tracking-[0.18em] text-brand-ivory/60">New York, NY</p>
            <a
              href="mailto:info@AgentKammer.com"
              className="mt-3 inline-flex text-sm text-brand-ivory/82 transition hover:text-brand-champagne"
            >
              info@AgentKammer.com
            </a>
            <div className="mt-3 flex gap-4 lg:justify-end">
              <span className="text-xs uppercase tracking-[0.14em] text-brand-ivory/50">Instagram</span>
              <span className="text-xs uppercase tracking-[0.14em] text-brand-ivory/50">LinkedIn</span>
            </div>
          </div>
        </div>

        <div className="mt-9 border-t border-brand-champagne/25 pt-5">
          <details className="group text-xs text-brand-ivory/55">
            <summary className="cursor-pointer list-none text-center uppercase tracking-[0.14em] text-brand-ivory/58 transition hover:text-brand-champagne">
              <span>Licensed Real Estate Salesperson · Equal Housing Opportunity · Required NY Disclosures</span>
              <span className="ml-2 text-brand-champagne/70 group-open:hidden">+</span>
              <span className="ml-2 hidden text-brand-champagne/70 group-open:inline">−</span>
            </summary>
            <p className="mx-auto mt-3 max-w-3xl text-center leading-6">
              Real estate services are subject to applicable New York licensing, agency disclosure, fair housing, and
              consumer protection requirements. Full disclosures are available upon request.
            </p>
          </details>
        </div>

        <div className="mt-5 flex flex-col items-center justify-between gap-4 border-t border-brand-ivory/10 pt-5 text-xs text-brand-ivory/45 sm:flex-row">
          <p>Copyright 2026 · Agent Kammer</p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Fair Housing</span>
            <span>Agency Disclosure</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

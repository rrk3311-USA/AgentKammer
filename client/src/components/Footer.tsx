import { Link } from "wouter";
import { Mail } from "lucide-react";
import logoEmblem from "@assets/agent-kammer-logo-emblem-gold-wreath.png";

export function Footer() {
  return (
    <footer className="border-t-2 border-brand-champagne/35 bg-brand-midnight text-brand-ivory">
      <div className="mx-auto max-w-7xl px-6 py-12 text-center lg:px-10 lg:py-14">
        <img
          src={logoEmblem}
          alt=""
          aria-hidden
          className="mx-auto mb-4 h-12 w-12 object-contain sm:h-14 sm:w-14"
          loading="lazy"
        />
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-ivory">Agent Kammer</p>
        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-brand-champagne">Modern Manhattan Luxury</p>
        <p className="mt-1 text-xs uppercase tracking-[0.14em] text-brand-ivory/75">
          Leasing • Strategic Acquisition • Building Intelligence
        </p>
        <div className="mt-6 flex justify-center">
          <Link href="/contact">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-brand-champagne/45 px-5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-brand-ivory transition hover:border-brand-champagne hover:bg-brand-ivory/5">
              <Mail className="h-4 w-4 text-brand-champagne" strokeWidth={1.75} />
              Contact Us
            </span>
          </Link>
        </div>
        <p className="mt-6 text-xs tracking-[0.06em] text-brand-ivory/55">
          Copyright 2026 · New York, NY
        </p>
      </div>
    </footer>
  );
}

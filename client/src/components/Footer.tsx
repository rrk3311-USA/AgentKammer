import { Mail } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const marketSnapshot = [
  { label: "Median Price", value: "$2.18M", delta: "+6.2%", note: "vs. last quarter" },
  { label: "Inventory", value: "4,382", delta: "-8.7%", note: "vs. last quarter" },
  { label: "Days on Market", value: "47", delta: "-12%", note: "vs. last quarter" },
  { label: "Price / Sq Ft", value: "$1,850", delta: "+4.1%", note: "vs. last quarter" },
];

export function Footer() {
  return (
    <footer className="border-t border-brand-graphite/30 bg-brand-midnight text-brand-ivory">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <h2 className="text-3xl font-semibold text-brand-ivory" style={{ fontFamily: "Noe Display, var(--font-serif)" }}>
          Manhattan Market Overview
        </h2>
        <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-champagne">
          Market Intelligence Snapshot
        </p>

        <div className="mt-5 grid grid-cols-2 overflow-hidden rounded-md border border-brand-ivory/16 bg-brand-midnight lg:grid-cols-4">
          {marketSnapshot.map((metric) => (
            <div key={metric.label} className="border-b border-r border-brand-ivory/16 p-5 last:border-r-0 lg:border-b-0">
              <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-brand-champagne">{metric.label}</p>
              <p className="mt-4 font-mono text-3xl leading-none text-brand-ivory">{metric.value}</p>
              <p className="mt-3 text-sm font-semibold text-brand-ivory">{metric.delta}</p>
              <p className="mt-1 text-xs text-brand-steel">{metric.note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-brand-ivory/12">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-champagne">
            Get Manhattan Market Intelligence
          </p>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
            <form
              className="flex max-w-md flex-1"
              onSubmit={(event) => {
                event.preventDefault();
                const form = event.currentTarget;
                const input = form.querySelector("input") as HTMLInputElement | null;
                if (input) input.value = "";
                alert("Subscribed. You will receive weekly Manhattan market intelligence.");
              }}
            >
              <input
                type="email"
                required
                aria-label="Email for weekly Manhattan market intelligence"
                placeholder="Enter your email"
                className="h-11 min-w-0 flex-1 border border-brand-steel/50 bg-transparent px-4 text-sm text-brand-ivory outline-none placeholder:text-brand-steel focus:border-brand-champagne"
              />
              <button className="h-11 border border-brand-champagne bg-brand-champagne px-5 text-xs font-bold uppercase tracking-[0.14em] text-brand-midnight hover:bg-brand-champagne/90">
                Subscribe
              </button>
            </form>

            <span className="hidden text-xs uppercase tracking-[0.16em] text-brand-steel lg:inline">or</span>

            <Link href="/profile">
              <Button className="h-11 w-full rounded-none border border-brand-ivory/40 bg-transparent px-6 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brand-ivory hover:bg-brand-ivory/10 lg:w-auto">
                Start Private Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-ivory/12">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-7 md:flex-row md:items-center md:justify-between lg:px-10">
          <a
            href="mailto:info@agentkammer.com"
            className="group inline-flex items-center gap-4 rounded-full border border-brand-champagne/50 bg-brand-midnight px-4 py-3 text-brand-ivory transition hover:border-brand-champagne hover:bg-brand-sapphire/25"
          >
            <Mail className="h-5 w-5 shrink-0 text-brand-champagne transition group-hover:scale-105" aria-hidden />
            <span className="pr-1 text-xs font-bold uppercase tracking-[0.14em] text-brand-ivory/92">
              Email Concierge
            </span>
          </a>

          <address className="text-sm not-italic leading-7 text-brand-steel">
            <a href="mailto:info@agentkammer.com" className="block text-brand-ivory hover:underline">
              info@AgentKammer.com
            </a>
            <span>New York, NY</span>
          </address>
        </div>
      </div>

      <div className="border-t border-brand-ivory/12 bg-[#060E21]">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center lg:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-ivory">Agent Kammer</p>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-brand-champagne">
            Manhattan Intelligence | Luxury Representation
          </p>
          <p className="mt-4 font-serif text-base italic text-brand-ivory/88">
            Wall Street Intelligence. Manhattan Execution.
          </p>
          <p className="mt-4 text-xs tracking-[0.06em] text-brand-ivory/72">Copyright 2025</p>
        </div>
      </div>
    </footer>
  );
}

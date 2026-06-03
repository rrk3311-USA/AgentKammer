import { ArrowRight } from "lucide-react";

const marketSnapshot = [
  { label: "Median Price", value: "$2.18M", delta: "+6.2%", note: "vs. last quarter" },
  { label: "Inventory", value: "4,382", delta: "-8.7%", note: "vs. last quarter" },
  { label: "Days on Market", value: "47", delta: "-12%", note: "vs. last quarter" },
  { label: "Price / Sq Ft", value: "$1,850", delta: "+4.1%", note: "vs. last quarter" },
];

const marketActivity = [
  ["New Listings", "312"],
  ["Contracts Signed", "198"],
  ["Price Reductions", "86"],
  ["Off Market", "42"],
];

export function Footer() {
  return (
    <footer className="border-t border-[#263241] bg-[#07111f] text-[#F6F3EB]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-10 lg:grid-cols-[1fr_0.42fr] lg:px-10">
        <section>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#D6B45F]">Market Intelligence Snapshot</p>
          <h2 className="text-3xl font-semibold" style={{ fontFamily: "Noe Display, var(--font-serif)" }}>
            Manhattan Market Overview
          </h2>

          <div className="mt-5 grid grid-cols-2 overflow-hidden rounded-md border border-[#F6F3EB]/16 lg:grid-cols-4">
            {marketSnapshot.map((metric) => (
              <div key={metric.label} className="border-b border-r border-[#F6F3EB]/16 p-5 last:border-r-0 lg:border-b-0">
                <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#D6B45F]">{metric.label}</p>
                <p className="mt-4 font-mono text-3xl leading-none text-[#F6F3EB]">{metric.value}</p>
                <p className="mt-3 text-sm font-semibold text-[#F6F3EB]">{metric.delta}</p>
                <p className="mt-1 text-xs text-[#F6F3EB]/62">{metric.note}</p>
              </div>
            ))}
          </div>

          <a href="/#reports" className="mt-6 inline-flex items-center text-xs font-bold uppercase tracking-[0.16em] text-[#D6B45F]">
            View Full Market Report
            <ArrowRight className="ml-3 h-4 w-4" />
          </a>
        </section>

        <aside className="border-t border-[#F6F3EB]/14 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-2">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D6B45F]">Market Activity</p>
          <p className="mt-1 text-sm font-semibold text-[#F6F3EB]">Last 7 Days</p>
          <div className="mt-5 divide-y divide-[#F6F3EB]/12 border-y border-[#F6F3EB]/12">
            {marketActivity.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between py-3 text-sm">
                <span className="text-[#F6F3EB]/82">{label}</span>
                <span className="font-mono text-[#F6F3EB]">{value}</span>
              </div>
            ))}
          </div>
          <a href="/#intelligence" className="mt-6 inline-flex items-center text-xs font-bold uppercase tracking-[0.16em] text-[#D6B45F]">
            View All Activity
            <ArrowRight className="ml-3 h-4 w-4" />
          </a>
        </aside>
      </div>

      <div className="border-t border-[#F6F3EB]/12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-7 md:grid-cols-[0.8fr_1fr_0.7fr] lg:px-10">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#D6B45F]/70 text-[#D6B45F]">
              <span className="text-3xl font-semibold" style={{ fontFamily: "Canela, var(--font-display)" }}>K</span>
            </div>
            <p className="max-w-xs text-sm font-semibold leading-6 text-[#F6F3EB]/86">
              Discretion. Strategy. Execution. That is the Agent Kammer Standard.
            </p>
          </div>

          <form
            className="border-t border-[#F6F3EB]/14 pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0"
            onSubmit={(event) => {
              event.preventDefault();
              const form = event.currentTarget;
              const input = form.querySelector("input") as HTMLInputElement | null;
              if (input) input.value = "";
              alert("Subscribed. You will receive weekly Manhattan market intelligence.");
            }}
          >
            <label className="text-sm font-semibold text-[#F6F3EB]">Get weekly Manhattan market intelligence.</label>
            <div className="mt-4 flex max-w-md">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="h-11 min-w-0 flex-1 border border-[#D6B45F]/50 bg-transparent px-4 text-sm text-[#F6F3EB] outline-none placeholder:text-[#F6F3EB]/42"
              />
              <button className="h-11 border border-[#D6B45F] bg-[#D6B45F] px-5 text-xs font-bold uppercase tracking-[0.14em] text-[#07111f]">
                Subscribe
              </button>
            </div>
          </form>

          <address className="border-t border-[#F6F3EB]/14 pt-5 text-sm not-italic leading-7 text-[#F6F3EB]/86 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <a href="mailto:info@agentkammer.com" className="block hover:underline">info@agentkammer.com</a>
            <a href="tel:+12123456789" className="block hover:underline">(212) 123-4567</a>
            <span>New York, NY</span>
          </address>
        </div>
      </div>
    </footer>
  );
}

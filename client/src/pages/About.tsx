import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  Compass,
  Film,
  MapPin,
  Search,
  ShieldCheck,
} from "lucide-react";
import raphaelImage from "@assets/generated_images/Raphael_professional_character_with_glow_e301eca7.png";

const edgeItems = [
  { label: "AI Systems", icon: Bot },
  { label: "Analytics", icon: BarChart3 },
  { label: "Market Research", icon: Search },
  { label: "Media", icon: Film },
  { label: "Execution", icon: Compass },
  { label: "Client Advocacy", icon: ShieldCheck },
];

const principles = [
  "Research before recommendation",
  "Clear market context before decisions",
  "Technology that makes the client sharper",
  "Media and analysis built around real buyer and seller questions",
];

const markets = ["New York City", "Future Expansion: Florida", "Future Expansion: California"];

export default function About() {
  return (
    <div className="min-h-screen bg-[#F6F3EB] text-[#222730]">
      <section className="relative overflow-hidden bg-[#07111f] text-[#F6F3EB]">
        <img
          src={raphaelImage}
          alt="Raphael Kammer, founder of Agent Kammer"
          className="absolute bottom-0 right-0 hidden h-[88%] w-auto object-contain opacity-90 lg:block"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,31,0.98)_0%,rgba(7,17,31,0.9)_44%,rgba(7,17,31,0.58)_76%,rgba(7,17,31,0.22)_100%)]" />
        <div className="relative mx-auto grid min-h-[640px] max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-[0.9fr_0.55fr] lg:px-10">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#D6B45F]">
              Founder
            </p>
            <h1
              className="text-5xl font-semibold leading-[0.98] md:text-7xl"
              style={{ fontFamily: "Noe Display, var(--font-serif)" }}
            >
              Raphael Kammer
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#F6F3EB]/82">
              Founder of Agent Kammer, a Manhattan-based real estate intelligence platform focused on helping buyers, sellers, and investors make better decisions through market research, technology, media, and data-driven analysis.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/profile">
                <Button className="h-12 rounded-none bg-[#D6B45F] px-7 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[#0F172A] hover:bg-[#e4c56f]">
                  Start Private Profile
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="h-12 rounded-none border-[#F6F3EB]/40 bg-transparent px-7 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[#F6F3EB] hover:bg-[#F6F3EB] hover:text-[#0F172A]">
                  Contact Agent Kammer
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden border border-[#D6B45F]/28 bg-[#0F172A] lg:hidden">
            <img
              src={raphaelImage}
              alt="Raphael Kammer, founder of Agent Kammer"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-[#222730]/12 px-6 py-16 lg:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[0.72fr_1fr]">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#B7832C]">
              Agent Kammer Style
            </p>
            <h2 className="text-4xl font-semibold text-[#0F172A]" style={{ fontFamily: "Noe Display, var(--font-serif)" }}>
              Better intelligence leads to better real estate decisions.
            </h2>
          </div>
          <div className="space-y-6 text-base leading-8 text-[#222730]/76">
            <p>
              Raphael Kammer combines experience in marketing, e-commerce, branding, AI systems, analytics, and business strategy to help clients navigate complex real estate decisions with stronger context and cleaner execution.
            </p>
            <p>
              Agent Kammer is built around research, market intelligence, automation, media, and client advocacy. The focus is practical: understand the market, identify leverage, explain the tradeoffs, and move with discipline.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#0F172A] px-6 py-16 text-[#F6F3EB] lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#D6B45F]">
              Current Edge
            </p>
            <h2 className="text-4xl font-semibold" style={{ fontFamily: "Noe Display, var(--font-serif)" }}>
              A modern real estate operator.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden border border-[#F6F3EB]/14 bg-[#F6F3EB]/14 sm:grid-cols-2 lg:grid-cols-3">
            {edgeItems.map((item) => (
              <div key={item.label} className="bg-[#07111f] p-6">
                <item.icon className="mb-5 h-7 w-7 text-[#D6B45F]" strokeWidth={1.4} />
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#F6F3EB]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[1fr_0.72fr]">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#18366B]">
              Operating Belief
            </p>
            <h2 className="max-w-3xl text-4xl font-semibold text-[#0F172A]" style={{ fontFamily: "Noe Display, var(--font-serif)" }}>
              No inflated production claims. Just a clear intelligence advantage.
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {principles.map((principle) => (
                <div key={principle} className="flex items-start gap-3 border border-[#222730]/12 bg-[#fffdf8] p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#B7832C]" strokeWidth={1.5} />
                  <span className="text-sm leading-6 text-[#222730]/76">{principle}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="border border-[#222730]/12 bg-[#fffdf8] p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#B7832C]">Markets</p>
            <div className="mt-5 space-y-4">
              {markets.map((market) => (
                <div key={market} className="flex items-center gap-3 border-b border-[#222730]/10 pb-4 last:border-b-0 last:pb-0">
                  <MapPin className="h-5 w-5 text-[#18366B]" strokeWidth={1.5} />
                  <span className="text-sm font-semibold text-[#0F172A]">{market}</span>
                </div>
              ))}
            </div>
            <p className="mt-7 text-sm leading-7 text-[#222730]/68">
              Agent Kammer starts with New York City and expands from the same foundation: research, analysis, technology, and client-first execution.
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
}

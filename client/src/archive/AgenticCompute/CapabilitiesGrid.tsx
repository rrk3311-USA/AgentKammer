import { TrendingDown, AlertTriangle, Brain, TrendingUp, Radar, Users } from "lucide-react";

const capabilities = [
  {
    icon: TrendingDown,
    title: "Price Anomaly Detector",
    description: "Flags listings priced 8–15% below local trend using time-series comps + agent remarks."
  },
  {
    icon: AlertTriangle,
    title: "Neighborhood Risk Scanner",
    description: "Surfaces building violations, zoning changes, flood/heat risk, and planned developments."
  },
  {
    icon: Brain,
    title: "Buyer Fit Engine",
    description: "Learns your lifestyle + budget constraints via NLP to rank matches—not spam."
  },
  {
    icon: TrendingUp,
    title: "Micro-Trend Forecaster",
    description: "Tracks interest rates, DOM, walkscore deltas, and migration to predict near-term moves."
  },
  {
    icon: Radar,
    title: "Off-Market Signal Radar",
    description: "Parses permits, expireds, and owner intent signals to spot pre-list opportunities."
  },
  {
    icon: Users,
    title: "Agent Match Optimizer",
    description: "Pairs you with top-performing local agents for your niche and price band."
  }
];

export function CapabilitiesGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-4 mb-8">
      {capabilities.map((capability, idx) => (
        <div
          key={idx}
          className="bg-black/40 border border-[#d4af37]/10 rounded-lg p-5 hover:border-[#d4af37]/30 transition-all"
          data-testid={`capability-${idx}`}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
              <capability.icon className="h-5 w-5 text-[#d4af37]" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm mb-1.5">{capability.title}</h3>
              <p className="text-xs text-white/60 leading-relaxed">{capability.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

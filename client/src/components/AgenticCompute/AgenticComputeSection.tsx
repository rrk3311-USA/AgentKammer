import { Badge } from "@/components/ui/badge";
import { TelemetryStrip } from "./TelemetryStrip";
import { CapabilitiesGrid } from "./CapabilitiesGrid";
import { DataSources } from "./DataSources";
import { TechStack } from "./TechStack";
import { AnimatedBackdrop } from "./AnimatedBackdrop";
import { BrainVisualization } from "./BrainVisualization";
import { Clock, Zap, TrendingUp, Shield } from "lucide-react";

const pills = [
  "Continuous Market Scanning",
  "Autonomous Buyer Profiling",
  "Instant Alert Processing",
  "Under-Market Signal Detection"
];

export function AgenticComputeSection() {
  return (
    <section className="relative bg-[#1a1f2e] py-12 overflow-hidden">
      <AnimatedBackdrop />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-3">
            Massive Compute Engine
          </h2>
          <p className="text-base text-white/70 max-w-3xl mx-auto leading-relaxed">
            Agent Kammer's distributed AI continuously scans every market, cross-verifies public records, and predicts shifts—while you sleep.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {pills.map((pill, idx) => (
            <Badge
              key={idx}
              className="bg-[#d4af37] border border-[#d4af37] text-black px-3 py-1.5 text-xs font-medium"
              data-testid={`pill-${idx}`}
            >
              {pill}
            </Badge>
          ))}
        </div>

        <BrainVisualization />

        <TelemetryStrip />
        
        <CapabilitiesGrid />
        
        <DataSources />
        
        <TechStack />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="flex items-center justify-center gap-2 bg-black/40 border border-[#d4af37]/20 rounded-lg p-4">
            <Clock className="h-6 w-6 text-white flex-shrink-0" />
            <div>
              <p className="text-xl font-serif font-bold text-white">240hrs</p>
              <p className="text-xs text-white/60">Average buyer search time</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 bg-black/40 border border-[#d4af37]/20 rounded-lg p-4">
            <Zap className="h-6 w-6 text-white flex-shrink-0" />
            <div>
              <p className="text-xl font-serif font-bold text-white">240+ hrs saved</p>
              <p className="text-xs text-white/60">With Agent Kammer</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 bg-black/40 border border-[#d4af37]/20 rounded-lg p-4">
            <TrendingUp className="h-6 w-6 text-white flex-shrink-0" />
            <div>
              <p className="text-xl font-serif font-bold text-white">15K+</p>
              <p className="text-xs text-white/60">Properties scanned daily</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 bg-black/40 border border-[#d4af37]/20 rounded-lg p-4">
            <Shield className="h-6 w-6 text-white flex-shrink-0" />
            <div>
              <p className="text-xl font-serif font-bold text-white">100%</p>
              <p className="text-xs text-white/60">Verified listings</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

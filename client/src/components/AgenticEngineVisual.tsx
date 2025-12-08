import brainImage from "@assets/image_1765086283557.png";
import { Zap, Brain, Cpu, Code2, Sparkles } from "lucide-react";
import { SiReplit, SiAnthropic } from "react-icons/si";

export function AgenticEngineVisual() {
  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      data-testid="agentic-engine-visual"
    >
      <div className="relative w-full aspect-[16/9] min-h-[220px]">
        {/* Background image */}
        <img
          src={brainImage}
          alt="Agentic Deal Procurement"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />

        {/* Fade overlays for edges */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent opacity-70" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent opacity-70" />
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-slate-950 via-slate-950/30 to-transparent opacity-60" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-70" />
        </div>

        {/* Bottom footer bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
          {/* Gradient divider */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
          
          {/* Footer content */}
          <div className="bg-slate-950/90 backdrop-blur-sm py-3 px-6">
            <div className="flex flex-col items-center gap-2">
              <span className="text-cyan-300 font-semibold text-sm md:text-base tracking-wide text-center whitespace-nowrap">
                Agentic Deal Procurement
              </span>

              {/* Tech Stack Grid - 4 columns, 2 rows */}
              <div className="text-center">
                <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto">
                  {[
                    { icon: Brain, label: 'AI', color: 'text-cyan-400' },
                    { icon: SiReplit, label: 'Replit', color: 'text-red-400', isSvg: true },
                    { icon: SiAnthropic, label: 'Anthropic', color: 'text-purple-400', isSvg: true },
                    { icon: Code2, label: 'Claude', color: 'text-amber-400' },
                    { icon: Cpu, label: 'NVIDIA', color: 'text-green-400' },
                    { icon: Sparkles, label: 'Grok', color: 'text-yellow-400' },
                    { icon: Zap, label: 'LLM API', color: 'text-blue-400' },
                    { icon: Code2, label: 'API', color: 'text-lime-400' },
                  ].map((tech, idx) => {
                    const IconComponent = tech.icon;
                    return (
                      <div key={idx} className="flex flex-col items-center gap-0.5">
                        <div className={`${tech.color}`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <span className="text-white/70 text-xs font-medium">{tech.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

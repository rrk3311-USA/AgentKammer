import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function AgentModeToggle() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="flex flex-col items-center gap-1 mt-3">
      {/* Lever Label */}
      <div className="text-xs font-bold tracking-widest uppercase text-white/60 select-none">
        Agent Mode
      </div>

      {/* Lever Container */}
      <button
        onClick={() => setIsActive(!isActive)}
        className="relative w-12 h-7 rounded-full bg-gradient-to-b from-[#1a2d42] to-[#0f1a28] border-2 border-[#d4af37]/40 shadow-lg hover-elevate active-elevate-2 transition-all flex items-center justify-center group cursor-pointer"
        data-testid="button-agent-mode-toggle"
      >
        {/* Inner lever track */}
        <div className="absolute inset-0.5 rounded-full bg-gradient-to-b from-black/50 to-black/30" />

        {/* Lever knob */}
        <div
          className={`absolute w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center ${
            isActive
              ? "bg-gradient-to-b from-[#d4af37] to-[#b8860b] shadow-lg shadow-[#d4af37]/50 translate-y-1"
              : "bg-gradient-to-b from-[#4a6fa5] to-[#1e3a52] shadow-md translate-y-0"
          }`}
        >
          {/* Inner glow */}
          <div
            className={`w-3 h-3 rounded-full ${
              isActive
                ? "bg-[#f4d03f] opacity-60"
                : "bg-white/20 opacity-40"
            }`}
          />
        </div>

        {/* Arrow indicators */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <ChevronUp className={`h-3 w-3 transition-opacity ${isActive ? "opacity-100" : "opacity-30"} text-[#d4af37]`} />
          <ChevronDown className={`h-3 w-3 transition-opacity ${!isActive ? "opacity-100" : "opacity-30"} text-[#4a6fa5]`} />
        </div>
      </button>

      {/* Status Indicator */}
      <div className="text-xs font-semibold tracking-wide uppercase text-[#d4af37]/80 select-none">
        {isActive ? "ACTIVE" : "STANDBY"}
      </div>
    </div>
  );
}

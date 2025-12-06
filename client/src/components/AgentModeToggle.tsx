import { useState } from "react";
import { ChevronRight } from "lucide-react";

export function AgentModeToggle() {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      onClick={() => setIsActive(!isActive)}
      className="relative w-full h-16 px-6 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#0a1628] font-semibold text-lg hover:opacity-90 transition-all overflow-hidden group"
      data-testid="button-start-profile-with-lever"
    >
      {/* Lever Section - Left */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
        {/* Lever Container */}
        <div className="relative w-10 h-6 rounded-full bg-gradient-to-b from-[#1a2d42] to-[#0f1a28] border-2 border-[#0a1628]/30 shadow-md flex items-center justify-center cursor-pointer">
          {/* Lever knob */}
          <div
            className={`absolute w-4 h-4 rounded-full transition-all duration-500 flex items-center justify-center ${
              isActive
                ? "bg-gradient-to-b from-[#22c55e] to-[#16a34a] shadow-lg shadow-green-500/50 translate-x-2"
                : "bg-gradient-to-b from-[#4a6fa5] to-[#1e3a52] shadow-md -translate-x-2"
            }`}
          >
            {/* Inner glow */}
            <div
              className={`w-2 h-2 rounded-full ${
                isActive
                  ? "bg-green-300 opacity-80"
                  : "bg-white/30 opacity-50"
              }`}
            />
          </div>
        </div>

        {/* Status text */}
        <div className="text-xs font-bold tracking-widest uppercase text-[#0a1628]/70">
          {isActive ? "ON" : "OFF"}
        </div>
      </div>

      {/* Center Content */}
      <div className="flex items-center justify-center gap-2 pl-20">
        <span>Start Your Agentic Profile</span>
        <ChevronRight className="h-5 w-5" />
      </div>

      {/* Sign Up Message - appears when active */}
      {isActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-green-600 to-emerald-600 animate-in fade-in duration-300">
          <span className="font-semibold text-white">Sign up to activate</span>
        </div>
      )}
    </button>
  );
}

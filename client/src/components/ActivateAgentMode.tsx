import { useState } from "react";
import { Power } from "lucide-react";

export function ActivateAgentMode() {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      onClick={() => setIsActive(!isActive)}
      className={`relative w-full h-16 rounded-lg font-semibold text-lg transition-all overflow-hidden group flex items-center justify-center gap-4 px-6 ${
        isActive
          ? "bg-gradient-to-r from-green-600 to-emerald-500 text-white"
          : "bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#0a1628]"
      }`}
      data-testid="button-activate-agent-mode"
    >
      {/* B-21 Raider Mascot Face */}
      <svg
        className="w-6 h-6 transition-transform"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        {/* Nose cone (triangular) */}
        <path d="M12 2 L18 10 L6 10 Z" opacity="0.9" />
        {/* Main body */}
        <path d="M6 10 L8 18 L16 18 L18 10 Z" opacity="0.7" />
        {/* Left cockpit light */}
        <circle cx="9" cy="12" r="1.5" opacity="0.6" />
        {/* Right cockpit light */}
        <circle cx="15" cy="12" r="1.5" opacity="0.6" />
        {/* Center optical sensor */}
        <circle cx="12" cy="11" r="1.2" opacity="0.8" />
      </svg>

      {/* Text */}
      <div className="flex flex-col items-start">
        <div className="text-xs font-bold tracking-widest uppercase opacity-75">
          Agent Mode
        </div>
        <div className="text-base font-semibold">
          {isActive ? "ONLINE" : "ACTIVATE"}
        </div>
      </div>

      {/* Power indicator */}
      <Power className={`w-5 h-5 ml-auto transition-all ${isActive ? "animate-pulse" : ""}`} />

      {/* Activation overlay message */}
      {isActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-green-700 to-emerald-600 animate-in fade-in duration-300">
          <span className="font-bold text-white text-center">Sign up to launch</span>
        </div>
      )}
    </button>
  );
}

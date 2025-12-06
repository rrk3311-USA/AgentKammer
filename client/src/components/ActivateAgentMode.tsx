import { useState } from "react";

export function ActivateAgentMode() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button
      onClick={() => setIsOn(!isOn)}
      className="w-full rounded-lg bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#0a1628] font-bold hover:opacity-90 transition-opacity overflow-hidden"
      data-testid="button-activate-agent-mode"
    >
      {/* Main button text */}
      <div className="px-6 py-3">
        <div className="text-sm tracking-widest uppercase">Activate Agent Mode</div>
      </div>

      {/* Toggle Section */}
      <div className="px-6 pb-3 pt-2 border-t border-[#0a1628]/20">
        <div className="flex items-center justify-between gap-3">
          {/* Left label */}
          <span className="text-xs font-semibold uppercase opacity-80">Off</span>

          {/* Toggle switch */}
          <div
            className="flex-1 h-6 bg-[#0a1628]/30 rounded-full p-0.5 cursor-pointer flex items-center transition-all"
            onClick={(e) => {
              e.stopPropagation();
              setIsOn(!isOn);
            }}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 ${
                isOn ? "translate-x-full" : ""
              }`}
            />
          </div>

          {/* Right label */}
          <span className={`text-xs font-semibold uppercase transition-colors ${
            isOn ? "text-green-700" : "opacity-80"
          }`}>
            {isOn ? "On" : "Off"}
          </span>
        </div>
      </div>
    </button>
  );
}

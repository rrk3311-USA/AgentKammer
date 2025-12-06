import { useState } from "react";
import { useLocation } from "wouter";

export function ActivateAgentMode() {
  const [isOn, setIsOn] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [showSparkles, setShowSparkles] = useState(false);
  const [, setLocation] = useLocation();

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setDragX(x);

    // If dragged more than 80% across, trigger activation
    if (x > rect.width * 0.8) {
      setShowSparkles(true);
      setIsDragging(false);
      setTimeout(() => {
        setLocation("/profile");
      }, 600);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragX(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="w-full"
    >
      <button
        className="w-full rounded-lg bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#0a1628] font-bold hover:opacity-90 transition-all overflow-hidden"
        data-testid="button-activate-agent-mode"
      >
        {/* Main button text */}
        <div className="px-6 py-3">
          <div className="text-sm tracking-widest uppercase">Activate Agent Mode</div>
        </div>

        {/* Toggle Section */}
        <div className="px-6 pb-3 pt-2 border-t border-[#0a1628]/20 relative">
          <div className="flex items-center justify-between gap-3">
            {/* Left label */}
            <span className="text-xs font-semibold uppercase opacity-80">Off</span>

            {/* Toggle switch - draggable */}
            <div
              className="flex-1 h-6 bg-[#0a1628]/30 rounded-full p-0.5 cursor-grab active:cursor-grabbing flex items-center transition-all relative"
              onMouseDown={handleMouseDown}
            >
              {/* Sparkle overlay */}
              {showSparkles && (
                <>
                  <div className="absolute top-1 left-1 w-1 h-1 bg-[#d4af37] rounded-full animate-pulse" />
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#f4d03f] rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
                  <div className="absolute bottom-1 left-2 w-1 h-1 bg-[#d4af37] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-[#f4d03f] rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                </>
              )}

              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transition-all duration-100 ${
                  isDragging ? `translate-x-[${dragX}px]` : ""
                } ${showSparkles ? "scale-110 bg-green-400" : ""}`}
                style={{
                  transform: isDragging
                    ? `translateX(${Math.max(0, Math.min(dragX - 12, 20))}px)`
                    : showSparkles
                    ? "scale(1.1)"
                    : "translateX(0)",
                }}
              />
            </div>

            {/* Right label */}
            <span className={`text-xs font-semibold uppercase transition-colors ${
              showSparkles ? "text-green-600 font-bold" : "opacity-80"
            }`}>
              {showSparkles ? "GO" : "Off"}
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}

import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { ChevronRight } from "lucide-react";

export function ActivateAgentMode() {
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [showSparkles, setShowSparkles] = useState(false);
  const [, setLocation] = useLocation();
  const trackRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    startXRef.current = clientX;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || !trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const currentX = clientX - rect.left;
    const delta = currentX - startXRef.current;

    // Calculate new position (keep within bounds)
    const maxDrag = rect.width - 24;
    const newX = Math.max(0, Math.min(delta, maxDrag));
    setDragX(newX);

    // If dragged more than 85% across, trigger activation
    if (newX > maxDrag * 0.85) {
      setShowSparkles(true);
      setIsDragging(false);
      setTimeout(() => {
        setLocation("/profile");
      }, 600);
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
    if (!showSparkles) {
      setDragX(0);
    }
  };

  return (
    <div
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
      className="w-full"
    >
      <div className="w-full rounded-lg bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#0a1628] font-bold overflow-hidden">
        {/* Main button text */}
        <div className="px-6 py-3">
          <div className="text-sm tracking-widest uppercase">Activate Agent Mode</div>
        </div>

        {/* Slider Section */}
        <div className="px-6 pb-3 pt-2 border-t border-[#0a1628]/20 relative">
          <div className="flex items-center justify-between gap-2">
            {/* Left arrow */}
            <div className="flex items-center gap-1">
              <ChevronRight className="w-4 h-4 opacity-60" />
              <span className="text-xs font-bold uppercase opacity-70">Drag</span>
            </div>

            {/* Slider track */}
            <div
              ref={trackRef}
              className="flex-1 h-6 bg-[#0a1628]/30 rounded-full p-1 cursor-grab active:cursor-grabbing flex items-center transition-all relative select-none"
              onMouseDown={(e) => handleStart(e.clientX)}
              onTouchStart={(e) => handleStart(e.touches[0].clientX)}
            >
              {/* Sparkle overlay */}
              {showSparkles && (
                <>
                  <div className="absolute top-1 left-1 w-1 h-1 bg-[#d4af37] rounded-full animate-pulse" />
                  <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#f4d03f] rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
                  <div className="absolute bottom-1 left-1.5 w-1 h-1 bg-[#d4af37] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-[#f4d03f] rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                </>
              )}

              {/* Slider knob */}
              <div
                className={`w-4 h-4 rounded-full transition-all duration-100 flex items-center justify-center ${
                  showSparkles ? "scale-110 bg-green-400 shadow-lg" : "bg-white shadow-md"
                }`}
                style={{
                  transform: `translateX(${dragX}px)`,
                }}
              >
                {isDragging && !showSparkles && (
                  <ChevronRight className="w-3 h-3 text-[#0a1628]" />
                )}
              </div>
            </div>

            {/* Right arrow and label */}
            <div className="flex items-center gap-1">
              <span className={`text-xs font-bold uppercase transition-colors ${
                showSparkles ? "text-green-700 font-bold" : "opacity-70"
              }`}>
                {showSparkles ? "GO!" : "On"}
              </span>
              <ChevronRight className="w-4 h-4 opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

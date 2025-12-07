import { useEffect, useState } from "react";
import robotImage from "@assets/image_1765082751115.png";

export function AgenticEngineVisual() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pulseIntensity, setPulseIntensity] = useState(0);

  const categories = [
    { label: "Credit Cards", shortLabel: "Credit" },
    { label: "Real Estate", shortLabel: "Real Estate" },
    { label: "Refinancing", shortLabel: "Refinancing" },
    { label: "Investing", shortLabel: "Investing" },
    { label: "Insurance", shortLabel: "Insurance" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length);
      setPulseIntensity(1);
      setTimeout(() => setPulseIntensity(0), 500);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="relative w-full rounded-2xl overflow-hidden" 
      data-testid="agentic-engine-visual"
    >
      <div className="relative w-full aspect-[16/9] min-h-[220px] bg-gradient-to-b from-slate-950 via-[#0a1628] to-slate-900">
        {/* Neural network grid background */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="neuralGrid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r="0.5" fill="#d4af37" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#neuralGrid)" />
          </svg>
        </div>

        {/* Radial glow behind robot */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full transition-all duration-500"
          style={{
            background: `radial-gradient(circle, rgba(212,175,55,${0.15 + pulseIntensity * 0.15}) 0%, rgba(59,130,246,${0.1 + pulseIntensity * 0.1}) 40%, transparent 70%)`,
          }}
        />

        {/* Robot Agent - Center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%] z-10">
          <div className="relative">
            {/* Brain circuit overlay effect */}
            <div 
              className="absolute -inset-4 md:-inset-6 rounded-full opacity-60"
              style={{
                background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 60%)',
                animation: 'brainPulse 3s ease-in-out infinite',
              }}
            />
            
            {/* Robot image */}
            <img 
              src={robotImage} 
              alt="Agent Kammer AI" 
              className="w-[140px] h-[140px] md:w-[180px] md:h-[180px] object-cover rounded-full"
              style={{
                boxShadow: `0 0 ${20 + pulseIntensity * 30}px rgba(59,130,246,${0.4 + pulseIntensity * 0.3}), 0 0 ${40 + pulseIntensity * 20}px rgba(212,175,55,0.2)`,
                border: '2px solid rgba(212,175,55,0.3)',
              }}
              loading="eager"
            />

            {/* Thinking indicator */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {[0, 1, 2].map((i) => (
                <div 
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"
                  style={{
                    animation: `thinkDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Orbiting category nodes - Desktop */}
        <div className="hidden md:block absolute inset-0">
          <svg 
            className="absolute inset-0 w-full h-full"
            style={{ pointerEvents: 'none' }}
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            
            {/* Connection lines from robot to categories */}
            {categories.map((_, i) => {
              const angle = (i * 72 - 90) * (Math.PI / 180);
              const radiusX = 42;
              const radiusY = 38;
              const endX = 50 + radiusX * Math.cos(angle);
              const endY = 50 + radiusY * Math.sin(angle);
              const isActive = activeIndex === i;
              
              return (
                <line
                  key={i}
                  x1="50%"
                  y1="50%"
                  x2={`${endX}%`}
                  y2={`${endY}%`}
                  stroke={isActive ? "#d4af37" : "#d4af37"}
                  strokeWidth={isActive ? "2" : "1"}
                  opacity={isActive ? 0.8 : 0.2}
                  filter={isActive ? "url(#glow)" : ""}
                  className="transition-all duration-500"
                />
              );
            })}
          </svg>

          {/* Category labels positioned around robot */}
          {categories.map((cat, i) => {
            const angle = (i * 72 - 90) * (Math.PI / 180);
            const radiusX = 44;
            const radiusY = 40;
            const x = 50 + radiusX * Math.cos(angle);
            const y = 50 + radiusY * Math.sin(angle);
            const isActive = activeIndex === i;
            
            return (
              <div
                key={i}
                className={`absolute transition-all duration-500 ${
                  isActive ? 'scale-110 z-20' : 'scale-100 z-10'
                }`}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div 
                  className={`px-3 py-1.5 rounded-full backdrop-blur-sm transition-all duration-500 whitespace-nowrap ${
                    isActive 
                      ? 'bg-[#d4af37]/20 border border-[#d4af37]/60' 
                      : 'bg-slate-800/50 border border-white/10'
                  }`}
                >
                  <span 
                    className={`text-sm font-semibold transition-all duration-500 ${
                      isActive 
                        ? 'text-[#d4af37] drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]' 
                        : 'text-white/60'
                    }`}
                  >
                    {cat.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile category display */}
        <div className="md:hidden absolute bottom-16 left-0 right-0 flex justify-center">
          <div className="flex gap-1 px-4 overflow-x-auto scrollbar-hide">
            {categories.map((cat, i) => {
              const isActive = activeIndex === i;
              return (
                <div
                  key={i}
                  className={`px-2 py-1 rounded-full transition-all duration-300 whitespace-nowrap ${
                    isActive 
                      ? 'bg-[#d4af37]/20 border border-[#d4af37]/50' 
                      : 'bg-slate-800/30 border border-white/5'
                  }`}
                >
                  <span 
                    className={`text-xs font-medium ${
                      isActive ? 'text-[#d4af37]' : 'text-white/40'
                    }`}
                  >
                    {cat.shortLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Animation styles */}
        <style>{`
          @keyframes brainPulse {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.1); opacity: 0.8; }
          }
          
          @keyframes thinkDot {
            0%, 100% { opacity: 0.3; transform: translateY(0); }
            50% { opacity: 1; transform: translateY(-3px); }
          }
        `}</style>

        {/* Bottom caption bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/95 to-[#0a1628] py-2.5 md:py-3 px-4 md:px-6">
          <div className="flex items-center justify-center gap-2 md:gap-3">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse shrink-0 bg-[#0b9c26]" />
            <span className="text-[#d4af37] font-semibold text-xs md:text-base tracking-wide text-center">
              <span className="hidden sm:inline">Agent Kammer - Multi-Category Financial Intelligence</span>
              <span className="sm:hidden">Your AI Financial Agent</span>
            </span>
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse shrink-0 bg-[#0b9c26]" />
          </div>
        </div>
      </div>
    </div>
  );
}

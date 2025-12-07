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
        {/* Animated orbital rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="absolute w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full border border-[#d4af37]/10"
            style={{ animation: 'orbitRing1 20s linear infinite' }}
          />
          <div 
            className="absolute w-[340px] h-[340px] md:w-[460px] md:h-[460px] rounded-full border border-[#d4af37]/5"
            style={{ animation: 'orbitRing2 30s linear infinite reverse' }}
          />
          <div 
            className="absolute w-[400px] h-[400px] md:w-[540px] md:h-[540px] rounded-full border border-blue-500/5"
            style={{ animation: 'orbitRing1 40s linear infinite' }}
          />
        </div>

        {/* Floating particles/dots on orbits */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#d4af37]/40"
              style={{
                animation: `orbitParticle${i % 3} ${15 + i * 3}s linear infinite`,
                animationDelay: `${i * -2}s`,
              }}
            />
          ))}
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
            <div 
              className="absolute -inset-4 md:-inset-6 rounded-full opacity-60"
              style={{
                background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 60%)',
                animation: 'brainPulse 3s ease-in-out infinite',
              }}
            />
            
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

        {/* Floating category bubbles - Desktop */}
        <div className="hidden md:block absolute inset-0 overflow-hidden">
          {categories.map((cat, i) => {
            const isActive = activeIndex === i;
            
            return (
              <div
                key={i}
                className={`absolute transition-all duration-700 ${
                  isActive ? 'z-20' : 'z-10'
                }`}
                style={{
                  animation: `floatBubble${i} ${18 + i * 2}s ease-in-out infinite`,
                  animationDelay: `${i * -3}s`,
                }}
              >
                <div 
                  className={`px-4 py-2 rounded-full backdrop-blur-sm transition-all duration-500 whitespace-nowrap ${
                    isActive 
                      ? 'bg-[#d4af37]/25 border-2 border-[#d4af37]/70 scale-110' 
                      : 'bg-slate-800/40 border border-white/10 scale-100'
                  }`}
                  style={{
                    boxShadow: isActive ? '0 0 20px rgba(212,175,55,0.3)' : 'none',
                  }}
                >
                  <span 
                    className={`text-sm font-semibold transition-all duration-500 ${
                      isActive 
                        ? 'text-[#d4af37] drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]' 
                        : 'text-white/50'
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

          @keyframes orbitRing1 {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes orbitRing2 {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.02); }
            100% { transform: rotate(360deg) scale(1); }
          }

          @keyframes orbitParticle0 {
            0% { transform: rotate(0deg) translateX(140px) rotate(0deg); opacity: 0.6; }
            50% { opacity: 0.3; }
            100% { transform: rotate(360deg) translateX(140px) rotate(-360deg); opacity: 0.6; }
          }

          @keyframes orbitParticle1 {
            0% { transform: rotate(0deg) translateX(190px) rotate(0deg); opacity: 0.4; }
            50% { opacity: 0.7; }
            100% { transform: rotate(-360deg) translateX(190px) rotate(360deg); opacity: 0.4; }
          }

          @keyframes orbitParticle2 {
            0% { transform: rotate(0deg) translateX(230px) rotate(0deg); opacity: 0.5; }
            50% { opacity: 0.2; }
            100% { transform: rotate(360deg) translateX(230px) rotate(-360deg); opacity: 0.5; }
          }

          @keyframes floatBubble0 {
            0%, 100% { left: 8%; top: 18%; }
            25% { left: 12%; top: 25%; }
            50% { left: 6%; top: 30%; }
            75% { left: 10%; top: 22%; }
          }

          @keyframes floatBubble1 {
            0%, 100% { right: 10%; top: 15%; left: auto; }
            25% { right: 8%; top: 22%; }
            50% { right: 14%; top: 18%; }
            75% { right: 6%; top: 25%; }
          }

          @keyframes floatBubble2 {
            0%, 100% { right: 6%; top: 55%; left: auto; }
            25% { right: 10%; top: 50%; }
            50% { right: 8%; top: 60%; }
            75% { right: 12%; top: 52%; }
          }

          @keyframes floatBubble3 {
            0%, 100% { left: 5%; top: 60%; }
            25% { left: 10%; top: 55%; }
            50% { left: 8%; top: 65%; }
            75% { left: 6%; top: 58%; }
          }

          @keyframes floatBubble4 {
            0%, 100% { left: 50%; top: 75%; transform: translateX(-50%); }
            25% { left: 48%; top: 72%; }
            50% { left: 52%; top: 78%; }
            75% { left: 50%; top: 74%; }
          }
        `}</style>

        {/* Bottom caption bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/95 to-[#0a1628] py-2.5 md:py-3 px-4 md:px-6">
          <div className="flex items-center justify-center gap-2 md:gap-3">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse shrink-0 bg-[#0b9c26]" />
            <span className="text-[#d4af37] font-semibold text-xs md:text-base tracking-wide text-center">
              <span className="hidden sm:inline">Agentic Deal Procurement</span>
              <span className="sm:hidden">Agentic Deal Procurement</span>
            </span>
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse shrink-0 bg-[#0b9c26]" />
          </div>
        </div>
      </div>
    </div>
  );
}

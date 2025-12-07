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
      setTimeout(() => setPulseIntensity(0), 600);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="relative w-full rounded-2xl overflow-hidden" 
      data-testid="agentic-engine-visual"
    >
      <div className="relative w-full aspect-[16/9] min-h-[220px] bg-gradient-to-b from-slate-950 via-[#0a1628] to-slate-900">
        
        {/* Orbital system container - behind robot */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Orbiting category circles with labels */}
          {categories.map((cat, i) => {
            const isActive = activeIndex === i;
            const orbitRadius = 130 + i * 25;
            const duration = 20 + i * 5;
            const direction = i % 2 === 0 ? 'normal' : 'reverse';
            
            return (
              <div
                key={i}
                className="absolute"
                style={{
                  width: `${orbitRadius * 2}px`,
                  height: `${orbitRadius * 2}px`,
                  animation: `orbit ${duration}s linear infinite ${direction}`,
                  animationDelay: `${i * -4}s`,
                }}
              >
                {/* The orbiting circle with label */}
                <div 
                  className="absolute"
                  style={{
                    top: '0',
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                >
                  {/* Circle */}
                  <div 
                    className={`relative flex items-center justify-center transition-all duration-500`}
                    style={{
                      animation: `counterOrbit ${duration}s linear infinite ${direction === 'normal' ? 'reverse' : 'normal'}`,
                      animationDelay: `${i * -4}s`,
                    }}
                  >
                    {/* Glowing circle behind text */}
                    <div 
                      className={`absolute rounded-full transition-all duration-500 ${
                        isActive ? 'scale-125' : 'scale-100'
                      }`}
                      style={{
                        width: '90px',
                        height: '90px',
                        background: isActive 
                          ? 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, rgba(212,175,55,0.1) 50%, transparent 70%)'
                          : 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.05) 50%, transparent 70%)',
                        boxShadow: isActive 
                          ? `0 0 ${20 + pulseIntensity * 15}px rgba(212,175,55,${0.4 + pulseIntensity * 0.3})`
                          : 'none',
                        animation: isActive ? 'pulseGlow 1s ease-in-out infinite' : 'none',
                      }}
                    />
                    
                    {/* Category label */}
                    <span 
                      className={`relative z-10 text-xs md:text-sm font-semibold whitespace-nowrap px-2 py-1 rounded-full transition-all duration-500 ${
                        isActive 
                          ? 'text-[#d4af37] bg-[#d4af37]/10 scale-110' 
                          : 'text-white/50 bg-transparent'
                      }`}
                      style={{
                        textShadow: isActive ? '0 0 10px rgba(212,175,55,0.8)' : 'none',
                      }}
                    >
                      <span className="hidden md:inline">{cat.label}</span>
                      <span className="md:hidden">{cat.shortLabel}</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Static orbital ring traces */}
          <div className="absolute w-[260px] h-[260px] md:w-[310px] md:h-[310px] rounded-full border border-[#d4af37]/10" />
          <div className="absolute w-[310px] h-[310px] md:w-[385px] md:h-[385px] rounded-full border border-[#d4af37]/8" />
          <div className="absolute w-[360px] h-[360px] md:w-[460px] md:h-[460px] rounded-full border border-[#d4af37]/5" />
          <div className="absolute w-[410px] h-[410px] md:w-[535px] md:h-[535px] rounded-full border border-blue-500/5" />
          <div className="absolute w-[460px] h-[460px] md:w-[610px] md:h-[610px] rounded-full border border-blue-500/3" />
        </div>

        {/* Radial glow behind robot */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[320px] md:h-[320px] rounded-full transition-all duration-500 z-10"
          style={{
            background: `radial-gradient(circle, rgba(10,22,40,0.95) 0%, rgba(10,22,40,0.8) 40%, transparent 70%)`,
          }}
        />

        {/* Robot Agent - Center (in front) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%] z-20">
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

        {/* Animation styles */}
        <style>{`
          @keyframes orbit {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes counterOrbit {
            0% { transform: translateX(-50%) rotate(0deg); }
            100% { transform: translateX(-50%) rotate(-360deg); }
          }

          @keyframes brainPulse {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.1); opacity: 0.8; }
          }
          
          @keyframes thinkDot {
            0%, 100% { opacity: 0.3; transform: translateY(0); }
            50% { opacity: 1; transform: translateY(-3px); }
          }

          @keyframes pulseGlow {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.15); opacity: 1; }
          }
        `}</style>

        {/* Bottom caption bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/95 to-[#0a1628] py-2.5 md:py-3 px-4 md:px-6 z-30">
          <div className="flex items-center justify-center gap-2 md:gap-3">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse shrink-0 bg-[#0b9c26]" />
            <span className="text-[#d4af37] font-semibold text-xs md:text-base tracking-wide text-center">
              Agentic Deal Procurement
            </span>
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse shrink-0 bg-[#0b9c26]" />
          </div>
        </div>
      </div>
    </div>
  );
}

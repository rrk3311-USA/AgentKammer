import { useEffect, useState } from "react";
import { TrendingUp, Home, RefreshCw, Users, ShoppingCart } from "lucide-react";

export function AgenticEngineVisual() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pulseIntensity, setPulseIntensity] = useState(0);

  const categories = [
    { label: "Credit Cards", icon: ShoppingCart, position: { top: "12%", right: "8%" } },
    { label: "Investing", icon: TrendingUp, position: { top: "50%", right: "4%" } },
    { label: "Real Estate", icon: Home, position: { bottom: "12%", right: "12%" } },
    { label: "Refinancing", icon: RefreshCw, position: { top: "65%", right: "22%" } },
    { label: "Buyer Origination", icon: Users, position: { bottom: "20%", right: "28%" } },
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
      <div className="relative w-full aspect-[16/9] min-h-[220px] bg-gradient-to-b from-slate-950 via-[#0a1628] to-slate-900 flex items-center">
        
        {/* SVG Background with brain and connections */}
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 1000 600" 
          preserveAspectRatio="xMidYMid slice"
          style={{ pointerEvents: 'none' }}
        >
          <defs>
            {/* Glowing brain gradient */}
            <radialGradient id="brainGlow" cx="40%" cy="40%">
              <stop offset="0%" stopColor="#00ffff" />
              <stop offset="60%" stopColor="#0099ff" />
              <stop offset="100%" stopColor="#003366" />
            </radialGradient>

            {/* Circuit line gradients */}
            <linearGradient id="circuitGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00ffff" />
              <stop offset="50%" stopColor="#0099ff" />
              <stop offset="100%" stopColor="#d4af37" />
            </linearGradient>

            <linearGradient id="circuitGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00ffff" />
              <stop offset="50%" stopColor="#0088cc" />
              <stop offset="100%" stopColor="#d4af37" />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="brightGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Brain - Left Side */}
          <g filter="url(#brightGlow)">
            <circle cx="250" cy="300" r="120" fill="url(#brainGlow)" opacity="0.7" />
            
            {/* Brain details - neural texture */}
            <circle cx="220" cy="270" r="35" fill="none" stroke="#00ffff" strokeWidth="2" opacity="0.6" />
            <circle cx="280" cy="280" r="40" fill="none" stroke="#0099ff" strokeWidth="2" opacity="0.5" />
            <circle cx="250" cy="320" r="38" fill="none" stroke="#00ffff" strokeWidth="1.5" opacity="0.4" />
            
            {/* Neural branches */}
            <path d="M 200 250 Q 210 240 220 250" stroke="#00ffff" strokeWidth="2" fill="none" opacity="0.7" />
            <path d="M 300 270 Q 310 260 320 270" stroke="#0099ff" strokeWidth="2" fill="none" opacity="0.6" />
            <path d="M 210 330 Q 220 340 230 335" stroke="#00ffff" strokeWidth="1.5" fill="none" opacity="0.5" />
            <path d="M 280 340 Q 290 350 300 345" stroke="#0099ff" strokeWidth="1.5" fill="none" opacity="0.5" />

            {/* Center glow pulse */}
            <circle cx="250" cy="300" r="25" fill="#00ffff" opacity={0.4 + pulseIntensity * 0.4} />
          </g>

          {/* Circuit lines connecting to categories */}
          <g opacity="0.8">
            {/* Line to Credit Cards (top right) */}
            <path
              d="M 360 250 L 420 200 Q 520 150 620 120"
              stroke="url(#circuitGradient1)"
              strokeWidth="2"
              fill="none"
              filter="url(#glow)"
            />
            {/* Connection dots */}
            <circle cx="420" cy="200" r="3" fill="#00ffff" opacity="0.6" />
            <circle cx="520" cy="160" r="2" fill="#0099ff" opacity="0.4" />

            {/* Line to Investing (middle right) */}
            <path
              d="M 365 300 L 480 300 Q 580 300 680 300"
              stroke="url(#circuitGradient1)"
              strokeWidth="2"
              fill="none"
              filter="url(#glow)"
            />
            <circle cx="480" cy="300" r="3" fill="#00ffff" opacity="0.6" />
            <circle cx="580" cy="300" r="2" fill="#0099ff" opacity="0.4" />

            {/* Line to Real Estate (bottom right) */}
            <path
              d="M 360 350 L 420 400 Q 520 450 620 480"
              stroke="url(#circuitGradient2)"
              strokeWidth="2"
              fill="none"
              filter="url(#glow)"
            />
            <circle cx="420" cy="400" r="3" fill="#00ffff" opacity="0.6" />
            <circle cx="520" cy="440" r="2" fill="#0099ff" opacity="0.4" />

            {/* Line to Refinancing (lower right) */}
            <path
              d="M 350 330 L 420 380 Q 500 420 580 450"
              stroke="url(#circuitGradient2)"
              strokeWidth="1.5"
              fill="none"
              filter="url(#glow)"
            />
            <circle cx="480" cy="410" r="2" fill="#0099ff" opacity="0.5" />

            {/* Line to Buyer Origination (far right) */}
            <path
              d="M 340 320 L 400 360 Q 480 400 560 440"
              stroke="url(#circuitGradient2)"
              strokeWidth="1.5"
              fill="none"
              filter="url(#glow)"
            />
            <circle cx="450" cy="390" r="2" fill="#0099ff" opacity="0.4" />
          </g>
        </svg>

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center justify-between px-6 md:px-12 z-10">
          {/* Left side - Brain label */}
          <div className="flex flex-col items-start gap-2 md:gap-4">
            <div className="text-xs md:text-sm font-mono text-cyan-400/60 space-y-1">
              <div>fetchRates()</div>
              <div>compare()</div>
              <div className="hidden md:block">analyze()</div>
              <div>propsScan()</div>
            </div>
          </div>

          {/* Right side - Category icons and labels */}
          <div className="absolute inset-0 pointer-events-none">
            {categories.map((cat, i) => {
              const isActive = activeIndex === i;
              const Icon = cat.icon;
              
              return (
                <div
                  key={i}
                  className="absolute transition-all duration-500"
                  style={{
                    ...cat.position,
                    transform: isActive ? 'scale(1.15)' : 'scale(1)',
                  }}
                >
                  {/* Icon circle background */}
                  <div 
                    className={`flex flex-col items-center gap-2 transition-all duration-500`}
                    style={{
                      opacity: isActive ? 1 : 0.6,
                    }}
                  >
                    <div
                      className={`rounded-full p-3 md:p-4 transition-all duration-500 ${
                        isActive
                          ? 'bg-cyan-400/30 border-2 border-cyan-400'
                          : 'bg-slate-800/30 border border-cyan-400/30'
                      }`}
                      style={{
                        boxShadow: isActive ? '0 0 20px rgba(0,255,255,0.4)' : 'none',
                      }}
                    >
                      <Icon 
                        className={`w-5 h-5 md:w-6 md:h-6 transition-all duration-500 ${
                          isActive ? 'text-cyan-300' : 'text-cyan-400/50'
                        }`}
                      />
                    </div>
                    
                    {/* Label */}
                    <span 
                      className={`text-xs md:text-sm font-semibold whitespace-nowrap transition-all duration-500 ${
                        isActive 
                          ? 'text-cyan-300' 
                          : 'text-white/40'
                      }`}
                      style={{
                        textShadow: isActive ? '0 0 10px rgba(0,255,255,0.6)' : 'none',
                      }}
                    >
                      <span className="hidden md:inline">{cat.label}</span>
                      <span className="md:hidden">{cat.label.split(' ')[0]}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom caption bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/95 to-[#0a1628] py-2.5 md:py-3 px-4 md:px-6 z-20">
          <div className="flex items-center justify-center gap-2 md:gap-3">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse shrink-0 bg-cyan-400" />
            <span className="text-cyan-400 font-semibold text-xs md:text-base tracking-wide text-center">
              <span className="hidden sm:inline">Agentic Deal Procurement Engine</span>
              <span className="sm:hidden">Agentic AI Engine</span>
            </span>
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse shrink-0 bg-cyan-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";

export function AgenticEngineVisual() {
  const [activeCircuits, setActiveCircuits] = useState<number[]>([]);

  const circuits = [
    { id: 1, category: "Credit Cards" },
    { id: 2, category: "Real Estate" },
    { id: 3, category: "Refinancing" },
    { id: 4, category: "Investing" },
    { id: 5, category: "Insurance" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const numActive = Math.floor(Math.random() * 3) + 1;
      const newActive: number[] = [];
      
      for (let i = 0; i < numActive; i++) {
        const randomId = Math.floor(Math.random() * circuits.length) + 1;
        if (!newActive.includes(randomId)) {
          newActive.push(randomId);
        }
      }
      
      setActiveCircuits(newActive);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="relative w-full rounded-2xl overflow-hidden" 
      data-testid="agentic-engine-visual"
    >
      <div className="relative w-full aspect-[16/9] min-h-[220px] bg-gradient-to-b from-slate-900 via-[#0a1628] to-slate-900">
        {/* Futuristic grid background */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#00ffff" strokeWidth="0.5" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        {/* Brain-like visualization in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            width="300" 
            height="300" 
            viewBox="0 0 300 300" 
            className="relative z-5"
            style={{ filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.3))' }}
          >
            <defs>
              <radialGradient id="brainGlow">
                <stop offset="0%" stopColor="#00ffff" />
                <stop offset="100%" stopColor="#0099ff" />
              </radialGradient>
              <filter id="circuitGlow">
                <feGaussianBlur stdDeviation="2" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Central glowing brain */}
            <circle cx="150" cy="150" r="60" fill="url(#brainGlow)" opacity="0.3" />
            <circle cx="150" cy="150" r="50" fill="none" stroke="#00ffff" strokeWidth="2" opacity="0.6" />
            
            {/* Circuit paths */}
            {circuits.map((circuit, idx) => {
              const angle = (idx * 72) * (Math.PI / 180);
              const isActive = activeCircuits.includes(circuit.id);
              const x = 150 + 90 * Math.cos(angle);
              const y = 150 + 90 * Math.sin(angle);
              
              return (
                <g key={circuit.id}>
                  {/* Line */}
                  <line
                    x1="150"
                    y1="150"
                    x2={x}
                    y2={y}
                    stroke={isActive ? "#00ffff" : "#0099ff"}
                    strokeWidth={isActive ? 3 : 1}
                    opacity={isActive ? 0.9 : 0.2}
                    filter={isActive ? "url(#circuitGlow)" : ""}
                    style={{
                      transition: 'all 0.5s ease',
                      animation: isActive ? `glow 1.5s ease-in-out infinite` : 'none',
                    }}
                  />
                  {/* Node */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isActive ? 6 : 3}
                    fill={isActive ? "#00ffff" : "#0099ff"}
                    opacity={isActive ? 1 : 0.4}
                    style={{
                      transition: 'all 0.4s ease',
                    }}
                    filter={isActive ? "url(#circuitGlow)" : ""}
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Fade overlays */}
        <div className="absolute inset-0">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent opacity-70" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent opacity-70" />
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-slate-950 to-transparent opacity-60" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 to-transparent opacity-70" />
        </div>

        {/* Bottom caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950 py-3 px-6 z-20">
          <div className="flex items-center justify-center gap-3">
            <div className="w-2 h-2 rounded-full animate-pulse bg-cyan-400" />
            <span className="text-cyan-300 font-semibold text-sm md:text-base tracking-wide">
              Agentic Deal Procurement
            </span>
            <div className="w-2 h-2 rounded-full animate-pulse bg-cyan-400" />
          </div>
        </div>

        <style>{`
          @keyframes glow {
            0%, 100% { opacity: 0.6; filter: drop-shadow(0 0 4px rgba(0, 255, 255, 0.4)); }
            50% { opacity: 1; filter: drop-shadow(0 0 12px rgba(0, 255, 255, 0.8)); }
          }
        `}</style>
      </div>
    </div>
  );
}

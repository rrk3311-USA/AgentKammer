import { Brain, Cpu, CreditCard, Landmark, Shield, TrendingUp, Wallet } from "lucide-react";

export function AgenticEngineVisual() {
  const categories = [
    { icon: CreditCard, label: "Credit Cards", y: 55 },
    { icon: TrendingUp, label: "Investing", y: 115 },
    { icon: Landmark, label: "Banking", y: 175 },
    { icon: Shield, label: "Insurance", y: 235 },
    { icon: Wallet, label: "Loans", y: 295 },
  ];

  return (
    <div className="relative w-full h-[380px] bg-gradient-to-br from-[#0a1628] via-[#0d1a2d] to-[#0a1628] rounded-2xl border border-[#d4af37]/30 overflow-hidden" data-testid="agentic-engine-visual">
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212, 175, 55, 0.3) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Glow behind brain */}
      <div className="absolute left-[50px] top-1/2 -translate-y-1/2 w-28 h-28 bg-[#d4af37]/20 rounded-full blur-3xl" />

      {/* Central Brain - positioned to align with middle category */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20">
        <div className="relative">
          <div className="absolute -inset-4 border border-[#d4af37]/30 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
          <div className="absolute -inset-7 border border-[#d4af37]/15 rounded-full animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
          
          <div className="w-14 h-14 bg-gradient-to-br from-[#d4af37] to-[#c9a227] rounded-full flex items-center justify-center shadow-lg shadow-[#d4af37]/30">
            <Brain className="w-7 h-7 text-[#0a1628]" />
          </div>
          
          <div className="absolute -inset-2 border-2 border-[#d4af37]/50 rounded-full animate-ping" style={{ animationDuration: '2.5s' }} />
        </div>
        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="text-[#d4af37] font-medium text-xs">AI Engine</span>
        </div>
      </div>

      {/* SVG Circuit Lines - Full width connections */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <filter id="lineGlow">
            <feGaussianBlur stdDeviation="1.5" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Lines connecting brain to categories */}
        {categories.map((cat, i) => {
          const brainCenterY = 50;
          const catY = (cat.y / 380) * 100;
          const brainEdgeX = 15;
          const junctionX = 18 + (i * 2);
          const catEdgeX = 67;
          
          return (
            <g key={i}>
              <path
                d={`M ${brainEdgeX}% ${brainCenterY}% L ${junctionX}% ${brainCenterY}% L ${junctionX}% ${catY}% L ${catEdgeX}% ${catY}%`}
                fill="none"
                stroke="#d4af37"
                strokeWidth="2"
                strokeOpacity="0.6"
                filter="url(#lineGlow)"
              />
              
              <circle r="4" fill="#d4af37" opacity="0.9" filter="url(#lineGlow)">
                <animateMotion 
                  dur={`${1.8 + i * 0.15}s`} 
                  repeatCount="indefinite"
                  begin={`${i * 0.25}s`}
                >
                  <mpath href={`#path${i}`} />
                </animateMotion>
              </circle>
              
              <path
                id={`path${i}`}
                d={`M ${brainEdgeX}% ${brainCenterY}% L ${junctionX}% ${brainCenterY}% L ${junctionX}% ${catY}% L ${catEdgeX}% ${catY}%`}
                fill="none"
              />
              
              <circle cx={`${junctionX}%`} cy={`${brainCenterY}%`} r="3" fill="#d4af37" opacity="0.5" />
              <circle cx={`${junctionX}%`} cy={`${catY}%`} r="3" fill="#d4af37" opacity="0.5" />
              <circle cx={`${catEdgeX}%`} cy={`${catY}%`} r="4" fill="#d4af37" opacity="0.7" />
            </g>
          );
        })}
        
        <circle cx="15%" cy="50%" r="5" fill="#d4af37" opacity="0.8" filter="url(#lineGlow)" />
      </svg>

      {/* Category Nodes - positioned to align with line endpoints */}
      {categories.map((cat, i) => {
        const Icon = cat.icon;
        return (
          <div
            key={i}
            className="absolute flex items-center gap-2"
            style={{ 
              top: `${cat.y}px`,
              right: '24px',
              transform: 'translateY(-50%)'
            }}
          >
            <div className="w-9 h-9 bg-[#0f1d32] border border-[#d4af37]/50 rounded-lg flex items-center justify-center">
              <Icon className="w-4 h-4 text-[#d4af37]" />
            </div>
            <span className="text-white/80 text-sm font-medium">{cat.label}</span>
          </div>
        );
      })}

      {/* Status indicators */}
      <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
        <Cpu className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
        <span className="text-[#d4af37]/90 text-[11px] font-mono">Comparing offers...</span>
      </div>

      <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="text-green-400 text-[11px]">Live</span>
      </div>

      {/* Top status */}
      <div className="absolute top-3 right-3 text-right text-[10px] font-mono space-y-1">
        <div className="text-green-400/80">Match: 94%</div>
        <div className="text-[#d4af37]/60">Processing...</div>
      </div>
    </div>
  );
}

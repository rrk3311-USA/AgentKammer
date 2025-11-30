import { Brain, Cpu, CreditCard, Landmark, Shield, TrendingUp, Wallet } from "lucide-react";

export function AgenticEngineVisual() {
  const categories = [
    { icon: CreditCard, label: "Credit Cards", y: 60 },
    { icon: TrendingUp, label: "Investing", y: 120 },
    { icon: Landmark, label: "Banking", y: 180 },
    { icon: Shield, label: "Insurance", y: 240 },
    { icon: Wallet, label: "Loans", y: 300 },
  ];

  return (
    <div className="relative w-full h-[400px] bg-gradient-to-br from-[#0a1628] via-[#0d1a2d] to-[#0a1628] rounded-2xl border border-[#d4af37]/30 overflow-hidden" data-testid="agentic-engine-visual">
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212, 175, 55, 0.3) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Glow behind brain */}
      <div className="absolute left-[80px] top-1/2 -translate-y-1/2 w-32 h-32 bg-[#d4af37]/20 rounded-full blur-3xl" />

      {/* Central Brain */}
      <div className="absolute left-[60px] top-1/2 -translate-y-1/2 z-20">
        <div className="relative">
          <div className="absolute -inset-5 border border-[#d4af37]/30 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
          <div className="absolute -inset-9 border border-[#d4af37]/15 rounded-full animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
          
          <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#c9a227] rounded-full flex items-center justify-center shadow-lg shadow-[#d4af37]/30">
            <Brain className="w-8 h-8 text-[#0a1628]" />
          </div>
          
          <div className="absolute -inset-2 border-2 border-[#d4af37]/50 rounded-full animate-ping" style={{ animationDuration: '2.5s' }} />
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="text-[#d4af37] font-medium text-xs">AI Engine</span>
        </div>
      </div>

      {/* Clean SVG Circuit Lines - Straight horizontal paths */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 400" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="lineGlow">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Clean straight lines from brain center to each category */}
        {categories.map((cat, i) => {
          const startX = 95;
          const startY = 200;
          const endX = 320;
          const endY = cat.y;
          const midX = 140 + (i * 8);
          
          return (
            <g key={i}>
              {/* Main path - horizontal out, vertical adjust, horizontal to node */}
              <path
                d={`M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`}
                fill="none"
                stroke="#d4af37"
                strokeWidth="2"
                strokeOpacity="0.5"
                filter="url(#lineGlow)"
              />
              
              {/* Animated traveling dot */}
              <circle r="4" fill="#d4af37" opacity="0.9" filter="url(#lineGlow)">
                <animateMotion 
                  dur={`${1.5 + i * 0.2}s`} 
                  repeatCount="indefinite"
                  begin={`${i * 0.3}s`}
                >
                  <mpath href={`#path${i}`} />
                </animateMotion>
              </circle>
              
              {/* Hidden path for animation reference */}
              <path
                id={`path${i}`}
                d={`M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`}
                fill="none"
              />
              
              {/* Small dot at junction */}
              <circle cx={midX} cy={startY} r="3" fill="#d4af37" opacity="0.6" />
              <circle cx={midX} cy={endY} r="3" fill="#d4af37" opacity="0.6" />
            </g>
          );
        })}
      </svg>

      {/* Category Nodes - Clean vertical stack on right */}
      {categories.map((cat, i) => {
        const Icon = cat.icon;
        return (
          <div
            key={i}
            className="absolute right-8 flex items-center gap-3"
            style={{ top: `${cat.y - 18}px` }}
          >
            <div className="w-10 h-10 bg-[#0f1d32] border border-[#d4af37]/50 rounded-lg flex items-center justify-center">
              <Icon className="w-5 h-5 text-[#d4af37]" />
            </div>
            <span className="text-white/80 text-sm">{cat.label}</span>
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

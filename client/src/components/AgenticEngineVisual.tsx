import { Brain, Cpu, Database, Shield, TrendingUp, CreditCard, Landmark, Wallet } from "lucide-react";

export function AgenticEngineVisual() {
  const nodes = [
    { icon: CreditCard, label: "Credit Cards", x: 85, y: 15, delay: 0 },
    { icon: TrendingUp, label: "Investing", x: 95, y: 35, delay: 0.2 },
    { icon: Landmark, label: "Banking", x: 90, y: 55, delay: 0.4 },
    { icon: Shield, label: "Insurance", x: 85, y: 75, delay: 0.6 },
    { icon: Wallet, label: "Loans", x: 75, y: 90, delay: 0.8 },
    { icon: Database, label: "Data", x: 60, y: 95, delay: 1.0 },
  ];

  return (
    <div className="relative w-full h-[400px] bg-gradient-to-br from-[#0a1628] via-[#0f1d32] to-[#0a1628] rounded-2xl border border-[#d4af37]/20 overflow-hidden" data-testid="agentic-engine-visual">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Glowing orb behind brain */}
      <div className="absolute left-[15%] top-1/2 -translate-y-1/2 w-32 h-32 bg-[#d4af37]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute left-[18%] top-1/2 -translate-y-1/2 w-20 h-20 bg-[#d4af37]/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />

      {/* Central Brain */}
      <div className="absolute left-[12%] top-1/2 -translate-y-1/2 z-20">
        <div className="relative">
          {/* Outer ring */}
          <div className="absolute -inset-4 border-2 border-[#d4af37]/30 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
          <div className="absolute -inset-8 border border-[#d4af37]/20 rounded-full animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
          
          {/* Brain icon */}
          <div className="w-24 h-24 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-full flex items-center justify-center shadow-lg shadow-[#d4af37]/30">
            <Brain className="w-12 h-12 text-[#0a1628]" />
          </div>
          
          {/* Pulsing ring */}
          <div className="absolute -inset-2 border-2 border-[#d4af37]/50 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
        </div>
        
        {/* Label */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="text-[#d4af37] font-semibold text-sm">Agentic AI</span>
        </div>
      </div>

      {/* SVG Circuit Paths */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 10 }}>
        <defs>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0.2" />
          </linearGradient>
          
          {/* Animated dash */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Circuit paths from brain to nodes */}
        {nodes.map((node, i) => {
          const startX = 25;
          const startY = 50;
          const midX = 45 + (i * 3);
          const midY = 30 + (i * 12);
          
          return (
            <g key={i}>
              {/* Main path */}
              <path
                d={`M ${startX}% ${startY}% 
                    Q ${midX}% ${startY}% ${midX}% ${midY}%
                    T ${node.x - 5}% ${node.y}%`}
                fill="none"
                stroke="url(#circuitGradient)"
                strokeWidth="2"
                className="opacity-60"
                filter="url(#glow)"
              />
              
              {/* Animated dot traveling along path */}
              <circle r="4" fill="#d4af37" filter="url(#glow)">
                <animateMotion
                  dur={`${2 + i * 0.3}s`}
                  repeatCount="indefinite"
                  begin={`${node.delay}s`}
                >
                  <mpath href={`#path${i}`} />
                </animateMotion>
              </circle>
              
              {/* Hidden path for animation */}
              <path
                id={`path${i}`}
                d={`M ${startX}% ${startY}% 
                    Q ${midX}% ${startY}% ${midX}% ${midY}%
                    T ${node.x - 5}% ${node.y}%`}
                fill="none"
                stroke="transparent"
              />
            </g>
          );
        })}

        {/* Additional decorative circuits */}
        <path
          d="M 25% 50% Q 35% 40% 45% 30%"
          fill="none"
          stroke="#d4af37"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="opacity-30"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="8"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </svg>

      {/* Endpoint Nodes */}
      {nodes.map((node, i) => {
        const Icon = node.icon;
        return (
          <div
            key={i}
            className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
            style={{ 
              left: `${node.x}%`, 
              top: `${node.y}%`,
              animation: `fadeInScale 0.5s ease-out ${node.delay}s both`
            }}
          >
            <div className="relative group">
              {/* Node glow */}
              <div className="absolute -inset-2 bg-[#d4af37]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Node circle */}
              <div className="w-10 h-10 bg-[#0f1d32] border-2 border-[#d4af37]/50 rounded-full flex items-center justify-center hover:border-[#d4af37] hover:scale-110 transition-all cursor-pointer">
                <Icon className="w-5 h-5 text-[#d4af37]" />
              </div>
              
              {/* Pulse effect */}
              <div 
                className="absolute -inset-1 border border-[#d4af37]/30 rounded-full animate-ping"
                style={{ animationDuration: '3s', animationDelay: `${node.delay}s` }}
              />
              
              {/* Label */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white/80 text-xs">{node.label}</span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Processing indicator */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <Cpu className="w-4 h-4 text-[#d4af37] animate-pulse" />
        <span className="text-[#d4af37]/80 text-xs font-mono">Processing comparisons...</span>
      </div>

      {/* Data flow indicator */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-3 bg-[#d4af37] rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
        <span className="text-green-400 text-xs">Live</span>
      </div>

      {/* Floating code snippets */}
      <div className="absolute top-4 right-4 font-mono text-[10px] text-[#d4af37]/40 space-y-1">
        <div className="animate-pulse">{"{ score: 94, match: true }"}</div>
        <div className="animate-pulse" style={{ animationDelay: '0.5s' }}>{"compare(products)"}</div>
        <div className="animate-pulse" style={{ animationDelay: '1s' }}>{"rank(offers)"}</div>
      </div>

      {/* CSS Keyframes */}
      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

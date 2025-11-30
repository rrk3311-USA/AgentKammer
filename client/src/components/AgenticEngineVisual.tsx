import { Brain, Cpu, CreditCard, Landmark, Shield, TrendingUp, Wallet, Home, PieChart } from "lucide-react";

export function AgenticEngineVisual() {
  return (
    <div className="relative w-full h-[420px] bg-gradient-to-br from-[#0a1628] via-[#0f1d32] to-[#0a1628] rounded-2xl border border-[#d4af37]/20 overflow-hidden" data-testid="agentic-engine-visual">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(212, 175, 55, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212, 175, 55, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      {/* Glowing orb behind brain */}
      <div className="absolute left-[60px] top-1/2 -translate-y-1/2 w-40 h-40 bg-[#d4af37]/15 rounded-full blur-3xl animate-pulse" />

      {/* Central Brain */}
      <div className="absolute left-[50px] top-1/2 -translate-y-1/2 z-20">
        <div className="relative">
          {/* Outer rings */}
          <div className="absolute -inset-6 border-2 border-[#d4af37]/40 rounded-full animate-spin" style={{ animationDuration: '15s' }} />
          <div className="absolute -inset-10 border border-[#d4af37]/20 rounded-full animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
          <div className="absolute -inset-14 border border-dashed border-[#d4af37]/15 rounded-full animate-spin" style={{ animationDuration: '35s' }} />
          
          {/* Brain icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-[#d4af37] to-[#b8962e] rounded-full flex items-center justify-center shadow-lg shadow-[#d4af37]/40">
            <Brain className="w-10 h-10 text-[#0a1628]" />
          </div>
          
          {/* Pulsing ring */}
          <div className="absolute -inset-3 border-2 border-[#d4af37]/60 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
        </div>
      </div>

      {/* SVG Circuit Paths - Fixed coordinates */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 420" preserveAspectRatio="xMidYMid meet">
        <defs>
          {/* Gradient for paths */}
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0.3" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Circuit Path 1 - Top */}
        <path
          d="M 110 210 L 180 210 L 180 80 L 320 80"
          fill="none"
          stroke="#d4af37"
          strokeWidth="2"
          strokeOpacity="0.6"
          filter="url(#glow)"
        />
        <circle r="5" fill="#d4af37" filter="url(#glow)">
          <animateMotion dur="2s" repeatCount="indefinite">
            <mpath href="#motionPath1" />
          </animateMotion>
        </circle>
        <path id="motionPath1" d="M 110 210 L 180 210 L 180 80 L 320 80" fill="none" />

        {/* Circuit Path 2 - Upper middle */}
        <path
          d="M 110 210 L 200 210 L 200 140 L 320 140"
          fill="none"
          stroke="#d4af37"
          strokeWidth="2"
          strokeOpacity="0.5"
          filter="url(#glow)"
        />
        <circle r="5" fill="#f4d03f" filter="url(#glow)">
          <animateMotion dur="2.3s" repeatCount="indefinite" begin="0.3s">
            <mpath href="#motionPath2" />
          </animateMotion>
        </circle>
        <path id="motionPath2" d="M 110 210 L 200 210 L 200 140 L 320 140" fill="none" />

        {/* Circuit Path 3 - Middle */}
        <path
          d="M 110 210 L 220 210 L 320 210"
          fill="none"
          stroke="#d4af37"
          strokeWidth="2.5"
          strokeOpacity="0.7"
          filter="url(#glow)"
        />
        <circle r="6" fill="#d4af37" filter="url(#glow)">
          <animateMotion dur="1.8s" repeatCount="indefinite" begin="0.5s">
            <mpath href="#motionPath3" />
          </animateMotion>
        </circle>
        <path id="motionPath3" d="M 110 210 L 220 210 L 320 210" fill="none" />

        {/* Circuit Path 4 - Lower middle */}
        <path
          d="M 110 210 L 200 210 L 200 280 L 320 280"
          fill="none"
          stroke="#d4af37"
          strokeWidth="2"
          strokeOpacity="0.5"
          filter="url(#glow)"
        />
        <circle r="5" fill="#f4d03f" filter="url(#glow)">
          <animateMotion dur="2.5s" repeatCount="indefinite" begin="0.7s">
            <mpath href="#motionPath4" />
          </animateMotion>
        </circle>
        <path id="motionPath4" d="M 110 210 L 200 210 L 200 280 L 320 280" fill="none" />

        {/* Circuit Path 5 - Bottom */}
        <path
          d="M 110 210 L 180 210 L 180 340 L 320 340"
          fill="none"
          stroke="#d4af37"
          strokeWidth="2"
          strokeOpacity="0.6"
          filter="url(#glow)"
        />
        <circle r="5" fill="#d4af37" filter="url(#glow)">
          <animateMotion dur="2.2s" repeatCount="indefinite" begin="1s">
            <mpath href="#motionPath5" />
          </animateMotion>
        </circle>
        <path id="motionPath5" d="M 110 210 L 180 210 L 180 340 L 320 340" fill="none" />

        {/* Junction dots on paths */}
        <circle cx="180" cy="210" r="4" fill="#d4af37" opacity="0.8" />
        <circle cx="200" cy="210" r="4" fill="#d4af37" opacity="0.8" />
        <circle cx="180" cy="80" r="3" fill="#d4af37" opacity="0.6" />
        <circle cx="200" cy="140" r="3" fill="#d4af37" opacity="0.6" />
        <circle cx="200" cy="280" r="3" fill="#d4af37" opacity="0.6" />
        <circle cx="180" cy="340" r="3" fill="#d4af37" opacity="0.6" />

        {/* Animated dashed lines for "scanning" effect */}
        <path
          d="M 250 80 L 320 80"
          fill="none"
          stroke="#d4af37"
          strokeWidth="1"
          strokeDasharray="6 4"
          opacity="0.4"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="20" dur="0.8s" repeatCount="indefinite" />
        </path>
        <path
          d="M 250 140 L 320 140"
          fill="none"
          stroke="#d4af37"
          strokeWidth="1"
          strokeDasharray="6 4"
          opacity="0.4"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="20" dur="0.8s" repeatCount="indefinite" />
        </path>
        <path
          d="M 250 280 L 320 280"
          fill="none"
          stroke="#d4af37"
          strokeWidth="1"
          strokeDasharray="6 4"
          opacity="0.4"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="20" dur="0.8s" repeatCount="indefinite" />
        </path>
        <path
          d="M 250 340 L 320 340"
          fill="none"
          stroke="#d4af37"
          strokeWidth="1"
          strokeDasharray="6 4"
          opacity="0.4"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="20" dur="0.8s" repeatCount="indefinite" />
        </path>
      </svg>

      {/* Endpoint Nodes - Right side */}
      <div className="absolute right-[80px] top-[65px] flex items-center gap-3 group">
        <div className="w-12 h-12 bg-[#0f1d32] border-2 border-[#d4af37]/60 rounded-lg flex items-center justify-center group-hover:border-[#d4af37] group-hover:scale-110 transition-all">
          <CreditCard className="w-6 h-6 text-[#d4af37]" />
        </div>
        <span className="text-white/70 text-sm font-medium">Credit Cards</span>
      </div>

      <div className="absolute right-[80px] top-[125px] flex items-center gap-3 group">
        <div className="w-12 h-12 bg-[#0f1d32] border-2 border-[#d4af37]/60 rounded-lg flex items-center justify-center group-hover:border-[#d4af37] group-hover:scale-110 transition-all">
          <TrendingUp className="w-6 h-6 text-[#d4af37]" />
        </div>
        <span className="text-white/70 text-sm font-medium">Investing</span>
      </div>

      <div className="absolute right-[80px] top-[195px] flex items-center gap-3 group">
        <div className="w-12 h-12 bg-[#0f1d32] border-2 border-[#d4af37]/60 rounded-lg flex items-center justify-center group-hover:border-[#d4af37] group-hover:scale-110 transition-all">
          <Landmark className="w-6 h-6 text-[#d4af37]" />
        </div>
        <span className="text-white/70 text-sm font-medium">Banking</span>
      </div>

      <div className="absolute right-[80px] top-[265px] flex items-center gap-3 group">
        <div className="w-12 h-12 bg-[#0f1d32] border-2 border-[#d4af37]/60 rounded-lg flex items-center justify-center group-hover:border-[#d4af37] group-hover:scale-110 transition-all">
          <Shield className="w-6 h-6 text-[#d4af37]" />
        </div>
        <span className="text-white/70 text-sm font-medium">Insurance</span>
      </div>

      <div className="absolute right-[80px] top-[325px] flex items-center gap-3 group">
        <div className="w-12 h-12 bg-[#0f1d32] border-2 border-[#d4af37]/60 rounded-lg flex items-center justify-center group-hover:border-[#d4af37] group-hover:scale-110 transition-all">
          <Wallet className="w-6 h-6 text-[#d4af37]" />
        </div>
        <span className="text-white/70 text-sm font-medium">Loans</span>
      </div>

      {/* Brain label */}
      <div className="absolute left-[35px] top-[calc(50%+55px)] z-30">
        <span className="text-[#d4af37] font-semibold text-sm">Agentic AI</span>
      </div>

      {/* Processing indicator */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-full">
        <Cpu className="w-4 h-4 text-[#d4af37] animate-pulse" />
        <span className="text-[#d4af37]/90 text-xs font-mono">Comparing 127 offers...</span>
      </div>

      {/* Live indicator */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-full">
        <div className="flex gap-0.5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-1 bg-green-400 rounded-full animate-pulse"
              style={{ 
                height: `${8 + (i * 3)}px`,
                animationDelay: `${i * 0.15}s` 
              }}
            />
          ))}
        </div>
        <span className="text-green-400 text-xs font-medium">Live</span>
      </div>

      {/* Floating comparison results */}
      <div className="absolute top-4 left-4 font-mono text-[11px] space-y-1.5 bg-black/20 p-2 rounded-lg">
        <div className="text-green-400 animate-pulse flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full" />
          Match: 94%
        </div>
        <div className="text-[#d4af37]/70 animate-pulse flex items-center gap-2" style={{ animationDelay: '0.3s' }}>
          <span className="w-2 h-2 bg-[#d4af37] rounded-full" />
          Analyzing...
        </div>
        <div className="text-blue-400/70 animate-pulse flex items-center gap-2" style={{ animationDelay: '0.6s' }}>
          <span className="w-2 h-2 bg-blue-400 rounded-full" />
          Ranking offers
        </div>
      </div>
    </div>
  );
}

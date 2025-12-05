import { useEffect, useState, useRef } from "react";
import { Brain, Cpu, CreditCard, TrendingUp, Users, Home, RefreshCw } from "lucide-react";

interface Pulse {
  id: number;
  pathIndex: number;
  progress: number;
  reverse: boolean;
  speed: number;
}

export function AgenticEngineVisual() {
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const pulseIdRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = [
    { icon: CreditCard, label: "Credit Cards", y: 50 },
    { icon: Users, label: "Reverse Buyer Origination", y: 115 },
    { icon: Home, label: "Reverse Seller Architecture", y: 180 },
    { icon: RefreshCw, label: "Refinancing Rate Watch", y: 245 },
    { icon: TrendingUp, label: "Investing", y: 310 },
  ];

  useEffect(() => {
    const spawnPulse = () => {
      const pathIndex = Math.floor(Math.random() * categories.length);
      const reverse = Math.random() < 0.25;
      const newPulse: Pulse = {
        id: pulseIdRef.current++,
        pathIndex,
        progress: reverse ? 100 : 0,
        reverse,
        speed: 1.5 + Math.random() * 1,
      };
      setPulses(prev => [...prev.slice(-8), newPulse]);
      setActiveCategory(pathIndex);
    };

    spawnPulse();
    const spawnInterval = setInterval(spawnPulse, 600);

    return () => clearInterval(spawnInterval);
  }, []);

  useEffect(() => {
    let animationId: number;
    
    const animate = () => {
      setPulses(prev => 
        prev
          .map(pulse => ({
            ...pulse,
            progress: pulse.reverse 
              ? pulse.progress - pulse.speed 
              : pulse.progress + pulse.speed,
          }))
          .filter(pulse => pulse.progress >= -5 && pulse.progress <= 105)
      );
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const getPathPoints = (index: number) => {
    const brainX = 88;
    const brainY = 180;
    const junctionX = 110 + (index * 8);
    const catY = categories[index].y;
    const catX = 320;
    
    return { brainX, brainY, junctionX, catY, catX };
  };

  const getPointOnPath = (index: number, progress: number) => {
    const { brainX, brainY, junctionX, catY, catX } = getPathPoints(index);
    
    const seg1Len = junctionX - brainX;
    const seg2Len = Math.abs(catY - brainY);
    const seg3Len = catX - junctionX;
    const totalLen = seg1Len + seg2Len + seg3Len;
    
    const progressLen = (progress / 100) * totalLen;
    
    if (progressLen <= seg1Len) {
      return { x: brainX + progressLen, y: brainY };
    } else if (progressLen <= seg1Len + seg2Len) {
      const seg2Progress = progressLen - seg1Len;
      const direction = catY > brainY ? 1 : -1;
      return { x: junctionX, y: brainY + (seg2Progress * direction) };
    } else {
      const seg3Progress = progressLen - seg1Len - seg2Len;
      return { x: junctionX + seg3Progress, y: catY };
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[380px] bg-gradient-to-br from-[#0a1628] via-[#0d1a2d] to-[#0a1628] rounded-2xl border border-[#d4af37]/30 overflow-hidden" 
      data-testid="agentic-engine-visual"
    >
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212, 175, 55, 0.3) 1px, transparent 0)`,
          backgroundSize: '20px 20px',
        }}
      />

      <div className="absolute left-[60px] top-1/2 -translate-y-1/2 w-24 h-24 bg-[#d4af37]/15 rounded-full blur-3xl" />

      <div className="absolute left-5 top-1/2 -translate-y-1/2 z-20">
        <div className="relative">
          <div className="absolute -inset-3 border border-[#d4af37]/30 rounded-full animate-spin" style={{ animationDuration: '15s' }} />
          <div className="absolute -inset-6 border border-[#d4af37]/15 rounded-full animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
          
          <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#c9a227] rounded-full flex items-center justify-center shadow-lg shadow-[#d4af37]/40">
            <Brain className="w-6 h-6 text-[#0a1628]" />
          </div>
          
          <div className="absolute -inset-1 border-2 border-[#d4af37]/60 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
        </div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="text-[#d4af37] font-semibold text-[10px]">AI Engine</span>
        </div>
      </div>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 380" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="pulseGlow">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="lineGlow">
            <feGaussianBlur stdDeviation="1" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#d4af37" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {categories.map((cat, i) => {
          const { brainX, brainY, junctionX, catY, catX } = getPathPoints(i);
          const isActive = activeCategory === i;
          
          return (
            <g key={i}>
              <path
                d={`M ${brainX} ${brainY} L ${junctionX} ${brainY} L ${junctionX} ${catY} L ${catX} ${catY}`}
                fill="none"
                stroke="#d4af37"
                strokeWidth={isActive ? "2.5" : "1.5"}
                strokeOpacity={isActive ? "0.7" : "0.3"}
                filter="url(#lineGlow)"
                style={{
                  transition: 'stroke-opacity 0.3s, stroke-width 0.3s'
                }}
              />
              
              <path
                d={`M ${brainX} ${brainY} L ${junctionX} ${brainY} L ${junctionX} ${catY} L ${catX} ${catY}`}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="1"
                strokeDasharray="8 12"
                strokeOpacity="0.6"
                style={{
                  animation: `dashFlow ${2 + i * 0.2}s linear infinite`
                }}
              />

              <circle cx={junctionX} cy={brainY} r="3" fill="#d4af37" opacity={isActive ? 0.8 : 0.4} />
              <circle cx={junctionX} cy={catY} r="3" fill="#d4af37" opacity={isActive ? 0.8 : 0.4} />
              <circle cx={catX} cy={catY} r="4" fill="#d4af37" opacity={isActive ? 0.9 : 0.5}>
                {isActive && (
                  <animate attributeName="r" values="4;6;4" dur="0.5s" repeatCount="indefinite" />
                )}
              </circle>
            </g>
          );
        })}

        <circle cx="88" cy="180" r="6" fill="#d4af37" opacity="0.9" filter="url(#lineGlow)" />

        {pulses.map(pulse => {
          const point = getPointOnPath(pulse.pathIndex, pulse.progress);
          return (
            <g key={pulse.id}>
              <circle
                cx={point.x}
                cy={point.y}
                r="8"
                fill="#d4af37"
                opacity="0.3"
                filter="url(#pulseGlow)"
              />
              <circle
                cx={point.x}
                cy={point.y}
                r="5"
                fill="#ffd700"
                opacity="0.9"
                filter="url(#pulseGlow)"
              />
              <circle
                cx={point.x}
                cy={point.y}
                r="2"
                fill="#fff"
                opacity="1"
              />
            </g>
          );
        })}
      </svg>

      {categories.map((cat, i) => {
        const Icon = cat.icon;
        const isActive = activeCategory === i;
        return (
          <div
            key={i}
            className="absolute flex items-center gap-2 transition-all duration-300"
            style={{ 
              top: `${cat.y}px`,
              right: '16px',
              transform: 'translateY(-50%)',
              opacity: isActive ? 1 : 0.7,
            }}
          >
            <div 
              className={`w-8 h-8 bg-[#0f1d32] border rounded-lg flex items-center justify-center transition-all duration-300 ${
                isActive ? 'border-[#d4af37] shadow-lg shadow-[#d4af37]/30' : 'border-[#d4af37]/40'
              }`}
            >
              <Icon className={`w-4 h-4 transition-colors duration-300 ${isActive ? 'text-[#ffd700]' : 'text-[#d4af37]'}`} />
            </div>
            <span className={`text-sm font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/70'}`}>
              {cat.label}
            </span>
          </div>
        );
      })}

      <div className="absolute bottom-2.5 left-2.5 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
        <Cpu className="w-3 h-3 text-[#d4af37] animate-pulse" />
        <span className="text-[#d4af37]/90 text-[10px] font-mono">Analyzing...</span>
      </div>

      <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
        <span className="text-green-400 text-[10px]">Live</span>
      </div>

      <style>{`
        @keyframes dashFlow {
          0% { stroke-dashoffset: 40; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}

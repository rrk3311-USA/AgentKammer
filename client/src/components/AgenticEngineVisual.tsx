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

  const categories = [
    { icon: CreditCard, label: "Credit Cards" },
    { icon: Users, label: "Reverse Buyer Origination" },
    { icon: Home, label: "Reverse Seller Architecture" },
    { icon: RefreshCw, label: "Refinancing Rate Watch" },
    { icon: TrendingUp, label: "Investing" },
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
        speed: 2 + Math.random() * 1.5,
      };
      setPulses(prev => [...prev.slice(-6), newPulse]);
      setActiveCategory(pathIndex);
    };

    spawnPulse();
    const spawnInterval = setInterval(spawnPulse, 800);

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

  return (
    <div 
      className="relative w-full bg-gradient-to-br from-[#0a1628] via-[#0d1a2d] to-[#0a1628] rounded-2xl border border-[#d4af37]/30 overflow-hidden p-8 md:p-10" 
      data-testid="agentic-engine-visual"
    >
      {/* Dot pattern background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212, 175, 55, 0.3) 1px, transparent 0)`,
          backgroundSize: '20px 20px',
        }}
      />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-12">
        {/* AI Engine Brain - with extra padding wrapper */}
        <div className="flex flex-col items-center shrink-0 p-4">
          <div className="relative">
            {/* Outer spinning ring */}
            <div className="absolute -inset-4 border border-[#d4af37]/30 rounded-full animate-spin" style={{ animationDuration: '15s' }} />
            {/* Outermost spinning ring */}
            <div className="absolute -inset-7 border border-[#d4af37]/15 rounded-full animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
            
            {/* Main brain circle */}
            <div className="w-14 h-14 bg-gradient-to-br from-[#d4af37] to-[#c9a227] rounded-full flex items-center justify-center shadow-lg shadow-[#d4af37]/40">
              <Brain className="w-7 h-7 text-[#0a1628]" />
            </div>
            
            {/* Ping effect */}
            <div className="absolute -inset-1 border-2 border-[#d4af37]/60 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
          </div>
          <span className="text-[#d4af37] font-semibold text-xs mt-5">AI Engine</span>
        </div>

        {/* Categories Grid */}
        <div className="flex-1 w-full">
          <div className="space-y-2">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              const isActive = activeCategory === i;
              const activePulse = pulses.find(p => p.pathIndex === i);
              const pulseProgress = activePulse?.progress || 0;
              
              return (
                <div key={i} className="relative">
                  {/* Connection line - positioned UNDER the card with z-0 */}
                  <div className="absolute z-0 left-0 bottom-0 w-full h-[2px] pointer-events-none">
                    <div 
                      className={`h-full transition-all duration-300 ${isActive ? 'bg-[#d4af37]/40' : 'bg-[#d4af37]/15'}`}
                    />
                    {/* Animated pulse dot on line */}
                    {activePulse && pulseProgress > 0 && pulseProgress < 100 && (
                      <div 
                        className="absolute top-1/2 w-2.5 h-2.5 bg-[#ffd700] rounded-full shadow-lg shadow-[#d4af37]/60"
                        style={{ 
                          left: `${pulseProgress}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <div className="absolute inset-0 bg-white/50 rounded-full animate-ping" />
                      </div>
                    )}
                  </div>
                  
                  {/* Category card - positioned ABOVE the line with z-10 */}
                  <div 
                    className={`relative z-10 flex items-center gap-3 py-2.5 px-3 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'bg-[#0d1a2d] border border-[#d4af37]/40' 
                        : 'bg-[#0d1a2d]'
                    }`}
                  >
                    <div 
                      className={`w-9 h-9 shrink-0 bg-[#0a1628] border rounded-lg flex items-center justify-center transition-all duration-300 ${
                        isActive ? 'border-[#d4af37] shadow-md shadow-[#d4af37]/20' : 'border-[#d4af37]/30'
                      }`}
                    >
                      <Icon className={`w-4 h-4 transition-colors duration-300 ${isActive ? 'text-[#ffd700]' : 'text-[#d4af37]'}`} />
                    </div>
                    <span className={`text-sm font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/70'}`}>
                      {cat.label}
                    </span>
                    
                    {/* Active indicator dot */}
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-[#d4af37] rounded-full animate-pulse" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Status indicators */}
      <div className="relative z-10 flex justify-between items-center mt-8 pt-4 border-t border-[#d4af37]/20">
        <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <Cpu className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
          <span className="text-[#d4af37]/90 text-xs font-mono">Analyzing...</span>
        </div>

        <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 text-xs">Live</span>
        </div>
      </div>
    </div>
  );
}

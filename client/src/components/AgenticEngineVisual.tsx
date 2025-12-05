import { useEffect, useState } from "react";
import { Brain, Cpu, CreditCard, TrendingUp, Users, Home, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";

export function AgenticEngineVisual() {
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = [
    { icon: CreditCard, label: "Credit Cards", description: "Travel, cashback & rewards" },
    { icon: Users, label: "Reverse Buyer Origination", description: "Lenders compete for you" },
    { icon: Home, label: "Reverse Seller Architecture", description: "Maximize your sale price" },
    { icon: RefreshCw, label: "Refinancing Rate Watch", description: "Live rate monitoring" },
    { icon: TrendingUp, label: "Investing", description: "Robo-advisors & brokerages" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="relative w-full bg-gradient-to-br from-[#0a1628] via-[#0f1f3d] to-[#0a1628] rounded-2xl border border-[#d4af37]/30 overflow-hidden" 
      data-testid="agentic-engine-visual"
    >
      {/* Dot pattern background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212, 175, 55, 0.4) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Header with AI Engine */}
      <div className="relative z-10 p-6 pb-4 border-b border-[#d4af37]/20">
        <div className="flex items-center gap-4">
          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute -inset-2 bg-[#d4af37]/20 rounded-full blur-md" />
            {/* Main brain circle */}
            <div className="relative w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#c9a227] rounded-full flex items-center justify-center shadow-lg shadow-[#d4af37]/30">
              <Brain className="w-6 h-6 text-[#0a1628]" />
            </div>
            {/* Ping effect */}
            <div className="absolute inset-0 border-2 border-[#d4af37]/40 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">AI Comparison Engine</h3>
            <p className="text-white/60 text-sm">Analyzing 5 categories in real-time</p>
          </div>
          <div className="ml-auto flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-xs font-medium">Live</span>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="relative z-10 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            const isActive = activeIndex === i;
            
            return (
              <Card
                key={i}
                className={`relative p-4 transition-all duration-500 cursor-pointer ${
                  isActive 
                    ? 'bg-[#d4af37]/15 border-[#d4af37]/60 shadow-lg shadow-[#d4af37]/20' 
                    : 'bg-slate-900/50 border-slate-700/50 hover:border-[#d4af37]/30'
                }`}
                data-testid={`card-category-${i}`}
              >
                {/* Active indicator line */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
                )}
                
                <div className="flex flex-col items-center text-center gap-3">
                  <div 
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-500 ${
                      isActive 
                        ? 'bg-[#d4af37] shadow-md shadow-[#d4af37]/40' 
                        : 'bg-[#d4af37]/20'
                    }`}
                  >
                    <Icon className={`w-5 h-5 transition-colors duration-500 ${
                      isActive ? 'text-[#0a1628]' : 'text-[#d4af37]'
                    }`} />
                  </div>
                  
                  <div>
                    <p className={`text-sm font-medium transition-colors duration-500 ${
                      isActive ? 'text-white' : 'text-white/80'
                    }`}>
                      {cat.label}
                    </p>
                    <p className={`text-xs mt-1 transition-colors duration-500 ${
                      isActive ? 'text-white/70' : 'text-white/50'
                    }`}>
                      {cat.description}
                    </p>
                  </div>

                  {/* Pulse indicator for active */}
                  {isActive && (
                    <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-pulse" />
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Footer status */}
      <div className="relative z-10 px-6 pb-4">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-white/50">
            <Cpu className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Scanning {categories.length} product categories</span>
          </div>
          <div className="flex items-center gap-3">
            {categories.map((_, i) => (
              <div 
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? 'bg-[#d4af37] scale-125' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

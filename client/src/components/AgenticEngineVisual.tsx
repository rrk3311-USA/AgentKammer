import { useEffect, useState } from "react";
import aiBrainImage from "@assets/generated_images/ai_brain_tech_visualization.png";

export function AgenticEngineVisual() {
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = [
    { label: "Credit Cards", shortLabel: "Credit Cards" },
    { label: "Reverse Buyer Origination", shortLabel: "Buyer Origination" },
    { label: "Reverse Seller Architecture", shortLabel: "Seller Architecture" },
    { label: "Refinancing Rate Watch", shortLabel: "Rate Watch" },
    { label: "Investing", shortLabel: "Investing" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="relative w-full rounded-2xl overflow-hidden" 
      data-testid="agentic-engine-visual"
    >
      {/* AI Brain Background Image */}
      <div className="relative w-full aspect-[16/9] min-h-[200px]">
        <img 
          src={aiBrainImage} 
          alt="AI-Powered Comparison Engine" 
          className="w-full h-full object-cover"
        />
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50" />
        
        {/* Floating category labels - Desktop */}
        <div className="hidden md:block absolute inset-0">
          {categories.map((cat, i) => {
            const isActive = activeIndex === i;
            const positions = [
              { top: '12%', left: '50%', transform: 'translateX(-50%)' },
              { top: '32%', right: '6%' },
              { top: '52%', right: '8%' },
              { bottom: '32%', left: '6%' },
              { bottom: '18%', left: '50%', transform: 'translateX(-50%)' },
            ];
            
            return (
              <div
                key={i}
                className={`absolute transition-all duration-700 ${
                  isActive ? 'opacity-100 scale-110' : 'opacity-50 scale-100'
                }`}
                style={positions[i]}
              >
                <span 
                  className={`text-base font-semibold tracking-wide transition-all duration-500 whitespace-nowrap ${
                    isActive 
                      ? 'text-[#d4af37] drop-shadow-[0_0_12px_rgba(212,175,55,0.9)]' 
                      : 'text-white/80'
                  }`}
                >
                  {cat.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Floating category labels - Mobile (simplified layout) */}
        <div className="md:hidden absolute inset-x-4 top-4 bottom-16">
          <div className="flex flex-col justify-between h-full py-2">
            {categories.map((cat, i) => {
              const isActive = activeIndex === i;
              const alignments = ['text-center', 'text-right', 'text-right', 'text-left', 'text-center'];
              
              return (
                <div
                  key={i}
                  className={`transition-all duration-500 ${alignments[i]} ${
                    isActive ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  <span 
                    className={`text-xs font-semibold tracking-wide transition-all duration-500 ${
                      isActive 
                        ? 'text-[#d4af37] drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]' 
                        : 'text-white/70'
                    }`}
                  >
                    {cat.shortLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom caption bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/95 to-[#0a1628] py-2.5 md:py-3 px-4 md:px-6">
          <div className="flex items-center justify-center gap-2 md:gap-3">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#d4af37] rounded-full animate-pulse shrink-0" />
            <span className="text-[#d4af37] font-semibold text-xs md:text-base tracking-wide text-center">
              <span className="hidden sm:inline">AI-Powered Multi-Category Financial Intelligence</span>
              <span className="sm:hidden">AI-Powered Financial Intelligence</span>
            </span>
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#d4af37] rounded-full animate-pulse shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}

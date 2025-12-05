import { useEffect, useState } from "react";
import aiBrainImage from "@assets/generated_images/ai_brain_tech_visualization.png";

export function AgenticEngineVisual() {
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = [
    "Credit Cards",
    "Reverse Buyer Origination",
    "Reverse Seller Architecture", 
    "Refinancing Rate Watch",
    "Investing",
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
      <div className="relative w-full aspect-[16/9]">
        <img 
          src={aiBrainImage} 
          alt="AI-Powered Comparison Engine" 
          className="w-full h-full object-cover"
        />
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
        
        {/* Floating category labels */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            {categories.map((cat, i) => {
              const isActive = activeIndex === i;
              // Position labels around the brain
              const positions = [
                { top: '15%', left: '50%', transform: 'translateX(-50%)' }, // Top center
                { top: '35%', right: '8%' }, // Right upper
                { top: '55%', right: '10%' }, // Right lower
                { bottom: '30%', left: '8%' }, // Left lower
                { bottom: '15%', left: '50%', transform: 'translateX(-50%)' }, // Bottom center
              ];
              
              return (
                <div
                  key={i}
                  className={`absolute transition-all duration-700 ${
                    isActive ? 'opacity-100 scale-110' : 'opacity-40 scale-100'
                  }`}
                  style={positions[i]}
                >
                  <span 
                    className={`text-sm md:text-base font-medium tracking-wide transition-all duration-500 ${
                      isActive 
                        ? 'text-[#d4af37] drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]' 
                        : 'text-white/70'
                    }`}
                  >
                    {cat}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom caption bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/95 to-[#0a1628] py-3 px-6">
          <div className="flex items-center justify-center gap-3">
            <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse" />
            <span className="text-[#d4af37] font-semibold text-sm md:text-base tracking-wide">
              AI-Powered Multi-Category Financial Intelligence
            </span>
            <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

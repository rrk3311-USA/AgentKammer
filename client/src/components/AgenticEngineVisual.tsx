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

  const codeThoughts = [
    "{ analyze }",
    "< compare >",
    "[ rank ]",
    "{ score }",
    "< match >",
    "[ optimize ]",
    "{ evaluate }",
    "< recommend >",
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
        
        {/* Animated code waterfall - twinkling thoughts */}
        <div className="absolute inset-0 overflow-hidden">
          {codeThoughts.map((thought, i) => {
            const delay = i * 0.3;
            const startPos = (i % 3) * 33; // Distribute across left/center/right
            const duration = 8 + (i % 3) * 2; // Vary durations for natural flow
            
            return (
              <div
                key={i}
                className="absolute text-[#d4af37]/30 font-mono text-xs md:text-sm whitespace-nowrap"
                style={{
                  left: `${startPos}%`,
                  animation: `thoughtFlow${i % 3} ${duration}s linear ${delay}s infinite`,
                }}
              >
                {thought}
              </div>
            );
          })}
        </div>
        
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
                <div className={`relative ${isActive ? 'pb-1' : ''}`}>
                  <span 
                    className={`text-base font-semibold tracking-wide transition-all duration-500 whitespace-nowrap inline-block ${
                      isActive 
                        ? 'text-[#d4af37] drop-shadow-[0_0_12px_rgba(212,175,55,0.9)]' 
                        : 'text-white/80'
                    }`}
                  >
                    {cat.label}
                  </span>
                  {/* Underline glow when beam hits */}
                  {isActive && (
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"
                      style={{
                        animation: `underlineGlow 0.6s ease-out`,
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Animation styles for code waterfall and beams */}
        <style>{`
          @keyframes thoughtFlow0 {
            0% {
              top: -20px;
              opacity: 0;
            }
            20% {
              opacity: 0.3;
            }
            50% {
              opacity: 0.15;
            }
            80% {
              opacity: 0.25;
            }
            100% {
              top: 100%;
              opacity: 0;
            }
          }
          
          @keyframes thoughtFlow1 {
            0% {
              top: -40px;
              opacity: 0;
            }
            15% {
              opacity: 0.25;
            }
            45% {
              opacity: 0.2;
            }
            75% {
              opacity: 0.3;
            }
            100% {
              top: 100%;
              opacity: 0;
            }
          }
          
          @keyframes thoughtFlow2 {
            0% {
              top: -60px;
              opacity: 0;
            }
            10% {
              opacity: 0.35;
            }
            40% {
              opacity: 0.15;
            }
            70% {
              opacity: 0.25;
            }
            100% {
              top: 100%;
              opacity: 0;
            }
          }

          @keyframes beamShoot {
            0% {
              opacity: 0;
              stroke-dasharray: 100;
              stroke-dashoffset: 100;
            }
            30% {
              opacity: 0.8;
              stroke-dasharray: 100;
              stroke-dashoffset: 0;
            }
            70% {
              opacity: 0.3;
              stroke-dasharray: 100;
              stroke-dashoffset: 0;
            }
            100% {
              opacity: 0;
              stroke-dasharray: 100;
              stroke-dashoffset: 0;
            }
          }

          @keyframes beamShootGlow {
            0% {
              opacity: 0;
              stroke-dasharray: 100;
              stroke-dashoffset: 100;
            }
            25% {
              opacity: 0.4;
              stroke-dasharray: 100;
              stroke-dashoffset: 0;
            }
            60% {
              opacity: 0.1;
              stroke-dasharray: 100;
              stroke-dashoffset: 0;
            }
            100% {
              opacity: 0;
              stroke-dasharray: 100;
              stroke-dashoffset: 0;
            }
          }

          @keyframes underlineGlow {
            0% {
              opacity: 0;
              transform: scaleX(0);
            }
            50% {
              opacity: 1;
              transform: scaleX(1);
            }
            100% {
              opacity: 0;
              transform: scaleX(1);
            }
          }
        `}</style>
        
        {/* Shooting energy beams from brain to categories */}
        <svg 
          className="hidden md:block absolute inset-0 w-full h-full"
          style={{ pointerEvents: 'none' }}
          data-testid="brain-beams-svg"
        >
          <defs>
            <filter id="beamGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {categories.map((_, i) => {
            const startX = '50%';
            const startY = '50%';
            
            // Calculate end points for each category
            const endPoints = [
              { x: '50%', y: '12%' },   // top center
              { x: '94%', y: '32%' },   // right upper
              { x: '92%', y: '52%' },   // right lower
              { x: '6%', y: '68%' },    // left lower
              { x: '50%', y: '82%' },   // bottom center
            ];
            
            const end = endPoints[i];
            const delay = i * 0.4;
            
            return (
              <g key={i}>
                <line
                  x1={startX}
                  y1={startY}
                  x2={end.x}
                  y2={end.y}
                  stroke="#d4af37"
                  strokeWidth="1.5"
                  opacity="0"
                  filter="url(#beamGlow)"
                  style={{
                    animation: `beamShoot ${3.5}s ease-out ${delay}s infinite`,
                  }}
                />
                {/* Glow line for extra effect */}
                <line
                  x1={startX}
                  y1={startY}
                  x2={end.x}
                  y2={end.y}
                  stroke="#d4af37"
                  strokeWidth="3"
                  opacity="0"
                  filter="url(#beamGlow)"
                  style={{
                    animation: `beamShootGlow ${3.5}s ease-out ${delay}s infinite`,
                  }}
                />
              </g>
            );
          })}
        </svg>

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
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse shrink-0 bg-[#0b9c26]" />
            <span className="text-[#d4af37] font-semibold text-xs md:text-base tracking-wide text-center">
              <span className="hidden sm:inline">AI-Powered Multi-Category Financial Intelligence</span>
              <span className="sm:hidden">AI-Powered Financial Intelligence</span>
            </span>
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse shrink-0 bg-[#0b9c26]" />
          </div>
        </div>
      </div>
    </div>
  );
}

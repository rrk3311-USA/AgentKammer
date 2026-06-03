import { useEffect, useState } from "react";
import brainImage from "@assets/image_1765086283557.png";
import { Brain } from "lucide-react";
import { SiReplit, SiAnthropic, SiClaude, SiNvidia } from "react-icons/si";

const productCategories = [
  "Off-Market Deals",
  "Price Per SqFt",
  "Absorption Rate",
  "Inventory Delta",
  "Days on Market",
  "Negotiation Leverage",
  "Seller Motivation",
  "Cap Rate",
  "Building Intelligence",
  "Comparable Analysis",
];

const codeSnippets = [
  "const comps = analyze()",
  "const ppsf = benchmark()",
  "const edge = optimize()",
  "const deal = score()",
  "const seller = qualify()",
  "const leverage = rank()",
];

export function AgenticEngineVisual() {
  const [codeDrops, setCodeDrops] = useState<{ id: number; code: string; delay: number; startX: number; startY: number; duration: number; color: string }[]>([]);
  const [floatingCategories, setFloatingCategories] = useState<{ id: number; text: string; x: number; y: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate code drops that converge into brain center from random edges.
    const drops: Array<{ id: number; code: string; delay: number; startX: number; startY: number; duration: number; color: string }> = Array.from({ length: 12 }, (_, i) => {
      const entrySide = i % 4;
      let startX = 0;
      let startY = 0;

      if (entrySide === 0) {
        startX = -420 + Math.random() * 840;
        startY = -220 - Math.random() * 120;
      } else if (entrySide === 1) {
        startX = -420 - Math.random() * 160;
        startY = -170 + Math.random() * 360;
      } else if (entrySide === 2) {
        startX = 420 + Math.random() * 160;
        startY = -170 + Math.random() * 360;
      } else {
        startX = -420 + Math.random() * 840;
        startY = 220 + Math.random() * 140;
      }

      return {
        id: i,
        code: codeSnippets[i % codeSnippets.length],
        delay: Math.random() * 2.4,
        startX,
        startY,
        duration: 2.4 + Math.random() * 1.2,
        color: Math.random() > 0.5 ? "#00ff88" : "#00d4ff",
      };
    });
    setCodeDrops(drops);

    // Generate floating categories - more with some closer to core
    const categories = Array.from({ length: 10 }, (_, i) => {
      let x, y;
      if (i < 8) {
        // Categories closer to the core (center area)
        const angle = (i / 8) * Math.PI * 2;
        const radius = 80 + Math.random() * 80;
        x = 485 + Math.cos(angle) * radius;
        y = 210 + Math.sin(angle) * radius;
      } else {
        // Categories scattered throughout
        x = 100 + Math.random() * 800;
        y = 80 + Math.random() * 440;
      }
      return {
        id: i,
        text: productCategories[Math.floor(Math.random() * productCategories.length)],
        x: Math.max(50, Math.min(950, x)),
        y: Math.max(50, Math.min(550, y)),
        delay: Math.random() * 2.2
      };
    });
    setFloatingCategories(categories);
  }, []);

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      data-testid="agentic-engine-visual"
    >
      <div className="relative w-full aspect-[16/6.5] min-h-[160px]">
        {/* Background image */}
        <img
          src={brainImage}
          alt="Agentic Deal Procurement"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />

        {/* Animation overlays */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <filter id="coreGlow">
              <feGaussianBlur stdDeviation="8" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="codeGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="categoryGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Breathing Core Glow - Center of Brain */}
          <circle
            cx="485"
            cy="210"
            r="40"
            fill="#00d4ff"
            opacity="0.15"
            filter="url(#coreGlow)"
            style={{
              animation: `coreBreathing 6s ease-in-out infinite`,
            }}
          />
          
          {/* Inner bright core */}
          <circle
            cx="485"
            cy="210"
            r="15"
            fill="#ffffff"
            opacity="0.6"
            filter="url(#coreGlow)"
            style={{
              animation: `innerCorePulse 6s ease-in-out infinite`,
            }}
          />

          {/* Incoming code from random sides into center */}
          {codeDrops.map((drop) => (
            <text
              key={`code-in-${drop.id}`}
              x="485"
              y="210"
              fontSize="12"
              fill={drop.color}
              opacity="0.85"
              fontFamily="monospace"
              textAnchor="middle"
              filter="url(#codeGlow)"
              style={{
                transform: `translate(${drop.startX}px, ${drop.startY}px)`,
                animationName: "codeIngest",
                animationDuration: `${drop.duration}s`,
                animationTimingFunction: "cubic-bezier(0.16, 0.84, 0.24, 1)",
                animationIterationCount: "infinite",
                animationDelay: `${drop.delay}s`,
              }}
            >
              {drop.code}
            </text>
          ))}

          {/* Floating category labels with glow */}
          {floatingCategories.map((cat) => (
            <g key={`cat-${cat.id}`}>
              {/* Background rounded rect for category */}
              <rect
                x={cat.x - 35}
                y={cat.y - 10}
                width="70"
                height="20"
                rx="10"
                fill="#00d4ff"
                opacity="0.1"
                filter="url(#categoryGlow)"
                style={{
                  animation: `categoryPulse 4s ease-in-out infinite`,
                  animationDelay: `${cat.delay}s`,
                }}
              />
              {/* Category text */}
              <text
                x={cat.x}
                y={cat.y + 4}
                fontSize="10"
                fill="#00ff88"
                opacity="0.8"
                fontFamily="sans-serif"
                fontWeight="600"
                textAnchor="middle"
                filter="url(#categoryGlow)"
                style={{
                  animation: `categoryFade 4s ease-in-out infinite`,
                  animationDelay: `${cat.delay}s`,
                }}
              >
                {cat.text}
              </text>
            </g>
          ))}
        </svg>

        {/* Bottom 20% overlay with gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-1/5 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

        {/* Powered By section - positioned in bottom 20% */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          {/* Top gradient divider */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

          {/* Content */}
          <div className="bg-[#0a1628] py-2">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1.5 text-white/90">
                  <Brain className="h-4 w-4 text-[#79d3ff]" />
                  <span className="text-[0.625rem] font-medium">Powered by AI</span>
                </div>
                <div className="flex items-center gap-2 md:gap-4 flex-wrap justify-center text-[0.625rem]">
                  <div className="flex items-center gap-1 text-white/90">
                    <SiReplit className="h-3.5 w-3.5" />
                    <span className="font-medium">Replit</span>
                  </div>
                  <div className="flex items-center gap-1 text-white/90">
                    <SiAnthropic className="h-3.5 w-3.5" />
                    <span className="font-medium">Anthropic</span>
                  </div>
                  <div className="flex items-center gap-1 text-white/90">
                    <SiClaude className="h-3.5 w-3.5" />
                    <span className="font-medium">Claude</span>
                  </div>
                  <div className="flex items-center gap-1 text-white/90">
                    <SiNvidia className="h-3.5 w-3.5" />
                    <span className="font-medium">NVIDIA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom gradient divider */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        </div>
      </div>

      <style>{`
        @keyframes coreBreathing {
          0%, 100% {
            r: 35;
            opacity: 0.08;
          }
          50% {
            r: 50;
            opacity: 0.25;
          }
        }

        @keyframes innerCorePulse {
          0%, 100% {
            r: 12;
            opacity: 0.4;
          }
          50% {
            r: 22;
            opacity: 0.8;
          }
        }

        @keyframes codeIngest {
          0% {
            opacity: 0;
          }
          12% {
            opacity: 0.9;
          }
          72% {
            transform: translate(0px, 0px);
            opacity: 0.85;
          }
          100% {
            transform: translate(0px, 0px);
            opacity: 0;
          }
        }

        @keyframes categoryPulse {
          0%, 100% {
            opacity: 0;
          }
          25% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.15;
          }
          75% {
            opacity: 0.2;
          }
        }

        @keyframes categoryFade {
          0%, 100% {
            opacity: 0;
          }
          25% {
            opacity: 0.9;
          }
          50% {
            opacity: 0.8;
          }
          75% {
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  );
}

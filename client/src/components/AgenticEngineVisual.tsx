import { useEffect, useState } from "react";
import brainImage from "@assets/image_1765086283557.png";
import { Brain } from "lucide-react";
import { SiReplit, SiAnthropic, SiClaude, SiNvidia } from "react-icons/si";

const productCategories = [
  "Credit Cards", "Investing", "Real Estate", "Insurance", "Loans",
  "Banking", "Tax Tools", "Refinancing", "Student Loans", "Crypto"
];

const codeSnippets = [
  "const match = analyze()",
  "const score = compare()",
  "const rank = score()",
  "const winner = optimize()",
  "const result = match()",
  "const data = fetch()",
];

export function AgenticEngineVisual() {
  const [codeDrops, setCodeDrops] = useState<{ id: number; code: string; delay: number; direction: 'up' | 'down' }[]>([]);
  const [floatingCategories, setFloatingCategories] = useState<{ id: number; text: string; x: number; y: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate code drops - cascading up and down from center
    const drops: Array<{ id: number; code: string; delay: number; direction: 'up' | 'down' }> = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      code: codeSnippets[i % codeSnippets.length],
      delay: (i % 6) * 0.2,
      direction: (i < 6 ? 'up' : 'down') as const
    }));
    setCodeDrops(drops);

    // Generate floating categories randomly
    const categories = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      text: productCategories[Math.floor(Math.random() * productCategories.length)],
      x: 100 + Math.random() * 800,
      y: 80 + Math.random() * 440,
      delay: Math.random() * 3
    }));
    setFloatingCategories(categories);
  }, []);

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      data-testid="agentic-engine-visual"
    >
      <div className="relative w-full aspect-[16/9] min-h-[220px]">
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
            cx="500"
            cy="240"
            r="30"
            fill="#00d4ff"
            opacity="0.6"
            filter="url(#coreGlow)"
            style={{
              animation: `coreBreathing 3s ease-in-out infinite`,
            }}
          />
          
          {/* Inner bright core */}
          <circle
            cx="500"
            cy="240"
            r="15"
            fill="#ffffff"
            opacity="0.8"
            filter="url(#coreGlow)"
            style={{
              animation: `innerCorePulse 3s ease-in-out infinite`,
            }}
          />

          {/* Cascading code from center - upward */}
          {codeDrops.filter(d => d.direction === 'up').map((drop, idx) => (
            <text
              key={`code-up-${drop.id}`}
              x="500"
              y="240"
              fontSize="12"
              fill="#00ff88"
              opacity="0.8"
              fontFamily="monospace"
              textAnchor="middle"
              filter="url(#codeGlow)"
              style={{
                animation: `codeCascadeUp 4s ease-in infinite`,
                animationDelay: `${drop.delay}s`,
              }}
            >
              {drop.code}
            </text>
          ))}

          {/* Cascading code from center - downward */}
          {codeDrops.filter(d => d.direction === 'down').map((drop, idx) => (
            <text
              key={`code-down-${drop.id}`}
              x="500"
              y="240"
              fontSize="12"
              fill="#00d4ff"
              opacity="0.8"
              fontFamily="monospace"
              textAnchor="middle"
              filter="url(#codeGlow)"
              style={{
                animation: `codeCascadeDown 4s ease-in infinite`,
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
            r: 25;
            opacity: 0.3;
          }
          50% {
            r: 45;
            opacity: 0.7;
          }
        }

        @keyframes innerCorePulse {
          0%, 100% {
            r: 10;
            opacity: 0.6;
          }
          50% {
            r: 20;
            opacity: 1;
          }
        }

        @keyframes codeCascadeUp {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-150px);
            opacity: 0;
          }
        }

        @keyframes codeCascadeDown {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(150px);
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

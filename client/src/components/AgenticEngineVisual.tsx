import { useEffect, useState } from "react";
import brainImage from "@assets/image_1765086283557.png";
import { Brain } from "lucide-react";
import { SiReplit, SiAnthropic, SiClaude, SiNvidia } from "react-icons/si";

export function AgenticEngineVisual() {
  const [codeDrops, setCodeDrops] = useState<{ id: number; x: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate initial code drops - left and right sides
    const drops = Array.from({ length: 16 }, (_, i) => ({
      id: i,
      x: i < 8 ? 35 + (i % 6) * 8 : 750 + (i % 6) * 8,
      delay: (i % 8) * 0.15,
    }));
    setCodeDrops(drops);
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
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="orbGlow">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Circuit paths inside brain */}
          {/* Horizontal circuits */}
          <line
            x1="420"
            y1="240"
            x2="580"
            y2="240"
            stroke="#00ff88"
            strokeWidth="2"
            opacity="0.4"
            filter="url(#coreGlow)"
            style={{
              animation: `circuitPulse 3s ease-in-out infinite`,
            }}
          />
          <line
            x1="440"
            y1="200"
            x2="560"
            y2="200"
            stroke="#00ff88"
            strokeWidth="2"
            opacity="0.4"
            filter="url(#coreGlow)"
            style={{
              animation: `circuitPulse 3s ease-in-out infinite`,
              animationDelay: "0.3s",
            }}
          />
          <line
            x1="440"
            y1="280"
            x2="560"
            y2="280"
            stroke="#00ff88"
            strokeWidth="2"
            opacity="0.4"
            filter="url(#coreGlow)"
            style={{
              animation: `circuitPulse 3s ease-in-out infinite`,
              animationDelay: "0.6s",
            }}
          />

          {/* Vertical circuits */}
          <line
            x1="500"
            y1="160"
            x2="500"
            y2="320"
            stroke="#00ff88"
            strokeWidth="2"
            opacity="0.4"
            filter="url(#coreGlow)"
            style={{
              animation: `circuitPulse 3s ease-in-out infinite`,
              animationDelay: "0.9s",
            }}
          />
          <line
            x1="460"
            y1="180"
            x2="460"
            y2="300"
            stroke="#00ff88"
            strokeWidth="2"
            opacity="0.4"
            filter="url(#coreGlow)"
            style={{
              animation: `circuitPulse 3s ease-in-out infinite`,
              animationDelay: "1.2s",
            }}
          />
          <line
            x1="540"
            y1="180"
            x2="540"
            y2="300"
            stroke="#00ff88"
            strokeWidth="2"
            opacity="0.4"
            filter="url(#coreGlow)"
            style={{
              animation: `circuitPulse 3s ease-in-out infinite`,
              animationDelay: "1.5s",
            }}
          />

          {/* Diagonal circuits */}
          <line
            x1="440"
            y1="180"
            x2="500"
            y2="240"
            stroke="#00ff88"
            strokeWidth="2"
            opacity="0.4"
            filter="url(#coreGlow)"
            style={{
              animation: `circuitPulse 3s ease-in-out infinite`,
              animationDelay: "1.8s",
            }}
          />
          <line
            x1="560"
            y1="180"
            x2="500"
            y2="240"
            stroke="#00ff88"
            strokeWidth="2"
            opacity="0.4"
            filter="url(#coreGlow)"
            style={{
              animation: `circuitPulse 3s ease-in-out infinite`,
              animationDelay: "2.1s",
            }}
          />

          {/* Circuit nodes (connection points) */}
          {[
            { cx: 500, cy: 240 },
            { cx: 420, cy: 240 },
            { cx: 580, cy: 240 },
            { cx: 500, cy: 160 },
            { cx: 500, cy: 320 },
            { cx: 460, cy: 180 },
            { cx: 540, cy: 180 },
            { cx: 460, cy: 300 },
            { cx: 540, cy: 300 },
          ].map((node, idx) => (
            <circle
              key={`node-${idx}`}
              cx={node.cx}
              cy={node.cy}
              r="4"
              fill="#00ff88"
              opacity="0.6"
              filter="url(#coreGlow)"
              style={{
                animation: `nodePulse 3s ease-in-out infinite`,
                animationDelay: `${(idx * 0.3) % 3}s`,
              }}
            />
          ))}

          {/* Falling code/waterfall from brain */}
          {codeDrops.map((drop) => (
            <g key={`drop-${drop.id}`}>
              {/* Code character */}
              <text
                x={drop.x}
                y="280"
                fontSize="14"
                fill="#00ff88"
                opacity="0.7"
                fontFamily="monospace"
                style={{
                  animation: `codeFall 3s linear infinite`,
                  animationDelay: `${drop.delay}s`,
                }}
              >
                &lt;/&gt;
              </text>
              {/* Secondary streaks */}
              <line
                x1={drop.x + 2}
                y1="290"
                x2={drop.x + 2}
                y2="400"
                stroke="#00d4ff"
                strokeWidth="1"
                opacity="0.4"
                style={{
                  animation: `codeStream 3s ease-in infinite`,
                  animationDelay: `${drop.delay + 0.2}s`,
                }}
              />
            </g>
          ))}

          {/* Glowing orbs outside frame */}
          {/* Top right orb */}
          <circle
            cx="950"
            cy="80"
            r="25"
            fill="#00d4ff"
            opacity="0.3"
            filter="url(#orbGlow)"
            style={{
              animation: `orbGlow 4s ease-in-out infinite`,
            }}
          />

          {/* Bottom left orb */}
          <circle
            cx="30"
            cy="550"
            r="20"
            fill="#00ff88"
            opacity="0.25"
            filter="url(#orbGlow)"
            style={{
              animation: `orbGlow2 5s ease-in-out infinite`,
              animationDelay: "0.5s",
            }}
          />

          {/* Top left orb (subtle) */}
          <circle
            cx="50"
            cy="60"
            r="15"
            fill="#22d3ee"
            opacity="0.2"
            filter="url(#orbGlow)"
            style={{
              animation: `orbGlow 6s ease-in-out infinite`,
              animationDelay: "1s",
            }}
          />
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
        @keyframes corePulse {
          0%, 100% {
            r: 35;
            opacity: 0.3;
          }
          50% {
            r: 45;
            opacity: 0.7;
          }
        }

        @keyframes coreBreathe {
          0%, 100% {
            r: 20;
            opacity: 0.4;
          }
          50% {
            r: 28;
            opacity: 0.8;
          }
        }

        @keyframes codeFall {
          0% {
            transform: translateY(-100px);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(200px);
            opacity: 0;
          }
        }

        @keyframes codeStream {
          0% {
            transform: translateY(-50px);
            opacity: 0;
          }
          20% {
            opacity: 0.6;
          }
          80% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(150px);
            opacity: 0;
          }
        }

        @keyframes orbGlow {
          0%, 100% {
            opacity: 0.2;
            r: 25;
          }
          50% {
            opacity: 0.5;
            r: 32;
          }
        }

        @keyframes orbGlow2 {
          0%, 100% {
            opacity: 0.15;
            r: 20;
          }
          50% {
            opacity: 0.4;
            r: 26;
          }
        }

        @keyframes circuitPulse {
          0%, 100% {
            stroke: #00ff88;
            opacity: 0.2;
            stroke-width: 2;
          }
          50% {
            stroke: #00ff88;
            opacity: 0.8;
            stroke-width: 3;
          }
        }

        @keyframes nodePulse {
          0%, 100% {
            opacity: 0.3;
            r: 4;
          }
          50% {
            opacity: 0.9;
            r: 6;
          }
        }
      `}</style>
    </div>
  );
}

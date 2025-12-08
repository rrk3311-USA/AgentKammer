import { useEffect, useState } from "react";
import brainImage from "@assets/image_1765086283557.png";
import { Zap, Brain, Cpu, Code2, Sparkles } from "lucide-react";
import { SiReplit, SiAnthropic } from "react-icons/si";

export function AgenticEngineVisual() {
  const [activeElements, setActiveElements] = useState<number[]>([]);
  const [pulsingDots, setPulsingDots] = useState<number[]>([]);

  const elements = [
    { id: 1, x: "15%", y: "25%", label: "Networks" },
    { id: 2, x: "50%", y: "35%", label: "Brain" },
    { id: 3, x: "75%", y: "40%", label: "Processing" },
    { id: 4, x: "20%", y: "65%", label: "Data" },
    { id: 5, x: "60%", y: "70%", label: "Circuits" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const numActive = Math.floor(Math.random() * 3) + 1;
      const newActive: number[] = [];

      for (let i = 0; i < numActive; i++) {
        const randomId = Math.floor(Math.random() * elements.length) + 1;
        if (!newActive.includes(randomId)) {
          newActive.push(randomId);
        }
      }

      setActiveElements(newActive);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      const numDots = Math.floor(Math.random() * 4) + 2;
      const newDots: number[] = [];
      for (let i = 0; i < numDots; i++) {
        const randomDot = Math.floor(Math.random() * 12);
        if (!newDots.includes(randomDot)) {
          newDots.push(randomDot);
        }
      }
      setPulsingDots(newDots);
    }, 1500);

    return () => clearInterval(dotInterval);
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

        {/* Animated glowing overlay elements */}
        <div className="absolute inset-0">
          {/* Glow containers for different brain parts */}
          {elements.map((element) => {
            const isActive = activeElements.includes(element.id);
            const delay = element.id * 0.2;

            return (
              <div
                key={element.id}
                className="absolute"
                style={{
                  left: element.x,
                  top: element.y,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* Animated glow pulse */}
                <div
                  className={`w-20 h-20 md:w-32 md:h-32 rounded-full transition-all duration-500 ${
                    isActive
                      ? "bg-cyan-400/20 shadow-lg"
                      : "bg-cyan-400/5 shadow-none"
                  }`}
                  style={{
                    boxShadow: isActive
                      ? `0 0 20px rgba(34, 211, 238, 0.6), inset 0 0 20px rgba(34, 211, 238, 0.3)`
                      : `0 0 5px rgba(34, 211, 238, 0.1)`,
                    animation: isActive
                      ? `glow-pulse 1.5s ease-in-out infinite`
                      : "none",
                    animationDelay: `${delay}s`,
                  }}
                />

                {/* Inner core glow */}
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-500 ${
                    isActive ? "opacity-60" : "opacity-20"
                  }`}
                  style={{
                    background:
                      "radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, rgba(34, 211, 238, 0) 70%)",
                    animation: isActive
                      ? `core-glow 2s ease-in-out infinite`
                      : "none",
                    animationDelay: `${delay}s`,
                  }}
                />
              </div>
            );
          })}

          {/* Connection lines between elements - subtle animated paths */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 600"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <filter id="elementGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="codeStreakGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Animated connecting lines */}
            {elements.map((element, idx) => {
              const nextElement = elements[(idx + 1) % elements.length];
              const isActive = activeElements.includes(element.id) ||
                activeElements.includes(nextElement.id);

              return (
                <line
                  key={`line-${element.id}`}
                  x1={`${parseFloat(element.x)}%`}
                  y1={`${parseFloat(element.y)}%`}
                  x2={`${parseFloat(nextElement.x)}%`}
                  y2={`${parseFloat(nextElement.y)}%`}
                  stroke={isActive ? "#22d3ee" : "#0891b2"}
                  strokeWidth={isActive ? "2" : "1"}
                  opacity={isActive ? 0.6 : 0.15}
                  filter={isActive ? "url(#elementGlow)" : ""}
                  style={{
                    transition: "all 0.5s ease",
                    vectorEffect: "non-scaling-stroke",
                  }}
                />
              );
            })}

            {/* Code streaks coming down from brain */}
            {[0, 1, 2].map((idx) => (
              <line
                key={`streak-${idx}`}
                x1="500"
                y1="210"
                x2={`${450 + idx * 50}`}
                y2="420"
                stroke="#00ff88"
                strokeWidth="2"
                opacity="0.6"
                filter="url(#codeStreakGlow)"
                style={{
                  animation: `codeStreak 2.5s ease-in-out infinite`,
                  animationDelay: `${idx * 0.3}s`,
                }}
              />
            ))}

            {/* Horizontal line through right orb */}
            <line
              x1="800"
              y1="240"
              x2="900"
              y2="240"
              stroke="#00d4ff"
              strokeWidth="2"
              opacity="0.5"
              filter="url(#codeStreakGlow)"
              style={{
                animation: `orbitPulse 2s ease-in-out infinite`,
              }}
            />

            {/* Streaks from right orb */}
            <line
              x1="850"
              y1="240"
              x2="750"
              y2="150"
              stroke="#00d4ff"
              strokeWidth="1.5"
              opacity="0.4"
              style={{
                animation: `orbStreakLeft 2.5s ease-in-out infinite`,
              }}
            />
            <line
              x1="850"
              y1="240"
              x2="750"
              y2="330"
              stroke="#00d4ff"
              strokeWidth="1.5"
              opacity="0.4"
              style={{
                animation: `orbStreakRight 2.5s ease-in-out infinite`,
              }}
            />

            {/* Circuit dots/nodes */}
            {[...Array(12)].map((_, idx) => {
              const angle = (idx / 12) * Math.PI * 2;
              const cx = 500 + Math.cos(angle) * 150;
              const cy = 300 + Math.sin(angle) * 120;
              const isPulsing = pulsingDots.includes(idx);

              return (
                <circle
                  key={`dot-${idx}`}
                  cx={cx}
                  cy={cy}
                  r="4"
                  fill="#22d3ee"
                  opacity={isPulsing ? "0.8" : "0.3"}
                  style={{
                    transition: "opacity 0.5s ease",
                    filter: "url(#elementGlow)",
                  }}
                />
              );
            })}
          </svg>
        </div>

        {/* Fade overlays for edges */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent opacity-70" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent opacity-70" />
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-slate-950 via-slate-950/30 to-transparent opacity-60" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-70" />
        </div>

        {/* Bottom caption - Agentic Deal Procurement Text Only */}
        <div className="absolute bottom-0 left-0 right-0 bg-transparent py-2 px-6 z-20 pointer-events-none">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-cyan-300 font-semibold text-sm md:text-base tracking-wide text-center whitespace-nowrap">
              Agentic Deal Procurement
            </span>
          </div>

          {/* Tech Stack Grid - 4 columns, 3 rows max */}
          <div className="text-center">
            <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto">
              {[
                { icon: Brain, label: 'AI', color: 'text-cyan-400' },
                { icon: SiReplit, label: 'Replit', color: 'text-red-400', isSvg: true },
                { icon: SiAnthropic, label: 'Anthropic', color: 'text-purple-400', isSvg: true },
                { icon: Code2, label: 'Claude', color: 'text-amber-400' },
                { icon: Cpu, label: 'NVIDIA', color: 'text-green-400' },
                { icon: Sparkles, label: 'Grok', color: 'text-yellow-400' },
                { icon: Zap, label: 'LLM API', color: 'text-blue-400' },
                { icon: Code2, label: 'API', color: 'text-lime-400' },
              ].map((tech, idx) => {
                const IconComponent = tech.icon;
                return (
                  <div key={idx} className="flex flex-col items-center gap-0.5">
                    <div className={`${tech.color}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <span className="text-white/70 text-xs font-medium">{tech.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes glow-pulse {
            0%, 100% {
              box-shadow: 0 0 10px rgba(34, 211, 238, 0.4), inset 0 0 15px rgba(34, 211, 238, 0.2);
              transform: scale(1);
            }
            50% {
              box-shadow: 0 0 35px rgba(34, 211, 238, 0.9), inset 0 0 35px rgba(34, 211, 238, 0.6);
              transform: scale(1.08);
            }
          }

          @keyframes core-glow {
            0%, 100% {
              opacity: 0.4;
            }
            50% {
              opacity: 0.9;
            }
          }

          @keyframes codeStreak {
            0% {
              opacity: 0;
              transform: translateY(-30px);
            }
            30% {
              opacity: 0.8;
            }
            70% {
              opacity: 0.8;
            }
            100% {
              opacity: 0;
              transform: translateY(100px);
            }
          }

          @keyframes orbitPulse {
            0%, 100% {
              stroke-width: 2;
              opacity: 0.4;
            }
            50% {
              stroke-width: 3;
              opacity: 0.8;
            }
          }

          @keyframes orbStreakLeft {
            0% {
              opacity: 0;
              x1: 850;
              y1: 240;
            }
            50% {
              opacity: 0.6;
            }
            100% {
              opacity: 0;
              x1: 700;
              y1: 120;
            }
          }

          @keyframes orbStreakRight {
            0% {
              opacity: 0;
              x1: 850;
              y1: 240;
            }
            50% {
              opacity: 0.6;
            }
            100% {
              opacity: 0;
              x1: 700;
              y1: 360;
            }
          }

          @keyframes pixelFloat {
            0%, 100% {
              transform: translateY(0px);
              opacity: 0.6;
            }
            25% {
              transform: translateY(-2px);
              opacity: 0.8;
            }
            50% {
              transform: translateY(2px);
              opacity: 0.5;
            }
            75% {
              transform: translateY(-1px);
              opacity: 0.7;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

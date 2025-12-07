import { useEffect, useState } from "react";
import brainImage from "@assets/image_1765086283557.png";

export function AgenticEngineVisual() {
  const [activeElements, setActiveElements] = useState<number[]>([]);

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
          </svg>
        </div>

        {/* Fade overlays for edges */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent opacity-70" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent opacity-70" />
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-slate-950 via-slate-950/30 to-transparent opacity-60" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-70" />
        </div>

        {/* Bottom caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950 py-3 px-6 z-20 pointer-events-none">
          <div className="flex items-center justify-center gap-3">
            <div className="w-2 h-2 rounded-full animate-pulse bg-cyan-400" />
            <span className="text-cyan-300 font-semibold text-sm md:text-base tracking-wide text-center">
              <span className="hidden sm:inline">Agentic Deal Procurement</span>
              <span className="sm:hidden">Agentic AI Engine</span>
            </span>
            <div className="w-2 h-2 rounded-full animate-pulse bg-cyan-400" />
          </div>
        </div>

        <style>{`
          @keyframes glow-pulse {
            0%, 100% {
              box-shadow: 0 0 5px rgba(34, 211, 238, 0.2), inset 0 0 10px rgba(34, 211, 238, 0.1);
              transform: scale(1);
            }
            50% {
              box-shadow: 0 0 25px rgba(34, 211, 238, 0.7), inset 0 0 25px rgba(34, 211, 238, 0.4);
              transform: scale(1.05);
            }
          }

          @keyframes core-glow {
            0%, 100% {
              opacity: 0.3;
            }
            50% {
              opacity: 0.7;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

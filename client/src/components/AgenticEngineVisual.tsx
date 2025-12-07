import { useEffect, useState } from "react";
import robotImage from "@assets/image_1765082751115.png";

export function AgenticEngineVisual() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pulseIntensity, setPulseIntensity] = useState(0);
  const [eyeSymbol, setEyeSymbol] = useState("$");
  const [eyeFlicker, setEyeFlicker] = useState(false);
  const [eyeRightSymbol, setEyeRightSymbol] = useState("✓");
  const [eyeRightFlicker, setEyeRightFlicker] = useState(false);

  const categories = [
    { label: "Credit Cards", shortLabel: "Credit" },
    { label: "Real Estate", shortLabel: "Real Estate" },
    { label: "Refinancing", shortLabel: "Refinancing" },
    { label: "Investing", shortLabel: "Investing" },
    { label: "Insurance", shortLabel: "Insurance" },
  ];

  const eyeSymbols = ["$", "%", "+", "OK", "$$", "01", "10", ">>", "UP", "GO", "☮", "₿"];
  const eyeRightSymbols = ["✓", "⟿", "≡", "~", "⊙", "◐", "◑", "◒", "⋯", "⟿"];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length);
      setPulseIntensity(1);
      setTimeout(() => setPulseIntensity(0), 600);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const flickerInterval = setInterval(() => {
      setEyeFlicker(true);
      setEyeRightFlicker(true);
      setEyeSymbol(eyeSymbols[Math.floor(Math.random() * eyeSymbols.length)]);
      setEyeRightSymbol(eyeRightSymbols[Math.floor(Math.random() * eyeRightSymbols.length)]);
      setTimeout(() => {
        setEyeFlicker(false);
        setEyeRightFlicker(false);
      }, 150);
    }, 800 + Math.random() * 400);

    return () => clearInterval(flickerInterval);
  }, []);

  return (
    <div 
      className="relative w-full rounded-2xl overflow-hidden" 
      data-testid="agentic-engine-visual"
    >
      <div className="relative w-full aspect-[16/9] min-h-[220px] bg-gradient-to-b from-slate-950 via-[#0a1628] to-slate-900">
        
        {/* Robot background image - zoomed and blurred */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={robotImage} 
            alt="Agent Kammer AI Background" 
            className="w-full h-full object-cover"
            style={{
              transform: 'scale(1.1)',
              filter: 'blur(18px)',
              opacity: 0.45,
            }}
            loading="eager"
          />
          {/* Subtle fade out edges */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/40 to-[#0a1628]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/20 via-transparent to-[#0a1628]/20" />
        </div>

        {/* Orbital rings background */}
        <div className="absolute inset-0 flex items-center justify-center z-5">
          <div className="absolute w-[260px] h-[260px] md:w-[310px] md:h-[310px] rounded-full border border-[#d4af37]/25" />
          <div className="absolute w-[310px] h-[310px] md:w-[385px] md:h-[385px] rounded-full border border-[#d4af37]/20" />
          <div className="absolute w-[360px] h-[360px] md:w-[460px] md:h-[460px] rounded-full border border-[#d4af37]/15" />
          <div className="absolute w-[410px] h-[410px] md:w-[535px] md:h-[535px] rounded-full border border-blue-500/12" />
          <div className="absolute w-[460px] h-[460px] md:w-[610px] md:h-[610px] rounded-full border border-blue-500/8" />
        </div>

        {/* Cascading category text - waterfall effect */}
        <div className="absolute inset-0 overflow-hidden flex items-center justify-center z-10">
          <div className="relative w-full h-full">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="absolute left-1/2 text-center"
                style={{
                  transform: 'translateX(-50%)',
                  animation: `waterfall ${15 + i * 2}s linear infinite`,
                  animationDelay: `${i * 1.5}s`,
                  opacity: 0.8,
                }}
              >
                <span 
                  className={`font-semibold whitespace-nowrap inline-block transition-all duration-500 ${
                    activeIndex === i 
                      ? 'text-[#d4af37] text-lg md:text-xl scale-110' 
                      : 'text-white/40 text-base md:text-lg scale-100'
                  }`}
                  style={{
                    textShadow: activeIndex === i ? '0 0 12px rgba(212,175,55,0.8)' : 'none',
                  }}
                >
                  {cat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Radial glow behind robot */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[320px] md:h-[320px] rounded-full transition-all duration-500 z-15"
          style={{
            background: `radial-gradient(circle, rgba(10,22,40,0.95) 0%, rgba(10,22,40,0.8) 40%, transparent 70%)`,
          }}
        />

        {/* Robot Agent - Front and center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="relative">
            <div 
              className="absolute -inset-4 md:-inset-6 rounded-full opacity-60"
              style={{
                background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 60%)',
                animation: 'brainPulse 3s ease-in-out infinite',
              }}
            />
            
            {/* Robot image - larger display */}
            <img 
              src={robotImage} 
              alt="Agent Kammer AI" 
              className="w-[160px] h-[160px] md:w-[200px] md:h-[200px] object-cover rounded-full"
              style={{
                boxShadow: `0 0 ${20 + pulseIntensity * 30}px rgba(59,130,246,${0.4 + pulseIntensity * 0.3}), 0 0 ${40 + pulseIntensity * 20}px rgba(212,175,55,0.2)`,
                border: '3px solid rgba(212,175,55,0.4)',
              }}
              loading="eager"
            />

            {/* Monocle with chain */}
            <div 
              className="absolute pointer-events-none"
              style={{
                left: '18%',
                top: '36%',
              }}
            >
              {/* Metallic monocle frame */}
              <div 
                className="absolute"
                style={{
                  left: '-6px',
                  top: '-6px',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 30% 30%, #e8d5b7, #b8860b, #8b6914)',
                  boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.4), inset 2px 2px 4px rgba(255,255,255,0.2), 0 4px 8px rgba(0,0,0,0.6)',
                  border: '2px solid rgba(139, 105, 20, 0.8)',
                }}
              />

              {/* Chain connecting to monocle */}
              <svg 
                width="60" 
                height="30" 
                className="absolute"
                style={{
                  left: '-24px',
                  top: '-20px',
                  pointerEvents: 'none',
                }}
              >
                <path
                  d="M 10,15 Q 25,5 45,10"
                  stroke="url(#chainGradient)"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.7"
                />
                <defs>
                  <linearGradient id="chainGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#d4af37" />
                    <stop offset="50%" stopColor="#8b6914" />
                    <stop offset="100%" stopColor="#d4af37" />
                  </linearGradient>
                </defs>
                {/* Chain links pattern */}
                {[0, 8, 16, 24, 32, 40].map((x) => (
                  <circle key={x} cx={10 + x} cy={12} r="1.5" fill="#d4af37" opacity="0.6" />
                ))}
              </svg>

              {/* Left Digital eye - inside monocle */}
              <div 
                className={`absolute w-9 h-9 flex items-center justify-center rounded-full overflow-hidden transition-all duration-75 ${
                  eyeFlicker ? 'opacity-100' : 'opacity-65'
                }`}
                style={{
                  left: '-3px',
                  top: '-3px',
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(10,22,40,0.6) 100%)',
                  border: '1px solid rgba(59,130,246,0.4)',
                }}
              >
                <span 
                  className="font-mono font-bold text-[10px] tracking-tight leading-none"
                  style={{
                    color: eyeFlicker ? '#00ff00' : '#3b82f6',
                    textShadow: eyeFlicker 
                      ? '0 0 8px #00ff00, 0 0 12px #00ff00' 
                      : '0 0 6px #3b82f6, 0 0 10px #3b82f6',
                  }}
                >
                  {eyeSymbol}
                </span>
              </div>
              <div 
                className="absolute inset-0 pointer-events-none opacity-25 rounded-full"
                style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 3px)',
                }}
              />
            </div>

            {/* Right Digital eye overlay - scanning mode */}
            <div 
              className="absolute pointer-events-none"
              style={{
                right: '20%',
                top: '40%',
                width: '36px',
                height: '36px',
              }}
            >
              <div 
                className={`w-full h-full flex items-center justify-center rounded-lg overflow-hidden transition-all duration-75 ${
                  eyeRightFlicker ? 'opacity-100' : 'opacity-65'
                }`}
                style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(10,22,40,0.6) 100%)',
                  border: '1px solid rgba(212,175,55,0.4)',
                }}
              >
                <span 
                  className="font-mono font-bold text-xs tracking-tight leading-none"
                  style={{
                    color: eyeRightFlicker ? '#fbbf24' : '#d4af37',
                    textShadow: eyeRightFlicker 
                      ? '0 0 8px #fbbf24, 0 0 12px #fbbf24' 
                      : '0 0 6px #d4af37, 0 0 10px #d4af37',
                  }}
                >
                  {eyeRightSymbol}
                </span>
              </div>
              <div 
                className="absolute inset-0 pointer-events-none opacity-25 rounded-lg"
                style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 3px)',
                }}
              />
            </div>

            {/* Sophisticated Bowtie */}
            <div 
              className="absolute pointer-events-none"
              style={{
                left: '50%',
                bottom: '-12px',
                transform: 'translateX(-50%)',
              }}
            >
              <svg width="48" height="24" viewBox="0 0 48 24">
                {/* Center knot */}
                <rect x="22" y="8" width="4" height="8" fill="#d4af37" opacity="0.9" />
                {/* Left bow */}
                <ellipse cx="14" cy="12" rx="10" ry="6" fill="#b8860b" opacity="0.85" />
                <ellipse cx="14" cy="12" rx="8" ry="5" fill="#d4af37" opacity="0.8" />
                {/* Right bow */}
                <ellipse cx="34" cy="12" rx="10" ry="6" fill="#b8860b" opacity="0.85" />
                <ellipse cx="34" cy="12" rx="8" ry="5" fill="#d4af37" opacity="0.8" />
                {/* Shading */}
                <ellipse cx="14" cy="10" rx="6" ry="2" fill="#f4d03f" opacity="0.3" />
                <ellipse cx="34" cy="10" rx="6" ry="2" fill="#f4d03f" opacity="0.3" />
              </svg>
            </div>

            {/* Thinking dots */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-1">
              {[0, 1, 2].map((i) => (
                <div 
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"
                  style={{
                    animation: `thinkDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Animation styles */}
        <style>{`
          @keyframes waterfall {
            0% {
              top: -60px;
              opacity: 0;
            }
            20% {
              opacity: 0.8;
            }
            80% {
              opacity: 0.8;
            }
            100% {
              top: 100%;
              opacity: 0;
            }
          }

          @keyframes brainPulse {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.1); opacity: 0.8; }
          }
          
          @keyframes thinkDot {
            0%, 100% { opacity: 0.3; transform: translateY(0); }
            50% { opacity: 1; transform: translateY(-3px); }
          }

          @keyframes pixelFlicker {
            0%, 100% { opacity: 0.9; }
            50% { opacity: 1; }
          }
        `}</style>

        {/* Bottom caption bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/95 to-[#0a1628] py-2.5 md:py-3 px-4 md:px-6 z-30">
          <div className="flex items-center justify-center gap-2 md:gap-3">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse shrink-0 bg-[#0b9c26]" />
            <span className="text-[#d4af37] font-semibold text-xs md:text-base tracking-wide text-center">
              Agentic Deal Procurement
            </span>
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse shrink-0 bg-[#0b9c26]" />
          </div>
        </div>
      </div>
    </div>
  );
}

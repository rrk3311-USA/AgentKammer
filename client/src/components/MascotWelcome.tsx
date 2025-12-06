export function MascotWelcome() {
  return (
    <div className="relative w-full h-96 overflow-hidden flex items-center justify-center">
      <svg
        viewBox="0 0 300 400"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <style>{`
            @keyframes fightingIdle {
              0%, 100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-20px);
              }
            }

            @keyframes canePoint {
              0% {
                transform: rotate(-15deg);
              }
              50% {
                transform: rotate(-5deg);
              }
              100% {
                transform: rotate(-15deg);
              }
            }

            .character-body {
              animation: fightingIdle 2.5s ease-in-out infinite;
            }

            .cane-group {
              animation: canePoint 2s ease-in-out infinite;
              transform-origin: 150px 140px;
            }
          `}</style>

          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d4a574" />
            <stop offset="50%" stopColor="#c89968" />
            <stop offset="100%" stopColor="#a0714d" />
          </linearGradient>

          <linearGradient id="darkSuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="50%" stopColor="#0d0d0d" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>

          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f4d03f" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#aa8c2c" />
          </linearGradient>

          <radialGradient id="shirtGrad">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e8e8e8" />
          </radialGradient>

          <filter id="realisticShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="3" dy="10" stdDeviation="5" floodOpacity="0.4" />
          </filter>

          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Shadow base */}
        <ellipse cx="150" cy="360" rx="90" ry="20" fill="black" opacity="0.2" />

        {/* Main character body */}
        <g className="character-body" filter="url(#realisticShadow)">
          {/* Legs - darker suit */}
          <rect x="130" y="280" width="20" height="70" fill="url(#darkSuitGrad)" stroke="#000" strokeWidth="1.5" rx="4" />
          <rect x="150" y="280" width="20" height="70" fill="url(#darkSuitGrad)" stroke="#000" strokeWidth="1.5" rx="4" />

          {/* Shoes */}
          <rect x="128" y="345" width="24" height="12" fill="#0a0a0a" stroke="#000" strokeWidth="1" rx="2" />
          <rect x="148" y="345" width="24" height="12" fill="#0a0a0a" stroke="#000" strokeWidth="1" rx="2" />

          {/* Body/Torso - suit jacket */}
          <path
            d="M 120 200 L 115 260 L 135 275 L 165 275 L 185 260 L 180 200 Q 150 190 120 200 Z"
            fill="url(#darkSuitGrad)"
            stroke="#000"
            strokeWidth="2"
          />

          {/* White dress shirt */}
          <path
            d="M 135 210 L 130 250 L 145 260 L 155 260 L 170 250 L 165 210 Q 150 205 135 210 Z"
            fill="url(#shirtGrad)"
            stroke="#ccc"
            strokeWidth="1"
          />

          {/* Gold vest/waistcoat */}
          <rect x="142" y="235" width="16" height="25" fill="url(#goldGrad)" stroke="#8b6914" strokeWidth="1.5" rx="2" />

          {/* Gold vest buttons */}
          <circle cx="150" cy="243" r="1.5" fill="#ffd700" filter="url(#glow)" />
          <circle cx="150" cy="252" r="1.5" fill="#ffd700" filter="url(#glow)" />

          {/* Left arm - relaxed at side */}
          <ellipse cx="115" cy="225" rx="12" ry="50" fill="url(#skinGrad)" stroke="#5d4e37" strokeWidth="1.5" />

          {/* Left hand */}
          <circle cx="112" cy="280" r="10" fill="url(#skinGrad)" stroke="#5d4e37" strokeWidth="1.5" />

          {/* Right arm - extended gesture */}
          <ellipse cx="190" cy="220" rx="12" ry="55" fill="url(#skinGrad)" stroke="#5d4e37" strokeWidth="1.5" opacity="0.95" />

          {/* Right hand pointing */}
          <circle cx="198" cy="160" r="11" fill="url(#skinGrad)" stroke="#5d4e37" strokeWidth="1.5" />

          {/* Neck */}
          <rect x="140" y="190" width="20" height="18" fill="url(#skinGrad)" stroke="#5d4e37" strokeWidth="1" />

          {/* Head - detailed realistic face */}
          <circle cx="150" cy="155" r="35" fill="url(#skinGrad)" stroke="#5d4e37" strokeWidth="2" />

          {/* Hair - dark, slicked back */}
          <path
            d="M 125 135 Q 125 110 150 105 Q 175 110 175 135 Q 175 110 150 98 Q 127 103 125 135 Z"
            fill="#1a1410"
            stroke="#0d0a08"
            strokeWidth="1.5"
          />

          {/* Left eye - intense gaze toward offers */}
          <circle cx="138" cy="150" r="5" fill="#2c2416" stroke="#000" strokeWidth="1" />
          <circle cx="139" cy="148" r="2" fill="white" opacity="0.85" />

          {/* Right eye */}
          <circle cx="162" cy="150" r="5" fill="#2c2416" stroke="#000" strokeWidth="1" />
          <circle cx="163" cy="148" r="2" fill="white" opacity="0.85" />

          {/* Eyebrows - determined expression */}
          <path d="M 132 140 Q 138 137 144 140" stroke="#0d0a08" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 156 140 Q 162 137 168 140" stroke="#0d0a08" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Nose - defined */}
          <path d="M 150 145 L 150 162" stroke="#8b7355" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* Mouth - confident smirk */}
          <path d="M 140 168 Q 150 173 160 168" stroke="#3d2a1f" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Defined jaw/chin shadow */}
          <path d="M 128 175 Q 150 185 172 175" stroke="#8b7355" strokeWidth="1" opacity="0.6" fill="none" strokeLinecap="round" />

          {/* Top Hat - sleek design */}
          <rect x="120" y="95" width="60" height="18" fill="#000" stroke="#000" strokeWidth="1" rx="2" />
          <path
            d="M 128 95 L 133 70 Q 150 60 167 70 L 172 95 Z"
            fill="#0d0d0d"
            stroke="#000"
            strokeWidth="1.5"
          />

          {/* Hat band - gold accent */}
          <rect x="120" y="110" width="60" height="3" fill="url(#goldGrad)" filter="url(#glow)" />

          {/* Hat shine */}
          <ellipse cx="150" cy="68" rx="12" ry="5" fill="white" opacity="0.15" />
        </g>

        {/* Cane - Gold handled walking stick gesturing toward right */}
        <g className="cane-group" filter="url(#realisticShadow)">
          {/* Cane shaft */}
          <line x1="195" y1="160" x2="245" y2="240" stroke="#2d2d2d" strokeWidth="4" strokeLinecap="round" />

          {/* Gold ball handle */}
          <circle cx="195" cy="160" r="12" fill="url(#goldGrad)" stroke="#8b6914" strokeWidth="2" filter="url(#glow)" />

          {/* Gold ball shine */}
          <circle cx="200" cy="155" r="4" fill="white" opacity="0.4" />

          {/* Cane tip */}
          <circle cx="245" cy="240" r="3" fill="#1a1a1a" stroke="#000" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}

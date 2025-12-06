export function MascotWelcome() {
  return (
    <div className="relative w-full h-64 mb-8 overflow-hidden flex items-center justify-center">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full max-w-md"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <style>{`
            @keyframes bobbing {
              0%, 100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-15px);
              }
            }

            @keyframes armWave {
              0% {
                transform: rotateZ(-20deg);
              }
              50% {
                transform: rotateZ(20deg);
              }
              100% {
                transform: rotateZ(-20deg);
              }
            }

            @keyframes headTilt {
              0%, 100% {
                transform: rotateZ(0deg);
              }
              50% {
                transform: rotateZ(-5deg);
              }
            }

            .mascot-body {
              animation: bobbing 3s ease-in-out infinite;
            }

            .mascot-arm-right {
              animation: armWave 2s ease-in-out infinite;
              transform-origin: 160px 90px;
            }

            .mascot-head {
              animation: headTilt 3s ease-in-out infinite;
              transform-origin: 200px 60px;
            }

            .tophat {
              animation: bobbing 3s ease-in-out infinite;
            }
          `}</style>

          <linearGradient id="skinTone" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f5deb3" />
            <stop offset="100%" stopColor="#daa520" />
          </linearGradient>

          <linearGradient id="jacketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2d2d2d" />
            <stop offset="50%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#0d0d0d" />
          </linearGradient>

          <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f0f0f0" />
          </linearGradient>

          <filter id="mascotShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="8" stdDeviation="4" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Shadow under feet */}
        <ellipse cx="200" cy="280" rx="80" ry="12" fill="black" opacity="0.15" />

        {/* Body group with bobbing */}
        <g className="mascot-body" filter="url(#mascotShadow)">
          {/* Jacket */}
          <path
            d="M 160 120 Q 140 140 135 200 L 140 280 Q 140 290 150 290 L 250 290 Q 260 290 260 280 L 265 200 Q 260 140 240 120 Z"
            fill="url(#jacketGrad)"
            stroke="#0d0d0d"
            strokeWidth="2"
          />

          {/* White shirt front */}
          <rect x="180" y="130" width="40" height="80" fill="url(#shirtGrad)" stroke="#ddd" strokeWidth="1" rx="4" />

          {/* Waistcoat details */}
          <line x1="200" y1="130" x2="200" y2="210" stroke="#d4af37" strokeWidth="2" opacity="0.8" />
          <circle cx="200" cy="145" r="3" fill="#d4af37" opacity="0.9" />
          <circle cx="200" cy="160" r="3" fill="#d4af37" opacity="0.9" />
          <circle cx="200" cy="175" r="3" fill="#d4af37" opacity="0.9" />

          {/* Bow tie */}
          <ellipse cx="185" cy="128" rx="8" ry="5" fill="#d4af37" />
          <ellipse cx="215" cy="128" rx="8" ry="5" fill="#d4af37" />
          <rect x="192" y="125" width="16" height="6" fill="#d4af37" />

          {/* Left arm */}
          <ellipse
            cx="150"
            cy="145"
            rx="18"
            ry="45"
            fill="url(#skinTone)"
            stroke="#c9a961"
            strokeWidth="2"
            opacity="0.95"
          />

          {/* Right arm - waving */}
          <g className="mascot-arm-right">
            <ellipse
              cx="250"
              cy="145"
              rx="18"
              ry="45"
              fill="url(#skinTone)"
              stroke="#c9a961"
              strokeWidth="2"
              opacity="0.95"
            />

            {/* Right hand */}
            <circle cx="250" cy="85" r="16" fill="url(#skinTone)" stroke="#c9a961" strokeWidth="2" />

            {/* Fingers */}
            <circle cx="242" cy="78" r="4" fill="url(#skinTone)" stroke="#c9a961" strokeWidth="1" />
            <circle cx="258" cy="78" r="4" fill="url(#skinTone)" stroke="#c9a961" strokeWidth="1" />
          </g>

          {/* Left hand */}
          <circle cx="150" cy="200" r="16" fill="url(#skinTone)" stroke="#c9a961" strokeWidth="2" />

          {/* Head group with tilt */}
          <g className="mascot-head">
            {/* Neck */}
            <rect x="190" y="100" width="20" height="20" fill="url(#skinTone)" stroke="#c9a961" strokeWidth="2" />

            {/* Head */}
            <circle cx="200" cy="70" r="32" fill="url(#skinTone)" stroke="#c9a961" strokeWidth="2.5" />

            {/* Eyes */}
            <circle cx="190" cy="65" r="4" fill="#333" />
            <circle cx="210" cy="65" r="4" fill="#333" />

            {/* Eye shine */}
            <circle cx="191" cy="63" r="1.5" fill="white" opacity="0.8" />
            <circle cx="211" cy="63" r="1.5" fill="white" opacity="0.8" />

            {/* Smile - classic claymation grin */}
            <path d="M 190 80 Q 200 88 210 80" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Nose */}
            <circle cx="200" cy="72" r="2.5" fill="#c9a961" opacity="0.7" />

            {/* Cheeks - subtle blush */}
            <circle cx="175" cy="72" r="6" fill="#d4af37" opacity="0.2" />
            <circle cx="225" cy="72" r="6" fill="#d4af37" opacity="0.2" />

            {/* Hair */}
            <path
              d="M 168 45 Q 168 35 200 30 Q 232 35 232 45 Q 232 35 200 28 Q 170 33 168 45 Z"
              fill="#3d3d3d"
              stroke="#2d2d2d"
              strokeWidth="1.5"
            />
          </g>

          {/* Top Hat */}
          <g className="tophat">
            {/* Hat brim */}
            <ellipse cx="200" cy="35" rx="40" ry="8" fill="#0d0d0d" stroke="#000" strokeWidth="2" />

            {/* Hat crown */}
            <path
              d="M 180 35 L 185 15 Q 200 5 215 15 L 220 35 Z"
              fill="#1a1a1a"
              stroke="#000"
              strokeWidth="2"
            />

            {/* Hat top highlight */}
            <ellipse cx="200" cy="12" rx="15" ry="4" fill="#2d2d2d" opacity="0.6" />

            {/* Gold band */}
            <rect x="175" y="33" width="50" height="4" fill="#d4af37" opacity="0.9" />
          </g>
        </g>

        {/* Welcome text with glow */}
        <text
          x="200"
          y="320"
          textAnchor="middle"
          fontSize="18"
          fontWeight="bold"
          fill="#d4af37"
          fontFamily="serif"
          opacity="0.8"
        >
          Welcome, Distinguished Buyer
        </text>
      </svg>
    </div>
  );
}

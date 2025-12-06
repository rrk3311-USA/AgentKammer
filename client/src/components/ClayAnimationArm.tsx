export function ClayAnimationArm() {
  return (
    <div className="relative w-full h-48 mb-8 overflow-hidden">
      <svg
        viewBox="0 0 1200 300"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <style>{`
            @keyframes armSlideIn {
              0% {
                transform: translateX(-400px);
              }
              100% {
                transform: translateX(0);
              }
            }

            @keyframes fingerGrip {
              0% {
                transform: scaleX(1);
              }
              50% {
                transform: scaleX(0.85);
              }
              100% {
                transform: scaleX(0.85);
              }
            }

            .arm-group {
              animation: armSlideIn 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
              transform-origin: 600px 150px;
            }

            .finger-top {
              animation: fingerGrip 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
              transform-origin: 550px 80px;
            }

            .finger-bottom {
              animation: fingerGrip 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
              transform-origin: 550px 220px;
            }
          `}</style>

          <linearGradient id="armGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d9d9d9" />
            <stop offset="50%" stopColor="#e8e8e8" />
            <stop offset="100%" stopColor="#c0c0c0" />
          </linearGradient>

          <linearGradient id="plaqueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e8e8e8" />
            <stop offset="50%" stopColor="#c0c0c0" />
            <stop offset="100%" stopColor="#a8a8a8" />
          </linearGradient>

          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="4" dy="4" stdDeviation="6" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Plaque (silver backing) */}
        <g filter="url(#shadow)">
          <rect
            x="200"
            y="90"
            width="800"
            height="140"
            rx="12"
            fill="url(#plaqueGradient)"
            stroke="#999"
            strokeWidth="2"
          />
          <rect
            x="210"
            y="100"
            width="780"
            height="120"
            rx="8"
            fill="#f0f0f0"
            stroke="#ddd"
            strokeWidth="1"
          />
        </g>

        {/* Arm group coming from left */}
        <g className="arm-group">
          {/* Forearm */}
          <ellipse
            cx="350"
            cy="150"
            rx="180"
            ry="52"
            fill="url(#armGradient)"
            stroke="#999"
            strokeWidth="2"
            filter="url(#shadow)"
          />

          {/* Wrist curve */}
          <circle
            cx="520"
            cy="140"
            r="48"
            fill="url(#armGradient)"
            stroke="#999"
            strokeWidth="2"
            filter="url(#shadow)"
          />

          {/* Hand base */}
          <ellipse
            cx="580"
            cy="150"
            rx="70"
            ry="65"
            fill="url(#armGradient)"
            stroke="#999"
            strokeWidth="2"
            filter="url(#shadow)"
          />

          {/* Top finger */}
          <g className="finger-top">
            <ellipse
              cx="620"
              cy="85"
              rx="45"
              ry="38"
              fill="url(#armGradient)"
              stroke="#999"
              strokeWidth="2"
              filter="url(#shadow)"
            />
            <circle
              cx="655"
              cy="70"
              r="20"
              fill="url(#armGradient)"
              stroke="#999"
              strokeWidth="2"
            />
          </g>

          {/* Bottom finger */}
          <g className="finger-bottom">
            <ellipse
              cx="620"
              cy="215"
              rx="45"
              ry="38"
              fill="url(#armGradient)"
              stroke="#999"
              strokeWidth="2"
              filter="url(#shadow)"
            />
            <circle
              cx="655"
              cy="230"
              r="20"
              fill="url(#armGradient)"
              stroke="#999"
              strokeWidth="2"
            />
          </g>
        </g>

        {/* Subtle highlight on plaque */}
        <ellipse
          cx="600"
          cy="110"
          rx="250"
          ry="20"
          fill="white"
          opacity="0.15"
        />
      </svg>

      {/* Gradient fade for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

export function LuxuryBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="luxury-circles" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(42,88,145,0.15)" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(42,88,145,0.08)" strokeWidth="0.5" />
          </pattern>
          
          <pattern id="luxury-grid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(42,88,145,0.05)" strokeWidth="0.5" />
          </pattern>

          <radialGradient id="luxury-glow-1" cx="30%" cy="30%">
            <stop offset="0%" stopColor="rgba(42,88,145,0.2)" />
            <stop offset="100%" stopColor="rgba(42,88,145,0)" />
          </radialGradient>

          <radialGradient id="luxury-glow-2" cx="70%" cy="70%">
            <stop offset="0%" stopColor="rgba(42,88,145,0.15)" />
            <stop offset="100%" stopColor="rgba(42,88,145,0)" />
          </radialGradient>

          <linearGradient id="luxury-accent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(184,134,11,0.05)" />
            <stop offset="100%" stopColor="rgba(42,88,145,0.05)" />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#luxury-circles)" />
        <rect width="100%" height="100%" fill="url(#luxury-glow-1)" />
        <rect width="100%" height="100%" fill="url(#luxury-glow-2)" />
        
        <g opacity="0.4">
          <circle cx="15%" cy="20%" r="120" fill="none" stroke="rgba(42,88,145,0.1)" strokeWidth="1" />
          <circle cx="85%" cy="80%" r="150" fill="none" stroke="rgba(42,88,145,0.08)" strokeWidth="1" />
          <circle cx="50%" cy="50%" r="200" fill="none" stroke="rgba(42,88,145,0.06)" strokeWidth="0.5" />
        </g>

        <path d="M 0 50 Q 25 40, 50 50 T 100 50" stroke="rgba(184,134,11,0.08)" strokeWidth="0.5" fill="none" opacity="0.6" />
        <path d="M 0 80 Q 25 70, 50 80 T 100 80" stroke="rgba(184,134,11,0.06)" strokeWidth="0.5" fill="none" opacity="0.5" transform="translate(0, 100)" />
      </svg>

      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-tl from-primary/5 to-transparent blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/3 to-transparent blur-3xl" />
    </div>
  );
}

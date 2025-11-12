export function AnimatedBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <style>{`
        @keyframes pulse-line {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        @keyframes pulse-node {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.2); opacity: 0.4; }
        }
        .data-line {
          animation: pulse-line 4s ease-in-out infinite;
        }
        .data-node {
          animation: pulse-node 3s ease-in-out infinite;
        }
        @media (prefers-reduced-motion) {
          .data-line, .data-node {
            animation: none;
          }
        }
      `}</style>
      
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <line
          className="data-line"
          x1="10%"
          y1="20%"
          x2="90%"
          y2="20%"
          stroke="#d4af37"
          strokeWidth="1"
          style={{ animationDelay: '0s' }}
        />
        <line
          className="data-line"
          x1="10%"
          y1="50%"
          x2="90%"
          y2="50%"
          stroke="#d4af37"
          strokeWidth="1"
          style={{ animationDelay: '1s' }}
        />
        <line
          className="data-line"
          x1="10%"
          y1="80%"
          x2="90%"
          y2="80%"
          stroke="#d4af37"
          strokeWidth="1"
          style={{ animationDelay: '2s' }}
        />
        
        <circle className="data-node" cx="20%" cy="20%" r="3" fill="#d4af37" style={{ animationDelay: '0.5s' }} />
        <circle className="data-node" cx="50%" cy="50%" r="3" fill="#d4af37" style={{ animationDelay: '1.5s' }} />
        <circle className="data-node" cx="80%" cy="80%" r="3" fill="#d4af37" style={{ animationDelay: '2.5s' }} />
      </svg>
    </div>
  );
}

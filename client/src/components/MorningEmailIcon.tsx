export function MorningEmailIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="2" className="text-primary" />
      
      <g className="text-primary" stroke="currentColor" strokeWidth="1.5" fill="none">
        <rect x="15" y="60" width="8" height="25" />
        <rect x="25" y="50" width="8" height="35" />
        <rect x="35" y="40" width="10" height="45" />
        <rect x="47" y="30" width="6" height="55" />
        <rect x="55" y="35" width="8" height="50" />
        <rect x="65" y="45" width="8" height="40" />
        <rect x="75" y="55" width="8" height="30" />
      </g>
    </svg>
  );
}

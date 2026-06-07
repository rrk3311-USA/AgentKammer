import { Mail, Coffee, Smile } from "lucide-react";

export function MorningEmailIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <div className="relative inline-flex items-center gap-2">
      <svg
        viewBox="0 0 100 100"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="2" className="text-primary" />
        
        <g className="text-primary" stroke="currentColor" strokeWidth="1.5" fill="none">
          <rect x="8" y="58" width="10" height="34" />
          <rect x="20" y="48" width="10" height="44" />
          <rect x="32" y="35" width="12" height="57" />
          <rect x="46" y="20" width="8" height="72" />
          <rect x="56" y="28" width="10" height="64" />
          <rect x="68" y="40" width="10" height="52" />
          <rect x="80" y="50" width="10" height="42" />
        </g>
      </svg>
      
      <div className="relative inline-block">
        <Mail className={`${className} text-primary absolute inset-0 morning-icon-1`} />
        <Coffee className={`${className} text-primary absolute inset-0 morning-icon-2`} />
        <Smile className={`${className} text-primary absolute inset-0 morning-icon-3`} />
      </div>
    </div>
  );
}

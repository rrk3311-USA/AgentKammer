import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

export function LiveInterestRate() {
  const [rate, setRate] = useState(6.82);

  useEffect(() => {
    const interval = setInterval(() => {
      setRate(prev => {
        const change = (Math.random() - 0.5) * 0.05;
        const newRate = prev + change;
        return Math.max(6.5, Math.min(7.2, Number(newRate.toFixed(2))));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-full backdrop-blur-sm animate-pulse-subtle"
      data-testid="live-interest-rate-ticker"
    >
      <TrendingUp className="h-3.5 w-3.5 text-primary animate-bounce-slow" data-testid="icon-trending-rate" />
      <div className="flex items-baseline gap-1">
        <span className="text-xs font-medium text-muted-foreground">Rate:</span>
        <span 
          className="font-mono text-sm font-bold text-primary tabular-nums ticker-number"
          data-testid="text-current-rate"
          aria-live="polite"
        >
          {rate.toFixed(2)}%
        </span>
      </div>
    </div>
  );
}

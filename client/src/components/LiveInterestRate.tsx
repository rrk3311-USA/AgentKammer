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
      className="inline-flex items-baseline gap-1.5 px-2 py-1 bg-black dark:bg-white border border-black dark:border-white"
      data-testid="live-interest-rate-ticker"
    >
      <span className="text-[10px] font-medium text-white dark:text-black uppercase tracking-wide">Rate:</span>
      <span 
        className="font-mono text-xs font-semibold text-white dark:text-black tabular-nums ticker-number animate-pulse-subtle"
        data-testid="text-current-rate"
        aria-live="polite"
      >
        {rate.toFixed(2)}%
      </span>
    </div>
  );
}

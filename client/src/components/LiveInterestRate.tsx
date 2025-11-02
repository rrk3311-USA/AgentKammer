import { useEffect, useState } from "react";

export function LiveInterestRate() {
  const FALLBACK_RATE = 6.82;
  const [rate, setRate] = useState(FALLBACK_RATE);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const fetchMortgageRates = async () => {
      try {
        const apiKey = import.meta.env.VITE_MORTGAGE_API_KEY;
        
        if (!apiKey) {
          setRate(FALLBACK_RATE);
          setIsLive(false);
          return;
        }

        const response = await fetch('https://api.api-ninjas.com/v1/mortgagerate?state=NY', {
          headers: {
            'X-Api-Key': apiKey
          }
        });
        
        if (!response.ok) {
          throw new Error('API request failed');
        }
        
        const data = await response.json();
        
        if (data && data.mortgage_rates && typeof data.mortgage_rates === 'object') {
          const thirtyYearRate = data.mortgage_rates['30_year_fixed'];
          
          if (typeof thirtyYearRate === 'number' && Number.isFinite(thirtyYearRate)) {
            setRate(thirtyYearRate);
            setIsLive(true);
          } else {
            setRate(FALLBACK_RATE);
            setIsLive(false);
          }
        } else {
          setRate(FALLBACK_RATE);
          setIsLive(false);
        }
      } catch (error) {
        console.error('Failed to fetch mortgage rates:', error);
        setRate(FALLBACK_RATE);
        setIsLive(false);
      }
    };

    fetchMortgageRates();
    
    const interval = setInterval(() => {
      fetchMortgageRates();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="inline-flex items-baseline gap-1.5 px-2 py-1 bg-black dark:bg-white border border-black dark:border-white"
      data-testid="live-interest-rate-ticker"
    >
      <span className="text-[10px] font-medium text-white dark:text-black uppercase tracking-wide">
        {isLive ? 'Live Rate:' : 'Est. Rate:'}
      </span>
      <span 
        className="font-mono text-xs font-semibold text-white dark:text-black tabular-nums ticker-number animate-pulse-subtle"
        data-testid="text-current-rate"
        aria-live="polite"
      >
        {rate.toFixed(2)}%
      </span>
      {isLive && (
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" title="Live data" />
      )}
    </div>
  );
}

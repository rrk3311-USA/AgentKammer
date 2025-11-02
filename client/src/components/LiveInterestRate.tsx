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
      className="inline-flex items-baseline gap-1 px-1.5 py-0.5 bg-black border border-[#d4af37] rounded-sm"
      data-testid="live-interest-rate-ticker"
    >
      <span className="text-[8px] font-medium text-[#d4af37] uppercase tracking-wide">
        {isLive ? '●' : ''}
      </span>
      <span 
        className="font-mono text-[10px] font-bold text-white tabular-nums ticker-number"
        data-testid="text-current-rate"
        aria-live="polite"
      >
        {rate.toFixed(2)}%
      </span>
      <span className="text-[7px] font-medium text-[#d4af37] uppercase tracking-wide opacity-70">
        30yr
      </span>
    </div>
  );
}

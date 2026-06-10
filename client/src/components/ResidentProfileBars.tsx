export type ResidentProfileBar = {
  label: string;
  filled: number;
  total?: number;
};

export function ResidentProfileBars({ bars, total = 5 }: { bars: ResidentProfileBar[]; total?: number }) {
  return (
    <div className="mt-6 space-y-3 border border-brand-midnight/10 bg-white/60 p-5">
      {bars.map((bar) => {
        const cap = bar.total ?? total;
        return (
          <div key={bar.label} className="flex items-center gap-4 text-sm">
            <span className="w-20 shrink-0 font-medium text-brand-graphite/72">{bar.label}</span>
            <span className="flex gap-1" aria-label={`${bar.label}: ${bar.filled} of ${cap}`}>
              {Array.from({ length: cap }, (_, i) => (
                <span
                  key={i}
                  className={`inline-block h-2.5 w-2.5 ${i < bar.filled ? "bg-brand-midnight" : "border border-brand-midnight/25 bg-transparent"}`}
                />
              ))}
            </span>
          </div>
        );
      })}
    </div>
  );
}

import { useState, useEffect } from "react";

interface TelemetryData {
  listingsScanned: number;
  dataSources: number;
  matchAccuracy: number;
  opportunitiesFound: number;
}

export function TelemetryStrip() {
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    listingsScanned: 2800000,
    dataSources: 12,
    matchAccuracy: 95,
    opportunitiesFound: 14,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        listingsScanned: prev.listingsScanned + Math.floor(Math.random() * 250) + 50,
        dataSources: 12,
        matchAccuracy: Math.floor(Math.random() * 4) + 94,
        opportunitiesFound: Math.floor(Math.random() * 13) + 8,
      }));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-black/40 border border-[#d4af37]/20 rounded-lg p-4" data-testid="telemetry-listings">
        <div className="text-2xl font-mono font-semibold text-white tabular-nums transition-all duration-500 ease-out">
          {telemetry.listingsScanned.toLocaleString()}
        </div>
        <div className="text-xs text-white/60 mt-1">Listings scanned this week</div>
      </div>

      <div className="bg-black/40 border border-[#d4af37]/20 rounded-lg p-4" data-testid="telemetry-sources">
        <div className="text-2xl font-mono font-semibold text-white tabular-nums">
          {telemetry.dataSources}
        </div>
        <div className="text-xs text-white/60 mt-1">Verified data sources</div>
      </div>

      <div className="bg-black/40 border border-[#d4af37]/20 rounded-lg p-4" data-testid="telemetry-accuracy">
        <div className="text-2xl font-mono font-semibold text-white tabular-nums transition-all duration-500 ease-out">
          {telemetry.matchAccuracy}%
        </div>
        <div className="text-xs text-white/60 mt-1">Match accuracy (last 30d)</div>
      </div>

      <div className="bg-black/40 border border-[#d4af37]/20 rounded-lg p-4" data-testid="telemetry-opportunities">
        <div className="text-2xl font-mono font-semibold text-white tabular-nums transition-all duration-500 ease-out">
          {telemetry.opportunitiesFound}
        </div>
        <div className="text-xs text-white/60 mt-1">Opportunities flagged today</div>
      </div>
    </div>
  );
}

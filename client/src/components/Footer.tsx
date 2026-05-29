import { SiReplit, SiNvidia, SiClaude, SiAnthropic } from "react-icons/si";
import { Brain, Clock, TrendingUp, TrendingDown, Home } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  const lastUpdate = new Date();
  const metrics = [
    { label: "30Y Fixed", value: "6.82%", delta: "0.03", direction: "down" as const },
    { label: "15Y Fixed", value: "6.09%", delta: "0.05", direction: "down" as const },
    { label: "5/1 ARM", value: "6.54%", delta: "0.02", direction: "down" as const },
    { label: "Prime Rate", value: "8.50%" },
    { label: "Fed Rate", value: "5.50%" },
    { label: "Jumbo 30Y", value: "7.02%", delta: "0.01", direction: "up" as const },
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <footer className="relative overflow-hidden">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
      <div className="bg-[#081a33] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 md:py-10">
          <div className="flex items-center justify-center gap-4 mb-7">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-3 border-[#d4af37] flex items-center justify-center bg-gradient-to-br from-[#d4af37]/10 to-[#d4af37]/5" style={{
              boxShadow: 'inset 0 0 20px rgba(212,175,55,0.2), 0 0 15px rgba(212,175,55,0.3)'
            }}>
              <Clock className="h-4 w-4 text-[#d4af37]" />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-[#d4af37]/20" style={{
              animation: 'tickPulse 2s ease-in-out infinite'
            }} />
          </div>
          <div className="text-center sm:text-left">
            <p className="text-lg font-bold text-[#d4af37] mb-1" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Live Mortgage Rate Snapshot</p>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-white">{formatTime(lastUpdate)}</span>
              <span className="text-sm text-white/60">{formatDate(lastUpdate)}</span>
            </div>
          </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            <Link href="/real-estate" className="flex flex-col items-center gap-1 px-3 py-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-blue-500/15 transition-colors">
              <Home className="h-4 w-4 text-blue-400" />
              <span className="text-[0.65rem] font-medium text-blue-300">Buyers Market</span>
            </Link>
            {metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col items-center gap-1 px-3 py-3 rounded-xl border border-white/10 bg-white/[0.03]">
                <span className="text-[0.65rem] uppercase tracking-wide text-white/70 font-medium">{metric.label}</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-white text-base">{metric.value}</span>
                  {metric.delta && metric.direction === "down" && (
                    <div className="flex items-center gap-0.5">
                      <TrendingDown className="h-3 w-3 text-green-400" />
                      <span className="text-green-400 text-xs font-medium">{metric.delta}</span>
                    </div>
                  )}
                  {metric.delta && metric.direction === "up" && (
                    <div className="flex items-center gap-0.5">
                      <TrendingUp className="h-3 w-3 text-red-400" />
                      <span className="text-red-400 text-xs font-medium">{metric.delta}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <Brain className="h-3 w-3 text-[#79d3ff]" />
            <span className="text-xs font-medium text-white/90">Powered by AI</span>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="flex items-center gap-0.5 text-white/90">
                <SiReplit className="h-3 w-3" />
                <span className="font-medium">Replit</span>
              </div>
              <div className="flex items-center gap-0.5 text-white/90">
                <SiAnthropic className="h-3 w-3" />
                <span className="font-medium">Anthropic</span>
              </div>
              <div className="flex items-center gap-0.5 text-white/90">
                <SiClaude className="h-3 w-3" />
                <span className="font-medium">Claude</span>
              </div>
              <div className="flex items-center gap-0.5 text-white/90">
                <SiNvidia className="h-3 w-3" />
                <span className="font-medium">NVIDIA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes tickPulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.6; }
        }
      `}</style>
    </footer>
  );
}

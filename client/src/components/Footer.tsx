import { SiReplit, SiNvidia, SiClaude, SiAnthropic, SiInstagram, SiFacebook, SiLinkedin, SiX } from "react-icons/si";
import { Brain, Building2, Users, RefreshCw, Clock, TrendingUp, TrendingDown, Home } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  const lastUpdate = new Date();

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
    <footer className="relative">
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      {/* Links Section - Now at Top */}
      <div className="bg-background border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 text-left">
            <div>
              <p className="text-xs md:text-sm text-foreground font-medium mb-2 block">
                Free Financial Tools
              </p>
              <ul className="space-y-1 text-xs md:text-sm text-muted-foreground mb-4">
                <li>
                  <Link href="/services/get-home-value" className="hover:text-foreground transition-colors">
                    Home Valuation
                  </Link>
                </li>
                <li>
                  <Link href="/services/get-preapproved" className="hover:text-foreground transition-colors">
                    Pre-Approval
                  </Link>
                </li>
                <li>
                  <Link href="/investing" className="hover:text-foreground transition-colors">
                    Investment Accounts
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <Link href="/real-estate">
                <h4 className="font-medium mb-2 text-sm hover:text-foreground transition-colors cursor-pointer">Real Estate Concierge</h4>
              </Link>
              <ul className="space-y-1 text-xs md:text-sm text-muted-foreground mb-4">
                <li>
                  <Link href="/refinancing" className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Refinancing Rate Watch</span>
                  </Link>
                </li>
                <li>
                  <Link href="/reverse-buyer-origination" className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <Building2 className="h-3.5 w-3.5" />
                    <span>Reverse Buyer Origination</span>
                  </Link>
                </li>
                <li>
                  <Link href="/reverse-seller-architecture" className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <Users className="h-3.5 w-3.5" />
                    <span>Reverse Seller Architecture</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-sm text-foreground">Flagship Services</h4>
              <ul className="space-y-1 text-xs md:text-sm text-muted-foreground mb-4">
                <li>
                  <Link href="/profile" className="hover:text-foreground transition-colors">
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/credit-cards" className="hover:text-foreground transition-colors">
                    Credit Cards
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Divider */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      {/* Row 1: Vintage Clock with Update Time */}
      <div className="bg-[#0a1628] border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-center gap-3">
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
          <div>
            <p className="text-lg font-bold text-[#d4af37] mb-1" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Live Market Rate Updates</p>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-white">{formatTime(lastUpdate)}</span>
              <span className="text-sm text-white/60">{formatDate(lastUpdate)}</span>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes tickPulse {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.1); opacity: 0.6; }
          }
        `}</style>
      </div>
      {/* Rows 2-3: Market Ticker Static */}
      <div className="bg-[#0a1628] border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 place-items-center justify-center">
            <Link href="/real-estate" className="flex flex-col items-center gap-1 px-3 py-2 rounded hover:bg-blue-500/20 transition-colors">
              <Home className="h-4 w-4 text-blue-400" />
              <span className="text-[0.65rem] font-medium text-blue-300">Buyers Market</span>
            </Link>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[0.65rem] uppercase tracking-wide text-white/70 font-medium">30Y Fixed</span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold text-white text-base">6.82%</span>
                <div className="flex items-center gap-0.5">
                  <TrendingDown className="h-3 w-3 text-green-400" />
                  <span className="text-green-400 text-xs font-medium">0.03</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[0.65rem] uppercase tracking-wide text-white/70 font-medium">15Y Fixed</span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold text-white text-base">6.09%</span>
                <div className="flex items-center gap-0.5">
                  <TrendingDown className="h-3 w-3 text-green-400" />
                  <span className="text-green-400 text-xs font-medium">0.05</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[0.65rem] uppercase tracking-wide text-white/70 font-medium">50Y Fixed</span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold text-white text-base">7.15%</span>
                <div className="flex items-center gap-0.5">
                  <TrendingDown className="h-3 w-3 text-green-400" />
                  <span className="text-green-400 text-xs font-medium">0.02</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[0.65rem] uppercase tracking-wide text-white/70 font-medium">Prime Rate</span>
              <span className="font-mono font-bold text-white text-base">8.50%</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[0.65rem] uppercase tracking-wide text-white/70 font-medium">Fed Rate</span>
              <span className="font-mono font-bold text-white text-base">5.50%</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[0.65rem] uppercase tracking-wide text-white/70 font-medium">Avg CC APR</span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold text-white text-base">24.6%</span>
                <div className="flex items-center gap-0.5">
                  <TrendingUp className="h-3 w-3 text-red-400" />
                  <span className="text-red-400 text-xs font-medium">0.20</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[0.65rem] uppercase tracking-wide text-white/70 font-medium">Gold</span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold text-white text-base">$2,450</span>
                <div className="flex items-center gap-0.5">
                  <TrendingUp className="h-3 w-3 text-red-400" />
                  <span className="text-red-400 text-xs font-medium">0.85</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[0.65rem] uppercase tracking-wide text-white/70 font-medium">USD/EUR</span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold text-white text-base">1.0850</span>
                <div className="flex items-center gap-0.5">
                  <TrendingUp className="h-3 w-3 text-red-400" />
                  <span className="text-red-400 text-xs font-medium">0.0035</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Powered by AI Section */}
      <div className="bg-[#0a1628] border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2">
          <div className="flex items-center justify-center gap-1.5 mt-[7px] mb-[7px] pt-[7px] pb-[7px]">
            <Brain className="h-3 w-3 text-[#79d3ff]" />
            <span className="text-[0.65rem] font-medium text-white/90">Powered by AI</span>
            <div className="flex items-center gap-1.5 text-[0.65rem]">
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
    </footer>
  );
}

import { SiReplit, SiNvidia, SiClaude, SiAnthropic, SiInstagram, SiFacebook, SiLinkedin, SiX } from "react-icons/si";
import { Brain, Building2, Users, RefreshCw, Clock, TrendingUp, TrendingDown } from "lucide-react";
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
      {/* Row 1: Clock with Update Time */}
      <div className="bg-[#0a1628] border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex items-center justify-center gap-2 mt-[7px] mb-[7px]">
          <Clock className="h-3.5 w-3.5 text-[#d4af37]" />
          <span className="text-xs font-mono text-[#d4af37]">{formatTime(lastUpdate)}</span>
          <span className="text-xs text-white/60">{formatDate(lastUpdate)}</span>
        </div>
      </div>
      {/* Rows 2-3: Market Ticker Static */}
      <div className="bg-[#0a1628] border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2">
          <div className="flex items-center justify-center gap-2 flex-wrap text-xs">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-black/50 border border-[#d4af37]/30 rounded-sm">
              <span className="text-[#d4af37] font-medium text-[0.7rem]">30Y FIXED</span>
              <span className="font-mono font-bold text-white text-sm">6.82%</span>
              <TrendingDown className="h-3 w-3 text-green-400" />
              <span className="text-green-400 font-medium text-[0.7rem]">-0.03</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-black/50 border border-[#d4af37]/30 rounded-sm">
              <span className="text-[#d4af37] font-medium text-[0.7rem]">15Y FIXED</span>
              <span className="font-mono font-bold text-white text-sm">6.09%</span>
              <TrendingDown className="h-3 w-3 text-green-400" />
              <span className="text-green-400 font-medium text-[0.7rem]">-0.05</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-black/50 border border-[#d4af37]/30 rounded-sm">
              <span className="text-[#d4af37] font-medium text-[0.7rem]">50Y FIXED</span>
              <span className="font-mono font-bold text-white text-sm">7.15%</span>
              <TrendingDown className="h-3 w-3 text-green-400" />
              <span className="text-green-400 font-medium text-[0.7rem]">-0.02</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-black/50 border border-[#d4af37]/30 rounded-sm">
              <span className="text-[#d4af37] font-medium text-[0.7rem]">PRIME RATE</span>
              <span className="font-mono font-bold text-white text-sm">8.50%</span>
              <span className="text-gray-400">—</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-black/50 border border-[#d4af37]/30 rounded-sm">
              <span className="text-[#d4af37] font-medium text-[0.7rem]">FED RATE</span>
              <span className="font-mono font-bold text-white text-sm">5.50%</span>
              <span className="text-gray-400">—</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-black/50 border border-[#d4af37]/30 rounded-sm">
              <span className="text-[#d4af37] font-medium text-[0.7rem]">AVG CC APR</span>
              <span className="font-mono font-bold text-white text-sm">24.6%</span>
              <TrendingUp className="h-3 w-3 text-red-400" />
              <span className="text-red-400 font-medium text-[0.7rem]">+0.20</span>
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

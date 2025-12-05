import { SiReplit, SiNvidia, SiClaude, SiAnthropic, SiInstagram, SiFacebook, SiLinkedin, SiX } from "react-icons/si";
import { Brain, Sparkles, TrendingUp, RefreshCw } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="relative">
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      <div className="bg-background border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 gap-6 md:gap-8">
            <div>
              <h3 className="font-serif text-base md:text-lg font-semibold mb-3">Agent Kammer</h3>
              <Link href="/free-tools" className="text-xs md:text-sm text-foreground font-medium mb-3 block hover:text-[#d4af37] transition-colors">
                Free Tools
              </Link>
              <ul className="space-y-1.5 text-xs md:text-sm text-muted-foreground mb-4">
                <li>
                  <Link href="/credit-cards" className="hover:text-foreground transition-colors">
                    Credit Cards
                  </Link>
                </li>
                <li>
                  <Link href="/investing" className="hover:text-foreground transition-colors">
                    Investing
                  </Link>
                </li>
                <li>
                  <Link href="/services/get-preapproved" className="hover:text-foreground transition-colors">
                    Pre-Approval
                  </Link>
                </li>
                <li>
                  <Link href="/services/get-home-value" className="hover:text-foreground transition-colors">
                    Home Valuation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <Link href="/real-estate">
                <h4 className="font-medium mb-3 text-sm hover:text-foreground transition-colors cursor-pointer">Services</h4>
              </Link>
              <ul className="space-y-1.5 text-xs md:text-sm text-muted-foreground mb-4">
                <li>
                  <Link href="/reverse-buyer-origination" className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Reverse Buyer Origination</span>
                  </Link>
                </li>
                <li>
                  <Link href="/reverse-seller-architecture" className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>Reverse Seller Architecture</span>
                  </Link>
                </li>
                <li>
                  <Link href="/refinancing" className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Refinancing Rate Watch</span>
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
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      <div className="bg-[#0a1628] py-3">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-1.5 text-white/90">
              <Brain className="h-4 w-4 text-[#79d3ff]" />
              <span className="text-[0.625rem] font-medium">Powered by AI</span>
            </div>
            <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
              <div className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors">
                <SiReplit className="h-4 w-4" />
                <span className="text-[0.625rem] font-medium">Replit</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors">
                <SiAnthropic className="h-4 w-4" />
                <span className="text-[0.625rem] font-medium">Anthropic</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors">
                <SiClaude className="h-4 w-4" />
                <span className="text-[0.625rem] font-medium">Claude</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors">
                <SiNvidia className="h-4 w-4" />
                <span className="text-[0.625rem] font-medium">NVIDIA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
    </footer>
  );
}

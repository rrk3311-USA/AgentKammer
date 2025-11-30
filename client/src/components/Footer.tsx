import { SiReplit, SiNvidia, SiClaude, SiAnthropic, SiInstagram, SiFacebook, SiLinkedin, SiX } from "react-icons/si";
import { Brain, FileText, Globe, Headphones, GraduationCap, Download, Shield, Sparkles, TrendingUp, Users } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="relative">
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      <div className="bg-background border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <h3 className="font-serif text-base md:text-lg font-semibold mb-3">Agent Kammer</h3>
              <p className="text-xs md:text-sm text-muted-foreground mb-3">
                AI-Powered Financial Comparison
              </p>
              <div className="space-y-2">
                <Link href="/document-portal" className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <FileText className="h-4 w-4" />
                  <span>Document Portal</span>
                </Link>
                <Link href="/international-buyers" className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-international-buyers">
                  <Globe className="h-4 w-4" />
                  <span>International Buyers</span>
                </Link>
                <Link href="/audiobooks" className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-audiobooks">
                  <Headphones className="h-4 w-4" />
                  <span>Audiobooks</span>
                </Link>
                <Link href="/ecourses" className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-ecourses">
                  <GraduationCap className="h-4 w-4" />
                  <span>Ecourses</span>
                </Link>
                <Link href="/downloads" className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-downloads">
                  <Download className="h-4 w-4" />
                  <span>Downloads</span>
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-sm">Services</h4>
              <ul className="space-y-1.5 text-xs md:text-sm text-muted-foreground">
                <li>
                  <Link href="/reverse-buyer-origination" className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Reverse Buyer Origination</span>
                  </Link>
                </li>
                <li>
                  <Link href="/reverse-seller-origination" className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>Reverse Seller Origination</span>
                  </Link>
                </li>
                <li>
                  <Link href="/real-estate" className="hover:text-foreground transition-colors">
                    Real Estate Concierge
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
              <h4 className="font-medium mb-3 text-sm">Compare</h4>
              <ul className="space-y-1.5 text-xs md:text-sm text-muted-foreground">
                <li>
                  <Link href="/credit-cards" className="hover:text-foreground transition-colors">
                    Credit Cards
                  </Link>
                </li>
                <li>
                  <Link href="/personal-loans" className="hover:text-foreground transition-colors">
                    Personal Loans
                  </Link>
                </li>
                <li>
                  <Link href="/business-funding" className="hover:text-foreground transition-colors">
                    Business Funding
                  </Link>
                </li>
                <li>
                  <Link href="/banking" className="hover:text-foreground transition-colors">
                    Banking
                  </Link>
                </li>
                <li>
                  <Link href="/insurance" className="hover:text-foreground transition-colors">
                    Insurance
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-sm">Connect</h4>
              <ul className="space-y-1.5 text-xs md:text-sm text-muted-foreground">
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/coaching" className="hover:text-foreground transition-colors">
                    Consulting
                  </Link>
                </li>
                <li>
                  <Link href="/affiliates" className="flex items-center gap-2 hover:text-foreground transition-colors" data-testid="link-affiliates">
                    <Users className="h-3.5 w-3.5 text-[#d4af37]" />
                    <span>Affiliate Program</span>
                  </Link>
                </li>
                <li>
                  <Link href="/commercial-investment" className="hover:text-foreground transition-colors" data-testid="link-commercial-investment">
                    Commercial
                  </Link>
                </li>
              </ul>
              <div className="flex items-center gap-3 mt-3">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <SiInstagram className="h-4 w-4" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <SiFacebook className="h-4 w-4" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <SiLinkedin className="h-4 w-4" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <SiX className="h-4 w-4" />
                </a>
              </div>
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

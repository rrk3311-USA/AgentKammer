import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Moon, 
  Sun, 
  Heart, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronUp,
  MessageCircle, 
  CreditCard,
  Wallet,
  Building2,
  Landmark,
  Shield,
  TrendingUp,
  Home,
  Brain,
  Triangle,
  Calculator,
  RefreshCw
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";

const financialCategories = [
  { id: 'credit-cards', name: 'Credit Cards', icon: CreditCard },
  { id: 'personal-loans', name: 'Personal Loans', icon: Wallet },
  { id: 'business-funding', name: 'Business Funding', icon: Building2 },
  { id: 'banking', name: 'Banking', icon: Landmark },
  { id: 'insurance', name: 'Insurance', icon: Shield },
  { id: 'investing', name: 'Investing', icon: TrendingUp },
  { id: 'refinancing', name: 'Refinancing', icon: RefreshCw },
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4 relative">
          {/* Mobile Scroll Arrows */}
          <div className="flex md:hidden flex-col gap-0.5">
            <button
              onClick={scrollToTop}
              className="p-1 text-muted-foreground/60 hover:text-foreground transition-colors"
              data-testid="button-scroll-top"
              aria-label="Scroll to top"
            >
              <Triangle className="h-3 w-3 fill-current" />
            </button>
            <button
              onClick={scrollToBottom}
              className="p-1 text-muted-foreground/60 hover:text-foreground transition-colors"
              data-testid="button-scroll-bottom"
              aria-label="Scroll to bottom"
            >
              <Triangle className="h-3 w-3 fill-current rotate-180" />
            </button>
          </div>

          {/* Left Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="hover-elevate active-elevate-2 h-10 px-3 gap-1"
                  data-testid="button-header-categories"
                >
                  <Brain className="h-4 w-4 text-[#d4af37]" />
                  <span className="text-sm font-medium">Compare</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-[#d4af37]" />
                  Financial Categories
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {financialCategories.map((category) => (
                  <Link key={category.id} href={`/${category.id}`}>
                    <DropdownMenuItem className="cursor-pointer" data-testid={`menu-item-${category.id}`}>
                      <category.icon className="h-4 w-4 mr-2" />
                      {category.name}
                    </DropdownMenuItem>
                  </Link>
                ))}
                <DropdownMenuSeparator />
                <Link href="/real-estate">
                  <DropdownMenuItem className="cursor-pointer" data-testid="menu-item-real-estate">
                    <Home className="h-4 w-4 mr-2 text-[#d4af37]" />
                    Real Estate Concierge
                  </DropdownMenuItem>
                </Link>
                <Link href="/free-tools">
                  <DropdownMenuItem className="cursor-pointer" data-testid="menu-item-free-tools">
                    <Calculator className="h-4 w-4 mr-2 text-[#d4af37]" />
                    Free Tools
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <Link href="/dashboard">
                  <DropdownMenuItem className="cursor-pointer" data-testid="menu-item-dashboard">
                    <Brain className="h-4 w-4 mr-2 text-[#d4af37]" />
                    All Categories Dashboard
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/real-estate">
              <Button
                variant="ghost"
                className="hover-elevate active-elevate-2 h-10 px-3 gap-1"
                data-testid="button-header-real-estate"
              >
                <Home className="h-4 w-4" />
                <span className="text-sm font-medium">Real Estate</span>
              </Button>
            </Link>
          </div>

          {/* Center Logo */}
          <Link href="/" data-testid="link-home" className="absolute left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center px-3 py-2">
              <div className="mb-0.5 text-2xl">
                🎩
              </div>
              <div className="flex flex-col items-center">
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }} className="text-lg md:text-xl tracking-wide text-foreground">AGENT KAMMER</span>
                <span className="text-[0.55rem] md:text-[0.6rem] font-semibold tracking-wide text-[#d4af37]">Agentic Deal Procurement</span>
              </div>
            </div>
          </Link>

          {/* Right Navigation */}
          <div className="flex items-center gap-3 ml-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              data-testid="button-favorites"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                className="hover-elevate active-elevate-2 h-9 px-3 gap-1 text-sm"
                data-testid="button-header-contact"
                onClick={() => {
                  const chatButton = document.querySelector('[data-testid="button-open-chat"]') as HTMLElement;
                  if (chatButton) chatButton.click();
                }}
              >
                <MessageCircle className="h-4 w-4" />
                <span>Contact</span>
              </Button>
              <Button
                variant="default"
                className="rounded-full text-[#0a1628] h-9 px-4"
                data-testid="button-sign-in"
              >
                Sign In
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col p-6 gap-4">
            {/* Financial Categories */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase flex items-center gap-2">
                <Brain className="h-3 w-3 text-[#d4af37]" />
                Compare Products
              </p>
              <div className="grid grid-cols-2 gap-2">
                {financialCategories.map((category) => (
                  <Link key={category.id} href={`/${category.id}`} data-testid={`link-mobile-${category.id}`}>
                    <span
                      className="text-sm font-medium hover:text-[#d4af37] cursor-pointer flex items-center gap-2 p-2 rounded-lg bg-muted/50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <category.icon className="h-4 w-4" />
                      {category.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase">Real Estate</p>
              <Link href="/real-estate" data-testid="link-mobile-real-estate">
                <span
                  className="text-base font-medium hover:text-[#d4af37] cursor-pointer block mb-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Real Estate Concierge
                </span>
              </Link>
              <Link href="/reverse-buyer-origination" data-testid="link-mobile-rbo">
                <span
                  className="text-base font-medium hover:text-primary cursor-pointer block mb-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Reverse Buyer Origination
                </span>
              </Link>
              <Link href="/reverse-seller-origination" data-testid="link-mobile-rso">
                <span
                  className="text-base font-medium hover:text-primary cursor-pointer block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Reverse Seller Origination
                </span>
              </Link>
            </div>

            <div className="border-t pt-4">
              <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase">Market Data</p>
              <Link href="/california-market" data-testid="link-mobile-california-market">
                <span
                  className="text-base font-medium hover:text-primary cursor-pointer block mb-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  California Market
                </span>
              </Link>
              <Link href="/new-york-market" data-testid="link-mobile-new-york-market">
                <span
                  className="text-base font-medium hover:text-primary cursor-pointer block mb-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  NYC Market
                </span>
              </Link>
              <Link href="/nevada-market" data-testid="link-mobile-nevada-market">
                <span
                  className="text-base font-medium hover:text-primary cursor-pointer block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Nevada Market
                </span>
              </Link>
            </div>

            <span
              className="text-base font-medium hover:text-primary cursor-pointer block border-t pt-4"
              onClick={() => {
                setMobileMenuOpen(false);
                setTimeout(() => {
                  const chatButton = document.querySelector('[data-testid="button-open-chat"]') as HTMLButtonElement;
                  if (chatButton) chatButton.click();
                }, 100);
              }}
              data-testid="link-mobile-contact"
            >
              Contact Agent K
            </span>

            <Button
              variant="default"
              className="w-full rounded-full text-[#0a1628] mt-2"
              data-testid="button-mobile-sign-in"
            >
              Sign In
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

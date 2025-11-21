import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Heart, Menu, X, Building2, Sparkles, FileText, MessageCircle } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between gap-4 relative">
          <div className="hidden md:flex items-center gap-3">
            <Link href="/reverse-buyer-origination">
              <Button
                variant="ghost"
                className="hover-elevate active-elevate-2 h-12 px-4 gap-2"
                data-testid="button-header-rbo"
              >
                <Sparkles className="h-6 w-6" />
                <span className="text-sm font-medium">Reverse Buyer™</span>
              </Button>
            </Link>
            <Link href="/document-portal">
              <Button
                variant="ghost"
                className="hover-elevate active-elevate-2 h-12 px-4 gap-2"
                data-testid="button-header-documents"
              >
                <FileText className="h-6 w-6" />
                <span className="text-sm font-medium">Documents</span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="hover-elevate active-elevate-2 h-12 px-4 gap-2"
              data-testid="button-header-contact"
              onClick={() => {
                const chatButton = document.querySelector('[data-testid="button-open-chat"]') as HTMLElement;
                if (chatButton) chatButton.click();
              }}
            >
              <MessageCircle className="h-6 w-6" />
              <span className="text-sm font-medium">Contact</span>
            </Button>
          </div>

          <Link href="/" data-testid="link-home" className="absolute left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center px-3 py-2">
              <div className="text-2xl md:text-2xl mb-0.5" style={{ transform: 'rotate(15deg)' }}>
                🎩
              </div>
              <div className="flex flex-col items-center">
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }} className="text-lg md:text-xl tracking-wide text-foreground">AGENT KAMMER</span>
                <span className="text-[0.6rem] md:text-[0.625rem] font-semibold tracking-wide text-muted-foreground">NYC · CA · NV</span>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-4 ml-auto">
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
            <Button
              variant="default"
              className="hidden md:flex rounded-full text-[#0a1628]"
              data-testid="button-sign-in"
            >
              Sign In
            </Button>
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

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="flex flex-col p-6 gap-4">
            <Link href="/" data-testid="link-mobile-search">
              <span
                className="text-base font-medium hover:text-primary cursor-pointer block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Search
              </span>
            </Link>
            <Link href="/saved" data-testid="link-mobile-saved">
              <span
                className="text-base font-medium hover:text-primary cursor-pointer block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Saved Searches
              </span>
            </Link>
            <Link href="/reverse-buyer-origination" data-testid="link-mobile-rbo">
              <span
                className="text-base font-medium hover:text-primary cursor-pointer block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Reverse Buyer Origination™
              </span>
            </Link>
            <Link href="/document-portal" data-testid="link-mobile-document-portal">
              <span
                className="text-base font-medium hover:text-primary cursor-pointer block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Document Portal
              </span>
            </Link>
            <Link href="/california-market" data-testid="link-mobile-california-market">
              <span
                className="text-base font-medium hover:text-primary cursor-pointer block"
                onClick={() => setMobileMenuOpen(false)}
              >
                California Market
              </span>
            </Link>
            <Link href="/new-york-market" data-testid="link-mobile-new-york-market">
              <span
                className="text-base font-medium hover:text-primary cursor-pointer block"
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
            <span
              className="text-base font-medium hover:text-primary cursor-pointer block"
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
            <div className="border-t pt-4">
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Services</p>
              <Link href="/services/get-preapproved" data-testid="link-mobile-preapproved">
                <span
                  className="text-base font-medium hover:text-primary cursor-pointer block mb-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Pre-Approved
                </span>
              </Link>
              <Link href="/services/get-home-value" data-testid="link-mobile-home-value">
                <span
                  className="text-base font-medium hover:text-primary cursor-pointer block mb-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Your Home Value
                </span>
              </Link>
            </div>
            <Button
              variant="default"
              className="w-full rounded-full text-[#0a1628]"
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

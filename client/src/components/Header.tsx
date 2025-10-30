import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Heart, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";
import logoImage from "@assets/ChatGPT Image Oct 30, 2025, 12_21_32 PM_1761855952032.png";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center justify-center hover-elevate active-elevate-2 rounded-lg px-4 py-2 -ml-4 cursor-pointer transition-transform">
              <img src={logoImage} alt="Agent Kammer" className="h-16" />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" data-testid="link-nav-search">
              <span
                className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                  location === "/" ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Search
              </span>
            </Link>
            <Link href="/saved" data-testid="link-nav-saved">
              <span
                className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                  location === "/saved" ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Saved Searches
              </span>
            </Link>
          </nav>

          <div className="flex items-center gap-4">
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
              className="hidden md:flex rounded-full"
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
            <Button
              variant="default"
              className="w-full rounded-full"
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

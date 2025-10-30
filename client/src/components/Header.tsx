import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Heart, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";
import logoImage from "@assets/generated_images/Agent_Kammer_transparent_logo_bf36d566.png";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex h-24 items-center justify-center gap-4">
          <Link href="/" data-testid="link-home" className="absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center justify-center hover-elevate active-elevate-2 rounded-xl px-2 py-1 cursor-pointer transition-transform bg-card/50 backdrop-blur-sm border border-border/30 shadow-md">
              <img src={logoImage} alt="Agent Kammer" className="h-20 drop-shadow-lg" />
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

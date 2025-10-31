import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Heart, Menu, X, Building2 } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";
import logoImage from "@assets/generated_images/Agent_Kammer_logo_transparent_cropped_5d5573e1.png";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between gap-4">
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="hover-elevate active-elevate-2"
              data-testid="button-uptown"
            >
              <div className="flex flex-col items-center gap-0.5">
                <Building2 className="h-5 w-5" />
                <div className="h-0.5 w-0.5 rounded-full bg-current" />
                <div className="h-0.5 w-0.5 rounded-full bg-current opacity-50" />
              </div>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover-elevate active-elevate-2"
              data-testid="button-midtown"
            >
              <div className="flex flex-col items-center gap-0.5">
                <div className="h-0.5 w-0.5 rounded-full bg-current opacity-50" />
                <Building2 className="h-5 w-5" />
                <div className="h-0.5 w-0.5 rounded-full bg-current opacity-50" />
              </div>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover-elevate active-elevate-2"
              data-testid="button-downtown"
            >
              <div className="flex flex-col items-center gap-0.5">
                <div className="h-0.5 w-0.5 rounded-full bg-current opacity-50" />
                <div className="h-0.5 w-0.5 rounded-full bg-current" />
                <Building2 className="h-5 w-5" />
              </div>
            </Button>
          </div>

          <Link href="/" data-testid="link-home" className="absolute left-1/2 -translate-x-1/2">
            <img src={logoImage} alt="Agent Kammer" className="h-16" />
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
              className="hidden md:flex rounded-full text-black"
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
                  className="text-base font-medium hover:text-primary cursor-pointer block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Your Home Value
                </span>
              </Link>
            </div>
            <Button
              variant="default"
              className="w-full rounded-full text-black"
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

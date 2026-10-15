import { Link, useLocation } from "wouter";
import React, { useEffect, useState } from "react";
import { AkMonogramMark } from "@/components/AkMonogramMark";
import { MobileFieldMenu } from "@/components/MobileFieldMenu";
import { MobileMenuToggle } from "@/components/MobileMenuToggle";
import { cn } from "@/lib/utils";

export function CompactSiteHeader() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const previousHtml = html.style.overflow;
    const previousBody = document.body.style.overflow;
    html.classList.add("ak-compact-menu-on");
    document.body.classList.add("ak-compact-menu-on");
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      html.classList.remove("ak-compact-menu-on");
      document.body.classList.remove("ak-compact-menu-on");
      html.style.overflow = previousHtml;
      document.body.style.overflow = previousBody;
    };
  }, [open]);

  return (
    <>
      <header
        className={cn("ak-compact-header sticky top-0 z-50 w-full print:hidden")}
        data-ak-compact-header
        data-testid="compact-site-header"
      >
        <div className="ak-compact-header__bar">
          <Link href="/" className="ak-compact-header__mark" aria-label="Agent Kammer home" data-testid="link-home">
            <AkMonogramMark variant="ivory" className="h-7 w-auto" />
          </Link>
          <MobileMenuToggle
            open={open}
            onToggle={() => setOpen((value) => !value)}
            alwaysShow
          />
        </div>
      </header>
      {open ? (
        <div className="ak-compact-header__menu print:hidden" id="ak-field-menu">
          <MobileFieldMenu location={location} onClose={() => setOpen(false)} allBreakpoints />
        </div>
      ) : null}
    </>
  );
}

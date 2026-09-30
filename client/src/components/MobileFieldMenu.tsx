import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { PUBLIC_PRODUCTS } from "@/data/public-menu";
import { openDecisionAssistant } from "@/lib/decision-assistant";
import {
  defaultOpenSectionId,
  isHardMobileHref,
  isMobileNavBranch,
  mobileFieldNav,
  type MobileNavBranch,
  type MobileNavLink,
} from "@/data/mobile-nav";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-stone focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy";

const headerGuidanceClass =
  "ak-call-button ak-call-button--no-stripe inline-flex items-center px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-ivory";

function FieldLink({
  item,
  className,
  onNavigate,
}: {
  item: MobileNavLink;
  className?: string;
  onNavigate: () => void;
}) {
  const classes = cn(className, focusRing);
  if (isHardMobileHref(item.href)) {
    return (
      <a href={item.href} className={classes} onClick={onNavigate}>
        {item.label}
      </a>
    );
  }
  return (
    <Link href={item.href} className={classes} onClick={onNavigate}>
      {item.label}
    </Link>
  );
}

function Branch({
  branch,
  onNavigate,
}: {
  branch: MobileNavBranch;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        className={cn(
          "flex w-full items-center justify-between py-2.5 text-left text-[15px] tracking-[0.01em] text-brand-ivory/78",
          focusRing,
        )}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{branch.label}</span>
        <span aria-hidden className="text-[1.15rem] font-light leading-none text-brand-ivory/55">
          {open ? "−" : "+"}
        </span>
      </button>
      {open ? (
        <div className="border-l border-brand-ivory/12 pl-4">
          {branch.href ? (
            <FieldLink
              item={{ label: `All ${branch.label}`, href: branch.href }}
              className="block py-2 text-[14px] text-brand-ivory/62"
              onNavigate={onNavigate}
            />
          ) : null}
          {branch.children.map((item) => (
            <FieldLink
              key={item.href + item.label}
              item={item}
              className="block py-2 text-[14px] text-brand-ivory/62"
              onNavigate={onNavigate}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function MobileFieldMenu({
  location,
  onClose,
}: {
  location: string;
  onClose: () => void;
}) {
  const [openId, setOpenId] = useState<string | null>(() => defaultOpenSectionId(location));

  useEffect(() => {
    setOpenId(defaultOpenSectionId(location));
  }, [location]);

  return (
    <div className="ak-header-shell border-t border-brand-brass/30 lg:hidden">
      <nav
        aria-label="Field"
        className="mx-auto flex max-h-[min(78dvh,40rem)] w-full max-w-site flex-col overflow-y-auto px-5 pb-8 pt-2 sm:px-6"
      >
        {mobileFieldNav.map((section) => {
          const expandable = Boolean(section.children?.length);
          const open = openId === section.id;

          if (!expandable && section.href) {
            return (
              <FieldLink
                key={section.id}
                item={{ label: section.label, href: section.href }}
                className="block border-b border-brand-ivory/8 py-3.5 text-[1.2rem] tracking-[0.01em] text-brand-ivory"
                onNavigate={onClose}
              />
            );
          }

          return (
            <div key={section.id} className="border-b border-brand-ivory/8">
              <button
                type="button"
                className={cn(
                  "flex w-full items-center justify-between py-3.5 text-left text-[1.2rem] tracking-[0.01em] text-brand-ivory",
                  focusRing,
                )}
                aria-expanded={open}
                onClick={() => setOpenId((current) => (current === section.id ? null : section.id))}
              >
                <span>{section.label}</span>
                <span aria-hidden className="text-[1.35rem] font-light leading-none text-brand-ivory/60">
                  {open ? "−" : "+"}
                </span>
              </button>
              {open ? (
                <div className="pb-3">
                  {section.children?.map((child) =>
                    isMobileNavBranch(child) ? (
                      <Branch key={child.id} branch={child} onNavigate={onClose} />
                    ) : (
                      <FieldLink
                        key={child.href + child.label}
                        item={child}
                        className="block py-2.5 text-[15px] text-brand-ivory/74"
                        onNavigate={onClose}
                      />
                    ),
                  )}
                </div>
              ) : null}
            </div>
          );
        })}

        <button
          type="button"
          onClick={() => {
            onClose();
            openDecisionAssistant();
          }}
          className={cn("mt-6 w-fit", headerGuidanceClass, focusRing)}
          data-testid="button-header-guidance-mobile"
        >
          {PUBLIC_PRODUCTS.guidance.label}
        </button>
      </nav>
    </div>
  );
}

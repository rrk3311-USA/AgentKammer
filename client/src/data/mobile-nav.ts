import { decisionNavigationGroups } from "@/data/decision-navigation";
import { publicGuides } from "@/data/guides";
import { manhattanNeighborhoodGuides } from "@/data/manhattan-neighborhoods";
import { guidesLibraryNav } from "@/components/site-shell";

export type MobileNavLink = {
  label: string;
  href: string;
};

export type MobileNavBranch = {
  id: string;
  label: string;
  href?: string;
  children: readonly MobileNavLink[];
};

export type MobileNavSection = {
  id: string;
  label: string;
  href?: string;
  children?: readonly (MobileNavLink | MobileNavBranch)[];
};

/** Decision Hub pages. Shared with HubShell so field menu and hub stay in sync. */
export const hubFieldNav: readonly MobileNavLink[] = [
  { label: "Home", href: "/hub" },
  { label: "Where things stand", href: "/hub/roadmap" },
  { label: "Conversations", href: "/hub/conversations" },
  { label: "Saved", href: "/hub/saved" },
  { label: "Reviews", href: "/hub/reviews" },
  { label: "Profile", href: "/hub/profile" },
];

const whatsChanging =
  decisionNavigationGroups.find((group) => group.title === "What's Changing?")?.items ?? [];

function isBranch(item: MobileNavLink | MobileNavBranch): item is MobileNavBranch {
  return "children" in item && Array.isArray(item.children);
}

/**
 * Mobile field menu. Matches the desktop header doors.
 * Home · Start Here · Guides · Articles · Interactive Tools · Contact.
 * Articles is its own door. Calculator, Wheel of Life, and Livability nest under Interactive Tools.
 * Hub stays off this list for now.
 */
export const mobileFieldNav: readonly MobileNavSection[] = [
  { id: "home", label: "Home", href: "/" },
  {
    id: "start",
    label: "Start Here",
    href: "/situations",
    children: [{ label: "All situations", href: "/situations" }, ...whatsChanging],
  },
  {
    id: "guides",
    label: "Guides",
    href: "/guides",
    children: [
      { label: "All Guides", href: "/guides" },
      { label: "Resource Hub", href: "/resources" },
      ...guidesLibraryNav
        .filter((item) => item.id !== "neighborhoods")
        .map((item) => ({ label: item.label, href: item.href })),
      {
        id: "neighborhoods",
        label: "Neighborhoods",
        href: "/guides#neighborhoods",
        children: manhattanNeighborhoodGuides.map((item) => ({ label: item.name, href: item.href })),
      },
      ...publicGuides.map((guide) => ({ label: guide.title, href: guide.href })),
    ],
  },
  { id: "articles", label: "Articles", href: "/articles" },
  {
    id: "tools",
    label: "Interactive Tools",
    href: "/tools",
    children: [
      { label: "All tools", href: "/tools" },
      { label: "Calculator", href: "/calculator" },
      { label: "Wheel of Life", href: "/tools/wheel-of-life/" },
      { label: "Livability", href: "/tools/livability/" },
    ],
  },
  { id: "contact", label: "Contact", href: "/contact" },
];

export function isMobileNavBranch(item: MobileNavLink | MobileNavBranch): item is MobileNavBranch {
  return isBranch(item);
}

export function collectMobileNavHrefs(sections: readonly MobileNavSection[] = mobileFieldNav): string[] {
  const hrefs: string[] = [];
  for (const section of sections) {
    if (section.href) hrefs.push(section.href);
    for (const child of section.children ?? []) {
      if (isBranch(child)) {
        if (child.href) hrefs.push(child.href);
        hrefs.push(...child.children.map((item) => item.href));
      } else {
        hrefs.push(child.href);
      }
    }
  }
  return hrefs;
}

export function defaultOpenSectionId(location: string): string | null {
  const path = location.split(/[?#]/)[0] ?? location;
  if (
    path === "/calculator" ||
    path.startsWith("/calculator/") ||
    path === "/tools" ||
    path.startsWith("/tools/")
  ) {
    return "tools";
  }
  if (
    path === "/guides" ||
    path.startsWith("/guides/") ||
    path === "/resources" ||
    path.startsWith("/resources/") ||
    path.startsWith("/building-reports")
  ) {
    return "guides";
  }
  if (path === "/situations" || path.startsWith("/situations/") || path === "/belonging" || path === "/international") {
    return "start";
  }
  if (path === "/articles" || path.startsWith("/articles/")) return "articles";
  return null;
}

export function isHardMobileHref(href: string) {
  return (
    href.endsWith(".html") ||
    href.startsWith("/resources") ||
    href === "/guides/building-terms" ||
    href.startsWith("/guides/building-terms/") ||
    href === "/tools/wheel-of-life" ||
    href.startsWith("/tools/wheel-of-life/") ||
    href === "/tools/livability" ||
    href.startsWith("/tools/livability/")
  );
}

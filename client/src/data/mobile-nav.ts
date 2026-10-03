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
 * Mobile field menu. Not the desktop header.
 * Home · Start Here · Guides · The Board · Contact stay the public doors.
 * Calculator nests here so the hamburger works in the field. Hub stays off this list for now.
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
  { id: "board", label: "The Board", href: "/board" },
  { id: "calculator", label: "Calculator", href: "/calculator" },
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
  if (path === "/board" || path.startsWith("/board/")) return "board";
  if (path === "/calculator" || path.startsWith("/calculator/")) return "calculator";
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
  return null;
}

export function isHardMobileHref(href: string) {
  return href.endsWith(".html") || href.startsWith("/resources");
}

import { Link } from "wouter";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { publicSideToolsEnabled } from "@shared/public-side-tools";

type ToolTap = {
  title: string;
  href: string;
  hard?: boolean;
};

const ALWAYS_PUBLIC_TOOLS: readonly ToolTap[] = [
  { title: "Calculator", href: "/calculator" },
  { title: "Wheel of Life", href: "/tools/wheel-of-life/", hard: true },
];

const SIDE_TOOLS: readonly ToolTap[] = [
  { title: "Livability", href: "/tools/livability/", hard: true },
  { title: "Decision Guide", href: "/tools/communication-map" },
];

export function publicTools(enabled = publicSideToolsEnabled()): readonly ToolTap[] {
  return enabled ? [...ALWAYS_PUBLIC_TOOLS, ...SIDE_TOOLS] : ALWAYS_PUBLIC_TOOLS;
}

const tapClass =
  "flex min-h-[5.75rem] items-center border border-brand-navy bg-white px-5 font-display text-[clamp(1.85rem,6vw,2.75rem)] leading-none text-brand-navy sm:min-h-[8.5rem] lg:min-h-[11rem] lg:px-8";

export default function ToolsHome() {
  usePageMetadata({
    title: "Interactive Tools",
    description: publicSideToolsEnabled()
      ? "Calculator, Wheel of Life, Livability, and Decision Guide."
      : "Calculator and Wheel of Life.",
    path: "/tools",
  });

  return (
    <main className="bg-brand-ivory" data-testid="tools-index">
      <header className="border-b border-brand-border bg-brand-navy text-brand-ivory">
        <div className="mx-auto max-w-site px-5 py-3 sm:px-6 lg:px-10 lg:py-5">
          <h1 className="font-display text-[clamp(1.65rem,4vw,2.25rem)] leading-none">Interactive Tools</h1>
        </div>
      </header>

      <div className="mx-auto grid max-w-site grid-cols-1 gap-3 px-4 py-4 sm:px-6 lg:grid-cols-2 lg:gap-4 lg:px-10 lg:py-6">
        {publicTools().map((tool) =>
          tool.hard ? (
            <a key={tool.href} href={tool.href} className={tapClass}>
              {tool.title}
            </a>
          ) : (
            <Link key={tool.href} href={tool.href} className={tapClass}>
              {tool.title}
            </Link>
          ),
        )}
      </div>
    </main>
  );
}

import { Link } from "wouter";
import { usePageMetadata } from "@/hooks/usePageMetadata";

type ToolTap = {
  title: string;
  href: string;
  hard?: boolean;
};

const PUBLIC_TOOLS: readonly ToolTap[] = [
  { title: "Calculator", href: "/calculator" },
  { title: "Wheel of Life", href: "/tools/wheel-of-life/", hard: true },
  { title: "Livability", href: "/tools/livability/", hard: true },
  { title: "Decision Guide", href: "/tools/communication-map" },
];

const tapClass =
  "flex min-h-[5.75rem] items-center border border-brand-navy bg-white px-5 font-display text-[clamp(1.85rem,6vw,2.75rem)] leading-none text-brand-navy sm:min-h-[8.5rem] lg:min-h-[11rem] lg:px-8";

export default function ToolsHome() {
  usePageMetadata({
    title: "Interactive Tools",
    description: "Calculator, Wheel of Life, Livability, and Decision Guide.",
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
        {PUBLIC_TOOLS.map((tool) =>
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

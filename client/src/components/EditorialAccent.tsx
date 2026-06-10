type EditorialAccentVariant = "facade" | "blueprint";

export function EditorialAccent({ variant }: { variant: EditorialAccentVariant }) {
  if (variant === "facade") {
    return (
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[min(42%,320px)] opacity-[0.14] lg:block"
        aria-hidden
      >
        <svg viewBox="0 0 280 420" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M40 380V120c0-8 12-24 40-36s56-12 80-8 56 20 80 36 40 28 40 36v260"
            stroke="currentColor"
            strokeWidth="1.2"
            className="text-brand-champagne"
          />
          <path d="M72 160v220M112 148v232M152 140v240M192 148v232M232 160v220" stroke="currentColor" strokeWidth="0.8" className="text-brand-ivory/80" />
          <path d="M56 200h168M56 260h168M56 320h168" stroke="currentColor" strokeWidth="0.6" className="text-brand-ivory/50" />
          <ellipse cx="140" cy="88" rx="48" ry="18" stroke="currentColor" strokeWidth="0.8" className="text-brand-champagne/70" />
        </svg>
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute bottom-6 right-6 h-36 w-36 opacity-[0.12] md:h-44 md:w-44"
      aria-hidden
    >
      <svg viewBox="0 0 160 160" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="8" width="144" height="144" stroke="currentColor" strokeWidth="0.8" className="text-brand-champagne" />
        <path d="M8 40h144M8 72h144M8 104h144M40 8v144M72 8v144M104 8v144" stroke="currentColor" strokeWidth="0.5" className="text-brand-midnight/40" />
        <path d="M24 128 L56 96 L88 112 L120 72 L136 88" stroke="currentColor" strokeWidth="1" className="text-brand-champagne" />
        <circle cx="120" cy="72" r="3" fill="currentColor" className="text-brand-champagne" />
      </svg>
    </div>
  );
}

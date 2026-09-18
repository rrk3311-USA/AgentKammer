import { useEffect, useState } from "react";

type PublicPick = {
  id: string;
  address: string;
  askPrice: string | null;
  band: string;
  sourceUrl: string;
  status: string;
};

function bandLabel(band: string) {
  if (band === "5-10") return "$5–10M";
  if (band === "10-15") return "$10–15M";
  if (band === "15-20") return "$15–20M";
  return band;
}

/**
 * Optional Hub hook: Selected on-sale picks only.
 * Pins / StreetEasy favorites stay on Saved. Never shows raphi_replaced.
 */
export function HubPicks() {
  const [picks, setPicks] = useState<PublicPick[] | null>(null);

  useEffect(() => {
    void fetch("/api/curation/picks")
      .then((res) => res.json())
      .then((body) => setPicks(Array.isArray(body.picks) ? body.picks : []))
      .catch(() => setPicks([]));
  }, []);

  if (!picks?.length) return null;

  return (
    <section className="border-t border-[#D8D1C7] pt-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2A3447]/55">Picks</p>
      <p className="mt-2 text-sm text-[#2F3136]/70">A short on-sale list from the advisory desk. Separate from what you pin.</p>
      <ul className="mt-4 space-y-3">
        {picks.slice(0, 5).map((pick) => (
          <li key={pick.id} className="border-l border-[#D8D1C7] pl-3">
            <a
              href={pick.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-[#2A3447] underline-offset-4 hover:underline"
            >
              {pick.address}
            </a>
            <p className="mt-1 text-xs text-[#2F3136]/60">
              {[pick.askPrice, bandLabel(pick.band)].filter(Boolean).join(" · ")}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

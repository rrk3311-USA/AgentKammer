import { addSuggestion, createBatch, listBatches, listSuggestions } from "./repository";
import { currentCurationPeriod } from "./types";

/**
 * Clearly labeled SAMPLE shortlist so the admin desk is demoable
 * before Raphi’s first real StreetEasy paste.
 */
const SAMPLE_SUGGESTIONS = [
  {
    address: "SAMPLE · 15 Hudson Yards, #PH — Hudson Yards",
    askPrice: "$8.40M",
    band: "5-10" as const,
    persona: "Design-conscious executive",
    notes: "SAMPLE placeholder. Manhattan condo · for sale. Swap with a live StreetEasy URL.",
    sourceUrl: "https://streeteasy.com/building/15-hudson-yards-new_york/sample-curation-iq",
    rank: 1,
  },
  {
    address: "SAMPLE · 565 Broome Street, #12A — SoHo / Hudson Square",
    askPrice: "$6.85M",
    band: "5-10" as const,
    persona: "Light-and-quiet household",
    notes: "SAMPLE placeholder. Primary publish band ($5–15M).",
    sourceUrl: "https://streeteasy.com/building/565-broome-street-new_york/sample-curation-iq",
    rank: 2,
  },
  {
    address: "SAMPLE · One High Line, #9B — West Chelsea",
    askPrice: "$9.10M",
    band: "5-10" as const,
    notes: "SAMPLE placeholder. Well-known public building used as a stand-in only.",
    sourceUrl: "https://streeteasy.com/building/one-high-line-new_york/sample-curation-iq",
    rank: 3,
  },
  {
    address: "SAMPLE · 432 Park Avenue, #56A — Billionaires’ Row",
    askPrice: "$12.50M",
    band: "10-15" as const,
    persona: "Trophy-adjacent pied-à-terre",
    notes: "SAMPLE placeholder. Upper primary publish band.",
    sourceUrl: "https://streeteasy.com/building/432-park-avenue-new_york/sample-curation-iq",
    rank: 4,
  },
  {
    address: "SAMPLE · 220 Central Park South, #36 — Central Park South",
    askPrice: "$18.00M",
    band: "15-20" as const,
    notes: "SAMPLE placeholder. Trophy-only band — research, not a default public pick.",
    sourceUrl: "https://streeteasy.com/building/220-central-park-south-new_york/sample-curation-iq",
    rank: 5,
  },
];

export async function seedCurationSample(force = false) {
  const existing = await listBatches();
  if (existing.length > 0 && !force) {
    const suggestions = await listSuggestions(existing[0].id);
    return { created: false, batchId: existing[0].id, suggestionCount: suggestions.length };
  }

  const batch = await createBatch({
    periodDate: currentCurationPeriod(),
    notes:
      "SAMPLE Suggested shortlist — labeled placeholders for the Curation IQ desk. Replace by pasting live StreetEasy Most Popular sale URLs (Manhattan condos, $5–20M). MLS/RESO later.",
  });

  const created = [];
  for (const row of SAMPLE_SUGGESTIONS) {
    created.push(
      await addSuggestion({
        batchId: batch.id,
        ...row,
        rawPayload: JSON.stringify({ sample: true, source: "seed", listingType: "sale" }),
      }),
    );
  }

  return { created: true, batchId: batch.id, suggestionCount: created.length };
}

export async function ensureCurationSeeded() {
  return seedCurationSample(false);
}

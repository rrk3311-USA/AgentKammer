/** Reserved hook. Off in v1. Do not render. */

export const SUGGESTIONS_ENABLED = false;

/**
 * Similar homes at a price is licensed listing work.
 * This version never invents, fetches, or returns listings.
 */
export function suggestSimilarListings(_context = {}) {
  return {
    enabled: false,
    items: [],
    reason: "Suggestions stay off in this version.",
  };
}

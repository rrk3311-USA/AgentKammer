/**
 * Future MLS / RESO feed adapter.
 *
 * v1 source of truth is operator paste: StreetEasy (or listing) URLs into Suggested.
 * Operators capture StreetEasy Most Popular per band (Weekly OS style) twice a month
 * (1st & 15th). Do not scrape StreetEasy or Zillow in production.
 *
 * When the brokerage MLS/RESO feed lands, implement this interface and swap the
 * Suggested ingest path. Suggested → Selected does not need a redesign.
 */
export type MlsListing = {
  externalId: string;
  address: string;
  askPrice?: string;
  askPriceCents?: number;
  band?: "5-10" | "10-15" | "15-20";
  sourceUrl: string;
  borough?: string;
  propertyType?: string;
  listingType?: "sale" | "rental";
  raw?: Record<string, unknown>;
};

export interface MlsFeedAdapter {
  listForSaleManhattanCondos(input: {
    minAskCents?: number;
    maxAskCents?: number;
  }): Promise<MlsListing[]>;
}

export class UnconfiguredMlsFeedAdapter implements MlsFeedAdapter {
  async listForSaleManhattanCondos(): Promise<MlsListing[]> {
    throw new Error(
      "MlsFeedAdapter is a stub. v1 uses admin paste of StreetEasy / listing URLs. Wire the brokerage RESO feed here later.",
    );
  }
}

export const mlsFeedAdapter: MlsFeedAdapter = new UnconfiguredMlsFeedAdapter();

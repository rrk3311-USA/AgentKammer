import { beforeEach, describe, expect, it } from "vitest";
import {
  addSuggestion,
  createBatch,
  CurationError,
  listPublicPicks,
  listSelections,
  listSuggestions,
  promoteSuggestion,
  resetCurationMemory,
  setOnSale,
  updateSelection,
} from "./repository";
import { seedCurationSample } from "./seed";
import { currentCurationPeriod, looksLikeRentalUrl } from "./types";

describe("Curation IQ", () => {
  beforeEach(() => resetCurationMemory());

  it("seeds a sample Suggested batch with labeled placeholders", async () => {
    const result = await seedCurationSample();
    expect(result.created).toBe(true);
    expect(result.suggestionCount).toBe(5);
    const rows = await listSuggestions(result.batchId);
    expect(rows.every((row) => row.address.startsWith("SAMPLE"))).toBe(true);
    expect(rows.map((row) => row.band)).toEqual(["5-10", "5-10", "5-10", "10-15", "15-20"]);
  });

  it("keeps Suggested and Selected as separate layers", async () => {
    const { batchId } = await seedCurationSample();
    const [first] = await listSuggestions(batchId);
    const selected = await promoteSuggestion(first.id);
    expect(selected.suggestionId).toBe(first.id);
    expect(selected.onSale).toBe(false);
    expect((await listSuggestions(batchId)).length).toBe(5);
    expect((await listSelections()).length).toBe(1);
  });

  it("flags raphi_replaced and stores replaced_suggestion_id when Raphi swaps a listing", async () => {
    const { batchId } = await seedCurationSample();
    const [first] = await listSuggestions(batchId);
    const selected = await promoteSuggestion(first.id);
    const replaced = await updateSelection(selected.id, {
      address: "SAMPLE · 111 West 57th Street, #40 — Midtown",
      sourceUrl: "https://streeteasy.com/building/111-west-57-street-new_york/sample-replaced",
      replaceAsRaphi: true,
    });
    expect(replaced.raphiReplaced).toBe(true);
    expect(replaced.replacedSuggestionId).toBe(first.id);
    expect((await listSuggestions(batchId)).some((row) => row.id === first.id)).toBe(true);
  });

  it("auto-flags raphi_replaced when the Selected listing URL changes", async () => {
    const { batchId } = await seedCurationSample();
    const [first] = await listSuggestions(batchId);
    const selected = await promoteSuggestion(first.id);
    const replaced = await updateSelection(selected.id, {
      sourceUrl: "https://streeteasy.com/building/lantern-house-new_york/sample-swap",
    });
    expect(replaced.raphiReplaced).toBe(true);
    expect(replaced.replacedSuggestionId).toBe(first.id);
  });

  it("sell / unsell toggles the public drop without deleting history", async () => {
    const { batchId } = await seedCurationSample();
    const [first] = await listSuggestions(batchId);
    const selected = await promoteSuggestion(first.id);
    const live = await setOnSale(selected.id, true);
    expect(live.onSale).toBe(true);
    expect((await listPublicPicks()).map((row) => row.id)).toEqual([live.id]);
    expect((await listPublicPicks())[0]).not.toHaveProperty("raphiReplaced");

    const off = await setOnSale(selected.id, false);
    expect(off.onSale).toBe(false);
    expect(await listPublicPicks()).toEqual([]);
    expect((await listSelections()).length).toBe(1);
  });

  it("caps live on-sale picks at 5", async () => {
    const batch = await createBatch({ periodDate: currentCurationPeriod() });
    const promoted = [];
    for (let i = 0; i < 6; i += 1) {
      const suggestion = await addSuggestion({
        batchId: batch.id,
        address: `SAMPLE · Cap test ${i}`,
        askPrice: "$7.00M",
        band: "5-10",
        sourceUrl: `https://streeteasy.com/building/sample-${i}`,
      });
      promoted.push(await promoteSuggestion(suggestion.id));
    }
    for (let i = 0; i < 5; i += 1) {
      await setOnSale(promoted[i].id, true);
    }
    await expect(setOnSale(promoted[5].id, true)).rejects.toBeInstanceOf(CurationError);
    expect((await listPublicPicks()).length).toBe(5);
  });

  it("rejects rental URLs", async () => {
    expect(looksLikeRentalUrl("https://streeteasy.com/rental/123")).toBe(true);
    const batch = await createBatch({ periodDate: currentCurationPeriod() });
    await expect(
      addSuggestion({
        batchId: batch.id,
        address: "SAMPLE · rental",
        band: "5-10",
        sourceUrl: "https://streeteasy.com/rental/123",
      }),
    ).rejects.toBeInstanceOf(CurationError);
  });
});

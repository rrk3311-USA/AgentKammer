import { describe, expect, it } from "vitest";
import { hashPin, isValidPin } from "./gate";

describe("007 tank PIN", () => {
  it("accepts 4–8 digits only", () => {
    expect(isValidPin("123")).toBe(false);
    expect(isValidPin("1234")).toBe(true);
    expect(isValidPin("12345678")).toBe(true);
    expect(isValidPin("123456789")).toBe(false);
    expect(isValidPin("12ab")).toBe(false);
  });

  it("hashes without storing the digits in the digest string as plaintext", async () => {
    const digest = await hashPin("2468");
    expect(digest).toHaveLength(64);
    expect(digest.includes("2468")).toBe(false);
    expect(await hashPin("2468")).toBe(digest);
    expect(await hashPin("2469")).not.toBe(digest);
  });
});

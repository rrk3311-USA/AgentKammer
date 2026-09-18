import { describe, expect, it } from "vitest";
import {
  CONTACT_NEXT_STEPS,
  KAMMER_VERDICTS,
  PUBLIC_PRODUCTS,
  resolvePublicIntent,
} from "./public-menu";

describe("public menu lock", () => {
  it("exposes exactly the five locked products", () => {
    expect(Object.keys(PUBLIC_PRODUCTS)).toEqual([
      "guidance",
      "situation",
      "property",
      "livability",
      "strategy",
    ]);
    expect([...CONTACT_NEXT_STEPS]).toEqual([
      "Guidance",
      "Situation Assessment",
      "Property Assessment",
      "Livability Score",
      "Strategy Session",
    ]);
  });

  it("maps legacy belonging intent to Situation Assessment", () => {
    expect(resolvePublicIntent("belonging")).toBe("situation");
    expect(resolvePublicIntent("situation")).toBe("situation");
    expect(resolvePublicIntent("property")).toBe("property");
    expect(resolvePublicIntent("unknown")).toBeNull();
  });

  it("keeps show verdicts without numeric scores", () => {
    expect([...KAMMER_VERDICTS]).toEqual(["Pick", "Consider", "Wait", "Pass"]);
  });
});

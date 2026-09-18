import { describe, expect, it } from "vitest";
import { primaryNav } from "@/components/site-shell";
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

  it("locks primary header nav to six short labels", () => {
    expect(primaryNav.map((item) => [item.label, item.href])).toEqual([
      ["Home", "/"],
      ["Start Here", "/buyer-advisory"],
      ["Situations", "/situations"],
      ["Buildings", "/building-reports"],
      ["Guides", "/guides"],
      ["About", "/about"],
    ]);
  });
});

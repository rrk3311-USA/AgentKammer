import { describe, expect, it } from "vitest";
import {
  buildContactOffer,
  replyAsksForContact,
  shouldOfferContact,
  visitorAskedToSave,
} from "./decision-contact";

const deepProfile = {
  situation: "relocating",
  desire: "pied-à-terre",
  constraints: "start date",
  tradeOff: "flex over size",
  timeline: "60 days",
};

describe("shouldOfferContact", () => {
  it("never asks in the first five visitor turns, even with a deep profile", () => {
    expect(shouldOfferContact(deepProfile, 8, 1, "We're relocating.")).toBe(false);
    expect(shouldOfferContact(deepProfile, 8, 3, "Office is near Grand Central.")).toBe(false);
    expect(shouldOfferContact(deepProfile, 8, 5, "Kids need schools.")).toBe(false);
  });

  it("offers after meaningful multi-turn help", () => {
    expect(shouldOfferContact(deepProfile, 5, 6)).toBe(true);
    expect(shouldOfferContact({ situation: "relocating", desire: "space", constraints: "budget", tradeOff: "flex" }, 4, 7)).toBe(
      true,
    );
  });

  it("opens immediately when the visitor asks to save, continue later, or book", () => {
    expect(shouldOfferContact({}, 0, 2, "Can you email me this later?")).toBe(true);
    expect(shouldOfferContact({}, 0, 1, "I want this waiting for me.")).toBe(true);
    expect(shouldOfferContact({}, 0, 3, "Book a session next week.")).toBe(true);
  });

  it("does not treat ordinary guidance words as a save request", () => {
    expect(visitorAskedToSave("Should I call the board before touring?")).toBe(false);
    expect(visitorAskedToSave("The building has a booking policy.")).toBe(false);
    expect(shouldOfferContact(deepProfile, 8, 2, "Should I call the board before touring?")).toBe(false);
  });

  it("does not re-ask once contact exists", () => {
    expect(shouldOfferContact({ ...deepProfile, email: "a@b.com" }, 8, 9, "email me")).toBe(false);
  });
});

describe("replyAsksForContact", () => {
  it("ignores educational uses of send or contact", () => {
    expect(replyAsksForContact("I would send you toward the relocation brief next.")).toBe(false);
    expect(replyAsksForContact("Board contact is usually the managing agent, not the seller.")).toBe(false);
  });

  it("detects a real capture invite", () => {
    expect(replyAsksForContact(buildContactOffer())).toBe(true);
  });
});

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/pages/board.css", () => ({}));

import Board from "@/pages/Board";
import {
  BOARD_FOOTER_DISCLAIMER,
  boardData,
  collectBoardCopy,
  computeBoardTally,
  findForbiddenBoardCopy,
  isSampleBoard,
  minuteData,
} from "./board";

describe("weekly board data", () => {
  it("computes the movement tally from listings and band calls", () => {
    expect(computeBoardTally(boardData)).toEqual({
      HOLD: 1,
      NEW: 1,
      MOVER: 1,
      "SOLD / IN CONTRACT": 0,
      WAIT: 1,
    });
  });

  it("keeps the sample banner on while placeholder fields remain", () => {
    expect(isSampleBoard(boardData)).toBe(true);
    expect(boardData.sample.on).toBe(true);
    expect(boardData.sample.bar.toLowerCase()).toContain("sample data");
  });

  it("exposes exactly three band #1s and the required disclaimer", () => {
    expect(boardData.listings).toHaveLength(3);
    expect(boardData.listings.map((listing) => listing.band)).toEqual([
      "$5M to $10M",
      "$10M to $15M",
      "$15M to $20M",
    ]);
    expect(boardData.footer.fine).toBe(BOARD_FOOTER_DISCLAIMER);
  });

  it("keeps the current Minute only, with the sample daily", () => {
    expect(minuteData.address).toBe("1200 Fifth Avenue #PHB");
    expect(minuteData.neighborhood).toBe("Upper Carnegie Hill");
    expect(minuteData.price).toBe("$17,995,000");
    expect(minuteData.call).toBe("PASS");
    expect(minuteData.callQualifier).toBe("at ask");
    expect(minuteData.aside).toBe("A penthouse where the dining room and the terrace have never shared a floor.");
    expect(minuteData.date).toBe("Oct 2, 2026");
    expect(minuteData.sample).toBe(true);
    expect(Array.isArray((minuteData as { archive?: unknown }).archive)).toBe(false);
  });

  it("rejects em dashes, en dashes, and brokerage language", () => {
    expect(findForbiddenBoardCopy(collectBoardCopy())).toEqual([]);
  });
});

describe("weekly board page", () => {
  it("renders the sample board, today's Minute, and no listing photos", () => {
    const html = renderToStaticMarkup(createElement(Board));
    expect(html).toContain("Sample data");
    expect(html).toContain("This week&#x27;s");
    expect(html).toContain("<em>board</em>");
    expect(html).toContain("221 W 77th St #16");
    expect(html).toContain("50 W 66th St #5D");
    expect(html).toContain("Sample Listing C");
    expect(html).toContain("1200 Fifth Avenue #PHB");
    expect(html).toContain("Upper Carnegie Hill");
    expect(html).toContain("Today&#x27;s Minute");
    expect(html).toContain(BOARD_FOOTER_DISCLAIMER);
    expect(html).toContain("/board/ak-deep.png");
    expect(html).not.toMatch(/<img[^>]+src="(?!\/board\/ak-deep\.png)[^"]+"/);
    expect(html.toLowerCase()).not.toContain("qr");
    expect(html.toLowerCase()).not.toContain("real estate advisor");
    expect(html).not.toContain("\u2014");
    expect(html).not.toContain("\u2013");
    expect(html).not.toContain("Sep 27, 2026");
  });
});

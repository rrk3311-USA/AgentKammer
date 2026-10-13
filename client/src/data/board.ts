/**
 * Weekly Property Assessment board + daily Manhattan Minute.
 *
 * Pipeline contract
 * -----------------
 * Overwrite the JSON files and redeploy. Do not put photos, QR codes, scores,
 * past weeks, or past dailies in these files.
 *
 *   client/src/data/board-data.json   weekly. Tally is computed here, not stored.
 *   client/src/data/minute-data.json  daily. Current Minute only. No archive.
 *
 * board-data.json
 *   sample.on / weekSample / listing.sample[] / brief.sample / checks.items[].sample
 *     flip the SAMPLE DATA bar. Keep sample.on true until the week is real.
 *   listings[] (exactly three bands: $5M to $10M, $10M to $15M, $15M to $20M)
 *     band, address, neighborhood, price,
 *     status: HOLD | NEW | MOVER | SOLD / IN CONTRACT | WAIT,
 *     optional bandCall (WAIT when the band has no recommendable #1),
 *     who (one use-based buyer fit, never demographics),
 *     call: PICK | CONSIDER | WAIT | PASS, callQualifier, callClass,
 *     moveNote, last { address, price, call, callQualifier?, same },
 *     sample?: field names that are placeholders this week
 *   statusKey[], brief[], checks, footer.fine
 *     footer.fine must stay: "Educational commentary. Not advice. Opinions of Raphael Kammer."
 *
 * minute-data.json
 *   sample, date, dateISO, address, neighborhood, band, price,
 *   call, callQualifier, callClass, aside
 *   The page renders this current daily only.
 *
 * Copy rules: no em or en dashes, no "real estate advisor", no guarantees.
 */

import rawBoard from "./board-data.json";
import rawMinute from "./minute-data.json";

export const BOARD_STATUS_CODES = ["HOLD", "NEW", "MOVER", "SOLD / IN CONTRACT", "WAIT"] as const;
export const BOARD_CALLS = ["PICK", "CONSIDER", "WAIT", "PASS"] as const;

export type BoardStatusCode = (typeof BOARD_STATUS_CODES)[number];
export type BoardCall = (typeof BOARD_CALLS)[number];

export type BoardStatusKey = {
  code: BoardStatusCode;
  cls: "hold" | "new" | "mover" | "sold" | "wait";
  tally: string;
  meaning: string;
};

export type BoardLastWeek = {
  address: string;
  price: string;
  call: BoardCall;
  callQualifier?: string;
  same: boolean;
};

export type BoardListing = {
  band: string;
  address: string;
  neighborhood: string;
  price: string;
  status: BoardStatusCode;
  bandCall?: BoardStatusCode;
  who: string;
  call: BoardCall;
  callQualifier?: string;
  callClass: "pick" | "consider" | "wait" | "pass";
  moveNote: string;
  last: BoardLastWeek;
  sample?: string[];
};

export type BoardBrief = {
  k: string;
  v: string;
  em?: string;
  sample?: boolean;
};

export type BoardCheck = {
  band: string;
  address: string;
  call: BoardCall;
  callClass: "pick" | "consider" | "wait" | "pass";
  qualifier?: string;
  result: string;
  resultClass: "held" | "open" | "missed";
  resultNote: string;
  sample?: boolean;
  test: string;
};

export type BoardData = {
  notes: string[];
  guidance: string[];
  sample: {
    on: boolean;
    bar: string;
    note: string;
  };
  kicker: string;
  headingPre: string;
  headingEm: string;
  week: string;
  weekSample: boolean;
  universe: string;
  lede: string;
  lastWeekLabel: string;
  barTitle: string;
  panelNote: string;
  method: string;
  statusKey: BoardStatusKey[];
  verdictLine: string;
  brief: BoardBrief[];
  checks: {
    title: string;
    intro: string;
    items: BoardCheck[];
  };
  footer: {
    site: string;
    fine: string;
  };
  listings: BoardListing[];
};

export type MinuteData = {
  notes: string[];
  sample: boolean;
  kicker: string;
  source: string;
  date: string;
  dateISO: string;
  address: string;
  neighborhood: string;
  band: string;
  price: string;
  call: BoardCall;
  callQualifier?: string;
  callClass: "pick" | "consider" | "wait" | "pass";
  aside: string;
};

export const boardData = rawBoard as BoardData;
export const minuteData = rawMinute as MinuteData;

export const BOARD_FOOTER_DISCLAIMER = "Educational commentary. Not advice. Opinions of Raphael Kammer.";

export function isSampleBoard(data: BoardData = boardData): boolean {
  if (data.sample.on || data.weekSample) return true;
  if (data.listings.some((listing) => (listing.sample?.length ?? 0) > 0)) return true;
  if (data.brief.some((item) => item.sample)) return true;
  if (data.checks.items.some((item) => item.sample)) return true;
  return false;
}

export function computeBoardTally(data: BoardData = boardData): Record<BoardStatusCode, number> {
  const tally = Object.fromEntries(data.statusKey.map((item) => [item.code, 0])) as Record<BoardStatusCode, number>;
  for (const listing of data.listings) {
    tally[listing.status] += 1;
    if (listing.bandCall) tally[listing.bandCall] += 1;
  }
  return tally;
}

export function titleCall(call: string): string {
  return call.charAt(0).toUpperCase() + call.slice(1).toLowerCase();
}

export function listingIsPlaceholder(listing: BoardListing): boolean {
  return listing.sample?.includes("address") ?? false;
}

const EM_DASH = "\u2014";
const EN_DASH = "\u2013";

export function collectBoardCopy(data: BoardData = boardData, minute: MinuteData = minuteData): string[] {
  const strings: string[] = [
    data.sample.bar,
    data.sample.note,
    data.kicker,
    data.headingPre,
    data.headingEm,
    data.week,
    data.universe,
    data.lede,
    data.lastWeekLabel,
    data.barTitle,
    data.panelNote,
    data.method,
    data.verdictLine,
    data.footer.site,
    data.footer.fine,
    minute.kicker,
    minute.source,
    minute.date,
    minute.address,
    minute.neighborhood,
    minute.band,
    minute.price,
    minute.call,
    minute.callQualifier ?? "",
    minute.aside,
  ];

  for (const status of data.statusKey) {
    strings.push(status.code, status.tally, status.meaning);
  }
  for (const listing of data.listings) {
    strings.push(
      listing.band,
      listing.address,
      listing.neighborhood,
      listing.price,
      listing.status,
      listing.who,
      listing.call,
      listing.callQualifier ?? "",
      listing.moveNote,
      listing.last.address,
      listing.last.price,
      listing.last.call,
      listing.last.callQualifier ?? "",
    );
  }
  for (const item of data.brief) {
    strings.push(item.k, item.v, item.em ?? "");
  }
  strings.push(data.checks.title, data.checks.intro);
  for (const item of data.checks.items) {
    strings.push(item.band, item.address, item.call, item.qualifier ?? "", item.result, item.resultNote, item.test);
  }
  return strings.filter(Boolean);
}

export function findForbiddenBoardCopy(strings: string[] = collectBoardCopy()): string[] {
  const banned = [
    "real estate advisor",
    "listing agent",
    "guarantee",
    "leaderboard",
    "champion",
    "winner",
    "tournament",
    "fight card",
    "broker",
  ];
  const hits: string[] = [];
  for (const value of strings) {
    if (value.includes(EM_DASH)) hits.push(`em dash: ${value}`);
    if (value.includes(EN_DASH)) hits.push(`en dash: ${value}`);
    const lower = value.toLowerCase();
    for (const word of banned) {
      if (lower.includes(word)) hits.push(`${word}: ${value}`);
    }
  }
  return hits;
}

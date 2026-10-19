/** Livability v1 scoring. Deterministic room-graph rules. Layout only. */
export const HORIZONS = [
  { id: "5", years: 5, label: "5 years", blurb: "Near term. Kids still small if you have them. Routines are forming." },
  { id: "10", years: 10, label: "10 years", blurb: "A decade. Privacy and a work room start to matter more." },
  { id: "15", years: 15, label: "15 years and on", blurb: "Long stay. Short, gentle paths and a bath near the main bedroom help." },
];

export const ROOM_TYPES = [
  { id: "entry", label: "Entry" },
  { id: "hallway", label: "Hall" },
  { id: "living", label: "Living" },
  { id: "dining", label: "Dining" },
  { id: "kitchen", label: "Kitchen" },
  { id: "bedroom", label: "Bedroom" },
  { id: "bath", label: "Bath" },
  { id: "study", label: "Study" },
  { id: "closet", label: "Closet" },
  { id: "terrace", label: "Terrace" },
  { id: "other", label: "Other" },
];

export function uid(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-3)}`;
}

export function emptyProfile() {
  return {
    id: "",
    name: "My household",
    householdSize: 2,
    kids: false,
    homebody: false,
    wfh: false,
    entertainer: false,
    pets: false,
    cooks: false,
    guestsOften: false,
  };
}

export function makeSuttonPlan() {
  const rooms = [
    { id: "foyer", name: "Foyer", type: "entry", sf: 48, x: 24, y: 168, w: 108, h: 148 },
    { id: "gallery", name: "Gallery", type: "hallway", sf: 56, x: 132, y: 168, w: 64, h: 200 },
    { id: "living", name: "Living", type: "living", sf: 286, x: 196, y: 20, w: 328, h: 148 },
    { id: "dining", name: "Dining", type: "dining", sf: 154, x: 196, y: 168, w: 188, h: 148 },
    { id: "kitchen", name: "Kitchen", type: "kitchen", sf: 92, x: 384, y: 168, w: 140, h: 148 },
    { id: "hall", name: "Sleeping hall", type: "hallway", sf: 42, x: 132, y: 368, w: 252, h: 48 },
    { id: "beda", name: "Bedroom A", type: "bedroom", sf: 168, x: 24, y: 368, w: 108, h: 168 },
    { id: "batha", name: "Bath A", type: "bath", sf: 46, x: 24, y: 536, w: 108, h: 56 },
    { id: "cloa", name: "Closet A", type: "closet", sf: 18, x: 132, y: 416, w: 52, h: 64 },
    { id: "bedb", name: "Bedroom B", type: "bedroom", sf: 148, x: 384, y: 368, w: 140, h: 148 },
    { id: "bathb", name: "Bath B", type: "bath", sf: 38, x: 384, y: 516, w: 88, h: 76 },
    { id: "clob", name: "Closet B", type: "closet", sf: 16, x: 472, y: 516, w: 52, h: 76 },
  ];
  const doors = [
    ["foyer", "gallery"],
    ["gallery", "living"],
    ["gallery", "dining"],
    ["dining", "kitchen"],
    ["gallery", "hall"],
    ["hall", "beda"],
    ["hall", "bedb"],
    ["beda", "batha"],
    ["beda", "cloa"],
    ["bedb", "bathb"],
    ["bedb", "clob"],
  ].map(([a, b]) => ({ a, b }));
  return {
    id: "plan-sutton-sample",
    name: "Sutton sample",
    source: "sample",
    address: "",
    listingUrl: "",
    imageName: "",
    rooms,
    doors,
    note: "Labeled demo. A classic two-bedroom line, drawn for this tool. Not a real listing.",
  };
}

export function makeRiversidePlan() {
  const rooms = [
    { id: "entry", name: "Entry", type: "entry", sf: 36, x: 20, y: 20, w: 88, h: 120 },
    { id: "living", name: "Living", type: "living", sf: 210, x: 108, y: 20, w: 220, h: 160 },
    { id: "kitchen", name: "Kitchen", type: "kitchen", sf: 68, x: 328, y: 20, w: 120, h: 160 },
    { id: "hall", name: "Hall", type: "hallway", sf: 28, x: 108, y: 180, w: 220, h: 40 },
    { id: "bed", name: "Bedroom", type: "bedroom", sf: 132, x: 108, y: 220, w: 160, h: 140 },
    { id: "bath", name: "Bath", type: "bath", sf: 40, x: 268, y: 220, w: 60, h: 140 },
    { id: "closet", name: "Closet", type: "closet", sf: 12, x: 20, y: 220, w: 88, h: 80 },
  ];
  const doors = [
    ["entry", "living"],
    ["living", "kitchen"],
    ["living", "hall"],
    ["kitchen", "hall"],
    ["hall", "bed"],
    ["kitchen", "bed"],
    ["bed", "bath"],
    ["hall", "closet"],
  ].map(([a, b]) => ({ a, b }));
  return {
    id: "plan-riverside-sample",
    name: "Riverside sample",
    source: "sample",
    address: "",
    listingUrl: "",
    imageName: "",
    rooms,
    doors,
    note: "Labeled demo. A railroad one-bedroom line, drawn for this tool. Not a real listing.",
  };
}

// Labeled sample from published public plans, not a survey.
// Sources:
// - NPS National Register nomination, Case Study House No. 22: L-plan, ~2,300 sf, 20-ft grid, public rooms in the short leg, bedrooms and carport in the long leg, dressing / master bath / service at the juncture, pool in the L, master bath behind the kitchen. https://npgallery.nps.gov/NRHP/GetAsset/21b55ed9-5129-4f45-aef5-3067e3e9f11d
// - Stahl House site: 1635 Woods Drive, 2,300 sf, 2 bedrooms, 2 baths. https://stahlhouse.com/info/
// - Wikipedia, "Stahl House": 2,200 sf, two bedrooms, glass on three sides. https://en.wikipedia.org/wiki/Stahl_House
// - Current listing (MLS 25621475 / BHHS): 1635 Woods Dr, Los Angeles, CA 90069, 2,200 sf, 2 bed, 3 bath (2 full, 1 half), jack-and-jill, utility, $20M.
// - Los Angeles Times, "Case Study House No. 22, by the numbers" (27 Jun 2009): 2,200 sf, two-bedroom.
// - Arts & Architecture, June 1960 (USModernist): Koenig CSH No. 22; living and kitchen as free-standing units; master bedroom looks across the pool.
// Room sizes below are approximate, scaled to that 2,200-2,300 sf envelope and the 20-foot bay.
export function makeStahlPlan() {
  const rooms = [
    { id: "living", name: "Living (approx.)", type: "living", sf: 390, x: 220, y: 16, w: 320, h: 150 },
    { id: "dining", name: "Dining (approx.)", type: "dining", sf: 230, x: 220, y: 166, w: 160, h: 128 },
    { id: "kitchen", name: "Kitchen (approx.)", type: "kitchen", sf: 280, x: 380, y: 166, w: 160, h: 128 },
    { id: "entry", name: "Entry (approx.)", type: "entry", sf: 70, x: 140, y: 166, w: 80, h: 128 },
    { id: "terrace", name: "Pool deck (approx.)", type: "terrace", sf: 180, x: 16, y: 166, w: 124, h: 360 },
    { id: "service", name: "Service (approx.)", type: "other", sf: 70, x: 380, y: 294, w: 80, h: 72 },
    { id: "mbath", name: "Master bath (approx.)", type: "bath", sf: 90, x: 460, y: 294, w: 80, h: 72 },
    { id: "bed2", name: "Bedroom 2 (approx.)", type: "bedroom", sf: 250, x: 220, y: 294, w: 160, h: 140 },
    { id: "hall", name: "Sleeping hall (approx.)", type: "hallway", sf: 50, x: 220, y: 434, w: 160, h: 40 },
    { id: "jjbath", name: "Hall bath (approx.)", type: "bath", sf: 50, x: 380, y: 366, w: 80, h: 68 },
    { id: "dress", name: "Dressing (approx.)", type: "closet", sf: 40, x: 460, y: 366, w: 80, h: 68 },
    { id: "mbed", name: "Master bedroom (approx.)", type: "bedroom", sf: 390, x: 220, y: 474, w: 240, h: 150 },
  ];
  const doors = [
    ["entry", "dining"],
    ["entry", "living"],
    ["living", "dining"],
    ["dining", "kitchen"],
    ["entry", "kitchen"],
    ["kitchen", "service"],
    ["kitchen", "mbath"],
    ["service", "mbath"],
    ["entry", "bed2"],
    ["bed2", "hall"],
    ["hall", "mbed"],
    ["bed2", "jjbath"],
    ["mbed", "jjbath"],
    ["mbed", "dress"],
    ["dress", "mbath"],
    ["living", "terrace"],
    ["dining", "terrace"],
    ["bed2", "terrace"],
    ["mbed", "terrace"],
    ["entry", "terrace"],
  ].map(([a, b]) => ({ a, b }));
  return {
    id: "plan-stahl-sample",
    name: "Stahl House (1635 Woods Dr) · approx. from public plans",
    source: "sample",
    address: "1635 Woods Dr, Los Angeles, CA 90069",
    listingUrl: "",
    imageName: "",
    rooms,
    doors,
    note: "Labeled sample. L-shaped glass plan from published public drawings. Room sizes are approximate. Not a measured survey and not fetched from the listing.",
  };
}

export const DEMO_PLANS = [
  { id: "sutton", label: "Sutton line", make: makeSuttonPlan, needles: ["sutton sample", "sutton line"] },
  { id: "riverside", label: "Riverside line", make: makeRiversidePlan, needles: ["riverside sample", "riverside line"] },
  {
    id: "stahl",
    label: "Stahl House",
    make: makeStahlPlan,
    needles: ["1635 woods", "stahl house", "stahl", "case study house 22", "case study house #22", "csh 22", "csh #22"],
  },
];

export function normalizePlace(query) {
  return String(query || "")
    .toLowerCase()
    .replace(/[.#,]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function matchKnownSample(query) {
  const q = normalizePlace(query);
  if (!q) return null;
  return DEMO_PLANS.find((demo) => (demo.needles || []).some((needle) => q.includes(normalizePlace(needle)))) || null;
}

export function cannotFetchPlan(query) {
  const place = String(query || "").trim() || "that address";
  return {
    ok: false,
    reason: `No floor plan is on file for ${place}. This version cannot read a listing page or a tax record. Upload a plan, or run a labeled demo against this address.`,
  };
}

export function heatMap(plan, result) {
  const traffic = {};
  for (const room of plan.rooms) traffic[room.id] = 0;
  for (const path of result?.flags?.paths || []) {
    for (const id of path.nodes) traffic[id] = (traffic[id] || 0) + 1;
  }
  const max = Math.max(1, ...Object.values(traffic));
  const cells = {};
  for (const room of plan.rooms) {
    const count = traffic[room.id] || 0;
    const intensity = count / max;
    let zone = "calm";
    if ((result?.flags?.bottlenecks || []).includes(room.id)) zone = "pinch";
    else if ((result?.flags?.quiet || []).includes(room.id)) zone = "quiet";
    else if (intensity >= 0.66) zone = "hot";
    else if (intensity >= 0.33) zone = "flow";
    cells[room.id] = { traffic: count, intensity, zone };
  }
  return cells;
}

function clamp(n, lo, hi) {
  return Math.max(lo, Math.min(hi, n));
}

function graphOf(plan) {
  const adj = new Map();
  for (const room of plan.rooms) adj.set(room.id, []);
  for (const door of plan.doors) {
    if (!adj.has(door.a) || !adj.has(door.b)) continue;
    adj.get(door.a).push(door.b);
    adj.get(door.b).push(door.a);
  }
  return adj;
}

function pathBetween(adj, start, goal) {
  if (!start || !goal || !adj.has(start) || !adj.has(goal)) return null;
  const q = [[start]];
  const seen = new Set([start]);
  while (q.length) {
    const cur = q.shift();
    const last = cur[cur.length - 1];
    if (last === goal) return cur;
    for (const next of adj.get(last) || []) {
      if (seen.has(next)) continue;
      seen.add(next);
      q.push([...cur, next]);
    }
  }
  return null;
}

function roomsOf(plan, type) {
  return plan.rooms.filter((room) => room.type === type);
}

function adjacent(adj, a, b) {
  return (adj.get(a) || []).includes(b);
}

function shortestExisting(adj, fromIds, toIds) {
  let best = null;
  for (const from of fromIds) {
    for (const to of toIds) {
      const path = pathBetween(adj, from, to);
      if (!path) continue;
      if (!best || path.length < best.length) best = path;
    }
  }
  return best;
}

export function scoreLivability(plan, profile, horizonId) {
  const adj = graphOf(plan);
  const beds = roomsOf(plan, "bedroom");
  const baths = roomsOf(plan, "bath");
  const closets = roomsOf(plan, "closet");
  const kitchens = roomsOf(plan, "kitchen");
  const livings = roomsOf(plan, "living");
  const dinings = roomsOf(plan, "dining");
  const studies = roomsOf(plan, "study");
  const entries = roomsOf(plan, "entry");
  const halls = roomsOf(plan, "hallway");
  const size = clamp(Number(profile.householdSize) || 1, 1, 8);
  const horizon = HORIZONS.find((item) => item.id === horizonId) || HORIZONS[0];
  const totalSf = plan.rooms.reduce((sum, room) => sum + (Number(room.sf) || 0), 0);
  const closetSf = closets.reduce((sum, room) => sum + (Number(room.sf) || 0), 0);
  const kitchenSf = kitchens.reduce((sum, room) => sum + (Number(room.sf) || 0), 0);
  const livingSf = livings.reduce((sum, room) => sum + (Number(room.sf) || 0), 0);

  const notes = [];
  const flags = { bottlenecks: [], quiet: [], strain: [], paths: [] };

  const morning = shortestExisting(
    adj,
    beds.map((room) => room.id),
    kitchens.map((room) => room.id),
  );
  const evening = shortestExisting(
    adj,
    entries.map((room) => room.id),
    beds.map((room) => room.id),
  );
  const guest = shortestExisting(
    adj,
    entries.map((room) => room.id),
    livings.map((room) => room.id),
  );
  const cook = shortestExisting(
    adj,
    kitchens.map((room) => room.id),
    dinings.map((room) => room.id),
  );

  if (morning) flags.paths.push({ id: "morning", label: "Morning", nodes: morning });
  if (evening) flags.paths.push({ id: "return", label: "Return", nodes: evening });
  if (guest) flags.paths.push({ id: "guest", label: "Guests", nodes: guest });
  if (cook) flags.paths.push({ id: "cook", label: "Kitchen to dining", nodes: cook });

  let circulation = 78;
  if (!morning) {
    circulation -= 16;
    notes.push("I cannot walk from a bedroom to the kitchen on the doors you drew.");
  } else if (morning.length > 5) {
    circulation -= 8;
    notes.push("The morning path is long. Breakfast will feel farther than the square footage suggests.");
  }
  if (!evening) {
    circulation -= 10;
    notes.push("There is no door path from the entry to a bedroom.");
  }
  for (const hall of halls) {
    const degree = (adj.get(hall.id) || []).length;
    if (degree >= 4 || hall.sf < 50) {
      circulation -= 7;
      flags.bottlenecks.push(hall.id);
      notes.push(`${hall.name} is doing too much work for its size. Most days will meet there.`);
    }
  }
  for (const kitchen of kitchens) {
    const degree = (adj.get(kitchen.id) || []).length;
    if (degree >= 3) {
      circulation -= 6;
      flags.bottlenecks.push(kitchen.id);
      notes.push(`${kitchen.name} sits on a through path. Cooking and walking will share the same floor.`);
    }
  }
  if (profile.homebody && livingSf < 180) {
    circulation -= 5;
    notes.push("A homebody household will feel the living room more than a larger common room would.");
  }

  let quiet = 80;
  for (const bed of beds) {
    const noisy = [...livings, ...kitchens, ...dinings].some((room) => adjacent(adj, bed.id, room.id));
    if (noisy) {
      quiet -= 12;
      notes.push(`${bed.name} opens onto a social room. Sleep and talk will share a door.`);
    } else {
      flags.quiet.push(bed.id);
    }
  }
  if (profile.kids && horizon.years >= 10 && beds.length < 2) {
    quiet -= 10;
    notes.push("At a ten-year stay, a second bedroom gives growing children a door of their own.");
  }
  if (!beds.length) {
    quiet -= 20;
    notes.push("I do not see a bedroom. Quiet scoring stays low until one is on the plan.");
  }

  let storage = 74;
  let need = 16 * size;
  if (profile.cooks) need += 12;
  if (profile.guestsOften || profile.entertainer) need += 10;
  if (profile.kids) need += 12;
  if (profile.pets) need += 8;
  if (horizon.years >= 15) need += 10;
  const gap = need - closetSf;
  if (gap > 20) {
    storage -= 18;
    for (const closet of closets) flags.strain.push(closet.id);
    if (!closets.length) flags.strain.push(...halls.map((room) => room.id));
    notes.push("Closet space is thin for this household and horizon. Halls will start to hold what rooms cannot.");
  } else if (gap > 0) {
    storage -= 8;
    notes.push("Storage is workable, not generous. A linen closet would take pressure off the halls.");
  } else {
    notes.push("Closets keep up with this household, which keeps the rooms themselves clearer.");
  }

  let fit = 76;
  const bedNeed = profile.kids && horizon.years >= 10 ? Math.max(2, Math.ceil(size / 2)) : Math.ceil(size / 2);
  if (beds.length < bedNeed) {
    fit -= 14;
    notes.push("Bedroom count is tight for the household you described.");
  }
  if (baths.length < Math.max(1, Math.round(size / 2))) {
    fit -= 8;
    notes.push("Bath count is lean for the morning crush this household would make.");
  }
  if (profile.cooks && kitchenSf < 80) {
    fit -= 10;
    notes.push("A household that cooks a lot will feel a kitchen under 80 square feet.");
  } else if (profile.cooks && kitchenSf >= 90) {
    fit += 4;
  }
  if ((profile.entertainer || profile.guestsOften) && (!livings.length || !dinings.length || !cook)) {
    fit -= 8;
    notes.push("Guests need a living room and a dining room that actually connect.");
  }
  if (profile.wfh) {
    const extraBed = beds.length > bedNeed;
    if (!studies.length && !extraBed) {
      fit -= 10;
      notes.push("Work from home wants a study, or a bedroom that is not already spoken for.");
    } else {
      fit += 4;
      notes.push("There is a room that can stay a work room without stealing a bed.");
    }
  }
  if (profile.pets && !entries.length) {
    fit -= 6;
    notes.push("Pets do better with a true entry, so the rest of the plan stays cleaner.");
  }
  if (horizon.years >= 15) {
    const primary = beds[0];
    const bathNear = primary && baths.some((bath) => adjacent(adj, primary.id, bath.id) || pathBetween(adj, primary.id, bath.id)?.length <= 3);
    if (!bathNear) {
      fit -= 10;
      notes.push("For a long stay, a bath should sit next to the main bedroom.");
    } else {
      fit += 3;
      notes.push("A bath near the main bedroom helps this plan age in place.");
    }
    if (morning && morning.length <= 4) fit += 3;
  }
  if (horizon.years === 5 && profile.kids && livingSf < 200) {
    fit -= 6;
    notes.push("The first five years with children ask more of the common room than this living room offers.");
  }
  if (totalSf > 0 && totalSf / size < 220) {
    fit -= 6;
    notes.push("Square footage per person is tight. Circulation and storage will do more of the work.");
  }

  circulation = clamp(Math.round(circulation), 0, 100);
  quiet = clamp(Math.round(quiet), 0, 100);
  storage = clamp(Math.round(storage), 0, 100);
  fit = clamp(Math.round(fit), 0, 100);
  const score = clamp(Math.round(circulation * 0.3 + quiet * 0.22 + storage * 0.2 + fit * 0.28), 0, 100);

  if (!notes.length) {
    notes.push("The rooms connect cleanly. Daily paths have somewhere to go.");
  }

  return {
    score,
    dimensions: {
      circulation,
      quiet,
      storage,
      fit,
    },
    notes: notes.slice(0, 7),
    flags,
    totals: { totalSf, closetSf, kitchenSf, livingSf, beds: beds.length, baths: baths.length },
    horizon: horizon.id,
  };
}

const FURN_ICONS = {
  bed: `<rect x="-20" y="-13" width="40" height="26" rx="2" fill="rgba(245,242,235,.06)" stroke="#E5E4E2" stroke-width="1.2"/><rect x="-16" y="-11" width="12" height="7" rx="1.5" fill="none" stroke="#D8D1C7"/><rect x="4" y="-11" width="12" height="7" rx="1.5" fill="none" stroke="#D8D1C7"/>`,
  crib: `<rect x="-13" y="-10" width="26" height="20" rx="1" fill="rgba(245,242,235,.05)" stroke="#E5E4E2"/><path d="M-11 -6h22M-11 0h22M-11 6h22" fill="none" stroke="#B08D57" stroke-width=".8"/>`,
  kidbed: `<rect x="-15" y="-10" width="30" height="20" rx="2" fill="rgba(245,242,235,.05)" stroke="#D8D1C7"/><rect x="-12" y="-8" width="9" height="5" rx="1" fill="none" stroke="#E5E4E2"/>`,
  sofa: `<rect x="-24" y="-8" width="48" height="16" rx="3" fill="rgba(176,141,87,.12)" stroke="#B08D57"/><path d="M-24 -8v-4h48v4" fill="none" stroke="#E5E4E2"/><path d="M-8 8v-10M8 8v-10" fill="none" stroke="#D8D1C7" stroke-width=".8"/>`,
  table: `<ellipse cx="0" cy="0" rx="16" ry="10" fill="rgba(245,242,235,.05)" stroke="#E5E4E2"/><rect x="-6" y="-18" width="12" height="5" rx="1" fill="none" stroke="#D8D1C7"/><rect x="-6" y="13" width="12" height="5" rx="1" fill="none" stroke="#D8D1C7"/><rect x="-22" y="-4" width="5" height="8" rx="1" fill="none" stroke="#D8D1C7"/><rect x="17" y="-4" width="5" height="8" rx="1" fill="none" stroke="#D8D1C7"/>`,
  desk: `<rect x="-16" y="-8" width="32" height="12" rx="1" fill="rgba(245,242,235,.05)" stroke="#E5E4E2"/><rect x="-7" y="6" width="14" height="7" rx="1" fill="none" stroke="#B08D57"/><rect x="6" y="-6" width="8" height="5" rx=".5" fill="none" stroke="#D8D1C7"/>`,
  pet: `<ellipse cx="0" cy="0" rx="8" ry="5" fill="rgba(176,141,87,.14)" stroke="#B08D57"/><ellipse cx="0" cy="0" rx="4" ry="2.4" fill="none" stroke="#D8D1C7"/>`,
  range: `<rect x="-10" y="-10" width="20" height="20" rx="1" fill="rgba(245,242,235,.04)" stroke="#E5E4E2"/><circle cx="-4" cy="-4" r="2.4" fill="none" stroke="#B08D57"/><circle cx="4" cy="-4" r="2.4" fill="none" stroke="#B08D57"/><circle cx="-4" cy="4" r="2.4" fill="none" stroke="#B08D57"/><circle cx="4" cy="4" r="2.4" fill="none" stroke="#B08D57"/>`,
  tub: `<ellipse cx="0" cy="0" rx="14" ry="8" fill="rgba(74,110,138,.2)" stroke="#8aa0b8"/><path d="M-10 0h20" fill="none" stroke="#D8D1C7" stroke-width=".7"/>`,
};

function placeIn(room, ox, oy, kind) {
  const scale = Math.min(1, (Number(room.w) || 80) / 90, (Number(room.h) || 60) / 70);
  return {
    id: `${kind}-${room.id}-${Math.round(ox * 100)}`,
    roomId: room.id,
    kind,
    x: Math.round(room.x + room.w * ox),
    y: Math.round(room.y + room.h * oy),
    scale: Math.max(0.55, Number(scale.toFixed(2))),
  };
}

export function furnitureFor(plan, profile, horizonId) {
  const horizon = HORIZONS.find((item) => item.id === horizonId) || HORIZONS[0];
  const items = [];
  const beds = roomsOf(plan, "bedroom");
  const livings = roomsOf(plan, "living");
  const dinings = roomsOf(plan, "dining");
  const kitchens = roomsOf(plan, "kitchen");
  const studies = roomsOf(plan, "study");
  const baths = roomsOf(plan, "bath");
  const entries = roomsOf(plan, "entry");

  for (const room of livings) {
    items.push(placeIn(room, 0.5, 0.64, "sofa"));
    if (!dinings.length && (profile.entertainer || profile.guestsOften || profile.homebody)) {
      items.push(placeIn(room, 0.5, 0.3, "table"));
    }
  }
  for (const room of dinings) items.push(placeIn(room, 0.5, 0.52, "table"));
  for (const room of kitchens) items.push(placeIn(room, 0.5, 0.38, "range"));
  for (const room of baths) items.push(placeIn(room, 0.5, 0.55, "tub"));

  beds.forEach((room, index) => {
    if (index === 0) {
      items.push(placeIn(room, 0.5, 0.5, "bed"));
      if (profile.kids && beds.length === 1) {
        items.push(placeIn(room, 0.78, 0.76, horizon.years <= 5 ? "crib" : "kidbed"));
      }
      return;
    }
    if (profile.kids) {
      items.push(placeIn(room, 0.42, 0.46, horizon.years <= 5 ? "crib" : "kidbed"));
      if ((Number(profile.householdSize) || 1) >= 4 && horizon.years >= 10) {
        items.push(placeIn(room, 0.68, 0.7, "kidbed"));
      }
      return;
    }
    items.push(placeIn(room, 0.5, 0.5, "bed"));
  });

  if (profile.wfh) {
    const deskRoom = studies[0] || (beds.length > 1 && !profile.kids ? beds[1] : null) || livings[0] || beds[0];
    if (deskRoom) items.push(placeIn(deskRoom, studies[0] ? 0.5 : 0.74, studies[0] ? 0.5 : 0.24, "desk"));
  }

  if (profile.pets) {
    const host = livings[0] || entries[0] || plan.rooms[0];
    if (host) items.push(placeIn(host, 0.18, 0.8, "pet"));
  }

  const roomMap = new Map(plan.rooms.map((room) => [room.id, room]));
  items.sort((a, b) => {
    const ra = roomMap.get(a.roomId);
    const rb = roomMap.get(b.roomId);
    return (ra?.y || 0) - (rb?.y || 0) || (ra?.x || 0) - (rb?.x || 0);
  });
  return items;
}

export function furnitureMarkup(item, visible = true) {
  const icon = FURN_ICONS[item.kind] || "";
  const scale = item.scale || 1;
  return `<g class="furn furn-${item.kind}" data-furn="${item.id}" data-room="${item.roomId}" transform="translate(${item.x} ${item.y}) scale(${scale})" opacity="${visible ? 1 : 0}">${icon}</g>`;
}

export function typicalDay(plan, profile, result) {
  const adj = graphOf(plan);
  const routes = [];
  const seen = new Set();
  const add = (id, label, nodes) => {
    if (!nodes || nodes.length < 2 || seen.has(id)) return;
    seen.add(id);
    routes.push({ id, label, nodes });
  };
  for (const path of result?.flags?.paths || []) add(path.id, path.label, path.nodes);
  const beds = roomsOf(plan, "bedroom").map((room) => room.id);
  const baths = roomsOf(plan, "bath").map((room) => room.id);
  const kitchens = roomsOf(plan, "kitchen").map((room) => room.id);
  const livings = roomsOf(plan, "living").map((room) => room.id);
  const entries = roomsOf(plan, "entry").map((room) => room.id);
  const studies = roomsOf(plan, "study").map((room) => room.id);
  add("wash", "Wash", shortestExisting(adj, beds, baths));
  if (profile.wfh) {
    const desk = studies[0] || beds[1];
    if (desk && kitchens[0]) add("work", "Work", pathBetween(adj, kitchens[0], desk));
  }
  if (profile.kids && beds[1] && livings[0]) add("kids", "Children", pathBetween(adj, livings[0], beds[1]));
  if (profile.pets && entries[0] && livings[0]) add("pets", "Pets", pathBetween(adj, livings[0], entries[0]));
  add("lounge", "Evening", shortestExisting(adj, kitchens, livings));
  return routes;
}

export function horizonNeedLine(year) {
  const n = Number(year) || 0;
  if (n < 6) return "Routines are forming.";
  if (n < 11) return "Privacy and a work room start to matter more.";
  return "Short, gentle paths help a long stay.";
}

export function defaultGuideHello() {
  return "Due-diligence simulator. Enter an address. I try to walk the floor: circulation, daily paths, a heat map, a score. You describe your own household. I stay with the rooms.";
}

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
  // 8 px = 1 ft. Public glass wing on top (living cantilevered toward the view).
  // Bedroom wing drops from the elbow. Pool fills the inside of the L.
  const rooms = [
    { id: "view", name: "View deck (approx.)", type: "terrace", sf: 140, x: -72, y: 16, w: 92, h: 152 },
    { id: "living", name: "Living (approx.)", type: "living", sf: 390, x: 20, y: 16, w: 184, h: 152 },
    { id: "dining", name: "Dining (approx.)", type: "dining", sf: 230, x: 204, y: 16, w: 120, h: 152 },
    { id: "kitchen", name: "Kitchen (approx.)", type: "kitchen", sf: 280, x: 324, y: 16, w: 144, h: 152 },
    { id: "terrace", name: "Pool (approx.)", type: "terrace", sf: 180, x: 20, y: 168, w: 184, h: 416 },
    { id: "entry", name: "Entry (approx.)", type: "entry", sf: 70, x: 204, y: 168, w: 80, h: 88 },
    { id: "service", name: "Service (approx.)", type: "other", sf: 70, x: 324, y: 168, w: 72, h: 80 },
    { id: "mbath", name: "Master bath (approx.)", type: "bath", sf: 90, x: 396, y: 168, w: 72, h: 80 },
    { id: "bed2", name: "Bedroom 2 (approx.)", type: "bedroom", sf: 250, x: 204, y: 256, w: 160, h: 136 },
    { id: "jjbath", name: "Hall bath (approx.)", type: "bath", sf: 50, x: 364, y: 256, w: 68, h: 72 },
    { id: "dress", name: "Dressing (approx.)", type: "closet", sf: 40, x: 364, y: 328, w: 68, h: 64 },
    { id: "hall", name: "Sleeping hall (approx.)", type: "hallway", sf: 50, x: 204, y: 392, w: 160, h: 40 },
    { id: "mbed", name: "Master bedroom (approx.)", type: "bedroom", sf: 390, x: 204, y: 432, w: 228, h: 152 },
  ];
  const doors = [
    ["view", "living"],
    ["living", "dining"],
    ["dining", "kitchen"],
    ["dining", "entry"],
    ["kitchen", "service"],
    ["kitchen", "mbath"],
    ["service", "mbath"],
    ["entry", "bed2"],
    ["bed2", "hall"],
    ["hall", "mbed"],
    ["bed2", "jjbath"],
    ["mbed", "dress"],
    ["dress", "mbath"],
    ["living", "terrace"],
    ["entry", "terrace"],
    ["bed2", "terrace"],
    ["mbed", "terrace"],
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
    pxPerFt: 8,
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

function plainName(name) {
  return String(name || "This room").replace(/\s*\(approx\.\)\s*/gi, "").trim() || "This room";
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
      notes.push(`${plainName(hall.name)} is only ${hall.sf} square feet, with ${degree} doors. People will stack there on a busy morning.`);
    }
  }
  for (const kitchen of kitchens) {
    const degree = (adj.get(kitchen.id) || []).length;
    if (degree >= 3) {
      circulation -= 6;
      flags.bottlenecks.push(kitchen.id);
      notes.push(`${plainName(kitchen.name)} has ${degree} openings. Anyone crossing the plan walks through the cook.`);
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
      notes.push(`${plainName(bed.name)} opens onto a social room. Sleep and conversation share a door.`);
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

function roomPxPerFt(room, plan) {
  if (Number(plan?.pxPerFt)) return Number(plan.pxPerFt);
  if (room?.sf > 10 && room.w > 8 && room.h > 8) return Math.sqrt((room.w * room.h) / room.sf);
  return 8;
}

function doorWallsOf(room, plan) {
  const walls = new Set();
  for (const door of plan.doors || []) {
    const otherId = door.a === room.id ? door.b : door.b === room.id ? door.a : null;
    const other = plan.rooms.find((item) => item.id === otherId);
    if (!other) continue;
    const ax2 = room.x + room.w;
    const ay2 = room.y + room.h;
    const bx2 = other.x + other.w;
    const by2 = other.y + other.h;
    const ox = Math.min(ax2, bx2) - Math.max(room.x, other.x);
    const oy = Math.min(ay2, by2) - Math.max(room.y, other.y);
    if (ox > 10 && Math.abs(ay2 - other.y) < 8) walls.add("s");
    else if (ox > 10 && Math.abs(by2 - room.y) < 8) walls.add("n");
    else if (oy > 10 && Math.abs(ax2 - other.x) < 8) walls.add("e");
    else if (oy > 10 && Math.abs(bx2 - room.x) < 8) walls.add("w");
  }
  return walls;
}

function piece(room, kind, x, y, w, h, rot = 0) {
  return {
    id: `${kind}-${room.id}-${Math.round(x)}-${Math.round(y)}`,
    roomId: room.id,
    kind,
    x: Math.round(x),
    y: Math.round(y),
    w: Math.round(w),
    h: Math.round(h),
    rot,
  };
}

function doorSpansOn(room, plan) {
  const spans = { n: [], s: [], e: [], w: [] };
  const scale = roomPxPerFt(room, plan);
  for (const door of plan.doors || []) {
    const otherId = door.a === room.id ? door.b : door.b === room.id ? door.a : null;
    const other = plan.rooms.find((item) => item.id === otherId);
    if (!other) continue;
    const hit = facingWall(room, other);
    if (!hit) continue;
    const open = room.type === "terrace" || other.type === "terrace" || room.type === "living" || other.type === "living";
    const gap = Math.min(hit.len * 0.55, open ? scale * 7 : scale * 2.7);
    const start = hit.len / 2 - gap / 2;
    if (hit.wall === "n" || hit.wall === "s") spans[hit.wall].push([hit.x + start, hit.x + start + gap]);
    else spans[hit.wall].push([hit.y + start, hit.y + start + gap]);
  }
  return spans;
}

function facingWall(a, b) {
  const ax2 = a.x + a.w;
  const ay2 = a.y + a.h;
  const bx2 = b.x + b.w;
  const by2 = b.y + b.h;
  const ox = Math.min(ax2, bx2) - Math.max(a.x, b.x);
  const oy = Math.min(ay2, by2) - Math.max(a.y, b.y);
  if (ox > 10 && Math.abs(ay2 - b.y) < 8) return { wall: "s", x: Math.max(a.x, b.x), y: ay2, len: ox };
  if (ox > 10 && Math.abs(by2 - a.y) < 8) return { wall: "n", x: Math.max(a.x, b.x), y: a.y, len: ox };
  if (oy > 10 && Math.abs(ax2 - b.x) < 8) return { wall: "e", x: ax2, y: Math.max(a.y, b.y), len: oy };
  if (oy > 10 && Math.abs(bx2 - a.x) < 8) return { wall: "w", x: a.x, y: Math.max(a.y, b.y), len: oy };
  return null;
}

function longestFree(lo, hi, blocked, need) {
  const cuts = blocked
    .map(([a, b]) => [Math.max(lo, a), Math.min(hi, b)])
    .filter(([a, b]) => b - a > 2)
    .sort((a, b) => a[0] - b[0]);
  let cursor = lo;
  let best = [lo, hi];
  let bestLen = -1;
  const consider = (a, b) => {
    const len = b - a;
    if (len > bestLen && len >= need) {
      best = [a, b];
      bestLen = len;
    }
  };
  for (const [a, b] of cuts) {
    if (a > cursor) consider(cursor, a);
    cursor = Math.max(cursor, b);
  }
  if (cursor < hi) consider(cursor, hi);
  if (bestLen >= 0) return best;
  cursor = lo;
  for (const [a, b] of cuts) {
    if (a > cursor && a - cursor > bestLen) {
      best = [cursor, a];
      bestLen = a - cursor;
    }
    cursor = Math.max(cursor, b);
  }
  if (hi - cursor > bestLen) best = [cursor, hi];
  return best;
}

function againstWall(room, plan, kind, ftW, ftH, prefer, used) {
  const s = roomPxPerFt(room, plan);
  const blockedWalls = doorWallsOf(room, plan);
  const spans = doorSpansOn(room, plan);
  const inset = 1.2 * s;
  const order = [prefer, "n", "s", "w", "e"].filter(Boolean);
  const scoreWall = (wall) => {
    const along = wall === "e" || wall === "w";
    const need = (along ? ftH : ftW) * s;
    const lo = along ? room.y + inset : room.x + inset;
    const hi = along ? room.y + room.h - inset : room.x + room.w - inset;
    const free = longestFree(lo, hi, spans[wall] || [], need);
    const len = free[1] - free[0];
    let rank = len;
    if (used?.has(wall)) rank -= 400;
    if (blockedWalls.has(wall) && len < need + 8) rank -= 200;
    if (wall === prefer) rank += 40;
    return { wall, along, need, free, len, rank };
  };
  const picked = order.map(scoreWall).sort((a, b) => b.rank - a.rank)[0] || scoreWall(prefer || "n");
  const wall = picked.wall;
  used?.add(wall);
  const along = wall === "e" || wall === "w";
  const w = (along ? ftH : ftW) * s;
  const h = (along ? ftW : ftH) * s;
  const maxW = room.w - inset * 2;
  const maxH = room.h - inset * 2;
  const pw = Math.min(w, maxW);
  const ph = Math.min(h, maxH);
  const mid = (picked.free[0] + picked.free[1]) / 2;
  let x = room.x + room.w / 2;
  let y = room.y + room.h / 2;
  let rot = 0;
  if (wall === "n") {
    x = mid;
    y = room.y + inset + ph / 2;
    rot = 0;
  } else if (wall === "s") {
    x = mid;
    y = room.y + room.h - inset - ph / 2;
    rot = 180;
  } else if (wall === "w") {
    x = room.x + inset + pw / 2;
    y = mid;
    rot = -90;
  } else {
    x = room.x + room.w - inset - pw / 2;
    y = mid;
    rot = 90;
  }
  return piece(room, kind, x, y, along ? ph : pw, along ? pw : ph, rot);
}

export function furnitureFor(plan, profile, horizonId) {
  const horizon = HORIZONS.find((item) => item.id === horizonId) || HORIZONS[0];
  const items = [];
  const used = new Map();
  const wallSet = (room) => {
    if (!used.has(room.id)) used.set(room.id, new Set());
    return used.get(room.id);
  };
  const beds = roomsOf(plan, "bedroom").slice().sort((a, b) => (b.sf || 0) - (a.sf || 0) || b.w * b.h - a.w * a.h);
  const livings = roomsOf(plan, "living");
  const dinings = roomsOf(plan, "dining");
  const kitchens = roomsOf(plan, "kitchen");
  const studies = roomsOf(plan, "study");
  const baths = roomsOf(plan, "bath");
  const entries = roomsOf(plan, "entry");

  for (const room of livings) {
    const s = roomPxPerFt(room, plan);
    items.push(againstWall(room, plan, "sofa", 7, 3, "s", wallSet(room)));
    items.push(piece(room, "rug", room.x + room.w / 2, room.y + room.h * 0.58, 9 * s, 6 * s, 0));
  }
  for (const room of dinings) {
    const s = roomPxPerFt(room, plan);
    items.push(piece(room, "rug", room.x + room.w / 2, room.y + room.h / 2, 8 * s, 6 * s, 0));
    items.push(piece(room, "table", room.x + room.w / 2, room.y + room.h / 2, 6 * s, 3.3 * s, 0));
  }
  if (!dinings.length && livings[0] && (profile.entertainer || profile.guestsOften || profile.homebody)) {
    const room = livings[0];
    const s = roomPxPerFt(room, plan);
    items.push(piece(room, "table", room.x + room.w * 0.32, room.y + room.h * 0.38, 6 * s, 3.3 * s, 0));
  }
  for (const room of kitchens) {
    const s = roomPxPerFt(room, plan);
    const blocked = doorWallsOf(room, plan);
    const depth = 2 * s;
    if (!blocked.has("n") && room.w > 8 * s) {
      items.push(piece(room, "counter", room.x + room.w / 2, room.y + depth / 2 + 4, room.w - 16, depth, 0));
      wallSet(room).add("n");
    }
    if (!blocked.has("s") && room.w > 8 * s) {
      items.push(piece(room, "counter", room.x + room.w / 2, room.y + room.h - depth / 2 - 4, room.w - 16, depth, 0));
      wallSet(room).add("s");
    }
    items.push(againstWall(room, plan, "range", 2.5, 2.5, blocked.has("e") ? "w" : "e", wallSet(room)));
    const ftW = room.w / s;
    const ftH = room.h / s;
    if (ftW >= 12 && ftH >= 11) {
      items.push(piece(room, "island", room.x + room.w / 2, room.y + room.h / 2, 6 * s, 3 * s, 0));
    }
  }
  for (const room of baths) {
    items.push(againstWall(room, plan, "tub", 5, 2.5, "n", wallSet(room)));
    items.push(againstWall(room, plan, "vanity", 3, 1.6, "s", wallSet(room)));
  }
  beds.forEach((room, index) => {
    const s = roomPxPerFt(room, plan);
    const king = room.w / s >= 11 && room.h / s >= 12;
    if (index === 0) {
      items.push(againstWall(room, plan, king ? "king" : "bed", king ? 6.3 : 5, 6.7, "n", wallSet(room)));
      if (profile.kids && beds.length === 1) {
        items.push(againstWall(room, plan, horizon.years <= 5 ? "crib" : "kidbed", horizon.years <= 5 ? 2.5 : 3.2, horizon.years <= 5 ? 4.4 : 6.3, "e", wallSet(room)));
      }
      return;
    }
    if (profile.kids) {
      items.push(againstWall(room, plan, horizon.years <= 5 ? "crib" : "kidbed", horizon.years <= 5 ? 2.5 : 3.2, horizon.years <= 5 ? 4.4 : 6.3, "n", wallSet(room)));
      if ((Number(profile.householdSize) || 1) >= 4 && horizon.years >= 10) {
        items.push(againstWall(room, plan, "kidbed", 3.2, 6.3, "s", wallSet(room)));
      }
      return;
    }
    items.push(againstWall(room, plan, "bed", 5, 6.7, "n", wallSet(room)));
  });
  if (profile.wfh) {
    const deskRoom = studies[0] || (beds.length > 1 && !profile.kids ? beds[1] : null) || livings[0] || beds[0];
    if (deskRoom) items.push(againstWall(deskRoom, plan, "desk", 5, 2.5, studies[0] ? "w" : "e", wallSet(deskRoom)));
  }
  if (profile.pets) {
    const host = livings[0] || entries[0] || plan.rooms[0];
    if (host) {
      const s = roomPxPerFt(host, plan);
      items.push(piece(host, "pet", host.x + 2.2 * s, host.y + host.h - 2.2 * s, 2.2 * s, 1.4 * s, 0));
    }
  }
  const roomMap = new Map(plan.rooms.map((room) => [room.id, room]));
  items.sort((a, b) => {
    const ra = roomMap.get(a.roomId);
    const rb = roomMap.get(b.roomId);
    return (ra?.y || 0) - (rb?.y || 0) || (ra?.x || 0) - (rb?.x || 0);
  });
  return items;
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

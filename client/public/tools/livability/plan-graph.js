/** Pure layout helpers for the CV plan reader. No LLM. Connections come from doors. */

export const ROOM_TYPE_WORDS = [
  ["living", "living"],
  ["great room", "living"],
  ["lounge", "living"],
  ["dining", "dining"],
  ["kitchen", "kitchen"],
  ["bed", "bedroom"],
  ["primary", "bedroom"],
  ["master", "bedroom"],
  ["bath", "bath"],
  ["powder", "bath"],
  ["w.c", "bath"],
  ["wc", "bath"],
  ["entry", "entry"],
  ["foyer", "entry"],
  ["hall", "hallway"],
  ["gallery", "hallway"],
  ["corridor", "hallway"],
  ["closet", "closet"],
  ["wardrobe", "closet"],
  ["study", "study"],
  ["office", "study"],
  ["den", "study"],
  ["terrace", "terrace"],
  ["balcony", "terrace"],
  ["deck", "terrace"],
  ["patio", "terrace"],
  ["pool", "terrace"],
];

export function guessRoomType(name) {
  const q = String(name || "").toLowerCase();
  for (const [needle, type] of ROOM_TYPE_WORDS) {
    if (q.includes(needle)) return type;
  }
  return "other";
}

export function estimatePxPerFt(opts = {}) {
  const listingSf = Number(opts.listingSf) || 0;
  const roomSf = Number(opts.roomSf) || 0;
  const box = opts.roomBox;
  const printed = opts.printed;
  if (printed && printed.feet > 0 && printed.px > 0) return printed.px / printed.feet;
  if (roomSf > 8 && box && box.w > 4 && box.h > 4) return Math.sqrt((box.w * box.h) / roomSf);
  if (listingSf > 40 && opts.imageW > 20 && opts.imageH > 20) {
    return Math.sqrt((opts.imageW * opts.imageH * 0.52) / listingSf);
  }
  return 8;
}

export function doorWidthPx(pxPerFt) {
  const s = Number(pxPerFt) || 8;
  return { min: (30 / 12) * s, max: (36 / 12) * s, typical: (32 / 12) * s };
}

export function facingWall(a, b) {
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

export function doorDotsFromPlan(plan) {
  const roomMap = new Map((plan.rooms || []).map((room) => [room.id, room]));
  const dots = [];
  for (const door of plan.doors || []) {
    const a = roomMap.get(door.a);
    const b = roomMap.get(door.b);
    if (!a || !b) continue;
    const hit = facingWall(a, b);
    if (!hit) continue;
    dots.push({
      x: hit.wall === "n" || hit.wall === "s" ? hit.x + hit.len / 2 : hit.x,
      y: hit.wall === "e" || hit.wall === "w" ? hit.y + hit.len / 2 : hit.y,
      a: a.id,
      b: b.id,
      kind: "door",
    });
  }
  return dots;
}

const WINDOW_ROOMS = new Set(["living", "dining", "kitchen", "bedroom", "bath", "study", "entry"]);

export function wallIsShared(room, wall, rooms) {
  return (rooms || []).some((other) => other.id !== room.id && facingWall(room, other)?.wall === wall);
}

export function windowDotsFromPlan(plan) {
  if (Array.isArray(plan?.windowDots) && plan.windowDots.length) {
    return plan.windowDots.map((dot) => ({ ...dot, kind: "window" }));
  }
  const rooms = plan.rooms || [];
  const doors = plan.doors || [];
  const px = Number(plan.pxPerFt) || 8;
  const dots = [];
  for (const room of rooms) {
    if (!WINDOW_ROOMS.has(room.type)) continue;
    const walls = [
      { id: "n", orient: "h", x: room.x, y: room.y, len: room.w },
      { id: "s", orient: "h", x: room.x, y: room.y + room.h, len: room.w },
      { id: "w", orient: "v", x: room.x, y: room.y, len: room.h },
      { id: "e", orient: "v", x: room.x + room.w, y: room.y, len: room.h },
    ];
    for (const wall of walls) {
      if (wallIsShared(room, wall.id, rooms)) continue;
      if (wall.len < px * 6) continue;
      const doorOnWall = doors.some((door) => {
        const otherId = door.a === room.id ? door.b : door.b === room.id ? door.a : null;
        if (!otherId) return false;
        const other = rooms.find((item) => item.id === otherId);
        return other && facingWall(room, other)?.wall === wall.id;
      });
      if (doorOnWall && room.type === "entry") continue;
      const winLen = Math.min(Math.max(px * 3.5, wall.len * 0.32), px * 7);
      const t = room.type === "living" || room.type === "kitchen" ? 0.42 : 0.36;
      const x = wall.orient === "h" ? wall.x + wall.len * t : wall.x;
      const y = wall.orient === "v" ? wall.y + wall.len * t : wall.y;
      if (dots.some((dot) => Math.hypot(dot.x - x, dot.y - y) < px * 2.2)) continue;
      dots.push({
        x,
        y,
        orient: wall.orient,
        w: winLen,
        kind: "window",
        roomId: room.id,
        wall: wall.id,
      });
    }
  }
  return dots;
}

export function windowsForRoom(room, dots, pad = 10) {
  return (dots || []).filter((dot) => {
    if (dot.kind && dot.kind !== "window") return false;
    if (dot.roomId === room.id) return true;
    const onH =
      (Math.abs(dot.y - room.y) <= pad || Math.abs(dot.y - (room.y + room.h)) <= pad) &&
      dot.x >= room.x - pad &&
      dot.x <= room.x + room.w + pad;
    const onV =
      (Math.abs(dot.x - room.x) <= pad || Math.abs(dot.x - (room.x + room.w)) <= pad) &&
      dot.y >= room.y - pad &&
      dot.y <= room.y + room.h + pad;
    return onH || onV;
  });
}

function distToRect(px, py, room) {
  const cx = Math.max(room.x, Math.min(px, room.x + room.w));
  const cy = Math.max(room.y, Math.min(py, room.y + room.h));
  return Math.hypot(px - cx, py - cy);
}

function onWall(px, py, room, pad) {
  const left = Math.abs(px - room.x) <= pad && py >= room.y - pad && py <= room.y + room.h + pad;
  const right = Math.abs(px - (room.x + room.w)) <= pad && py >= room.y - pad && py <= room.y + room.h + pad;
  const top = Math.abs(py - room.y) <= pad && px >= room.x - pad && px <= room.x + room.w + pad;
  const bot = Math.abs(py - (room.y + room.h)) <= pad && px >= room.x - pad && px <= room.x + room.w + pad;
  return left || right || top || bot;
}

/** A door connects rooms if it sits on the shared wall of exactly two rooms. Never ask a model. */
export function connectionsFromDoors(rooms, dots, pxPerFt = 8) {
  const pad = Math.max(4, (Number(pxPerFt) || 8) * 0.7);
  const pairs = [];
  const seen = new Set();
  for (const dot of dots || []) {
    const hits = (rooms || []).filter((room) => onWall(dot.x, dot.y, room, pad) || distToRect(dot.x, dot.y, room) <= pad);
    const unique = [];
    for (const room of hits) {
      if (!unique.some((item) => item.id === room.id)) unique.push(room);
    }
    if (unique.length < 2) continue;
    unique.sort((a, b) => distToRect(dot.x, dot.y, a) - distToRect(dot.x, dot.y, b));
    const a = unique[0].id;
    const b = unique[1].id;
    if (a === b) continue;
    const key = a < b ? `${a}|${b}` : `${b}|${a}`;
    if (seen.has(key)) continue;
    seen.add(key);
    pairs.push({ a, b });
  }
  return pairs;
}

export function roomsFromFills(fills, pxPerFt = 8) {
  const s = Number(pxPerFt) || 8;
  const minArea = (s * 4) * (s * 4);
  return fills
    .filter((fill) => fill.w * fill.h >= minArea)
    .map((fill, index) => {
      const sf = Math.max(12, Math.round((fill.w * fill.h) / (s * s)));
      const name = fill.name || `Room ${index + 1}`;
      return {
        id: fill.id || `rm${index + 1}`,
        name,
        type: guessRoomType(name),
        sf,
        x: Math.round(fill.x),
        y: Math.round(fill.y),
        w: Math.round(fill.w),
        h: Math.round(fill.h),
      };
    });
}

export function parsePrintedMeasure(text) {
  const raw = String(text || "");
  const sf = raw.match(/(\d{2,4})\s*(sf|sq\.?\s*ft|sqft)/i);
  if (sf) return { kind: "sf", value: Number(sf[1]) };
  const ftin = raw.match(/(\d{1,2})\s*['’]\s*-?\s*(\d{1,2})?\s*["”]?/);
  if (ftin) return { kind: "feet", value: Number(ftin[1]) + (Number(ftin[2]) || 0) / 12 };
  const times = raw.match(/(\d{1,2}(?:\.\d)?)\s*[x×]\s*(\d{1,2}(?:\.\d)?)/i);
  if (times) return { kind: "feet", value: Number(times[1]) };
  return null;
}

export function applyOcrToRooms(rooms, words, pxPerFt = 8) {
  if (!words?.length) return rooms;
  return rooms.map((room) => {
    const hits = words.filter((word) => {
      const x = word.x + word.w / 2;
      const y = word.y + word.h / 2;
      return x >= room.x && x <= room.x + room.w && y >= room.y && y <= room.y + room.h;
    });
    const label = hits
      .map((word) => word.text)
      .join(" ")
      .trim();
    const type = guessRoomType(label) !== "other" ? guessRoomType(label) : room.type;
    let sf = room.sf;
    for (const word of hits) {
      const measure = parsePrintedMeasure(word.text) || parsePrintedMeasure(label);
      if (measure?.kind === "sf") sf = measure.value;
      if (measure?.kind === "feet" && !hits.some((item) => parsePrintedMeasure(item.text)?.kind === "sf")) {
        const other = hits.map((item) => parsePrintedMeasure(item.text)).find((item) => item && item !== measure);
        if (other?.kind === "feet") sf = Math.round(measure.value * other.value);
      }
    }
    const name = guessRoomType(label) !== "other" ? label.replace(/\s+/g, " ").slice(0, 36) : room.name;
    return { ...room, name, type, sf };
  });
}

export function overlapArea(a, b) {
  const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
  const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
  if (ox <= 0 || oy <= 0) return 0;
  return ox * oy;
}

export function mapRoomIdsByOverlap(predicted, labeled) {
  const map = new Map();
  const used = new Set();
  for (const got of predicted || []) {
    let best = null;
    let bestArea = 0;
    for (const want of labeled || []) {
      if (used.has(want.id)) continue;
      const area = overlapArea(got, want);
      if (area > bestArea) {
        bestArea = area;
        best = want.id;
      }
    }
    if (best && bestArea > 20) {
      map.set(got.id, best);
      used.add(best);
    }
  }
  return map;
}

export function remapPairs(pairs, idMap) {
  const out = [];
  for (const pair of pairs || []) {
    const a = idMap.get(pair.a);
    const b = idMap.get(pair.b);
    if (a && b && a !== b) out.push({ a, b });
  }
  return out;
}

export function scoreDoorRecall(predicted, labeled, pxPerFt = 8) {
  const tol = Math.max(10, (Number(pxPerFt) || 8) * 2);
  let hits = 0;
  const used = new Set();
  for (const want of labeled || []) {
    let best = Infinity;
    let bestI = -1;
    (predicted || []).forEach((got, index) => {
      if (used.has(index)) return;
      const d = Math.hypot(got.x - want.x, got.y - want.y);
      if (d < best) {
        best = d;
        bestI = index;
      }
    });
    if (bestI >= 0 && best <= tol) {
      hits += 1;
      used.add(bestI);
    }
  }
  const recall = labeled?.length ? hits / labeled.length : 0;
  const precision = predicted?.length ? used.size / predicted.length : 0;
  return { hits, labeled: labeled?.length || 0, predicted: predicted?.length || 0, recall, precision };
}

const BOOST_TYPES = new Set([
  "entry",
  "hallway",
  "living",
  "dining",
  "kitchen",
  "bedroom",
  "bath",
  "study",
  "closet",
  "terrace",
  "other",
]);

/** Merge optional vision labels onto CV rooms. Never invent doors or connections. */
export function applyBoostToRooms(rooms, boost) {
  const labels = boost?.labels || [];
  if (!labels.length) return rooms;
  return (rooms || []).map((room) => {
    const hits = labels.filter((label) => {
      const x = Number(label.x);
      const y = Number(label.y);
      return x >= room.x && x <= room.x + room.w && y >= room.y && y <= room.y + room.h;
    });
    if (!hits.length) return room;
    const best = hits[0];
    const name = typeof best.name === "string" && best.name.trim() ? best.name.trim().slice(0, 36) : room.name;
    const guessed = guessRoomType(name);
    const type =
      guessed !== "other"
        ? guessed
        : typeof best.type === "string" && BOOST_TYPES.has(best.type)
          ? best.type
          : room.type;
    const sf = Number(best.sf) > 20 ? Math.round(Number(best.sf)) : room.sf;
    return { ...room, name, type, sf };
  });
}

export function scoreConnections(predicted, labeled) {
  const key = (pair) => {
    const a = pair.a < pair.b ? pair.a : pair.b;
    const b = pair.a < pair.b ? pair.b : pair.a;
    return `${a}|${b}`;
  };
  const want = new Set((labeled || []).map(key));
  const got = new Set((predicted || []).map(key));
  let hits = 0;
  for (const item of got) if (want.has(item)) hits += 1;
  const recall = want.size ? hits / want.size : 0;
  const precision = got.size ? hits / got.size : 0;
  return { hits, labeled: want.size, predicted: got.size, recall, precision };
}

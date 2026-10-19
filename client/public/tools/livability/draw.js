/** Architectural plan drawing. Thin platinum line work, real-scale furniture. */

export function planScale(plan) {
  if (Number(plan?.pxPerFt)) return Number(plan.pxPerFt);
  const vals = (plan?.rooms || [])
    .filter((room) => room.sf > 20 && room.w > 8 && room.h > 8)
    .map((room) => Math.sqrt((room.w * room.h) / room.sf));
  if (!vals.length) return 8;
  vals.sort((a, b) => a - b);
  return vals[Math.floor(vals.length / 2)];
}

export function roomScale(room, plan) {
  if (room?.sf > 10 && room.w > 8 && room.h > 8) return Math.sqrt((room.w * room.h) / room.sf);
  return planScale(plan);
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

export function doorEdges(plan) {
  const roomMap = new Map(plan.rooms.map((room) => [room.id, room]));
  const edges = [];
  for (const door of plan.doors || []) {
    const a = roomMap.get(door.a);
    const b = roomMap.get(door.b);
    if (!a || !b) continue;
    const hit = facingWall(a, b);
    if (!hit) continue;
    const open = a.type === "living" || a.type === "dining" || a.type === "kitchen" || a.type === "terrace" || b.type === "living" || b.type === "dining" || b.type === "kitchen" || b.type === "terrace";
    edges.push({ ...hit, a: a.id, b: b.id, open });
  }
  return edges;
}

function chair(x, y, w, h) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1" fill="none" stroke="#D8D1C7" stroke-width=".8"/>`;
}

export function furnitureMarkup(item, visible = true) {
  const w = item.w || 24;
  const h = item.h || 16;
  const rot = item.rot || 0;
  const stroke = "#E5E4E2";
  const fill = "rgba(229,228,226,.08)";
  const soft = "rgba(176,141,87,.12)";
  let body = "";
  if (item.kind === "bed" || item.kind === "king" || item.kind === "kidbed") {
    const pw = w * 0.34;
    const ph = Math.min(11, h * 0.16);
    const hb = Math.min(7, h * 0.1);
    body = `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="1.4" fill="${fill}" stroke="${stroke}" stroke-width="1.1"/>
      <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${hb}" fill="rgba(229,228,226,.12)" stroke="${stroke}" stroke-width="1"/>
      <rect x="${-w / 2 + 2.4}" y="${-h / 2 + hb + 1.4}" width="${pw}" height="${ph}" rx="1.2" fill="none" stroke="#D8D1C7"/>
      <rect x="${w / 2 - pw - 2.4}" y="${-h / 2 + hb + 1.4}" width="${pw}" height="${ph}" rx="1.2" fill="none" stroke="#D8D1C7"/>
      <path d="M${-w / 2 + 3} ${h * 0.08}h${w - 6}" fill="none" stroke="rgba(229,228,226,.35)"/>`;
  } else if (item.kind === "crib") {
    body = `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="1" fill="${fill}" stroke="${stroke}"/>
      <path d="M${-w / 2 + 2} ${-h / 6}h${w - 4}M${-w / 2 + 2} 0h${w - 4}M${-w / 2 + 2} ${h / 6}h${w - 4}" fill="none" stroke="#B08D57" stroke-width=".7"/>`;
  } else if (item.kind === "sofa") {
    const arm = Math.min(6, w * 0.08);
    body = `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="2.2" fill="${soft}" stroke="#C4A06A" stroke-width="1.05"/>
      <rect x="${-w / 2 + arm}" y="${-h / 2 + 1}" width="${w - arm * 2}" height="${h * 0.34}" rx="1.2" fill="none" stroke="${stroke}"/>
      <path d="M${-w / 6} ${-h / 2 + 2}v${h * 0.3}M${w / 6} ${-h / 2 + 2}v${h * 0.3}" fill="none" stroke="rgba(229,228,226,.35)"/>
      <rect x="${-w / 2}" y="${-h / 2}" width="${arm}" height="${h}" rx="1.4" fill="none" stroke="${stroke}"/>
      <rect x="${w / 2 - arm}" y="${-h / 2}" width="${arm}" height="${h}" rx="1.4" fill="none" stroke="${stroke}"/>`;
  } else if (item.kind === "table") {
    const cw = Math.max(7, w * 0.16);
    const ch = Math.max(6, h * 0.22);
    const inset = 7;
    body = `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="1.6" fill="${fill}" stroke="${stroke}"/>
      ${chair(-w / 2 + inset, -h / 2 - ch - 1.2, cw, ch)}
      ${chair(w / 2 - inset - cw, -h / 2 - ch - 1.2, cw, ch)}
      ${chair(-cw / 2, -h / 2 - ch - 1.2, cw, ch)}
      ${chair(-w / 2 + inset, h / 2 + 1.2, cw, ch)}
      ${chair(w / 2 - inset - cw, h / 2 + 1.2, cw, ch)}
      ${chair(-cw / 2, h / 2 + 1.2, cw, ch)}`;
  } else if (item.kind === "desk") {
    const seat = Math.max(8, w * 0.28);
    body = `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="1" fill="${fill}" stroke="${stroke}"/>
      <rect x="${-seat / 2}" y="${h / 2 + 1.4}" width="${seat}" height="${h * 0.62}" rx="1" fill="none" stroke="#C4A06A"/>`;
  } else if (item.kind === "pet") {
    body = `<ellipse cx="0" cy="0" rx="${w / 2}" ry="${h / 2}" fill="${soft}" stroke="#B08D57"/>`;
  } else if (item.kind === "counter" || item.kind === "island") {
    body = `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="1" fill="${item.kind === "island" ? soft : fill}" stroke="${stroke}"/>
      ${item.kind === "island" ? `<path d="M${-w / 3} ${-h / 4}h${w * 0.66}M${-w / 3} ${h / 4}h${w * 0.66}" fill="none" stroke="rgba(229,228,226,.25)"/>` : ""}`;
  } else if (item.kind === "range") {
    const r = Math.min(w, h) * 0.13;
    body = `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="1" fill="${fill}" stroke="${stroke}"/>
      <circle cx="${-w * 0.22}" cy="${-h * 0.18}" r="${r}" fill="none" stroke="#B08D57"/>
      <circle cx="${w * 0.22}" cy="${-h * 0.18}" r="${r}" fill="none" stroke="#B08D57"/>
      <circle cx="${-w * 0.22}" cy="${h * 0.18}" r="${r}" fill="none" stroke="#B08D57"/>
      <circle cx="${w * 0.22}" cy="${h * 0.18}" r="${r}" fill="none" stroke="#B08D57"/>`;
  } else if (item.kind === "tub") {
    const rx = Math.min(w, h) * 0.32;
    body = `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${rx}" fill="rgba(74,110,138,.14)" stroke="#8aa0b8"/>
      <rect x="${-w / 2 + 3}" y="${-h / 2 + 3}" width="${w - 6}" height="${h - 6}" rx="${rx * 0.8}" fill="none" stroke="rgba(138,160,184,.55)"/>`;
  } else if (item.kind === "vanity") {
    body = `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="1" fill="${fill}" stroke="${stroke}"/>
      <ellipse cx="0" cy="0" rx="${Math.min(w, h) * 0.28}" ry="${Math.min(w, h) * 0.2}" fill="none" stroke="#D8D1C7"/>`;
  } else if (item.kind === "rug") {
    body = `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="1" fill="none" stroke="rgba(176,141,87,.42)" stroke-dasharray="3 2.4"/>`;
  } else {
    body = `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}"/>`;
  }
  return `<g class="furn furn-${item.kind}" data-furn="${item.id}" data-room="${item.roomId}" transform="translate(${item.x} ${item.y}) rotate(${rot})" opacity="${visible ? 1 : 0}">${body}</g>`;
}

function heatColor(zone) {
  if (zone === "quiet") return "#4a6e8a";
  if (zone === "pinch") return "#E5E4E2";
  if (zone === "hot") return "#E2B470";
  if (zone === "flow") return "#C4A06A";
  return "#2A3447";
}

export function renderPlanSvg(plan, opts = {}) {
  const rooms = plan.rooms || [];
  if (!rooms.length) return "";
  const pad = 28;
  const minX = Math.min(...rooms.map((room) => room.x)) - pad;
  const minY = Math.min(...rooms.map((room) => room.y)) - pad;
  const maxX = Math.max(...rooms.map((room) => room.x + room.w)) + pad;
  const maxY = Math.max(...rooms.map((room) => room.y + room.h)) + pad;
  const heat = opts.heat || {};
  const heatU = opts.heatU == null ? 1 : opts.heatU;
  const scale = planScale(plan);
  const grid = Math.max(8, scale);
  const edges = doorEdges(plan);
  const defs = [
    `<pattern id="plan-grid" width="${grid}" height="${grid}" patternUnits="userSpaceOnUse">
      <path d="M ${grid} 0 L 0 0 0 ${grid}" fill="none" stroke="rgba(229,228,226,.06)" stroke-width="1"/>
    </pattern>`,
  ];
  const glows = rooms
    .map((room) => {
      const cell = heat[room.id];
      const zone = cell?.zone || "calm";
      const intensity = cell?.intensity || 0;
      const color = heatColor(zone);
      const grown = zone === "calm" ? 0.04 : (zone === "quiet" ? 0.42 + intensity * 0.22 : 0.32 + intensity * 0.52) * heatU;
      const washA =
        (zone === "quiet" ? 0.18 : zone === "hot" ? 0.18 + intensity * 0.12 : zone === "pinch" ? 0.12 : zone === "flow" ? 0.12 : 0) * heatU;
      const wash =
        zone === "quiet"
          ? `rgba(74,110,138,${washA})`
          : zone === "hot"
            ? `rgba(226,180,112,${washA})`
            : zone === "pinch"
              ? `rgba(229,228,226,${washA})`
              : zone === "flow"
                ? `rgba(196,160,106,${washA})`
                : "transparent";
      defs.push(
        `<radialGradient id="glow-${room.id}" cx="50%" cy="50%" r="68%">
          <stop offset="0%" stop-color="${color}" stop-opacity="${grown}"/>
          <stop offset="70%" stop-color="${color}" stop-opacity="${grown * 0.28}"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
        </radialGradient>`,
      );
      return `<rect class="heat-wash" data-room="${room.id}" x="${room.x}" y="${room.y}" width="${room.w}" height="${room.h}" fill="${wash}"/>
        <rect class="heat-glow" data-room="${room.id}" x="${room.x}" y="${room.y}" width="${room.w}" height="${room.h}" fill="url(#glow-${room.id})"/>`;
    })
    .join("");
  const floors = rooms
    .map((room) => {
      const pool = /pool/i.test(room.name);
      const deck = room.type === "terrace" && !pool;
      const fill = pool ? "rgba(74,110,138,.4)" : deck ? "rgba(74,110,138,.14)" : "rgba(15,21,34,.9)";
      const water = pool
        ? `<path d="M${room.x + 10} ${room.y + 18}h${room.w - 20}M${room.x + 10} ${room.y + room.h / 3}h${room.w - 20}M${room.x + 10} ${room.y + room.h * 0.62}h${room.w - 20}M${room.x + 10} ${room.y + room.h - 18}h${room.w - 20}" fill="none" stroke="rgba(245,242,235,.22)"/>`
        : "";
      return `<rect class="room-floor" data-room="${room.id}" x="${room.x}" y="${room.y}" width="${room.w}" height="${room.h}" fill="${fill}"/>${water}`;
    })
    .join("");
  const walls = rooms
    .map((room) => {
      const d = room.type === "terrace" ? 1.6 : 4;
      const color = room.type === "terrace" ? "rgba(229,228,226,.42)" : "#E5E4E2";
      return `<rect class="room-wall" x="${room.x}" y="${room.y}" width="${room.w}" height="${room.h}" fill="none" stroke="${color}" stroke-width="${d}"/>`;
    })
    .join("");
  const openings = edges
    .map((edge, index) => {
      const gap = Math.min(edge.len * 0.55, edge.open ? scale * 7 : scale * 2.7);
      const mid = edge.len / 2;
      const start = mid - gap / 2;
      if (edge.wall === "n" || edge.wall === "s") {
        const x = edge.x + start;
        const swing = edge.open
          ? ""
          : `<path class="door-swing" d="M ${x} ${edge.y} A ${gap} ${gap} 0 0 1 ${x} ${edge.y + (edge.wall === "s" ? gap : -gap)}"/>`;
        return `<rect class="door-gap" x="${x}" y="${edge.y - 3}" width="${gap}" height="6"/>${swing}`;
      }
      const y = edge.y + start;
      const swing = edge.open
        ? ""
        : `<path class="door-swing" d="M ${edge.x} ${y} A ${gap} ${gap} 0 0 1 ${edge.x + (edge.wall === "e" ? gap : -gap)} ${y}"/>`;
      return `<rect class="door-gap" x="${edge.x - 3}" y="${y}" width="6" height="${gap}"/>${swing}`;
    })
    .join("");
  const labels = opts.labels === false
    ? ""
    : rooms
        .map((room) => {
          const name = String(room.name || "").replace(/\s*\(approx\.\)\s*/gi, "").trim();
          const approx = /approx/i.test(room.name) ? " approx." : "";
          return `<text class="room-name" x="${room.x + 10}" y="${room.y + 20}">${escapeXml(name)}</text>
            <text class="room-sf" x="${room.x + 10}" y="${room.y + 34}">${room.sf} sf${approx}</text>`;
        })
        .join("");
  const furniture = (opts.furniture || []).map((item) => furnitureMarkup(item, opts.furnish !== false)).join("");
  const extras = opts.extras || "";
  return `<svg class="plan-svg" viewBox="${minX} ${minY} ${maxX - minX} ${maxY - minY}" role="img" aria-label="${opts.label || "Architectural floor plan"}">
    <defs>${defs.join("")}</defs>
    <rect x="${minX}" y="${minY}" width="${maxX - minX}" height="${maxY - minY}" fill="url(#plan-grid)"/>
    ${floors}${glows}${walls}${openings}${furniture}${labels}${extras}
  </svg>`;
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function setHeatOpacity(svg, cells, u) {
  if (!svg) return;
  for (const [id, cell] of Object.entries(cells || {})) {
    const zone = cell.zone || "calm";
    const intensity = cell.intensity || 0;
    const grown = zone === "calm" ? 0.04 : (zone === "quiet" ? 0.42 + intensity * 0.22 : 0.32 + intensity * 0.52) * u;
    svg.querySelectorAll(`#glow-${id} stop`).forEach((stop, index) => {
      if (index === 0) stop.setAttribute("stop-opacity", String(grown));
      else if (index === 1) stop.setAttribute("stop-opacity", String(grown * 0.28));
    });
    const wash = svg.querySelector(`.heat-wash[data-room="${id}"]`);
    if (wash) {
      const washA = (zone === "quiet" ? 0.18 : zone === "hot" ? 0.18 + intensity * 0.12 : zone === "pinch" || zone === "flow" ? 0.12 : 0) * u;
      const color = zone === "quiet" ? "74,110,138" : zone === "hot" ? "226,180,112" : zone === "flow" ? "196,160,106" : zone === "pinch" ? "229,228,226" : "0,0,0";
      wash.setAttribute("fill", washA ? `rgba(${color},${washA})` : "transparent");
    }
  }
}

import {
  CONSIDERATIONS,
  DILIGENCE_CHECKS,
  DILIGENCE_GROUPS,
  DILIGENCE_PRESETS,
  HORIZONS,
  LIVABILITY_AID_LINE,
  ROOM_TYPES,
  SEVERITY_LABELS,
  activeCheckCount,
  applyDiligencePreset,
  cannotFetchPlan,
  defaultDiligence,
  defaultGuideHello,
  emptyBuilding,
  emptyProfile,
  furnitureFor,
  heatMap,
  horizonNeedLine,
  hydrateDiligence,
  makeRiversidePlan,
  makeStahlPlan,
  makeSuttonPlan,
  makeWillowHousePlan,
  matchKnownSample,
  presetFromDiligence,
  scoreLivability,
  typicalDay,
  uid,
} from "./engine.js";
import { furnitureMarkup, renderPlanSvg, setHeatOpacity } from "./draw.js";
import { applyBoostToRooms, connectionsFromDoors, doorDotsFromPlan, windowDotsFromPlan } from "./plan-graph.js";
import { fileToImage, overlappingTiles, readPlanFromImage } from "./cv-reader.js";

// Future billing (not shown in UI): five free runs on this browser, then $1 token packs.
// function canStartRun(store) { return store.runs.length < 5 || (store.tokens || 0) > 0; }
// Future licensed listing work only: ./suggestions.js (SUGGESTIONS_ENABLED). Do not show in v1.

const KEY = "ak-livability-v2";
const TRAITS = [
  { id: "kids", label: "Kids at home" },
  { id: "homebody", label: "Homebody" },
  { id: "wfh", label: "Works from home" },
  { id: "entertainer", label: "Entertains" },
  { id: "pets", label: "Pets" },
  { id: "cooks", label: "Cooks a lot" },
  { id: "guestsOften", label: "Guests often" },
];

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "null");
    if (raw && typeof raw === "object") return raw;
  } catch {
    /* empty */
  }
  return {
    runs: [],
    collection: [],
    compare: [],
    profile: emptyProfile(),
    horizon: "10",
    diligence: defaultDiligence(),
    building: emptyBuilding(),
    furnished: true,
  };
}

function save() {
  localStorage.setItem(KEY, JSON.stringify(store));
}

const store = load();
let plan = {
  id: "",
  name: "",
  source: "blank",
  address: "",
  listingUrl: "",
  rooms: [],
  doors: [],
  note: "",
};
let profile = store.profile || emptyProfile();
let horizon = store.horizon || "10";
let lastRun = store.runs[0] || null;
let vision = { available: false, boost: false, cv: true, note: "" };
let confirmOpen = false;
let dragDot = null;
let cinemaRaf = 0;
let cinemaSkip = false;
let cinemaPlaying = false;
let diligence = hydrateDiligence(store.diligence);
let building = { ...emptyBuilding(), ...(store.building || {}) };
building.ticks = { ...emptyBuilding().ticks, ...(building.ticks || {}) };
let considerOpen = false;
let considerGroups = new Set(CONSIDERATIONS.map((group) => group.id));
let furnished = store.furnished !== false;
let furnitureOverride = null;
let adjustFurniture = false;
let addMark = "door";
let openAcc = "";
let furnitureDrag = null;

function setGuideLive(on) {
  $$(".guide-glyph").forEach((node) => node.classList.toggle("is-live", Boolean(on)));
}

function say(text, mode) {
  const el = $("#guide-speech");
  el.textContent = text;
  el.classList.toggle("doing", mode === "doing");
  setGuideLive(mode === "doing" || cinemaPlaying);
}

function escape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function clampNum(value, lo, hi) {
  return Math.max(lo, Math.min(hi, Number(value) || lo));
}

function status() {
  $("#st-state").textContent = lastRun ? "ran" : plan.rooms.length ? "plan" : "idle";
  $("#st-horizon").textContent = `${horizon}y`;
  $("#st-runs").textContent = String(store.runs.length);
  $("#st-compare").textContent = String(store.compare.length);
  $("#st-col").textContent = String(store.collection.length);
}

function layoutIfNeeded(rooms) {
  return rooms.map((room, index) => ({
    ...room,
    id: room.id || uid("rm"),
    x: Number.isFinite(room.x) ? room.x : 20 + (index % 4) * 170,
    y: Number.isFinite(room.y) ? room.y : 16 + Math.floor(index / 4) * 140,
    w: Number.isFinite(room.w) ? room.w : 154,
    h: Number.isFinite(room.h) ? room.h : 120,
  }));
}

function currentFurniture() {
  if (!furnished || !plan.rooms.length) return [];
  if (furnitureOverride) return furnitureOverride;
  return furnitureFor(plan, profile, horizon);
}

function persistDesk() {
  store.profile = profile;
  store.horizon = horizon;
  store.diligence = diligence;
  store.building = building;
  store.furnished = furnished;
  save();
}

function drawPlan(target, result, opts = {}) {
  const host = $(target);
  if (!plan.rooms.length) {
    host.innerHTML = `<p class="empty" style="padding:28px 20px">No plan yet. Look up an address, upload an image, or run a labeled sample.</p>`;
    return;
  }
  const furniture = opts.furniture || (result ? currentFurniture() : furnished ? currentFurniture() : []);
  host.innerHTML = renderPlanSvg(plan, {
    heat: result ? heatMap(plan, result) : {},
    furniture,
    furnish: furnished && opts.furnish !== false,
    label: "Architectural floor plan",
  });
  host.classList.toggle("is-adjust", adjustFurniture && furnished);
  const note = $("#furn-note");
  if (note) {
    note.textContent = furnished
      ? "The walk uses assumed furniture for this household. The score is the floor, not the pieces."
      : "Empty rooms. The score is still the floor, not furniture.";
  }
  if (adjustFurniture && furnished) bindFurnitureAdjust(host);
}

function thumbSvg(run) {
  if (!run.plan?.rooms?.length) return "";
  return renderPlanSvg(run.plan, {
    heat: heatMap(run.plan, run.result),
    furniture: [],
    labels: false,
    label: "Heat thumbnail",
  });
}

function renderRooms() {
  const types = ROOM_TYPES.map((type) => `<option value="${type.id}">${type.label}</option>`).join("");
  $("#room-list").innerHTML = plan.rooms
    .map(
      (room) => `<div class="room-row" data-id="${room.id}">
      <input data-k="name" value="${escape(room.name)}" aria-label="Room name">
      <select data-k="type" aria-label="Room type">${types.replace(`value="${room.type}"`, `value="${room.type}" selected`)}</select>
      <input data-k="sf" type="number" min="10" max="900" value="${room.sf}" aria-label="Square feet">
      <button type="button" data-del-room="${room.id}" aria-label="Remove room">×</button>
    </div>`,
    )
    .join("");
  const options = plan.rooms.map((room) => `<option value="${room.id}">${escape(room.name)}</option>`).join("");
  $("#door-list").innerHTML = plan.doors
    .map(
      (door, index) => `<div class="door-row">
      <select data-door="${index}" data-end="a">${options.replace(`value="${door.a}"`, `value="${door.a}" selected`)}</select>
      <select data-door="${index}" data-end="b">${options.replace(`value="${door.b}"`, `value="${door.b}" selected`)}</select>
      <button type="button" data-del-door="${index}" aria-label="Remove door">×</button>
    </div>`,
    )
    .join("");
  drawPlan("#plan-canvas", lastRun?.result);
}

function renderProfile() {
  $("#household").value = String(profile.householdSize || 2);
  $("#traits").innerHTML = TRAITS.map(
    (trait) =>
      `<button class="toggle" type="button" data-trait="${trait.id}" aria-pressed="${profile[trait.id] ? "true" : "false"}">${trait.label}</button>`,
  ).join("");
}

function renderHorizon() {
  $("#horizons").innerHTML = HORIZONS.map(
    (item) => `<button class="chip" type="button" data-horizon="${item.id}" aria-pressed="${horizon === item.id}">${item.label}</button>`,
  ).join("");
}

function renderFurnish() {
  $("#furnish-on")?.setAttribute("aria-pressed", furnished ? "true" : "false");
  $("#furnish-off")?.setAttribute("aria-pressed", furnished ? "false" : "true");
  $("#furn-adjust")?.setAttribute("aria-pressed", adjustFurniture ? "true" : "false");
  if ($("#furn-adjust")) $("#furn-adjust").style.display = furnished ? "" : "none";
}

function materialsFields() {
  const ticks = building.ticks || {};
  return `<div class="mat-fields">
      <label class="field" style="margin:0"><span>Year built</span><input id="year-built" type="number" min="1800" max="2026" placeholder="1928" value="${escape(building.yearBuilt || "")}"></label>
      <label class="field" style="margin:0"><span>Walk-up floor</span><input id="walkup-floor" type="number" min="0" max="40" placeholder="0 = ground" value="${escape(building.walkupFloor || "")}"></label>
    </div>
    <label class="field"><span>Heating</span>
      <select id="heating">
        <option value="">Not sure</option>
        <option value="radiators"${building.heating === "radiators" ? " selected" : ""}>Radiators</option>
        <option value="baseboard"${building.heating === "baseboard" ? " selected" : ""}>Baseboard</option>
        <option value="forced"${building.heating === "forced" ? " selected" : ""}>Forced air</option>
      </select>
    </label>
    <div class="mat-ticks">
      <label><input type="checkbox" data-tick="floorGlossWet" ${ticks.floorGlossWet ? "checked" : ""}><span>High-gloss floors in a wet area, entry, or stair. They can be slippery when wet. Ask an inspector how they feel underfoot.</span></label>
      <label><input type="checkbox" data-tick="tileBath" ${ticks.tileBath ? "checked" : ""}><span>Bath tile without much texture. A bath mat helps. Have an inspector speak to the finish.</span></label>
      <label><input type="checkbox" data-tick="marbleKitchen" ${ticks.marbleKitchen ? "checked" : ""}><span>Marble in the kitchen. It can etch and stain. Ask how it has been cared for.</span></label>
      <label><input type="checkbox" data-tick="laminateCooktop" ${ticks.laminateCooktop ? "checked" : ""}><span>Laminate near the cooktop. Confirm the clearance. An inspector can look at heat marks.</span></label>
      <label><input type="checkbox" data-tick="windowAc" ${ticks.windowAc ? "checked" : ""}><span>Every room has its own AC unit. That usually means no central air.</span></label>
      <label><input type="checkbox" data-tick="noDucts" ${ticks.noDucts ? "checked" : ""}><span>No ducts visible. Cooling may be room by room.</span></label>
      <label><input type="checkbox" data-tick="laundryInUnit" ${ticks.laundryInUnit ? "checked" : ""}><span>Laundry in the home.</span></label>
      <label><input type="checkbox" data-tick="elevator" ${ticks.elevator ? "checked" : ""}><span>Elevator, or a step-free path.</span></label>
      <label><input type="checkbox" data-tick="outdoor" ${ticks.outdoor ? "checked" : ""}><span>Outdoor space on the listing.</span></label>
      <label><input type="checkbox" data-tick="lowFloorStreet" ${ticks.lowFloorStreet ? "checked" : ""}><span>Low floor on a busy street. Worth confirming noise at the hours you would be home.</span></label>
      <label><input type="checkbox" data-tick="mechanicalNear" ${ticks.mechanicalNear ? "checked" : ""}><span>Bedroom near a boiler, garage door, or roof unit. Worth confirming sound with an inspector.</span></label>
      <label><input type="checkbox" data-tick="noParking" ${ticks.noParking ? "checked" : ""}><span>Parking looks hard or costly. Worth confirming the actual arrangement.</span></label>
      <label><input type="checkbox" data-tick="waterStains" ${ticks.waterStains ? "checked" : ""}><span>Stains or fresh paint patches. Worth confirming with a licensed home inspector.</span></label>
      <label><input type="checkbox" data-tick="noPackage" ${ticks.noPackage ? "checked" : ""}><span>No marked place for packages. Worth confirming how deliveries are handled.</span></label>
      <label><input type="checkbox" data-tick="trashAwkward" ${ticks.trashAwkward ? "checked" : ""}><span>Trash and recycling look awkward to reach. Worth confirming the path.</span></label>
      <label><input type="checkbox" data-tick="noBulkStorage" ${ticks.noBulkStorage ? "checked" : ""}><span>No marked place for bikes, luggage, or seasonal items. Worth confirming building storage.</span></label>
    </div>
    <p class="fine">Lead paint rule <span class="tip" tabindex="0" data-tip="Federal EPA/HUD rule: sellers and landlords of most housing built before 1978 must give buyers and renters a lead paint disclosure. This is a prompt to ask for that paper, not a finding about this home.">?</span></p>
    <label class="dropzone" id="mat-drop" style="margin-top:10px">
      <input id="mat-photos" type="file" accept="image/jpeg,image/png,image/webp" multiple>
      <p class="kicker">Listing photos, optional</p>
      <p class="fine" style="margin:0">Drop a photo of a finish you want a second look at. Nothing is ticked until you confirm it.</p>
    </label>
    <div class="suggest" id="mat-suggest">${(building.suggestions || []).map((item) => escape(item.note || item.label)).join(" ") || ""}</div>`;
}

function renderDiligence() {
  const host = $("#diligence");
  if (!host) return;
  const preset = presetFromDiligence(diligence);
  const count = activeCheckCount(diligence);
  const presets = Object.values(DILIGENCE_PRESETS)
    .map(
      (item) =>
        `<button class="chip" type="button" data-preset="${item.id}" aria-pressed="${preset === item.id}">${item.label}</button>`,
    )
    .join("");
  const custom = preset === "custom" ? `<button class="chip" type="button" aria-pressed="true">Custom</button>` : "";
  const groups = DILIGENCE_GROUPS.map((group) => {
    const checks = DILIGENCE_CHECKS.filter((item) => item.group === group.id)
      .map((item) => {
        const row = diligence.checks[item.id] || { on: false };
        const sev = SEVERITY_LABELS[item.severity] || SEVERITY_LABELS.tax;
        return `<div class="check" data-check="${item.id}"><input type="checkbox" data-toggle="${item.id}" ${row.on ? "checked" : ""} aria-label="${item.label}"><label>${item.label}</label><span class="sev-chip sev-${item.severity}">${sev.label}</span></div>`;
      })
      .join("");
    const extra = group.id === "materials" ? materialsFields() : "";
    return `<div class="acc ${openAcc === group.id ? "open" : ""}" data-acc="${group.id}">
      <button class="acc-head" type="button" data-acc-toggle="${group.id}">${group.label} <em>${group.hint}</em><span class="chev">›</span></button>
      <div class="acc-body"><div class="acc-inner"><div>${checks}${extra}</div></div></div>
    </div>`;
  }).join("");
  host.innerHTML = `<div class="diligence-head">
      <p class="kicker" style="margin:0">Diligence</p>
      <span class="diligence-count">${count} checks active</span>
    </div>
    <div class="preset-row">${presets}${custom}</div>
    ${groups}`;
}

function setModifyOpen(on) {
  const drawer = $("#modify-drawer");
  const btn = $("#open-modify");
  if (!drawer || !btn) return;
  drawer.hidden = !on;
  btn.setAttribute("aria-expanded", on ? "true" : "false");
  if (on) renderDiligence();
}

function bindFurnitureAdjust(host) {
  const svg = host.querySelector("svg");
  if (!svg) return;
  svg.addEventListener("pointerdown", (event) => {
    const node = event.target.closest?.("[data-furn]");
    if (!node || !adjustFurniture) return;
    const id = node.getAttribute("data-furn");
    const items = currentFurniture().map((item) => ({ ...item }));
    const item = items.find((row) => row.id === id);
    if (!item) return;
    if (event.altKey) {
      furnitureOverride = items.filter((row) => row.id !== id);
      drawPlan("#plan-canvas", lastRun?.result);
      return;
    }
    const pt = svgPoint(svg, event);
    furnitureDrag = { id, dx: pt.x - item.x, dy: pt.y - item.y, items };
    node.classList.add("is-on");
    svg.setPointerCapture?.(event.pointerId);
    event.stopPropagation();
  });
  svg.addEventListener("pointermove", (event) => {
    if (!furnitureDrag) return;
    const pt = svgPoint(svg, event);
    const item = furnitureDrag.items.find((row) => row.id === furnitureDrag.id);
    if (!item) return;
    item.x = pt.x - furnitureDrag.dx;
    item.y = pt.y - furnitureDrag.dy;
    const node = svg.querySelector(`[data-furn="${item.id}"]`);
    node?.setAttribute("transform", `translate(${item.x} ${item.y}) rotate(${item.rot || 0})`);
  });
  svg.addEventListener("pointerup", () => {
    if (!furnitureDrag) return;
    furnitureOverride = furnitureDrag.items;
    furnitureDrag = null;
  });
}

function considerItemMarkup(item) {
  const links = [];
  if (item.href) {
    links.push(
      `<a href="${escape(item.href)}" target="_blank" rel="noopener noreferrer">${escape(item.linkLabel || "Official source")}</a>`,
    );
  }
  if (item.ask) links.push(`<span>${escape(item.ask)}</span>`);
  return `<label class="consider-item"><input type="checkbox"><span><strong>${escape(item.label)}</strong>${links.length ? `<span class="consider-links">${links.join(" · ")}</span>` : ""}</span></label>`;
}

function renderConsiderations() {
  const host = $("#considerations");
  if (!host) return;
  const groups = CONSIDERATIONS.map((group) => {
    const items = group.items.map(considerItemMarkup).join("");
    return `<div class="acc nested ${considerOpen && considerGroups.has(group.id) ? "open" : ""}" data-consider-group="${group.id}">
      <button class="acc-head" type="button" data-consider-toggle="${group.id}">${group.label}<span class="chev">›</span></button>
      <div class="acc-body"><div class="acc-inner"><div>${items}</div></div></div>
    </div>`;
  }).join("");
  host.innerHTML = `<div class="acc ${considerOpen ? "open" : ""}" data-consider-root>
      <button class="acc-head" type="button" data-consider-root-toggle>Considerations to confirm <em>What a plan cannot show</em><span class="chev">›</span></button>
      <div class="acc-body"><div class="acc-inner"><div>
        ${groups}
        <p class="aid-line">${escape(LIVABILITY_AID_LINE)}</p>
      </div></div></div>
    </div>`;
}

function renderPrintReport(result) {
  const host = $("#print-report");
  if (!host) return;
  if (!result) {
    host.innerHTML = "";
    return;
  }
  const address = plan.address || plan.name || "Untitled plan";
  const sampleMark = plan.sampleMark || (plan.sampleReport ? "Sample report, example data" : "");
  const dims = [
    ["Circulation", result.dimensions.circulation],
    ["Quiet", result.dimensions.quiet],
    ["Storage", result.dimensions.storage],
    ["Household fit", result.dimensions.fit],
    ["Light and air", result.dimensions.light],
    ["Comfort", result.dimensions.comfort],
  ].filter((row) => row[1] != null);
  const flagged = (result.breakdown || []).filter((row) => row.passed === false || row.caution);
  const consider = CONSIDERATIONS.map(
    (group) =>
      `<section class="print-group"><h3>${escape(group.label)}</h3>${group.items
        .map((item) => {
          const extra = [item.linkLabel, item.ask].filter(Boolean).join(" · ");
          return `<label><input type="checkbox"> ${escape(item.label)}${extra ? ` <span>${escape(extra)}</span>` : ""}</label>`;
        })
        .join("")}</section>`,
  ).join("");
  const heat = renderPlanSvg(plan, {
    heat: heatMap(plan, result),
    furniture: [],
    furnish: false,
    labels: true,
    label: "Static heat map",
  });
  host.innerHTML = `
    <header class="print-head">
      <picture>
        <source type="image/webp" srcset="/tools/livability/icon-64.webp 1x, /tools/livability/icon-128.webp 2x">
        <img src="/tools/livability/icon-64.png" srcset="/tools/livability/icon-64.png 1x, /tools/livability/icon-128.png 2x" width="40" height="40" alt="Livability">
      </picture>
      <div>
        <p class="kicker">Livability report</p>
        <h1>${escape(address)}</h1>
        ${sampleMark ? `<p class="print-sample">${escape(sampleMark)}</p>` : ""}
      </div>
    </header>
    <p class="print-score"><strong>${result.score}</strong> Livability</p>
    <p class="print-meta">${escape(plan.name || "Floor plan")} · Household of ${Number(profile.householdSize) || 1} · ${escape(String(horizon))} years</p>
    <div class="print-dims">${dims.map(([label, value]) => `<div><span>${label}</span><b>${value}</b></div>`).join("")}</div>
    <section>
      <h2>Breakdown</h2>
      ${(result.breakdown || [])
        .map(
          (row) =>
            `<div class="print-row"><span>${escape(row.label)}</span><b>${row.delta > 0 ? "+" : ""}${row.delta}</b><small>${escape(row.note || "")}</small></div>`,
        )
        .join("")}
    </section>
    <section>
      <h2>Flagged checks</h2>
      ${
        flagged.length
          ? flagged
              .map(
                (row) =>
                  `<div class="print-row fail"><span>${escape(row.label)}</span><small>${escape(row.severityLabel || "")}. ${escape(row.note || "")}</small></div>`,
              )
              .join("")
          : "<p>No flagged checks on this run.</p>"
      }
    </section>
    <section>
      <h2>Considerations to confirm</h2>
      ${consider}
    </section>
    <p class="aid-line">${escape(LIVABILITY_AID_LINE)}</p>
    <section class="print-heat"><h2>Heat map</h2>${heat}</section>
  `;
}

function renderScore(result) {
  if (!result) {
    $("#score-num").textContent = "-";
    $("#dims").innerHTML = "";
    $("#notes").innerHTML = "";
    if ($("#check-break")) $("#check-break").innerHTML = "";
    renderConsiderations();
    renderPrintReport(null);
    return;
  }
  $("#score-num").textContent = String(result.score);
  const dims = [
    ["Circulation", result.dimensions.circulation],
    ["Quiet", result.dimensions.quiet],
    ["Storage", result.dimensions.storage],
    ["Household fit", result.dimensions.fit],
  ];
  if (result.dimensions.light != null) dims.push(["Light and air", result.dimensions.light]);
  if (result.dimensions.comfort != null) dims.push(["Comfort", result.dimensions.comfort]);
  $("#dims").innerHTML = dims
    .map(
      ([label, value]) =>
        `<div class="dim"><span>${label}</span><div class="barline"><i style="width:${value}%"></i></div><b>${value}</b></div>`,
    )
    .join("");
  $("#notes").innerHTML = result.notes.map((note) => `<li>${escape(note)}</li>`).join("");
  const host = $("#check-break");
  if (host) {
    const rows = result.breakdown || [];
    host.innerHTML = rows.length
      ? `<p class="kicker" style="margin:4px 0 8px">Per check</p>${rows
          .map(
            (row) =>
              `<div class="break-row ${row.passed ? "" : "fail"}"><span>${escape(row.label)}</span><b>${row.delta > 0 ? "+" : ""}${row.delta}</b><span class="why">${escape(row.severityLabel || "")}${row.note ? `. ${escape(row.note)}` : ""}</span></div>`,
          )
          .join("")}`
      : "";
  }
  renderConsiderations();
  renderPrintReport(result);
}

function renderCollection() {
  const ranked = [...store.collection].sort((a, b) => (b.result?.score || 0) - (a.result?.score || 0));
  if (!ranked.length) {
    $("#collection").innerHTML = `<p class="empty">Empty. Keep a run and it ranks here.</p>`;
    return;
  }
  $("#collection").innerHTML = ranked
    .map(
      (run, index) =>
        `<button type="button" data-open-run="${run.id}"><span class="rank">0${index + 1}</span> <strong>${escape(run.address || run.plan?.name || "Run")}</strong> · ${run.result?.score ?? "-"}</button>`,
    )
    .join("");
}

function renderCompare() {
  const runs = store.compare.map((id) => store.runs.find((run) => run.id === id)).filter(Boolean);
  if (!runs.length) {
    $("#compare").innerHTML = `<p class="empty">Run a few addresses, then pin them here. Score, heat map, and notes sit side by side.</p>`;
    return;
  }
  $("#compare").innerHTML = runs
    .map(
      (run) => `<article class="card">
      <p class="addr">${escape(run.address || run.plan?.name || "Untitled")}</p>
      <strong class="sc">${run.result?.score ?? "-"}</strong>
      <div class="plan-wrap">${thumbSvg(run)}</div>
      <ul class="notes">${(run.result?.notes || []).slice(0, 2).map((note) => `<li>${escape(note)}</li>`).join("")}</ul>
    </article>`,
    )
    .join("");
}

function readForm() {
  $$("#room-list .room-row").forEach((row) => {
    const room = plan.rooms.find((item) => item.id === row.dataset.id);
    if (!room) return;
    room.name = $("[data-k=name]", row).value.trim() || room.name;
    room.type = $("[data-k=type]", row).value;
    room.sf = clampNum($("[data-k=sf]", row).value, 10, 900);
  });
  $$("#door-list .door-row").forEach((row) => {
    const index = Number($("[data-end=a]", row).dataset.door);
    if (!plan.doors[index]) return;
    plan.doors[index].a = $("[data-end=a]", row).value;
    plan.doors[index].b = $("[data-end=b]", row).value;
  });
  plan.address = $("#address").value.trim();
  plan.listingUrl = $("#listing-url").value.trim();
  profile.householdSize = clampNum($("#household").value, 1, 8);
}

function attachPlace() {
  plan.address = $("#address").value.trim();
  plan.listingUrl = $("#listing-url").value.trim();
}

function scaleOpts() {
  return {
    listingSf: Number($("#listing-sf")?.value) || 0,
    roomSf: Number($("#room-sf")?.value) || 0,
  };
}

function boostWanted() {
  const box = $("#boost-on");
  if (box) return vision.boost && box.checked;
  return false;
}

function hideHelpers() {
  $("#address-help")?.classList.remove("show");
}

function showHelpers(query) {
  const q = `"${query}" floor plan`;
  const google = `https://www.google.com/search?q=${encodeURIComponent(q)}`;
  const images = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(q)}`;
  const g = $("#help-google");
  const i = $("#help-images");
  if (g) g.href = google;
  if (i) i.href = images;
  $("#address-help")?.classList.add("show");
}

function applyDoorsFromDots() {
  plan.doors = connectionsFromDoors(plan.rooms, plan.doorDots || [], plan.pxPerFt || 8);
}

function setAddMark(kind) {
  addMark = kind === "window" ? "window" : "door";
  $("#mark-door")?.setAttribute("aria-pressed", addMark === "door" ? "true" : "false");
  $("#mark-window")?.setAttribute("aria-pressed", addMark === "window" ? "true" : "false");
}

function svgPoint(svg, event) {
  const pt = svg.createSVGPoint();
  pt.x = event.clientX;
  pt.y = event.clientY;
  const ctm = svg.getScreenCTM();
  if (!ctm) return { x: 0, y: 0 };
  const loc = pt.matrixTransform(ctm.inverse());
  return { x: loc.x, y: loc.y };
}

function renderDoorConfirm() {
  const host = $("#door-confirm");
  const stage = $("#confirm-stage");
  if (!host || !stage) return;
  host.classList.add("show");
  confirmOpen = true;
  const dots = plan.doorDots || [];
  const windows = plan.windowDots || [];
  $("#confirm-copy").textContent = `${dots.length} door${dots.length === 1 ? "" : "s"}, ${windows.length} window${windows.length === 1 ? "" : "s"}. Tap a mark to remove it. Drag to move. Click a wall to add. Brass is a door. Blue-gray is a window.`;
  const doorMarks = dots
    .map((dot, index) => `<circle class="door-dot" data-kind="door" data-i="${index}" cx="${dot.x}" cy="${dot.y}" r="8"></circle>`)
    .join("");
  const windowMarks = windows
    .map((dot, index) => `<circle class="window-dot" data-kind="window" data-i="${index}" cx="${dot.x}" cy="${dot.y}" r="7"></circle>`)
    .join("");
  if (plan.preview && plan.width && plan.height) {
    stage.innerHTML = `<div class="confirm-board">
      <img src="${plan.preview}" alt="Uploaded floor plan">
      <svg class="confirm-svg" viewBox="0 0 ${plan.width} ${plan.height}" role="img" aria-label="Door and window marks on the uploaded plan">
        ${(plan.rooms || []).map((room) => `<rect class="confirm-room" x="${room.x}" y="${room.y}" width="${room.w}" height="${room.h}"></rect>`).join("")}
        ${doorMarks}${windowMarks}
      </svg>
    </div>`;
  } else {
    stage.innerHTML = renderPlanSvg(plan, {
      furniture: [],
      furnish: false,
      labels: true,
      extras: doorMarks + windowMarks,
      label: "Door and window confirm",
    });
  }
  const svg = stage.querySelector("svg");
  if (!svg) return;
  svg.addEventListener("pointerdown", onConfirmPointerDown);
  svg.addEventListener("pointermove", onConfirmPointerMove);
  svg.addEventListener("pointerup", onConfirmPointerUp);
  svg.addEventListener("pointerleave", onConfirmPointerUp);
}

function hideDoorConfirm() {
  confirmOpen = false;
  $("#door-confirm")?.classList.remove("show");
}

function onConfirmPointerDown(event) {
  const svg = event.currentTarget;
  const dot = event.target.closest?.(".door-dot, .window-dot");
  const pt = svgPoint(svg, event);
  if (dot) {
    const kind = dot.dataset.kind || "door";
    const index = Number(dot.dataset.i);
    const list = kind === "window" ? plan.windowDots : plan.doorDots;
    if (event.altKey) {
      list.splice(index, 1);
      applyDoorsFromDots();
      renderDoorConfirm();
      return;
    }
    dragDot = { kind, index, moved: false, x: pt.x, y: pt.y };
    svg.setPointerCapture?.(event.pointerId);
    return;
  }
  const kind = event.shiftKey ? "window" : addMark;
  if (kind === "window") {
    plan.windowDots = plan.windowDots || [];
    plan.windowDots.push({ x: pt.x, y: pt.y, kind: "window", w: (plan.pxPerFt || 8) * 4 });
  } else {
    plan.doorDots = plan.doorDots || [];
    plan.doorDots.push({ x: pt.x, y: pt.y, kind: "door" });
    applyDoorsFromDots();
  }
  renderDoorConfirm();
}

function onConfirmPointerMove(event) {
  if (!dragDot) return;
  const svg = event.currentTarget;
  const pt = svgPoint(svg, event);
  const dx = pt.x - dragDot.x;
  const dy = pt.y - dragDot.y;
  if (Math.hypot(dx, dy) > 3) dragDot.moved = true;
  const list = dragDot.kind === "window" ? plan.windowDots : plan.doorDots;
  const item = list?.[dragDot.index];
  if (!item) return;
  item.x = pt.x;
  item.y = pt.y;
  const sel = dragDot.kind === "window" ? ".window-dot" : ".door-dot";
  const node = svg.querySelector(`${sel}[data-i="${dragDot.index}"]`);
  node?.setAttribute("cx", String(pt.x));
  node?.setAttribute("cy", String(pt.y));
}

function onConfirmPointerUp(event) {
  if (!dragDot) return;
  const index = dragDot.index;
  const kind = dragDot.kind || "door";
  const moved = dragDot.moved;
  dragDot = null;
  if (!moved) {
    const list = kind === "window" ? plan.windowDots : plan.doorDots;
    list?.splice(index, 1);
  }
  applyDoorsFromDots();
  renderDoorConfirm();
}

function openConfirm(message) {
  applyDoorsFromDots();
  lastRun = null;
  renderRooms();
  renderScore(null);
  renderDoorConfirm();
  status();
  say(message || "Check the doors and windows. Tap to fix, then looks right, run it.");
}

function acceptConfirm(andRun) {
  applyDoorsFromDots();
  hideDoorConfirm();
  renderRooms();
  status();
  if (andRun) {
    say("Doors accepted. Walking the floor.");
    runSimulation();
    return;
  }
  say("Doors accepted. Edit a room name if you need to, then run.");
}

function useDemo(make) {
  const place = $("#address").value.trim();
  const canned = make();
  plan = canned;
  plan.id = uid("plan");
  plan.doorDots = doorDotsFromPlan(plan);
  plan.windowDots = plan.windowDots?.length ? plan.windowDots : windowDotsFromPlan(plan);
  plan.pxPerFt = plan.pxPerFt || 8;
  furnitureOverride = null;
  plan.preview = "";
  attachPlace();
  if (!plan.address) plan.address = place;
  if (place && canned.name && !/stahl house/i.test(canned.name)) {
    plan.name = `${place} · ${canned.name}`;
  }
  hideHelpers();
  openConfirm(
    place
      ? `Labeled demo on ${place}. Check the door and window marks, then run.`
      : "Labeled demo. Not a real listing. Check the door and window marks, then run.",
  );
}

function lookup() {
  const address = $("#address").value.trim();
  const listing = $("#listing-url").value.trim();
  const query = address || listing;
  if (!query) {
    say("Start with an address. A listing link is a fallback. I will not invent a floor.");
    return;
  }
  const known = matchKnownSample(query);
  if (known) {
    if (!address) $("#address").value = known.make().address || query;
    hideHelpers();
    useDemo(known.make);
    $("#lookup-note").textContent = `Known sample: ${plan.name}. Sizes are approximate, from published plans.`;
    return;
  }
  const miss = cannotFetchPlan(query);
  $("#lookup-note").textContent = miss.reason;
  showHelpers(query);
  say(`${miss.reason} I opened helper links.`);
}

function prefersReduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function setPlaying(on) {
  cinemaPlaying = on;
  $("#run-sim").disabled = on;
  $("#bar-run").disabled = on;
  $("#st-state").textContent = on ? "run" : lastRun ? "ran" : plan.rooms.length ? "plan" : "idle";
  setGuideLive(on);
}

function hideCinema() {
  if (cinemaRaf) cancelAnimationFrame(cinemaRaf);
  cinemaRaf = 0;
  cinemaSkip = false;
  $("#cinema").hidden = true;
  const ticker = $("#scan-ticker");
  if (ticker) ticker.hidden = true;
  $$(".check").forEach((node) => node.classList.remove("scanning"));
  setPlaying(false);
}

function landRun(run) {
  hideCinema();
  furnished = run.furnished !== false;
  renderFurnish();
  drawPlan("#plan-canvas", run.result, {
    furniture: furnished ? furnitureFor(run.plan, run.profile, run.horizon) : [],
    furnish: furnished,
  });
  renderScore(run.result);
  renderCollection();
  renderCompare();
  status();
  say(`Livability ${run.result.score}. ${run.result.notes[0] || "The rooms connect."}`);
}

function clockAt(u) {
  const minutes = 7 * 60 + Math.round(Math.max(0, Math.min(1, u)) * (22 - 7) * 60);
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function along(pts, t) {
  if (!pts.length) return { x: 0, y: 0 };
  if (pts.length === 1) return pts[0];
  let total = 0;
  const segs = [];
  for (let i = 0; i < pts.length - 1; i += 1) {
    const len = Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y) || 1;
    segs.push({ a: pts[i], b: pts[i + 1], len });
    total += len;
  }
  let d = ((t % 2) > 1 ? 2 - (t % 2) : t % 2) * total;
  for (const seg of segs) {
    if (d <= seg.len) {
      const u = d / seg.len;
      return { x: seg.a.x + (seg.b.x - seg.a.x) * u, y: seg.a.y + (seg.b.y - seg.a.y) * u };
    }
    d -= seg.len;
  }
  return pts[pts.length - 1];
}

function scanChecks(run, u) {
  const ticker = $("#scan-ticker");
  const rows = run.result?.breakdown || [];
  if (!rows.length) {
    if (ticker) ticker.hidden = true;
    return;
  }
  const groups = DILIGENCE_GROUPS.filter((group) => rows.some((row) => row.group === group.id));
  const index = Math.min(groups.length - 1, Math.floor(u * groups.length));
  const group = groups[index];
  if (ticker) {
    ticker.hidden = false;
    ticker.textContent = group ? `Scanning ${group.label}` : "";
  }
  $$(".check").forEach((node) => {
    const id = node.getAttribute("data-check");
    const meta = DILIGENCE_CHECKS.find((item) => item.id === id);
    node.classList.toggle("scanning", Boolean(group && meta?.group === group.id));
  });
  $$(".acc").forEach((node) => {
    node.classList.toggle("open", node.getAttribute("data-acc") === group?.id);
  });
}

function playCinema(run) {
  const furniture = run.furnished === false ? [] : furnitureFor(run.plan, run.profile, run.horizon);
  const cells = heatMap(run.plan, run.result);
  const roomMap = new Map(run.plan.rooms.map((room) => [room.id, room]));
  const routes = typicalDay(run.plan, run.profile, run.result)
    .map((route) => ({
      ...route,
      pts: route.nodes
        .map((id) => roomMap.get(id))
        .filter(Boolean)
        .map((room) => ({ x: room.x + room.w / 2, y: room.y + room.h / 2 })),
    }))
    .filter((route) => route.pts.length > 1);
  const walkers = [];
  const count = clampNum(run.profile.householdSize, 1, 5);
  const tones = ["", "b", "c", "d", "b"];
  for (let i = 0; i < count; i += 1) {
    const route = routes[i % Math.max(1, routes.length)];
    if (!route) continue;
    walkers.push({ pts: route.pts, phase: i * 0.28, tone: tones[i], history: [] });
  }
  if (run.profile.pets && routes.length) {
    const pet = routes.find((route) => route.id === "pets") || routes[0];
    walkers.push({ pts: pet.pts, phase: 0.7, tone: "b", history: [] });
  }

  const extras = `${walkers
    .map((_, i) => `<polyline class="trail-soft" data-trail="${i}" points=""></polyline>`)
    .join("")}${walkers
    .map((_, i) => `<circle class="walker ${walkers[i].tone}" data-w="${i}" cx="-40" cy="-40" r="3.2" opacity="0"></circle>`)
    .join("")}`;
  $("#cinema-stage").innerHTML = renderPlanSvg(run.plan, {
    heat: cells,
    heatU: 0,
    furniture,
    furnish: false,
    extras,
    label: "Bird's-eye simulation",
  });
  $("#cinema").hidden = false;
  $("#cin-clock").textContent = "07:00";
  $("#cin-year").textContent = `horizon ${run.horizon}y`;
  $("#cin-score").textContent = "";
  $("#cin-need").textContent = run.furnished === false ? "Empty rooms. The walk is the floor." : "The rooms take their furniture.";
  setPlaying(true);
  say(run.furnished === false ? "Empty rooms. Walking the floor." : "The rooms take their furniture.", "doing");
  setModifyOpen(true);

  const roomsOrder = [];
  for (const item of furniture) {
    if (!roomsOrder.includes(item.roomId)) roomsOrder.push(item.roomId);
  }
  const FURNISH = 2200;
  const DAY = 2800;
  const YEARS = 900;
  const SCORE = 700;
  const TOTAL = FURNISH + DAY + YEARS + SCORE;
  const yearsMax = HORIZONS.find((item) => item.id === run.horizon)?.years || 10;
  const svg = $("#cinema-stage svg");
  const furnNodes = furniture.map((item) => svg.querySelector(`[data-furn="${item.id}"]`));
  const walkerNodes = walkers.map((_, i) => svg.querySelector(`[data-w="${i}"]`));
  const trailNodes = walkers.map((_, i) => svg.querySelector(`[data-trail="${i}"]`));
  let spoken = "furnish";
  const t0 = performance.now();

  const tick = (now) => {
    const t = cinemaSkip ? TOTAL : now - t0;
    if (t >= TOTAL) {
      landRun(run);
      return;
    }
    if (t < FURNISH) {
      const u = t / FURNISH;
      roomsOrder.forEach((roomId, index) => {
        const start = index / Math.max(1, roomsOrder.length);
        const local = Math.max(0, Math.min(1, (u - start) * roomsOrder.length));
        const ease = 1 - (1 - local) ** 3;
        furniture.forEach((item, fi) => {
          if (item.roomId !== roomId || !furnNodes[fi]) return;
          const y = item.y + 14 * (1 - ease);
          furnNodes[fi].setAttribute("opacity", String(ease));
          furnNodes[fi].setAttribute("transform", `translate(${item.x} ${y}) rotate(${item.rot || 0})`);
        });
      });
      $("#cin-clock").textContent = "07:00";
      $("#cin-need").textContent = "Furniture finds the walls, room by room.";
      setHeatOpacity(svg, cells, 0);
      scanChecks(run, u * 0.2);
    } else if (t < FURNISH + DAY) {
      if (spoken !== "day") {
        spoken = "day";
        say("A typical day, sped up. Watch the paths heat.", "doing");
      }
      furniture.forEach((item, fi) => {
        if (!furnNodes[fi]) return;
        furnNodes[fi].setAttribute("opacity", "1");
        furnNodes[fi].setAttribute("transform", `translate(${item.x} ${item.y}) rotate(${item.rot || 0})`);
      });
      const u = (t - FURNISH) / DAY;
      $("#cin-clock").textContent = clockAt(u);
      $("#cin-year").textContent = "year 1";
      $("#cin-need").textContent = "Morning, return, the rooms that get used.";
      walkerNodes.forEach((node, i) => {
        if (!node) return;
        const pos = along(walkers[i].pts, u * 2.4 + walkers[i].phase);
        node.setAttribute("cx", String(pos.x));
        node.setAttribute("cy", String(pos.y));
        node.setAttribute("opacity", "1");
        walkers[i].history.push(pos);
        if (walkers[i].history.length > 28) walkers[i].history.shift();
        trailNodes[i]?.setAttribute("points", walkers[i].history.map((pt) => `${pt.x},${pt.y}`).join(" "));
      });
      setHeatOpacity(svg, cells, u);
      scanChecks(run, 0.2 + u * 0.4);
    } else if (t < FURNISH + DAY + YEARS) {
      if (spoken !== "years") {
        spoken = "years";
        say("Needs shift as the years stack.", "doing");
      }
      const u = (t - FURNISH - DAY) / YEARS;
      const year = Math.max(1, Math.round(u * yearsMax));
      $("#cin-clock").textContent = "22:00";
      $("#cin-year").textContent = yearsMax >= 15 && year >= 15 ? "15+" : `year ${year}`;
      $("#cin-need").textContent = horizonNeedLine(year);
      walkerNodes.forEach((node) => node?.setAttribute("opacity", String(1 - u * 0.65)));
      setHeatOpacity(svg, cells, 1);
      scanChecks(run, 0.6 + u * 0.25);
    } else {
      if (spoken !== "score") {
        spoken = "score";
        say(`Livability ${run.result.score}. ${run.result.notes[0] || "The rooms connect."}`, "doing");
      }
      const u = (t - FURNISH - DAY - YEARS) / SCORE;
      const shown = Math.round(run.result.score * (1 - (1 - u) ** 2));
      $("#cin-score").textContent = String(shown);
      $("#cin-need").textContent = "The score lands on the layout, not the neighborhood.";
      setHeatOpacity(svg, cells, 1);
      scanChecks(run, 0.85 + u * 0.15);
    }
    cinemaRaf = requestAnimationFrame(tick);
  };
  cinemaRaf = requestAnimationFrame(tick);
}

function runSimulation() {
  if (cinemaPlaying) return;
  readForm();
  if (plan.rooms.length < 2) {
    say("I still need a plan. I cannot fetch one from that address. Upload an image or use a labeled demo.");
    return;
  }
  plan.building = building;
  const result = scoreLivability(plan, profile, horizon, diligence, { building, furnished });
  const run = {
    id: uid("run"),
    address: plan.address || plan.name || "Untitled",
    plan: structuredClone(plan),
    profile: structuredClone(profile),
    horizon,
    diligence: structuredClone(diligence),
    building: structuredClone(building),
    furnished,
    result,
    at: new Date().toISOString(),
  };
  lastRun = run;
  store.runs.unshift(run);
  persistDesk();
  save();
  if (prefersReduced()) {
    landRun(run);
    return;
  }
  playCinema(run);
}

function keepCollection() {
  if (!lastRun) {
    say("Run a simulation first, then I can keep it in the collection.");
    return;
  }
  if (store.collection.some((run) => run.id === lastRun.id)) {
    say("Already in the collection.");
    return;
  }
  store.collection.push(lastRun);
  save();
  renderCollection();
  status();
  say("Kept. Collection ranks by score. A personal shortlist of layouts, not of neighborhoods.");
}

function addCompare() {
  if (!lastRun) {
    say("Run a simulation first, then pin it to compare.");
    return;
  }
  if (store.compare.includes(lastRun.id)) {
    say("That run is already on the compare row.");
    return;
  }
  store.compare = [...store.compare, lastRun.id].slice(-3);
  save();
  renderCompare();
  status();
  say("Pinned beside the others. Walk the heat maps, then decide which layout you prefer.");
}

function openRun(id) {
  const run = store.runs.find((item) => item.id === id) || store.collection.find((item) => item.id === id);
  if (!run) return;
  lastRun = run;
  plan = structuredClone(run.plan);
  profile = structuredClone(run.profile || emptyProfile());
  horizon = run.horizon || horizon;
  if (run.diligence) diligence = structuredClone(run.diligence);
  if (run.building) building = { ...emptyBuilding(), ...structuredClone(run.building) };
  furnished = run.furnished !== false;
  furnitureOverride = null;
  $("#address").value = plan.address || "";
  $("#listing-url").value = plan.listingUrl || "";
  renderRooms();
  renderProfile();
  renderHorizon();
  renderFurnish();
  renderDiligence();
  renderScore(run.result);
  drawPlan("#plan-canvas", run.result);
  status();
  say(`Opened ${run.address}. Livability ${run.result?.score ?? "-"}.`);
}

async function checkVision() {
  try {
    const res = await fetch("/api/livability/vision-status");
    if (!res.ok) throw new Error("status");
    vision = await res.json();
  } catch {
    vision = {
      available: false,
      boost: false,
      cv: true,
      note: "Find the plan online, download it, and drop it here.",
    };
  }
  vision.cv = true;
  vision.boost = Boolean(vision.boost || vision.available);
  const note = $("#vision-note");
  if (note) {
    note.textContent = vision.boost
      ? "Room names can be polished from the drawing if you leave that on."
      : "Find the plan online, download it, and drop it here.";
  }
  const row = $("#boost-row");
  if (row) row.classList.toggle("show", Boolean(vision.boost));
  const box = $("#boost-on");
  if (box) {
    const stored = localStorage.getItem("ak-livability-boost");
    if (stored === "0") box.checked = false;
    if (stored === "1") box.checked = true;
    if (new URLSearchParams(location.search).get("boost") === "off") box.checked = false;
  }
}

async function maybeBoost(result) {
  if (!boostWanted() || !result?.preview) return result;
  say("Reading the plan. Polishing room names from the drawing.", "doing");
  try {
    const tiles = overlappingTiles(result.canvas, 4).map((tile) => ({
      x: tile.x,
      y: tile.y,
      w: tile.w,
      h: tile.h,
      dataUrl: tile.dataUrl,
    }));
    const res = await fetch("/api/livability/read-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ overview: result.preview, tiles }),
    });
    const body = await res.json();
    if (body?.labels?.length) {
      result.rooms = applyBoostToRooms(result.rooms, body);
      result.boosted = true;
    }
  } catch {
    /* CV result still stands */
  }
  return result;
}

async function onUpload(file) {
  if (!file) return;
  attachPlace();
  hideHelpers();
  plan.imageName = file.name;
  plan.source = "upload";
  plan.name = file.name.replace(/\.[^.]+$/, "") || "Uploaded plan";
  if (!plan.id) plan.id = uid("plan");
  say("Reading the plan. Check the marks when I am done.", "doing");
  try {
    const img = await fileToImage(file);
    let result = await readPlanFromImage(img, { ...scaleOpts(), ocr: true });
    result = await maybeBoost(result);
    plan.rooms = layoutIfNeeded(result.rooms || []);
    plan.doorDots = result.doorDots || [];
    plan.windowDots = result.windowDots || [];
    plan.pxPerFt = result.pxPerFt || 8;
    furnitureOverride = null;
    plan.preview = result.preview || "";
    plan.width = result.width;
    plan.height = result.height;
    plan.source = result.boosted ? "cv+boost" : "cv";
    applyDoorsFromDots();
    if (!plan.rooms.length) {
      renderRooms();
      say("I could not find enclosed rooms in that image. Use the room editor, or try a labeled demo.");
      return;
    }
    const boost = result.boosted ? " Room names were polished from the drawing." : "";
    openConfirm(`I found ${plan.rooms.length} rooms.${boost} Check the door and window marks, then run.`);
  } catch (error) {
    say(error instanceof Error ? error.message : "That file did not open as a plan.");
  }
}

function readBuildingForm() {
  const year = $("#year-built");
  const floor = $("#walkup-floor");
  const heat = $("#heating");
  if (year) building.yearBuilt = year.value;
  if (floor) building.walkupFloor = floor.value;
  if (heat) building.heating = heat.value;
  persistDesk();
}

async function onMaterialPhotos(files) {
  const list = [...(files || [])].slice(0, 4);
  if (!list.length) return;
  building.photos = [];
  for (const file of list) {
    const img = await fileToImage(file);
    const canvas = document.createElement("canvas");
    canvas.width = Math.min(1200, img.width);
    canvas.height = Math.round((img.height / img.width) * canvas.width);
    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    building.photos.push({ dataUrl: canvas.toDataURL("image/jpeg", 0.8) });
  }
  const box = $("#mat-suggest");
  if (!vision.boost) {
    if (box) box.textContent = "Tick what you see. I will not mark a caution until you do.";
    return;
  }
  if (box) box.textContent = "Looking at the photos. Confirm anything I suggest.";
  try {
    const res = await fetch("/api/livability/read-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: "materials", photos: building.photos }),
    });
    const body = await res.json();
    building.suggestions = body.suggestions || [];
    if (box) {
      box.textContent = building.suggestions.length
        ? `Suggestions to confirm: ${building.suggestions.map((item) => item.label).join(", ")}. Nothing is ticked yet.`
        : body.error || "Nothing clear enough to suggest. Tick what you see.";
    }
  } catch {
    if (box) box.textContent = "Tick what you see.";
  }
}

function bind() {
  $("#lookup").addEventListener("click", lookup);
  $("#use-sutton").addEventListener("click", () => useDemo(makeSuttonPlan));
  $("#use-riverside").addEventListener("click", () => useDemo(makeRiversidePlan));
  $("#use-stahl").addEventListener("click", () => {
    if (!$("#address").value.trim()) $("#address").value = "1635 Woods Dr, Los Angeles, CA 90069";
    useDemo(makeStahlPlan);
  });
  $("#use-willow")?.addEventListener("click", () => {
    $("#address").value = "1842 Willow Lane, Sample City, CA";
    useDemo(makeWillowHousePlan);
  });
  $("#plan-file").addEventListener("change", (event) => onUpload(event.target.files?.[0]));
  const drop = $("#dropzone");
  if (drop) {
    ["dragenter", "dragover"].forEach((name) => {
      drop.addEventListener(name, (event) => {
        event.preventDefault();
        drop.classList.add("is-over");
      });
    });
    ["dragleave", "drop"].forEach((name) => {
      drop.addEventListener(name, (event) => {
        event.preventDefault();
        drop.classList.remove("is-over");
      });
    });
    drop.addEventListener("drop", (event) => {
      const file = event.dataTransfer?.files?.[0];
      if (file) onUpload(file);
    });
  }
  $("#boost-on")?.addEventListener("change", (event) => {
    localStorage.setItem("ak-livability-boost", event.target.checked ? "1" : "0");
  });
  $("#confirm-run")?.addEventListener("click", () => acceptConfirm(true));
  $("#confirm-edit")?.addEventListener("click", () => acceptConfirm(false));
  $("#mark-door")?.addEventListener("click", () => setAddMark("door"));
  $("#mark-window")?.addEventListener("click", () => setAddMark("window"));
  $("#run-sim").addEventListener("click", runSimulation);
  $("#bar-run").addEventListener("click", runSimulation);
  $("#open-modify")?.addEventListener("click", () => {
    const open = $("#modify-drawer")?.hidden;
    setModifyOpen(Boolean(open));
  });
  $("#furnish-on")?.addEventListener("click", () => {
    furnished = true;
    persistDesk();
    renderFurnish();
    drawPlan("#plan-canvas", lastRun?.result);
  });
  $("#furnish-off")?.addEventListener("click", () => {
    furnished = false;
    adjustFurniture = false;
    persistDesk();
    renderFurnish();
    drawPlan("#plan-canvas", lastRun?.result);
  });
  $("#furn-adjust")?.addEventListener("click", () => {
    if (!furnished) return;
    adjustFurniture = !adjustFurniture;
    if (adjustFurniture && !furnitureOverride) furnitureOverride = currentFurniture().map((item) => ({ ...item }));
    renderFurnish();
    drawPlan("#plan-canvas", lastRun?.result);
    say(adjustFurniture ? "Drag a piece to move it. Alt-click to remove it. Scale stays true." : "Furniture lock is back on.");
  });
  $("#diligence")?.addEventListener("click", (event) => {
    const preset = event.target.closest("[data-preset]");
    if (preset) {
      diligence = applyDiligencePreset(preset.dataset.preset);
      persistDesk();
      renderDiligence();
      say(`${preset.textContent} diligence. ${activeCheckCount(diligence)} checks active.`);
      return;
    }
    const acc = event.target.closest("[data-acc-toggle]");
    if (acc) {
      openAcc = openAcc === acc.dataset.accToggle ? "" : acc.dataset.accToggle;
      renderDiligence();
      return;
    }
  });
  $("#diligence")?.addEventListener("change", (event) => {
    const toggle = event.target.closest("[data-toggle]");
    if (toggle) {
      const id = toggle.dataset.toggle;
      if (!diligence.checks[id]) diligence.checks[id] = { on: false, strictness: "standard" };
      diligence.checks[id].on = toggle.checked;
      diligence.preset = "custom";
      persistDesk();
      renderDiligence();
      return;
    }
    const tick = event.target.closest("[data-tick]");
    if (tick) {
      building.ticks[tick.dataset.tick] = tick.checked;
      const map = {
        floorGlossWet: "floorSlip",
        tileBath: "floorSlip",
        marbleKitchen: "counters",
        laminateCooktop: "counters",
        windowAc: "cooling",
        noDucts: "cooling",
        laundryInUnit: "laundryInUnit",
        elevator: "elevatorWalkup",
        outdoor: "outdoor",
        lowFloorStreet: "lowFloorStreet",
        mechanicalNear: "mechanicalNear",
        noParking: "noParking",
        waterStains: "waterStains",
        noPackage: "noPackage",
        trashAwkward: "trashAwkward",
        noBulkStorage: "noBulkStorage",
      };
      const checkId = map[tick.dataset.tick];
      if (tick.checked && checkId && diligence.checks[checkId]) {
        diligence.checks[checkId].on = true;
        diligence.preset = "custom";
      }
      persistDesk();
      renderDiligence();
      return;
    }
    if (event.target.id === "year-built" || event.target.id === "walkup-floor" || event.target.id === "heating") {
      readBuildingForm();
    }
    if (event.target.id === "mat-photos") onMaterialPhotos(event.target.files);
  });
  $("#diligence")?.addEventListener("input", (event) => {
    if (event.target.id === "year-built" || event.target.id === "walkup-floor") readBuildingForm();
  });
  $("#cin-skip").addEventListener("click", () => {
    cinemaSkip = true;
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && cinemaPlaying) cinemaSkip = true;
  });
  $("#print-report-btn")?.addEventListener("click", () => {
    if (!lastRun?.result) {
      say("Run the plan first, then print the report.");
      return;
    }
    renderPrintReport(lastRun.result);
    window.print();
  });
  $("#considerations")?.addEventListener("click", (event) => {
    if (event.target.closest("[data-consider-root-toggle]")) {
      considerOpen = !considerOpen;
      renderConsiderations();
      return;
    }
    const group = event.target.closest("[data-consider-toggle]");
    if (group) {
      considerOpen = true;
      const id = group.dataset.considerToggle;
      if (considerGroups.has(id)) considerGroups.delete(id);
      else considerGroups.add(id);
      renderConsiderations();
    }
  });
  $("#keep-col").addEventListener("click", keepCollection);
  $("#add-compare").addEventListener("click", addCompare);
  $("#traits").addEventListener("click", (event) => {
    const btn = event.target.closest("[data-trait]");
    if (!btn) return;
    profile[btn.dataset.trait] = !profile[btn.dataset.trait];
    btn.setAttribute("aria-pressed", profile[btn.dataset.trait] ? "true" : "false");
  });
  $("#horizons").addEventListener("click", (event) => {
    const btn = event.target.closest("[data-horizon]");
    if (!btn) return;
    horizon = btn.dataset.horizon;
    store.horizon = horizon;
    save();
    renderHorizon();
    status();
    say(HORIZONS.find((item) => item.id === horizon).blurb);
  });
  $("#room-list").addEventListener("input", () => {
    readForm();
    drawPlan("#plan-canvas", lastRun?.result);
  });
  $("#room-list").addEventListener("click", (event) => {
    const id = event.target.dataset.delRoom;
    if (!id) return;
    plan.rooms = plan.rooms.filter((room) => room.id !== id);
    plan.doors = plan.doors.filter((door) => door.a !== id && door.b !== id);
    renderRooms();
  });
  $("#door-list").addEventListener("change", readForm);
  $("#door-list").addEventListener("click", (event) => {
    const index = event.target.dataset.delDoor;
    if (index == null) return;
    plan.doors.splice(Number(index), 1);
    renderRooms();
  });
  $("#add-room").addEventListener("click", () => {
    const n = plan.rooms.length;
    plan.rooms.push({
      id: uid("rm"),
      name: `Room ${n + 1}`,
      type: "other",
      sf: 80,
      x: 20 + (n % 4) * 170,
      y: 16 + Math.floor(n / 4) * 140,
      w: 154,
      h: 120,
    });
    renderRooms();
  });
  $("#add-door").addEventListener("click", () => {
    if (plan.rooms.length < 2) return;
    plan.doors.push({ a: plan.rooms[0].id, b: plan.rooms[1].id });
    renderRooms();
  });
  $("#collection").addEventListener("click", (event) => {
    const btn = event.target.closest("[data-open-run]");
    if (btn) openRun(btn.dataset.openRun);
  });
  $$("[data-jump]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.jump;
      const node = id === "collection" ? $("#collection") : $(`.pane[data-pane="${id}"]`) || $(`#${id}`);
      node?.scrollIntoView({ block: "start", behavior: "smooth" });
      $$(".pane").forEach((pane) => pane.classList.toggle("on", pane.dataset.pane === id || (id === "collection" && pane.dataset.pane === "compare")));
    });
  });
  $$(".pane").forEach((pane) => {
    pane.addEventListener("pointerdown", () => {
      $$(".pane").forEach((node) => node.classList.remove("on"));
      pane.classList.add("on");
    });
  });
}

say(defaultGuideHello());
$("#address").value = "";
renderRooms();
renderProfile();
renderHorizon();
renderFurnish();
renderDiligence();
renderScore(lastRun?.result);
renderConsiderations();
renderCollection();
renderCompare();
status();
bind();
checkVision();

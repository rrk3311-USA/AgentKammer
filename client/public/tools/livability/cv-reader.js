/** Device plan reader. OpenCV.js when loaded, canvas CV otherwise. No key required. */

import {
  applyOcrToRooms,
  connectionsFromDoors,
  doorWidthPx,
  estimatePxPerFt,
  guessRoomType,
  roomsFromFills,
  wallIsShared,
  windowDotsFromPlan,
} from "./plan-graph.js";

const OPENCV_SRC = "https://docs.opencv.org/4.10.0/opencv.js";
const TESSERACT_SRC = "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
const PDF_SRC = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.7.76/pdf.min.mjs";
const PDF_WORKER = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.7.76/pdf.worker.min.mjs";

let cvPromise = null;
let tessPromise = null;

export function loadOpenCv() {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.cv && window.cv.Mat) return Promise.resolve(window.cv);
  if (cvPromise) return cvPromise;
  cvPromise = new Promise((resolve) => {
    const timer = setTimeout(() => resolve(null), 12000);
    const script = document.createElement("script");
    script.async = true;
    script.src = OPENCV_SRC;
    script.onload = () => {
      const wait = (n) => {
        if (window.cv && window.cv.Mat) {
          clearTimeout(timer);
          resolve(window.cv);
          return;
        }
        if (window.cv && typeof window.cv.onRuntimeInitialized === "function") {
          window.cv.onRuntimeInitialized = () => {
            clearTimeout(timer);
            resolve(window.cv);
          };
          return;
        }
        if (n > 80) {
          clearTimeout(timer);
          resolve(window.cv && window.cv.Mat ? window.cv : null);
          return;
        }
        setTimeout(() => wait(n + 1), 80);
      };
      wait(0);
    };
    script.onerror = () => {
      clearTimeout(timer);
      resolve(null);
    };
    document.head.appendChild(script);
  });
  return cvPromise;
}

export function loadTesseract() {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.Tesseract) return Promise.resolve(window.Tesseract);
  if (tessPromise) return tessPromise;
  tessPromise = new Promise((resolve) => {
    const script = document.createElement("script");
    script.async = true;
    script.src = TESSERACT_SRC;
    script.onload = () => resolve(window.Tesseract || null);
    script.onerror = () => resolve(null);
    document.head.appendChild(script);
  });
  return tessPromise;
}

export async function fileToImage(file) {
  if (!file) throw new Error("No file");
  if (file.type === "application/pdf" || /\.pdf$/i.test(file.name || "")) {
    return renderPdfPage(file);
  }
  const url = URL.createObjectURL(file);
  try {
    const img = await loadUrl(url);
    return img;
  } finally {
    URL.revokeObjectURL(url);
  }
}

function loadUrl(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("That file did not open as an image."));
    img.src = url;
  });
}

async function renderPdfPage(file) {
  const pdfjs = await import(PDF_SRC);
  pdfjs.GlobalWorkerOptions.workerSrc = PDF_WORKER;
  const data = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data }).promise;
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale: 2 });
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(viewport.width));
  canvas.height = Math.max(1, Math.round(viewport.height));
  await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
  const img = new Image();
  img.src = canvas.toDataURL("image/png");
  await new Promise((resolve) => {
    img.onload = resolve;
  });
  return img;
}

function drawSource(img) {
  const max = 1800;
  const scale = Math.min(1, max / Math.max(img.width, img.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(img.width * scale));
  canvas.height = Math.max(1, Math.round(img.height * scale));
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return { canvas, ctx, scale };
}

function grayscale(data) {
  const g = new Uint8Array(data.length / 4);
  for (let i = 0, p = 0; i < data.length; i += 4, p += 1) {
    g[p] = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) | 0;
  }
  return g;
}

function otsu(g) {
  const hist = new Array(256).fill(0);
  for (const v of g) hist[v] += 1;
  const total = g.length;
  let sum = 0;
  for (let i = 0; i < 256; i += 1) sum += i * hist[i];
  let sumB = 0;
  let wB = 0;
  let best = 0;
  let thresh = 127;
  for (let i = 0; i < 256; i += 1) {
    wB += hist[i];
    if (!wB) continue;
    const wF = total - wB;
    if (!wF) break;
    sumB += i * hist[i];
    const mB = sumB / wB;
    const mF = (sum - sumB) / wF;
    const between = wB * wF * (mB - mF) * (mB - mF);
    if (between > best) {
      best = between;
      thresh = i;
    }
  }
  return thresh;
}

function wallMaskFromGray(g, w, h) {
  const t = otsu(g);
  const mean = g.reduce((a, b) => a + b, 0) / g.length;
  const darkWalls = mean > 118;
  const mask = new Uint8Array(w * h);
  for (let i = 0; i < g.length; i += 1) {
    mask[i] = darkWalls ? (g[i] < t ? 1 : 0) : g[i] > t ? 1 : 0;
  }
  return mask;
}

function dilate(mask, w, h, r) {
  const out = new Uint8Array(mask.length);
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      let hit = 0;
      for (let dy = -r; dy <= r && !hit; dy += 1) {
        for (let dx = -r; dx <= r; dx += 1) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          if (mask[ny * w + nx]) {
            hit = 1;
            break;
          }
        }
      }
      out[y * w + x] = hit;
    }
  }
  return out;
}

function wallRun(mask, w, h, x, y, dx, dy) {
  let n = 0;
  let cx = x + dx;
  let cy = y + dy;
  while (cx >= 0 && cy >= 0 && cx < w && cy < h && mask[cy * w + cx] && n < 400) {
    n += 1;
    cx += dx;
    cy += dy;
  }
  return n;
}

function jambThickness(mask, w, h, x, y, alongY) {
  if (alongY) return wallRun(mask, w, h, x, y, 0, -1) + wallRun(mask, w, h, x, y, 0, 1) + 1;
  return wallRun(mask, w, h, x, y, -1, 0) + wallRun(mask, w, h, x, y, 1, 0) + 1;
}

function findDoorGaps(mask, w, h, minW, maxW) {
  const dots = [];
  const maxJamb = Math.max(maxW * 1.8, 22);
  const push = (x, y, orient) => {
    if (dots.some((d) => Math.hypot(d.x - x, d.y - y) < minW * 0.6)) return;
    dots.push({ x, y, orient });
  };
  for (let y = 2; y < h - 2; y += 1) {
    let x = 1;
    while (x < w - 1) {
      if (mask[y * w + x]) {
        x += 1;
        continue;
      }
      const start = x;
      while (x < w && !mask[y * w + x]) x += 1;
      const len = x - start;
      if (len >= minW && len <= maxW) {
        const leftWall = start > 0 && mask[y * w + (start - 1)];
        const rightWall = x < w && mask[y * w + x];
        const jamb = leftWall ? jambThickness(mask, w, h, start - 1, y, true) : 0;
        if (leftWall && rightWall && jamb >= 2 && jamb <= maxJamb) push(start + len / 2, y, "h");
      }
    }
  }
  for (let x = 2; x < w - 2; x += 1) {
    let y = 1;
    while (y < h - 1) {
      if (mask[y * w + x]) {
        y += 1;
        continue;
      }
      const start = y;
      while (y < h && !mask[y * w + x]) y += 1;
      const len = y - start;
      if (len >= minW && len <= maxW) {
        const topWall = start > 0 && mask[(start - 1) * w + x];
        const botWall = y < h && mask[y * w + x];
        const jamb = topWall ? jambThickness(mask, w, h, x, start - 1, false) : 0;
        if (topWall && botWall && jamb >= 2 && jamb <= maxJamb) push(x, start + len / 2, "v");
      }
    }
  }
  return dots;
}

function bandTransitions(mask, w, h, x, y, alongH, band) {
  let prev = -1;
  let n = 0;
  for (let d = -band; d <= band; d += 1) {
    const px = alongH ? x : x + d;
    const py = alongH ? y + d : y;
    if (px < 0 || py < 0 || px >= w || py >= h) continue;
    const v = mask[py * w + px] ? 1 : 0;
    if (v !== prev) {
      n += 1;
      prev = v;
    }
  }
  return n;
}

function findWindows(mask, w, h, rooms, doorDots, pxPerFt) {
  const dots = [];
  const px = Number(pxPerFt) || 8;
  const minLen = Math.max(12, Math.round(px * 2.2));
  const maxLen = Math.round(px * 9);
  const band = Math.max(5, Math.round(px * 0.7));
  const nearDoor = (x, y) => (doorDots || []).some((dot) => Math.hypot(dot.x - x, dot.y - y) < px * 2.4);
  const push = (x, y, orient, len, wall, roomId) => {
    if (nearDoor(x, y)) return;
    if (dots.some((dot) => Math.hypot(dot.x - x, dot.y - y) < px * 1.6)) return;
    dots.push({ x, y, orient, w: len, kind: "window", wall, roomId });
  };

  for (const room of rooms || []) {
    const walls = [
      { id: "n", orient: "h", x0: Math.round(room.x) + 3, x1: Math.round(room.x + room.w) - 3, y: Math.round(room.y), v: false },
      { id: "s", orient: "h", x0: Math.round(room.x) + 3, x1: Math.round(room.x + room.w) - 3, y: Math.round(room.y + room.h), v: false },
      { id: "w", orient: "v", y0: Math.round(room.y) + 3, y1: Math.round(room.y + room.h) - 3, x: Math.round(room.x), v: true },
      { id: "e", orient: "v", y0: Math.round(room.y) + 3, y1: Math.round(room.y + room.h) - 3, x: Math.round(room.x + room.w), v: true },
    ];
    for (const wall of walls) {
      if (wallIsShared(room, wall.id, rooms)) continue;
      if (!wall.v) {
        let x = wall.x0;
        while (x < wall.x1) {
          const double = bandTransitions(mask, w, h, x, wall.y, true, band) >= 4;
          if (!double) {
            x += 1;
            continue;
          }
          const start = x;
          while (x < wall.x1 && bandTransitions(mask, w, h, x, wall.y, true, band) >= 4) x += 1;
          const len = x - start;
          if (len >= minLen && len <= maxLen) push(start + len / 2, wall.y, "h", len, wall.id, room.id);
        }
      } else {
        let y = wall.y0;
        while (y < wall.y1) {
          const double = bandTransitions(mask, w, h, wall.x, y, false, band) >= 4;
          if (!double) {
            y += 1;
            continue;
          }
          const start = y;
          while (y < wall.y1 && bandTransitions(mask, w, h, wall.x, y, false, band) >= 4) y += 1;
          const len = y - start;
          if (len >= minLen && len <= maxLen) push(wall.x, start + len / 2, "v", len, wall.id, room.id);
        }
      }
    }
  }

  if (dots.length < 1 && rooms?.length) {
    return windowDotsFromPlan({ rooms, doors: connectionsFromDoors(rooms, doorDots, px), pxPerFt: px, windowDots: [] });
  }
  return dots;
}

function sealDoorGaps(mask, w, h, dots, typical) {
  const out = mask.slice();
  const half = Math.max(2, Math.round((Number(typical) || 16) * 0.18));
  const span = Math.max(3, Math.round((Number(typical) || 16) * 0.55));
  const paint = (x0, y0, dxSpan, dySpan) => {
    for (let dy = -dySpan; dy <= dySpan; dy += 1) {
      for (let dx = -dxSpan; dx <= dxSpan; dx += 1) {
        const x = x0 + dx;
        const y = y0 + dy;
        if (x < 0 || y < 0 || x >= w || y >= h) continue;
        out[y * w + x] = 1;
      }
    }
  };
  for (const dot of dots || []) {
    const x0 = Math.round(dot.x);
    const y0 = Math.round(dot.y);
    if (dot.orient === "v") paint(x0, y0, half, span);
    else if (dot.orient === "h") paint(x0, y0, span, half);
    else paint(x0, y0, half, half);
  }
  return out;
}

function floodRooms(mask, w, h, minArea) {
  const seen = new Uint8Array(mask.length);
  const fills = [];
  const stack = [];
  const paint = (sx, sy) => {
    stack.length = 0;
    stack.push(sx, sy);
    let minX = sx;
    let minY = sy;
    let maxX = sx;
    let maxY = sy;
    let area = 0;
    let border = false;
    while (stack.length) {
      const y = stack.pop();
      const x = stack.pop();
      if (x < 0 || y < 0 || x >= w || y >= h) {
        border = true;
        continue;
      }
      const i = y * w + x;
      if (seen[i] || mask[i]) continue;
      seen[i] = 1;
      area += 1;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
      if (x === 0 || y === 0 || x === w - 1 || y === h - 1) border = true;
      stack.push(x + 1, y, x - 1, y, x, y + 1, x, y - 1);
    }
    return { border, area, x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 };
  };
  for (let y = 1; y < h - 1; y += 2) {
    for (let x = 1; x < w - 1; x += 2) {
      const i = y * w + x;
      if (seen[i] || mask[i]) continue;
      const fill = paint(x, y);
      if (fill.border || fill.area < minArea) continue;
      fills.push(fill);
    }
  }
  return fills;
}

function wallMaskWithCv(cv, canvas) {
  if (!cv?.Mat) return null;
  let src;
  let gray;
  let bin;
  let kernel;
  let closed;
  try {
    src = cv.imread(canvas);
    gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
    const mean = cv.mean(gray)[0];
    bin = new cv.Mat();
    const flag = mean > 118 ? cv.THRESH_BINARY_INV + cv.THRESH_OTSU : cv.THRESH_BINARY + cv.THRESH_OTSU;
    cv.threshold(gray, bin, 0, 255, flag);
    kernel = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(3, 3));
    closed = new cv.Mat();
    cv.morphologyEx(bin, closed, cv.MORPH_CLOSE, kernel);
    const w = closed.cols;
    const h = closed.rows;
    const mask = new Uint8Array(w * h);
    const data = closed.data;
    for (let i = 0; i < mask.length; i += 1) mask[i] = data[i] > 0 ? 1 : 0;
    return mask;
  } catch {
    return null;
  } finally {
    src?.delete?.();
    gray?.delete?.();
    bin?.delete?.();
    kernel?.delete?.();
    closed?.delete?.();
  }
}

function houghArcsWithCv(cv, canvas, pxPerFt) {
  if (!cv?.Mat) return [];
  let src;
  let gray;
  let edges;
  try {
    src = cv.imread(canvas);
    gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
    edges = new cv.Mat();
    cv.Canny(gray, edges, 60, 160);
    const circles = new cv.Mat();
    const minR = Math.max(6, Math.round((30 / 12) * pxPerFt * 0.45));
    const maxR = Math.max(minR + 2, Math.round((36 / 12) * pxPerFt * 1.1));
    cv.HoughCircles(gray, circles, cv.HOUGH_GRADIENT, 1, minR, 120, 18, minR, maxR);
    const dots = [];
    const col = circles.cols || 0;
    for (let i = 0; i < col; i += 1) {
      const x = circles.data32F[i * 3];
      const y = circles.data32F[i * 3 + 1];
      dots.push({ x, y, arc: true });
    }
    circles.delete();
    return dots;
  } catch {
    return [];
  } finally {
    src?.delete?.();
    gray?.delete?.();
    edges?.delete?.();
  }
}

async function ocrWords(canvas) {
  const Tesseract = await loadTesseract();
  if (!Tesseract?.recognize) return [];
  try {
    const result = await Tesseract.recognize(canvas, "eng", { logger: () => {} });
    return (result.data?.words || [])
      .filter((word) => word.text && word.confidence > 55)
      .map((word) => ({
        text: word.text,
        x: word.bbox.x0,
        y: word.bbox.y0,
        w: word.bbox.x1 - word.bbox.x0,
        h: word.bbox.y1 - word.bbox.y0,
      }));
  } catch {
    return [];
  }
}

export function readPlanFromMask(mask, w, h, opts = {}) {
  const pxGuess = Number(opts.pxPerFt) || 8;
  const widths = doorWidthPx(pxGuess);
  const minW = Math.max(6, widths.min * 0.72);
  const maxW = widths.max * 1.4;
  const dots = [...(opts.extraDots || []), ...findDoorGaps(mask, w, h, minW, maxW)];
  const unique = [];
  for (const dot of dots) {
    if (unique.some((item) => Math.hypot(item.x - dot.x, item.y - dot.y) < minW * 0.6)) continue;
    unique.push(dot);
  }
  const sealed = sealDoorGaps(mask, w, h, unique, widths.typical);
  const fills = floodRooms(sealed, w, h, Math.max(400, (pxGuess * 4) ** 2));
  const rooms = roomsFromFills(fills, pxGuess);
  const doors = connectionsFromDoors(rooms, unique, pxGuess);
  const windowDots = findWindows(sealed, w, h, rooms, unique, pxGuess);
  return { rooms, doorDots: unique, windowDots, doors, pxPerFt: pxGuess };
}

export function maskFromLabeledPlan(label, wall = 6) {
  const w = label.width;
  const h = label.height;
  const mask = new Uint8Array(w * h);
  const paintH = (x0, x1, y) => {
    for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x += 1) {
      for (let k = 0; k < wall; k += 1) {
        const yy = y + k - Math.floor(wall / 2);
        if (x >= 0 && yy >= 0 && x < w && yy < h) mask[yy * w + x] = 1;
      }
    }
  };
  const paintV = (y0, y1, x) => {
    for (let y = Math.min(y0, y1); y <= Math.max(y0, y1); y += 1) {
      for (let k = 0; k < wall; k += 1) {
        const xx = x + k - Math.floor(wall / 2);
        if (xx >= 0 && y >= 0 && xx < w && y < h) mask[y * w + xx] = 1;
      }
    }
  };
  for (const room of label.rooms || []) {
    paintH(room.x, room.x + room.w, room.y);
    paintH(room.x, room.x + room.w, room.y + room.h);
    paintV(room.y, room.y + room.h, room.x);
    paintV(room.y, room.y + room.h, room.x + room.w);
  }
  const doorPx = Math.round(((32 / 12) * (label.pxPerFt || 8)));
  const punch = (dot) => {
    const x0 = Math.round(dot.x);
    const y0 = Math.round(dot.y);
    const half = Math.round(doorPx / 2);
    const t = wall + 2;
    for (const room of label.rooms || []) {
      const onH = Math.abs(y0 - room.y) <= wall || Math.abs(y0 - (room.y + room.h)) <= wall;
      const onV = Math.abs(x0 - room.x) <= wall || Math.abs(x0 - (room.x + room.w)) <= wall;
      if (onH) {
        for (let x = x0 - half; x <= x0 + half; x += 1) {
          for (let k = -t; k <= t; k += 1) {
            const y = y0 + k;
            if (x >= 0 && y >= 0 && x < w && y < h) mask[y * w + x] = 0;
          }
        }
      } else if (onV) {
        for (let y = y0 - half; y <= y0 + half; y += 1) {
          for (let k = -t; k <= t; k += 1) {
            const x = x0 + k;
            if (x >= 0 && y >= 0 && x < w && y < h) mask[y * w + x] = 0;
          }
        }
      }
    }
  };
  for (const dot of label.doorDots || []) punch(dot);
  return { mask, w, h };
}

export async function readPlanFromImage(img, opts = {}) {
  const { canvas, ctx } = drawSource(img);
  const w = canvas.width;
  const h = canvas.height;
  const pixels = ctx.getImageData(0, 0, w, h).data;
  const gray = grayscale(pixels);
  let mask = wallMaskFromGray(gray, w, h);
  mask = dilate(mask, w, h, 1);

  const cv = opts.skipCv ? null : await loadOpenCv();
  if (cv) {
    const cvMask = wallMaskWithCv(cv, canvas);
    if (cvMask) mask = dilate(cvMask, w, h, 1);
  }
  const pxGuess = estimatePxPerFt({
    listingSf: opts.listingSf,
    roomSf: opts.roomSf,
    imageW: w,
    imageH: h,
    printed: opts.printed,
  });
  let extraDots = [];
  if (cv) extraDots = houghArcsWithCv(cv, canvas, pxGuess);
  let graph = readPlanFromMask(mask, w, h, { pxPerFt: pxGuess, extraDots });
  if (graph.doorDots.length < 1 && Math.abs(pxGuess - 8) > 0.8) {
    graph = readPlanFromMask(mask, w, h, { pxPerFt: 8, extraDots });
  }
  let rooms = graph.rooms;
  const dots = graph.doorDots;
  if (opts.ocr !== false) {
    const words = await ocrWords(canvas);
    rooms = applyOcrToRooms(rooms, words, pxGuess);
  }
  const largest = [...rooms].sort((a, b) => b.sf - a.sf)[0];
  const pxPerFt = estimatePxPerFt({
    listingSf: opts.listingSf,
    roomSf: opts.roomSf,
    roomBox: largest,
    imageW: w,
    imageH: h,
    printed: opts.printed,
  });
  if (Math.abs(pxPerFt - pxGuess) > 0.4) {
    rooms = roomsFromFills(
      rooms.map((room) => ({ ...room })),
      pxPerFt,
    ).map((room, index) => ({
      ...room,
      name: rooms[index]?.name || room.name,
      type: guessRoomType(rooms[index]?.name) !== "other" ? guessRoomType(rooms[index]?.name) : room.type,
      sf: rooms[index]?.sf || room.sf,
    }));
  }
  const doors = connectionsFromDoors(rooms, dots, pxPerFt);
  const windowDots =
    graph.windowDots?.length ? graph.windowDots : findWindows(mask, w, h, rooms, dots, pxPerFt);
  return {
    ok: rooms.length >= 1,
    width: w,
    height: h,
    pxPerFt,
    rooms,
    doorDots: dots,
    windowDots,
    doors,
    preview: canvas.toDataURL("image/jpeg", 0.72),
    canvas,
    engine: cv ? "opencv" : "canvas",
  };
}

export function overlappingTiles(canvas, count = 4) {
  const tiles = [];
  const cols = 2;
  const rows = Math.ceil(count / cols);
  const overlap = 0.18;
  const tw = canvas.width / (cols - overlap);
  const th = canvas.height / (rows - overlap);
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      if (tiles.length >= count) break;
      const x = Math.round(c * tw * (1 - overlap));
      const y = Math.round(r * th * (1 - overlap));
      const w = Math.min(canvas.width - x, Math.round(tw));
      const h = Math.min(canvas.height - y, Math.round(th));
      const tile = document.createElement("canvas");
      tile.width = w;
      tile.height = h;
      tile.getContext("2d").drawImage(canvas, x, y, w, h, 0, 0, w, h);
      tiles.push({ x, y, w, h, dataUrl: tile.toDataURL("image/jpeg", 0.85) });
    }
  }
  return tiles;
}

#!/usr/bin/env python3
"""Procedural charcoal drawings for the end page (generic Manhattan rooftop / stoop / cornice scenes, no real building).
Each scene is drawn with a small stroke engine: every line is laid down in several jittered passes of varying
width and pressure, shade areas get hatching, then a paper-tooth texture breaks the strokes up, a blurred copy
adds smudge, and the edges dissolve into the stone. Output: assets/charcoal/<scene>.png, RGBA, graphite #23272E,
alpha only (so it multiplies naturally over the stone). Deterministic (seeded per scene).
Usage: python3 tools/make_charcoal.py [scene ...]     scenes: water-tower, stoop, cornice"""
import os, sys, math, numpy as np, cv2
from PIL import Image
KIT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(KIT, "assets", "charcoal")
W, H, S = 856, 560, 2                     # design space, supersample factor
INK = (0x23, 0x27, 0x2E)

class Paper:
    def __init__(self, seed, w=None, h=None):
        self.r = np.random.default_rng(seed)
        self.w, self.h = w or W, h or H
        self.ink = np.zeros((self.h * S, self.w * S), np.float32)
    def _lay(self, layer, a):
        self.ink = 1 - (1 - self.ink) * (1 - np.clip(layer * a, 0, 1))
    def _wobble(self, pts, jit):
        pts = np.asarray(pts, float); out = []
        for p0, p1 in zip(pts[:-1], pts[1:]):
            n = max(2, int(np.hypot(*(p1 - p0)) / 7))
            for t in np.linspace(0, 1, n, endpoint=False): out.append(p0 + (p1 - p0) * t)
        out.append(pts[-1]); out = np.array(out)
        drift = self.r.normal(0, jit, 2)                          # whole-stroke offset per pass
        return out + drift + self.r.normal(0, jit * .45, out.shape)
    def line(self, pts, w=1.6, a=.55, passes=3, jit=1.1, skip=.0, over=4):
        pts = [tuple(map(float, q)) for q in pts]
        if over and pts[0] != pts[-1] and len(pts) >= 2:          # artist's overshoot on open strokes
            def ext(p0, p1):
                d = np.subtract(p1, p0); n = np.hypot(*d) or 1; return tuple(np.add(p1, d / n * self.r.uniform(1, over)))
            pts = [ext(pts[1], pts[0])] + pts[1:-1] + [ext(pts[-2], pts[-1])]
        for _ in range(passes):
            q = self._wobble(pts, jit) * S
            layer = np.zeros_like(self.ink)
            seg = q.astype(np.int32)
            for i in range(len(seg) - 1):
                if skip and self.r.random() < skip: continue       # charcoal skipping over the tooth
                th = max(1, int(round(S * w * self.r.uniform(.6, 1.35))))
                cv2.line(layer, tuple(seg[i]), tuple(seg[i + 1]), float(self.r.uniform(.55, 1)), th, cv2.LINE_AA)
            layer = cv2.GaussianBlur(layer, (0, 0), .55 * S)          # soft charcoal edge
            self._lay(layer * 1.25, a * self.r.uniform(.55, 1) / passes * 1.8)
    def rect(self, x0, y0, x1, y1, **k):
        self.line([(x0, y0), (x1, y0), (x1, y1), (x0, y1), (x0, y0)], **k)
    def hatch(self, poly, angle=62, gap=6, a=.22, w=1.1, jit=.9):
        mask = np.zeros_like(self.ink); cv2.fillPoly(mask, [(np.array(poly) * S).astype(np.int32)], 1.0)
        mask = cv2.GaussianBlur(mask, (0, 0), 1.2 * S)
        xs, ys = [p[0] for p in poly], [p[1] for p in poly]
        cx, cy, R = (min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2, math.hypot(max(xs) - min(xs), max(ys) - min(ys)) / 2 + 10
        dx, dy = math.cos(math.radians(angle)), math.sin(math.radians(angle))
        layer = np.zeros_like(self.ink)
        for o in np.arange(-R, R, gap):
            ox, oy = cx - dy * o, cy + dx * o
            q = self._wobble([(ox - dx * R, oy - dy * R), (ox + dx * R, oy + dy * R)], jit) * S
            cv2.polylines(layer, [q.astype(np.int32)], False, float(self.r.uniform(.5, 1)), max(1, int(S * w)), cv2.LINE_AA)
        self._lay(layer * mask, a)
    def tone(self, poly, a=.10, blur=10):
        m = np.zeros_like(self.ink); cv2.fillPoly(m, [(np.array(poly) * S).astype(np.int32)], 1.0)
        self._lay(cv2.GaussianBlur(m, (0, 0), blur * S), a)
    def erase(self, mask, amount=1.0):
        """Kneaded-eraser pass: lift ink where mask (0..1, supersampled) is set."""
        self.ink *= (1 - np.clip(mask * amount, 0, 1))
    def finish(self, name, fade=(0.10, 0.10, 0.06, 0.22), opacity=.62):
        tooth = cv2.GaussianBlur(self.r.normal(0, 1, self.ink.shape).astype(np.float32), (0, 0), getattr(self, "tooth_sigma", .9) * S)
        tooth = (tooth - tooth.mean()) / tooth.std()
        coarse = cv2.GaussianBlur(self.r.normal(0, 1, self.ink.shape).astype(np.float32), (0, 0), 14 * S)
        coarse = (coarse - coarse.mean()) / coarse.std()
        ink = self.ink * np.clip(.78 + getattr(self, "tooth_amp", .34) * tooth + .10 * coarse, 0, 1.15)            # paper tooth breaks strokes
        ink = 1 - (1 - ink) * (1 - .45 * cv2.GaussianBlur(ink, (0, 0), 5 * S))         # smudge
        yy, xx = np.mgrid[0:ink.shape[0], 0:ink.shape[1]] / np.array([ink.shape[0], ink.shape[1]])[:, None, None]
        l, r, t, b = fade
        edge = (np.clip(xx / l, 0, 1) * np.clip((1 - xx) / r, 0, 1) * np.clip(yy / t, 0, 1) * np.clip((1 - yy) / b, 0, 1))
        edge = edge ** .8 * (1 + .25 * coarse.clip(-1, 1)) ; edge = np.clip(edge, 0, 1)
        alpha = np.clip(ink * edge * opacity, 0, 1)
        alpha = cv2.resize(alpha, (self.w, self.h), interpolation=cv2.INTER_AREA)
        rgba = np.zeros((self.h, self.w, 4), np.uint8); rgba[..., :3] = INK; rgba[..., 3] = (alpha * 255).round().astype(np.uint8)
        os.makedirs(OUT, exist_ok=True); p = os.path.join(OUT, name + ".png"); Image.fromarray(rgba, "RGBA").save(p, optimize=True)
        print("wrote", p, "max alpha", round(float(alpha.max()), 3))

def skyline(p, x0, x1, base, rng, a=.16):
    """A light, generic sliver of distant towers (no identifiable building)."""
    x = x0
    while x < x1:
        w = rng.uniform(34, 70); h = rng.uniform(90, 250); top = base - h
        pts = [(x, base), (x, top)]
        if rng.random() < .45:                               # setback
            s = rng.uniform(6, 12); pts += [(x + s, top), (x + s, top - rng.uniform(18, 40))]; top = pts[-1][1]
            pts += [(x + w - s, top), (x + w - s, top + (pts[-2][1] - pts[-1][1])), (x + w, pts[-2][1])]
        else:
            pts += [(x + w, top)]
        pts += [(x + w, base)]
        p.line(pts, w=.9, a=a * .8, passes=2, jit=.8, skip=.12)
        p.tone(pts, a=a * rng.uniform(.35, .7), blur=3)
        p.hatch([(x, base), (x, top + 10), (x + w, top + 10), (x + w, base)], angle=80, gap=9, a=a * .35, w=.9)
        for wy in np.arange(top + 22, base - 10, 16):        # a few window rows, very faint
            if rng.random() < .5: p.line([(x + 6, wy), (x + w - 6, wy)], w=.7, a=a * .45, passes=1, jit=.5, skip=.3)
        x += w + rng.uniform(4, 20)

def water_tower(seed=11):
    p = Paper(seed); rng = p.r
    roof = 468
    skyline(p, 36, 400, roof - 4, rng, a=.14)
    p.tone([(0, roof - 150), (W, roof - 170), (W, roof), (0, roof)], a=.05, blur=30)
    # roof parapet + coping, bulkhead at left
    p.line([(20, roof), (840, roof - 2)], w=2.2, a=.75, passes=3)
    p.tone([(20, roof + 10), (840, roof + 8), (840, roof + 90), (20, roof + 90)], a=.10, blur=10)
    p.line([(20, roof + 12), (840, roof + 10)], w=1.2, a=.45, passes=2, skip=.05)
    p.hatch([(20, roof + 12), (20, roof + 80), (840, roof + 78), (840, roof + 10)], angle=70, gap=7, a=.20)
    p.rect(118, roof - 96, 236, roof, w=1.6, a=.6)
    p.line([(110, roof - 96), (244, roof - 96)], w=2.0, a=.6)
    p.rect(150, roof - 70, 178, roof, w=1.1, a=.45)          # door
    p.hatch([(118, roof - 96), (118, roof), (150, roof), (150, roof - 96)], angle=75, gap=5, a=.25)
    # tank
    cx, tl, tr, tt, tb = 560, 480, 640, 176, 334
    for i in range(2): p.line([(tl + i, tt), (tl - 3 + i, tb)], w=1.9, a=.8)
    for i in range(2): p.line([(tr - i, tt), (tr + 3 - i, tb)], w=1.9, a=.8)
    p.tone([(300, 60), (820, 40), (840, 420), (330, 440)], a=.07, blur=45)                           # rubbed sky halo
    for y in np.linspace(tt + 30, tb - 22, 4):               # hoops, slightly curved, broken
        xs = np.linspace(tl, tr, 12); p.line([(x, y + 7 * math.sin(math.pi * (x - tl) / (tr - tl))) for x in xs], w=1.0, a=.45, passes=2, skip=.12, over=0)
    for x in np.linspace(tl + 20, tr - 20, 4): p.line([(x, tt + 8), (x + rng.uniform(-1, 1), tb - 6)], w=.7, a=.10, passes=1, skip=.35, over=0)
    p.tone([(tr - 60, tt), (tr - 60, tb), (tr + 3, tb), (tr, tt)], a=.16, blur=9)                  # shaded side, tonal
    p.hatch([(tr - 34, tt), (tr - 34, tb), (tr + 3, tb), (tr, tt)], angle=78, gap=5, a=.22)
    p.line([(tl - 5, tb), (tr + 5, tb)], w=2.2, a=.8)
    # conical roof + finial
    p.line([(tl - 8, tt + 2), (cx, tt - 70), (tr + 8, tt + 2)], w=1.9, a=.8)
    p.line([(tl - 8, tt + 2), (tr + 8, tt + 2)], w=1.4, a=.6)
    p.hatch([(cx, tt - 70), (tr + 8, tt + 2), (cx + 18, tt + 2)], angle=40, gap=4.5, a=.28)
    p.line([(cx, tt - 70), (cx, tt - 88)], w=1.4, a=.7); p.line([(cx - 6, tt - 88), (cx + 6, tt - 88)], w=1.2, a=.6)
    # legs + bracing
    legs = [tl + 8, tl + 52, tr - 52, tr - 8]
    feet = [tl - 14, tl + 46, tr - 46, tr + 14]
    for x0, x1 in zip(legs, feet): p.line([(x0, tb), (x1, roof)], w=1.8, a=.75)
    for (a0, b0), (a1, b1) in zip(zip(legs, feet), list(zip(legs, feet))[1:]):
        ya, yb = tb + 20, roof - 16
        p.line([(a0 + (b0 - a0) * .15, ya), (a1 + (b1 - a1) * .88, yb)], w=.9, a=.45, passes=2)
        p.line([(a1 + (b1 - a1) * .15, ya), (a0 + (b0 - a0) * .88, yb)], w=.9, a=.45, passes=2)
    p.line([(tl - 6, tb + 70), (tr + 6, tb + 70)], w=1.1, a=.5)
    # ladder
    for dx in (0, 12): p.line([(tl + 20 + dx, tt - 4), (tl + 20 + dx, roof)], w=.9, a=.45, passes=2)
    for y in np.arange(tt + 4, roof, 11): p.line([(tl + 20, y), (tl + 32, y)], w=.7, a=.35, passes=1)
    # shadow on the roof
    p.hatch([(tl - 30, roof + 14), (tr + 90, roof + 12), (tr + 60, roof + 36), (tl - 50, roof + 38)], angle=15, gap=4, a=.28)
    p.finish("water-tower")

def stoop(seed=23):
    p = Paper(seed); rng = p.r
    base = 520
    # facade edges and ground
    p.line([(40, base), (830, base)], w=1.8, a=.7)
    p.line([(470, 20), (470, base - 190)], w=1.4, a=.5, skip=.05)
    p.line([(800, 20), (800, base)], w=1.2, a=.4, skip=.08)
    p.hatch([(470, 20), (470, 330), (800, 330), (800, 20)], angle=86, gap=11, a=.10)           # brownstone tone
    # door with transom and pediment
    dx0, dx1, dt = 560, 700, 150
    p.rect(dx0, dt, dx1, base - 190, w=1.8, a=.7)
    p.line([(dx0 - 22, dt - 8), (dx1 + 22, dt - 8)], w=2.0, a=.75)
    p.line([(dx0 - 30, dt - 30), (dx1 + 30, dt - 30)], w=1.8, a=.7)
    p.line([(dx0 - 30, dt - 30), ((dx0 + dx1) / 2, dt - 78), (dx1 + 30, dt - 30)], w=1.6, a=.65)   # pediment
    for x in np.linspace(dx0 - 20, dx1 + 20, 14): p.line([(x, dt - 30), (x, dt - 20)], w=.8, a=.4, passes=1)  # dentils
    p.line([(dx0, dt + 40), (dx1, dt + 40)], w=1.1, a=.5)          # transom bar
    p.line([((dx0 + dx1) / 2, dt + 40), ((dx0 + dx1) / 2, base - 190)], w=1.2, a=.55)
    for x0 in (dx0 + 12, (dx0 + dx1) / 2 + 12): p.rect(x0, dt + 56, x0 + 46, base - 206, w=.8, a=.35)
    p.hatch([(dx0, dt + 40), (dx0, base - 190), (dx1, base - 190), (dx1, dt + 40)], angle=70, gap=5, a=.22)
    # stoop: landing then steps descending to the left
    land = base - 190
    p.line([(520, land), (760, land)], w=2.0, a=.75)
    steps = 9; sx, sy = 520, land
    for i in range(steps):
        nx, ny = sx - 34, sy + 190 / steps
        p.line([(sx, sy), (sx, ny)], w=1.1, a=.55, passes=2)       # riser
        p.line([(nx, ny), (sx + (240 if i == 0 else 0) * 0, ny)], w=1.4, a=.6, passes=2)   # tread
        sx, sy = nx, ny
    p.line([(520, land), (sx, base)], w=.9, a=.3, passes=1)
    p.hatch([(520, land), (760, land), (760, base), (sx, base)], angle=20, gap=5, a=.24)          # stoop mass
    p.hatch([(560, land + 30), (740, land + 30), (740, base), (600, base)], angle=65, gap=4, a=.22)  # under-stoop shadow
    # iron railing with balusters and a scrolled newel
    r0, r1 = (512, land - 70), (sx - 8, base - 72)
    p.line([r0, r1], w=1.6, a=.75)
    p.line([(r0[0], r0[1] + 10), (r1[0], r1[1] + 10)], w=.9, a=.45, passes=2)
    for t in np.linspace(0, 1, 16):
        x = r0[0] + (r1[0] - r0[0]) * t; y = r0[1] + (r1[1] - r0[1]) * t
        p.line([(x, y), (x, y + 70)], w=.8, a=.45, passes=2)
    th = np.linspace(0, 2.6 * math.pi, 40)
    p.line([(r1[0] - 16 + 14 * math.cos(a) * (1 - a / 9), r1[1] - 4 + 14 * math.sin(a) * (1 - a / 9)) for a in th], w=1.2, a=.6, passes=2)
    p.line([(r1[0] - 8, r1[1]), (r1[0] - 8, base)], w=1.6, a=.7)
    # window left of door, partial
    p.rect(300, 60, 400, 240, w=1.4, a=.55); p.line([(300, 150), (400, 150)], w=1, a=.45)
    p.line([(288, 52), (412, 52)], w=1.8, a=.6); p.hatch([(300, 60), (300, 240), (400, 240), (400, 60)], angle=75, gap=5, a=.2)
    p.line([(292, 248), (408, 248)], w=1.5, a=.55)
    # planter / tree pit hint
    p.line([(120, base), (130, base - 60), (190, base - 64), (200, base)], w=1.1, a=.4)
    p.hatch([(80, base + 4), (820, base + 4), (820, base + 40), (80, base + 40)], angle=8, gap=6, a=.14)
    p.finish("stoop")

def cornice(seed=37):
    p = Paper(seed); rng = p.r
    top = 190
    # sky tone and small water tower behind
    p.tone([(0, 0), (W, 0), (W, top), (0, top)], a=.04, blur=40)
    tx = 640
    p.rect(tx, 62, tx + 70, 128, w=1.4, a=.55)
    p.line([(tx - 4, 62), (tx + 35, 30), (tx + 74, 62)], w=1.3, a=.55)
    for x0, x1 in ((tx + 6, tx - 4), (tx + 64, tx + 74)): p.line([(x0, 128), (x1, top - 30)], w=1.1, a=.5)
    p.hatch([(tx + 44, 62), (tx + 44, 128), (tx + 70, 128), (tx + 70, 62)], angle=80, gap=4, a=.25)
    # cornice: fascia, dentils, brackets
    p.line([(10, top - 30), (846, top - 34)], w=2.2, a=.8)
    p.line([(10, top - 14), (846, top - 18)], w=1.4, a=.6)
    p.hatch([(10, top - 30), (846, top - 34), (846, top - 18), (10, top - 14)], angle=85, gap=3.5, a=.30)
    for x in np.arange(18, 846, 13): p.line([(x, top - 12), (x, top)], w=.9, a=.45, passes=1)
    p.line([(10, top + 2), (846, top - 2)], w=1.3, a=.6)
    for x in np.arange(40, 846, 118):
        # scrolled console: straight back, curved front ending in a small volute
        front = [(x + 26 - 10 * math.sin(t * math.pi / 2), top + 2 + 58 * t) for t in np.linspace(0, 1, 10)]
        vol = [(x + 12 + 7 * (1 - u / 7) * math.cos(u), top + 64 + 7 * (1 - u / 7) * math.sin(u)) for u in np.linspace(0, 5.5, 18)]
        p.line([(x + 2, top + 2), (x + 2, top + 66)], w=1.2, a=.6); p.line(front + vol, w=1.2, a=.6, over=0)
        p.hatch([(x + 14, top + 2), (x + 14, top + 70), (x + 26, top + 60), (x + 26, top + 2)], angle=80, gap=3.5, a=.28)
    p.line([(10, top + 84), (846, top + 80)], w=1.6, a=.6)
    p.tone([(10, top + 84), (846, top + 80), (846, top + 120), (10, top + 124)], a=.10, blur=8)   # shadow under cornice
    # window bays with lintels
    for row, y in enumerate((top + 150, top + 330)):
        for x in np.arange(70, 846, 190):
            p.line([(x - 12, y - 14), (x + 102, y - 14)], w=1.8, a=.65)
            p.hatch([(x - 12, y - 24), (x + 102, y - 24), (x + 102, y - 14), (x - 12, y - 14)], angle=80, gap=3.5, a=.3)
            p.rect(x, y, x + 90, y + 140 if row == 0 else y + 120, w=1.2, a=.5)
            p.line([(x, y + 62), (x + 90, y + 62)], w=.9, a=.4, passes=2)
            p.hatch([(x, y), (x, y + 140), (x + 90, y + 140), (x + 90, y)], angle=72, gap=6, a=.16)
    # fire escape: platform + slanted stair between the bays (drawn as rails, no dashes involved)
    fx0, fx1, fy = 250, 450, top + 300
    p.line([(fx0, fy), (fx1, fy)], w=1.6, a=.65); p.line([(fx0, fy - 36), (fx1, fy - 36)], w=1.0, a=.5)
    for x in np.linspace(fx0, fx1, 14): p.line([(x, fy - 36), (x, fy)], w=.7, a=.4, passes=1)
    p.line([(fx0 + 20, fy), (fx1 - 30, fy + 150)], w=1.2, a=.55); p.line([(fx0 + 34, fy), (fx1 - 16, fy + 150)], w=1.0, a=.45)
    p.hatch([(0, top + 124), (W, top + 120), (W, H), (0, H)], angle=88, gap=12, a=.07)            # brick tone
    p.finish("cornice", fade=(0.08, 0.08, 0.05, 0.30))

SCENES = {"water-tower": water_tower, "stoop": stoop, "cornice": cornice}
if __name__ == "__main__":
    for n in (sys.argv[1:] or SCENES): SCENES[n]()

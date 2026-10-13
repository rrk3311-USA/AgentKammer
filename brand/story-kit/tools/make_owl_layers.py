#!/usr/bin/env python3
"""Turn the generated charcoal owl scenes (pale paper) into stone-blending end-page layers.

Sources: assets/charcoal/owls/owls-*.png (as delivered, 16:9 on pale grey paper).
Output:  assets/charcoal/owls/stone/owls-*.png, RGBA, exactly the end-page art box (984x553).

Per image:
  1. grayscale, then estimate the paper level P (a high luminance percentile).
  2. darks -> graphite with alpha, so that over the kit stone the result matches a
     multiply blend (stone * L/P): the pale paper vanishes and only the drawing remains.
  3. the few pixels brighter than the paper (owl whites, snow) -> a faint ivory lift,
     so the white owls read as lit rather than hollow.
  4. a soft rubbed vignette (smooth, slightly irregular edges) so no rectangle shows.
  5. overall strength OPACITY: clearly legible, still well below the ink of "Until tomorrow."

Usage: python3 tools/make_owl_layers.py [name ...]      (default: every owls-*.png in the folder)
Deterministic: same inputs give the same outputs.
"""
import glob, os, sys
import numpy as np
from PIL import Image, ImageFilter

KIT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(KIT, "assets", "charcoal", "owls")
OUT = os.path.join(SRC, "stone")
W, H = 944, 531                  # art box on the end page: x 68 to 1012, y 590 to 1121
STONE = 205.0                    # mean stone luminance behind the art box (assets/stone-bg.png)
INK = np.array([30, 34, 42], float)      # graphite, a touch cooler than --deep
LIFT = np.array([250, 248, 243], float)  # ivory for the owl whites
OPACITY = 0.72                   # strength of the drawing (1 = full multiply)
LIFT_MAX = 0.30                  # max alpha of the ivory lift
FLOOR = 0.035                    # paper grain below this darkness is dropped
FADE = dict(left=66, right=66, top=120, bottom=104)   # vignette widths in px


def smooth(x):
    x = np.clip(x, 0, 1)
    return x * x * (3 - 2 * x)


def vignette(seed):
    y, x = np.mgrid[0:H, 0:W].astype(float)
    rng = np.random.default_rng(seed)
    # low-frequency wobble so the fade edge looks rubbed, not ruled
    n = rng.standard_normal((H // 24 + 2, W // 24 + 2))
    wob = np.asarray(Image.fromarray(((n - n.min()) / (np.ptp(n) + 1e-9) * 255).astype(np.uint8))
                     .resize((W, H), Image.BICUBIC), float) / 255 - 0.5
    m = (smooth(x / FADE["left"]) * smooth((W - 1 - x) / FADE["right"])
         * smooth(y / FADE["top"]) * smooth((H - 1 - y) / FADE["bottom"]))
    m = np.clip(m * (1 + 0.35 * wob), 0, 1)
    # round the corners a little more than the product already does
    cx, cy = (x - W / 2) / (W / 2), (y - H / 2) / (H / 2)
    m *= smooth((1.0 - (np.abs(cx) ** 6 + np.abs(cy) ** 6) ** (1 / 6)) / 0.10 + 0.4)
    return m


def process(path):
    name = os.path.splitext(os.path.basename(path))[0]
    g = Image.open(path).convert("L").resize((W, H), Image.LANCZOS)
    L = np.asarray(g, float)
    P = np.percentile(L, 94)
    dark = np.clip(1 - L / P, 0, 1)
    dark = np.clip((dark - FLOOR) / (1 - FLOOR), 0, 1)
    # normal-blend alpha that reproduces stone * (1 - dark) over the mean stone
    a_dark = np.clip(OPACITY * dark * STONE / (STONE - INK.mean()), 0, 1)
    light = np.clip((L - P) / max(1.0, 255 - P), 0, 1)
    light = np.asarray(Image.fromarray((light * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.8)), float) / 255
    a_lift = LIFT_MAX * light * (a_dark < 0.08)
    v = vignette(abs(hash(name)) % 2**32 if False else sum(map(ord, name)))
    a = np.clip((a_dark + a_lift) * v, 0, 1)
    wd = np.where(a_dark + a_lift > 0, a_dark / np.maximum(a_dark + a_lift, 1e-6), 1)[..., None]
    rgb = INK * wd + LIFT * (1 - wd)
    out = np.dstack([rgb, a * 255]).round().astype(np.uint8)
    os.makedirs(OUT, exist_ok=True)
    dst = os.path.join(OUT, name + ".png")
    Image.fromarray(out, "RGBA").save(dst, optimize=True)
    print(f"wrote {dst}  paper {P:.0f}  max alpha {a.max():.2f}  mean alpha {a.mean():.3f}")


if __name__ == "__main__":
    names = sys.argv[1:]
    files = [os.path.join(SRC, n if n.endswith(".png") else n + ".png") for n in names] or sorted(glob.glob(os.path.join(SRC, "owls-*.png")))
    for f in files:
        process(f)

#!/usr/bin/env python3
"""Honed limestone paper for The Manhattan Minute / grey v11 print sheet.

The original stone-bg.png / make_stone.py is not in this repo. This rebuilds
a soft mottled grey at base #CFCCC6. No cream, no beige.

  python3 scripts/make_stone.py
"""

from __future__ import annotations

import math
import struct
import zlib
from pathlib import Path

W = 512
H = 512
BASE = (0xCF, 0xCC, 0xC6)
OUT = Path(__file__).resolve().parents[1] / "client/public/chrome/stone-bg.png"


def fade(t: float) -> float:
    return t * t * (3 - 2 * t)


def hash2(x: int, y: int) -> float:
    n = (x * 374761393 + y * 668265263) & 0xFFFFFFFF
    n = (n ^ (n >> 13)) * 1274126177
    return ((n ^ (n >> 16)) & 0xFFFFFF) / 16777215.0


def value_noise(x: float, y: float) -> float:
    x0, y0 = int(math.floor(x)), int(math.floor(y))
    fx, fy = fade(x - x0), fade(y - y0)
    v00, v10 = hash2(x0, y0), hash2(x0 + 1, y0)
    v01, v11 = hash2(x0, y0 + 1), hash2(x0 + 1, y0 + 1)
    return v00 * (1 - fx) * (1 - fy) + v10 * fx * (1 - fy) + v01 * (1 - fx) * fy + v11 * fx * fy


def fbm(x: float, y: float) -> float:
    total = 0.0
    amp = 1.0
    freq = 1.0
    norm = 0.0
    for _ in range(5):
        total += value_noise(x * freq, y * freq) * amp
        norm += amp
        amp *= 0.52
        freq *= 2.05
    return total / norm


def png(rgb: bytes, w: int, h: int) -> bytes:
    def chunk(tag: bytes, data: bytes) -> bytes:
        crc = zlib.crc32(tag + data) & 0xFFFFFFFF
        return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", crc)

    raw = b"".join(b"\x00" + rgb[i * w * 3 : (i + 1) * w * 3] for i in range(h))
    return b"".join(
        [
            b"\x89PNG\r\n\x1a\n",
            chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0)),
            chunk(b"IDAT", zlib.compress(raw, 9)),
            chunk(b"IEND", b""),
        ]
    )


def main() -> None:
    pixels = bytearray()
    for y in range(H):
        for x in range(W):
            n = fbm(x / 46.0, y / 46.0)
            grain = hash2(x, y) * 0.035
            lift = (n - 0.5) * 18.0 + (grain - 0.017) * 255.0
            r = max(0, min(255, int(BASE[0] + lift)))
            g = max(0, min(255, int(BASE[1] + lift * 0.96)))
            b = max(0, min(255, int(BASE[2] + lift * 0.90)))
            pixels.extend((r, g, b))
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_bytes(png(bytes(pixels), W, H))
    print(f"wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()

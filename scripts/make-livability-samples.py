#!/usr/bin/env python3
"""Draw 3 synthetic public-domain floor plans for the Livability CV harness."""

from __future__ import annotations

import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path("client/public/tools/livability/samples")
IVORY = (245, 242, 235)
WALL = (22, 28, 40)
INK = (13, 24, 43)
ARC = (42, 52, 71)
PX = 8
THICK = 6
DOOR = round(32 / 12 * PX)  # 21 px ~ 32 in


def font(size: int):
    for path in (
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ):
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return ImageFont.load_default()


def paint_h_wall(px, x0, x1, y, t=THICK):
    for x in range(min(x0, x1), max(x0, x1) + 1):
        for k in range(t):
            yy = y + k - t // 2
            if 0 <= x < px["w"] and 0 <= yy < px["h"]:
                px["pix"][x, yy] = WALL


def paint_v_wall(px, y0, y1, x, t=THICK):
    for y in range(min(y0, y1), max(y0, y1) + 1):
        for k in range(t):
            xx = x + k - t // 2
            if 0 <= xx < px["w"] and 0 <= y < px["h"]:
                px["pix"][xx, y] = WALL


def punch_h_gap(px, x, y, width=DOOR, t=THICK):
    x0 = int(x - width / 2)
    for i in range(width):
        for k in range(-t, t + 1):
            xx, yy = x0 + i, y + k
            if 0 <= xx < px["w"] and 0 <= yy < px["h"]:
                px["pix"][xx, yy] = IVORY


def punch_v_gap(px, x, y, width=DOOR, t=THICK):
    y0 = int(y - width / 2)
    for i in range(width):
        for k in range(-t, t + 1):
            xx, yy = x + k, y0 + i
            if 0 <= xx < px["w"] and 0 <= yy < px["h"]:
                px["pix"][xx, yy] = IVORY


def swing(draw, x, y, wall, r=None):
    r = r or DOOR
    # quarter-circle from the hinge, inside the room
    if wall == "n":
        box = [x, y - r, x + r, y + r]
        draw.arc(box, start=180, end=270, fill=ARC, width=2)
    elif wall == "s":
        box = [x - r, y - r, x + r, y + r]
        draw.arc(box, start=270, end=360, fill=ARC, width=2)
    elif wall == "e":
        box = [x - r, y, x + r, y + r]
        draw.arc(box, start=0, end=90, fill=ARC, width=2)
    else:
        box = [x - r, y - r, x + r, y]
        draw.arc(box, start=90, end=180, fill=ARC, width=2)


def label(draw, room, f_name, f_dim):
    cx = room["x"] + room["w"] / 2
    cy = room["y"] + room["h"] / 2 - 8
    name = room["name"]
    bbox = draw.textbbox((0, 0), name, font=f_name)
    tw = bbox[2] - bbox[0]
    draw.text((cx - tw / 2, cy - 8), name, fill=INK, font=f_name)
    dim = room.get("dim")
    if dim:
        bbox = draw.textbbox((0, 0), dim, font=f_dim)
        dw = bbox[2] - bbox[0]
        draw.text((cx - dw / 2, cy + 14), dim, fill=(80, 88, 102), font=f_dim)


def save(img, meta):
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / f"{meta['id']}.png"
    img.save(path, "PNG")
    (OUT / f"{meta['id']}.json").write_text(json.dumps(meta, indent=2) + "\n")
    print(path, img.size)


def make_line_two_bed():
    w, h = 520, 460
    img = Image.new("RGB", (w, h), IVORY)
    pix = img.load()
    px = {"pix": pix, "w": w, "h": h}
    # interior rooms (inside walls)
    rooms = [
        {"id": "living", "name": "Living", "type": "living", "sf": 300, "x": 48, "y": 40, "w": 240, "h": 160, "dim": "30'-0\" x 20'-0\""},
        {"id": "kitchen", "name": "Kitchen", "type": "kitchen", "sf": 200, "x": 288, "y": 40, "w": 160, "h": 160, "dim": "20'-0\" x 20'-0\""},
        {"id": "hall", "name": "Hall", "type": "hallway", "sf": 120, "x": 48, "y": 200, "w": 400, "h": 48, "dim": "50'-0\""},
        {"id": "beda", "name": "Bedroom A", "type": "bedroom", "sf": 200, "x": 48, "y": 248, "w": 160, "h": 160, "dim": "20'-0\" x 20'-0\""},
        {"id": "bath", "name": "Bath", "type": "bath", "sf": 80, "x": 208, "y": 248, "w": 80, "h": 160, "dim": "10'-0\""},
        {"id": "bedb", "name": "Bedroom B", "type": "bedroom", "sf": 200, "x": 288, "y": 248, "w": 160, "h": 160, "dim": "20'-0\" x 20'-0\""},
    ]
    # outer + splits
    paint_h_wall(px, 48, 448, 40)
    paint_h_wall(px, 48, 448, 200)
    paint_h_wall(px, 48, 448, 248)
    paint_h_wall(px, 48, 448, 408)
    paint_v_wall(px, 40, 408, 48)
    paint_v_wall(px, 40, 200, 288)
    paint_v_wall(px, 40, 408, 448)
    paint_v_wall(px, 248, 408, 208)
    paint_v_wall(px, 248, 408, 288)

    dots = [
        {"x": 288, "y": 120, "a": "living", "b": "kitchen", "wall": "e"},
        {"x": 168, "y": 200, "a": "living", "b": "hall", "wall": "s"},
        {"x": 368, "y": 200, "a": "kitchen", "b": "hall", "wall": "s"},
        {"x": 128, "y": 248, "a": "hall", "b": "beda", "wall": "s"},
        {"x": 248, "y": 248, "a": "hall", "b": "bath", "wall": "s"},
        {"x": 368, "y": 248, "a": "hall", "b": "bedb", "wall": "s"},
    ]
    for d in dots:
        if d["wall"] in ("n", "s"):
            punch_h_gap(px, d["x"], d["y"])
        else:
            punch_v_gap(px, d["x"], d["y"])
    draw = ImageDraw.Draw(img)
    for d in dots:
        swing(draw, d["x"], d["y"], d["wall"])
    fn, fd = font(15), font(11)
    for room in rooms:
        label(draw, room, fn, fd)
    doors = [{"a": d["a"], "b": d["b"]} for d in dots]
    save(
        img,
        {
            "id": "line-two-bed",
            "title": "Synthetic line two-bed",
            "pxPerFt": PX,
            "width": w,
            "height": h,
            "rooms": [{k: room[k] for k in ("id", "name", "type", "sf", "x", "y", "w", "h")} for room in rooms],
            "doorDots": [{"x": d["x"], "y": d["y"]} for d in dots],
            "doors": doors,
        },
    )


def make_studio_bath():
    w, h = 480, 300
    img = Image.new("RGB", (w, h), IVORY)
    pix = img.load()
    px = {"pix": pix, "w": w, "h": h}
    rooms = [
        {"id": "studio", "name": "Studio", "type": "living", "sf": 420, "x": 40, "y": 40, "w": 280, "h": 200, "dim": "35'-0\" x 25'-0\""},
        {"id": "bath", "name": "Bath", "type": "bath", "sf": 60, "x": 320, "y": 40, "w": 96, "h": 200, "dim": "12'-0\""},
    ]
    paint_h_wall(px, 40, 416, 40)
    paint_h_wall(px, 40, 416, 240)
    paint_v_wall(px, 40, 240, 40)
    paint_v_wall(px, 40, 240, 320)
    paint_v_wall(px, 40, 240, 416)
    dots = [{"x": 320, "y": 140, "a": "studio", "b": "bath", "wall": "e"}]
    punch_v_gap(px, 320, 140)
    draw = ImageDraw.Draw(img)
    swing(draw, 320, 140, "e")
    fn, fd = font(16), font(12)
    for room in rooms:
        label(draw, room, fn, fd)
    save(
        img,
        {
            "id": "studio-bath",
            "title": "Synthetic studio with bath",
            "pxPerFt": PX,
            "width": w,
            "height": h,
            "rooms": [{k: room[k] for k in ("id", "name", "type", "sf", "x", "y", "w", "h")} for room in rooms],
            "doorDots": [{"x": d["x"], "y": d["y"]} for d in dots],
            "doors": [{"a": "studio", "b": "bath"}],
        },
    )


def make_stahl_approx():
    w, h = 640, 620
    img = Image.new("RGB", (w, h), IVORY)
    pix = img.load()
    px = {"pix": pix, "w": w, "h": h}
    rooms = [
        {"id": "living", "name": "Living", "type": "living", "sf": 360, "x": 40, "y": 40, "w": 200, "h": 152, "dim": "25'-0\""},
        {"id": "dining", "name": "Dining", "type": "dining", "sf": 210, "x": 240, "y": 40, "w": 120, "h": 152, "dim": "15'-0\""},
        {"id": "kitchen", "name": "Kitchen", "type": "kitchen", "sf": 240, "x": 360, "y": 40, "w": 144, "h": 152, "dim": "18'-0\""},
        {"id": "pool", "name": "Pool", "type": "terrace", "sf": 420, "x": 40, "y": 192, "w": 200, "h": 360, "dim": "25'-0\""},
        {"id": "entry", "name": "Entry", "type": "entry", "sf": 70, "x": 240, "y": 192, "w": 88, "h": 80, "dim": "11'-0\""},
        {"id": "bed2", "name": "Bedroom 2", "type": "bedroom", "sf": 220, "x": 240, "y": 272, "w": 160, "h": 128, "dim": "20'-0\""},
        {"id": "mbed", "name": "Master bedroom", "type": "bedroom", "sf": 320, "x": 240, "y": 400, "w": 200, "h": 152, "dim": "25'-0\""},
    ]
    # top wing
    paint_h_wall(px, 40, 504, 40)
    paint_h_wall(px, 40, 504, 192)
    paint_v_wall(px, 40, 192, 40)
    paint_v_wall(px, 40, 192, 240)
    paint_v_wall(px, 40, 192, 360)
    paint_v_wall(px, 40, 192, 504)
    # pool / sleeping wing
    paint_v_wall(px, 192, 552, 40)
    paint_h_wall(px, 40, 240, 552)
    paint_v_wall(px, 192, 552, 240)
    paint_h_wall(px, 240, 440, 272)
    paint_h_wall(px, 240, 440, 400)
    paint_h_wall(px, 240, 440, 552)
    paint_v_wall(px, 192, 272, 328)
    paint_v_wall(px, 272, 400, 400)
    paint_v_wall(px, 400, 552, 440)

    dots = [
        {"x": 240, "y": 116, "a": "living", "b": "dining", "wall": "e"},
        {"x": 360, "y": 116, "a": "dining", "b": "kitchen", "wall": "e"},
        {"x": 284, "y": 192, "a": "dining", "b": "entry", "wall": "s"},
        {"x": 140, "y": 192, "a": "living", "b": "pool", "wall": "s"},
        {"x": 240, "y": 232, "a": "entry", "b": "pool", "wall": "w"},
        {"x": 284, "y": 272, "a": "entry", "b": "bed2", "wall": "s"},
        {"x": 320, "y": 400, "a": "bed2", "b": "mbed", "wall": "s"},
        {"x": 240, "y": 476, "a": "mbed", "b": "pool", "wall": "w"},
    ]
    for d in dots:
        if d["wall"] in ("n", "s"):
            punch_h_gap(px, d["x"], d["y"])
        else:
            punch_v_gap(px, d["x"], d["y"])
    draw = ImageDraw.Draw(img)
    for d in dots:
        swing(draw, d["x"], d["y"], d["wall"])
    fn, fd = font(14), font(11)
    for room in rooms:
        label(draw, room, fn, fd)
    save(
        img,
        {
            "id": "stahl-approx",
            "title": "Stahl House approximation (synthetic, public plan geometry)",
            "pxPerFt": PX,
            "width": w,
            "height": h,
            "rooms": [{k: room[k] for k in ("id", "name", "type", "sf", "x", "y", "w", "h")} for room in rooms],
            "doorDots": [{"x": d["x"], "y": d["y"]} for d in dots],
            "doors": [{"a": d["a"], "b": d["b"]} for d in dots],
        },
    )


def main():
    make_line_two_bed()
    make_studio_bath()
    make_stahl_approx()
    index = {
        "note": "Synthetic or public-plan approximations for the CV harness. Real accuracy testing needs about 20 listing plans and a vision key.",
        "samples": ["line-two-bed", "studio-bath", "stahl-approx"],
        "doorInches": [30, 36],
        "pxPerFt": PX,
    }
    (OUT / "index.json").write_text(json.dumps(index, indent=2) + "\n")


if __name__ == "__main__":
    main()

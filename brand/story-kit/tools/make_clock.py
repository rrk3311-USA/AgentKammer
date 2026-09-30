#!/usr/bin/env python3
"""Draw the cover's engraved clock dial as an SVG (code-drawn; no image generator available).

Revision (Raphi, Sep 29, late): the dial sits top left, off centre, and the word "Manhattan" of the nameplate
is nested across its middle. No hands. So the numerals move outward (radius .75 of the dial) where they clear
the nameplate, and III and IX are left out because "Manhattan" runs through those positions.

Style: steel engraving. Double outer ring with a rope of fine hatch strokes, a 60 tick minute track with double
hour batons, Roman numerals in Cormorant Garamond on a lightly cross-hatched chapter ring, and a quiet guilloche
rosette (rotated ellipses) in the centre. Pure graphite strokes on transparent; the cover sets the opacity and
a corner-anchored fade so it melts into the stone.

Output: assets/cover-clock.svg (800x800 viewBox) and assets/cover-clock.js (the same markup as
window.COVER_CLOCK_SVG, so the cover can inline it and the numerals use the page's Cormorant). Deterministic.
Usage: python3 tools/make_clock.py [--hands] [--omit 3,9] [--name cover-clock-corner --var COVER_CLOCK_SVG_CORNER]

The corner variant (titleAlign center / left on the cover) is: --omit "" --name cover-clock-corner --var COVER_CLOCK_SVG_CORNER
(all twelve numerals; the cover hides any numeral that would land on the nameplate).
"""
import argparse, json, math, os
KIT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ap = argparse.ArgumentParser()
ap.add_argument("--hands", action="store_true", help="draw Breguet hands at 9:59 (off by default since Sep 29)")
ap.add_argument("--omit", default="3,9", help="hour positions without a numeral (default 3,9: the nameplate crosses them)")
ap.add_argument("--name", default="cover-clock", help="output base name in assets/")
ap.add_argument("--var", default="COVER_CLOCK_SVG", help="window variable in the .js copy")
a = ap.parse_args()
OUT = os.path.join(KIT, "assets", a.name + ".svg")
OMIT = {int(x) % 12 for x in a.omit.split(",") if x.strip()}
S, C = 800, 400.0
INK = "#1E232B"
out = []
add = out.append
def pol(r, deg):
    t = math.radians(deg - 90); return C + r * math.cos(t), C + r * math.sin(t)

add(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {S} {S}" width="{S}" height="{S}">')
add(f'<g fill="none" stroke="{INK}" stroke-linecap="round">')
for r, w in [(396, 2.0), (390, .8), (360, .8), (356, 1.5)]:
    add(f'<circle cx="{C}" cy="{C}" r="{r}" stroke-width="{w}"/>')
for i in range(360):                                    # rope band
    x0, y0 = pol(361, i); x1, y1 = pol(389, i + 1.6)
    add(f'<path d="M{x0:.1f} {y0:.1f}L{x1:.1f} {y1:.1f}" stroke-width=".55" opacity=".8"/>')
for m in range(60):                                     # minute track
    if m % 5:
        x0, y0 = pol(338, m * 6); x1, y1 = pol(352, m * 6)
        add(f'<path d="M{x0:.1f} {y0:.1f}L{x1:.1f} {y1:.1f}" stroke-width="1.2"/>')
for r in (352, 336):
    add(f'<circle cx="{C}" cy="{C}" r="{r}" stroke-width=".7"/>')
for h in range(12):                                     # double hour batons
    for off in (-.9, .9):
        x0, y0 = pol(334, h * 30 + off); x1, y1 = pol(354, h * 30 + off)
        add(f'<path d="M{x0:.1f} {y0:.1f}L{x1:.1f} {y1:.1f}" stroke-width="1.5"/>')
# chapter ring 266 to 332, lightly cross-hatched
add('<defs><clipPath id="ch"><path fill-rule="evenodd" d="'
    f'M{C-332} {C}a332 332 0 1 0 664 0a332 332 0 1 0 -664 0Z M{C-266} {C}a266 266 0 1 0 532 0a266 266 0 1 0 -532 0Z"/></clipPath></defs>')
add('<g clip-path="url(#ch)" opacity=".30">')
for k in range(-70, 71):
    o = k * 9
    add(f'<path d="M{C-440+o} {C+440}L{C+440+o} {C-440}" stroke-width=".45"/>')
    add(f'<path d="M{C-440+o} {C-440}L{C+440+o} {C+440}" stroke-width=".45"/>')
add('</g>')
for r, w in [(332, .9), (328, .45), (270, .45), (266, .9)]:
    add(f'<circle cx="{C}" cy="{C}" r="{r}" stroke-width="{w}"/>')
add('<g opacity=".32">')                                 # quiet guilloche rosette behind the nameplate
for i in range(60):
    add(f'<ellipse cx="{C}" cy="{C}" rx="214" ry="86" transform="rotate({i*3} {C} {C})" stroke-width=".4"/>')
add('</g>')
add(f'<circle cx="{C}" cy="{C}" r="226" stroke-width=".7"/>')
add('</g>')
ROM = ["XII", "I", "II", "III", "IIII", "V", "VI", "VII", "VIII", "IX", "X", "XI"]
add(f'<g fill="{INK}" font-family="Cormorant Garamond, Cormorant, Georgia, serif" font-weight="500" font-size="46" text-anchor="middle">')
for h, t in enumerate(ROM):
    if h in OMIT:
        continue
    x, y = pol(299, h * 30)
    add(f'<text x="{x:.1f}" y="{y + 15:.1f}" letter-spacing="-1">{t}</text>')
add('</g>')
if a.hands:
    def hand(length, deg, w, mr, ma, tail):
        p = (f'M{C-w*.35:.1f} {C+tail:.1f} L{C-w/2:.1f} {C:.1f} L{C-w*.28:.1f} {C-ma+mr*1.1:.1f} '
             f'L{C+w*.28:.1f} {C-ma+mr*1.1:.1f} L{C+w/2:.1f} {C:.1f} L{C+w*.35:.1f} {C+tail:.1f} Z '
             f'M{C-w*.24:.1f} {C-ma-mr*1.05:.1f} L{C:.1f} {C-length:.1f} L{C+w*.24:.1f} {C-ma-mr*1.05:.1f} Z')
        return (f'<g transform="rotate({deg:.2f} {C} {C})" fill="{INK}" stroke="{INK}" stroke-width=".8"><path d="{p}"/>'
                f'<circle cx="{C}" cy="{C-ma:.1f}" r="{mr}" fill="none" stroke-width="{w*.22:.1f}"/></g>')
    add(hand(196, (9 + 59 / 60) * 30, 13, 17, 140, 38)); add(hand(298, 59 * 6, 9, 13, 226, 52))
    add(f'<circle cx="{C}" cy="{C}" r="11" fill="{INK}"/>')
add('</svg>')
svg = "\n".join(out)
open(OUT, "w").write(svg)
open(OUT[:-4] + ".js", "w").write("// generated by tools/make_clock.py\nwindow." + a.var + " = " + json.dumps(svg) + ";\n")
print("wrote", OUT, "and", OUT[:-4] + ".js", "| hands:", a.hands, "| numerals omitted at:", sorted(OMIT))

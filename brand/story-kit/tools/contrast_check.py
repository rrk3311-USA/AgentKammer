#!/usr/bin/env python3
"""Text contrast on the stone: for every visible text element of a template, the WCAG contrast of its
colour (with opacity) against what is actually behind its box. The page is rendered a second time with all text
made transparent (stone, art, rules and cards stay), and each box is checked against both its darkest 1% and
lightest 1% pixels; the lower ratio counts. This catches charcoal art or the cover clock sitting behind text.
Pass rule: 4.5:1 under 24px (or under 18.66px bold), 3:1 at or above. Text inside a browser panel or the board's editorial insert card (.dealp .ins, solid ivory) is measured against
the panel's darkest fill (#F0F1F1), and text in the brushed bar against #C9CED3 (conservative; the title sits on the lighter centre).
Middle-dot separators (.sep, 40% navy by the approved spec) are decorative and skipped.
Usage: python3 tools/contrast_check.py <template> <config.json>"""
import json, subprocess, sys, os, numpy as np
from PIL import Image
KIT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
tpl, cfg = sys.argv[1], os.path.abspath(sys.argv[2])
js = r"""
import { chromium } from 'playwright'; import { pathToFileURL } from 'url'; import fs from 'fs';
const [tpl, cfgp] = process.argv.slice(2); const cfg = JSON.parse(fs.readFileSync(cfgp, 'utf8'));
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
await p.addInitScript(c => { window.KIT_CONFIG = c; }, cfg);
await p.goto(pathToFileURL(process.cwd() + '/' + tpl + '.html').href, { waitUntil: 'networkidle' });
await p.evaluate(async () => { await document.fonts.ready; if (window.fitBoard) fitBoard(); });
const out = await p.evaluate(() => [...document.querySelectorAll('#capture *')].filter(e => {
  if (e.closest('[hidden]') || e.matches('.sep') || e.closest('[aria-hidden="true"]')) return false;   // decorative separators and art (e.g. the clock numerals)
  return [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()); }).map(e => {
  const r = e.getBoundingClientRect(), cs = getComputedStyle(e);
  let op = 1; for (let x = e; x; x = x.parentElement) op *= parseFloat(getComputedStyle(x).opacity);
  return { on: e.closest('.bar') ? 'bar' : e.closest('.panel, .card, .dealp .ins') ? 'panel' : 'stone', t: e.textContent.trim().slice(0, 34), c: cs.color, fs: parseFloat(cs.fontSize), fw: +cs.fontWeight, op,
           box: [r.left, r.top, r.right, r.bottom].map(Math.round) }; }));
await p.addStyleTag({ content: '#capture *{color:transparent !important;text-shadow:none !important;caret-color:transparent !important} #capture svg:not([aria-hidden=\"true\"] *){visibility:hidden !important}' });
await p.locator('#capture').screenshot({ path: process.argv[4] });
console.log(JSON.stringify(out)); await b.close();
"""
open(os.path.join(KIT, "tools", ".cc.mjs"), "w").write(js)
import tempfile
bgpng = os.path.join(tempfile.mkdtemp(), "bg.png")
els = json.loads(subprocess.check_output(["node", "tools/.cc.mjs", tpl, cfg, bgpng], cwd=KIT))
os.remove(os.path.join(KIT, "tools", ".cc.mjs"))
st = np.asarray(Image.open(bgpng).convert("RGB")).astype(float) / 255     # rendered page, text hidden
lin = lambda c: np.where(c <= .03928, c / 12.92, ((c + .055) / 1.055) ** 2.4)
L = lambda rgb: (lin(rgb) * [.2126, .7152, .0722]).sum(-1)
fails = 0
for e in els:
    x0, y0, x1, y1 = [max(0, v) for v in e["box"]]; bg = st[y0:y1, x0:x1].reshape(-1, 3)
    if not len(bg): continue
    order = np.argsort(L(bg)); cands = [bg[order[int((len(bg) - 1) * .01)]], bg[order[int((len(bg) - 1) * .99)]]]   # darkest / lightest 1%
    if e["on"] != "stone": cands = [np.array([0xF0, 0xF1, 0xF1] if e["on"] == "panel" else [0xC9, 0xCE, 0xD3]) / 255]
    ch = [float(v) for v in e["c"][e["c"].index("(") + 1:-1].split(",")]
    rgb = np.array(ch[:3]) / 255; op = e["op"] * (ch[3] if len(ch) > 3 else 1.0)   # element opacity x colour alpha
    def ratio(w):
        ink = rgb * op + w * (1 - op); la, lb = L(ink), L(w); return (max(la, lb) + .05) / (min(la, lb) + .05)
    cr = min(ratio(w) for w in cands)
    need = 3.0 if e["fs"] >= 24 or (e["fs"] >= 18.66 and e["fw"] >= 700) else 4.5
    ok = cr >= need; fails += not ok
    print(f"{'ok ' if ok else 'LOW'} {cr:5.2f}:1 (need {need}) {e['fs']:5.1f}px w{e['fw']} op{e['op']:.2f} {e['on']:5s} {e['t']!r}")
print("PASS" if not fails else f"{fails} element(s) below AA"); sys.exit(1 if fails else 0)

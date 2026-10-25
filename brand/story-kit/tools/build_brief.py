#!/usr/bin/env python3
"""Build the daily one page PDF brief (US Letter, Stone + Platinum) from the day's config.

Usage (from story-kit/):
  python3 tools/build_brief.py configs/DATE.json [--compass CSV] [-o OUT.pdf]
Writes:
  out/Agent-Kammer-Manhattan-Minute-DATE.pdf              public download (PDF Title: "The Manhattan Minute, Agent Kammer, <Month D, YYYY>")
  out/Agent-Kammer-Manhattan-Minute-DATE-brief-preview.png  2x preview of the page
Content: masthead + date, cover facts (wxHigh/wxLow/wxCond/wxIcon, t10*, sunset from tools/cover_facts.py),
  01 the discount check (r1* slots) + the Negotiation Compass table, 02 the deal (r2, r2Meta, r2Aside as the Kammer take),
  03 one thing to watch (r3, r3Accent, r3Meta), sources line, small print, agentkammer.com.

Negotiation Compass CSV (first found: --compass, config "compassCsv", /workspace/manhattan-minute/compass.csv,
  data/compass-DATE.csv, data/compass.csv). The daily data run should write /workspace/manhattan-minute/compass.csv
  (one file, rows for many dates; only the config date's rows are used). That dataset does not exist yet.
  date,band,median_vs_last_ask_pct,median_vs_original_ask_pct,matched_sales
  2026-09-29,$5M to $10M,-3.1,-9.8,14
  Percentages are signed (negative = under ask). "date" is optional; when present only rows for the config date count.
  Bands come from config "compassBands" (default below). A band with no row, a blank value, or fewer than
  "compassMinSales" matched sales (default 5) prints "Too thin to call". Nothing is ever estimated or filled in.
Checks: refuses en/em dashes in the config, fails if the page overflows or fonts did not load, runs a text contrast
  check against the rendered stone (4.5:1 under 18.66px bold / 24px, else 3:1), confirms 1 page and the PDF Title."""
import argparse, csv, json, os, re, subprocess, sys, tempfile
import numpy as np
from PIL import Image
KIT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BANDS = ["$5M to $10M", "$10M to $20M", "$20M and up"]   # approved bands (Raphi, Sep 29)

def num(v):
    v = (v or "").strip().replace("%", "").replace(",", "")
    try: return float(v)
    except ValueError: return None

def compass_rows(cfg, path, date, warn):
    bands = cfg.get("compassBands") or BANDS; mn = int(cfg.get("compassMinSales") or 5)
    data = {}
    if path and os.path.exists(path):
        with open(path, newline="") as f:
            for r in csv.DictReader(f):
                r = {k.strip().lower(): (v or "").strip() for k, v in r.items() if k}
                if r.get("date") and r["date"] != date: continue
                data[re.sub(r"\s+", " ", r.get("band", "")).lower()] = r
    elif path: warn(f"compass CSV not found: {path}")
    out = []
    for b in bands:
        r = data.get(re.sub(r"\s+", " ", b).lower())
        m = num(r.get("matched_sales")) if r else None
        vl = num(r.get("median_vs_last_ask_pct")) if r else None
        vo = num(r.get("median_vs_original_ask_pct")) if r else None
        thin = m is None or m < mn or vl is None or vo is None
        out.append(dict(band=b, thin=thin, matched=None if m is None else int(m), vsLast=vl, vsOrig=vo))
    return out, (path if path and os.path.exists(path) else None)

def contrast(textbg_png, text, scale=2):
    img = np.asarray(Image.open(textbg_png).convert("RGB")).astype(float) / 255
    lin = lambda c: np.where(c <= .03928, c / 12.92, ((c + .055) / 1.055) ** 2.4)
    L = lambda rgb: (lin(rgb) * [.2126, .7152, .0722]).sum(-1)
    res = []
    for e in text:
        x0, y0, x1, y1 = [max(0, int(v * scale)) for v in e["box"]]
        bg = img[y0:y1, x0:x1].reshape(-1, 3)
        if not len(bg): continue
        worst = bg[np.argsort(L(bg))[int(len(bg) * .99)]]
        ch = [float(v) for v in e["c"][e["c"].index("(") + 1:-1].split(",")]
        a = ch[3] if len(ch) > 3 else 1; fg = np.array(ch[:3]) / 255 * a + worst * (1 - a)
        l1, l2 = sorted([L(fg), L(worst)], reverse=True); cr = (l1 + .05) / (l2 + .05)
        large = e["fs"] >= 24 or (e["fs"] >= 18.66 and e["fw"] >= 700)
        res.append(dict(t=e["t"], ratio=round(float(cr), 2), need=3.0 if large else 4.5, ok=bool(cr >= (3.0 if large else 4.5))))
    return res

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("config"); ap.add_argument("--compass"); ap.add_argument("-o", "--out")
    ap.add_argument("--allow-fallback-fonts", action="store_true")
    a = ap.parse_args(); warn = lambda m: print("WARNING:", m, file=sys.stderr)
    cfg = json.load(open(a.config))
    for k, v in cfg.items():
        if isinstance(v, str) and re.search("[\u2013\u2014]", v): sys.exit(f"refusing: en/em dash in {k!r}")
    date = cfg.get("date") or __import__("datetime").date.today().isoformat()
    base = f"Agent-Kammer-Manhattan-Minute-{date}"
    out = os.path.abspath(a.out or os.path.join(KIT, "out", base + ".pdf"))
    preview = os.path.splitext(out)[0] + "-brief-preview.png"
    cands = [a.compass, cfg.get("compassCsv") and os.path.join(KIT, cfg["compassCsv"]), "/workspace/manhattan-minute/compass.csv",
             os.path.join(KIT, "data", f"compass-{date}.csv"), os.path.join(KIT, "data", "compass.csv")]
    path = next((c for c in cands if c and os.path.exists(c)), a.compass)
    cfg["compass"], used = compass_rows(cfg, path, date, warn)
    if not used: warn("no Negotiation Compass CSV found; every band prints 'Too thin to call'")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with tempfile.TemporaryDirectory() as td:
        cp = os.path.join(td, "cfg.json"); json.dump(cfg, open(cp, "w"))
        bgp = os.path.join(td, "textbg.png")
        rep = json.loads(subprocess.check_output(["node", os.path.join(KIT, "tools", "brief_pdf.mjs"), cp, out, preview, bgp], cwd=KIT, text=True).strip().splitlines()[-1])
        cc = contrast(bgp, rep.pop("text"))
    if not rep["fontsOk"] and not a.allow_fallback_fonts: sys.exit("web fonts did not load; rerun online or pass --allow-fallback-fonts")
    info = subprocess.run(["pdfinfo", out], capture_output=True, text=True).stdout
    pages = int(re.search(r"Pages:\s+(\d+)", info).group(1)); title = re.search(r"Title:\s+(.*)", info)
    fails = [c for c in cc if not c["ok"]]
    report = dict(pdf=out, preview=preview, pages=pages, pdf_title=title.group(1).strip() if title else None,
                  compass_csv=used, compass=cfg["compass"], layout=dict(lastSection=rep["lastSection"], footTop=rep["footTop"], overflow=rep["overflow"]),
                  contrast=dict(checked=len(cc), min=min((c["ratio"] for c in cc), default=None), fails=fails))
    print(json.dumps(report, indent=1))
    if pages != 1 or rep["overflow"] or fails: sys.exit("brief checks failed")

if __name__ == "__main__":
    main()

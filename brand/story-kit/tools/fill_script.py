#!/usr/bin/env python3
"""Fill a Manhattan Minute script template from the day's config.

Usage: python3 tools/fill_script.py TEMPLATE.txt configs/DATE.json -o SCRIPT.txt
Placeholders are {{key}} (any config key). The daily one is the weather line right after the greeting:
  [weather] {{spokenWeather}}
spokenWeather is written by tools/cover_facts.py from the real NWS forecast and computed sunset, e.g.
"Seventy one and partly sunny today, sunset at six forty one." A line whose placeholder is empty (a fetch failed)
is dropped rather than read out half empty. Refuses en/em dashes and unknown placeholders."""
import argparse, json, re, sys
ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
ap.add_argument("template"); ap.add_argument("config"); ap.add_argument("-o", "--out", required=True)
a = ap.parse_args()
cfg = json.load(open(a.config)); out, dropped = [], []
for line in open(a.template, encoding="utf-8").read().splitlines():
    keys = re.findall(r"\{\{(\w+)\}\}", line)
    missing = [k for k in keys if k not in cfg]
    if missing: sys.exit(f"unknown placeholder(s) {missing} in: {line}")
    if any(not str(cfg[k] or "").strip() for k in keys):
        dropped.append(line); continue
    line = re.sub(r"\{\{(\w+)\}\}", lambda m: str(cfg[m.group(1)]).strip(), line)
    if re.search("[\u2013\u2014]", line): sys.exit(f"refusing: en/em dash in: {line}")
    out.append(line)
open(a.out, "w", encoding="utf-8").write("\n".join(out) + "\n")
for d in dropped: print("dropped (empty placeholder):", d, file=sys.stderr)
print("wrote", a.out)

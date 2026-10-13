#!/usr/bin/env python3
"""Fetch the cover info strip facts for a date and write them into configs/DATE.json.

  weather  National Weather Service forecast, api.weather.gov, point = Central Park (40.7829, -73.9654),
           grid OKX. High = the daytime period that starts on DATE ("Today" / "This Afternoon"),
           low = the night period that starts that evening ("Tonight"), condition = the daytime shortForecast.
  wxIcon   icon key for the cover (sun, partly, cloud, rain, storm, snow, fog, wind), mapped from the NWS
           period's icon code (skc/few/sct/bkn/ovc/rain/tsra/snow/fog/wind...) with the shortForecast text as fallback.
  t10      10 year Treasury par yield, official close: U.S. Treasury Daily Par Yield Curve (home.treasury.gov),
           cross-checked against FRED DGS10 when FRED has the same day; FRED DGS10 is the fallback source.
           Uses the latest close BEFORE the cover date (the build runs 11:38 AM ET, so that is the prior
           business day's close; reruns later in the day stay identical). Change = vs the close before it, in bp.
           Slots: t10Yield "5.24%", t10ChangeBp (integer, signed), t10AsOf (YYYY-MM-DD), t10AsOfLabel ("Sep 28").
           A close older than 5 calendar days is treated as a failure (cell hidden).
  fed      (off the daily cover; moving to the weekly. Enable with --with-fed.) FRED series DFEDTARL / DFEDTARU,
           the latest observation on or before DATE. Written as "3.75 to 4.00%" (house rule: no dashes).
  sunset   computed (NOAA solar position algorithm, standard -0.833 degree horizon) for Central Park,
           America/New_York. Cross-checked against astral when that package is installed.

Real fetched values only: if a source fails or has no data for DATE, its slots are cleared (the cover hides
that item) and a warning is printed. Nothing is ever guessed. Sources and fetch times go to "coverFactsMeta".

Usage: python3 tools/cover_facts.py configs/YYYY-MM-DD.json [--date YYYY-MM-DD] [--dry-run] [--with-fed]
Exit code 0 when every item was filled, 3 when one or more had to be cleared."""
import argparse, csv, io, json, math, os, re, sys, urllib.request, datetime as dt
from zoneinfo import ZoneInfo
NY = ZoneInfo("America/New_York")
LAT, LON = 40.7829, -73.9654           # Central Park
UA = "AgentKammer-story-kit/1.0 (agentkammer.com)"

def get(url, timeout=25):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/geo+json, text/csv, */*"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read().decode("utf-8")

def weather(day):
    pt = json.loads(get(f"https://api.weather.gov/points/{LAT},{LON}"))["properties"]
    fc = json.loads(get(pt["forecast"]))["properties"]
    per = [dict(p, s=dt.datetime.fromisoformat(p["startTime"]).astimezone(NY)) for p in fc["periods"]]
    dayp = next((p for p in per if p["isDaytime"] and p["s"].date() == day), None)
    night = next((p for p in per if not p["isDaytime"] and p["s"].date() == day and p["s"].hour >= 17), None)
    if not dayp or not night:
        raise LookupError(f"NWS forecast has no {'daytime' if not dayp else 'night'} period starting {day} "
                          f"(periods start {per[0]['s']:%Y-%m-%d %H:%M} ET); run earlier in the day")
    icon = wx_icon(dayp.get("icon", ""), dayp["shortForecast"])
    cond = dayp["shortForecast"].strip()
    cond = cond[0].upper() + cond[1:].lower() if cond else cond
    return dict(wxHigh=str(dayp["temperature"]), wxLow=str(night["temperature"]), wxCond=cond, wxIcon=icon), dict(
        icon_code=dayp.get("icon", ""),
        source="National Weather Service, api.weather.gov", url=pt["forecast"],
        point=f"{LAT},{LON} ({pt['relativeLocation']['properties']['city']}, grid {pt['gridId']} {pt['gridX']},{pt['gridY']})",
        high_period=f"{dayp['name']} {dayp['startTime']}", low_period=f"{night['name']} {night['startTime']}",
        unit=dayp["temperatureUnit"], forecast_generated=fc.get("generatedAt"))

ICON_CODES = [  # NWS icon codes (api.weather.gov/icons) -> cover icon key; first match in the period's code list wins
    ("storm", ("tsra", "tsra_sct", "tsra_hi", "tornado", "hurricane", "tropical_storm")),
    ("snow", ("snow", "rain_snow", "rain_sleet", "snow_sleet", "fzra", "rain_fzra", "snow_fzra", "sleet", "blizzard", "cold")),
    ("rain", ("rain", "rain_showers", "rain_showers_hi")),
    ("fog", ("fog", "haze", "smoke", "dust")),
    ("wind", ("wind_skc", "wind_few", "wind_sct", "wind_bkn", "wind_ovc")),
    ("cloud", ("bkn", "ovc")), ("partly", ("sct",)), ("sun", ("skc", "few", "hot")),
]
TEXT_RULES = [("storm", ("thunder", "t-storm", "tstorm")), ("snow", ("snow", "flurr", "sleet", "freezing", "ice", "wintry", "blizzard")),
              ("rain", ("rain", "shower", "drizzle")), ("fog", ("fog", "haze", "smoke", "mist")),
              ("wind", ("windy", "breezy", "blustery")), ("partly", ("partly", "mostly sunny", "mostly clear")),
              ("cloud", ("cloudy", "overcast")), ("sun", ("sunny", "clear", "fair"))]

def wx_icon(icon_url, text):
    """Pick the cover icon from the NWS icon URL codes (e.g. .../day/rain_showers,20/sct), else from the text.
    NWS "bkn" is what it calls Partly Sunny / Mostly Cloudy; "sct" is Mostly Sunny / Partly Cloudy."""
    codes = [c.split(",")[0] for c in icon_url.split("?")[0].split("/")[6:]] if "/icons/" in icon_url else []
    first = codes[0] if codes else ""
    if first.startswith("wind_"): return "wind"
    for key, names in ICON_CODES:
        if first in names:
            if key == "cloud" and first == "bkn" and "partly sunny" in text.lower(): return "partly"
            return key
    t = text.lower()
    for key, words in TEXT_RULES:
        if any(w in t for w in words): return key
    return "cloud"

def t10(day):
    """10 year Treasury close before `day`: Treasury par yield curve (primary), FRED DGS10 (cross-check / fallback)."""
    meta, rows = {}, {}
    try:
        url = ("https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/"
               f"{day.year}/all?type=daily_treasury_yield_curve&field_tdr_date_value={day.year}&page&_format=csv")
        txt = get(url)
        if day.month == 1 and day.day < 15:   # early January: also read the prior year for the previous close
            txt += "\n" + "\n".join(get(url.replace(str(day.year), str(day.year - 1))).splitlines()[1:])
        for r in csv.DictReader(io.StringIO(txt)):
            if r.get("10 Yr"):
                m, d, y = r["Date"].split("/"); rows[f"{y}-{m}-{d}"] = float(r["10 Yr"])
        meta["source"] = "U.S. Department of the Treasury, Daily Treasury Par Yield Curve Rates (10 Yr)"; meta["url"] = url
    except Exception as ex:
        meta["treasury_error"] = f"{type(ex).__name__}: {ex}"
    fred_url = f"https://fred.stlouisfed.org/graph/fredgraph.csv?id=DGS10&cosd={day - dt.timedelta(days=21)}&coed={day}"
    fred = {}
    try:
        for r in csv.DictReader(io.StringIO(get(fred_url))):
            k = next(x for x in r if x.lower() in ("observation_date", "date"))
            if r["DGS10"] not in ("", "."): fred[r[k]] = float(r["DGS10"])
    except Exception as ex:
        meta["fred_error"] = f"{type(ex).__name__}: {ex}"
    if not rows and fred:
        rows = fred; meta["source"] = "FRED, Federal Reserve Bank of St. Louis: DGS10 (fallback)"; meta["url"] = fred_url
    before = sorted(d for d in rows if d < day.isoformat())
    if len(before) < 2: raise LookupError(f"no 10 year closes before {day} ({meta})")
    d1, d0 = before[-1], before[-2]
    if (day - dt.date.fromisoformat(d1)).days > 5: raise LookupError(f"latest 10 year close {d1} is stale for {day}")
    y1, y0 = rows[d1], rows[d0]
    if d1 in fred and abs(fred[d1] - y1) > 0.011: raise ValueError(f"Treasury {y1} vs FRED {fred[d1]} disagree for {d1}")
    meta.update(fred_check_url=fred_url, fred_same_day=fred.get(d1), close=d1, prior_close=d0, close_yield=y1, prior_yield=y0)
    bp = int(round((y1 - y0) * 100))
    return dict(t10Yield=f"{y1:.2f}%", t10ChangeBp=bp, t10AsOf=d1,
                t10AsOfLabel=dt.date.fromisoformat(d1).strftime("%b %-d")), meta

def fed(day):
    url = f"https://fred.stlouisfed.org/graph/fredgraph.csv?id=DFEDTARL,DFEDTARU&cosd={day - dt.timedelta(days=14)}&coed={day}"
    rows = [r for r in csv.DictReader(io.StringIO(get(url))) if r["DFEDTARL"] not in ("", ".") and r["DFEDTARU"] not in ("", ".")]
    datekey = next(k for k in rows[0] if k.lower() in ("observation_date", "date")) if rows else None
    rows = [r for r in rows if r[datekey] <= day.isoformat()]
    if not rows: raise LookupError(f"FRED has no DFEDTARL/DFEDTARU observation in the 14 days to {day}")
    r = rows[-1]; lo, hi = float(r["DFEDTARL"]), float(r["DFEDTARU"])
    return dict(fedRate=f"{lo:.2f} to {hi:.2f}%"), dict(
        source="FRED, Federal Reserve Bank of St. Louis: DFEDTARL / DFEDTARU (Federal Reserve target range)",
        url=url, observation_date=r[datekey])

def sunset_noaa(day, lat=LAT, lon=LON):
    """NOAA solar calculator (Meeus); returns an aware datetime in America/New_York."""
    noon = dt.datetime(day.year, day.month, day.day, 12, tzinfo=NY)
    for _ in range(3):   # iterate: evaluate the sun's position at the estimated sunset time
        jd = noon.astimezone(dt.timezone.utc).timestamp() / 86400 + 2440587.5
        t = (jd - 2451545) / 36525
        L0 = (280.46646 + t * (36000.76983 + t * 0.0003032)) % 360
        M = 357.52911 + t * (35999.05029 - 0.0001537 * t)
        e = 0.016708634 - t * (0.000042037 + 0.0000001267 * t)
        C = (math.sin(math.radians(M)) * (1.914602 - t * (0.004817 + 0.000014 * t))
             + math.sin(math.radians(2 * M)) * (0.019993 - 0.000101 * t) + math.sin(math.radians(3 * M)) * 0.000289)
        om = 125.04 - 1934.136 * t
        lam = L0 + C - 0.00569 - 0.00478 * math.sin(math.radians(om))
        eps0 = 23 + (26 + (21.448 - t * (46.815 + t * (0.00059 - t * 0.001813))) / 60) / 60
        eps = eps0 + 0.00256 * math.cos(math.radians(om))
        decl = math.degrees(math.asin(math.sin(math.radians(eps)) * math.sin(math.radians(lam))))
        y = math.tan(math.radians(eps / 2)) ** 2
        eqt = 4 * math.degrees(y * math.sin(2 * math.radians(L0)) - 2 * e * math.sin(math.radians(M))
                               + 4 * e * y * math.sin(math.radians(M)) * math.cos(2 * math.radians(L0))
                               - 0.5 * y * y * math.sin(4 * math.radians(L0)) - 1.25 * e * e * math.sin(2 * math.radians(M)))
        ha = math.degrees(math.acos(math.cos(math.radians(90.833)) / (math.cos(math.radians(lat)) * math.cos(math.radians(decl)))
                                    - math.tan(math.radians(lat)) * math.tan(math.radians(decl))))
        utc_min = 720 - 4 * (lon - ha) - eqt
        noon = dt.datetime(day.year, day.month, day.day, tzinfo=dt.timezone.utc) + dt.timedelta(minutes=utc_min)
    return noon.astimezone(NY)

def sunset(day):
    s = sunset_noaa(day); meta = dict(source="Computed: NOAA solar position algorithm, -0.833 deg horizon",
                                      location=f"Central Park {LAT},{LON}, America/New_York", exact=s.isoformat(timespec="seconds"))
    try:
        from astral import LocationInfo; from astral.sun import sun
        a = sun(LocationInfo("Central Park", "USA", "America/New_York", LAT, LON).observer, date=day, tzinfo=NY)["sunset"]
        meta["astral_check"] = a.isoformat(timespec="seconds")
        if abs((a - s).total_seconds()) > 90: raise ValueError(f"sunset mismatch: NOAA {s} vs astral {a}")
    except ImportError:
        pass
    s = (s + dt.timedelta(seconds=30)).replace(second=0, microsecond=0)   # round to the minute
    return dict(sunset=s.strftime("%-I:%M %p")), meta

# ---- spoken weather line (read right after the greeting; filled into the script by tools/fill_script.py) ----
_ONES = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split()
_TENS = "_ _ twenty thirty forty fifty sixty seventy eighty ninety".split()
def words(n):
    """Integer to spoken words, no hyphens (the TTS reads "seventy one" naturally). Handles -99 to 199."""
    n = int(n)
    if n < 0: return "minus " + words(-n)
    if n >= 100: return "one hundred" + ("" if n == 100 else " " + words(n - 100))
    if n < 20: return _ONES[n]
    return _TENS[n // 10] + ("" if n % 10 == 0 else " " + _ONES[n % 10])
def spoken_time(hm):
    """"6:41 PM" -> "six forty one", "7:05 PM" -> "seven oh five", "7:00 PM" -> "seven"."""
    h, m = hm.split()[0].split(":"); h, m = int(h), int(m)
    return words(h) + ("" if m == 0 else " oh " + words(m) if m < 10 else " " + words(m))
_COND_OK = re.compile(r"^(mostly |partly )?(sunny|cloudy|clear)$|^(sunny|cloudy|clear|windy|breezy|foggy|hazy|rain|showers|snow)$", re.I)
_ICON_WORDS = dict(sun="sunny", partly="partly cloudy", cloud="cloudy", rain="showery", storm="stormy", snow="snowy", fog="foggy", wind="windy")
def spoken_weather(cfg):
    """One casual line from the real slots only, e.g. "Seventy one and partly sunny today, sunset at six forty one."
    Uses the NWS condition when it is a short plain phrase, otherwise a word from the icon key. Empty if nothing was fetched."""
    hi, cond, icon, ss = str(cfg.get("wxHigh") or "").strip(), str(cfg.get("wxCond") or "").strip(), cfg.get("wxIcon") or "", str(cfg.get("sunset") or "").strip()
    c = cond.lower() if _COND_OK.match(cond) else _ICON_WORDS.get(icon, "")
    c = dict(rain="rainy", showers="showery", snow="snowy").get(c, c)
    wx = (words(hi) + (" and " + c if c else " degrees") + " today") if re.fullmatch(r"-?\d+", hi) else ""
    sun = ("sunset at " + spoken_time(ss)) if re.fullmatch(r"\d{1,2}:\d{2} [AP]M", ss) else ""
    line = ", ".join(x for x in (wx, sun) if x)
    if not line: return ""
    if not wx: line = "Sunset tonight at " + spoken_time(ss)
    return line[0].upper() + line[1:] + "."

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("config"); ap.add_argument("--date"); ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--with-fed", action="store_true", help="also fetch the fed funds target range (weekly, not the daily cover)")
    a = ap.parse_args()
    cfg = json.load(open(a.config)) if os.path.exists(a.config) else {}
    day = dt.date.fromisoformat(a.date or cfg.get("date") or dt.datetime.now(NY).date().isoformat())
    slots = dict(weather=["wxHigh", "wxLow", "wxCond", "wxIcon"], t10=["t10Yield", "t10ChangeBp", "t10AsOf", "t10AsOfLabel"],
                 sunset=["sunset"], fed=["fedRate"])
    items = [("weather", weather), ("t10", t10), ("sunset", sunset)] + ([("fed", fed)] if a.with_fed else [])
    meta, missing = dict(date=day.isoformat(), fetched=dt.datetime.now(NY).isoformat(timespec="seconds")), []
    for name, fn in items:
        try:
            vals, m = fn(day); cfg.update(vals); meta[name] = dict(m, values=vals)
        except Exception as ex:
            for k in slots[name]: cfg[k] = "" if k != "t10ChangeBp" else None
            meta[name] = dict(error=f"{type(ex).__name__}: {ex}"); missing.append(name)
            print(f"WARNING: {name}: {ex} (slots cleared; the cover hides this item)", file=sys.stderr)
    cfg["spokenWeather"] = spoken_weather(cfg)   # the [weather] script line; empty if weather and sunset both failed
    meta["spokenWeather"] = cfg["spokenWeather"]
    cfg["coverFactsMeta"] = meta
    print(json.dumps(dict({k: cfg.get(k) for n, _ in items for k in slots[n]}, spokenWeather=cfg["spokenWeather"]), ensure_ascii=False))
    if not a.dry_run:
        json.dump(cfg, open(a.config, "w"), indent=2, ensure_ascii=False); open(a.config, "a").write("\n")
        print("wrote", a.config)
    sys.exit(3 if missing else 0)

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Build the three-part Manhattan Minute story video: cover -> animated board -> end panel.

  cover holds through the greeting, crossfades (0.5 s) to the board when the greeting ends,
  board rows fill in (fade + 16px rise, 0.5 s, ease-out) as their script lines start,
  end panel crossfades in (0.5 s, landing on the sign-off line start), audio = the Manhattan Minute MP3.
  Output: 1080x1920, 30 fps, H.264 (yuv420p, faststart) + AAC 192k.

Usage (from story-kit/):
  python3 tools/build_story.py configs/DATE.json AUDIO.mp3 [--cover PNG] [--end PNG] [-o OUT.mp4]
Defaults (file names sort by date: Agent-Kammer-Manhattan-Minute-DATE...):
  timing  AUDIO.json next to the MP3 (written by produce.sh)
  cover   cover-editorial.html rendered from the config to out/Agent-Kammer-Manhattan-Minute-DATE-cover.png
          (--cover PNG uses any image instead; --cover-template cover renders the older panel cover)
  board   board-hybrid.html (approved daily: editorial page, deal on its own card);
          --board-template board (all editorial) or board-panel (older panel board)
  end     end-panel.html rendered from the config to out/Agent-Kammer-Manhattan-Minute-DATE-end.png (--end PNG
          uses any image instead); it holds at least --end-hold s (default 6.0), padding silence after the audio if needed
  out     out/Agent-Kammer-Manhattan-Minute-DATE.mp4 (other boards add a suffix: ...-DATE-editorial.mp4, ...-DATE-panel.mp4)
Also writes: out/Agent-Kammer-Manhattan-Minute-DATE-board.png (board fully filled, same pixels as the settled board),
  ...-DATE-board-mid.png (a mid-reveal frame of row 2, from the MP4), ...-DATE-timeline.json (every cue in seconds)
  and check frames in out/checks/ (skip with --no-checks).

Cues: config "boardCues" maps each board part to the script line that reveals it. A cue is either a
line-start text ("One deal") or a tag ("[aside]"). A part with an empty slot is skipped. If a cue is not
found, the part falls back to script order (body lines 1, 2, 3; first [aside]) and a warning is printed.
"""
import argparse, glob, json, os, re, shutil, subprocess, sys, tempfile, math
KIT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FPS = 30
PARTS = ["r1", "r2", "r2Aside", "r3"]
PART_SLOTS = {"r1": ["r1", "r1Figure", "r1Meta"], "r2": ["r2", "r2Meta"], "r2Aside": ["r2Aside"], "r3": ["r3", "r3Accent", "r3Meta"]}
DEFAULT_CUES = {"r1": "The discount check", "r2": "One deal", "r2Aside": "[aside]", "r3": "One thing to watch"}

def run(cmd, **kw):
    r = subprocess.run(cmd, capture_output=True, text=True, **kw)
    if r.returncode != 0:
        sys.stderr.write(r.stdout + r.stderr); sys.exit(f"failed: {' '.join(map(str, cmd[:4]))} ...")
    return r.stdout

def norm(s): return re.sub(r"[^a-z0-9 ]", "", s.lower()).strip()

def resolve_cues(lines, cfg, warn):
    cues = dict(DEFAULT_CUES, **(cfg.get("boardCues") or {}))
    body = [l for l in lines[1:-1] if l["tag"] not in ("aside", "weather")]
    asides = [l for l in lines[1:-1] if l["tag"] == "aside"]
    order = {"r1": body[0] if len(body) > 0 else None, "r2": body[1] if len(body) > 1 else None,
             "r3": body[2] if len(body) > 2 else None, "r2Aside": asides[0] if asides else None}
    out = {}
    for p in PARTS:
        if not any(str(cfg.get(k, "")).strip() for k in PART_SLOTS[p]):
            continue                                  # empty slot: nothing to reveal
        cue, hit = cues.get(p, ""), None
        m = re.match(r"^\[(\w+)\]$", cue.strip())
        if m:
            hit = next((l for l in lines[1:-1] if l["tag"] == m.group(1).lower()), None)
        elif cue.strip():
            hit = next((l for l in lines[1:-1] if norm(l["text"]).startswith(norm(cue))), None)
        if hit is None:
            hit = order[p]
            warn(f"cue for {p} ({cue!r}) not found; using script order -> {hit['text'][:40] if hit else 'none'!r}")
        out[p] = dict(t=float(hit["start"]) if hit else None, line=hit["text"] if hit else None)
    return out

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("config"); ap.add_argument("audio")
    ap.add_argument("--timing"); ap.add_argument("--cover", help="cover PNG (any size; scaled to fill 1080x1920)")
    ap.add_argument("--cover-template", default="cover-editorial", help="template rendered when --cover is not given")
    ap.add_argument("--board-template", default="board-hybrid", help="board-hybrid (approved daily) | board (all editorial) | board-panel")
    ap.add_argument("--end", help="end PNG instead of rendering end-panel.html from the config")
    ap.add_argument("--end-template", default="end-panel")
    ap.add_argument("--end-hold", type=float, default=6.0, help="minimum seconds the end page is fully on screen; pads silence if the audio is shorter")
    ap.add_argument("-o", "--out")
    ap.add_argument("--fade", type=float, default=0.9, help="cover->board and board->end ink-settle transition with the platinum sweep (s)")
    ap.add_argument("--fade-in", type=float, default=0.8, help="cover settles in from blank stone at the start (s)")
    ap.add_argument("--reveal", type=float, default=0.5, help="row fade + rise duration (s), 0.4 to 0.6")
    ap.add_argument("--crf", type=int, default=18)
    ap.add_argument("--no-checks", action="store_true", help="skip check-frame export")
    ap.add_argument("--allow-fallback-fonts", action="store_true", help="build even if Google Fonts did not load")
    ap.add_argument("--allow-placeholder", action="store_true", help="allow deal.verdict / deal.who \"placeholder\" (layout review only, never publish)")
    a = ap.parse_args()
    warn = lambda m: print("WARNING:", m, file=sys.stderr)

    cfg = json.load(open(a.config))
    def walk(o, path=""):   # dash guard, nested values included (deal.*)
        if isinstance(o, dict):
            for k, v in o.items(): yield from walk(v, f"{path}.{k}" if path else k)
        elif isinstance(o, list):
            for i, v in enumerate(o): yield from walk(v, f"{path}[{i}]")
        elif isinstance(o, str): yield path, o
    for k, v in walk(cfg):
        if re.search("[\u2013\u2014]", v): sys.exit(f"refusing: en/em dash in {k!r}")
    # 02 verdict (weekly Property Assessment labeling): one of the four calls, or empty for no chip.
    deal = cfg.get("deal") or {}
    verdict = str(deal.get("verdict") or "").strip()
    if verdict.lower() == "placeholder" or str(deal.get("who") or "").strip().lower() == "placeholder":
        if not a.allow_placeholder:
            sys.exit("refusing: deal.verdict / deal.who is \"placeholder\" (layout review only). Fill the real call, or pass --allow-placeholder for a review build.")
        warn("deal verdict / WHO placeholder in this build: layout review only, do not publish")
    elif verdict and verdict.capitalize() not in ("Pick", "Consider", "Wait", "Pass"):
        sys.exit(f"refusing: deal.verdict must be Pick, Consider, Wait or Pass (got {verdict!r})")
    elif not verdict and str(cfg.get("r2") or "").strip():
        if not a.allow_placeholder:
            sys.exit("refusing: the board has a deal (r2) but no deal.verdict. Production builds need Pick, Consider, Wait or Pass (--allow-placeholder for a review build).")
        warn("no deal.verdict in this build: review only, do not publish")
    date = cfg.get("date") or __import__("datetime").date.today().isoformat()
    btpl = a.board_template.replace(".html", "")
    tag = "editorial" if btpl == "board" else btpl.replace("board-", "") if btpl.startswith("board-") else btpl
    base = f"Agent-Kammer-Manhattan-Minute-{date}"          # public naming, sorts by date in a downloads folder
    sfx = "" if btpl == "board-hybrid" else f"-{tag}"      # non-default boards get a suffix so they never overwrite the daily
    out = os.path.abspath(a.out or os.path.join(KIT, "out", f"{base}{sfx}.mp4"))
    # stills and the timeline follow --out: a test build written elsewhere never overwrites the daily stills in out/
    odir = os.path.dirname(out)
    if a.out: base, sfx = os.path.splitext(os.path.basename(out))[0], ""
    end = os.path.abspath(a.end or os.path.join(odir, f"{base}-end.png"))  # rendered fresh unless --end
    timing = a.timing or os.path.splitext(a.audio)[0] + ".json"
    for f in (a.audio, timing) + ((a.cover,) if a.cover else ()):
        if not os.path.exists(f): sys.exit(f"missing: {f}")
    if a.cover:
        cover = os.path.abspath(a.cover)
    else:
        ctpl = a.cover_template.replace(".html", "")
        cover = os.path.join(odir, f"{base}-cover.png" if ctpl == "cover-editorial" else f"{base}-cover-{ctpl}.png")
        print(run(["node", os.path.join(KIT, "shoot.mjs"), ctpl, os.path.abspath(a.config), f"--out={cover}"], cwd=KIT).strip().splitlines()[-1])
    if not a.end:
        run(["node", os.path.join(KIT, "shoot.mjs"), a.end_template.replace(".html", ""), os.path.abspath(a.config), f"--out={end}"], cwd=KIT)

    j = json.load(open(timing)); lines = j["lines"]
    dur = float(run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", a.audio]).strip())
    g_end = float(j.get("greeting_end") or lines[0]["end"])
    wx = next((l for l in lines[1:-1] if l.get("tag") == "weather"), None)
    cover_end = float(wx["end"]) if wx else g_end      # the cover (with its weather strip) holds through the spoken weather line
    signoff = float(lines[-1]["start"])
    adur = dur; dur = max(dur, signoff + a.end_hold)   # end page holds at least --end-hold s (silence padded)
    if dur > adur + 1e-3: print(f"end hold: padding {dur - adur:.2f}s of silence so the end page holds {a.end_hold:.1f}s")
    cues = resolve_cues(lines, cfg, warn)
    f = a.fade
    t0 = cover_end                                    # cover -> board transition starts when the weather line (or greeting) ends
    settle = t0 + f - 0.2                             # a row never starts filling before the board has nearly settled
    for p, c in cues.items():
        if c["t"] is None: c["t"] = settle; warn(f"{p}: no line to cue from; shown when the board appears")
        if c["t"] < settle: c["cue"] = c["t"]; c["t"] = settle
    off2 = signoff - f                                # board -> end transition lands on the sign-off line start

    # --- board states: one PNG per distinct progress tuple over the board's frames ---
    n = int(math.ceil((signoff - t0 + 0.1) * FPS))    # board must last until the end transition completes
    work = tempfile.mkdtemp(prefix="mmboard_")
    states, keys, seq = [], {}, []
    for i in range(n):
        T = t0 + i / FPS
        prog = {p: round(min(1.0, max(0.0, (T - c["t"]) / a.reveal)), 3) for p, c in cues.items()}
        key = tuple(sorted(prog.items()))
        if key not in keys:
            keys[key] = f"s{len(states):03d}"; states.append(dict(name=keys[key], prog=prog))
        seq.append(keys[key])
    states.append(dict(name="full", prog={p: 1 for p in PARTS}))
    json.dump(states, open(os.path.join(work, "states.json"), "w"))
    rep = json.loads(run(["node", os.path.join(KIT, "tools", "board_frames.mjs"), os.path.abspath(a.config),
                          os.path.join(work, "states.json"), os.path.join(work, "states"), btpl], cwd=KIT).strip().splitlines()[-1])
    if not rep["fontsOk"] and not a.allow_fallback_fonts:
        sys.exit("web fonts did not load (Google Fonts needs network); rerun when online or pass --allow-fallback-fonts")
    fit = rep.get("fit", {})
    if not fit.get("ok", True): warn(f"board key content ends at y={fit.get('keyBottom')} (limit 1560); shorten the copy")
    if fit.get("pastX960"): warn(f"board text past x=960: {fit['pastX960']}")
    os.makedirs(os.path.join(work, "seq"))
    for i, name in enumerate(seq):
        os.symlink(os.path.join(work, "states", name + ".png"), os.path.join(work, "seq", f"f{i:06d}.png"))
    still = os.path.join(odir, f"{base}{sfx}-board.png")
    os.makedirs(os.path.dirname(out), exist_ok=True); shutil.copy(os.path.join(work, "states", "full.png"), still)

    # --- frames: stone -> cover (settle in), cover -> board, board -> end (ink settle + platinum sweep) ---
    import numpy as np, cv2
    from PIL import Image
    def load(pth):
        im = Image.open(pth).convert("RGB")
        if im.size != (1080, 1920):                   # any cover PNG: scale to fill, centre crop
            sc = max(1080 / im.width, 1920 / im.height); im = im.resize((round(im.width * sc), round(im.height * sc)), Image.LANCZOS)
            l, t = (im.width - 1080) // 2, (im.height - 1920) // 2; im = im.crop((l, t, l + 1080, t + 1920))
        return np.asarray(im).astype(np.float32) / 255
    stone = load(os.path.join(KIT, "assets", "stone-bg.png"))
    board_png = lambda i: os.path.join(work, "states", seq[min(max(i, 0), n - 1)] + ".png")
    frames = os.path.join(work, "frames"); os.makedirs(frames)
    total = int(round(dur * FPS)); fin = int(round(a.fade_in * FPS))
    iA0, iA1 = int(round(t0 * FPS)), int(round((t0 + f) * FPS)); iB0, iB1 = int(round(off2 * FPS)), int(round(signoff * FPS))
    YY, XX = np.mgrid[0:1920, 0:1080].astype(np.float32)
    def ease(x): x = min(1.0, max(0.0, x)); return x * x * (3 - 2 * x)
    def eout(x): x = min(1.0, max(0.0, x)); return 1 - (1 - x) ** 3
    def transition(A, B, p, sweep=True):
        """Outgoing page A dissolves, incoming page B settles in (rises 14px, blur 7px -> sharp) where the pages differ;
        a thin platinum hairline sweeps left to right and the change follows it slightly."""
        diff = (np.abs(A - B).sum(2) > .06).astype(np.float32)
        M = cv2.GaussianBlur(cv2.dilate(diff, np.ones((25, 25), np.uint8)), (0, 0), 12)[..., None]
        e = eout(p); rise = 14 * (1 - e); blur = 7 * (1 - e)
        Bs = cv2.warpAffine(B, np.float32([[1, 0, 0], [0, 1, rise]]), (1080, 1920), borderMode=cv2.BORDER_REPLICATE)
        if blur > .05: Bs = cv2.GaussianBlur(Bs, (0, 0), blur)
        As = cv2.GaussianBlur(A, (0, 0), 2.5 * ease(p)) if p > .02 else A
        Bi = M * Bs + (1 - M) * B; Ai = M * As + (1 - M) * A
        L = -60 + 1200 * ease(p)
        al = np.clip(ease(p) * 1.4 - .4 * (XX / 1080) + .0, 0, 1)[..., None] if sweep else ease(p)
        out = Ai * (1 - al) + Bi * al
        if sweep:                                         # the hairline: bright platinum core, graphite flanks, soft gleam
            env = math.sin(math.pi * min(1, max(0, p))) ** .7
            taper = np.clip(np.minimum(YY - 40, 1880 - YY) / 260, 0, 1)
            dx = XX - L
            core = np.exp(-(dx / .9) ** 2); flank = np.exp(-((np.abs(dx) - 1.8) / .9) ** 2); glow = np.exp(-(dx / 9) ** 2)
            shade = (.93 + .06 * np.cos(YY / 1920 * math.pi * 2))[..., None]
            plat = np.array([.94, .945, .95], np.float32) * shade
            k = (env * taper)[..., None]
            out = out * (1 - .55 * k * flank[..., None]) + np.array([.49, .52, .55], np.float32) * .55 * k * flank[..., None]
            out = out * (1 - k * (.85 * core[..., None] + .18 * glow[..., None])) + plat * k * (.85 * core[..., None] + .18 * glow[..., None])
        return np.clip(out, 0, 1)
    save = lambda arr, pth: Image.fromarray((arr * 255 + .5).astype(np.uint8)).save(pth, compress_level=1)
    C, E = load(cover), load(end); mid_tr = None
    for i in range(total):
        dst = os.path.join(frames, f"f{i:06d}.png")
        if i < fin:
            save(transition(stone, C, i / fin, sweep=False), dst)
        elif i < iA0:
            os.symlink(cover, dst)
        elif i < iA1:
            save(transition(C, load(board_png(i - iA0)), (i - iA0) / max(1, iA1 - iA0)), dst)
            if i == (iA0 + iA1) // 2: mid_tr = dst
        elif i < iB0:
            os.symlink(board_png(i - iA0), dst)
        elif i < iB1:
            save(transition(load(board_png(i - iA0)), E, (i - iB0) / max(1, iB1 - iB0)), dst)
        else:
            os.symlink(end, dst)
    mid_png = os.path.join(odir, f"{base}{sfx}-transition-mid.png")
    if mid_tr: shutil.copy(mid_tr, mid_png)
    cmd = ["ffmpeg", "-v", "error", "-y", "-framerate", str(FPS), "-i", os.path.join(frames, "f%06d.png"), "-i", a.audio,
           "-filter_complex", "[1:a]apad[a]", "-map", "0:v", "-map", "[a]",
           "-c:v", "libx264", "-preset", "medium", "-crf", str(a.crf), "-profile:v", "high", "-pix_fmt", "yuv420p",
           "-r", str(FPS), "-c:a", "aac", "-b:a", "192k", "-ar", "44100", "-t", f"{dur:.3f}", "-movflags", "+faststart", out]
    run(cmd)

    # --- report + checks ---
    probe = json.loads(run(["ffprobe", "-v", "error", "-show_entries", "stream=codec_name,width,height,r_frame_rate,pix_fmt:format=duration",
                            "-of", "json", out]))
    tl = dict(output=out, board_template=btpl + ".html", cover=cover, end_panel=end, board_still=still, audio=os.path.abspath(a.audio), timing=os.path.abspath(timing),
              duration=round(float(probe["format"]["duration"]), 3), streams=probe["streams"],
              cover_fade_in=[0.0, round(a.fade_in, 3)], cover_hold=[round(a.fade_in, 3), round(t0, 3)], weather_line=[round(float(wx["start"]), 3), round(float(wx["end"]), 3)] if wx else None,
              cover_to_board=[round(t0, 3), round(t0 + f, 3)], transition="ink settle (14px rise, 7px blur to sharp) + platinum hairline sweep",
              transition_mid_frame=mid_png if mid_tr else None,
              reveals={p: dict(start=round(c["t"], 3), settled=round(c["t"] + a.reveal, 3), line=c["line"], **({"line_start": round(c["cue"], 3)} if "cue" in c else {})) for p, c in cues.items()},
              board_to_end=[round(off2, 3), round(signoff, 3)], signoff_start=round(signoff, 3),
              end_hold=round(dur - signoff, 3), audio_duration=round(adur, 3), padded_silence=round(max(0.0, dur - adur), 3),
              board_states=len(states) - 1, board_frames=n, board_fit=fit)
    if not a.no_checks:
        ck = os.path.join(odir, "checks"); os.makedirs(ck, exist_ok=True)
        stem = os.path.splitext(os.path.basename(out))[0]
        for old in glob.glob(os.path.join(ck, glob.escape(stem) + "-*s-*.png")):
            os.remove(old)   # clear the previous build's check frames so none go stale
        times = {"fade-in": a.fade_in / 2, "cover": min(3.0, t0 / 2), "xfade-in": t0 + f / 2}
        for p, c in cues.items():
            times[f"{p}-mid"] = c["t"] + a.reveal / 2; times[f"{p}-in"] = c["t"] + a.reveal + 0.3
        times.update({"xfade-end": off2 + f / 2, "end": dur - 1.0})
        tl["check_frames"] = {}
        for name, t in sorted(times.items(), key=lambda x: x[1]):
            p = os.path.join(ck, f"{os.path.splitext(os.path.basename(out))[0]}-{t:05.2f}s-{name}.png")
            run(["ffmpeg", "-v", "error", "-y", "-ss", f"{t:.3f}", "-i", out, "-frames:v", "1", p])
            tl["check_frames"][name] = dict(t=round(t, 2), png=p)
    if "r2" in cues:   # one mid-reveal frame (row 2 about half faded in), for review
        mid = os.path.join(odir, f"{base}{sfx}-board-mid.png"); tm = cues["r2"]["t"] + 0.2 * a.reveal
        run(["ffmpeg", "-v", "error", "-y", "-ss", f"{tm:.3f}", "-i", out, "-frames:v", "1", mid])
        tl["mid_reveal_frame"] = dict(t=round(tm, 2), png=mid)
    json.dump(tl, open(os.path.splitext(out)[0] + "-timeline.json", "w"), indent=2)
    shutil.rmtree(work, ignore_errors=True)
    print(json.dumps({k: v for k, v in tl.items() if k not in ("streams", "check_frames")}, indent=2))
    print("wrote", out)

if __name__ == "__main__":
    main()

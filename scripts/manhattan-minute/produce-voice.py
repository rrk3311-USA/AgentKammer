#!/usr/bin/env python3
"""Turn a Manhattan Minute script into an MP3 plus the timing JSON build_story.py reads.

Prefers the existing Kokoro producer:
  MANHATTAN_MINUTE_AUDIO/produce.sh SCRIPT out.mp3 af_heart

If that tree is not present, uses edge-tts (calm US female). Mark that MP3
unpublished until Raphi signs off on the voice. Never invent script lines.
"""
from __future__ import annotations

import argparse
import asyncio
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

TAG = re.compile(r"^\[(\w+)\]\s*(.*)$")
DASH = re.compile("[\u2013\u2014]")
EDGE_VOICE = os.environ.get("MM_EDGE_VOICE", "en-US-JennyNeural")


def parse_script(text: str) -> list[dict]:
    lines = []
    for raw in text.splitlines():
        raw = raw.strip()
        if not raw:
            continue
        if DASH.search(raw):
            sys.exit(f"refusing: en or em dash in: {raw}")
        match = TAG.match(raw)
        if match:
            tag, body = match.group(1).lower(), match.group(2).strip()
            if not body:
                continue
            lines.append({"tag": tag, "text": body, "spoken": body})
        else:
            lines.append({"tag": "", "text": raw, "spoken": raw})
    if len(lines) < 2:
        sys.exit("refusing: script needs a greeting and a sign-off")
    return lines


def pause_after(index: int, line: dict, lines: list[dict]) -> float:
    if index == 0:
        return 0.38
    if line["tag"] == "weather":
        return 0.30
    if line["tag"] == "aside":
        return 0.50
    if index == len(lines) - 1:
        return 0.20
    return 0.38


def run_produce_sh(script: Path, mp3: Path, timing: Path) -> str:
    root = Path(os.environ["MANHATTAN_MINUTE_AUDIO"])
    produce = root / "produce.sh"
    if not produce.exists():
        sys.exit(f"missing: {produce}")
    mp3.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        ["bash", str(produce), str(script), str(mp3), "af_heart"],
        cwd=str(root),
        check=True,
    )
    produced_timing = mp3.with_suffix(".json")
    if produced_timing.exists() and produced_timing != timing:
        shutil.copy2(produced_timing, timing)
    if not timing.exists():
        sys.exit(f"produce.sh did not write {timing}")
    return "kokoro-af_heart"


async def edge_line(text: str, dest: Path, rate: str) -> None:
    import edge_tts

    communicate = edge_tts.Communicate(text, EDGE_VOICE, rate=rate)
    await communicate.save(str(dest))


def concat_wavs(parts: list[tuple[Path, float]], mp3: Path) -> None:
    if not shutil.which("ffmpeg"):
        sys.exit("ffmpeg is required to stitch the spoken lines")
    with tempfile.TemporaryDirectory() as tmp:
        work = Path(tmp)
        files = []
        for index, (src, silence) in enumerate(parts):
            clip = work / f"{index:02d}.wav"
            subprocess.run(
                ["ffmpeg", "-v", "error", "-y", "-i", str(src), str(clip)],
                check=True,
            )
            files.append(clip)
            if silence > 0:
                pad = work / f"{index:02d}-pad.wav"
                subprocess.run(
                    [
                        "ffmpeg",
                        "-v",
                        "error",
                        "-y",
                        "-f",
                        "lavfi",
                        "-i",
                        f"anullsrc=r=24000:cl=mono",
                        "-t",
                        f"{silence:.3f}",
                        str(pad),
                    ],
                    check=True,
                )
                files.append(pad)
        listing = work / "list.txt"
        listing.write_text(
            "".join(f"file '{path}'\n" for path in files),
            encoding="utf-8",
        )
        wav = work / "all.wav"
        subprocess.run(
            [
                "ffmpeg",
                "-v",
                "error",
                "-y",
                "-f",
                "concat",
                "-safe",
                "0",
                "-i",
                str(listing),
                str(wav),
            ],
            check=True,
        )
        mp3.parent.mkdir(parents=True, exist_ok=True)
        subprocess.run(
            [
                "ffmpeg",
                "-v",
                "error",
                "-y",
                "-i",
                str(wav),
                "-c:a",
                "libmp3lame",
                "-b:a",
                "192k",
                str(mp3),
            ],
            check=True,
        )


def duration(path: Path) -> float:
    out = subprocess.check_output(
        [
            "ffprobe",
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "csv=p=0",
            str(path),
        ],
        text=True,
    )
    return float(out.strip())


def write_timing(lines: list[dict], starts: list[float], ends: list[float], total: float, dest: Path, voice: str) -> None:
    payload_lines = []
    for line, start, end in zip(lines, starts, ends):
        payload_lines.append(
            {
                "tag": line["tag"],
                "text": line["text"],
                "start": round(start, 3),
                "end": round(end, 3),
            }
        )
    weather = next((item for item in payload_lines[1:-1] if item["tag"] == "weather"), None)
    dest.write_text(
        json.dumps(
            {
                "voice": voice,
                "publishable": voice == "kokoro-af_heart",
                "greeting_end": payload_lines[0]["end"],
                "weather_line": [weather["start"], weather["end"]] if weather else None,
                "total": round(total, 3),
                "lines": payload_lines,
            },
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )


def produce_edge(lines: list[dict], mp3: Path, timing: Path) -> str:
    try:
        import edge_tts  # noqa: F401
    except ImportError:
        sys.exit("edge-tts is not installed. pip install edge-tts, or set MANHATTAN_MINUTE_AUDIO to the Kokoro tree.")
    with tempfile.TemporaryDirectory() as tmp:
        work = Path(tmp)
        parts = []
        starts = []
        ends = []
        t = 0.0
        for index, line in enumerate(lines):
            clip = work / f"{index:02d}.mp3"
            rate = "+8%" if line["tag"] == "weather" else "+4%"
            asyncio.run(edge_line(line["spoken"], clip, rate))
            length = duration(clip)
            starts.append(t)
            ends.append(t + length)
            t = ends[-1] + pause_after(index, line, lines)
            parts.append((clip, pause_after(index, line, lines)))
        concat_wavs(parts, mp3)
        write_timing(lines, starts, ends, duration(mp3), timing, f"edge-tts:{EDGE_VOICE}")
    print(
        "voice is edge-tts fallback. Do not publish until Raphi approves the read.",
        file=sys.stderr,
    )
    return f"edge-tts:{EDGE_VOICE}"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("script", type=Path)
    parser.add_argument("-o", "--out", type=Path, required=True)
    parser.add_argument("--timing", type=Path)
    parser.add_argument("--parse-only", action="store_true")
    args = parser.parse_args()
    lines = parse_script(args.script.read_text(encoding="utf-8"))
    if args.parse_only:
        print(json.dumps([{"tag": line["tag"], "text": line["text"]} for line in lines], indent=2))
        return 0
    timing = args.timing or args.out.with_suffix(".json")
    if os.environ.get("MANHATTAN_MINUTE_AUDIO"):
        voice = run_produce_sh(args.script, args.out, timing)
    else:
        voice = produce_edge(lines, args.out, timing)
    print(json.dumps({"mp3": str(args.out), "timing": str(timing), "voice": voice}))
    return 0


if __name__ == "__main__":
    sys.exit(main())

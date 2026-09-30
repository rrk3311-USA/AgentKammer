#!/usr/bin/env bash
# Prepare one Manhattan Minute: cover facts, spoken script, three-card video.
# Does not post to Instagram. Publish is a separate gated command.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
KIT="$ROOT/brand/story-kit"
SCRIPTS="$(cd "$(dirname "$0")" && pwd)"
DATE=""
ALLOW_PLACEHOLDER=0
STILLS_ONLY=0
SKIP_BRIEF=0

usage() {
  cat <<'EOF'
Usage: scripts/manhattan-minute/daily.sh [--date YYYY-MM-DD] [--stills-only] [--allow-placeholder]

Prepare the daily Story. Never publishes.

  1. Needs brand/story-kit from the house-rules PR.
  2. Needs configs/YYYY-MM-DD.json with a real deal and verdict.
  3. Fetches cover facts, fills the spoken script, builds voice + video.

If today's config is missing, copies the template, fetches weather / Treasury /
sunset, then stops so the board can be filled. It will not invent a deal.
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --date) DATE="$2"; shift 2 ;;
    --allow-placeholder) ALLOW_PLACEHOLDER=1; shift ;;
    --stills-only) STILLS_ONLY=1; shift ;;
    --skip-brief) SKIP_BRIEF=1; shift ;;
    -h|--help) usage; exit 0 ;;
    *) echo "unknown flag: $1" >&2; usage >&2; exit 1 ;;
  esac
done

if [[ -z "$DATE" ]]; then
  DATE="$(python3 - <<'PY'
from datetime import datetime
from zoneinfo import ZoneInfo
print(datetime.now(ZoneInfo("America/New_York")).date().isoformat())
PY
)"
fi

if [[ ! "$DATE" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
  echo "refusing: date must be YYYY-MM-DD" >&2
  exit 2
fi

if [[ ! -d "$KIT" ]]; then
  echo "story kit is not in this checkout yet (brand/story-kit)." >&2
  echo "Merge https://github.com/rrk3311-USA/AgentKammer/pull/40 first." >&2
  exit 2
fi

CONFIG="$KIT/configs/${DATE}.json"
TEMPLATE="$KIT/configs/_template.json"
OUT="$KIT/out"
AUDIO_DIR="$OUT/audio"
SCRIPT_TXT="$AUDIO_DIR/script-${DATE}.txt"
MP3="$AUDIO_DIR/manhattan-minute-${DATE}.mp3"

mkdir -p "$OUT" "$AUDIO_DIR" "$KIT/configs"

if [[ ! -f "$CONFIG" ]]; then
  if [[ ! -f "$TEMPLATE" ]]; then
    echo "missing $TEMPLATE" >&2
    exit 2
  fi
  python3 - "$TEMPLATE" "$CONFIG" "$DATE" <<'PY'
import json, sys
src, dest, date = sys.argv[1], sys.argv[2], sys.argv[3]
cfg = json.load(open(src))
cfg["date"] = date
json.dump(cfg, open(dest, "w"), indent=2)
open(dest, "a").write("\n")
print("wrote", dest)
PY
  python3 "$KIT/tools/cover_facts.py" "$CONFIG" || true
  echo "stopped: fill the board slots and deal.verdict in $CONFIG, then re-run." >&2
  echo "Do not invent a listing or a call." >&2
  exit 3
fi

python3 "$KIT/tools/cover_facts.py" "$CONFIG"

GATE_ARGS=()
if [[ "$ALLOW_PLACEHOLDER" -eq 1 ]]; then
  echo "WARNING: --allow-placeholder is review only. Do not publish." >&2
else
  python3 "$SCRIPTS/gate.py" "$CONFIG"
fi

python3 "$KIT/tools/fill_script.py" "$SCRIPTS/script.template.txt" "$CONFIG" -o "$SCRIPT_TXT"
python3 "$SCRIPTS/produce-voice.py" "$SCRIPT_TXT" -o "$MP3"

if [[ "$STILLS_ONLY" -eq 1 ]]; then
  (
    cd "$KIT"
    node shoot.mjs cover-editorial "$CONFIG" --out="$OUT/Agent-Kammer-Manhattan-Minute-${DATE}-cover.png"
    node shoot.mjs board-hybrid "$CONFIG" --out="$OUT/Agent-Kammer-Manhattan-Minute-${DATE}-board.png"
    node shoot.mjs end-panel "$CONFIG" --out="$OUT/Agent-Kammer-Manhattan-Minute-${DATE}-end.png"
  )
else
  BUILD=("$KIT/tools/build_story.py" "$CONFIG" "$MP3")
  if [[ "$ALLOW_PLACEHOLDER" -eq 1 ]]; then
    BUILD+=(--allow-placeholder)
  fi
  python3 "${BUILD[@]}"
fi

if [[ "$SKIP_BRIEF" -eq 0 && -f "$KIT/tools/build_brief.py" ]]; then
  python3 "$KIT/tools/build_brief.py" "$CONFIG" || echo "WARNING: brief build failed; Story video is still the deliverable." >&2
fi

echo "prepared $DATE"
echo "video: $OUT/Agent-Kammer-Manhattan-Minute-${DATE}.mp4"
echo "Send the MP4 to the approval inbox: https://app.notion.com/p/47634e315afa4cfa82af00777d628c72"
echo "After Raphi sets Status to Done: scripts/manhattan-minute/publish-instagram.py $OUT/Agent-Kammer-Manhattan-Minute-${DATE}.mp4 --i-approve-publish"

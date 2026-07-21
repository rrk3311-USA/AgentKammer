#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PAYLOAD="${1:-/tmp/intl-index-urls.json}"
if [[ ! -f "$PAYLOAD" ]]; then
  echo "Missing payload $PAYLOAD" >&2
  exit 1
fi

ENDPOINTS=(
  "https://api.indexnow.org/indexnow"
  "https://www.bing.com/indexnow"
  "https://yandex.com/indexnow"
  "https://searchadvisor.naver.com/indexnow"
  "https://search.seznam.cz/indexnow"
  "https://indexnow.yep.com/indexnow"
  "https://indexnow.amazonbot.amazon/indexnow"
)

echo "Submitting $(python3 -c "import json; print(len(json.load(open('$PAYLOAD'))['urlList']))") URLs..."
for ep in "${ENDPOINTS[@]}"; do
  code=$(curl -sS -o /tmp/indexnow-body.txt -w "%{http_code}" -X POST "$ep" \
    -H 'Content-Type: application/json; charset=utf-8' \
    --data-binary @"$PAYLOAD" || echo "000")
  echo "$code  $ep  $(head -c 120 /tmp/indexnow-body.txt | tr '\n' ' ')"
done

# Sitemap pings
SM="https://www.agentkammer.com/sitemap-international.xml"
SMI="https://www.agentkammer.com/sitemap-index.xml"
for sm in "$SM" "$SMI" "https://www.agentkammer.com/sitemap.xml"; do
  echo -n "bing sitemap ping $sm -> "
  curl -sS -o /dev/null -w "%{http_code}\n" "https://www.bing.com/ping?sitemap=$(python3 -c "import urllib.parse; print(urllib.parse.quote('''$sm'''))")" || true
  echo -n "google sitemap ping $sm -> "
  curl -sS -o /dev/null -w "%{http_code}\n" "https://www.google.com/ping?sitemap=$(python3 -c "import urllib.parse; print(urllib.parse.quote('''$sm'''))")" || true
done

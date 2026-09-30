# The Manhattan Minute: daily Instagram Story

**Status:** Prepare automation in repo. Publish stays gated.  
**Panels:** cover (beginning) · board (middle) · end (sign-off)  
**Voice:** spoken over the three cards. Production voice is Kokoro `af_heart`.  
**Do not** treat this as a fifth public product. Luxury Intelligence stays the reading channel. This is the daily Story.

## Where to send for approval

Everything waits for Raphi. Agents prepare. They do not merge or post.

| What | Send here | What Raphi does |
|------|-----------|-----------------|
| The automation itself (this PR) | https://github.com/rrk3311-USA/AgentKammer/pull/42 | Review and merge. That is the deploy onto `luxury-homepage`. |
| Each morning's Story (MP4 + verdict) | https://app.notion.com/p/47634e315afa4cfa82af00777d628c72 | Watch the file. Set Status to Done. Then post by hand or run the gated publish job. |

Notion OS (under Content Hub): https://app.notion.com/p/3eb0ad628ae581c19b31f4478f588fcd

House rules win: educational commentary only. Disclaimer, exactly: `Educational commentary. Not advice. Opinions of Raphael Kammer.` Agents prepare. They do not post.

## What already exists

The stone and platinum kit on [PR #40](https://github.com/rrk3311-USA/AgentKammer/pull/40) is the show:

| Card | File | Job |
|------|------|-----|
| Beginning | `brand/story-kit/cover-editorial.html` | Clock, nameplate, weather / Treasury / sunset, 01 to 03 contents |
| Middle | `brand/story-kit/board-hybrid.html` | Discount check, one Property Assessment row, one thing to watch. Reveals under the voice. |
| End | `brand/story-kit/end-panel.html` | "Until tomorrow.", owl art, swipe-up line, empty link-sticker zone |

Spoken build (from the kit spec):

```bash
python3 tools/cover_facts.py configs/YYYY-MM-DD.json
python3 tools/fill_script.py SCRIPT.template.txt configs/YYYY-MM-DD.json -o SCRIPT.txt
# voice: produce.sh SCRIPT.txt out.mp3 af_heart   (or scripts/manhattan-minute/produce-voice.py)
python3 tools/build_story.py configs/YYYY-MM-DD.json AUDIO.mp3
```

This repo now wraps that as one weekday command. It does **not** invent the day's deal.

## Daily command

```bash
scripts/manhattan-minute/daily.sh                  # America/New_York today
scripts/manhattan-minute/daily.sh --date 2026-09-30
scripts/manhattan-minute/daily.sh --stills-only    # three PNGs, no video
```

What it does:

1. Waits for `brand/story-kit` (merge PR #40).
2. If `configs/YYYY-MM-DD.json` is missing, copies the template, fetches cover facts, and **stops**. Fill `r1*`, `r2`, `deal.verdict` (Pick / Consider / Wait / Pass), and `r3*` from sourced notes. Never invent a listing or a call.
3. Fetches NYC weather, 10 yr Treasury, sunset. Writes `spokenWeather`.
4. Fills `scripts/manhattan-minute/script.template.txt`.
5. Speaks the script. Uses `MANHATTAN_MINUTE_AUDIO/produce.sh` + `af_heart` when that tree is present. Otherwise `edge-tts` (review voice only).
6. Builds `out/Agent-Kammer-Manhattan-Minute-DATE.mp4` (cover, board reveals, end card).

GitHub Action `Manhattan Minute daily` runs that command weekdays at 12:00 UTC (8:00 AM EDT / 7:00 AM EST) and uploads the artifacts. If the config is still a blank template, the job exits clean and waits.

## Voice

| Source | When | Publish? |
|--------|------|----------|
| Kokoro `af_heart` via `MANHATTAN_MINUTE_AUDIO/produce.sh` | Production | Yes, after Raphi hears it |
| `edge-tts` `en-US-JennyNeural` | Fallback in Actions | No, until Raphi approves that read |

The spoken template is greeting, weather, discount check, one deal, aside, one thing to watch, "Until tomorrow." No site tagline. No session or membership language.

## Instagram publish (gated)

Instagram Stories go live the moment the API accepts them. There is no draft. The end card still needs a **hand-placed link sticker** for today's brief.

```bash
IG_USER_ID=... IG_ACCESS_TOKEN=... IG_VIDEO_PUBLIC_URL=https://... \
  python3 scripts/manhattan-minute/publish-instagram.py \
    brand/story-kit/out/Agent-Kammer-Manhattan-Minute-DATE.mp4 \
    --i-approve-publish
```

Or run the `Manhattan Minute publish` workflow: type `PUBLISH`, pass the artifact MP4 name and a public HTTPS URL of that exact file.

Repo secrets to add before the first live post:

- `IG_USER_ID`: Instagram professional account id
- `IG_ACCESS_TOKEN`: long-lived token with `instagram_content_publish`

Until those exist, download the Action artifact and post the Story by hand. That is the better path for the swipe-up sticker.

`--dry-run` checks secrets without posting.

## What this will not do

- Invent today's listing, number, or verdict
- Post without `--i-approve-publish` / workflow confirm `PUBLISH`
- Merge its own PRs
- Treat "Live Where You Belong" as a Story tagline
- Offer a Housing Strategy Session or a transaction team

## Operator checklist

- [ ] PR #40 is on `luxury-homepage` so the kit is in the checkout
- [ ] Today's config has sourced facts and a real verdict
- [ ] `scripts/manhattan-minute/gate.py configs/DATE.json` prints `ready`
- [ ] Voice is Kokoro, or Raphi has approved the fallback read
- [ ] Contrast check has been run on the three templates after any copy change
- [ ] Raphi has watched the MP4
- [ ] Publish command or hand-post, then place the brief link sticker

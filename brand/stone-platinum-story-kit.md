# Stone + Platinum story kit (Agent Kammer, v11 system)

This is the visual system Raphi approved on Sep 29, 2026, for the weekly Property Assessment story (v11). The kit reproduces it for the daily **The Manhattan Minute** cover and end panel, and for any future 1080×1920 card.

- **Reference (approved):** `/workspace/property-assessment/story/kammer-report-2026-09-28-story-grey-v11.html` / `.png`. Copies are in `story-kit/reference/`.
- **Kit folder:** `/workspace/agent-kammer/brand/story-kit/`

```
story-kit/
  kit.css              shared tokens + components (frame, header, headline, panel, bar, rows, call bars, note, divider, footer)
  editorial.css        editorial layer on top of kit.css (page grid, platinum rules, shared bottom footer `.efoot`)
  kit.js               config loader: fills [data-slot] elements, derives date strings
  cover.html           daily cover, panel version (approved Sep 29; kept)
  cover-editorial.html daily cover, editorial front page (video default)
  board.html           daily middle board, editorial art board (fills in section by section under the voice)
  board-panel.html     first board prototype in the browser-style panel (superseded, kept)
  board-hybrid.html    daily board (approved): editorial page, section 02 (the deal) on its own ivory card
  end-panel.html       end page: "Until tomorrow.", charcoal art, brief download line, link sticker zone
  brief.html           daily one page PDF brief (US Letter)
  wx-icons.js          thin line weather icons shared by the cover and the brief
  shoot.mjs            Playwright renderer -> PNG (prints element bounds + overflow flags)
  configs/_template.json    blank daily config (copy for each new day; titleAlign center, empty deal row, verdict required)
  configs/2026-09-29.json   example daily config (review sample: placeholder verdict)
  assets/stone-bg.png  procedural stone texture (1080x1920)
  assets/charcoal/owls/  end-page art: the six generated charcoal owl scenes as delivered (owls-*.png, pale paper)
  assets/charcoal/owls/stone/  the same six processed into stone-blending RGBA layers (what the end page uses)
  assets/charcoal/owls/previews/  the six end pages + a contact sheet (review only)
  assets/charcoal/*.png  legacy code-drawn scenes (water-tower, stoop, cornice)
  assets/cover-clock-corner.svg / .js  the cover clock (default): all twelve numerals, no hands, bleeds off the top left corner (tools/make_clock.py)
  assets/cover-clock.svg / .js  alternate nested dial ("Manhattan" set across it, no III / IX), used only with titleAlign "nested"
  assets/ak-deep.png   AK monogram recoloured to #161C28 (400x390 source)
  tools/make_stone.py  regenerates assets/stone-bg.png (deterministic, seed 928)
  tools/make_charcoal.py  regenerates the legacy charcoal scenes; also holds the shared Paper (tone, tooth, eraser)
  tools/make_owl_layers.py  generated owl scenes -> stone-blending layers (grayscale, paper to alpha, vignette, opacity)
  tools/make_clock.py  draws the cover clock dial (SVG engraving, code-drawn; no hands, no III / IX numerals by default)
  tools/pair_audio.py  cover + end panel + voiceover MP3 -> 1080x1920 MP4 (two-part, no board)
  tools/build_story.py cover + board + end panel + voiceover MP3 -> 1080x1920 MP4 (three-part)
  tools/board_frames.mjs  renders board reveal states for build_story.py
  tools/contrast_check.py text contrast against the rendered page behind each element (text hidden, art and clock included); darkest and lightest 1%
  tools/cover_facts.py fetches the cover info strip (NWS weather + icon, 10 yr Treasury, computed sunset) into the config, plus the spoken weather line (spokenWeather)
  tools/build_brief.py builds the one page PDF brief + PNG preview (tools/brief_pdf.mjs renders it)
  data/                optional per-day Negotiation Compass CSVs (compass-DATE.csv); the daily data run writes /workspace/manhattan-minute/compass.csv instead
  retired/             the old QR asset and QR tools (no QR anywhere since Sep 29); owls-procedural/ holds the retired code-drawn owls
  reference/           approved weekly v11 HTML + PNG
  out/                 renders
  node_modules -> /workspace/brokerage-compare/node_modules (playwright)
```

## Rendering

```bash
cd /workspace/agent-kammer/brand/story-kit
node shoot.mjs cover     configs/2026-09-29.json      # -> out/cover-2026-09-29.png
node shoot.mjs cover-editorial configs/2026-09-29.json  # -> out/cover-editorial-2026-09-29.png
node shoot.mjs board     configs/2026-09-29.json      # -> out/board-2026-09-29.png (fully filled; build_story names it board-editorial-DATE.png)
node shoot.mjs end-panel configs/2026-09-29.json --out=out/Agent-Kammer-Manhattan-Minute-2026-09-29-end.png
```

- **No QR anywhere** (Raphi, Sep 29). It was removed from every template, including the older `cover.html` and `board-panel.html`. The QR asset and its tools sit in `retired/`, and there is no QR check any more.

- **Rendering setup:** Playwright Chromium, viewport 1080×1920, deviceScaleFactor 1. The script waits for `document.fonts.ready`, then screenshots `#capture`.
- **Fonts:** load from Google Fonts, so rendering needs network. `shoot.mjs` warns if they did not load.
- **CLI overrides beat the JSON:** for example `node shoot.mjs cover configs/day.json --accent=brief --out=out/x.png`.
- **Dash guard:** `shoot.mjs` refuses to render if any config value contains an en or em dash. House rule: no en or em dashes anywhere; ranges use "to".
- **Opening a template directly** in a browser works with URL params, e.g. `cover.html?date=2026-09-30&accent=brief`.

### A new day's cover (daily routine)

The three-part video (editorial cover, board, end panel) is now the default. See **Video: editorial cover, board, end panel** below. The steps here make the panel cover and the older two-part video.

1. Copy `configs/_template.json` to `configs/YYYY-MM-DD.json`. Set `date`, fill the board slots (`r1Figure`, `r2`, ...) and the `deal` row from that day's script, including `deal.verdict`. Leave `titleAlign` as `center`.
2. Run `node shoot.mjs cover configs/YYYY-MM-DD.json` and `node shoot.mjs end-panel configs/YYYY-MM-DD.json`.
3. Check the printed bounds: no `true` overflow flags, and the teaser note must end above 1560.
4. For the video, run `python3 tools/pair_audio.py out/cover-DATE.png out/end-panel-DATE.png <mm.mp3> <mm.json> -o out/manhattan-minute-DATE.mp4`.
   - The end panel crossfades in over 0.5s when the last script line (the sign-off) starts.
   - `<mm.json>` is the timing file that `/workspace/manhattan-minute/audio/produce.sh` writes.

### Config slots

| Slot | Template | Default | Notes |
|---|---|---|---|
| `date` | both | today | `YYYY-MM-DD`. Derives `weekday`, `weekdayShort`, `mdy`, `dateLong` ("Tuesday, September 29, 2026") and `dateShort` ("Tue, Sep 29, 2026"). Any derived key can be overridden. |
| `show` | both | The Manhattan Minute | Kicker, bar title, end-panel label |
| `headline`, `accent` | cover | "The morning" / "read" | Accent is Cormorant italic. Keep the full line to about 20 characters at 112px. |
| `colA`, `colB` | cover | Part / In this minute | Panel column headers |
| `seg1..3`, `seg1Line..3Line` | cover | The discount check / One deal / One thing to watch, each with a neutral descriptor | The show's three segments (from `script-sample-v2.txt`). The `...Line` slots are optional and hide when empty. |
| `teaserLabel`, `teaser` | cover.html (panel) only | Today / "Manhattan luxury, briefly, from the desk of Agent Kammer." | Removed from the editorial cover on Sep 29 (Raphi). The config key is ignored there. |
| `tagline` | none | Live where you belong. | No longer shown on any editorial card (Raphi, Sep 29 night; the .com replaces it). Still read by the older panel cards and the brief. |
| `fine` | all cards | "Educational commentary. Not advice. Opinions of Raphael Kammer." | Story disclaimer, exact wording approved by Raphi (Sep 30). The PDF brief keeps its own string in `brief.html`. |
| `signoff`, `signoffAccent` | end | "Until" / "tomorrow." | |
| `ctaLead`, `cta`, `endArt` | end | "Swipe up" / "Download today's brief" / (empty = rotate) | See **End page** below |
| `titleAlign` | cover | `center` | Locked default (Raphi, Sep 29): corner clock with the nameplate centred. Unset means `center`. Alternates: `left` (same corner clock, nameplate at x 104) and `nested` (the older dial with "Manhattan" set across it). See **Cover layout** below. |
| `deal.band`, `deal.area`, `deal.price`, `deal.verdict`, `deal.qualifier`, `deal.who`, `deal.header` | board | (empty) | The 02 verdict row, see **Hybrid board**. `verdict` is required for production builds and must be Pick, Consider, Wait or Pass. |

## Video: editorial cover, board, end panel

Raphi's direction (Sep 29): the weekly is "just for the styling", and the middle "doesn't even necessarily have to be the browser theme". It should be "a board where we're talking that fills up". The video cards therefore drop the panel and the brushed bar, and set type straight onto the stone like an editorial page. Materials stay the same: stone, platinum frame ring and hairline, Cormorant and Inter, the kit palette, the header group and the pinstripe divider. No card carries a QR.

- **Shared page grid (`editorial.css`):**
  - Text runs from x = 104 to 960, so the right edge clears the Reels action rail. Platinum rules run from 104 to 976.
  - **No top header (Raphi, Sep 29 night):** the AK monogram, the kicker (AGENT KAMMER on the cover, THE MANHATTAN MINUTE on the board and end card), the hairline under it and the double rule at 250 are removed from all three cards. The monogram now sits in the footer above AGENTKAMMER.COM. Content starts at about y 255, just inside the IG top safe area. No dateline: the date lives in the footer.
  - **Shared footer (`.efoot`, identical on all three cards; Raphi, Sep 29 night, no-header layout; moved down 135px as a unit on Sep 30, "it's a footer"):** one centred group anchored at its top (`--foot-top`, 1725), so every part sits at the same y on every card. Top to bottom: the AK monogram (`assets/ak-deep.png`, 30px wide, opacity .86) at 1725 to 1754; 14px gap; the pinstripe AGENTKAMMER.COM hatched rule at 1768 to 1786 (the brand line); the disclaimer (Inter 15, `--meta-stone`) at 1806 to 1829; `dateLong` as the final row (small caps Inter 15, 600, tracking .26em, `--navy`) at 1845 to 1860, 60px above the bottom edge. Internal spacing is unchanged. The whole footer sits in the bottom 200px, where Instagram's reply bar can cover it; it is secondary by design. The date never sits above the website. No "Agent Kammer" wording in any header or footer (the disclaimer reads "Educational commentary. Not advice. Opinions of Raphael Kammer."), and no tagline on any card: "Live where you belong." is gone from the end card too (the .com replaces it).
- **Colours on the stone:** `--deep` for key text, `--meta-stone` for secondary text, `--label` for small caps and `--slate` only at 30px or larger. Never use `--meta` on the stone. `tools/contrast_check.py` passes AA on both cards; the lowest is 4.38:1 on a 64px numeral, where AA asks for 3:1.

### Cover (`cover-editorial.html`)

**Locked default (Raphi approved, Sep 29 evening):** corner clock bleeding off the top left (no hands, opacity .20, stone halo on the words), nameplate centred, enlarged contents list, no header at all since Sep 29 night. Every build uses it without any config setting. The details are in **Cover layout: corner clock, centred title** below; the nested dial described first here is kept only as the `titleAlign: "nested"` alternate.

- **Footer:** the shared footer (monogram 1725, website rule 1768, disclaimer 1806, date ending 1860). Item 03 to the monogram: 288px.
- **Header:** none (Raphi, Sep 29 night). The nameplate carries the show name; the clock's masthead fade stays where the masthead used to be (centre about 540, 138) so the dial looks exactly as approved.
- **Vertical rhythm:** the nameplate, info strip and contents are spread between y 194 (`coverTop`) and a fixed bottom limit of 1488 (`coverBottom`; never closer than 60px to the footer) (`place()` in the template; no-header layout, Sep 29 night, so the nameplate starts at 255). The limit no longer follows the footer, so moving the footer never moves the cover content. The slack `g` is split over four gaps with weights top .7 (`coverTopWeight`), nameplate to info strip .54 (`coverGapPlate`), info strip to contents 1.30 (`coverGapStrip`) and bottom .86 (`coverGapBottom`); Raphi's spacing notes, Sep 29 evening. Sample (g 87): nameplate box 255 to 635 (was 323; no header), "Minute" box to weather card 31px (weather card 666 to 801), weather card to "In this minute" 122px (98 plus the contents nudge; contents 923 to 1437), key content ends at 1437, 288px above the footer monogram (1725). **Contents nudge** (Raphi, Sep 29 final): the "In this minute" label and the 01 to 03 list sit 24px lower as one group (`coverContentsNudge`, default 24); it is not part of the slack, so the nameplate and info strip keep their places, and it never pushes the list past the bottom limit. Margins, type sizes and the corner clock are unchanged. There is no teaser.
- **Nested clock dial (alternate only, `titleAlign: "nested"`; was the default until Raphi approved the corner clock on Sep 29 evening):** an engraved clock dial (`assets/cover-clock.js`, drawn by `tools/make_clock.py`) sits in the top left of the cover, and the word "Manhattan" runs across its middle, so the nameplate reads as set inside the clock face. "The" sits above it (where a maker's name would sit under XII) and "*Minute*" below it.
  - **Geometry:** `place()` centres the dial on the word "Manhattan" and sizes it so the word sits inside the minute track (radius = (half the word width + 16) / .84, times `coverClockScale`, default 1.12). Sample: centre (425, 496), radius 450, so it bleeds a little off the left edge and reaches up behind the masthead.
  - **Dial:** rope-hatched double outer ring, 60 tick minute track with double hour batons, Roman numerals in Cormorant on a lightly cross-hatched chapter ring (radius .75 of the dial), and a quiet guilloche rosette. No hands. III and IX are left out because "Manhattan" runs through them (`make_clock.py --omit`; `--hands` brings the old 9:59 hands back if ever wanted). It is inlined into the page so the numerals use the page's Cormorant.
  - **Visibility:** opacity .18 (`coverClockOpacity`; it was .08 when centred). Two mask layers: a radial fade anchored at the top left of the dial (full strength over the top left, about half at the lower right rim, gone at the far corner), and a soft elliptical fade under the masthead so the AK mark and kicker stay clean. The info strip card sits on top of the dial's lower edge.
  - **Knobs:** `coverClockOpacity`, `coverClockScale`, `coverClockDx` / `coverClockDy` (centre offset in dial radii, negative = up / left), `coverPlateSize` (default 156), and `coverClock: "off"` to hide it. All work as config keys or `shoot.mjs --key=value`.
  - **Alternates (previews, Sep 29):** `out/previews/...-cover-alt-clock-22.png` (same placement, opacity .22) and `...-cover-alt-corner-bleed.png` (scale 1.4, centre pushed up and left by .2 / .18 radii, opacity .17: a larger dial anchored in the corner, with "Manhattan" off centre inside it).
  - **Contrast:** decorative (`aria-hidden`); `contrast_check.py` measures text against it. Lowest: "The" at 3.70:1 (need 3.0) at .18, 3.62:1 at .22.
- **Nameplate:** "The" is Cormorant italic 64 in `--slate`; "Manhattan" roman and "*Minute*" italic, line-height .9. Default: centred on the page at 172px. The nested alternate uses a left-anchored block at x = 104 at 156px.
- **Contents:** "In this minute" (caps 18px), between fading rules. Enlarged Sep 29 evening to use the space the teaser freed: Cormorant numerals at 84 in `--navy` (column 150px), the segment in Inter 40/600, its line in Cormorant italic 38, rows padded 30px (the fit loop can tighten to 12). Applies to every cover layout.
- **Info strip:** sits under the nameplate, between two fading platinum hairlines, in three cells split by vertical hairlines.
  - Each cell has a small-caps label (Inter 14) over a Cormorant 500 42px tabular value. The weather cell adds the condition in Cormorant italic 28, `--slate`.
  - Cells: "NYC weather" shows a thin line icon (`wxIcon`), `wxHigh`° / `wxLow`° and `wxCond`. "10 yr Treasury" shows `t10Yield` with a small triangle and the change in basis points (`t10ChangeBp`) over "`t10AsOfLabel` close". "Sunset" shows `sunset`, e.g. "6:41 PM".
  - An empty cell hides itself, and the whole strip hides if all three are empty.
  - **Fit:** if the contents run past the bottom limit, the rows tighten from 30 to 12px, then the nameplate steps down. `shoot.mjs` prints `COVER_FIT`.
- **Facts are fetched, never typed:** `python3 tools/cover_facts.py configs/DATE.json` fills the strip slots and records sources and fetch times under `coverFactsMeta`.
  - **Weather:** NWS `api.weather.gov` forecast for the Central Park point (grid OKX 34,45). The high is the daytime period starting that day; the low is that evening's night period.
  - **10 yr Treasury:** the latest close from the Treasury daily par yield curve, cross-checked against FRED `DGS10`. The 11:38 AM ET build shows the prior business day's close. The cell hides if the fetch fails or the close is stale. Fed funds is still available with `--with-fed` for the weekly, but it is off the daily cover.
  - **Sunset:** computed with the NOAA solar algorithm for Central Park, America/New_York. It is cross-checked against astral when astral is installed.
  - If a source fails, its slots are cleared, the item hides, and the tool exits 3.
  - Run it in the morning ET: after 6 PM ET the forecast no longer has a daytime period for that date, so weather clears.
- **Slots:** `coverKicker`, `plateThe`, `plate1`, `plate2`, `colB`, `seg1..3`, `seg1Line..3Line`, `wxLabel`, `wxHigh`, `wxLow`, `wxCond`, `wxIcon`, `t10Label`, `t10Yield`, `t10ChangeBp`, `t10AsOf`, `t10AsOfLabel`, `sunsetLabel` and `sunset`. The segment slots are shared with `cover.html`.

### Cover layout: corner clock, centred title (locked default)

Raphi approved this on Sep 29 evening ("text centered or left align, clock like the 3rd", then picked centred). It is the kit default: `cover-editorial.html` renders it when `titleAlign` is unset, and `configs/_template.json` sets `"titleAlign": "center"` explicitly. Do not change it per day.

- **Corner clock:** `assets/cover-clock-corner.js` (`make_clock.py --omit "" --name cover-clock-corner --var COVER_CLOCK_SVG_CORNER`): all twelve Roman numerals, no hands. Fixed to the page's top left corner, not to the words: centre (300, 350), radius 560, so it bleeds off the top and left edges. Opacity .20. The same corner fade and masthead fade as before, so the AK mark and kicker stay clean. Decorative (`aria-hidden`).
- **Centred title:** The / Manhattan / *Minute* centred on the page, 172px.
- **Halo, the words stay clean:** the ring crosses the nameplate, so (1) the words carry a stone-coloured knockout halo hugging the letterforms (layered text-shadow in the stone tone, the engraver's clearing), (2) a third mask layer leaves only .8 of the dial's strength behind the nameplate block, and (3) any numeral whose box would touch the words (plus a 20 to 28px margin) is hidden.
- **Bigger contents list:** numerals Cormorant 84 `--navy`, segment Inter 40/600, line Cormorant italic 38, rows padded 30 (see **Contents** above).
- **No header rule on the cover** (see **Header** above).
- **Contrast (Sep 29):** lowest "The" 3.51:1 (need 3.0); `contrast_check.py` ignores the halo, so the real figure is better.
- **Knobs (for tests only, not daily use):** `coverClockCx`, `coverClockCy`, `coverClockR`, `coverClockOpacity`, `coverClockBehindWords`, `coverPlateSize`; `coverClock: "off"` hides the clock.
- **Alternates kept:** `titleAlign: "left"` (same corner clock, nameplate left aligned at x 104; "The" 3.47:1) and `titleAlign: "nested"` (the older dial described above). Previews: `out/previews/Agent-Kammer-Manhattan-Minute-2026-09-29-cover-corner-centered.png` and `...-cover-corner-left.png`.

### Board (`board.html`)

- **Sections (no-header layout, Sep 29 night):** start at 255 with the 01 label at 255 (section 01 has no top padding), then padding 74 around each divider (was 62; the freed header height balances the rhythm). Each is a 128px numeral column (Cormorant 300, 96px, `--slate`) plus a body. Sections are separated by 1px platinum rules that fade over the right quarter. Each body opens with a small-caps label. Sample: 01 label 255, 02 label 676, card 807 to 1089, 03 label 1237, key content ends 1415, 310px above the footer monogram (1725).
  - **01, the discount check:** the key figure in Cormorant 150 (tabular, `--deep`; it was 232 and read oversized). An optional qualifier sits before it in Cormorant italic 44, `--slate` ("About"). The caption goes under it in Cormorant italic 42 ("off original ask"), then a meta line in Inter 28, `--meta-stone`.
  - **02, one deal:** the address is set like a headline in Cormorant 112, then the meta line. The aside follows in Cormorant italic 42, `--slate`, after a 40px platinum rule.
  - **03, one thing to watch:** Cormorant 70, with a roman line and an optional italic second line.
- **Figures in meta lines** ($15M, 14%, 17) render 600 `--deep` tabular automatically.
- **Sample fit (hybrid):** key content 255 to 1415.
- **Fit on long copy:**
  - A long figure first shrinks until it stays inside x = 960.
  - Then section padding tightens from 62 down to 20.
  - Then the display sizes step down 5% at a time, to 80%, until key content ends above 1560.
  - `window.BOARD_FIT` reports the result, and `build_story.py` warns if it still doesn't fit or any text passes x = 960.
  - A stress test with a two-line address, a $12.5M figure, a three-line aside and every meta line filled ended at 1553.
- **Reveal:**
  - Before its line, a section shows only its numeral at 22%, with the rules in place. The page reads as a laid-out board waiting to fill.
  - At the line start, the section ink-settles in: label and content fade in, rise 20px and sharpen from a 7px blur to crisp over 0.5s (ease-out), and the numeral comes up to full. (Numerals are `align-self:start`, so a tall section never stretches the numeral box.)
  - The aside reveals separately, on the `[aside]` line.
- **Slots:**

| Slot | Sample | Notes |
|---|---|---|
| `r1Label`, `r1FigurePre`, `r1Figure`, `r1FigureLabel`, `r1Meta` | The discount check / About / 14% / off original ask / 17 contracts above $4M last week | Figure: keep it to about 6 characters. `r1FigurePre` is optional. |
| `r2Label`, `r2`, `r2Meta` | One deal / 48 Jane Street / West Village townhouse, asking just under $15M | Address: two lines max |
| `r2Aside` | In this market, the price is really more of a first draft. | Optional. Reveals with the `[aside]` line |
| `r3Label`, `r3`, `r3Accent`, `r3Meta` | One thing to watch / $5M to $8M momentum / vs. a quiet trophy market / (empty) | `r3Accent` is the italic second line |
| `boardCues` | `{"r1": "The discount check", "r2": "One deal", "r2Aside": "[aside]", "r3": "One thing to watch"}` | Which script line reveals each part: the start of the line text, or a tag. If a cue isn't found, the script order is used and a warning is printed. |

- `r1` (the one-line version of the discount check) is read only by `board-panel.html`.

### Hybrid board (`board-hybrid.html`), the daily default

Approved as the daily board on Sep 29. Sections 01 and 03 stay editorial. Section 02 is one property row lifted from the weekly Property Assessment panel: the row is the shared signature, the skin stays daily. **Locked default (Raphi approved, Sep 29 evening):** the deal is a single full-width weekly-style row with the outlined (engraved) CALL chip, set since Sep 29 evening in a clipped ivory editorial insert card (no browser chrome), and a verdict is required for production builds.

- **Editorial insert, no browser chrome (Raphi, Sep 29 evening):** the brushed bar, dots and title bar are gone. The row sits on a clipped ivory insert card that belongs to the printed page: ivory fill (#FBF9F5 to #F6F3EE), a 1px platinum hairline border, a 2px platinum top rule, the top right corner clipped 34px like a cut-out with a hairline along the cut, and a small letterspaced tag PROPERTY ASSESSMENT (Inter 14/600, tracking .28em, `--label`, config `dealTag`) in the top left. Shadow is subtle (two soft drop shadows). Full width, x 64 to 1016, starting 116px below the "02  ONE DEAL" label (was 88; Raphi asked for more air). **Card height** (Raphi, Sep 29 final: about 10% shorter, same width): tag padding 20 (was 26), row padding 16 top / 26 bottom (was 22 / 32), address line-height 1.06 (was 1.12, still 40px), meta gap 6 (was 8), read gap 8 and line-height 1.08 (was 10 and 1.14), FOR gap 10 (was 14). Sample card 814 to 1096, 282px (was 315). Sections 01 and 03 are unchanged in style; 03 simply follows the shorter card, 33px higher (label at 1220, was 1253). One row; the BAND / LISTING / CALL header row is off (`deal.header: true` shows it).
- **The row (same structure, type and proportions as `reference/weekly-property-assessment-v11.html`):** columns 156 / 1fr / 176, gap 16, side padding 28, row padding 32.
  - Band at left: `deal.band` in Inter 22/500 `--slate` (daily Compass bands: $5M to $10M, $10M to $20M, $20M and up).
  - Address `r2` in Inter 40/600 `--deep`; then `deal.area` · `deal.price` in Inter 26 `--meta` with the price 600 `--deep` (falls back to `r2Meta` when both are empty); then the one-line read `r2Aside` in Cormorant italic 35 `--slate` (still reveals on the `[aside]` line).
  - Optional WHO line: small caps FOR (Inter 14/600, tracking .24em, `--label`) plus `deal.who` in Inter 22 `--meta`: the one lifestyle it suits, never demographics (fair housing, see the Property Assessment skill).
  - CALL chip at right, the newer weekly's engraved style drawn in platinum and charcoal: a 176×48 box with an outer 1.5px platinum gradient rule, a 4px gap and an inner charcoal hairline, and the call in Cormorant 600 caps 22px, tracking .26em, `--deep`. The same for all four calls (no green / bronze / red fills on the daily). `deal.qualifier` (e.g. "at ask") sits under it in Cormorant italic 23 `--slate`.
  - All listing text ends near x 796; only the chip sits in the right rail, exactly as on the approved weekly.
- **Verdict rules (required):** a production build needs `deal.verdict` set to Pick, Consider, Wait or Pass (any case). `build_story.py` refuses any other value, and refuses an empty verdict whenever the board has a deal (`r2`). Never invent a call: it comes from the day's script or Raphi. `--allow-placeholder` is for review builds only; it lets an empty or placeholder verdict through with a warning, and that output must not be published. `"placeholder"` (for `verdict` or `who`) renders a clearly labelled grey TBD chip with a dashed inner rule and "layout placeholder" under it, for layout review only: the build refuses it unless `--allow-placeholder` is passed, and then warns. The Sep 29 sample (48 Jane Street) has no established call in its copy, so its config carries placeholders and its MP4 is a review build (`--allow-placeholder`); fill the real call before any production build.
- **Previews (Sep 29):** `out/previews/Agent-Kammer-Manhattan-Minute-2026-09-29-board.png`, `...-board-mid.png` (02 mid reveal) and `...-board-verdict-chips.png` (the row with each of the four calls, Pass with "at ask").
- **Reveal:** the panel settles in when 02 starts,
- **Fit:** sample key content ends at 1415.
- **Contrast:** `contrast_check.py` passes for the placeholder and all four calls. Text inside the insert (`.dealp .ins`) is measured against a conservative card fill (#F0F1F1), so the chip's own rules don't count as background.
- Empty optional slots are hidden and skipped in the timeline. Facts only from that day's script. The build refuses en and em dashes.

### End page (`end-panel.html`)

A finished closing page in the same editorial grid. No QR.

- **Header:** none (Raphi, Sep 29 night). Everything on the end card moved up 60px.
- **Sign-off:** "Until" and "*tomorrow.*" in Cormorant 164, left-aligned from 258 (was 318).
- **Charcoal art (generated snowy owls, Sep 29):** box x 68 to 1012, y 530 to 1061 (was 590 to 1121) (944×531, 16:9), nearly the full width inside the frame ring, between the sign-off and the swipe up line. Decorative (`aria-hidden`).
  - Six scenes, supplied as generated charcoal drawings on pale grey paper (delivered at 1280×720): `owls-cornice-dawn`, `owls-water-tower-dusk`, `owls-in-flight`, `owls-terrace-snow`, `owls-gargoyle-park`, `owls-brownstone-moon`. Originals in `assets/charcoal/owls/`, processed layers in `assets/charcoal/owls/stone/`.
  - Processing (`python3 tools/make_owl_layers.py [name]`): grayscale; paper level = the 94th luminance percentile; darks become graphite with an alpha that reproduces a multiply blend over the stone (the paper disappears); the few pixels brighter than the paper (owl whites, snow) get a faint ivory lift so the owls read lit, not hollow; a soft, slightly irregular vignette (66px sides, 120 top, 104 bottom) so no rectangle shows; overall strength .72 (max alpha about .86 in the darkest lines). Clearly legible, still well under the ink of "Until tomorrow.".
  - Rotation: with `endArt` empty, the scene is `SCENES[day number mod 6]` in the order above. `endArt` can name a scene, a legacy scene (`water-tower`, `stoop`, `cornice`), a PNG path, or `none`.
  - Review: `assets/charcoal/owls/previews/owls-end-pages-contact-sheet.png` and one end page per scene. Every scene passes the contrast check, and the sticker zone measures identical to bare stone.
  - The earlier code-drawn owls (`owls-1..7`, `make_owls.py`) are retired to `retired/owls-procedural/`.
- **Swipe up + download line:** a platinum chevron (56×26, brushed gradient stroke with a faint navy shadow), then `ctaLead` "SWIPE UP" in Inter 20/700 small caps (tracking .34em, `--deep`), then `cta` ("Download today's brief") in Cormorant italic 58. It runs from 1000 to 1130 (38px closer to the art since Sep 29 evening so they read as one unit, then up 60 with everything else in the no-header layout), with 60px clear above the sticker zone. The old "Today's full brief, one page" eyebrow is replaced.
- **Link sticker zone:** 1190 to 1440 (was 1250 to 1500; moved up 60 with the CTA), x 240 to 840, 60px below the CTA and 285px above the footer monogram (1725). It stays empty stone so Raphi can place the Instagram link sticker there.
- **Footer:** the shared footer, identical to the cover and board (monogram 1725, website rule 1768, disclaimer 1806, date ending 1860). No tagline.
- **Hold:** the end page ink-settles in on the sign-off and holds at least `--end-hold` seconds (default 6.0). If the audio is shorter, silence is padded after it.

### One page brief (`brief.html`)

The download behind the link sticker: US Letter, stone and platinum, every value from the day's config or the Compass CSV.

- **Contents:**
  - masthead with the date
  - the cover facts (weather with icon, 10 yr Treasury with its change and close date, sunset)
  - 01 the discount check, with the Negotiation Compass table
  - 02 the deal (address, meta line, "The Kammer take" from `r2Aside`)
  - 03 one thing to watch
  - a sources line, the small print, AGENTKAMMER.COM and the tagline
- **Negotiation Compass:** three bands (`compassBands`, default "$5M to $10M", "$10M to $20M", "$20M and up"; Raphi, Sep 29). Each band shows the median against last ask and original ask (as "3.1% under", "At ask" or "1.2% over"; never a minus sign) and its matched sale count.
  - **Where the data lives:** the daily data run should write one file, `/workspace/manhattan-minute/compass.csv` (many dates in one file; the brief filters rows by the config `date`). It does not exist yet, so today every band prints "Too thin to call".
  - The CSV is the first of `--compass`, config `compassCsv`, `data/compass-DATE.csv`, `data/compass.csv` or `/workspace/manhattan-minute/compass.csv`, with columns `date,band,median_vs_last_ask_pct,median_vs_original_ask_pct,matched_sales`. Percentages are signed (negative means under ask).
  - A band with no row, a blank value, or fewer than `compassMinSales` (default 5) matched sales prints "Too thin to call". A missing count reads "none on file". Nothing is estimated.
- **Build:** `python3 tools/build_brief.py configs/DATE.json` writes `out/Agent-Kammer-Manhattan-Minute-DATE.pdf` and `...-brief-preview.png` (2x).
  - The PDF Title is set to "The Manhattan Minute, Agent Kammer, September 29, 2026".
  - The build fails if the page is not exactly one page, if the sections run into the footer, or if any text fails contrast against the rendered stone (4.5:1, or 3:1 for large text).
- **Other slots:** `briefRight`, `takeLabel`, `compassWindow` (optional caps note beside the table title), `compassNote` and `briefSources`.

### Timeline (sample, Sep 29, audio `manhattan-minute-sample-v3.mp3`)

| Seconds (video) | |
|---|---|
| 0 to 0.8 | Cover fades in from blank stone (`--fade-in`), no sweep |
| 0.8 to 11.059 | Cover holds through the greeting (ends 7.09) and the spoken weather line (7.39 to 11.059) |
| 11.059 to 11.959 | Cover to board transition (`--fade` 0.9s), see **Transitions** |
| 11.959 to 12.459 | 01 settles in (clamped so it never starts inside the transition) |
| 19.265 to 19.765 | 02 (the deal card) settles in |
| 25.503 to 26.003 | Aside settles in |
| 32.453 to 32.953 | 03 settles in |
| 37.757 to 38.657 | Board to end transition, landing on the sign-off line start |
| 43.86 | Audio ends; 0.797s of silence is padded so the end page holds 6.0s |
| 44.667 | End |

### Transitions

`build_story.py` composites every transition frame itself (Python and numpy), then ffmpeg encodes the frame sequence; there is no `xfade` any more.

- **Opening:** the cover fades up from blank stone over `--fade-in` (default 0.8s).
- **Cover to board and board to end (`--fade`, default 0.9s), an ink settle:** only where the two pages differ, the incoming page rises 14px and sharpens from a 7px blur while the outgoing page dissolves. A thin platinum hairline (bright core, graphite flanks, soft gleam) sweeps left to right, and the change trails it slightly. The frame and the whole footer (monogram, website rule, disclaimer, date) sit in the same place on all three cards, so they stay still.
- **Cues:** cover to board starts at the end of the `[weather]` line (`weather_line` in the timeline; falls back to `greeting_end` if the script has no weather line). Board to end runs over [sign-off minus `--fade`, sign-off].
- **Timeline JSON:** records `cover_fade_in`, `cover_hold`, `weather_line`, `cover_to_board`, `board_to_end`, `transition`, `transition_mid_frame` and each reveal's `line_start`.
- **Mid-transition still:** `out/Agent-Kammer-Manhattan-Minute-DATE-transition-mid.png`.

### Spoken weather line

The cover's weather is also read aloud, right after the greeting, from the same fetched facts.

1. `tools/cover_facts.py` writes `spokenWeather` into the config, e.g. "Seventy one and partly sunny today, sunset at six forty one." Numbers are spelled out for the voice; the condition is the NWS short forecast (or a word from the icon). If weather fails, it is left empty.
2. `tools/fill_script.py TEMPLATE CONFIG -o OUT` fills `{{key}}` placeholders from the config. A line whose placeholder is empty is dropped, so a failed fetch means no weather line rather than a broken one.
3. The template line is `[weather] {{spokenWeather}}` (see `/workspace/manhattan-minute/audio/script-sample-v3.template.txt`). `produce.py` reads `[weather]` lines a touch brisker (speed 1.10, 0.30s lead in).

**Pacing (Sep 29):** normal lines at speed 1.06 with 0.30s sentence pauses and 0.38s paragraph pauses; the aside at 0.50s before and after, 0.48s sentence pauses. The discount line was shortened. Sample: audio 43.86s, video 44.667s with the 6.0s end hold, -16.3 LUFS, true peak about -1.8 dBTP.

### Building the video and the brief (daily routine)

```bash
# 0. new config: cp configs/_template.json configs/YYYY-MM-DD.json, set date, fill the board
#    slots and the deal row (deal.verdict is required: Pick, Consider, Wait or Pass).
#    titleAlign stays "center" (locked default).
# 1. cover facts (morning ET): info strip + spokenWeather into the config.
#    The daily data run writes the Compass rows to /workspace/manhattan-minute/compass.csv.
cd /workspace/agent-kammer/brand/story-kit
python3 tools/cover_facts.py configs/YYYY-MM-DD.json
# 2. script: fill the day's template (drops the weather line if the fetch failed)
python3 tools/fill_script.py /path/to/script-YYYY-MM-DD.template.txt configs/YYYY-MM-DD.json \
  -o /path/to/script-YYYY-MM-DD.txt
# 3. audio (writes MM.mp3 + MM.json with greeting_end, weather_line and per-line starts)
cd /workspace/manhattan-minute/audio
./produce.sh /path/to/script-YYYY-MM-DD.txt out/manhattan-minute-YYYY-MM-DD.mp3 af_heart
venv/bin/python tests/check_live.py out/manhattan-minute-YYYY-MM-DD.mp3   # "Live" must be /lɪv/
cd /workspace/agent-kammer/brand/story-kit
# 4. video (cover, board and end page all render inside the build)
python3 tools/build_story.py configs/YYYY-MM-DD.json \
  /workspace/manhattan-minute/audio/out/manhattan-minute-YYYY-MM-DD.mp3
#    add --cover path/to/any.png to use Raphi's own cover instead of cover-editorial.html
#    add --board-template board (all editorial) or board-panel; those outputs get a -editorial / -panel suffix
# 5. one page brief
python3 tools/build_brief.py configs/YYYY-MM-DD.json
```

Outputs (names sort by date in a downloads folder):

| File | What |
|---|---|
| `out/Agent-Kammer-Manhattan-Minute-DATE.mp4` | the story video |
| `out/Agent-Kammer-Manhattan-Minute-DATE.pdf` | the public one page brief |
| `out/Agent-Kammer-Manhattan-Minute-DATE-cover.png` | cover still |
| `out/Agent-Kammer-Manhattan-Minute-DATE-board.png` | board fully filled |
| `out/Agent-Kammer-Manhattan-Minute-DATE-board-mid.png` | a mid-reveal frame (row 2) |
| `out/Agent-Kammer-Manhattan-Minute-DATE-transition-mid.png` | the middle of the cover to board transition |
| `out/Agent-Kammer-Manhattan-Minute-DATE-end.png` | end page |
| `out/Agent-Kammer-Manhattan-Minute-DATE-brief-preview.png` | brief preview |
| `out/Agent-Kammer-Manhattan-Minute-DATE-timeline.json`, `out/checks/*.png` | cues in seconds and check frames |

- **Defaults:** the cover renders from `cover-editorial.html`, the board is `board-hybrid.html`, and the end page renders fresh from `end-panel.html`.
  - `--cover PNG` takes any image and scales it to fill, centre-cropped. `--end PNG` does the same for the end page.
  - `--cover-template cover` and `--board-template board-panel` bring back the panel versions.
  - Timing is read from the JSON next to the MP3.
- **Output:** 1080×1920, 30 fps, H.264 High yuv420p (CRF 18, faststart) plus AAC 192k. Its length is the MP3 plus any padding needed for the end hold.
- **How it works:** it renders one PNG per distinct reveal state (about 65) with Playwright, writes a 30 fps frame sequence to `work/frames` (static frames are symlinks, transition frames are composited in numpy), then encodes it with ffmpeg and pads the audio. It takes about 2 minutes.
- **Checks:**
  - `board_fit` in the timeline JSON must show `ok: true` and an empty `pastX960`.
  - Look at `out/checks/` (cleared on every build): the fade in, the cover hold, mid transition, mid and settled for each reveal, the end transition, and the end page.
  - After copy or colour changes, run `python3 tools/contrast_check.py board-hybrid configs/DATE.json` (and the same for `cover-editorial` and `end-panel`).
- **Pronunciation:** `produce.py` always says the tagline "Live where you belong" with the verb /lɪv/. Other one-off fixes go inline in the script as `[word](/phonemes/)`. See the docstring in `produce.py`, and check with `venv/bin/python produce.py SCRIPT.txt --g2p`. `tests/check_live.py MP3` verifies the rendered audio: G2P, an A/B formant test against /aɪ/, the MP3's F1 (90th percentile under 700 Hz and median under 600 Hz in a window scaled to the read speed) and a Whisper transcript.
- **Fonts:** the build stops if Google Fonts did not load (no network). `--allow-fallback-fonts` overrides this, but don't publish that output.
- **Stills only (no video):** `node shoot.mjs cover-editorial CONFIG --out=out/...-cover.png`, `node shoot.mjs board-hybrid CONFIG --out=out/...-board.png`, and board-mid with `--reveal=r1:1,r2:0.2,r2Aside:0,r3:0` (the same state the build grabs 0.2 of the reveal into 02). `shoot.mjs` does not enforce the verdict rule, so treat such stills as review only unless the config carries a real call.
- **Test builds:** with `--out`, every still, the timeline and the check frames go next to that MP4 under its name, so a test build never overwrites the daily files in `out/`. `--allow-placeholder` allows a missing or placeholder verdict for a review build only; never publish that output.

## Tokens

### Color

| Token | Value | Use | Contrast |
|---|---|---|---|
| `--deep` | #161C28 | Headline, body, prices, small print | 9 to 11:1 on stone, 15:1 on panel |
| `--navy` | #2A3447 | Bar title, pinstripe base | 6.7:1 on bar centre |
| `--slate` | #555C69 | Band/number labels, Cormorant reasons, "at ask" | 5.8 to 6.3:1 on panel |
| `--meta` | #5F6672 | Secondary text **inside the panel only** | 5.2:1 on panel (fails on stone) |
| `--meta-stone` | #454B55 | Secondary text **on the stone** (sources, disclaimers) | 4.9:1 on the worst 1% of stone pixels |
| `--label` | #4A5058 | Graphite small-caps labels, kickers, column headers | 4.6 to 5.2:1 on stone, 7.7:1 on panel |
| `--sep` | rgba(22,28,40,.26) | Middle-dot separators; padding 0 .42em | |
| `--plat-ink` | #7E858C | Short rules before note headings | |
| Stone | about #D3D0CA at the top to #CBC7C0 at the bottom, mean #CFCCC6 | Canvas (`assets/stone-bg.png`) | |
| Panel fill | linear-gradient(160deg, #FDFDFC, #F8F8F7 55%, #F0F1F1) | Cool ivory panel | |

### Platinum gradients

- **Base palette:** #7E858C, #9AA1A8, #AEB4BA, #B4BAC0, #C9CED3, #DDE0E3, #EEF0F2.
- **Outer frame:** 2px ring at inset 32px, radius 3. `linear-gradient(135deg,#7E858C 0%,#C9CED3 22%,#EEF0F2 42%,#9AA1A8 60%,#7E858C 80%,#C9CED3 100%)`, drawn as a masked ring.
- **Frame inner hairline:** inset 39px, 1px `rgba(238,240,242,.55)`, plus `box-shadow:0 0 0 1px rgba(126,133,140,.18)`.
- **Panel ring:** 2px. `linear-gradient(135deg,#7E858C,#9AA1A8 20%,#C9CED3 36%,#EEF0F2 50%,#C9CED3 64%,#9AA1A8 80%,#7E858C)`.
- **Panel inner hairline:** 1px `rgba(126,133,140,.30)`, 8px inset, starting below the bar with no top border.
- **Brushed bar:** 64px tall.
  - Horizontal gradient `#8E959C, #AEB4BA 12%, #C9CED3 30%, #EEF0F2 50%` (mirrored).
  - Vertical sheen `rgba(255,255,255,.22)` down to `rgba(0,0,0,.05)`.
  - Brushed texture: `repeating-linear-gradient(90deg, rgba(255,255,255,.05) 0 1px, rgba(0,0,0,.035) 1px 2px, transparent 2px 5px)`.
  - Top highlight `inset 0 1px 0 rgba(255,255,255,.55)`; bottom line 1px `rgba(94,101,109,.45)`.
- **Row dividers:** 2px, radius 2, fading over the right quarter. `linear-gradient(90deg,#7E858C 0%,#AEB4BA 22%,#DDE0E3 42%,#B4BAC0 62%,#9AA1A8 75%,rgba(154,161,168,0) 100%)`.
- **Header hairline:** 40×1px, `linear-gradient(90deg, transparent, #7E858C 30%, #9AA1A8 70%, transparent)`.

### Type

- **Fonts:** Cormorant Garamond (display, 400 roman plus italic accents, 500 italic for reasons and taglines) and Inter (UI and body). Lining numerals everywhere. Tabular numerals for all figures.

| Element | Spec |
|---|---|
| Kicker | Inter 16/1, 600, caps, tracking .32em, `--label` |
| Headline | Cormorant 92/.98, 400, tracking -.012em, italic accent. The daily cover uses 112px. |
| End-page sign-off | Cormorant 164/.9, "Until" over "*tomorrow.*", left-aligned |
| Bar title | Inter 18/1; show name 600, date 500; `#2A3447`; separator navy 40% |
| Column headers / note headings | Inter 14/1, 600, caps, tracking .24em, `--label` |
| Row primary (address, segment) | Inter 40/1.12, 600, tracking -.02em. The daily cover uses 44px. |
| Row meta | Inter 26/1.3, `--meta`; prices 600 `--deep` tabular, solid (no gradient or shadow) |
| Row reason | Cormorant italic 500, 35/1.14, balanced wrap, `--slate`. The daily cover uses 36px. |
| Band / number | Inter 22, 500, tabular; line-height matches the first line of the primary text |
| Note body | Inter 30/1.42, tracking -.006em. Key stats only in 650. Sources and disclaimers in `--meta-stone`. |
| Divider label | Inter 16/1, 600, caps, tracking .24em, `--deep` |
| Tagline | Cormorant italic 500, 28/1.2 |
| Small print | Inter 15/1.5, `--deep`, pretty wrap |

### Layout and positions (px, canvas 1080×1920)

- **Frame:** ring at inset 32 (32 to 34), hairline at inset 39. **Content edges:** left and right at 64 (`--x` 56 + 8).
- **Header group:** removed from the editorial cards on Sep 29 night (the older panel cards keep it: monogram 46px wide at 100 to 145, kicker 159 to 175, hairline at 193). The AK monogram now sits in the footer, 30px wide at 1725.
- **Weekly:**
  - Headline box 250 to 340 (ink 257 to 324).
  - Panel 382 to 1181, 64px side margins, radius 26.
  - Columns 156 / 1fr / 176, gap 16, side padding 28, row padding 32.
  - Note at 1230.
- **Daily cover:**
  - Headline 112px, box 258 to 368.
  - Panel 440 to 1159: bar 64, header row 54, three rows at padding 50, columns 92 / 1fr.
  - Teaser note 49px under the panel (1208).
- **Editorial cover:** corner clock bleeding off the top left (centre 300, 350, radius 560); no header; nameplate centred from 255; key content ends 1437; footer from 1725 (monogram, website, disclaimer, date ending 1860).
- **Hybrid board:** no header; 01 label at 255; 02 is the full-width editorial insert (x 64 to 1016, 807 to 1089); key content to 1415 in the sample; footer from 1725.
- **End page:** no header; sign-off from 258, owl art 530 to 1061 (x 68 to 1012), swipe up and download line 1000 to 1130, link sticker zone 1190 to 1440 (kept empty); footer from 1725.
- **Pinstripe divider:** top 1596, 18px tall, navy 1px lines every 7px at `rgba(42,52,71,.22)`, AGENTKAMMER.COM centred with 22px padding. Stays navy.
- **Footer (alternate templates, moved down as a unit on Sep 30 so their last row ends at 1860):** `cover.html` and `board-panel.html` divider 1721 to 1739, tagline 1790 to 1824, small print 1838 to 1860; `board.html` divider 1723 to 1741, tagline 1787 to 1823, small print 1837 to 1860. The editorial cards use the shared top-anchored `.efoot`, identical on all three: monogram 1725 to 1754, website rule 1768 to 1786, disclaimer 1806 to 1829, date 1845 to 1860.

### Safe zones (IG Stories / Reels)

- **Top about 250px:** the progress bar, avatar and close button overlap it.
  - Nothing sits there on the editorial cards since the header was removed (only the cover clock's decorative bleed).
  - Headlines start at 250 or lower.
- **Bottom about 340px:** reply bar in Stories; caption and actions in Reels.
  - The footer (monogram 1725, website rule 1768, disclaimer 1806, date ending 1860) sits there by approved design (Raphi, Sep 30: "it's a footer"). All of it falls below y 1720, so the reply bar (roughly the bottom 200px) can cover it; nothing essential lives there.
  - Keep all key content (nameplate, info strip, contents, board sections) between 250 and about 1560.
- **Right edge about 120px in Reels (action icons):** only the panel's right column and the frame live there. Do not put key text past x = 960 on reel covers.

## Stone texture

- **Script:** `tools/make_stone.py` (numpy + opencv + PIL), deterministic with seed 928. Output is identical on every run.
- **Base:** vertical gradient from rgb(214,211,205) to rgb(203,200,194).
- **Luminance field:** sum of Gaussian-blurred noise at sigma 90 (amp 2.2), 28 (1.5), 7 (1.1), 2.0 (1.0) and 0.8 (1.2).
- **Fine grain:** per-pixel normal noise, amp 2.2.
- **Flecks:** 0.40% dark (-10 to -22) and 0.15% light (+8 to +14), blurred 0.6.
- **Pores:** 0.018%, 2 to 3px, -40 to -70, blurred 1.1.
- **Warm drift:** sigma-120 field, ±1 on R and B.
- **Contrast check:** after any change, test text colors against the worst 1% of stone pixels behind each text block. AA means 4.5:1 for text under 24px.

## Call bars (weekly verdicts)

- **Size:** 176×48, radius 3.
- **Label:** Inter 700 18px caps, tracking .22em, white, letterpress shadow `0 -1px 0 rgba(0,0,0,.28)`.
- **Inlaid (recessed) look:**
  - Inner shadows: `inset 0 3px 5px rgba(0,0,0,.30)`, `inset 0 1px 1px rgba(0,0,0,.22)`, `inset 0 0 0 1px rgba(0,0,0,.14)`, `inset 0 -1px 0 rgba(255,255,255,.08)`.
  - Lit lower lip `0 1px 0 #fff`; shaded upper lip `0 -1px 0 rgba(80,87,95,.16)`.
  - No drop shadow and no gloss.
- **Muted gradients** (left to right), each with the lowest white-label contrast across the bar:

| Call | Gradient | Min white contrast |
|---|---|---|
| Pick | #56765F → #4E6D57 → #44604D → #34503F | 5.1:1 |
| Consider | #8F6A37 → #876434 → #7C5C32 → #6E5230 | 4.9:1 |
| Pass | #954245 → #8A3E41 → #7A383B → #5E3032 | 6.7:1 |

- **Centering:** the bars sit vertically centred on the first line of the address. "at ask" goes below the bar in Cormorant italic 23, `--slate`.

## QR (retired)

There is no QR on any card since Sep 29. The old generator, test suite and SVG are in `story-kit/retired/` for reference only.

## Copy rules

- No en or em dashes. Ranges use "to".
- No clichés and no influencer energy.
- Facts only from sourced research (the weekly uses the board file; the daily uses the Manhattan Minute script sources). Placeholders stay neutral.
- Voice: composed advisor. Humor about 5%, aimed at the object or the decision, never at people.
- Small print (daily Story cards): "Educational commentary. Not advice. Opinions of Raphael Kammer." (approved Sep 30; the PDF brief keeps its own wording in `brief.html`).

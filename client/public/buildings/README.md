# Building images (`/buildings/*.jpg`)

Local image library for the **Buildings We Follow** grid on the home page. All `src` values must be `/buildings/{slug}.jpg` — no external URLs in markup.

## Slugs (18)

| Slug | Building |
|------|----------|
| `35-hudson-yards` | 35 Hudson Yards |
| `15-hudson-yards` | 15 Hudson Yards |
| `one-high-line` | One High Line |
| `lantern-house` | Lantern House |
| `565-broome` | 565 Broome |
| `manhattan-west` | Manhattan West |
| `the-cortland` | The Cortland |
| `waterline-square` | Waterline Square |
| `the-avery` | The Avery |
| `one-manhattan-square` | One Manhattan Square |
| `tribeca-green` | Tribeca Green |
| `one-madison` | One Madison |
| `111-west-57` | 111 West 57 |
| `220-central-park-south` | 220 Central Park South |
| `432-park-avenue` | 432 Park Avenue |
| `brookfield-place` | Brookfield Place |
| `hudson-yards-residences` | Hudson Yards Residences (Lyra NYC, 555 W 38th) |
| `the-symone` | The Symoné (West Chelsea proxy: 606 W 30th until press photo) |

## Sourcing notes

- **`111-west-57`** — Official/developer architectural photography (Steinway Tower over Central Park), user-provided.
- **`15-hudson-yards`** — User-provided exterior photography, Hudson Yards.
- **`35-hudson-yards`** — User-provided exterior photography, Hudson Yards.
- **`one-high-line`** — Official One High Line developer editorial (`Project-TextImage-Editorial-Large`), West Chelsea.
- **`lantern-house`** — User-provided terrace/exterior photography, West Chelsea (Thomas Heatherwick).
- **`manhattan-west`** — User-provided exterior photography, Penn District (night aerial, terraced tower).
- Prefer official developer photography, then ArchDaily / editorial exteriors.
- Wikimedia Commons CC images are OK for **file storage** only — download, save as `{slug}.jpg`, never hotlink.
- Avoid skyline-only shots, stock interiors, and AI-generated substitutes.

See `BUILDING_IMAGE_RULE` in `client/src/pages/Home.tsx`.

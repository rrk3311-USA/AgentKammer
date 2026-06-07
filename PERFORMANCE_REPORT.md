# Performance Report

Recommendations only. No permanent deletion performed.

## Large Assets

- `Archive 2.zip` is approximately 208MB and should not live in the production project root.
- `client/public/buildings/tribeca-green.jpg` is approximately 6.9MB and should be recompressed or replaced with a responsive image.
- `client/public/buildings/the-cortland.jpg` is approximately 3.2MB.
- Multiple legacy generated images are above 1MB.
- `client/public/favicon.png` is approximately 1.6MB and should be replaced with a small optimized favicon.

## Dead Imports

- Several pages are imported only because they are still routed in `App.tsx`.
- Once legacy routes are removed, related components and generated image imports become dead code and can remain in `archived` until final deletion is confirmed.

## Unused Dependencies

Potentially unused or legacy-directed packages:
- `node-telegram-bot-api`
- `@types/node-telegram-bot-api`
- `passport`
- `passport-local`
- `puppeteer`
- `recharts`
- `react-icons`
- `framer-motion`
- `next-themes`
- `libphonenumber-js`
- `connect-pg-simple`
- `memorystore`

Do not remove without a second pass after archive moves and production validation.

## Bundle Concerns

- Too many lazy routes still point to legacy pages, which keeps the app architecture noisy and makes accidental imports likely.
- Legacy e-commerce, course, dashboard, travel, wellness, media, and marketplace pages introduce visual systems unrelated to Agent Kammer.
- Multiple icon libraries increase dependency surface. Production currently relies mainly on `lucide-react`.
- Full generated image folder remains a source of accidental large imports.
- Production build still emits `Tuxedo_professional_on_phone_cd981587` at approximately 1.4MB. This should be traced and replaced/optimized in the next performance pass.
- Production build emits `agent-kammer-logo-emblem-gold-wreath` at approximately 729KB. The logo should be optimized without changing the current brand mark.
- Production build emits `rooftop-pool-wtc` at approximately 989KB. Consider responsive conversion or a smaller display asset.

## Duplicate Code

- Real estate pages have multiple alternate versions.
- Search/listing portal components overlap with the new building watchlist positioning.
- Dashboard/admin/product page patterns are unrelated to the current site.

## Recommendations

1. Keep production routes narrow.
2. Move legacy files to `archived`, not deletion.
3. Recompress production building images.
4. Replace oversized favicon.
5. After confirmation, run a dependency removal pass and rebuild.
6. Trace the active tuxedo image import and decide whether it belongs in the production chat/contact experience.

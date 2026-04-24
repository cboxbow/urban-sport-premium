# Urban Sport Folder Asset Audit

## Scope

This audit is based on the source assets found in `D:\MEGA\URBAN SPORT` and the curated runtime copies placed in `public/` for the Next.js app. The build is intentionally club-first and only uses source-backed content.

## Brand assets

- Official dark wordmark: `Urban-sport-large-inverted.png`
- Official light wordmark: `Urban-sport-medium.png`
- Compact logo sources: `Urban-sport-small.png`, `Urban-sport-small-inverted.png`
- Master packaging: `Urban-sport.eps`, `Urban-sport.pdf`, `Urban-sport-inverted.ai`, `Urban-sport-inverted.eps`, `Urban-sport-inverted.pdf`
- Brand guidance: `Urban sport-colour-reference.pdf`
- Supporting vector: `STICK DESIGN.svg`

Runtime mapping:

- Dark header/footer logo: `/logos/urban-sport-primary-dark.png`
- Light surface logo: `/logos/urban-sport-primary-light.png`
- Compact/fallback mark: `/logos/urban-sport-compact-dark.png`
- Archived brand masters: `public/branding/`

## Clubs and location content

- Grand Baie venue visual: `IMG_9991 2.jpg.jpeg` and the curated `WhatsApp Image ...16.56.10.jpeg` export
- Black River hero aerial: `URBAN RN.PNG`
- Black River alternate aerial: `IMG_9992.jpg.jpeg` and `WhatsApp Image ...16.56.11.jpeg`
- Club motion asset: `WhatsApp Video 2026-04-23 at 16.58.17.mp4`

Runtime mapping:

- Grand Baie: `public/clubs/grand-baie/grand-baie-aerial.jpeg`
- Black River: `public/clubs/black-river/black-river-aerial-master.png`, `black-river-aerial.jpeg`, `black-river-reel.mp4`

## Tournament content

Structured tournament poster/archive files were found for both clubs across the 2026 circuit:

- Grand Baie series includes `M50`, `M100`, `M250`, `M25`, `MIXED`, and `JUNIOR`
- Black River series includes `M250`, `M25`, `M100`, and `MIXED`
- Season references: `2026 URBAN CALENDAR.pdf`, `2026 . POSTER GB.pdf`, `POSTER br.pdf`

Use decision:

- Monthly PDFs are archive/download assets, not treated as live database truth.
- Calendar and season posters shape filters, archive grouping, and season storytelling.

Runtime mapping:

- `public/tournaments/archive/grand-baie/*`
- `public/tournaments/archive/black-river/*`
- `public/tournaments/2026-urban-calendar.pdf`
- `public/tournaments/grand-baie-season-poster-2026.pdf`
- `public/tournaments/black-river-season-poster-2026.pdf`

## Coaching content

- Coaching poster: `public/gallery/academy-coaching.jpeg`
  Contains: Hello Padel Academy certification in Barcelona, Grand Baie and Black River availability, Sam contact number, and coaching focus points.
- Progression guide: `public/gallery/padel-level-guide.jpeg`
  Contains levels 1 through 10 from newcomer to professional.

Use decision:

- These assets power the coaching page and coaching-related copy.
- They are treated as permanent service content, not generic gallery filler.

## Experiences

- Ghost Padel poster: `GHOST PADEL URBAN .png`
  Extracted usable details: Grand Baie, court 2 or 3, 18:00-19:30 or 19:30-21:00, Rs 3000 for 90 min, Cynthia 268 2942.
- Kids Birthday poster: `SPECIAL KIDS BD.png`
  Extracted usable details: Foot 5 Rs 1500 per hour, food and drinks package Rs 250 per kid, optional jumping castle/waterslide Rs 4000, booking +230 5944 9474.
- Event-support visual: `public/gallery/black-river-poster-board.jpeg`

Use decision:

- These are promoted under Experiences and Events.
- They are not used as generic background images across unrelated pages.

## Shop and merchandising

- Main apparel sale poster: `TOURNAMENT APAREL SALE.png`
  Extracted usable details: Rs 2500, package consists of 2 t-shirts, custom name option, WhatsApp order on `+230 5 772-5704 (Cynthia)`.
- Supporting product visual: `tournament tshirt.jpeg`
- Supporting campaign export: `TOURNAMENT APAREL SALE.pdf`

Use decision:

- These assets drive the Shop page and shop admin content.

## Promotional only

These remain marketing or campaign support and are not treated as permanent club infrastructure:

- `3 REASONS APP - UPDATED.png`
- `Correct Post -20.png`
- `discover ghost padel.jpeg`
- `WOMEN VEST.png`

## Promotional content with structured value

- `3 REASONS APP - UPDATED.png` still informs app/booking messaging
- `Correct Post -20.png` informs the youth pricing campaign and can live in campaigns/gallery

## Secondary logos and partner marks

These were retained as references or sponsor/league-adjacent assets rather than primary Urban Sport identity:

- `ESPR - BLACK.pdf`, `ESPR - WHITE .png`, `ESPR LOGO.pdf`, `ESPR.pdf`
- `FLAG LOGO .pdf`
- `WEAREPADEL - LOGO .pdf`
- `GB BR .pdf`

## Duplicates and near-duplicates

- `URBAN RN.PNG` and the alternate Black River aerial exports show the same venue from similar compositions.
- `TOURNAMENT APAREL SALE.png` and `TOURNAMENT APAREL SALE.pdf` are alternate exports of the same offer.
- `GHOST PADEL URBAN .png` and `discover ghost padel.jpeg` belong to the same experience campaign family.

## Folder structure decisions

- `public/branding/`: master brand files and references
- `public/logos/`: runtime logos used by the app
- `public/clubs/`: confirmed club/location visuals
- `public/tournaments/`: season posters and archive PDFs
- `public/gallery/`: curated publishable visuals
- `public/marketing/`: campaigns, experiences, and shop creatives
- `public/downloads/`: public-facing downloads such as the 2026 calendar
- `docs/archive/`: source preservation for non-runtime files

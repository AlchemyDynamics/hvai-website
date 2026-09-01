# Hudson Valley Auto Interiors — Website

Redesigned website for **Hudson Valley Auto Interiors** (Gardiner, NY) — premium
interior patterns for vintage, classic, and high-end automobiles. The centerpiece
of the new business model: a digital **archive of rare vintage and classic car
interior patterns**, sold as digital downloads, physical patterns, and complete
pre-cut kits.

Built 2026-09-01 as a faithful static-site reconstruction of the approved design
mockup (`design/mockup.png`) for the owner pitch.

## Structure

```
index.html          Single-page site (hero, how-it-works, archive, pricing, about, contact)
css/styles.css      All styling — palette: zinc neutrals + rust accent #97460c
js/main.js          Mobile nav, live archive search filter, newsletter stub
assets/             Hero + vehicle images
design/mockup.png   Source design mockup (reference of record)
```

## Run locally

No build step — open `index.html` in a browser, or:

```
python3 -m http.server 8080
```

## Design notes

- Headings/wordmark: Georgia serif bold. Body: system sans. No webfont dependency.
- Palette sampled from the mockup: bg `#fafafa`, tint `#f4f4f5`, ink `#1d1f20`,
  muted `#595e63`, border `#e4e4e7`, accent `#97460c`.
- Fully responsive (breakpoints at 1024px and 720px).

## Asset provenance — replace before production

The hero and vehicle photos were extracted from the design mockup (the hero had
its baked-in text removed via inpainting). They are placeholders at mockup
resolution. **Before the site goes live, replace with original photography of
HVAI's actual restoration work** — Greg's real cars are the best sales asset.

## Roadmap

1. **Archive catalog** — wire the archive section to the pattern database
   (`../hvai_archive.json`, schema `hvai.v1`; SQLite/Postgres schemas already
   drafted in the parent HVAI folder). 224 documented restorations scraped from
   the old site seed the vehicle list.
2. **Pattern detail pages** — per-vehicle pattern sets (Seats, Door Panels,
   Headliner, Convertible Top, Carpets) with piece dimensions + material BOMs.
3. **3D scan viewer** — photogrammetry proof-of-concept scans already exist
   (suitcase + leather jacket samples); embed as interactive 3D pattern previews.
4. **Commerce** — cart/checkout for the three service tiers ($29 digital /
   $149 physical / custom kits).

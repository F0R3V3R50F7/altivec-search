# ⌥ ALTIVEC — The Web, Distilled for G4

A curated search engine and resource hub for PowerMac G4 users. Hand-picked articles, guides, and links to sites that actually work on vintage PowerPC hardware.

Live at [altivec.fyi](https://www.altivec.fyi)

## What Is This?

The modern web is unusable on a PowerMac G4. ALTIVEC is a single-page resource hub that indexes the sites, tools, and guides that still work on old hardware. Everything is written to run in Safari Leopard WebKit and Aquafox — no modern JS, no frameworks, no build step.

## Features

- **N-gram search engine** — typo-tolerant, weighted, character trigram matching (pg_trgm-style). Handles misspellings like "qauke 3" or "vanila wow" gracefully.
- **Curated articles** — hand-written guides with download links, performance configs, and installation walkthroughs.
- **G4 friendly badges** — each article is flagged for whether the linked site actually loads on old browsers.
- **Weather widget** — animated canvas weather via wttr.in (plain HTTP, no API key).
- **God Says widget** — Terry Davis-inspired random word oracle.
- **E-reader** — built-in article viewer with sidebar for downloads and external links.
- **ES3-compatible** — no arrow functions, no `Set`, no `Array.filter`. Runs on old WebKit and Gecko.

## Structure

```
index.html          — the entire site (HTML, CSS, JS in one file)
articles/
  index.json        — array of filenames to load
  *.json            — individual article data + content
CNAME               — GitHub Pages custom domain
Happy.TXT           — word list for the God Says widget
```

## Articles

Articles are JSON files in `articles/`. The filename is the article ID. Each file contains:

```json
{
    "title": "...",
    "description": "...",
    "category": "gaming|software|music|web",
    "g4_friendly": 1,
    "url": "https://...",
    "thumb": "🎮",
    "date": "2026-06-12",
    "author": "Technologyst Labs",
    "tags": ["...", "..."],
    "content": "<h2>...</h2><p>...</p>"
}
```

To add a new article: create a JSON file in `articles/`, add the filename to `articles/index.json`, done. The search engine indexes everything automatically on load — title, tags, description, category, and body content.

## Hosting

Static files. No server, no database, no build. Drop it on GitHub Pages, Neocities, or any web server. The CNAME file is configured for `www.altivec.fyi`.

## License

The website code (`index.html`) is licensed under the **Mozilla Public License 2.0** — see [LICENSE](LICENSE). In short: modify it, use it, ship it, but if you change the MPL-licensed files, those changes must stay open under MPL 2.0.

The article content (`articles/*.json`) and word list (`Happy.TXT`) are released into the **public domain** under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). Do whatever you want with them.

## Credits

Built by [Technologyst Labs](https://buymeacoffee.com/f0r3v3r50f7).

If this helped you get more out of your G4, consider buying us a coffee.

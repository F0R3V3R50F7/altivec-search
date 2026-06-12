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
- **Mobile interface** — a separate touch layout (`mobile.css`) that activates automatically on phones, with a desktop/mobile manual override. The G4 desktop view is always the safe default, so vintage hardware is never served the mobile build.
- **ES3-compatible** — no arrow functions, no `Set`, no `Array.filter`. Runs on old WebKit and Gecko.

## Structure

```
index.html          — the site shell (HTML, desktop CSS, and JS in one file)
mobile.css          — mobile interface styles (scoped under html.m-mobile)
articles/
  db.json           — single array of all article metadata
  *.md              — article body content, one Markdown file per article
CNAME               — GitHub Pages custom domain
Happy.TXT           — word list for the God Says widget
```

## Articles

All article metadata lives in a single file, `articles/db.json` — an array of
entries. Body content is kept separately as Markdown: each entry's `content`
field is the path to its `.md` file, which the e-reader loads on demand and
renders with the built-in Markdown converter (headings, paragraphs, bold,
italic, inline code, fenced code blocks, lists, and links).

Each entry in `db.json` looks like this:

```json
{
    "id": "wow-vanilla-classicdb",
    "title": "...",
    "description": "...",
    "category": "gaming|software|music|web",
    "g4_friendly": 1,
    "featured": 0,
    "url": "https://...",
    "thumb": "🎮 or an https:// image URL",
    "date": "2026-06-12",
    "author": "Technologyst Labs",
    "tags": ["...", "..."],
    "downloads": [
        { "name": "Download Mirror 1", "url": "https://..." }
    ],
    "content": "articles/wow-vanilla-classicdb.md"
}
```

Field notes:

- `id` — unique slug for the article (set explicitly; it is no longer derived
  from a filename). By convention the Markdown file is named to match.
- `url` — the external site the article covers. Omit entirely (or set to `""`) for articles that are standalone guides with no associated website. When absent, the "Open Website" button is hidden automatically.
- `featured` — set to `1` to surface the article in the Featured tab.
- `g4_friendly` — `1` if the linked site loads on Safari Leopard WebKit /
  Aquafox; `0` shows a compatibility warning before opening.
- `thumb` — an emoji, or an `https://` URL to an image.
- `downloads` — optional array of `{ name, url }` links shown in the reader
  sidebar. Use `[]` if there are none.
- `content` — path to the article's Markdown file.

To add a new article: write its body as `articles/your-slug.md`, then append a
new entry to the array in `articles/db.json` with `"content": "articles/your-slug.md"`.
That's it — the search engine indexes every entry automatically on load
(title, tags, description, category), and articles are sorted by `date`.

## Hosting

Static files. No server, no database, no build. Drop it on GitHub Pages, Neocities, or any web server. The CNAME file is configured for `www.altivec.fyi`.

## License

The website code (`index.html`) is licensed under the **Mozilla Public License 2.0** — see [LICENSE](LICENSE). In short: modify it, use it, ship it, but if you change the MPL-licensed files, those changes must stay open under MPL 2.0.

The article content (`articles/*.json`) and word list (`Happy.TXT`) are released into the **public domain** under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). Do whatever you want with them.

## Credits

Built by [Technologyst Labs](https://buymeacoffee.com/f0r3v3r50f7).

If this helped you get more out of your G4, consider buying us a coffee.

# SiliWiki Content Spec

## Wiki

A SiliWiki wiki is a local content pack under `content/wikis/<slug>`.

Required:

- `meta.json`
- `content.md`

Recommended:

- `glossary.json`
- `raw/sources.md`
- `images/`

### `meta.json`

`meta.json` controls display metadata and optional explicit navigation.

Required field:

- `title`

Recommended fields:

- `slug`
- `sub`
- `description`
- `logoText`
- `version`
- `updated`
- `accent`, `accentSoft`, `accentDark`
- `disclaimer`
- `nav`

Every `nav` anchor must resolve to a Markdown heading generated id, an explicit `{#id}`, or an HTML `id="..."` in `content.md`.

### `content.md`

- One `#` title.
- First paragraph: purpose, audience, scope.
- `##` for major sections.
- `###` for subsections.
- Keep claims source-backed where possible.
- Mark uncertainty explicitly.

Supported helper components:

- `<div class="tldr">...</div>`
- `<div class="flag-blue">...</div>`
- `<div class="flag-green">...</div>`
- `<div class="flag-yellow">...</div>`
- `<div class="flag-red">...</div>`
- `<div class="card">...</div>`
- `<div class="two-col">...</div>`
- `<div class="stat-grid">...</div>`

## Glossary

A glossary is the canonical term registry for a wiki.

```json
{
  "version": "v0.1",
  "updated": "2026-04-27",
  "categories": [{ "key": "core", "title": "Core" }],
  "keywords": [
    {
      "slug": "wiki",
      "display": "Wiki",
      "aliases": ["content pack"],
      "category": "core",
      "short": "A local knowledge object.",
      "definition": "A folder rendered by SiliWiki.",
      "related": ["glossary"],
      "sources": ["raw/sources.md#design-note"]
    }
  ]
}
```

Rules:

- `slug` must be stable and unique.
- `display` is the reader-facing term.
- `aliases` capture synonyms and Chinese/English variants.
- `category` should reference a category key.
- `short` is a one-line explanation.
- `definition` is the full explanation.
- `related` links to other term slugs.
- `sources` should point to evidence when available.

## Source Registry

`raw/sources.md` is an evidence ledger. Use stable anchors and do not invent sources.

Suggested entry:

```markdown
## source-id

- Type: paper / URL / meeting note / transcript / screenshot / local note
- Date: YYYY-MM-DD
- Used by: section names or glossary slugs
- Notes: what this source supports
```

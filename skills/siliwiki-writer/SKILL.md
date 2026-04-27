---
name: siliwiki-writer
description: Generate and maintain SiliWiki / 硅基笔记 local wiki content packs with meta.json, content.md, glossary.json, and raw sources.
version: 0.1.0
author: WhiteMirror AI Team
license: MIT
---

# SiliWiki Writer Skill

Use this skill when the user asks you to create, update, repair, or expand a SiliWiki / 硅基笔记 wiki.

## Core idea

SiliWiki is a local-first wiki UI. Your job as the agent is not to create a random Markdown note. Your job is to create a **validated content pack** that SiliWiki can render on localhost.

A content pack lives here:

```text
content/wikis/<slug>/
├── meta.json
├── content.md
├── glossary.json        # optional but recommended
├── raw/sources.md       # recommended
└── images/              # optional
```

## Definitions

- **Wiki**: a durable local content pack with metadata, Markdown body, optional glossary, and evidence files. It should be useful after the current chat ends.
- **Glossary**: the canonical term registry for one wiki. It stores `slug`, `display`, `aliases`, `category`, `short`, `definition`, `related`, and `sources` so the writer, reader, and future agents use the same vocabulary.
- **Source registry**: `raw/sources.md`, an evidence ledger. Do not invent citations. Mark uncertain material explicitly.

## Required workflow

1. **Inspect the repo**
   - Read `docs/CONTENT_SPEC.md`.
   - Read existing packs under `content/wikis/` for style.
   - Read schemas under `harness/schemas/`.

2. **Choose or confirm a slug**
   - Use lowercase letters, digits, and hyphens only: `my-topic`, not `My Topic`.
   - If the folder does not exist, run:
     ```bash
     npm run new -- my-topic --title "My Topic"
     ```

3. **Write `content.md`**
   - Start with exactly one `#` title.
   - The first paragraph should state purpose, audience, and scope.
   - Use `##` for major sections and `###` for subsections.
   - Prefer explicit, source-backed claims.
   - Mark uncertain claims with “Unverified” / “待核实”.
   - Use SiliWiki components sparingly: `.tldr`, `.flag-blue`, `.flag-green`, `.flag-yellow`, `.flag-red`, `.card`, `.two-col`, `.stat-grid`.

4. **Write `meta.json`**
   - Include `slug`, `title`, `sub`, `version`, `updated`, colors, and `nav`.
   - Every `nav[].children[].anchor` must resolve to a heading id in `content.md`.
   - If unsure, use headings and let the UI auto-generate nav; but explicit nav is preferred for polished wikis.

5. **Write `glossary.json`**
   - Add only terms that matter to the wiki.
   - Keep `slug` stable over time.
   - Put synonyms in `aliases`; do not create duplicate terms for the same concept.
   - Use `related` to connect concepts.
   - Use `sources` to point to `raw/sources.md#anchor` when possible.

6. **Update `raw/sources.md`**
   - Record papers, URLs, meeting notes, screenshots, datasets, or local files.
   - Include type, date, used-by section, and notes.
   - Never fabricate external citations.

7. **Validate before returning**
   ```bash
   npm run validate
   npm run smoke
   ```
   Fix validation errors. Report warnings honestly.

## Writing style

- Make the wiki useful to a future reader, not just the current user.
- Prefer short sections, tables, and concept maps over long paragraphs.
- Every major section should answer: “What is it?”, “Why does it matter?”, “What should the reader do next?”
- Keep raw evidence separate from polished explanation.

## Safety rules

- Do not write secrets, tokens, private keys, cookies, or `.env` files into content packs.
- Do not include private user/customer data unless the user explicitly asks and understands the repo may be committed.
- Do not claim something is sourced unless it appears in `raw/sources.md` or provided materials.
- Do not publish, push, or make a repo public without explicit user approval.

## Completion response format

When done, tell the user:

- Wiki slug and local URL: `http://localhost:3000/wiki/<slug>`
- Files changed
- Validation commands run and result
- Known limitations / uncertain claims

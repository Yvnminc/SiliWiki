---
name: siliwiki-writer
description: Generate and maintain SiliWiki / 硅基笔记 self-evolving Agentic Wiki content packs with meta.json, content.md, glossary.json, raw sources, and SiliLoop evolution plans.
version: 0.2.0
author: WhiteMirror AI Team
license: MIT
---

# SiliWiki Writer Skill

Use this skill when the user asks you to create, update, repair, expand, or self-evolve a SiliWiki / 硅基笔记 wiki.

## Core idea

SiliWiki is a local-first **self-evolving Agentic Wiki** UI. Your job as the agent is not to create a random Markdown note. Your job is to create and maintain a **validated content pack** that SiliWiki can render on localhost and improve over time.

A content pack lives here:

```text
content/wikis/<slug>/
├── meta.json
├── content.md
├── glossary.json        # optional but recommended
├── raw/sources.md       # recommended evidence ledger
├── evolution/plan.md    # optional SiliLoop evolution plan
└── images/              # optional local media
```

## Definitions

- **Wiki**: a durable local content pack with metadata, Markdown body, optional glossary, and evidence files. It should be useful after the current chat ends.
- **Glossary**: the canonical term registry for one wiki. It stores `slug`, `display`, `aliases`, `category`, `short`, `definition`, `related`, and `sources` so the writer, reader, and future agents use the same vocabulary.
- **Source registry**: `raw/sources.md`, an evidence ledger. Do not invent citations. Mark uncertain material explicitly.
- **Self-evolving Agentic Wiki**: a wiki that can be inspected by an agent, converted into a memory stream, reflected on, patched locally, and validated again.
- **SiliLoop**: SiliWiki's local self-evolution algorithm: `observe → retrieve → reflect → plan → patch → validate`.

## SiliLoop: self-evolution workflow

Run this when the user asks for “self-evolving”, “自进化”, “improve this wiki”, or “make the note keep improving”.

1. **Observe**
   - Read `meta.json`, `content.md`, `glossary.json`, and `raw/sources.md`.
   - Identify headings, TODO / 待核实 markers, missing sources, orphan glossary terms, missing diagrams, and stale update dates.

2. **Retrieve**
   - Prefer high-signal memories using the SiliWiki scoring idea:
     `score = 0.20 recency + 0.45 importance + 0.35 relevance`.
   - This is inspired by Stanford-led *Generative Agents* memory retrieval, but adapted to local wiki files.

3. **Reflect**
   - Turn the highest-scoring signals into short, actionable reflections.
   - Follow the spirit of *Reflexion*: the reflection should help the next attempt improve without hiding the failure.

4. **Plan**
   - Produce the next safe edit objective: source grounding, glossary weaving, outline expansion, diagram creation, uncertainty resolution, or freshness review.
   - Keep the plan human-reviewable. Do not silently overwrite truth.

5. **Patch**
   - Edit only the local wiki pack files unless the user explicitly asks for broader repo changes.
   - Preserve existing source anchors. Add new anchors to `raw/sources.md` before making source-backed claims.
   - Update `meta.json` navigation if headings change.

6. **Validate**
   ```bash
   npm run validate
   npm run smoke
   ```
   Fix validation errors. Report warnings honestly.

Useful command:

```bash
npm run evolve -- <slug> --focus "what this wiki should become"
npm run evolve -- <slug> --focus "what this wiki should become" --write
```

## Required creation workflow

1. **Inspect the repo**
   - Read `docs/CONTENT_SPEC.md`.
   - Read `docs/SELF_EVOLVING_AGENTIC_WIKI.md` when self-evolution is relevant.
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
   - For algorithm / architecture pages, include a Mermaid block that the SiliWiki reader can render locally, or add a committed SVG image.

4. **Write `meta.json`**
   - Include `slug`, `title`, `sub`, `version`, `updated`, colors, and `nav`.
   - Every `nav[].children[].anchor` must resolve to a heading id in `content.md`.
   - If unsure, use headings and let the UI auto-generate nav; explicit nav is preferred for polished wikis.

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

7. **Generate / update the evolution plan when useful**
   ```bash
   npm run evolve -- <slug> --focus "target audience and purpose" --write
   ```
   Treat `evolution/plan.md` as a review queue, not as final truth.

8. **Validate before returning**
   ```bash
   npm run validate
   npm run smoke
   ```
   Fix validation errors. Report warnings honestly.

## Agent memory references for self-evolution

When explaining SiliLoop, cite these real references rather than inventing new ones:

- Joon Sung Park et al., **Generative Agents: Interactive Simulacra of Human Behavior**, UIST 2023. Memory stream, retrieval by recency / importance / relevance, reflection, and planning. https://doi.org/10.1145/3586183.3606763
- Charles Packer et al., **MemGPT: Towards LLMs as Operating Systems**, 2023. Working context and archival memory management. https://arxiv.org/abs/2310.08560
- Noah Shinn et al., **Reflexion: Language Agents with Verbal Reinforcement Learning**, 2023. Verbal feedback memory for iterative improvement. https://arxiv.org/abs/2303.11366
- Guanzhi Wang et al., **Voyager: An Open-Ended Embodied Agent with Large Language Models**, 2023. Curriculum and reusable skill library. https://arxiv.org/abs/2305.16291
- Akari Asai et al., **Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection**, 2023. Retrieve / generate / critique loop. https://arxiv.org/abs/2310.11511

## Writing style

- Make the wiki useful to a future reader, not just the current user.
- Prefer short sections, tables, and concept maps over long paragraphs.
- Every major section should answer: “What is it?”, “Why does it matter?”, “What should the reader do next?”
- Keep raw evidence separate from polished explanation.
- Preserve uncertainty instead of hallucinating confidence.

## Safety rules

- Do not write secrets, tokens, private keys, cookies, `.env` values, OAuth credentials, or private connection strings into content packs.
- Do not include private user/customer data unless the user explicitly asks and understands the repo may be committed.
- Do not claim something is sourced unless it appears in `raw/sources.md` or provided materials.
- Do not publish, push, or make a repo public without explicit user approval.
- SiliLoop proposes patches; humans approve the final knowledge state.

## Completion response format

When done, tell the user:

- Wiki slug and local URL: `http://localhost:3000/wiki/<slug>`
- Files changed
- Evolution command run, if any
- Validation commands run and result
- Known limitations / uncertain claims

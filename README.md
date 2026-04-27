# SiliWiki / 硅基笔记

<p align="center">
  <img src="docs/images/siliwiki-logo.png" width="140" alt="SiliWiki logo: silicon notebook with evolving knowledge loop">
</p>

<p align="center">
  <strong>Self-evolving Agentic Wiki · 自进化的代理笔记</strong><br>
  把 AI 生成的内容，变成可验证、可阅读、可持续演化的本地 Wiki。
</p>

<p align="center">
  <a href="https://github.com/Yvnminc/SiliWiki/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/Yvnminc/SiliWiki/actions/workflows/ci.yml/badge.svg"></a>
  <a href="LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
  <img alt="Node.js 20+" src="https://img.shields.io/badge/Node.js-20%2B-43853d.svg">
  <img alt="Local First" src="https://img.shields.io/badge/local--first-yes-ffb703.svg">
  <img alt="Self-evolving Agentic Wiki" src="https://img.shields.io/badge/self--evolving-agentic%20wiki-7c3aed.svg">
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a> ·
  <a href="docs/USAGE_ZH.md">中文小白说明</a> ·
  <a href="docs/SELF_EVOLVING_AGENTIC_WIKI.md">Self-evolving algorithm</a> ·
  <a href="docs/CONTENT_SPEC.md">Content Spec</a> ·
  <a href="docs/ARCHITECTURE.md">Architecture</a>
</p>

---

## What is SiliWiki?

**SiliWiki（硅基笔记）** is a local-first workbench for **self-evolving Agentic Wikis**.

Most AI-generated articles disappear into chat history. SiliWiki turns them into a living knowledge object:

- a **writer skill** that tells your local agent how to write;
- a **plain-file wiki pack** that humans can review in git;
- a **glossary layer** that keeps vocabulary stable;
- a **self-evolution loop** that observes gaps, retrieves relevant memories, reflects, proposes patches, and validates;
- a **localhost reader UI** that makes the result feel like a small product, not a pile of Markdown.

> **The point:** SiliWiki is not “another note app”. It is a harness that makes agent-written knowledge structured, inspectable, local, and reusable.

Built and maintained with support from the WhiteMirror AI Team.

---

## The core loop

<p align="center">
  <img src="docs/images/diagrams/core-loop.svg" alt="SiliWiki core loop: clone, extract skill, local agent writes pack, validate, read on localhost, improve with git diffs">
</p>

SiliWiki separates **generation** from **ownership**. Your agent can draft, but the output lives in your local files, passes validation, and can be reviewed like normal source code.

---

## Self-evolving algorithm: SiliLoop

<p align="center">
  <img src="docs/images/diagrams/self-evolving-loop.svg" alt="SiliLoop self-evolving Agentic Wiki algorithm: observe, retrieve, reflect, plan, patch, validate">
</p>

SiliWiki implements **SiliLoop**, a lightweight self-evolution mechanism inspired by agent memory research:

1. **Observe** — parse `content.md`, `glossary.json`, `meta.json`, and `raw/sources.md` into a memory stream.
2. **Retrieve** — score memories with `0.20 recency + 0.45 importance + 0.35 relevance`, following the memory retrieval idea in Stanford-led *Generative Agents*.
3. **Reflect** — turn high-signal gaps into verbal reflections, inspired by *Reflexion*.
4. **Plan** — choose a safe next edit objective, similar to curriculum / skill-library loops in *Voyager*.
5. **Patch** — ask the local agent to edit only local wiki files while preserving glossary terms and sources.
6. **Validate** — run SiliWiki checks plus human review before treating the evolved note as final.

Run it locally:

```bash
npm run evolve -- siliwiki-v1 --focus "self-evolving Agentic Wiki"
```

Write a human-reviewable plan:

```bash
npm run evolve -- siliwiki-v1 --focus "agent memory" --write
```

See [`docs/SELF_EVOLVING_AGENTIC_WIKI.md`](docs/SELF_EVOLVING_AGENTIC_WIKI.md) and the live sample wiki [`content/wikis/self-evolving-agentic-wiki/`](content/wikis/self-evolving-agentic-wiki/).

---

## Why it matters

<p align="center">
  <img src="docs/images/diagrams/why-it-matters.svg" alt="Why SiliWiki matters: AI chat answers become wiki packs, reviewable history, local reader, and reusable glossary">
</p>

SiliWiki is designed for people who want AI to help write serious knowledge bases without surrendering control to a cloud product or an invisible prompt chain.

---

## Features

| Area | What SiliWiki provides |
|---|---|
| 🧠 Agent harness | `npm run skill` prints the writer skill you can hand to Codex, Claude Code, OpenCode, Cursor, or another local agent. |
| 🔁 Self-evolution | `npm run evolve -- <slug>` creates a SiliLoop plan from the current wiki, glossary, sources, and unresolved gaps. |
| 📚 Wiki definition | A wiki is a local content pack with metadata, navigation, Markdown content, sources, and optional images. |
| 🧩 Glossary definition | A glossary is the concept layer: canonical terms, aliases, definitions, related terms, and sources. |
| 🏠 Local-first UI | Content stays in `content/wikis/` and renders in a localhost reader. No cloud backend required. |
| ✅ Validation | Broken anchors, invalid glossary terms, missing metadata, and secret-looking files are caught before reading. |
| 🔎 Reader experience | Library shelf, wiki reader, side navigation, search-friendly structure, glossary overlay, and responsive diagrams. |
| 🧪 Reproducibility | Lint, typecheck, validation, tests, smoke test, package dry-run, audit, and GitHub Actions CI. |

---

## Quick Start

```bash
git clone https://github.com/Yvnminc/SiliWiki.git
cd SiliWiki
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

Try the live samples:

```text
http://localhost:3000/wiki/siliwiki-v1
http://localhost:3000/wiki/self-evolving-agentic-wiki
```

中文新手版：[`docs/USAGE_ZH.md`](docs/USAGE_ZH.md)

---

## Write your first AI-generated wiki

### 1. Take out the writing skill

```bash
npm run skill > siliwiki-skill.md
```

Give `siliwiki-skill.md` to your local agent.

### 2. Create an empty wiki pack

```bash
npm run new -- battery-recycling --title "Battery Recycling 101"
```

### 3. Ask your agent to write into the pack

Example prompt:

```text
Please follow the SiliWiki writer skill.
Write a beginner-friendly wiki about battery recycling.
Target folder: content/wikis/battery-recycling/
Use a glossary for important terms.
Mark uncertain facts as TODO instead of pretending they are verified.
After drafting, run npm run evolve -- battery-recycling --focus "battery recycling knowledge base".
```

### 4. Validate, evolve, and read

```bash
npm run validate
npm run evolve -- battery-recycling --focus "battery recycling knowledge base"
npm run dev
```

Open:

```text
http://localhost:3000/wiki/battery-recycling
```

---

## What exactly is a Wiki?

In SiliWiki, a **Wiki** is not a remote website. It is a small local folder that has enough structure for both humans and agents.

<p align="center">
  <img src="docs/images/diagrams/wiki-pack.svg" alt="SiliWiki wiki pack structure: meta.json, content.md, glossary.json, raw sources, images">
</p>

Equivalent file tree:

```text
content/wikis/<slug>/
├── meta.json       # title, version, summary, theme, navigation
├── content.md      # main Markdown article
├── glossary.json   # optional canonical term registry
├── raw/            # optional sources, transcripts, evidence
└── images/         # optional local images
```

This shape is intentionally boring. Boring files are easy to diff, easy to validate, easy to back up, and easy for agents to edit.

---

## What exactly is a Glossary?

A **Glossary** is the vocabulary contract for one wiki.

It prevents the same idea from being called five different names across drafts. It also gives future agents a stable concept map to build on.

<p align="center">
  <img src="docs/images/diagrams/glossary.svg" alt="SiliWiki glossary: canonical terms, aliases, definitions, related terms, and sources">
</p>

Example:

```json
{
  "slug": "glossary",
  "display": "Glossary",
  "aliases": ["term registry", "词条"],
  "category": "core",
  "short": "The canonical term registry for one wiki.",
  "definition": "A glossary standardizes terms, aliases, definitions, relationships, and sources.",
  "related": ["wiki"],
  "sources": ["raw/sources.md#design-note"]
}
```

---

## Architecture

<p align="center">
  <img src="docs/images/diagrams/architecture.svg" alt="SiliWiki architecture: human owner, agent layer, local runtime, and plain local files">
</p>

**Design choice:** SiliWiki keeps the brain of the system in visible files and visible instructions. The “AI magic” is deliberately turned into a repeatable workflow.

### Generation sequence

<p align="center">
  <img src="docs/images/diagrams/generation-sequence.svg" alt="SiliWiki generation sequence from writer skill to local reader">
</p>

### Module dependency graph

<p align="center">
  <img src="docs/images/diagrams/module-graph.svg" alt="SiliWiki module dependency graph">
</p>

> README diagrams are committed as static SVG images, not GitHub-rendered Mermaid blocks, so the public homepage renders reliably across GitHub, mobile browsers, and package mirrors.

---

## CLI reference

```bash
siliwiki dev [--port 3000]
siliwiki new <slug> [--title "My Wiki"]
siliwiki validate
siliwiki evolve <slug> [--focus "topic"] [--write] [--out content/wikis/<slug>/evolution/plan.md]
siliwiki skill [--out ./siliwiki-skill.md]
siliwiki doctor
```

NPM wrappers:

```bash
npm run dev
npm run new -- my-topic --title "My Topic"
npm run validate
npm run evolve -- my-topic --focus "self-evolving notes"
npm run skill
npm run doctor
```

---

## Agent memory references

SiliLoop is an engineering implementation, not a claim that SiliWiki reproduces the full papers. It borrows the practical patterns that are useful for local wiki maintenance:

- **Stanford-led Generative Agents** — Joon Sung Park et al., *Generative Agents: Interactive Simulacra of Human Behavior*, UIST 2023. Memory stream, retrieval by recency / importance / relevance, reflection, and planning. <https://doi.org/10.1145/3586183.3606763>
- **MemGPT** — Charles Packer et al., *MemGPT: Towards LLMs as Operating Systems*, 2023. Working context + archival memory management. <https://arxiv.org/abs/2310.08560>
- **Reflexion** — Noah Shinn et al., *Reflexion: Language Agents with Verbal Reinforcement Learning*, 2023. Verbal feedback memory for iterative improvement. <https://arxiv.org/abs/2303.11366>
- **Voyager** — Guanzhi Wang et al., *Voyager: An Open-Ended Embodied Agent with Large Language Models*, 2023. Curriculum + reusable skill library. <https://arxiv.org/abs/2305.16291>
- **Self-RAG** — Akari Asai et al., *Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection*, 2023. Retrieve / generate / critique loop. <https://arxiv.org/abs/2310.11511>

---

## Local API

When `npm run dev` is running:

| Endpoint | Description |
|---|---|
| `GET /api/health` | Health check and version. |
| `GET /api/library` | List wiki packs and summaries. |
| `GET /api/wiki/:slug` | Return metadata, Markdown content, optional glossary, and summary. |

---

## Configuration

| Variable | Default | Description |
|---|---:|---|
| `PORT` | `3000` | Local server port. |
| `HOST` | `127.0.0.1` | Local server host. Use `0.0.0.0` only when you intentionally want LAN/Tailscale access. |
| `SILIWIKI_CONTENT_DIR` | `content/wikis` | Override wiki content directory. |

---

## Testing / reproducibility

```bash
npm run lint
npm run typecheck
npm run validate
npm test
npm run build
npm run smoke
npm run pack:check
npm audit --omit=dev
```

See [`docs/TEST_RESULTS.md`](docs/TEST_RESULTS.md) for the latest recorded local run.

---

## Roadmap ideas

- Apply SiliLoop patches automatically behind a review gate.
- More writer skills for research notes, course notes, product specs, and ontology pages.
- Optional export to static HTML.
- Better glossary graph visualization.
- Theme presets for education, research, and product documentation.
- Import adapters for existing Markdown folders.

---

## Contributing

PRs are welcome. Please keep the project simple, local-first, and agent-friendly.

Before opening a PR:

```bash
npm run build
npm run smoke
npm run pack:check
```

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) and [`SECURITY.md`](SECURITY.md).

---

## License

MIT. See [`LICENSE`](LICENSE).

---

## Links

- GitHub: <https://github.com/Yvnminc/SiliWiki>
- X / Twitter: [@yvnminc](https://x.com/yvnminc)
- RedBook / 小红书: `@yvnminc`

## Support

Use GitHub Issues / Discussions for public support until official WhiteMirror contact channels are added.

# SiliWiki / 硅基笔记

<p align="center">
  <strong>把 AI 生成的内容，变成可验证、可阅读、可持续演化的本地 Wiki。</strong>
</p>

<p align="center">
  <a href="https://github.com/Yvnminc/SiliWiki/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/Yvnminc/SiliWiki/actions/workflows/ci.yml/badge.svg"></a>
  <a href="LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
  <img alt="Node.js >= 20" src="https://img.shields.io/badge/Node.js-%3E%3D20-43853d.svg">
  <img alt="Local First" src="https://img.shields.io/badge/local--first-yes-ffb703.svg">
  <img alt="Agent Harness" src="https://img.shields.io/badge/agent-harness-7c3aed.svg">
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a> ·
  <a href="docs/USAGE_ZH.md">中文小白说明</a> ·
  <a href="docs/CONTENT_SPEC.md">Content Spec</a> ·
  <a href="docs/ARCHITECTURE.md">Architecture</a>
</p>

---

## What is SiliWiki?

**SiliWiki（硅基笔记）** is a local-first wiki workbench for agent-generated knowledge.

Most AI-generated articles disappear into chat history. SiliWiki turns them into a living knowledge object:

- a **writing skill** that tells your local agent how to write;
- a **plain-file wiki pack** that humans can review in git;
- a **glossary layer** that keeps vocabulary stable;
- a **localhost reader UI** that makes the result feel like a small product, not a pile of Markdown.

> **The point:** SiliWiki is not “another note app”. It is a harness that makes agent-written knowledge structured, inspectable, local, and reusable.

Built and maintained with support from the WhiteMirror AI Team.

---

## The core loop

```mermaid
flowchart LR
    A["1. Clone SiliWiki"] --> B["2. Extract writer skill"]
    B --> C["3. Give skill to your local agent"]
    C --> D["4. Agent writes a wiki pack"]
    D --> E["5. Validate"]
    E --> F["6. Read on localhost"]
    F --> G["7. Improve with git diffs"]

    classDef action fill:#fff7ed,stroke:#c2410c,color:#7c2d12,stroke-width:1.5px;
    classDef result fill:#ecfeff,stroke:#0891b2,color:#164e63,stroke-width:1.5px;
    class A,B,C,E,F,G action;
    class D result;
```

SiliWiki separates **generation** from **ownership**. Your agent can draft, but the output lives in your local files, passes validation, and can be reviewed like normal source code.

---

## Why it matters

```mermaid
flowchart TD
    Chat["AI chat answer"] -->|usually becomes| Lost["lost context / hard to reuse"]
    Chat -->|with SiliWiki| Skill["writing skill"]
    Skill --> Pack["wiki pack"]
    Pack --> Review["human review + git history"]
    Pack --> UI["beautiful local reader"]
    Pack --> Agent["future agents reuse the same terms"]

    Lost -.->|SiliWiki prevents this| Pack

    classDef bad fill:#fee2e2,stroke:#dc2626,color:#7f1d1d;
    classDef good fill:#dcfce7,stroke:#16a34a,color:#14532d;
    classDef neutral fill:#eef2ff,stroke:#4f46e5,color:#312e81;
    class Lost bad;
    class Skill,Pack,Review,UI,Agent good;
    class Chat neutral;
```

SiliWiki is designed for people who want AI to help write serious knowledge bases without surrendering control to a cloud product or an invisible prompt chain.

---

## Features

| Area | What SiliWiki provides |
|---|---|
| 🧠 Agent harness | `npm run skill` prints the writer skill you can hand to Codex, Claude Code, OpenCode, Cursor, or another local agent. |
| 📚 Wiki definition | A wiki is a local content pack with metadata, navigation, Markdown content, sources, and optional images. |
| 🧩 Glossary definition | A glossary is the concept layer: canonical terms, aliases, definitions, related terms, and sources. |
| 🏠 Local-first UI | Content stays in `content/wikis/` and renders in a localhost reader. No cloud backend required. |
| ✅ Validation | Broken anchors, invalid glossary terms, missing metadata, and secret-looking files are caught before reading. |
| 🔎 Reader experience | Library shelf, wiki reader, side navigation, search-friendly structure, glossary overlay, and responsive diagrams. |
| 🧪 Reproducibility | Lint, typecheck, validation, tests, smoke test, package dry-run, and GitHub Actions CI. |

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

Try the live sample:

```text
http://localhost:3000/wiki/siliwiki-v1
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
```

### 4. Validate and read

```bash
npm run validate
npm run dev
```

Open:

```text
http://localhost:3000/wiki/battery-recycling
```

---

## What exactly is a Wiki?

In SiliWiki, a **Wiki** is not a remote website. It is a small local folder that has enough structure for both humans and agents.

```mermaid
flowchart TD
    W["content/wikis/&lt;slug&gt;/"] --> M["meta.json<br/>title, summary, navigation, theme"]
    W --> C["content.md<br/>main readable article"]
    W --> G["glossary.json<br/>terms, aliases, definitions"]
    W --> R["raw/sources.md<br/>notes, evidence, source log"]
    W --> I["images/<br/>optional local media"]

    classDef root fill:#111827,stroke:#111827,color:#ffffff;
    classDef file fill:#f8fafc,stroke:#475569,color:#0f172a;
    class W root;
    class M,C,G,R,I file;
```

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

```mermaid
flowchart LR
    Term["Canonical term"] --> Alias["Aliases"]
    Term --> Definition["Short + full definition"]
    Term --> Related["Related terms"]
    Term --> Sources["Source references"]
    Definition --> Reader["Reader understands faster"]
    Sources --> Reviewer["Reviewer can verify"]

    classDef term fill:#fef3c7,stroke:#d97706,color:#78350f;
    classDef node fill:#eff6ff,stroke:#2563eb,color:#1e3a8a;
    classDef outcome fill:#ecfdf5,stroke:#059669,color:#064e3b;
    class Term term;
    class Alias,Definition,Related,Sources node;
    class Reader,Reviewer outcome;
```

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

```mermaid
flowchart TD
    subgraph Human["Human knowledge owner"]
        User["User"]
        Git["Git diffs<br/>review, commit, rollback"]
    end

    subgraph AgentLayer["Agent layer"]
        Skill["SiliWiki writer skill<br/>the instruction harness"]
        Agent["Local agent<br/>Codex / Claude Code / OpenCode / Cursor"]
    end

    subgraph LocalRuntime["Local SiliWiki runtime"]
        CLI["CLI<br/>new / skill / validate / dev"]
        Validator["Validator<br/>anchors, glossary, secrets"]
        Server["Express localhost server"]
        UI["Reader UI<br/>library, nav, glossary, diagrams"]
    end

    subgraph Files["Plain local files"]
        Pack["content/wikis/&lt;slug&gt;/"]
        Templates["templates/wiki/"]
        Schemas["harness/schemas/"]
    end

    User --> CLI
    CLI --> Skill
    User --> Agent
    Skill --> Agent
    CLI --> Templates
    Templates --> Pack
    Agent -->|writes| Pack
    CLI --> Validator
    Validator -->|checks| Pack
    Server -->|reads| Pack
    UI -->|GET /api/*| Server
    User --> UI
    Pack --> Git
    Git --> User
    Schemas --> Validator

    classDef human fill:#fff7ed,stroke:#ea580c,color:#7c2d12;
    classDef agent fill:#f3e8ff,stroke:#9333ea,color:#581c87;
    classDef runtime fill:#e0f2fe,stroke:#0284c7,color:#0c4a6e;
    classDef files fill:#ecfdf5,stroke:#059669,color:#064e3b;
    class User,Git human;
    class Skill,Agent agent;
    class CLI,Validator,Server,UI runtime;
    class Pack,Templates,Schemas files;
```

**Design choice:** SiliWiki keeps the brain of the system in visible files and visible instructions. The “AI magic” is deliberately turned into a repeatable workflow.

---

## Generation sequence

```mermaid
sequenceDiagram
    actor U as User
    participant CLI as SiliWiki CLI
    participant Skill as Writer Skill
    participant A as Local Agent
    participant P as Wiki Pack Files
    participant V as Validator
    participant UI as Localhost UI

    U->>CLI: npm run skill
    CLI-->>U: siliwiki-skill.md
    U->>A: Paste skill + topic + target folder
    A->>P: Write meta.json, content.md, glossary.json, raw/sources.md
    U->>CLI: npm run validate
    CLI->>V: validate all wiki packs
    V->>P: check metadata, anchors, glossary, secret-looking files
    V-->>U: pass / actionable errors
    U->>CLI: npm run dev
    UI->>P: load generated content through local API
    UI-->>U: readable wiki with glossary and navigation
```

---

## Module dependency graph

```mermaid
graph LR
    Bin["bin/siliwiki.mjs"] --> Server["src/server.mjs"]
    Bin --> Pack["src/core/wiki-pack.mjs"]
    Bin --> Validate["src/core/validate.mjs"]
    Server --> Pack
    Validate --> Pack
    Validate --> Slug["src/core/slug.mjs"]
    Pack --> Slug
    PublicJS["public/assets/siliwiki.js"] --> API["/api/library<br/>/api/wiki/:slug"]
    PublicCSS["public/assets/siliwiki.css"] --> UI["Browser reader"]
    API --> Server
```

---

## CLI reference

```bash
siliwiki dev [--port 3000]
siliwiki new <slug> [--title "My Wiki"]
siliwiki validate
siliwiki skill [--out ./siliwiki-skill.md]
siliwiki doctor
```

NPM wrappers:

```bash
npm run dev
npm run new -- my-topic --title "My Topic"
npm run validate
npm run skill
npm run doctor
```

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
```

See [`docs/TEST_RESULTS.md`](docs/TEST_RESULTS.md) for the latest recorded local run.

---

## Roadmap ideas

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

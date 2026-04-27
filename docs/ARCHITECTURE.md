# SiliWiki Architecture

SiliWiki is intentionally small: a CLI, a local Express server, a browser UI, and plain-file content packs.

## System Architecture

```mermaid
flowchart TD
    User["User"] --> CLI["siliwiki CLI"]
    User --> Browser["Browser at localhost"]
    CLI --> Skill["skills/siliwiki-writer/SKILL.md"]
    Skill --> Agent["Local Agent"]
    Agent --> Packs["content/wikis/<slug>"]
    CLI --> Packs
    CLI --> Validator["validateAll()"]
    Browser --> API["Express API"]
    API --> Packs
    Browser --> Reader["Reader UI: nav/search/glossary/export"]
```

The content never needs to leave the user's machine. Publishing is a separate decision controlled by the repo owner.

## Request Flow

```mermaid
sequenceDiagram
    participant B as Browser
    participant S as Express Server
    participant P as Wiki Pack Files

    B->>S: GET /api/library
    S->>P: read content/wikis/*/meta.json
    S-->>B: wiki summaries
    B->>S: GET /api/wiki/demo
    S->>P: read meta.json + content.md + glossary.json
    S-->>B: JSON payload
    B->>B: render Markdown, nav, search, glossary
```

## Package Dependency Graph

```mermaid
graph LR
    CLI["bin/siliwiki.mjs"] --> Server["src/server.mjs"]
    CLI --> Pack["src/core/wiki-pack.mjs"]
    CLI --> Validate["src/core/validate.mjs"]
    Server --> Pack
    Validate --> Pack
    Validate --> Slug["src/core/slug.mjs"]
    Pack --> Slug
    PublicJS["public/assets/siliwiki.js"] --> API["/api/*"]
```

## Design choices

- **Plain files over database**: easier for local agents, diffs, and git.
- **Validation before rendering trust**: nav anchors, glossary references, and secret-looking files are checked.
- **No frontend build step**: the UI is browser ESM and CSS so installation stays simple.
- **Skill as harness**: agent behavior is constrained by a reusable skill rather than hidden prompt state.

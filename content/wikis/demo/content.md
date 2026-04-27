# SiliWiki Demo · 硅基笔记示例

This demo shows the intended loop: clone SiliWiki, hand the writing skill to a local agent, then view the agent's generated wiki on localhost.

<div class="tldr">
<strong>一句话：</strong>硅基笔记不是另一个云端 Notion；它是一个本地 Wiki UI + Agent 写作规范 harness，让用户自己的 Agent 把内容写进本地文件夹，再由 localhost 渲染。
</div>

## What is SiliWiki

SiliWiki / 硅基笔记 is a local-first wiki workbench for agent-generated knowledge. It keeps content as plain files, uses a skill to constrain how agents write, and renders everything through a consistent reader UI.

It is designed for a simple mental model:

1. Humans own the repository and localhost UI.
2. Agents own the first draft and maintenance work.
3. The content pack format keeps both sides aligned.

## Three-step loop

<div class="stat-grid">
  <div class="stat"><div class="stat-value">1</div><div class="stat-label">Clone repo</div></div>
  <div class="stat"><div class="stat-value">2</div><div class="stat-label">Give skill to agent</div></div>
  <div class="stat"><div class="stat-value">3</div><div class="stat-label">Render on localhost</div></div>
  <div class="stat"><div class="stat-value">0</div><div class="stat-label">Cloud required</div></div>
</div>

```bash
npm install
npm run skill > siliwiki-skill.md
npm run new -- my-topic --title "My Topic"
npm run dev
```

After the agent writes `content/wikis/my-topic/content.md`, `meta.json`, and optional `glossary.json`, the UI will show the wiki at `http://localhost:3000/wiki/my-topic`.

## Wiki definition

A **Wiki** in SiliWiki is a local content pack:

```text
content/wikis/<slug>/
├── meta.json       # title, version, theme, nav
├── content.md      # primary Markdown article
├── glossary.json   # optional canonical term registry
├── raw/            # optional sources, transcripts, evidence
└── images/         # optional local images
```

The wiki is not a database row and not a hosted page. It is a durable folder that a local agent can read, edit, validate, and commit.

## Glossary definition

A **Glossary** is the compression layer for terms. Each entry stores a canonical display name, aliases, short explanation, full definition, relationships, and sources.

This lets the reader understand domain language and gives the agent a stable vocabulary so it does not rename concepts every time it rewrites a section.

## Skill as harness

The included `skills/siliwiki-writer/SKILL.md` is the harness. It tells the agent:

- how to choose a slug;
- how to structure `meta.json` navigation;
- how to write source-backed Markdown;
- how to build `glossary.json`;
- how to run validation before handing work back.

In other words, the skill is the content instruction manual, while SiliWiki is the local UI and validation runtime.

## Next actions

- Run `npm run skill` and paste the skill into your local agent.
- Ask the agent to generate a new wiki under `content/wikis/<slug>`.
- Run `npm run validate` before treating the output as stable.
- Keep generated content local unless you intentionally publish the repository.

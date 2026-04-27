# Contributing to SiliWiki

Thanks for helping improve SiliWiki / 硅基笔记.

## Development setup

```bash
npm install
npm run dev
```

## Before opening a PR

```bash
npm run lint
npm run typecheck
npm run validate
npm test
npm run build
npm run smoke
```

## Content-pack rules

- Keep generated content under `content/wikis/<slug>`.
- Do not commit secrets or private user/customer data.
- Record sources in `raw/sources.md`.
- Mark uncertain claims clearly.
- Keep glossary slugs stable once created.

## Commit style

Prefer conventional commits:

- `feat: add ...`
- `fix: repair ...`
- `docs: update ...`
- `test: add ...`
- `chore: ...`

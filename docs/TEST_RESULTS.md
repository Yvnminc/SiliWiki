# Reproducible Test Results

Environment:
- Test date: 2026-04-27 19:01 AEST
- OS: macOS 26.2 (Darwin 25.2.0 arm64)
- Node version: v24.13.0
- Package manager: npm 11.6.2
- Branch: `main`
- Git base commit at test time: `c5b6758` (`docs: fix README badge rendering`)
- Working tree under test: self-evolving Agentic Wiki workflow, CLI, docs, sample wiki, logo, README SVG diagrams
- Public repo: <https://github.com/Yvnminc/SiliWiki>

Commands:

```bash
git diff --check
node --test test/self-evolving-content.test.mjs test/cli-evolve.test.mjs
npm test
npm run validate
npm run build
npm run smoke
npm run pack:check
npm audit --omit=dev
# Additional repository-wide secret scan for token/key/JWT/connection-string/Tailscale/Telegram patterns.
```

Results:
- Targeted self-evolving regression tests: pass — 4 tests, 4 pass, 0 fail.
- Unit/regression tests: pass — 19 tests, 19 pass, 0 fail.
- Content validation: pass — 3 wiki packs validate successfully with 0 errors and 0 warnings:
  - `demo`
  - `self-evolving-agentic-wiki`
  - `siliwiki-v1`
- Build gate: pass — `npm run build` completed `validate` + full test suite successfully.
- Server smoke: pass — local smoke server served health, library (`3` wiki packs), and demo wiki.
- Package smoke: pass — `npm run pack:check` completed `npm pack --dry-run`; package includes 49 files, including:
  - `content/wikis/siliwiki-v1/`
  - `content/wikis/self-evolving-agentic-wiki/`
  - `skills/siliwiki-writer/SKILL.md`
  - `harness/schemas/*`
  - README SVG diagram assets under `docs/images/diagrams/`
  - SiliWiki logo assets under `public/assets/` and `docs/images/`
- Security dependency check: pass — `npm audit --omit=dev` reports `found 0 vulnerabilities`.
- Secret scan: pass — 72 text files scanned; no findings for private keys, GitHub/OpenAI/Slack tokens, JWTs, database/Redis connection strings, Tailscale IPs, or numeric Telegram targets.
- CLI evolve smoke: pass — `siliwiki evolve <slug>` can emit a self-evolution plan, `--write` writes the default local plan path, and `--out` writes an explicit plan path.

Representative output:

```text
✔ CLI help documents both default --write and explicit --out evolve modes
✔ CLI evolve emits and writes a self-evolution plan for a wiki
✔ makeEvolutionMemoryStream extracts observable wiki memories with scores
✔ analyzeWikiEvolution returns prioritized self-evolution actions
✔ self-evolving Agentic Wiki documentation explains SiliLoop with verifiable references
✔ self-evolving sample wiki is a complete, source-backed live content pack
✔ npm package includes the live V1 sample wiki and agent harness assets
✔ server exposes health, library, and demo wiki APIs
ℹ tests 19
ℹ pass 19
ℹ fail 0

SiliWiki validation
wikis: 3
summary: 0 error(s), 0 warning(s)

smoke ok: http://127.0.0.1:<ephemeral-port> served health, library (3), demo wiki
found 0 vulnerabilities
```

Local browser verification:

```text
URL: http://127.0.0.1:3124/wiki/self-evolving-agentic-wiki
Page title: SiliWiki / 硅基笔记
Reader shell: NTU-style local SiliWiki reader
Expected content: self-evolving Agentic Wiki sample pack, SiliLoop diagram, glossary, references, evolution plan
```

Public GitHub page verification:

```text
To be checked after pushing this commit:
- README logo PNG loads with non-zero naturalWidth/naturalHeight.
- README static SVG diagrams under docs/images/diagrams/ load with non-zero naturalWidth/naturalHeight.
- Node badge still renders as "Node.js 20+".
- Links to docs/SELF_EVOLVING_AGENTIC_WIKI.md and the sample wiki content are valid.
```

Known limitations:
- This is a local-first open-source project. It has not been published to npm, GitHub Releases, PyPI, Docker Hub, or any public package registry.
- The current self-evolution implementation generates a human-reviewable plan; it does not autonomously rewrite user content without an agent/human applying and validating a patch.
- Mermaid authoring is supported through a lightweight local Mermaid-lite SVG renderer for the current flowchart/sequence patterns; the external Mermaid npm dependency is intentionally avoided because it previously introduced audit risk.
- Advanced in-browser editing/collaboration is future work. The current loop is: user topic → local AI assistant follows the SiliWiki writer skill → SiliWiki validates and renders the local wiki → `siliwiki evolve` creates the next maintenance plan.

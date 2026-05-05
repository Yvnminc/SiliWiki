# Reproducible Test Results

Environment:
- Test date: 2026-05-06 09:54 AEST
- OS: macOS / Darwin 25.2.0 arm64
- Node version: v24.13.0
- Package manager: npm 11.6.2
- Branch: `main`
- Git base commit at test time: `77268e1`
- Working tree under test: bottom-right AI Q&A assistant, DeepSeek-compatible server proxy, reader UI, docs, and regression tests
- Public repo: <https://github.com/Yvnminc/SiliWiki>
- Hosted demo: <https://siliwiki.vercel.app/wiki/self-evolving-agentic-wiki>

Commands:

```bash
git diff --check
npm test
npm run validate
npm run build
npm run smoke
npm run pack:check
npm audit --omit=dev
# Additional repository secret scan for token/key/JWT/private-key/connection-string/Tailscale patterns.
```

Results:
- Diff whitespace check: pass.
- Unit/regression tests: pass — 22 tests, 22 pass, 0 fail.
- AI assistant server regressions: pass — missing `DEEPSEEK_API_KEY` returns a graceful JSON error without calling upstream; mocked DeepSeek-compatible chat completions receive the current wiki context and model.
- AI assistant UI regression: pass — bundled reader includes bottom-right widget markup, `/api/ai/ask` fetch path, Markdown rendering, sanitizer, and bottom-right CSS.
- Content validation: pass — 4 wiki packs validate successfully with 0 errors and 0 warnings:
  - `agentic-lca`
  - `demo`
  - `self-evolving-agentic-wiki`
  - `siliwiki-v1`
- Build gate: pass — `npm run build` completed lint, typecheck, validation, and full test suite successfully.
- Server smoke: pass — local smoke server served health, library (`4` wiki packs), and demo wiki.
- Package smoke: pass — `npm run pack:check` completed `npm pack --dry-run`; package includes 49 files, including:
  - `content/wikis/demo/`
  - `content/wikis/siliwiki-v1/`
  - `content/wikis/self-evolving-agentic-wiki/`
  - `skills/siliwiki-writer/SKILL.md`
  - `harness/schemas/*`
  - README SVG diagram assets under `docs/images/diagrams/`
  - SiliWiki logo assets under `public/assets/` and `docs/images/`
- Security dependency check: pass — `npm audit --omit=dev` reports `found 0 vulnerabilities`.
- Secret scan: pass — 78 text files scanned; no findings for private keys, GitHub/OpenAI/Slack tokens, JWTs, database/Redis connection strings, Tailscale IPs, or secret assignments.

Representative output:

```text
✔ reader UI bundles the bottom-right AI assistant widget
✔ server exposes health, library, and demo wiki APIs
✔ AI assistant reports missing DeepSeek API key without calling upstream
✔ AI assistant proxies wiki context to DeepSeek-compatible chat completions
ℹ tests 22
ℹ pass 22
ℹ fail 0

SiliWiki validation
wikis: 4
summary: 0 error(s), 0 warning(s)

lint ok: 22 JavaScript files passed node --check
typecheck ok: public ESM modules import successfully
smoke ok: http://127.0.0.1:<ephemeral-port> served health, library (4), demo wiki
found 0 vulnerabilities
```

Manual browser verification before deploy:

```text
Local URL: http://127.0.0.1:3000/wiki/demo
Reader shell: NTU-style SiliWiki reader
AI widget: visible as a bottom-right "AI 问答助手" launcher
Expanded panel: compact chat panel with DeepSeek v4 flash label, Markdown-capable messages, input box, and send button
Console: no JavaScript errors observed
```

Known limitations:
- `DEEPSEEK_API_KEY` must be configured only in the server/Vercel environment for live answers. The key is never committed and never sent to the browser.
- The assistant uses the current wiki Markdown and glossary excerpt as prompt context, capped for request size; very long wikis may require retrieval/chunking in a future version.
- This is a local-first open-source project. It has not been published to npm, GitHub Releases, PyPI, Docker Hub, or any public package registry.
- The current self-evolution implementation generates a human-reviewable plan; it does not autonomously rewrite user content without an agent/human applying and validating a patch.
- Mermaid authoring is supported through a lightweight local Mermaid-lite SVG renderer for the current flowchart/sequence patterns; the external Mermaid npm dependency is intentionally avoided because it previously introduced audit risk.

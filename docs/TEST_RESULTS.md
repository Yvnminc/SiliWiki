# Reproducible Test Results

Environment:
- Test date: 2026-04-27 16:30 AEST
- OS: macOS 26.2 (Darwin 25.2.0 arm64, `DigitalYanndeMac-mini.local`)
- Node version: v24.13.0
- Package manager: npm 11.6.2
- Git base commit at test time: `92ae47a` (`fix: use NTU wiki reader UI shell`)
- Working tree under test: pending commit for NTU-style SiliWiki V1 diagram/content updates

Commands:

```bash
npm test -- test/v1-guide.test.mjs
npm test
npm run validate
npm run build
npm run smoke
npm run pack:check
npm audit --omit=dev
curl -sS http://127.0.0.1:3123/api/health
curl -sS --max-time 5 http://100.77.32.114:3123/api/health
```

Browser verification:

```text
URL: http://127.0.0.1:3123/wiki/siliwiki-v1#system-architecture
Tailscale URL: http://100.77.32.114:3123/wiki/siliwiki-v1
Document title: SiliWiki / 硅基笔记
Rendered figures: 7
Rendered SVG diagrams: 7
Raw Mermaid code blocks left in page: 0
Stale old diagram classes found: []
Browser console messages: 0
Browser JavaScript errors: 0
```

Results:
- V1 regression test: pass — `test/v1-guide.test.mjs` verifies NTU-style Mermaid/SVG figure rendering and blocks the old HTML card diagram classes.
- Package file-list regression test: pass — `test/package-files.test.mjs` verifies the npm package ships the live SiliWiki V1 sample, docs, skill, and harness assets.
- Unit tests: pass — 11 tests, 11 pass, 0 fail.
- Content validation: pass — wiki packs validate successfully.
- Lint/typecheck/build: pass — `npm run build` completed successfully.
- Server smoke: pass — local server health/API checks pass.
- Package smoke: pass — `npm run pack:check` completed via `npm pack --dry-run`; package includes both `demo` and `siliwiki-v1` wiki folders (32 files, ~46.3 kB tarball).
- Security dependency check: pass — `npm audit --omit=dev` reports 0 known vulnerabilities.
- Tailscale smoke: pass — `http://100.77.32.114:3123/api/health` returned `{"ok":true,"name":"siliwiki","version":"0.1.0"...}`.
- Browser smoke: pass — SiliWiki V1 renders the NTU-style reader shell and the 3.1 architecture section as a cream/left-accent SVG flowchart figure, with no console errors.
- Screenshot delivery: pass — a cropped 1280×1800 Telegram-compatible screenshot of the new 3.1 architecture figure was sent as real Telegram media.

Known limitations:
- This is a local-first open-source project scaffold. It has not been published to npm, GitHub Releases, PyPI, Docker Hub, or any public package registry.
- No GitHub remote or public repository was created as part of this work.
- Mermaid authoring is supported through a lightweight local Mermaid-lite SVG renderer for the current flowchart/sequence patterns; it intentionally avoids the external Mermaid npm dependency because that previously introduced audit risk.
- Advanced in-browser editing/collaboration is future work; the current V1 loop is: user topic → AI assistant writes local files from the skill → SiliWiki validates and renders the local wiki.

# Reproducible Test Results

Environment:
- Test date: 2026-04-27 17:20 AEST
- OS: macOS 26.2 (Darwin 25.2.0 arm64)
- Node version: v24.13.0
- Package manager: npm 11.6.2
- Git base commit at test time: `3b5ea2a` (`fix: render NTU-style SiliWiki diagrams`)
- Working tree under test: pending commit for mobile-responsive Mermaid-lite/SVG diagram fixes

Commands:

```bash
git diff --check
npm test -- test/mobile-diagram.test.mjs
npm test
npm run validate
npm run build
npm run smoke
npm run pack:check
npm audit --omit=dev
curl -sS --max-time 5 http://127.0.0.1:3123/api/health
curl -sS --max-time 5 http://<tailscale-ip>:3123/api/health
```

Browser verification:

```text
Desktop URL: http://127.0.0.1:3123/wiki/siliwiki-v1#system-architecture
Tailscale URL: http://<tailscale-ip>:3123/wiki/siliwiki-v1
Document title: SiliWiki / 硅基笔记
Rendered figures: 7
Rendered SVG diagrams: 7
Raw Mermaid code blocks left in page: 0
Stale old diagram classes found: []
Browser console messages: 0
Browser JavaScript errors: 0
```

Mobile verification:

```text
Method: browser-hosted 390px-wide iframe preview of /wiki/siliwiki-v1
Screenshot: 1280×1400 Telegram-compatible image sent as real Telegram media
iframeInnerWidth: 390
docClient: 390
docScroll: 390
layout: mobile
mainOverflow: visible
preClient: 357
preScroll: 357
svgWidth: 329
svgHeight: 785
viewBox: 0 0 342 816
Visual result: first Mermaid-lite/SVG figure renders as a compact vertical flowchart, with no large blank cropped canvas and no right-side node cut-off.
```

Results:
- Mobile diagram regression test: pass — `test/mobile-diagram.test.mjs` verifies SVG figures do not keep a fixed desktop canvas on mobile, mobile `main` does not clip diagrams, sequence diagrams avoid fixed desktop min-width, and the renderer exposes `data-layout="mobile"` for compact layouts.
- V1 regression test: pass — `test/v1-guide.test.mjs` verifies NTU-style Mermaid/SVG figure rendering and blocks the old HTML card diagram classes.
- Package file-list regression test: pass — `test/package-files.test.mjs` verifies the npm package ships the live SiliWiki V1 sample, docs, skill, and harness assets.
- Unit tests: pass — 12 tests, 12 pass, 0 fail.
- Content validation: pass — 2 wiki packs validate successfully with 0 errors and 0 warnings.
- Lint/typecheck/build: pass — `npm run build` completed successfully.
- Server smoke: pass — local server health/API checks pass.
- Package smoke: pass — `npm run pack:check` completed via `npm pack --dry-run`; package includes both `demo` and `siliwiki-v1` wiki folders (32 files, ~47.2 kB tarball).
- Security dependency check: pass — `npm audit --omit=dev` reports 0 known vulnerabilities.
- Local health check: pass — `http://127.0.0.1:3123/api/health` returned `{"ok":true,"name":"siliwiki","version":"0.1.0","contentDir":"/Users/yann/github/siliwiki/content/wikis"}`.
- Tailscale smoke: pass — `http://<tailscale-ip>:3123/api/health` returned `{"ok":true,"name":"siliwiki","version":"0.1.0","contentDir":"/Users/yann/github/siliwiki/content/wikis"}`. The concrete Tailscale IP is intentionally omitted from repository docs; share it privately when needed.
- Browser smoke: pass — SiliWiki V1 renders the NTU-style reader shell and Mermaid-lite/SVG figures, including the mobile compact layout, with no console errors.
- Screenshot delivery: pass — a 1280×1400 Telegram-compatible mobile verification screenshot was sent as real Telegram media.

Known limitations:
- This is a local-first open-source project scaffold. It has not been published to npm, GitHub Releases, PyPI, Docker Hub, or any public package registry.
- No GitHub remote or public repository was created as part of this work.
- Mermaid authoring is supported through a lightweight local Mermaid-lite SVG renderer for the current flowchart/sequence patterns; it intentionally avoids the external Mermaid npm dependency because that previously introduced audit risk.
- Advanced in-browser editing/collaboration is future work; the current V1 loop is: user topic → AI assistant writes local files from the skill → SiliWiki validates and renders the local wiki.

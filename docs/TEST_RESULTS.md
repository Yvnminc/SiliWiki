# Reproducible Test Results

Environment:
- OS: Darwin DigitalYanndeMac-mini.local 25.2.0 arm64 (macOS / Darwin Kernel Version 25.2.0)
- Node version: v24.13.0
- Package manager: npm 11.6.2
- Commit: initial local scaffold before first commit (`git status`: no commits yet on `main` at test time)

Commands:

```bash
npm install
npm run lint
npm run typecheck
npm run validate
npm test
npm run build
npm run smoke
npm run pack:check
npm run doctor
npm run dev -- --port 3123
```

Results:
- Install: pass — 70 packages installed, 0 vulnerabilities.
- Lint: pass — 13 JavaScript files passed `node --check`.
- Typecheck: pass — public ESM modules imported successfully.
- Content validation: pass — 2 wiki packs (`demo`, `siliwiki-v1`), 0 errors, 0 warnings.
- Unit tests: pass — 8 tests, 8 pass, 0 fail.
- Build: pass — lint + typecheck + validate + tests all passed.
- Package smoke: pass — `npm run pack:check` produced `siliwiki-0.1.0.tgz`, 28 packaged files, package size ~27.0 kB.
- Server smoke: pass — local server served health, library (2 wiki packs), and demo wiki API.
- Doctor: pass — Node >= 20, content dir exists, wiki packs validate.
- Browser smoke: pass — `http://localhost:3123` rendered the shelf; `/wiki/siliwiki-v1` rendered reader UI, glossary overlay, navigation, diagrams, and no browser console errors.
- Security scan: pass — no secret-looking files or token patterns found outside `node_modules` / `.git`.

Known limitations:
- This is an initial local-first implementation. It does not publish to npm, create a GitHub Release, or configure a remote repository.
- The browser UI intentionally avoids a frontend build system. Advanced editor features are future work.
- Mermaid diagrams are documented in Markdown docs; the runtime V1 guide uses HTML/CSS diagrams so they render without a frontend build step.

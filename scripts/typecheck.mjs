#!/usr/bin/env node
// SiliWiki is dependency-light JavaScript ESM. This command performs a runtime
// import/type-surface check without introducing a TypeScript build step.
import '../src/core/slug.mjs';
import '../src/core/wiki-pack.mjs';
import '../src/core/validate.mjs';
import '../src/server.mjs';
console.log('typecheck ok: public ESM modules import successfully');

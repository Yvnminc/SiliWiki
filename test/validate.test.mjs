import test from 'node:test';
import assert from 'node:assert/strict';
import fsp from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { validateAll, extractIdsFromMarkdown } from '../src/core/validate.mjs';

async function tempContent() {
  const dir = await fsp.mkdtemp(path.join(os.tmpdir(), 'siliwiki-'));
  const contentDir = path.join(dir, 'content', 'wikis');
  await fsp.mkdir(contentDir, { recursive: true });
  return { dir, contentDir };
}

async function writePack(contentDir, slug, meta, content, glossary = null) {
  const packDir = path.join(contentDir, slug);
  await fsp.mkdir(packDir, { recursive: true });
  await fsp.writeFile(path.join(packDir, 'meta.json'), JSON.stringify(meta, null, 2));
  await fsp.writeFile(path.join(packDir, 'content.md'), content);
  if (glossary) await fsp.writeFile(path.join(packDir, 'glossary.json'), JSON.stringify(glossary, null, 2));
  return packDir;
}

test('extracts generated and explicit markdown ids', () => {
  const ids = extractIdsFromMarkdown('# Title\n\n## Section One\n\n<h2 id="custom">X</h2>\n\n### Manual {#manual-id}');
  assert.equal(ids.has('title'), true);
  assert.equal(ids.has('section-one'), true);
  assert.equal(ids.has('custom'), true);
  assert.equal(ids.has('manual-id'), true);
});

test('valid wiki pack passes validation', async () => {
  const { contentDir } = await tempContent();
  await writePack(contentDir, 'good', {
    slug: 'good', title: 'Good Wiki', nav: [{ title: 'Start', children: [{ title: 'Intro', anchor: 'intro' }] }]
  }, '# Good Wiki\n\n## Intro\n\nHello Glossary.', {
    categories: [{ key: 'core', title: 'Core' }],
    keywords: [{ slug: 'glossary', display: 'Glossary', category: 'core', aliases: ['词条'], short: 'terms', definition: 'Canonical terms.' }]
  });
  const report = await validateAll({ contentDir });
  assert.equal(report.errors.length, 0, JSON.stringify(report.errors));
});

test('missing nav anchors and secret files fail validation', async () => {
  const { contentDir } = await tempContent();
  const packDir = await writePack(contentDir, 'bad', {
    slug: 'bad', title: 'Bad Wiki', nav: [{ title: 'Missing', children: [{ title: 'Nope', anchor: 'nope' }] }]
  }, '# Bad Wiki\n\n## Intro\n');
  await fsp.writeFile(path.join(packDir, '.env'), 'LOCAL_ONLY=placeholder');
  const report = await validateAll({ contentDir });
  assert.equal(report.errors.some(e => e.code === 'nav-anchor-missing'), true);
  assert.equal(report.errors.some(e => e.code === 'secret-file'), true);
});

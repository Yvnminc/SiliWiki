import test from 'node:test';
import assert from 'node:assert/strict';
import fsp from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createWikiPack, readWikiPack, listWikiPacks } from '../src/core/wiki-pack.mjs';

test('creates a wiki from templates and reads it back', async () => {
  const tempRoot = await fsp.mkdtemp(path.join(os.tmpdir(), 'siliwiki-create-'));
  const contentDir = path.join(tempRoot, 'content', 'wikis');
  const templateDir = path.resolve('templates/wiki');
  const created = await createWikiPack('agent-notes', { contentDir, templateDir, title: 'Agent Notes', date: '2026-04-27' });
  assert.equal(created.slug, 'agent-notes');
  const pack = await readWikiPack('agent-notes', { contentDir });
  assert.equal(pack.meta.title, 'Agent Notes');
  assert.match(pack.content, /Agent Notes/);
  const packs = await listWikiPacks({ contentDir });
  assert.equal(packs.length, 1);
  assert.equal(packs[0].slug, 'agent-notes');
});

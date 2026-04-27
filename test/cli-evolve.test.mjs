import test from 'node:test';
import assert from 'node:assert/strict';
import fsp from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(new URL('..', import.meta.url).pathname);

test('CLI help documents both default --write and explicit --out evolve modes', () => {
  const result = spawnSync(process.execPath, ['bin/siliwiki.mjs', 'help'], { cwd: root, encoding: 'utf8' });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /siliwiki evolve <slug> \[--focus "topic"\] \[--write\] \[--out content\/wikis\/<slug>\/evolution\/plan\.md\]/);
});

test('CLI evolve emits and writes a self-evolution plan for a wiki', async () => {
  const tempDir = await fsp.mkdtemp(path.join(os.tmpdir(), 'siliwiki-evolve-cli-'));
  const outPath = path.join(tempDir, 'plan.md');
  const result = spawnSync(process.execPath, [
    'bin/siliwiki.mjs',
    'evolve',
    'demo',
    '--focus',
    'agent memory',
    '--out',
    outPath
  ], { cwd: root, encoding: 'utf8' });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /wrote/);
  const markdown = await fsp.readFile(outPath, 'utf8');
  assert.match(markdown, /# Self-Evolution Plan/);
  assert.match(markdown, /SiliLoop/);
  assert.match(markdown, /Generative Agents/);
});

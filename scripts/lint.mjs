#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import fsp from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve(import.meta.dirname, '..');
const skip = new Set(['node_modules', '.git', 'coverage', 'dist', 'build']);
const files = [];

async function walk(dir) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (skip.has(entry.name)) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(p);
    else if (/\.(mjs|js)$/.test(entry.name)) files.push(p);
  }
}

await walk(root);
let failed = 0;
for (const file of files) {
  const rel = path.relative(root, file);
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (result.status !== 0) {
    failed++;
    console.error(`syntax fail: ${rel}`);
    console.error(result.stderr || result.stdout);
  }
}
if (failed) process.exit(1);
console.log(`lint ok: ${files.length} JavaScript files passed node --check`);

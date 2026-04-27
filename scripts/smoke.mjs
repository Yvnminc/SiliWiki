#!/usr/bin/env node
import { startServer } from '../src/server.mjs';

const server = await startServer({ port: 0, silent: true });
const address = server.address();
const port = typeof address === 'object' && address ? address.port : 0;
const base = `http://127.0.0.1:${port}`;
try {
  const health = await fetch(`${base}/api/health`).then(r => r.json());
  if (!health.ok) throw new Error('health endpoint not ok');
  const library = await fetch(`${base}/api/library`).then(r => r.json());
  if (!Array.isArray(library.wikis)) throw new Error('library.wikis is not an array');
  const demo = await fetch(`${base}/api/wiki/demo`).then(r => r.json());
  if (!demo.content || !demo.meta?.title) throw new Error('demo wiki did not load');
  console.log(`smoke ok: ${base} served health, library (${library.wikis.length}), demo wiki`);
} finally {
  await new Promise(resolve => server.close(resolve));
}

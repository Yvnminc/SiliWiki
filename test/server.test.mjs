import test from 'node:test';
import assert from 'node:assert/strict';
import { startServer } from '../src/server.mjs';

test('server exposes health, library, and demo wiki APIs', async () => {
  const server = await startServer({ port: 0, silent: true });
  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : 0;
  const base = `http://127.0.0.1:${port}`;
  try {
    const health = await fetch(`${base}/api/health`).then(r => r.json());
    assert.equal(health.ok, true);
    const library = await fetch(`${base}/api/library`).then(r => r.json());
    assert.equal(Array.isArray(library.wikis), true);
    assert.equal(library.wikis.some(w => w.slug === 'demo'), true);
    const demo = await fetch(`${base}/api/wiki/demo`).then(r => r.json());
    assert.equal(demo.slug, 'demo');
    assert.match(demo.content, /SiliWiki/);
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});

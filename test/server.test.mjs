import test from 'node:test';
import assert from 'node:assert/strict';
import { startServer } from '../src/server.mjs';

async function withServer(options, run) {
  const server = await startServer({ port: 0, silent: true, ...options });
  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : 0;
  const base = `http://127.0.0.1:${port}`;
  try {
    return await run(base);
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
}

test('server exposes health, library, and demo wiki APIs', async () => {
  await withServer({}, async base => {
    const health = await fetch(`${base}/api/health`).then(r => r.json());
    assert.equal(health.ok, true);
    assert.equal(typeof health.aiAssistant.configured, 'boolean');
    const library = await fetch(`${base}/api/library`).then(r => r.json());
    assert.equal(Array.isArray(library.wikis), true);
    assert.equal(library.wikis.some(w => w.slug === 'demo'), true);
    const demo = await fetch(`${base}/api/wiki/demo`).then(r => r.json());
    assert.equal(demo.slug, 'demo');
    assert.match(demo.content, /SiliWiki/);
  });
});

test('AI assistant reports missing DeepSeek API key without calling upstream', async () => {
  let called = false;
  await withServer({
    env: { DEEPSEEK_API_KEY: '' },
    fetch: async () => { called = true; throw new Error('should not call upstream without key'); }
  }, async base => {
    const response = await fetch(`${base}/api/ai/ask`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ slug: 'demo', question: 'What is this wiki?' })
    });
    const payload = await response.json();
    assert.equal(response.status, 503);
    assert.equal(payload.code, 'missing_api_key');
    assert.equal(called, false);
  });
});

test('AI assistant proxies wiki context to DeepSeek-compatible chat completions', async () => {
  let upstreamUrl = '';
  let upstreamBody;
  await withServer({
    env: {
      DEEPSEEK_API_KEY: 'test-secret-key',
      DEEPSEEK_BASE_URL: 'https://deepseek.example/v1',
      DEEPSEEK_MODEL: 'deepseek-v4-flash'
    },
    fetch: async (url, init) => {
      upstreamUrl = String(url);
      assert.equal(init.method, 'POST');
      assert.equal(init.headers.authorization, 'Bearer test-secret-key');
      upstreamBody = JSON.parse(init.body);
      return new Response(JSON.stringify({
        choices: [{ message: { content: '**SiliWiki** is a local-first wiki reader.' } }],
        usage: { total_tokens: 42 }
      }), { status: 200, headers: { 'content-type': 'application/json' } });
    }
  }, async base => {
    const response = await fetch(`${base}/api/ai/ask`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ slug: 'demo', question: 'What is SiliWiki?', history: [{ role: 'user', content: 'hello' }] })
    });
    const payload = await response.json();
    assert.equal(response.status, 200);
    assert.equal(payload.model, 'deepseek-v4-flash');
    assert.match(payload.answer, /SiliWiki/);
  });
  assert.equal(upstreamUrl, 'https://deepseek.example/v1/chat/completions');
  assert.equal(upstreamBody.model, 'deepseek-v4-flash');
  assert.equal(upstreamBody.stream, false);
  assert.equal(upstreamBody.messages.some(message => /Wiki Markdown context/.test(message.content)), true);
  assert.equal(upstreamBody.messages.some(message => /User question: What is SiliWiki\?/.test(message.content)), true);
});

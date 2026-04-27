import express from 'express';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { listWikiPacks, readWikiPack, PROJECT_ROOT, getContentDir } from './core/wiki-pack.mjs';
import { assertValidSlug } from './core/slug.mjs';

const require = createRequire(import.meta.url);
const SERVER_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function resolveMarkedEsm() {
  try {
    return path.join(path.dirname(require.resolve('marked/package.json')), 'lib', 'marked.esm.js');
  } catch {
    return null;
  }
}

export function createServer(options = {}) {
  const root = options.root || PROJECT_ROOT || SERVER_ROOT;
  const contentDir = options.contentDir || getContentDir(root);
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, name: 'siliwiki', version: '0.1.0', contentDir });
  });

  app.get('/api/library', async (_req, res) => {
    try {
      const wikis = await listWikiPacks({ contentDir });
      res.json({ wikis });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/wiki/:slug', async (req, res) => {
    try {
      const slug = assertValidSlug(req.params.slug);
      const pack = await readWikiPack(slug, { contentDir });
      res.json({ slug, meta: pack.meta, content: pack.content, glossary: pack.glossary, summary: pack.summary });
    } catch (error) {
      const status = /slug|outside/.test(error.message) ? 400 : 404;
      res.status(status).json({ error: error.message });
    }
  });

  app.get('/vendor/marked.esm.js', (_req, res) => {
    const markedPath = resolveMarkedEsm();
    if (!markedPath) {
      res.status(500).type('text/javascript').send('export const marked = { parse: (s) => s };');
      return;
    }
    res.type('text/javascript');
    res.sendFile(markedPath);
  });

  app.use('/content', express.static(path.join(root, 'content'), {
    fallthrough: false,
    setHeaders: (res) => res.setHeader('Cache-Control', 'no-cache')
  }));

  app.use(express.static(path.join(root, 'public'), {
    extensions: ['html'],
    setHeaders: (res) => res.setHeader('Cache-Control', 'no-cache')
  }));

  app.get(['/wiki/:slug', '/wiki/:slug/*'], (_req, res) => {
    res.sendFile(path.join(root, 'public', 'index.html'));
  });

  return app;
}

export function startServer(options = {}) {
  const port = Number(options.port ?? process.env.PORT ?? 3000);
  const host = options.host || process.env.HOST || '127.0.0.1';
  const app = createServer(options);
  return new Promise((resolve, reject) => {
    const server = app.listen(port, host, () => {
      if (!options.silent) {
        const address = server.address();
        const actualPort = typeof address === 'object' && address ? address.port : port;
        console.log(`\nSiliWiki / 硅基笔记`);
        console.log(`───────────────`);
        console.log(`Local UI:  http://localhost:${actualPort}`);
        console.log(`API:       http://localhost:${actualPort}/api/health`);
        console.log(`Content:   ${options.contentDir || getContentDir(options.root || PROJECT_ROOT)}\n`);
      }
      resolve(server);
    });
    server.on('error', reject);
  });
}

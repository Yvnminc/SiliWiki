import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assertValidSlug, titleFromSlug } from './slug.mjs';

export const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

export function getContentDir(root = PROJECT_ROOT) {
  return process.env.SILIWIKI_CONTENT_DIR || path.join(root, 'content', 'wikis');
}

export function getTemplateDir(root = PROJECT_ROOT) {
  return path.join(root, 'templates', 'wiki');
}

export async function pathExists(p) {
  try {
    await fsp.access(p);
    return true;
  } catch {
    return false;
  }
}

export async function readJson(filePath) {
  const raw = await fsp.readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

export function safePackDir(contentDir, slug) {
  assertValidSlug(slug);
  const resolved = path.resolve(contentDir, slug);
  const base = path.resolve(contentDir) + path.sep;
  if (!resolved.startsWith(base)) {
    throw new Error(`refusing to access path outside content dir: ${slug}`);
  }
  return resolved;
}

async function readOptionalJson(filePath) {
  if (!(await pathExists(filePath))) return null;
  return readJson(filePath);
}

function countHeadings(markdown) {
  const matches = markdown.match(/^#{1,6}\s+/gm);
  return matches ? matches.length : 0;
}

function countWords(markdown) {
  const text = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/[#>*_`\[\]()|:-]/g, ' ');
  const tokens = text.trim().split(/\s+/).filter(Boolean);
  return tokens.length;
}

function summarize(slug, meta, content, glossary) {
  return {
    slug,
    title: meta.title || titleFromSlug(slug),
    sub: meta.sub || '',
    description: meta.description || meta.disclaimer || '',
    version: meta.version || '',
    updated: meta.updated || '',
    accent: meta.accent || '#5b3df5',
    logoText: meta.logoText || slug.slice(0, 3).toUpperCase(),
    counts: {
      headings: countHeadings(content),
      words: countWords(content),
      glossaryTerms: Array.isArray(glossary?.keywords) ? glossary.keywords.length : 0,
      glossaryCategories: Array.isArray(glossary?.categories) ? glossary.categories.length : 0
    }
  };
}

export async function readWikiPack(slug, options = {}) {
  const contentDir = options.contentDir || getContentDir(options.root || PROJECT_ROOT);
  const dir = safePackDir(contentDir, slug);
  const [meta, content] = await Promise.all([
    readJson(path.join(dir, 'meta.json')),
    fsp.readFile(path.join(dir, 'content.md'), 'utf8')
  ]);
  const glossary = await readOptionalJson(path.join(dir, 'glossary.json'));
  return {
    slug,
    dir,
    meta,
    content,
    glossary,
    summary: summarize(slug, meta, content, glossary)
  };
}

export async function listWikiPacks(options = {}) {
  const contentDir = options.contentDir || getContentDir(options.root || PROJECT_ROOT);
  if (!(await pathExists(contentDir))) return [];
  const entries = await fsp.readdir(contentDir, { withFileTypes: true });
  const packs = [];
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith('.') || entry.name.startsWith('_')) continue;
    if (!/^[a-z0-9][a-z0-9-]*$/.test(entry.name)) continue;
    const dir = path.join(contentDir, entry.name);
    if (!(await pathExists(path.join(dir, 'meta.json'))) || !(await pathExists(path.join(dir, 'content.md')))) continue;
    try {
      const pack = await readWikiPack(entry.name, { contentDir });
      packs.push(pack.summary);
    } catch (error) {
      packs.push({ slug: entry.name, title: entry.name, error: error.message, counts: {} });
    }
  }
  packs.sort((a, b) => String(b.updated || '').localeCompare(String(a.updated || '')) || a.slug.localeCompare(b.slug));
  return packs;
}

async function copyDirWithTemplates(src, dst, vars) {
  await fsp.mkdir(dst, { recursive: true });
  const entries = await fsp.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const from = path.join(src, entry.name);
    const to = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      await copyDirWithTemplates(from, to, vars);
    } else {
      let content = await fsp.readFile(from, 'utf8');
      content = renderTemplate(content, vars);
      await fsp.mkdir(path.dirname(to), { recursive: true });
      await fsp.writeFile(to, content);
    }
  }
}

export function renderTemplate(content, vars) {
  return String(content).replace(/\{\{([A-Z0-9_]+)\}\}/g, (_, key) => String(vars[key] ?? ''));
}

export async function createWikiPack(slug, options = {}) {
  assertValidSlug(slug);
  const root = options.root || PROJECT_ROOT;
  const contentDir = options.contentDir || getContentDir(root);
  const templateDir = options.templateDir || getTemplateDir(root);
  const dest = safePackDir(contentDir, slug);
  if (await pathExists(dest)) {
    throw new Error(`wiki already exists: ${slug}`);
  }
  if (!(await pathExists(templateDir))) {
    throw new Error(`template missing: ${templateDir}`);
  }
  const today = options.date || new Date().toISOString().slice(0, 10);
  const title = options.title || `${titleFromSlug(slug)} Wiki`;
  const vars = {
    SLUG: slug,
    TITLE: title,
    TITLE_UPPER: title.toUpperCase(),
    LOGO: slug.slice(0, 3).toUpperCase(),
    DATE: today
  };
  await copyDirWithTemplates(templateDir, dest, vars);
  return { slug, dir: dest, title };
}

export async function ensureProjectScaffold(root = PROJECT_ROOT) {
  await fsp.mkdir(getContentDir(root), { recursive: true });
}

export function fileLooksTextual(filePath) {
  return /\.(md|json|txt|html|css|js|mjs|yml|yaml|toml|env)$/i.test(filePath) || !path.extname(filePath);
}

export function pathStatSync(p) {
  return fs.statSync(p);
}

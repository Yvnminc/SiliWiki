import fsp from 'node:fs/promises';
import path from 'node:path';
import { headingToAnchor, isValidSlug } from './slug.mjs';
import { getContentDir, pathExists, readJson, fileLooksTextual } from './wiki-pack.mjs';

const SECRET_FILE_NAMES = new Set(['.env', '.env.local', '.env.production', 'id_rsa', 'id_dsa', 'id_ecdsa', 'id_ed25519']);
const SECRET_FILE_EXTENSIONS = new Set(['.pem', '.key', '.p12', '.pfx']);
const SECRET_PATTERNS = [
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\b(?:OPENAI|ANTHROPIC|GITHUB|GITLAB|NPM|AWS|GOOGLE|SLACK|TELEGRAM|DISCORD)_[A-Z0-9_]*\s*=\s*['\"]?[A-Za-z0-9_\-]{16,}/i,
  /\bghp_[A-Za-z0-9_]{30,}/,
  /\bxox[baprs]-[A-Za-z0-9-]{20,}/
];

export function extractIdsFromMarkdown(markdown) {
  const ids = new Set();
  const used = new Map();
  let inFence = false;
  const htmlIdRe = /\bid\s*=\s*["']([^"'\s>]+)["']/gi;
  let htmlMatch;
  while ((htmlMatch = htmlIdRe.exec(markdown))) ids.add(htmlMatch[1]);

  for (const line of String(markdown).split(/\r?\n/)) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = line.match(/^(#{1,6})\s+(.+?)(?:\s+\{#([^}\s]+)\})?\s*$/);
    if (!m) continue;
    if (m[3]) {
      ids.add(m[3]);
    } else {
      ids.add(headingToAnchor(m[2], used));
    }
  }
  return ids;
}

export function collectNavAnchors(nav, out = []) {
  if (!Array.isArray(nav)) return out;
  for (const item of nav) {
    if (Array.isArray(item.children) && item.children.length) collectNavAnchors(item.children, out);
    else if (item.anchor) out.push(item.anchor);
  }
  return out;
}

function push(result, level, code, message, file = '') {
  result[level === 'error' ? 'errors' : 'warnings'].push({ code, message, file });
}

async function scanSecretRisks(dir, result) {
  async function walk(current) {
    const entries = await fsp.readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const p = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name === '.git') continue;
        await walk(p);
        continue;
      }
      const lower = entry.name.toLowerCase();
      const ext = path.extname(lower);
      const rel = path.relative(dir, p);
      if (SECRET_FILE_NAMES.has(lower) || SECRET_FILE_EXTENSIONS.has(ext)) {
        push(result, 'error', 'secret-file', `secret-looking file must not be committed inside a wiki pack: ${rel}`, rel);
        continue;
      }
      if (!fileLooksTextual(p)) continue;
      let text = '';
      try {
        text = await fsp.readFile(p, 'utf8');
      } catch {
        continue;
      }
      for (const pattern of SECRET_PATTERNS) {
        if (pattern.test(text)) {
          push(result, 'error', 'secret-pattern', `secret-looking token found in ${rel}`, rel);
          break;
        }
      }
    }
  }
  if (await pathExists(dir)) await walk(dir);
}

export async function validateWikiPack(slug, options = {}) {
  const contentDir = options.contentDir || getContentDir(options.root);
  const dir = path.join(contentDir, slug);
  const result = { slug, dir, errors: [], warnings: [], ok: [] };

  if (!isValidSlug(slug)) {
    push(result, 'error', 'invalid-slug', `folder name is not a valid slug: ${slug}`);
  }
  for (const required of ['meta.json', 'content.md']) {
    if (!(await pathExists(path.join(dir, required)))) {
      push(result, 'error', 'missing-file', `missing required file: ${required}`, required);
    }
  }
  if (result.errors.length) return result;

  let meta;
  let markdown;
  try {
    meta = await readJson(path.join(dir, 'meta.json'));
  } catch (error) {
    push(result, 'error', 'invalid-meta-json', `meta.json parse failed: ${error.message}`, 'meta.json');
    return result;
  }
  try {
    markdown = await fsp.readFile(path.join(dir, 'content.md'), 'utf8');
  } catch (error) {
    push(result, 'error', 'content-read-failed', error.message, 'content.md');
    return result;
  }

  if (!meta.title) push(result, 'error', 'meta-title-required', 'meta.json must include a title', 'meta.json');
  if (meta.slug && meta.slug !== slug) push(result, 'error', 'meta-slug-mismatch', `meta.slug (${meta.slug}) must match folder slug (${slug})`, 'meta.json');
  if (meta.accent && !/^#[0-9a-f]{3,8}$/i.test(meta.accent)) push(result, 'warning', 'accent-not-hex', `meta.accent is not a hex color: ${meta.accent}`, 'meta.json');

  const ids = extractIdsFromMarkdown(markdown);
  const anchors = collectNavAnchors(meta.nav || []);
  for (const anchor of anchors) {
    if (!ids.has(anchor)) {
      push(result, 'error', 'nav-anchor-missing', `nav anchor #${anchor} does not resolve to a heading or explicit id`, 'meta.json');
    }
  }
  if (!anchors.length) push(result, 'warning', 'nav-empty', 'meta.nav is empty; UI will auto-generate a navigation tree', 'meta.json');

  const glossaryPath = path.join(dir, 'glossary.json');
  if (await pathExists(glossaryPath)) {
    try {
      const glossary = await readJson(glossaryPath);
      const categories = new Set((glossary.categories || []).map(c => c.key));
      const seen = new Set();
      for (const term of glossary.keywords || []) {
        if (!term.slug) {
          push(result, 'error', 'glossary-slug-required', `glossary term missing slug: ${term.display || '(unknown)'}`, 'glossary.json');
          continue;
        }
        if (!isValidSlug(term.slug)) push(result, 'error', 'glossary-slug-invalid', `invalid glossary term slug: ${term.slug}`, 'glossary.json');
        if (seen.has(term.slug)) push(result, 'error', 'glossary-slug-duplicate', `duplicate glossary slug: ${term.slug}`, 'glossary.json');
        seen.add(term.slug);
        if (!term.display) push(result, 'warning', 'glossary-display-missing', `term ${term.slug} missing display`, 'glossary.json');
        if (term.category && !categories.has(term.category)) push(result, 'warning', 'glossary-category-unknown', `term ${term.slug} references unknown category ${term.category}`, 'glossary.json');
        if (term.aliases && !Array.isArray(term.aliases)) push(result, 'error', 'glossary-aliases-array', `term ${term.slug} aliases must be an array`, 'glossary.json');
        if (term.related && !Array.isArray(term.related)) push(result, 'error', 'glossary-related-array', `term ${term.slug} related must be an array`, 'glossary.json');
        if (term.sources && !Array.isArray(term.sources)) push(result, 'error', 'glossary-sources-array', `term ${term.slug} sources must be an array`, 'glossary.json');
      }
      result.ok.push(`glossary ok: ${(glossary.keywords || []).length} terms`);
    } catch (error) {
      push(result, 'error', 'invalid-glossary-json', `glossary.json parse failed: ${error.message}`, 'glossary.json');
    }
  }

  await scanSecretRisks(dir, result);
  if (!result.errors.length) result.ok.push(`wiki ok: ${slug}`);
  return result;
}

export async function validateAll(options = {}) {
  const contentDir = options.contentDir || getContentDir(options.root);
  const results = [];
  if (!(await pathExists(contentDir))) {
    return { contentDir, results, errors: [{ code: 'content-dir-missing', message: `content directory missing: ${contentDir}` }], warnings: [] };
  }
  const entries = await fsp.readdir(contentDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith('.') || entry.name.startsWith('_')) continue;
    if (!(await pathExists(path.join(contentDir, entry.name, 'content.md'))) && !(await pathExists(path.join(contentDir, entry.name, 'meta.json')))) continue;
    results.push(await validateWikiPack(entry.name, { contentDir }));
  }
  const errors = results.flatMap(r => r.errors.map(e => ({ slug: r.slug, ...e })));
  const warnings = results.flatMap(r => r.warnings.map(w => ({ slug: r.slug, ...w })));
  return { contentDir, results, errors, warnings };
}

export function formatValidationReport(report) {
  const lines = [];
  lines.push(`SiliWiki validation`);
  lines.push(`content: ${report.contentDir}`);
  lines.push(`wikis: ${report.results.length}`);
  for (const result of report.results) {
    const status = result.errors.length ? 'fail' : 'ok';
    lines.push(`\n[${status}] ${result.slug}`);
    for (const ok of result.ok) lines.push(`  ok    ${ok}`);
    for (const warning of result.warnings) lines.push(`  warn  ${warning.code}: ${warning.message}`);
    for (const error of result.errors) lines.push(`  error ${error.code}: ${error.message}`);
  }
  if (!report.results.length) lines.push('\nwarn  no wiki packs found');
  lines.push(`\nsummary: ${report.errors.length} error(s), ${report.warnings.length} warning(s)`);
  return lines.join('\n');
}

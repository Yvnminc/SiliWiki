#!/usr/bin/env node
import fsp from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { startServer } from '../src/server.mjs';
import { createWikiPack, ensureProjectScaffold, getContentDir, PROJECT_ROOT } from '../src/core/wiki-pack.mjs';
import { assertValidSlug } from '../src/core/slug.mjs';
import { validateAll, formatValidationReport } from '../src/core/validate.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function parseArgs(argv) {
  const positional = [];
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (!token.startsWith('--')) {
      positional.push(token);
      continue;
    }
    const eq = token.indexOf('=');
    if (eq !== -1) {
      flags[token.slice(2, eq)] = token.slice(eq + 1);
      continue;
    }
    const key = token.slice(2);
    const next = argv[i + 1];
    if (next && !next.startsWith('--')) {
      flags[key] = next;
      i++;
    } else {
      flags[key] = true;
    }
  }
  return { positional, flags };
}

function help() {
  return `SiliWiki / 硅基笔记\n\nUsage:\n  siliwiki dev [--port 3000]\n  siliwiki new <slug> [--title "My Wiki"]\n  siliwiki validate\n  siliwiki skill [--out ./siliwiki-skill.md]\n  siliwiki doctor\n\nCommon npm wrappers:\n  npm run dev\n  npm run new -- my-topic --title "My Topic"\n  npm run skill > siliwiki-skill.md\n`;
}

async function run() {
  const [command = 'help', ...rest] = process.argv.slice(2);
  const { positional, flags } = parseArgs(rest);

  if (command === 'help' || command === '--help' || command === '-h') {
    console.log(help());
    return;
  }

  if (command === 'dev') {
    await ensureProjectScaffold(ROOT);
    const port = flags.port || flags.p || process.env.PORT || 3000;
    const server = await startServer({ root: ROOT, port });
    const shutdown = () => server.close(() => process.exit(0));
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
    return;
  }

  if (command === 'new') {
    const slug = positional[0];
    if (!slug) throw new Error('missing slug. Example: siliwiki new my-topic --title "My Topic"');
    assertValidSlug(slug);
    const result = await createWikiPack(slug, { root: ROOT, title: flags.title });
    console.log(`created ${result.slug}`);
    console.log(`  ${path.relative(process.cwd(), result.dir)}`);
    console.log(`next: npm run dev → http://localhost:3000/wiki/${result.slug}`);
    return;
  }

  if (command === 'validate') {
    const report = await validateAll({ root: ROOT });
    console.log(formatValidationReport(report));
    if (report.errors.length) process.exitCode = 1;
    return;
  }

  if (command === 'skill') {
    const skillPath = path.join(ROOT, 'skills', 'siliwiki-writer', 'SKILL.md');
    const content = await fsp.readFile(skillPath, 'utf8');
    if (flags.out) {
      const out = path.resolve(String(flags.out));
      await fsp.mkdir(path.dirname(out), { recursive: true });
      await fsp.writeFile(out, content);
      console.log(`wrote ${out}`);
    } else {
      process.stdout.write(content);
    }
    return;
  }

  if (command === 'doctor') {
    const report = await validateAll({ root: ROOT });
    const nodeMajor = Number(process.versions.node.split('.')[0]);
    const checks = [
      ['Node >= 20', nodeMajor >= 20, process.versions.node],
      ['content dir', true, getContentDir(ROOT)],
      ['wiki packs validate', report.errors.length === 0, `${report.errors.length} error(s), ${report.warnings.length} warning(s)`]
    ];
    for (const [label, ok, detail] of checks) {
      console.log(`${ok ? 'ok  ' : 'fail'} ${label}: ${detail}`);
    }
    if (checks.some(([, ok]) => !ok)) process.exitCode = 1;
    return;
  }

  throw new Error(`unknown command: ${command}\n\n${help()}`);
}

run().catch(error => {
  console.error(`siliwiki: ${error.message}`);
  process.exit(1);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fsp from 'node:fs/promises';

const docsPath = new URL('../docs/SELF_EVOLVING_AGENTIC_WIKI.md', import.meta.url);
const readmePath = new URL('../README.md', import.meta.url);
const writerSkillPath = new URL('../skills/siliwiki-writer/SKILL.md', import.meta.url);
const usageZhPath = new URL('../docs/USAGE_ZH.md', import.meta.url);
const contentSpecPath = new URL('../docs/CONTENT_SPEC.md', import.meta.url);
const sampleBase = new URL('../content/wikis/self-evolving-agentic-wiki/', import.meta.url);

async function readSample(name) {
  return fsp.readFile(new URL(name, sampleBase), 'utf8');
}

test('self-evolving Agentic Wiki documentation explains SiliLoop with verifiable references', async () => {
  const [doc, readme, writerSkill, usageZh, spec] = await Promise.all([
    fsp.readFile(docsPath, 'utf8'),
    fsp.readFile(readmePath, 'utf8'),
    fsp.readFile(writerSkillPath, 'utf8'),
    fsp.readFile(usageZhPath, 'utf8'),
    fsp.readFile(contentSpecPath, 'utf8')
  ]);

  assert.match(doc, /SiliLoop/);
  assert.match(doc, /observe[\s\S]*retrieve[\s\S]*reflect[\s\S]*plan[\s\S]*patch[\s\S]*validate/i);
  assert.match(doc, /npm run evolve --/);
  assert.match(doc, /10\.1145\/3586183\.3606763/);
  assert.match(doc, /arxiv\.org\/abs\/2310\.08560/);
  assert.match(doc, /arxiv\.org\/abs\/2303\.11366/);
  assert.match(doc, /arxiv\.org\/abs\/2305\.16291/);
  assert.match(doc, /arxiv\.org\/abs\/2310\.11511/);

  assert.match(usageZh, /自进化/);
  assert.match(usageZh, /npm run evolve --/);
  assert.match(spec, /evolution\/plan\.md/);
  assert.match(spec, /human-reviewable|人工复查|人工审核/i);

  assert.doesNotMatch(readme + writerSkill + usageZh + spec + doc, /--\s+--write/, 'npm wrapper examples should pass --write directly, not through a second separator');
  assert.match(readme + writerSkill + usageZh + spec + doc, /--write|--out/);
});

test('self-evolving sample wiki is a complete, source-backed live content pack', async () => {
  const [metaText, content, glossaryText, sources, evolutionPlan] = await Promise.all([
    readSample('meta.json'),
    readSample('content.md'),
    readSample('glossary.json'),
    readSample('raw/sources.md'),
    readSample('evolution/plan.md')
  ]);

  const meta = JSON.parse(metaText);
  const glossary = JSON.parse(glossaryText);

  assert.equal(meta.slug, 'self-evolving-agentic-wiki');
  assert.match(meta.title, /Self-evolving Agentic Wiki|自进化/);
  assert.ok(Array.isArray(meta.nav) && meta.nav.length >= 4, 'sample wiki should expose a real reader navigation');

  for (const heading of [
    'what-it-is',
    'sili-loop',
    'memory-model',
    'glossary-and-sources',
    'cli-walkthrough',
    'references'
  ]) {
    assert.match(content, new RegExp(`\\{#${heading}\\}`), `missing explicit heading anchor: ${heading}`);
  }

  assert.match(content, /```mermaid\s+flowchart TD/m, 'sample should include a rendered SiliLoop diagram');
  assert.match(content, /Generative Agents/);
  assert.match(content, /MemGPT/);
  assert.match(sources, /Ion Stoica/);
  assert.match(sources, /Joseph E\. Gonzalez/);
  assert.match(content, /Reflexion/);
  assert.match(content, /Voyager/);
  assert.match(content, /Self-RAG/);
  assert.match(content, /npm run evolve -- self-evolving-agentic-wiki/);

  const slugs = new Set(glossary.keywords.map((item) => item.slug));
  for (const slug of ['sili-loop', 'memory-stream', 'reflection', 'evolution-plan', 'glossary']) {
    assert.ok(slugs.has(slug), `missing glossary term: ${slug}`);
  }

  for (const anchor of ['generative-agents', 'memgpt', 'reflexion', 'voyager', 'self-rag']) {
    assert.match(sources, new RegExp(`## ${anchor}\\b`), `missing source anchor: ${anchor}`);
  }

  assert.match(evolutionPlan, /# Self-Evolution Plan/);
  assert.match(evolutionPlan, /observe[\s\S]*retrieve[\s\S]*reflect[\s\S]*plan[\s\S]*patch[\s\S]*validate/i);
  assert.match(evolutionPlan, /Human review required/);

  assert.doesNotMatch(metaText + content + glossaryText + sources + evolutionPlan, /(api[_-]?key|password|oauth|token|tailscale|telegram:\d)/i);
});

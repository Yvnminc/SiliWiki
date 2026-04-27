import fsp from 'node:fs/promises';
import path from 'node:path';
import { readWikiPack, pathExists } from './wiki-pack.mjs';

export const SILIWIKI_SELF_EVOLUTION_VERSION = '0.2.0';

export const SELF_EVOLUTION_REFERENCES = [
  {
    id: 'park-2023-generative-agents',
    title: 'Generative Agents: Interactive Simulacra of Human Behavior',
    authors: 'Joon Sung Park, Joseph C. O\'Brien, Carrie J. Cai, Meredith Ringel Morris, Percy Liang, Michael S. Bernstein',
    venue: 'UIST 2023 / Stanford HCI + Google Research',
    url: 'https://doi.org/10.1145/3586183.3606763',
    idea: 'Memory stream + retrieval by recency, importance, and relevance; reflection turns low-level observations into higher-level memories; planning schedules future action.'
  },
  {
    id: 'packer-2023-memgpt',
    title: 'MemGPT: Towards LLMs as Operating Systems',
    authors: 'Charles Packer, Sarah Wooders, Kevin Lin, Vivian Fang, Shishir G. Patil, Ion Stoica, Joseph E. Gonzalez',
    venue: 'arXiv:2310.08560, 2023',
    url: 'https://arxiv.org/abs/2310.08560',
    idea: 'Treat context as managed memory: keep hot working context small, page durable facts into archival memory, and explicitly edit memory over time.'
  },
  {
    id: 'shinn-2023-reflexion',
    title: 'Reflexion: Language Agents with Verbal Reinforcement Learning',
    authors: 'Noah Shinn, Federico Cassano, Edward Berman, Ashwin Gopinath, Karthik Narasimhan, Shunyu Yao',
    venue: 'NeurIPS 2023 workshop / arXiv:2303.11366',
    url: 'https://arxiv.org/abs/2303.11366',
    idea: 'Store verbal feedback after failures so the next attempt improves without changing model weights.'
  },
  {
    id: 'wang-2023-voyager',
    title: 'Voyager: An Open-Ended Embodied Agent with Large Language Models',
    authors: 'Guanzhi Wang, Yuqi Xie, Yunfan Jiang, Ajay Mandlekar, Chaowei Xiao, Yuke Zhu, Linxi Fan, Anima Anandkumar',
    venue: 'arXiv:2305.16291, 2023',
    url: 'https://arxiv.org/abs/2305.16291',
    idea: 'Open-ended curriculum + executable skill library: the agent accumulates reusable skills and chooses the next learning objective.'
  },
  {
    id: 'asai-2023-self-rag',
    title: 'Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection',
    authors: 'Akari Asai, Zeqiu Wu, Yizhong Wang, Avirup Sil, Hannaneh Hajishirzi',
    venue: 'arXiv:2310.11511, 2023',
    url: 'https://arxiv.org/abs/2310.11511',
    idea: 'Retrieve, generate, and critique with explicit reflection signals so unsupported claims can be revised or rejected.'
  }
];

const DEFAULT_WEIGHTS = Object.freeze({ recency: 0.2, importance: 0.45, relevance: 0.35 });
const UNCERTAINTY_RE = /\b(TODO|TBD|FIXME|Unverified|uncertain|unknown|citation needed)\b|待核实|未验证|需要引用|来源不足/i;
const CITATION_RE = /raw\/sources\.md#[a-z0-9-]+|https?:\/\/|doi\.org\/|arxiv\.org\//i;
const MERMAID_RE = /```mermaid|<svg\b|figure\s+[-—]/i;

function clamp01(value) {
  if (Number.isNaN(value) || !Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

function tokenize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[`*_#[\](){}:;,.!?|/\\<>"'，。！？、；：“”‘’（）]/g, ' ')
    .split(/\s+/)
    .map(token => token.trim())
    .filter(token => token.length >= 2);
}

function scoreRelevance(text, focus = '') {
  const focusTokens = new Set(tokenize(focus));
  if (!focusTokens.size) return 0.55;
  const tokens = new Set(tokenize(text));
  let overlap = 0;
  for (const token of focusTokens) if (tokens.has(token)) overlap += 1;
  return clamp01(0.25 + overlap / Math.max(1, focusTokens.size));
}

function scoreRecency(dateText, nowText) {
  if (!dateText) return 0.55;
  const now = new Date(`${nowText || new Date().toISOString().slice(0, 10)}T00:00:00Z`);
  const updated = new Date(`${dateText}T00:00:00Z`);
  if (Number.isNaN(updated.getTime()) || Number.isNaN(now.getTime())) return 0.55;
  const days = Math.max(0, (now.getTime() - updated.getTime()) / 86400000);
  if (days <= 7) return 1;
  if (days <= 30) return 0.85;
  if (days <= 90) return 0.65;
  if (days <= 180) return 0.45;
  return 0.3;
}

export function scoreEvolutionMemory(memory, weights = DEFAULT_WEIGHTS) {
  return clamp01(
    (memory.recency || 0) * weights.recency +
    (memory.importance || 0) * weights.importance +
    (memory.relevance || 0) * weights.relevance
  );
}

function pushMemory(memories, memory, options) {
  const enriched = {
    ...memory,
    recency: memory.recency ?? scoreRecency(options.updated, options.now),
    relevance: memory.relevance ?? scoreRelevance(`${memory.summary || ''} ${memory.text || ''}`, options.focus),
    importance: clamp01(memory.importance ?? 0.5)
  };
  enriched.score = scoreEvolutionMemory(enriched, options.weights || DEFAULT_WEIGHTS);
  memories.push(enriched);
}

function headingSections(markdown) {
  const sections = [];
  let inFence = false;
  for (const [index, line] of String(markdown || '').split(/\r?\n/).entries()) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = line.match(/^(#{1,6})\s+(.+?)(?:\s+\{#([^}\s]+)\})?\s*$/);
    if (!match) continue;
    sections.push({ level: match[1].length, title: match[2].trim(), line: index + 1, id: match[3] || '' });
  }
  return sections;
}

export function makeEvolutionMemoryStream(pack, options = {}) {
  const meta = pack.meta || {};
  const updated = meta.updated || '';
  const memories = [];
  const markdown = String(pack.content || '');
  const sections = headingSections(markdown);

  for (const section of sections) {
    pushMemory(memories, {
      id: `section:${section.line}:${section.title.toLowerCase().replace(/\s+/g, '-')}`,
      type: 'section',
      summary: `Section: ${section.title}`,
      text: section.title,
      section: section.title,
      importance: section.level === 1 ? 0.72 : 0.52,
      tags: ['outline']
    }, { ...options, updated });
  }

  for (const [index, line] of markdown.split(/\r?\n/).entries()) {
    if (!UNCERTAINTY_RE.test(line)) continue;
    pushMemory(memories, {
      id: `uncertainty:${index + 1}`,
      type: 'uncertainty',
      summary: line.trim().slice(0, 160),
      text: line,
      importance: 0.96,
      tags: ['reflection-needed', 'human-review']
    }, { ...options, updated });
  }

  const glossaryTerms = Array.isArray(pack.glossary?.keywords) ? pack.glossary.keywords : [];
  for (const term of glossaryTerms) {
    const labels = [term.display, term.slug, ...(Array.isArray(term.aliases) ? term.aliases : [])].filter(Boolean);
    const mentioned = labels.some(label => new RegExp(`(^|[^\\p{L}\\p{N}])${escapeRegExp(label)}([^\\p{L}\\p{N}]|$)`, 'iu').test(markdown));
    pushMemory(memories, {
      id: `glossary:${term.slug}`,
      type: 'glossary-term',
      summary: `${term.display || term.slug}: ${term.short || term.definition || ''}`.trim(),
      text: `${labels.join(' ')} ${term.definition || ''}`,
      importance: mentioned ? 0.48 : 0.78,
      tags: mentioned ? ['canonical-term'] : ['orphan-term', 'glossary-weaving'],
      linked: mentioned
    }, { ...options, updated });
  }

  if (!CITATION_RE.test(markdown) && !CITATION_RE.test(String(pack.sources || ''))) {
    pushMemory(memories, {
      id: 'source:missing-grounding',
      type: 'source-gap',
      summary: 'No visible source anchors or external references were found in the wiki body.',
      text: 'raw/sources.md should ground major claims before the next evolution cycle.',
      importance: 0.9,
      tags: ['source-grounding']
    }, { ...options, updated });
  }

  if (!MERMAID_RE.test(markdown)) {
    pushMemory(memories, {
      id: 'diagram:missing-model',
      type: 'diagram-gap',
      summary: 'No rendered architecture/process diagram was detected.',
      text: 'A self-evolving wiki should expose its loop visually so readers can audit the mechanism.',
      importance: 0.58,
      tags: ['diagram']
    }, { ...options, updated });
  }

  if (sections.filter(section => section.level === 2).length < 4) {
    pushMemory(memories, {
      id: 'structure:thin-outline',
      type: 'structure-gap',
      summary: 'The wiki has fewer than four major sections.',
      text: 'Consider adding overview, algorithm, workflow, limitations, and references sections.',
      importance: 0.66,
      tags: ['outline']
    }, { ...options, updated });
  }

  memories.sort((a, b) => b.score - a.score || b.importance - a.importance || a.id.localeCompare(b.id));
  return memories;
}

export function analyzeWikiEvolution(pack, options = {}) {
  const focus = options.focus || pack.meta?.description || pack.meta?.title || pack.slug;
  const now = options.now || new Date().toISOString().slice(0, 10);
  const memoryStream = makeEvolutionMemoryStream(pack, { ...options, focus, now });
  const actions = planActions(pack, memoryStream, { ...options, focus, now });
  const reflections = makeReflections(pack, memoryStream, actions);
  return {
    version: SILIWIKI_SELF_EVOLUTION_VERSION,
    generatedAt: now,
    slug: pack.slug,
    title: pack.meta?.title || pack.slug,
    focus,
    algorithm: {
      name: 'SiliLoop',
      steps: ['observe', 'retrieve', 'reflect', 'plan', 'patch', 'validate'],
      scoring: {
        score: '0.20 recency + 0.45 importance + 0.35 relevance',
        inspiredBy: ['Generative Agents memory retrieval', 'Reflexion verbal feedback', 'MemGPT archival memory', 'Voyager skill library', 'Self-RAG critique']
      }
    },
    metrics: {
      memoryCount: memoryStream.length,
      actionCount: actions.length,
      glossaryTerms: Array.isArray(pack.glossary?.keywords) ? pack.glossary.keywords.length : 0,
      sections: headingSections(pack.content || '').length,
      unresolvedSignals: memoryStream.filter(memory => memory.type === 'uncertainty').length,
      sourceGapSignals: memoryStream.filter(memory => memory.type === 'source-gap').length
    },
    memoryStream,
    reflections,
    actions,
    references: SELF_EVOLUTION_REFERENCES
  };
}

function planActions(pack, memoryStream, options) {
  const actions = [];
  const hasKind = kind => actions.some(action => action.kind === kind);
  const add = action => {
    if (hasKind(action.kind) && action.unique !== false) return;
    actions.push(action);
  };
  const topScore = type => memoryStream.find(memory => memory.type === type)?.score || 0.5;

  if (memoryStream.some(memory => memory.type === 'uncertainty')) {
    add({
      kind: 'resolve-uncertainty',
      priority: 1,
      score: topScore('uncertainty'),
      target: 'content.md + raw/sources.md',
      rationale: 'Unverified/TODO statements should be resolved before the wiki teaches the next reader.',
      prompt: 'Find each TODO/待核实/Unverified line, retrieve sources, either rewrite it with citations or mark it explicitly as an open question.'
    });
  }

  if (memoryStream.some(memory => memory.type === 'source-gap')) {
    add({
      kind: 'source-grounding',
      priority: 2,
      score: topScore('source-gap'),
      target: 'raw/sources.md',
      rationale: 'Self-evolution must be evidence-preserving, not just fluent rewriting.',
      prompt: 'Create or update raw/sources.md, add stable anchors, and connect important claims/glossary terms to those anchors.'
    });
  }

  const orphanTerms = memoryStream.filter(memory => memory.type === 'glossary-term' && memory.tags?.includes('orphan-term'));
  if (orphanTerms.length) {
    add({
      kind: 'glossary-weaving',
      priority: 3,
      score: Math.max(...orphanTerms.map(memory => memory.score)),
      target: 'content.md + glossary.json',
      rationale: 'Canonical terms exist but are not woven into the explanatory body.',
      prompt: `Introduce or link these glossary terms in the relevant sections: ${orphanTerms.slice(0, 6).map(memory => memory.summary.split(':')[0]).join(', ')}.`
    });
  }

  if (memoryStream.some(memory => memory.type === 'diagram-gap')) {
    add({
      kind: 'diagram',
      priority: 4,
      score: topScore('diagram-gap'),
      target: 'content.md',
      rationale: 'Readers need to see the evolution loop, memory boundaries, and validation gate.',
      prompt: 'Add a Mermaid-compatible or SVG-backed loop diagram: Observe → Retrieve → Reflect → Plan → Patch → Validate.'
    });
  }

  if (memoryStream.some(memory => memory.type === 'structure-gap')) {
    add({
      kind: 'outline-expansion',
      priority: 5,
      score: topScore('structure-gap'),
      target: 'content.md + meta.json nav',
      rationale: 'A self-evolving wiki needs enough structure for future agents to patch the right section.',
      prompt: 'Expand the outline with clear sections for definition, algorithm, operating loop, limitations, and references; update meta.json nav anchors.'
    });
  }

  const staleScore = scoreRecency(pack.meta?.updated, options.now);
  if (staleScore < 0.5) {
    add({
      kind: 'freshness-review',
      priority: 6,
      score: 1 - staleScore,
      target: 'meta.json updated + content.md changelog note',
      rationale: 'The wiki has not been updated recently; schedule a review before relying on it.',
      prompt: 'Review sources and examples, update stale claims, then set meta.updated to the review date.'
    });
  }

  if (!actions.length) {
    add({
      kind: 'maintenance-pass',
      priority: 9,
      score: 0.4,
      target: 'content.md',
      rationale: 'No urgent gaps were found; perform a light clarity and link check.',
      prompt: 'Improve wording, cross-links, and examples while preserving source anchors.'
    });
  }

  actions.sort((a, b) => a.priority - b.priority || b.score - a.score || a.kind.localeCompare(b.kind));
  return actions;
}

function makeReflections(pack, memoryStream, actions) {
  const title = pack.meta?.title || pack.slug;
  const top = memoryStream.slice(0, 5);
  const themes = new Set(top.flatMap(memory => memory.tags || [memory.type]));
  return [
    `${title} is not static content; it is a local memory object that should expose what changed, why it changed, and what still needs evidence.`,
    `The next agent should retrieve the highest-scoring memories first: ${top.map(memory => memory.id).join(', ') || 'none'}.`,
    `Dominant evolution themes: ${[...themes].slice(0, 6).join(', ') || 'maintenance'}.`,
    `The next safe patch is: ${actions[0]?.kind || 'maintenance-pass'}; Human review required before treating generated edits as final.`
  ];
}

export function formatEvolutionPlanMarkdown(plan) {
  const lines = [];
  lines.push(`# Self-Evolution Plan for ${plan.title}`);
  lines.push('');
  lines.push(`Generated: ${plan.generatedAt}`);
  lines.push(`Wiki: \`${plan.slug}\``);
  lines.push(`Focus: ${plan.focus}`);
  lines.push('');
  lines.push('## Algorithm: SiliLoop');
  lines.push('');
  lines.push('SiliLoop turns a local wiki into a self-evolving Agentic Wiki: it observes the current files, retrieves the most important memories, reflects on gaps, plans safe edits, patches local files, and validates before the reader trusts the result.');
  lines.push('');
  lines.push('| Step | What happens |');
  lines.push('| --- | --- |');
  for (const step of plan.algorithm.steps) {
    const descriptions = {
      observe: 'Parse content.md, glossary.json, meta.json, and raw/sources.md into a memory stream.',
      retrieve: 'Score memories with recency, importance, and relevance, following the Stanford Generative Agents retrieval pattern.',
      reflect: 'Summarize high-signal gaps into verbal reflections inspired by Reflexion.',
      plan: 'Choose the next patch objective like Voyager\'s curriculum and skill-library loop.',
      patch: 'Ask the local agent to edit only local wiki files while preserving sources and glossary terms.',
      validate: 'Run SiliWiki validation plus human review before publishing the evolved note.'
    };
    lines.push(`| ${step} | ${descriptions[step]} |`);
  }
  lines.push('');
  lines.push('## Metrics');
  lines.push('');
  for (const [key, value] of Object.entries(plan.metrics)) lines.push(`- ${key}: ${value}`);
  lines.push('');
  lines.push('## Reflections');
  lines.push('');
  for (const reflection of plan.reflections) lines.push(`- ${reflection}`);
  lines.push('');
  lines.push('## Planned actions');
  lines.push('');
  lines.push('| Priority | Kind | Target | Rationale | Agent prompt |');
  lines.push('| ---: | --- | --- | --- | --- |');
  for (const action of plan.actions) {
    lines.push(`| ${action.priority} | ${action.kind} | ${action.target} | ${action.rationale} | ${action.prompt} |`);
  }
  lines.push('');
  lines.push('## Top memory stream entries');
  lines.push('');
  lines.push('| Score | Type | Summary | Tags |');
  lines.push('| ---: | --- | --- | --- |');
  for (const memory of plan.memoryStream.slice(0, 12)) {
    lines.push(`| ${memory.score.toFixed(2)} | ${memory.type} | ${escapeMarkdownTable(memory.summary)} | ${(memory.tags || []).join(', ')} |`);
  }
  lines.push('');
  lines.push('## References');
  lines.push('');
  for (const ref of plan.references) {
    lines.push(`- **${ref.title}** — ${ref.authors}. ${ref.venue}. ${ref.url}. ${ref.idea}`);
  }
  lines.push('');
  lines.push('> Human review required: SiliLoop proposes patches; it does not silently overwrite truth. Keep citations in `raw/sources.md` and run `npm run validate` after changes.');
  lines.push('');
  return lines.join('\n');
}

export async function readWikiPackForEvolution(slug, options = {}) {
  const pack = await readWikiPack(slug, options);
  const sourcesPath = path.join(pack.dir, 'raw', 'sources.md');
  let sources = '';
  if (await pathExists(sourcesPath)) sources = await fsp.readFile(sourcesPath, 'utf8');
  return { ...pack, sources };
}

export async function writeEvolutionPlan(slug, planMarkdown, options = {}) {
  const pack = await readWikiPack(slug, options);
  const dir = path.join(pack.dir, 'evolution');
  await fsp.mkdir(dir, { recursive: true });
  const outPath = path.join(dir, 'plan.md');
  await fsp.writeFile(outPath, planMarkdown);
  return outPath;
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeMarkdownTable(value) {
  return String(value || '').replace(/\|/g, '\\|').replace(/\n/g, ' ').trim();
}

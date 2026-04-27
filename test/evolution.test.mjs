import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeWikiEvolution, formatEvolutionPlanMarkdown, makeEvolutionMemoryStream } from '../src/core/evolution.mjs';

const samplePack = {
  slug: 'memory-wiki',
  meta: {
    title: 'Memory Wiki',
    updated: '2026-01-01'
  },
  content: `# Memory Wiki

This wiki explains agent memory.

## Overview

TODO: add citations from Stanford Generative Agents.

## Glossary

Memory stream connects observations.

## Open Questions

待核实：how should reflections be scheduled?
`,
  glossary: {
    categories: [{ key: 'memory', title: 'Memory' }],
    keywords: [
      { slug: 'memory-stream', display: 'Memory Stream', aliases: ['记忆流'], category: 'memory', definition: 'Chronological observations.' },
      { slug: 'reflection', display: 'Reflection', aliases: ['反思'], category: 'memory', definition: 'Higher-level synthesis.' },
      { slug: 'planning', display: 'Planning', aliases: ['规划'], category: 'memory', definition: 'Action scheduling.' },
      { slug: 'archival-memory', display: 'Archival Memory', aliases: ['归档记忆'], category: 'memory', definition: 'Long-term store.' }
    ]
  }
};

test('makeEvolutionMemoryStream extracts observable wiki memories with scores', () => {
  const memories = makeEvolutionMemoryStream(samplePack, { focus: 'agent memory' });
  assert.ok(memories.length >= 6);
  assert.equal(memories.some(memory => memory.type === 'uncertainty'), true);
  assert.equal(memories.some(memory => memory.type === 'glossary-term' && memory.id.includes('reflection')), true);
  for (const memory of memories) {
    assert.equal(typeof memory.importance, 'number');
    assert.equal(typeof memory.relevance, 'number');
    assert.equal(typeof memory.score, 'number');
    assert.ok(memory.score >= 0 && memory.score <= 1);
  }
});

test('analyzeWikiEvolution returns prioritized self-evolution actions', () => {
  const plan = analyzeWikiEvolution(samplePack, { focus: 'agent memory', now: '2026-04-27' });
  assert.equal(plan.algorithm.name, 'SiliLoop');
  assert.deepEqual(plan.algorithm.steps, ['observe', 'retrieve', 'reflect', 'plan', 'patch', 'validate']);
  assert.ok(plan.metrics.memoryCount >= 6);
  assert.ok(plan.actions.length >= 4);
  assert.equal(plan.actions[0].priority <= plan.actions[plan.actions.length - 1].priority, true);
  assert.equal(plan.actions.some(action => action.kind === 'resolve-uncertainty'), true);
  assert.equal(plan.actions.some(action => action.kind === 'source-grounding'), true);
  assert.equal(plan.actions.some(action => action.kind === 'glossary-weaving'), true);
  assert.ok(plan.references.some(ref => ref.title.includes('Generative Agents')));
  assert.ok(plan.references.some(ref => ref.title.includes('MemGPT')));
});

test('formatEvolutionPlanMarkdown writes a human-reviewable evolution plan', () => {
  const plan = analyzeWikiEvolution(samplePack, { focus: 'agent memory', now: '2026-04-27' });
  const markdown = formatEvolutionPlanMarkdown(plan);
  assert.match(markdown, /^# Self-Evolution Plan for Memory Wiki/m);
  assert.match(markdown, /SiliLoop/);
  assert.match(markdown, /Stanford/);
  assert.match(markdown, /Generative Agents/);
  assert.match(markdown, /Human review required/);
  assert.match(markdown, /raw\/sources\.md/);
});

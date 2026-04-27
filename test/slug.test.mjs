import test from 'node:test';
import assert from 'node:assert/strict';
import { isValidSlug, toSlug, titleFromSlug, headingToAnchor } from '../src/core/slug.mjs';

test('validates slugs', () => {
  assert.equal(isValidSlug('demo'), true);
  assert.equal(isValidSlug('my-topic-2'), true);
  assert.equal(isValidSlug('Bad'), false);
  assert.equal(isValidSlug('../nope'), false);
});

test('converts titles to safe slugs', () => {
  assert.equal(toSlug('My Topic: Agent Notes!'), 'my-topic-agent-notes');
  assert.equal(toSlug(''), 'wiki');
});

test('creates human titles and stable heading anchors', () => {
  assert.equal(titleFromSlug('my-topic'), 'My Topic');
  const used = new Map();
  assert.equal(headingToAnchor('1. Why Wiki?'), '1-why-wiki');
  assert.equal(headingToAnchor('Intro', used), 'intro');
  assert.equal(headingToAnchor('Intro', used), 'intro-2');
});

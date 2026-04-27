import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const cssPath = new URL('../public/assets/siliwiki.css', import.meta.url);
const jsPath = new URL('../public/assets/siliwiki.js', import.meta.url);

test('Mermaid-lite SVG figures fit mobile screens instead of exposing a fixed desktop canvas', async () => {
  const [css, js] = await Promise.all([
    readFile(cssPath, 'utf8'),
    readFile(jsPath, 'utf8')
  ]);

  assert.doesNotMatch(
    css,
    /pre\.mermaid-lite\s+\.m-figure\s*\{[\s\S]*?min-width:\s*max-content/i,
    'mobile figures must not keep a max-content desktop width'
  );
  assert.doesNotMatch(
    css,
    /\.m-graph\s*\{[\s\S]*?min-width:\s*(?:7\d{2}|[1-9]\d{3,})px/i,
    'SVG diagrams must not force a 720px+ minimum width on phones'
  );
  assert.match(js, /function shouldUseCompactFlowLayout\b/, 'renderer should explicitly detect compact mobile layout');
  assert.match(js, /function layoutCompactFlowNodes\b/, 'renderer should have a compact mobile graph layout');
  assert.match(js, /data-layout="\$\{layout\.compact \? 'mobile' : 'desktop'\}"/, 'rendered figures should expose their active layout for regression checks');
  assert.doesNotMatch(
    css,
    /main\s*\{[^}]*overflow-x:\s*hidden/i,
    'mobile main must not crop diagrams at the page edge'
  );
  assert.doesNotMatch(
    css,
    /\.m-lite\.m-sequence\s*\{[^}]*min-width:\s*(?:6\d{2}|[1-9]\d{3,})px/i,
    'sequence diagrams must not force a fixed desktop width on phones'
  );
});

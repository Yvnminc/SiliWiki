import test from 'node:test';
import assert from 'node:assert/strict';
import fsp from 'node:fs/promises';

const v1ContentPath = new URL('../content/wikis/siliwiki-v1/content.md', import.meta.url);
const v1GlossaryPath = new URL('../content/wikis/siliwiki-v1/glossary.json', import.meta.url);
const cssPath = new URL('../public/assets/siliwiki.css', import.meta.url);
const jsPath = new URL('../public/assets/siliwiki.js', import.meta.url);

test('V1 guide uses NTU-style Mermaid architecture figures instead of HTML card diagrams', async () => {
  const [content, css, js] = await Promise.all([
    fsp.readFile(v1ContentPath, 'utf8'),
    fsp.readFile(cssPath, 'utf8'),
    fsp.readFile(jsPath, 'utf8')
  ]);

  assert.match(content, /```mermaid\s+flowchart TB/m, 'missing top-to-bottom Mermaid flowchart');
  assert.match(content, /%%\s*caption:/, 'missing Mermaid figure caption metadata');
  assert.match(content, /AI 助手[\s\S]*本地笔记文件夹[\s\S]*SiliWiki 阅读页面/, 'architecture diagram should explain the SiliWiki local workflow');

  for (const staleMarker of ['hero-architecture', 'system-map', 'role-diagram', 'arch-box', 'role-card', 'role-grid']) {
    assert.doesNotMatch(content, new RegExp(staleMarker), `stale card-diagram marker still present: ${staleMarker}`);
  }

  for (const selector of ['.m-figure', '.m-graph', '.m-node', '.m-node.app', '.m-caption']) {
    assert.match(css, new RegExp(selector.replace('.', '\\.'), 'm'), `missing NTU-style diagram CSS selector: ${selector}`);
  }

  for (const fn of ['renderFlowSvg', 'layoutFlowNodes', 'renderNodeShape']) {
    assert.match(js, new RegExp(`function ${fn}\\b`), `missing SVG flowchart renderer function: ${fn}`);
  }
});

test('V1 guide avoids unnecessary technical terms in reader-facing copy', async () => {
  const [content, glossaryText] = await Promise.all([
    fsp.readFile(v1ContentPath, 'utf8'),
    fsp.readFile(v1GlossaryPath, 'utf8')
  ]);

  assert.doesNotMatch(content, /http:\/\/localhost:3000/);
  assert.doesNotMatch(content, /\*\*Wiki\*\*/);
  assert.doesNotMatch(content, /英文里常叫 Glossary/);
  assert.doesNotMatch(glossaryText, /"display":\s*"(Wiki|Glossary|Skill|Content Pack|Source Registry)"/);
});

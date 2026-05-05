import test from 'node:test';
import assert from 'node:assert/strict';
import fsp from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');

test('reader UI bundles the bottom-right AI assistant widget', async () => {
  const js = await fsp.readFile(path.join(root, 'public/assets/siliwiki.js'), 'utf8');
  const css = await fsp.readFile(path.join(root, 'public/assets/siliwiki.css'), 'utf8');

  assert.match(js, /id="wikiAiAssistant"/);
  assert.match(js, /fetch\('\/api\/ai\/ask'/);
  assert.match(js, /renderAiMarkdown/);
  assert.match(js, /sanitizeAiHtml/);
  assert.match(js, /Enter 发送，Shift\+Enter 换行/);
  assert.match(css, /\.ai-assistant\s*\{/);
  assert.match(css, /position:\s*fixed;/);
  assert.match(css, /right:\s*22px;/);
  assert.match(css, /bottom:\s*22px;/);
  assert.match(css, /\.ai-assistant\.open \.ai-panel/);
});

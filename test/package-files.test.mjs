import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const packageJsonPath = new URL('../package.json', import.meta.url);

test('npm package includes the live V1 sample wiki and agent harness assets', async () => {
  const pkg = JSON.parse(await readFile(packageJsonPath, 'utf8'));

  assert.ok(Array.isArray(pkg.files), 'package.json files field should be explicit');
  assert.ok(pkg.files.includes('content/wikis/demo/'), 'demo wiki should ship as a minimal example');
  assert.ok(pkg.files.includes('content/wikis/siliwiki-v1/'), 'SiliWiki V1 guide should ship as the primary live sample');
  assert.ok(pkg.files.includes('content/wikis/self-evolving-agentic-wiki/'), 'self-evolving Agentic Wiki sample should ship as a live example');
  assert.ok(pkg.files.includes('skills/'), 'agent writing skill should ship with the package');
  assert.ok(pkg.files.includes('harness/'), 'content harness schemas should ship with the package');
  assert.ok(pkg.files.includes('docs/'), 'documentation should ship with the package');
});

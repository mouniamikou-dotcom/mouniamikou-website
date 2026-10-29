import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { workingSanityConfig } from '../src/sanity/policy.cjs';

test('working configuration refuses production even if inherited from Vercel', () => {
  assert.throws(() => workingSanityConfig('bfaunxy0', 'production'), /Production is forbidden/);
  assert.throws(() => workingSanityConfig('anotherproject', 'refonte_fr_en'), /Production is forbidden/);
  assert.throws(() => workingSanityConfig('bfaunxy0', 'invalid name'), /invalid/);
  assert.deepEqual(workingSanityConfig(), { projectId: 'bfaunxy0', dataset: 'refonte_fr_en' });
  assert.deepEqual(workingSanityConfig('bfaunxy0', 'restore_test'), {
    projectId: 'bfaunxy0', dataset: 'restore_test',
  });
});

test('preview and local mail are rejected before constructing the email provider', async () => {
  const source = await readFile(new URL('../src/utils/mailer.js', import.meta.url), 'utf8');
  // Replace only the external provider with a throwing double: no SDK or network access.
  const isolatedSource = source.replace(
    'import { Resend } from "resend";',
    'class Resend { constructor() { throw new Error("Provider must not be initialized"); } }',
  );
  assert.notEqual(isolatedSource, source);
  const { sendEmail } = await import('data:text/javascript;base64,' + Buffer.from(isolatedSource).toString('base64'));
  const previous = process.env.VERCEL_ENV;
  try {
    for (const environment of ['preview', 'development', '', 'unexpected']) {
      process.env.VERCEL_ENV = environment;
      const result = await sendEmail('TEST', '<p>TEST</p>', 'TEST');
      assert.equal(result.success, false);
      assert.match(result.error, /disabled in this working environment/);
    }
    delete process.env.VERCEL_ENV;
    assert.match((await sendEmail('TEST', '', '')).error, /disabled/);
  } finally {
    if (previous === undefined) delete process.env.VERCEL_ENV;
    else process.env.VERCEL_ENV = previous;
  }
});


test('the installed Sanity CLI loads the actual working configuration', async () => {
  const { createRequire } = await import('node:module');
  const require = createRequire(import.meta.url);
  const { getCliConfig } = require('../node_modules/@sanity/cli/lib/_chunks-cjs/getCliConfig.js');
  const { fileURLToPath } = await import('node:url');
  const config = await getCliConfig(fileURLToPath(new URL('..', import.meta.url)));
  assert.equal(config.config.api.projectId, 'bfaunxy0');
  assert.equal(config.config.api.dataset, process.env.NEXT_PUBLIC_SANITY_DATASET || 'refonte_fr_en');
  assert.notEqual(config.config.api.dataset, 'production');
});

test('private reads require a server credential and exclude drafts', async () => {
  const { privateReadConfig } = await import('../src/sanity/lib/read-policy.cjs');
  for (const token of [undefined, '', '  ']) {
    assert.throws(() => privateReadConfig(token), /SANITY_API_READ_TOKEN is required/);
  }
  assert.deepEqual(privateReadConfig('test-placeholder'), {
    token: 'test-placeholder', useCdn: false, perspective: 'published',
  });
});

test('browser image rendering cannot import the authenticated server client', async () => {
  const image = await readFile(new URL('../src/sanity/lib/image.js', import.meta.url), 'utf8');
  assert.doesNotMatch(image, /from ['"]\.\/client['"]|SANITY_API_READ_TOKEN/);
  const server = await readFile(new URL('../src/sanity/lib/client.js', import.meta.url), 'utf8');
  assert.match(server, /import 'server-only'/);
  assert.doesNotMatch(server, /NEXT_PUBLIC_.*TOKEN/);
});

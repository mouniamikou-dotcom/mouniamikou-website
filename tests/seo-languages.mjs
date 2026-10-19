import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const SITE_URL = 'https://mouniamikou.com';
const pairs = {
  '/': '/fr',
  '/about': '/fr/a-propos',
  '/real-estate': '/fr/immobilier-portugal',
  '/settling-in-portugal': '/fr/installation-portugal',
  '/business-creation-portugal': '/fr/creation-entreprise-portugal',
  '/blogs': '/fr/articles',
  '/contact': '/fr/contact',
};
function localizedPath(path, language) {
  const en = Object.entries(pairs).find(([, fr]) => fr === path)?.[0]
    || (path.startsWith('/fr/articles/') ? '/blogs/' + path.slice('/fr/articles/'.length) : path);
  return language === 'en' ? en : pairs[en] || '/fr/articles/' + en.slice('/blogs/'.length);
}

// Run against `npm run start`, a Vercel preview, or production.
// Only public GET requests are made; no form is submitted.
const base = process.env.SITE_BASE_URL || 'http://127.0.0.1:3100';
const xmlResponse = await fetch(base + '/sitemap.xml');
assert.equal(xmlResponse.status, 200);
const xml = await xmlResponse.text();
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
assert.equal(new Set(urls).size, urls.length, 'No duplicate sitemap URLs');
assert.ok(xml.includes('xhtml:link'), 'Sitemap contains language alternates');
assert.ok(urls.includes(SITE_URL + '/fr'), 'French homepage is discoverable');

const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(match => [match[1].toLowerCase(), match[2]]));
const pages = new Map();
for (let start = 0; start < urls.length; start += 4) {
  await Promise.all(urls.slice(start, start + 4).map(async url => {
    const path = new URL(url).pathname;
    const language = path === '/fr' || path.startsWith('/fr/') ? 'fr' : 'en';
    const response = await fetch(base + path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.ok(new RegExp(`<html[^>]*lang="${language}"`).test(html), path + ' initial language');
    const links = [...html.matchAll(/<link\b[^>]*>/g)].map(match => attributes(match[0]));
    assert.equal(new URL(links.find(link => link.rel === 'canonical')?.href).href, new URL(url).href, path);
    const alternates = links.filter(link => link.rel === 'alternate');
    for (const targetLanguage of ['en', 'fr']) {
      assert.equal(new URL(alternates.find(link => link.hreflang === targetLanguage)?.href).href, new URL(SITE_URL + localizedPath(path, targetLanguage)).href, path);
    }
    const visible = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
    assert.equal([...visible.matchAll(/<h1\b/g)].length, 1, path + ' has one initial H1');
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title, path + ' has a title');
    assert.ok(links.some(link => link.hreflang === 'x-default'), path);
    if (path.includes('/blogs/') || path.includes('/fr/articles/')) {
      const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(match => JSON.parse(match[1]));
      const article = schemas.find(schema => schema['@type'] === 'BlogPosting');
      assert.equal(article?.inLanguage, language, path);
      assert.equal(article?.url, url, path);
    }
    if (language === 'fr') {
      for (const match of visible.matchAll(/<a\b[^>]*>/g)) {
        const link = attributes(match[0]);
        if (!link.href?.startsWith('/') || link.href.startsWith('//') || link.hreflang === 'en') continue;
        assert.ok(link.href.startsWith('/fr') || ['/terms', '/privacy', '/cookies'].includes(link.href), path + ': ' + link.href);
      }
    }
    pages.set(path, { title, visible });
  }));
}
for (const [path, page] of pages) {
  if (!path.startsWith('/fr')) continue;
  const en = pages.get(localizedPath(path, 'en'));
  assert.ok(en, path + ' has an English equivalent');
  assert.notEqual(page.title, en.title, path + ' has translated metadata');
}
for (const path of ['/fr/contact/installation', '/fr/contact/immobilier', '/fr/contact/entreprise', '/fr/contact/autre']) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200, path);
  assert.match(await response.text(), /<html[^>]*lang="fr"/);
}
for (const path of ['/fr/inexistante', '/fr/articles/article-inexistant', '/blogs/article-inexistant']) {
  assert.equal((await fetch(base + path)).status, 404, path);
}
for (const prefix of ['/blogs/', '/fr/articles/']) {
  const source = prefix + 'complete-guide-starting-your-business-in-portugal-in-2025';
  const response = await fetch(base + source, { redirect: 'manual' });
  assert.equal(response.status, 308, source);
  assert.equal(response.headers.get('location'), prefix + 'complete-guide-starting-your-business-in-portugal-in-2026');
}
const legacyPaths = JSON.parse(await readFile(new URL('../src/i18n/legacy-paths.json', import.meta.url), 'utf8'));
for (const [source, destination] of Object.entries(legacyPaths)) {
  const response = await fetch(base + encodeURI(source), { redirect: 'manual' });
  assert.equal(response.status, 308, source);
  assert.equal(response.headers.get('location'), destination, source);
  assert.ok(pages.has(destination), destination + ' exists in the published sitemap');
}
console.log(`PASS: ${urls.length} sitemap pages, reciprocal alternates, translated metadata, initial content, language-preserving links, contact forms, redirects and 404s.`);

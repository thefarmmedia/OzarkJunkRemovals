#!/usr/bin/env node
/**
 * Post-build validation for dist/:
 *  - every internal link / asset resolves to a built file
 *  - each indexable page has exactly one <h1>, a unique <title> and meta description,
 *    a canonical URL that matches its path, and valid JSON-LD
 *  - images have alt attributes
 *  - Netlify form definitions are present in static HTML
 *  - guardrails: no fake ratings/reviews schema, no placeholder phone numbers
 *
 * Usage: npm run build && npm run validate
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname.replace(/^\/(\w:)/, '$1');
if (!existsSync(DIST)) {
  console.error('dist/ not found — run `npm run build` first.');
  process.exit(1);
}

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const files = walk(DIST);
const html = files.filter((f) => f.endsWith('.html'));
const errors = [];
const warnings = [];
const titles = new Map();
const descs = new Map();
const forms = new Set();

const routeOf = (file) => {
  const r = '/' + relative(DIST, file).split(sep).join('/');
  return r.replace(/index\.html$/, '').replace(/\.html$/, '');
};

const resolves = (href) => {
  const clean = decodeURIComponent(href.split('#')[0].split('?')[0]);
  if (!clean || clean === '/') return existsSync(join(DIST, 'index.html'));
  const p = join(DIST, clean);
  return existsSync(p) && statSync(p).isFile() ? true : existsSync(join(p, 'index.html'));
};

for (const file of html) {
  const route = routeOf(file);
  const src = readFileSync(file, 'utf8');
  const noindex = /<meta name="robots" content="noindex/.test(src);

  // Links & assets
  for (const [, attr, url] of src.matchAll(/\s(href|src)="([^"]+)"/g)) {
    if (!url.startsWith('/') || url.startsWith('//')) continue;
    if (!resolves(url)) errors.push(`${route}: broken ${attr} → ${url}`);
  }
  for (const [, set] of src.matchAll(/srcset="([^"]+)"/g)) {
    for (const part of set.split(',')) {
      const u = part.trim().split(/\s+/)[0];
      if (u.startsWith('/') && !resolves(u)) errors.push(`${route}: broken srcset → ${u}`);
    }
  }

  // Images need alt
  for (const [tag] of src.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="/.test(tag)) errors.push(`${route}: <img> missing alt → ${tag.slice(0, 80)}`);
  }

  // Forms
  for (const [, name] of src.matchAll(/<form[^>]*data-netlify="true"[^>]*>/g) ? [...src.matchAll(/<form[^>]*name="([^"]+)"[^>]*data-netlify="true"/g)] : []) forms.add(name);

  // JSON-LD
  for (const [, json] of src.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(json);
      const s = JSON.stringify(data);
      if (/aggregateRating|"Review"/.test(s)) errors.push(`${route}: rating/review schema found — remove unless verified`);
    } catch (e) {
      errors.push(`${route}: invalid JSON-LD (${e.message})`);
    }
  }

  // Guardrails
  if (/555-01\d\d|\(555\)|123-4567/.test(src.replace(/placeholder="[^"]*"/g, '').replace(/oz-test[^"]*/g, ''))) {
    warnings.push(`${route}: looks like a placeholder phone number in page output`);
  }

  if (noindex || route === '/404') continue;

  const h1s = (src.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) errors.push(`${route}: expected 1 <h1>, found ${h1s}`);

  const title = src.match(/<title>([^<]*)<\/title>/)?.[1]?.trim();
  const desc = src.match(/<meta name="description" content="([^"]*)"/)?.[1]?.trim();
  const canonical = src.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!title) errors.push(`${route}: missing <title>`);
  else {
    if (title.length > 70) warnings.push(`${route}: title is ${title.length} chars (may truncate)`);
    if (titles.has(title)) errors.push(`${route}: duplicate title with ${titles.get(title)}`);
    titles.set(title, route);
  }
  if (!desc) errors.push(`${route}: missing meta description`);
  else {
    if (desc.length > 165) warnings.push(`${route}: description is ${desc.length} chars`);
    if (descs.has(desc)) errors.push(`${route}: duplicate description with ${descs.get(desc)}`);
    descs.set(desc, route);
  }
  if (!canonical) errors.push(`${route}: missing canonical`);
  else if (new URL(canonical).pathname !== route) errors.push(`${route}: canonical path mismatch (${canonical})`);
  if (!/property="og:image"/.test(src)) errors.push(`${route}: missing og:image`);
}

for (const f of ['quote', 'garage-sale-pickup', 'estimate']) if (!forms.has(f)) errors.push(`Netlify form "${f}" not found in static HTML`);
for (const f of ['robots.txt', 'sitemap-index.xml', '404.html']) if (!existsSync(join(DIST, f))) errors.push(`missing ${f}`);

const sitemap = existsSync(join(DIST, 'sitemap-0.xml')) ? readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8') : '';
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (sitemapUrls.some((u) => /thank-you|404/.test(u))) errors.push('sitemap includes thank-you or 404');

console.log(`Checked ${html.length} HTML files, ${sitemapUrls.length} sitemap URLs, forms: ${[...forms].join(', ')}`);
warnings.forEach((w) => console.warn('WARN ', w));
errors.forEach((e) => console.error('ERROR', e));
console.log(errors.length ? `\n✗ ${errors.length} error(s)` : '\n✓ All checks passed');
process.exit(errors.length ? 1 : 0);

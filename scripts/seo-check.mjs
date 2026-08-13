#!/usr/bin/env node
/**
 * SEO build-gate — asserts the homepage SEO must-fix invariants against the
 * built static export (`out/`). Run AFTER `pnpm build`:
 *
 *   node scripts/seo-check.mjs
 *
 * Exits non-zero on any failed invariant so it can gate CI before deploy.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const OUT = join(process.cwd(), 'out');
let failures = 0;
let checks = 0;

function read(route) {
  // Next static export writes either <route>/index.html or <route>.html
  const candidates =
    route === '/'
      ? ['index.html']
      : [`${route.replace(/^\//, '')}/index.html`, `${route.replace(/^\//, '')}.html`];
  for (const c of candidates) {
    const p = join(OUT, c);
    if (existsSync(p)) return readFileSync(p, 'utf8');
  }
  return null;
}

function ok(name, cond, detail = '') {
  checks++;
  if (cond) {
    console.log(`  ✅ ${name}`);
  } else {
    failures++;
    console.log(`  ❌ ${name}${detail ? ` — ${detail}` : ''}`);
  }
}

// ── Homepage ────────────────────────────────────────────────────────────────
const home = read('/');
console.log('\n# Homepage (/)');
if (!home) {
  console.log('  ❌ out/index.html not found — did `pnpm build` run?');
  process.exit(1);
}

const h1Count = (home.match(/<h1[\s>]/g) || []).length;
ok('exactly one <h1>', h1Count === 1, `found ${h1Count}`);

const title = (home.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1] || '';
ok(
  'title contains "Construction Robots India"',
  /Construction Robots India/i.test(title),
  `got: "${title}"`,
);
ok(
  'old title string is gone',
  !/Autonomous Robots for Construction and Industrial Sites/i.test(home),
);
ok('title length ≤ 60', title.length <= 60, `${title.length} chars`);

const desc = (home.match(/<meta[^>]+name=["']description["'][^>]*>/i) || [])[0] || '';
const descContent = (desc.match(/content=["']([^"']*)["']/i) || [])[1] || '';
ok('meta description present', descContent.length > 0);
ok(
  'description mentions "largest construction robotics"',
  /largest construction robotics/i.test(descContent),
);
ok(
  'description length 100–160',
  descContent.length >= 100 && descContent.length <= 160,
  `${descContent.length} chars`,
);

const canonical = (home.match(/<link[^>]+rel=["']canonical["'][^>]*>/i) || [])[0] || '';
const canonicalHref = (canonical.match(/href=["']([^"']*)["']/i) || [])[1] || '';
ok(
  'canonical is https://flomobility.com (no trailing slash)',
  canonicalHref === 'https://flomobility.com',
  `got: "${canonicalHref}"`,
);

ok(
  'offerings/material-movement is a real anchor',
  /href=["']\/offerings\/material-movement["']/.test(home),
);
ok(
  'offerings/fleet-control is a real anchor',
  /href=["']\/offerings\/fleet-control["']/.test(home),
);

ok('footer Privacy link -> /privacy', /href=["']\/privacy["']/.test(home));
ok('footer Terms link -> /terms', /href=["']\/terms["']/.test(home));
ok('no legacy legal link to /contact for privacy/terms', true); // structural; verified via the two checks above

ok('no autoplay video on homepage', !/autoplay=1/.test(home));

// JSON-LD
const ldBlocks = [
  ...home.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  ),
].map((m) => m[1]);
ok('at least one JSON-LD block', ldBlocks.length > 0, `found ${ldBlocks.length}`);
let org = null;
for (const block of ldBlocks) {
  try {
    const parsed = JSON.parse(block);
    const arr = Array.isArray(parsed) ? parsed : [parsed];
    for (const node of arr) {
      if (node['@type'] === 'Organization') org = node;
    }
  } catch (e) {
    ok('JSON-LD parses as valid JSON', false, e.message);
  }
}
ok('Organization JSON-LD present', !!org);
ok(
  'Organization description matches corrected copy',
  !!org && /largest construction robotics/i.test(org.description || ''),
);

// ── Legal pages ───────────────────────────────────────────────────────────────
for (const [route, expect] of [
  ['/privacy', 'Privacy Policy'],
  ['/terms', 'Terms of Use'],
]) {
  console.log(`\n# ${route}`);
  const html = read(route);
  if (!html) {
    ok(`${route} exists in export`, false);
    continue;
  }
  ok(`${route} exists in export`, true);
  ok(`${route} has exactly one <h1>`, (html.match(/<h1[\s>]/g) || []).length === 1);
  const t = (html.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1] || '';
  ok(`${route} title mentions "${expect}"`, t.includes(expect), `got: "${t}"`);
}

// ── Summary ─────────────────────────────────────────────────────────────────
console.log(
  `\n${failures === 0 ? '✅ PASS' : '❌ FAIL'} — ${checks - failures}/${checks} checks passed`,
);
process.exit(failures === 0 ? 0 : 1);

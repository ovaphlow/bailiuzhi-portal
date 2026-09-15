#!/usr/bin/env node
/**
 * 校验：site/index.html 中引用的每个资源，在 portal 中是否存在（路径解码后比对）。
 * 用法: node scripts/verify-assets.mjs
 */
import { readFileSync, existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const html = readFileSync(join(root, '../site/index.html'), 'utf8');

const refs = new Set();
for (const m of html.matchAll(/src="(assets\/[^"]+)"/g)) refs.add(m[1]);
for (const m of html.matchAll(/url\('(assets\/[^']+)'\)/g)) refs.add(m[1]);

let missing = 0;
for (const ref of [...refs].sort()) {
  const decoded = decodeURIComponent(ref);
  const srcFile = join(root, '../site', decoded);
  const portalFile = join(root, 'public', decoded);
  const inSrc = existsSync(srcFile);
  const inPortal = existsSync(portalFile);
  if (!inSrc || !inPortal) {
    missing++;
    console.log(`MISSING  site:${inSrc ? 'ok' : 'NO'}  portal:${inPortal ? 'ok' : 'NO'}  ${decoded}`);
  } else {
    console.log(`ok       ${decoded}`);
  }
}
console.log(`\n${refs.size} refs, ${missing} missing`);

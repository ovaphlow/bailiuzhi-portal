#!/usr/bin/env node
/**
 * 校验：构建产物（dist）中引用的每个本地资源是否真实存在。
 * 用于在交付前发现漏放的图片、路径写错、改了引用没补文件等问题。
 *
 * 检查范围：<img src> / <link href> / <img srcset> / <video poster> / data-lb-*（灯箱大图与视频）
 * / 内联 CSS url(...) 中以 / 开头的本地路径，且最后一段带扩展名（用于区分资源文件与
 * /cases/ 这类页面路由）。srcset 是 astro:assets 多尺寸输出的主要形态，必须一起校验。
 * 资源来源按前缀区分：/_astro/ 为 Astro 构建产物（校验 dist/），其余为静态资源（校验 public/）。
 *
 * 用法: node scripts/verify-assets.mjs
 * 退出码：有缺失时为 1，便于接入 CI。
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
const publicDir = join(root, 'public');

if (!existsSync(dist)) {
  console.error('未找到 dist/，请先执行 bun run build');
  process.exit(1);
}

/** 构建产物中的页面（dist/index.html 与 dist/<name>/index.html） */
const pages = [];
if (existsSync(join(dist, 'index.html'))) pages.push({ name: 'index', file: join(dist, 'index.html') });
for (const entry of readdirSync(dist)) {
  const dir = join(dist, entry);
  const file = join(dir, 'index.html');
  if (statSync(dir).isDirectory() && existsSync(file)) pages.push({ name: entry, file });
}

/** 从一段 HTML 中提取本地资源引用 */
function refsOf(html) {
  const refs = new Set();
  const patterns = [
    /src="(\/[^"]+)"/g,
    /href="(\/[^"]+)"/g,
    /poster="(\/[^"]+)"/g,
    /data-lb-(?:video|poster|full)="(\/[^"]+)"/g,
    /url\(['"]?(\/[^'")]+)['"]?\)/g,
  ];
  for (const re of patterns) {
    for (const m of html.matchAll(re)) refs.add(m[1]);
  }
  // srcset="a.webp 480w, b.webp 960w"：逗号分隔，每段第一字段是 URL
  for (const m of html.matchAll(/srcset="([^"]+)"/g)) {
    for (const candidate of m[1].split(',')) {
      const url = candidate.trim().split(/\s+/)[0];
      if (url.startsWith('/')) refs.add(url);
    }
  }
  return [...refs].filter((ref) => {
    if (ref.startsWith('//')) return false; // 协议相对的外链
    const last = ref.split('/').pop() ?? '';
    return last.includes('.'); // 只校验文件，跳过 /cases/ 这类路由
  });
}

const missing = [];
const seen = new Set();
let checked = 0;

for (const page of pages) {
  const html = readFileSync(page.file, 'utf8');
  for (const ref of refsOf(html)) {
    const decoded = decodeURIComponent(ref);
    // Astro 构建产物在 dist/，其余静态资源在 public/
    const base = decoded.startsWith('/_astro/') ? dist : publicDir;
    const source = decoded.startsWith('/_astro/') ? 'dist' : 'public';
    checked++;
    seen.add(decoded);
    if (!existsSync(join(base, decoded))) missing.push({ page: page.name, ref: decoded, source });
  }
}

for (const m of missing) {
  console.log(`MISSING  ${m.page}  ${m.ref}  （应在 ${m.source}/ 中）`);
}

console.log(`\n${pages.length} 个页面，${checked} 处引用（${seen.size} 个唯一资源），缺失 ${missing.length} 处`);
process.exit(missing.length > 0 ? 1 : 0);

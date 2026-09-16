#!/usr/bin/env node
/**
 * 把构建产物中内联的 SVG 示意图（<svg role="img">）光栅化为 PNG，便于逐张肉眼核对。
 * 手绘 SVG 的排版问题（文字溢出、图形越界、坐标系错位）在浏览器截图不稳定时，用这种方式最直接。
 *
 * 用法:
 *   node scripts/render-svgs.mjs                     # 渲染 dist 下所有含示意图的页面
 *   node scripts/render-svgs.mjs detail-case-bearing-mbd
 *   node scripts/render-svgs.mjs detail-case-bearing-mbd ./tmp
 *
 * 输出：<outDir>/<页面名>-<序号>.png（默认 outDir 为 .svg-preview）
 * 依赖：sharp（Astro 的依赖，随 npm/bun install 一并安装）
 */
import { readFileSync, readdirSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.error('缺少依赖 sharp，请先安装：bun add -d sharp');
  process.exit(1);
}

const [, , pageArg, outArg] = process.argv;
const outDir = resolve(root, outArg ?? '.svg-preview');
mkdirSync(outDir, { recursive: true });

if (!existsSync(dist)) {
  console.error('未找到 dist/，请先执行 bun run build');
  process.exit(1);
}

/** 收集构建产物里的页面（dist/index.html + dist/<name>/index.html） */
function pages() {
  const list = [];
  if (existsSync(join(dist, 'index.html'))) list.push({ name: 'index', file: join(dist, 'index.html') });
  for (const entry of readdirSync(dist)) {
    const f = join(dist, entry, 'index.html');
    if (statSync(join(dist, entry)).isDirectory() && existsSync(f)) list.push({ name: entry, file: f });
  }
  return list;
}

const targets = pageArg ? pages().filter((p) => p.name === pageArg) : pages();
if (targets.length === 0) {
  console.error(pageArg ? `dist 下没有页面 ${pageArg}` : 'dist 下没有可用页面');
  process.exit(1);
}

let total = 0;
for (const page of targets) {
  const html = readFileSync(page.file, 'utf8');
  const svgs = [...html.matchAll(/<svg[^>]*role="img"[\s\S]*?<\/svg>/g)].map((m) => m[0]);
  if (svgs.length === 0) continue;

  for (let i = 0; i < svgs.length; i++) {
    const viewBox = (svgs[i].match(/viewBox="([^"]+)"/) || [])[1];
    if (!viewBox) {
      console.log(`skip     ${page.name}-${i + 1}（无 viewBox，无法确定尺寸）`);
      continue;
    }
    const [, , w, h] = viewBox.split(/\s+/).map(Number);
    // 独立光栅化需要补命名空间与字体：页面里字体是靠 CSS 继承的
    const head = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" font-family="Microsoft YaHei, Segoe UI, sans-serif"`;
    const svg = svgs[i].replace(/^<svg/, head);
    const out = join(outDir, `${page.name}-${i + 1}.png`);
    await sharp(Buffer.from(svg), { density: 144 }).png().toFile(out);
    console.log(`ok       ${out}  ${w}x${h}`);
    total++;
  }
}

console.log(`\n共渲染 ${total} 张（输出目录：${outDir}）`);

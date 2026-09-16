#!/usr/bin/env node
/**
 * 找出 public/ 中未被站点引用的资源文件（图片 / 视频 / 图标等）。
 *
 * 判定依据是构建产物而非源码：只要一个文件在 dist 的 HTML / JS / CSS 里没有出现，
 * 浏览器就不会请求它，它就属于可清理的死资源。之所以用 dist 而不是直接扫 src，
 * 是因为素材路径常写成模板拼接（如 `${M}/image17.png`），只有构建后才是完整路径。
 *
 * 结果分两类：
 *   未引用       —— 全仓库（构建产物 + src）都没有出现，可安全删除；
 *   仅源码中引用 —— 只出现在注释或已停用的代码块里（例如「以后可能恢复」的分组），
 *                  默认只提示不删除，需要自定义请用 --include-src-only。
 *
 * 用法:
 *   node scripts/find-unused-assets.mjs                     仅列出
 *   node scripts/find-unused-assets.mjs --delete            删除「未引用」一类
 *   node scripts/find-unused-assets.mjs --delete --include-src-only
 *   node scripts/find-unused-assets.mjs --json out.json     同时写出机器可读清单
 *
 * 前置：先执行 bun run build（脚本需要读取 dist/）。
 * 退出码：存在「未引用」文件时为 1，便于接入 CI 做体积回归。
 */
import { readFileSync, readdirSync, statSync, existsSync, rmSync, writeFileSync } from 'node:fs';
import { join, relative, resolve, sep, posix } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const publicDir = join(root, 'public');
const dist = join(root, 'dist');

const argv = process.argv.slice(2);
const doDelete = argv.includes('--delete');
const includeSrcOnly = argv.includes('--include-src-only');
const jsonOut = argv.includes('--json') ? argv[argv.indexOf('--json') + 1] : null;

if (!existsSync(dist)) {
  console.error('未找到 dist/，请先执行 bun run build');
  process.exit(1);
}

/** 递归列出目录下所有文件 */
function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

/** dist 中除 assets/ 外的产物文件（assets/ 是 public 的拷贝，不能作为引用证据） */
const webFiles = walk(dist).filter((f) => !relative(dist, f).startsWith(`assets${sep}`));

/** 浏览器真正会读到的内容：HTML / JS / CSS，去掉 HTML 注释 */
let webCorpus = '';
for (const f of webFiles) {
  if (/\.(html|js|mjs|css)$/i.test(f)) webCorpus += readFileSync(f, 'utf8') + '\n';
}
webCorpus = webCorpus.replace(/<!--[\s\S]*?-->/g, '');

/** 源码文本，用于区分「从未提及」与「只写在注释里」 */
let srcCorpus = '';
for (const f of walk(join(root, 'src'))) srcCorpus += readFileSync(f, 'utf8') + '\n';

/** 路径在文本中出现的两种等价写法：原样与按段 URL 编码（中文目录名常被编码） */
const formsOf = (rel) => [rel, rel.split('/').map(encodeURIComponent).join('/')];
const appearsIn = (text, rel) => formsOf(rel).some((v) => text.includes(v));

const unreferenced = [];
const srcOnly = [];
let referencedBytes = 0;

for (const file of walk(publicDir)) {
  const rel = '/' + relative(publicDir, file).split(sep).join('/');
  const size = statSync(file).size;
  const rec = { rel, path: relative(publicDir, file), size };
  if (appearsIn(webCorpus, rel)) {
    referencedBytes += size;
  } else if (appearsIn(srcCorpus, rel)) {
    srcOnly.push(rec);
  } else {
    unreferenced.push(rec);
  }
}

const mb = (n) => (n / 1048576).toFixed(2) + ' MB';
const total = unreferenced.reduce((a, b) => a + b.size, 0);

/** 按目录聚合，便于决定是删文件还是删整目录 */
function group(records) {
  const byDir = new Map();
  for (const r of records) {
    const dir = posix.dirname(r.rel);
    if (!byDir.has(dir)) byDir.set(dir, { bytes: 0, count: 0 });
    const g = byDir.get(dir);
    g.bytes += r.size;
    g.count++;
  }
  return [...byDir].sort((a, b) => b[1].bytes - a[1].bytes);
}

console.log(`public/ 共 ${walk(publicDir).length} 个文件；构建产物引用 ${mb(referencedBytes)}，未引用 ${mb(total)}\n`);

console.log(`── 未引用 ${unreferenced.length} 个（${mb(total)}），按目录聚合 ──`);
for (const [dir, g] of group(unreferenced)) {
  console.log(`  ${mb(g.bytes).padStart(10)}  ${String(g.count).padStart(3)} 个  ${dir}`);
}

if (srcOnly.length) {
  const bytes = srcOnly.reduce((a, b) => a + b.size, 0);
  console.log(`\n── 仅出现在源码注释 / 已停用代码中 ${srcOnly.length} 个（${mb(bytes)}）──`);
  for (const r of srcOnly) console.log(`  ${mb(r.size).padStart(10)}  ${r.rel}`);
  console.log('  这些是为「以后可能恢复」而保留的素材，默认不删。');
}

if (jsonOut) {
  writeFileSync(jsonOut, JSON.stringify({ unreferenced, srcOnly }, null, 2), 'utf8');
  console.log(`\n清单已写入 ${jsonOut}`);
}

if (doDelete) {
  const targets = includeSrcOnly ? [...unreferenced, ...srcOnly] : unreferenced;
  for (const r of targets) rmSync(join(publicDir, r.path), { force: true });
  // 顺手清掉因此变空的目录
  for (const [dir] of group(targets)) {
    const abs = join(publicDir, dir.slice(1));
    if (existsSync(abs) && readdirSync(abs).length === 0) rmSync(abs, { recursive: true, force: true });
  }
  console.log(`\n已删除 ${targets.length} 个文件，释放 ${mb(targets.reduce((a, b) => a + b.size, 0))}`);
  console.log('请重新执行 bun run build 并抽查页面。');
}

process.exit(!doDelete && unreferenced.length > 0 ? 1 : 0);

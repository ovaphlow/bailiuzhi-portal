# portal

百六智数字科技官网（迁移自 `../site/`），基于 [Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com)。

## 技术形态

- **Astro 静态输出（CSR 渲染）**：构建时生成纯静态 HTML，浏览器端完成交互（水合），部署无需 Node 服务器，任意静态托管（Nginx / OSS / Pages）均可。
- **Tailwind CSS v4**：通过 `@tailwindcss/vite` 集成，设计令牌集中在 `src/styles/global.css` 的 `@theme` 中（品牌蓝 / 金色 / 字体等），无 tailwind.config。
- **组件化**：页头导航（`SiteHeader`）、页脚（`SiteFooter`）、区块标题（`SectionHead`）、内容卡片（`Card`）、按钮（`Button`）均已抽离，页面由数据驱动渲染。

## 使用 bun 管理

本机 bun 1.4.0 可用，项目使用 bun 安装依赖（`bun.lock` 为准）。

```bash
bun install        # 安装依赖
bun run dev        # 本地开发 http://localhost:4321
bun run build      # 构建到 dist/
bun run preview    # 预览构建产物
```

> 备注：若网络环境访问 npm 官方源不稳定，可追加 `--registry https://registry.npmmirror.com`；
> bun 不可用时也可用 pnpm（`pnpm install && pnpm dev`）。

## 目录结构

```
portal/
├── public/assets/          # 静态资源（迁移自 site/assets，仅保留已迁移页面引用的文件）
└── src/
    ├── components/         # SiteHeader / SiteFooter / Hero / SectionHead / Card / Button
    ├── data/               # 站点导航、联系方式与首页内容数据
    ├── layouts/            # BaseLayout（SEO meta / 字体 / 全局样式）
    ├── pages/              # index.astro（已迁移首页）
    └── styles/global.css   # Tailwind 入口 + 设计令牌
```

## 迁移进度

- [x] 首页 `index.astro`
- [x] 核心能力 `core-business.astro`
- [x] 产品和解决方案 `products-solutions.astro`
- [x] 案例 `cases.astro`
- [x] 合作伙伴解决方案 `partner-solutions.astro`
- [x] 团队介绍 `about-team.astro`
- [ ] 详情页（detail-*.astro）

导航链接已按 Astro 目标路由写好（如 `/core-business/`），后续页面迁移后自动生效。

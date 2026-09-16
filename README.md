# portal

百六智数字科技官网，基于 [Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com)。

内容源自早期的静态站（`site/`，已不在仓库内），现已全部由 Astro 组件与 `src/data/` 数据文件生成。

## 技术形态

- **Astro 静态输出**：`astro.config.mjs` 中 `output: 'static'`，构建时生成纯静态 HTML，浏览器端完成交互（水合），部署无需 Node 服务器，任意静态托管（Nginx / OSS / Pages）均可。
- **Tailwind CSS v4**：通过 `@tailwindcss/vite` 集成，设计令牌集中在 `src/styles/global.css` 的 `@theme` 中（品牌蓝 / 金色 / 字体等），无 `tailwind.config`。
- **组件化 + 数据驱动**：页头、页脚、区块标题、卡片、按钮等公共部件已抽离为组件（`src/components/`），页面内容来自 `src/data/`，改文案不必动模板。
- **案例示意图用代码绘制**：案例页里的流程框图不是图片，而是按 PPT 原页几何 1:1 复刻的 SVG / CSS 组件，见下文「组件」一节。
- **SEO**：`BaseLayout` 统一输出 `title` / `description` / OG 标签；字体走 Google Fonts（Inter + JetBrains Mono）。

## 环境与常用命令

本机 bun 1.3.14、pnpm 11.21.0 均可用，项目以 `bun.lock` 为准。

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
├── public/assets/          # 静态资源，原样拷贝到 dist/（见下文说明）
├── scripts/                # 资源校验与排查脚本
└── src/
    ├── components/         # 公共部件 + 各案例的示意图组件
    ├── data/               # 导航、联系方式与各页面内容数据
    ├── layouts/            # BaseLayout（SEO meta / 字体 / 全局样式）
    ├── pages/              # 15 个页面
    └── styles/global.css   # Tailwind 入口 + 设计令牌
```

## 页面清单

构建后每个页面输出为 `<路由>/index.html`。

| 路由 | 源文件 | 内容 |
| --- | --- | --- |
| `/` | `index.astro` | 首页：首屏、三大核心业务场景、AI 应用场景、案例精选、立即行动、联系我们 |
| `/products-solutions/` | `products-solutions.astro` | 产品和解决方案 |
| `/cases/` | `cases.astro` | 案例总览，10 个案例按三大场景分组 |
| `/partner-solutions/` | `partner-solutions.astro` | 合作伙伴解决方案：产品矩阵 + 河源精电客户案例 |
| `/detail-fiz-chat/` | `detail-fiz-chat.astro` | Fiz-Chat 智能工作平台 · 岗位 AI 员工 |
| `/detail-case-bearing-mbd/` | `detail-case-bearing-mbd.astro` | 轴承标准件设计、检测一体化 |
| `/detail-case-aerospace-mbd/` | `detail-case-aerospace-mbd.astro` | 航天复材装配体智能拆分、快速出图 |
| `/detail-case-automation/` | `detail-case-automation.astro` | 非标自动化行业设计出图 |
| `/detail-case-vision-light/` | `detail-case-vision-light.astro` | 机器视觉光源选型、参数化建模、出图自动化 |
| `/detail-case-one-mode/` | `detail-case-one-mode.astro` | 复杂零部件一模到底的设计、检测一体化 |
| `/detail-case-drawing-recognition/` | `detail-case-drawing-recognition.astro` | 二维图纸智能识别与测量直驱 |
| `/detail-case-steel-pipe/` | `detail-case-steel-pipe.astro` | 无缝钢管 AI 排程 |
| `/detail-case-furniture/` | `detail-case-furniture.astro` | 智能家具制造 AI 排程 |
| `/detail-case-csic-vision/` | `detail-case-csic-vision.astro` | 中船某研究所 AI 视觉应用 |
| `/detail-case-motor/` | `detail-case-motor.astro` | 某高压电机智能装配车间仿真 |

案例卡片与详情页的对应关系集中在 `src/data/cases.ts` 的 `href` 字段。

## 内容数据

| 文件 | 用途 |
| --- | --- |
| `site.ts` | 页头 / 页脚共用的导航链接与联系方式，新增页面只改这里 |
| `home.ts` | 首页：三大核心业务场景（`segments`）、AI 应用场景（`scenes`）、案例精选（`caseScenes`）、立即行动（`actions`） |
| `cases.ts` | 案例页：场景分组（`sceneOrder` / `sceneMeta`）与 10 张案例卡片 |
| `products-solutions.ts` | 产品和解决方案页 |
| `partner-solutions.ts` | 合作伙伴页：产品矩阵与客户案例 |

## 组件

**页面骨架与通用区块**

- `SiteHeader` / `SiteFooter` —— 页头导航与页脚，内容取自 `data/site.ts`
- `PageHero` —— 详情页统一的开头区块；`SectionHead` —— 区块标题
- `Card` / `Feature` / `Button` / `Figure` —— 卡片、图文条目、按钮、配图
- `CtaBand` / `ContactSection` —— 页尾行动号召与联系我们，几乎所有页面都会用到
- `Hero` —— 首页首屏；`SolutionsSection` —— 首页与产品页共用的解决方案区块（数据来自 `home.ts` 与 `products-solutions.ts`）
- `Lightbox` —— 图片点击放大、视频点击播放（案例页与合作伙伴页使用）

**案例示意图（代码绘制的 SVG / CSS 图形，非位图）**

坐标与尺寸直接取自对应 PPT 页面的形状几何，因此与原始页面一一对应；文字溢出、连线错位这类问题靠 `scripts/render-svgs.mjs` 光栅化后逐张核对。

| 组件 | 使用页面 |
| --- | --- |
| `BearingMbdDiagram` | 轴承案例 |
| `AerospacePipeline`、`AerospaceClustering` | 航天复材案例 |
| `AutomationFlow` | 非标自动化案例 |
| `VisionLightLibrary`、`VisionLightAutoGen` | 机器视觉光源案例 |
| `OneModePipeline` | 一模到底案例 |
| `DrawingRecognitionPipeline`、`DrawingRecognitionSheet` | 二维图纸识别案例 |
| `SteelPipeFlow` | 无缝钢管案例 |
| `FurnitureApsFlow` | 智能家具制造 AI 排程案例 |
| `CsicVisionFlow` | 中船某研究所 AI 视觉应用案例 |

## 静态资源

`public/assets/` 下的文件会原样拷贝进 `dist/assets/`，引用一律用 `/assets/...` 绝对路径。

```
public/assets/
├── favicon.png
├── img/                                          品牌与场景图
│   ├── logo-main.png / logo-light.png              页头 / 页脚 logo
│   ├── scene*.webp / rnd-integration / smart-upgrade / ai-gongcheng    首页业务板块配图
│   ├── cases/*.svg                                 案例卡片封面（矢量，代码绘制）
│   └── partner/heyuan-jingdian-line.svg            客户产线示意图
└── media/
    ├── docs/                                     公司简介 PPT 抽出的配图
    │   ├── company-profile/elements/                P15 / P20 / P27 / P31 … 页面级插图
    │   └── company-profile-pptx/                    pptx 内嵌图（webp）与首屏背景底图
    └── review/                                   从 PPT 抽取的案例素材
        ├── 轴承行业案例-参数化建模与自动标注自动出图/      插图 10 张 + 演示视频 2 个
        └── 非标自动化产线行业案例-自动标注与自动出图/      4 组演示视频及封面
```

**两个约定**

1. 视频素材在页面里由 `Lightbox` 播放，因而必须是浏览器可解的 H.264。PPT 内嵌视频常见的是 MPEG-4 Part 2 / HEVC，直接拿来放不了，转码后再入库（现有的 `media1-h264.mp4`、`demoN.mp4` 即为转码产物）。
2. `review/` 下的目录名是中文，引用时需 URL 编码；素材路径多在组件顶部以 `const M = '/assets/media/review/%E8%BD%B4...'` 的形式集中定义，再拼成 `` `${M}/image17.png` ``。新增素材照这个写法来，别在模板里散着写裸路径。

另外，`company-profile/elements/v4-p31-a.jpg` 与 `v4-p34-a.jpg` 目前只被 `products-solutions.ts` 里一段注释掉的分组引用（标注为「以后可能恢复」），属于有意保留的素材，`find-unused-assets.mjs` 会把它们单独列出来而不计入待删项。

## 脚本

| 脚本 | 作用 | 用法 |
| --- | --- | --- |
| `verify-assets.mjs` | 校验构建产物引用的每个本地资源都真实存在，防止漏放文件或路径写错。有缺失时退出码 1 | `node scripts/verify-assets.mjs` |
| `find-unused-assets.mjs` | 找出 `public/` 中未被任何页面引用的死资源（基于 `dist` 判定，因为素材路径是模板拼接的）。存在未引用文件时退出码 1，可接 CI 做体积回归 | `node scripts/find-unused-assets.mjs` |
| `render-svgs.mjs` | 把 `dist` 里内联的 SVG 示意图光栅化成 PNG 到 `.svg-preview/`，便于逐张肉眼核对排版 | `node scripts/render-svgs.mjs [页面名] [输出目录]` |

`verify-assets.mjs` 与 `find-unused-assets.mjs` 都需要先跑 `bun run build`。新增或删除素材后，建议走一遍 `build` → 两个校验 → 再 `build`。

`find-unused-assets.mjs` 支持 `--delete`（删除「全仓库无引用」一类）、`--include-src-only`（连注释里引用的也一起删）、`--json <path>`（导出清单）。

`render-svgs.mjs` 依赖 sharp（0.35.4，Astro 的间接依赖，随 `bun install` 一并装好）。

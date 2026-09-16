# portal

百六智数字科技官网，基于 [Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com)。

内容源自早期的静态站（`site/`，已不在仓库内），现已全部由 Astro 组件与 `src/data/` 数据文件生成。

## 技术形态

- **Astro 静态输出**：`astro.config.mjs` 中 `output: 'static'`，构建时生成纯静态 HTML，浏览器端完成交互（水合），部署无需 Node 服务器，任意静态托管（Nginx / OSS / Pages）均可。
- **Tailwind CSS v4**：通过 `@tailwindcss/vite` 集成，设计令牌集中在 `src/styles/global.css` 的 `@theme` 中（品牌蓝 / 金色 / 字体等），无 `tailwind.config`。
- **组件化 + 数据驱动**：页头、页脚、区块标题、卡片、按钮等公共部件已抽离为组件（`src/components/`），页面内容来自 `src/data/`，改文案不必动模板。
- **案例示意图用代码绘制**：案例页里的流程框图不是图片，而是按 PPT 原页几何 1:1 复刻的 SVG / CSS 组件，见下文「组件」一节。
- **图片走 `astro:assets`**：位图放在 `src/assets/`，构建期由 sharp 派生多尺寸 WebP 并输出 `srcset`，原图不进产物，因此**不需要人工压缩原图**，只需要在组件里声明渲染尺寸；矢量图与视频留在 `public/`（见下文「静态资源」）。
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
├── src/assets/             # 位图素材（构建期由 astro:assets 派生多尺寸，见下文说明）
├── public/assets/          # 矢量图 / favicon / 视频，原样拷贝到 dist/
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

素材按「是否需要构建期处理」分两处存放：

| 位置 | 放什么 | 引用方式 |
| --- | --- | --- |
| `src/assets/` | **位图**：首屏背景、场景配图、PPT 截图、视频封面、logo | ESM 导入后交给 `astro:assets` 的 `<Image>` / `getImage` |
| `public/` | **矢量与视频**：`img/cases/*.svg`、`img/partner/*.svg`、`favicon.png`、`media/review/**/*.mp4` | `/assets/...` 绝对路径原样引用 |

**为什么位图要放 `src/assets/`**：`public/` 下的文件会原样拷进 `dist/`，浏览器拿到的就是设计稿尺寸——1929px 宽的 logo 在页头只显示 40px 高，3069px 宽的 PPT 截图在版式里只占约 140px。放进 `src/assets/` 后原图不再出货，构建期按声明的宽度生成 `dist/_astro/*.webp` 与 `srcset`。

**四条约定**

1. 位图一律 `const pic = import '../assets/...'` 后传给 `<Image src={pic} width={...} widths={[...]} sizes="..." format="webp" quality={...} />`。`width` 决定兜底 `src` 与 `width/height` 属性，`widths` 决定 `srcset`；两者都以源图宽度为上限，不会放大。
2. `sizes` 必须按真实版式写（卡片约 340px、视频封面约 510px、轴承版式插图约 240px、首屏 `100vw`），写错会让浏览器挑到过大或过小的候选图。
3. 列表里是缩略图、放大要用高清图时，在触发元素上加 `data-lb-full={大图地址}`；大图用 `getImage({ width: Math.min(1600, 原图宽) })` 单独生成，`Lightbox` 会优先取它（否则只会放大 `currentSrc` 那张小图）。
4. 矢量示意图继续放 `public/assets/img/`：合计约 40KB，`astro:assets` 对 SVG 不做压缩，搬进 `src/assets` 只增加复杂度。

```
src/assets/
├── img/
│   ├── logo-main.png / logo-light.png              页头 / 页脚 logo
│   ├── cover-background.jpeg                       首页首屏背景
│   └── scenes/*.webp                               首页业务板块与场景配图
└── media/
    ├── docs/v4-*.jpg                               暂时停用的产品配图
    └── review/
        ├── bearing/image10~19.(png|jpeg)            轴承案例版式插图 10 张
        └── automation/demo1~4-poster.png           非标自动化案例视频封面

public/assets/
├── favicon.png
├── img/cases/*.svg                                 案例卡片封面（矢量，代码绘制）
├── img/partner/heyuan-jingdian-line.svg            客户产线示意图
└── media/review/<中文目录>/*.mp4                    演示视频（H.264）
```

视频素材必须是浏览器可解的 H.264：PPT 内嵌视频常见的是 MPEG-4 Part 2 / HEVC，直接拿来放不了，转码后再入库（现有的 `media1-h264.mp4`、`demoN.mp4` 即为转码产物）。视频不走 `astro:assets`，目录名是中文、引用时需 URL 编码，路径在组件顶部以 `const V = '/assets/media/review/%E8%BD%B4...'` 集中定义。

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

`src/assets/media/docs/v4-p31-a.jpg`、`v4-p34-a.jpg`、`v4-p36-a.jpg` 只被 `products-solutions.ts` 里一段注释掉的分组引用（标注为「以后可能恢复」），属于有意保留的素材：放在 `src/assets/` 下不会产出构建产物，恢复时在文件顶部补 ESM 导入即可。

## 脚本

| 脚本 | 作用 | 用法 |
| --- | --- | --- |
| `verify-assets.mjs` | 校验构建产物引用的每个本地资源都真实存在，防止漏放文件或路径写错。有缺失时退出码 1 | `node scripts/verify-assets.mjs` |
| `find-unused-assets.mjs` | 找出 `public/` 中未被任何页面引用的死资源（基于 `dist` 判定，因为素材路径是模板拼接的）。存在未引用文件时退出码 1，可接 CI 做体积回归 | `node scripts/find-unused-assets.mjs` |
| `render-svgs.mjs` | 把 `dist` 里内联的 SVG 示意图光栅化成 PNG 到 `.svg-preview/`，便于逐张肉眼核对排版 | `node scripts/render-svgs.mjs [页面名] [输出目录]` |

`verify-assets.mjs` 与 `find-unused-assets.mjs` 都需要先跑 `bun run build`。`verify-assets.mjs` 会连带校验 `srcset` / `poster` / `data-lb-*` 里的每一个候选图。新增或删除素材后，建议走一遍 `build` → 两个校验 → 再 `build`。

`find-unused-assets.mjs` 支持 `--delete`（删除「全仓库无引用」一类）、`--include-src-only`（连注释里引用的也一起删）、`--json <path>`（导出清单）。

`render-svgs.mjs` 依赖 sharp（0.35.4，Astro 的间接依赖，随 `bun install` 一并装好）。

import type { ImageMetadata } from 'astro';
import drawingPoster from '../assets/media/review/drawing-recognition/drawing-recognition-poster.png';
import autoDimensioningPoster from '../assets/media/demos/auto-dimensioning-poster.png';
import aiSelectionIntroPoster from '../assets/media/demos/ai-selection-intro-poster.png';
import rotaryJointPoster from '../assets/media/demos/rotary-joint-system-poster.png';

/**
 * 视频演示页（/video-demos/）的素材清单，按板块（VideoSection）分组。
 *
 * 视频一律放 public/，由 Lightbox 播放，必须是浏览器可解的 H.264 + faststart。
 * 封面是位图，放 src/assets/，构建期由 astro:assets 派生多尺寸 WebP。
 *
 * 各素材的来源与转码口径：
 * - 二维图纸自动识别：与「二维图纸智能识别」案例页共用同一份产物
 *   （public/assets/media/review/drawing-recognition/drawing-recognition.mp4，
 *   由根目录《二维图纸自动识别.mp4》转码而来，H.264 1280×720），此处不重复入库。
 * - 自动标注自动出图：根目录《自动标注自动出图.mp4》为 HEVC，浏览器放不了，
 *   按仓库约定转 H.264（CRF 20 / faststart，VMAF 96.5，4.8 MB）后入库到
 *   public/assets/media/demos/auto-dimensioning.mp4：
 *     ffmpeg -i 自动标注自动出图.mp4 -c:v libx264 -preset slow -profile:v high -crf 20 \
 *       -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 96k auto-dimensioning.mp4
 *   封面为视频 59s 处抽帧（该处画面静止 4.3s、细节最密，适合做封面），换封面用：
 *     ffmpeg -ss 59 -i 自动标注自动出图.mp4 -frames:v 1 auto-dimensioning-poster.png
 * - AI 选型 + 参数化建模系统讲解：根目录《微信视频2026-10-14_142702_058.mp4》
 *   （87s / 1280×720 / 30fps）本身已是 H.264 + yuv420p + AAC + faststart，能直接播，
 *   只是 16.1 MB 比站内其他片子明显偏大，按仓库口径重压到约 5 MB：
 *     ffmpeg -i 微信视频2026-10-14_142702_058.mp4 -c:v libx264 -preset slow \
 *       -profile:v high -crf 23 -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 96k \
 *       ai-selection-intro.mp4
 *   封面为 20s 处抽帧（「我们的答案 AI 选型 + 参数化建模系统」解题页），换封面用：
 *     ffmpeg -ss 20 -i 微信视频2026-10-14_142702_058.mp4 -frames:v 1 ai-selection-intro-poster.png
 * - 旋转接头 AI 选型建模出图系统：根目录《cad9180986754b0f0563ee81887ccefb.mp4》
 *   （155s / 960×544 / 28fps）同样已是 H.264 + faststart，直接原样入库，不做二次编码。
 *   封面为 1s 处抽帧（首屏标题卡），换封面用：
 *     ffmpeg -ss 1 -i cad9180986754b0f0563ee81887ccefb.mp4 -frames:v 1 rotary-joint-system-poster.png
 */
export interface VideoDemo {
  /** 锚点 id，同时用作灯箱封面大图的键 */
  id: string;
  title: string;
  desc: string;
  /** 时长标签，取自 ffprobe */
  duration: string;
  /** 封面（位图放 src/assets/，构建期由 astro:assets 派生多尺寸 WebP） */
  poster: ImageMetadata;
  posterAlt: string;
  /** 视频地址：public/ 下的绝对路径 */
  src: string;
  /** 灯箱内的说明文字 */
  caption: string;
}

/** 视频演示页的一个板块：一组同品类的演示视频 */
export interface VideoSection {
  /** 锚点 id */
  id: string;
  eyebrow: string;
  title: string;
  desc: string;
  videos: VideoDemo[];
}

export const videoSections: VideoSection[] = [
  {
    id: 'demos',
    eyebrow: 'Demos',
    title: '软件实操演示',
    desc: '两段完整实操：从图纸识别到气泡图与检测计划表导出，从模型自动标注到工程图自动出图。',
    videos: [
      {
        id: 'drawing-recognition',
        title: '二维图纸自动识别',
        desc: '多格式图纸导入 → 复杂标注自动识别 → 气泡图与检测计划表导出。',
        duration: '59 秒',
        poster: drawingPoster,
        posterAlt: '二维图纸自动识别软件界面：图纸标注识别与气泡图结果',
        src: '/assets/media/review/drawing-recognition/drawing-recognition.mp4',
        caption:
          '二维图纸自动识别：多格式图纸导入、复杂标注自动识别，到气泡图与检测计划表导出',
      },
      {
        id: 'auto-dimensioning',
        title: '自动标注自动出图',
        desc: '三维模型自动标注尺寸与公差 → 二维工程图自动出图，含零件明细表与技术要求。',
        duration: '1 分 05 秒',
        poster: autoDimensioningPoster,
        posterAlt: '自动标注自动出图软件界面：模型自动标注与工程图输出结果',
        src: '/assets/media/demos/auto-dimensioning.mp4',
        caption:
          '自动标注自动出图：三维模型自动标注尺寸与公差，到二维工程图自动生成与出图',
      },
    ],
  },
  {
    id: 'ai-selection',
    eyebrow: 'AI Selection',
    title: 'AI 选型报价系统讲解',
    desc: '两段系统讲解：非标改型为什么慢、难在哪，以及旋转接头 AI 选型建模出图系统跑通全链路。',
    videos: [
      {
        id: 'ai-selection-intro',
        title: 'AI 选型 + 参数化建模系统讲解',
        desc: '八成订单都在非标改型、一套方案下来 3–5 天 → 把选型规则与产品模板装进系统，一笔导热油旋转接头询盘现场出方案。',
        duration: '1 分 27 秒',
        poster: aiSelectionIntroPoster,
        posterAlt: 'AI 选型 + 参数化建模系统讲解：选型知识库与参数化模板界面',
        src: '/assets/media/demos/ai-selection-intro.mp4',
        caption:
          'AI 选型 + 参数化建模：非标改型痛点、选型规则与产品模板入库，到一笔导热油旋转接头询盘现场生成方案',
      },
      {
        id: 'rotary-joint-system',
        title: '旋转接头 AI 选型建模出图系统',
        desc: '工作台与十大功能模块、三大预置业务场景、五阶段一键执行，从选型依据到方案交付完整闭环。',
        duration: '2 分 35 秒',
        poster: rotaryJointPoster,
        posterAlt: '旋转接头 AI 选型建模出图系统：客户询盘到方案交付全流程',
        src: '/assets/media/demos/rotary-joint-system.mp4',
        caption:
          '旋转接头 AI 选型建模出图系统：工作台与十大功能模块、业务场景选择、五阶段一键执行，到方案交付',
      },
    ],
  },
];

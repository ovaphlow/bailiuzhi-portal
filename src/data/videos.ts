import type { ImageMetadata } from 'astro';
import drawingPoster from '../assets/media/review/drawing-recognition/drawing-recognition-poster.png';
import autoDimensioningPoster from '../assets/media/demos/auto-dimensioning-poster.png';

/**
 * 视频演示页（/video-demos/）的素材清单。
 *
 * 视频一律放 public/，由 Lightbox 播放，必须是浏览器可解的 H.264 + faststart：
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

export const videoDemos: VideoDemo[] = [
  {
    id: 'drawing-recognition',
    title: '二维图纸自动识别',
    desc: '多格式图纸导入 → 复杂标注自动识别 → 气泡图与检测计划表导出。',
    duration: '59 秒',
    poster: drawingPoster,
    posterAlt: '二维图纸自动识别软件界面：图纸标注识别与气泡图结果',
    src: '/assets/media/review/drawing-recognition/drawing-recognition.mp4',
    caption: '二维图纸自动识别：多格式图纸导入、复杂标注自动识别，到气泡图与检测计划表导出',
  },
  {
    id: 'auto-dimensioning',
    title: '自动标注自动出图',
    desc: '三维模型自动标注尺寸与公差 → 二维工程图自动出图，含零件明细表与技术要求。',
    duration: '1 分 05 秒',
    poster: autoDimensioningPoster,
    posterAlt: '自动标注自动出图软件界面：模型自动标注与工程图输出结果',
    src: '/assets/media/demos/auto-dimensioning.mp4',
    caption: '自动标注自动出图：三维模型自动标注尺寸与公差，到二维工程图自动生成与出图',
  },
];

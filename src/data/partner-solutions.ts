/**
 * 合作伙伴解决方案页内容数据。
 *
 * 长广溪 · 众脉部分：
 *   产品矩阵来自《众脉 BP · 商业计划书》第 10 页，各条目的关键指标取自第 11–16 页的
 *   「关键参数」；重点行业来自第 8 页（市场）、第 11–16 页（工艺）与第 20 页（标杆客户）；
 *   客户现场案例来自第 21 页（河源精电）。
 *
 * 配图与演示视频取自《（BP）众脉AI柔性工作站及产线》PPT：
 * 产品实拍、客户 logo 墙、资质证书，以及 5 段工作站/产线演示视频。
 * 重点行业配图是代码绘制的 SVG 示意图，放在 public/assets/img/partner/。
 *
 * 中央厨房部分是客户后续提供的素材（横屏整线三维仿真 + 竖屏现场实拍两段视频），
 * 原先的占位文字与示意图已移除；产线参数取自仿真画面内的面板，封面帧用 ffmpeg 抽帧生成。
 */

import type { ImageMetadata } from 'astro';

import pickPlaceImg from '../assets/media/partner/pick-place.jpg';
import lineImg from '../assets/media/partner/line.jpg';
import robotArmImg from '../assets/media/partner/robot-arm.png';
import customerSiteImg from '../assets/media/partner/customer-site.jpg';
import clientLogosImg from '../assets/media/partner/client-logos.jpg';
import certificatesImg from '../assets/media/partner/certificates.jpg';
import centralKitchenLinePoster from '../assets/media/partner/central-kitchen-line-poster.jpg';
import centralKitchenStationPoster from '../assets/media/partner/central-kitchen-station-poster.jpg';

import screwLockPoster from '../assets/media/partner/screw-lock-poster.jpg';
import pickPlacePoster from '../assets/media/partner/pick-place-poster.jpg';
import solderingPoster from '../assets/media/partner/soldering-poster.jpg';
import agvPoster from '../assets/media/partner/agv-poster.jpg';
import linePoster from '../assets/media/partner/line-poster.jpg';

/** 演示视频放在 public/ 下（astro:assets 不处理视频） */
const VIDEO_BASE = '/assets/media/partner';

/** 产品矩阵条目（BP 第 10 页；关键指标取自 BP 第 11–16 页的「关键参数」） */
export interface MatrixItem {
  title: string;
  desc: string;
  /** 关键指标（金色等宽字） */
  metric: string;
}

/** 产品矩阵分层 */
export interface MatrixTier {
  tier: string;
  tierEn: string;
  /** 该层定位语 */
  position: string;
  /** 该层配图：统一 16:9 深蓝底，实拍与透明底产品图都用 contain 摆放 */
  banner: ImageMetadata;
  bannerAlt: string;
  items: MatrixItem[];
}

/**
 * 按价值链升序排列：核心部件级 → 工作站级 → 产线级。
 * 页面左侧那条贯穿的闭环导轨与此处三层一一对应，读下来就是「自研部件 → 单站装备 → 整线集成」。
 */
export const productMatrix: MatrixTier[] = [
  {
    tier: '核心部件级',
    tierEn: 'CORE COMPONENTS',
    position: '具身核心部件全栈自研，系统级壁垒',
    banner: robotArmImg,
    bannerAlt: '协作机械臂产品图',
    items: [
      { title: '协作机械臂', desc: '一体化关节，力感知碰撞检测', metric: '变加速度柔顺控制' },
      { title: '灵巧手', desc: '腕部视觉 + AI 力控，自主抓取', metric: '臂端自主抓取' },
      { title: '伺服驱动器', desc: '21 位精度磁编码器，RTOS 硬实时', metric: '21 位 · RTOS <1μs' },
      { title: '六维力传感器', desc: '全闭环力控算法', metric: '全闭环力位混合控制' },
    ],
  },
  {
    tier: '工作站级',
    tierEn: 'WORKSTATION',
    position: '高精度、高柔性、自适应、自决策的单站装备',
    banner: pickPlaceImg,
    bannerAlt: '协作机器人上下料工作站现场：机械臂、料盘与示教屏',
    items: [
      { title: '智能柔性螺丝锁付机器人工作站', desc: '高速锁付，M1–M5 多角度', metric: '±0.02mm · 2.5s/颗' },
      { title: '智能柔性抓取移动工作站', desc: '3D 视觉 + 多种夹爪适配', metric: '效率 +50% · ROI 12–18 月' },
      { title: '智能柔性检测机器人工作站', desc: 'AI 视觉缺陷检测', metric: 'AI 识别率 ≥99%' },
      { title: '智能柔性打磨工作站', desc: '恒力力控 ±1N 精度', metric: '±1N · Ra0.2μm' },
    ],
  },
  {
    tier: '产线级',
    tierEn: 'PRODUCTION LINE',
    position: '模块化重组、数据驱动的整线集成',
    banner: lineImg,
    bannerAlt: '多工位机器人柔性产线全景',
    items: [
      { title: 'AI 具身柔性产线', desc: '模块化集成，换线 8h → 10min', metric: '换线 8h → 10min' },
      { title: 'Xi- 黑匣子追溯', desc: '业内首创故障追溯系统', metric: '全流程数据追溯' },
      { title: 'Cobot Brain AI 平台', desc: '建模 / 仿真 / 数字孪生', metric: '现场调试 −70%' },
    ],
  },
];

/** 中央厨房两段素材：横屏整线三维仿真 + 竖屏现场实拍（客户端提供） */
export interface KitchenVideo {
  /** 版式标签，如「整线三维仿真」 */
  tag: string;
  title: string;
  desc: string;
  /** 竖屏素材（版式上占窄栏、按原始比例留框） */
  portrait?: boolean;
  poster: ImageMetadata;
  video: string;
  alt: string;
  caption: string;
}

export const kitchenVideos: KitchenVideo[] = [
  {
    tag: '整线三维仿真',
    title: '机器人三明治制作自动柔性流水线',
    desc: '按三维产线动画还原整线：蓝色模块带主输送 + 下层托盘回流，面包片、生菜、黄瓜、蛋片、肉片与酱料逐层叠放，11 工位同步步进。',
    poster: centralKitchenLinePoster,
    video: `${VIDEO_BASE}/central-kitchen-line.mp4`,
    alt: '机器人三明治制作自动柔性流水线三维仿真画面：整线布局与机器人、工位状态面板',
    caption: '中央厨房 · 机器人三明治制作自动柔性流水线（三维仿真 · 44 秒）',
  },
  {
    tag: '现场实拍',
    title: '协作机器人食品托盘作业',
    desc: '中央厨房现场：协作机器人配定量作业头，在食品托盘上逐盘完成工序，与人工同区协同。',
    portrait: true,
    poster: centralKitchenStationPoster,
    video: `${VIDEO_BASE}/central-kitchen-station.mp4`,
    alt: '中央厨房现场实拍：协作机器人在食品托盘上执行定量作业',
    caption: '中央厨房 · 现场实拍（竖屏 · 65 秒）',
  },
];

/**
 * 重点行业（BP P8 市场数据、P11–P16 工艺与参数、P20 标杆客户；
 * 中央厨房为客户后续提供的整线仿真 + 现场实拍素材）。
 * 每项一个行业：3C 与汽车零部件用示意图，中央厨房用实拍视频。
 */
export interface IndustryCase {
  id: string;
  title: string;
  en: string;
  desc: string;
  /** 场景标签 */
  tags: string[];
  /** 关键指标；资料不足时留空数组 */
  metrics: { label: string; value: string }[];
  /** 标杆客户；资料不足时省略 */
  clients?: string[];
  /**
   * 配图：public/ 下的 SVG 示意图（与 videos 二选一）。
   * 画布按 11/5 横幅绘制（1100×500），与视频卡片的媒体区同比例，左右两张卡片因此等高对齐。
   */
  svg?: string;
  alt?: string;
  /** 视频素材：客户端提供（与 svg 二选一） */
  videos?: KitchenVideo[];
  /** 视频素材的数据来源备注 */
  videoNote?: string;
}

export const industryCases: IndustryCase[] = [
  {
    id: '3c-auto',
    title: '3C 与汽车零部件',
    en: '3C ELECTRONICS & AUTO PARTS',
    desc: '面向 3C 电子与汽车零部件的高强度重复工位，提供螺丝锁付、上下料、焊锡、点胶、检测、搬运的柔性工作站与整线方案，以车规级的精度与一致性支撑客户大规模量产。',
    tags: ['3C 电子', '车载显示', '汽车零部件', '半导体', '家电', '机加工'],
    metrics: [
      { label: '重复定位精度', value: '±0.02mm' },
      { label: '换线时间', value: '8h → 10min' },
      { label: '投资回报', value: 'ROI 12–18 个月' },
      { label: '质量体系', value: 'IATF16949 车规级' },
    ],
    clients: ['京东方', '天马', 'TCL', '友达', '华阳', '河源精电'],
    svg: '/assets/img/partner/zm-industry-3c-auto.svg',
    alt: '3C 电子与汽车零部件产线上协作机器人执行锁付与视觉检测示意',
  },
  {
    id: 'central-kitchen',
    title: '中央厨房',
    en: 'CENTRAL KITCHEN',
    desc: '以三明治自动制作为例的中央厨房柔性产线：11 个工位、6 台协作机器人、1500 件每小时的整线方案，配现场实拍的机器人托盘作业。',
    tags: ['食品级 PP 托盘 600×400', 'SKU-A 经典三明治', '同族换型 ≤10 min', '红外可视化安全区域'],
    metrics: [
      { label: '产能', value: '1500 件/h' },
      { label: '工位 / 机器人', value: '11 个 / 6 台' },
      { label: '单件节拍', value: '2.4 s/件' },
      { label: '用工', value: '1~2 人' },
    ],
    videos: kitchenVideos,
    videoNote: '产线参数取自客户提供的仿真画面内面板。',
  },
];

/** 产品演示视频（PPT 第 13–17 页内嵌视频） */
export interface DemoVideo {
  title: string;
  desc: string;
  poster: ImageMetadata;
  video: string;
  alt: string;
  caption: string;
}

export const demos: DemoVideo[] = [
  {
    title: 'AI 螺丝锁付工作站',
    desc: '六轴多角度锁付，扭矩误差 ±3%，数据同步 MES',
    poster: screwLockPoster,
    video: `${VIDEO_BASE}/screw-lock.mp4`,
    alt: 'AI 螺丝锁付工作站演示封面',
    caption: 'AI 螺丝锁付工作站 · 演示视频',
  },
  {
    title: 'AI 智能上下料机工作站',
    desc: '3D 视觉 + 多种夹爪，连续作业免停机换料',
    poster: pickPlacePoster,
    video: `${VIDEO_BASE}/pick-place.mp4`,
    alt: 'AI 智能上下料机工作站演示封面',
    caption: 'AI 智能上下料机工作站 · 演示视频',
  },
  {
    title: 'AI 智能焊锡工作站',
    desc: '焊接质量稳定一致，精准恒力控制',
    poster: solderingPoster,
    video: `${VIDEO_BASE}/soldering.mp4`,
    alt: 'AI 智能焊锡工作站演示封面',
    caption: 'AI 智能焊锡工作站 · 演示视频',
  },
  {
    title: 'AI 智能 AGV 搬运工作站',
    desc: '激光 SLAM 导航，负载 50kg–1000kg',
    poster: agvPoster,
    video: `${VIDEO_BASE}/agv.mp4`,
    alt: 'AI 智能 AGV 搬运工作站演示封面',
    caption: 'AI 智能 AGV 搬运工作站 · 演示视频',
  },
  {
    title: 'AI 具身柔性生产线',
    desc: '模块化设备快速重组，换线 8 小时 → 10 分钟',
    poster: linePoster,
    video: `${VIDEO_BASE}/line.mp4`,
    alt: 'AI 具身柔性生产线演示封面',
    caption: 'AI 具身柔性生产线 · 演示视频',
  },
];

/** 客户现场案例（第 21 页） */
export const customerCase = {
  client: '河源精电',
  img: customerSiteImg,
  alt: '客户现场：作业人员与协作机器人在产线上协同作业',
  /** 注：配图为众脉现场实拍；「河源精电」归属待客户确认后再写入图注 */
  caption: '客户现场 · 协作机器人与产线实景',
  quote:
    '与河源精电这两年的测试磨合不仅给众脉带来了可观的潜在订单，更是千金难买的真实产线跑机数据，这种在顶级产线里打磨出来的技术迭代速度。',
  /** 引言中需要高亮的短语（按出现顺序） */
  highlights: ['千金难买的真实产线跑机数据', '顶级产线里打磨出来的技术迭代速度'],
};

/** 合作客户与资质背书 */
export const credentials = {
  logos: {
    img: clientLogosImg,
    alt: '众脉机器人的部分合作客户标识：一汽-大众、红旗、华为、西门子、特斯拉、小米、阿里云等',
    caption: '服务客户（部分）',
  },
  certs: {
    img: certificatesImg,
    alt: '众脉机器人取得的资质与认证证书',
    caption: '资质与认证（部分）',
  },
};

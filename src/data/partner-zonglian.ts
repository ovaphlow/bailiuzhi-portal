/**
 * 合作伙伴 · 上海纵涟智驱科技 内容数据。
 *
 * 页面以此为主轴：公司简介（突出上海大学背景）→ 核心产品（蛇形机械臂、
 * 狭小空间巡检机器人）→ 主要客户，其余内容作为技术支撑。
 *
 * 内容摘自《上海纵涟智驱科技公司简介 1.0.pdf》：
 *   P2 摘要、P3 应用场景价值矩阵、P4 公司简介、
 *   P7 产品与技术矩阵（核心产品与产品线）、
 *   P9 关键技术能力，以及 P11–P37 中的代表性案例（精选 5 个）。
 *
 * 配图取自同一 PDF 的内嵌原图，案例配图放在 src/assets/media/partner/zonglian/，
 * 构建期由 astro:assets 派生多尺寸 WebP。
 * 两款核心产品的媒体区是代码绘制的 SVG 示意图，放 public/assets/img/partner/ 下的
 * zonglian-snake-arm.svg 与 zonglian-narrow-space.svg。
 * 演示视频（4 段）放 public/assets/media/partner/zonglian/（astro:assets 不处理视频），
 * 封面帧放 src/assets/media/partner/zonglian/，见 demoVideos。
 */

import type { ImageMetadata } from 'astro';

import snakeArmFieldPoster from '../assets/media/partner/zonglian/snake-arm-field-poster.jpg';
import generatorGapPoster from '../assets/media/partner/zonglian/generator-gap-poster.jpg';
import generatorPlatformPoster from '../assets/media/partner/zonglian/generator-platform-poster.jpg';
import longArmPoster from '../assets/media/partner/zonglian/long-arm-poster.jpg';
import generatorImg from '../assets/media/partner/zonglian/generator-inspection.jpg';

/** 主要客户的官方标识（背景透明 PNG；来源与去背说明见仓库根目录 _partner-logos/README.md） */
import comacLogo from '../assets/img/partner-logos/comac.png';
import aeccLogo from '../assets/img/partner-logos/aecc.png';
import sacLogo from '../assets/img/partner-logos/sac.png';
import csscLogo from '../assets/img/partner-logos/cssc.png';
import cgnLogo from '../assets/img/partner-logos/cgn.png';
import heLogo from '../assets/img/partner-logos/he.png';

/** 合作方基本信息 */
export const partner = {
  name: '上海纵涟智驱科技有限公司',
  short: '上海纵涟智驱科技',
  en: 'SHANGHAI ZONGLIAN INTELLIGENT DRIVE TECHNOLOGY',
  tagline: '复杂工业环境智能运维领域的定义者和引领者',
  slogan: '特种机器人 + AI 数据智能，攻克运维「最后一米」难题',
  about: [
    '纵涟智驱科技成立于 2026 年，是上海大学机器人技术在智能运维领域落地转化的重要载体，由上海大学特种机器人方向的博导团队领衔创办，专注于复杂工业环境的智能运维，攻克运维「最后一米」难题。',
    '公司聚焦智能运维巡检一体化解决方案，提供面向复杂环境的智能运维机器人与 AI 健康管理云平台，服务于航空发动机、舰船燃机、电厂发电机与汽轮机、电网、核电、石油化工等高端装备制造行业。核心团队依托上海大学实验室的原创技术积累，联合哈工大机器人所的产业经验，结合本地研发与制造服务能力，为客户打造高质量、具竞争力的在线智能运维方案，助力客户降本增效，提升综合竞争力。',
    '立足上海、服务全国、走向世界，纵涟智驱科技持续赋能中国高端制造企业，携手共赴「智造」新高度。',
  ],
  /** 简介区的上海大学背景高亮（页面渲染成金色标签） */
  origins: ['源自上海大学实验室', '上海大学博导团队领衔', '多项自主知识产权'],
};

/** 摘要：我们解决什么根本问题（P2） */
export interface ValueProp {
  title: string;
  desc: string;
}

export const valueProps: ValueProp[] = [
  {
    title: '行业趋势',
    desc: '工业运维「无人化、智能化」已成为不可逆转的趋势，但当前的自动化方案在极端复杂场景下存在巨大盲区，无法满足日益增长的安全与效率需求。',
  },
  {
    title: '核心痛点',
    desc: '在管道内部、密闭设备腔室、高危辐射区等极端场景，仍普遍依赖人工进行高危作业，面临高安全风险、高人力成本与低作业效率的多重挑战。',
  },
  {
    title: '我们的定位',
    desc: '专注于填补行业能力空白、解决棘手难题的「特种兵」，做细分领域的绝对专家。',
  },
  {
    title: '一句话价值',
    desc: '通过「特种机器人 + AI 智能平台」的端到端技术闭环，为电力、石化、核电、航空发动机／舰船燃机／发电机／汽轮机等高价值行业，彻底解决设备「看不见、进不去、检不了」的核心痛点。',
  },
];

/** 应用场景价值矩阵（P3） */
export interface MarketItem {
  name: string;
  scene: string;
  /** 价值标签，如「不停电预测性维护」 */
  value: string;
  /** 价值结果，如「避免单次停机损失超百万元」 */
  effect: string;
}

export interface MarketTier {
  tag: string;
  items: MarketItem[];
}

export const markets: MarketTier[] = [
  {
    tag: '核心市场 · 支柱产业',
    items: [
      {
        name: '电力行业',
        scene: 'GIS 设备内检 / 锅炉内部监测',
        value: '不停电预测性维护',
        effect: '避免单次停机损失超百万元',
      },
      {
        name: '石化行业',
        scene: '大型立式储罐内部腐蚀 / 损伤检测',
        value: '大幅缩短检修周期',
        effect: '检修成本降 70%，停产损失减 90%',
      },
      {
        name: '核电行业',
        scene: '反应堆狭窄腔室 / 管道检查',
        value: '唯一可行工具',
        effect: '人员辐射暴露时间减 99%',
      },
    ],
  },
  {
    tag: '技术高地 · 航空船舶',
    items: [
      {
        name: '航空发动机 / 舰船燃机在役检修',
        scene: '突破传统人工与内窥镜限制，实现发动机内部高难度精密检测，彻底变革航空发动机大修范式。',
        value: '预期收益',
        effect: '检修成本与周期降低一个数量级',
      },
    ],
  },
];

/**
 * 产品与技术矩阵（P7）——「核心产品」以外的产品线，作为完整产品矩阵展示。
 * `id` 供页面把已单独展开的核心产品从矩阵里剔除，避免重复。
 * 「巡管者」管道内检测机器人已下线，不再列入产品矩阵（管道内检场景仍由
 * 核心产品「狭小空间巡检机器人」与精选案例 02 承载）。
 */
export interface ProductLine {
  id: 'narrow' | 'platform';
  series: string;
  product: string;
  desc: string;
}

export const products: ProductLine[] = [
  {
    id: 'narrow',
    series: '「洞察者」系列',
    product: '狭小空间巡检机器人',
    desc: '搭载超冗余机械臂与微型移动平台，实现复杂工况下无孔不入的近距离感知与数据采集。',
  },
  {
    id: 'platform',
    series: '「先知」平台',
    product: 'AI 健康管理云平台',
    desc: '基于独家检测数据构建智能算法模型，提供预测性维护服务，实现从「工具」到「服务」的商业模式升级。',
  },
];

/** 演示视频目录：放 public/ 下（astro:assets 不处理视频，public 原样拷贝到 dist） */
export const VIDEO_BASE = '/assets/media/partner/zonglian';

/** 核心产品：页面重点展开的两款（P7 产品矩阵 + P11–P13 蛇形机械臂） */
export interface CoreProduct {
  id: string;
  /** 序号标签，如「核心产品 01」 */
  series: string;
  name: string;
  subtitle: string;
  en: string;
  desc: string;
  /** 关键指标 */
  specs: { label: string; value: string }[];
  /** 可搭载传感器 / 能力特点 */
  capabilities: string[];
  /** 应用场景 */
  scenes: string;
  /** 媒体区示意图：public/ 下的 SVG（矢量图不入 astro:assets，按绝对路径引用） */
  svg: string;
  /** 示意图替代文本 */
  alt: string;
}

export const coreProducts: CoreProduct[] = [
  {
    id: 'snake-arm',
    series: '核心产品 01',
    name: '蛇形机械臂',
    subtitle: '狭长、具有自支能力的超冗余机械臂',
    en: 'SNAKE-ARM ROBOT',
    desc: '结构紧凑、运动灵活，狭小空间作业能力强，具备限制空间下的避障能力与极端环境下的适应能力。已获批 2024 年度国家商用飞机制造工程技术研究中心创新基金，应用于大型民机外观检测 —— 大部段入场验收、机场航司绕机巡检、油箱检测、紧固件检测、辅助装配等。',
    specs: [
      { label: '臂长', value: '4.5m' },
      { label: '质量', value: '35kg' },
      { label: '末端负载', value: '5kg' },
      { label: '自由度', value: '10' },
    ],
    capabilities: ['高清照相机', '红外传感器', '热视觉传感器', '3D 激光扫描仪', '定制化传感器'],
    scenes: '大型民机外观检测 / 航空发动机内部检测 / 化工厂与钢铁厂等受限空间探查',
    svg: '/assets/img/partner/zonglian-snake-arm.svg',
    alt: '蛇形机械臂穿过狭小舱口进入机身内部执行紧固件检测示意',
  },
  {
    id: 'narrow-space',
    series: '核心产品 02',
    name: '狭小空间巡检机器人',
    subtitle: '超冗余机械臂 + 微型移动平台',
    en: 'NARROW-SPACE INSPECTION ROBOT',
    desc: '面向管道内部、密闭设备腔室等极端受限场景，搭载超冗余机械臂与微型移动平台，实现复杂工况下无孔不入的近距离感知与数据采集，替代人工进入高危、狭小区域巡检作业。',
    specs: [
      { label: '结构', value: '超冗余多关节机械臂' },
      { label: '载具', value: '微型移动平台' },
      { label: '感知', value: '多传感器融合' },
      { label: '作业', value: '狭小空间近距巡检' },
    ],
    capabilities: ['近距离视觉成像', '多传感器数据采集', '受限空间自主避障', '管道 / 腔室内部巡检'],
    scenes: '管道内检测 / 密闭腔室与设备内部巡检 / 核电、石化等高危受限区域',
    svg: '/assets/img/partner/zonglian-narrow-space.svg',
    alt: '狭小空间巡检机器人以微型移动平台搭载超冗余机械臂进入管道内部巡检示意',
  },
];

/**
 * 主要客户（部分）：以官方标识 logo 墙呈现。
 * 标识图内已包含中英文企业名，故 `name` / `en` 仅用于 `alt` 文案。
 */
export interface Client {
  name: string;
  /** 英文标识 */
  en: string;
  /** 官方标识图（背景透明 PNG，可直接叠在白底卡片上） */
  logo: ImageMetadata;
}

export const clients: Client[] = [
  { name: '中国商飞', en: 'COMAC', logo: comacLogo },
  { name: '中国航发', en: 'AECC', logo: aeccLogo },
  { name: '航空工业沈飞', en: 'AVIC SAC', logo: sacLogo },
  { name: '中国船舶', en: 'CSSC', logo: csscLogo },
  { name: '中广核', en: 'CGN', logo: cgnLogo },
  { name: '哈电集团', en: 'HARBIN ELECTRIC', logo: heLogo },
];

/** 演示视频（4 段，置于纵涟区块最下方；点击由 Lightbox 播放） */
export interface DemoVideo {
  title: string;
  desc: string;
  /** 封面帧（src/assets，构建期派生多尺寸 WebP） */
  poster: ImageMetadata;
  /** 视频路径（public/ 下，原样拷贝） */
  video: string;
  alt: string;
  caption: string;
}

export const demoVideos: DemoVideo[] = [
  {
    title: '蛇形机械臂受限空间作业',
    desc: '超长蛇形臂在厂区管廊、脚手架等受限环境中穿行与避障。',
    poster: snakeArmFieldPoster,
    video: `${VIDEO_BASE}/snake-arm-field.mp4`,
    alt: '蛇形机械臂在厂区管廊间作业的实拍画面',
    caption: '蛇形机械臂受限空间作业 · 演示视频',
  },
  {
    title: '发电机气隙检测',
    desc: '侧向可伸缩连杆机构，适应 55–150mm 定转子气隙。',
    poster: generatorGapPoster,
    video: `${VIDEO_BASE}/generator-gap.mp4`,
    alt: '发电机巡检机器人进入定转子气隙检测的实拍画面',
    caption: '发电机气隙检测 · 演示视频',
  },
  {
    title: '发电机检测平台',
    desc: '免抽转子的发电机检测平台全流程演示。',
    poster: generatorPlatformPoster,
    video: `${VIDEO_BASE}/generator-platform.mp4`,
    alt: '发电机检测平台演示封面',
    caption: '发电机检测平台 · 演示视频',
  },
  {
    title: '气缸式重力补偿超长机械臂',
    desc: '气缸式重力补偿结构，支撑机械臂向高处稳定伸展。',
    poster: longArmPoster,
    video: `${VIDEO_BASE}/long-arm.mp4`,
    alt: '气缸式重力补偿超长机械臂演示封面',
    caption: '气缸式重力补偿超长机械臂 · 演示视频',
  },
];

export const productMoat =
  '核心技术源于上海大学实验室的原创研发，在管道复杂地形的通过性设计、仿生多关节机械臂结构设计及特种防护涂层工艺等领域，已拥有多项自主知识产权，构建了深厚的护城河。';

/** 关键技术能力（P9） */
export const capabilities = [
  {
    title: '特殊环境作业装备',
    desc: '面向船舶动力装置舱室等空间受限、环境复杂的场景，研发适应狭小空间、高温、振动环境的检测与维修机器人。',
  },
  {
    title: '多传感器融合技术',
    desc: '设备状态的多维度感知（温度、振动、声音、图像）与故障诊断。',
  },
  {
    title: '智能化运维技术',
    desc: '支撑「数字赋能智能制造」，在智能检测、故障诊断、预测性维护等方面提供技术支撑。',
  },
  {
    title: 'AI 设备健康管理平台',
    desc: '基于独家检测数据构建智能算法模型，提供预测性维护服务及检修建议。',
  },
  {
    title: '远程运维支持系统',
    desc: '开发虚拟运维支持系统，研究远程操作、虚实交互技术等。',
  },
];

/** 精选案例（P11–P37，共 12 个，此处保留最具代表性的 1 个；蛇形机械臂已作为核心产品单独展开，不重复） */
export interface ZonglianCase {
  no: string;
  title: string;
  subtitle: string;
  desc: string;
  img: ImageMetadata;
  alt: string;
  /** 关键指标/要点 */
  specs: string[];
}

export const cases: ZonglianCase[] = [
  {
    no: '01',
    title: '发电机巡检机器人',
    subtitle: '免抽转子，进入定转子气隙巡检',
    desc: '传统人工检修需要抽出发电机转子，检测效率低、劳动强度大、安全隐患高；发电机巡检机器人可直接进入气隙完成巡检，效率与安全同步提升。',
    img: generatorImg,
    alt: '发电厂发电机转子吊装检修现场',
    specs: ['探测间隙 55–150mm', '全长 630mm', '宽度 320mm', '厚度 20mm', '质量 4.7kg', '速度 150mm/s', '线缆 25m'],
  },
];

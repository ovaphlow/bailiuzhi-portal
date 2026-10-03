/**
 * 合作伙伴 · 上海纵涟智驱科技 内容数据。
 *
 * 页面以此为主轴：公司简介（突出上海大学背景）→ 核心产品（蛇形机械臂、
 * 狭小空间巡检机器人）→ 主要客户，其余内容作为技术支撑。
 *
 * 内容摘自《上海纵涟智驱科技公司简介 1.0.pdf》：
 *   P2 摘要、P3 应用场景价值矩阵、P4 公司简介、
 *   P7 产品与技术矩阵（核心产品与产品线）、
 *   P9 关键技术能力，以及 P11–P37 中的代表性案例。
 *
 * 另补《张智-上海纵涟智驱商业计划书 0927-天使会版.pptx》P7
 * 「03 产品矩阵：一平台·两尖刀·一底座」：
 *   尖刀① 燃气轮机孔探检测、尖刀② 航发叶片在役检测 →  应用场景价值矩阵「技术高地」层；
 *   平台层「蛇形臂 + 洞察者移动检测平台」  →  完整产品矩阵新增一条，蛇形机械臂补「可换载荷」；
 *   底座层「先知」AI 平台                →  「先知」平台条目改用 BP 原文。
 *   该页底部「已落地背书／存量现金流」两行为 BP 商业化总结，与案例 01／02 重复，页面不收录。
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
import aircraftFuselageImg from '../assets/media/partner/zonglian/aircraft-fuselage-inspection.jpg';
import aircraftSensorImg from '../assets/media/partner/zonglian/aircraft-inspection-sensor.jpg';
import aircraftRampImg from '../assets/media/partner/zonglian/aircraft-ramp-inspection.jpg';

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

/** 应用场景价值矩阵（P3；「技术高地 · 航空船舶」层另取 BP P7/P12/P13 的两条尖刀场景） */
export interface MarketItem {
  name: string;
  /** 状态标签，如「样机在研」。仅未交付的场景使用，避免与「可批量复制」并置造成歧义 */
  status?: string;
  scene: string;
  /** 价值标签，如「不停电预测性维护」 */
  value: string;
  /** 价值结果，如「避免单次停机损失超百万元」 */
  effect: string;
}

export interface MarketTier {
  tag: string;
  /**
   * 该层的补充内容（可选）。层级标题条不从这里取字 —— 标题条每层都只有「序号 + 层级名 + 场景数」
   * （原给材料 P3 里三个层级并列同级、都是单行标题带）。
   * 「技术高地 · 航空船舶」层用 PPT P7 的「一平台 · 两尖刀 · 一底座」：
   * `label` 是 P7 的**页副标题**，主语是下面的结构块（不是层级别名），
   * 所以页面拿它做卡内子块标题，`layers` 是子块里的平台层／底座层。
   */
  head?: {
    /** 子块标题（PPT P7 页副标题原文），如 一平台 · 两尖刀 · 一底座 */
    label: string;
    /**
     * 两尖刀**之下**的承托层，顺序照 BP P7 的版面：尖刀①②（上）→ 平台层 → 底座层（下），
     * 页面用向下箭头把这条顺序画出来。别把这两层放到尖刀上面 —— 那就把 BP 的顺序倒过来了。
     * 层名里已含「平台层／底座层」，页面不再配圆形文字徽标。
     */
    layers: { name: string; desc: string }[];
  };
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
    /*
     * 本层不放配图：BP 全篇没有任何燃气轮机孔探／航发叶片的现场素材，
     * P7 卡片里那张实拍是上海大学实验室场景，与场景对不上，故不采用。
     * 视觉重量由标题条承担。
     */
    head: {
      label: '一平台 · 两尖刀 · 一底座',
      /*
       * 顺序照 BP P7 版面：标题 → 尖刀①② → 平台层 → 底座层。
       * P7 上两个「直接连接符」从两张尖刀卡向下接到平台层，又一个向下接到底座层。
       */
      layers: [
        {
          name: '平台层：蛇形臂 + 洞察者移动检测平台',
          desc: '通用进入平台，载荷可换 —— 一套平台适配多场景，跨行业复制只换载荷、不换平台。',
        },
        {
          name: '底座层：「先知」AI 平台',
          desc: '缺陷识别、数字孪生、数据资产：独家工业数据训练算法模型，检测数据持续沉淀、越用越聪明，构筑长期数据壁垒。',
        },
      ],
    },
    items: [
      {
        name: '燃气轮机孔探检测',
        status: '样机在研',
        scene: '燃气轮机孔探是出厂与在役维保的必经环节。深孔场景下孔探仪刚度不足、抖动明显，直接影响检测质量与精度；船用燃机检测还需专家跟船，周期长、成本高。',
        value: '蛇形臂 + 孔探仪',
        effect: '为孔探仪提供刚性支撑与导向，SOP 化操作、无需专家跟船，提精度、缩周期、降成本。',
      },
      {
        name: '航发叶片在役检测',
        status: '样机在研',
        scene: '航空发动机出厂试飞前、服役期每次任务后，都必须检查进气舱与叶片。目前完全依靠人爬进进气舱、用长杆逐叶拨动检查，高危、低效、易漏检。',
        value: '移动平台 + 拨叶扫描',
        effect: '爬坡越障自主进入进气舱，逐叶拨动并扫描、AI 识别缺陷，以机器定量替代人眼定性。',
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
  id: 'narrow' | 'mobile' | 'ai';
  series: string;
  product: string;
  desc: string;
}

/**
 * 「洞察者」的归属以 BP P7 为准：BP 写作「蛇形臂 + 洞察者移动检测平台」，
 * 故此处新增「洞察者」移动检测平台一条；狭小空间巡检机器人改用「受限空间巡检」作系列名。
 * `narrow` 一条不在页面上单独渲染（已由核心产品二展开），仅用于占位与后续扩展。
 */
export const products: ProductLine[] = [
  {
    id: 'narrow',
    series: '受限空间巡检',
    product: '狭小空间巡检机器人',
    desc: '搭载超冗余机械臂与微型移动平台，实现复杂工况下无孔不入的近距离感知与数据采集。',
  },
  {
    id: 'mobile',
    series: '「洞察者」系列',
    product: '移动检测平台',
    desc: '通用进入平台，载荷可换。一套平台适配多场景，新场景开发成本与周期大幅降低——跨行业复制只换载荷、不换平台。',
  },
  {
    id: 'ai',
    series: '「先知」平台',
    product: 'AI 健康管理云平台',
    desc: '缺陷识别、数字孪生、数据资产：独家工业数据训练算法模型，检测数据持续沉淀、越用越聪明，构筑长期数据壁垒。',
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
  /** 可换载荷（BP P7 平台层「载荷可换」；与 capabilities 分列，避免「高清照相机/高清视觉」之类的重复项混在一张列表里） */
  payloads?: string[];
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
    payloads: ['孔探仪', '高清视觉', '超声测厚', '拨叶装置'],
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

/**
 * 精选案例（P11–P37）。
 *
 * 目前收录两条：01 大型民机外观检测（**主案例**，来自纵涟简介 P14–P15 与 BP P7/P10），
 * 02 发电机巡检机器人。主案例用 `featured` 标记，页面据此渲染成三格拼贴 + 深色要点带。
 *
 * 口径约定（2026-10 与业主确认）：
 *   - 客户不具名，标题用「大型民机外观检测」，只以「国家商用飞机制造工程技术研究中心创新基金」作为背书；
 *   - 设备形态统一为**超冗余蛇形机械臂**，不使用「移动剪叉升降平台 + 关节臂」那组渲染图（P14），
 *     以免与核心产品卡片自相矛盾；
 *   - **写交付状态**：本案内容较少，经业主确认可写 BP 原文的「已签约，预计年底交付」（2026-10 修订）；
 *   - 不写成立时间，避免与 2024 年度基金并列时产生时间线冲突。
 *
 * 素材说明：三张拼贴图互不重复 —— 主图机库作业全景、右上臂端检测载荷、右下机场绕机巡检。
 * 绕机巡检那张取自纵涟简介 P15（1000×652，原页无来源水印）；P15 另有三张带第三方水印
 * （「了不起的中国制造」等），未采用。若业主能提供自有实拍，优先替换。
 */
export interface ZonglianCase {
  no: string;
  title: string;
  subtitle: string;
  desc: string;
  img: ImageMetadata;
  alt: string;
  /** 图片说明（featured 卡片压在主图上的图注） */
  caption?: string;
  /** 是否为主案例：页面按三格拼贴 + 深色要点带渲染 */
  featured?: boolean;
  /** 拼贴小图（featured 案例：主图右侧竖排的两张小图） */
  tiles?: Array<{
    img: ImageMetadata;
    alt: string;
    caption: string;
  }>;
  /** 要点区的标签名，默认「应用场景」 */
  specsLabel?: string;
  /** 关键指标/要点 */
  specs: string[];
}

export const cases: ZonglianCase[] = [
  {
    no: '01',
    featured: true,
    title: '大型民机外观检测',
    subtitle: '超冗余蛇形机械臂，替代人工登临升降梯的目视检查；已签约，预计年底交付',
    desc: '面向大型民机机身蒙皮、口盖与紧固件的外观质量检测需求，以超冗余蛇形机械臂搭载高清视觉、红外热像与 3D 激光扫描等检测载荷，贴近机身表面完成高一致性成像与表面缺陷识别，替代人工登临升降梯的目视检查方式。该项目已签约，预计年底交付。相关技术获批 2024 年度国家商用飞机制造工程技术研究中心创新基金，为大型民机外观检测提供了新的技术手段。',
    img: aircraftFuselageImg,
    alt: '机库内超冗余蛇形机械臂对大型民机机身蒙皮与口盖区域执行外观检测',
    caption: '机库内蛇形机械臂对机身蒙皮、口盖执行外观检测',
    tiles: [
      {
        img: aircraftSensorImg,
        alt: '蛇形机械臂臂端检测载荷：工业相机与环形补光灯',
        caption: '臂端检测载荷：工业相机 + 环形补光',
      },
      {
        img: aircraftRampImg,
        alt: '机场机坪上机务人员对民机机腹实施绕机巡检',
        caption: '机场航司绕机巡检',
      },
    ],
    specsLabel: '应用场景',
    specs: ['大部段入场验收', '机场航司绕机巡检', '油箱检测', '紧固件检测', '辅助装配'],
  },
  {
    no: '02',
    title: '发电机巡检机器人',
    subtitle: '免抽转子，进入定转子气隙巡检',
    desc: '传统人工检修需要抽出发电机转子，检测效率低、劳动强度大、安全隐患高；发电机巡检机器人可直接进入气隙完成巡检，效率与安全同步提升。',
    img: generatorImg,
    alt: '发电厂发电机转子吊装检修现场',
    caption: '发电机抽转子：定转子气隙即巡检作业空间',
    specsLabel: '技术参数',
    specs: ['探测间隙 55–150mm', '全长 630mm', '宽度 320mm', '厚度 20mm', '质量 4.7kg', '速度 150mm/s', '线缆 25m'],
  },
];
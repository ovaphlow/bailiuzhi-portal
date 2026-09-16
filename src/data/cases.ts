/**
 * 案例页内容数据（迁移自 site/cases.html，与 PDF P40–51 对齐）。
 * 所有案例按「产品应用场景」两大分组排列。
 */

/** 首页与案例页共用的场景分组 key */
export type SceneKey = '研发设计端 AI' | '生产制造端 AI';

export const sceneOrder: SceneKey[] = [
  '研发设计端 AI',
  '生产制造端 AI',
];

export const sceneMeta: Record<SceneKey, { en: string; desc: string }> = {
  '研发设计端 AI': {
    en: 'R&D DESIGN AI',
    desc: '自动标注 · 自动出图 · 图纸识别 · 参数化建模，从设计到出图的全链路提速。',
  },
  '生产制造端 AI': {
    en: 'MANUFACTURING AI',
    desc: 'AI 排程 · AI 视觉检测 · 车间仿真，驱动生产效率与质量的双重提升。',
  },
};

export interface CaseCard {
  img: string;
  alt: string;
  big: string;
  title: string;
  desc: string;
  metric: string;
  href?: string;
  scene: SceneKey;
}

/** 客户应用案例（10 个，与 PDF P40–51 第四章对齐，按场景分组排列） */
export const cases: CaseCard[] = [
  // ─── 研发设计端 AI ───────────────────────────────────────
  {
    img: '/assets/img/cases/case-bearing-mbd.svg',
    alt: '轴承行业 MBD 一体化方案界面',
    big: 'BEARING MBD',
    title: '轴承标准件设计、检测一体化',
    desc: '基于 MBD 的轴承标准件设计与检测一体化：总耗时 5 分钟/个，检测表单自动生成（符合最新国标），支持老国标降版图纸自动生成与加工工艺自动生成。',
    metric: '5 分钟/个 · 国标降版图纸',
    href: '/detail-case-bearing-mbd/',
    scene: '研发设计端 AI',
  },
  {
    img: '/assets/img/cases/case-aerospace-mbd.svg',
    alt: '航天复材装配体智能拆分·快速出图',
    big: 'AEROSPACE MBD',
    title: '航天复材装配体智能拆分、快速出图',
    desc: '1000 多个零件、150 多种零件的复材装配体智能拆分，相似零件与装配结构自动识别，零件图纸生成小于 1 分钟/个。',
    metric: '图纸生成 <1 分钟/个',
    href: '/detail-case-aerospace-mbd/',
    scene: '研发设计端 AI',
  },
  {
    img: '/assets/img/cases/case-automation.svg',
    alt: '非标自动化产线图纸一键生成',
    big: 'AUTOMATION',
    title: '非标自动化行业设计出图',
    desc: '装配批量导入、图纸一键生成，分组件实测提速 5 / 6.5 / 7.5 / 8 倍，出图速度 0.5 分钟/标注。',
    metric: '提速 5–8 倍',
    href: '/detail-case-automation/',
    scene: '研发设计端 AI',
  },
  {
    img: '/assets/img/cases/case-vision-light.svg',
    alt: '机器视觉光源选型与出图自动化',
    big: 'VISION LIGHTING',
    title: '机器视觉光源选型、参数化建模、出图自动化',
    desc: '产品大类近 20 种、可变更参数近 40 个，光源自动选型 + 参数化建模 + 出图系统，新增尺寸需求也能自动生成图纸。',
    metric: '光源自动选型 · 出图自动化',
    href: '/detail-case-vision-light/',
    scene: '研发设计端 AI',
  },
  {
    img: '/assets/img/cases/case-one-mode.svg',
    alt: '复杂零部件一模到底设计检测一体化',
    big: 'ONE-MODE MBD',
    title: '复杂零部件实现一模到底的设计、检测一体化',
    desc: 'MBD 信息模型直驱 CAS 自动标注（1 周 → 4 小时），测针自动配置与测点生成（2 周 → 1 小时），测量准备总体提效 60%，NC 加工程序自动生成。',
    metric: '测量准备提效 60%',
    href: '/detail-case-one-mode/',
    scene: '研发设计端 AI',
  },
  {
    img: '/assets/img/cases/case-drawing-recognition.svg',
    alt: '二维图纸智能识别与测量直驱',
    big: 'DRAWING RECOGNITION',
    title: '二维图纸智能识别与测量直驱',
      desc: '图纸智能识别 → 智能解析 → 工艺智能匹配 → 模型智能重构 → 数智直驱测量五步链路，自动产出测量任务、工艺、重构模型与检测表单。',
      metric: '识别-重构-测量直驱',
      href: '/detail-case-drawing-recognition/',
      scene: '研发设计端 AI',
  },
  // ─── 生产制造端 AI ───────────────────────────────────────
  {
    img: '/assets/img/cases/case-steel-pipe.svg',
    alt: '无缝钢管 AI 排程案例',
    big: 'STEEL PIPE APS',
    title: '无缝钢管 AI 排程',
    desc: 'AI 优化工序、智能合并排料、排产优先消化库存，破解原材料损耗与订单呆滞，实现每年 800 万元原材料成本节省。',
    metric: '年省 800 万元 · 订单扩容 20%',
    href: '/detail-case-steel-pipe/',
    scene: '生产制造端 AI',
  },
  {
    img: '/assets/img/cases/case-furniture.svg',
    alt: '智能家具制造 AI 排程案例',
    big: 'FURNITURE APS',
    title: '智能家具制造 AI 排程',
    desc: 'AI 排产算法破解非标定制多、板材利用率低、工艺周期不一致难题，每年原材料成本节约 500 万元，缩短供货期、降低呆滞库存。',
    metric: '年省 500 万元',
    href: '/detail-case-furniture/',
    scene: '生产制造端 AI',
  },
  {
    img: '/assets/img/cases/case-csic-vision.svg',
    alt: '中船某研究所 AI 视觉应用案例',
    big: 'AI VISION',
    title: '中船某研究所 AI 视觉应用',
    desc: '多机械臂检测、视觉成像与视觉分析三大模块协同，面向研究所实际场景的 AI 视觉识别与检测能力落地。',
    metric: '三模块 AI 视觉检测',
    href: '/detail-case-csic-vision/',
    scene: '生产制造端 AI',
  },
  {
    img: '/assets/img/cases/case-motor-simulation.svg',
    alt: '高压电机智能装配车间仿真案例',
    big: 'HIGH-VOLTAGE MOTOR',
    title: '某高压电机智能装配车间仿真',
    desc: '发现并消除需要补救措施才能解决的问题，提高规划准确性与效率，减少投资、降低试错成本。',
    metric: '智能装配仿真',
    href: '/detail-case-motor/',
    scene: '生产制造端 AI',
  }
];

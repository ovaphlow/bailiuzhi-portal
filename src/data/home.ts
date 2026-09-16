/**
 * 首页各区块内容数据（迁移自 site/index.html）。
 *
 * 位图（封面、场景配图）放在 src/assets/ 下按 ESM 导入，交给 astro:assets 在构建期
 * 派生多尺寸 WebP；矢量示意图（cases/*.svg）无需优化，仍放在 public/ 用绝对路径引用。
 */
import type { ImageMetadata } from 'astro';
import scene1 from '../assets/img/scenes/scene1.webp';
import scene2 from '../assets/img/scenes/scene2.webp';
import scene3 from '../assets/img/scenes/scene3.webp';
import rndIntegration from '../assets/img/scenes/rnd-integration.webp';
import smartUpgrade from '../assets/img/scenes/smart-upgrade.webp';
import aiGongcheng from '../assets/img/scenes/ai-gongcheng.webp';

export interface SceneCard {
  idx: string;
  img: ImageMetadata;
  alt: string;
  title: string;
  desc: string;
  tag?: string;
  /** 2-4 个列表项：正文以 li 呈现，底部 tag 行显示各项标题 */
  list?: { title: string; desc?: string }[];
  href?: string;
}

/** 三大核心业务板块（以《公司简介 4.0》第 15 页「助力中小型企业数字化转型三大场景」为准） */
export interface SegmentCard {
  idx: string;
  img: ImageMetadata;
  alt: string;
  title: string;
  points: string[];
}

export const segments: SegmentCard[] = [
  {
    idx: '01',
    img: scene1,
    alt: '研发设计制造一体化',
    title: '研发设计制造一体化',
    points: [
      '高端三维 CAD 软件国产化替代',
      'CAE 仿真分析',
      '工厂布局、产线产能仿真',
      'AI 选型 + 参数化建模',
      '自动标注与自动出图',
      '图纸自动识别',
      '自动检测',
    ],
  },
  {
    idx: '02',
    img: scene2,
    alt: '智能化改造·非标自动化产线',
    title: '智能化改造',
    points: [
      '立体库、AGV、机器人、复合机器人',
      '非标自动化装备',
      '柔性自动化产线',
      '非标自动化装配线',
      'AI 视觉应用等',
    ],
  },
  {
    idx: '03',
    img: scene3,
    alt: 'AI 智能体应用',
    title: 'AI 智能体应用',
    points: [
      '智能通讯底座：全媒体即时通讯、智能会议管理套件、企业级文档管理体系、跨部门协作空间',
      'AI 核心能力：智能流程自动化、文档智能生成与处理、企业知识精准问答、业务数据深度分析',
      '系统集成与安全体系：多业务系统无缝对接，权限控制、安全审计、数据加密',
    ],
  },
];

/** 三大业务场景（以《公司简介 4.0》"AI 应用全景"章节为准） */
export const scenes: SceneCard[] = [
  {
    idx: '01',
    img: rndIntegration,
    alt: '研发设计制造一体化·参数化建模',
    title: '研发设计端 AI',
    desc: '减少低价值、重复性工作，提升研发设计人员的效率和价值。',
    list: [
      { title: 'AI 选型 + 参数化建模', desc: '在有限且结构化的参数空间内，依据沉淀规则做选型推理，驱动参数化模型完成几何生成与出图。' },
      { title: '自动标注与出图', desc: '三维模型自动尺寸标注、尺寸链分析与公差分配，遵循企业规范批量输出图纸，提升出图效率 30% 以上。' },
      { title: '图纸智能识别', desc: '自动识别尺寸公差、形位公差、粗糙度与技术要求，提取图纸标注与检测信息，打通设计与生产、检测的数据链路。' },
    ],
  },
  {
    idx: '02',
    img: smartUpgrade,
    alt: '智能化改造·非标自动化产线',
    title: '生产制造端 AI',
    desc: '聚焦核心生产流程优化，通过 AI 技术赋能制造全链路，实现生产效率与产品质量的双重飞跃。',
    list: [
      { title: 'AI 排程', desc: 'AI 算法综合订单、产能、物料、人员设备多维约束，智能生成最优生产计划，动态适配插单、故障等突发变化。' },
      { title: 'AI 质检', desc: '深度学习视觉技术在线全检各类缺陷，异常实时预警、根因自动追溯，检测准确率可达 99.5% 以上。' },
      { title: '设备预测性维护', desc: '融合维修台账、技术手册、运行参数与保养记录，AI 综合研判输出故障预警、维修方案与保养计划，从「事后抢修」转向「事前预防」。' },
      { title: '生产优化', desc: '基于生产大数据持续迭代工艺参数，持续提升生产良率与产品一致性。' },
    ],
  },
  {
    idx: '03',
    img: aiGongcheng,
    alt: 'AI 智能体应用·岗位 AI 员工',
    title: '办公智能工作平台',
    desc: '以智能工作平台为核心，重构办公协同模式，释放组织创造力，赋能决策与管理升级。',
    list: [
      { title: '岗位专属 AI 助手', desc: '为销售、客服等岗位配备「数字员工」，自动化处理报表、答疑等重复性工作，释放人力聚焦高价值任务。' },
      { title: '企业知识智能沉淀与复用', desc: '自动归集企业文档与经验，构建可推理的智能知识库，打破部门壁垒，加速知识流转。' },
    ],
  },
];

export interface CaseCard {
  img: string;
  alt: string;
  big: string;
  title: string;
  desc: string;
  metric: string;
  href: string;
}

/** 首页案例场景分组（以 PDF P40–51 第四章 10 个案例为准，每组精选代表案例） */
export interface CaseScene {
  /** 场景中文名 */
  scene: string;
  /** 场景英文标签 */
  sceneEn: string;
  /** 场景简介 */
  desc: string;
  /** 该场景下的精选案例（2–3 个） */
  cases: CaseCard[];
}

export const caseScenes: CaseScene[] = [
  {
    scene: '研发设计端 AI',
    sceneEn: 'R&D DESIGN AI',
    desc: '自动标注 · 自动出图 · 图纸识别 · 参数化建模，从设计到出图的全链路提速。',
    cases: [
      {
        img: '/assets/img/cases/case-bearing-mbd.svg',
        alt: '轴承行业 MBD 一体化方案界面',
        big: 'BEARING MBD',
        title: '轴承标准件设计、检测一体化',
        desc: '基于 MBD 的轴承设计与检测一体化，实现三维标注、尺寸链分析与检测计划自动生成，总耗时 5 分钟/个。',
        metric: '5 分钟/个 · 国标降版图纸',
        href: '/detail-case-bearing-mbd/',
      },
      {
        img: '/assets/img/cases/case-aerospace-mbd.svg',
        alt: '航天行业 MBD · 复材装配体智能拆分',
        big: 'AEROSPACE MBD',
        title: '航天复材装配体智能拆分、快速出图',
        desc: '面对 1000 多个零件、150 多种零件的复材装配体，AI 识别与分类后全自动出图，图纸生成时间小于 1 分钟/个。',
        metric: '图纸生成 <1 分钟/个',
        href: '/detail-case-aerospace-mbd/',
      },
      {
        img: '/assets/img/cases/case-automation.svg',
        alt: '非标自动化产线图纸一键生成',
        big: 'AUTOMATION',
        title: '非标自动化行业设计出图',
        desc: '装配批量导入、图纸一键生成，分组件实测提速 5–8 倍，出图速度 0.5 分/标注。',
        metric: '提速 5–8 倍',
        href: '/detail-case-automation/',
      },
    ],
  },
  {
    scene: '生产制造端 AI',
    sceneEn: 'MANUFACTURING AI',
    desc: 'AI 排程 · AI 视觉检测 · 车间仿真，驱动生产效率与质量的双重提升。',
    cases: [
      {
        img: '/assets/img/cases/case-steel-pipe.svg',
        alt: '无缝钢管 AI 排程案例',
        big: 'STEEL PIPE APS',
        title: '无缝钢管 AI 排程',
        desc: 'AI 优化工序、智能合并排料，破解原材料损耗与订单呆滞，实现每年 800 万元原材料成本节省。',
        metric: '年省 800 万元 · 订单扩容 20%',
        href: '/detail-case-steel-pipe/',
      },
      {
        img: '/assets/img/cases/case-furniture.svg',
        alt: '智能家具制造 AI 排程案例',
        big: 'FURNITURE APS',
        title: '智能家具制造 AI 排程',
        desc: 'AI 排产算法破解非标定制多、板材利用率低难题，每年原材料成本节约 500 万元。',
        metric: '年省 500 万元',
        href: '/detail-case-furniture/',
      },
      {
        img: '/assets/img/cases/case-csic-vision.svg',
        alt: '中船某研究所 AI 视觉应用案例',
        big: 'AI VISION',
        title: '中船某研究所 AI 视觉应用',
        desc: '多机械臂检测、视觉成像与视觉分析三大模块协同，实现 AI 视觉识别与检测能力落地。',
        metric: '三模块 AI 视觉检测',
        href: '/detail-case-csic-vision/',
      },
    ],
  },
];

/** 立即行动 */
export const actions = [
  { idx: '01', title: '免费咨询', desc: '1 对 1 专家沟通需求，1 小时专属时间。' },
  { idx: '02', title: '现场演示', desc: '携带实际数据演示，2 小时深度体验。' },
  { idx: '03', title: 'POC 试用', desc: '选定 1 个场景免费试用 2 周，0 风险体验价值。' },
  { idx: '04', title: '定制方案', desc: '基于评估结果定制专属方案，量身定制最优解。' },
];

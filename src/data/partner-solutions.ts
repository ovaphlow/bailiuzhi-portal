/**
 * 合作伙伴解决方案页内容数据。
 * 内容摘自《众脉 BP · 商业计划书》第 10 页（工业具身智能产品矩阵）
 * 与第 21 页（客户现场案例展示 · 河源精电）。
 * 第 21 页原扫描配图已替换为品牌风格 SVG 示意图（assets/img/partner/）。
 */

/** 产品矩阵条目（第 10 页） */
export interface MatrixItem {
  /** 单字标识，如「锁」 */
  glyph: string;
  title: string;
  desc: string;
}

/** 产品矩阵分层 */
export interface MatrixTier {
  tier: string;
  tierEn: string;
  items: MatrixItem[];
}

export const productMatrix: MatrixTier[] = [
  {
    tier: '工作站级',
    tierEn: 'WORKSTATION',
    items: [
      { glyph: '锁', title: '智能柔性螺丝锁付机器人工作站', desc: '高速锁付，M1–M5 多角度' },
      { glyph: '抓', title: '智能柔性抓取移动工作站', desc: '3D 视觉 + 多种夹爪适配' },
      { glyph: '检', title: '智能柔性检测机器人工作站', desc: 'AI 视觉缺陷检测' },
      { glyph: '磨', title: '智能打磨工作站', desc: '恒力力控 ±1N 精度' },
    ],
  },
  {
    tier: '产线级',
    tierEn: 'PRODUCTION LINE',
    items: [
      { glyph: '柔', title: 'AI 具身柔性产线', desc: '模块化集成，换线 8h → 10min' },
      { glyph: '溯', title: 'Xi- 黑匣子追溯', desc: '业内首创故障追溯系统' },
      { glyph: '脑', title: 'Cobot Brain AI 平台', desc: '建模 / 仿真 / 数字孪生' },
    ],
  },
  {
    tier: '核心部件级',
    tierEn: 'CORE COMPONENTS',
    items: [
      { glyph: '臂', title: '协作机械臂', desc: '一体化关节，力感知碰撞检测' },
      { glyph: '手', title: '灵巧手', desc: '腕部视觉 + AI 力控，自主抓取' },
      { glyph: '驱', title: '伺服驱动器', desc: '21 位精度磁编码器，RTOS 硬实时' },
      { glyph: '感', title: '六维力传感器', desc: '全闭环力控算法' },
    ],
  },
];

/** 客户现场案例（第 21 页） */
export const customerCase = {
  client: '河源精电',
  img: '/assets/img/partner/heyuan-jingdian-line.svg',
  alt: '河源精电真实产线示意：机器人锁付与视觉检测、跑机数据与黑匣子追溯',
  caption: '客户现场案例展示 · 河源精电真实产线（示意图）',
  quote:
    '与河源精电这两年的测试磨合不仅给众脉带来了可观的潜在订单，更是千金难买的真实产线跑机数据，这种在顶级产线里打磨出来的技术迭代速度。',
  /** 引言中需要高亮的短语（按出现顺序） */
  highlights: ['千金难买的真实产线跑机数据', '顶级产线里打磨出来的技术迭代速度'],
};

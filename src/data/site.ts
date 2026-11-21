/**
 * 站点导航数据：页头与页脚共用，后续新增页面只改这里。
 * 其余页面尚未迁移，链接指向 Astro 目标路由（迁移后自动生效）。
 */
export const navLinks = [
  { label: '首页', href: '/' },
  { label: '产品和解决方案', href: '/products-solutions/' },
  { label: '视频演示', href: '/video-demos/' },
  { label: '案例', href: '/cases/' },
  { label: '合作伙伴解决方案', href: '/partner-solutions/' },
];

/** 联系方式（页脚 / 联系我们区块共用） */
export const contact = {
  tel: '131 1541 3199',
  telHref: 'tel:13115413199',
  mail: 'zhangzhi@blzkj.com',
  /** 公司地址：无锡 + 昆山 两处 */
  addresses: [
    { city: '无锡', region: '江苏省无锡市滨湖区', detail: '建筑西路777号A3幢3层320' },
    { city: '昆山', region: '江苏省昆山市张浦镇', detail: '振新东路586号' },
  ],
};

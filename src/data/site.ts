/**
 * 站点导航数据：页头与页脚共用，后续新增页面只改这里。
 * 其余页面尚未迁移，链接指向 Astro 目标路由（迁移后自动生效）。
 */
export const navLinks = [
  { label: '首页', href: '/' },
  { label: '产品和解决方案', href: '/products-solutions/' },
  { label: '案例', href: '/cases/' },
  { label: '合作伙伴解决方案', href: '/partner-solutions/' },
];

/** 联系方式（页脚 / 联系我们区块共用） */
export const contact = {
  tel: '131 1541 3199',
  telHref: 'tel:13115413199',
  mail: '13115413199@163.com',
};

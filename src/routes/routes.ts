/**
 * 路由配置
 * 更多路由请查询 https://umijs.org/docs/guides/routes
 */
export default [
  { exact: true, path: '/', redirect: '/swap' },
  {
    path: '/swap',
    component: '@/pages/swap',
  },
  // {
  //   path: '/mint',
  //   component: '@/pages/mint',
  // },
  // {
  //   path: '/index',
  //   component: '@/pages/index',
  // },
  // {
  //   path: '/dashboard',
  //   component: '@/pages/dashboard',
  // },
  // {
  //   path: '/swap',
  //   component: '@/pages/swap',
  // },
  // {
  //   path: '/token',
  //   component: '@/pages/token',
  // },
  // {
  //   path: '/newIcon',
  //   component: '@/pages/newIcon',
  // },
  // {
  //   path: '/proxyTrade',
  //   component: '@/pages/proxyTrade',
  // },
];

/*
 * @Author: zhangjicheng
 * @Date: 2020-06-28 10:42:37
 * @LastEditTime: 2020-06-28 16:42:49
 * @LastEditors: Please set LastEditors
 * @Description: 配置路由文件
 * @FilePath: \blog5.0\config\router.config.ts
 */ 
export default [
  {
    path: '/',
    component: '../layouts/index',
    routes: [
      { path: '/', component: '../pages/index' },
      {
        title: 'page1',
        path: '/page1',
        component: '../pages/Page1',
        footerBar: false,
      },
      {
        title: 'page2',
        path: '/page2',
        component: '../pages/Page2',
      }
    ]
  }
]

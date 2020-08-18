/*
 * @Author: zhangjicheng
 * @Date: 2020-06-28 10:42:37
 * @LastEditTime: 2020-07-01 03:50:47
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
        title: 'Veigar',
        path: '/home',
        component: '../pages/Home',
        // footerBar: false,
      },
      {
        title: '发现',
        path: '/find',
        component: '../pages/Find',
        // footerBar: false,
      },
      {
        title: '我的',
        path: '/my',
        component: '../pages/My',
      }
    ]
  }
]

/*
 * @Author: zhangjicheng
 * @Date: 2020-06-28 16:22:28
 * @LastEditTime: 2020-06-28 16:23:53
 * @LastEditors: Please set LastEditors
 * @Description: 代理配置文件
 * @FilePath: \blog5.0\config\proxy.config.ts
 */ 
export default {
  '/api/v1': {
    target: 'http://134.175.48.152:6100', // 预生产
    changeOrigin: true,
    router: {
      '/api/v1/pay': "http://192.168.12.126:8020",
    },
  }
}

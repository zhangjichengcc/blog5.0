/*
 * @Author: your name
 * @Date: 2020-06-28 10:23:53
 * @LastEditTime: 2020-07-02 11:13:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \blog5.0\.umirc.ts
 */ 
import { IConfig } from 'umi-types';
import routerConfig from './config/router.config';
import proxyConfig from './config/proxy.config';

const path = require('path');
// ref: https://umijs.org/config/
const config: IConfig =  {
  treeShaking: true,
  routes: routerConfig,
  proxy: proxyConfig,
  alias: {
    '@': path.resolve(__dirname, 'src'),
    // pages: path.resolve(__dirname, '../src/pages'),
    // components: path.resolve(__dirname, '../src/components'),
    // utils: path.resolve(__dirname, '../src/utils'),
    // services: path.resolve(__dirname, '../src/services'),
    // models: path.resolve(__dirname, '../src/models'),
    // themes: path.resolve(__dirname, '../src/themes'),
    // assets: path.resolve(__dirname, '../src/assets'),
    // public: path.resolve(__dirname, '../public'),
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: false,
      dva: false,
      dynamicImport: true, // 路由按需加载
      title: 'blog5.0',
      dll: false,
      
      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
}

export default config;

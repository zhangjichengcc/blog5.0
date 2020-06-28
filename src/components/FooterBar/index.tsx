/*
 * @Author: zhangjicheng
 * @Date: 2020-05-14 11:46:01
 * @LastEditTime: 2020-06-28 18:47:38
 * @LastEditors: Please set LastEditors
 * @Description: 默认登陆加载页面
 * @FilePath: \wechat-v\src\pages\index.tsx
 */ 
import React, { FC, useRef, useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { router } from 'umi';
// import { getClientToken } from '@/services/login';
// import config from '@/config';
// import styles from '@pages/Page1/index.less';
import styles from './index.less';


// interface BasicListProps {
//   listAndbasicList: StateType;
//   dispatch: Dispatch<any>;
//   loading: boolean;
// }

const Login = (props: any) => {
  
  // 生命周期
  // useEffect(() => {
  //   console.log('componentDidMount: 组件加载后')
  //   return () => {
  //     console.log('componentWillUnmount: 组件卸载， 做一些清理工作')
  //   }
  // }, []);

  return (
    <div className={styles.global_bar}>
      <ul>
        <li>首页</li>
        <li>发现</li>
        <li>我的</li>
      </ul>
    </div>
  );
}

export default Login;

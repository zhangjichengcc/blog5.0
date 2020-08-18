/*
 * @Author: zhangjicheng
 * @Date: 2020-05-14 11:46:01
 * @LastEditTime: 2020-06-30 17:10:12
 * @LastEditors: Please set LastEditors
 * @Description: 默认登陆加载页面
 * @FilePath: \wechat-v\src\pages\index.tsx
 */ 

import React, { FC, useRef, useState, useEffect } from 'react';
import { router } from 'umi';
// import { getClientToken } from '@/services/login';
// import config from '@/config';
import styles from './index.less';


// interface BasicListProps {
//   listAndbasicList: StateType;
//   dispatch: Dispatch<any>;
//   loading: boolean;
// }

const Login = (props: any) => {
  
  // // 生命周期
  // useEffect(() => {
  //   console.log('componentDidMount: 组件加载后')
  //   return () => {
  //     console.log('componentWillUnmount: 组件卸载， 做一些清理工作')
  //   }
  // }, []);

  const openView = () => {
    router.push('/page1');
  }

  return (
    <div className={styles.view}>
      <p onClick={openView}>PAGE2</p>
      <button onClick={openView}>pageChange</button>
    </div>
  );
}

export default Login;

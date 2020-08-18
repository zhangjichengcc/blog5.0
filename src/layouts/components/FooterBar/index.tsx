/* eslint-disable @typescript-eslint/consistent-type-assertions */
/*
 * @Author: zhangjicheng
 * @Date: 2020-05-14 11:46:01
 * @LastEditTime: 2020-07-02 18:32:58
 * @LastEditors: Please set LastEditors
 * @Description: 默认登陆加载页面
 * @FilePath: \wechat-v\src\pages\index.tsx
 */ 
import React, { FC, useRef, useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { router } from 'umi';
import Icon from '@/components/Icon';
// import { getClientToken } from '@/services/login';
// import config from '@/config';
// import styles from '@pages/Page1/index.less';
import styles from './index.less';


interface FooterBarProps {
  activePath?: string;
}

const Login: FC<FooterBarProps> = (props: any) => {

  const { activePath } = props;

  const openView = (path:string) => {
    // 将当前路由记录，用于底部tab切换动画方向设置
    const { pathname } = window.location;
    router.push({
      pathname: path,
      query: {
        source: pathname,
      }
    });
  }

  return (
    <div className={styles.global_bar}>
      <ul>
        <li className={activePath === '/home' ? styles.active : ''} onClick={() => {openView('/home')}}>
          <Icon className={styles.icon} fontName="shouye" />
          <span>首页</span>
        </li>
        <li className={activePath === '/find' ? styles.active : ''} onClick={() => {openView('/find')}}>
          <Icon className={styles.icon} fontName="sousuo" />
          <span>发现</span>
        </li>
        <li className={activePath === '/my' ? styles.active : ''} onClick={() => {openView('/my')}}>
          <Icon className={styles.icon} fontName="kehuxinxiguanli" />
          <span>我的</span>
        </li>
      </ul>
    </div>
  );
}

export default Login;

/*
 * @Author: your name
 * @Date: 2020-05-15 09:56:27
 * @LastEditTime: 2020-06-28 19:08:57
 * @LastEditors: Please set LastEditors
 * @Description: 参考https://www.jianshu.com/p/98fb143ac719
 * @FilePath: \wechat-v\src\layouts\index.tsx
 */ 
import React, { FC, useRef, useState, useEffect } from 'react';
import { withRouter, router } from 'umi';
import FooterBar from '@/components/FooterBar';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './index.less';

const toLowCase = (v: any) => {
  if(!v) return '';
  return v.toLocaleLowerCase();
}


const BasicLayout: React.FC = (props: any) => {
  const { children, history, location, route = {} } = props;
  const { action = 'PUSH' } = history; // PUSH POP REPLACE
  const { pathname } = location;
  const { routes = [] } = route;
  // 当前匹配路由配置
  const thatRoute = routes.filter((v: { path: string; }) => toLowCase(v.path) === toLowCase(pathname))[0] || {};
  const { footerBar = true } = thatRoute;
  console.log(props)

  // 生命周期
  useEffect(() => {
    return () => {
      // console.log('componentWillUnmount: 组件卸载， 做一些清理工作');
    }
  }, []);

  return (
    <TransitionGroup
      /**
       * @description: 在TransitionGroup的管理下，一旦某个组件挂载后，其exit动画其实就已经确定了，可以看官网上的这个issue。
       * 也就是说，就算我们动态地给CSSTransition添加不同的ClassNames属性来指定动画效果，但其实是无效的。
       * 解决方案其实在那个issue的下面就给出了，我们可以借助TransitionGroup的ChildFactory属性以及React.cloneElement方法来强行覆盖其className
       */
      childFactory={(child: React.DetailedReactHTMLElement<{ className: any; }, HTMLElement>) => React.cloneElement(
        child,
        {className: styles[`router_wapper_${action}`]}
      )}
    >
      <CSSTransition
        key={pathname} // 页面的pathname作为转场动画的key
        timeout={200}
        classNames="page"
        // unmountOnExit
      >
        <div className={styles.aaa}>
          {children}
          {footerBar && <FooterBar />}
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default withRouter(BasicLayout);

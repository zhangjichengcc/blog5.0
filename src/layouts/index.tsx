/*
 * @Author: your name
 * @Date: 2020-05-15 09:56:27
 * @LastEditTime: 2020-07-02 16:13:37
 * @LastEditors: Please set LastEditors
 * @Description: 参考https://www.jianshu.com/p/98fb143ac719
 * @FilePath: \wechat-v\src\layouts\index.tsx
 */ 
import React, { useEffect, FC } from 'react';
import { withRouter } from 'umi';
import FooterBar from './components/FooterBar';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './index.less';

// 字符串转小写
const toLowCase = (v: any) => {
  if(!v) return '';
  return v.toLocaleLowerCase();
}

const BasicLayout: FC = (props: any) => {
  const { children, history, location, route = {} } = props;
  const { action = 'PUSH' } = history; // PUSH POP REPLACE
  const { pathname, query = {} } = location;
  const { routes = [] } = route;
  // 当前匹配路由配置
  const thatRoute = routes.filter((v: { path: string; }) => toLowCase(v.path) === toLowCase(pathname))[0] || {};
  const { footerBar = true } = thatRoute;

  // 设置动画方向
  const animation = (() => {
    // 定义底部tab路由顺序
    const footerbarRoutes = ['/home', '/find', '/my'];
    const { source } = query;
    // 当操作为push，并且存在源路由的记录(即在tab包含的路由间跳转)，则根据路由顺序设定动画方向
    if (action === 'PUSH' && source) {
      return footerbarRoutes.indexOf(pathname) > footerbarRoutes.indexOf(source) ? 'PUSH' : 'POP';
    } else {
      // 按正常路由操作进行动画切换
      return action;
    }
  })();

  const mainViewStyle = {
    height: '100vh',
    'overflow-y': 'scroll',
    paddingBottom: footerBar ? 45 : 0,
  }

  return (
    <div>
      <TransitionGroup
        /**
         * @description: 在TransitionGroup的管理下，一旦某个组件挂载后，其exit动画其实就已经确定了，可以看官网上的这个issue。
         * 也就是说，就算我们动态地给CSSTransition添加不同的ClassNames属性来指定动画效果，但其实是无效的。
         * 解决方案其实在那个issue的下面就给出了，我们可以借助TransitionGroup的ChildFactory属性以及React.cloneElement方法来强行覆盖其className
         */
        childFactory={(child: React.DetailedReactHTMLElement<{ className: any; }, HTMLElement>) => React.cloneElement(
          child,
          {className: styles[`router_wapper_${animation}`]}
        )}
      >
        <CSSTransition
          key={pathname} // 页面的pathname作为转场动画的key
          timeout={200}
          classNames="page"
          // unmountOnExit
        >
          <div className={styles.mainView} style={mainViewStyle}>
            {children}
          </div>
        </CSSTransition>
      </TransitionGroup>
      {footerBar && <FooterBar activePath={pathname} />}
    </div>
  );
};

export default withRouter(BasicLayout);

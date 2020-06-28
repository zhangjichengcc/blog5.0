/*
 * @Author: zhangjicheng
 * @Date: 2020-05-14 11:46:01
 * @LastEditTime: 2020-06-28 14:41:50
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
  const [num, setNum] = useState<number>(0);
  
  // 生命周期
  // useEffect(() => {
  //   console.log('componentDidMount: 组件加载后')
  //   return () => {
  //     console.log('componentWillUnmount: 组件卸载， 做一些清理工作')
  //   }
  // }, []);

  const openView = () => {
    router.push('/page2');
  }

  return (
    <div className={styles.view}>
      <h2>PAGE1</h2>
      <button onClick={openView}>pageChange</button>
      <div className={'container'}>
        <TransitionGroup className={'square-wrapper'}>
          <CSSTransition
            key={num}
            timeout={5000}
            classNames={'fade'}
          >
            <div className={'square'}>{num}</div>
          </CSSTransition>
        </TransitionGroup>
        <div onClick={() => {setNum(num + 1)}}>toggle</div>
      </div>
    </div>
  );
}

export default Login;

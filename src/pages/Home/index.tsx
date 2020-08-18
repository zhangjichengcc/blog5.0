/*
 * @Author: zhangjicheng
 * @Date: 2020-05-14 11:46:01
 * @LastEditTime: 2020-07-02 19:10:53
 * @LastEditors: Please set LastEditors
 * @Description: 默认登陆加载页面
 * @FilePath: \wechat-v\src\pages\index.tsx
 */ 

import React, { FC, useRef, useState, useEffect, useReducer } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import BScroll from 'better-scroll';
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

let scroll = null;

const Home = (props: any) => {
  const [num, setNum] = useState<number>(0);
  const scrollBox = useRef<any>();
  // let scroll = null;
  
  // 生命周期
  useEffect(() => {
    console.log('componentDidMount: 组件加载后');
    initBscroll();
    return () => {
      console.log('componentWillUnmount: 组件卸载， 做一些清理工作')
    }
  }, []);

  const initBscroll = () => {
    scroll = new BScroll(scrollBox.current, {
      scrollY: true,
      scrollBar: true,
      click: true,
      pullDownRefresh: {
        threshold: 50,
        stop: 120
      }
    })
    // const initY = sessionStorage.getItem('homeY') || 0;
    // scroll.scrollTo(0, parseInt('0', 10));
    // 下拉刷新
    // scroll.on('pullingDown', this.refreshSyData);
    // 记录滚动距离
    // scroll.on('scrollEnd', obj => {
    //   const { y = 0 } = obj;
    //   sessionStorage.setItem('homeY', y || 0);
    // })
  }


  // 页面跳转
  const openView = () => {
    router.push('/page2');
  }

  return (
    <div className={styles.view} ref={scrollBox}>
      <div>
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
      </div>
    </div>
  );
}

export default Home;

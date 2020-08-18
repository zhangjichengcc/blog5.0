/*
 * @Author: zhangjicheng
 * @Date: 2019-12-23 15:47:06
 * @LastEditTime: 2020-05-11 18:50:19
 * @LastEditors: Please set LastEditors
 * @Description: 首页loading
 */
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.less';

// 记录动画过程若存在则不重复执行
let timer = null;

// 全局loading
const pageLoading = (key = false, fn) => {
  const loadingPage = document.getElementById('pageLoading_page');
  if (key) {
    if(loadingPage) return;
    const loadingDom = document.createElement('dev');
    loadingDom.setAttribute('id', 'pageLoading_page');
    loadingDom.setAttribute('style', 'opacity: 1; transform: scale(1); transition: all ease .3s');
    const dom = (
      <div className={styles.pageLoading}>
        <div className={styles.ballContent}>
          <i /><i /><i />
        </div>
        <p>
          数据载入中
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </p>
      </div>
    );
    document.body.appendChild(loadingDom);
    ReactDOM.render(dom, loadingDom);
  } else {
    if (!loadingPage || timer) return;
    loadingPage.setAttribute('style', 'opacity: 0; transform: scale(1.5); transition: all ease .3s');
    timer = setTimeout(() => {
    if(fn) fn();
      document.body.removeChild(loadingPage);
      clearTimeout(timer);
      timer = false;
    }, 300);
  }
};

export default pageLoading;

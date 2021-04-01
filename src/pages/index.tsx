/*
 * @Author: your name
 * @Date: 2020-06-28 10:41:42
 * @LastEditTime: 2021-04-01 18:25:29
 * @LastEditors: zhangjicheng
 * @Description: In User Settings Edit
 * @FilePath: \blog5.0\src\pages\index.tsx
 */

import React from 'react';
import moment from 'js-moment';
import styles from './index.css';

export default function () {

  globalThis.moment = moment;

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>
          To get started, edit
          <code>src/pages/index.js</code>
          {' '}
          and save to reload.
        </li>
        <li>
          {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
          <a href="https://umijs.org/guide/getting-started.html">
            Getting Started
          </a>
        </li>
      </ul>
    </div>
  );
}

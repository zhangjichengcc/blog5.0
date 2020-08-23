import React from 'react';
import styles from './index.css';

export default function () {
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

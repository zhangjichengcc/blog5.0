import React, { FC, useEffect, useState } from 'react';
import classnames from 'classnames';
import styles from './index.less';

const TextBubble = (props) => {
  const { message = '', layout = 'left' } = props;
  return (
    <div className={classnames(styles.textBubble, styles[layout])}>
      <span className={styles.avator} />
      <span className={styles.text}>{message}</span>
    </div>
  )
}

export default TextBubble;
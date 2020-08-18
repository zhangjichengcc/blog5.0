/*
 * @Author: zhangjicheng
 * @Date: 2020-05-14 11:46:01
 * @LastEditTime: 2020-06-30 23:33:49
 * @LastEditors: Please set LastEditors
 * @Description: 默认登陆加载页面
 * @FilePath: \wechat-v\src\pages\index.tsx
 */ 
import React, { FC } from 'react';
import iconfont from './iconfont';
import classnames from 'classnames';
import styles from './index.less';

const { glyphs = [] } = iconfont;

interface IconProps {
  className?: string,
  fontName: string,
  style?: any,
}

const Icon: FC<IconProps> =  ({
  className = '',
  fontName = '',
  style = {},
}) => {
  const item = glyphs.filter(v => v.font_class === fontName)[0] || {};
  const { unicode = '&#xe654;' } = item;
  return <i className={classnames(styles.iconfont, className)} style={style} dangerouslySetInnerHTML={{ __html: `&#x${unicode};`}} />
}

export default Icon;

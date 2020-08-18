/*
 * @Author: your name
 * @Date: 2020-08-14 19:31:17
 * @LastEditTime: 2020-08-17 12:51:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wechat-revenue-m-chongqing\src\pages\Consult\components\MessageItem\index.js
 */
import React, { Component } from 'react';
import TextBubble from './TextBubble';
import styles from './index.less';

class MessageItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() { 
    const { type = 'text', message = '', layout } = this.props;
    return ( 
      <>
        { type === 'text' && <TextBubble message={message} layout={layout} /> }
        {/* { type === 'img' && <ImgBubble /> }
        { type === 'card' && <CardBubble /> } */}
      </>
     );
  }
}
 
export default MessageItem;
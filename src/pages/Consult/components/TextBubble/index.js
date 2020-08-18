/*
 * @Author: jiangshasha 
 * @Date: 2020-08-06 17:08:18 
 * @Last Modified by: 
 * @Last Modified time: 2020-08-07 16:19:07
 */

import React, { Component } from 'react';
import styles from './index.less';
import imgURL from '../../images/avatar.jpg';

class TextBubble extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMe: true
    };
  }
  
  render() { 
    const { isMe } = this.state
    return ( 
        <div>
          <div className={styles.text_container}>
            <div className={styles.ava_container}>
              <img src={imgURL} />
              <div className={styles.ava}></div>
            </div>
            <div className={styles.text_info}>
              <div className={styles.send_time}>2020-08-06 15:20</div>
              <div className={`${styles.send_info} ${styles.right}`}>
                <p>请问有什么可以帮助到您的?</p>
              </div>
            </div>
          </div>

          <div className={`${styles.text_container} ${styles.self}`}>
            <div className={styles.ava_container}>
              <img src={imgURL} />
              <div className={styles.ava}></div>
            </div>
            <div className={styles.text_info}>
              <div className={styles.send_time}>2020-08-06 15:20</div>
              <div className={`${styles.send_info} ${styles.left}`}>
                <p>请问什么时候可以观看税务教学视频？</p>
              </div>
            </div>
          </div>

        </div>
        
     );
  }
}
 
export default TextBubble;
/*
 * @Author: jiangshasha 
 * @Date: 2020-08-06 17:08:37 
 * @Last Modified by: 
 * @Last Modified time: 2020-08-07 16:52:10
 */

import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import styles from './index.less';
import imgURL from '../../images/avatar.jpg';

class PopupBubble extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  
  render() { 
    return ( 
      <div className={styles.popupBubble}>
        <div className={styles.ava_container}>
          <img src={imgURL} />
        </div>
        <div className={styles.operation_container}>
          <p className={styles.time}>2020-08-06 16:35</p>
          <div className={styles.operation}>
            <p className={styles.title}>请确认是否已完成咨询？</p>
            <div className={styles.button}>
              <Button size="small" inline className={styles.left}>是</Button>
              <Button size="small" inline className={styles.right}>否</Button>
            </div>
          </div>
        </div>
      </div>
     );
  }
}
 
export default PopupBubble;
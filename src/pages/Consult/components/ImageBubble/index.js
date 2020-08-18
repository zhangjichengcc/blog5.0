import React, { Component } from 'react';
import styles from './index.less';
import imgURL from '../../images/avatar.jpg';

class ImageBubble extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() { 
    return ( 
      <div>
        <div className={styles.image_bubble}>
          <div className={styles.ava_container}>
          <img src={imgURL} />
          </div>
          <div className={styles.image_info}>
            <p className={styles.send_time}>2020-08-06-17:11</p>
            <div className={styles.send_info}>
              <img src={imgURL} />
            </div>
          </div>
        </div>

        <div className={`${styles.image_bubble} ${styles.self}`}>
          <div className={styles.ava_container}>
          <img src={imgURL} />
          </div>
          <div className={styles.image_info}>
            <p className={styles.send_time}>2020-08-06-17:11</p>
            <div className={styles.send_info}>
              <img src={imgURL} />
            </div>
          </div>
        </div>
      </div>
     
     );
  }
}
 
export default ImageBubble;
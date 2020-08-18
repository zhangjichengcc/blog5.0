/*
 * @Author: jiangshasha 
 * @Date: 2020-08-05 11:06:58 
 * @Last Modified by: 
 * @Last Modified time: 2020-08-07 10:51:59
 * @Description: 互动咨询 —— 列表card
 */

import React, { Component } from 'react';
import router from 'umi/router';
import styles from './index.less';


 class NoticeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  goToDetail = (id, type) => {
    console.log({id, type})
    switch (type) {
      case 'open':
        router.push({ pathname: '/Consult/details', query: { id } });
        break;
      case 'closed':
        router.push({ pathname: '/Consult/details', query: { id, type: 'closed' } });
        break;
      default:
        break;
    }
  }

  render() { 
    const { item = {}, type } = this.props;
    return ( 
      <div className={styles.card} onClick={() => this.goToDetail(item.id, type)}>
        <div className={styles.avatar}>
          <div className={styles.red_point}>2</div>
        </div>
        <div className={styles.info}>
          <div className={styles.title}>
            <span className={styles.name}>{item.name}</span>
            <span className={styles.time}>{item.time}</span>
          </div>
          <div className={styles.content}>
            <span className={styles.ellips}>{item.lastInfo}</span>
            {/* <div className={styles.over_time}>超时关闭</div> */}
          </div>
        </div>
      </div>
    );
  }
 }
  
 export default NoticeCard;

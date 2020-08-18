import React, { Component } from 'react';
import styles from './index.less';
import imgURL from '../../images/avatar.jpg';
import excel from '@/assets/images/consult/excel.png';
import pdf from '@/assets/images/consult/pdf.png';
import word from '@/assets/images/consult/word.png';
import image from '@/assets/images/consult/image.png';

class FileBubble extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() { 
    const type = 'doc'
    return ( 
      <div>
        <div className={`${styles.file_container}`}>
            <div className={styles.ava_container}>
              <img src={imgURL} />
            </div>
            <div className={styles.file_info}>
              <div className={styles.send_time}>2020-08-06 15:20</div>
              <div className={`${styles.send_info} ${styles.right}`}>
                {(type === 'png' || type === 'jpg' || type === 'jpeg' || type === 'bmp') && (
                  <img src={image} />
                )}
                {(type === 'xls' || type === 'xlsx') && (
                  <img src={excel} alt="" />
                )}
                {(type === 'doc' || type === 'docx') && (
                  <img src={word} alt="" />
                )}
                {(type === 'pdf') && (
                  <img src={pdf} alt="" />
                )}
                <div>
                  <p className={`${styles.file_name} ${styles.ellip}`}>文件名称1.xlxs</p>
                  <p className={styles.file_size}>1.23M</p>
                </div>
              </div>
            </div>
          </div>
      </div>
     );
  }
}
 
export default FileBubble;
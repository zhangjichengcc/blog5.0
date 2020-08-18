import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import router from 'umi/router';
import moment from 'moment';
import { NavBar, Icon, Modal, ImagePicker, Toast } from 'antd-mobile';
import styles from './index.less';
import MessageBubble from '../components/MessageBubble';
import add from '@/assets/images/consult/add.png';
import record from '@/assets/images/consult/record.png';
import carmare from '@/assets/images/consult/carmare.png';
import picture from '@/assets/images/consult/picture.png';
import file from '@/assets/images/consult/file.png';
import excel from '@/assets/images/consult/excel.png';
import pdf from '@/assets/images/consult/pdf.png';
import word from '@/assets/images/consult/word.png';
import image from '@/assets/images/consult/image.png';
import { uploadFile, deleteFile } from 'services/materialCommit';
import imgMark from 'utils/waterMask';
import { message } from 'antd';
class Details extends Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false,
      messageList: [],
      fileList: [],
      fileInfo: [],
    }
  }

  componentDidMount() {
    this.initWebsockets();
  }

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  onOpen = () => {
    this.setState({
      visible: true
    });
  };

  // 结束咨询
  finishConsult = () => {
    router.push('/Consult');
  };

  // 上传图片
  handleUploadImg = (files) => {
    if (files[0].file.size > 3145728) {
      Toast.info('图片大小不能超过3M！', 1);
      return;
    }
    const fileObj = files[0];
    const sourceFile = fileObj.file;
    imgMark(sourceFile, '重庆市税务局微信税企互动渠道').then(({file, imgData}) => {
      const Img = new Image();
      Img.src = imgData;
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      Img.onload = () => {
        const originWidth = Img.width;
        const originHeight = Img.height;
        const maxWidth = 1200;
        const maxHeight = 1200;
        let targetWidth = originWidth;
        let targetHeight = originHeight;
        if (originWidth > maxWidth || originHeight > maxHeight) {
          // 更宽，按照宽度限定尺寸
          if (originWidth / originHeight > maxWidth / maxHeight) {
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
          } else {
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
          }
        }
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        // 清除画布
        context.clearRect(0, 0, targetWidth, targetHeight);
        // 图片压缩
        context.drawImage(Img, 0, 0, targetWidth, targetHeight);
        Toast.loading('上传中', 0);
        // canvas转为blob并上传
        canvas.toBlob(blob => {
          const { size } = blob;
          const formData = new FormData();
          formData.append('file', blob, file.name);
          uploadFile({
            url: '/cos/zlcj/file/upload',
            body: formData,
          }).then(res => {
            Toast.hide();
            if (res && res.code === 0) {
              const newFl = {
                name: file.name,
                size,
              };
              const obj = {
                file: newFl,
                data: res.data,
              };
              this.uploadFileSuccess(obj);
            } else {
              Toast.info(res.msg || '请稍后再试！');
            }
          }).catch(e => {
            Toast.hide();
            const { response = {} } = e;
            Toast.fail(response.msg);
          });
        }, file.type || 'image/png');
      };
    })
  };


  // 成功上传后的回调
  uploadFileSuccess = (res) => {
  const { fileList, fileInfo } = this.state;
  const { data, file } = res;
  fileList.push({
    name: file.name,
    url1: data.fileUrl,
    size: file.size,
    fileId: data.fileId
  })
  fileInfo.push({
      size1: file.size,
      fileId: data.fileId,
      name: file.name
  })
  this.setState({
    fileList,
    fileInfo,
  });
};

// 上传文件
handleUploadFile = (e) => {
  const that = this;
  // 选择的文件对象
  const file = e.target.files[0];
  if (!file) return;
  const isLarge =  file.size / 1024 / 1024;
  if (isLarge > 3) {
    Toast.info('文件大小不能超过3M！', 1);
    return;
  }
  const formData = new FormData();
  formData.append('file', file);
  Toast.loading('上传中', 0)
  uploadFile({
    url: '/cos/zlcj/file/upload',
    body: formData,
  }).then(res => {
    Toast.hide();
    if (res && res.code === 0) {
      const obj = {
        file,
        data: res.data
      }
      that.uploadFileSuccess(obj);
    } else {
      Toast.info(res.msg || '请稍后再试！');
    }
  }).catch(e => {
    Toast.hide();
    const { response = {} } = e;
    Toast.fail(response.msg);
  });
};

// 删除文件
handleDeleteFile = (fileId, index) => {
  const { fileList } = this.state;
  const params = {
    fileId
  }
  Toast.loading('删除中');
  deleteFile({params}).then(res => {
    Toast.hide();
    if (res && res.code === 0) {
      fileList.splice(index, 1);
      this.setState({
        fileList,
      })
    } else {
      Toast.info(res.msg || '请求服务异常，请稍后再试！');
    }
  }).catch((e)=>{
    Toast.hide();
    const { response = {} } = e;
    Toast.fail(response.msg);
  })
}

// 建立websockets连接
initWebsockets = () => {
  const ws = new WebSocket('ws://localhost:5000/');
  this.setState({ws});
  ws.onmessage=(evt)=>{
    console.log(evt.data);
    this.resetMessageList(evt);
  }
  ws.onopen=()=>{
    console.log('连接成功');
    // 发送消息
    ws.send(JSON.stringify({
      type: 'text',
      message: '你好，请问有什么可以帮助你的？',
      userId: 'jiangshasha',
    }));
  }
  ws.onerror=()=>{
    console.log('连接错误')
  }
  ws.onclose=()=>{
    console.log('连接关闭')
  }
}

// 设置消息列表
resetMessageList = e => {
  const data = JSON.parse(e.data) || {};
  const { type, message, time, sourceId } = data;
  const { messageList } = this.state;
  const newList = [...messageList, {
    type,
    message,
    time: moment(time).format('MM-DD HH:mm'),
    sourceId,
    layout: sourceId === 'jiangshasha' ? 'left' : 'right',
  }]
  this.setState({messageList: newList})
}

inputChange = e => {
  this.setState({messageValue: e.target.value});
}

sendMessage = () => {
  const { ws, messageValue = '' } = this.state;
  ws.send(JSON.stringify({
    type: 'text',
    message: messageValue,
    userId: 'jiangshasha',
  }))
  this.setState({messageValue: ''});
}

  render() { 
    const { visible, messageList = [], messageValue = '' } = this.state;
    const alert = Modal.alert;
    return ( 
      <DocumentTitle title="咨询中">
      <div
        className={styles.view_content}
      >
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => router.goBack()}
        >咨询中
        </NavBar>

        <div className={styles.detail_container}>
          <div className={styles.header}>
            <span className={styles.left}>税收管理员-王慧</span>
            <span className={styles.right}  onClick={() =>
              alert('取消咨询', '确定要取消咨询吗？', [
                { text: '取消', onPress: () => {console.log('cancle')} },
                { text: '确定', onPress: () => {this.finishConsult()} },
              ])
            }>结束咨询</span>
          </div>
          <div className={styles.content_body}>
            {/* 保证组件干净，封装无状态组件，接收messageList */}
            <MessageBubble messageList={messageList} />
          </div>
          <div className={styles.footer}>
            <input style={{width: '5.2rem', height: '0.64rem'}} value={messageValue} onChange={this.inputChange} onKeyDown={e => {
              if(e.key === 'Enter') this.sendMessage()
            }} />
            <img src={record} className={styles.icon} onClick={this.sendMessage}/>
            <img src={add} className={styles.icon} onClick={() => {this.onOpen()} } />
          </div>

          {/* 上传文件封装到组件中 */}
          <Modal
            popup
            visible={visible}
            animationType="slide-up"
          >
            <div className={styles.upload_container}>
              <div className={styles.cancel_btn} onClick={() => this.onClose()}>取消</div>
              <div className={styles.upload}>
                <div className={styles.ipt_wrapper}>
                  <ImagePicker
                      accept='image/jpg, image/jpeg, image/png, image/bmp'
                      files={[]}
                      onChange={this.handleUploadImg}
                    />
                  <div className={styles.inner_img_container}>
                    <img src={picture} alt="" className={styles.picture} />
                    <p className={styles.txt}>添加照片</p>
                  </div>
                </div>
                <div className={styles.ipt_file_wrapper}>
                  <div className={styles.inner_file_container}>
                    <img src={file} alt="" className={styles.picture} />
                    <p className={styles.txt}>添加文件</p>
                  </div>
                  <input
                    id="file"
                    type="file"
                    className={styles.ipt_file}
                    onChange={(e) => this.handleUploadFile(e)}
                    multiple
                    onClick={(e) => {
                      e.target.value = null;
                    }}
                    accept='.pdf, .doc, .docx, .xls, .xlsx'
                  />
                </div>
                <div className={styles.inner_img_container}>
                  <img src={carmare} alt="" className={styles.picture} />
                  <p className={styles.txt}>拍摄</p>
                </div>
              </div>

              {/* <div className={style.fileWrapper}>
                {fileList && fileList.length > 0 && fileList.map((item, index) => {
                  const key = index;
                  const i = item.name.lastIndexOf('.');
                  const type = item.name.slice(i + 1);
                  return (
                    <div className={style.file} key={key}>
                      <div className={style.top}>
                        {(type === 'png' || type === 'jpg' || type === 'jpeg' || type === 'bmp') && (
                          <img src={image} alt="" />
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
                        <span className={style.close} onClick={() => this.handleDeleteFile(item.fileId, index)}>×</span>
                      </div>
                      <p className={style.bottom}>{item.name}</p>
                    </div>
                  );
                })}
              </div> */}
            </div>
          </Modal>
        </div>
      </div>
    </DocumentTitle>
     );
  }
}
 
export default Details;
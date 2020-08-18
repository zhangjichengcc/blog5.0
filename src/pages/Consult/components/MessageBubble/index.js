/*
 * @Author: your name
 * @Date: 2020-08-14 18:26:09
 * @LastEditTime: 2020-08-17 15:11:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wechat-revenue-m-chongqing\src\pages\Consult\components\MessageBubble\index.js
 */
import React, { Component } from 'react';
import BScroll from 'better-scroll';
import styles from './index.less';
import moment from 'moment';
// import TextBubble from '../TextBubble';
// import ImageBubble from '../ImageBubble';
// import PoupBubble from '../PoupBubble';
// import FileBubble from '../FileBubble';
import MessageItem from '../MessageItem';
import imgURL from '../../images/avatar.jpg';
import { wxjk } from '../../../../services/declarePayment';


const list = [
  {
    messageId: '1',
    type: 'text',
    message: '请问有什么可以帮助到你？',
    time: '2020-08-14 12:00:19',
    sourceId: 'node',
    layout: 'right',
  },
  {
    messageId: '2',
    type: 'text',
    message: '请问有什么可以帮助到你？',
    time: '2020-08-14 12:00:19',
    sourceId: 'jiangshasha',
    layout: 'left',
  },
]

class MessageBubble extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // messageList: list,
    }
  }

  componentDidMount() {
    // this.initScroll();
    global.that = this;
    // this.initWebsockets();
  }

  initScroll = () => {
    const scroll = new BScroll(this.scrollBox)
    this.setState({scroll})
  }

  render() { 
    const { messageList = [] } = this.props;
    return ( 
      <div className={styles.messageContent} ref={e => {this.scrollBox = e}}>
        {/* <div className={styles.messageBody}> */}
          {
            messageList.map(item => {
              const { messageId, type, url, fileName, time, userId, layout, message } = item;
              return (
                <MessageItem
                  id={messageId}
                  type={type}
                  message={message}
                  url={url}
                  fileName={fileName}
                  time={time}
                  userId={userId}
                  layout={layout}
                />
              )
            })
          }
        {/* </div> */}
      </div>
     );
  }
}
 
export default MessageBubble;
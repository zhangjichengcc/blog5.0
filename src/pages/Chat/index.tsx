import React, { FC, useRef, useState, useEffect } from 'react';
import { router } from 'umi';
// import { getClientToken } from '@/services/login';
// import config from '@/config';
import TextBubble from './components/TextBubble';
import styles from './index.less';

const list = [
  {message: 'nihao', id: 1, layout: 'left'},
  {message: 'hellp', id: 2, layout: 'right'},
]


// interface BasicListProps {
//   listAndbasicList: StateType;
//   dispatch: Dispatch<any>;
//   loading: boolean;
// }

const Chat = (props: any) => {
  
  const [ title ] = useState<string>('大厅');
  const [ messageList, setMessageList ] = useState(list);
  const [ ws, setWs ] = useState<any>();

  const init = () => {
    const _ws = new WebSocket('ws://localhost:5000?id=1&name=小咪');
    setWs(_ws);
  }
  
  // 生命周期
  useEffect(() => {
    console.log('componentDidMount: 组件加载后');
    init();
    return () => {
      console.log('componentWillUnmount: 组件卸载， 做一些清理工作')
    }
  }, []);

  const openView = () => {
    router.push('/page1');

  }

  return (
    <div className={styles.view}>
      <div className={styles.chatView}>
        <div className={styles.header}>
          <span>{title}</span>
        </div>
        <div className={styles.chatList}>
          { messageList.map(item => {
            const { message, time, userId, layout } = item;
            return <TextBubble
              message={message}
              time={time}
              userId={userId}
              layout={layout}
            />
          })}
        </div>
      </div>
    </div>
  );
}

export default Chat;

/*
 * @Author: jiangshasha 
 * @Date: 2020-08-05 11:01:45 
 * @Last Modified by: 
 * @Last Modified time: 2020-08-10 15:15:10
 * @Description: 互动咨询 —— 咨询中列表
 */
 import React, { Component } from 'react';
 import PullUpLoad from 'components/PullUpLoad';
 import styles from './index.less';
 import NoticeCard from '../components/NoticeCard';
 class OpenList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noticeList: [
        {
          id: 1,
          name:' 咨询中',
          time: '2020.08.05 15:58',
          lastInfo: '除了这个问题，您还有其他问题要咨询的吗？'
        },
        {
          id: 2,
          name:'沙沙姜',
          time: '2020.08.05 15:58',
          lastInfo: '除了这个问题，您还有其他问题要咨询的吗？'
        },
        {
          id: 3,
          name:' 甘蔗',
          time: '2020.08.05 15:58',
          lastInfo: '谢谢啦'
        },
      ],
      params: {
        pageNum: 1,
        pageSize: 5,
      },
      // 没有数据的状态
      noData: false,
      refreshing: true,
      loaded: true
    };
  }


  // 刷新数据
  reload = () => {
    const { params } = this.state;
    this.setState(
      {
        params: {
          ...params,
          pageNum: 1,
        },
        noticeList: [],
      },
      () => {
        this.fetchData();
      },
    );
  };

  // 获取数据
  fetchData = () => {
    console.log('请求数据')
  }

   render() { 
     const { noData, loaded, refreshing, noticeList } = this.state
     return ( 
       <div>
         {noData ? (
           <div className={styles.view_null}>
           <div className={styles.banner}>
             <span>未查询到咨询中的信息</span>
           </div>
         </div>
         ) : (
           <div>
             <PullUpLoad
              loaded={loaded}
              refreshing={refreshing}
              onRefresh={this.fetchData}
              render={
                <div style={{ overflow: 'hidden' }}>
                  {noticeList.map((v, idx) => (
                    <div style={{ margin: '0.3rem 0' }} key={`key_p_${idx + 1}`}>
                      <NoticeCard
                        item={v}
                        reload={this.reload}
                        key={`key_${idx + 1}`}
                        type="open"
                      />
                    </div>
                  ))}
                </div>
              }
            />
           </div>
         )}
       </div>
      );
   }
 }
  
 export default OpenList;
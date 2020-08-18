/*
 * @Author: jiangshasha 
 * @Date: 2020-08-05 11:00:15 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-08-05 16:06:30
 * @Description: 互动咨询 —— 已关闭列表
 */
import React, { Component } from 'react';
import NoticeCard from '../components/NoticeCard';
import PullUpLoad from 'components/PullUpLoad';


class ClosedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noticeList: [
        {
          id: 1,
          name: '姜沙沙',
          time: '2020.08.05 15:35',
          lastInfo: '请问有什么可以帮助到你的?'
        },
        {
          id: 2,
          name: '漫兮',
          time: '2020.08.05 15:35',
          lastInfo: 'hello, What can I do for you?'
        },
        {
          id: 3,
          name: '坏脾气',
          time: '2020.08.05 15:35',
          lastInfo: '你好'
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

  componentDidMount() {
    this.fetchData();
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
        noticeList: [
        ],
      },
      () => {
        this.fetchData();
      },
    );
  };

  // 获取数据
  fetchData = () => {
    console.log('获取数据')
  }

  render() {
    const { noticeList, loaded, refreshing, noData } = this.state;
    return ( 
      <div>
        {noData ? (
          <div className={styless.view_null}>
            <div className={styless.banner}>
              <span>未查询到已关闭信息</span>
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
                        type="closed"
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
 
export default ClosedList;

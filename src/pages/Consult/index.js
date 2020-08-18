import DocumentTitle from 'react-document-title';
import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Tabs, NavBar, Icon, Modal } from 'antd-mobile';
import styles from './index.less';
import rabit  from '../../assets/images/consult/12366.png';
import taxpeople from '../../assets/images/consult/taxpeople.png';
import ClosedList from './ClosedList';
import OpenList from './openList';



class Consult extends Component {
  constructor(props) {
    super(props);
    const {
      location: {
        query: { tab },
      },
    } = props;
    this.state = {
      // 当前选中tab
      tabKey: tab || 'open',
      visible: false
    };
  }

  tabChange = tab => {
    this.setState({ tabKey: tab.key });
    router.replace({
      query: {
        tab: tab.key,
      },
    });
  };

  gotoDetail = () => {
    router.push('Consult/details');
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };


  render() {
    const tabs = [
      { key: 'open', title: '咨询中' },
      { key: 'closed', title: '已关闭' },
    ];
    const target = [
      {
        image: rabit,
        name: '12366纳税服务平台',
        description: '为您提供税收政策咨询服务'
      },
      {
        image: taxpeople,
        name: '税收管理员',
        description: '对申报缴纳税款等事项实施直接监管和服务'
      }
    ];

    const { tabKey, visible } = this.state;
    return ( 
      <DocumentTitle title="税企互动">
      <div
        className={styles.view_content}
      >
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => router.goBack()}
        >互动咨询
        </NavBar>

        <Tabs
          tabs={tabs}
          initialPage={tabKey}
          tabBarBackgroundColor="unset"
          onChange={(tab, index) => {
            this.tabChange(tab, index);
          }}
        >
          <div key="open">
            <div className={styles.open_btn} onClick={() => {this.setState({ visible: true })}}>发起咨询</div>
            <OpenList />
          </div>
          <div key="closed">
            <ClosedList />
          </div>
        </Tabs>
        
        <Modal
          visible={visible}
          transparent
          maskClosable={false}
          title="请选择咨询对象"
          onClose={() => this.setState({ visible: false })}
          footer={[{ text: '取消', onPress: () => { this.onClose(); } }]}
        >
          <div className={styles.target}>
            {target.map((item, index) => (
              <div key={`key_${index + 1}`} className={styles.target_child} onClick={() => {this.gotoDetail()}}>
                <img src={item.image} />
                <p className={styles.name}>{item.name}</p>
                <p className={styles.description}>{item.description}</p>
              </div>
            )) }
          </div>
        </Modal>
      </div>
    </DocumentTitle>
     );
  }
}
 
export default Consult;
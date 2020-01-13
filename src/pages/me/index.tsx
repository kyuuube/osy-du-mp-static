import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { AtAvatar, AtList, AtListItem } from 'taro-ui';
import { View, Button } from '@tarojs/components';
import PageContainer from '../../components/PageContainer/index';
import { NavigationBarProps } from '../../components/NavigationBar';

import './index.scss';

interface Props {}

interface State {
  navigationBarProps: NavigationBarProps;
  oauthBtnStatus: boolean;
  userInfo: any;
}

class Me extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      oauthBtnStatus: true,
      userInfo: null,
      navigationBarProps: {
        title: '我的',
        backgroundColor: '#f7f7f7',
        frontColor: '#000000',
        backBtnVisible: false
      }
    };
  }

  async componentWillMount() {
    this.getAuthStatus();
    // Taro.login({secret: '8bdd43f559a6f1130d3f22c1a4d06db3', appid: 'wx2bf8e6f813638f82'})
    Taro.login().then(res => console.log(res));
    await Taro.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff'
    });
  }

  async getAuthStatus() {
    const res = await Taro.getSetting();
    if (Object.keys(res.authSetting).length === 0 || !res.authSetting['scope.userInfo']) {
      // 用户信息无授权
      console.log(res.authSetting);
      console.log('用户无授权信息');
      this.setState({ oauthBtnStatus: false });
    } else {
      this.setState({ oauthBtnStatus: true });
      this.auth();
    }
  }

  async auth() {
    const res: any = await Taro.getUserInfo({
      lang: 'zh_CN'
    }).catch(e => console.log(e));
    console.log(res);
    this.setState({ userInfo: res.userInfo });
    this.setState({ oauthBtnStatus: true });
  }

  onGotUserInfo = res => {
    console.log('res', res);
  };

  logout = () => {
    this.setState({ oauthBtnStatus: false });
  };

  render() {
    // 我的订单 账户 卡券 地址管理 消息通知 客服中心
    const { navigationBarProps, oauthBtnStatus, userInfo } = this.state;
    return (
      <PageContainer showStatusBar showNavBar navigationBarProps={navigationBarProps}>
        <View className='me'>
          {oauthBtnStatus && userInfo ? (
            <View>
              <View className='user-warp'>
                <View className='user-avatar'>
                  <AtAvatar size='small' image={userInfo.avatarUrl} circle />
                </View>
                <View className='user-info'>{userInfo.nickName}</View>
              </View>
              <AtList>
                <AtListItem
                  title='我的订单'
                  arrow='right'
                  iconInfo={{
                    size: 25,
                    color: '#1d1d1d',
                    value: 'shopping-cart'
                  }}
                />
                <AtListItem
                  title='账户'
                  extraText='¥0'
                  arrow='right'
                  iconInfo={{ size: 25, color: '#1d1d1d', value: 'money' }}
                />
                <AtListItem
                  title='卡券'
                  arrow='right'
                  iconInfo={{
                    size: 25,
                    color: '#1d1d1d',
                    value: 'credit-card'
                  }}
                />
                <AtListItem
                  title='地址管理'
                  arrow='right'
                  iconInfo={{ size: 25, color: '#1d1d1d', value: 'map-pin' }}
                />
                <AtListItem
                  title='消息通知'
                  arrow='right'
                  iconInfo={{ size: 25, color: '#1d1d1d', value: 'message' }}
                />
                <AtListItem
                  title='客服中心'
                  arrow='right'
                  iconInfo={{ size: 25, color: '#1d1d1d', value: 'phone' }}
                />
              </AtList>
              <View onClick={() => this.logout()} className='logoutBtn'>
                退出登录
              </View>
            </View>
          ) : (
            <Button
              openType='getUserInfo'
              onClick={() => this.auth()}
              onGetUserInfo={res => this.onGotUserInfo(res)}
              type='primary'>
              授 权
            </Button>
          )}
        </View>
      </PageContainer>
    );
  }
}

export default Me as ComponentType;

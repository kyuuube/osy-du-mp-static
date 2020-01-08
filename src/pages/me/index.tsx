import { ComponentType } from 'react'
import Taro, { Component } from '@tarojs/taro'
import {AtAvatar, AtList, AtListItem} from "taro-ui"
import { View } from '@tarojs/components'
import PageContainer from '../../components/PageContainer/index'
import { NavigationBarProps } from '../../components/NavigationBar/index'

import "./index.scss"
interface Props {}

interface State {
  navigationBarProps: NavigationBarProps
}

class Me extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      navigationBarProps: {
        title: '我的',
        backgroundColor: '#f7f7f7',
        frontColor: '#000000',
        backBtnVisible: false
      }
    }
  }

  async componentWillMount () {
    Taro.getUserInfo().then(res => console.log(res))
    await Taro.setNavigationBarColor({frontColor: "#000000", backgroundColor: "#ffffff"})
  }

  render () {
    // 我的订单 账户 卡券 地址管理 消息通知 客服中心
    const {navigationBarProps} = this.state
    return (
      <PageContainer showStatusBar showNavBar navigationBarProps={navigationBarProps}>
        <View className='me'>
          <View className='user-warp'>
            <View className='user-avatar'>
              <AtAvatar size='small' text='凹凸实验室' circle />
            </View>
            <View className='user-info'>
              du_ulekod
            </View>
          </View>
          <AtList>
            <AtListItem
              title='我的订单'
              arrow='right'
              iconInfo={{ size: 25, color: '#1d1d1d', value: 'shopping-cart', }}
            />
            <AtListItem
              title='账户'
              extraText='¥0'
              arrow='right'
              iconInfo={{ size: 25, color: '#1d1d1d', value: 'money', }}
            />
            <AtListItem
              title='卡券'
              arrow='right'
              iconInfo={{ size: 25, color: '#1d1d1d', value: 'credit-card', }}
            />
            <AtListItem
              title='地址管理'
              arrow='right'
              iconInfo={{ size: 25, color: '#1d1d1d', value: 'map-pin', }}
            />
            <AtListItem
              title='消息通知'
              arrow='right'
              iconInfo={{ size: 25, color: '#1d1d1d', value: 'message', }}
            />
            <AtListItem
              title='客服中心'
              arrow='right'
              iconInfo={{ size: 25, color: '#1d1d1d', value: 'phone', }}
            />
          </AtList>
          <View className='logoutBtn'>退出登录</View>
        </View>
      </PageContainer>
    )
  }
}

export default Me as ComponentType

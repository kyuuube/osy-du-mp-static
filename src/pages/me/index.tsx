import { ComponentType } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PageContainer from '../../components/PageContainer/index'
import { NavigationBarProps } from '../../components/NavigationBar/index'

interface Props {}

interface State {
  navigationBarProps: NavigationBarProps
}

class Me extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      navigationBarProps: {
        title: '标题',
        backgroundColor: '#02C3FF',
        frontColor: '#ffffff'
      }
    }
  }

  componentWillMount () { }

  render () {
    const {navigationBarProps} = this.state
    return (
      <PageContainer navigationBarProps={navigationBarProps}>
        <View>xxx页面</View>
      </PageContainer>
    )
  }
}

export default Me as ComponentType

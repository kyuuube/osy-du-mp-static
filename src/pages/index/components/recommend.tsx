import Taro, { Component } from '@tarojs/taro'
import classnames from 'classnames'
// 引入 Swiper, SwiperItem 组件
import { Swiper, SwiperItem, View } from '@tarojs/components'

import './index.scss'

type Props = {
  // fullPage?: boolean,
  // hide?: boolean
}

type State = {
  currentTab: number
}

export default class Recommend extends Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      currentTab: 0,
    }
  }

  componentWillMount() {
  }

  changeCurrent = (value: number) => {
    this.setState({currentTab: value})
  }

  render() {
    const { currentTab } = this.state
    const ActiveClass = classnames({'recommend-swi-warp': true, 'second-swi': currentTab === 1})
    return (
        <View className='recommend'>
          <View className='hot-topic'>热门话题</View>
          <Swiper
            onChange={(e:any) => this.changeCurrent(e.currentTarget.current)}
            current={currentTab}
            className={ActiveClass}
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            indicatorDots
          >
            <SwiperItem>
              <View className='recommend-swi-item'>
                {
                  Array(4).fill({topic: "555555555"}).map((i, index) => {
                    return <View key={index} className='topic-item'>{i.topic}</View>
                  })
                }
              </View>
            </SwiperItem>
            <SwiperItem>
              <View className='recommend-swi-item'>2</View>
            </SwiperItem>
          </Swiper>
        </View>
    )
  }
}

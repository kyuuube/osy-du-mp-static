import Taro, { Component } from '@tarojs/taro'
import classnames from 'classnames'
// 引入 Swiper, SwiperItem 组件
import { Swiper, SwiperItem, View, Image } from '@tarojs/components'

import MasonryLayout from '../masonryLayout/masonryLayout'
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

  renderTopicItem = ():any => {
    return  Array(8).fill({topic: "爆气侧漏填填填"}).map((i, index) => {
      return <View key={index} className='topic-item at-row'>
        <View className='topic-image at-col at-col-4'>
          <Image src='https://i.loli.net/2019/11/20/wQfDT1cBZ2yivtz.jpg' />
        </View>
        <View className='topic-info at-col'>
          <View className='topic-title'>{`#${i.topic}`}</View>
          <View className='topic-number'>233条内容</View>
        </View>
      </View>
    })
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
                  Array(4).fill({topic: "爆气侧漏填填填"}).map((i, index) => {
                    return <View key={index} className='topic-item at-row'>
                      <View className='topic-image at-col at-col-4'>
                        <Image src='https://i.loli.net/2019/11/20/wQfDT1cBZ2yivtz.jpg' />
                      </View>
                      <View className='topic-info at-col'>
                        <View className='topic-title'>{`#${i.topic}`}</View>
                        <View className='topic-number'>233条内容</View>
                      </View>
                    </View>
                  })
                }
              </View>
            </SwiperItem>
            <SwiperItem>
              <View className='recommend-swi-item'>
                {
                  this.renderTopicItem()
                }
              </View>
            </SwiperItem>
          </Swiper>
          <MasonryLayout />
        </View>
    )
  }
}

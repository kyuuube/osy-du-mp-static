import Taro, { Component } from '@tarojs/taro'
import { observable } from 'mobx';
// import classnames from 'classnames'
import { View } from '@tarojs/components'

import './index.scss'

type Props = {
}

type State = {
  list: any[],
  heightArr: any[],
}

export default class MasonryLayout extends Component<Props, State> {
  @observable images
  @observable windowWidth
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      heightArr: [],
    }
  }

  componentWillMount() {
    Taro.getSystemInfo().then(value => {
      console.log(value.windowWidth)
      this.windowWidth = value.windowWidth
    })
    this.images = [{
        width: 360,
        height: 540
      }, {
        width: 480,
        height: 540
      }, {
        width: 540,
        height: 720
      }, {
        width: 720,
        height: 960
      }, {
        width: 540,
        height: 960
      }, {
        width: 360,
        height: 720
      }, {
        width: 360,
        height: 960
      }, {
        width: 540,
        height: 540
      }, {
        width: 540,
        height: 1440
      }, {
        width: 960,
        height: 1440
      }]
    this.initData(2)
  }
  setDataList() {
    this.images = [...this.images, ...this.images]
    this.initData(2)
  }

  initData (col) {
    console.log(this.windowWidth)
    let images: any[] = []
    let list: any[] = []
    let heightArr: any[] = this.state.heightArr
    images = this.images.map((i, index) => ({...i, id: index}))
    for (let i in images) {
      const scale = this.windowWidth / images[i].width
      let height = images[i].height * scale
      // console.log(scale)
      images[i].showHeight = height
      images[i].showWidth = this.windowWidth
      // 第一行的两个盒子
      if (i < col) {
        list.push([images[i]])
        heightArr.push(height)
      } else {
        // 选出高度较矮的一列的索引
        let minHeight = Math.min.apply(null, this.state.heightArr)
        let minHeightIndex = this.state.heightArr.indexOf(minHeight)
        list[minHeightIndex].push(images[i])
        heightArr = this.state.heightArr
        heightArr[minHeightIndex] += height
        this.setState({heightArr: heightArr})
      }
    }
    this.setState({
      list: list
    })
    this.setState({heightArr: []})
  }

  render() {
    const { list } = this.state
    return (
      /**
       * TODO 1.下拉滚动刷新数据
       * TODO 2.图片懒加载
       * ? 没有跳转详情页，整合优化成组件
       * ! 需要后端提供图片扩展数据 高度 宽度
       */
      <View className='masonry-layout' onClick={this.setDataList}>
          {
            list.map((item, index) => {
              return (
                <View key={index} className='column'>
                  {
                    item.map((i) => {
                      return (
                        <View key={i.id} className='item' style={`height: ${i.showHeight}rpx; width: ${i.showWidth}PX`}>
                          <View>
                            {i.id}
                          </View>
                        </View>
                      )
                    })
                  }
                </View>
              )
            })
          }
        </View>
    )
  }
}

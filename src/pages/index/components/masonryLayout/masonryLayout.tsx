import Taro, { Component } from '@tarojs/taro'
import { observable } from 'mobx';
// import classnames from 'classnames'
import { View, Image, Text } from '@tarojs/components'
import {AtIcon} from "taro-ui";

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
      this.windowWidth = (value.windowWidth - 21) / 2
      this.images = [
        {
          url: 'https://i.loli.net/2019/12/15/ZFhLkbKqWfMyEVl.jpg',
          height: 333,
          width: 500
        },
        {
          url: 'https://i.loli.net/2019/12/15/lnFA372SX9JLT5h.jpg',
          height: 751,
          width: 500
        },
        {
          url: 'https://i.loli.net/2019/12/15/CUyfBuTzxnqJkH1.jpg',
          height: 500,
          width: 500
        },
        {
          url: 'https://i.loli.net/2019/12/15/1DxWAOTd2HrEVMf.jpg',
          height: 750,
          width: 500
        },
        {
          url: 'https://i.loli.net/2019/12/15/SP6J9uwANcDogiI.jpg',
          height: 750,
          width: 500
        },
        {
          url: 'https://i.loli.net/2019/12/15/8PcJm9s1g7AQ4Fb.jpg',
          height: 629,
          width: 500
        },
        {
          url: 'https://i.loli.net/2019/12/15/v4XydLFuxJ9Mel5.jpg',
          height: 675,
          width: 500
        },
        {
          url: 'https://i.loli.net/2019/12/15/KMGvEXu8qxTPCB4.jpg',
          height: 313,
          width: 500
        },
        {
          url: 'https://i.loli.net/2019/12/15/YbVWSLm7GxCau4E.jpg',
          height: 750,
          width: 500
        },
        {
          url: 'https://i.loli.net/2019/12/15/bTxqCyfoGdRaB9c.jpg',
          height: 667,
          width: 500
        }
      ]
      this.initData(2)
    })

  }
  setDataList() {
    this.images = [...this.images, ...this.images]
    this.initData(2)
  }

  initData (col) {
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
                        <View key={i.id} className='item'>
                          <Image lazyLoad src={i.url} style={`height: ${i.showHeight}PX; width: ${i.showWidth}PX`}>
                        </Image>
                          <View className='info-warp'>
                            <View className='title'>
                              唐嫣微博图片图片
                            </View>
                            <View className='info'>
                              <View className='user-info'>驶往leo</View>
                              <View className='like'> <AtIcon value='heart' size='11' color='#bdbdbd'></AtIcon><Text style='margin-left: 5px'>4933</Text></View>
                            </View>
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

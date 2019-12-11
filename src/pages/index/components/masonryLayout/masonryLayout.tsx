import Taro, { Component } from '@tarojs/taro'
import { observable } from 'mobx';
// import classnames from 'classnames'
import { View } from '@tarojs/components'

import './index.scss'

type Props = {
  // fullPage?: boolean,
  // hide?: boolean
}

type State = {
  // imgSrc1: string
  // imgSrc2: string
  list: any[],
  // images: any[],
  heightArr: any[]
}

export default class MasonryLayout extends Component<Props, State> {
  @observable images
  constructor (props) {
    super(props)
    this.state = {
      // imgSrc1: require('../../../../assets/temp/001.png'),
      // imgSrc2: require('../../../../assets/temp/008.png'),
      // images: [{
      //   width: 360,
      //   height: 540
      // }, {
      //   width: 480,
      //   height: 540
      // }, {
      //   width: 540,
      //   height: 720
      // }, {
      //   width: 720,
      //   height: 960
      // }, {
      //   width: 540,
      //   height: 960
      // }, {
      //   width: 360,
      //   height: 720
      // }, {
      //   width: 360,
      //   height: 960
      // }, {
      //   width: 540,
      //   height: 540
      // }, {
      //   width: 540,
      //   height: 1440
      // }, {
      //   width: 960,
      //   height: 1440
      // }],
      list: [],
      heightArr: []
    }
  }

  componentWillMount() {
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
    let images: any[] = []
    let list: any[] = []
    let heightArr: any[] = this.state.heightArr
    // 模拟图片宽高
    // for (let i = 0; i < 10; i++) {
      // let image = this.state.images[Math.floor(Math.random() * 10)]
    //   images.push({...image, id: i})
    // }
    images = this.images.map((i, index) => ({...i, id: index}))
    for (let i in images) {
      const scale = 182.5 / images[i].width
      let height = images[i].height * scale
      // console.log(scale)
      images[i].showHeight = height
      images[i].showWidth = 182.5
      console.log('preRendingList' , list)
      // 第一行的两个盒子
      if (i < col) {
        console.log('preRendingList if col > i' , list)
        list.push([images[i]])
        heightArr.push(height)
      } else {
        // 选出高度较矮的一列的索引
        let minHeight = Math.min.apply(null, this.state.heightArr)
        console.log(minHeight)
        let minHeightIndex = this.state.heightArr.indexOf(minHeight)
        console.log('target list', this.state.heightArr.indexOf(minHeight))
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
    console.log('rendering', list)
    return (
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

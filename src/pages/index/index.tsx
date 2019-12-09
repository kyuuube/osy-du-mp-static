// eslint-disable-next-line no-unused-vars
import { ComponentType } from 'react'
// eslint-disable-next-line no-unused-vars
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import {AtNavBar} from "taro-ui";
import classnames from 'classnames'
import tabTypes from "../../common/constants/tabType"
// components
import Recommend from "./components/recommend"
import './index.scss'

type PageState = {
  currentTab: number,
  tabTypeList: BaseType[]
}

type PageProps = {
  // currentTab: string,
  // tabTypeList: BaseType[]
}

@inject('counterStore')
@observer
class Index extends Component<PageProps, PageState> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  constructor (props) {
    super(props)
    this.state = {
      currentTab: tabTypes.Recommend.index,
      tabTypeList: Object.keys(tabTypes).map(i => tabTypes[i])
    }
  }


  componentWillMount () { }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleClick = () => {

  }

  changeCurrent = (value: number) => {
    this.setState({currentTab: value})
  }

  render () {
    // const { counterStore: { counter } } = this.props
    const { tabTypeList, currentTab } = this.state
    return (
      <View className='index'>
        <View>
          <AtNavBar
            onClickRgIconSt={this.handleClick}
            onClickLeftIcon={this.handleClick}
            color='#000'
            leftIconType='search'
            rightFirstIconType='camera'
          >
            <View className='header-title'>
              {
                tabTypeList.map((item, index) => {
                  const TextClass = classnames({'header-item': true, 'active-item': currentTab === item.index})
                  return <Text onClick={() => this.changeCurrent(item.index)} key={index} className={TextClass}>{item.label}</Text>
                })
              }
            </View>
          </AtNavBar>
        </View>
        <View>
          <Swiper
            onChange={(e:any) => this.changeCurrent(e.currentTarget.current)}
            current={currentTab}
            className='homepage-swiper'
          >
            <SwiperItem>
              <View className='swiper-tab tab-follow'>1</View>
            </SwiperItem>
            <SwiperItem>
              <Recommend />
            </SwiperItem>
            <SwiperItem>
              <View className='swiper-tab tab-latest'>3</View>
            </SwiperItem>
          </Swiper>
        </View>
      </View>
    )
  }
}

export default Index  as ComponentType

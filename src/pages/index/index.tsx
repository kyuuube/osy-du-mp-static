// eslint-disable-next-line no-unused-vars
import {ComponentType} from 'react'
// eslint-disable-next-line no-unused-vars
import Taro, {Component} from '@tarojs/taro'
import {View, Text, Swiper, SwiperItem} from '@tarojs/components'
import {observer} from '@tarojs/mobx'
import {AtNavBar} from "taro-ui";
import classnames from 'classnames'
import PageContainer from '../../components/PageContainer/index'
import tabTypes from "../../common/constants/tabType"
import {NavigationBarProps} from '../../components/NavigationBar/index'
// components
import Recommend from "./components/recommend/recommend"
import Follow from "./components/follow/index"
import Square from "./components/square/index"
import './index.scss'
// api
import {getTopic} from "../../service/hompageApi"

type PageState = {
  currentTab: number,
  tabTypeList: BaseType[],
  navigationBarProps: NavigationBarProps
}

type PageProps = {}

@observer
class Index extends Component<PageProps, PageState> {

  constructor(props) {
    super(props)
    this.state = {
      currentTab: tabTypes.Recommend.index,
      tabTypeList: Object.keys(tabTypes).map(i => tabTypes[i]),
      navigationBarProps: {
        title: '毒',
        backgroundColor: '#f7f7f7',
        frontColor: '#000000',
        backBtnVisible: false
      }
    }
  }


  async componentWillMount() {
    this.loadTopic()
    await Taro.setNavigationBarColor({frontColor: "#000000", backgroundColor: "#ffffff"})
  }

  handleClick = () => {

  }

  changeCurrent = (value: number) => {
    this.setState({currentTab: value})
  }

  async loadTopic() {
    const {records} = await getTopic().catch(e => e)
    console.log(records)
  }

  render() {
    const {tabTypeList, currentTab, navigationBarProps} = this.state
    return (
      <PageContainer showStatusBar showNavBar navigationBarProps={navigationBarProps}>
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
                    return <Text onClick={() => this.changeCurrent(item.index)} key={index}
                                 className={TextClass}>{item.label}</Text>
                  })
                }
              </View>
            </AtNavBar>
          </View>
          <View>
            <Swiper
              onChange={(e: any) => this.changeCurrent(e.currentTarget.current)}
              current={currentTab}
              className='homepage-swiper'
            >
              <SwiperItem>
                <Follow/>
              </SwiperItem>
              <SwiperItem>
                <Recommend/>
              </SwiperItem>
              <SwiperItem>
                <Square/>
              </SwiperItem>
            </Swiper>
          </View>
        </View>
      </PageContainer>
    )
  }
}

export default Index as ComponentType

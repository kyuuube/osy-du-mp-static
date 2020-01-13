import Taro, { Component } from '@tarojs/taro';
import classnames from 'classnames';
// 引入 Swiper, SwiperItem 组件
import { Swiper, SwiperItem, View, Image, ScrollView } from '@tarojs/components';

import MasonryLayout from '../masonryLayout/masonryLayout';
import './index.scss';
// api
import { getTopic } from '../../../../service/hompageApi';

type Props = {
  // fullPage?: boolean,
  // hide?: boolean
};

type State = {
  currentTab: number;
  windowHeight: number;
  topicList: any[];
};

export default class Recommend extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
      windowHeight: 0,
      topicList: []
    };
  }

  componentWillMount() {
    this.loadTopic();
    Taro.getSystemInfo().then(value => {
      this.setState({ windowHeight: value.windowHeight });
    });
  }

  changeCurrent = (value: number) => {
    this.setState({ currentTab: value });
  };

  LowerLoad = () => {
    // eslint-disable-next-line react/no-string-refs
    this.refs.masonry.setDataList();
  };

  async loadTopic() {
    const { records } = await getTopic().catch(e => e);
    this.setState({ topicList: records });
    console.log(records);
    console.log(records.slice(4));
  }

  renderTopicItem = (topicList: any[]): any => {
    return topicList.map((i, index) => {
      return (
        <View key={index} className='topic-item at-row'>
          <View className='topic-image at-col at-col-4'>
            <Image src={i.url} />
          </View>
          <View className='topic-info at-col'>
            <View className='topic-title'>{`#${i.name}`}</View>
            <View className='topic-number'>{i.num}条内容</View>
          </View>
        </View>
      );
    });
  };

  render() {
    const { currentTab, windowHeight, topicList } = this.state;
    const ActiveClass = classnames({ 'recommend-swi-warp': true, 'second-swi': currentTab === 1 });
    return (
      <View className='recommend'>
        <ScrollView
          style={`height: ${windowHeight}px`}
          scrollY
          scrollWithAnimation
          enableBackToTop
          onScrollToLower={() => this.LowerLoad()}>
          <View className='hot-topic'>热门话题</View>
          <Swiper
            onChange={(e: any) => this.changeCurrent(e.currentTarget.current)}
            current={currentTab}
            className={ActiveClass}
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            indicatorDots>
            <SwiperItem>
              <View className='recommend-swi-item'>
                {topicList.slice(0, 4).map((i, index) => {
                  return (
                    <View key={index} className='topic-item at-row'>
                      <View className='topic-image at-col at-col-3'>
                        <Image src={i.url} />
                      </View>
                      <View className='topic-info at-col'>
                        <View className='topic-title'>{`#${i.name}`}</View>
                        <View className='topic-number'>{i.num}条内容</View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </SwiperItem>
            <SwiperItem>
              <View className='recommend-swi-item'>{this.renderTopicItem(topicList.slice(4))}</View>
            </SwiperItem>
          </Swiper>
          {/* eslint-disable-next-line react/no-string-refs */}
          <MasonryLayout ref='masonry' />
        </ScrollView>
      </View>
    );
  }
}

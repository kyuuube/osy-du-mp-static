import Taro, { Component } from '@tarojs/taro';
// import classnames from 'classnames'
import { ScrollView, View, Image, Text } from '@tarojs/components';
import { AtAvatar, AtIcon } from 'taro-ui';

import './index.scss';

type Props = {
  // fullPage?: boolean,
  // hide?: boolean
};

type State = {
  windowHeight: number;
  windowWidth: number;
};

export default class Follow extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      windowHeight: 0,
      windowWidth: 0
    };
  }

  componentWillMount() {
    Taro.getSystemInfo().then(value => {
      this.setState({ windowHeight: value.windowHeight });
      this.setState({ windowWidth: value.windowWidth });
    });
  }

  render() {
    const { windowHeight, windowWidth } = this.state;
    console.log(windowWidth);
    return (
      // 最多6张图，1: 单图最大高度 450, 2 ～ 4: 平分设备宽度,最大高度220px , 5: 前两张 平分设备宽度, 后三张一排 平分设备宽度
      <ScrollView
        className='follow'
        scrollY
        scrollWithAnimation
        enableBackToTop
        style={`height: ${windowHeight}px`}>
        {Array(4)
          .fill({ topic: '爆气侧漏填填填' })
          .map((i, index) => {
            return (
              <View key={index} className='follow-item'>
                <View className='item-header-info'>
                  <AtAvatar size='small' text='凹凸实验室' circle />
                  <View className='user-info'>
                    <View className='title'>QBBBBBB</View>
                    <View className='info'>1小时前 上海市</View>
                  </View>
                </View>
                <View className='photograph-warp'>
                  <Image src='https://i.loli.net/2019/11/20/wQfDT1cBZ2yivtz.jpg' />
                </View>
                <View className='tag-list'>
                  <View className='tag'>#兔兔图图</View>
                </View>
                <View className='main-title'>{i.topic}</View>
                <View className='tool-bar'>
                  <View className='left'>
                    <AtIcon value='external-link' size='20' color='#bdbdbd' />
                  </View>
                  <View className='right'>
                    <View className='item'>
                      <AtIcon value='eye' size='23' color='#bdbdbd' />
                      <Text>2</Text>
                    </View>
                    <View className='item'>
                      <AtIcon value='heart' size='23' color='#bdbdbd' />
                      <Text>2</Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
      </ScrollView>
    );
  }
}

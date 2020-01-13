import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

import './index.scss';
import { AtAvatar } from 'taro-ui';

type Props = {};

type State = {};

export default class Square extends Component<Props, State> {
  componentWillMount() {}

  render() {
    return (
      <View className='square'>
        <View className='recommend-circle'>
          <View>为你推荐的圈子</View>
          <View>
            <View>
              <View className='list-item'>
                <AtAvatar size='small' text='凹凸实验室' circle />
                <View className='item-detail'>
                  <View className='title'>QBBBBBB</View>
                  <View className='info'>1小时前 上海市</View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className='list'>
          <View>人气榜单</View>
        </View>
        <View className='Latest'>
          <View>最新内容</View>
        </View>
      </View>
    );
  }
}

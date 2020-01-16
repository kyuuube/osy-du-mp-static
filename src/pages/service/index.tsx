import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

import './index.scss';

type Props = {
  fullPage?: boolean;
  hide?: boolean;
};

export default class Service extends Component<Props, {}> {
  render() {
    return <View />;
  }
}

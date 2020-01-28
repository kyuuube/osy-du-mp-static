import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import PageContainer from '../../components/PageContainer/index';
import { NavigationBarProps } from '../../components/NavigationBar';

import './index.scss';

type Props = {};

interface State {
  navigationBarProps: NavigationBarProps;
}

export default class Order extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      navigationBarProps: {
        title: '购物',
        backgroundColor: '#f7f7f7',
        frontColor: '#000000',
        backBtnVisible: false
      }
    };
  }

  async componentWillMount() {
    await Taro.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff'
    });
  }

  render() {
    const { navigationBarProps } = this.state;
    return (
      <PageContainer showStatusBar showNavBar navigationBarProps={navigationBarProps}>
        <View>未完成</View>
      </PageContainer>
    );
  }
}

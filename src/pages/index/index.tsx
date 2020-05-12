import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import PageContainer from '../../components/PageContainer/index';
import { NavigationBarProps } from '../../components/NavigationBar/index';
import './index.scss';

type PageState = {
  navigationBarProps: NavigationBarProps;
};

type PageProps = {};

@observer
class Index extends Component<PageProps, PageState> {
  constructor(props) {
    super(props);
    this.state = {
      navigationBarProps: {
        title: '酒花儿',
        backgroundColor: '#000000',
        frontColor: '#f7f7f7',
        backBtnVisible: false
      }
    };
  }

  async componentWillMount() {
    // await Taro.setNavigationBarColor({ frontColor: '#f7f7f7', backgroundColor: '#000000' });
    // await Taro.hideTabBar({animation: false});
  }

  render() {
    const { navigationBarProps } = this.state;
    return (
      <PageContainer showStatusBar showNavBar navigationBarProps={navigationBarProps}>
        <View className='index'>
          <View className='box'>
            <View className='wave -one'></View>
            <View className='wave -two'></View>
            <View className='wave -three'></View>
            <View className='title'>Capacities</View>
          </View>
        </View>
      </PageContainer>
    );
  }
}

export default Index as ComponentType;

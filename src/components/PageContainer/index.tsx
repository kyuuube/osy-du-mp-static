import { CSSProperties } from 'react';
import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { observer } from '@tarojs/mobx';
// import theme from '../../theme/index'
import NavigationBar, { NavigationBarProps } from '../NavigationBar/index';

import './index.scss';

interface Props {
  navigationBarProps?: NavigationBarProps;
  containerStyle?: CSSProperties;
  onBackBtnClick?: Function;
  showNavBar?: boolean;
  showStatusBar?: boolean;
}
interface State {
  statusBarHeight: number;
  navigationBarHeight: number;
  contentHeight: number;
}
let loaded = false;
let cacheStatusBarHeight = 20;

/**
 * @name 页面根容器
 */
@observer
export default class PageContainer extends Component<Props, State> {
  static defaultProps = {
    containerStyle: {}
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      statusBarHeight: process.env.TARO_ENV === 'h5' ? 0 : 20,
      navigationBarHeight: 45,
      contentHeight: 0
    };
  }

  async componentWillMount() {
    if (process.env.TARO_ENV === 'weapp') {
      if (!loaded) {
        const { statusBarHeight } = await Taro.getSystemInfo();
        console.log('statusBarHeight', statusBarHeight);
        loaded = true;
        cacheStatusBarHeight = statusBarHeight;
      }
      this.setState({
        statusBarHeight: cacheStatusBarHeight
      });
    }
  }

  async componentDidShow() {
    if (process.env.TARO_ENV === 'weapp') {
      const { screenHeight } = await Taro.getSystemInfo();
      this.setState({
        contentHeight: screenHeight
      });
    }
  }

  onGoBack = () => {
    const { onBackBtnClick } = this.props;
    if (onBackBtnClick) {
      onBackBtnClick();
    } else {
      if (Taro.getCurrentPages().length === 1) {
        Taro.switchTab({ url: '/pages/Home/index' });
      } else {
        Taro.navigateBack();
      }
    }
  };

  render() {
    const { statusBarHeight, navigationBarHeight, contentHeight } = this.state;
    const { containerStyle, showNavBar, showStatusBar, navigationBarProps } = this.props;
    const frontColor = '#000000';
    console.log(navigationBarProps);
    return (
      <View className='PageContainer' style={{ ...containerStyle }}>
        {showNavBar ? (
          <NavigationBar
            title={navigationBarProps && navigationBarProps.title}
            statusBarHeight={
              navigationBarProps && navigationBarProps.statusBarHeight
                ? navigationBarProps.statusBarHeight
                : statusBarHeight
            }
            navigationBarHeight={
              navigationBarProps && navigationBarProps.navigationBarHeight
                ? navigationBarProps.navigationBarHeight
                : navigationBarHeight
            }
            frontColor={
              navigationBarProps && navigationBarProps.frontColor
                ? navigationBarProps.frontColor
                : frontColor
            }
            backgroundColor={
              navigationBarProps && navigationBarProps.backgroundColor
                ? navigationBarProps.backgroundColor
                : '#ffffff'
            }
            backBtnVisible={navigationBarProps && navigationBarProps.backBtnVisible}
            onBackBtnClick={this.onGoBack}
            position='fixed'
            userVisible={navigationBarProps && navigationBarProps.userVisible}
          />
        ) : (
          ''
        )}
        <View
          className='pageContent'
          style={{
            paddingTop: showNavBar
              ? statusBarHeight + navigationBarHeight + 'px'
              : showStatusBar
              ? statusBarHeight + 20 + 'px'
              : '0px',
            height: contentHeight ? contentHeight + 'px' : 'auto'
          }}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

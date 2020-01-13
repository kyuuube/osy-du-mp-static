import { View, Image } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { observer } from '@tarojs/mobx';
import './index.scss';
// import theme from 'theme'

export interface NavigationBarProps {
  statusBarHeight?: number;
  navigationBarHeight?: number;
  /** 只能是黑色或者白色，如果想另外加，请先做个对应颜色的箭头图片 */
  frontColor?: '#000000' | '#ffffff' | string;
  backgroundColor?: string;
  backBtnVisible?: boolean;
  onBackBtnClick?: Function;
  title?: string;
  position?: 'relative' | 'fixed' | 'absolute';
}
interface State {}

/** 箭头图片s */
const arrows = {
  black: require('./assets/arrow-black.png'),
  white: require('./assets/arrow-white.png')
};

/**
 * @name 自定义导航条
 */
@observer
export default class NavigationBar extends Component<NavigationBarProps, State> {
  static defaultProps = {
    statusBarHeight: 20,
    navigationBarHeight: 45,
    frontColor: '#000000',
    backgroundColor: '#ffffff',
    backBtnVisible: true,
    title: '',
    position: 'fixed'
  };

  constructor(props: NavigationBarProps) {
    super(props);
  }
  goBack = () => {
    if (this.props.onBackBtnClick) {
      this.props.onBackBtnClick();
    } else {
      if (Taro.getCurrentPages().length === 1) {
        Taro.reLaunch({ url: '/pages/Home/index' });
      } else {
        Taro.navigateBack();
      }
    }
  };

  render() {
    const {
      statusBarHeight,
      navigationBarHeight,
      frontColor,
      backgroundColor,
      backBtnVisible,
      title,
      position
    } = this.props;
    let frontColorName = 'black';
    switch (frontColor) {
      case '#000000':
        frontColorName = 'black';
        break;
      case '#ffffff':
        frontColorName = 'white';
        break;
    }
    return (
      <View
        className='NavigationBar'
        style={{
          height: navigationBarHeight! + statusBarHeight! + 'px',
          paddingTop: statusBarHeight + 'px',
          backgroundColor,
          color: frontColor,
          position
        }}>
        <View className='leftWrap'>
          {backBtnVisible && (
            <View className='btn' onClick={this.goBack}>
              <Image src={arrows[frontColorName]} className='arrow' />
            </View>
          )}
        </View>
        <View className='titleBox'>{title}</View>
        <View className='rightWrap' />
      </View>
    );
  }
}

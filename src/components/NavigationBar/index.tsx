import { View, Image } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { observer } from '@tarojs/mobx';
import { AtIcon } from 'taro-ui';
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
  userVisible?: boolean;
}
interface State {}

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
    position: 'fixed',
    userVisible: false
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
      position,
      userVisible
    } = this.props;
    console.log(this.props);
    console.log(userVisible);
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
              <AtIcon value='chevron-left' size='30' color={frontColor}></AtIcon>
            </View>
          )}
          {userVisible && (
            <View className='custom-avatar'>
              <Image src='https://jdc.jd.com/img/200'></Image>
            </View>
          )}
        </View>
        <View className='titleBox'>{title}</View>
        <View className='rightWrap' />
      </View>
    );
  }
}

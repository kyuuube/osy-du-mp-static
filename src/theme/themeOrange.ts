import ThemeName from './ThemeName'

const primaryColor = '#FF4F2C'
const secondaryColor = '#19a5ff'
const navBarBackgroundColor = '#FF4F2C'
const navBarTextColor: any = 'white'
const pageColor = '#ECEFF6'

const defaultColor = '#ffffff'
const defaultTextColor = '#333333'

export default {
  name: ThemeName.Orange as ThemeName,
  // General
  primaryColor,
  secondaryColor,
  pageColor,
  defaultColor,
  defaultTextColor,
  navBarBackgroundColor,
  navBarTextColor,

  imgs: {
    tabs: {
      // home: require('assets/icon/tab_icon_reserve1@3x.png'),
      // home_focus: require('assets/icon/tab_icon_reserve_pre1@3x.png'),
    }
  }
}

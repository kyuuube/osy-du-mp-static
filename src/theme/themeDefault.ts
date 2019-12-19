import ThemeName from './ThemeName'

const primaryColor = '#465BE5'
const secondaryColor = '#19a5ff'
const navBarBackgroundColor = '#465BE5'
const navBarTextColor: any = 'white'
const pageColor = '#ECEFF6'

const defaultColor = '#ffffff'
const defaultTextColor = '#333333'

export default {
  name: ThemeName.Default as ThemeName,
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
      // home: require('assets/icon/tab_icon_reserve@3x.png'),
      // home_focus: require('assets/icon/tab_icon_reserve_pre@3x.png'),
    }
  }
}

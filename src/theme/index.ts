import Taro from '@tarojs/taro'

import ThemeName from './ThemeName'
import themeDefault from './themeDefault'
import themeOrange from './themeOrange'
import configStore from 'stores/configStore'

export const themes = {
  default: themeDefault,
  orange: themeOrange
}

type Themes = typeof themes
export type Theme = (Themes['default'] | Themes['orange']) & { [key: string]: any }

/** 主题 */
const theme: Theme = {
  ...themes[configStore.theme]
}

/** 导航栏配色主题 */
export const themeNavConfig = {
  navigationBarBackgroundColor: theme.navBarBackgroundColor,
  navigationBarTextStyle: theme.navBarTextColor,
  backgroundColorTop: theme.navBarBackgroundColor
}

/** 修改主题 */
export function changeTheme(themeName: ThemeName) {
  Object.assign(theme, themes[themeName])
  themeNavConfig = {
    navigationBarBackgroundColor: theme.navBarBackgroundColor,
    navigationBarTextStyle: theme.navBarTextColor,
    backgroundColorTop: theme.navBarBackgroundColor
  }
  // console.log(themeName, theme)
}

/** 获取后端主题配色 */
export async function getConfigTheme() {
  try {
    // return getConfigThemeCache.get()
  } catch (error) {
    console.log('获取主题失败', error)
    throw error
  }
}

/** 修改导航条颜色 */
export function setNavigationBarColor() {
  Taro.setNavigationBarColor({
    frontColor: theme.defaultColor,
    backgroundColor: theme.navBarBackgroundColor,
    animation: {
      duration: 0,
      timingFunc: 'linear'
    }
  })
  wx.setBackgroundColor({
    backgroundColorTop: theme.navBarBackgroundColor
  })
}

export default theme

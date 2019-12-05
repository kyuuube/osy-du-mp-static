import Taro, { Component } from '@tarojs/taro'
import { AtNavBar } from 'taro-ui'
import { View } from '@tarojs/components'

import './index.scss'

type Props = {
  fullPage?: boolean,
  hide?: boolean
}

export default class OsyHeader extends Component<Props, {}> {

  componentWillMount() {
  }

  handleClick() {

  }

  render() {
    // const { fullPage, hide } = this.props
    // const cls = classnames({
    //     loading_components: true,
    //     fullScreen: fullPage,
    //     hide: hide
    // })
    return (
      <View className='osy-header'>
        <AtNavBar
          onClickRgIconSt={this.handleClick}
          onClickLeftIcon={this.handleClick}
          color='#000'
          leftIconType='search'
          rightFirstIconType='camera'
        >
          <View >Taro UI</View>
        </AtNavBar>
      </View>

    );
  }
}

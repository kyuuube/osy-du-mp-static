import Taro, { Component } from '@tarojs/taro'
// import classnames from 'classnames'
import { View, Image } from '@tarojs/components'

import './index.scss'

type Props = {
  // fullPage?: boolean,
  // hide?: boolean
}

type State = {
  imgSrc1: string
  imgSrc2: string
}

export default class MasonryLayout extends Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      imgSrc1: require('../../../../assets/temp/001.png'),
      imgSrc2: require('../../../../assets/temp/008.png')
    }
  }

  componentWillMount() {
  }

  render() {
    const { imgSrc1, imgSrc2 } = this.state
    return (
        <View className='masonry-layout'>
          {
            Array(20).fill('').map((item, index) => {
              return (
                <View key={index} className='item'>
                      <Image src={index%2 === 0 ?  imgSrc1 : imgSrc2} />
                  <View>
                    {item}
                  </View>
                </View>
              )
            })
          }
        </View>
    )
  }
}

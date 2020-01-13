import Taro, { Component } from '@tarojs/taro';
import { View, Camera, Button } from '@tarojs/components';

// import './index.less'

type Props = {};

export default class CameraPage extends Component<Props, {}> {
  componentWillMount() {}

  render() {
    return (
      <View>
        <Camera device-position='back' flash='off' style='width: 100%; height: 300px;' />
        <Button type='primary'>拍照</Button>
      </View>
    );
  }
}

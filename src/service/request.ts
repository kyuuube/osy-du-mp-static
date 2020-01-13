import Taro from '@tarojs/taro';
import qs from 'qs';
import config from './projectConfig';
/**
 * 检查返回值是否正常
 */
function checkSuccess(response: any) {
  response = response.data;
  if (typeof response.code === 'number' && response.code === 200) {
    return response;
  }
  const message = response.message || '服务器异常';
  const error: any = new Error(message);
  error.data = response;
  error.text = response;
  error.code = response.code;
  throw error;
}

/**
 * 请求错误处理
 */
function throwError(err) {
  Taro.hideNavigationBarLoading();
  Taro.hideNavigationBarLoading();
  const error: any = new Error(err.errMsg || '服务器正在维护中!');
  error.code = 500;
  throw error;
}

export default {
  request(options: any, method?: string) {
    const { url } = options;
    Taro.showNavigationBarLoading();
    return Taro.request({
      ...options,
      method: method || 'GET',
      url: `${config.BASE_URL}${url}`,
      header: {
        ...options.header
      }
    })
      .then(res => {
        return checkSuccess(res);
      })
      .catch(e => throwError(e));
  },
  get(options: { url: string; data?: object }) {
    return this.request({
      ...options
    });
  },
  post(options: any) {
    return this.request(
      {
        ...options,
        data: qs.stringify(options.data)
      },
      'POST'
    );
  }
};

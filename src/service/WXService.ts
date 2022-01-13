import axios from '@/request'

/**
 * 微信相关接口
 */
export class WXService {
  /**
   * getSignature
   */
  static getSignature(url): any {
    return axios.get('/napi/wx/getSignature', {
      params: {
        url,
      },
    })
  }
}

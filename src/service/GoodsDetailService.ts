import axios from '@/request'
import { AxiosResponse } from 'axios'

/**
 * 查询商品详情
 */
export class GoodsDetailService {
  /**
   * 查询商品详情
   */
  static get(params): Promise<AxiosResponse<any>> {
    return axios.get('/api/operation/goods/info', {
      params,
    })
  }

  /**
   * 游览商品
   */
  static viewGood(data): Promise<AxiosResponse<any>> {
    return axios.post('/api/operation/goodsLikeView/view', data)
  }
  /**
   * 点赞
   */
  static thumbsUp(data): Promise<AxiosResponse<any>> {
    return axios.post('/api/operation/goodsLikeView/like', data)
  }

  /**
   * 获取咨询客服id
   */
  static getAskServiceID(): Promise<AxiosResponse<any>> {
    return axios.get('/api/users/cusService/getConsultServiceId/get')
  }
}

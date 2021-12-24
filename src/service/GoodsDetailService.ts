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
}

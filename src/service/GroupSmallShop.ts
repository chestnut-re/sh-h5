import axios from '@/request'
import { AxiosResponse } from 'axios'

/**
 * 订单管理接口
 */
export class SmallShop {
  /**
   * 查询小店基本信息
   */
  static detail(params): Promise<AxiosResponse<any>> {
    return axios.get(`/api/operation/shop/get`,{
        params,
      })
  }

  /**
   * 关注/取消关注店铺
   */
  static attention(data): Promise<AxiosResponse<any>> {
    return axios.post('/api/operation/shop/attention', data)
  }

  /**
   * 小店商品列表
   */
  static list(params): Promise<AxiosResponse<any>> {
    return axios.get(`/api/operation/shop/shopGoodPage`, {
      params,
    })
  }
}

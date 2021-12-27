import axios from '@/request'
import { AxiosResponse } from 'axios'

/**
 * 订单管理接口
 */
export class OrderApi {
  /**
   * 提交订单
   */
  static submit(data): Promise<AxiosResponse<any>> {
    return axios.post('/api/orders/submitOrder', data)
  }
  /**
   * 查询商品详情
   */
  static detail(params): Promise<AxiosResponse<any>> {
    return axios.get(`/api/operation/goods/c/goodsDetail/${params.id}`)
  }
  /**
   * 积分查询
   */
  static getIntegral(): Promise<AxiosResponse<any>> {
    return axios.get(`/api/wallet/c/availableAmt`)
  }

  /**
   * 优惠信息查询
   */
  static getDiscount(data): Promise<AxiosResponse<any>> {
    return axios.post(`/api/operation/goods/discount`, data)
  }
}

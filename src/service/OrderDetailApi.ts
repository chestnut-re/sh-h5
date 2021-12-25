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
    return axios.post('/api/b/orders', data)
  }
  /**
   * 查询订单详情
   */
  static detail(params): Promise<AxiosResponse<any>> {
    return axios.get(`/api/b/orders/${params.id}/details`)
  }
  /**
   * 搜索订单
   */
  static search(params): Promise<AxiosResponse<any>> {
    return axios.get(`/api/b/orders/searching`, {
      params,
    })
  }
}

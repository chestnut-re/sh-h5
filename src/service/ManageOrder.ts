import axios from '@/request'
import { AxiosResponse } from 'axios'

/**
 * 订单管理接口
 */
export class ManageOrder {
  /**
   * 查询订单列表
   */
  static list(params): Promise<AxiosResponse<any>> {
    return axios.get('/api/b/orders', {
      params,
    })
  }
  /**
   * 查询订单详情
   */
  static detail(params): Promise<AxiosResponse<any>> {
    return axios.get(`/api/b/orders/${params.id}/details`)
  }
}

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
    return axios.get('/api/multi/orders', {
      params,
    })
  }
  /**
   * 查询订单详情
   */
  static detail(params): Promise<AxiosResponse<any>> {
    return axios.get(`/api/multi/orders/${params.id}/details`)
  }
  /**
   * 搜索订单
   */
  static search(params): Promise<AxiosResponse<any>> {
    return axios.get(`/api/multi/orders/searching`, {
      params,
    })
  }
  /**
   * 退款单详情
   */
  static remburdetail(id): Promise<AxiosResponse<any>> {
    return axios.get(`/api/orders/refund/getOrderRefundDetail/${id}`)
  }
}

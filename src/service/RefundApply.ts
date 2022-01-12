import axios from '@/request'
import { AxiosResponse } from 'axios'

/**
 * 申请售后接口
 */
export class RefundApis {
  /**
   * 提交退款申请
   */
  static submit(data): Promise<AxiosResponse<any>> {
    return axios.post('/api/orders/refund/refundApply', data)
  }

  /**
   * 获取退款数量
   */
   static suborder(orderId): Promise<AxiosResponse<any>> {
    return axios.get(`/api/orders/refund/refundSuborder/${orderId}`)
  }
}

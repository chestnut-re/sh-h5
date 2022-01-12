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

  /**
   * 获取退款单信息
   */
   static detail(id): Promise<AxiosResponse<any>> {
    return axios.get(`/api/orders/refund/orderRefundDetail/${id}`)
  }

  /**
   * 订单退款信息查询
   */
   static RefundList(orderId): Promise<AxiosResponse<any>> {
    return axios.get(`/api/orders/refund/orderRefundList/${orderId}`)
  }

   /**
   * 提交退款申请
   */
    static edit(data): Promise<AxiosResponse<any>> {
      return axios.post('/api/orders/refund/updateRefundApply', data)
    }
  
}

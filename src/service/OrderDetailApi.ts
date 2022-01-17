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

  /**
   * 支付成功订单确认
   */
  static payConfirm(data): Promise<AxiosResponse<any>> {
    const formData = new FormData()
    formData.append('orderId', data.orderId)
    return axios.post(`/api/orders/payConfirm`, formData)
  }
/**
   * 订单详情查询
   */
 static orderdetail(params): Promise<AxiosResponse<any>> {
  return axios.get(`/api/orders/${params.orderId}`)
}

/**
   * 订单详情查询包含订单过期时间
   */
 static findOrderdetail(params): Promise<AxiosResponse<any>> {
  return axios.get(`/api/orders/findOrderInfoAndEndTimeById/${params.orderId}`)
}
/**
   * 子订单查询
   */
 static suborders(params): Promise<AxiosResponse<any>> {
  return axios.get(`/api/orders/${params.orderId}/suborders`)
}

/**
   * 子订单查询包含退款单
   */
 static orderRefund(params): Promise<AxiosResponse<any>> {
  return axios.get(`/api/orders/refund/orderRefundByOrderId/${params.orderId}`)
}

  /**
   * 待支付订单去付款
   */
 static toPay(data): Promise<AxiosResponse<any>> {
   console.log(`data`, data)
  const formData = new FormData()
  formData.append('orderId', data.orderId)
  return axios.post(`/api/orders/toPay`,formData)
}
 /**
   * 限购
   */
  static purchase(data): Promise<AxiosResponse<any>> {
    return axios.post('/api/orders/restrictedPurchase', data)
  }

  /**
   * 获取最近推荐人
   */
   static getReferees(): Promise<AxiosResponse<any>> {
    return axios.get('/api/users/customer/recommendUser/get')
  }
}

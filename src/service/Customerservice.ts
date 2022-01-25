import axios from '@/request'
import { AxiosResponse } from 'axios'

/**
 * 获取客服Id接口
 */
export class ContactApi {
  /**
   * 获取订单客服Id
   */
  static orderContact(id): Promise<AxiosResponse<any>> {
    return axios.get(`/api/users/cusService/getOrderServiceId/get/${id}`)
  }
  /**
   * 获取咨询客服Id
   */
  static consultContact(): Promise<AxiosResponse<any>> {
    return axios.get(`/api/users/cusService/getConsultServiceId/get`)
  }
  /**
   * 获取专属客服Id
   */
  static exclusiveContact(): Promise<AxiosResponse<any>> {
    return axios.get(`/api/users/cusService/getExclusiveServiceId/get`)
  }
}

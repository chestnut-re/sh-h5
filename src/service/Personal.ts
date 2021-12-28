import axios from '@/request'
import { AxiosResponse } from 'axios'

/**
 * 文件接口
 */
export class Personal {
  /**
   * 出行人列表
   */
  static list(): Promise<AxiosResponse<any>> {
    return axios.get(`/api/users/customer/traveler/list`)
  }

  /**
   * 新增出行人
   */
  static add(params): Promise<AxiosResponse<any>> {
    return axios.post('/api/users/customer/travelerInfo/add', params)
  }

  /**
   * 出行人详情
   * @param id 出行人id
   */
  static info(id): Promise<AxiosResponse<any>> {
    return axios.get(`/api/users/customer/travelerInfo/get/${id}`)
  }

  /**
   * 修改出行人
   */
  static edit(data): Promise<any> {
    return axios.put(`/api/users/customer/travelerInfo/update`, data)
  }

  /**
   * 删除出行人
   */

  static delete(id): Promise<any> {
    return axios.delete(`/users/customer/travelerInfo/delete/${id}`)
  }
}
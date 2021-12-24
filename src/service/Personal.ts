import axios from '@/request'
import { AxiosResponse } from 'axios'

/**
 * 文件接口
 */
export class Personal {
  /**
   * 新增出行人
   */
  static addTravelerInfo(params): Promise<AxiosResponse<any>> {
    return axios.post('/api/users/customer/travelerInfo/add', params)
  }
}

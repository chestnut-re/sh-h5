import axios from '@/request'
import { AxiosResponse } from 'axios'

/**
 * 专题活动接口
 */
export class SpecialEventsApi {

  /**
   * 查询活动详情
   */
  static detail(params): Promise<AxiosResponse<any>> {
    return axios.get(`/api/operation/activity/info`,{params})
  }
  
}

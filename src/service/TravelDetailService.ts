import axios from '@/request'
import { AxiosResponse } from 'axios'

/**
 * 查询参考行程
 */
export class TravelDetailService {
  /**
   * 查询参考行程
   */
  static get(params): Promise<AxiosResponse<any>> {
    return axios.get('/api/operation/travel/refer', {
      params,
    })
  }
}

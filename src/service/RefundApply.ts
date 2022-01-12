import axios from '@/request'
import { AxiosResponse } from 'axios'

/**
 * 申请售后接口
 */
export class RefundApi {
  /**
   * 提交退款申请
   */
  static submit(data): Promise<AxiosResponse<any>> {
    return axios.post('/api/refund', data)
  }
  
  
}

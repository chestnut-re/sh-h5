import axios from '@/request'
import { AxiosResponse } from 'axios'

/**
 * 查询我的代币
 */
export class MyTokenService {
  /**
   * 查询参考行程
   */
  static getMyWallet(): Promise<AxiosResponse<any>> {
    return axios.get('/api/wallet/c/myWallet')
  }
}

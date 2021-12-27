import axios from '@/request'
import { AxiosResponse } from 'axios'

/**
 * 查询我的代币
 */
export class MyTokenService {
  /**
   * 查询账户总额（可提现金额+冻结金额）
   */
  static getMyWallet(): Promise<AxiosResponse<any>> {
    return axios.get('/api/wallet/c/myWallet')
  }

  /**
   * 最大提现金额
   */
  static getCashPage(): Promise<AxiosResponse<any>> {
    return axios.get('/api/wallet/c/cashPageInfo')
  }

  /**
   * 申请提现
   */
  static askForWithDraw(param): Promise<AxiosResponse<any>> {
    return axios.post('/api/wallet/c/cash')
  }

  /**
   * 账单列表
   */
  static getWalletPage(): Promise<AxiosResponse<any>> {
    return axios.get('/api/wallet/c/page')
  }
}

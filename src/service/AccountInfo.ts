import axios from '@/request'

/**
 * 账户资金接口
 */
export class AccountInfoApi {
  /**
   * 账户总账详情
   */
  static accountInfo(): any {
    return axios.get('api/wallet/b/accountInfo')
  }
  /**
   * 账单列表
   */
  static accountList(params: Record<string, any>): any {
    return axios.get('api/wallet/b/page', {
      params,
    })
  }
  // data: Record<string, any>
}

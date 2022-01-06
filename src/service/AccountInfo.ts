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
  /**
   * 提现
   */
  static cash(data: Record<string, any>): any {
    return axios.post('api/wallet/b/cash', data)
  }
  /**
   * 运营资金转入
   */
  static fundsIn(data: Record<string, any>): any {
    return axios.post('api/wallet/b/funds/in', data)
  }

  /**
   * 运营资金转出
   */
  static fundsOut(data: Record<string, any>): any {
    return axios.post('api/wallet/b/funds/out', data)
  }

  // data: Record<string, any>
}

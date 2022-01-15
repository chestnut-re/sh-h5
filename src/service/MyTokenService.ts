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
  static askForWithDraw(data): Promise<AxiosResponse<any>> {
    return axios.post('/api/wallet/c/cash', data)
  }

  /**
   * 账单列表
   */
  static getWalletPage(): Promise<AxiosResponse<any>> {
    return axios.get('/api/wallet/c/page')
  }

  /**
   * 我的任务
   */
   static rebateTask(): Promise<AxiosResponse<any>> {
    return axios.get('/api/market/rebate/rebateTask')
  }
/**
   * 我的任务-获取分享数据
   */
 static shareParam(params): Promise<AxiosResponse<any>> {
  return axios.get('/api/market/rebate/getShareParam',{params})
}
  /**
   * 我的任务-分享解锁乐豆
   */
 static unLockBean(data): Promise<AxiosResponse<any>> {
  return axios.post('/api/market/rebate/unLockBean',data)
}
}

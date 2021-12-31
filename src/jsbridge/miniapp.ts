import { ActionType, JumpParams, UiType } from './types'
import _callMethod from './bridge'

/**
 * 和 小程序 交互
 */
export class MiniAppBridge {
  /**
   * 小程序支付
   */
  static minipay(data: string, amount: number, orderId: string): void {
    window['wx'].miniProgram.navigateTo({
      url: `/pages/pay/index?data=${encodeURIComponent(data)}&amount=${amount}&orderId=${orderId}`,
    })
  }
}

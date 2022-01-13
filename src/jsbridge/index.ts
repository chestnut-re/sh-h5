import { getCookie } from './../utils/cookie'
import { MiniAppBridge } from './miniapp'
import { isMini } from '@/jsbridge/env'
import { AppBridge } from './app'
import { Toast } from 'react-vant'
import { isApp } from './env'
import { getUrlParams } from './utils'
import { JumpParams } from './types'

/**
 * h5 和 MiniApp/App 交互js
 */
export class SHBridge {
  /**
   * 初始化
   */
  static init(): void {}

  /**
   * 是否已经登录
   */
  static isLogin(): boolean {
    return !!SHBridge.getToken()
  }

  /**
   * 获取 token
   * 优先级：
   * 1. url 参数 t
   * 2. cookie 参数 t
   */
  static getToken(): string | undefined {
    const params = getUrlParams(window.location.href)
    if (params['t']) {
      return params['t']
    }
    if (getCookie('t')) {
      return getCookie('t')
    }
    return undefined
  }

  /**
   * 显示 Toast 提示
   * @param msg 内容
   */
  static showToast(msg: string): void {
    if (isApp()) {
      AppBridge.showToast(msg)
    } else {
      Toast(msg)
    }
  }

  /**
   * 设置标题
   * @param title 标题
   */
  static setTitle(title: string): void {
    if (isApp()) {
      AppBridge.setTitle(title)
    }
  }

  /**
   * 设置标题颜色
   * @param color 颜色
   */
  static setTitleColor(color: string): void {
    if (isApp()) {
      AppBridge.setTitleColor(color)
    }
  }

  /**
   * 设置导航栏颜色
   * @param color 颜色
   */
  static setNavBgColor(color: string): void {
    if (isApp()) {
      AppBridge.setNavBgColor(color)
    }
  }

  /**
   * 设置标题
   * @param title 标题
   */
  static setTitleAction(title: Array<Record<string, string>>, backFn: (index: number) => void): void {
    if (isApp()) {
      AppBridge.setTitleAction(title, backFn)
    }
  }

  /**
   * 跳转
   * @param url https:// | http// | 其他
   * @newWebView 是否开启新页面，在 App 中有效
   * @replace 是否替换当前页面
   */
  static jump({ url, title, newWebView = false, replace = false, needLogin = false }: JumpParams): void {
    if (newWebView) {
      if (isApp()) {
        AppBridge.jump({ url, title, newWebView, replace, needLogin })
        return
      }
    }
    if (url.startsWith('https') || url.startsWith('http')) {
      if (replace) {
        window.location.replace(url)
      } else {
        window.location.href = url
      }
    }
  }

  /**
   * 去登录
   */
  static login(): void {
    if (isApp()) {
      AppBridge.login()
    }
  }

  /**
   * 关闭 WebView
   */
  static closePage(): void {
    if (isApp()) {
      AppBridge.closePage()
    }
  }

  /**
   * 设置WebView全屏
   *  1全屏 0非全屏
   */
  static setFullScreen(type: string): void {
    if (isApp()) {
      AppBridge.setFullScreen(type)
    }
  }

  /**
   * 获取app信息
   * 1全屏 0
   */
  static getAppInfo(backFn: (info: Record<string, any>) => void): void {
    if (isApp()) {
      AppBridge.getAppInfo(backFn)
    }
  }

  /**
   * 支付宝支付
   */
  static alipay(authStr: string, backFn: (dataStr: string) => void): void {
    if (isApp()) {
      AppBridge.alipay(authStr, backFn)
    }
  }

  /**
   * 微信支付
   */
  static wxpay(auth: any, backFn: (index: any) => void): void {
    if (isApp()) {
      AppBridge.wxpay(auth, backFn)
    }
  }

  /**
   * 小程序支付
   */
  static minipay(data: string, amount: number, orderId: string): void {
    isMini().then((res) => {
      if (res) {
        MiniAppBridge.minipay(data, amount, orderId)
      }
    })
  }

  /**
   * 商品分享
   */
  static shareDetail(authStr: string): void {
    if (isApp()) {
      AppBridge.shareDetail(authStr)
    }
  }
  /**
   * 商品分享（测试）
   */
  static shareTest(authStr: string): void {
    if (isApp()) {
      AppBridge.shareTest(authStr)
    }
  }

  /**
   * 选择照片或者拍照
   */
  static getImage(backFn: (dataStr: Record<string, any>) => void): void {
    if (isApp()) {
      AppBridge.getImage(backFn)
    }
  }
}

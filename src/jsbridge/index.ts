import { AppBridge } from './app'
/**
 * h5 和 MiniApp/App 交互js
 */

import { Toast } from 'react-vant'
import { isApp } from './env'
import { getUrlParams } from './utils'
import { JumpParams } from './types'

export class SHBridge {
  /**
   * 获取 token
   */
  static getToken(): void {
    const params = getUrlParams(window.location.href)
    return params['t']
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
   * 跳转
   * @param url https:// | http// | 其他
   * @newWebView 是否开启新页面，在 App 中有效
   * @replace 是否替换当前页面
   */
  static jump({ url, title, newWebView = false, replace = false }: JumpParams): void {
    if (newWebView) {
      if (isApp()) {
        AppBridge.jump({ url, title, newWebView, replace })
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
   * 关闭 WebView
   */
  static closePage(): void {
    if (isApp()) {
      AppBridge.closePage()
    }
  }
}

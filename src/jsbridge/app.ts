import { ActionType, JumpParams, UiType } from './types'
import _callMethod from './bridge'

/**
 * 和 Flutter 交互
 */
export class AppBridge {
  /**
   * 显示 Toast 提示
   * @param msg 内容
   */
  static showToast(msg: string): void {
    const _msg = {
      method: 'showToast',
      data: {
        msg: msg,
      },
    }
    SHApp.postMessage(JSON.stringify(_msg))
  }

  /**
   * 设置标题
   * @param title 标题
   */
  static setTitle(title: string): void {
    const msg = {
      method: 'setTitle',
      data: {
        title: title,
      },
    }
    SHApp.postMessage(JSON.stringify(msg))
  }

  /**
   * 设置标题颜色
   * @param color 颜色
   */
  static setTitleColor(color: string): void {
    const msg = {
      method: 'setTitleColor',
      data: {
        color,
      },
    }
    SHApp.postMessage(JSON.stringify(msg))
  }

  /**
   * 设置导航栏颜色
   * @param color 颜色
   */
  static setNavBgColor(color: string): void {
    const msg = {
      method: 'setNavBgColor',
      data: {
        color,
      },
    }
    SHApp.postMessage(JSON.stringify(msg))
  }

  /**
   * 设置标题Action
   * @param title 标题
   */
  static setTitleAction(
    title: Array<Record<string, string>>,
    backFn: (index: number) => void,
    uiType = UiType.default
  ): void {
    const msg = {
      method: 'setTitleAction',
      data: {
        title: title,
        uiType: uiType,
        backFn: _callMethod(backFn),
      },
    }
    SHApp.postMessage(JSON.stringify(msg))
  }

  /**
   * 跳转
   * @param url https:// | http// | 其他
   * @newWebView 是否开启新页面，在 App 中有效
   * @replace 是否替换当前页面
   */
  static jump({ url, title, newWebView = false, replace = false }: JumpParams): void {
    const msg = {
      method: 'jump',
      data: {
        url: url,
        title: title,
        newWebView: newWebView,
        replace: replace,
      },
    }
    SHApp.postMessage(JSON.stringify(msg))
  }

  /**
   * 关闭页面
   */
  static closePage(): void {
    const msg = {
      method: 'closePage',
      data: {},
    }
    SHApp.postMessage(JSON.stringify(msg))
  }

  /**
   * 开启全屏
   */
  static setFullScreen(): void {
    const msg = {
      method: 'setFullScreen',
      data: {},
    }
    SHApp.postMessage(JSON.stringify(msg))
  }
}

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
   * 关闭页面
   */
  static closePage(): void {
    const msg = {
      method: 'closePage',
      data: {},
    }
    SHApp.postMessage(JSON.stringify(msg))
  }
}

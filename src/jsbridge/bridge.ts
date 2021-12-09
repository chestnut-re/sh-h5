/**
 *
 * @param config function
 *
 */
export default function _callMethod(config: (args: any) => void, isOnce = false): string {
  const callbackName = `__native_callback_${Date.now()}`
  // 注册全局回调函数
  if (typeof config === 'function') {
    const callback = config.bind(config)
    window[callbackName] = function (args) {
      callback(args)
      if (isOnce) {
        delete window[callbackName]
      }
    }
    return callbackName
  } else {
    throw '参数不是函数'
  }
}

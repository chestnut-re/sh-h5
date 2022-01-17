/**
 * 当前环境检查
 */

// import wx from 'weixin-js-sdk'

/**
 * 是否是 App 环境
 */
export const isApp = (): boolean => {
  return !!window['SHApp']
}

/**
 * 是否是 小程序 环境
 */
export const isMini = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    window['wx'].miniProgram.getEnv((res) => {
      resolve(!!res.miniprogram)
    })
  })
}

/**
 * 是否是微信环境非小程序
 */
export const isWeChat = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (/MicroMessenger/i.test(window.navigator.userAgent)) {
      window['wx'].miniProgram.getEnv((res) => {
        resolve(!res.miniprogram)
      })
    } else {
      return resolve(false)
    }
  })
}

/**
 * Android 环境
 */
export const isAndroid = (): boolean => {
  const u = navigator.userAgent
  return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
}

/**
 * iOS 环境
 */
export const isIOS = (): boolean => {
  const u = navigator.userAgent
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
}

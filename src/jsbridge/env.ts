/**
 * 当前环境检查
 */

import wx from 'weixin-js-sdk'

/**
 * 是否是 App 环境
 */
export const isApp = (): boolean => {
  return !!window['SHApp']
}

/**
 * 是否是 小程序 环境
 */
export const isMini = async (): Promise<boolean> => {
  const res = await wx.miniProgram.getEnv()
  return !!res.miniprogram
}

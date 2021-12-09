/**
 * 当前环境检查
 */

/**
 * 是否是 App 环境
 */
export const isApp = (): boolean => {
  return !!window['SHApp']
}

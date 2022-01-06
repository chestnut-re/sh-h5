import path from 'path'
import qs from 'query-string'
/**
 * 解析 url 参数，返回对象
 * @param url url
 * @returns object
 */
export function getUrlParams(url: string): any {
  const parameters = {}

  url.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m: string, key: any, value: any) => {
    parameters[key] = value
    return value
  })

  return parameters
}

/**
 * 拼接url
 */
export const generateUrl = (path: string): string => {
  const allParams = getUrlParams(window.location.href)
  const newParams = getUrlParams(path)
  return `${window.location.origin}${path.split('?')[0]}?${qs.stringify({ ...allParams, ...newParams })}`
}

/**
 * 验证字符串是否为空
 */

export const isStrNull = (str: string): boolean => {
  if (str == '') return true
  if (str == null) return true
  const regu = '^[ ]+$'
  const re = new RegExp(regu)
  return re.test(str)
}

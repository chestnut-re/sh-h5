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

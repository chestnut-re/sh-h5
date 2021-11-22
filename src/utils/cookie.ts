import Cookies from 'js-cookie'

/**
 * 获取 cookie
 * @param name key
 * @returns value
 */
export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name)
}

/**
 * 打印 cookie
 */
export const printCookie = (): void => {
  console.log(document.cookie)
}

/**
 * 清理所有 cookie
 */
export const clearAllCookie = (): void => {
  const keys = document.cookie.match(/[^ =;]+(?=\=)/g)
  if (keys) {
    for (let i = keys.length; i--; ) document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
  }
}

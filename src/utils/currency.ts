// 货币计数法的方法
const priceSplitter = (number: number) => number && number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

/**
 * 金额相除1000保留2位小数
 */
export function RMB_CON(num: number) {
  if (!num) {
    return 0
  }
  // 小数点后三位千分比
  const number = Math.floor(num) / 1000
  // 转为货币计数法
  return priceSplitter(number)
}

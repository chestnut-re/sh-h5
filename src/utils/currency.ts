// 货币计数法的方法
const priceSplitter = (number: number) => number && number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

/**
 * 金额相除1000保留2位小数
 */
export function RMB_CON(num: number) {
  if (!num) {
    return 0
  }
  if (typeof num != 'number') {
    return 0
  }
  // 小数点后三位千分比
  const numbers = Math.floor(num) / 1000

  // const interception = numbers.toString().split(".")
  // const decimal = Number(interception[1]);
  // if (!decimal) {
  //     return interception[0]
  // }

  // 转为货币计数法
  return priceSplitter(numbers)
}

/**
 *
 * @param price number | string
 * @param toFixed number
 * @returns number
 * 格式化价格方法
 */
function getPrice(price: number | string, toFixed = 0): string {
  if (price == '' || price == null) {
    return '0.00'
  }
  return (Number(price) / 1000).toFixed(toFixed)
}

export { getPrice }

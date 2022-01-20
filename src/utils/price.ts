function getPrice(price: number | string, toFixed = 0): number {
  if (price == '' || price == null) {
    return 0
  }
  return Number((Number(price) / 1000).toFixed(toFixed))
}

export { getPrice }

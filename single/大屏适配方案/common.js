export const toFixed = (num, decimal) => {
  // Math.pow(10, decimal)
  const multiple = 10 ** decimal
  return Math.round(num * multiple) / multiple
}

export const getType = obj => {
  return Object.prototype.toString
    .call(obj)
    .replace(/^\[object (\S+)\]$/, '$1')
    .toLowerCase()
}

export const delay = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms)
  })

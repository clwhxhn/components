export const toFixed = (num, decimal) => {
  // Math.pow(10, decimal)
  const multiple = 10 ** decimal
  return Math.round(num * multiple) / multiple
}

export function handleNumDecimal(val, decimalLength) {
  if (/~/.test(val)) return val
  if (val === 0 || !!val) {
    return Number(val).toFixed(decimalLength)
  }
  return ''
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

export function hexToRgb(hexStr) {
  // 确保输入是有效的十六进制颜色代码
  const hex = hexStr.replace('#', '')
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color code')
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  // 返回一个RGB对象
  return { r, g, b }
}

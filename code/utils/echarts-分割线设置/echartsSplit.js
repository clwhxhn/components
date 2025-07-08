/**
 * 取整
 * @param value 输入值
 * @param scale 保留位数 正数是整数位，负数是小数位
 * @param isUpper true 向上取整  false向下取整
 * @returns
 */
const numberFix = (value, scale, isUpper) => {
  const moreThanZero = value >= 0
  value = Math.abs(value)
  if (scale == 0) {
    return value
  }
  if (scale > 0) {
    scale -= 1
  }
  let result
  if (moreThanZero) {
    result =
      numberFloorOrCeil(value / Math.pow(10, scale), isUpper) *
      Math.pow(10, scale)
  } else {
    result =
      -1 *
      numberFloorOrCeil(value / Math.pow(10, scale), !isUpper) *
      Math.pow(10, scale)
  }
  if (scale < 0) {
    result =
      numberFloorOrCeil(result * Math.pow(10, -1 * scale), isUpper) /
      Math.pow(10, -1 * scale)
  }
  return result
}

const numberFloorOrCeil = (value, isUpper) => {
  if (isUpper) {
    return Math.ceil(value)
  } else {
    return Math.floor(value)
  }
}

/**
 * 得到数字的尺寸
 * 0=>1
 * 5=>1
 * 10=>2
 * 123=>3
 * 0.5=>-1
 * 0.003=>-3
 * @param value
 * @returns {number}
 */
const getNumberMaxScale = value => {
  const moreThanZero = value >= 0
  let absValue = Math.abs(value)
  if (absValue >= 1) {
    const valueStr = absValue + ''
    return valueStr.split('.')[0].length
  } else if (absValue > 0) {
    let scale = 0
    while (absValue < 1) {
      absValue *= 10
      scale -= 1
    }
    return scale
  } else {
    // 为0
    return 1
  }
}

/**
 *
 * @param valueArr 对象数组
 * @param splitNum 分割线数量
 * @param fromZero 是否从0开始
 * @param splitSmallerScale 分割数取整减少位数
 * @param splitMinScale 1是个位 2是10位，-1表示0.1级别，-2表示0.01级别，-3表示0.001级别; null就是不启用这个功能
 * @returns {{min: number, max: number, interval: number}}
 */
const echartsSplit = (
  valueArr,
  splitNum = 5,
  fromZero = true,
  splitSmallerScale = 0,
  splitMinScale = null
) => {
  valueArr = [...valueArr]
  if (fromZero) {
    valueArr.push(0)
  }
  let maxValue = Math.max(...valueArr)
  let minValue = Math.min(...valueArr)

  const maxMoreThanZero = maxValue >= 0
  const minMoreThanZero = minValue >= 0
  let totalDiff = maxValue - minValue
  let totalDiffScale = getNumberMaxScale(totalDiff / splitNum)
  let splitScale = totalDiffScale - splitSmallerScale
  if (splitMinScale != null && splitScale < splitMinScale) {
    splitScale = splitMinScale
  }
  splitScale = splitScale == 0 ? -1 : splitScale
  let minResult = numberFix(minValue, splitScale, false)
  let splitValue = (maxValue - minResult) / splitNum
  let splitResult = numberFix(splitValue, splitScale, true)
  // 如果所有数据值都一样的特殊情况处理
  if (splitResult == 0) {
    // 如果所有数据都一样且都为0，则最小值为0
    minResult = minResult == 0 ? 0 : minResult - 1
    splitResult = 1
  }
  let maxResult = minResult + splitResult * splitNum

  return {
    min: Math.round(minResult * 100000000) / 100000000,
    max: Math.round(maxResult * 100000000) / 100000000,
    interval: Math.round(splitResult * 100000000) / 100000000
  }
}
export default echartsSplit

/**
 * @name: handleCutZero
 * @description:  去掉double类型小数点后面多余的0
 参数：old 要处理的字符串或double
 返回值：newStr 没有多余零的小数或字符串
 * @param {*} num
 * @return {*}num
 */

 export function handleCutZero(num) {
    // 拷贝一份 返回去掉零的新串
    let newstr = num
    // 循环变量 小数部分长度
    let leng = num.length - num.indexOf('.') - 1
    // 判断是否有效数
    if (num.indexOf('.') > -1) {
      // 循环小数部分
      for (let i = leng; i > 0; i--) {
        // 如果newstr末尾有0
        if (
          newstr.lastIndexOf('0') > -1 &&
          newstr.substr(newstr.length - 1, 1) == 0
        ) {
          let k = newstr.lastIndexOf('0')
          // 如果小数点后只有一个0 去掉小数点
          if (newstr.charAt(k - 1) == '.') {
            return newstr.substring(0, k - 1)
          }
          // 否则 去掉一个0
          newstr = newstr.substring(0, k)
        } else {
          // 如果末尾没有0
          return newstr
        }
      }
    }
    return num
  }
  
  /**
   * @name: resetArr
   * @description: 循环object对象，让里面的数组为[]
   * @param {*} object
   * @return {*}object
   */
  export function resetArr(object) {
    for (let key in object) {
      object[key] = []
    }
    return object
  }
  
  /**
   * @name: handleObjectValues
   * @description: 处理对象里面为空的值为--
   * @param {*} object
   * @return {*}object
   */
  export function handleObjectValues(object) {
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        const item = object[key]
        if (!item && item != 0) {
          object[key] = '--'
        }
      }
    }
    return object
  }
  
  /**
   * @name: checkEmptyAnd0
   * @description: 判断值为空并且不为数字0
   * @param {*} Number
   * @return {*}Number
   */
  export function checkEmptyAnd0(num) {
    const result = num !== null && num !== undefined && num !== '' ? num : '--'
    return result
  }
  
  /**
   * @name: checkEmptyAnd0
   * @description: 判断值为空并且不为数字0,返回null
   * @param {*} Number
   * @return {*}Number
   */
  export function checkEmptyAndZero(num) {
    if (!num && num != 0) {
      num = null
    }
    return num
  }
  
  /**
   * @name: arrayObjectFields
   * @description: 遍历数组和字段找到key相同，并将对象的值赋值给数组value
   * @param { Array } arr 数组
   * @param { Object } object 对象
   * @return {Array}
   */
  export function arrayObjectFields(arr, object) {
    for (const item of arr) {
      for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
          const e = object[key]
          if (item.key == key) {
            item.value = e
          }
        }
      }
    }
    return arr
  }
  
  /**
   * @name: getText
   * @description: 列表为空时显示的--
   * @return {String}
   */
  export function getText(key, item) {
    if (!item[key] && item[key] != 0) {
      return '--'
    }
    return item[key]
  }
  
  /**
   * @name: handleModel
   * @description: 处理model模型数据
   * @return {String}
   */
  export function handleModel(text) {
    // 将字符串中的1,2,3替换成为API,新安江,马斯京根,逗号替换成、
    if (!text) {
      return '--'
    }
    let str = text.replace(/1/g, 'API')
    str = str.replace(/2/g, '新安江')
    str = str.replace(/3/g, '马斯京根')
    str = str.replace(/,/g, '、')
    return str
  }
  
  /**
   * @name:columnsCustomRender
   * @description: 将数组里面含有dataIndex,并且el.dataIndex !== 'action，都添加一个函数属性，
   customRender: (text, res) => {
    return getText('name', res)
    }
   * @param {*} Array
   * @return {*} Array
   */
  export function columnsCustomRender(arr) {
    arr.forEach(el => {
      if (el.children) {
        columnsCustomRender(el.children)
      } else if (el.dataIndex && el.dataIndex !== 'action') {
        el.customRender = (text, res) => {
          return getText(el.dataIndex, res)
        }
      }
    })
    return arr
  }
  
  /**
   * 递归处理保留小数位数,最终改为字符串
   */
  export function objToFixed(obj, decimalLength) {
    if (typeof obj === 'object') {
      for (let key in obj) {
        if (typeof obj[key] === 'number') {
          obj[key] = obj[key].toFixed(decimalLength)
        }
        if (typeof obj[key] === 'object') {
          objToFixed(obj[key], decimalLength)
        }
      }
    }
  }
  
  /**
   * 递归处理保留小数位数
   */
  export function objToDecimalRound(obj, decimalLength) {
    if (typeof obj === 'object') {
      for (let key in obj) {
        if (typeof obj[key] === 'number') {
          obj[key] = parseFloat(obj[key].toFixed(decimalLength))
        }
        if (typeof obj[key] === 'object') {
          objToDecimalRound(obj[key], decimalLength)
        }
      }
    }
  }
  
  export function handleNumDecimal(val, decimalLength) {
    if (val == 0 || !!val) {
      return typeof val === 'string' ? '' : Number(val).toFixed(decimalLength)
    }
    return ''
  }
  
  // 循环数组，表格列title含有key,显示为decimalLength位小数
  export function handleTableDecimalPlace(data, key, decimalLength) {
    if (data.length > 0) {
      data.forEach(item => {
        if (item.title.indexOf(key) != -1) {
          item.customRender = (t, r, i) => {
            return handleNumDecimal(t, decimalLength)
          }
        }
      })
    }
    return data
  }
  
  // 判断数组是否是递增的
  export function isArrayIncrease(arr) {
    let increaseFlag = true
    if (arr.length > 1) {
      for (let i = 1; i < arr.length; i++) {
        if (Number(arr[i]) < Number(arr[i - 1])) {
          increaseFlag = false
        }
      }
    }
    return increaseFlag
  }
  
  // 根据geojson获取中心点
  export function getPolygonCenterByArray(list) {
    let maxX
    let maxY
    let minX
    let minY
    for (let point of list[0]) {
      let x = point[1] //latitude
      let y = point[0] //longitude
      maxX = !maxX ? x : x > maxX ? x : maxX
      minX = !minX ? x : x < minX ? x : minX
      maxY = !maxY ? y : y > maxY ? y : maxY
      minY = !minY ? y : y < minY ? y : minY
    }
    return {
      lat: (maxX + minX) / 2,
      long: (maxY + minY) / 2
    }
  }
  
  /**
   * 判断是否为数字
   */
  export function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value)
  }
  
  export function getTextOrNum(key, item, decimal) {
    if (!item[key] && item[key] != 0) {
      return '--'
    } else {
      if (isNumeric(item[key])) {
        return Number(item[key].toFixed(decimal))
      } else {
        return item[key]
      }
    }
  }
  
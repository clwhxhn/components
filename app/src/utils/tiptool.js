/**
 * 两数相除
 * @param arg1
 * @param arg2
 * @returns arg1 / arg2
 */
export function division(arg1, arg2) {
  let t1 = 0
  let t2 = 0
  const s1 = Number(arg1.toString().replace('.', ''))
  const s2 = Number(arg2.toString().replace('.', ''))
  try {
    t1 = arg1.toString().split('.')[1].length
  } catch (e) {
    //
  }
  try {
    t2 = arg2.toString().split('.')[1].length
  } catch (e) {
    //
  }
  if (s2 === 0) {
    return Infinity
    // eslint-disable-next-line no-else-return
  } else {
    return (s1 / s2) * 10 ** (t2 - t1)
  }
}

/**
 * 两数相乘
 * @param arg1
 * @param arg2
 * @returns arg1 * arg2
 */
export function multiply(arg1, arg2) {
  let m = 0
  const s1 = arg1.toString()
  const s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {
    //
  }
  try {
    m += s2.split('.')[1].length
  } catch (e) {
    //
  }
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / 10 ** m
}

/**
 * 两数相减
 * @param arg1
 * @param arg2
 * @returns arg1 - arg2
 */
export function subtraction(arg1, arg2) {
  let r1 = 0
  let r2 = 0
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    //
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    //
  }

  const m = 10 ** Math.max(r1, r2)
  // last modify by deeka
  // 动态控制精度长度
  const n = r1 >= r2 ? r1 : r2
  return ((Number(arg1) * m - Number(arg2) * m) / m).toFixed(n)
}

/**
 * 两数相加
 * @param arg1
 * @param arg2
 * @returns arg1 + arg2
 */
export function addition(arg1, arg2) {
  let r1 = 0
  let r2 = 0
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    //
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    //
  }

  const m = 10 ** Math.max(r1, r2)
  return (Number(arg1) * m + Number(arg2) * m) / m
}

/**
 * 格式化数值类型数据
 * @param {*} value  数值
 * @param {*} emptyFormat 未null  undefined 的时候返回格式：默认--
 */
export function fmtValue(value, emptyFormat = '--') {
  if (typeof value === 'number' || typeof value === 'string') {
    return value
  }
  return emptyFormat
}

/**
 * 判断字段是否是数值或者字符串数字
 * @param {*} value
 * @returns
 */
export function isNumberType(value) {
  if (typeof value === 'string' && /^\d+(\.\d+)?$/.test(value)) {
    return true
  }
  return typeof value === 'number'
}

/**
 *  tree转数组
 * @param {*} tree
 * @returns
 */
export function treeToArray(tree) {
  // 判断 tree 是否有值，无返回 []
  if (!Array.isArray(tree) || !tree.length) return []
  let res = []
  tree.forEach(v => {
    // tree的每个元素都 放入到 res里面
    res.push(v)
    if (v.children) {
      // 有children 就把 children数据递归 返回  依次放到 res里面
      res.push(...treeToArray(v.children))
    }
  })
  res.forEach(item => {
    item.children = null
  })
  return res
}

/**
 * 数组转树结构
 * @param {*} data
 * @param {*} idField
 * @param {*} pidField
 * @returns
 */
export function arrayToTree(data, idField = 'key', pidField = 'parentId') {
  let result = []
  let map = {}
  if (!Array.isArray(data)) {
    // 验证data是不是数组类型
    return []
  }
  data.forEach(item => {
    // 建立每个数组元素id和该对象的关系
    map[item[idField]] = item // 这里可以理解为浅拷贝，共享引用
  })
  data.forEach(item => {
    let parent = map[item[pidField]] // 找到data中每一项item的爸爸
    if (parent) {
      // 说明元素有爸爸，把元素放在爸爸的children下面
      ;(parent.children || (parent.children = [])).push(item)
    } else {
      // 说明元素没有爸爸，是根节点，把节点push到最终结果中
      result.push(item) // item是对象的引用
    }
  })
  return result // 数组里的对象和data是共享的
}

/**
 * echarts坐标轴文字超长换行
 * @param value 坐标轴值
 * @param  maxLength 坐标轴值每项显示文字个数
 */
// echarts坐标轴文字超长换行
export function formatWrap(value, maxLength) {
  let ret = '' // 拼接加\n返回的类目项
  const valLength = value.length // X轴类目项的文字个数
  const rowN = Math.ceil(valLength / maxLength) // 类目项需要换行的行数
  if (rowN > 1) {
    // 如果类目项的文字大于3,
    for (let i = 0; i < rowN; i++) {
      let temp = '' // 每次截取的字符串
      const start = i * maxLength // 开始截取的位置
      const end = start + maxLength // 结束截取的位置
      // 这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
      temp = value.substring(start, end) + '\n'
      ret += temp // 拼接字符串
    }
    return ret
  }
  return value
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
      el.customRender = text => {
        return fmtValue(text)
      }
    }
  })
  return arr
}

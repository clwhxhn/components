export const toFixed = (num, decimal) => {
    // Math.pow(10, decimal)
    const multiple = 10 ** decimal
    return Math.round(num * multiple) / multiple
}

/**
 * @name: findIntersection
 * @description: 通过四个点的坐标，找到两条线段的交点
 * @param a{ Array }
 * @param b{ Array }
 * @param c{ Array }
 * @param d{ Array }
 * @return false or 交点坐标
 */
export function findIntersection(a, b, c, d) {
    // 三角形abc 面积的2倍
    let areaAbc = (a[0] - c[0]) * (b[1] - c[1]) - (a[1] - c[1]) * (b[0] - c[0])

    // 三角形abd 面积的2倍
    let areaAbd = (a[0] - d[0]) * (b[1] - d[1]) - (a[1] - d[1]) * (b[0] - d[0])

    // 面积符号相同则两点在线段同侧,不相交
    if (areaAbc * areaAbd >= 0) {
        return false
    }

    // 三角形cda 面积的2倍
    let areaCda = (c[0] - a[0]) * (d[1] - a[1]) - (c[1] - a[1]) * (d[0] - a[0])
    // 三角形cdb 面积的2倍，通过已知的三个面积加减得出
    let areaCdb = areaCda + areaAbc - areaAbd
    if (areaCda * areaCdb >= 0) {
        return false
    }

    // 计算交点坐标
    let t = areaCda / (areaAbd - areaAbc)
    let dx = t * (b[0] - a[0])
    let dy = t * (b[1] - a[1])
    return [a[0] + dx, a[1] + dy]
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

export const getYaxisOpt = dataList => {
    let min = Math.floor(Math.min(...dataList))
    const max = Math.ceil(Math.max(...dataList))
    if (max === min) {
        min = 0
    }
    const interval = toFixed((max - min) / 5, 1)
    return {
        min,
        max,
        interval
    }
}

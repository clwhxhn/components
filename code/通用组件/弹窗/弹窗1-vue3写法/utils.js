export function pxToRem(val) {
    let num = val
    if (typeof val === 'string') {
        num = parseFloat(val.replace('px', ''))
    }
    return toFixed(num / 16, 2) + 'rem'
}
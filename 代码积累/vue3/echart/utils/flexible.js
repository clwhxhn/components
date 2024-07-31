import { getType, toFixed } from './common'

// 基准大小
const baseSize = 16
// 1920*1080
const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 1080

function setFontsize() {
  const widthScale = window.innerWidth / DESIGN_WIDTH // 当前窗口的宽度
  const heightScale = window.innerHeight / DESIGN_HEIGHT // 当前窗口的高度
  const scale = Math.min(widthScale, heightScale)
  document.documentElement.style.fontSize = `${baseSize * scale}px`
}

setFontsize()

window.addEventListener('resize', setFontsize, false)

export function scaleFontSize(size) {
  const widthScale = window.innerWidth / DESIGN_WIDTH // 当前窗口的宽度
  const heightScale = window.innerHeight / DESIGN_HEIGHT // 当前窗口的高度
  const scale = Math.min(widthScale, heightScale)
  //  返回大小
  return toFixed(scale * size, 2)
}

const resizeKeys = [
  'fontSize',
  'radius',
  'top',
  'right',
  'bottom',
  'left',
  'barWidth',
  'borderWidth',
  'width',
  'height',
  'itemWidth',
  'itemHeight',
  'length',
  'padding',
  'margin',
  'symbolSize',
  'x',
  'y',
  'itemGap'
]

export function updateChartSize(opt, kName) {
  const type = getType(opt)
  switch (type) {
    case 'string':
      return opt
    case 'boolean':
      return opt
    case 'number':
      if (resizeKeys.indexOf(kName) === -1) {
        return opt
      }
      return scaleFontSize(opt)
    case 'array':
      return opt.reduce((def, item) => {
        def.push(updateChartSize(item, kName))
        return def
      }, [])
    case 'object': {
      let obj = {}
      Object.keys(opt).forEach(key => {
        obj[key] = updateChartSize(opt[key], key)
      })
      return obj
    }
    default:
      return opt
  }
}

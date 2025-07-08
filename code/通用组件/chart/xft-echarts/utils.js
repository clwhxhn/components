const linearGradient = (
  colors,
  xy = {
    x: 0,
    y: 0,
    x2: 0,
    y2: 1
  }
) => {
  return {
    type: 'linear',
    ...xy,
    colorStops: colors
  }
}

const rectSvgIcon = 'path://M 0 0 L 0 1 L 1 1 L 1 0 Z'

export { linearGradient, rectSvgIcon }

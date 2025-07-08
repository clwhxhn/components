import { toFixed } from '@/utils'

const LEGEND = {
  waterQualityType: {
    1: [73, 219, 80],
    2: [10, 73, 255],
    3: [255, 228, 77],
    4: [255, 102, 22],
    5: [248, 34, 83],
    6: [168, 0, 240]
  },
  ph: {
    4: [253, 132, 43],
    5: [250, 166, 42],
    6: [248, 212, 47],
    6.6: [184, 244, 56],
    7: [148, 239, 47],
    7.6: [125, 242, 162],
    8.5: [2, 255, 255],
    9: [23, 157, 253],
    9.5: [44, 130, 245],
    10: [73, 105, 217]
  },
  temperature: {
    15: [3, 4, 201],
    17: [10, 158, 238],
    19: [159, 251, 119],
    21: [236, 251, 46],
    23: [248, 167, 16],
    25: [227, 6, 1]
  }
}

const VALUE_RANGE = {
  oxygen: {
    actual: [6, 12],
    analog: [2, 100]
  },
  conductivity: {
    actual: [200, 300],
    analog: [20, 100]
  },
  turb: {
    actual: [0, 35],
    analog: [0.5, 1]
  }
}

function findColor(colors, value) {
  let idx = 0
  let color
  const values = Object.keys(colors).sort((a, b) => a - b)
  while (value > values[idx] && idx < values.length) {
    idx += 1
  }
  if (idx === 0) {
    color = colors[0]
  } else {
    color = colors[values[idx - 1]]
  }
  if (color) {
    color = color.map(c => {
      return toFixed(c / 255, 6)
    })
    return {
      R: color[0],
      G: color[1],
      B: color[2],
      A: 1
    }
  }
  return {
    R: 0.018636,
    G: 0.661458,
    B: 0.028962,
    A: 1
  }
}

function getColor(key, value) {
  const colors = LEGEND[key]
  if (colors) {
    const color = findColor(colors, value)
    return color
  }
  return {
    R: 0.018636,
    G: 0.661458,
    B: 0.028962,
    A: 1
  }
}

function getAnalogValue(key, actualVal, actualRange?) {
  const { analog } = VALUE_RANGE[key]
  const actual = actualRange || VALUE_RANGE[key].actual
  let analogVal
  if (actualVal < actual[0]) {
    analogVal = analog[0]
  } else if (actualVal > actual[1]) {
    analogVal = analog[1]
  } else {
    const factor = (analog[1] - analog[0]) / (actual[1] - actual[0])
    analogVal = analog[0] + (actualVal - actual[0]) * factor
  }
  if (key === 'turb') {
    analogVal = toFixed(analogVal, 1)
  } else {
    analogVal = toFixed(analogVal, 0)
  }
  return analogVal
}

export function getTestTubeOpt(data) {
  const colorPH = getColor('ph', data.ph)
  const colorTemperature = getColor('temperature', data.shuiwen)
  const oxygen = getAnalogValue('oxygen', data.oxygen, data.oxygenRange)
  const electricConductivity = getAnalogValue(
    'conductivity',
    data.diandaolv,
    data.conductivityRange
  )
  const ntu = getAnalogValue('turb', data.zhuodu, data.turbRange)
  return {
    colorTemperature,
    colorPH,
    oxygen,
    electricConductivity,
    ntu,
    duration: 0.2,
    valueTemp: data.shuiwen,
    valuePH: data.ph,
    valueOxygen: data.oxygen,
    valueEC: data.diandaolv,
    valueNTU: data.zhuodu
  }
}

export function getActualRange(dataList, key) {
  const values = dataList.map(item => item[key])
  const min = Math.min(...values)
  const max = Math.max(...values)
  return [min, max]
}

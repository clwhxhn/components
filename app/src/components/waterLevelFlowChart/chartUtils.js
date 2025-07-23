import dayjs from 'dayjs'
import { merge, cloneDeep } from 'lodash'
import * as optionDark from './chartOptionsDark.js'
import * as optionLight from './chartOptionsLight.js'
import echartsSplit from '@/utils/echartsSplit2.js'

export const toFixed = (num, decimal) => {
  const multiple = 10 ** decimal
  return Math.round(num * multiple) / multiple
}

export function formatValue(val, decimalLength = 2) {
  if (val === undefined || val === null) {
    return '-'
  }
  if (Number.isNaN(Number(val))) {
    return '-'
  }
  return Number(val).toFixed(decimalLength)
}

export function formatTime(time, format = 'MM-DD HH') {
  if (!dayjs(time).isValid()) {
    // 无效日期
    return '-'
  }
  return dayjs(time).format(format)
}

// 雨量y轴刻度
export function getYaxisDrp(dataList) {
  // 刻度线数据取整
  // 坐标轴刻度数量为4个
  // 取值范围为0到雨量最大值向上取整
  // return getYaxisOpt(dataList.concat([0]), 4)
  return echartsSplit(
    dataList.filter(item => item !== '-'),
    4,
    true
  )
}

// 流量y轴刻度
export function getYaxisFlow(dataList) {
  // 刻度线数据取整
  // 坐标轴刻度数量为6个
  // 输入参数为0、监测/预报流量最大值
  // return getYaxisOpt(dataList.concat([0]), 6)
  return echartsSplit(
    dataList.filter(item => item !== '-'),
    6,
    true
  )
}

// 水位y轴刻度
export function getYaxisWL(dataList) {
  // 刻度线数据取整
  // 坐标轴刻度数量为6个
  // 输入参数为监测/预报水位最小值，三个特征水位值及监测/预报水位最大值
  // return getYaxisOpt(dataList, 6)
  return echartsSplit(
    dataList.filter(item => item !== '-'),
    6,
    false
  )
}

// 雨量(保留一位小数)
export function formatDrp(val) {
  return formatValue(val, 1)
}

// 水位(保留两位小数)
export function formatWL(val) {
  return formatValue(val, 2)
}

// 流量(保留三位有效数字且小数点不超过两位)
export function formatFlow(val) {
  if (val === undefined || val === null) {
    return '-'
  }
  if (Number.isNaN(Number(val))) {
    return '-'
  }

  // 转换为三位有效数字
  let str = parseFloat(val.toPrecision(3))

  // 确保小数点不超过两位
  str = `${str}`.replace(/(\.\d{2})\d*/, '$1')

  // 移除末尾无意义的.00
  str = str.replace(/\.0+$/, '').replace(/(\.\d)0$/, '$1')
  return str
}

export function chunkArr(arr, chunkSize) {
  const newArr = Array(Math.ceil(arr.length / chunkSize))
    .fill(1)
    .map((_, i) => {
      return arr.slice(i * chunkSize, (i + 1) * chunkSize)
    })
  return newArr
}

export function getAverage(numbers, decimalLength = 2) {
  if (!numbers.length) return '-'
  const sum = numbers.reduce((acc, num) => acc + Number(num), 0)
  return (sum / numbers.length).toFixed(decimalLength)
}

export function getMax(numbers) {
  if (!numbers.length) return '-'
  return Math.max(...numbers)
}

export function getMin(numbers) {
  if (!numbers.length) return '-'
  return Math.min(...numbers)
}

export function getSeriesUnit(seriesName) {
  if (seriesName.indexOf('雨量') >= 0) {
    return 'mm'
  }
  if (seriesName.indexOf('水位') >= 0) {
    return 'm'
  }
  if (seriesName.indexOf('流量') >= 0) {
    return 'm³/s'
  }
  return ''
}

export function getCharacterWL(dataObj, theme, characterWlList) {
  const { dataList, wlKey } = dataObj
  const wlList = dataList.map(item => formatWL(item[wlKey]))
  const wlYaxis = getYaxisWL(wlList)

  if (characterWlList.length) {
    return characterWlList.map(item => {
      return {
        ...item,
        selected: true,
        value: dataObj[item.key]
      }
    })
  }
  const { CHARACTERISTIC_WL } = theme === 'dark' ? optionDark : optionLight
  return CHARACTERISTIC_WL.reduce((def, item) => {
    if (dataObj[item.key] && dataObj[item.key] < wlYaxis.max) {
      def.push({
        ...item,
        selected: true,
        value: dataObj[item.key]
      })
    }
    return def
  }, [])
}

export function getSeriesMarker(list, seriesName, theme) {
  const { COLOR_DRP, COLOR_WL, COLOR_FLOW, COLOR_HIS_WL } =
    theme === 'dark' ? optionDark : optionLight
  if (seriesName.indexOf('雨量') >= 0) {
    if (seriesName.indexOf('预报') >= 0) {
      return `<span class="marker-rect" style="background-color: ${COLOR_DRP}; opacity: 0.4;"></span>`
    }
    return `<span class="marker-rect" style="background-color: ${COLOR_DRP};"></span>`
  }
  let markerColor
  if (seriesName.indexOf('历史同期水位') >= 0) {
    markerColor = COLOR_HIS_WL
  } else if (seriesName.indexOf('水位') >= 0) {
    markerColor = COLOR_WL
  } else if (seriesName.indexOf('流量') >= 0) {
    markerColor = COLOR_FLOW
  }
  const opt = list.find(item => seriesName.indexOf(item.name) >= 0)
  if (opt && opt.color) {
    markerColor = opt.color
  }
  if (seriesName.indexOf('预报') >= 0) {
    return `<span class="marker-line-dashed" style="border-color: ${markerColor};"></span>`
  }
  return `<span class="marker-line-solid" style="border-color: ${markerColor};"></span>`
}

// 根据预报时间判断是否有预报数据
let hasForecast = false
let forecastTime = ''
let segIdx = -1
let tmList = []
let gridIndex = 0
let xGridIndex = 0
let yGridIndex = 0
let xAxisOpt = []
let yAxisOpt = []
let seriesOpt = []
let legendData = []
function addSeriesFlow(dataList, theme, flowItem) {
  const { NAME_TEXT_STYLE, AXIS_LABEL, AXIS_TICK } =
    theme === 'dark' ? optionDark : optionLight
  // 流量
  const flowList = dataList.map(item => formatFlow(item[flowItem.key])).slice(0, segIdx)
  let forecastFlowList = []
  if (hasForecast) {
    forecastFlowList = dataList.map(item =>
      formatFlow(item[flowItem.forecastKey || flowItem.key])
    ).slice(segIdx)
  }
  if (yAxisOpt.findIndex(item => item.name === '流量(m³/s)') === -1) {
    yAxisOpt.push({
      ...getYaxisFlow(flowList.concat(forecastFlowList)),
      gridIndex,
      type: 'value',
      name: '流量(m³/s)',
      nameLocation: 'middle',
      nameGap: 32,
      nameTextStyle: {
        ...NAME_TEXT_STYLE
      },
      axisLabel: {
        ...AXIS_LABEL,
        showMaxLabel: true
      },
      splitLine: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: AXIS_TICK
    })
  }

  legendData.push(hasForecast ? `监测${flowItem.name}` : flowItem.name)
  seriesOpt.push({
    name: hasForecast ? `监测${flowItem.name}` : flowItem.name,
    type: 'line',
    xAxisIndex: xGridIndex,
    yAxisIndex: yGridIndex,
    smooth: true,
    showSymbol: false,
    itemStyle: {
      opacity: 0
    },
    lineStyle: {
      color: flowItem.color
    },
    data: flowList.map((item, idx) => [tmList[idx], item])
  })
  if (hasForecast) {
    legendData.push(`预报${flowItem.name}`)
    seriesOpt.push({
      name: `预报${flowItem.name}`,
      type: 'line',
      xAxisIndex: xGridIndex,
      yAxisIndex: yGridIndex,
      smooth: true,
      showSymbol: false,
      itemStyle: {
        opacity: 0
      },
      lineStyle: {
        color: flowItem.color,
        type: [3, 3]
      },
      data: forecastFlowList.map((item, idx) => [tmList[idx + segIdx], item])
    })
  }
}

// dataList: 数据序列
// wlKey: 水位字段名
// flowKey: 流量字段名
// drpKey: 雨量字段名
// hisSameTermWLKey: 历史同期水位字段名
// historicalPeakWL: 历史最高水位
// guaranteeWL: 保证水位
// warningWL: 警戒水位
// forecastTM: 预报时间
export function getSeriesDatas(dataObj, list, characterWlList, theme) {
  const {
    COLOR_DRP,
    COLOR_WL,
    COLOR_FLOW,
    COLOR_HIS_WL,
    GRID_ONE,
    GRID_TWO,
    NAME_TEXT_STYLE,
    AXIS_LABEL,
    AXIS_TICK,
    MARK_LINE,
    MARK_AREA,
    CHARACTERISTIC_WL
  } = theme === 'dark' ? optionDark : optionLight
  const {
    dataList,
    tmKey,
    wlKey,
    flowKey,
    drpKey,
    hisSameTermWLKey,
    forecastTM
  } = dataObj
  hasForecast = false
  forecastTime = ''
  segIdx = -1
  tmList = []
  gridIndex = 0
  xGridIndex = 0
  yGridIndex = 0
  xAxisOpt = []
  yAxisOpt = []
  seriesOpt = []
  legendData = []

  if (!tmKey || !wlKey) {
    return {}
  }

  tmList = dataList.map(item => formatTime(item[tmKey]))
  if (forecastTM) {
    forecastTime = formatTime(forecastTM)
    segIdx = tmList.indexOf(forecastTime) + 1 // 分割时间索引
    hasForecast = segIdx > 0
  }

  if (drpKey) {
    // 有雨量
    const drpList = dataList.map(item => formatDrp(item[drpKey]))
    xAxisOpt.push({
      gridIndex,
      type: 'category',
      boundaryGap: false,
      axisLabel: {
        show: false
      },
      axisLine: { onZero: true },
      axisTick: {
        show: false
      },
      position: 'top',
      data: tmList
    })
    yAxisOpt.push({
      ...getYaxisDrp(drpList),
      gridIndex,
      name: '雨量(mm)',
      nameLocation: 'middle',
      nameGap: 44,
      nameTextStyle: {
        ...NAME_TEXT_STYLE
      },
      type: 'value',
      boundaryGap: false,
      inverse: true,
      axisLabel: {
        ...AXIS_LABEL,
        showMaxLabel: false // 隐藏最大值标签
      },
      splitLine: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: AXIS_TICK
    })

    legendData.push(hasForecast ? '监测雨量' : '降雨量')
    seriesOpt.push({
      name: hasForecast ? '监测雨量' : '降雨量',
      type: 'bar',
      boundaryGap: true,
      xAxisIndex: xGridIndex,
      yAxisIndex: yGridIndex,
      itemStyle: {
        color: COLOR_DRP
      },
      data: drpList.slice(0, segIdx).map((item, idx) => [tmList[idx], item])
    })

    if (hasForecast) {
      xGridIndex += 1
      xAxisOpt.push({
        show: false,
        gridIndex: 0,
        type: 'category',
        boundaryGap: false,
        axisLabel: {
          show: false
        },
        axisLine: { onZero: true },
        axisTick: {
          show: false
        },
        position: 'top',
        data: tmList
      })

      legendData.push('预报雨量')
      seriesOpt.push({
        name: '预报雨量',
        type: 'bar',
        boundaryGap: true,
        xAxisIndex: xGridIndex,
        yAxisIndex: yGridIndex,
        itemStyle: {
          color: COLOR_DRP,
          opacity: 0.4
        },
        data: drpList.map((item, idx) => [tmList[idx], item]).slice(segIdx)
      })
      // 分割线
      seriesOpt.push({
        name: '',
        type: 'line',
        boundaryGap: true,
        xAxisIndex: xGridIndex,
        yAxisIndex: yGridIndex,
        markLine: merge(cloneDeep(MARK_LINE), {
          data: [
            {
              xAxis: forecastTime
            }
          ]
        }),
        markArea: {
          ...MARK_AREA,
          data: [
            [
              {
                xAxis: forecastTime
              },
              {
                xAxis: tmList[tmList.length - 1]
              }
            ]
          ]
        }
      })
    }

    gridIndex += 1
    xGridIndex += 1
    yGridIndex += 1
  }

  // 监测水位
  const wlCfg = list.find(item => item.type === 'wl')
  const wlName = wlCfg?.name || '水位'
  const wlList = dataList
    .map(item => formatWL(item[wlCfg?.key || wlKey]))
    .slice(0, segIdx)
  const chWlList = characterWlList.length ? characterWlList : CHARACTERISTIC_WL
  const minVal = Math.min(...chWlList.map(item => dataObj[item.key]))
  let forecastWlList = []
  if (hasForecast) {
    forecastWlList = dataList
      .map(item => formatWL(item[wlCfg?.forecastKey || wlKey]))
      .slice(segIdx)
  }
  const wlYaxis = getYaxisWL(
    wlList
      .filter(item => item !== '-')
      .concat(forecastWlList.filter(item => item !== '-'))
      .concat([minVal])
  )
  xAxisOpt.push({
    gridIndex,
    type: 'category',
    boundaryGap: false,
    position: 'bottom',
    axisLabel: AXIS_LABEL,
    axisLine: { onZero: true },
    axisTick: AXIS_TICK,
    splitLine: {
      show: false
    },
    data: tmList
  })

  yAxisOpt.push({
    ...wlYaxis,
    gridIndex,
    type: 'value',
    name: '水位(m)',
    nameLocation: 'middle',
    nameGap: 48,
    nameTextStyle: {
      ...NAME_TEXT_STYLE
    },
    axisLabel: {
      ...AXIS_LABEL,
      showMaxLabel: !drpKey, // 隐藏最大值标签
      formatter: function (value) {
        if (wlYaxis.interval < 1) {
          return value.toFixed(1)
        }
        return value
      }
    },
    splitLine: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisTick: AXIS_TICK
  })

  // 历史最高水位、保证水位、警戒水位三个特征水位根据y轴最大值控制显隐（超出y轴最大值的默认不显示）
  // 特征水位标记线
  chWlList.forEach(item => {
    if (dataObj[item.key] && dataObj[item.key] <= wlYaxis.max) {
      const name = `${item.name}：${formatWL(dataObj[item.key])}m`
      legendData.unshift({
        name,
        textStyle: {
          color: item.color
        }
      })
      // 以下是为 markLine 添加图例的虚拟系列
      seriesOpt.push({
        name,
        type: 'line',
        xAxisIndex: xGridIndex,
        yAxisIndex: yGridIndex,
        data: [],
        symbol: 'none',
        itemStyle: {
          opacity: 0
        },
        lineStyle: {
          color: item.color,
          type: [6, 4]
        },
        legendHoverLink: false,
        markLine: {
          symbol: ['none', 'none'],
          label: {
            show: false
          },
          lineStyle: {
            color: item.color,
            type: [6, 6]
          },
          data: [
            {
              yAxis: dataObj[item.key]
            }
          ]
        }
      })
    }
  })

  // 历史同期水位
  if (hisSameTermWLKey) {
    const hisWlList = dataList.map(item => formatWL(item[hisSameTermWLKey]))
    legendData.push('历史同期水位')
    seriesOpt.push({
      name: '历史同期水位',
      type: 'line',
      xAxisIndex: xGridIndex,
      yAxisIndex: yGridIndex,
      smooth: true,
      showSymbol: false,
      itemStyle: {
        opacity: 0
      },
      lineStyle: {
        color: COLOR_HIS_WL
      },
      data: hisWlList.map((item, idx) => [tmList[idx], item])
    })
  }

  legendData.push(hasForecast ? `监测${wlName}` : wlName)
  seriesOpt.push({
    name: hasForecast ? `监测${wlName}` : wlName,
    type: 'line',
    xAxisIndex: xGridIndex,
    yAxisIndex: yGridIndex,
    smooth: true,
    showSymbol: false,
    itemStyle: {
      opacity: 0
    },
    lineStyle: {
      color: COLOR_WL
    },
    data: wlList.map((item, idx) => [tmList[idx], item])
  })

  // 预报水位
  if (hasForecast) {
    legendData.push(`预报${wlName}`)
    seriesOpt.push({
      name: `预报${wlName}`,
      type: 'line',
      xAxisIndex: xGridIndex,
      yAxisIndex: yGridIndex,
      smooth: true,
      showSymbol: false,
      itemStyle: {
        opacity: 0
      },
      lineStyle: {
        color: COLOR_WL,
        type: [3, 3]
      },
      data: forecastWlList.map((item, idx) => [tmList[idx + segIdx], item])
    })

    seriesOpt.push({
      name: '',
      type: 'line',
      boundaryGap: true,
      xAxisIndex: xGridIndex,
      yAxisIndex: yGridIndex,
      markLine: merge(cloneDeep(MARK_LINE), {
        data: [
          {
            xAxis: forecastTime
          }
        ]
      }),
      markArea: {
        ...MARK_AREA,
        data: [
          [
            {
              xAxis: forecastTime
            },
            {
              xAxis: tmList[tmList.length - 1]
            }
          ]
        ]
      }
    })
  }
  yGridIndex += 1

  if (list && list.length) {
    list.forEach(item => {
      if (item.type === 'flow') {
        addSeriesFlow(dataList, theme, item)
      }
    })
  } else if (flowKey) {
    addSeriesFlow(dataList, theme, {
      name: '流量',
      key: flowKey,
      color: COLOR_FLOW,
      type: 'flow'
    })
  }

  return {
    grid: drpKey ? GRID_TWO : GRID_ONE,
    legend: {
      data: legendData
    },
    tooltip: {
      formatter: function (params) {
        const htmlStr = params
          .map(item => {
            return `<div>${getSeriesMarker(list, item.seriesName, theme)}
              <span>${item.seriesName}：</span>
              <span>${item.value[1]}${getSeriesUnit(item.seriesName)}</span>
            </div>`
          })
          .join('')
        return `<div class="tooltip-box ${theme}"><div>${params[0].name}</div>${htmlStr}</div>`
      }
    },
    xAxis: xAxisOpt,
    yAxis: yAxisOpt,
    series: seriesOpt
  }
}

// 雨量颜色
export const COLOR_DRP = '#3ADBFF'
// 水位颜色
export const COLOR_WL = '#0346FF'
// 流量颜色
export const COLOR_FLOW = '#55C10A'
// 历史同期水位
export const COLOR_HIS_WL = '#AEBBD8'

// 边框颜色
const BORDER_COLOR = 'rgba(51, 51, 51, 0.4)'

// y轴名称样式
export const NAME_TEXT_STYLE = {
  fontSize: 12,
  color: '#333333'
}

// 坐标轴label样式
export const AXIS_LABEL = {
  show: true,
  color: '#333333',
  fontSize: 14,
  margin: 8
}

// 坐标轴刻度线样式
export const AXIS_TICK = {
  show: true,
  alignWithLabel: true,
  inside: true,
  lineStyle: {
    color: '#333333'
  }
}

// 监测数据和预报数据分割线样式
export const MARK_LINE = {
  silent: true,
  label: {
    show: false
  },
  lineStyle: {
    color: '#DDD',
    width: 1,
    type: 'solid'
  },
  symbol: ['none', 'none']
}

export const MARK_AREA = {
  silent: true,
  itemStyle: {
    color: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: 'rgba(225, 244, 231, 0.5)' // 0% 处的颜色
        },
        {
          offset: 1,
          color: 'rgba(225, 244, 231, 0)' // 100% 处的颜色
        }
      ]
    }
  }
}

// 网格坐标
export const GRID_ONE = [
  {
    left: 60,
    right: 46,
    top: 56,
    bottom: 80,
    show: true,
    borderColor: '#333333',
    borderWidth: 1
  }
]

// 带雨量网格坐标
export const GRID_TWO = [
  {
    left: 60,
    right: 46,
    top: '18%',
    height: '16%',
    show: true,
    borderColor: BORDER_COLOR,
    borderWidth: 1
  },
  {
    left: 60,
    right: 46,
    top: '34%',
    height: '48%'
  },
  {
    left: 60,
    right: 46,
    top: '18%',
    height: '64%',
    show: true,
    borderColor: '#333333',
    borderWidth: 1
  }
]

// 默认样式
export const OPTIONS = {
  // backgroundColor: '#034896',
  legend: {
    show: true,
    top: 0,
    left: 0,
    itemWidth: 16,
    itemHeight: 16,
    textStyle: {
      color: '#333333',
      fontSize: 14
    }
  },
  axisPointer: {
    link: [
      {
        xAxisIndex: 'all'
      }
    ]
  },
  dataZoom: [
    {
      show: true,
      realtime: true,
      start: 30,
      end: 70,
      xAxisIndex: [0, 1, 2],
      height: 20, // 高度
      bottom: 16 // 距离容器底部距离
    },
    {
      type: 'inside',
      realtime: true,
      start: 30,
      end: 70,
      xAxisIndex: [0, 1, 2],
      height: 20, // 高度
      bottom: 16 // 距离容器底部距离
    }
  ],
  tooltip: {
    className: 'echarts-tooltip',
    trigger: 'axis',
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: '#333333',
        type: 'solid'
      }
    }
  }
}

// 特征水位
export const CHARACTERISTIC_WL = [
  {
    name: '历史最高水位',
    color: '#A81B1B',
    key: 'historicalPeakWL'
  },
  {
    name: '保证水位',
    color: '#FF9900',
    key: 'guaranteeWL'
  },
  {
    name: '警戒水位',
    color: '#EDC70A',
    key: 'warningWL'
  }
]

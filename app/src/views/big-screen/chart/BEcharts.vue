<template>
  <div class="b-echarts" />
</template>

<script>
import * as echarts from 'echarts'
import * as _ from 'lodash'
import { updateChartSize } from '..//utils/flexible'
let dragData = []
let mychart = {}
function showTooltip(dataIndex) {
  mychart.dispatchAction({
    type: 'showTip',
    seriesIndex: 0,
    dataIndex: dataIndex
  })
}
function hideTooltip() {
  mychart.dispatchAction({ type: 'hideTip' })
}

const dragTooltip = {
  triggerOn: 'none',
  formatter: function (params) {
    return '时间: ' + params.data[0] + '<br>流量: ' + params.data[1]
  }
}
export default {
  props: {
    option: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    },
    /* 主题 default light dark */
    theme: {
      type: String,
      default: 'light'
    },
    dragable: {
      type: Boolean,
      default: false
    },
    responsive: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chartOptions: null,
      charts: null
    }
  },
  watch: {
    option: {
      deep: true,
      handler: function () {
        this.updateChartView()
      }
    },
    dragable: {
      handler: function () {
        this.updateChartView()
      }
    }
  },
  mounted() {
    const vm = this
    this.charts = echarts.init(this.$el, this.theme)
    this.updateChartView()
    this.charts.getZr().on('click', params => {
      let re = { params: params }
      const pointInPixel = [params.offsetX, params.offsetY]
      if (this.charts.containPixel('grid', pointInPixel)) {
        const xIndex = this.charts.convertFromPixel(
          { seriesIndex: 0 },
          pointInPixel
        )[0]
        // const op = this.charts.getOption()
        // 获得图表中我们想要的数据
        re = Object.assign({ xIndex: xIndex }, re)
        if (params.target) {
          re = Object.assign(
            {
              dataIndex: params.target.dataIndex,
              seriesIndex: params.target.seriesIndex
            },
            re
          )
        }
      }
      vm.$emit('click', re)
    })
    window.addEventListener('resize', _.debounce(this.handleWindowResize, 200))
  },
  beforeDestroy() {
    window.removeEventListener(
      'resize',
      _.debounce(this.handleWindowResize, 200)
    )
    if (this.charts) this.charts.dispose()
  },
  methods: {
    /**
     * 更新echart视图
     */
    updateChartView() {
      if (!this.charts) return
      if (!this.option) return
      // 更新配置size
      this.chartOptions = _.cloneDeep(this.option)
      if (this.dragable) {
        this.chartOptions = Object.assign(_.cloneDeep(this.option), {
          tooltip: dragTooltip
        })
      }
      if (this.responsive) {
        const option = updateChartSize(this.chartOptions)
        this.charts.setOption(option, true)
      } else {
        this.charts.setOption(this.chartOptions, true)
      }
      const vm = this
      mychart = this.charts
      if (this.dragable) {
        dragData = this.chartOptions.series[0].data.map(value => [
          value[0],
          value[1]
        ])
        setTimeout(function () {
          mychart.setOption({
            graphic: dragData.map(function (item, dataIndex) {
              return {
                type: 'circle',
                position: mychart.convertToPixel('grid', item),
                shape: { cx: 0, cy: 0, r: 2 },
                invisible: true,
                draggable: true,
                ondrag: function () {
                  vm.onPointDragging(dataIndex, [this.x, this.y])
                },
                onmousemove: function () {
                  showTooltip(dataIndex)
                },
                onmouseout: function () {
                  hideTooltip(dataIndex)
                },
                z: 100
              }
            })
          })
        }, 0)
      }
    },
    /**
     * 当窗口缩放时，echart动态调整自身大小
     */
    handleWindowResize() {
      if (!this.charts) return
      // console.log('handleWindowResize')
      this.charts.resize()
      setTimeout(() => {
        // 更新配置size
        this.updateChartView()
      }, 300)
    },
    onPointDragging(dataIndex, pos) {
      const xValue = dragData[dataIndex][0]
      const yValue = this.charts.convertFromPixel('grid', pos)[1]
      // data[dataIndex] = this.charts.convertFromPixel('grid', this.position)
      dragData[dataIndex] = [xValue, yValue]
      this.charts.setOption({
        series: {
          ...this.chartOptions.series[0],
          data: dragData
        }
      })
      this.$emit('dragged', dragData)
    }
  }
}
</script>
<style scoped lang="less">
.b-echarts {
  width: 100%;
  height: 100%;
}
</style>

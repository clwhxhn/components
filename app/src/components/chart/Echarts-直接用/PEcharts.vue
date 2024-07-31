<template>
  <div class="p-echarts"></div>
</template>

<script>
import * as echarts from 'echarts'
import ResizeListener from 'element-resize-detector'

export default {
  name: 'PEcharts',
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
    group: {
      type: String,
      default: ''
    },
		timeIdx: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    option() {
      this.updateChartView()
    },
		timeIdx: {
        immediate: true,
        handler: function (value) {
            if (value === 0 || value) {
                this.onUpdate(value)
            }
        }
    }
  },
  mounted() {
    const _this = this
    this.chart = echarts.init(this.$el, this.theme)
    _this.$emit('getInstance', this.chart)
    this.updateChartView()
    // this.chart.getZr().on('click', (params) => {
    //     let re = { params: params }
    //     const pointInPixel = [params.offsetX, params.offsetY]
    //     if (_this.chart.containPixel('grid', pointInPixel)) {
    //         const xIndex = _this.chart.convertFromPixel({ seriesIndex: 0 }, pointInPixel)[0]
    //         // const op = _this.chart.getOption()
    //         // 获得图表中我们想要的数据
    //         re = Object.assign({ xIndex: xIndex }, re)
    //         if (params.target) {
    //             re = Object.assign(
    //                 {
    //                     dataIndex: params.target.dataIndex,
    //                     seriesIndex: params.target.seriesIndex,
    //                 },
    //                 re
    //             )
    //         }
    //     }
    //     console.log('click', re)
    //     _this.$emit('click', re)
    // })
    this.chart.on('click', params => {
      console.log(params)
      _this.$emit('click', params)
    })

    window.addEventListener('resize', this.handleWindowResize)
    this.addChartResizeListener()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize)
  },
  methods: {
		onUpdate(timeIdx) {
      if (!this.chart) {
        return
      }
      this.chart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: timeIdx
      })
    },
    /**
     * 更新echart视图
     */
    updateChartView() {
      if (!this.chart) return
      const option = this.option
      // if (option.series && option.series.length > 0) {
      //   if (!option.color) {
      //     option.color = [
      //       '#5FE3A1',
      //       '#56D9FE',
      //       '#A3A1FB',
      //       '#FFDA83',
      //       '#DF8188',
      //       '#C70039'
      //     ]
      //   }
      //   option.series = option.series.map(item => {
      //     const obj = {
      //       smooth: true,
      //       areaStyle: {}
      //     }
      //     if (item.type === 'line') {
      //       item = Object.assign(obj, item)
      //     }
      //     return item
      //   })
      // }
      this.chart.setOption(option, true)

      //多图表联动
      if (this.group) {
        this.chart.group = this.group
      }
    },
    /**
     * 对chart元素尺寸进行监听，当发生变化时同步更新echart视图
     */
    addChartResizeListener() {
      const instance = ResizeListener({
        strategy: 'scroll',
        callOnAdd: true
      })

      instance.listenTo(this.$el, () => {
        if (!this.chart) return
        this.chart.resize()
      })
    },
    /**
     * 当窗口缩放时，echart动态调整自身大小
     */
    handleWindowResize() {
      if (!this.chart) return
      this.chart.resize()
    }
  }
}
</script>
<style scoped lang='less'>
.p-echarts {
  width: 100%;
  height: 100%;
}
</style>

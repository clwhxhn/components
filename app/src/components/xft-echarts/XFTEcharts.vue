<template>
  <div class="echarts-instance"></div>
</template>
<script>
import { init } from 'echarts'
export default {
  name: 'XFTEcharts',
  props: {
    theme: {
      type: [Object, String],
      default: '',
      required: false
    },
    initOpts: {
      type: Object,
      required: false,
      default: () => ({
        devicePixelRatio: 1,
        width: undefined,
        height: undefined
      })
    },
    options: {
      type: Object,
      default: () => ({}),
      required: false
    },
    merge: {
      type: Object,
      default: () => ({})
    },
    autoresize: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  data() {
    return {
      chart: null,
      wrapperHeight: 0,
      wrapperWidth: 0,
      resizeObserver: null
    }
  },
  watch: {
    options: {
      immediate: true,
      handler(value) {
        this.setOption(value, true)
      }
    },
    merge: {
      immediate: true,
      handler(value) {
        this.setOption(value, false)
      }
    }
  },
  mounted() {
    this.initialize()
    window.addEventListener('resize', this.chartResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.chartResize)
  },
  methods: {
    chartResize() {
      // 防抖
      const timer = setTimeout(() => {
        // eslint-disable-next-line no-unused-expressions
        this.chart && this.chart.resize()
        clearTimeout(timer)
      }, 500)
    },
    initialize() {
      this.chart = init(this.$el, this.theme, this.initOpts)
      this.$emit('chart-init', this.chart)
      if (this.options) {
        this.setOption(this.options, true)
      }
      if (this.merge) {
        this.setOption(this.merge, false)
      }
      this.resize()
    },
    dispose() {
      if (this.chart) {
        this.chart.dispose()
        this.chart = null
      }
    },
    resize() {
      if (this.autoresize && this.chart) {
        if (
          this.wrapperWidth !== this.$el.clientWidth ||
          this.wrapperHeight !== this.$el.clientHeight
        ) {
          this.wrapperWidth = this.$el.clientWidth
          this.wrapperHeight = this.$el.clientHeight
          this.chart.resize()
        }
      }
    },
    /**
     * @description: 设置图表配置项
     * @param {*option} object 配置项
     * @param {*notMerge} boolean 是否合并
     */
    setOption(option, notMerge = false) {
      if (this.chart) {
        try {
          this.chart.setOption(option, notMerge)
          this.resize()
        } catch (e) {
          console.error(e)
        }
      }
    },
    // 增加点击监听事件
    addListen(name) {
      this.chart.off(name)
      this.chart.on(name, e => {
        this.$emit(name, e)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.echarts-instance {
  width: 100%;
  height: 100%;
}
</style>

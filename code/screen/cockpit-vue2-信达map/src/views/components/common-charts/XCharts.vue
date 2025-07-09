<template>
  <div class="x-echarts"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
    mergeOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      chart: null,
      currentWindowWidth: null,
      wrapperHeight: null,
      wrapperWidth: null,
    };
  },

  watch: {
    options: {
      handler() {
        this.setOption(this.options);
      },
      deep: true,
      immediate: true,
    },
    mergeOptions: {
      handler() {
        this.setOption(this.mergeOptions);
      },
      deep: true,
    },
  },
  mounted() {
    this.chart = echarts.init(this.$el);
    this.$emit("init", this.chart);
    window.addEventListener("resize", this.handleWindowResize);
    this.chart.on("click", (param) => {
      this.$emit("click", param);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleWindowResize);
    if (this.chart) {
      this.chart.dispose();
    }
    this.chart = null;
  },
  methods: {
    /**
     * 更新echart视图
     */
    setOption(option) {
      this.$nextTick().then(() => {
        if (!this.chart) return;
        this.chart.setOption(option);
        this.chart.resize();
      });
    },
    /**
     * 当窗口缩放时，echart动态调整自身大小
     */
    handleWindowResize() {
      if (!this.chart) return;
      this.chart.resize();
    },
    resize() {
      if (this.chart) {
        if (
          this.currentWindowWidth !== window.innerWidth ||
          this.wrapperWidth !== this.$el.clientWidth ||
          this.wrapperHeight !== this.$el.clientHeight
        ) {
          this.currentWindowWidth = window.innerWidth;
          this.wrapperWidth = this.$el.clientWidth;
          this.wrapperHeight = this.$el.clientHeight;
          this.chartInstance.resize();
        }
      }
    },
    registerMap(key, json) {
      echarts.registerMap(key, json);
    },
  },
};
</script>
<style scoped lang="less">
.x-echarts {
  width: 100%;
  height: 100%;
}
</style>

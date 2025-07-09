<template>
  <div class="b-echarts"></div>
</template>

<script>
import * as echarts from "echarts";
import { debounce } from 'lodash-es';
import { updateChartSize } from "@/utils/flexible";
import { markRaw } from 'vue'
export default {
  name: 'BEcharts',
  props: {
    option: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {},
    },
    /* 主题 default light dark */
    theme: {
      type: String,
      default: "light",
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    option: {
      deep: true,
      handler: function () {
        this.updateChartView();
      },
    },
  },
  mounted() {
    const _this = this;
    this.chart = markRaw(echarts.init(this.$el, this.theme));
    this.updateChartView();
    this.chart.getZr().on("click", (params) => {
      let re = { params: params };
      const pointInPixel = [params.offsetX, params.offsetY];
      if (_this.chart.containPixel("grid", pointInPixel)) {
        const xIndex = _this.chart.convertFromPixel(
          { seriesIndex: 0 },
          pointInPixel
        )[0];
        // const op = _this.chart.getOption()
        // 获得图表中我们想要的数据
        re = Object.assign({ xIndex: xIndex }, re);
        if (params.target) {
          re = Object.assign(
            {
              dataIndex: params.target.dataIndex,
              seriesIndex: params.target.seriesIndex,
            },
            re
          );
        }
        console.log("click", re);
      }
      _this.$emit("click", re);
    });
    window.addEventListener("resize", debounce(this.handleWindowResize, 200));
  },
  beforeDestroy() {
    window.removeEventListener("resize", debounce(this.handleWindowResize, 200));
  },
  methods: {
    /**
     * 更新echart视图
     */
    updateChartView() {
      console.log("更新视图");
      if (!this.chart) return;
      if (!this.option) return;
      // 更新配置size
      const option = updateChartSize(this.option);
      this.chart.setOption(option, true);
    },
    /**
     * 当窗口缩放时，echart动态调整自身大小
     */
    handleWindowResize() {
      if (!this.chart) return;
      // console.log('handleWindowResize')
      this.chart.resize();
      setTimeout(() => {
        // 更新配置size
        const option = updateChartSize(this.option);
        this.chart.setOption(option, true);
      }, 300)
    },
  },
};
</script>
<style scoped lang="less">
.b-echarts {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div class="water-monitoring-chart">
    <b-echarts :option="options" style="width: 100%; height: 100%"></b-echarts>
  </div>
</template>

<script>
import * as _ from 'lodash';
import BEcharts from '@/components/chart/BEcharts';
import { toFixed } from '@/utils/common';
const OPTION = {
  color: ['#0FC6C2', '#9CBAFF', '#29B9FF', '#BEE4D2', '#f5b79b'],
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    textStyle: {
      color: '#8EB7FF', // 修改图例文字颜色
      fontSize: toFixed(12 / 16, 2) + 'rem', // 修改图例文字大小
    },
    icon: 'rect', // 设置图例的图标为矩形
    itemWidth: 8,
    itemHeight: 8,
  },
  grid: {
    left: '10',
    right: '10',
    bottom: '5%',
    top: '35%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      data: [],
      axisLine: {
        lineStyle: {
          color: 'rgba(62, 188, 238, 0.2)', // 修改 X 轴线颜色
        },
      },
      axisLabel: {
        color: '#fff', // 修改 X 轴文字颜色
        fontSize: toFixed(12 / 16, 2) + 'rem', // 修改 X 轴文字大小
      },
    },
  ],
  yAxis: [
    {
      name: '取用水量：万m³',
      type: 'value',
      splitLine: {
        lineStyle: {
          color: 'rgba(62, 188, 238, 0.2)', // 修改分割线颜色
        },
      },
      axisLabel: {
        color: '#fff',
        fontSize: toFixed(12 / 16, 2) + 'rem',
      },
      nameTextStyle: {
        color: '#DDF8FF', // 修改 Y 轴名称颜色
        fontSize: toFixed(12 / 16, 2) + 'rem', // 修改 Y 轴名称字体大小
        padding: [0, 0, 0, 40], // 修改 Y 轴名称上、右、下、左的内边距
      },
    },
  ],
  series: [],
};
export default {
  name: 'WaterMonitoringChart',
  components: {
    BEcharts,
  },
  props: {
    xData: {
      type: Array,
      default: () => [],
    },
    sData: {
      type: Array,
      default: () => [],
    },
    // chartWidth: {
    //   type: Number,
    //   default: 600,
    // },
  },
  watch: {
    sData: {
      deep: true,
      immediate: true,
      handler(val) {
        if (val) {
          this.updateChart(val);
        }
      },
    },
    // chartWidth: {
    //   deep: true,
    //   immediate: true,
    //   handler(val) {
    //     this.$nextTick(() => {
    //       this.$refs.echart1.resize();
    //     });
    //   },
    // },
  },
  data() {
    return {
      options: null,
    };
  },
  methods: {
    updateChart(val) {
      this.options = _.merge(
        _.cloneDeep(OPTION),
        {
          xAxis: [
            {
              data: this.xData,
            },
          ],
        },
        {
          series: val,
        },
      );
      console.log(this.options);
    },
  },
};
</script>

<style lang="less" scoped>
.water-monitoring-chart {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div class="chart-container">
    <div :id="chartId" class="chart" ref="chart"></div>
    <!-- 底座背景 -->
    <div class="chart3d-bg">
      <slot name="chargbg">
        <div class="chargbg"></div>
      </slot>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-gl';
import snowflake from '@/utils/snowflake';
import { getPie3D, getParametricEquation } from './gl-charts.js'; //工具类js，页面路径自己修改

/**
 * slot="chargbg"可以设置饼图底座图标,css参考 .chargbg
 */
export default {
  name: 'chart',
  props: {
    /**
     * 饼图数据
     */
    optionData: {
      type: Array,
      default: () => {
        return [
          // {
          //   name: '生态数据未达标告警',
          //   value: 30,
          //   itemStyle: {
          //     color: '#31EABE',
          //   },
          // },
          // {
          //   name: '监测设备离线告警',
          //   value: 70,
          //   itemStyle: {
          //     color: '#1D78FF',
          //   },
          // },
          // {
          //   name: 'AI监测告警',
          //   value: 25,
          //   itemStyle: {
          //     color: '#FFA200',
          //   },
          // },
        ];
      },
    },
    /**
     * 透明的空心占比
     */
    internalDiameterRatio: {
      type: Number,
      default: 0.6,
    },
    /**
     * 视角到主体的距离
     */
    distance: {
      type: Number,
      default: 230,
    },
    /**
     * 旋转角度
     */
    alpha: {
      type: Number,
      default: 30,
    },
    /**
     * 立体的高度
     */
    pieHeight: {
      type: Number,
      default: 25,
    },
    /**
     * 饼或者环的透明度
     */
    opacity: {
      type: Number,
      default: 1,
    },
    /**
     * 饼图距离左边位置
     */
    left: {
      type: String,
      default: '-20%',
    },
    /**
     * 鼠标悬停饼图动画高度
     */
    hoverHeight: {
      type: Number,
      default: 60,
    },
    /**
     * 图例配置,参数只有 show/top/left/right/bottom/format:val=>{return val}
     */
    legend: {
      type: Object,
      default: () => {
        return {
          show: true,
          right: 10,
          top: 'center',
        };
      },
    },
  },
  data() {
    return {
      chartId: snowflake.generate(),
      statusChart: null,
      option: {},
    };
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.changeSize);
    if (this.statusChart) {
      this.statusChart.dispose();
      this.statusChart = null;
    }
  },
  created() {},
  mounted() {
    this.initChart();
    //根据窗口变化自动调节图表大小
    window.addEventListener('resize', this.changeSize);
  },
  methods: {
    // 图表初始化
    initChart() {
      this.statusChart = echarts.init(this.$refs.chart);
      // 传入数据生成 option, 构建3d饼状图, 参数工具文件已经备注的很详细
      this.option = getPie3D(
        this.optionData,
        this.internalDiameterRatio,
        this.distance,
        this.alpha,
        this.pieHeight,
        this.opacity,
        this.left,
        this.legend,
      );
      this.statusChart.setOption(this.option);
      this.bindListen(this.statusChart);
    },
    // 监听鼠标事件，实现饼图选中效果（单选），近似实现高亮（放大）效果。
    // optionName是防止有多个图表进行定向option传递，单个图表可以不传，默认是opiton
    bindListen(myChart, optionName = 'option') {
      //   let selectedIndex = '';
      let hoveredIndex = '';
      // 监听 mouseover，近似实现高亮（放大）效果
      myChart.on('mouseover', (params) => {
        // 准备重新渲染扇形所需的参数
        let isSelected;
        let isHovered;
        let startRatio;
        let endRatio;
        let k;
        // 如果触发 mouseover 的扇形当前已高亮，则不做操作
        if (hoveredIndex === params.seriesIndex) {
          // 否则进行高亮及必要的取消高亮操作
        } else {
          // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
          if (hoveredIndex !== '') {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
            isSelected = this[optionName].series[hoveredIndex].pieStatus.selected;
            isHovered = false;
            startRatio = this[optionName].series[hoveredIndex].pieData.startRatio;
            endRatio = this[optionName].series[hoveredIndex].pieData.endRatio;
            k = this[optionName].series[hoveredIndex].pieStatus.k;
            // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
            this[optionName].series[hoveredIndex].parametricEquation = getParametricEquation(
              startRatio,
              endRatio,
              isSelected,
              isHovered,
              k,
              this[optionName].series[hoveredIndex].pieData.value,
            );
            this[optionName].series[hoveredIndex].pieStatus.hovered = isHovered;
            // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
            hoveredIndex = '';
          }
          // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
          if (params.seriesName !== 'mouseoutSeries' && params.seriesName !== '信用评价') {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
            isSelected = this[optionName].series[params.seriesIndex].pieStatus.selected;
            isHovered = true;
            startRatio = this[optionName].series[params.seriesIndex].pieData.startRatio;
            endRatio = this[optionName].series[params.seriesIndex].pieData.endRatio;
            k = this[optionName].series[params.seriesIndex].pieStatus.k;
            // 对当前点击的扇形，执行高亮操作（对 option 更新）
            this[optionName].series[params.seriesIndex].parametricEquation = getParametricEquation(
              startRatio,
              endRatio,
              isSelected,
              isHovered,
              k,
              this[optionName].series[params.seriesIndex].pieData.value + this.hoverHeight,
            );
            this[optionName].series[params.seriesIndex].pieStatus.hovered = isHovered;
            // 记录上次高亮的扇形对应的系列号 seriesIndex
            hoveredIndex = params.seriesIndex;
          }
          // 使用更新后的 option，渲染图表
          myChart.setOption(this[optionName]);
        }
      });
      // 修正取消高亮失败的 bug
      myChart.on('globalout', () => {
        // 准备重新渲染扇形所需的参数
        let isSelected;
        let isHovered;
        let startRatio;
        let endRatio;
        let k;
        if (hoveredIndex !== '') {
          // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
          isSelected = this[optionName].series[hoveredIndex].pieStatus.selected;
          isHovered = false;
          k = this[optionName].series[hoveredIndex].pieStatus.k;
          startRatio = this[optionName].series[hoveredIndex].pieData.startRatio;
          endRatio = this[optionName].series[hoveredIndex].pieData.endRatio;
          // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
          this[optionName].series[hoveredIndex].parametricEquation = getParametricEquation(
            startRatio,
            endRatio,
            isSelected,
            isHovered,
            k,
            this[optionName].series[hoveredIndex].pieData.value,
          );
          this[optionName].series[hoveredIndex].pieStatus.hovered = isHovered;
          // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
          hoveredIndex = '';
        }
        // 使用更新后的 option，渲染图表
        myChart.setOption(this[optionName]);
      });
    },
    // 自适应宽高
    changeSize() {
      this.statusChart.resize();
    },
  },
};
</script>

<style lang="less" scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
  .chart {
    z-index: 1;
  }
  .chart,
  .chart3d-bg {
    width: 100%;
    height: 100%;
  }

  .chart3d-bg {
    position: absolute;
    z-index: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .chargbg {
      position: absolute;
      bottom: 10px;
      z-index: 0;
      // left: 50%;
      // height: calc(200 / 1080 * 100vh);
      // width: calc(240 / 1920 * 100vw);
      left: 30%;
      height: 90px; // 根据实际调整
      width: 150px; // 根据实际调整
      background: no-repeat center;
      background-image: url('~@/assets/img/water-resource/piebg.png');
      background-size: 100% 100%;
      transform: translateX(-50%);
    }
  }
}
</style>

<template>
  <div :id="chartId" class="b-echarts"></div>
</template>

<script>
import * as echarts from 'echarts';
// import ResizeListener from 'element-resize-detector';
import snowflake from '@/utils/snowflake';

export default {
  props: {
    option: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {},
    },
    /* 主题 default light dark */
    theme: {
      type: String,
      default: 'light',
    },
    group: {
      type: String,
      default: '',
    },
    timeIdx: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      chartId: snowflake.generate(),
      chart: null,
    };
  },
  watch: {
    option() {
      this.updateChartView();
    },
    timeIdx: {
      immediate: true,
      handler: function (value) {
        if (value === 0 || value) {
          this.onUpdate(value);
        }
      },
    },
  },
  mounted() {
    // eslint-disable-next-line no-underscore-dangle
    const _this = this;
    this.chart = echarts.init(document.getElementById(this.chartId));

    this.updateChartView();
    this.chart.getZr().on('click', params => {
      let re = { params: params };
      const pointInPixel = [params.offsetX, params.offsetY];
      if (_this.chart.containPixel('grid', pointInPixel)) {
        let xIndex = _this.chart.convertFromPixel({ seriesIndex: 0 }, pointInPixel)[0];
        // eslint-disable-next-line no-compare-neg-zero
        if (xIndex === -0) {
          xIndex = 0;
        }
        const op = this.chart.getOption();
        const name = op.xAxis[0].data[xIndex];
        // 获得图表中我们想要的数据
        re = Object.assign({ xIndex: xIndex, name: name }, re);
        if (params.target) {
          re = Object.assign(
            {
              dataIndex: params.target.dataIndex,
              seriesIndex: params.target.seriesIndex,
              name: name,
            },
            re,
          );
        }
        // console.log('click', re)
      }
      _this.$emit('click', re);
    });
    window.addEventListener('resize', this.handleWindowResize);
    // this.addChartResizeListener();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize);
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  },
  methods: {
    /**
     * 更新echart视图
     */
    updateChartView() {
      if (!this.chart) return;
      if (this.chart) {
        this.chart.clear();
      }
      const option = this.option;
      if (option.series && option.series.length > 0) {
        if (!option.color) {
          option.color = ['#5FE3A1', '#56D9FE', '#A3A1FB', '#FFDA83', '#DF8188', '#C70039'];
        }
        option.series = option.series.map(item => {
          const obj = {
            smooth: true,
          };
          if (item.type === 'line') {
            // eslint-disable-next-line no-param-reassign
            item = Object.assign(obj, item);
          }
          return item;
        });
      }
      this.chart.setOption(option, true);

      //多图表联动
      console.log('option: ', this.group);
      if (this.group) {
        this.chart.group = this.group;
      }
    },
    /**
     * 对chart元素尺寸进行监听，当发生变化时同步更新echart视图
     */
    // addChartResizeListener() {
    //   const instance = ResizeListener({
    //     strategy: 'scroll',
    //     callOnAdd: true,
    //   });

    //   instance.listenTo(this.$el, () => {
    //     if (!this.chart) return;
    //     this.chart.resize();
    //   });
    // },
    /**
     * 当窗口缩放时，echart动态调整自身大小
     */
    handleWindowResize() {
      if (!this.chart) return;
      this.chart.resize();
    },
    /**
     * 手动更新指针位置，传入时间刻度
     */
    onUpdate(timeIdx) {
      if (!this.chart) {
        return;
      }
      this.chart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: timeIdx,
      });
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

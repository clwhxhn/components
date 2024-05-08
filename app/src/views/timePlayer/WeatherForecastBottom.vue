<template>
  <div class="bottom-chart-wrapper">
    <div class="lf-box" v-if="qxRightPanelName === 'BasinInfoRtPanel'">
      <div
        class="basins-div"
        v-for="item in basins"
        :key="item.name"
        :class="{ active: tagetBasin === item.name }"
        @click="basinChange(item)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="rt-box" :class="{ short: qxRightPanelName === 'BasinInfoRtPanel' }">
      <!-- 时间播放器 -->
      <div class="time-player">
        <SimpleTimeLine
          ref="timeLineRef"
          v-if="showTimeLine"
          v-bind="$attrs"
          :timeList="timesList"
          @clickSlider="clickSlider"
          @clickStop="clickStop"
          @clickPlay="clickPlay"
          @changeSpeed="changeSpeed"
        ></SimpleTimeLine>
      </div>
      <!-- 柱状图 -->
      <div class="chart">
        <BEcharts :option="option" style="width: 100%; height: 100%"> </BEcharts>
      </div>
      <!-- <div class="tick">
        <div style="width: 4%"></div>
        <div class="monitor tick-bg">
          <div class="tick-title">监测值</div>
        </div>
        <div class="forecast tick-bg">
          <div class="tick-title">预报值</div>
        </div>
        <div style="width: 1%"></div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { getAction } from '@/api/manage';
import { mapState } from 'vuex';
import BEcharts from '@/components/chart/BEcharts.vue';
import { MODULE_NAME } from '@/views/water-disasters-defense-new/store';
import { basins } from '../data';
import SimpleTimeLine from './SimpleTimeLine';
import timelineSplitMixin from './timelineSplitMixin';

const paramsByPanel = {
  TownRainfallRtPanel: {
    type: 1,
  },
  RiskPointInfoRtPanel: {
    type: 2,
  },
};

export default {
  components: {
    BEcharts,
    SimpleTimeLine,
  },
  data() {
    return {
      url: {
        timeLine: '/mountain.flood.prevention/prevention/forecastScene/queryTimeAxisByTime',
      },
      paramsByPanel,
      option: {},
      basins,
      tagetBasin: '磨刀溪流域',
      isForecast: false, //是否有预报数据
      isFirstGetTime: null, // 是否是初始请求时间接口，
      sliderIndex: 0, // 时间轴进度
      timesList: [],
      showTimeLine: false,
    };
  },
  mixins: [timelineSplitMixin],
  computed: {
    ...mapState({
      qxRightPanelName: (state) => state[MODULE_NAME].qxRightPanelName,
    }),
  },
  watch: {
    qxRightPanelName: {
      handler(val) {
        if (val) {
          this.handleLeftPanelClick(true);
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  beforeDestroy() {
    this.timelineSplitMixinStopRun()
    this.timelineSplitMixinStopCache()
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  },
  methods: {
    handleLeftPanelClick(flag) {
      if (!this.qxRightPanelName) {
        this.timesList = [];
        this.basinEquidsList = [];
        return;
      }
      // 请求时间接口
      this.isFirstGetTime = flag; // 是否是初始请求时间接口（切换方案时请求时间接口）
      if (flag) this.getTimeList();
    },

    async getTimeList() {
      this.showTimeLine = false;
      const res = await getAction(this.url.timeLine, {
        type: paramsByPanel[this.qxRightPanelName].type, //1-行政区 3-山洪风险点
        startTime: '2024-04-23 16:00:00', // TODO
        endTime: '2024-04-25 16:00:00',
      });
      const data = res.result || [];
      this.renderTimeLine(data);
      this.renderChart(data);
    },
    renderChart(data) {
      const xData = data.map((i) => i.tm);
      const jiance = [];
      const yubao = [];
      data.forEach((i) => {
        if (i.type == 1) {
          jiance.push([i.tm, i.areaRainfall]);
        }
        if (i.type == 2) {
          yubao.push([i.tm, i.areaRainfall]);
        }
      });
      this.option = {
        grid: {
          left: '4%',
          right: 10,
          bottom: 20,
          top: 30,
          //   containLabel: true,
        },
        legend: {
          show: false,
          top: 0,
          right: 10,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            fontSize: 14,
            color: '#DDF8FF',
          },
        },
        color: ['#31EABE'],
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,0,0,0.3)',
          borderWidth: 0,
          textStyle: {
            color: '#fff',
            fontSize: 12,
          },
          valueFormatter: (value) => `${value}mm`,
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          position: 'top', // x 轴位置设置为顶部
          name: '',
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(62, 188, 238, 0.2)',
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#DDF8FF',
            },
            fontSize: 12,
          },
          axisTick: {
            inside: true, // 小竖线显示在刻度线内部
            lineStyle: {
              color: '#3EBCEE', // 小竖线的颜色
            },
          },
          data: xData,
        },
        yAxis: [
          {
            name: '雨量(mm)',
            type: 'value',
            nameLocation: 'middle',
            nameGap: 20,
            inverse: true,
            nameTextStyle: {
              color: '#AFCCFF',
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(62, 188, 238, 0.2)',
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: 'rgba(62, 188, 238, 0.2)',
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#AFCCFF',
              },
              fontSize: 11,
              interval: 'auto',
              formatter: '{value}',
            },
          },
        ],
        series: [
          {
            name: '监测降雨',
            type: 'bar',
            data: jiance,
            yAxisIndex: 0,
            itemStyle: {
              barBorderRadius: [0, 0, 2, 3], // 设置圆角，数组中的四个值分别表示左上角、右上角、右下角、左下角的圆角半径
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#BEEFFF',
                  },
                  {
                    offset: 1,
                    color: '#00BFFF',
                  },
                ],
                global: false,
              },
            },
            barWidth: 15,
          },
          {
            name: '预报',
            type: 'bar',
            data: yubao,
            yAxisIndex: 0,
            itemStyle: {
              barBorderRadius: [0, 0, 2, 3], // 设置圆角，数组中的四个值分别表示左上角、右上角、右下角、左下角的圆角半径
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#BEFFE5',
                  },
                  {
                    offset: 1,
                    color: '#00FFAA',
                  },
                ],
                global: false,
              },
            },
            barWidth: 15,
          },
        ],
      };
    },
    renderTimeLine(data) {
      this.timesList = data;
      this.showTimeLine = true;
      this.basinEquidsList = JSON.parse(JSON.stringify(this.timesList));
      console.log('this.basinEquidsList: ', this.basinEquidsList);
      if (this.basinEquidsList.length) {
        // 初始化
        this.timelineSplitMixinInit(this.basinEquidsList.length);
        // // 渲染第一个点
        this.timelineSplitMixinChange(0);
      }
    },
    basinChange(rec) {
      this.tagetBasin = rec.name;
    },
    // 时间轴钩子函数==>需要获取数据时触发
    timelineSplitMixinNeedGetData(i) {
      let item = this.basinEquidsList[i] || {};
      // if (!item.id) return;
      // TODO 获取当前时间节点的地图数据
       // 获取数据后需要设置进组件
       console.log('----------');
       this.timelineSplitMixinSetData(i, '111') // TODO 暂时设置为111
    },
    // 钩子函数，展示数据时触发 TODO
    timelineSplitMixinShow(i, data) {
      this.$refs.timeLineRef.changeSliderIndex(i);
      // TODO 更新地图数据
    },
    clickSlider(sliderIndex) {
      this.sliderIndex = sliderIndex
      // 时间轴方法==>改变时间点
      this.timelineSplitMixinChange(this.sliderIndex)
    },
    clickPlay(sliderIndex) {
      this.sliderIndex = sliderIndex
      this.timelineSplitMixinStartRun(this.sliderIndex)
      this.timelineSplitMixinStartCache(this.sliderIndex)
    },
    clickStop(sliderIndex) {
      this.timelineSplitMixinStopRun()
      // this.timelineSplitMixinStopCache();
    },
    changeSpeed(speed) {
      this.timelineSplitMixinTimeStep = speed
    },
  },
};
</script>

<style lang="less" scoped>
.bottom-chart-wrapper {
  position: fixed;
  z-index: 100;
  bottom: 13px;
  left: 10px;
  transition: all 300ms;
  display: block;
  width: calc(100vw - 20px);
  height: 262px;
  background-image: url('~@/assets/img/weather-frecast/bottom-bg.png');
  background-size: 100% 100%;
  display: flex;
  .lf-box {
    width: 190px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0;
    .basins-div {
      width: 128px;
      height: 32px;
      background-image: url('~@/assets/img/weather-frecast/basin-btn-bg.png');
      background-size: 100% 100%;
      cursor: pointer;
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 16px;
      color: #c0d7ff;
      line-height: 32px;
      text-align: center;
      &.active {
        background-image: url('~@/assets/img/weather-frecast/basin-btn-active-bg.png');
        background-size: 100% 100%;
        font-weight: 600;
        color: #ffffff;
      }
    }
  }
  .rt-box {
    width: 100%;
    &.short {
      width: calc(100% - 206px);
    }
  }
  .time-player {
    height: 60px;
  }
  .chart {
    width: 98%;
    height: 180px;
  }

  .tick {
    width: 100%;
    height: 25px;
    display: flex;
    .tick-bg {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .tick-title {
      width: 80px;
      height: 25px;
      line-height: 25px;
      font-family: PingFangSC, PingFang SC;
      font-weight: 600;
      font-size: 14px;
      text-align: center;
      font-style: normal;
      z-index: 999;
    }

    .monitor {
      width: 62%;
      height: 6px;
      background: #00bfff;
      opacity: 0.4;
      text-align: center;
      margin-right: 2px;

      .tick-title {
        color: rgba(0, 189, 253, 1);
        background: #002e5d;
        border: 1px solid #00bfff;
      }
    }

    .forecast {
      flex: 1;
      height: 6px;
      background: #00ffaa;
      opacity: 0.4;
      text-align: center;
      margin-left: 2px;

      .tick-title {
        color: rgba(0, 255, 170, 1);
        background: #002e5d;
        border: 1px solid rgba(0, 255, 170, 0.4);
      }
    }
  }
}
</style>

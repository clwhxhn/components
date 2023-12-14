<template>
  <div class="total-water-chart">
    <div class="check-manage-chart">
      <BEcharts :option="chartOpt"></BEcharts>
    </div>
    <div class="check-manage-kpi">
      <div class="check-manage-kpi-item">
        本年计划取水总量<span>96523</span>万m³
      </div>
      <div class="check-manage-kpi-item" style="margin-top: 13px">
        本年已取水总量<span>66523</span>个
      </div>
    </div>
  </div>
</template>

<script>
import BEcharts from "@/components/chart/BEcharts";
function getCheckManegeOption(val) {
  let option = {
    series: [
      // {
      //   type: 'gauge',
      //   startAngle: 180,
      //   endAngle: 0,
      //   center: ['50%', '75%'],
      //   radius: '90%',
      //   min: 0,
      //   max: 100,
      //   splitNumber: 5,
      //   zlevel: 0,
      //   axisLine: {
      //     show: true,
      //     lineStyle: {
      //       width: 10,
      //       color: [
      //         [0.25, checkManageColors[0]],
      //         [0.5, checkManageColors[1]],
      //         [0.75, checkManageColors[2]],
      //         [1, checkManageColors[3]],
      //       ],
      //     },
      //   },
      //   axisTick: {
      //     length: 6,
      //     distance: -20,
      //     lineStyle: {
      //       color: '#32D4D7',
      //       width: 1,
      //     },
      //   },
      //   splitLine: {
      //     length: 8,
      //     distance: -20,
      //     lineStyle: {
      //       color: '#32D4D7',
      //       width: 1,
      //     },
      //   },
      //   axisLabel: {
      //     color: '#32D4D7',
      //     fontSize: 12,
      //     distance: -18,
      //   },
      //   title: {
      //     offsetCenter: [0, '-10%'],
      //     fontSize: 20,
      //   },
      //   detail: {
      //     show: false,
      //   },
      //   data: [],
      // },
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        center: ["50%", "75%"],
        radius: "60%",
        min: 0,
        max: 100,
        splitNumber: 5,
        zlevel: 1,
        axisLine: {
          show: true,
          lineStyle: {
            color: [[1, "#21506F"]],
          },
        },
        progress: {
          show: true,
          width: 8,
          itemStyle: {
            color: "#31EABE",
          },
        },
        pointer: {
          length: "90%",
          width: 4,
          offsetCenter: [0, "0%"],
          itemStyle: {
            color: "#10CCFF",
          },
        },
        anchor: {
          show: true,
          showAbove: false,
          size: 15,
          itemStyle: {
            color: "#3C87F7",
            borderColor: "#39A9DC",
            borderWidth: 5,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        title: {
          offsetCenter: [0, "-10%"],
          fontSize: 20,
        },
        detail: {
          show: false,
        },
        data: [
          {
            value: val,
          },
        ],
      },
    ],
  };
  return option;
}
export default {
  components: {
    BEcharts,
  },
  data() {
    return {
      chartOpt: {},
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.chartOpt = getCheckManegeOption(90);
    },
  },
};
</script>

<style lang="less" scoped>
.total-water-chart {
  height: 126px;
  display: flex;
  margin-bottom: 10px;
  .check-manage-chart {
    background: url("~@/assets/img/water-resource/bkg-chart.png") center top
      no-repeat;
    background-size: 186px 100px;
  }
  .check-manage-chart,
  .check-manage-kpi {
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .check-manage-kpi-item {
      width: 200px;
      height: 30px;
      background: url("~@/assets/img/water-resource/sub1-hhgl-bg.png") center
        bottom no-repeat;
      background-size: 100% 19px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #afccff;
      padding-left: 20px;
      span {
        font-size: 16px;
        color: #ffffff;
      }
    }
  }
}
</style>

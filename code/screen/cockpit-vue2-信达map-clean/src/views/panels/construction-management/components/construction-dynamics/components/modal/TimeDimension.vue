<template>
  <div class="time-dimension">
    <div class="chart-box">
      <BEcharts :option="option" />
    </div>
  </div>
</template>

<script>
import BEcharts from "@/components/BEcharts.vue";

// 安全
const data1 = [
  { time: "2024/09/30 18:00:00", val: 100 },
  { time: "2024/12/31 18:00:00", val: 100 },
  { time: "2025/03/31 18:00:00", val: 100 },
  { time: "2025/06/24 18:00:00", val: 95 },
];

// 质量
const data2 = [
  { time: "2024/09/30 18:00:00", val: 100 },
  { time: "2024/12/31 18:00:00", val: 100 },
  { time: "2025/03/31 18:00:00", val: 100 },
  { time: "2025/06/24 18:00:00", val: 96 },
];

export default {
  components: {
    BEcharts,
  },
  props: {
    panelType: {
      panelType: String,
      required: true,
    },
  },
  data() {
    return {
      option: {},
    };
  },
  mounted() {
    const data = this.panelType === "quality" ? data2 : data1;
    const xAxis = data.map((i) => i.time);
    this.option = {
      color: ["#4684FF"],
      legend: {
        show: false,
      },
      tooltip: {
        show: true,
        trigger: "axis",
        // confine: true,
        backgroundColor: "rgba(0,0,0,0.3)",
        borderWidth: 0,
        textStyle: {
          color: "#fff",
        },
      },
      grid: {
        left: "5%",
        right: "3%",
        top: "10%",
        bottom: "10%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "rgba(186,231,255,0.4)",
              width: 1,
              type: "solid",
            },
          },
          axisLabel: {
            color: "rgba(234,241,255,0.74)",
            // formatter: function (value) {
            //   return `${value}`.substring(10, 16);
            // },
          },
          data: xAxis,
          axisPointer: {
            // type: "shadow",
          },
        },
      ],
      yAxis: {
        type: "value",
        name: "",
        nameTextStyle: {
          color: "#FFFFFF",
          align: "center",
        },
        axisLabel: {
          color: "#FFFFFF",
          formatter: "{value}",
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dotted",
            color: "rgba(255, 255, 255, 0.30)",
          },
        },
      },
      series: [
        {
          name: "",
          type: "line",
          smooth: false,
          symbol: "circle",
          showSymbol: true,
          symbolSize: 8,
          tooltip: {
            valueFormatter: (value) => value + "%",
          },
          lineStyle: {
            width: 2,
          },
          //   areaStyle: {
          //     normal: {
          //       color: {
          //         x: 0,
          //         y: 0,
          //         y2: 1,
          //         globalCoord: false,
          //         x2: 0,
          //         colorStops: [
          //           {
          //             offset: 0,
          //             color: "rgba(10,107,215,1)",
          //           },
          //           {
          //             offset: 1,
          //             color: "rgba(65,76,217,0)",
          //           },
          //         ],
          //         type: "linear",
          //       },
          //     },
          //   },
          data: data.map((i) => i.val),
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.time-dimension {
  .chart-box {
    height: 500px;
  }
}
</style>

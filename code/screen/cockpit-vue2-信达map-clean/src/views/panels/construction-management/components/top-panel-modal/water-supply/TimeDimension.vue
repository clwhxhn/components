<template>
  <div class="time-dimension">
    <div class="chart-box">
      <BEcharts :option="option" />
    </div>
  </div>
</template>

<script>
import BEcharts from "@/components/BEcharts.vue";

const data = [
  { val: 1.12, time: "2021/12/31 18:00:00" },
  { val: 1.12, time: "2022/12/31 18:00:00" },
  { val: 1.12, time: "2023/12/31 18:00:00" },
  { val: 1.12, time: "2024/12/31 18:00:00" },
  { val: 1.12, time: "2025/06/24 18:00:00" },
];

export default {
  components: {
    BEcharts,
  },
  data() {
    return {
      option: {},
    };
  },
  mounted() {
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
            formatter: function (value) {
              const [date, time] = value.split(" ");
              return `${date}\n${time}`;
            },
          },
          data: xAxis,
          axisPointer: {},
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
          //   tooltip: {
          //     valueFormatter: (value) => value + "%",
          //   },
          lineStyle: {
            width: 2,
          },
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

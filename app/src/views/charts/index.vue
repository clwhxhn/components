<template>
  <div class="chart-container">
    <div class="chart-box">
      <WaterMonitoringChart :xData="xData" :sData="seriesData" />
    </div>
    <div class="chart-box">
      <BEcharts :option="barOption1"></BEcharts>
    </div>
    <div class="chart-box">
      <BEcharts :option="rainOption"></BEcharts>
    </div>

    <div class="chart-box">
      <BEcharts :option="pieoption"></BEcharts>
    </div>

    <div class="chart-box">
      <BEcharts :option="barOption2"></BEcharts>
    </div>

    <div class="chart-box">
      <BEcharts :option="lineChart"></BEcharts>
    </div>

    <div class="chart-box2">
      <BEcharts :option="xiangxing" style="height: 100%; width: 100%"></BEcharts>
    </div>

    <div>
      <span style="color: red">x轴坐标文字换行处理</span>
      <div class="chart-box">
        <BEcharts :option="option"></BEcharts>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import WaterMonitoringChart from "./components/WaterMonitoringChart";
import { getWarnEventOption } from "./barChart1";
import BEcharts from "@/components/chart/BEcharts";
import {
  rainChart,
  getRainfallOpt,
  getPieOpt,
  getVillageRainOpt,
  lineChart,
  getXiangxing,
} from "./chart";

export default {
  components: {
    WaterMonitoringChart,
    BEcharts,
  },
  data() {
    return {
      xData: [],
      seriesData: [],
      barOption1: {},
      rainOption: rainChart,
      option: {},
      pieoption: {},
      barOption2: {},
      lineChart: {},
      xiangxing: {},
    };
  },
  created() {
    this.renderChart();

    this.barOption1 = getWarnEventOption();
    this.barOption2 = getVillageRainOpt();
    this.option = getRainfallOpt();
    this.lineChart = lineChart();
    this.xiangxing = getXiangxing();
    this.renderPie();
  },
  methods: {
    renderChart() {
      this.xData = ["11-1", "11-2", "11-3"];
      this.seriesData = [
        {
          name: "许可取水",
          type: "bar",
          data: [20, 40, 30],
          barWidth: 8,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1, // 渐变色起始坐标和结束坐标
              [
                { offset: 0, color: "rgba(102, 128, 255, 1)" }, // 渐变色起始颜色
                { offset: 1, color: "rgba(102, 128, 255, 0.5)" }, // 渐变色结束颜色
              ]
            ),
            borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(255, 255, 255, 1)" }, // 设置边框颜色渐变的起始颜色
              { offset: 1, color: "rgba(0, 128, 255, 0)" }, // 设置边框颜色渐变的结束颜色
            ]),
          },
        },
        {
          name: "计划取水",
          type: "bar",
          data: [10, 20, 30],
          barWidth: 8,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1, // 渐变色起始坐标和结束坐标
              [
                { offset: 0, color: "rgba(0, 85, 255, 1)" }, // 渐变色起始颜色
                { offset: 1, color: "rgba(0, 85, 255, 0.5)" }, // 渐变色结束颜色
              ]
            ),
            borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(255, 255, 255, 1)" }, // 设置边框颜色渐变的起始颜色
              { offset: 1, color: "rgba(0, 128, 255, 0)" }, // 设置边框颜色渐变的结束颜色
            ]),
          },
        },
        {
          name: "实际已取水",
          type: "bar",
          data: [12, 23, 34],
          barWidth: 8,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1, // 渐变色起始坐标和结束坐标
              [
                { offset: 0, color: "rgba(0, 171, 255, 1)" }, // 渐变色起始颜色
                { offset: 1, color: "rgba(0, 171, 255, 0.5)" }, // 渐变色结束颜色
              ]
            ),
            borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(255, 255, 255, 1)" }, // 设置边框颜色渐变的起始颜色
              { offset: 1, color: "rgba(0, 128, 255, 0)" }, // 设置边框颜色渐变的结束颜色
            ]),
          },
        },
      ];
    },
    renderPie() {
      const sData = [
        {
          name: "立即转移",
          value: 1,
        },
        {
          name: "准备转移",
          value: 2,
        },
        {
          name: "通知转移",
          value: 3,
        },
      ];
      const text = "预警村落";
      const subtext = sData.reduce((acc, cur) => acc + cur.value, 0);
      const color = ["#C7172F", "#DA8F28", "#CED72F", "#098FC9"];
      this.pieoption = getPieOpt(text, subtext, sData, color);
    },
  },
};
</script>

<style lang="less" scoped>
.chart-container {
  display: flex;
  flex-wrap: wrap;
}
.chart-box {
  width: 350px;
  height: 205px;
  background-color: rgba(0, 0, 0, 0.6);
}

.chart-box2 {
  width: 230px;
  height: 250px;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
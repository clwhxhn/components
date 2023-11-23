<template>
  <div>
    <div class="chart-box">
      <WaterMonitoringChart :xData="xData" :sData="seriesData" />
    </div>
    <div class="chart-box">
      <BEcharts :option="barOption1"></BEcharts>
    </div>
    <div class="chart-box">
     <BEcharts :option="rainOption"></BEcharts>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import WaterMonitoringChart from "./components/WaterMonitoringChart";
import { getWarnEventOption } from "./barChart1";
import BEcharts from "@/components/chart/BEcharts";
import {rainChart} from './chart'

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
      rainOption: rainChart
    };
  },
  created() {
    this.renderChart();

    this.barOption1 = getWarnEventOption();
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
  },
};
</script>

<style lang="less" scoped>
.chart-box {
  width: 428px;
  height: 205px;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
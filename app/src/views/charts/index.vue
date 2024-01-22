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

    <div style="background: rgba(0, 0, 0.4)">
      <PieChart></PieChart>
    </div>

    <div class="chart-box2">
      <BEcharts
        :option="xiangxing"
        style="height: 100%; width: 100%"
      ></BEcharts>
    </div>

    <div class="chart-box3">
      <XlChart></XlChart>
    </div>

    <div class="chart-box3">
      <PieChart3D></PieChart3D>
    </div>

    <div class="chart-box3">
      <YsplitChart></YsplitChart>
    </div>

    <div class="chart-box2">
      <CylinderCom></CylinderCom>
    </div>

    <div class="chart-line">
      <BEcharts
        :option="getOptions()"
        style="height: 50px; width: 370px"
      ></BEcharts>
    </div>

    <!-- 雷达图 -->
    <div class="chart-box2">
      <BEcharts :option="radarChartOption"></BEcharts>
    </div>

    <div>
      <span style="color: red">x轴坐标文字换行处理</span>
      <div class="chart-box">
        <BEcharts :option="option"></BEcharts>
      </div>
    </div>

    <div>
      <span style="color: red">x轴坐标文字换行处理</span>
      <div class="chart-box">
        <BEcharts :option="optionIcon"></BEcharts>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import WaterMonitoringChart from "./components/WaterMonitoringChart";
import { getWarnEventOption } from "./barChart1";
import BEcharts from "@/components/chart/BEcharts";
import PieChart from "@/components/chart/PieChart";
import XlChart from "./components/XlChart";
import PieChart3D from "./components/PieChart3D";
import YsplitChart from "./components/YsplitChart";
import CylinderCom from "./components/CylinderCom";
import {
  rainChart,
  getRainfallOpt,
  getPieOpt,
  getVillageRainOpt,
  lineChart,
  getXiangxing,
  getRainfallOptIcon,
  getVMOption,
  getKhgkOption,
} from "./chart";

const rainXiaoyu = require("@/assets/img/water-disasters-defense/rain-xiaoyu.png"); // 监测-小雨
const rainXiaoyu2 = require("@/assets/img/water-disasters-defense/rain-xiaoyu2.png"); // 预报-小雨

export default {
  components: {
    WaterMonitoringChart,
    BEcharts,
    PieChart,
    XlChart,
    PieChart3D,
    YsplitChart,
    CylinderCom,
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
      optionIcon: {},
      radarChartOption: {},
    };
  },
  created() {
    this.renderChart();

    this.barOption1 = getWarnEventOption();
    this.barOption2 = getVillageRainOpt();
    this.option = getRainfallOpt();
    this.lineChart = lineChart();
    this.xiangxing = getXiangxing();
    this.upDataCheckradarOption()
    this.renderPie();

    this.renderBar();
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
    renderBar() {
      const xAxis = [
        "2023-12-11",
        "2023-12-12",
        "2023-12-13",
        "2023-12-14",
        "2023-12-15",
        "2023-12-16",
        "2023-12-17",
      ];
      const result = {};
      result["监测"] = [
        ["2023-12-11", 1],
        ["2023-12-12", 0.5],
        ["2023-12-13", 0],
      ];
      result["预报"] = [
        ["2023-12-14", 8.28],
        ["2023-12-15", 15.41],
        ["2023-12-16", 7.94],
        ["2023-12-17", 0.71],
      ];
      result["累计"] = [1, 1.5, 1.5, 9.78, 25.19, 33.13, 33.84];

      const markpoint = {
        监测: [
          {
            xAxis: 0,
            yAxis: 1,
            symbol: "image://" + rainXiaoyu,
            symbolOffset: ["0", "-20%"],
          },
          {
            xAxis: 1,
            yAxis: 0.5,
            symbol: "image://" + rainXiaoyu,
            symbolOffset: ["0", "-20%"],
          },
          {
            xAxis: 2,
            yAxis: 0,
            symbol: "image://" + rainXiaoyu,
            symbolOffset: ["0", "-20%"],
          },
        ],
        预报: [
          {
            xAxis: 3,
            yAxis: 8.379999999999999,
            symbol: "image://" + rainXiaoyu2,
            symbolOffset: ["0", "-20%"],
          },
          {
            xAxis: 4,
            yAxis: 15.51,
            symbol: "image://" + rainXiaoyu2,
            symbolOffset: ["0", "-20%"],
          },
          {
            xAxis: 5,
            yAxis: 8.040000000000001,
            symbol: "image://" + rainXiaoyu2,
            symbolOffset: ["0", "-20%"],
          },
          {
            xAxis: 6,
            yAxis: 0.8099999999999999,
            symbol: "image://" + rainXiaoyu2,
            symbolOffset: ["0", "-20%"],
          },
        ],
      };
      this.optionIcon = getRainfallOptIcon(xAxis, result, markpoint);
    },
    getOptions() {
      const obj = {
        country: null,
        staffStart: 511.27,
        watershedArea: null,
        riverName: null,
        distancePrepareTransferLevel: null,
        riverwayGradient: null,
        id: "V060",
        prepareTransferLevel: 512.97,
        state: "1",
        lastZ: 514,
        personInCharge: "王绍文",
        izConstruction: "拟建",
        longitude: 108.050616,
        area: "后山镇",
        inquiryAgainTime: null,
        devLat: 30.835285,
        defenseName: "沐河村1组",
        warningType: 0,
        immediatelyTransferLevel: 513.47,
        historyList: null,
        riverSystemName: null,
        waterfloodGradient: null,
        sixHourImmediately: 86,
        inquiryFlow: null,
        population: 45,
        areaCode: "500101146000",
        stcd: "S089",
        phone: "17784072035",
        threeHourPrepare: 51,
        disasterWaterStage: null,
        gridCode: null,
        oneHourPrepare: 39,
        compareLastZ: -2.5,
        izTrumpet: "是",
        monType: "3",
        inquiryPoint: null,
        latitude: 30.835203,
        disasterAgainTime: null,
        izEcological: "否",
        constructionRemark: null,
        riskType: "临河隐患",
        updateBy: null,
        informTransferLevel: 512.47,
        stnm: "后山镇-沐河村1组",
        villageSection: null,
        floodControlCapacity: 4,
        devLong: 108.050361,
        sixHourPrepare: 80,
        village: null,
        specialCrowd: 8,
        joinRiverName: null,
        riskRank: "I",
        length: 3,
        updateTime: null,
        households: 10,
        threeHourImmediately: 64,
        distanceImmediatelyTransferLevel: null,
        createBy: "admin",
        exampleYear: null,
        distanceInformTransferLevel: null,
        createTime: "2023-11-21 19:05:25",
        disasterFlow: null,
        lastTm: "2024-01-22 09:00:00",
        tm: "2024-01-22 10:00:00",
        z: 511.5,
        oneHourImmediately: 48,
      };
      const option = getVMOption(obj);
      console.log("option: ", option);
      return option;
    },
    /**
     * 雷达图
     */
    upDataCheckradarOption() {
      const names = [
        "工作情况",
        "专项行动开展情况",
        "巡河完成率",
        "任务处置率",
        "水质改善率",
      ];
      let list = [];
      names.forEach((item) => {
        list.push({
          name: item,
          value: Math.floor(Math.random() * 100),
        });
      });
      this.radarChartOption = getKhgkOption(list);
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

.chart-line {
  width: 400px;
  height: 250px;
  background-color: rgba(0, 0, 0, 0.6);
}

.chart-box3 {
  width: 460px;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
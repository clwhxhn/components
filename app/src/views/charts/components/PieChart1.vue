<template>
  <div class="chart-box">
    <div class="gsl-chart">
      <BEcharts :option="guaranteeRate"></BEcharts>
    </div>
    <div class="right">
      <div class="split">
        <div class="section jzgsl-lg">
          <div class="block jzgsl"></div>
        </div>
      </div>

      <div class="title-val">
        <span class="title">集中供水率</span>
        <span class="val">90<span class="unit">%</span></span>
      </div>
    </div>
  </div>
</template>

<script>
import BEcharts from "@/components/chart/BEcharts";
import * as echarts from "echarts";
import gsbzlimg from "@/assets/gsbzlimg.png";

export default {
  components: { BEcharts },
  data() {
    return {
      guaranteeRate: {},
    };
  },
  created() {
    const color = ["rgba(253, 238, 117, 1)", "rgba(232, 148, 51, 1)"];
    const img = gsbzlimg;
    this.guaranteeRate = {
      backgroundColor: "transparent",
      graphic: [
        {
          type: "image",
          id: "background",
          left: "center",
          top: "center",
          bounding: "raw",
          style: {
            image: gsbzlimg,
            width: 80,
            height: 80,
          },
        },
      ],
      angleAxis: {
        polarIndex: 0,
        min: 0,
        max: 100,
        show: false,
        startAngle: 90,
      },
      radiusAxis: {
        type: "category",
        show: true,
        axisLabel: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
      polar: [
        {
          center: ["50%", "50%"],
          radius: "160%",
        },
      ],
      series: [
        {
          type: "bar",
          z: 10,
          name: "完成度",
          data: [80],
          showBackground: false,
          backgroundStyle: {
            borderWidth: 8,
            width: 8,
          },
          coordinateSystem: "polar",
          roundCap: true,
          barWidth: 3,
          itemStyle: {
            color: "#5886f0",
            borderColor: {
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(114, 205, 255, 1)",
                },
                {
                  offset: 1,
                  color: "rgba(85, 134, 255, 1)",
                },
              ],
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              type: "linear",
              global: false,
            },
            borderWidth: 3,
          },
        },
      ],
      color: ["#5FE3A1", "#56D9FE", "#A3A1FB", "#FFDA83", "#DF8188", "#C70039"],
    };
  },
};
</script>

<style lang="less" scoped>
.chart-box {
  width: 120px;
  display: flex;
  height: 200px;
}

.gsl-chart {
  height: 100px;
  width: 100px;
}

.right {
  display: flex;
  align-items: center;

  .split {
    width: 15px;
    margin: 0 10px;

    img {
      margin-left: 2.5px;
    }

    .section {
      height: 10px;
      width: 10px;
    }

    .block {
      display: flex;
      align-items: center;
      width: 4px;
      height: 4px;
      margin: 2px;
    }

    .jzgsl-lg {
      background-color: rgba(92, 210, 255, 0.3);
      border: 0.5px solid rgba(92, 210, 255, 1);
    }

    .jzgsl {
      background-color: rgba(92, 210, 255, 1);
    }

    .zlspjl-lg {
      background-color: rgba(243, 196, 86, 0.3);
      border: 0.5px solid rgba(243, 196, 86, 1);
    }

    .zlspjl {
      background-color: rgba(243, 196, 86, 1);
    }

    .gsbzl-lg {
      background-color: rgba(238, 137, 87, 0.3);
      border: 0.5px solid rgba(238, 137, 87, 1);
    }

    .gsbzl {
      background-color: rgba(238, 137, 87, 1);
    }

    .szdbl-lg {
      background-color: rgba(126, 182, 255, 0.3);
      border: 0.5px solid rgba(126, 182, 255, 1);
    }

    .szdbl {
      background-color: rgba(126, 182, 255, 1);
    }
  }

  .title-val {
    .title {
      display: block;
      width: 100%;
      font-size: 14px;
      font-weight: 500;
      color: #ccddf7;
      line-height: 24px;
    }

    .val {
      color: rgba(255, 255, 255, 1);
      font-size: 26px;
      font-family: D-DIN, DINAlternate;
      font-weight: bold;

      .unit {
        font-size: 12px;
        color: rgba(172, 215, 255, 1);
        font-family: PingFangSC, PingFang SC;
        font-weight: normal;
      }
    }
  }
}
</style>
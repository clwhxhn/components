<template>
  <div class="evaluative-dimension">
    <div class="chart-wrap">
      <ChartBox ref="chart"></ChartBox>
      <div class="legend-list">
        <div class="legend-item" v-for="it in colorList" :key="it.color">
          <span class="legend-color" :style="{ background: it.color }"></span>
          <span class="legend-label">{{ it.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChartBox from "@/components/ChartBox.vue";
import cq from "@/assets/json/chongqing_qu.json";
import * as echarts from "echarts";
import { getEvaluativeDimension } from "../../../../mock/mock";

export default {
  components: { ChartBox },
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    panelType: {
      panelType: String,
      required: true,
    },
  },
  data() {
    return {
      colorList: [
        {
          color: "rgba(167,15,15,1)",
          borderColor: "#FF7272",
          label: "低整改率：0%~70%",
        },
        {
          color: "rgba(233,93,0,1)",
          borderColor: "#FFAB72",
          label: "中低整改率：70%~80%",
        },
        {
          color: "rgba(233,171,0,1)",
          borderColor: "#FFE372",
          label: "中整改率：80%~90%",
        },
        {
          color: "rgba(8,106,254,1)",
          borderColor: "#72DAFF",
          label: "中高整改率：90%~100%",
        },
        {
          color: "rgba(37,167,15,1)",
          borderColor: "#25A70F",
          label: "高整改率：100%",
        },
      ],
      list: [],
    };
  },
  async mounted() {
    cq.features.forEach((it) => {});
    echarts.registerMap("CQ", cq);
    this.list = await getEvaluativeDimension(this.panelType);
    this.renderChart();
  },
  //   watch: {
  //     // 由于父页面是用v-show控制显示隐藏，导致echarts初始化的时候找不到父级的尺寸，所以在显示的时候调用resize
  //     isActive() {
  //       if (this.isActive) {
  //         this.$nextTick(() => {
  //           this.$refs.chart.resize();
  //         });
  //       }
  //     },
  //   },
  methods: {
    renderChart() {
      const options = {
        tooltip: {
          trigger: "item",
          backgroundColor: "#000",
          textStyle: {
            color: "#fff",
          },
          formatter: function (params) {
            // 判断是否为 NaN
            const value = isNaN(params.value) ? "100%" : `${params.value}%`;
            return `${params.name}：${value}`;
          },
        },
        layoutSize: "100%",
        series: [
          {
            type: "map",
            map: "CQ",
            nameProperty: "ADDVNM",
            label: { show: false },
            data: cq.features.map((it) => {
              const item = this.list.find(
                (i) => i.regionName === it.properties.ADDVNM
              );
              const value = item ? item.val : 100; // Math.round(Math.random() * 7);
              return {
                name: it.properties.ADDVNM,
                value,
                itemStyle: {
                  areaColor: this.getColorByValue(value),
                },
                emphasis: {
                  label: {
                    show: false,
                  },
                  itemStyle: {
                    areaColor: this.getColorByValue(value),
                    opacity: 0.9,
                  },
                },
              };
            }),
          },
        ],
      };
      this.$refs.chart.render(options);
    },
    getColorByValue(val) {
      if (!val) return this.colorList[4].color;
      if (val > 0 && val < 70) return this.colorList[0].color;
      if (val >= 70 && val < 80) return this.colorList[1].color;
      if (val >= 80 && val < 90) return this.colorList[2].color;
      if (val >= 90 && val < 100) return this.colorList[3].color;
      return this.colorList[4].color;
    },
  },
};
</script>

<style lang="less" scoped>
.evaluative-dimension {
  display: flex;

  .chart-wrap {
    height: 500px;
    width: 800px;
    position: relative;

    .legend-list {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);

      .legend-item {
        display: flex;
        align-items: center;
        height: 32px;

        .legend-color {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          margin-right: 10px;
        }

        .legend-label {
          color: #fff;
        }
      }
    }
  }
}
</style>

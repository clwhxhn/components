<template>
  <div class="judgement-dimension">
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
import { getAction } from "@/utils";

export default {
  components: { ChartBox },
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      colorList: [
        { color: "#FA5252", label: "低储备：0" },
        { color: "#FF8B16", label: "中低储备：0~2" },
        { color: "#FFEF16", label: "中储备：3~5" },
        { color: "#08CEF9", label: "中高储备：>5" },
      ],
    };
  },
  mounted() {
    cq.features.forEach((it) => {});
    echarts.registerMap("CQ", cq);
    this.renderChart();
  },
  watch: {
    // 由于父页面是用v-show控制显示隐藏，导致echarts初始化的时候找不到父级的尺寸，所以在显示的时候调用resize
    isActive() {
      if (this.isActive) {
        this.$nextTick(() => {
          this.$refs.chart.resize();
        });
      }
    },
  },
  methods: {
    queryData() {
      return getAction("/pcm/pcm.map/queryPreWorkRegionTable", {}).then((res) => {
        const map = {};
        res.result.forEach((it) => {
          map[it.regiionCode] = it;
        });
        return map;
      });
    },
    async renderChart() {
      const map = await this.queryData();
      const options = {
        tooltip: {
          trigger: "item",
          formatter: "{b}：{c}",
        },
        layoutSize: "100%",
        series: [
          {
            type: "map",
            map: "CQ",
            nameProperty: "ADDVNM",
            label: { show: false },
            data: cq.features
              .map((it) => {
                const value = map[it.properties.ADDVCD] ?  map[it.properties.ADDVCD].engNum : 0;
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
                  },
                };
              }),
          },
        ],
      };
      this.$refs.chart.render(options);
    },
    getColorByValue(val) {
      if (!val) return this.colorList[0].color;
      if (val > 0 && val <= 2) return this.colorList[1].color;
      if (val > 2 && val <= 5) return this.colorList[2].color;
      return this.colorList[3].color;
    },
  },
};
</script>
<style lang="less" scoped>
.judgement-dimension {
  height: 500px;
  overflow-y: auto;
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

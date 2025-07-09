<template>
  <div class="business-dimension">
    <ChartBox ref="chart"></ChartBox>
  </div>
</template>
<script>
import { getAction } from "@/utils";
import ChartBox from "@/components/ChartBox.vue";

export default {
  components: { ChartBox },
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
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
  mounted() {
    getAction("/pcm/pcm.map/queryPreWorkStageTable", {}).then((res) => {
      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          data: res.result.map((it) => it.stageName),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: res.result.map((it) => it.num),
            type: "bar",
          },
        ],
      };
      this.$refs.chart.render(option);
    });
  },
};
</script>
<style lang="less" scoped>
.business-dimension {
  height: 500px;
}
</style>

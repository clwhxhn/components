<template>
  <div class="chart-box" ref="box"></div>
</template>
<script>
import * as echarts from "echarts";
import 'echarts-gl'

export default {
  data() {
    return {
      instance: null,
    };
  },
  methods: {
    render(option) {
      if (!this.instance) {
        this.instance = echarts.init(this.$refs.box);
      }
      this.instance.setOption(option);
    },
    resize() {
      this.instance.resize()
    }
  },
};
</script>
<style lang="less" scoped>
.chart-box {
  width: 100%;
  height: 100%;
}
</style>

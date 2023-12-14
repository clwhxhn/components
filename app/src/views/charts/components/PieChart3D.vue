<template>
  <div class="warn-piechart">
    <PieCharts3d :optionData="pieOptionData"></PieCharts3d>
  </div>
</template>

<script>
import PieCharts3d from "@/components/chart/PieCharts3d";
export default {
  components: {
    PieCharts3d,
  },
  data() {
    return {
     pieOptionData: [
        {
          name: '生态数据未达标告警',
          value: 30,
          itemStyle: {
            color: '#31EABE',
          },
        },
        {
          name: '监测设备离线告警',
          value: 70,
          itemStyle: {
            color: '#1D78FF',
          },
        },
        {
          name: 'AI监测告警',
          value: 25,
          itemStyle: {
            color: '#FFA200',
          },
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.warn-piechart {
  width: 100%;
  height: 180px;
}
</style>
<template>
  <div class="chart">
    00
    <WaterLevelFlowChart
      :is-expand="false"
      :showDatePicker="false"
      :data-obj="dataObj"
      :list="list"
      :character-wl-list="characterWlList"
    />
  </div>
</template>

<script>
import WaterLevelFlowChart from "@/components/waterLevelFlowChart/WaterLevelFlowChart.vue";
export default {
  components: {
    WaterLevelFlowChart,
  },
  data() {
    return {
      dataObj: {
        dataList: [],
      },
      list: [
        {
          type: "wl",
          name: "库水位",
          key: "kuwl", // 默认监测
          forecastKey: 'YBkuwl'
        },
        {
          type: 'flow',
          name: '入库22流量',
          key: 'inq22',
          color: '#55C10A'
        },
        {
          type: 'flow',
          name: '出库流量',
          key: 'inq33',
          color: '#55C10A'
        },
        {
          type: 'flow',
          name: '流量',
          key: 'flow',
          color: '#55C10A'
        },
      ],
      characterWlList: [
        {
          name: "校核水位",
          color: "#FF0012",
          key: "checkWL",
        },
        {
          name: "设计水位",
          color: "#FF9900",
          key: "designWL",
        },
        {
          name: "汛限水位",
          color: "#EDC70A",
          key: "floodControlWL",
        },
      ],
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.dataObj = {
        dataList: [
          {
            time: "2023-01-01 08:00",
            waterLevel: 1,
            kuwl: 10,
            YBkuwl: 10,
            flow: 2,
            drp: 3,
            inq22: 2,
            inq33: 1,
          },
          {
            time: "2023-01-01 09:00",
            waterLevel: 2,
            kuwl: 2,
            YBkuwl: 10,
            flow: 4,
            drp: 9,
            inq22: 2,
            inq33: 2,
          },
          {
            time: "2023-01-01 10:00",
            waterLevel: 4,
            kuwl: 4,
            YBkuwl: 10,
            flow: 12,
            drp: 6,
            inq22: 2,
            inq33: 3,
          },
          {
            time: "2023-01-01 11:00",
            waterLevel: 3,
            kuwl: 3,
            YBkuwl: 10,
            flow: 12,
            drp: 6,
            inq22: 2,
            inq33: 5,
          },
          {
            time: "2023-01-01 12:00",
            waterLevel: 3,
            kuwl: 3,
            YBkuwl: 10,
            flow: 12,
            drp: 6,
            inq22: 2,
            inq33: 3,
          },
        ],
        tmKey: "time",
        wlKey: "waterLevel",
        // flowKey: "flow",
        drpKey: "drp",
        checkWL: 2,
        designWL: 3,
        floodControlWL: 1.9,
        forecastTM: "2023-01-01 10:00",
        wlCfg: {
          name: "库水位",
        },
      };
    },
  },
};
</script>

<style lang="less" scoped>
.chart {
  width: 600px;
  height: 200px;
}
</style>

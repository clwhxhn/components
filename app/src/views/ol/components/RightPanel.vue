<template>
  <div class="right-main">
    <div class="block-item">
      <!-- 应急提醒 -->
      <EmergencyReminder :obj="statistics" />
      <!-- 实时水青 -->
      <WaterRegimen class="water-regimen" />
    </div>
  </div>
</template>

<script>
// import { getAction } from '@/api/manage'
import XFTEcharts from '@/components/xft-echarts/XFTEcharts'
import { fmtValue } from '@/utils/tiptool'
import EmergencyReminder from './business/EmergencyReminder.vue'
import WaterRegimen from './business/WaterRegimen.vue'

export default {
  name: 'RightPanel',
  components: {
    XFTEcharts,
    EmergencyReminder,
    WaterRegimen
  },
  data() {
    return {
      loading: false,
      // 统计数据
      statistics: {}
    }
  },
  watch: {},
  mounted() {
    // this.getStatistics()
  },
  methods: {
    // getStatistics() {
    //   getAction('/basin.flood.prevention/bfpEmePlan/emergencyRemind').then(
    //     res => {
    //       console.log('res: ', res)
    //       if (res.success) {
    //         this.statistics = res.result || {}
    //       }
    //     }
    //   )
    // }
  }
}
</script>

<style lang="less" scoped>
.right-main {
  position: absolute;
  top: 0;
  right: 0;
  width: 500px;
  height: calc(100vh - 64px);
  //background: #f4f8ff;
  background: #ffffff;
  color: #3e454d;
  font-family: PingFangSC-Semibold, PingFang SC;
  z-index: 3;
  .block-item {
    height: 100%;
    display: flex;
    flex-direction: column;
    .water-regimen {
      flex: 1;
    }
  }

  /deep/ .header {
    width: 100%;
    height: 40px;
    background: linear-gradient(90deg, #3377ff 0%, #cfe2ff 100%);
    display: flex;
    //border-radius: 8px 8px 0 0;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #ffffff;
  }
}
</style>

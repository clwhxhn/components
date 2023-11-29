<template>
  <div>
    <!-- 应急提醒 -->
    <div class="header">应急提醒</div>
    <div class="body">
      <KpiBox :list="list" valueColor="#000" />
    </div>
  </div>
</template>

<script>
import KpiBox from '../KpiBox'
export default {
  components: {
    KpiBox
  },
  props: {
    obj: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    obj: {
      handler(newVal) {
        console.log('newVal: ', newVal);
        if(JSON.stringify(newVal) !== "{}") {
          this.list.forEach(rec => {
            rec.value = newVal[rec.key]
          })
        }
      },
      deep: true
    }
  },
  data() {
    return {
      list: [
        {
          icon: require('@/assets/images/basic-data-management/sj_water.png'),
          label: '巡险风险点',
          value: '',
          unit: '',
          key: 'patrolNum'
        },
       {
          icon: require('@/assets/images/basic-data-management/sj_water.png'),
          label: '抢险风险点',
          value: '',
          unit: '',
          key: 'rescueNum'
        },
        {
          icon: require('@/assets/images/basic-data-management/sj_water.png'),
          label: '避险转移风险点',
          value: '',
          unit: '',
          key: 'avoidNum'
        },
      ]
    }
  }
}
</script>

<style lang="less" scoped>
</style>

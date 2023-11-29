<template>
  <!-- 抢险详情 Popup -->
  <HoverPopup :properties="properties" :lists="lists"></HoverPopup>
</template>

<script>
import HoverPopup from '@/components/map/components/HoverPopup.vue'
// import { mapGetters } from 'vuex'
// import { getAction } from '@/api/manage'
export default {
  name: 'DangerousDetailsPopup',
  components: {
    HoverPopup
  },
  props: {
    properties: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      lists: []
    }
  },
  computed: {
    // ...mapGetters(['queryParam'])
  },
  watch: {
    properties(val) {
      this.init(val)
    }
  },
  created() {
    console.log('this.properties: ', this.properties);
  },
  methods: {
    async init(options) {
    //   const res = await getAction('/basin.flood.prevention/bfpEmePlan/queryPlanInfoByAddvcd', {
    //     addvcd: options.addvcd
    //   })
    //    console.log('res: ', res);
    //   this.lists = [
    //     { title: '风险类型', value: '', unit: '' },
    //     { title: '责任小组组成', value: '', unit: '' },
    //     { title: '组长及联系方式', value: '', unit: '' },
    //     { title: '抢险预案', value: '', unit: '' },
    //   ]
    }
  }
}
</script>
<style lang="less" scoped>
.hover-warp {
  width: 260px;
}
</style>


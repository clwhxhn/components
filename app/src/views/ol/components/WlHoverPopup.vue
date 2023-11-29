<template>
  <!-- 水位站 hoverPopup -->
  <HoverPopup :properties="properties" :lists="lists"></HoverPopup>
</template>

<script>
import HoverPopup from '@/components/map/components/HoverPopup.vue'
// import { mapGetters } from 'vuex'
export default {
  name: 'WlHoverPopup',
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
    init(options) {
      this.lists = [
        { title: '当前水位', value: options.waterLevel, unit: 'm' },
        { title: '巡险水位', value: options.patrolz, unit: 'm' },
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.hover-warp {
  width: 260px;
}
</style>


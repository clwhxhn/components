<template>
  <div
    @click="handleAction()"
    :class="['action-item', regionId === CQ_REGION_ID ? 'is-hide' : '']"
  >
    <div class="action-bg"></div>
    <div class="action-bg-active"></div>
  </div>
</template>
<script>
import { CQ_REGION_ID, paramsGetters } from "@/utils/map-helper";
import { SchintaMapHelp } from "schinta-map";

export default {
  mixins: [SchintaMapHelp()],
  data() {
    return {
      CQ_REGION_ID,
    };
  },
  computed: paramsGetters(["regionId"], true),
  methods: {
    handleAction() {
      this.regionId = CQ_REGION_ID;
      this.$flyToRegion(CQ_REGION_ID);
    },
  },
};
</script>
<style lang="less" scoped>
.action-item {
  transition: all 0.1s ease;
  max-height: 40px;
  &.is-hide {
    max-height: 0;
  }
}
/** 样式写到了父组件，这里只保留了背景图片的样式 */
.action-bg {
  background-image: url(~@/assets/images-new/construction-management/action-bar/icon-2.png);
}
.action-bg-active {
  background-image: url(~@/assets/images-new/construction-management/action-bar/icon-active-2.png);
}
</style>

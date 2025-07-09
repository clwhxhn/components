<template>
  <div @click="handleAction()" class="action-item">
    <div class="action-bg"></div>
    <div class="action-bg-active"></div>
  </div>
</template>
<script>
import { paramsGetters, CQ_REGION_ID } from "@/utils/map-helper";
import { SchintaMapHelp } from "schinta-map";

export default {
  mixins: [SchintaMapHelp()],
  data() {
    return {};
  },
  computed: {
    ...paramsGetters(["regionId"]),
  },
  methods: {
    handleAction() {
      this.setValues$({ regionId: CQ_REGION_ID });
      this.$flyToRegion(CQ_REGION_ID);
    },
  },
};
</script>
<style lang="less" scoped>
/** 样式写到了父组件，这里只保留了背景图片的样式 */
.action-bg {
  background-image: url(~@/assets/images-new/construction-management/action-bar/icon-8.png);
}
.action-bg-active {
  background-image: url(~@/assets/images-new/construction-management/action-bar/icon-8.png);
}
</style>

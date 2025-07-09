<template>
  <div
    @click="handleAction()"
    class="action-item"
    :class="{ 'is-active': isLayerVisible }"
  >
    <div class="action-bg"></div>
    <div class="action-bg-active"></div>
  </div>
</template>
<script>
import { SchintaMapHelp } from "schinta-map";

export default {
  mixins: [SchintaMapHelp()],
  data() {
    return {};
  },
  computed: {
    isLayerVisible() {
      return this.getLayerValue$().includes("aiAlarmLayer");
    },
  },
  methods: {
    handleAction() {
      // 重置overlay
      this.getOverlayController$().clearOverlayGroup();
      if (this.isLayerVisible) {
        this.hideLayers$(["aiAlarmLayer"]);
      } else {
        this.$setCurLayers("aiAlarmLayer");
      }
    },
  },
};
</script>
<style lang="less" scoped>
/** 样式写到了父组件，这里只保留了背景图片的样式 */
.action-bg {
  background-image: url(~@/assets/images-new/construction-management/action-bar/icon-5.png);
}
.action-bg-active {
  background-image: url(~@/assets/images-new/construction-management/action-bar/icon-active-5.png);
}
</style>

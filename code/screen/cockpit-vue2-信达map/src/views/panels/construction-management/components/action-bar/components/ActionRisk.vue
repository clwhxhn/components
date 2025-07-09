<template>
  <div
    @click="handleAction()"
    class="action-item"
    :class="{ 'is-active': !collapseBottom }"
  >
    <div class="action-bg"></div>
    <div class="action-bg-active"></div>
  </div>
</template>
<script>
import { paramsGetters } from "@/utils/map-helper";
import { SchintaMapHelp } from "schinta-map";

export default {
  mixins: [SchintaMapHelp()],
  data() {
    return {};
  },
  computed: paramsGetters(["collapseBottom"], true),
  methods: {
    handleAction() {
      this.collapseBottom = !this.collapseBottom;
    },
  },
};
</script>
<style lang="less" scoped>
/** 样式写到了父组件，这里只保留了背景图片的样式 */
.action-bg {
  background-image: url(~@/assets/images-new/construction-management/action-bar/icon-6.png);
}
.action-bg-active {
  background-image: url(~@/assets/images-new/construction-management/action-bar/icon-active-6.png);
}
</style>

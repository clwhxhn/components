<template>
  <div @click="handleAction()" class="action-item">
    <div class="action-bg"></div>
    <div class="action-bg-active"></div>
  </div>
</template>
<script>
import { paramsGetters } from "@/utils/map-helper";
import { SchintaMapHelp } from "schinta-map";

console.log(SchintaMapHelp(), 'SchintaMapHelp()')

export default {
  mixins: [SchintaMapHelp()],
  data() {
    return {};
  },
  computed: paramsGetters(["collapseSide", "collapseBottom", "collapseTop"], true),
  methods: {
    handleAction() {
      const flag = !this.collapseSide;
      this.collapseSide = flag;
      this.collapseBottom = flag;
      this.collapseTop = flag
    },
  },
};
</script>
<style lang="less" scoped>
/** 样式写到了父组件，这里只保留了背景图片的样式 */
.action-bg {
  background-image: url(~@/assets/images-new/construction-management/action-bar/icon-3.png);
}
.action-bg-active {
  background-image: url(~@/assets/images-new/construction-management/action-bar/icon-active-3.png);
}
</style>

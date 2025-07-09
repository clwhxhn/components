<template>
  <div @click="handleAction()" class="action-item">
    <div class="action-bg"></div>
    <div class="action-bg-active"></div>
    <LayerPanel @close="panelVisible = false" :panelVisible="panelVisible"></LayerPanel>
  </div>
</template>
<script>
import { SchintaMapHelp } from "schinta-map";
import LayerPanel from "./panels/LayerPanel.vue";

export default {
  mixins: [SchintaMapHelp()],
  components: {
    LayerPanel,
  },
  data() {
    return {
      panelVisible: false,
    };
  },
  methods: {
    handleAction() {
      this.panelVisible = !this.panelVisible;
    },
  },
};
</script>
<style lang="less" scoped>
/** 样式写到了父组件，这里只保留了背景图片的样式 */
.action-bg {
  background-image: url(~@/assets/images-new/construction-management/action-bar/icon-4.png);
}
.action-bg-active {
  background-image: url(~@/assets/images-new/construction-management/action-bar/icon-active-4.png);
}
</style>

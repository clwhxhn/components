<template>
  <div @click="handleAction()" class="action-item" :class="{'is-active': panelVisible}">
    <div class="action-bg"></div>
    <div class="action-bg-active"></div>
    <SearchPanel
      @close="handleClose"
      :panelVisible="panelVisible"
    ></SearchPanel>
  </div>
</template>
<script>
import SearchPanel from "./panels/SearchPanel.vue";

export default {
  components: { SearchPanel },
  data() {
    return {
      panelVisible: false,
    };
  },
  methods: {
    handleAction() {
      this.panelVisible = !this.panelVisible;
    },
    handleClose() {
      this.panelVisible = false;
    },
  },
};
</script>
<style lang="less" scoped>
/** 样式写到了父组件，这里只保留了背景图片的样式 */
.action-bg {
  background-image: url(~@/assets/images-new/construction-management/action-bar/icon-1.png);
}
.action-bg-active {
  background-image: url(~@/assets/images-new/construction-management/action-bar/icon-active-1.png);
}
</style>

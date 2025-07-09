<template>
  <CommonPanel position="right">
    <ActionBar></ActionBar>
    <LegendBox></LegendBox>
    <div class="panel-content">
      <span style="color: #fff">右</span>
    </div>
  </CommonPanel>
</template>

<script>
import CommonPanel from "@/views/components/CommonPanel.vue";
import ActionBar from "./components/action-bar/ActionBar.vue";
import LegendBox from "../common/LegendBox/LegendBox.vue";

export default {
  components: {
    CommonPanel,
    ActionBar,
    LegendBox
  },
};
</script>

<style lang="less" scoped>
.panel-content {
  padding: 0 10px;
}
</style>
